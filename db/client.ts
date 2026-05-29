import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

let cachedPool: Pool | null = null;
let cachedDb: NodePgDatabase<typeof schema> | null = null;

/** Accept whichever name the provider injects. Vercel Postgres uses
 *  POSTGRES_URL; Neon/Supabase marketplace integrations use DATABASE_URL;
 *  and the Vercel storage integration may add a custom prefix (e.g.
 *  STORAGE_URL). As a final fallback we scan every env var for a value
 *  that is literally a postgres connection string, preferring a pooled
 *  endpoint, so the app connects regardless of how the var was named. */
export function resolveDbUrl(): string | undefined {
  const named =
    process.env.POSTGRES_URL ??
    process.env.DATABASE_URL ??
    process.env.POSTGRES_PRISMA_URL ??
    process.env.DATABASE_URL_UNPOOLED ??
    process.env.STORAGE_URL;
  if (named) return named;

  const candidates = Object.values(process.env).filter(
    (v): v is string => typeof v === "string" && /^postgres(ql)?:\/\//.test(v)
  );
  if (candidates.length === 0) return undefined;
  // Prefer a pooled endpoint (Neon marks these with "-pooler") for serverless.
  return candidates.find((v) => v.includes("-pooler")) ?? candidates[0];
}

function getPool(): Pool {
  if (cachedPool) return cachedPool;
  const url = resolveDbUrl();
  if (!url) {
    throw new Error(
      "[db] No database URL found. Set POSTGRES_URL (Vercel) or DATABASE_URL (Neon/Supabase)."
    );
  }
  cachedPool = new Pool({ connectionString: url, max: 10 });
  return cachedPool;
}

// Proxy so that `db.select(...)` lazily resolves the underlying drizzle instance.
// This means importing `db` at module load (e.g. during `next build` page-data
// collection) does NOT require POSTGRES_URL; only an actual query does.
export const db: NodePgDatabase<typeof schema> = new Proxy({} as NodePgDatabase<typeof schema>, {
  get(_target, prop) {
    if (!cachedDb) {
      cachedDb = drizzle(getPool(), { schema });
    }
    return Reflect.get(cachedDb, prop, cachedDb);
  },
});

export { schema };
export type DB = NodePgDatabase<typeof schema>;
