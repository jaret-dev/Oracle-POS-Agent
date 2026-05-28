# Oracle POS Support Agent (Harvey's)

Vercel-hosted Simphony POS support agent for Harvey's. Built on Next.js 16 +
Vercel Postgres (pgvector) + Vercel Blob, with GPT-5.5 inference via the
OpenAI Codex OAuth subscription endpoint.

## What's in the box

| Layer | Files |
|---|---|
| **UI** | Next.js App Router. Chat on the right, topic list on the left. Image / screenshot upload via picker or `⌘V`. |
| **Auth** | NextAuth v5 credentials provider. 9 seeded accounts: 3 admins + 6 stores. Sessions are JWT. |
| **DB** | Vercel Postgres + pgvector. 12 tables (`users`, `oauth_tokens`, `conversations`, `messages`, `issues`, `corrections`, `skills`, `topics`, `memory_chunks`, `error_log`, `daily_error_reviews`). |
| **Model** | GPT-5.5 via `chatgpt.com/backend-api/codex/responses`. Bearer = decrypted Codex OAuth token from `oauth_tokens`. Auto-refresh ≤120s before expiry. |
| **Memory** | Karpathy/Obsidian-style: `.md` files under `memory/` are the source of truth; chunker + embedder produce `_embeddings.jsonl`; loader inserts into `memory_chunks` for hybrid (pgvector + tsvector) retrieval. |
| **Learning** | Admin "Correct this" button → GPT-5.5 drafts a skill → admin approves → skill is embedded and overrides Oracle docs in future retrievals. |
| **Self-improvement** | Vercel Cron at 03:00 UTC reads unresolved errors, clusters by source, classifies each group, drafts skills for knowledge gaps. |
| **Evals** | Karpathy-style scenarios → runner → GPT-5.5-as-judge. Failures auto-draft skill proposals. |

## First-time setup

### 1. Vercel + Postgres + Blob

1. Push this repo to GitHub (`jaret-dev/Oracle-POS-Agent`).
2. Import the project on vercel.com.
3. From the project's Storage tab, create:
   - **Postgres** database (Hobby tier is fine to start). Vercel will inject `POSTGRES_URL`.
   - **Blob** store. Vercel will inject `BLOB_READ_WRITE_TOKEN`.

### 2. Env vars (Project → Settings → Environment Variables)

Copy `.env.example` and fill in:

| Var | What |
|---|---|
| `NEXTAUTH_SECRET` | `openssl rand -hex 32` |
| `NEXTAUTH_URL` | `https://<your-vercel-domain>` |
| `ENCRYPTION_KEY` | `openssl rand -hex 32` — used to AES-256-GCM-encrypt OAuth tokens at rest |
| `OPENAI_API_KEY` | `sk-...` from platform.openai.com — needed for embeddings only ($5 covers months of use) |
| `CRON_SECRET` | `openssl rand -hex 32` |
| `MODEL_PRIMARY` | `openai/gpt-5.5` (default) |

### 3. Run the migration + seed users (locally, once)

```sh
vercel env pull .env.local       # pulls POSTGRES_URL etc.
psql "$POSTGRES_URL" -f db/migrations/0000_init.sql
npm run db:seed                  # creates the 9 user accounts with bcrypt-12 hashes
```

Seeded accounts:

| Username | Password | Role |
|---|---|---|
| `JaretF` | `OraclePOS2026!` | admin |
| `KhalilK` | `OraclePOS2026!` | admin |
| `KayleighG` | `OraclePOS2026!` | admin |
| `2256` | `Burger.2256` | store |
| `2639` | `Burger.2639` | store |
| `2983` | `Burger.2983` | store |
| `2721` | `Burger.2721` | store |
| `2806` | `Burger.2806` | store |
| `2596` | `Burger.2596` | store |

### 4. Wire the Codex OAuth token (one-time)

GPT-5.5 is subscription-only. The app uses your ChatGPT Plus/Pro subscription
via the Codex OAuth flow. You only need to do this once; refresh is automatic.

```sh
# On your Mac
brew install openai-codex            # or use OpenClaw: `openclaw models auth login --provider openai-codex`
codex login                          # opens a browser, returns to localhost loopback
cat ~/.codex/auth.json               # contains access_token, refresh_token, expires_in
```

Sign in to the deployed app as `JaretF`, navigate to `/admin/oauth`, paste the
four fields, and click **Store tokens**. The app encrypts and stores them in
the `oauth_tokens` table and refreshes them automatically before they expire.

### 5. Ingest the Oracle knowledge base (locally, ~30 min)

```sh
npm run ingest:oracle               # crawls sipou, simmu, rause → memory/oracle/**/*.md
npm run ingest:embed                # chunks + embeds → memory/_embeddings.jsonl (needs OPENAI_API_KEY)
npm run db:load-embeddings          # loads into memory_chunks (needs POSTGRES_URL)
git add memory/ && git commit -m "ingest oracle docs"
git push                            # rebuild on vercel picks them up
```

Re-running `ingest:oracle` is idempotent (skips already-fetched pages unless
`--force` is passed). `ingest:embed` is incremental.

## Day-to-day

### Chat

