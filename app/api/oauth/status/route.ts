import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getTokenStatus } from "@/lib/openai/tokens";

export const runtime = "nodejs";

export async function GET() {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "admin only" }, { status: 403 });
  }
  try {
    const status = await getTokenStatus(null);
    return NextResponse.json(status);
  } catch (e) {
    return NextResponse.json(
      { connected: false, error: (e as Error).message },
      { status: 500 }
    );
  }
}
