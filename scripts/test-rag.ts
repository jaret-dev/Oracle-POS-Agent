/**
 * End-to-end RAG smoke test (keyword retrieval + GPT-5.5).
 *   ENCRYPTION_KEY=... POSTGRES_URL=... tsx scripts/test-rag.ts "your question"
 * Deliberately does NOT set OPENAI_API_KEY, so retrieval uses the BM25 path
 * exactly like the live app.
 */
import { retrieve } from "../lib/memory/retrieve";
import { complete } from "../lib/openai/client";
import { buildResponsesInput } from "../lib/agent/prompt";

async function main() {
  const q = process.argv[2] ?? "How do I apply a discount to a check?";
  console.log("Q:", q, "\n");

  const chunks = await retrieve({ query: q, k: 6 });
  console.log(`Retrieved ${chunks.length} chunks:`);
  for (const c of chunks) console.log(`  - [${c.source}] ${c.title ?? c.section_path} (score ${c.score?.toFixed?.(3)})`);
  console.log();

  const input = buildResponsesInput(
    {
      user: { username: "JaretF", role: "admin", storeNumber: null, displayName: "Jaret" },
      retrievedChunks: chunks,
    },
    q,
    []
  );
  const res = await complete({ input, reasoning: { effort: "low" } });
  console.log("ANSWER:\n" + res.output_text);
}

main().catch((e) => {
  console.error("RAG TEST FAILED:", e.message ?? e);
  process.exit(1);
});
