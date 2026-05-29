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

// Question/filler words that shouldn't drive retrieval.
const STOPWORDS = new Set([
  "how", "do", "does", "did", "the", "you", "your", "yours", "and", "for", "are", "was",
  "what", "where", "when", "why", "who", "which", "with", "from", "this", "that", "these",
  "those", "can", "could", "would", "should", "will", "shall", "into", "out", "off", "over",
  "need", "want", "please", "help", "get", "got", "have", "has", "had", "about", "there",
  "here", "they", "them", "then", "than", "but", "not", "any", "all", "set", "use", "using",
]);

/**
 * Build an OR tsquery from the significant words of a natural-language question.
 * plainto_tsquery ANDs every word together, which means a long question almost
 * never matches a single chunk. ORing the significant lexemes and ranking by
 * ts_rank gives proper recall + relevance ordering. to_tsquery applies the
 * english dictionary (stemming) to each lexeme. Returns null if nothing useful
 * remains. Input is reduced to [a-z0-9] tokens, so the resulting tsquery string
 * is safe to interpolate.
 */
function toOrTsQuery(query: string): string | null {
  const terms = (query.toLowerCase().match(/[a-z0-9]+/g) ?? []).filter(
    (t) => t.length > 2 && !STOPWORDS.has(t)
  );
  const uniq = Array.from(new Set(terms));
  return uniq.length ? uniq.join(" | ") : null;
}

/**
 * Hybrid retrieval: cosine over pgvector + ts_rank over content_tsv.
 * Weighted blend (0.7 semantic, 0.3 lexical). Returns top-K rows.
 * Falls back to keyword-only (BM25) when embeddings are unavailable (no key).
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
    console.warn("[retrieve] no embedding (keyword-only):", (e as Error).message);
  }

  const tsq = toOrTsQuery(opts.query);

  const sourceFilter = opts.sources?.length
    ? sql`AND source = ANY(${sql.raw(`ARRAY[${opts.sources.map((s) => `'${s}'`).join(",")}]::memory_source[]`)})`
    : sql``;

  // Keyword-only path.
  if (!vec) {
    if (!tsq) return [];
    const result = await db.execute<RetrievedChunk>(sql`
      SELECT id, source::text AS source, source_url, section_path, title, content,
             ts_rank(content_tsv, to_tsquery('english', ${tsq})) AS score
      FROM memory_chunks
      WHERE content_tsv @@ to_tsquery('english', ${tsq})
      ${sourceFilter}
      ORDER BY score DESC
      LIMIT ${k}
    `);
    return result.rows;
  }

  // Hybrid path.
  const vecLit = `[${vec.join(",")}]`;
  const tsqSafe = tsq ?? "zzzznomatchzzzz";
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
      SELECT id, ts_rank(content_tsv, to_tsquery('english', ${tsqSafe})) AS r
      FROM memory_chunks
      WHERE content_tsv @@ to_tsquery('english', ${tsqSafe})
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
