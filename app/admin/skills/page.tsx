import { db } from "@/db/client";
import { skills, users } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { SkillRow } from "./SkillRow";

async function listSkills() {
  try {
    return await db
      .select({
        id: skills.id,
        slug: skills.slug,
        title: skills.title,
        body: skills.body,
        status: skills.status,
        createdAt: skills.createdAt,
        approvedAt: skills.approvedAt,
        approvedByName: users.displayName,
      })
      .from(skills)
      .leftJoin(users, eq(users.id, skills.approvedByUserId))
      .orderBy(desc(skills.createdAt))
      .limit(200);
  } catch (e) {
    return { _error: (e as Error).message };
  }
}

export default async function AdminSkillsPage() {
  const data = await listSkills();
  if (!Array.isArray(data)) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-semibold mb-2">Skills</h1>
        <p className="text-warn text-sm border border-warn/40 rounded px-3 py-2 bg-warn/5">
          DB error: {data._error}
        </p>
      </main>
    );
  }

  const byStatus = {
    proposed: data.filter((s) => s.status === "proposed"),
    approved: data.filter((s) => s.status === "approved"),
    rejected: data.filter((s) => s.status === "rejected"),
    retired: data.filter((s) => s.status === "retired"),
  };

  return (
    <main className="p-8 space-y-8 max-w-5xl">
      <header>
        <h1 className="text-2xl font-semibold">Skills</h1>
        <p className="text-sm text-mute">
          Approved skills are embedded into memory and overrule the Oracle docs when retrieval matches.
        </p>
      </header>

      <Section title={`Proposed (${byStatus.proposed.length})`} highlight>
        {byStatus.proposed.map((s) => <SkillRow key={s.id} skill={s} />)}
        {!byStatus.proposed.length && <Empty>No skill proposals waiting.</Empty>}
      </Section>

      <Section title={`Approved (${byStatus.approved.length})`}>
        {byStatus.approved.map((s) => <SkillRow key={s.id} skill={s} />)}
        {!byStatus.approved.length && <Empty>None yet.</Empty>}
      </Section>

      <Section title={`Rejected / Retired (${byStatus.rejected.length + byStatus.retired.length})`}>
        {[...byStatus.rejected, ...byStatus.retired].map((s) => <SkillRow key={s.id} skill={s} />)}
        {!byStatus.rejected.length && !byStatus.retired.length && <Empty>None.</Empty>}
      </Section>
    </main>
  );
}

function Section({ title, highlight, children }: { title: string; highlight?: boolean; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <h2 className={`text-sm font-semibold uppercase tracking-wide ${highlight ? "text-accent" : "text-mute"}`}>
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="text-mute text-sm italic">{children}</p>;
}
