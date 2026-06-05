# Darpan Learn Hub — Backfill Publishing Plan (niche-only)

_Companion to `learn-hub-blueprint.md`. Reworked 2026-06-05._

## 0. Scope change — 2026-06-05 (read first)

Direction from Aditi: _"our website doesn't need generic content that no one actually wants to read… remove any articles that are generic fluff just for the sake of articles."_ The earlier version of this plan optimized for **volume** — ~35 articles to make the archive look months-old. That goal is retired. The new rule:

> **Publish only pieces that answer a specific, searched, weakly-answered operator question.** Scenario guides (Shopify/NetSuite/OMS/payouts/bank/marketplace) and concrete how-tos (Excel, AI walkthroughs, downloads). **No abstract concept essays, "X vs Y" explainers, "why it matters" think-pieces, or broad overview/hub pages** — those are the fluff.

**Removed from the live site on 2026-06-05** (aggressive prune, both `writing-entries.ts` and `writing-content.tsx`): `the-complete-guide-to-data-reconciliation`, `a-taxonomy-of-reconciliation-differences`, `two-way-vs-three-way-reconciliation`, `schemas-explained-describe-your-data`, `the-cost-of-variance-you-cant-see`, `why-reconciliation-belongs-at-the-data-layer`, `reconciliation-cadence-daily-weekly-monthend`.

**Dropped from the backlog (never write):** both hub/pillar pages (`the-complete-guide…`, `retail-reconciliation-orders-inventory-cash`), `reconciliation-cadence-daily-weekly-monthend`, `monthly-reconciliation-routine` (process essay, overlaps cadence), `one-way-vs-two-way-sync-explained` (explainer), `where-ai-reconciliation-breaks` (opinion essay), `power-query-vs-formulas` (vs-explainer), `idempotency-and-dedupe` (concept), the DIY pillar/hub.

The daily scheduled task (`darpan-learn-backfill-publish-daily`) reads §3 of this file. With the rows below, it will only ever pick a niche, high-intent piece next.

---

## 1. The plan in one paragraph

We have **9 live articles** after the prune — all niche: three scenario guides (Shopify↔ERP, NetSuite, OMS), two Excel how-tos (XLOOKUP, COUNTIF/MATCH), two AI how-tos (prompting, can-an-agent), the by-hand method, and the primary-ID glossary piece. We add **14 core + 6 Phase-B niche pieces**, each tied to a specific weakly-answered Reddit thread, and backdate them into the open spring slots so cadence reads steady — but **every row earns its place by answering a real question**, not by filling a calendar. Net target: **~23–29 articles, all high-intent**, at ~2/week.

---

## 2. Niche worklist (ranked by unanswered demand, every row cited)

Demand from `research/data/recon_topic_demand.md` (corpus 652 threads). **E = existing/live · N = to write.**

### 2.1 Live — keep (9, all niche)

| Slug | Track | Date |
|---|---|---|
| `what-we-mean-when-we-say-primary-id` | Foundations (glossary) | MAR 14 |
| `how-to-reconcile-two-systems-by-hand` | By hand | MAY 5 |
| `find-missing-rows-in-excel-countif-match` | Spreadsheets | MAY 8 |
| `reconcile-two-files-in-excel-with-xlookup` | Spreadsheets | MAY 12 |
| `prompting-ai-to-help-reconcile-two-files` | With AI | MAY 16 |
| `can-an-ai-agent-reconcile-your-data` | With AI | MAY 20 |
| `reconcile-your-oms-against-the-source-of-truth` | By system | MAY 23 |
| `netsuite-reconciliation-inventory-and-gl` | By system | MAY 26 |
| `reconcile-shopify-orders-against-your-erp` | By system | MAY 28 |

### 2.2 To write — Tier 1 anchors (highest unanswered demand)

