import Link from "next/link";
import { db } from "@/db/client";
import { issues, users } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

async function listIssues() {
  try {
    return await db
      .select({
        id: issues.id,
        title: issues.title,
        status: issues.status,
        category: issues.category,
        storeNumber: issues.storeNumber,
        createdAt: issues.createdAt,
        conversationId: issues.conversationId,
        userName: users.displayName,
        userUsername: users.username,
      })
      .from(issues)
      .leftJoin(users, eq(users.id, issues.userId))
      .orderBy(desc(issues.createdAt))
      .limit(500);
  } catch (e) {
    return { _error: (e as Error).message };
  }
}

export default async function AdminIssuesPage() {
  const data = await listIssues();
  if (!Array.isArray(data)) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-semibold mb-2">Issues</h1>
        <p className="text-warn">DB error: {data._error}</p>
      </main>
    );
  }
  return (
    <main className="p-8 max-w-6xl space-y-4">
      <header>
        <h1 className="text-2xl font-semibold">Issues</h1>
        <p className="text-sm text-mute">
          Every conversation opens an issue. Click into the conversation to review the thread.
        </p>
      </header>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-mute border-b border-border">
            <th className="py-2 px-2">When</th>
            <th className="py-2 px-2">Store</th>
            <th className="py-2 px-2">User</th>
            <th className="py-2 px-2">Status</th>
            <th className="py-2 px-2">Category</th>
            <th className="py-2 px-2">Title</th>
          </tr>
        </thead>
        <tbody>
          {data.map((i) => (
            <tr key={i.id} className="border-b border-border/60 hover:bg-panel/60">
              <td className="py-2 px-2 text-mute whitespace-nowrap">
                {i.createdAt.toISOString().slice(0, 16).replace("T", " ")}
              </td>
              <td className="py-2 px-2 font-mono">{i.storeNumber ?? "—"}</td>
              <td className="py-2 px-2">{i.userName ?? i.userUsername ?? "—"}</td>
              <td className="py-2 px-2">{i.status}</td>
              <td className="py-2 px-2 text-mute">{i.category ?? "—"}</td>
              <td className="py-2 px-2">
                <Link
                  href={`/admin/conversations/${i.conversationId}`}
                  className="hover:underline"
                >
                  {i.title}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!data.length && <p className="text-mute italic">No issues yet.</p>}
    </main>
  );
}
