/**
 * Reads a Codex CLI auth.json (from `codex login`) and stores the OAuth
 * tokens as the shared "house" token in the oauth_tokens table — encrypted
 * with the same AES-256-GCM path the app uses (lib/crypto + lib/openai/tokens).
 *
 * Usage:
 *   CODEX_HOME=/Users/jaret/.codex-openai \
 *   ENCRYPTION_KEY=... POSTGRES_URL=... \
 *   tsx scripts/load-oauth.ts [path/to/auth.json]
 *
 * If no path is given, uses $CODEX_HOME/auth.json (or ~/.codex/auth.json).
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
import { storeTokens } from "../lib/openai/tokens";

function jwtExpSeconds(jwt: string): number | null {
  try {
    const payload = jwt.split(".")[1];
    if (!payload) return null;
    const json = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return typeof json.exp === "number" ? json.exp : null;
  } catch {
    return null;
  }
}

async function main() {
  if (!process.env.ENCRYPTION_KEY) throw new Error("ENCRYPTION_KEY required");
  if (!process.env.POSTGRES_URL && !process.env.DATABASE_URL)
    throw new Error("POSTGRES_URL or DATABASE_URL required");

  const path =
    process.argv[2] ??
    join(process.env.CODEX_HOME ?? join(homedir(), ".codex"), "auth.json");

  const raw = JSON.parse(readFileSync(path, "utf8")) as {
    tokens?: { access_token?: string; refresh_token?: string; account_id?: string };
  };
  const t = raw.tokens;
  if (!t?.access_token || !t?.refresh_token) {
    throw new Error(`auth.json at ${path} missing tokens.access_token/refresh_token`);
  }

  const nowSec = Math.floor(Date.now() / 1000);
  const exp = jwtExpSeconds(t.access_token);
  const expiresIn = exp ? Math.max(exp - nowSec, 60) : 3600;

  await storeTokens({
    ownerUserId: null, // shared house token used by all users
    accountId: t.account_id ?? null,
    bundle: {
      access_token: t.access_token,
      refresh_token: t.refresh_token,
      expires_in: expiresIn,
      token_type: "Bearer",
      account_id: t.account_id,
    },
  });

  console.log(
    `[load-oauth] stored house token. account_id=${t.account_id ?? "(none)"} ` +
      `expires_in=${expiresIn}s (~${Math.round(expiresIn / 60)}m). refresh is automatic from here.`
  );
  process.exit(0);
}

main().catch((e) => {
  console.error("[load-oauth] FAILED:", e.message ?? e);
  process.exit(1);
});
