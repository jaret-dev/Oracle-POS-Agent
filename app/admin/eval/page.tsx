export default function AdminEvalPage() {
  return (
    <main className="p-8 max-w-3xl space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Evals</h1>
        <p className="text-sm text-mute">
          Karpathy-style eval harness. Runs scenarios through the live chat endpoint and
          grades replies with GPT-5.5 as judge.
        </p>
      </header>

      <section className="rounded border border-border bg-panel p-4 space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-mute">Run locally</h2>
        <ol className="space-y-2 text-sm">
          <li>
            1. Start the dev server: <code className="font-mono">npm run dev</code>
          </li>
          <li>
            2. Run the harness:
            <pre className="mt-1 bg-bg border border-border rounded p-2 text-xs font-mono whitespace-pre-wrap">
{`BASE_URL=http://localhost:3000 \\
EVAL_USERNAME=JaretF \\
EVAL_PASSWORD=OraclePOS2026! \\
npm run evals:run`}
            </pre>
          </li>
          <li>
            3. Grade the results: <code className="font-mono">npm run evals:judge</code>
          </li>
          <li>
            4. Review <code className="font-mono">evals/judgments.jsonl</code> and
            <code className="font-mono"> evals/proposed-skills.jsonl</code>.
            Promote proposals to real skills via the /admin/skills page.
          </li>
        </ol>
      </section>

      <section className="rounded border border-border bg-panel p-4 space-y-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-mute">Add scenarios</h2>
        <p className="text-sm">
          Each line of <code className="font-mono">evals/scenarios.jsonl</code> is one test
          case. Schema:
        </p>
        <pre className="bg-bg border border-border rounded p-2 text-xs font-mono whitespace-pre-wrap">
{`{
  "id": "unique-kebab-id",
  "category": "discounts" | "employees" | "reporting" | "hardware" | "refusal" | ...,
  "question": "the user query as the agent will see it",
  "expected_facts": ["fact 1 the reply must contain", "fact 2", ...],
  "source_hint": "sipou" | "simmu" | "rause" | "none"
}`}
        </pre>
        <p className="text-xs text-mute">
          Failing scenarios with category=&quot;refusal&quot; verify the agent refuses to invent
          information rather than hallucinating.
        </p>
      </section>
    </main>
  );
}
