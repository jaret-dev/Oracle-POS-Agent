import { NextResponse } from "next/server";

export const runtime = "nodejs";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "oracle-pos-agent",
    phase: 1,
    ts: new Date().toISOString(),
  });
}