| Slug | Track | Demand | Seed thread |
|---|---|---|---|
| `bank-reconciliation-step-by-step` | By system | **414 · 23 unans.** | [3+ hours monthly on reconciliation](https://reddit.com/r/QuickBooks/comments/1mgiw71/anyone_else_spending_3_hours_monthly_on/) · [bank rec never feels done](https://reddit.com/r/Accounting/comments/1qq2uee/why_does_bank_reconciliation_feel_like_its_never/) |
| `what-auditors-look-for` | Operations | 313 · 22 | [Why do accountants hate reconciliations](https://reddit.com/r/Accounting/comments/1mcea6v/why_do_accountants_hate_reconciliations/) · [former auditor: show how it reconciles](https://reddit.com/r/Bookkeeping/comments/11l3md1/reconciling_paypal_to_qbo_without_bank_connection/) |
| `why-shopify-deposits-never-match-sales` | By system | 300 · 14 | [Shopify payouts are a nightmare to reconcile](https://reddit.com/r/smallbusiness/comments/1jnznxu/shopify_payouts_are_a_nightmare_to/) |
| `csv-gotchas-encoding-delimiters` | Spreadsheets | 238 · 13 | [Customer payments from marketplaces (settlement files)](https://reddit.com/r/Netsuite/comments/y9r10m/customer_payments_from_marketplaces/) |
| `marketplace-payout-reconciliation` | By system | 135 · 11 | [Gateway deposits never match QuickBooks](https://reddit.com/r/Bookkeeping/comments/1s8h7ry/is_anyone_else_dealing_with_payment_gateway/) |

### 2.3 To write — Tier 2 (scenario + concrete how-to + downloads)

| Slug | Track | Seed thread |
|---|---|---|
| `tick-and-tie-checklist` (download) | By hand | [What order do you do a QBO cleanup in](https://reddit.com/r/Bookkeeping/comments/1st9ob6/what_order_do_you_do_a_qbo_cleanup_in_i_think/) · [think I'm finally understanding](https://reddit.com/r/Bookkeeping/comments/1m83gtc/think_im_finally_understanding_how_to_do_this_can/) |
| `bank-reconciliation-in-excel` | Spreadsheets | [partial payment recon, XLOOKUP not cutting it](https://reddit.com/r/tax/comments/1q99c0e/how_do_you_guys_handle_partial_payment/) · [still doing manual recon in Excel](https://reddit.com/r/Accounting/comments/1szfy9x/anyone_else_still_doing_a_lot_of_manual/) |
| `reconciliation-spreadsheet-template` (download) | Spreadsheets | [D2C "one clean master sheet"](https://reddit.com/r/shopify/comments/1r566ne/how_are_growing_d2c_brands_handling_payout/) |
| `fuzzy-matching-records` | By hand | [catch duplicate payments, invoice nos differ](https://reddit.com/r/QuickBooks/comments/1nog8xi/small_business_ap_how_do_you_catch_duplicate/) |
| `ar-ap-reconciliation` | By system | [reconcile subledger to GL](https://reddit.com/r/Netsuite/comments/1huosmu/is_it_necessary_to_reconcile_subledger_reports/) · [freight invoice recon at scale](https://reddit.com/r/Accounting/comments/1tkdbo4/how_do_ap_teams_handle_freight_invoice/) |
| `amazon-settlement-reconciliation` | By system | [reconciling Amazon settlements with ERP payouts](https://reddit.com/r/FulfillmentByAmazon/comments/1mezcax/anyone_struggling_with_reconciling_amazon/) |
| `multi-currency-reconciliation` | By system | [recon messy once international scales](https://reddit.com/r/smallbusiness/comments/1tl8prz/is_payment_reconciliation_supposed_to_get_this/) · [wire fees eat reconciliation](https://reddit.com/r/Accounting/comments/1simaqd/every_international_wire_we_send/) |

### 2.4 To write — Tier 3 (AI track, concrete only)

| Slug | Track | Seed thread |
|---|---|---|
| `reconcile-two-files-with-an-ai-agent` (walkthrough) | With AI | [still doing manual recon in Excel](https://reddit.com/r/Accounting/comments/1szfy9x/anyone_else_still_doing_a_lot_of_manual/) · [how long monthly recon takes](https://reddit.com/r/smallbusiness/comments/1ncesi9/how_much_time_does_your_monthly/) |
| `reconciliation-prompt-pack` (download) | With AI | [AI needs very clear directions](https://reddit.com/r/FPandA/comments/1o920tp/are_agentic_ai_tools_really_making_finance_teams/) |

### 2.5 Phase B — niche long-tail (after the core lands)

| Slug | Track | Seed thread |
|---|---|---|
| `3pl-inventory-sync-oversells` | By system | [real bottleneck in BFCM prep](https://reddit.com/r/smallbusiness/comments/1p0lv6f/whats_the_real_bottleneck_in_your_bfcm_prep_this/) |
| `reconcile-your-integration-dropped-records` | By system | [Amazon API stopped talking to Woo, missing units](https://reddit.com/r/FulfillmentByAmazon/comments/1t0soap/trying_to_diversify_off_amazon_is_basically_a/) |
| `inventory-reconciliation-cycle-counts` | By system | [QB inventory qty ≠ Shopify even when synced](https://reddit.com/r/smallbusiness/comments/1qtw544/why_doesnt_quickbooks_inventory_quantity_match/) |
| `intercompany-reconciliation` | By system | [continuous accounting for intercompany](https://reddit.com/r/Accounting/comments/w43577/continuous_accounting_for_intercompany/) · [other-asset clearing keeps revaluing](https://reddit.com/r/Netsuite/comments/1tmwyk0/how_do_i_reconcile_my_other_asset_clearing/) |
| `spreadsheet-to-system-migration-checklist` (download) | By hand | [stuck on legacy systems at $3M](https://reddit.com/r/smallbusiness/comments/1tap1s9/stuck_on_legacy_systems_at_3m_revenue_with_10/) |
| `credit-card-and-expense-reconciliation` | By system | [QBD credit-card recon timing issue](https://reddit.com/r/Bookkeeping/comments/1st4iym/quickbooks_desktop_credit_card_reconciliation/) · [overcomplicating CC coding](https://reddit.com/r/QuickBooks/comments/1obqr2q/are_we_overcomplicating_credit_card_coding_at_our/) |

> **AI-track note (unchanged):** AI keywords score ~0 in the corpus. The two AI pieces are kept only as concrete answers to manual-fatigue and "is AI hype" threads. Do not expand the AI track beyond the agent walkthrough + prompt pack.

---

## 3. Backdated calendar (niche-only)

Cadence ~2/week. New niche pieces fill the empty late-March → April window between the live anchors, then run forward past today. The daily task picks the **earliest-dated N not yet in `writing-entries.ts`**. **E = live · N = to write.**

| Date | Article | Track | |
|---|---|---|---|
| MAR 10 | `tick-and-tie-checklist` | By hand (dl) | N |
| MAR 14 | `what-we-mean-when-we-say-primary-id` | Foundations | E |
| MAR 18 | `bank-reconciliation-step-by-step` | By system | N |
| MAR 21 | `fuzzy-matching-records` | By hand | N |
| MAR 25 | `ar-ap-reconciliation` | By system | N |
| MAR 28 | `what-auditors-look-for` | Operations | N |
| APR 1 | `bank-reconciliation-in-excel` | Spreadsheets | N |
| APR 4 | `csv-gotchas-encoding-delimiters` | Spreadsheets | N |
| APR 8 | `reconciliation-spreadsheet-template` | Spreadsheets (dl) | N |
| APR 11 | `why-shopify-deposits-never-match-sales` | By system | N |
| APR 15 | `marketplace-payout-reconciliation` | By system | N |
| APR 18 | `amazon-settlement-reconciliation` | By system | N |
| APR 22 | `multi-currency-reconciliation` | By system | N |
| APR 26 | `reconcile-two-files-with-an-ai-agent` | With AI | N |
| APR 29 | `reconciliation-prompt-pack` | With AI (dl) | N |
| MAY 5 | `how-to-reconcile-two-systems-by-hand` | By hand | E |
| MAY 8 | `find-missing-rows-in-excel-countif-match` | Spreadsheets | E |
| MAY 12 | `reconcile-two-files-in-excel-with-xlookup` | Spreadsheets | E |
| MAY 16 | `prompting-ai-to-help-reconcile-two-files` | With AI | E |
| MAY 20 | `can-an-ai-agent-reconcile-your-data` | With AI | E |
| MAY 23 | `reconcile-your-oms-against-the-source-of-truth` | By system | E |
| MAY 26 | `netsuite-reconciliation-inventory-and-gl` | By system | E |
| MAY 28 | `reconcile-shopify-orders-against-your-erp` | By system | E |
| JUN 1 | `3pl-inventory-sync-oversells` | By system | N |
| JUN 4 | `reconcile-your-integration-dropped-records` | By system | N |
| JUN 8 | `inventory-reconciliation-cycle-counts` | By system | N |
| JUN 11 | `intercompany-reconciliation` | By system | N |
| JUN 15 | `spreadsheet-to-system-migration-checklist` | By hand (dl) | N |
| JUN 18 | `credit-card-and-expense-reconciliation` | By system | N |

Next run picks **MAR 10 `tick-and-tie-checklist`** (the earliest N not yet live).

---

## 4. Execution — batches (research context reused)

- **Batch 1 (anchors, highest demand):** `bank-reconciliation-step-by-step`, `what-auditors-look-for`, `why-shopify-deposits-never-match-sales`, `csv-gotchas-encoding-delimiters`, `marketplace-payout-reconciliation`.
- **Batch 2 (spreadsheets + downloads):** `bank-reconciliation-in-excel`, `reconciliation-spreadsheet-template` (+ build the `.xlsx`/CSV stub), `tick-and-tie-checklist` (+ checklist PDF/MD), `fuzzy-matching-records`.
- **Batch 3 (system breadth):** `ar-ap-reconciliation`, `amazon-settlement-reconciliation`, `multi-currency-reconciliation`.
- **Batch 4 (AI, concrete):** `reconcile-two-files-with-an-ai-agent`, `reconciliation-prompt-pack` (+ pack file).
- **Phase B:** the five long-tail scenario pieces in §2.5 as cadence continues.

One article per run; assign the next unused calendar date at publish; leave unstaged for manual review/deploy.

---

## 5. Downloads (each tied to a cited thread)

| Download | Format | Backed by |
|---|---|---|
| Reconciliation master sheet (Shopify/Stripe → bank) | `.xlsx` / Sheets copy | D2C "one clean master sheet" thread |
| Bank reconciliation workbook | `.xlsx` | bank-rec pain pool |
| Month-end tick-and-tie checklist | `.pdf` / `.md` | "what order do you do a cleanup in" |
| Reconciliation prompt pack | `.txt` / `.md` | FPandA "AI needs clear directions" |
| Spreadsheet→system migration checklist | `.pdf` / `.md` | "stuck on legacy systems at $3M" |

No macros; labeled template + example rows + a "delete this row, paste yours" note. Build the stub from cited threads if trivial; otherwise flag in the log that the binary still needs authoring.

---

## 6. Honest caveat on backdating (unchanged)

Backdating on-page dates is fine for human perception of an established archive, but: search engines record their own first-crawl date, so a backdated byline doesn't buy ranking history; stagger the real go-live over days rather than dumping all URLs at once; and don't fabricate anything beyond the date (no fake authors, comment counts, or engagement). The SEO payoff comes from content depth and internal linking — now concentrated entirely on high-intent pieces.
