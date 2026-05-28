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

export function TopicSidebar() {
  return (
    <aside className="bg-panel border-r border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-sm font-semibold text-mute uppercase tracking-wide">
          Topics
        </h2>
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
      <footer className="p-4 border-t border-border text-xs text-mute">
        Topics auto-populate once the Oracle docs ingest runs (Phase 4).
      </footer>
    </aside>
  );
}
