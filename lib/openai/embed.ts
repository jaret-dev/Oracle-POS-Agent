const EMBED_URL = "https://api.openai.com/v1/embeddings";
const EMBED_MODEL = process.env.EMBEDDING_MODEL ?? "text-embedding-3-large";
const EMBED_DIMS = 1536;

/**
 * Embeds a single query text. Uses OPENAI_API_KEY, NOT the Codex OAuth token —
 * the embeddings endpoint is a separately billed API. If no key is configured
 * this throws; the chat endpoint surfaces the failure so the agent doesn't
 * silently miss retrieval context.
 */
export async function embedQuery(text: string): Promise<number[]> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    throw new Error(
      "[embed] OPENAI_API_KEY is not set. Retrieval requires an embeddings " +
        "API key separate from the Codex OAuth subscription."
    );
  }
  const res = await fetch(EMBED_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: EMBED_MODEL,
      input: text,
      dimensions: EMBED_DIMS,
    }),
  });
  if (!res.ok) {
    throw new Error(`[embed] ${res.status} ${await res.text()}`);
  }
  const json = (await res.json()) as { data: Array<{ embedding: number[] }> };
  if (!json.data?.[0]?.embedding) throw new Error("[embed] missing embedding in response");
  return json.data[0].embedding;
}
