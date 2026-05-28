import { complete } from "@/lib/openai/client";

const SYSTEM = `You convert an admin's correction of a wrong agent answer into a reusable Skill.

Output STRICT JSON with this shape:
{
  "slug": "kebab-case-short-name",
  "title": "Human-readable title under 80 chars",
  "body": "Markdown body in this structure:\n\n## Problem\n<one paragraph>\n\n## When to apply\n- bullet conditions\n\n## Correct procedure\n1. step\n2. step\n\n## Why the previous answer was wrong\n- bullet"
}

Rules:
- The slug must match /^[a-z0-9-]{4,80}$/.
- No prose outside the JSON. No code fences. The first character must be {.`;

export type SkillDraft = { slug: string; title: string; body: string };

export async function draftSkillFromCorrection(opts: {
  originalQuestion: string;
  wrongAnswer: string;
  whatWasWrong: string;
  whatIsCorrect: string;
}): Promise<SkillDraft> {
  const userText = [
    `Original question:\n${opts.originalQuestion}`,
    `\nAgent's (wrong) answer:\n${opts.wrongAnswer}`,
    `\nAdmin says the issue was:\n${opts.whatWasWrong}`,
    `\nAdmin says the correct answer is:\n${opts.whatIsCorrect}`,
  ].join("\n");

  const res = await complete({
    input: [
      { role: "system", content: [{ type: "input_text", text: SYSTEM }] },
      { role: "user", content: [{ type: "input_text", text: userText }] },
    ],
    reasoning: { effort: "low" },
    max_output_tokens: 800,
  });

  const text = res.output_text.trim();
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) {
    throw new Error(`[skill-draft] model did not return JSON: ${text.slice(0, 200)}`);
  }
  const json = JSON.parse(text.slice(start, end + 1)) as SkillDraft;
  if (!/^[a-z0-9-]{4,80}$/.test(json.slug)) {
    throw new Error(`[skill-draft] invalid slug: ${json.slug}`);
  }
  if (!json.title || !json.body) {
    throw new Error("[skill-draft] missing title or body");
  }
  return json;
}
