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
  reasoning?: { effort?: "low" | "medium" | "high" };
  max_output_tokens?: number;
  metadata?: Record<string, string>;
  stream?: boolean;
};

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
  const { access } = await getValidAccessToken(null);

  const body = {
    model,
    input: req.input,
    ...(req.reasoning ? { reasoning: req.reasoning } : {}),
    ...(req.max_output_tokens ? { max_output_tokens: req.max_output_tokens } : {}),
    ...(req.metadata ? { metadata: req.metadata } : {}),
    stream: false,
  };

  const res = await fetch(CODEX_RESPONSES_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access}`,
      "Content-Type": "application/json",
      "OpenAI-Beta": "responses=v1",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `[openai] ${model} responses call failed: ${res.status} ${text.slice(0, 500)}`
    );
  }

  const json = (await res.json()) as {
    id: string;
    output?: Array<{ content?: Array<{ type: string; text?: string }> }>;
    output_text?: string;
    usage?: { input_tokens?: number; output_tokens?: number };
    model?: string;
  };

  const output_text =
    json.output_text ??
    json.output
      ?.flatMap((o) => o.content ?? [])
      .filter((c) => c.type === "output_text" || c.type === "text")
      .map((c) => c.text ?? "")
      .join("") ??
    "";

  return {
    id: json.id,
    output_text,
    raw: json,
    usage: json.usage,
    model: json.model ?? model,
  };
}

/**
 * Streaming variant. Returns a ReadableStream<Uint8Array> of SSE bytes
 * suitable for piping into a Next.js Response.
 */
export async function completeStream(req: ResponsesRequest): Promise<Response> {
  const model = req.model ?? DEFAULT_MODEL;
  const { access } = await getValidAccessToken(null);

  const body = {
    model,
    input: req.input,
    ...(req.reasoning ? { reasoning: req.reasoning } : {}),
    ...(req.max_output_tokens ? { max_output_tokens: req.max_output_tokens } : {}),
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
