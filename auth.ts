import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { users } from "@/db/schema";
import { authConfig } from "@/auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(creds) {
        const username = String(creds?.username ?? "").trim();
        const password = String(creds?.password ?? "");
        if (!username || !password) return null;

        const [row] = await db
          .select()
          .from(users)
          .where(eq(users.username, username))
          .limit(1);

        if (!row || row.disabled) return null;

        const ok = await bcrypt.compare(password, row.passwordHash);
        if (!ok) return null;

        await db
          .update(users)
          .set({ lastLoginAt: new Date() })
          .where(eq(users.id, row.id));

        return {
          id: row.id,
          name: row.displayName ?? row.username,
          username: row.username,
          role: row.role,
          storeNumber: row.storeNumber ?? null,
        };
      },
    }),
  ],
});
