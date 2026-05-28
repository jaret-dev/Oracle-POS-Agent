-- Extensions
CREATE EXTENSION IF NOT EXISTS "vector";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Enums
DO $$ BEGIN CREATE TYPE "user_role" AS ENUM ('admin','store'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE "message_role" AS ENUM ('user','assistant','system'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE "issue_status" AS ENUM ('open','answered','resolved','stale'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE "error_severity" AS ENUM ('info','warn','error','fatal'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE "error_resolution" AS ENUM ('unresolved','investigating','fixed','wontfix'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE "skill_status" AS ENUM ('proposed','approved','rejected','retired'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE "memory_source" AS ENUM ('sipou','simmu','rause','skill','store','user'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Tables
CREATE TABLE IF NOT EXISTS "users" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "username" varchar(64) NOT NULL,
  "password_hash" text NOT NULL,
  "role" "user_role" NOT NULL,
  "store_number" varchar(16),
  "display_name" varchar(128),
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "last_login_at" timestamptz,
  "disabled" boolean NOT NULL DEFAULT false
);
CREATE UNIQUE INDEX IF NOT EXISTS "users_username_idx" ON "users" ("username");

CREATE TABLE IF NOT EXISTS "oauth_tokens" (
  "id" serial PRIMARY KEY,
  "provider" varchar(32) NOT NULL,
  "owner_user_id" uuid REFERENCES "users"("id") ON DELETE CASCADE,
  "account_id" text,
  "access_encrypted" text NOT NULL,
  "refresh_encrypted" text NOT NULL,
  "expires_at" timestamptz NOT NULL,
  "rotated_at" timestamptz NOT NULL DEFAULT now(),
  "created_at" timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS "oauth_tokens_provider_owner_idx" ON "oauth_tokens" ("provider","owner_user_id");

CREATE TABLE IF NOT EXISTS "conversations" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "topic_slug" varchar(64),
  "title" varchar(256),
  "started_at" timestamptz NOT NULL DEFAULT now(),
  "last_message_at" timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "conversations_user_idx" ON "conversations" ("user_id","last_message_at");

CREATE TABLE IF NOT EXISTS "messages" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "conversation_id" uuid NOT NULL REFERENCES "conversations"("id") ON DELETE CASCADE,
  "role" "message_role" NOT NULL,
  "content_text" text NOT NULL,
  "image_blob_urls" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "model_used" varchar(64),
  "prompt_tokens" integer,
  "completion_tokens" integer,
  "retrieved_chunk_ids" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "created_at" timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "messages_convo_idx" ON "messages" ("conversation_id","created_at");

CREATE TABLE IF NOT EXISTS "issues" (
  "id" serial PRIMARY KEY,
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "conversation_id" uuid NOT NULL REFERENCES "conversations"("id") ON DELETE CASCADE,
  "store_number" varchar(16),
  "category" varchar(64),
  "title" varchar(256) NOT NULL,
  "summary" text,
  "status" "issue_status" NOT NULL DEFAULT 'open',
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "resolved_at" timestamptz
);
CREATE INDEX IF NOT EXISTS "issues_store_idx" ON "issues" ("store_number","created_at");
CREATE INDEX IF NOT EXISTS "issues_user_idx" ON "issues" ("user_id","created_at");
CREATE INDEX IF NOT EXISTS "issues_category_idx" ON "issues" ("category");

CREATE TABLE IF NOT EXISTS "corrections" (
  "id" serial PRIMARY KEY,
  "message_id" uuid NOT NULL REFERENCES "messages"("id") ON DELETE CASCADE,
  "admin_user_id" uuid NOT NULL REFERENCES "users"("id"),
  "what_was_wrong" text NOT NULL,
  "what_is_correct" text NOT NULL,
  "proposed_skill_id" integer,
  "created_at" timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "corrections_message_idx" ON "corrections" ("message_id");

CREATE TABLE IF NOT EXISTS "skills" (
  "id" serial PRIMARY KEY,
  "slug" varchar(128) NOT NULL,
  "title" varchar(256) NOT NULL,
  "body" text NOT NULL,
  "body_markdown_path" varchar(256),
  "status" "skill_status" NOT NULL DEFAULT 'proposed',
  "created_from_correction_id" integer,
  "approved_by_user_id" uuid REFERENCES "users"("id"),
  "version" integer NOT NULL DEFAULT 1,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "approved_at" timestamptz,
  "retired_at" timestamptz
);
CREATE UNIQUE INDEX IF NOT EXISTS "skills_slug_idx" ON "skills" ("slug");
CREATE INDEX IF NOT EXISTS "skills_status_idx" ON "skills" ("status");

CREATE TABLE IF NOT EXISTS "topics" (
  "id" serial PRIMARY KEY,
  "slug" varchar(64) NOT NULL,
  "label" varchar(128) NOT NULL,
  "description" text,
  "seed_query" text,
  "created_at" timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS "topics_slug_idx" ON "topics" ("slug");

CREATE TABLE IF NOT EXISTS "memory_chunks" (
  "id" serial PRIMARY KEY,
  "source" "memory_source" NOT NULL,
  "source_url" text,
  "section_path" text,
  "markdown_path" text,
  "title" varchar(256),
  "content" text NOT NULL,
  "content_tsv" tsvector,
  "embedding" vector(1536),
  "skill_id" integer,
  "store_number" varchar(16),
  "user_id" uuid REFERENCES "users"("id") ON DELETE CASCADE,
  "chunk_order" integer NOT NULL DEFAULT 0,
  "created_at" timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "memory_chunks_source_idx" ON "memory_chunks" ("source");
CREATE INDEX IF NOT EXISTS "memory_chunks_store_idx" ON "memory_chunks" ("store_number");
CREATE INDEX IF NOT EXISTS "memory_chunks_user_idx" ON "memory_chunks" ("user_id");
CREATE INDEX IF NOT EXISTS "memory_chunks_embedding_idx" ON "memory_chunks" USING hnsw ("embedding" vector_cosine_ops);
CREATE INDEX IF NOT EXISTS "memory_chunks_tsv_idx" ON "memory_chunks" USING gin ("content_tsv");

-- Keep tsvector in sync with content
CREATE OR REPLACE FUNCTION memory_chunks_tsv_trigger() RETURNS trigger AS $$
BEGIN
  NEW.content_tsv := to_tsvector('english', coalesce(NEW.title,'') || ' ' || coalesce(NEW.content,''));
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS memory_chunks_tsv_update ON memory_chunks;
CREATE TRIGGER memory_chunks_tsv_update
BEFORE INSERT OR UPDATE ON memory_chunks
FOR EACH ROW EXECUTE FUNCTION memory_chunks_tsv_trigger();

CREATE TABLE IF NOT EXISTS "error_log" (
  "id" serial PRIMARY KEY,
  "occurred_at" timestamptz NOT NULL DEFAULT now(),
  "severity" "error_severity" NOT NULL,
  "source" varchar(64) NOT NULL,
  "message" text NOT NULL,
  "stack" text,
  "request_context" jsonb,
  "user_id" uuid REFERENCES "users"("id") ON DELETE SET NULL,
  "resolution" "error_resolution" NOT NULL DEFAULT 'unresolved',
  "resolved_at" timestamptz,
  "fix_applied" text
);
CREATE INDEX IF NOT EXISTS "error_log_occurred_idx" ON "error_log" ("occurred_at");
CREATE INDEX IF NOT EXISTS "error_log_resolution_idx" ON "error_log" ("resolution","occurred_at");
CREATE INDEX IF NOT EXISTS "error_log_severity_idx" ON "error_log" ("severity","occurred_at");

CREATE TABLE IF NOT EXISTS "daily_error_reviews" (
  "id" serial PRIMARY KEY,
  "run_at" timestamptz NOT NULL DEFAULT now(),
  "errors_processed" integer NOT NULL DEFAULT 0,
  "fixes_proposed" integer NOT NULL DEFAULT 0,
  "skills_drafted" integer NOT NULL DEFAULT 0,
  "notes" text
);
