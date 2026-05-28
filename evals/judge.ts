/**
 * Reads /evals/results.jsonl and asks GPT-5.5 (via Codex OAuth, server-side
 * helper) to grade each result against its expected_facts. Writes
 * /evals/judgments.jsonl + prints an aggregate report.
 *
 * Failing cases (pass_rate < 1.0) emit a draft skill suggestion into
 * /evals/proposed-skills.jsonl which an admin can review before promoting.
 *
 * Usage:
 *   POSTGRES_URL=... npm run evals:judge
 *   (needs db access because complete() reads the oauth token from postgres)
 */
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { complete } from "../lib/openai/client";

const JUDGE_SYSTEM = `You judge whether an agent's reply contains each of the expected facts.

For each expected fact, decide: present, missing, contradicted.
Then decide an overall pass: true iff ALL expected facts are present (or
contradicted=0 AND missing=0) AND the reply does not invent unverifiable facts.

Output STRICT JSON, no prose, no code fences:
{
  "per_fact": [{ "fact": "...", "verdict": "present" | "missing" | "contradicted" }],
  "pass": true | false,
  "score_0_to_1": 0.0-1.0,
  "notes": "one sentence",
  "suggested_skill_slug": null OR "kebab-case-slug-if-knowledge-gap"
}`;

type Scenario = {
  id: string;
  category: string;
  question: string;
  expected_facts: string[];
  source_hint: string;
  reply: string;
  retrieved: Array<{ source: string; title: string | null }>;
  durationMs: number;
  error?: string;
};

type Judgment = {
  id: string;
  category: string;
  pass: boolean;
  score_0_to_1: number;
  notes: string;
  per_fact: Array<{ fact: string; verdict: string }>;
  suggested_skill_slug: string | null;
  error?: string;
};

async function judgeOne(s: Scenario): Promise<Judgment> {
  if (s.error) {
    return {
      id: s.id,
      category: s.category,
      pass: false,
      score_0_to_1: 0,
      notes: `scenario errored: ${s.error}`,
      per_fact: s.expected_facts.map((f) => ({ fact: f, verdict: "missing" })),
      suggested_skill_slug: null,
      error: s.error,
    };
  }
  const userText = [
    `Question: ${s.question}`,
    `Expected facts:\n${s.expected_facts.map((f, i) => `${i + 1}. ${f}`).join("\n")}`,
    `Agent reply:\n${s.reply}`,
  ].join("\n\n");

  const res = await complete({
    input: [
      { role: "system", content: [{ type: "input_text", text: JUDGE_SYSTEM }] },
      { role: "user", content: [{ type: "input_text", text: userText }] },
    ],
    reasoning: { effort: "low" },
    max_output_tokens: 600,
  });

  const text = res.output_text.trim();
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) {
    return {
      id: s.id,
      category: s.category,
      pass: false,
      score_0_to_1: 0,
      notes: "judge returned non-json",
      per_fact: [],
      suggested_skill_slug: null,
    };
  }
  const j = JSON.parse(text.slice(start, end + 1)) as Omit<Judgment, "id" | "category">;
  return { id: s.id, category: s.category, ...j };
}

async function main() {
  const path = join(process.cwd(), "evals", "results.jsonl");
  const raw = await readFile(path, "utf8");
  const results = raw
    .split("\n")
    .filter((l) => l.trim())
    .map((l) => JSON.parse(l) as Scenario);

  console.log(`[judge] grading ${results.length} results…`);
  const judgments: Judgment[] = [];
  for (const r of results) {
    process.stdout.write(`  ${r.id}…`);
    try {
      const j = await judgeOne(r);
      judgments.push(j);
      process.stdout.write(` ${j.pass ? "PASS" : "FAIL"} (${j.score_0_to_1.toFixed(2)})\n`);
    } catch (e) {
      process.stdout.write(` ERR ${(e as Error).message}\n`);
      judgments.push({
        id: r.id,
        category: r.category,
        pass: false,
        score_0_to_1: 0,
        notes: (e as Error).message,
        per_fact: [],
        suggested_skill_slug: null,
        error: (e as Error).message,
      });
    }
  }

  // Write artifacts
  await writeFile(
    join(process.cwd(), "evals", "judgments.jsonl"),
    judgments.map((j) => JSON.stringify(j)).join("\n") + "\n",
    "utf8"
  );

  const proposed = judgments
    .filter((j) => !j.pass && j.suggested_skill_slug)
    .map((j) => ({ scenarioId: j.id, slug: j.suggested_skill_slug, notes: j.notes }));
  if (proposed.length) {
    await writeFile(
      join(process.cwd(), "evals", "proposed-skills.jsonl"),
      proposed.map((p) => JSON.stringify(p)).join("\n") + "\n",
      "utf8"
    );
  }

  // Aggregate
  const byCat = new Map<string, { pass: number; total: number; score: number }>();
  for (const j of judgments) {
    const c = byCat.get(j.category) ?? { pass: 0, total: 0, score: 0 };
    c.total += 1;
    if (j.pass) c.pass += 1;
    c.score += j.score_0_to_1;
    byCat.set(j.category, c);
  }
  const overallPass = judgments.filter((j) => j.pass).length;
  const overallScore = judgments.reduce((s, j) => s + j.score_0_to_1, 0) / Math.max(1, judgments.length);

  console.log("\n[judge] report:");
  console.log(`  overall: ${overallPass}/${judgments.length} pass, mean score ${overallScore.toFixed(2)}`);
  for (const [cat, c] of byCat) {
    console.log(`  ${cat.padEnd(16)} ${c.pass}/${c.total} pass, mean ${(c.score / c.total).toFixed(2)}`);
  }
  if (proposed.length) {
    console.log(`  proposed_skills: ${proposed.length} → evals/proposed-skills.jsonl`);
  }
}

main().catch((e) => {
  console.error("[judge] FAILED:", e);
  process.exit(1);
});
