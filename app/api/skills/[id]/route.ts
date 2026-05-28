import { NextResponse } from "next/server";
import { z } from "zod";
import { eq, sql } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/db/client";
import { skills, memoryChunks } from "@/db/schema";
import { embedQuery } from "@/lib/openai/embed";
import { logError } from "@/lib/log";

export const runtime = "nodejs";

const body = z.object({
  action: z.enum(["approve", "reject", "retire"]),
});

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "admin only" }, { status: 403 });
  }

  const { id } = await ctx.params;
  const skillId = Number(id);
  if (!Number.isFinite(skillId)) {
    return NextResponse.json({ error: "bad id" }, { status: 400 });
  }

  let parsed: z.infer<typeof body>;
  try {
    parsed = body.parse(await req.json());
  } catch (e) {
    return NextResponse.json({ error: "invalid body", details: (e as Error).message }, { status: 400 });
  }

  try {
    const [skill] = await db.select().from(skills).where(eq(skills.id, skillId)).limit(1);
    if (!skill) return NextResponse.json({ error: "not found" }, { status: 404 });

    if (parsed.action === "approve") {
      await db
        .update(skills)
        .set({ status: "approved", approvedByUserId: session.user.id, approvedAt: new Date() })
        .where(eq(skills.id, skillId));

      // Embed the skill body and insert into memory_chunks so retrieval picks it up.
      // Replace any prior chunks for this skill first.
      await db
        .delete(memoryChunks)
        .where(sql`source = 'skill' AND skill_id = ${skillId}`);

      const embedding = await embedQuery(`${skill.title}\n\n${skill.body}`);
      const vecLit = `[${embedding.join(",")}]`;
      await db.execute(sql`
        INSERT INTO memory_chunks (source, section_path, markdown_path, title, content, embedding, skill_id, chunk_order)
        VALUES ('skill'::memory_source, ${skill.slug}, ${skill.bodyMarkdownPath ?? null}, ${skill.title}, ${skill.body}, ${vecLit}::vector, ${skillId}, 0)
      `);
      return NextResponse.json({ ok: true, action: "approve" });
    }

    if (parsed.action === "reject") {
      await db.update(skills).set({ status: "rejected" }).where(eq(skills.id, skillId));
      return NextResponse.json({ ok: true, action: "reject" });
    }

    if (parsed.action === "retire") {
      await db.update(skills).set({ status: "retired", retiredAt: new Date() }).where(eq(skills.id, skillId));
      await db.delete(memoryChunks).where(sql`source = 'skill' AND skill_id = ${skillId}`);
      return NextResponse.json({ ok: true, action: "retire" });
    }
    return NextResponse.json({ error: "unhandled action" }, { status: 400 });
  } catch (e) {
    const err = e instanceof Error ? e : new Error(String(e));
    await logError({
      severity: "error",
      source: "api.skills.action",
      message: err.message,
      stack: err.stack,
      userId: session.user.id,
    });
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
