import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db } from "@/db/client";
import { errorLog, dailyErrorReviews, skills, corrections } from "@/db/schema";
import { complete } from "@/lib/openai/client";
import { embedQuery } from "@/lib/openai/embed";
import { logError } from "@/lib/log";

export const runtime = "nodejs";
export const maxDuration = 300; // 5 min; Vercel Pro covers this on a cron

/**
 * Auth: Vercel Cron sends a request with `Authorization: Bearer <CRON_SECRET>`.
 * Reject anything else.
 */
function authCron(req: Request): boolean {
  const expected = process.env.CRON_SECRET;
  if (!expected) return false;
  const got = req.headers.get("authorization");
  return got === `Bearer ${expected}`;
}

type ErrorGroup = {
  source: string;
  count: number;
  first_seen: Date;
  last_seen: Date;
  sample_message: string;
  sample_stack: string | null;
  ids: number[];
};

const ANALYSIS_SYSTEM = `You analyze a cluster of errors from the Oracle POS support agent and propose a fix.

Output STRICT JSON, no prose, no code fences:
{
  "category": "knowledge_gap" | "code_bug" | "config" | "transient" | "external",
  "severity_assessment": "low" | "medium" | "high" | "critical",
  "root_cause": "one-sentence diagnosis",
  "proposed_action": "one-sentence concrete action a human should take next",
  "proposed_skill": null OR {
    "slug": "kebab-case",
    "title": "title",
    "body": "markdown body"
  }
}

Rules:
- proposed_skill is only non-null when category=='knowledge_gap' AND the
  cluster represents users asking questions the agent fails to answer.
- For code_bug, proposed_action should name the file(s) to inspect.
- For transient/external, mark severity_assessment="low" and proposed_action="monitor; no action".`;

async function analyze(group: ErrorGroup) {
  const userText = [
    `Source: ${group.source}`,
    `Count in last 24h: ${group.count}`,
    `First seen: ${group.first_seen.toISOString()}`,
    `Last seen: ${group.last_seen.toISOString()}`,
    `Sample message: ${group.sample_message}`,
    group.sample_stack ? `Sample stack:\n${group.sample_stack.slice(0, 2000)}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const res = await complete({
    input: [
      { role: "system", content: [{ type: "input_text", text: ANALYSIS_SYSTEM }] },
      { role: "user", content: [{ type: "input_text", text: userText }] },
    ],
    reasoning: { effort: "low" },
    max_output_tokens: 600,
  });

  const text = res.output_text.trim();
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) {
    throw new Error(`analyze: non-json: ${text.slice(0, 200)}`);
  }
  return JSON.parse(text.slice(start, end + 1)) as {
    category: string;
    severity_assessment: string;
    root_cause: string;
    proposed_action: string;
    proposed_skill: null | { slug: string; title: string; body: string };
  };
}

export async function GET(req: Request) {
  if (!authCron(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const result = await db.execute<ErrorGroup>(sql`
    SELECT
      source,
      COUNT(*)::int AS count,
      MIN(occurred_at) AS first_seen,
      MAX(occurred_at) AS last_seen,
      (ARRAY_AGG(message ORDER BY occurred_at DESC))[1] AS sample_message,
      (ARRAY_AGG(stack   ORDER BY occurred_at DESC))[1] AS sample_stack,
      ARRAY_AGG(id) AS ids
    FROM error_log
    WHERE resolution = 'unresolved'
      AND occurred_at > now() - interval '24 hours'
    GROUP BY source
    ORDER BY count DESC
    LIMIT 30
  `);
  const groups = result.rows;

  let fixesProposed = 0;
  let skillsDrafted = 0;
  const notes: string[] = [];

  for (const group of groups) {
    try {
      const analysis = await analyze(group);
      notes.push(`[${group.source}] x${group.count} → ${analysis.category}: ${analysis.root_cause}`);

      // Mark these errors as under investigation with the analysis attached.
      await db.execute(sql`
        UPDATE error_log
        SET resolution = 'investigating',
            fix_applied = ${JSON.stringify(analysis)}
        WHERE id = ANY(${group.ids})
      `);
      fixesProposed++;

      if (analysis.proposed_skill && /^[a-z0-9-]{4,80}$/.test(analysis.proposed_skill.slug)) {
        const [skillRow] = await db
          .insert(skills)
          .values({
            slug: analysis.proposed_skill.slug,
            title: analysis.proposed_skill.title,
            body: analysis.proposed_skill.body,
            bodyMarkdownPath: `memory/skills/${analysis.proposed_skill.slug}.md`,
            status: "proposed",
          })
          .onConflictDoUpdate({
            target: skills.slug,
            set: {
              title: analysis.proposed_skill.title,
              body: analysis.proposed_skill.body,
              status: "proposed",
            },
          })
          .returning({ id: skills.id });
        skillsDrafted++;
        // Pre-embed for fast availability if approved later — embed only,
        // don't insert into memory_chunks until admin approves.
        try {
          await embedQuery(`${analysis.proposed_skill.title}\n\n${analysis.proposed_skill.body}`);
        } catch {
          /* pre-embed best-effort */
        }
        void skillRow;
      }
    } catch (e) {
      await logError({
        severity: "error",
        source: "cron.error-review.analyze",
        message: (e as Error).message,
        stack: (e as Error).stack,
        requestContext: { errorGroupSource: group.source, errorCount: group.count },
      });
    }
  }

  await db.insert(dailyErrorReviews).values({
    errorsProcessed: groups.reduce((s, g) => s + g.count, 0),
    fixesProposed,
    skillsDrafted,
    notes: notes.join("\n"),
  });

  return NextResponse.json({
    ok: true,
    groups_analyzed: groups.length,
    errors_processed: groups.reduce((s, g) => s + g.count, 0),
    fixes_proposed: fixesProposed,
    skills_drafted: skillsDrafted,
  });
}

// Also accept POST so we can trigger manually from the admin UI for testing.
export async function POST(req: Request) {
  return GET(req);
}
