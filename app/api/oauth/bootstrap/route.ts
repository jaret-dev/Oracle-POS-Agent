import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { storeTokens } from "@/lib/openai/tokens";
import { logError } from "@/lib/log";

export const runtime = "nodejs";

const body = z.object({
  access_token: z.string().min(20),
  refresh_token: z.string().min(20),
  expires_in: z.number().int().positive(),
  account_id: z.string().nullable().optional(),
});

/**
 * Admin-only. Paste the OAuth tokens captured from `~/.codex/auth.json`
 * (or the OpenClaw CLI output) directly into the database as the
 * shared "house" token. All chat traffic uses this token.
 */
export async function POST(req: Request) {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "admin only" }, { status: 403 });
  }

  let parsed: z.infer<typeof body>;
  try {
    parsed = body.parse(await req.json());
  } catch (e) {
    return NextResponse.json(
      { error: "invalid body", details: (e as Error).message },
      { status: 400 }
    );
  }

  try {
    await storeTokens({
      ownerUserId: null, // house token
      accountId: parsed.account_id ?? null,
      bundle: {
        access_token: parsed.access_token,
        refresh_token: parsed.refresh_token,
        expires_in: parsed.expires_in,
        token_type: "Bearer",
        account_id: parsed.account_id ?? undefined,
      },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    const err = e instanceof Error ? e : new Error(String(e));
    await logError({
      severity: "error",
      source: "oauth.bootstrap",
      message: err.message,
      stack: err.stack,
      userId: session.user.id,
    });
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
