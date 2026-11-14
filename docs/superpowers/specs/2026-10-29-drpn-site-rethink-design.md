# drpn.ai rethink: from reconciliation tool to the check for the work between systems

Backlog: `DAR-MKT-001` (wrapper `roadmap/BACKLOG.md`). Owner: Aditi Patel. Date: 2026-10-29.
Brainstormed with Aditi on 2026-10-28/29; mockups in `.superpowers/brainstorm/23942-1793250042/content/`
(`homepage-copy-v1.html` is the approved homepage).

## Intent

The current site sells Darpan as record-level reconciliation, pitched at the COO with finance as co-lead
("Reassure — the CFO", "audit-ready close", inventory and payout statistics). Visitors read it as accounting
software. Aditi wants it read as **operations**: Darpan catches small breaks between systems on day one,
before they snowball into an angry customer, a discount, a lost repeat buyer, or a month-end mess.

The product that makes this true is the **Audit**: plain-English statements of what must stay true across a
company's systems, checked every morning, each break kept on a list with its cause, owner and fix until a later
check sees it fixed (source of truth for product facts: `darpan-docs/guides/audits.mdx`). The site should make
that idea the centre, without using the word "audit" in a way that collides with financial auditing.

### Who it is for

The person who owns the systems a business runs on and gets the escalation when they stop lining up:
operations leads, business-systems / IT owners, ecommerce ops, NetSuite admins. Finance is a side benefit,
not a co-lead. Aditi: "anyone running multiple systems that need to stay in sync."

### The two stories (Aditi's)

1. **The order that never arrived.** Shopify took it; it never reached NetSuite. Every system said success.
   The customer calls a week later; support gives a discount; the brand loses loyalty and money.
2. **The exchange that never shipped.** The return closed; the exchange never reached NetSuite (often because
   the original order was not fulfilled). The customer is still waiting.

Credit memos not processed is the *finance* side of returns (the customer already has their money at POS) and
belongs only in the finance band.

### Breadth without becoming retail-only

Aditi: use specific examples to show we know the territory, but a visitor must not think this is only for
retail. Specific commerce examples stay; a strip of plain-English statements from six industries shows breadth.
Those industry statements are framed as **the kind of thing you can check**, never as "we integrate with
hospitality/healthcare systems" — Darpan's connectors today are Shopify, HotWax Commerce, NetSuite, SQL
databases and files over SFTP.

## Goals, non-goals, anti-goals

Goals
- A visitor knows within one screen that Darpan checks the outcome of the work between their systems, every
  morning, and keeps each break until it is fixed.
- Each page answers one buyer question: is this my problem (home) · does it work with my systems (works-with) ·
  can I see it (tour) · is my data safe (security). Research basis below.
- Speak the ops vocabulary: "out of sync", "stopped syncing", "the sync looked fine", "missing orders".

Non-goals
- No pricing page (Aditi, 2026-10-29). The conversation CTA covers it.
- No solution pages and no industry pages (rejected: no coherent theme, and buyer research found no value).
- No product or backend changes. No new UI dependencies.

Anti-goals (a failure even if it ships)
- Reads as accounting or reconciliation software.
- Reads as retail-only.
- Claims a connector, customer, industry deployment or security property that is not true today.
- Hype: AI-first framing, exclamation marks, superlatives.

## Voice and copy rules

- "Line up", never "agree"/"agreement" (standing rule). "Disagree" in prose is acceptable.
- Weight 400 only; no bold anywhere (standing rule). The `<b>` in the mockup's security cards is a structural
  label rendered at weight 400.
