import { notFound } from "next/navigation";
import { db } from "@/db/client";
import { conversations, messages, users } from "@/db/schema";
import { asc, eq } from "drizzle-orm";

export default async function ConversationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [convo] = await db
    .select({
      id: conversations.id,
      title: conversations.title,
      topicSlug: conversations.topicSlug,
      startedAt: conversations.startedAt,
      lastMessageAt: conversations.lastMessageAt,
      userName: users.displayName,
      userUsername: users.username,
      userStore: users.storeNumber,
    })
    .from(conversations)
    .leftJoin(users, eq(users.id, conversations.userId))
    .where(eq(conversations.id, id))
    .limit(1);

  if (!convo) notFound();

  const msgs = await db
    .select()
    .from(messages)
    .where(eq(messages.conversationId, id))
    .orderBy(asc(messages.createdAt));

  return (
    <main className="p-8 max-w-4xl space-y-4">
      <header>
        <h1 className="text-2xl font-semibold">{convo.title ?? "Conversation"}</h1>
        <p className="text-xs text-mute font-mono">{convo.id}</p>
        <p className="text-sm text-mute">
          {convo.userName ?? convo.userUsername} {convo.userStore ? `(${convo.userStore})` : ""} · started{" "}
          {convo.startedAt.toISOString().slice(0, 16).replace("T", " ")}
        </p>
      </header>
      <div className="space-y-3">
        {msgs.map((m) => (
          <div
            key={m.id}
            className={
              m.role === "user"
                ? "ml-auto max-w-[80%] bg-accent text-bg rounded-lg px-4 py-2 whitespace-pre-wrap"
                : m.role === "system"
                ? "bg-bg border border-warn/40 text-warn rounded-lg px-4 py-2 text-sm"
                : "max-w-[80%] bg-panel border border-border rounded-lg px-4 py-3 whitespace-pre-wrap"
            }
          >
            {m.contentText}
            {Array.isArray(m.imageBlobUrls) && m.imageBlobUrls.length > 0 && (
              <div className="mt-2 flex gap-2 flex-wrap">
                {m.imageBlobUrls.map((url: string) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={url} src={url} alt="attachment" className="max-h-40 rounded border border-border" />
                ))}
              </div>
            )}
            <div className="text-xs text-mute mt-1 font-mono">
              {m.createdAt.toISOString().slice(11, 19)} · {m.role}{m.modelUsed ? ` · ${m.modelUsed}` : ""}
            </div>
          </div>
        ))}
        {!msgs.length && <p className="text-mute italic">No messages.</p>}
      </div>
    </main>
  );
}
