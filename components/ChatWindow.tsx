"use client";

import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { CorrectionDialog } from "./CorrectionDialog";
import { sourceLabel } from "@/lib/sources";

// Render markdown links as new-tab, accent-styled links (used for inline citations).
const MD_COMPONENTS = {
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-accent underline underline-offset-2 hover:opacity-80"
    >
      {children}
    </a>
  ),
};

type Citation = { id: number; source: string; title: string | null; url: string | null };

type Message = {
  id: string;
  /** Set on assistant messages once the server returns; used to anchor corrections. */
  serverMessageId?: string;
  role: "user" | "assistant" | "system";
  content: string;
  imageUrls?: string[];
  citations?: Citation[];
  error?: boolean;
};

type Props = {
  user: { id: string; role: "admin" | "store" } | null;
};

export function ChatWindow({ user }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [pendingUploads, setPendingUploads] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [correctingMessageId, setCorrectingMessageId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function uploadFile(file: File) {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? `upload ${res.status}`);
      setPendingUploads((u) => [...u, json.url as string]);
    } catch (e) {
      alert(`Upload failed: ${(e as Error).message}`);
    } finally {
      setUploading(false);
    }
  }

  function onFilePick(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    for (const f of files) void uploadFile(f);
    e.target.value = "";
  }

  function onPaste(e: React.ClipboardEvent) {
    const files = Array.from(e.clipboardData.files);
    if (!files.length) return;
    e.preventDefault();
    for (const f of files) void uploadFile(f);
  }

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() && !pendingUploads.length) return;
    if (pending) return;

    const userMsgId = crypto.randomUUID();
    setMessages((m) => [
      ...m,
      {
        id: userMsgId,
        role: "user",
        content: input,
        imageUrls: pendingUploads.length ? [...pendingUploads] : undefined,
      },
    ]);
    const sendText = input;
    const sendImages = pendingUploads;
    setInput("");
    setPendingUploads([]);
    setPending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId: conversationId ?? undefined,
          text: sendText,
          imageUrls: sendImages,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? `status ${res.status}`);
      setConversationId(json.conversationId);
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          serverMessageId: json.assistantMessageId,
          role: "assistant",
          content: json.reply,
          citations: json.retrieved as Citation[],
        },
      ]);
    } catch (e) {
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: `Error: ${(e as Error).message}`,
          error: true,
        },
      ]);
    } finally {
      setPending(false);
    }
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
        <div className="text-xs text-mute">
          {user ? `${user.role}` : "not signed in"}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 && (
          <p className="text-mute text-sm italic">
            Describe the issue. Paste a screenshot if it&apos;s a screen or menu problem.
          </p>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={
              m.role === "user"
                ? "ml-auto max-w-[75%] space-y-2"
                : "max-w-[85%] space-y-2"
            }
          >
            <div
              className={
                m.role === "user"
                  ? "bg-accent text-bg rounded-lg px-4 py-2"
                  : m.error
                  ? "bg-bg border border-err/40 text-err rounded-lg px-4 py-2 font-mono text-sm whitespace-pre-wrap"
                  : "bg-panel border border-border rounded-lg px-4 py-3 prose prose-invert prose-sm max-w-none"
              }
            >
              {m.role === "assistant" && !m.error ? (
                <ReactMarkdown components={MD_COMPONENTS}>{m.content}</ReactMarkdown>
              ) : (
                <span className="whitespace-pre-wrap">{m.content}</span>
              )}
            </div>
            {m.imageUrls?.length ? (
              <div className="flex gap-2 flex-wrap">
                {m.imageUrls.map((url) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={url}
                    src={url}
                    alt="attachment"
                    className="max-h-48 rounded border border-border"
                  />
                ))}
              </div>
            ) : null}
            {m.citations?.length ? (
              <details className="text-xs text-mute">
                <summary className="cursor-pointer hover:text-ink">
                  {m.citations.length} source{m.citations.length === 1 ? "" : "s"}
                </summary>
                <ul className="mt-1 space-y-0.5">
                  {m.citations.map((c) => (
                    <li key={c.id}>
                      <span className="text-accent">[{sourceLabel(c.source)}]</span>{" "}
                      {c.url ? (
                        <a href={c.url} target="_blank" rel="noreferrer" className="hover:underline">
                          {c.title ?? c.url}
                        </a>
                      ) : (
                        c.title ?? `chunk #${c.id}`
                      )}
                    </li>
                  ))}
                </ul>
              </details>
            ) : null}
            {m.role === "assistant" && !m.error && m.serverMessageId && user?.role === "admin" && (
              <button
                onClick={() => setCorrectingMessageId(m.serverMessageId ?? null)}
                className="text-xs text-mute hover:text-accent"
              >
                Correct this
              </button>
            )}
          </div>
        ))}
        {pending && (
          <div className="max-w-[75%] bg-panel border border-border rounded-lg px-4 py-2 text-mute text-sm">
            Thinking…
          </div>
        )}
      </div>

      <form onSubmit={send} className="border-t border-border p-4 space-y-2">
        {pendingUploads.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {pendingUploads.map((url) => (
              <div key={url} className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="upload" className="h-16 rounded border border-border" />
                <button
                  type="button"
                  onClick={() => setPendingUploads((u) => u.filter((x) => x !== url))}
                  className="absolute -top-1 -right-1 bg-err text-bg rounded-full w-5 h-5 text-xs"
                  aria-label="remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-2 items-end">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={onFilePick}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading || pending}
            title="Attach image or screenshot (or paste from clipboard)"
            className="px-3 py-2 rounded border border-border text-mute hover:text-ink disabled:opacity-50"
          >
            {uploading ? "↑" : "+"}
          </button>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onPaste={onPaste}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send(e as unknown as React.FormEvent);
              }
            }}
            rows={1}
            disabled={pending}
            placeholder="Describe the issue. ⌘V to paste a screenshot."
            className="flex-1 bg-panel border border-border rounded px-3 py-2 resize-none outline-none focus:border-accent disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={pending || (!input.trim() && !pendingUploads.length)}
            className="px-4 py-2 bg-accent hover:bg-accentMute disabled:opacity-50 text-bg font-medium rounded"
          >
            Send
          </button>
        </div>
      </form>
      {correctingMessageId && (
        <CorrectionDialog
          messageId={correctingMessageId}
          onClose={() => setCorrectingMessageId(null)}
          onDone={(slug) => {
            setCorrectingMessageId(null);
            setMessages((m) => [
              ...m,
              {
                id: crypto.randomUUID(),
                role: "system",
                content: `Correction submitted. Skill "${slug}" drafted — review at /admin/skills.`,
              },
            ]);
          }}
        />
      )}
    </section>
  );
}
