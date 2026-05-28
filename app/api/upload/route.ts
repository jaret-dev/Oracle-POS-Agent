import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { auth } from "@/auth";
import { logError } from "@/lib/log";

export const runtime = "nodejs";

const ALLOWED = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]);
const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "file field required" }, { status: 400 });
    }
    if (!ALLOWED.has(file.type)) {
      return NextResponse.json({ error: `unsupported type: ${file.type}` }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: `max ${MAX_BYTES} bytes` }, { status: 413 });
    }

    const key = `chat/${session.user.id}/${Date.now()}-${file.name.replace(/[^a-z0-9._-]+/gi, "_")}`;
    const blob = await put(key, file, { access: "public", addRandomSuffix: false });
    return NextResponse.json({ url: blob.url, key: blob.pathname });
  } catch (e) {
    const err = e instanceof Error ? e : new Error(String(e));
    await logError({
      severity: "error",
      source: "api.upload",
      message: err.message,
      stack: err.stack,
      userId: session.user.id,
    });
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
