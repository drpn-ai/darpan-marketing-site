# drpn.ai Site Rethink Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild drpn.ai around "the check for the work between your systems": new homepage, works-with hub and four pair pages, a drawn-mockup tour, a security page; retire `/why` and `/customers`; delete what the old homepage alone used.

**Architecture:** Static TanStack Start site, every route prerendered (SSG) to `dist/client`. Shared facts (nav, connectors, security facts, pairs) live in `src/data/` so the homepage and the deep pages cannot drift apart. There is no test runner and the spec forbids new dependencies, so the test harness is a zero-dependency Node script (`scripts/check-site.mjs`) that asserts against the prerendered HTML: TDD here means "add the expectation, watch `npm run check` fail, build the page, watch it pass".

**Tech Stack:** TanStack Start + React 19 + Vite 7, TypeScript, hand-written `vl-*` CSS in `src/styles.operational.css`, Phosphor icons, Netlify.

**Spec:** `docs/superpowers/specs/2026-10-29-drpn-site-rethink-design.md` (read it first; it holds the approved copy, the Facts register and the voice rules). Approved homepage mockup: `.superpowers/brainstorm/23942-1793250042/content/homepage-copy-v1.html`, **as amended by the spec's Homepage section** (hero sub, Explain-it step, security cards, finance band).

## Global Constraints

- No new dependencies. No Framer Motion/GSAP. Animation only via the existing `.vl-animate` + IntersectionObserver reveal and CSS.
- Font weight 400 everywhere; no bold. Warm paper palette and IBM Plex Sans/Mono via existing `vl-*` tokens.
- Copy: "line up", never "agree"/"agreement". Never on the new pages: AI-powered, agentic, seamless, single source of truth, real-time, observability, trust your data, reconciliation/reconcile, revenue leakage, 360°.
- The page says "break"; "finding" appears only on `/tour`.
- No client names, no client ids/order numbers, no verbatim forum quotes.
- Every factual claim traces to the spec's Facts register; an unconfirmed claim is dropped, not softened.
- Every new route is in the `pages` list in `vite.config.ts`; internal links have no trailing slash.
- Each page sets its own `<title>` and meta description via TanStack `head`.
- Primary CTA "Talk to us" → `mailto:hello@drpn.ai?subject=Darpan%20walkthrough`; secondary is self-serve.
- **Commits:** a LaunchAgent pushes local `main` to production at 20:00 IST daily. **Do not commit during Tasks 1–8.** Each task ends by staging its files (`git add <paths>`) as a checkpoint. Task 9 makes the single commit, and only after Aditi approves the staged result. Other sessions leave unrelated files dirty in this repo (`docs/marketing-daily/**`, `docs/*.md`); never stage them.
- Build: `NODE_OPTIONS=--dns-result-order=ipv4first npm run build` (the prerenderer hangs on IPv6 loopback without it).

## Review Focus

1. **Phone width (375px):** the hero break list, the 4-step row, the 6-card strip and the pair-page statement list must stack to one column with no horizontal page scroll. → browser step in Tasks 6, 4.
2. **No JS / reduced motion:** every section's text must be visible in the prerendered HTML and on screen with `prefers-reduced-motion: reduce` (hiding is scoped to `.vl-animate`, added client-side only). → `mustContain` copy checks in every page task + browser step in Task 6.
3. **Unknown pair slug** (`/works-with/salesforce-netsuite`): must land on `/works-with`, not a blank page or SSR error. → Task 4 step.
4. **Old URLs** (`/why`, `/why#anything`, `/customers`, links from `/notebook`): must reach `/` with a 301, and nothing on the site may link to them. → Task 7 harness checks + deploy-preview step in Task 9.
5. **Drawn mockups and diagrams read by a screen reader:** every `role="img"` carries a non-empty `aria-label` that states what the picture shows. → harness check in Task 1, exercised by Tasks 4–6.

---

### Task 1: Site check harness

**Files:**
- Create: `scripts/check-site.mjs`, `scripts/site-expectations.mjs`
- Modify: `package.json` (add `"check": "node scripts/check-site.mjs"` to `scripts`)

