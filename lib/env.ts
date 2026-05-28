import { z } from "zod";

const schema = z.object({
  NEXTAUTH_SECRET: z.string().min(32).optional(),
  NEXTAUTH_URL: z.string().url().optional(),
  ENCRYPTION_KEY: z.string().regex(/^[0-9a-f]{64}$/, "must be 64-char hex (32 bytes)").optional(),
  POSTGRES_URL: z.string().url().optional(),
  BLOB_READ_WRITE_TOKEN: z.string().optional(),
  OPENAI_OAUTH_BOOTSTRAP_ACCESS: z.string().optional(),
  OPENAI_OAUTH_BOOTSTRAP_REFRESH: z.string().optional(),
  OPENAI_OAUTH_BOOTSTRAP_EXPIRES: z.string().optional(),
  OPENAI_OAUTH_BOOTSTRAP_ACCOUNT_ID: z.string().optional(),
  MODEL_PRIMARY: z.string().default("openai/gpt-5.5"),
  MODEL_FALLBACK: z.string().default("openai/gpt-5.4-mini"),
  EMBEDDING_MODEL: z.string().default("text-embedding-3-large"),
  CRON_SECRET: z.string().min(32).optional(),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  // Phase 1: env is optional. From Phase 3 onward, switch to throwing.
  console.warn("[env] partial config:", parsed.error.flatten().fieldErrors);
}

export const env = (parsed.success ? parsed.data : schema.parse({})) as z.infer<typeof schema>;
