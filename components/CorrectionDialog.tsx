"use client";

import { useState } from "react";

export function CorrectionDialog(props: {
  messageId: string;
  onClose: () => void;
  onDone: (slug: string) => void;
}) {
  const [whatWasWrong, setWhatWasWrong] = useState("");
  const [whatIsCorrect, setWhatIsCorrect] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setErr(null);
    try {
      const res = await fetch("/api/corrections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messageId: props.messageId,
          whatWasWrong,
          whatIsCorrect,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? `status ${res.status}`);
      props.onDone(json.slug);
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 grid place-items-center z-50 p-4"
      role="dialog"
      onClick={(e) => {
        if (e.target === e.currentTarget) props.onClose();
      }}
    >
      <form
        onSubmit={submit}
        className="bg-panel border border-border rounded-lg p-6 w-full max-w-2xl space-y-4"
      >
        <header className="space-y-1">
          <h2 className="text-lg font-semibold">Correct this answer</h2>
          <p className="text-xs text-mute">
            The agent will draft a Skill from your correction and queue it on the admin review page.
            Approved skills override the Oracle docs in future answers.
          </p>
        </header>
        <label className="block space-y-1">
          <span className="text-sm text-mute">What was wrong with the answer?</span>
          <textarea
            value={whatWasWrong}
            onChange={(e) => setWhatWasWrong(e.target.value)}
            required
            minLength={3}
            rows={3}
            className="w-full bg-bg border border-border rounded px-3 py-2 outline-none focus:border-accent"
          />
        </label>
        <label className="block space-y-1">
          <span className="text-sm text-mute">What is the correct answer? (be specific, include exact steps)</span>
          <textarea
            value={whatIsCorrect}
            onChange={(e) => setWhatIsCorrect(e.target.value)}
            required
            minLength={3}
            rows={6}
            className="w-full bg-bg border border-border rounded px-3 py-2 outline-none focus:border-accent"
          />
        </label>
        {err && <p className="text-err text-sm">{err}</p>}
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={props.onClose}
            disabled={submitting}
            className="px-3 py-2 rounded border border-border text-mute hover:text-ink"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 rounded bg-accent hover:bg-accentMute disabled:opacity-60 text-bg font-medium"
          >
            {submitting ? "Drafting skill…" : "Submit correction"}
          </button>
        </div>
      </form>
    </div>
  );
}
