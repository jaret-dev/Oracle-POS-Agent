/**
 * Reads every .md file under /memory/**, chunks it, embeds each chunk with
 * OpenAI's embeddings API, and writes /memory/_embeddings.jsonl
 * (one row per chunk: { source, source_url, section_path, title, chunk_order, content, embedding }).
 *
 * Embeddings cannot use the Codex OAuth token — that endpoint serves chat
 * Responses only. They need a regular OpenAI API key. The script fails
 * LOUDLY if OPENAI_API_KEY is missing rather than silently producing
 * embedding-less chunks that the retriever would then quietly miss.
 *
 * Usage:
 *   OPENAI_API_KEY=sk-... npm run ingest:embed
 *   npm run ingest:embed -- --force         # re-embed everything
 *   npm run ingest:embed -- --only oracle/sipou
 */
import { readFile, writeFile, readdir, stat } from "node:fs/promises";
import { join, relative } from "node:path";
import matter from "gray-matter";
import pLimit from "p-limit";

const ROOT = join(process.cwd(), "memory");
const OUT = join(ROOT, "_embeddings.jsonl");
const EMBED_URL = "https://api.openai.com/v1/embeddings";
const EMBED_MODEL = process.env.EMBEDDING_MODEL ?? "text-embedding-3-large";
const EMBED_DIMS = 1536;
const CHUNK_TOKENS = 800;
const CHUNK_OVERLAP = 120;
const CONCURRENCY = 4;

const args = process.argv.slice(2);
const FORCE = args.includes("--force");
const onlyIdx = args.indexOf("--only");
const ONLY = onlyIdx >= 0 ? args[onlyIdx + 1] : null;

function requireKey(): string {
  const k = process.env.OPENAI_API_KEY;
  if (!k) {
    throw new Error(
      "[embed] OPENAI_API_KEY is required. Embeddings cannot use the Codex OAuth token. " +
        "Generate a key at https://platform.openai.com/api-keys and re-run."
    );
  }
  return k;
}

/** Approximate token count via word/char heuristic; good enough for chunking. */
function approxTokens(s: string): number {
  return Math.ceil(s.length / 4);
}

/** Naive but effective markdown-aware chunker: split on headings, then
 *  pack adjacent sections up to CHUNK_TOKENS, with overlap between chunks. */
function chunkMarkdown(md: string, title: string): Array<{ section: string; content: string }> {
  const sections: Array<{ heading: string; body: string }> = [];
  const lines = md.split("\n");
  let currentHeading = title;
  let buf: string[] = [];
  const flush = () => {
    if (buf.length) {
      sections.push({ heading: currentHeading, body: buf.join("\n").trim() });
      buf = [];
    }
  };
  for (const line of lines) {
    const h = line.match(/^(#{1,4})\s+(.+?)\s*$/);
    if (h) {
      flush();
      currentHeading = h[2];
      continue;
    }
    buf.push(line);
  }
  flush();

  // Pack into ~CHUNK_TOKENS-sized windows
  const out: Array<{ section: string; content: string }> = [];
  let acc: { section: string; content: string } | null = null;
  for (const s of sections) {
    const piece = `## ${s.heading}\n\n${s.body}`;
    if (!piece.trim()) continue;
    if (!acc) {
      acc = { section: s.heading, content: piece };
      continue;
    }
    if (approxTokens(acc.content) + approxTokens(piece) > CHUNK_TOKENS) {
      out.push(acc);
      // overlap: keep last ~CHUNK_OVERLAP tokens (~ 480 chars) as preamble
      const tail = acc.content.slice(-CHUNK_OVERLAP * 4);
      acc = { section: s.heading, content: `${tail}\n\n${piece}` };
    } else {
      acc.content += `\n\n${piece}`;
    }
  }
  if (acc) out.push(acc);
  return out;
}

async function* walkMd(dir: string): AsyncGenerator<string> {
  for (const ent of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name.startsWith(".") || ent.name === "_embeddings") continue;
      yield* walkMd(p);
    } else if (ent.isFile() && ent.name.endsWith(".md") && !ent.name.startsWith("MEMORY")) {
      yield p;
    }
  }
}

type Row = {
  source: string;
  source_url: string | null;
  section_path: string;
  markdown_path: string;
  title: string | null;
  chunk_order: number;
  content: string;
  embedding: number[];
};