**Interfaces:**
- Produces: `scripts/site-expectations.mjs` exports, which every later task extends:
  - `PAGES: Array<{ path: string; title: string; mustContain: string[] }>` — `title` is a substring the page `<title>` must contain; `mustContain` are visible-text substrings.
  - `VOICE_CHECKED: string[]` — paths whose visible text is scanned for `BANNED`.
  - `BANNED: RegExp[]` — `/\bagree(ment)?s?\b/i, /ai-powered/i, /agentic/i, /seamless/i, /single source of truth/i, /real-time/i, /observability/i, /trust your data/i, /reconcil/i, /revenue leakage/i, /360°/`.
  - `RETIRED: string[]` — paths nothing may link to.
  - `CHECK_UNUSED_CSS: boolean`.
- `check-site.mjs` uses only `node:fs`, `node:path`, `node:process`. Route → file: `'/'` → `dist/client/index.html`; `'/a/b'` → `dist/client/a/b.html`.

- [ ] **Step 1: Write the expectations for the site as it is today**

`PAGES` = `/` (title "Darpan"), `/notes` (title "Notes"), `/privacy`, `/terms`, each with one `mustContain` string copied from today's page. `VOICE_CHECKED = []`, `RETIRED = []`, `CHECK_UNUSED_CSS = false`.

- [ ] **Step 2: Write `check-site.mjs`**

Checks, each failure printed as `FAIL <check> <path>: <detail>`, exit 1 on any failure, else print `check-site: <n> checks passed`:
1. `page-exists` — each `PAGES` file exists.
2. `title` — `<title>` contains `title`; no two `PAGES` share an identical `<title>`.
3. `content` — visible text contains each `mustContain`. Visible text = HTML with `<script>…</script>` and `<style>…</style>` removed, tags stripped, entities `&amp; &lt; &gt; &quot; &#x27; &#39; &rsquo; &lsquo; &ldquo; &rdquo; &mdash; &ndash; &middot; &nbsp; &rarr;` decoded, whitespace collapsed.
4. `voice` — no `BANNED` match in the visible text of `VOICE_CHECKED` pages; print the matched text with 30 chars of context.
5. `links` — every `href="/…"` (not `//`) in every `dist/client/**/*.html`, minus `#hash`/`?query`, resolves to an existing file (`/notes/<slug>` included) and is not in `RETIRED`.
6. `img-label` — every element with `role="img"` has a non-empty `aria-label`.
7. `redirects` — for each `RETIRED` path, `netlify.toml` has a `[[redirects]]` block with `from = "<path>"`, `to = "/"`, `status = 301`, `force = true`.
8. `unused-css` (only when `CHECK_UNUSED_CSS`) — every `.vl-[a-z0-9-]+` class selector in `src/styles.operational.css` appears as a token in some file under `src/` other than the CSS.

- [ ] **Step 3: Build and run**

Run: `NODE_OPTIONS=--dns-result-order=ipv4first npm run build && npm run check`
Expected: `check-site: <n> checks passed`, exit 0.

- [ ] **Step 4: Prove it can fail**

Temporarily add `'/'` to `VOICE_CHECKED`; run `npm run check`. Expected: `FAIL voice / …` on today's homepage (it says "reconcile"). Revert.

- [ ] **Step 5: Stage**

```bash
git add scripts/check-site.mjs scripts/site-expectations.mjs package.json
```

---

### Task 2: Shared site data and the break list

**Files:**
- Create: `src/data/site.ts`, `src/components/BreakList.tsx`
- Modify: `src/styles.operational.css` (BreakList styles, reusing existing tokens)

**Interfaces:**
- Produces (`src/data/site.ts`):
  - `WALKTHROUGH_HREF = 'mailto:hello@drpn.ai?subject=Darpan%20walkthrough'`
  - `NAV_ITEMS: ReadonlyArray<readonly [label: string, href: string]>` = How it works `/#how`, Works with `/works-with`, Tour `/tour`, Security `/security`, Notes `/notes`.
  - `type Connector = { name: string; reads: string }`; `CONNECTORS` = Shopify, HotWax Commerce, NetSuite, "MySQL, PostgreSQL and IBM Db2" (confirm the list against `darpan-docs/guides/connect-database.mdx`), "Files over SFTP". `reads` is one plain line per connector (e.g. NetSuite: "sales orders, fulfilments, invoices, return authorizations, credit memos").
  - `type SecurityFact = { id: 'no-changes' | 'sealed' | 'own-lane'; heading: string; body: string }`; `SECURITY_FACTS` with the three cards from the spec's Homepage §6. Headings verbatim: "It doesn't change your records.", "Credentials stay sealed.", "Each company stays in its own lane." Bodies one sentence each, from the Facts register.
  - `HOME_NOTE_SLUGS = ['reconcile-your-integration-dropped-records', 'spreadsheet-to-system-migration-checklist', 'fuzzy-matching-records'] as const`
