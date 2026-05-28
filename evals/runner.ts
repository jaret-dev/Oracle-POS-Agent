/**
 * Karpathy-style eval harness. Reads /evals/scenarios.jsonl, runs each
 * scenario through the live /api/chat endpoint (must be running locally
 * or pointed at a deploy), and writes /evals/results.jsonl.
 *
 * Usage:
 *   BASE_URL=http://localhost:3000 EVAL_USERNAME=JaretF EVAL_PASSWORD=OraclePOS2026! npm run evals:run
 *
 * The runner logs in via NextAuth credentials and then issues each
 * scenario as a chat message. judge.ts grades the results.
 */
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const USER = process.env.EVAL_USERNAME ?? "JaretF";
const PASS = process.env.EVAL_PASSWORD ?? "OraclePOS2026!";

type Scenario = {
  id: string;
  category: string;
  question: string;
  expected_facts: string[];
  source_hint: string;
};

type Result = Scenario & {
  reply: string;
  retrieved: Array<{ source: string; title: string | null }>;
  durationMs: number;
  error?: string;
};

async function login(): Promise<string> {
  // 1. Hit the csrf endpoint to get a cookie + token
  const csrfRes = await fetch(`${BASE}/api/auth/csrf`, { redirect: "manual" });
  const csrfJson = (await csrfRes.json()) as { csrfToken: string };
  const csrfCookie = csrfRes.headers.get("set-cookie") ?? "";

  // 2. Sign in
  const signinRes = await fetch(`${BASE}/api/auth/callback/credentials`, {
    method: "POST",
    redirect: "manual",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: csrfCookie,
    },
    body: new URLSearchParams({
      csrfToken: csrfJson.csrfToken,
      username: USER,
      password: PASS,
      callbackUrl: `${BASE}/chat`,
    }),
  });
  const setCookies = signinRes.headers.getSetCookie?.() ?? [signinRes.headers.get("set-cookie") ?? ""];
  const cookie = [csrfCookie, ...setCookies].filter(Boolean).join("; ");
  if (!cookie.includes("authjs") && !cookie.includes("next-auth")) {
    throw new Error(`[eval.login] auth cookie missing; got: ${cookie.slice(0, 200)}`);
  }
  return cookie;
}

async function runOne(cookie: string, s: Scenario): Promise<Result> {
  const start = Date.now();
  try {
    const res = await fetch(`${BASE}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Cookie: cookie },
      body: JSON.stringify({ text: s.question }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error ?? `status ${res.status}`);
    return {
      ...s,
      reply: json.reply,
      retrieved: json.retrieved ?? [],
      durationMs: Date.now() - start,
    };
  } catch (e) {
    return {
      ...s,
      reply: "",
      retrieved: [],
      durationMs: Date.now() - start,
      error: (e as Error).message,
    };
  }
}

async function main() {
  console.log(`[eval] base=${BASE} user=${USER}`);
  const raw = await readFile(join(process.cwd(), "evals", "scenarios.jsonl"), "utf8");
  const scenarios = raw
    .split("\n")
    .filter((l) => l.trim())
    .map((l) => JSON.parse(l) as Scenario);

  const cookie = await login();
  console.log(`[eval] logged in. running ${scenarios.length} scenarios…`);

  const results: Result[] = [];
  for (const s of scenarios) {
    process.stdout.write(`  ${s.id}…`);
    const r = await runOne(cookie, s);
    results.push(r);
    process.stdout.write(r.error ? ` FAILED (${r.error})\n` : ` ${r.durationMs}ms\n`);
  }

  const outPath = join(process.cwd(), "evals", "results.jsonl");
  await writeFile(outPath, results.map((r) => JSON.stringify(r)).join("\n") + "\n", "utf8");
  console.log(`[eval] wrote ${results.length} results → evals/results.jsonl. next: npm run evals:judge`);
}

main().catch((e) => {
  console.error("[eval] FAILED:", e);
  process.exit(1);
});