async function embedBatch(texts: string[], key: string): Promise<number[][]> {
  const res = await fetch(EMBED_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: EMBED_MODEL,
      input: texts,
      dimensions: EMBED_DIMS,
    }),
  });
  if (!res.ok) {
    throw new Error(`[embed] ${res.status} ${await res.text()}`);
  }
  const json = (await res.json()) as { data: Array<{ embedding: number[] }> };
  return json.data.map((d) => d.embedding);
}

async function main() {
  const key = requireKey();
  // detect existing embeddings file so we can be incremental
  const existing = new Set<string>();
  try {
    if (!FORCE) {
      const stat0 = await stat(OUT);
      if (stat0.isFile()) {
        const text = await readFile(OUT, "utf8");
        for (const line of text.split("\n")) {
          if (!line.trim()) continue;
          try {
            const row = JSON.parse(line) as Row;
            existing.add(`${row.markdown_path}#${row.chunk_order}`);
          } catch {
            /* skip malformed */
          }
        }
        console.log(`[embed] resuming: ${existing.size} prior chunks already embedded`);
      }
    }
  } catch {
    /* file doesn't exist yet — fine */
  }

  const newRows: Row[] = [];
  const limit = pLimit(CONCURRENCY);
  let totalChunks = 0;
  let totalNew = 0;

  for await (const filePath of walkMd(ROOT)) {
    const relPath = relative(process.cwd(), filePath);
    if (ONLY && !relPath.includes(ONLY)) continue;

    const raw = await readFile(filePath, "utf8");
    const { data, content } = matter(raw);
    const title = (data.title as string) ?? null;
    const sourceUrl = (data.url as string) ?? null;
    const sourceKey = (data.source as string) ?? guessSourceFromPath(relPath);

    const chunks = chunkMarkdown(content, title ?? "untitled");
    if (!chunks.length) continue;
    totalChunks += chunks.length;

    const toEmbed: Array<{ idx: number; text: string; row: Omit<Row, "embedding"> }> = [];
    for (let i = 0; i < chunks.length; i++) {
      const id = `${relPath}#${i}`;
      if (existing.has(id)) continue;
      toEmbed.push({
        idx: i,
        text: chunks[i].content,
        row: {
          source: sourceKey,
          source_url: sourceUrl,
          section_path: chunks[i].section,
          markdown_path: relPath,
          title,
          chunk_order: i,
          content: chunks[i].content,
        },
      });
    }
    if (!toEmbed.length) continue;
    totalNew += toEmbed.length;

    // batch in groups of 16 (OpenAI accepts up to 2048 inputs per call but
    // smaller batches keep retry granularity tight)
    const batches: typeof toEmbed[] = [];
    for (let i = 0; i < toEmbed.length; i += 16) batches.push(toEmbed.slice(i, i + 16));

    await Promise.all(
      batches.map((batch) =>
        limit(async () => {
          const vecs = await embedBatch(
            batch.map((b) => b.text),
            key
          );
          for (let i = 0; i < batch.length; i++) {
            newRows.push({ ...batch[i].row, embedding: vecs[i] });
          }
        })
      )
    );
    if (totalNew % 50 < 16) {
      console.log(`[embed] ${relPath}: ${toEmbed.length} new (running total ${totalNew})`);
    }
  }

  // Append-only JSONL
  if (newRows.length) {
    const text = newRows.map((r) => JSON.stringify(r)).join("\n") + "\n";
    const { appendFile } = await import("node:fs/promises");
    await appendFile(OUT, text, "utf8");
  } else if (!existing.size) {
    await writeFile(OUT, "", "utf8");
  }

  console.log(
    `[embed] done. chunks_total=${totalChunks} chunks_new=${newRows.length} out=${relative(process.cwd(), OUT)}`
  );
}

function guessSourceFromPath(p: string): string {
  if (p.includes("/oracle/sipou/")) return "sipou";
  if (p.includes("/oracle/simmu/")) return "simmu";
  if (p.includes("/oracle/rause/")) return "rause";
  if (p.includes("/skills/")) return "skill";
  if (p.includes("/stores/")) return "store";
  if (p.includes("/users/")) return "user";
  return "skill";
}

main().catch((e) => {
  console.error("[embed] FAILED:", e);
  process.exit(1);
});
