import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

let cachedPool: Pool | null = null;
let cachedDb: NodePgDatabase<typeof schema> | null = null;

function getPool(): Pool {
  if (cachedPool) return cachedPool;
  const url = process.env.POSTGRES_URL;
  if (!url) {
    throw new Error(
      "[db] POSTGRES_URL is not set. Configure it in Vercel env or .env.local."
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
