import { db } from "@/db/client";
import { errorLog } from "@/db/schema";
import { desc } from "drizzle-orm";

async function listErrors() {
  try {
    return await db
      .select()
      .from(errorLog)
      .orderBy(desc(errorLog.occurredAt))
      .limit(200);
  } catch (e) {
    return { _error: (e as Error).message };
  }
}

export default async function AdminErrorsPage() {
  const data = await listErrors();
  if (!Array.isArray(data)) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-semibold mb-2">Errors</h1>
        <p className="text-warn">DB error: {data._error}</p>
      </main>
    );
  }
  return (
    <main className="p-8 max-w-6xl space-y-4">
      <header>
        <h1 className="text-2xl font-semibold">Error log</h1>
        <p className="text-sm text-mute">
          Daily cron at 03:00 UTC reads unresolved errors and drafts proposed fixes / skills.
        </p>
      </header>
      <div className="space-y-2">
        {data.map((e) => (
          <details key={e.id} className="border border-border rounded bg-panel p-3 group">
            <summary className="cursor-pointer flex items-baseline gap-3 list-none">
              <span
                className={
                  e.severity === "fatal" || e.severity === "error"
                    ? "text-err text-xs uppercase font-semibold"
                    : e.severity === "warn"
                    ? "text-warn text-xs uppercase font-semibold"
                    : "text-mute text-xs uppercase font-semibold"
                }
              >
                {e.severity}
              </span>
              <span className="text-mute text-xs whitespace-nowrap">
                {e.occurredAt.toISOString().slice(0, 19).replace("T", " ")}
              </span>
              <span className="text-mute text-xs font-mono">{e.source}</span>
              <span className="truncate">{e.message}</span>
              <span className={`ml-auto text-xs px-1.5 py-0.5 rounded border ${
                e.resolution === "fixed" ? "border-ok/40 text-ok" :
                e.resolution === "unresolved" ? "border-err/40 text-err" :
                "border-mute/40 text-mute"
              }`}>
                {e.resolution}
              </span>
            </summary>
            <div className="mt-3 space-y-2">
              {e.stack && (
                <pre className="text-xs whitespace-pre-wrap bg-bg border border-border rounded p-2 font-mono">
                  {e.stack}
                </pre>
              )}
              {e.requestContext != null && (
                <pre className="text-xs whitespace-pre-wrap bg-bg border border-border rounded p-2 font-mono">
                  {JSON.stringify(e.requestContext, null, 2)}
                </pre>
              )}
              {e.fixApplied && (
                <div className="text-xs">
                  <span className="text-ok">Fix applied:</span> {e.fixApplied}
                </div>
              )}
            </div>
          </details>
        ))}
        {!data.length && <p className="text-mute italic">No errors logged.</p>}
      </div>
    </main>
  );
}
