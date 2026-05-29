/**
 * Keyword-search loader (no embeddings / no API key).
 * Walks every .md under memory/, chunks each doc by heading (~800 tokens), inserts
 * the chunks into memory_chunks with embedding = NULL. The DB trigger fills
 * content_tsv, so retrieve() works in its BM25 (full-text) branch.
 *
 * Usage:
 *   POSTGRES_URL=... tsx scripts/load-docs-bm25.ts          # add/replace oracle docs
 *   POSTGRES_URL=... tsx scripts/load-docs-bm25.ts --force  # truncate doc chunks first
 */
import { readFile, readdir } from "node:fs/promises";
import { join, relative } from "node:path";
import matter from "gray-matter";
import { db } from "../db/client";
import { memoryChunks } from "../db/schema";
import { sql } from "drizzle-orm";

const ROOT = join(process.cwd(), "memory");
const CHUNK_TOKENS = 800;
const FORCE = process.argv.includes("--force");

type Src = "sipou" | "simmu" | "rause" | "skill" | "store" | "user";

const approxTokens = (s: string) => Math.ceil(s.length / 4);

function chunkMarkdown(md: string, title: string): Array<{ section: string; content: string }> {
  const sections: Array<{ heading: string; body: string }> = [];
  let heading = title;
  let buf: string[] = [];
  const flush = () => {
    if (buf.join("").trim()) sections.push({ heading, body: buf.join("\n").trim() });
    buf = [];
  };
  for (const line of md.split("\n")) {
    const h = line.match(/^(#{1,4})\s+(.+?)\s*$/);
    if (h) { flush(); heading = h[2]; } else buf.push(line);
  }
  flush();

  const out: Array<{ section: string; content: string }> = [];
  let acc: { section: string; content: string } | null = null;
  for (const s of sections) {
    const piece = `## ${s.heading}\n\n${s.body}`;
    if (!s.body.trim()) continue;
    if (!acc) { acc = { section: s.heading, content: piece }; continue; }
    if (approxTokens(acc.content) + approxTokens(piece) > CHUNK_TOKENS) {
      out.push(acc);
      acc = { section: s.heading, content: piece };
    } else {
      acc.content += `\n\n${piece}`;
    }
  }
  if (acc) out.push(acc);
  return out;
}

async function* walk(dir: string): AsyncGenerator<string> {
  for (const ent of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name.startsWith(".")) continue;
      yield* walk(p);
    } else if (ent.isFile() && ent.name.endsWith(".md") && !ent.name.startsWith("MEMORY")) {
      yield p;
    }
  }
}

function srcFromPath(p: string): Src {
  if (p.includes("/oracle/sipou/")) return "sipou";
  if (p.includes("/oracle/simmu/")) return "simmu";
  if (p.includes("/oracle/rause/")) return "rause";
  if (p.includes("/skills/")) return "skill";
  if (p.includes("/stores/")) return "store";
  if (p.includes("/users/")) return "user";
  return "sipou";
}

async function main() {
  if (!process.env.POSTGRES_URL && !process.env.DATABASE_URL)
    throw new Error("POSTGRES_URL or DATABASE_URL required");

  if (FORCE) {
    console.log("[bm25] --force: removing existing oracle doc chunks");
    await db.execute(sql`DELETE FROM memory_chunks WHERE source IN ('sipou','simmu','rause')`);
  }

  let batch: (typeof memoryChunks.$inferInsert)[] = [];
  let total = 0;
  const flush = async () => {
    if (!batch.length) return;
    await db.insert(memoryChunks).values(batch);
    total += batch.length;
    batch = [];
    if (total % 500 < 100) console.log(`[bm25] ${total} chunks inserted`);
  };

  for await (const file of walk(ROOT)) {
    const rel = relative(process.cwd(), file);
    const { data, content } = matter(await readFile(file, "utf8"));
    const title = (data.title as string) ?? null;
    const chunks = chunkMarkdown(content, title ?? "untitled");
    for (let i = 0; i < chunks.length; i++) {
      batch.push({
        source: srcFromPath(rel),
        sourceUrl: (data.url as string) ?? null,
        sectionPath: chunks[i].section,
        markdownPath: rel,
        title,
        content: chunks[i].content,
        chunkOrder: i,
      });
      if (batch.length >= 100) await flush();
    }
  }
  await flush();

  const res = await db.execute<{ n: number }>(sql`SELECT COUNT(*)::int n FROM memory_chunks`);
  console.log(`[bm25] done. inserted=${total}; memory_chunks total=${res.rows[0]?.n ?? "?"}`);
  process.exit(0);
}

main().catch((e) => {
  console.error("[bm25] FAILED:", e.message ?? e);
  process.exit(1);
});
