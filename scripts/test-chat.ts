/**
 * Smoke test: call GPT-5.5 through the stored Codex OAuth house token.
 *   ENCRYPTION_KEY=... POSTGRES_URL=... tsx scripts/test-chat.ts
 */
import { complete } from "../lib/openai/client";

async function main() {
  // Mirror exactly what /api/chat sends, to catch any unsupported params.
  const res = await complete({
    input: [
      { role: "system", content: [{ type: "input_text", text: "You are a test." }] },
      { role: "user", content: [{ type: "input_text", text: "Reply with exactly: PONG" }] },
    ],
    reasoning: { effort: "medium" },
    max_output_tokens: 2000,
    metadata: { conversation_id: "test", user_id: "test", message_id: "test" },
  });
  console.log("MODEL:", res.model);
  console.log("OUTPUT:", JSON.stringify(res.output_text));
  console.log("USAGE:", JSON.stringify(res.usage));
}

main().catch((e) => {
  console.error("TEST FAILED:", e.message ?? e);
  process.exit(1);
});
