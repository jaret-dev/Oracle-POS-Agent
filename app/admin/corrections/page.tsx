import Link from "next/link";
import { db } from "@/db/client";
import { corrections, users, skills, messages } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

async function listCorrections() {
  try {
    return await db
      .select({
        id: corrections.id,
        whatWasWrong: corrections.whatWasWrong,
        whatIsCorrect: corrections.whatIsCorrect,
        createdAt: corrections.createdAt,
        adminName: users.displayName,
        skillTitle: skills.title,
        skillSlug: skills.slug,
        skillStatus: skills.status,
        conversationId: messages.conversationId,
      })
      .from(corrections)
      .leftJoin(users, eq(users.id, corrections.adminUserId))
      .leftJoin(skills, eq(skills.id, corrections.proposedSkillId))
      .leftJoin(messages, eq(messages.id, corrections.messageId))
      .orderBy(desc(corrections.createdAt))
      .limit(200);
  } catch (e) {
    return { _error: (e as Error).message };
  }
}

export default async function AdminCorrectionsPage() {
  const data = await listCorrections();
  if (!Array.isArray(data)) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-semibold mb-2">Corrections</h1>
        <p className="text-warn">DB error: {data._error}</p>
      </main>
    );
  }
  return (
    <main className="p-8 max-w-5xl space-y-4">
      <header>
        <h1 className="text-2xl font-semibold">Corrections history</h1>
        <p className="text-sm text-mute">Each correction drafts a proposed skill which lives in Skills until approved.</p>
      </header>
      <div className="space-y-3">
        {data.map((c) => (
          <article key={c.id} className="border border-border rounded bg-panel p-4 space-y-2">
            <header className="flex items-baseline gap-3 text-xs text-mute">
              <span>{c.createdAt.toISOString().slice(0, 16).replace("T", " ")}</span>
              <span>by {c.adminName ?? "—"}</span>
              {c.conversationId && (
                <Link href={`/admin/conversations/${c.conversationId}`} className="ml-auto hover:underline text-accent">
                  view thread →
                </Link>
              )}
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-xs uppercase tracking-wide text-mute mb-1">What was wrong</div>
                <p className="whitespace-pre-wrap">{c.whatWasWrong}</p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-mute mb-1">What is correct</div>
                <p className="whitespace-pre-wrap">{c.whatIsCorrect}</p>
              </div>
            </div>
            {c.skillTitle && (
              <div className="text-xs text-mute">
                drafted skill:{" "}
                <Link href="/admin/skills" className="text-accent hover:underline">
                  {c.skillTitle}
                </Link>{" "}
                <span className="font-mono">({c.skillSlug})</span> — {c.skillStatus}
              </div>
            )}
          </article>
        ))}
        {!data.length && <p className="text-mute italic">No corrections yet.</p>}
      </div>
    </main>
  );
}
