"use client";

import { useState } from "react";

export function OauthBootstrapForm() {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ ok?: boolean; error?: string } | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);
    const fd = new FormData(e.currentTarget);
    const body = {
      access_token: String(fd.get("access_token") ?? "").trim(),
      refresh_token: String(fd.get("refresh_token") ?? "").trim(),
      expires_in: Number(fd.get("expires_in") ?? 0),
      account_id: String(fd.get("account_id") ?? "").trim() || null,
    };
    try {
      const res = await fetch("/api/oauth/bootstrap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? `status ${res.status}`);
      setResult({ ok: true });
      // Refresh page state so the status block re-reads.
      setTimeout(() => location.reload(), 500);
    } catch (e) {
      setResult({ error: (e as Error).message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <label className="block space-y-1">
        <span className="text-sm text-mute">access_token</span>
        <textarea
          name="access_token"
          required
          rows={3}
          className="w-full bg-bg border border-border rounded px-3 py-2 font-mono text-xs outline-none focus:border-accent"
        />
      </label>
      <label className="block space-y-1">
        <span className="text-sm text-mute">refresh_token</span>
        <textarea
          name="refresh_token"
          required
          rows={3}
          className="w-full bg-bg border border-border rounded px-3 py-2 font-mono text-xs outline-none focus:border-accent"
        />
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className="block space-y-1">
          <span className="text-sm text-mute">expires_in (seconds)</span>
          <input
            name="expires_in"
            type="number"
            required
            defaultValue={3600}
            className="w-full bg-bg border border-border rounded px-3 py-2 font-mono outline-none focus:border-accent"
          />
        </label>
        <label className="block space-y-1">
          <span className="text-sm text-mute">account_id (optional)</span>
          <input
            name="account_id"
            className="w-full bg-bg border border-border rounded px-3 py-2 font-mono outline-none focus:border-accent"
          />
        </label>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-accent hover:bg-accentMute disabled:opacity-60 text-bg font-medium rounded"
        >
          {submitting ? "Storing…" : "Store tokens"}
        </button>
        {result?.ok && <span className="text-ok text-sm">Stored. Reloading…</span>}
        {result?.error && <span className="text-err text-sm">{result.error}</span>}
      </div>
    </form>
  );
}
