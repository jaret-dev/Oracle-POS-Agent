import {
  pgTable,
  serial,
  uuid,
  text,
  varchar,
  timestamp,
  boolean,
  integer,
  jsonb,
  vector,
  index,
  uniqueIndex,
  pgEnum,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const userRoleEnum = pgEnum("user_role", ["admin", "store"]);
export const messageRoleEnum = pgEnum("message_role", ["user", "assistant", "system"]);
export const issueStatusEnum = pgEnum("issue_status", ["open", "answered", "resolved", "stale"]);
export const errorSeverityEnum = pgEnum("error_severity", ["info", "warn", "error", "fatal"]);
export const errorResolutionEnum = pgEnum("error_resolution", ["unresolved", "investigating", "fixed", "wontfix"]);
export const skillStatusEnum = pgEnum("skill_status", ["proposed", "approved", "rejected", "retired"]);
export const memorySourceEnum = pgEnum("memory_source", ["sipou", "simmu", "rause", "skill", "store", "user"]);

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    username: varchar("username", { length: 64 }).notNull(),
    passwordHash: text("password_hash").notNull(),
    role: userRoleEnum("role").notNull(),
    storeNumber: varchar("store_number", { length: 16 }),
    displayName: varchar("display_name", { length: 128 }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
    disabled: boolean("disabled").notNull().default(false),
  },
  (t) => ({
    usernameIdx: uniqueIndex("users_username_idx").on(t.username),
  })
);

export const oauthTokens = pgTable(
  "oauth_tokens",
  {
    id: serial("id").primaryKey(),
    provider: varchar("provider", { length: 32 }).notNull(),
    ownerUserId: uuid("owner_user_id").references(() => users.id, { onDelete: "cascade" }),
    accountId: text("account_id"),
    accessEncrypted: text("access_encrypted").notNull(),
    refreshEncrypted: text("refresh_encrypted").notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    rotatedAt: timestamp("rotated_at", { withTimezone: true }).notNull().defaultNow(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    providerOwnerIdx: uniqueIndex("oauth_tokens_provider_owner_idx").on(t.provider, t.ownerUserId),
  })
);

export const conversations = pgTable(
  "conversations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    topicSlug: varchar("topic_slug", { length: 64 }),
    title: varchar("title", { length: 256 }),
    startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
    lastMessageAt: timestamp("last_message_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    userIdx: index("conversations_user_idx").on(t.userId, t.lastMessageAt),
  })
);

export const messages = pgTable(
  "messages",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    conversationId: uuid("conversation_id").notNull().references(() => conversations.id, { onDelete: "cascade" }),
    role: messageRoleEnum("role").notNull(),
    contentText: text("content_text").notNull(),
    imageBlobUrls: jsonb("image_blob_urls").$type<string[]>().default(sql`'[]'::jsonb`).notNull(),
    modelUsed: varchar("model_used", { length: 64 }),
    promptTokens: integer("prompt_tokens"),
    completionTokens: integer("completion_tokens"),
    retrievedChunkIds: jsonb("retrieved_chunk_ids").$type<number[]>().default(sql`'[]'::jsonb`).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    convoIdx: index("messages_convo_idx").on(t.conversationId, t.createdAt),
  })
);

export const issues = pgTable(
  "issues",
  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    conversationId: uuid("conversation_id").notNull().references(() => conversations.id, { onDelete: "cascade" }),
    storeNumber: varchar("store_number", { length: 16 }),
    category: varchar("category", { length: 64 }),
    title: varchar("title", { length: 256 }).notNull(),
    summary: text("summary"),
    status: issueStatusEnum("status").notNull().default("open"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    resolvedAt: timestamp("resolved_at", { withTimezone: true }),
  },
  (t) => ({
    storeIdx: index("issues_store_idx").on(t.storeNumber, t.createdAt),
    userIdx: index("issues_user_idx").on(t.userId, t.createdAt),
    categoryIdx: index("issues_category_idx").on(t.category),
  })
);

