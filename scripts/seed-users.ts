/**
 * Seed the 9 user accounts (3 admin + 6 store).
 * Idempotent: re-running updates display_name + password_hash for existing usernames.
 *
 * Usage:  POSTGRES_URL=... npm run db:seed
 */
import bcrypt from "bcrypt";
import { db } from "../db/client";
import { users } from "../db/schema";
import { SEED_USERS } from "../db/users";
import { sql } from "drizzle-orm";

async function main() {
  if (!process.env.POSTGRES_URL) {
    throw new Error("POSTGRES_URL must be set");
  }

  console.log(`[seed] upserting ${SEED_USERS.length} users…`);

  for (const u of SEED_USERS) {
    const hash = await bcrypt.hash(u.password, 12);
    await db
      .insert(users)
      .values({
        username: u.username,
        passwordHash: hash,
        role: u.role,
        storeNumber: u.storeNumber,
        displayName: u.displayName,
      })
      .onConflictDoUpdate({
        target: users.username,
        set: {
          passwordHash: hash,
          role: u.role,
          storeNumber: u.storeNumber,
          displayName: u.displayName,
        },
      });
    console.log(`  ✓ ${u.username} (${u.role}${u.storeNumber ? ` / ${u.storeNumber}` : ""})`);
  }

  const result = await db.execute<{ count: number }>(
    sql`SELECT COUNT(*)::int AS count FROM users`
  );
  const count = result.rows[0]?.count ?? 0;
  console.log(`[seed] done. users in db: ${count}`);
  process.exit(0);
}

main().catch((e) => {
  console.error("[seed] FAILED:", e);
  process.exit(1);
});
