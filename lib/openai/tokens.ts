import { and, eq, isNull } from "drizzle-orm";
import { db } from "@/db/client";
import { oauthTokens } from "@/db/schema";
import { encrypt, decrypt } from "@/lib/crypto";
import { refreshTokens, type TokenExchangeResponse } from "./oauth";

const PROVIDER = "openai-codex";
// Refresh tokens this many seconds before they actually expire, to absorb clock skew.
const REFRESH_SKEW_SECONDS = 120;

export type StoredTokens = {
  access: string;
  refresh: string;
  expiresAt: Date;
  accountId: string | null;
};

/**
 * Persist a fresh OAuth token bundle. ownerUserId is the admin who authorized.
 * Pass null for the shared "house" token (single subscription used by all 8 users).
 */
export async function storeTokens(opts: {
  ownerUserId: string | null;
  accountId: string | null;
  bundle: TokenExchangeResponse;
}): Promise<void> {
  const expiresAt = new Date(Date.now() + opts.bundle.expires_in * 1000);
  await db
    .insert(oauthTokens)
    .values({
      provider: PROVIDER,
      ownerUserId: opts.ownerUserId,
      accountId: opts.accountId ?? opts.bundle.account_id ?? null,
      accessEncrypted: encrypt(opts.bundle.access_token),
      refreshEncrypted: encrypt(opts.bundle.refresh_token),
      expiresAt,
    })
    .onConflictDoUpdate({
      target: [oauthTokens.provider, oauthTokens.ownerUserId],
      set: {
        accountId: opts.accountId ?? opts.bundle.account_id ?? null,
        accessEncrypted: encrypt(opts.bundle.access_token),
        refreshEncrypted: encrypt(opts.bundle.refresh_token),
        expiresAt,
        rotatedAt: new Date(),
      },
    });
}

async function readRow(ownerUserId: string | null) {
  const rows = await db
    .select()
    .from(oauthTokens)
    .where(
      and(
        eq(oauthTokens.provider, PROVIDER),
        ownerUserId === null
          ? isNull(oauthTokens.ownerUserId)
          : eq(oauthTokens.ownerUserId, ownerUserId)
      )
    )
    .limit(1);
  return rows[0] ?? null;
}

/**
 * Get a valid access token, refreshing automatically if needed.
 * If ownerUserId is null, reads the shared "house" token row.
 * Throws if no tokens have been provisioned yet.
 */
export async function getValidAccessToken(
  ownerUserId: string | null = null
): Promise<StoredTokens> {
  const row = await readRow(ownerUserId);
  if (!row) {
    throw new Error(
      `[oauth] no codex tokens stored for owner=${ownerUserId ?? "house"}. ` +
        `Run the OAuth flow at /admin/oauth or POST /api/oauth/bootstrap.`
    );
  }

  const access = decrypt(row.accessEncrypted);
  const refresh = decrypt(row.refreshEncrypted);
  const secondsLeft = Math.floor((row.expiresAt.getTime() - Date.now()) / 1000);

  if (secondsLeft > REFRESH_SKEW_SECONDS) {
    return {
      access,
      refresh,
      expiresAt: row.expiresAt,
      accountId: row.accountId,
    };
  }

  // refresh
  const fresh = await refreshTokens(refresh);
  await storeTokens({
    ownerUserId,
    accountId: row.accountId,
    bundle: fresh,
  });
  return {
    access: fresh.access_token,
    refresh: fresh.refresh_token,
    expiresAt: new Date(Date.now() + fresh.expires_in * 1000),
    accountId: row.accountId,
  };
}

export async function getTokenStatus(ownerUserId: string | null = null) {
  const row = await readRow(ownerUserId);
  if (!row) return { connected: false as const };
  const secondsLeft = Math.floor((row.expiresAt.getTime() - Date.now()) / 1000);
  return {
    connected: true as const,
    accountId: row.accountId,
    expiresAt: row.expiresAt,
    secondsLeft,
    rotatedAt: row.rotatedAt,
  };
}