Stores log in at `/login` → land on `/chat`. They:
- Pick a topic from the left sidebar (auto-loads relevant context),
- Type a question or paste a screenshot (`⌘V`),
- Get an answer with citations from `[sipou]` / `[simmu]` / `[rause]` / `[skill]`.

### Admin (Jaret, Khalil, Kayleigh)

`/admin` dashboard shows live counts. Key pages:
- **`/admin/oauth`** — Codex token status + bootstrap.
- **`/admin/skills`** — proposed / approved / rejected skills. Approving embeds a skill into the retrieval index immediately.
- **`/admin/issues`** — every conversation, filterable by store.
- **`/admin/conversations/[id]`** — full message history of any conversation.
- **`/admin/errors`** — fail-loud error log; each entry shows stack + request context. The daily cron writes its analysis into `fix_applied`.
- **`/admin/corrections`** — history of admin corrections and the skills they drafted.
- **`/admin/eval`** — instructions to run the Karpathy eval harness locally.

### Correction loop

When an admin sees a wrong answer:
1. Click **"Correct this"** under the assistant's reply.
2. Fill in *what was wrong* + *what is correct*.
3. The agent drafts a Skill (markdown body) and queues it on `/admin/skills`.
4. Admin clicks **Approve** → skill is embedded into `memory_chunks` with `source='skill'`.
5. Next time a similar question is asked, that skill ranks higher than Oracle docs and the agent cites it.

### Daily error review (automatic)

Vercel Cron hits `/api/cron/error-review` at 03:00 UTC. The job:
- Groups unresolved errors from the last 24h by source.
- Asks GPT-5.5 to classify each cluster.
- Drafts proposed skills for knowledge gaps and flips errors to `investigating`.
- Records the run in `daily_error_reviews`.

Trigger manually from the CLI:
```sh
curl -X POST https://<your-domain>/api/cron/error-review \
  -H "Authorization: Bearer $CRON_SECRET"
```

### Evals (before changes go live)

```sh
npm run dev                          # in one terminal
BASE_URL=http://localhost:3000 \
EVAL_USERNAME=JaretF \
EVAL_PASSWORD=OraclePOS2026! \
npm run evals:run                    # → evals/results.jsonl
npm run evals:judge                  # → evals/judgments.jsonl + report
```

Add scenarios to `evals/scenarios.jsonl` (one JSON per line). The judge marks a
scenario as `pass` only if **every** expected fact is present and the reply
doesn't invent unverifiable facts. Failing knowledge-gap scenarios auto-emit
skill proposals into `evals/proposed-skills.jsonl`.

## Architecture notes

### Why split auth files?

NextAuth v5 + bcrypt + Edge middleware are incompatible (bcrypt is a native
module that the Edge runtime rejects). The `auth.config.ts` is the edge-safe
slice (callbacks, session shape, no providers). `auth.ts` adds the Credentials
provider with bcrypt, used only in Node-runtime routes / RSCs. The middleware
imports only `authConfig`.

### Why `NULLS NOT DISTINCT` on `oauth_tokens`?

We use a single "house" token row keyed by `(provider, owner_user_id IS NULL)`.
Without `NULLS NOT DISTINCT` (Postgres 15+), the unique index would allow
arbitrarily many null-owner rows. The clause makes Postgres treat `NULL` as a
real value for uniqueness.

### Why a lazy DB Proxy?

`next build` collects page data by importing every route module. Throwing in
`db/client.ts` on missing `POSTGRES_URL` would break the build. The Proxy
defers connection setup until the first actual query.

### Why embeddings need a separate API key?

The Codex OAuth token authenticates the *Responses API* at
`chatgpt.com/backend-api/codex/responses`. The embeddings endpoint
(`api.openai.com/v1/embeddings`) is a separate service that requires the
classic platform API key. A $5 prepaid key covers months of typical use.

### Threat model — store passwords

The 6 store passwords (`Burger.2256` etc.) are *predictable*. They're fine as a
deployment seed but you should change them for any account that gets shared
beyond the store manager. Re-seed by editing `db/users.ts` and rerunning
`npm run db:seed`.

## Operations cheat sheet

| Task | Command |
|---|---|
| Reset user passwords | edit `db/users.ts`, `npm run db:seed` |
| Re-crawl Oracle docs | `npm run ingest:oracle -- --force` |
| Re-embed everything | `npm run ingest:embed -- --force` |
| Reload embeddings into Postgres | `npm run db:load-embeddings -- --force` |
| Inspect a conversation | `/admin/conversations/<id>` |
| Manually fire error-review | `curl -X POST /api/cron/error-review -H "Authorization: Bearer $CRON_SECRET"` |
| Rotate `ENCRYPTION_KEY` | re-bootstrap OAuth tokens via `/admin/oauth` after updating env |

## Phase status

| Phase | Status |
|---|---|
| 1. Scaffold | ✓ |
| 2. Schema + auth | ✓ |
| 3. Codex OAuth + token store + GPT-5.5 client | ✓ |
| 4. Oracle docs ingest pipeline | ✓ |
| 5. Memory + chat API (with vision + retrieval) | ✓ |
| 6. Correction → skill loop | ✓ |
| 7. Admin dashboard | ✓ |
| 8. Daily error-review cron | ✓ |
| 9. Karpathy eval harness | ✓ |
| 10. Deploy guide | ✓ |
