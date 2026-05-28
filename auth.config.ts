import type { NextAuthConfig } from "next-auth";

type Role = "admin" | "store";

export type AppUser = {
  id: string;
  username: string;
  role: Role;
  storeNumber: string | null;
};

declare module "next-auth" {
  interface Session {
    user: AppUser & import("next-auth").DefaultSession["user"];
  }
}

// Edge-safe: no providers that pull in Node-only modules (bcrypt, pg, etc.).
// The full credentials provider lives in auth.ts and is only used in Node runtime.
export const authConfig = {
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 14 },
  pages: { signIn: "/login" },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as unknown as AppUser;
        token.uid = u.id;
        token.username = u.username;
        token.role = u.role;
        token.storeNumber = u.storeNumber;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.uid as string;
      session.user.username = token.username as string;
      session.user.role = token.role as Role;
      session.user.storeNumber = (token.storeNumber as string | null) ?? null;
      return session;
    },
  },
} satisfies NextAuthConfig;
