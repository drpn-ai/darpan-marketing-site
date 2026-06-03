# Darpan Learn Hub — Backfill Publishing Plan

_Companion to `learn-hub-blueprint.md`. Status: proposal, 2026-06-03._
_Goal: make the Learn hub look like a months-old, consistently-published archive by backfilling from early March, then catching up to the present over the next week._

---

## 1. The plan in one paragraph

We already have 14 articles dated **MAR 14 → MAY 28, 2026**. We add ~21 more — drawn from the demand-ranked backlog and the wider cited topic table — and assign every article a **backdated publish date** so the archive reads as steady output since **March 1**. New pieces fill the empty early-March window and the April gaps, then march forward to today and a few days past it. Net result: **~35 articles across ~15 weeks at a believable 2–3/week cadence**, every one traceable to a real Reddit thread. Writing this is ~1–2 weeks of work, split into batches below.

**Important sequencing note:** topic *selection and ordering here is provisional* — built on the 2026-06-02 corpus. When the fresh dump finishes, we re-rank and lock (see §5). The cadence, structure, and execution plan don't change; only which slugs land where may shift slightly.

---

## 2. Refined article inventory

Demand figures from `research/data/recon_topic_demand.md` (corpus 652 threads, 2026-06-02). Every tutorial cites a thread; **hub/pillar pages are exempt** (they aggregate cited children, not answer a single pain).

### 2.1 Existing — keep as-is (14)

These already have dates and bodies; they anchor the timeline. No rewrites beyond the Phase-2 refresh/FAQ work in the blueprint.

| Slug | Track | Existing date |
|---|---|---|
| `what-we-mean-when-we-say-primary-id` | Foundations | MAR 14 |
| `the-cost-of-variance-you-cant-see` | Foundations | MAR 28 |
| `why-reconciliation-belongs-at-the-data-layer` | Foundations (adv) | APR 12 |
| `a-taxonomy-of-reconciliation-differences` | Foundations | APR 18 |
| `schemas-explained-describe-your-data` | Foundations | APR 24 |
| `two-way-vs-three-way-reconciliation` | Foundations | MAY 1 |
| `how-to-reconcile-two-systems-by-hand` | By hand | MAY 5 |
| `find-missing-rows-in-excel-countif-match` | Spreadsheets | MAY 8 |
| `reconcile-two-files-in-excel-with-xlookup` | Spreadsheets | MAY 12 |
| `prompting-ai-to-help-reconcile-two-files` | With AI | MAY 16 |
| `can-an-ai-agent-reconcile-your-data` | With AI | MAY 20 |
| `reconcile-your-oms-against-the-source-of-truth` | By system | MAY 23 |
| `netsuite-reconciliation-inventory-and-gl` | By system | MAY 26 |
| `reconcile-shopify-orders-against-your-erp` | By system | MAY 28 |

### 2.2 New — write & backdate (21)

