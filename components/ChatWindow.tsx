"use client";

import { useState } from "react";

type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
};

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "boot",
      role: "system",
      content:
        "Chat backend is not wired yet. Phase 5 connects this to GPT-5.5 via Codex OAuth.",
    },
  ]);
  const [input, setInput] = useState("");

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((m) => [
      ...m,
      { id: crypto.randomUUID(), role: "user", content: input },
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "[stub] Backend not connected. See Phase 5.",
      },
    ]);
    setInput("");
  }

  return (
    <section className="flex flex-col h-screen">
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-semibold">Support chat</h1>
          <p className="text-xs text-mute">
            Facts only. No assumptions. Errors are logged.
          </p>
        </div>
        <div className="text-xs text-mute">Not signed in</div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={
              m.role === "user"
                ? "ml-auto max-w-[75%] bg-accent text-bg rounded-lg px-4 py-2"
                : m.role === "system"
                ? "max-w-[85%] bg-bg border border-warn/40 text-warn rounded-lg px-4 py-2 text-sm"
                : "max-w-[75%] bg-panel border border-border rounded-lg px-4 py-2"
            }
          >
            {m.content}
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSend}
        className="border-t border-border p-4 flex gap-2 items-end"
      >
        <button
          type="button"
          title="Attach image or screenshot (Phase 5)"
          className="px-3 py-2 rounded border border-border text-mute hover:text-ink"
          disabled
        >
          +
        </button>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={1}
          placeholder="Describe the issue. Attach a screenshot for menu/screen problems."
          className="flex-1 bg-panel border border-border rounded px-3 py-2 resize-none outline-none focus:border-accent"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-accent hover:bg-accentMute text-bg font-medium rounded"
        >
          Send
        </button>
      </form>
    </section>
  );
}
