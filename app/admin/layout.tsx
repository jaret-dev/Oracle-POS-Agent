import Link from "next/link";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

const NAV = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/oauth", label: "OAuth" },
  { href: "/admin/issues", label: "Issues" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/corrections", label: "Corrections" },
  { href: "/admin/errors", label: "Errors" },
  { href: "/admin/eval", label: "Evals" },
  { href: "/chat", label: "← Back to chat" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect("/login");
  if (session.user.role !== "admin") redirect("/chat");

  async function signOutAction() {
    "use server";
    await signOut({ redirectTo: "/login" });
  }

  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr]">
      <aside className="bg-panel border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <h1 className="font-semibold">Admin</h1>
          <p className="text-xs text-mute">{session.user.name}</p>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="block px-3 py-2 rounded hover:bg-bg border border-transparent hover:border-border text-sm"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <form action={signOutAction} className="p-4 border-t border-border">
          <button
            type="submit"
            className="w-full text-xs px-2 py-1 rounded border border-border hover:border-mute text-mute hover:text-ink"
          >
            Sign out
          </button>
        </form>
      </aside>
      <section className="overflow-y-auto">{children}</section>
    </div>
  );
}
