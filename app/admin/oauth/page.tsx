import { OauthBootstrapForm } from "./BootstrapForm";
import { getTokenStatus } from "@/lib/openai/tokens";

async function safeStatus() {
  try {
    return await getTokenStatus(null);
  } catch (e) {
    return { connected: false as const, error: (e as Error).message };
  }
}

export default async function AdminOAuthPage() {
  const status = await safeStatus();

  return (
    <main className="p-8 max-w-3xl space-y-8">
      <header>
        <h1 className="text-2xl font-semibold">OpenAI Codex OAuth</h1>
        <p className="text-sm text-mute mt-1">
          The shared house token used by all 8 users for GPT-5.5 inference. Bound to the
          ChatGPT subscription on Jaret&apos;s account.
        </p>
      </header>

      <section className="rounded border border-border bg-panel p-4 space-y-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-mute">Status</h2>
        {status.connected ? (
          <>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-ok" />
              <span className="text-ok">Connected</span>
            </div>
            <dl className="text-sm grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
              <dt className="text-mute">account_id</dt>
              <dd className="font-mono">{status.accountId ?? "—"}</dd>
              <dt className="text-mute">expires_at</dt>
              <dd className="font-mono">{status.expiresAt.toISOString()}</dd>
              <dt className="text-mute">seconds_left</dt>
              <dd className={status.secondsLeft < 0 ? "font-mono text-err" : "font-mono"}>
                {status.secondsLeft}
              </dd>
              <dt className="text-mute">rotated_at</dt>
              <dd className="font-mono">{status.rotatedAt.toISOString()}</dd>
            </dl>
            {status.secondsLeft < 0 && (
              <p className="text-warn text-sm">
                Access token expired; refresh will fire on next request.
              </p>
            )}
          </>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-err" />
              <span className="text-err">Not connected</span>
            </div>
            {"error" in status && status.error && (
              <p className="text-sm text-mute font-mono break-all">{status.error}</p>
            )}
          </>
        )}
      </section>

      <section className="rounded border border-border bg-panel p-4 space-y-4">
        <header>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-mute">
            Bootstrap from Codex CLI
          </h2>
          <p className="text-xs text-mute mt-1">
            1. On your Mac, install Codex CLI and run <code className="font-mono text-ink">codex login</code> (or
            <code className="font-mono text-ink"> openclaw models auth login --provider openai-codex</code>).
            <br />
            2. Open <code className="font-mono text-ink">~/.codex/auth.json</code> and copy
            <code className="font-mono text-ink"> access_token</code>,
            <code className="font-mono text-ink"> refresh_token</code>,
            <code className="font-mono text-ink"> expires_in</code>, and (optionally)
            <code className="font-mono text-ink"> account_id</code> into the fields below.
            <br />
            3. The server stores them AES-256-GCM encrypted in Postgres and refreshes
            automatically before expiry.
          </p>
        </header>
        <OauthBootstrapForm />
      </section>
    </main>
  );
}
