import { getValidAccessToken } from "./tokens";

const CODEX_RESPONSES_URL = "https://chatgpt.com/backend-api/codex/responses";

export const DEFAULT_MODEL = process.env.MODEL_PRIMARY?.replace(/^openai\//, "") ?? "gpt-5.5";
export const FALLBACK_MODEL = process.env.MODEL_FALLBACK?.replace(/^openai\//, "") ?? "gpt-5.4-mini";

export type ResponsesInputContent =
  | { type: "input_text"; text: string }
  | { type: "input_image"; image_url: string };

export type ResponsesInputMessage = {
  role: "system" | "user" | "assistant" | "developer";
  content: ResponsesInputContent[];
};

export type ResponsesRequest = {
  model?: string;
  input: ResponsesInputMessage[];
  instructions?: string;
  reasoning?: { effort?: "low" | "medium" | "high" };
  max_output_tokens?: number;
  metadata?: Record<string, string>;
  stream?: boolean;
};

/**
 * The Codex `responses` endpoint requires a top-level `instructions` string
 * (it returns 400 "Instructions are required" otherwise). Our callers put the
 * system prompt as a role:"system" message in `input`, so we hoist any system
 * messages into `instructions` and drop them from `input`.
 */
function splitInstructions(req: ResponsesRequest): {
  instructions: string;
  input: ResponsesInputMessage[];
} {
  const sys: string[] = [];
  if (req.instructions) sys.push(req.instructions);
  const input: ResponsesInputMessage[] = [];
  for (const msg of req.input) {
    if (msg.role === "system") {
      sys.push(msg.content.map((c) => ("text" in c ? c.text : "")).join(""));
    } else {
      input.push(msg);
    }
  }
  return {
    instructions: sys.join("\n\n") || "You are a helpful assistant.",
    input,
  };
}

export type ResponsesResult = {
  id: string;
  output_text: string;
  raw: unknown;
  usage?: { input_tokens?: number; output_tokens?: number };
  model: string;
};

/**
 * Non-streaming Responses API call against the Codex subscription endpoint.
 * Uses the shared "house" OAuth token (admin-provisioned). Throws on any
 * non-2xx response so callers can write to error_log.
 */
export async function complete(req: ResponsesRequest): Promise<ResponsesResult> {
  const model = req.model ?? DEFAULT_MODEL;
  const { access, accountId } = await getValidAccessToken(null);
  const { instructions, input } = splitInstructions(req);

  // The Codex endpoint is streaming-only (rejects stream:false). We request a
  // stream and reassemble the full text + usage from the SSE events.
  const body = {
    model,
    instructions,
    input,
    store: false,
    stream: true,
    ...(req.reasoning ? { reasoning: req.reasoning } : {}),
    ...(req.metadata ? { metadata: req.metadata } : {}),
  };

  const res = await fetch(CODEX_RESPONSES_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access}`,
      "Content-Type": "application/json",
      Accept: "text/event-stream",
      "OpenAI-Beta": "responses=v1",
      originator: "codex_cli_rs",
      ...(accountId ? { "chatgpt-account-id": accountId } : {}),
    },
    body: JSON.stringify(body),
  });

  if (!res.ok || !res.body) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `[openai] ${model} responses call failed: ${res.status} ${text.slice(0, 500)}`
    );
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let outputText = "";
  let respId = "";
  let finalModel = model;
  let usage: { input_tokens?: number; output_tokens?: number } | undefined;
  let errDetail: string | null = null;

  const handleEvent = (data: string) => {
    let evt: Record<string, unknown>;
    try {
      evt = JSON.parse(data);
    } catch {
      return;
    }
    const type = evt.type as string | undefined;
    if (type === "response.output_text.delta" && typeof evt.delta === "string") {
      outputText += evt.delta;
    } else if (type === "response.completed" || type === "response.incomplete") {
      const r = (evt.response ?? {}) as {
        id?: string;
        model?: string;
        usage?: { input_tokens?: number; output_tokens?: number };
        output?: Array<{ content?: Array<{ type: string; text?: string }> }>;
      };
      respId = r.id ?? respId;
      finalModel = r.model ?? finalModel;
      usage = r.usage ?? usage;
      if (!outputText && Array.isArray(r.output)) {
        outputText = r.output
          .flatMap((o) => o.content ?? [])
          .filter((c) => c.type === "output_text" || c.type === "text")
          .map((c) => c.text ?? "")
          .join("");
      }
    } else if (type === "response.failed" || type === "error") {
      errDetail = JSON.stringify((evt.response as Record<string, unknown>)?.error ?? evt.error ?? evt);
    }
  };

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const blocks = buffer.split("\n\n");
    buffer = blocks.pop() ?? "";
    for (const block of blocks) {
      for (const line of block.split("\n")) {
        const trimmed = line.trim();
        if (trimmed.startsWith("data:")) {
          const data = trimmed.slice(5).trim();
          if (data && data !== "[DONE]") handleEvent(data);
        }
      }
    }
  }

  if (errDetail) {
    throw new Error(`[openai] ${model} stream error: ${errDetail}`);
  }

  return {
    id: respId,
    output_text: outputText,
    raw: null,
    usage,
    model: finalModel,
  };
}

/**
 * Streaming variant. Returns a ReadableStream<Uint8Array> of SSE bytes
 * suitable for piping into a Next.js Response.
 */
export async function completeStream(req: ResponsesRequest): Promise<Response> {
  const model = req.model ?? DEFAULT_MODEL;
  const { access, accountId } = await getValidAccessToken(null);
  const { instructions, input } = splitInstructions(req);

  const body = {
    model,
    instructions,
    input,
    store: false,
    ...(req.reasoning ? { reasoning: req.reasoning } : {}),
    ...(req.metadata ? { metadata: req.metadata } : {}),
    stream: true,
  };

  const res = await fetch(CODEX_RESPONSES_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access}`,
      "Content-Type": "application/json",
      Accept: "text/event-stream",
      "OpenAI-Beta": "responses=v1",
      originator: "codex_cli_rs",
      ...(accountId ? { "chatgpt-account-id": accountId } : {}),
    },
    body: JSON.stringify(body),
  });

  if (!res.ok || !res.body) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `[openai] ${model} stream failed: ${res.status} ${text.slice(0, 500)}`
    );
  }

  return new Response(res.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
