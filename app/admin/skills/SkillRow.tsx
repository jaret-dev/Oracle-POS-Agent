"use client";

import { useState } from "react";

type Skill = {
  id: number;
  slug: string;
  title: string;
  body: string;
  status: "proposed" | "approved" | "rejected" | "retired";
  createdAt: Date;
  approvedAt: Date | null;
  approvedByName: string | null;
};

export function SkillRow({ skill }: { skill: Skill }) {
  const [status, setStatus] = useState(skill.status);
  const [working, setWorking] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  async function act(action: "approve" | "reject" | "retire") {
    setWorking(action);
    setErr(null);
    try {
      const res = await fetch(`/api/skills/${skill.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? `status ${res.status}`);
      setStatus(action === "approve" ? "approved" : action === "reject" ? "rejected" : "retired");
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setWorking(null);
    }
  }

  const badge =
    status === "approved"
      ? "bg-ok/15 text-ok border-ok/40"
      : status === "proposed"
      ? "bg-accent/15 text-accent border-accent/40"
      : status === "rejected"
      ? "bg-err/15 text-err border-err/40"
      : "bg-mute/15 text-mute border-mute/40";

  return (
    <article className="border border-border rounded bg-panel p-4 space-y-2">
      <header className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{skill.title}</h3>
            <span className={`text-xs px-1.5 py-0.5 rounded border ${badge}`}>{status}</span>
          </div>
          <p className="text-xs text-mute font-mono">{skill.slug}</p>
        </div>
        <div className="flex gap-2 shrink-0">
          {status === "proposed" && (
            <>
              <button
                onClick={() => act("approve")}
                disabled={working !== null}
                className="px-3 py-1 text-sm bg-ok hover:opacity-90 disabled:opacity-50 text-bg rounded"
              >
                {working === "approve" ? "Approving…" : "Approve"}
              </button>
              <button
                onClick={() => act("reject")}
                disabled={working !== null}
                className="px-3 py-1 text-sm bg-err hover:opacity-90 disabled:opacity-50 text-bg rounded"
              >
                Reject
              </button>
            </>
          )}
          {status === "approved" && (
            <button
              onClick={() => act("retire")}
              disabled={working !== null}
              className="px-3 py-1 text-sm border border-border hover:border-mute text-mute rounded"
            >
              Retire
            </button>
          )}
        </div>
      </header>
      <button onClick={() => setExpanded((x) => !x)} className="text-xs text-mute hover:text-ink">
        {expanded ? "Hide body" : "Show body"}
      </button>
      {expanded && (
        <pre className="text-xs whitespace-pre-wrap bg-bg border border-border rounded p-3 font-mono">
          {skill.body}
        </pre>
      )}
      {err && <p className="text-err text-xs">{err}</p>}
    </article>
  );
}
