# Darpan Content Strategy — driven by real Reddit demand

_Purpose: decide what to write next, ranked by pain people actually express in public (Reddit), and capture new angles the threads suggest. Updated daily by the Stage 2 marketing run. Evidence-first: every angle cites a seeding thread URL._

_Last updated 2026-06-03._

> Data status for this run: **no new threads** since 2026-06-01 (`recon_new_since_last.md`: 0 new painful threads, 0 new questions; the brief/Part-B/framing files are unchanged). The one change worth acting on: `recon_topic_demand.md` and `recon_questions.md` — **empty on 2026-06-01, now populated** (corpus 652 threads · 208 questions, dated 2026-06-02). The 06-01 ranking below was a fallback derived from per-thread pain in the brief; it is now **replaced with the real demand table** (ranked by unanswered demand), which was the re-confirmation the 06-01 run explicitly deferred.

---

## Next articles to write (ranked by unanswered demand)

Filter: **unpublished** topics (planned/candidate), ranked by unanswered-question count, then total pain. Published topics with high residual demand are listed separately below as refresh candidates. Slugs and counts from `recon_topic_demand.md`; seed questions from `recon_questions.md`.

1. **Bank reconciliation, step by step** — `bank-reconciliation-step-by-step` (planned, P2). **23 unanswered · 29 Q's · pain 414** — the highest unanswered demand of any unpublished topic, and the single largest pain pool in the corpus. Cover: GL-vs-bank discrepancies, auto-match misses, rules setup, why it "never feels done." Seed: ["Anyone else spending 3+ hours monthly on reconciliation that should take 30 minutes?"](https://reddit.com/r/QuickBooks/comments/1mgiw71/anyone_else_spending_3_hours_monthly_on/) (34 comments, weak answers).

2. **What auditors look for** — `what-auditors-look-for` (planned, P1). **22 unanswered · 26 Q's · pain 313.** High-intent, low-supply: practitioners ask why reconciliations matter to audit and what evidence holds up. Seed: ["Why do accountants hate reconciliations?"](https://reddit.com/r/Accounting/comments/1mcea6v/why_do_accountants_hate_reconciliations/).

3. **Why Shopify deposits never match sales (payout bundling)** — `why-shopify-deposits-never-match-sales` (candidate, P2). **14 unanswered · 16 Q's · pain 300.** Net-deposit splitting across Shopify ↔ Stripe ↔ bank ↔ fees/refunds/chargebacks. Recurring and unanswered. Seed: ["Shopify Payouts Are a Nightmare to Reconcile—Anyone Found a Good Solution?"](https://reddit.com/r/smallbusiness/comments/1jnznxu/shopify_payouts_are_a_nightmare_to/).

4. **CSV gotchas: encoding, delimiters, drift** — `csv-gotchas-encoding-delimiters` (planned, P3). **13 unanswered · 14 Q's · pain 238.** The unglamorous failure mode under most "the integration is broken" complaints. Seed: ["Customer Payments from Marketplaces" (Netsuite settlement-file handling)](https://reddit.com/r/Netsuite/comments/y9r10m/customer_payments_from_marketplaces/).

5. **Marketplace payout reconciliation** — `marketplace-payout-reconciliation` (planned, P2). **11 unanswered · 11 Q's · pain 135.** Gateway/marketplace deposits vs. the GL. Seed: ["Is anyone else dealing with payment gateway deposits that never match what's in QuickBooks?"](https://reddit.com/r/Bookkeeping/comments/1s8h7ry/is_anyone_else_dealing_with_payment_gateway/) (pain 15, weak).

6. **One-way vs. two-way sync, explained** — `one-way-vs-two-way-sync-explained` (candidate, P1). **8 unanswered · 9 Q's · pain 143.** Directly on the move-vs-verify wedge; explains why a "sync" still leaves systems disagreeing. Seed: ["How are growing D2C brands handling payout reconciliation?"](https://reddit.com/r/ecommerce/comments/1r568lr/how_are_growing_d2c_brands_handling_payout/) — **pain 25, the highest-pain unanswered question in the entire bank.**

_Refresh candidates (already published, but carrying high residual unanswered demand — consider expanding / adding an FAQ rather than writing net-new):_ **shopify-erp** (published, 27 unanswered, pain 412), **netsuite-gl** (published, 22 unanswered, pain 251), **difference-taxonomy** (published, 12 unanswered, pain 272). These outrank several unpublished topics on raw demand; the published article likely isn't capturing the long tail of questions.

