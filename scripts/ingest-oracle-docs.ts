/**
 * Crawl Oracle Simphony / R&A doc sites and write each page as markdown to
 *   /memory/oracle/<source>/<slug>.md
 *
 * - sipou:  Simphony 19.8 POS user guide
 * - simmu:  Simphony 19.8 manager user guide
 * - rause:  Simphony Reporting & Analytics user guide
 *
 * Idempotent: skips pages whose .md already exists unless --force is passed.
 *
 * Usage:
 *   npm run ingest:oracle
 *   npm run ingest:oracle -- --force
 *   npm run ingest:oracle -- --only sipou
 */
import { mkdir, writeFile, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import pLimit from "p-limit";
import TurndownService from "turndown";

type SourceKey = "sipou" | "simmu" | "rause";

const SOURCES: Record<SourceKey, string> = {
  sipou: "https://docs.oracle.com/en/industries/food-beverage/simphony/19.8/sipou/index.html",
  simmu: "https://docs.oracle.com/en/industries/food-beverage/simphony/19.8/simmu/index.html",
  rause: "https://docs.oracle.com/en/industries/food-beverage/back-office/rause/index.html",
};

const ROOT = join(process.cwd(), "memory", "oracle");
const CONCURRENCY = 6;
const USER_AGENT = "OraclePOSAgent/0.1 (+internal-tool; jaret@mojofoodgroup.com)";

const args = new Set(process.argv.slice(2));
const FORCE = args.has("--force");
const ONLY = (() => {
  const idx = process.argv.indexOf("--only");
  if (idx === -1) return null;
  return process.argv[idx + 1] as SourceKey | undefined;
})();

const td = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
}).remove(["script", "style", "noscript"]);

async function fileExists(p: string) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
}

function abs(url: string, base: string): string {
  try {
    return new URL(url, base).toString();
  } catch {
    return url;
  }
}

function uniq<T>(xs: T[]): T[] {
  return Array.from(new Set(xs));
}

function slugFromUrl(url: string): string {
  const u = new URL(url);
  const parts = u.pathname.split("/").filter(Boolean);
  const last = parts[parts.length - 1] ?? "index";
  return last.replace(/\.html?$/i, "").replace(/[^a-z0-9-_]+/gi, "-").toLowerCase() || "index";
}

function extractTitle(html: string): string | null {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m ? m[1].trim().replace(/\s+/g, " ").replace(/\s*\|.*$/, "") : null;
}

/** Pulls the <main> or first content container; falls back to <body>. */
function extractMain(html: string): string {
  const main =
    html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1] ??
    html.match(/<div[^>]+class="[^"]*\bcontainer-fluid\b[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/i)?.[1] ??
    html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ??
    html;
  // Strip nav/footers commonly seen on Oracle help pages
  return main
    .replace(/<nav[\s\S]*?<\/nav>/gi, "")
    .replace(/<header[\s\S]*?<\/header>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "");
}

function extractLinks(html: string, baseUrl: string): string[] {
  const re = /<a\b[^>]*?\bhref\s*=\s*"([^"]+)"/gi;
  const out: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const href = m[1].trim();
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("javascript:")) continue;
    out.push(abs(href, baseUrl));
  }
  return uniq(out);
}

/** Returns only links that stay under the same source's directory. */
function sameDirLinks(links: string[], base: string): string[] {
  const baseDir = base.replace(/\/[^/]*$/, "/");
  return links.filter((u) => u.startsWith(baseDir) && /\.html?$/i.test(u));
}

type Page = { url: string; html: string; title: string | null };

async function crawl(source: SourceKey, indexUrl: string) {
  const dir = join(ROOT, source);
  await mkdir(dir, { recursive: true });

  console.log(`[ingest] ${source}: fetching index ${indexUrl}`);
  const indexHtml = await fetchText(indexUrl);

  // BFS frontier: start from every link found on the index page that's
  // under the same docs subdir.
  const seen = new Set<string>();
  const frontier: string[] = sameDirLinks(extractLinks(indexHtml, indexUrl), indexUrl);
  seen.add(indexUrl);

  // Also save the index itself.
  const allPages: Array<{ url: string; slug: string }> = [];
  await savePage(source, indexUrl, indexHtml, "index");
  allPages.push({ url: indexUrl, slug: "index" });

  const limit = pLimit(CONCURRENCY);
  let processed = 1;
  let skipped = 0;
  let failed = 0;

  // We discover more links on each fetched page, but cap the crawl to a
  // single hop beyond the index — these doc sets are organized as a flat TOC
  // off the index, so depth-1 already covers the bulk.
  const queue = uniq(frontier).filter((u) => !seen.has(u));

  console.log(`[ingest] ${source}: ${queue.length} candidate pages from index`);

  await Promise.all(
    queue.map((url) =>
      limit(async () => {
        if (seen.has(url)) return;
        seen.add(url);
        const slug = slugFromUrl(url);
        const outPath = join(dir, `${slug}.md`);
        if (!FORCE && (await fileExists(outPath))) {
          skipped++;
          return;
        }
        try {
          const html = await fetchText(url);
          await savePage(source, url, html, slug);
          allPages.push({ url, slug });
          processed++;
          if (processed % 25 === 0) {
            console.log(`[ingest] ${source}: ${processed} pages saved (${skipped} skipped, ${failed} failed)`);
          }
        } catch (e) {
          failed++;
          console.warn(`[ingest] ${source}: FAILED ${url}: ${(e as Error).message}`);
        }
      })
    )
  );

  console.log(`[ingest] ${source}: done. saved=${processed} skipped=${skipped} failed=${failed}`);
  return allPages;
}

async function savePage(source: SourceKey, url: string, html: string, slug: string) {
  const title = extractTitle(html) ?? slug;
  const main = extractMain(html);
  const md = td.turndown(main).trim();
  const frontmatter = [
    "---",
    `source: ${source}`,
    `url: ${url}`,
    `title: ${JSON.stringify(title)}`,
    `crawled_at: ${new Date().toISOString()}`,
    "---",
    "",
  ].join("\n");
  const outPath = join(ROOT, source, `${slug}.md`);
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, `${frontmatter}# ${title}\n\n${md}\n`, "utf8");
}

async function main() {
  const targets: SourceKey[] = ONLY ? [ONLY] : (Object.keys(SOURCES) as SourceKey[]);
  for (const key of targets) {
    if (!SOURCES[key]) throw new Error(`unknown source: ${key}`);
  }
  for (const key of targets) {
    await crawl(key, SOURCES[key]);
  }
  console.log("[ingest] all sources complete. next: npm run ingest:embed");
}

main().catch((e) => {
  console.error("[ingest] FAILED:", e);
  process.exit(1);
});
