import { NextResponse } from "next/server";
import { z } from "zod";
import { and, desc, eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/db/client";
import { conversations, messages, issues, users } from "@/db/schema";
import { retrieve, type RetrievedChunk } from "@/lib/memory/retrieve";
import { complete } from "@/lib/openai/client";
import { buildResponsesInput } from "@/lib/agent/prompt";
import { logError } from "@/lib/log";

export const runtime = "nodejs";
export const maxDuration = 60;

const reqSchema = z.object({
  conversationId: z.string().uuid().optional(),
  topicSlug: z.string().max(64).optional(),
  text: z.string().min(1).max(8000),
  imageUrls: z.array(z.string().url()).max(6).optional().default([]),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: z.infer<typeof reqSchema>;
  try {
    body = reqSchema.parse(await req.json());
  } catch (e) {
    return NextResponse.json(
      { error: "invalid body", details: (e as Error).message },
      { status: 400 }
    );
  }

  try {
    // 1. Get or create conversation
    let conversationId = body.conversationId;
    if (!conversationId) {
      const [c] = await db
        .insert(conversations)
        .values({
          userId: session.user.id,
          topicSlug: body.topicSlug ?? null,
          title: body.text.slice(0, 80),
        })
        .returning({ id: conversations.id });
      conversationId = c.id;
    } else {
      await db
        .update(conversations)
        .set({ lastMessageAt: new Date() })
        .where(eq(conversations.id, conversationId));
    }

    // 2. Persist the user message
    const [userMsg] = await db
      .insert(messages)
      .values({
        conversationId,
        role: "user",
        contentText: body.text,
        imageBlobUrls: body.imageUrls,
      })
      .returning({ id: messages.id });

    // 3. Load context: user row, recent issues, retrieved chunks
    const [userRow] = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user.id))
      .limit(1);

    const recentIssues = await db
      .select({
        title: issues.title,
        status: issues.status,
        createdAt: issues.createdAt,
      })
      .from(issues)
      .where(eq(issues.userId, session.user.id))
      .orderBy(desc(issues.createdAt))
      .limit(5);

    let retrievedChunks: RetrievedChunk[] = [];
    try {
      retrievedChunks = await retrieve({
        query: body.text,
        k: 8,
        storeNumber: userRow?.storeNumber ?? null,
        topicSlug: body.topicSlug ?? null,
      });
    } catch (e) {
      await logError({
        severity: "warn",
        source: "chat.retrieve",
        message: (e as Error).message,
        userId: session.user.id,
      });
      retrievedChunks = [];
    }

    const input = buildResponsesInput(
      {
        user: {
          username: userRow?.username ?? session.user.username,
          role: userRow?.role ?? session.user.role,
          storeNumber: userRow?.storeNumber ?? session.user.storeNumber,
          displayName: userRow?.displayName ?? session.user.name ?? null,
        },
        recentUserIssues: recentIssues,
        retrievedChunks,
        topicSlug: body.topicSlug ?? null,
      },
      body.text,
      body.imageUrls
    );

    // 4. Call GPT-5.5 via Codex OAuth
    const result = await complete({
      input,
      reasoning: { effort: "medium" },
      max_output_tokens: 2000,
      metadata: {
        conversation_id: conversationId,
        user_id: session.user.id,
        message_id: userMsg.id,
      },
    });

    // 5. Persist assistant message
    const [assistantMsg] = await db
      .insert(messages)
      .values({
        conversationId,
        role: "assistant",
        contentText: result.output_text,
        modelUsed: result.model,
        promptTokens: result.usage?.input_tokens ?? null,
        completionTokens: result.usage?.output_tokens ?? null,
        retrievedChunkIds: retrievedChunks.map((c) => c.id),
      })
      .returning({ id: messages.id });

    // 6. Best-effort issue capture (the agent classifies in a later phase;
    //    for now we open one issue per conversation if none exists yet)
    const [existingIssue] = await db
      .select({ id: issues.id })
      .from(issues)
      .where(
        and(
          eq(issues.userId, session.user.id),
          eq(issues.conversationId, conversationId)
        )
      )
      .limit(1);
    if (!existingIssue) {
      await db.insert(issues).values({
        userId: session.user.id,
        conversationId,
        storeNumber: userRow?.storeNumber ?? null,
        title: body.text.slice(0, 200),
        category: body.topicSlug ?? null,
        status: "answered",
      });
    }

    return NextResponse.json({
      conversationId,
      userMessageId: userMsg.id,
      assistantMessageId: assistantMsg.id,
      reply: result.output_text,
      model: result.model,
      retrieved: retrievedChunks.map((c) => ({
        id: c.id,
        source: c.source,
        title: c.title,
        url: c.source_url,
      })),
    });
  } catch (e) {
    const err = e instanceof Error ? e : new Error(String(e));
    await logError({
      severity: "error",
      source: "api.chat",
      message: err.message,
      stack: err.stack,
      userId: session.user.id,
      requestContext: { text: body.text.slice(0, 200), imageCount: body.imageUrls.length },
    });
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