- Headings: one claim, under ~8 words where possible, often two beats ("Say it. Check it. Explain it. Keep it.").
- Primary CTA is a conversation ("Talk to us"); secondary is self-serve (tour / a morning's breaks / docs).
- The page says **"break"**; the product term **"finding"** appears on the tour and in docs. (My call.)
- Never on the page: AI-powered, agentic, seamless, single source of truth, real-time (Darpan is daily),
  observability, trust your data, reconciliation, revenue leakage, 360°, "agree".
- No mistake narratives; no client names; no verbatim quotes from forum users (they did not consent to be on
  our homepage — their phrasing informs ours). (My call.)
- Public figures, if used anywhere, cite their source and flag vendor-sponsored or dated ones (existing site
  habit).

## Site map

| Path | Fate | Answers |
|---|---|---|
| `/` | rewritten | Is this my problem? |
| `/works-with` | new hub | Does it work with my systems? |
| `/works-with/shopify-netsuite` | new | " |
| `/works-with/hotwax-netsuite` | new | " |
| `/works-with/shopify-hotwax` | new | " |
| `/works-with/databases-and-files` | new | " |
| `/tour` | new | Can I see it? |
| `/security` | new | Is my data safe? |
| `/notes`, `/notes/:slug` | kept | depth; long-form problem pieces live here |
| `/why` | retired → 301 to `/` | its best material may become a Note later (not in this scope) |
| `/customers` | retired → 301 to `/` (Aditi, 2026-10-29) | placeholder logos ("[Retailer A]"…) under "Reconciled by retail teams"; repoint its links from `/` and `/notebook`; delete `ReconciledBySection` if nothing else uses it |
| `/notebook`, `/privacy`, `/terms` | unchanged | |

Nav: How it works (anchor on `/`) · Works with · Tour · Security · Notes · [Talk to us].
Footer adds Docs (docs.drpn.ai) and Developers (developers.drpn.ai).

## Homepage (approved copy — `homepage-copy-v1.html`)

1. **Hero.** Kicker "Checks for the work between your systems". H1 "Your systems are up. Are they still lining
   up?" Sub "Your integrations report success. Darpan checks the outcome every morning, and keeps each break on a
   list — with its owner, its evidence and, where it can name one, its cause — until it's fixed." (Revised from
   the mockup's "with its cause, its owner and the fix": a finding names a cause only when the run's conclusions
   explain it — `audits.mdx`. My call.) CTAs "Talk to us →" / "See a morning's
   breaks" (→ `/tour`). Visual: a "This morning · 06:00" list — two open breaks (order never reached NetSuite,
   cause stuck in Packed, owner warehouse, day 1; exchange hasn't shipped, cause original order unfulfilled,
   owner ops, day 1) and one closed ("seen fixed by this morning's check"). Replaces the retail "Continuous
   check" table.
2. **The gap.** "Every sync says it worked. Nobody checks that it did." Body as mockup. Two-card day-1-with /
   day-8-without contrast (the snowball).
3. **How it works** (`id="how"`). "Say it. Check it. Explain it. Keep it." Four steps as mockup, except
   Explain it reads "Each break arrives with evidence and an owner." (my call, same reason as the hero); one note line
   under Check it about matching records that systems name differently (the rule engine, no longer its own
   section).
4. **Breadth.** "Anywhere two systems have to line up." / "Every check is one sentence your team would say out
   loud." Six statement cards: commerce, SaaS, hospitality, people & IT, healthcare, utilities (wording as
   mockup).
5. **Works with.** "Reads the systems you already run." Chips: Shopify, HotWax Commerce, NetSuite, MySQL,
   Postgres and other databases, files over SFTP. Link "See what Darpan checks for each →".
