/**
 * Loads /memory/_embeddings.jsonl into Postgres memory_chunks.
 * - upserts on (markdown_path, chunk_order): re-running with --force replaces.
 * - assumes the 0000_init.sql migration has been applied.
 *
 * Usage:
 *   POSTGRES_URL=... npm run db:load-embeddings
 *   POSTGRES_URL=... npm run db:load-embeddings -- --force
 */
import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { join } from "node:path";
import { db } from "../db/client";
import { memoryChunks } from "../db/schema";
import { sql } from "drizzle-orm";

const PATH = join(process.cwd(), "memory", "_embeddings.jsonl");
const FORCE = process.argv.includes("--force");

type Row = {
  source: "sipou" | "simmu" | "rause" | "skill" | "store" | "user";
  source_url: string | null;
  section_path: string;
  markdown_path: string;
  title: string | null;
  chunk_order: number;
  content: string;
  embedding: number[];
};

function vecLiteral(v: number[]): string {
  return `[${v.join(",")}]`;
}

async function main() {
  if (!process.env.POSTGRES_URL && !process.env.DATABASE_URL)
    throw new Error("POSTGRES_URL or DATABASE_URL is required");

  if (FORCE) {
    console.log("[load] --force: truncating memory_chunks");
    await db.execute(sql`TRUNCATE TABLE memory_chunks RESTART IDENTITY`);
  }

  const stream = createReadStream(PATH, { encoding: "utf8" });
  const rl = createInterface({ input: stream });

  let total = 0;
  let buf: Row[] = [];
  const BATCH = 200;

  async function flush() {
    if (!buf.length) return;
    // Build a multi-row INSERT … VALUES (…) statement using parameterized vector literals.
    // Drizzle's typed insert doesn't yet support pgvector literals natively, so we
    // construct a raw SQL with sql`` placeholders.
    const values = buf.map((r) => sql`(
      ${r.source}::memory_source,
      ${r.source_url},
      ${r.section_path},
      ${r.markdown_path},
      ${r.title},
      ${r.content},
      ${vecLiteral(r.embedding)}::vector,
      ${r.chunk_order}
    )`);
    const stmt = sql`INSERT INTO memory_chunks
      (source, source_url, section_path, markdown_path, title, content, embedding, chunk_order)
      VALUES ${sql.join(values, sql`, `)}`;
    await db.execute(stmt);
    total += buf.length;
    buf = [];
    if (total % 1000 < BATCH) console.log(`[load] ${total} rows inserted`);
  }

  for await (const line of rl) {
    if (!line.trim()) continue;
    try {
      const row = JSON.parse(line) as Row;
      buf.push(row);
      if (buf.length >= BATCH) await flush();
    } catch (e) {
      console.warn("[load] malformed line skipped:", (e as Error).message);
    }
  }
  await flush();

  console.log(`[load] done. ${total} chunks in memory_chunks`);
  process.exit(0);
}

main().catch((e) => {
  console.error("[load] FAILED:", e);
  process.exit(1);
});
