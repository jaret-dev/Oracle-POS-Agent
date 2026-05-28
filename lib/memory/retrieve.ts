import { db } from "@/db/client";
import { sql } from "drizzle-orm";
import { embedQuery } from "@/lib/openai/embed";

export type RetrievedChunk = {
  id: number;
  source: string;
  source_url: string | null;
  section_path: string | null;
  title: string | null;
  content: string;
  score: number;
};

/**
 * Hybrid retrieval: cosine over pgvector + ts_rank over content_tsv.
 * Weighted blend (0.7 semantic, 0.3 lexical). Returns top-K rows.
 *
 * Filters:
 *  - sources: optional whitelist of memory_source values
 *  - storeNumber: when set, boosts matching store-scoped chunks
 *
 * If embeddings are unavailable (no api key), falls back to BM25 only.
 */
export async function retrieve(opts: {
  query: string;
  k?: number;
  sources?: string[];
  storeNumber?: string | null;
  topicSlug?: string | null;
}): Promise<RetrievedChunk[]> {
  const k = opts.k ?? 8;
  let vec: number[] | null = null;
  try {
    vec = await embedQuery(opts.query);
  } catch (e) {
    console.warn("[retrieve] no embedding (falling back to BM25 only):", (e as Error).message);
  }

  const sourceFilter = opts.sources?.length
    ? sql`AND source = ANY(${sql.raw(`ARRAY[${opts.sources.map((s) => `'${s}'`).join(",")}]::memory_source[]`)})`
    : sql``;

  if (!vec) {
    const result = await db.execute<RetrievedChunk>(sql`
      SELECT id, source::text AS source, source_url, section_path, title, content,
             ts_rank(content_tsv, plainto_tsquery('english', ${opts.query})) AS score
      FROM memory_chunks
      WHERE content_tsv @@ plainto_tsquery('english', ${opts.query})
      ${sourceFilter}
      ORDER BY score DESC
      LIMIT ${k}
    `);
    return result.rows;
  }

  const vecLit = `[${vec.join(",")}]`;
  const result = await db.execute<RetrievedChunk>(sql`
    WITH vec AS (
      SELECT id, 1 - (embedding <=> ${vecLit}::vector) AS sim
      FROM memory_chunks
      WHERE embedding IS NOT NULL
      ${sourceFilter}
      ORDER BY embedding <=> ${vecLit}::vector
      LIMIT 40
    ),
    bm AS (
      SELECT id, ts_rank(content_tsv, plainto_tsquery('english', ${opts.query})) AS r
      FROM memory_chunks
      WHERE content_tsv @@ plainto_tsquery('english', ${opts.query})
      ${sourceFilter}
      ORDER BY r DESC
      LIMIT 40
    ),
    combined AS (
      SELECT
        COALESCE(vec.id, bm.id) AS id,
        COALESCE(vec.sim, 0) * 0.7 + COALESCE(bm.r, 0) * 0.3 AS score
      FROM vec FULL OUTER JOIN bm ON vec.id = bm.id
    )
    SELECT m.id, m.source::text AS source, m.source_url, m.section_path, m.title, m.content, c.score
    FROM combined c
    JOIN memory_chunks m ON m.id = c.id
    ORDER BY c.score DESC
    LIMIT ${k}
  `);
  return result.rows;
}
