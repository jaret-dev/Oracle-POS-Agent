import { randomBytes, createHash } from "node:crypto";

export const CODEX_OAUTH_AUTHORIZE = "https://auth.openai.com/oauth/authorize";
export const CODEX_OAUTH_TOKEN = "https://auth.openai.com/oauth/token";
// Public Codex CLI client_id used by OpenAI's first-party tools and the
// `openai-oauth` / `opencode-openai-codex-auth` ecosystem. PKCE means no
// client_secret is required.
export const CODEX_CLIENT_ID = "app_EMoamEEZ73f0CkXaXp7hrann";
export const CODEX_SCOPES = ["openid", "profile", "email", "offline_access"];

export function newPkcePair() {
  const verifier = base64url(randomBytes(48));
  const challenge = base64url(createHash("sha256").update(verifier).digest());
  return { verifier, challenge };
}

export function newState() {
  return base64url(randomBytes(24));
}

export function authorizeUrl(opts: {
  redirectUri: string;
  state: string;
  codeChallenge: string;
}): string {
  const u = new URL(CODEX_OAUTH_AUTHORIZE);
  u.searchParams.set("response_type", "code");
  u.searchParams.set("client_id", CODEX_CLIENT_ID);
  u.searchParams.set("redirect_uri", opts.redirectUri);
  u.searchParams.set("scope", CODEX_SCOPES.join(" "));
  u.searchParams.set("state", opts.state);
  u.searchParams.set("code_challenge", opts.codeChallenge);
  u.searchParams.set("code_challenge_method", "S256");
  return u.toString();
}

export type TokenExchangeResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: "Bearer";
  id_token?: string;
  account_id?: string;
};

export async function exchangeCodeForTokens(opts: {
  code: string;
  redirectUri: string;
  codeVerifier: string;
}): Promise<TokenExchangeResponse> {
  const res = await fetch(CODEX_OAUTH_TOKEN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "authorization_code",
      client_id: CODEX_CLIENT_ID,
      code: opts.code,
      redirect_uri: opts.redirectUri,
      code_verifier: opts.codeVerifier,
    }),
  });
  if (!res.ok) {
    throw new Error(
      `[oauth] code exchange failed: ${res.status} ${await res.text()}`
    );
  }
  return (await res.json()) as TokenExchangeResponse;
}

export async function refreshTokens(refreshToken: string): Promise<TokenExchangeResponse> {
  const res = await fetch(CODEX_OAUTH_TOKEN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "refresh_token",
      client_id: CODEX_CLIENT_ID,
      refresh_token: refreshToken,
      scope: CODEX_SCOPES.join(" "),
    }),
  });
  if (!res.ok) {
    throw new Error(
      `[oauth] refresh failed: ${res.status} ${await res.text()}`
    );
  }
  return (await res.json()) as TokenExchangeResponse;
}

function base64url(buf: Buffer): string {
  return buf
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}
