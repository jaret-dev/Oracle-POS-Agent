import { NextResponse, type NextRequest } from "next/server";

/**
 * Edge middleware: lightweight "are you signed in?" redirect ONLY.
 *
 * It deliberately does NOT call NextAuth here. Constructing the Auth.js
 * instance in the edge runtime is what produced MIDDLEWARE_INVOCATION_FAILED
 * on Vercel when the secret wasn't resolvable at the edge. Instead we just
 * check for the presence of the session cookie — a string check that cannot
 * throw — and redirect to /login when it's absent.
 *
 * The authoritative auth (verifying the JWT, checking the password, and
 * gating /admin to admins) all happens server-side in the Node runtime:
 *   - app/admin/layout.tsx       → auth() + role check
 *   - app/chat/page.tsx          → auth()
 *   - every /api/* route handler → auth()
 * So a forged or stale cookie gets rejected there; the worst this edge check
 * can do is let an unauthenticated request reach a page that then redirects.
 */

const PUBLIC_PATHS = ["/login", "/api/auth", "/api/health", "/api/cron"];

// Auth.js v5 session cookie names: plain over http (local), __Secure- over https (prod).
const SESSION_COOKIES = [
  "authjs.session-token",
  "__Secure-authjs.session-token",
];

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return NextResponse.next();
  }

  const signedIn = SESSION_COOKIES.some((name) => req.cookies.has(name));
  if (!signedIn) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
