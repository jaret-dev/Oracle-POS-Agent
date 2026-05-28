import { NextResponse } from "next/server";
import { z } from "zod";
import { and, asc, eq, lt } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/db/client";
import { messages, corrections, skills } from "@/db/schema";
import { draftSkillFromCorrection } from "@/lib/agent/skill-draft";
import { logError } from "@/lib/log";

export const runtime = "nodejs";
export const maxDuration = 30;

const body = z.object({
  messageId: z.string().uuid(),
  whatWasWrong: z.string().min(3).max(2000),
  whatIsCorrect: z.string().min(3).max(4000),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "admin only" }, { status: 403 });
  }

  let parsed: z.infer<typeof body>;
  try {
    parsed = body.parse(await req.json());
  } catch (e) {
    return NextResponse.json({ error: "invalid body", details: (e as Error).message }, { status: 400 });
  }

  try {
    // Look up the corrected (assistant) message and the most recent user
    // message before it in the same conversation.
    const [assistantMsg] = await db.select().from(messages).where(eq(messages.id, parsed.messageId)).limit(1);
    if (!assistantMsg || assistantMsg.role !== "assistant") {
      return NextResponse.json({ error: "messageId is not an assistant message" }, { status: 400 });
    }
    const [originalUserMsg] = await db
      .select()
      .from(messages)
      .where(and(eq(messages.conversationId, assistantMsg.conversationId), lt(messages.createdAt, assistantMsg.createdAt), eq(messages.role, "user")))
      .orderBy(asc(messages.createdAt))
      .limit(1);

    // Draft a skill from the correction.
    const draft = await draftSkillFromCorrection({
      originalQuestion: originalUserMsg?.contentText ?? "(no preceding user message found)",
      wrongAnswer: assistantMsg.contentText,
      whatWasWrong: parsed.whatWasWrong,
      whatIsCorrect: parsed.whatIsCorrect,
    });

    // Insert correction first
    const [correctionRow] = await db
      .insert(corrections)
      .values({
        messageId: parsed.messageId,
        adminUserId: session.user.id,
        whatWasWrong: parsed.whatWasWrong,
        whatIsCorrect: parsed.whatIsCorrect,
      })
      .returning({ id: corrections.id });

    // Insert proposed skill (idempotent on slug)
    const [skillRow] = await db
      .insert(skills)
      .values({
        slug: draft.slug,
        title: draft.title,
        body: draft.body,
        bodyMarkdownPath: `memory/skills/${draft.slug}.md`,
        status: "proposed",
        createdFromCorrectionId: correctionRow.id,
      })
      .onConflictDoUpdate({
        target: skills.slug,
        set: {
          title: draft.title,
          body: draft.body,
          status: "proposed",
        },
      })
      .returning({ id: skills.id });

    // Backfill proposed_skill_id on the correction
    await db
      .update(corrections)
      .set({ proposedSkillId: skillRow.id })
      .where(eq(corrections.id, correctionRow.id));

    return NextResponse.json({
      ok: true,
      correctionId: correctionRow.id,
      skillId: skillRow.id,
      slug: draft.slug,
      title: draft.title,
    });
  } catch (e) {
    const err = e instanceof Error ? e : new Error(String(e));
    await logError({
      severity: "error",
      source: "api.corrections",
      message: err.message,
      stack: err.stack,
      userId: session.user.id,
    });
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