- Produces (`src/components/BreakList.tsx`):
  - `type BreakItem = { text: string; meta: string; state: 'open' | 'closed'; badge: string }`
  - `BreakList(props: { title: string; summary: string; items: readonly BreakItem[]; label: string })` — renders the mockup's panel (header row: title left, summary right; one row per item; badge styled drift for open, agree for closed). Root has `role="img"` and `aria-label={label}`.

- [ ] **Step 1: Write `site.ts` and `BreakList.tsx`** to the interfaces above. Port the panel look from the mockup's `.panel/.ph/.fr/.pill` rules into new `vl-breaks*` classes in `styles.operational.css`.
- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Stage**

```bash
git add src/data/site.ts src/components/BreakList.tsx src/styles.operational.css
```

(No page uses these yet; Tasks 3–6 exercise them through the harness.)

---

### Task 3: Security page

**Files:**
- Create: `src/routes/security.tsx`
- Modify: `vite.config.ts` (add `{ path: '/security' }`), `scripts/site-expectations.mjs`

**Interfaces:**
- Consumes: `SECURITY_FACTS`, `WALKTHROUGH_HREF` from `src/data/site.ts`; `VlPage` from `src/components/VlChrome.tsx`.

- [ ] **Step 1: Add the expectation**

```js
{ path: '/security', title: 'Security', mustContain: [
  'What Darpan reads, and where it stays',
  "It doesn't change your records.",
  'archive',            // the SFTP move is disclosed
  'Credentials stay sealed.',
  'Each company stays in its own lane.',
  'runs in the cloud',
] }
```
and add `'/security'` to `VOICE_CHECKED`.

- [ ] **Step 2: Run to see it fail**

Run: `npm run check` → `FAIL page-exists /security`.

- [ ] **Step 3: Build the page**

H1 "What Darpan reads, and where it stays." Sections in this order, every sentence traceable to a Facts register row (spec): **What Darpan reads** (one line per `CONNECTORS` entry); **What it changes** ("Nothing in your records." + the SFTP `archive/` move in one sentence); **Credentials** (passwords, API tokens and private keys stored encrypted, write-only once saved); **Your company's data** (every read filtered to the company you are signed in to; deny by default; another company's record answers like one that does not exist; covered by automated tests — no internal names); **Where it runs** ("Darpan runs in the cloud."). End with CTA pair: "Talk to us →" / "Read the docs" (`https://docs.drpn.ai`). `head`: title "Security — Darpan", one-sentence description.

- [ ] **Step 4: Build and check**

Run: `NODE_OPTIONS=--dns-result-order=ipv4first npm run build && npm run check`
Expected: pass.

- [ ] **Step 5: Stage**

```bash
git add src/routes/security.tsx vite.config.ts scripts/site-expectations.mjs src/routeTree.gen.ts
```

---

### Task 4: Works-with hub and pair pages

**Files:**
- Create: `src/data/works-with.ts`, `src/routes/works-with/index.tsx`, `src/routes/works-with/$pair.tsx`
- Modify: `vite.config.ts` (add `/works-with` and the four pair paths), `scripts/site-expectations.mjs`

**Interfaces:**
- Consumes: `BreakList`, `CONNECTORS`, `WALKTHROUGH_HREF`, `VlPage`.
- Produces (`src/data/works-with.ts`):
  - `type PairSlug = 'shopify-netsuite' | 'hotwax-netsuite' | 'shopify-hotwax' | 'databases-and-files'`
  - `type SystemPair = { slug: PairSlug; name: string; h1: string; description: string; summary: string; reads: ReadonlyArray<{ system: string; records: string }>; statements: readonly string[]; exampleBreak: BreakItem }`
  - `PAIRS: readonly SystemPair[]` (order as `PairSlug`), `findPair(slug: string): SystemPair | undefined`.

