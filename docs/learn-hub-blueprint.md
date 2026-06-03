# Darpan Learn Hub — Architecture & Build Blueprint

_Status: proposal for review (Phase 0). No code or new content written yet._
_Author: planning pass, 2026-06-03. Surface: `darpan-marketing-site`._

This document promotes the existing **Writing** section into a structured, navigable **Learn hub**: a tool-agnostic, AI-search-optimized place where retail finance and ops teams come to learn how to reconcile and manage data syncs themselves — by hand, in a spreadsheet, or with an AI agent.

It is a plan. Nothing here changes the site until you approve it. Every file path, type, route, and slug below has been checked against the current code.

---

## 1. The idea, in one paragraph

People who do reconciliation by hand are our exact buyers, and right now they search Google and ChatGPT for "how do I reconcile Shopify against NetSuite" and get thin, vendor-pitch answers. The Learn hub is the opposite: genuinely useful, no selling, the canonical free guide to doing reconciliation yourself. The strategic payoff (consistent with the established content rule — _teach, don't sell_) is that when an operator's manual or spreadsheet method hits its ceiling, Darpan is already the name they trust, and the name the LLMs cite. We win by being the best teacher, not the loudest ad.

**North star: the visitor leaves better off TODAY, whether or not they ever buy.** Every page is judged by one test — _"could a stressed operator land here from a search at 11pm during month-end close and have their problem meaningfully easier within five minutes?"_ That means copy-paste formulas, copy-paste prompts, and one-click downloads — not a funnel. If a page reads like an ad, it has failed the test.

**Evidence rule: no tutorial ships without a real Reddit thread behind it.** This hub is fed by the existing demand engine (`research/`), and every piece in the backlog below cites the thread(s) whose pain it answers. If we can't point to operators actually struggling with something, we don't write it.

This is already the stated intent of the codebase — `writing-content.tsx` opens with _"This is the 'learn' library."_ We're making that real in the navigation and the structure, not inventing it.

---

## 2. What exists today (the foundation we build on)

| Piece | File | What it does |
|---|---|---|
| Article metadata | `src/data/writing-entries.ts` | `WritingEntry`: slug, date, category, title, meta. 14 entries. |
| Article bodies | `src/data/writing-content.tsx` | `Article`: slug, title, description, keywords, lead, `blocks[]`, `faq[]`. Rich block types (p, h2/h3, ul/ol, table, callout, code, quote). |
| Renderer | `src/components/WritingArticle.tsx` | Renders blocks + FAQ, emits **Article** and **FAQPage** JSON-LD. Canonical URL, OG/Twitter meta. |
| Index route | `src/routes/writing.tsx` | `/writing` — flat reverse-chron list of all entries. |
| Article route | `src/routes/writing/$slug.tsx` | `/writing/$slug` — per-article meta + canonical. |
| Homepage teaser | `src/components/sections/WritingSection.tsx` | Section 05, shows latest 4. |
| Content engine | `docs/content-strategy.md` + `research/` | Reddit-demand ranking that decides what to write next. |

**Assessment:** the content model and renderer are good and extensible. The gap is purely structural — there's no curriculum, no tracks, no levels, no "where do I start," and the SEO is Article+FAQ only (no HowTo, Course, Breadcrumb, or glossary schema). That's exactly what this blueprint adds.

---

## 3. Information architecture

### 3.1 The two-axis model

Operators search two ways, so we organize two ways:

- **By method** — _how_ do I do this? (by hand / in a spreadsheet / with AI)
- **By scenario** — _what_ am I reconciling? (Shopify↔ERP, NetSuite, OMS, bank, marketplace payouts…)

Everything sits on a spine of **Foundations** (the concepts you need before either axis makes sense). This maps cleanly onto the four tracks you selected.

```
/learn  (hub landing)
│
├─ Foundations        ← start here: the concepts every reconciliation depends on
├─ By hand            ← manual, repeatable methods
├─ In a spreadsheet   ← Excel / Google Sheets automation
├─ With AI            ← prompts + agent workflows (Cowork, ChatGPT)
└─ By system          ← scenario guides that pull from all three methods
   (glossary lives alongside as a reference shelf)
```

### 3.2 The signature teaching device: the Automation Ladder

Every scenario guide answers the user's literal question — _"what can I do by hand, and what can AI automate?"_ — with one recurring framework:

> **Manual → Spreadsheet-assisted → AI-assisted → Fully automated**

Each guide shows the same reconciliation climbing the ladder, and is honest about where each rung tops out (volume, frequency, error risk, audit trail). This is the teaching backbone, it directly serves the empowerment goal, and it naturally reveals where a dedicated tool earns its place — without a sales pitch. It also gives us a reusable visual/component and a strong, citable mental model that LLMs can quote.

### 3.3 Levels within each track

Three tags drive a "start here → go deeper" progression:

- **Start** — no prerequisites, defines its terms.
- **Core** — assumes Foundations; the working method.
- **Advanced** — automation, scale, edge cases, opinion/engineering notes.

### 3.4 Route map

| Route | Page | Notes |
|---|---|---|
| `/learn` | Hub landing | Hero, 4 track cards, "start here" path, featured guides, Automation Ladder, glossary link |
| `/learn/foundations` | Track page | Ordered curriculum + level grouping |
| `/learn/by-hand` | Track page | |
| `/learn/spreadsheets` | Track page | |
| `/learn/ai` | Track page | |
| `/learn/systems` | Track page | Scenario index (Shopify, NetSuite, OMS, bank, marketplace) |
| `/learn/glossary` | Reference | Definitions hub; each term is anchor-linkable |
| `/learn/<slug>` | Article | Canonical article home (migrated from `/writing/<slug>`) |

**URL migration recommendation:** the site is new (articles dated May 2026), so the SEO cost of moving `/writing/<slug>` → `/learn/<slug>` now is near-zero and the taxonomy is cleaner long-term. Do it **with 301 redirects** from every old `/writing/*` path, keep `/writing` as an optional dated "latest notes" feed (or redirect it to `/learn`). If you'd rather not touch URLs at all, the hub still works by linking to existing `/writing/<slug>` paths — it's a pure-additive option. My recommendation is migrate-with-redirects; the alternative is documented in §8.

---

## 4. Mapping the 14 existing articles

Every current article finds a home. This also exposes which tracks are thin.

| # | Existing slug | Track | Level |
|---|---|---|---|
| 1 | `what-we-mean-when-we-say-primary-id` | Foundations | Start |
| 2 | `schemas-explained-describe-your-data` | Foundations | Start |
| 3 | `a-taxonomy-of-reconciliation-differences` | Foundations | Core |
| 4 | `two-way-vs-three-way-reconciliation` | Foundations | Core |
| 5 | `the-cost-of-variance-you-cant-see` | Foundations | Start (the "why") |
| 6 | `how-to-reconcile-two-systems-by-hand` | By hand | Core |
| 7 | `reconcile-two-files-in-excel-with-xlookup` | Spreadsheets | Core |
| 8 | `find-missing-rows-in-excel-countif-match` | Spreadsheets | Core |
| 9 | `prompting-ai-to-help-reconcile-two-files` | With AI | Core |
| 10 | `can-an-ai-agent-reconcile-your-data` | With AI | Start |
| 11 | `reconcile-shopify-orders-against-your-erp` | By system | Core |
| 12 | `netsuite-reconciliation-inventory-and-gl` | By system | Core |
| 13 | `reconcile-your-oms-against-the-source-of-truth` | By system | Core |
| 14 | `why-reconciliation-belongs-at-the-data-layer` | Foundations | Advanced (opinion) |

**Coverage read:**

- **Foundations** — strong (6 pieces). Solid spine.
- **By system** — decent (3), but missing the highest-demand scenarios (bank rec, payouts).
- **Spreadsheets** — two good how-tos; no templates, no bank-rec-in-Excel, no Sheets variant.
- **With AI** — two pieces; **no ready-to-use prompt pack** and **no Cowork end-to-end walkthrough** — both of which you specifically want.
- **By hand** — **thinnest track: one article.** Needs a checklist, a monthly-close routine, a tick-and-tie method.

---

## 5. New content backlog — every piece cited to a Reddit thread

Demand numbers are from `research/data/recon_topic_demand.md`; the threads are the specific pains each tutorial answers (`research/data/recon_questions.md`). Nothing ships without a thread.

**Tier 1 — highest unanswered demand (write first):**

1. **Bank reconciliation, step by step** — `bank-reconciliation-step-by-step` · By system + full Automation Ladder · _23 unanswered · pain 414, the largest pool in the corpus._
   - ["Anyone else spending 3+ hours monthly on reconciliation that should take 30 minutes?"](https://reddit.com/r/QuickBooks/comments/1mgiw71/anyone_else_spending_3_hours_monthly_on/) — 34 comments, weak answers.
   - ["Why does bank reconciliation feel like it's never truly 'done'?"](https://reddit.com/r/Accounting/comments/1qq2uee/why_does_bank_reconciliation_feel_like_its_never/)

2. **What auditors look for** — `what-auditors-look-for` · Foundations/Operations · _22 unanswered · pain 313._
   - ["Why do accountants hate reconciliations?"](https://reddit.com/r/Accounting/comments/1mcea6v/why_do_accountants_hate_reconciliations/)

3. **Why Shopify deposits never match sales (payout bundling)** — `why-shopify-deposits-never-match-sales` · By system · _14 unanswered · pain 300._
   - ["Shopify Payouts Are a Nightmare to Reconcile—Anyone Found a Good Solution?"](https://reddit.com/r/smallbusiness/comments/1jnznxu/shopify_payouts_are_a_nightmare_to/)
   - ["Do you guys actually check Shopify payouts or just trust them?"](https://reddit.com/r/shopify/comments/1qczj6h/do_you_guys_actually_check_shopify_payouts_or/)

4. **CSV gotchas: encoding, delimiters, drift** — `csv-gotchas-encoding-delimiters` · Spreadsheets/Foundations · _13 unanswered · pain 238._
   - ["Customer Payments from Marketplaces" (NetSuite settlement-file handling)](https://reddit.com/r/Netsuite/comments/y9r10m/customer_payments_from_marketplaces/)

5. **Marketplace payout reconciliation** — `marketplace-payout-reconciliation` · By system · _11 unanswered · pain 135._
   - ["Is anyone else dealing with payment gateway deposits that never match what's in QuickBooks?"](https://reddit.com/r/Bookkeeping/comments/1s8h7ry/is_anyone_else_dealing_with_payment_gateway/)
   - ["Anyone struggling with reconciling Amazon settlements with ERP payouts?"](https://reddit.com/r/FulfillmentByAmazon/comments/1mezcax/anyone_struggling_with_reconciling_amazon/)

6. **One-way vs two-way sync, explained** — `one-way-vs-two-way-sync-explained` · Foundations · _8 unanswered · pain 143._
   - ["How are growing D2C brands handling payout reconciliation?"](https://reddit.com/r/ecommerce/comments/1r568lr/how_are_growing_d2c_brands_handling_payout/) — pain 25, the highest-pain single unanswered question in the bank.

**Tier 2 — track-completing pieces (fill the thin "by hand", "spreadsheet", and download gaps):**

7. **The monthly reconciliation routine (by hand)** — `monthly-reconciliation-routine` · By hand · Core.
   - ["How much time does your monthly bookkeeping/reconciliation take?"](https://reddit.com/r/smallbusiness/comments/1ncesi9/how_much_time_does_your_monthly/) — "entire weekends matching transactions."
   - ["Anyone else spending 3+ hours monthly…"](https://reddit.com/r/QuickBooks/comments/1mgiw71/anyone_else_spending_3_hours_monthly_on/)

8. **A tick-and-tie checklist (and what order to do it in)** — `tick-and-tie-checklist` · By hand · Start.
   - ["What order do you do a QBO cleanup in? I think sequence matters more than almost anything else."](https://reddit.com/r/Bookkeeping/comments/1st9ob6/what_order_do_you_do_a_qbo_cleanup_in_i_think/)
   - ["Think I'm finally understanding how to do this, can someone please correct me if I'm wrong?"](https://reddit.com/r/Bookkeeping/comments/1m83gtc/think_im_finally_understanding_how_to_do_this_can/)

9. **Bank reconciliation in Excel (pairs with #1)** — `bank-reconciliation-in-excel` · Spreadsheets · Core.
   - ["How do you guys handle partial payment reconciliation without losing your mind?"](https://reddit.com/r/tax/comments/1q99c0e/how_do_you_guys_handle_partial_payment/) — "Excel's VLOOKUP/XLOOKUP isn't cutting it because the unique identifiers don't align."
   - ["Anyone else still doing a lot of manual reconciliation in Excel?"](https://reddit.com/r/Accounting/comments/1szfy9x/anyone_else_still_doing_a_lot_of_manual/)

10. **Free reconciliation spreadsheet template (download)** — `reconciliation-spreadsheet-template` · Spreadsheets · Start. The literal answer operators are already giving each other.
    - ["How are growing D2C brands handling payout reconciliation?" (Shopify variant)](https://reddit.com/r/shopify/comments/1r566ne/how_are_growing_d2c_brands_handling_payout/) — top reply: _"create one clean master sheet that pulls Shopify payouts and gateway fees weekly and reconcile against bank deposits line by line. The no-cost fix is discipline."_ We ship that sheet.
    - ["GSTR-1 Filing: Should I use GST software or just stick to Excel?"](https://reddit.com/r/smallbusiness/comments/1r2vzvu/gstr1_filing_should_i_use_gst_software_or_just/)

**Tier 3 — the "With AI" track (read the demand caveat below first):**

> ⚠️ **Honest evidence gap.** In the corpus, `ai-prompting` and `ai-agent` both score **pain 0 / 0 unanswered** — essentially nobody searches "AI prompt to reconcile files." So the AI track is **not** justified as a keyword play. It *is* justified as the concrete answer to two loud, adjacent pains: manual-Excel fatigue and "is AI here actually real or hype?" Frame every AI piece as a response to those threads, not as standalone "prompt" content.

11. **Reconcile two files with an AI agent, end to end (Cowork walkthrough)** — `reconcile-two-files-with-an-ai-agent` · With AI · Core. The "you can do this yourself today" payoff for the manual-fatigue crowd.
    - ["Anyone else still doing a lot of manual reconciliation in Excel?"](https://reddit.com/r/Accounting/comments/1szfy9x/anyone_else_still_doing_a_lot_of_manual/)
    - ["How much time does your monthly bookkeeping/reconciliation take?"](https://reddit.com/r/smallbusiness/comments/1ncesi9/how_much_time_does_your_monthly/)

12. **The reconciliation prompt pack (copy-paste)** — `reconciliation-prompt-pack` · With AI · Start. Answers _"AI requires very clear directions"_ by handing over the directions.
    - ["Are agentic AI tools really making finance teams and CFOs more effective, or is it just hype?"](https://reddit.com/r/FPandA/comments/1o920tp/are_agentic_ai_tools_really_making_finance_teams/) — top answer (55 pts): AI "require[s] very clear directions… a lot of learning/teaching to be done."

13. **Where AI reconciliation breaks (and what to do instead)** — `where-ai-reconciliation-breaks` · With AI · Advanced. The honest top of the AI rung; defuses the skepticism in the same hype thread.

**Refresh candidates** (already published, high residual demand — expand + add an FAQ rather than write net-new):

- `reconcile-shopify-orders-against-your-erp` — _27 unanswered, pain 412._
- `netsuite-reconciliation-inventory-and-gl` — _22 unanswered, pain 251._
- `a-taxonomy-of-reconciliation-differences` — _12 unanswered, pain 272._ Add the duplicate-payment angle: ["Small business AP — how do you catch duplicate payments or overcharges?"](https://reddit.com/r/QuickBooks/comments/1nog8xi/small_business_ap_how_do_you_catch_duplicate/) (pain 21).

**Next in queue** (cited, lower demand — for later cycles): multi-currency reconciliation (pain 103 — ["Is payment reconciliation supposed to get this messy once international business scales?"](https://reddit.com/r/smallbusiness/comments/1tl8prz/is_payment_reconciliation_supposed_to_get_this/)); 3PL inventory sync / oversells (pain 70 — ["What's the real bottleneck in your BFCM prep…"](https://reddit.com/r/smallbusiness/comments/1p0lv6f/whats_the_real_bottleneck_in_your_bfcm_prep_this/)).

The cadence stays as-is: the Reddit miner keeps ranking demand; the hub just gives every new piece a track, a level, prerequisite/next links, and a cited thread.

---

## 6. Content model changes (small, backward-compatible)

Extend the existing types — no rewrite of the 14 articles required; new fields are optional.

```ts
// writing-entries.ts — add to WritingEntry
track?: 'foundations' | 'by-hand' | 'spreadsheets' | 'ai' | 'systems'
level?: 'start' | 'core' | 'advanced'
format?: 'concept' | 'how-to' | 'guide' | 'reference' | 'prompt-pack' | 'template'
updated?: string          // freshness signal for SEO + GEO
system?: string[]         // e.g. ['shopify','netsuite'] for scenario filtering

// writing-content.tsx — add to Article
prerequisites?: string[]  // slugs — powers "read these first"
related?: string[]        // slugs — powers "related" + internal linking
takeaways?: string[]      // TL;DR bullets rendered at top (LLM-extractable)
howto?: { name: string; steps: { name: string; text: string }[] }  // drives HowTo JSON-LD
```

A small `tracks.ts` describes each track (slug, title, one-line promise, ordered curriculum) so the hub and track pages render from data, matching the existing data-driven pattern.

---

## 7. AI-search optimization (GEO/AEO) — the part that compounds

The site already does the basics well (answer-first leads, FAQ schema, clean canonical URLs, comparison tables). The upgrades that make us _the cited source_:

**Schema / structured data**
- **HowTo** JSON-LD on every procedural article (drives from the new `howto` field). Currently missing — biggest single win for step-by-step queries and AI extraction.
- **Course / LearningResource** on the hub and track pages — the hub literally is a course; this is a strong entity signal.
- **BreadcrumbList** on hub → track → article (we have the hierarchy now).
- **DefinedTerm / DefinedTermSet** on the glossary — wins "what is X reconciliation" and feeds LLM definitions.
- Keep and expand **FAQPage** (already present).

**Content structure for extraction**
- **TL;DR / key takeaways** block at the top of every piece (the new `takeaways` field) — the snippet LLMs quote.
- One clear question-shaped H2 per section with the answer in the first sentence under it (already the house style — formalize it).
- Numbered steps for procedures; comparison tables for "X vs Y"; explicit term definitions.

**Crawlability for LLMs**
- Add **`/llms.txt`** at the site root listing the hub, tracks, and canonical article URLs with one-line descriptions.
- Expose a **clean text/markdown version** of each article (e.g. `/learn/<slug>.md`) — LLM crawlers prefer plain text.
- Ensure the sitemap includes all `/learn/*` routes; submit it.

**Internal linking (authority + navigability)**
- Prerequisites/next-in-track/related links on every article (from the new fields).
- Hub → track → article and glossary cross-links throughout.
- This is also what makes the hub feel like a curriculum instead of a blog.

**Measurement** — track AI visibility explicitly (there's an `ai-visibility` capability available): are we cited by ChatGPT/Claude/Gemini/Perplexity for the target questions? Pair with organic impressions per track and glossary-term rankings.

---

## 8. Downloads & frictionless delivery (the "easier today" layer)

The hub's promise is _help today_, so the tips have to be usable without setup. Three reusable, low-maintenance mechanisms:

**1. Copy buttons everywhere.** Every formula, prompt, and code block gets a one-click "Copy" affordance (extend the existing `code` block renderer in `WritingArticle.tsx`). No retyping `XLOOKUP(...)` from a screenshot.

**2. Downloadable artifacts.** Confirmed in scope. Host static files under the site (e.g. `public/downloads/`) and link them from the relevant article + the track page. Launch set, each tied to a cited thread:

| Download | Format | Backed by |
|---|---|---|
| Reconciliation master sheet (Shopify/Stripe → bank) | `.xlsx` + Google Sheets copy link | D2C "one clean master sheet" thread (#10 above) |
| Bank reconciliation workbook | `.xlsx` | bank-rec pain pool (#1) |
| Month-end reconciliation checklist | `.pdf` (printable) | "what order do you do a cleanup in" (#8) |
| Reconciliation prompt pack | `.txt` / `.md` | FPandA "AI needs clear directions" (#12) |

Keep them dead-simple: a labeled template with example rows, a "delete this row and paste yours" note, and no macros (macros trip security warnings and break the "works in 5 minutes" promise). Each download page carries a one-paragraph "how to use this" and a `HowTo` schema block.

**3. Prompt pack as a first-class format.** The new `format: 'prompt-pack'` renders prompts as individually copyable cards with a one-line "what this does / what to paste / what you'll get back." This is the lowest-effort, highest-empowerment artifact on the site.

Maintenance note: downloads are static and versioned in-repo, so they cost nothing to serve and are trivial to update when a platform changes its export format.

---

## 9. Phased rollout

| Phase | Scope | Output |
|---|---|---|
| **0 — now** | This blueprint | Your approval / edits |
| **1 — structure** | `tracks.ts`, content-model fields, tag the 14 articles, build `/learn` hub + 5 track pages, breadcrumb + "next/related" UI, **ship the glossary** (10–15 core terms), **copy-buttons on all code/formula blocks**, **migrate `/writing/*` → `/learn/*` with 301 redirects**. | Navigable hub, glossary live, zero new long-form content |
| **2 — AI-SEO** | HowTo + Course + Breadcrumb + DefinedTerm schema, TL;DR blocks, `/llms.txt`, per-article markdown endpoints, sitemap | Hub is fully GEO-optimized |
| **3 — fill gaps + downloads** | Tier-1 + Tier-2 content (bank rec, monthly routine, tick-and-tie, bank-rec-in-Excel) and the **launch download set** (master sheet, bank-rec workbook, checklist PDF). Then Tier-3 AI track. | Every track has a real start→advanced path + downloadable tools |
| **4 — ongoing** | Reddit-demand cadence feeds the backlog; refresh high-residual articles | Compounding coverage |

Phase 1 alone delivers a real, shippable Learn hub with a working glossary. Phases 2–3 can run in parallel once structure lands.

**URL migration is confirmed:** `/writing/<slug>` → `/learn/<slug>` with a 301 from every old path, in Phase 1. `/writing` (the index) redirects to `/learn`. The site is young, so equity loss is negligible and the taxonomy is clean from here on.

---

## 10. Success metrics

- Organic impressions & clicks per track (Search Console), and per target question.
- **AI citation presence** for the Tier-1 questions across ChatGPT/Claude/Gemini/Perplexity.
- Glossary term rankings ("what is bank reconciliation", "primary id", etc.).
- Engagement: scroll depth, time-on-page, "next in track" CTR, glossary cross-link clicks.
- Downstream (later): product signups attributable to a Learn entry path.

---

## 11. Resolved decisions

All four open decisions are now settled:

1. **Name** — **"Learn"** for now. Route is `/learn`. (A branded title can layer on later without changing the route.)
2. **URL migration** — **migrate** `/writing/*` → `/learn/*` with 301 redirects, in Phase 1.
3. **Glossary** — **ship it** in Phase 1 (10–15 core terms, `DefinedTerm` schema in Phase 2).
4. **Downloads** — **yes, in scope.** Static, no-macro templates + a copy-paste prompt pack, with copy-buttons across the hub so every tip is usable in minutes.

**Guiding constraint locked in:** the visitor must leave better off _today_, whether or not they ever buy — and **no tutorial ships without a Reddit thread behind it** (every backlog item in §5 is cited).

Phase 1 is ready to start on your go.
