# Spreadsheet-to-System Migration Checklist

A tool-agnostic checklist for moving your records out of spreadsheets and into
a system (accounting platform, ERP, inventory system) without losing or bending
anything on the way. The rule the whole checklist enforces: **the migration is
done when the new system reconciles to the frozen spreadsheets — not when the
importer says "success."**

Print it, or copy it into your project tracker. Delete the example rows in the
control log and add your own sheets.

---

## 0. Decide, before touching any data

- [ ] Cutover date picked: first of a month, right after a close you trust.
- [ ] One owning sheet named per record type (products, customers, open orders, open invoices, on-hand quantities). Everything else is reference, not import material.
- [ ] Primary ID chosen per record type (order no., SKU, invoice no.) — stable, unique, formatted as text. Mint one now if rows have no natural key.
- [ ] "Done" defined in writing: which controls must pass (see §3), and who signs.

## 1. Freeze the baseline

- [ ] Dated, read-only copy made of every owning sheet. This is the migration baseline — nothing edits it, ever.
- [ ] Control log started (see below): row count + column sums recorded per frozen sheet.

## 2. Clean (in a working copy — never in the frozen baseline)

- [ ] Duplicates found and merged (watch near-misses: same vendor spelled two ways, same invoice keyed twice).
- [ ] Key columns formatted as text (no dropped leading zeros, no scientific notation).
- [ ] Dates normalized to ISO YYYY-MM-DD; one currency convention; signs correct on refunds/credits.
- [ ] Merged cells, color-as-data, and derived columns (running balances, lookups, subtotals) removed — migrate facts, not formulas.

## 3. Import and prove it

- [ ] Import run with keys as text end to end.
- [ ] Record counts: system count = frozen-sheet row count, per record type (or the difference is a named list of intentionally skipped rows).
- [ ] Control totals: system sums = frozen-sheet sums for every amount, quantity, and balance column — to the cent / unit.
- [ ] Open items: unpaid invoices and open orders match item by item (count and total).
- [ ] Misses named, not just measured: anti-join frozen sheet vs. system export on the primary ID (COUNTIF = 0 → never arrived; COUNTIF > 1 → duplicate).
- [ ] Opening balances entered from the frozen sheets' closing totals; system trial balance ties account by account. No plugs — investigate instead.
- [ ] Spot-check: 10–20 real rows (including the ugly ones) opened in the new UI; every field still means what it meant in the sheet.
- [ ] Control log signed by someone other than the person who ran the import.

## 4. Parallel run (one full cycle)

- [ ] One complete close/month-end processed in BOTH old sheets and new system.
- [ ] Outputs compared line by line; every difference explained and fixed in configuration, not patched in data.
- [ ] Pass condition met → parallel run ends. (Bigger operation? Parallel only cash, open orders, and on-hand inventory.)

## 5. Cutover and archive

- [ ] Old sheets archived read-only, permanently — they are the evidence behind your opening balances. Never deleted.
- [ ] Team access to the old sheets switched to view-only so no one keeps working in them.
- [ ] The day-one checks (counts, totals, anti-join on the key) scheduled as a standing check between the new system and whatever still feeds it.

---

## Control log (example — replace with your sheets)

| Frozen sheet        | Rows out | Total out        | Rows in | Total in | Pass? |
|---------------------|----------|------------------|---------|----------|-------|
| open-invoices.xlsx  | 412      | $187,340.55      |         |          |       |
| open-orders.xlsx    | 96       | 1,204 units      |         |          |       |
| customers.xlsx      | 2,310    | n/a (count only) |         |          |       |

*From the learn library at drpn.ai — tool-agnostic, nothing to buy.*