| Slug | Track | Demand (pain · unans.) | Cited seed thread |
|---|---|---|---|
| `the-complete-guide-to-data-reconciliation` | Hub/pillar | — (hub) | aggregates Foundations |
| `reconciliation-cadence-daily-weekly-monthend` | By hand | 65 · 2 | [Why does bank rec never feel "done"](https://reddit.com/r/Accounting/comments/1qq2uee/why_does_bank_reconciliation_feel_like_its_never/) |
| `tick-and-tie-checklist` | By hand (Start) | (bank-rec pool) | [What order do you do a QBO cleanup in](https://reddit.com/r/Bookkeeping/comments/1st9ob6/what_order_do_you_do_a_qbo_cleanup_in_i_think/) |
| `monthly-reconciliation-routine` | By hand | (bank-rec pool) | [How much time does monthly reconciliation take](https://reddit.com/r/smallbusiness/comments/1ncesi9/how_much_time_does_your_monthly/) |
| `fuzzy-matching-records` | Foundations | 30 · 0 | [Catch duplicate payments (invoice nos differ)](https://reddit.com/r/QuickBooks/comments/1nog8xi/small_business_ap_how_do_you_catch_duplicate/) |
| `ar-ap-reconciliation` | By system | 36 · 1 | [Is it necessary to reconcile subledger reports](https://reddit.com/r/Netsuite/comments/1huosmu/is_it_necessary_to_reconcile_subledger_reports/) |
| `bank-reconciliation-step-by-step` | By system (ladder) | **414 · 23** | [3+ hours monthly on reconciliation](https://reddit.com/r/QuickBooks/comments/1mgiw71/anyone_else_spending_3_hours_monthly_on/) |
| `bank-reconciliation-in-excel` | Spreadsheets | (bank-rec pool) | [Partial payment recon, XLOOKUP not cutting it](https://reddit.com/r/tax/comments/1q99c0e/how_do_you_guys_handle_partial_payment/) |
| `csv-gotchas-encoding-delimiters` | Spreadsheets | 238 · 13 | [Customer payments from marketplaces (settlement files)](https://reddit.com/r/Netsuite/comments/y9r10m/customer_payments_from_marketplaces/) |
| `reconciliation-spreadsheet-template` | Spreadsheets (download) | (D2C "master sheet") | [How are D2C brands handling payout reconciliation](https://reddit.com/r/shopify/comments/1r566ne/how_are_growing_d2c_brands_handling_payout/) |
| `what-auditors-look-for` | Foundations/Ops | 313 · 22 | [Why do accountants hate reconciliations](https://reddit.com/r/Accounting/comments/1mcea6v/why_do_accountants_hate_reconciliations/) |
| `multi-currency-reconciliation` | By system | 103 · 6 | [Recon messy once international scales](https://reddit.com/r/smallbusiness/comments/1tl8prz/is_payment_reconciliation_supposed_to_get_this/) |
| `marketplace-payout-reconciliation` | By system | 135 · 11 | [Gateway deposits never match QuickBooks](https://reddit.com/r/Bookkeeping/comments/1s8h7ry/is_anyone_else_dealing_with_payment_gateway/) |
| `why-shopify-deposits-never-match-sales` | By system | 300 · 14 | [Shopify payouts are a nightmare to reconcile](https://reddit.com/r/smallbusiness/comments/1jnznxu/shopify_payouts_are_a_nightmare_to/) |
| `amazon-settlement-reconciliation` | By system | 53 · 3 | [Reconciling Amazon settlements with ERP payouts](https://reddit.com/r/FulfillmentByAmazon/comments/1mezcax/anyone_struggling_with_reconciling_amazon/) |
| `one-way-vs-two-way-sync-explained` | Foundations | 143 · 8 | [How are D2C brands handling payout reconciliation](https://reddit.com/r/ecommerce/comments/1r568lr/how_are_growing_d2c_brands_handling_payout/) (pain 25) |
| `reconcile-two-files-with-an-ai-agent` | With AI | (manual-fatigue) | [Still doing manual reconciliation in Excel](https://reddit.com/r/Accounting/comments/1szfy9x/anyone_else_still_doing_a_lot_of_manual/) |
| `reconciliation-prompt-pack` | With AI (download) | (AI-direction) | [Are agentic AI tools real or hype](https://reddit.com/r/FPandA/comments/1o920tp/are_agentic_ai_tools_really_making_finance_teams/) |
| `where-ai-reconciliation-breaks` | With AI (adv) | (AI-skepticism) | same FPandA hype thread |
| `3pl-inventory-sync-oversells` | By system | 70 · 6 | [Real bottleneck in BFCM prep](https://reddit.com/r/smallbusiness/comments/1p0lv6f/whats_the_real_bottleneck_in_your_bfcm_prep_this/) |
| `retail-reconciliation-orders-inventory-cash` | Hub/pillar | — (hub) | aggregates By-system |

> **AI-track reminder (from the blueprint):** `ai-prompting`/`ai-agent` show pain 0 in the corpus. The three AI pieces are justified as answers to *manual-fatigue* and *"is AI hype"* threads — not as keyword plays. If the new dump still shows ~0 AI demand, that's fine; keep them but don't expand the track.

**Total after backfill: 14 + 21 = 35 articles** (2 of which are hub/pillar pages).

### 2.3 Long-tail — Phase B (cited, lower demand, write after catch-up)

`intercompany-reconciliation` (45), `spreadsheet-to-system-migration-checklist` (44), `credit-card-and-expense-reconciliation` (30), `power-query-vs-formulas` (28), `idempotency-and-dedupe` (20), `reconcile-your-integration-dropped-records` (18), `inventory-reconciliation-cycle-counts` (14), `diy-reconciliation-spreadsheets-ai-automate` (diy pillar/hub).

---

## 3. The backdated calendar (Mar 1 → Jun 12)

Cadence ramps the way a real publication's would: ~1–2/week in March, ~2/week April, ~2–3/week May–June. Tracks are interleaved (never three spreadsheet posts in a row). **E = existing, N = new.**

| Date | Article | Track | |
|---|---|---|---|
| MAR 3 | `the-complete-guide-to-data-reconciliation` | Hub | N |
| MAR 6 | `reconciliation-cadence-daily-weekly-monthend` | By hand | N |
| MAR 10 | `tick-and-tie-checklist` | By hand | N |
| MAR 14 | `what-we-mean-when-we-say-primary-id` | Foundations | E |
| MAR 17 | `monthly-reconciliation-routine` | By hand | N |
| MAR 20 | `fuzzy-matching-records` | Foundations | N |
| MAR 24 | `ar-ap-reconciliation` | By system | N |
| MAR 28 | `the-cost-of-variance-you-cant-see` | Foundations | E |
| MAR 31 | `bank-reconciliation-step-by-step` | By system | N |
| APR 3 | `bank-reconciliation-in-excel` | Spreadsheets | N |
| APR 7 | `csv-gotchas-encoding-delimiters` | Spreadsheets | N |
| APR 10 | `reconciliation-spreadsheet-template` | Spreadsheets (dl) | N |
| APR 12 | `why-reconciliation-belongs-at-the-data-layer` | Foundations | E |
| APR 15 | `what-auditors-look-for` | Foundations/Ops | N |
| APR 18 | `a-taxonomy-of-reconciliation-differences` | Foundations | E |
| APR 21 | `multi-currency-reconciliation` | By system | N |
| APR 24 | `schemas-explained-describe-your-data` | Foundations | E |
| APR 28 | `marketplace-payout-reconciliation` | By system | N |
| MAY 1 | `two-way-vs-three-way-reconciliation` | Foundations | E |
| MAY 5 | `how-to-reconcile-two-systems-by-hand` | By hand | E |
| MAY 8 | `find-missing-rows-in-excel-countif-match` | Spreadsheets | E |
| MAY 12 | `reconcile-two-files-in-excel-with-xlookup` | Spreadsheets | E |
| MAY 14 | `why-shopify-deposits-never-match-sales` | By system | N |
| MAY 16 | `prompting-ai-to-help-reconcile-two-files` | With AI | E |
| MAY 18 | `amazon-settlement-reconciliation` | By system | N |
| MAY 20 | `can-an-ai-agent-reconcile-your-data` | With AI | E |
| MAY 22 | `one-way-vs-two-way-sync-explained` | Foundations | N |
| MAY 23 | `reconcile-your-oms-against-the-source-of-truth` | By system | E |
| MAY 26 | `netsuite-reconciliation-inventory-and-gl` | By system | E |
| MAY 28 | `reconcile-shopify-orders-against-your-erp` | By system | E |
| MAY 31 | `reconcile-two-files-with-an-ai-agent` | With AI | N |
| JUN 3 | `reconciliation-prompt-pack` | With AI (dl) | N |
| JUN 7 | `where-ai-reconciliation-breaks` | With AI | N |
| JUN 10 | `3pl-inventory-sync-oversells` | By system | N |
| JUN 12 | `retail-reconciliation-orders-inventory-cash` | Hub | N |

That's the empty early-March window filled, the big Mar 29–Apr 11 gap closed, and a forward run to JUN 12 that "catches up" past today.

---

## 4. Execution — how the 1–2 weeks break down

Write in batches by track so research context is reused; assign the backdated date at publish.

- **Batch 1 (highest demand, ~4 days):** `bank-reconciliation-step-by-step`, `bank-reconciliation-in-excel`, `what-auditors-look-for`, `csv-gotchas-encoding-delimiters`, `marketplace-payout-reconciliation`, `why-shopify-deposits-never-match-sales`. These are the traffic anchors (pain 238–414).
- **Batch 2 (by-hand + downloads, ~3 days):** `tick-and-tie-checklist`, `monthly-reconciliation-routine`, `reconciliation-cadence...`, `reconciliation-spreadsheet-template` (+ build the `.xlsx`), `fuzzy-matching-records`.
- **Batch 3 (system breadth, ~3 days):** `multi-currency-reconciliation`, `amazon-settlement-reconciliation`, `ar-ap-reconciliation`, `one-way-vs-two-way-sync-explained`, `3pl-inventory-sync-oversells`.
- **Batch 4 (AI track + pillars, ~2 days):** `reconcile-two-files-with-an-ai-agent`, `reconciliation-prompt-pack` (+ pack file), `where-ai-reconciliation-breaks`, the two hub/pillar pages.

This assumes the Phase-1 hub structure from the blueprint exists (tracks, content-model fields, `/learn` routes). If not, structure lands first.

**Volume/cadence is the one assumption to confirm:** this plan targets ~35 articles at ~2–3/week. If you want denser (3–4/week, pull Phase-B long-tail forward) or lighter (skip the long-tail, ~28 articles), say so and the calendar rescales.

---

## 5. What further Reddit analysis is needed (when the dump lands)

The plan above is built on 06-02 data. When the fresh dump finishes, run these to finalize — none block starting Batch 1 on the bank-rec/auditor anchors, which are stable top-demand regardless.

1. **Re-rank `recon_topic_demand.md`.** Recompute unanswered-demand; lock the final topic order. Watch for movement in the candidate tier (multi-currency, 3pl, amazon-settlement) and any *new* high-pain topic that deserves a slot over a Phase-B item.
2. **Per-topic quote extraction (highest value).** For each planned article, pull 2–3 verbatim operator quotes from `corpus.json` — these become the lead, the callouts, and the FAQ. One seed thread isn't enough to make a piece specific and citable.
3. **FAQ / "People Also Ask" mining.** Extract the actual question phrasings per topic from the 208-question bank → drives the `faq` field and FAQPage schema. This is where AI-citation wins come from.
4. **UNMAPPED high-pain triage.** Several pain-y threads are `topic: UNMAPPED` (WooCommerce duplicate sync, BFCM backend, GSTR-1 Excel). Decide: own article, fold into an existing piece, or skip.
5. **Competitor-mention scan.** Threads name A2X, Synder, RecoNexus, Celigo, Nanonets. For tool-agnostic pieces we should know what operators already reach for, so we address those tools neutrally instead of ignoring them.
6. **Answer-gap tagging.** Have the dump flag which threads are still *unanswered/weak* — those are exactly the pieces where our article becomes the missing answer (best ROI).
7. **Seasonality check.** Confirm the BFCM/Q4 and rising multi-currency trends so JUN forward-dated pieces lead with current angles.

I'll wire 1–6 into a short refresh pass once you point me at the new dump.

---

## 6. One honest caveat on backdating

Backdating on-page dates to build an archive is a common practice and fine for a young brand — but set expectations correctly:

- **Search engines record their own first-crawl/discovery date.** A MAR 3 byline won't convince Google the page existed in March; it sees when it first found the URL. So backdating helps *human* perception of an established archive, not ranking history.
- **Stagger the actual go-live.** Publishing and submitting 21 URLs in one burst looks like a content dump. Releasing them over the "next week" as you described — and letting the sitemap `lastmod` reflect real publish times — reads far more naturally to crawlers.
- **Don't fabricate signals beyond the date** — no invented author credentials, fake comment counts, or engagement numbers. The dates are a presentation choice; everything else stays real.

None of this changes the plan; it just means the SEO payoff comes from the *content depth and internal linking*, with the dates doing cosmetic "this place is established" work for human visitors.
