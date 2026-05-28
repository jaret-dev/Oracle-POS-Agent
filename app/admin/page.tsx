import Link from "next/link";
import { db } from "@/db/client";
import { sql } from "drizzle-orm";

async function counts() {
  try {
    const result = await db.execute<{
      users: number;
      conversations: number;
      issues: number;
      open_issues: number;
      unresolved_errors: number;
      skills: number;
      proposed_skills: number;
    }>(sql`
      SELECT
        (SELECT COUNT(*)::int FROM users) AS users,
        (SELECT COUNT(*)::int FROM conversations) AS conversations,
        (SELECT COUNT(*)::int FROM issues) AS issues,
        (SELECT COUNT(*)::int FROM issues WHERE status = 'open') AS open_issues,
        (SELECT COUNT(*)::int FROM error_log WHERE resolution = 'unresolved') AS unresolved_errors,
        (SELECT COUNT(*)::int FROM skills WHERE status = 'approved') AS skills,
        (SELECT COUNT(*)::int FROM skills WHERE status = 'proposed') AS proposed_skills
    `);
    return result.rows[0] ?? null;
  } catch {
    return null;
  }
}

export default async function AdminHome() {
  const c = await counts();
  const cards = [
    { label: "Users", value: c?.users ?? "—", href: "/admin" },
    { label: "Conversations", value: c?.conversations ?? "—", href: "/admin" },
    { label: "Issues (total)", value: c?.issues ?? "—", href: "/admin/issues" },
    { label: "Open issues", value: c?.open_issues ?? "—", href: "/admin/issues" },
    { label: "Unresolved errors", value: c?.unresolved_errors ?? "—", href: "/admin/errors" },
    { label: "Approved skills", value: c?.skills ?? "—", href: "/admin/skills" },
    { label: "Proposed skills", value: c?.proposed_skills ?? "—", href: "/admin/skills" },
  ];
  return (
    <main className="p-8 space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Admin overview</h1>
        <p className="text-sm text-mute">Live counts from Postgres. Errors and skill proposals are auto-reviewed daily at 03:00 UTC.</p>
      </header>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="block p-4 rounded border border-border bg-panel hover:border-mute"
          >
            <div className="text-xs text-mute uppercase tracking-wide">{card.label}</div>
            <div className="text-2xl font-semibold mt-1">{card.value}</div>
          </Link>
        ))}
      </div>
      {!c && (
        <p className="text-sm text-warn border border-warn/40 rounded px-3 py-2 bg-warn/5">
          Postgres is not reachable yet (or the migration hasn&apos;t run). Configure POSTGRES_URL and run the 0000_init.sql migration + db:seed.
        </p>
      )}
    </main>
  );
}