- [ ] **Step 1: Add expectations**

`/works-with` (title "Works with", mustContain "Reads the systems you already run" and each pair `name`); one entry per pair (title = pair `name`; mustContain its `h1`, its first statement, and "Talk to us"). Add all five paths to `VOICE_CHECKED`.

Fixed values:
- `shopify-netsuite` statements include "Every exchange Shopify completes is in NetSuite." and "Every return Shopify completes with a refund has a refunded RMA in NetSuite."
- `databases-and-files` says the database account is read-only and Darpan only runs SELECT, and that you write your own statements.

- [ ] **Step 2: Run to see it fail**

Run: `npm run check` → `FAIL page-exists /works-with …`.

- [ ] **Step 3: Source the statements**

For each pair, collect 5–8 statements from the production audit statement data: `grep -rn "AuditStatement" darpan-backend/runtime/component/*/data` and `tools/netsuite-chain-config/` in the wrapper repo (`/Users/aditipatel/sandbox/darpan-master`). Rewrite each the way a customer would say it; strip every client name, id, store, subsidiary and tenant-specific term. Keep a list of source → published statement in the task report for Aditi's review (Task 9).

- [ ] **Step 4: Build the data and pages**

Hub: H1 "Reads the systems you already run." One card per `PAIRS` entry (name, `summary`, link). Pair page: `h1`; "What Darpan reads" from `reads`; "What Darpan checks" listing `statements`; one `BreakList` with `exampleBreak` (title "This morning · 06:00"); CTA pair "Talk to us →" / "See a morning's breaks" (`/tour`). `$pair` loader: `findPair(params.pair)` or `throw redirect({ to: '/works-with', statusCode: 301 })`. `head` title `${name} — Darpan`, description `description`.

- [ ] **Step 5: Build and check**

Run: `NODE_OPTIONS=--dns-result-order=ipv4first npm run build && npm run check`
Expected: pass.

- [ ] **Step 6: Unknown slug and phone width**

Run: `npm run dev`, then `curl -sI http://localhost:3000/works-with/salesforce-netsuite`. Expected: `301` (or `307`) with `location: /works-with`. In a browser at 375px width, open one pair page: statements and break list in one column, no horizontal scroll.

- [ ] **Step 7: Stage**

```bash
git add src/data/works-with.ts src/routes/works-with vite.config.ts scripts/site-expectations.mjs src/routeTree.gen.ts src/styles.operational.css
```

---

### Task 5: Tour (drawn mockups)

**Files:**
- Create: `src/routes/tour.tsx`, `src/components/tour/TourFrames.tsx`
- Modify: `vite.config.ts` (add `/tour`), `scripts/site-expectations.mjs`, `src/styles.operational.css`

**Interfaces:**
- Consumes: `BreakList`, `VlPage`, `WALKTHROUGH_HREF`.
- Produces: `TOUR_FRAMES: ReadonlyArray<{ id: string; caption: string; label: string; render: () => JSX.Element }>` in `TourFrames.tsx`.

- [ ] **Step 1: Add the expectation**

`/tour` (title "Tour"; mustContain "One morning, start to finish" and each caption below). Add `/tour` to `VOICE_CHECKED`.

Frames, in order (captions verbatim; records invented and obviously generic: "Order 1042", "Exchange for order 1038"):
1. `audit` — "One audit holds the statements your team wrote." (audit name "Daily checks", period "A day", four statements with open counts.)
2. `check` — "Each statement is tested by a check that reads both systems."
3. `morning` — "At 06:00, this morning's findings arrive." (`BreakList` with two open, one closed.)
4. `finding` — "A finding shows its owner, the evidence on each side and, when Darpan can name it, the cause." (Owner "Ops", evidence row per system, cause "Original order not fulfilled", fix "Fulfil the original order; the exchange follows.", first found date.)
5. `schedule` — "One schedule runs every check, in your time zone."
6. `closed` — "When a later check sees it fixed, the finding closes and keeps its history."

Each frame root: `role="img"` + `aria-label` describing its content (Review Focus 5).