_What changed from the 06-01 fallback ranking:_ that list led with **amazon-settlement** and the QB≠Shopify inventory thread, drawn from per-thread pain in the brief. The real demand table ranks **amazon-settlement** far lower (only **3 unanswered**, pain 53) and elevates **bank-rec, auditors, csv-gotchas, marketplace-payouts** — all high-unanswered topics the single-day brief under-weighted. Net: write the recurring high-volume topics first; amazon-settlement is a strong *angle* (see below) but not a top-priority standalone by demand.

---

## New angles from Reddit

_No new threads this run (`recon_new_since_last.md` = 0), so no new seeded angles today. The angles below carry over from the 2026-06-01 pull and remain open._

- **The "MATCHED" false-confidence angle.** A 10-year FP&A practitioner: standard Excel reconciliations report MATCHED while duplicates and missing entries hide underneath. Reframe operationally: a green checkmark is not the same as agreement. High pain (21). Seed: [Excel reconciliations that say MATCHED but hide duplicates](https://reddit.com/r/Accounting/comments/1stpdxk/tired_of_excel_reconciliations_that_say_matched/). _Tag: finance, but "matched ≠ correct" is exactly our wedge._
- **Slightly-different invoice numbers defeat dedup.** Duplicate vendor payment slipped through because invoice numbers differed by a character → fuzzy/identity matching content (`fuzzy-matching`, `primary-id` published). Seed: [Small business AP — catch duplicate payments?](https://reddit.com/r/QuickBooks/comments/1nog8xi/small_business_ap_how_do_you_catch_duplicate/).
- **Seasonal: BFCM backend breaks where ads don't.** "Brands put all their energy into ads; the real problems show up in the backend" — inventory sync failing across Shopify, Amazon, and warehouses. Timely Q3/Q4 angle, ops-framed. Seed: [BFCM bottleneck](https://reddit.com/r/smallbusiness/comments/1p0lv6f/whats_the_real_bottleneck_in_your_bfcm_prep_this/).
- **Data silos = inventory you can't trust.** "Shopify customer data doesn't match Amazon reports, inventory scattered across CSVs." Operational data-fragmentation framing. Seed: [Data Silos between Shopify, Amazon and Ads](https://reddit.com/r/ecommerce/comments/1pxre20/how_are_you_handling_data_silos_between_shopify/).

## Competitor / validation signals

_No new competitor sightings this run. Carried over:_

- Multiple founders building in this exact space (log, don't engage): a bank-CSV/QuickBooks dedup tool seeking beta testers ([smallbusiness](https://reddit.com/r/smallbusiness/comments/1o9s438/built_a_small_tool_to_clean_up_messy_bank_csvs/)); an FBA inventory-reconciliation tool ([FBA](https://reddit.com/r/FulfillmentByAmazon/comments/1oold09/im_building_a_tool_to_automate_fba_inventory/), pain 21); a $750/mo inventory auto-sync probe ([Entrepreneur](https://reddit.com/r/Entrepreneur/comments/1ngye6d/would_a_simple_750mo_tool_to_autosync/)). Validates demand; all framed as point-fix integrations, not a verification layer.
- Named in threads as adjacent/competing reconciliation tools: **RecoNexus**, **Synder**, **A2X** (settlement parsers), plus IDP tool **Nanonets** for bank-statement volume. A2X/Synder recur as the community's default answer for Shopify/Square→books — worth tracking as the incumbents our "operational verification, not retrospective GL" message must differentiate from.

---

## Changelog

- **2026-06-03** — No new threads (`recon_new_since_last.md` = 0). **Replaced the 06-01 fallback ranking with the now-populated `recon_topic_demand.md` demand table.** Next-articles list is now ranked by unanswered demand over unpublished topics: bank-rec (23 unanswered), auditors (22), shopify-payout-bundling (14), csv-gotchas (13), marketplace-payouts (11), sync-direction (8). Added a "refresh candidates" note for published topics with high residual demand (shopify-erp 27, netsuite-gl 22, difference-taxonomy 12). Demoted amazon-settlement (only 3 unanswered in the real table vs. its #1 spot on the brief-derived list). No new angles/competitors logged (no new corpus). Evidence files untouched to avoid duplicating 06-01 quotes.
- **2026-06-01** — File created. Ranked the first next-articles list from the daily brief (topic-demand/questions files were empty this run). Added four new angles (MATCHED false-confidence, invoice-number dedup, BFCM seasonal, data-silos) and logged 3 founder-built competitors + Nanonets. Strongest signal: Amazon↔ERP settlement (pain 10, unanswered) and the ops-framed "even when everything syncs" inventory mismatch (pain 9, unanswered).
