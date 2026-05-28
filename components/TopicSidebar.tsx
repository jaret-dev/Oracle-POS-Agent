import Link from "next/link";

const PLACEHOLDER_TOPICS = [
  { slug: "menu-items", label: "Menu items & modifiers" },
  { slug: "discounts", label: "Discounts & promotions" },
  { slug: "tenders", label: "Tenders & payment" },
  { slug: "employees", label: "Employees & permissions" },
  { slug: "reporting", label: "Reporting & Analytics (R&A)" },
  { slug: "kds", label: "Kitchen Display (KDS)" },
  { slug: "hardware", label: "Workstation / printer hardware" },
  { slug: "eod", label: "End-of-day & polling" },
];

type Props = {
  user: { name: string; role: "admin" | "store"; storeNumber: string | null } | null;
  signOutAction: () => Promise<void>;
};

export function TopicSidebar({ user, signOutAction }: Props) {
  return (
    <aside className="bg-panel border-r border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-mute uppercase tracking-wide">
            Topics
          </h2>
          {user?.role === "admin" && (
            <Link
              href="/admin"
              className="text-xs text-accent hover:underline"
            >
              Admin →
            </Link>
          )}
        </div>
        <p className="text-xs text-mute mt-1">
          Pick one to pre-load context from the knowledge base.
        </p>
      </div>
      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {PLACEHOLDER_TOPICS.map((t) => (
          <button
            key={t.slug}
            className="w-full text-left px-3 py-2 rounded hover:bg-bg border border-transparent hover:border-border text-sm"
          >
            {t.label}
          </button>
        ))}
      </nav>
      <footer className="p-4 border-t border-border space-y-2">
        {user ? (
          <div className="text-xs">
            <div className="text-ink">{user.name}</div>
            <div className="text-mute">
              {user.role === "admin" ? "Admin" : `Store ${user.storeNumber ?? ""}`}
            </div>
          </div>
        ) : (
          <div className="text-xs text-mute">Not signed in</div>
        )}
        {user && (
          <form action={signOutAction}>
            <button
              type="submit"
              className="w-full text-xs px-2 py-1 rounded border border-border hover:border-mute text-mute hover:text-ink"
            >
              Sign out
            </button>
          </form>
        )}
        <p className="text-xs text-mute opacity-70 pt-1">
          Topics auto-populate once the Oracle docs ingest runs (Phase 4).
        </p>
      </footer>
    </aside>
  );
}