- [ ] **Step 2: Run to see it fail** — `npm run check` → `FAIL page-exists /tour`.
- [ ] **Step 3: Build the page** — H1 "One morning, start to finish."; frames in order, caption under each; reveal via `data-reveal`; ends with CTA pair "Talk to us →" / "See what Darpan checks" (`/works-with`). Labels in frames match `darpan-docs/guides/audits.mdx` (Statements, Add check, Grace days, Fix owner, Pending/Open).
- [ ] **Step 4: Build and check** — as Task 3 Step 4. Expected: pass.
- [ ] **Step 5: Stage**

```bash
git add src/routes/tour.tsx src/components/tour vite.config.ts scripts/site-expectations.mjs src/routeTree.gen.ts src/styles.operational.css
```

---

### Task 6: New chrome and homepage

**Files:**
- Create: `src/components/home/` — `Hero.tsx`, `Gap.tsx`, `HowItWorks.tsx`, `Breadth.tsx`, `WorksWithStrip.tsx`, `SecurityStrip.tsx`, `FinanceBand.tsx`, `Close.tsx`, `NotesStrip.tsx`
- Modify: `src/routes/index.tsx` (rewrite: reveal effect + composition only), `src/components/VlChrome.tsx` (nav from `NAV_ITEMS`, CTA "Talk to us", footer line + Docs/Developers links), `src/components/MobileMenu.tsx` (import `NAV_ITEMS` from `@/data/site`), `src/routes/__root.tsx` (default title/description/og/twitter), `src/styles.operational.css`, `scripts/site-expectations.mjs`

**Interfaces:**
- Consumes: everything in `src/data/site.ts`, `BreakList`, `PAIRS`, `writingEntries`.
- `index.tsx` no longer exports `navItems`.

- [ ] **Step 1: Add expectations**

Replace the `/` entry: title "Darpan"; mustContain:
```js
['Your systems are up. Are they still lining up?',
 'Every sync says it worked. Nobody checks that it did.',
 'Say it. Check it. Explain it. Keep it.',
 'Each break arrives with evidence and an owner.',
 'Anywhere two systems have to line up.',
 'Every closed deal has an active subscription.',
 'Reads the systems you already run.',
 'Each company stays in its own lane.',
 'And month-end has nothing left to chase.',
 'Tomorrow your systems will report success. Darpan will tell you whether they still line up.',
 'Talk to us']
```
Add `'/'` to `VOICE_CHECKED`.

- [ ] **Step 2: Run to see it fail** — `npm run check` → `FAIL content /` and `FAIL voice /`.
- [ ] **Step 3: Chrome** — `VlHeader` maps `NAV_ITEMS`; CTA text "Talk to us" → `WALKTHROUGH_HREF`. Footer: "© {year} Darpan. Checks for the work between your systems." + Docs (`https://docs.drpn.ai`), Developers (`https://developers.drpn.ai`), LinkedIn. The homepage uses `VlHeader`/`VlFooter` (drop its private `Header`/`Footer`).
- [ ] **Step 4: Homepage** — sections in the spec's order (Homepage §1–9) with the spec's copy; `HowItWorks` root `id="how"`; the hero list is a `BreakList` with the mockup's three rows (generic order numbers) and `label` describing them; `WorksWithStrip` renders `CONNECTORS` names and links to `/works-with`; `SecurityStrip` renders `SECURITY_FACTS` and links to `/security`; `NotesStrip` renders `HOME_NOTE_SLUGS` via `writingEntries` (keep today's sticky-note card look). Every section uses `data-reveal` under the existing reveal effect; keep the effect's reduced-motion early return.
- [ ] **Step 5: Root meta** — title "Darpan — checks for the work between your systems"; description "Your integrations report success. Darpan checks the outcome every morning and keeps each break on a list, with its owner and evidence, until it's fixed."; og/twitter mirror these.
- [ ] **Step 6: Build and check** — as Task 3 Step 4. Expected: pass.
- [ ] **Step 7: Browser** — `npm run dev`; check `/` at 1280px and 375px (no horizontal scroll; hero list, steps and strip stack), with DevTools "prefers-reduced-motion: reduce" (all text visible), and with JS disabled on the built site (`npx vite preview` after build: all text visible).
- [ ] **Step 8: Stage**

```bash
git add src/routes/index.tsx src/components/home src/components/VlChrome.tsx src/components/MobileMenu.tsx src/routes/__root.tsx src/styles.operational.css scripts/site-expectations.mjs
```