export const corrections = pgTable(
  "corrections",
  {
    id: serial("id").primaryKey(),
    messageId: uuid("message_id").notNull().references(() => messages.id, { onDelete: "cascade" }),
    adminUserId: uuid("admin_user_id").notNull().references(() => users.id),
    whatWasWrong: text("what_was_wrong").notNull(),
    whatIsCorrect: text("what_is_correct").notNull(),
    proposedSkillId: integer("proposed_skill_id"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    messageIdx: index("corrections_message_idx").on(t.messageId),
  })
);

export const skills = pgTable(
  "skills",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 128 }).notNull(),
    title: varchar("title", { length: 256 }).notNull(),
    body: text("body").notNull(),
    bodyMarkdownPath: varchar("body_markdown_path", { length: 256 }),
    status: skillStatusEnum("status").notNull().default("proposed"),
    createdFromCorrectionId: integer("created_from_correction_id"),
    approvedByUserId: uuid("approved_by_user_id").references(() => users.id),
    version: integer("version").notNull().default(1),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    approvedAt: timestamp("approved_at", { withTimezone: true }),
    retiredAt: timestamp("retired_at", { withTimezone: true }),
  },
  (t) => ({
    slugIdx: uniqueIndex("skills_slug_idx").on(t.slug),
    statusIdx: index("skills_status_idx").on(t.status),
  })
);

export const topics = pgTable(
  "topics",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 64 }).notNull(),
    label: varchar("label", { length: 128 }).notNull(),
    description: text("description"),
    seedQuery: text("seed_query"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    slugIdx: uniqueIndex("topics_slug_idx").on(t.slug),
  })
);

export const memoryChunks = pgTable(
  "memory_chunks",
  {
    id: serial("id").primaryKey(),
    source: memorySourceEnum("source").notNull(),
    sourceUrl: text("source_url"),
    sectionPath: text("section_path"),
    markdownPath: text("markdown_path"),
    title: varchar("title", { length: 256 }),
    content: text("content").notNull(),
    contentTsv: text("content_tsv"),
    embedding: vector("embedding", { dimensions: 1536 }),
    skillId: integer("skill_id"),
    storeNumber: varchar("store_number", { length: 16 }),
    userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
    chunkOrder: integer("chunk_order").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    sourceIdx: index("memory_chunks_source_idx").on(t.source),
    storeIdx: index("memory_chunks_store_idx").on(t.storeNumber),
    userIdx: index("memory_chunks_user_idx").on(t.userId),
    embeddingIdx: index("memory_chunks_embedding_idx").using("hnsw", t.embedding.op("vector_cosine_ops")),
  })
);

export const errorLog = pgTable(
  "error_log",
  {
    id: serial("id").primaryKey(),
    occurredAt: timestamp("occurred_at", { withTimezone: true }).notNull().defaultNow(),
    severity: errorSeverityEnum("severity").notNull(),
    source: varchar("source", { length: 64 }).notNull(),
    message: text("message").notNull(),
    stack: text("stack"),
    requestContext: jsonb("request_context"),
    userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
    resolution: errorResolutionEnum("resolution").notNull().default("unresolved"),
    resolvedAt: timestamp("resolved_at", { withTimezone: true }),
    fixApplied: text("fix_applied"),
  },
  (t) => ({
    occurredIdx: index("error_log_occurred_idx").on(t.occurredAt),
    resolutionIdx: index("error_log_resolution_idx").on(t.resolution, t.occurredAt),
    severityIdx: index("error_log_severity_idx").on(t.severity, t.occurredAt),
  })
);

export const dailyErrorReviews = pgTable("daily_error_reviews", {
  id: serial("id").primaryKey(),
  runAt: timestamp("run_at", { withTimezone: true }).notNull().defaultNow(),
  errorsProcessed: integer("errors_processed").notNull().default(0),
  fixesProposed: integer("fixes_proposed").notNull().default(0),
  skillsDrafted: integer("skills_drafted").notNull().default(0),
  notes: text("notes"),
});