6. **Security.** "What Darpan reads, and where it stays." Cards, wording traced to the Facts register:
   "It doesn't change your records." (Shopify, HotWax, NetSuite and databases are read only; the SFTP archive
   move is disclosed on `/security`, not hidden — replaces the mockup's "It reads. It doesn't write.", my call) ·
   "Credentials stay sealed." (passwords, tokens and keys stored encrypted; write-only once saved) · "Each company stays in its own lane." (every read is filtered to the
   company you are signed in to, deny by default; another company's record answers like one that does not
   exist — see Facts register).
7. **Finance band.** "And month-end has nothing left to chase." Body: refunds without a credit memo show up
   the same morning as everything else, so by the close they are already fixed. ("Payouts that don't tie out"
   dropped — no payout check exists today. My call.)
8. **Close.** "Tomorrow your systems will report success. Darpan will tell you whether they still line up."
   CTAs "Talk to us →" / "Take the tour".
9. **Notes strip** stays below the close as today.

Cut from the current homepage: Why now (Gartner stat, `StackScene` 3D), Proof stats (65% / $222.7B / #1),
Product (Describe/Verify/Resolve), Rule engine section, Audiences (COO/CFO). Delete the code that only they use
(standing rule: cleanup ships with the change) — check `StackScene`, `StackCanvas`, `CountUp`, `AgreementCheck`,
the rules panel and their `vl-*` CSS for other users first.

## Works-with pages

Hub: one card per system pair, each with one line on what Darpan reads there and a link.

Each pair page:
- H1 naming the pair in the buyer's search words (e.g. "Shopify orders missing in NetSuite, found the morning
  after").
- What Darpan reads on each side (record types, in plain words).
- **The statements Darpan checks for that pair**, 5–8, written as a customer would write them. Source them
  from the real statements in production audits, de-identified (no client names, ids or order numbers). Known
  good examples: "Every exchange Shopify completes is in NetSuite." "Every return Shopify completes with a
  refund has a refunded RMA in NetSuite." The builder pulls the rest from the audit statement seed/config data
  in the backend repo and `tools/netsuite-chain-config/`, and has Aditi confirm the list.
- One example break with cause and owner, in the hero-list style.
- CTA pair as the homepage.

`databases-and-files`: a database or a file on each side, write your own statements; read-only account,
SELECT only (see Facts).

These pages carry the commerce depth that an industry page would have, and they are the specific factual pages
AI answer engines cite for queries like "Shopify NetSuite orders missing".

## Tour

An ungated walk through one morning: the audit page, the statements, one finding opened (owner, evidence,
cause where named, history), and a finding closed by a later check. **Drawn product mockups** in the site's own
`vl-*` style, not screenshots (Aditi, 2026-10-29: no real screenshots for now; there is no demo tenant). They
follow the real product's structure and labels (`audits.mdx`) with invented, obviously generic records. 5–7
frames, each with a one-line caption. Ends on the CTA pair. Real screenshots replace them once a synthetic demo
tenant exists (separate item).

## Security

Short page, facts only, each line traceable to the Facts register. Sections: what Darpan reads; what it changes
(nothing in your records; on SFTP it moves each file it has read into an `archive/` folder); how credentials are
stored; how each company's data is kept apart (filter on every read, deny by default, foreign = missing, tested;
no exploit detail, no internal names); where it runs ("in the cloud"). Any line not in the register is left out rather than softened. Rule for the whole build (my call): a claim
not confirmed by ship time is **dropped, not waited for** — nothing on the site is gated on an open fact.

## Facts register (every factual claim on the site must trace here)

| Claim | Status | Evidence |
|---|---|---|
| Database connections use a read-only account; Darpan only issues SELECT | verified | `darpan-docs/guides/connect-database.mdx` |
| Passwords, API tokens and private keys are stored encrypted; write-only once saved | verified | `encrypt="true"` on password, accessToken (Shopify), apiToken (HotWax), privateKey/privateKeyPem (NetSuite) entity fields; `connect-database.mdx`; NetSuite docs "write-only on edit" |
| A finding names its cause when the run's conclusions explain it; otherwise it shows evidence | verified | `audits.mdx` |
| Darpan does not change records in Shopify, HotWax or NetSuite | verified by code read 2026-10-29 | Shopify's only mutation is `bulkOperationRunQuery` (starts a read, `ShopifyBulkOperationClient.groovy`); HotWax POSTs are query calls (`OmsRestSourceSupport.groovy`); NetSuite calls run SuiteQL/RESTlet reads |
| On SFTP, Darpan moves each file it has finished reading into an `archive/` folder | verified by code read | `pollSftpAndRunReconciliation.groovy` ~L300 |
| An SFTP automation writes each run's result file back to the source server | verified by code read (final review 2026-10-29) | `pollSftpAndRunReconciliation.groovy` ~L513-547 "Upload Result to SFTP (Server 1)" |
| Shopify reads cover orders, payments, fulfilments, refunds, returns and exchanges | verified | shopify-darpan order, payment-capture, fulfilment and return-refs extracts |
| Checks run every morning on a schedule the tenant sets | verified | `audits.mdx` (Schedule) |
| A finding stays open until a later check sees it fixed | verified | `audits.mdx` |
| Every read of a company's records is filtered to the signed-in company at the data layer; no active company = no rows (deny by default) | verified | `EntityFilterSet DARPAN_ACTIVE_COMPANY_SCOPE` (55 entity filters, `darpan/data/SecuritySeedData.xml`); `TenantScopedFinder.groovy` (default-deny sentinel) |
| Another company's record id answers exactly like a missing one | verified | `TenantAccessSupport.requireTenantRecordAccess` single message; DAR-BE-135 |
| Cross-company access is covered by automated tests | verified | `TenantOwnedEntityFilterRuntimeTests`, `Step3TenantDenialTests`, `*CrossTenantSmokeTests` |
| Darpan runs on Amazon Web Services in the United States (Ohio) | verified (Aditi 2026-11-14 chose to name provider + region) | Darpan Prod AWS project, us-east-2, stack `darpan-prod` behind api.drpn.ai since 2026-11-03 (DAR-OPS-006) |
| Companies share one platform and database (not a database per company) | verified | Moqui 4, shared schema; do NOT imply per-company databases or isolation beyond the above |
| Connectors: Shopify, HotWax Commerce, NetSuite, SQL databases (MySQL, Postgres, …), SFTP files | verified | docs guides; builder confirms the exact database list from `database-darpan` |
| Homepage story (DAR-MKT-003, 2026-11-14): a storefront fraud check cancelled exchanges that the WMS shipped anyway (nine exchanges); found by a Darpan check | verified (production finding) | Footwear brand's Shopify vs HotWax exchange audit, Oct–Nov 2026 (9 exchange orders). HotWax, which ran fulfilment, is called "the WMS" in the story (Aditi 2026-11-14). Told without brand, vendor or order ids |
| "About one order in a hundred has a story like this one" (across brands in production) | estimate, rounded (Aditi 2026-11-14: intelligent estimates grounded in reality) | Footwear brand's October month audit: ~1,260 open findings after expected causes over 129,446 Shopify orders (≈1%). Generalized from that brand's month; replace with a cross-tenant figure once the value ledger runs |
| Darpan's AI turns a business story into plain statements people and machines can read, incl. unwritten rules | optimistic (Aditi 2026-11-14: copy may describe where Darpan is heading) | AI rule author DAR-BE-159 in progress (proposes rule updates for approval); statements as plain sentences are live in audits |
| Each check reads only the data it needs | optimistic, partly live — removed from the homepage 2026-11-14 (step 3 now carries key matching) | Shared reads + cache removed ~1,500 repeat lookups per run (2026-10-26); planned reads from rules designed in the conclusion graph (DAR-BE-151) |
| A check matches records that systems name differently (a prefix, a different id) by the keys you choose | verified for "keys you choose"; prefix example carried from the approved homepage footnote, not re-verified 2026-11-14 | Per-side id expressions + composite keys (up to 5 fields per side) shipped 2026-07-08/09, `RuleSetCompareSourceKeyField` |
| Breaks like this usually surface when a customer complains or at the month-end close | verified (Aditi 2026-11-14: "usually when CSR gets a complaint, or during month close") | Founder account of how breaks were found before Darpan |
| "This customer was never going to call" | inference from the story's facts | The replacement went to a customer the fraud screen had just flagged; that customer had no reason to complain |
| Nine replacement pairs ≈ $1,000 of product | estimate (Aditi 2026-11-14 asked for a guesstimate) | 9 pairs × ~$110, an assumed typical footwear pair price; not read from order totals — replace with the summed grandTotal of the 9 exchange orders when computed |
| Running every morning at five-plus brands | verified (Aditi 2026-11-14: "we can say 5+") | Prod tenants with daily audits (RAILS, Gorjana, Dolls Kill, Mephisto, New Era Caps) + Steve Madden's instance; no names or logos yet |
| The first list arrives a day after you connect | verified (Aditi 2026-11-14: "1 day") | Founder account of onboarding time, connection to first morning's results |
| Ops managers work the list each morning and can share it with partner teams | verified (Aditi 2026-11-14) | "operations managers and leads can look at the results and take needed actions... dashboards can also be shared with partner teams and systems" |
| Why we built it: month-end close turned up the same breaks, fixed by hand, back next month; where Darpan started it surfaced production problems long before the close | verified (Aditi 2026-11-14, founder story) | Her account of month-end pain and of the order-management team where Darpan began (not named on the site) |
| Jewelry brand: 8 orders refunded within seconds of being placed, completed anyway by the order system; ≈ $11,000 | verified (prod, read 2026-11-14) | GORJANA month-close audit, 2026-11-13 run, statement R13 "Every order Shopify cancels is cancelled in HotWax" (saved run RS_100410): 8 open, first found 2026-11-12; refunds 6–7 s after placement; $11,306.83 = sum of Shopify totals of the 8; 8/8 checked, 7 clear (1 POS case ambiguous). ERP invoicing NOT claimed (only a DAR-BE-249 probe saw it). Why refunded so fast: "usually because the customer changes their mind" (Aditi 2026-11-14) — the site says "usually", not for all eight |
| Jewelry brand: 90 store sales taken home, 166 lines still backordered in the ERP, 40 stores; orders ≈ $12,000 | verified (prod, read 2026-11-14) | GORJANA R1 (saved run RS_100010), 2026-11-13 run: 90 orders / 166 lines, first found Nov 3–13; $12,339.96 = sum of the 90 orders' totals (whole order, not just the line); 15/15 sampled match. Cause: "the inventory records are inaccurate" (Aditi 2026-11-14) — the ERP's store stock records were wrong |
| Jewelry brand: a store exchange held out of the ERP because its original order had waited six weeks | verified (prod, one instance) | GORJANA R1 F-129443 (found 2026-11-11), cause "Waits on its original order"; original Pending Fulfillment in NetSuite since 2026-09-30. Used as one case, never as a count (4 of 5 such cases cleared next day as lag) |
| Unwritten-rule example: "a piece can be returned or claimed under warranty, never both" | verified (Aditi 2026-10-28) | Cause Aditi named on GORJANA R2 (return M253406): "one product can only be returned once... same product cannot be a return AND warranty"; built as a named cause (DAR-BE-158) |
| Your own AI assistants can ask Darpan questions in plain language | verified | DAR-CLI-003 shipped: `darpan mcp` (27 tools), live check 2026-11-04 |

## Constraints

- Repo `darpan-marketing-site` (TanStack Start + React 19 + Vite 7, Tailwind v4, hand-written `vl-*` CSS in
  `src/styles.operational.css`, Phosphor icons). No new dependencies; no Framer Motion/GSAP; animation via the
  existing IntersectionObserver reveal and CSS. Weight 400, warm paper palette, IBM Plex Sans/Mono.
- Every new route is added to the prerender `pages` list in `vite.config.ts`; links stay no-slash.
- `/why` gets a 301 to `/` (Netlify `_redirects` or `netlify.toml`), and its entry leaves the pages list.
- Each page sets its own `<title>` and meta description (TanStack `head`).
- Work on `main`; push to `main` deploys drpn.ai via Netlify. Pushing is outside the agent stop-line — the
  push waits for Aditi. A daily 20:00 IST LaunchAgent fast-forward-pushes pending `main` commits
  (`ai.drpn.publish-pending`), so **do not commit half-finished work to `main`**: keep it uncommitted or commit
  only when the whole set is ready for Aditi's review.

## Off-site (recommended, outside this build)

G2 listing; Reddit replies in the ops vocabulary; listings with HotWax and NetSuite/Shopify partners; add ops
phrases ("orders stopped syncing", "missing orders", "sync looked fine", "out of sync") to the Reddit miner's
queries in `drpn-ai/research` — its corpus is 68% finance-framed largely because its queries are
reconciliation words.

## Research basis (2026-10-29)

- Buyers reach ~61% of the journey before contacting a vendor; the winner is on the day-one shortlist 95% of
  the time (6sense 2025). 51% start research in an AI chatbot (G2, Mar 2026). Peers trusted over vendor sites.
- On vendor sites buyers want pricing, integration fit, to see the product, and security answers; the homepage
  drives ~82% of AI-referred leads (TripleDart Q1 2026); no evidence buyers value industry or role pages.
- Integrations sell "it moved"; practitioners themselves split "ran" from "right" ("No error handler in the
  world fires on a 200"; "We trusted green checkmarks"). "Line up" is an unclaimed phrase; "data downtime",
  "monitoring as code", "be the first to know" are owned by others.
- Copy patterns from 24 YC homepages (Middesk, Metaplane, Numeral, Modern Treasury the closest in voice):
  short two-beat headings, outcome headlines, "Talk to us" + self-serve secondary CTA, trust from specifics.

## Notes (scope)

Note bodies and titles are out of scope (retitling risks their search ranking). In scope: repoint every `/why`
link in note bodies to the closest live page; the homepage Notes strip shows the three entries whose titles
read most like operations rather than reconciliation (builder picks; listed in the PR for Aditi). My call.

## Left to the builder

"Talk to us" target (stays `mailto:hello@drpn.ai`, subject "Darpan walkthrough"); exact database list from
`database-darpan`/docs (MySQL, PostgreSQL, IBM Db2 at last read); component structure and file split; whether sections move into `src/components/sections/`; the hero list's
motion (a reveal, nothing bouncy); exact responsive layout; meta descriptions; the hub card layout; screenshot
capture and annotation method; which existing CSS is reused vs deleted.

## Validation

`npx tsc --noEmit` (or the repo's type-check), `npm run build` with `NODE_OPTIONS=--dns-result-order=ipv4first`
green with every new route prerendered; browser check of each page at desktop and phone width (no horizontal
scroll, reveal works, reduced-motion renders fully); `/why` redirect checked on the Netlify deploy preview;
copy read-through against the voice rules and the Facts register.