---

### Task 7: Retire `/why` and `/customers`

**Files:**
- Delete: `src/routes/why.tsx`, `src/routes/customers.tsx`
- Modify: `vite.config.ts` (remove both from `pages`), `netlify.toml`, `src/components/sections/HeroSection.tsx:32` (`/customers` → `/`), `src/components/sections/DifferenceSection.tsx:69` (`/why` link → `/`, text "See how Darpan works →"), `scripts/site-expectations.mjs`
- Delete if no other importer remains: `src/components/sections/ReconciledBySection.tsx`

- [ ] **Step 1: Add expectations** — `RETIRED = ['/why', '/customers']`.
- [ ] **Step 2: Run to see it fail** — `npm run check` → `FAIL links …/why` (from `/notebook`) and `FAIL redirects /why`.
- [ ] **Step 3: Retire** — delete the routes, repoint the two links, add to `netlify.toml` (beside the existing `/writing` blocks):

```toml
[[redirects]]
  from = "/why"
  to = "/"
  status = 301
  force = true
[[redirects]]
  from = "/customers"
  to = "/"
  status = 301
  force = true
```
- [ ] **Step 4: Build and check** — as Task 3 Step 4. Expected: pass; `dist/client/why.html` and `customers.html` absent (`rm -rf dist` before building if stale files linger).
- [ ] **Step 5: Stage**

```bash
git add -A src/routes/why.tsx src/routes/customers.tsx src/components/sections vite.config.ts netlify.toml scripts/site-expectations.mjs src/routeTree.gen.ts
```

---

### Task 8: Delete what only the old homepage used

**Files:**
- Delete (each only after `grep -rn "<Name>" src` shows no remaining importer): `src/components/StackScene.tsx`, `src/components/StackCanvas.tsx`
- Modify: `package.json`/`package-lock.json` (remove `three`, `@react-three/fiber`, `@react-three/drei` if nothing imports them), `src/styles.operational.css` (remove `vl-*` rules nothing references), `scripts/site-expectations.mjs`

- [ ] **Step 1: Add expectation** — `CHECK_UNUSED_CSS = true`.
- [ ] **Step 2: Run to see it fail** — `npm run check` → `FAIL unused-css` listing the dead selectors (stack scene, proof stats, rules panel, audiences, agreement check…).
- [ ] **Step 3: Delete** — dead components, then dead CSS rules (whole rule blocks, including their media-query copies), then the three.js packages with `npm uninstall three @react-three/fiber @react-three/drei` if `grep -rn "three\|@react-three" src` is empty.
- [ ] **Step 4: Verify** — `npx tsc --noEmit`, then build and `npm run check`. Expected: all pass. Compare `du -sh dist/client` before/after and note it in the report.
- [ ] **Step 5: Stage**

```bash
git add -A src/components package.json package-lock.json src/styles.operational.css scripts/site-expectations.mjs
```

---

### Task 9: Review gate, commit, hand-off

**Files:** none new. Wrapper: `roadmap/BACKLOG.md` (`DAR-MKT-001`).

- [ ] **Step 1: Full verification** — `rm -rf dist && npx tsc --noEmit && NODE_OPTIONS=--dns-result-order=ipv4first npm run build && npm run check`. Expected: all pass. Paste the `check-site` line into the report.
- [ ] **Step 2: Browser pass** — every new page at 1280px and 375px: `/`, `/works-with`, one pair page, `/tour`, `/security`; reduced motion on `/`. Note anything off.
- [ ] **Step 3: Aditi review** — send her: the staged file list (`git diff --cached --stat`), the published statements per pair with their de-identified sources (Task 4 Step 3), the three homepage note slugs, and a local preview (`npx vite preview`). **Stop until she approves.**
- [ ] **Step 4: Commit** (after approval only)

```bash
git commit -m "feat(site): DAR-MKT-001 rethink — ops framing, works-with, tour, security; retire /why, /customers

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```
This commit deploys at the next 20:00 IST publish (or when Aditi pushes).
- [ ] **Step 5: After deploy** — `curl -sI https://drpn.ai/why` and `/customers` → `301` to `/`; open each new page on drpn.ai. Tick the `prod-owed` boxes on `DAR-MKT-001` and add a progress note with `LLM time this update: <n> minutes`.
