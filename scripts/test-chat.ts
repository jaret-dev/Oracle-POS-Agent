/**
 * Smoke test: call GPT-5.5 through the stored Codex OAuth house token.
 *   ENCRYPTION_KEY=... POSTGRES_URL=... tsx scripts/test-chat.ts
 */
import { complete } from "../lib/openai/client";

async function main() {
  const res = await complete({
    input: [
      { role: "user", content: [{ type: "input_text", text: "Reply with exactly: PONG" }] },
    ],
    max_output_tokens: 20,
  });
  console.log("MODEL:", res.model);
  console.log("OUTPUT:", JSON.stringify(res.output_text));
  console.log("USAGE:", JSON.stringify(res.usage));
}

main().catch((e) => {
  console.error("TEST FAILED:", e.message ?? e);
  process.exit(1);
});
