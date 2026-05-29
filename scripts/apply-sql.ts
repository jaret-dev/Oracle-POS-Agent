/**
 * Applies a raw .sql file against the database in one shot.
 * Used to run db/migrations/0000_init.sql without needing the psql CLI.
 *
 * The whole file is sent as a single query so Postgres parses the
 * dollar-quoted function bodies (DO $$ ... $$) correctly rather than us
 * naively splitting on semicolons.
 *
 * Usage:
 *   POSTGRES_URL=... npm run db:init
 *   POSTGRES_URL=... tsx scripts/apply-sql.ts db/migrations/0000_init.sql
 */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { Pool } from "pg";
import { resolveDbUrl } from "../db/client";

async function main() {
  const file = process.argv[2] ?? "db/migrations/0000_init.sql";
  const url = resolveDbUrl();
  if (!url) {
    throw new Error("No database URL. Set POSTGRES_URL or DATABASE_URL.");
  }

  const sqlText = await readFile(join(process.cwd(), file), "utf8");
  console.log(`[apply-sql] applying ${file} (${sqlText.length} bytes)…`);

  const pool = new Pool({ connectionString: url, max: 1 });
  try {
    await pool.query(sqlText);
    console.log("[apply-sql] ✓ applied successfully");
  } finally {
    await pool.end();
  }
}

main().catch((e) => {
  console.error("[apply-sql] FAILED:", e.message ?? e);
  process.exit(1);
});
