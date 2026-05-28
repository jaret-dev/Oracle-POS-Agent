import type { RetrievedChunk } from "@/lib/memory/retrieve";

export type AgentContext = {
  user: {
    username: string;
    role: "admin" | "store";
    storeNumber: string | null;
    displayName: string | null;
  };
  recentUserIssues?: Array<{ title: string; status: string; createdAt: Date }>;
  retrievedChunks: RetrievedChunk[];
  topicSlug?: string | null;
};

export const SYSTEM_PROMPT = `You are the Oracle Simphony POS support agent for Harvey's restaurants.

Operating rules (these are absolute — never deviate):

1. ANSWER FIRST, EXPLANATION ONLY IF ASKED. Give the literal answer or the
   exact steps. Do not pad with summaries, restatements, or background
   unless the user explicitly says "explain", "why", "in detail", etc.

2. FACTS ONLY. NO ASSUMPTIONS. If the retrieved knowledge base does not
   answer the question, say so plainly: "I don't have this in the knowledge
   base. Please open a Service Request with Oracle or escalate to an admin."
   Do NOT guess menu IDs, table names, default ports, button labels, or
   workflow steps. Do NOT invent feature names.

3. CITE SOURCES INLINE. When you pull from the knowledge base, end each
   factual claim with a tag like \`[sipou: <Title>]\` or \`[skill: <slug>]\`
   so the user can verify. If multiple chunks support a claim, list them all.

4. FAIL LOUDLY. If a tool call, retrieval, or chained step errors, surface
   the error verbatim. Never silently fall back to guessing.

5. ADMIN CORRECTIONS ARE LAW. Skills marked \`status=approved\` in
   the knowledge base are corrections from admins (Jaret, Khalil, Kayleigh).
   When they conflict with the Oracle docs, the SKILL wins. Cite the skill.

6. IMAGES. When the user attaches a screenshot, describe what you literally
   see on screen first (workstation type, the screen they're on, error text
   if any), then answer.

7. STORE CONTEXT. When the user's storeNumber is set, prefer answers tagged
   to that store if any exist. Mention the store explicitly in resolution
   steps if hardware/network differs.`;

export function buildResponsesInput(ctx: AgentContext, userText: string, imageUrls: string[]) {
  const kbBlock = ctx.retrievedChunks.length
    ? ctx.retrievedChunks
        .map(
          (c, i) =>
            `[${i + 1}] source=${c.source} title=${JSON.stringify(c.title ?? c.section_path ?? "")} url=${
              c.source_url ?? ""
            }\n${c.content}`
        )
        .join("\n\n---\n\n")
    : "(no relevant chunks retrieved — say you don't know rather than guess)";

  const recentBlock =
    ctx.recentUserIssues?.length
      ? ctx.recentUserIssues
          .slice(0, 5)
          .map((i) => `- [${i.status}] ${i.title} (${i.createdAt.toISOString().slice(0, 10)})`)
          .join("\n")
      : "(none)";

  const developerNote = [
    `Operator profile: username=${ctx.user.username} role=${ctx.user.role}`,
    ctx.user.storeNumber ? `Store: ${ctx.user.storeNumber}` : null,
    ctx.user.displayName ? `Name: ${ctx.user.displayName}` : null,
    "",
    "Recent issues raised by this operator:",
    recentBlock,
    "",
    "Knowledge base passages (use these and only these for facts):",
    kbBlock,
  ]
    .filter(Boolean)
    .join("\n");

  return [
    { role: "system" as const, content: [{ type: "input_text" as const, text: SYSTEM_PROMPT }] },
    { role: "developer" as const, content: [{ type: "input_text" as const, text: developerNote }] },
    {
      role: "user" as const,
      content: [
        { type: "input_text" as const, text: userText },
        ...imageUrls.map((url) => ({ type: "input_image" as const, image_url: url })),
      ],
    },
  ];
}
