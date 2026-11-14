// Educational article bodies for the Writing section.
//
// This is the "learn" library: tool-agnostic, practitioner-grade pieces on how
// to reconcile data syncs between systems — concepts, manual methods,
// spreadsheets, AI assistance, and system-specific guides. Metadata (date,
// category, reading time) lives in writing-entries.ts; full bodies live here,
// keyed by the same slug. The renderer is components/WritingArticle.tsx.

export type Block =
  | { t: 'p'; text: string }
  | { t: 'h2'; text: string }
  | { t: 'h3'; text: string }
  | { t: 'ul'; items: string[] }
  | { t: 'ol'; items: string[] }
  | { t: 'table'; head: string[]; rows: string[][] }
  | { t: 'callout'; kind: 'tip' | 'warning' | 'note'; text: string }
  | { t: 'code'; text: string }
  | { t: 'quote'; text: string }

export type FaqItem = { q: string; a: string }

export type Article = {
  slug: string
  title: string
  description: string
  keywords: string[]
  lead: string
  blocks: Block[]
  faq?: FaqItem[]
}

const articles: Article[] = [
  {
    slug: 'spreadsheet-to-system-migration-checklist',
    title: 'Moving off spreadsheets: a migration checklist that proves nothing got lost',
    description:
      'A spreadsheet-to-system migration is not done when the importer says success — it is done when the new system reconciles to the frozen spreadsheets on a control set you defined before you moved: record counts, control totals, open items, and opening balances that tie to the old numbers. This checklist covers the whole move: what to clean before you export (one owning sheet per record type, a stable primary ID, deduped rows, text-formatted keys and ISO dates), the import-proving procedure (freeze the sheets, count what left, count what arrived, tie the totals, anti-join the misses, tie the opening trial balance), how long to run old and new in parallel, and why the old spreadsheets get archived read-only instead of deleted. Includes a printable migration checklist download.',
    keywords: [
      'spreadsheet to system migration checklist',
      'migrate from excel to accounting software',
      'move from spreadsheets to erp',
      'data migration reconciliation',
      'validate migrated data record counts control totals',
      'opening balance does not match after migration',
      'xero conversion balances trial balance',
      'quickbooks opening balance migration',
      'parallel run old and new system',
      'freeze spreadsheets after migration audit trail',
    ],
    lead: 'An Australian distributor asked [r/smallbusiness](https://reddit.com/r/smallbusiness/comments/1tap1s9/stuck_on_legacy_systems_at_3m_revenue_with_10/) what sensible modernization looks like at $3M revenue and 5,000 orders a year: HubSpot for CRM, MYOB for accounting, FileMaker for sample loans, and ["a graveyard of Google Sheets for dispatch, credit card payments, overseas supplier payments"](https://reddit.com/r/smallbusiness/comments/1tap1s9/stuck_on_legacy_systems_at_3m_revenue_with_10/). Forty-three comments later, the advice ran to which system to buy and what made the business special — nobody laid out the part that decides whether the move actually works: how do you get years of spreadsheet data into a system and prove nothing got lost or bent on the way? So here is that answer, up front. A migration is a reconciliation. It is not done when the importer says success — it is done when the new system ties to the frozen spreadsheets on a control set you wrote down before you moved: record counts, control totals, open items, and opening balances. Miss that step and you will spend the next year not trusting the new system for the same reason you did not trust the sheets. The full checklist is below, and there is a [printable version](/downloads/spreadsheet-to-system-migration-checklist.md) to take with you.',
    blocks: [
      { t: 'h2', text: 'Why do spreadsheet-to-system migrations go wrong?' },
      {
        t: 'p',
        text: 'Because "imported" gets mistaken for "correct." An importer reports what it processed, not whether what arrived still means what it meant in the sheet. [Data migration](https://en.wikipedia.org/wiki/Data_migration) has a whole verification discipline for exactly this reason: after the transfer, [data verification](https://en.wikipedia.org/wiki/Data_verification) checks that records were translated accurately and completely — because the failure modes are quiet. A key column that [lost its leading zeros or flipped to scientific notation](/notes/csv-gotchas-encoding-delimiters) on the way through CSV. A date column read in the wrong locale. A currency column that silently dropped its negative signs on refunds. None of these stop the import. All of them break every match you try to run afterward.',
      },
      {
        t: 'p',
        text: 'The other classic failure is duplication rather than loss. An operator on [r/QuickBooks](https://reddit.com/r/QuickBooks/comments/1l1uwaz/can_i_match_imported_gross_cc_payments_to/) — mid-move, "reconciling accounts monthly using a very dense spreadsheet, and I\'m hoping to move everything to QuickBooks Online" — got the sharpest description of it from a commenter: ["you have two separate import streams creating duplicate records of the same transaction in QBO, and there\'s no automatic way for QBO to match them since they came in through different doors"](https://reddit.com/r/QuickBooks/comments/1l1uwaz/can_i_match_imported_gross_cc_payments_to/). Two sheets that both mention the same order become two records the moment you import both. The system did not make a mistake. The migration plan did — by never deciding [which sheet owns which record](/notes/how-to-reconcile-two-systems-by-hand).',
      },
      { t: 'h2', text: 'What should you clean before you export?' },
      {
        t: 'p',
        text: 'One commenter in that thread — from a CFO-services firm, so read it as a practitioner with something to sell — pushed back on the buy-something reflex, and was half right: ["don’t buy an erp because your process is messy. at $3m and 5,000 orders, the win is killing duplicate entry and paper handoffs first."](https://reddit.com/r/smallbusiness/comments/1tap1s9/stuck_on_legacy_systems_at_3m_revenue_with_10/) Right — a system inherits your mess with better fonts. But "clean it up first" needs a concrete meaning, and for a migration it is this:',
      },
      {
        t: 'ul',
        items: [
          'One owning sheet per record type. Products, customers, open orders, open invoices, on-hand quantities: each gets exactly one sheet declared the source of truth for the move. Every other sheet that mentions those records is reference material, not import material. This is the single decision that prevents the two-doors duplicate problem above.',
          'A [primary ID](/notes/how-to-reconcile-two-systems-by-hand) that survives the trip. Every row needs a stable, unique key — order number, SKU, invoice number — formatted as text so Excel and the importer cannot [reshape it in transit](/notes/csv-gotchas-encoding-delimiters). If rows have no natural key, mint one now and keep it through the import; it is how you will trace any missing row back.',
          'Deduplicate before you export, not after. Near-miss duplicates — the same vendor spelled two ways, the same invoice keyed twice with slightly different numbers — import as clean separate records and are much harder to unpick inside a system. [Fuzzy-match them in the sheet](/notes/fuzzy-matching-records) while it is still cheap.',
          'Normalize the fragile formats: dates to ISO YYYY-MM-DD, one currency convention, no merged cells, no color-as-data. If the meaning lives in formatting, it will not survive a CSV.',
          'Migrate facts, not formulas. Derived columns — running balances, lookups, subtotals — get recomputed by the new system. Exporting them just gives you two versions of a number that can disagree later.',
        ],
      },
      { t: 'h2', text: 'What does "the migration is done" actually mean?' },
      {
        t: 'p',
        text: 'Write the definition down before you import anything, because afterward it is too easy to declare victory. Done means: the new system reconciles to the frozen sheets on a small set of controls, every control passes or has a named, explained exception, and someone signed it. The standard is not "it looks right," but "here is the evidence." The control set is short:',
      },
      {
        t: 'table',
        head: ['Control', 'From the frozen sheets', 'From the new system', 'Passes when'],
        rows: [
          ['Record counts', 'Row count per exported sheet', 'Record count per imported type', 'Equal, or the difference is a named list of intentionally skipped rows'],
          ['Control totals', 'Sum of amount, quantity, balance columns', 'Same sums from a system report', 'Equal to the cent / unit'],
          ['Open items', 'Count + total of unpaid invoices, open orders', 'Open-item reports after import', 'Both match, item by item'],
          ['Opening balances', 'Closing balances in the sheets on cutover date', 'Opening trial balance in the system', 'Every account ties; nothing unexplained parked in an equity plug'],
          ['Spot-check sample', '10-20 real rows, including the ugly ones', 'The same records, opened in the UI', 'Every field means what it meant in the sheet'],
        ],
      },
      {
        t: 'p',
        text: 'Opening balances deserve the extra sentence, because the accounting platforms are explicit about them. Xero calls them [conversion balances](https://central.xero.com/s/article/Enter-conversion-balances) and expects you to bring the [trial balance](https://en.wikipedia.org/wiki/Trial_balance) from your previous system as of the day before your [conversion date](https://central.xero.com/s/article/Setting-your-conversion-date); QuickBooks Online has the same concept as [opening balances](https://quickbooks.intuit.com/learn-support/en-us/help-article/bank-deposits/enter-opening-balance-account-quickbooks-online/L7NcxTbuu_US_en_US), offset through an opening-balance-equity account. If your "previous system" is a stack of sheets, the closing totals of those sheets on cutover day are your trial balance. They have to tie — that number is the foundation every future reconciliation builds on.',
      },
      { t: 'h2', text: 'How do you prove the import, step by step?' },
      {
        t: 'ol',
        items: [
          'Pick the cutover date. First of a month, immediately after a close you trust. Xero requires the first of a month for its conversion date; it is the right convention everywhere else too.',
          'Freeze the sheets. Make a dated, read-only copy of every owning sheet. This frozen set is the migration baseline: every check below compares against it, not against a live sheet someone can still edit.',
          'Record what is leaving. For each frozen sheet: row count, and the sum of every amount, quantity, and balance column. Write them in a control log.',
          'Clean per the list above, in a working copy — never in the frozen baseline.',
          'Export and import. Keep the key column formatted as text end to end.',
          'Count what arrived. Pull record counts and the same sums from the new system\'s reports. Compare against the control log.',
          'Find the misses by name. If counts differ, anti-join the frozen sheet against a system export on the primary ID — [XLOOKUP](/notes/reconcile-two-files-in-excel-with-xlookup) does it in minutes — so you get the exact rows that dropped or duplicated, not just a discrepancy.',
          'Tie the opening balances. Enter them from the frozen sheets\' closing totals, run the system\'s trial balance, and confirm every line. Do not plug a difference to make it balance — a plug today is an unexplainable number forever. Investigate: it is a dropped row, a duplicate, or a bent field, and step 7 will name it.',
        ],
      },
      {
        t: 'code',
        text: 'Control log, per exported sheet\n-------------------------------\nrows_out    = COUNTA(A2:A5001)        row count leaving the sheet\ntotal_out   = SUM(F2:F5001)           per amount / qty / balance column\n\nAfter import, from the system\'s own reports\n--------------------------------------------\nrows_in     = record count for the imported type\ntotal_in    = same sums, from a system report\n\nPass condition\n--------------\nrows_out = rows_in   AND   total_out = total_in   (to the cent / unit)\n\nIf not — name the rows. Anti-join on the primary ID:\n----------------------------------------------------\n=COUNTIF(SystemExport!A:A, A2)        0    = this row never arrived\n=COUNTIF(A:A, A2) > 1                 TRUE = duplicate in the source',
      },
      { t: 'h2', text: 'Should you run the old and new systems in parallel?' },
      {
        t: 'p',
        text: 'For one full cycle, yes. [Parallel running](https://en.wikipedia.org/wiki/Parallel_running) — operating both, feeding both the same transactions, comparing the outputs — is the classic way to prove a new system before you depend on it, and comparing those outputs is just [reconciling two systems](/notes/how-to-reconcile-two-systems-by-hand), which after this migration you are already set up to do. Honesty about the cost: it is double the work, which is why the textbook caveat is that it gets prohibitive at scale. So scope it. One month-end in both. If your operation is bigger, parallel only the processes where an error is expensive — cash, open orders, inventory on hand — and cut the rest over directly. What you are buying is one close where a disagreement points at a configuration mistake you can still fix cheaply, instead of a mystery you discover in production.',
      },
      { t: 'h2', text: 'What happens to the old spreadsheets?' },
      {
        t: 'p',
        text: 'They get archived read-only, and they never get deleted. The frozen sheets are the evidence behind your opening balances — the thing you point at when a number is questioned two years from now. When a poster on [r/FPandA](https://reddit.com/r/FPandA/comments/1rwyar6/whats_actually_in_your_saas_finance_stack_that/) described a "full reset" of their finance stack that took the close from 8 days to 2, the replies went straight at the trail: ["Did you actually migrate the ledger or just start a new \'Company\' file in QB? Because starting fresh is cheating lol"](https://reddit.com/r/FPandA/comments/1rwyar6/whats_actually_in_your_saas_finance_stack_that/), and a more pointed one — cutting a close by 75% ["usually means you’re cutting corners on the audit trail"](https://reddit.com/r/FPandA/comments/1rwyar6/whats_actually_in_your_saas_finance_stack_that/). That is the reputation a bridge-less migration earns. The frozen baseline plus the signed control log is what makes yours defensible instead.',
      },
      {
        t: 'callout',
        kind: 'warning',
        text: 'The fresh-start trap: entering opening balances nobody can trace back to anything. It feels clean — new system, round numbers, move on. But an opening balance with no bridge to the old records is an unverifiable base, and every reconciliation you run afterward inherits it. A thread title on r/Netsuite says where that road ends: [Migrating to Standard Bank Rec and Dealing with a 10-year gap](https://reddit.com/r/Netsuite/comments/1s2mqzb/migrating_to_standard_bank_rec_and_dealing_with_a/) — ten years of unreconciled history to excavate, and zero replies. Draw the line on cutover day, prove it once, and nobody ever has to dig it back up.',
      },
      {
        t: 'callout',
        kind: 'note',
        text: 'Free download: the whole thing as a printable checklist — [spreadsheet-to-system-migration-checklist.md](/downloads/spreadsheet-to-system-migration-checklist.md). Freeze, clean, export, prove, parallel, archive — with the control log built in. No macros, no signup; delete the example rows and add your own sheets.',
      },
      {
        t: 'p',
        text: 'One more thing, because it is the part everyone skips in the relief of being done: the checking does not stop at go-live. The day-one control set — counts, totals, anti-join on the key — is exactly the check you should keep running between the new system and whatever still feeds it, because [integrations drop records too](/notes/reconcile-your-integration-dropped-records), and they do it silently. The migration taught you to verify a transfer instead of trusting it. Keep the habit; it is worth more than the new software.',
      },
    ],
    faq: [
      {
        q: 'Do I need to migrate historical transactions, or just opening balances?',
        a: 'The minimum is opening balances plus open items: unpaid invoices, unshipped orders, on-hand quantities. History is optional — most teams keep it in the archived read-only sheets and import one to two years at most, because every imported year is another year of data to verify. If you skip history, the frozen sheets remain your archive, which is another reason they never get deleted.',
      },
      {
        q: 'How long should the parallel run last?',
        a: 'At least one full close cycle — a complete month-end processed in both, with the outputs compared line by line. One cycle catches most configuration and mapping errors. Running parallel for many months usually means nobody defined what would count as passing, so define the pass condition first and stop when it holds.',
      },
      {
        q: 'What if the new system\'s balances don\'t match the spreadsheet after import?',
        a: 'Do not plug the difference. Work the sequence: compare record counts first (did rows drop or duplicate?), then control totals per column (did a field bend — signs, decimals, dates?), then anti-join on the primary ID to name the exact offending rows. A migration difference is always one of three things — a missing row, a duplicated row, or a changed value — and the sequence identifies which before you touch anything.',
      },
      {
        q: 'Should I clean the data before or after migrating?',
        a: 'Before, in a working copy of the frozen export. Cleaning inside the new system means reconciling a moving target: you can no longer tell whether a difference against the old sheets is a migration error or your own cleanup. Fix duplicates, keys, and formats in the sheet, re-run the control totals, then import.',
      },
      {
        q: 'Can I just start fresh in the new system and skip the migration?',
        a: 'You can start with balances only and no transaction history — that is a legitimate lightweight migration. What you cannot skip is proving those balances: they must tie to the closing totals of the old records on cutover day, and the old records must be kept read-only as evidence. A fresh start with untraceable numbers is not a migration, it is a gap that every future reconciliation sits on top of.',
      },
    ],
  },
  {
    slug: 'inventory-reconciliation-cycle-counts',
    title: 'Inventory reconciliation with cycle counts: keeping the shelf, the storefront, and the books in agreement',
    description:
      'Your systems can all show the same inventory number and still be wrong, because a single source of truth only makes every system agree — it does nothing to make that number match the physical shelf. Stock drifts away from every record through shrink, damaged units, receiving errors, mis-picks, and returns restocked wrong, and the only thing that corrects it is counting. This guide separates the two reconciliations most operators collapse into one: system-to-shelf (is the number actually true?) and system-to-system (do Shopify, your ERP, and your 3PL agree?). It explains cycle counting — counting a rotating subset of SKUs on a schedule instead of shutting down for a full physical count — how to rank SKUs by value with ABC analysis so your best sellers get counted most often, how to record a count blind and post the variance with a reason code, the inventory record accuracy formula and how to set a target you can trend, and how to push each correction from your source of truth back out to the sales channels so the fix does not immediately drift away again.',
    keywords: [
      'inventory reconciliation cycle count',
      'why quickbooks inventory does not match shopify',
      'cycle counting ABC analysis',
      'inventory record accuracy formula',
      'reconcile inventory across systems',
      'physical count vs system inventory',
      'inventory shrinkage reconciliation',
      'how often to cycle count',
      'inventory count variance threshold',
    ],
    lead: 'Open QuickBooks and Shopify side by side and the inventory counts just… don\'t match. Orders are syncing fine. Both systems look right on their own. They still disagree. That exact scene gets posted over and over — one seller in [r/smallbusiness](https://reddit.com/r/smallbusiness/comments/1qtw544/why_doesnt_quickbooks_inventory_quantity_match/) put it plainly: ["Even when orders are syncing correctly, inventory quantities still do not match between Shopify and QuickBooks. It does not seem random."](https://reddit.com/r/smallbusiness/comments/1qtw544/why_doesnt_quickbooks_inventory_quantity_match/) The usual reply is "pick a single source of truth." That\'s half right — and the missing half is the half that actually costs you money. A source of truth only makes every system agree on one number. It does nothing to make that number match what\'s on the shelf. Here is how to fix both: the counting that makes the number true, and the sync that makes the systems agree.',
    blocks: [
      { t: 'h2', text: 'You have two problems, not one' },
      {
        t: 'p',
        text: 'The complaint "my inventory doesn\'t reconcile" is almost always two separate failures stacked on top of each other. The first is system-to-shelf: does the number in your source of truth match the units physically sitting in the warehouse? The second is system-to-system: do Shopify, your ERP, and your 3PL all show the same number? These have different causes and different fixes, and collapsing them is why the problem never fully goes away. Fix the sync and the systems agree — on a number that\'s still wrong. Fix the shelf in one system and the others keep showing the old figure. You have to do both, in that order: make it true, then make it agree.',
      },
      {
        t: 'p',
        text: 'Most advice only ever names the second problem. A commenter in [r/FulfillmentByAmazon](https://reddit.com/r/FulfillmentByAmazon/comments/1t0soap/trying_to_diversify_off_amazon_is_basically_a/) gave the standard answer: ["you need a single source of truth for inventory, not three systems arguing about who\'s right."](https://reddit.com/r/FulfillmentByAmazon/comments/1t0soap/trying_to_diversify_off_amazon_is_basically_a/) That\'s good advice for the agreement problem. But naming one system the winner doesn\'t make the winner correct — it just means everyone now trusts the same number, right or wrong. The physical shelf is the only real source of truth, and no software knows what\'s on it until someone counts.',
      },
      { t: 'h2', text: 'Why the number drifts away from the shelf' },
      {
        t: 'p',
        text: 'Inventory records don\'t stay right on their own, even in a well-run warehouse. Every system starts from a count and then tracks changes — sales out, receipts in — but a whole category of events changes the shelf without ever touching the record. This isn\'t rare. In one widely cited study, [DeHoratius and Raman examined nearly 370,000 inventory records across 37 stores and found 65% of them inaccurate](https://pubsonline.informs.org/doi/abs/10.1287/mnsc.1070.0789). The record and the shelf disagree by default; keeping them together is active work, not a resting state.',
      },
      {
        t: 'p',
        text: 'You can watch it happen in the threads. A seller in [r/AmazonSeller](https://reddit.com/r/AmazonSeller/comments/16puxku/amazon_warehouse_eating_my_inventory/) noticed ["the number of orders I received doesn\'t match with inventory"](https://reddit.com/r/AmazonSeller/comments/16puxku/amazon_warehouse_eating_my_inventory/) — units vanishing between what was sent and what sold — and a replying seller confirmed the same: ["Had 4 books go missing in the last day. 6 this week!"](https://reddit.com/r/AmazonSeller/comments/16puxku/amazon_warehouse_eating_my_inventory/) That\'s shrink, and it\'s only one of the ways the shelf walks away from the record.',
      },
      {
        t: 'table',
        head: ['What changed the shelf', 'Example', 'Why the record never caught it'],
        rows: [
          ['Shrink', 'Theft, damage, spoilage, units that quietly disappear', 'No transaction fires — the stock is just gone. This is what shrink means: recorded minus actual'],
          ['Receiving errors', 'PO says 100, 96 arrived, or 4 were damaged in transit', 'The receipt was posted at the PO quantity, not what was actually put away'],
          ['Mis-picks', 'The wrong SKU shipped; two different SKUs offset each other', 'The order decremented the ordered SKU, not the one that physically left'],
          ['Returns restocked wrong', 'A return added back to the wrong SKU, location, or condition', 'The refund posted, but the physical restock didn\'t match the record'],
          ['Bundles and kits', 'A kit sells but its components aren\'t decremented (or vice versa)', 'The system tracks the sellable unit, not the parts on the shelf'],
          ['Location transfers', 'Stock moved between locations but the transfer wasn\'t posted', 'Each location\'s record is now wrong in opposite directions'],
        ],
      },
      {
        t: 'p',
        text: 'A commenter on that QuickBooks-vs-Shopify thread landed on the same list from the software side: the mismatches, they said, aren\'t just sales failing to sync but ["returns/refunds + location transfers + bundles"](https://reddit.com/r/smallbusiness/comments/1qtw544/why_doesnt_quickbooks_inventory_quantity_match/) creating phantom quantities. Same drift, two vantage points. The point is that none of these error out. The record looks clean. It\'s just no longer true.',
      },
      {
        t: 'p',
        text: 'The formula for how far the record has drifted is simple, and it\'s worth internalizing because it\'s also the definition of shrink. Per [Shopify\'s own guidance](https://www.shopify.com/blog/retail-shrinkage), inventory shrinkage equals recorded inventory minus actual inventory. If your system says 100 and the shelf holds 96, you have four units of shrink — and until someone counts, you don\'t know it exists.',
      },
      { t: 'h2', text: 'The once-a-year physical count is the wrong tool' },
      {
        t: 'p',
        text: 'The instinct is to fix drift with a full physical count: stop everything, count all of it, reset the numbers. It works, briefly. But a full count means shutting the warehouse (or counting through a weekend), it happens once or twice a year, and by February the number you reset in January is wrong again. Worse, it tells you the total drift without telling you which SKUs drifted or when, so you learn nothing about the cause. It\'s a reset, not a control.',
      },
      {
        t: 'p',
        text: 'And the manual version of "just recount it" quietly eats the team. A write-up interviewing 40-plus Shopify warehouse merchants (fair warning — it was pitching a tool) named the top pain not as overselling but as ["The Monday morning reconciliation ritual"](https://reddit.com/r/smallbusiness/comments/1tgf9vg/the_hidden_cost_of_good_enough_inventory_tracking/) of manual recounts: ["I went into this thinking the biggest inventory problem would be overselling. It\'s not."](https://reddit.com/r/smallbusiness/comments/1tgf9vg/the_hidden_cost_of_good_enough_inventory_tracking/) Treat that as one person\'s framing rather than a statistic, but the shape is familiar to anyone who\'s done it: recounting everything, all the time, by hand, and still not trusting the number.',
      },
      { t: 'h2', text: 'Cycle counting: count a slice, on a schedule, without stopping' },
      {
        t: 'p',
        text: 'The tool built for this is the cycle count. Instead of counting everything at once, you count a small subset of SKUs on a rotating schedule while the warehouse keeps running — a [perpetual auditing procedure that counts a specific subset in a continuous, repeated sequence](https://en.wikipedia.org/wiki/Cycle_count). Over a quarter you cover everything, but on any given day you\'re only counting a handful of bins. No shutdown, and because counts happen constantly, drift gets caught in days instead of at year-end. [Shopify](https://www.shopify.com/blog/cycle-count) and [NetSuite](https://www.netsuite.com/portal/resource/articles/inventory-management/using-inventory-control-software-for-cycle-counting.shtml) both document the practice; the mechanics below are the same regardless of which system you run.',
      },
      {
        t: 'p',
        text: 'The question is which SKUs to count how often. Counting everything equally wastes effort on the slow movers and under-counts the ones that matter. The standard answer is ABC analysis: rank SKUs by annual value (unit cost × units sold) and count the high-value ones most. It\'s the [Pareto pattern applied to inventory](https://www.netsuite.com/portal/resource/articles/inventory-management/abc-inventory-analysis.shtml) — a small share of your SKUs drives most of your value, so they earn the most attention.',
      },
      {
        t: 'table',
        head: ['Class', 'Roughly', 'Typical count frequency', 'Why'],
        rows: [
          ['A', 'Top ~20% of SKUs, ~80% of value', 'Weekly or monthly', 'Most of your money; drift here is expensive and worth catching fast'],
          ['B', 'Next ~30% of SKUs, ~15% of value', 'Quarterly', 'Moderate value; a slower cadence keeps them honest'],
          ['C', 'Remaining ~50% of SKUs, ~5% of value', 'Twice a year to annually', 'Low value; frequent counting isn\'t worth the labor'],
        ],
      },
      {
        t: 'callout',
        kind: 'note',
        text: 'The percentages are a starting convention, not a law. Re-rank quarterly — a C item that becomes a hero SKU should move to A before its drift becomes a stockout you didn\'t see coming.',
      },
      { t: 'h2', text: 'How to run a count and post the variance' },
      {
        t: 'p',
        text: 'The procedure below is deliberately mechanical. The whole value of a cycle count is that it\'s repeatable and boring, so it should read that way.',
      },
      {
        t: 'ol',
        items: [
          'Pull today\'s count list from the schedule — the SKUs and locations due based on their ABC class.',
          'Count blind: give the counter the SKU and bin, not the expected quantity. Seeing the system number first is how a count turns into a confirmation instead of a check.',
          'Record the physical quantity per SKU per location, then compare it to the system quantity to get the variance.',
          'Apply a variance threshold. Small, in-tolerance differences (often ±1–2 units or a small percentage on high-count SKUs) get posted and moved on; anything past the threshold gets investigated before you adjust.',
          'Investigate the exceptions: was it a mis-pick, an unposted transfer, a receiving error, a return to the wrong SKU, or genuine shrink? The cause determines whether a process needs fixing, not just a number.',
          'Post the adjustment in your source of truth with a reason code, not a silent overwrite — Shopify, for instance, lets you [add a reason to every inventory adjustment](https://help.shopify.com/en/manual/products/inventory/adjusting-inventory/adjusting-inventory-quantities) so the change is explainable later.',
          'Log the accuracy result so you can trend it over time (next section).',
        ],
      },
      {
        t: 'code',
        text: 'Per-count math (one SKU at one location)\n----------------------------------------\nsystem_qty    = quantity the record shows        e.g. 100\nphysical_qty  = quantity actually counted        e.g.  96\nvariance      = physical_qty - system_qty        =    -4   (4 units of shrink)\nabs_var_pct   = |variance| / system_qty * 100    =     4.0%\n\nInventory Record Accuracy for the count batch\n---------------------------------------------\nIRA = (# SKUs within tolerance / # SKUs counted) * 100\n  e.g. 47 of 50 SKUs matched within tolerance -> 94.0%\n\nShrinkage (value, over a period)\n--------------------------------\nshrinkage = recorded_inventory - actual_inventory   (Shopify\'s definition)',
      },
      {
        t: 'callout',
        kind: 'tip',
        text: 'Counting blind is the single highest-leverage habit here. A counter who can see "system says 100" will find 100 far more often than they should. Hide the expected number and your accuracy metric starts measuring reality instead of confirmation bias.',
      },
      {
        t: 'p',
        text: 'What\'s a good accuracy number? Set your own target, per ABC class; many teams aim for the high 90s on A items. The exact target matters less than the trend: if your weekly IRA is climbing, your process is working; if it\'s flat and low, you have a systemic cause (a bad receiving step, an unreliable integration) that counting alone won\'t fix.',
      },
      { t: 'h2', text: 'Now reconcile the systems to each other' },
      {
        t: 'p',
        text: 'Once your source of truth matches the shelf, the second reconciliation is proving the other systems agree with it: SKU by SKU, source of truth against each channel and against the books, then correcting the laggards from the counted source. That procedure, with the sync-lag and counting-logic causes and a worked example, is in [why inventory oversells across Shopify, Amazon, and your 3PL](/notes/3pl-inventory-sync-oversells).',
      },
      {
        t: 'callout',
        kind: 'warning',
        text: 'Never let a "synced" system push inventory numbers to your channels before that system has itself been counted. If the source of truth is wrong, a fast, reliable sync just propagates the wrong number to every storefront faster. Count first, then sync.',
      },
      { t: 'h2', text: 'Make it a standing routine, not a fire drill' },
      {
        t: 'p',
        text: 'Cycle counting only pays off as a habit. Put the count schedule on the calendar by ABC class, count blind, post with reason codes, and track weekly IRA per class so you can see drift building before it becomes a stockout or an oversell. The reason codes do double duty: they turn every adjustment into an audit trail — [Shopify keeps a full adjustment history](https://help.shopify.com/en/manual/products/inventory/adjusting-inventory/adjustment-history) of who changed what and why, and most systems have an equivalent. When two SKUs keep offsetting each other, that\'s usually a mis-pick or a mislabeled bin, and it\'s the same detective work as [fuzzy matching records](/notes/fuzzy-matching-records): the numbers point you at a cause, not just a correction.',
      },
      {
        t: 'p',
        text: 'The honest ceiling: a spreadsheet and a disciplined weekly count will hold a small catalog steady for a long time. When you\'re counting across several locations, reconciling three or more systems every day, or need every adjustment traceable for an audit, the manual version starts to buckle — and that\'s the point where a dedicated reconciliation layer earns its place. Either way, the discipline is the same: count the shelf, make one system true, then make the rest agree.',
      },
    ],
    faq: [
      {
        q: 'How often should I cycle count each SKU?',
        a: 'Rank SKUs by annual value using ABC analysis and count by class: A items (your highest-value, roughly the top 20% of SKUs) weekly or monthly, B items quarterly, and C items twice a year to annually. Re-rank every quarter so a fast-rising SKU moves up before its drift surprises you. The goal is that everything gets counted over a rolling period without ever shutting the warehouse.',
      },
      {
        q: 'What inventory accuracy should I aim for?',
        a: 'Set your own target for inventory record accuracy — the share of counted SKUs that land within your variance tolerance — per ABC class; many teams aim for the high 90s on A items. The exact target matters less than the direction: a rising weekly accuracy number means the process is working, while a flat, low number points to a systemic cause like a bad receiving step or an unreliable integration that counting alone will not fix.',
      },
      {
        q: 'Do I have to stop selling or freeze the warehouse to cycle count?',
        a: 'No — that is the whole advantage over a full physical count. You count a small subset of SKUs and locations on a schedule while normal operations continue. Count during a quiet window if you can, and if a bin is being actively picked, count it before the shift or note in-flight orders so movement during the count does not read as a false variance.',
      },
      {
        q: 'Why do my counts still not match across Shopify and QuickBooks after I fix the shelf?',
        a: 'Because that is a different reconciliation. Matching the shelf makes one system true; it does not make the others agree. Cross-system gaps come from sync timing lag, bundle or kit logic that is mirrored in one system but not the other, and multi-location totals that roll up differently. After the shelf is right in your source of truth, match every SKU across systems on a stable ID and correct the laggards from the counted source — never the other way around.',
      },
      {
        q: 'Should the person counting see the expected quantity?',
        a: 'No. Count blind — give the counter the SKU and location but not the system quantity. When people can see the expected number they tend to find it, which turns a genuine check into a rubber stamp and quietly inflates your accuracy metric. Record the physical count first, then compare to the system to get a real variance.',
      },
    ],
  },
  {
    slug: 'reconcile-your-integration-dropped-records',
    title: 'Your integration ran clean and still dropped records: how to catch the orders that never made it across',
    description:
      'An integration can finish with a green check and still drop records, because it only reports on the rows it actually processed — a missed webhook or a skipped polling page never errors, since you cannot flag a record you never received. This guide shows how to catch silently dropped orders and transactions: run a completeness check (a record count plus a control total on a numeric field) on each sync window to prove whether everything crossed, use an anti-join on a stable primary ID to list exactly which records are missing, and backfill them idempotently so recovery does not create duplicates. It covers the three ways records go missing and why none of them error, a copy-paste count check, and how to make the reconciliation a standing job instead of a Saturday fire drill.',
    keywords: [
      'integration dropped records',
      'missing records sync',
      'orders not syncing to ERP',
      'missed webhook reconciliation',
      'how to find missing records between systems',
      'completeness check reconciliation',
      'integration silently dropping records',
      'reconcile source vs destination record count',
      'backfill without creating duplicates',
    ],
    lead: 'The sync said it worked. Green check, no error, the job finished. And six orders from Saturday are just… not in your ERP. Nothing failed loudly — that is the whole problem. A seller in [r/FulfillmentByAmazon](https://reddit.com/r/FulfillmentByAmazon/comments/1t0soap/trying_to_diversify_off_amazon_is_basically_a/) described the version that at least announces itself: ["Just spent three hours trying to reconcile missing units because the amazon api decided to randomly stop talking to my woocommerce site over the weekend. again."](https://reddit.com/r/FulfillmentByAmazon/comments/1t0soap/trying_to_diversify_off_amazon_is_basically_a/) The quieter version never even goes dark — it drops a handful of records mid-run and reports success on the rest. Here is how to catch them: not by trusting the sync, but by counting what should have crossed against what actually did.',
    blocks: [
      {
        t: 'p',
        text: 'Search those threads and the advice is almost always "switch tools." A user in [r/QuickBooks](https://reddit.com/r/QuickBooks/comments/1bc99p0/working_square_integration/) calls the QuickBooks "Connect to Square" integration ["so horribly broken"](https://reddit.com/r/QuickBooks/comments/1bc99p0/working_square_integration/); the top reply tells them to switch connectors. Maybe that is right. But swapping connectors does nothing about the records the next one will also drop, because the gap is not which tool you use — it is that you are trusting the tool to tell you when it failed. It cannot tell you about a record it never received. The fix is a completeness check you run yourself: count the source, count the destination, and find the difference. That is the entire move, and almost nobody on these threads names it.',
      },
      { t: 'h2', text: 'Why a clean sync still loses records' },
      {
        t: 'p',
        text: 'Most integrations move data one of two ways, and both lose records without erroring. The first is webhooks — the source fires an event when something happens and your side catches it. The catch: delivery is not guaranteed. Shopify says so directly — ["because webhook delivery isn\'t always guaranteed, you should implement reconciliation jobs to periodically fetch data"](https://shopify.dev/docs/apps/build/webhooks/best-practices). Stripe guarantees [at-least-once delivery, not exactly-once](https://docs.stripe.com/webhooks), which means an event can arrive twice or, if your endpoint times out during a deploy or a traffic spike, not arrive at all. A missed webhook is a record that never enters your system, and nothing logs it as missing because, from your side, it simply never happened.',
      },
      {
        t: 'p',
        text: 'The second is polling — the connector pulls "everything changed since last run" on a schedule. That works until a run overlaps an export window, a pagination cursor skips, a rate limit truncates the page, or the source API goes quiet (the Amazon-stopped-talking case above). The job still reports success on the rows it did pull. The ones it missed are invisible by construction: you cannot see a row that was never fetched. This is why the symptom list is always the same — the Square poster\'s ["mis-imports, missing imports, duplicates, incorrect transaction values, missing transfers"](https://reddit.com/r/QuickBooks/comments/1bc99p0/working_square_integration/). Duplicates and drops: the two signatures of a sync that processes what it sees and stays silent about what it misses.',
      },
      { t: 'h2', text: 'The three ways records go missing — and why none of them error' },
      {
        t: 'p',
        text: '"Records are missing" is three different failures wearing one complaint. They need different fixes, but you sort them the same way — by where the record was last seen. Find the failure mode first; the repair follows from it.',
      },
      {
        t: 'table',
        head: ['Failure mode', 'What actually happens', 'Why it stays silent', 'Where to look'],
        rows: [
          ['Missed webhook', 'The source fired an event your endpoint never accepted — timeout, deploy, downtime', 'No retry succeeded; your side has no record the event ever existed', 'The source platform’s event log vs your ingest log'],
          ['Polling gap', 'A scheduled pull skipped rows — cursor jump, rate limit, overlapping window, API outage', 'The job succeeds on the rows it fetched; un-fetched rows are invisible', 'Source record count for the window vs destination count'],
          ['Dropped on arrival', 'The record crossed, then a mapping rule, validation, or bad key rejected it', 'It "synced," then silently fell out at the destination', 'The destination’s reject/error queue and unmapped-value logs'],
        ],
      },
      {
        t: 'p',
        text: 'The first two are missing-on-arrival; the third crossed and then got dropped. But all three end the same way: a record that exists on one side and not the other. Find that set difference and you have found every one of them, no matter how it went missing. That is what makes one detection method cover all three.',
      },
      { t: 'h2', text: 'Stop trusting the green check — reconcile on counts' },
      {
        t: 'p',
        text: 'Before you hunt individual records, answer one cheaper question: did the totals even cross? Two control totals catch most drops in seconds. A record count — how many orders, transactions, or lines should exist for the window — against how many landed. And a sum of one meaningful numeric field (order total, amount, quantity) on each side. If either disagrees, something dropped or duplicated. If both agree, you are very likely whole. This is an old, boring control, and it is boring because it works.',
      },
      {
        t: 'code',
        text: 'Window completeness check (run per sync window)\n-----------------------------------------------\nsource_count  = rows in source for [start, end]       e.g. 1,000 orders\ndest_count    = rows in destination for [start, end]   e.g.   994 orders\nsource_sum    = SUM(amount) in source                  e.g. 48,210.00\ndest_sum      = SUM(amount) in destination             e.g. 47,930.40\n\nif source_count != dest_count  -> records dropped or duplicated\nif source_sum  != dest_sum     -> records dropped, duplicated, or altered\n\nHere: 6 orders and 279.60 are missing on the destination side.\nThe counts told you *that* in one query. The next step finds *which*.',
      },
      { t: 'h2', text: 'Find exactly which records dropped: the anti-join' },
      {
        t: 'p',
        text: 'Counts tell you something is missing; an anti-join tells you which IDs. List every record ID on the source side, list every ID on the destination side, and keep the source IDs that have no match on the destination. In a spreadsheet this is exactly the [XLOOKUP set-difference](/notes/reconcile-two-files-in-excel-with-xlookup) move; in SQL it is a LEFT JOIN where the destination ID is null. Either way the output is your dropped records, by key.',
      },
      {
        t: 'p',
        text: 'This only works if you match on a [stable primary ID](/notes/how-to-reconcile-two-systems-by-hand) that both systems carry unchanged — the source order ID, the gateway transaction ID — not a display number the destination reformats or a date that drifts by timezone. Match on the wrong field and the anti-join reports records as "missing" that are actually present under a mangled key, which is its own [CSV-and-formatting trap](/notes/csv-gotchas-encoding-delimiters). Get the key right first; the rest is mechanical.',
      },
      {
        t: 'ol',
        items: [
          'Export the source IDs for the window — from the system that physically owns the event (the storefront for orders, the gateway for payments).',
          'Export the destination IDs for the same window.',
          'Anti-join: keep every source ID with no match in the destination. That set is your dropped records.',
          'Reverse it once: destination IDs with no source match. Those are duplicates, test rows, or records imported under the wrong key — worth knowing too.',
          'Spot-check three of the "dropped" IDs by hand in the destination before backfilling, to confirm they are truly absent and not just mis-keyed.',
        ],
      },
      { t: 'h2', text: 'Backfill without creating duplicates' },
      {
        t: 'p',
        text: 'Now re-send the missing records — and this is where people turn a drop into a double. Re-pulling a window almost always re-sends records that already landed, so the backfill has to be idempotent: keyed on the source ID so a record that already exists is updated or skipped, never inserted twice. Both major payment platforms give you a clean way to pull the gap. Stripe lets you [list undelivered events](https://docs.stripe.com/webhooks/process-undelivered-events) (GET /v1/events with delivery_success=false; events are retained for 30 days) and dedupe on the stable evt_ id. Shopify’s reconciliation jobs [fetch everything updated since the last run](https://shopify.dev/docs/apps/build/webhooks/best-practices). Use the platform’s own ID as the dedupe key and a re-run is safe to repeat.',
      },
      {
        t: 'callout',
        kind: 'warning',
        text: 'The backfill is the single most dangerous step. Re-importing a date range without a dedupe key on the source ID is how a dropped-records cleanup becomes a duplicate-records cleanup next month. Confirm the destination upserts on the source ID before you re-send anything.',
      },
      { t: 'h2', text: 'Make it a standing check, not a Saturday fire drill' },
      {
        t: 'p',
        text: 'You found this batch because you happened to look. The point is to stop depending on happening to look. Run the count-and-control-total check on every sync window automatically, and treat any mismatch as an exception to investigate. Keep the webhooks, but stop trusting them alone: Shopify is explicit that a periodic full pull is the safety net under event delivery, not an optional extra. The trap is the pitch one [r/Accounting](https://reddit.com/r/Accounting/comments/1t3kczr/i_counted_the_apps_touching_my_quickbooks_last/) poster called out after counting seven apps wired into their books — ["the pitch for every single accounting adjacent tool is the same, seamless QuickBooks integration, automatic sync. Set it and forget it"](https://reddit.com/r/Accounting/comments/1t3kczr/i_counted_the_apps_touching_my_quickbooks_last/). Set it and forget it is exactly how records go missing for three weeks. Set it and reconcile it.',
      },
      {
        t: 'p',
        text: 'Plenty of tools will do the parsing for you — A2X and Synder for marketplace and gateway settlements, NetSuite connectors like Celigo at volume — and one Square user said the only stable pattern they found was to ["sync one Sales Receipt per day per location instead of individual orders"](https://reddit.com/r/QuickBooks/comments/1bc99p0/working_square_integration/) and let a clearing account absorb it. All reasonable. None of them remove the need for the completeness check, because every one of them is still a copy of someone else’s data, and copies drop rows. This is the same lesson as [reconciling Shopify orders against your ERP](/notes/reconcile-shopify-orders-against-your-erp) or [matching your OMS against the source of truth](/notes/reconcile-your-oms-against-the-source-of-truth): whatever moves your records, count them after. And it is the record-level cousin of [inventory drifting out of sync across channels](/notes/3pl-inventory-sync-oversells) — there the counts disagree; here the rows are gone entirely.',
      },
    ],
    faq: [
      {
        q: 'How can an integration drop records without showing an error?',
        a: 'Because it only reports on records it actually processed. A missed webhook or a skipped polling page means the record never entered your system, so there is nothing for the job to flag — you cannot error on a row you never received. The only way to see it is to compare counts between source and destination, not to read the sync log.',
      },
      {
        q: 'What is the fastest way to tell if records went missing?',
        a: 'Two control totals per sync window: the record count on each side, and the sum of one numeric field (order total or amount) on each side. If either differs, something dropped, duplicated, or changed. If both match, you are almost certainly complete. It is a one-query check you run before digging into individual records.',
      },
      {
        q: 'How do I find exactly which records dropped?',
        a: 'An anti-join on a stable ID. List the source IDs and the destination IDs for the same window, then keep the source IDs that have no match in the destination — that set is your dropped records. In a spreadsheet it is a COUNTIF or MATCH against the other column; in SQL it is a LEFT JOIN where the destination ID is null.',
      },
      {
        q: 'Will re-running the sync to recover missing records create duplicates?',
        a: 'It will, unless the backfill is idempotent. Re-pulling a date range re-sends records that already landed, so the destination must dedupe on the source system ID — updating or skipping anything it already has rather than inserting it again. Confirm that upsert behavior before re-sending a window.',
      },
      {
        q: 'Are webhooks or scheduled polling more reliable for not losing records?',
        a: 'Neither is reliable enough alone. Webhook delivery is not guaranteed — platforms like Shopify and Stripe say so directly and recommend a periodic reconciliation pull as the backstop. Polling misses rows to cursors, rate limits, and API outages. The durable pattern is webhooks for speed plus a scheduled full-pull reconciliation for completeness.',
      },
    ],
  },
  {
    slug: '3pl-inventory-sync-oversells',
    title: 'Why inventory oversells across Shopify, Amazon, and your 3PL: sync, source of truth, and the buffer that stops it',
    description:
      'Inventory oversells across Shopify, Amazon, and your 3PL not because the sync is broken but because a sync is a scheduled push, not a live guarantee — and your systems count different things. "My inventory doesn\'t match" is really three separate reconciliations: a physical count against the system (shrinkage), each channel against one source of truth (sync drift), and sellable quantity against the finance quantity (counting logic). This guide shows how to tell them apart, how to pick a source of truth, how to size a safety buffer that covers the sync lag so a fast sales window can\'t oversell you, and a step-by-step reconciliation for each — with a worked example that traces exactly where the units went.',
    keywords: [
      'inventory oversell',
      'inventory sync not matching',
      'shopify amazon inventory out of sync',
      '3pl inventory reconciliation',
      'why does inventory oversell',
      'single source of truth inventory',
      'inventory buffer to prevent overselling',
      'reconcile inventory across channels',
      'shopify quickbooks inventory mismatch',
    ],
    lead: 'You oversold. A drop went out, orders came in faster than your systems could talk to each other, and now you\'re emailing customers to say the thing they bought isn\'t actually in stock. The reflex is to blame the sync — but the sync mostly did its job. A sync is a scheduled push, not a promise, and underneath it three systems were quietly disagreeing about how many units you had the whole time. A seller in [r/FulfillmentByAmazon](https://reddit.com/r/FulfillmentByAmazon/comments/1t0soap/trying_to_diversify_off_amazon_is_basically_a/) described the daily version of it: ["Just spent three hours trying to reconcile missing units because the amazon api decided to randomly stop talking to my woocommerce site over the weekend. again."](https://reddit.com/r/FulfillmentByAmazon/comments/1t0soap/trying_to_diversify_off_amazon_is_basically_a/) Here is how to find where the counts drift, and how to set things up so the drift can\'t turn into an oversell.',
    blocks: [
      {
        t: 'p',
        text: 'The most useful answer to this whole problem is sitting in one buried comment on that thread: ["you need a single source of truth for inventory, not three systems arguing about who\'s right."](https://reddit.com/r/FulfillmentByAmazon/comments/1t0soap/trying_to_diversify_off_amazon_is_basically_a/) That is correct, and almost nobody connects it to an actual procedure. Everyone else either names one cause (returns, ghost entries) or plugs a tool. So that is what this is: the buried insight, turned into steps you can run tonight.',
      },
      { t: 'h2', text: 'Why "everything syncs" and the numbers still disagree' },
      {
        t: 'p',
        text: 'A sync is a scheduled poll, not a live mirror. Most channel-to-channel inventory connectors — and the Zapier-in-the-middle setups people bootstrap — check for changes on an interval and push the new number. Between polls, the systems are out of date by design. The sharpest comment on that FBA thread named the failure exactly: the ["zapier-in-the-middle setup breaks specifically during high volume because zapier polls on a schedule."](https://reddit.com/r/FulfillmentByAmazon/comments/1t0soap/trying_to_diversify_off_amazon_is_basically_a/) Zapier\'s polling interval runs from 1 to 15 minutes, depending on the Zapier plan. During a normal week you never notice. During a drop, orders land inside the poll window, two channels both sell the last unit, and you are oversold. A seller in a BFCM thread watched it hit a peer: ["Had a buddy who oversold by like 300 units last year cause his shopify and amazon werent talking properly."](https://reddit.com/r/smallbusiness/comments/1p0lv6f/whats_the_real_bottleneck_in_your_bfcm_prep_this/)',
      },
      {
        t: 'p',
        text: 'The second reason is quieter: the systems do not even count the same thing. Shopify splits stock into [on hand, committed, available, and unavailable](https://help.shopify.com/en/manual/products/inventory/fundamentals/inventory-states) — on hand is the sum of the other three, available is what is actually sellable, committed is placed-but-not-yet-fulfilled. Your ERP or accounting system, meanwhile, tracks a quantity for valuation, not for selling. So "available" in Shopify and "quantity on hand" in QuickBooks are answering different questions, and expecting them to be equal is the mistake. A merchant in [r/smallbusiness](https://reddit.com/r/smallbusiness/comments/1qtw544/why_doesnt_quickbooks_inventory_quantity_match/) hit exactly this wall — ["Even when orders are syncing correctly, inventory quantities still do not match between Shopify and QuickBooks."](https://reddit.com/r/smallbusiness/comments/1qtw544/why_doesnt_quickbooks_inventory_quantity_match/) A commenter got the diagnosis right: ["most mismatches I\'ve seen come from inventory logic not being mirrored, not just sync delays."](https://reddit.com/r/smallbusiness/comments/1qtw544/why_doesnt_quickbooks_inventory_quantity_match/)',
      },
      { t: 'h2', text: 'The three reconciliations hiding inside "my inventory doesn\'t match"' },
      {
        t: 'p',
        text: '"Inventory doesn\'t match" is three different problems wearing one complaint. You cannot fix it until you know which one you are staring at, because each has a different cause and a different place to look. Sort the gap into one of these first:',
      },
      {
        t: 'table',
        head: ['Reconciliation', 'What you compare', 'What a gap means', 'Where to look'],
        rows: [
          ['Physical ↔ system', 'A real count of what is on the shelf vs the system on-hand', 'Shrinkage, damage, theft, receiving errors, miscounts', 'The warehouse / 3PL floor and your receiving log'],
          ['Source of truth ↔ channel', 'Your master available vs what each storefront shows', 'Sync drift or latency — the push has not landed yet', 'The connector / sync logs and their timestamps'],
          ['Ops qty ↔ finance qty', 'Sellable units (OMS/Shopify) vs valuation qty (ERP/QuickBooks)', 'Different counting logic — returns, bundles, transfers, ghost entries', 'The accounting inventory ledger, not the sync'],
        ],
      },
      {
        t: 'p',
        text: 'Most people try to reconcile harder against all three at once and get nowhere. And this is not a rounding-error problem you can will away: a peer-reviewed study of nearly 370,000 retail inventory records found [65% of them were inaccurate](https://www.hbs.edu/faculty/Pages/item.aspx?num=30461). A gap between the system and the shelf is the normal state of inventory, not the exception. So the goal is not a perfect match. It is knowing which of the three is drifting, and by how much.',
      },
      { t: 'h2', text: 'Pick one source of truth — and make the others bow to it' },
      {
        t: 'p',
        text: 'The fix the experienced sellers keep landing on is one line: ["you need a single source of truth for inventory, not three systems arguing about who\'s right."](https://reddit.com/r/FulfillmentByAmazon/comments/1t0soap/trying_to_diversify_off_amazon_is_basically_a/) Pick the system that physically knows what shipped — usually your OMS, your 3PL/WMS, or your ERP, not the storefront — and declare it the authority on available-to-sell. Every channel receives its count from that system; none of them argue back. This is the same move as [reconciling your OMS against the source of truth](/notes/reconcile-your-oms-against-the-source-of-truth), applied to units instead of orders. The storefront is a display. The warehouse is the truth. When they disagree, the warehouse wins and the channel gets corrected — never the other way.',
      },
      {
        t: 'callout',
        kind: 'note',
        text: 'A source of truth is not whichever system you happen to trust most. It is the one closest to the physical event — the scan when a unit ships, the receipt when stock arrives. Everything downstream of that is a copy, and copies drift. Choose the copy nearest the loading dock.',
      },
      { t: 'h2', text: 'Set a buffer that covers the sync gap' },
      {
        t: 'p',
        text: 'While any lag exists between your source of truth and a channel, a buffer is the only thing standing between a fast sales window and an oversell. This is plain [safety stock](https://en.wikipedia.org/wiki/Safety_stock), sized to the one risk you can actually measure: how many units can sell on a channel before the next sync corrects it. The math is boring and it works:',
      },
      {
        t: 'code',
        text: 'Buffer per SKU, per channel\n---------------------------\nsync_latency   = minutes between inventory pushes (worst case, peak load)\npeak_velocity  = max units/min that SKU sells on this channel during a drop\n\nbuffer = ceil(sync_latency * peak_velocity) + safety_margin\n\nExample — a hot SKU during a launch:\n   sync_latency  = 10 min      (connector polls every 10 min under load)\n   peak_velocity = 1.2 units/min\n   buffer        = ceil(10 * 1.2) = 12 units   (+ a few for safety)\n\nStop selling on the channel at 12 units on hand, not 0.\nThose last 12 units are the cushion the sync delay can burn\nthrough before the correction lands.',
      },
      {
        t: 'p',
        text: 'Set the buffer high on your fastest movers and during known spikes; drop it back when velocity is predictable, because every buffered unit is a unit you are choosing not to sell. The buffer is a patch over latency, not a replacement for the source of truth — it buys you the minutes the sync needs, and nothing more. Shrink the latency and you shrink the buffer.',
      },
      { t: 'h2', text: 'Reconcile on hand against the floor: the shrinkage check' },
      {
        t: 'p',
        text: 'This is reconciliation #1 — the one your sync can never fix, because the gap is physical. The method is a cycle count, run on a cadence against whatever actually holds your stock; the full procedure is in [inventory reconciliation with cycle counts](/notes/inventory-reconciliation-cycle-counts).',
      },
      {
        t: 'callout',
        kind: 'tip',
        text: 'For FBA, Amazon itemizes the events for you: the [Inventory Ledger report](https://sellercentral.amazon.com/help/hub/reference/external/G4FKT5KQWFFJ7LDN?locale=en-US) shows your starting balance, units received, customer orders and returns, adjustments, and reconciliation events for damaged or lost units. Pull it for the same window as your count, and file reimbursement claims for anything the warehouse lost.',
      },
      { t: 'h2', text: 'Reconcile each channel against the source of truth: the drift check' },
      {
        t: 'p',
        text: 'This is reconciliation #2 — pure data, no warehouse required, and the one you can automate. You are comparing your master available against what each channel is currently showing, SKU by SKU, to catch drift before it becomes an oversell. It is the same two-file discipline as [reconciling two systems by hand](/notes/how-to-reconcile-two-systems-by-hand), pointed at inventory:',
      },
      {
        t: 'ol',
        items: [
          'Export available-to-sell by SKU from your source of truth.',
          'Export the inventory each channel currently shows (Shopify "Available," Amazon "Available," and so on).',
          'Join on the SKU — the key the whole reconciliation hangs on. If your SKUs are not identical across channels, fix that first; nothing else works until they are.',
          'Clean the exports before you match. A SKU that Excel mangled into a number, or a stray encoding mark, will fake a mismatch — these are the [CSV gotchas that quietly break a reconciliation](/notes/csv-gotchas-encoding-delimiters).',
          'Diff the two columns. In a spreadsheet, [XLOOKUP finds the rows present in one file and missing from the other](/notes/reconcile-two-files-in-excel-with-xlookup); a simple subtraction column finds the SKUs that exist in both but disagree.',
          'For every SKU that is off, check the sync timestamp. A gap with a recent successful sync is real drift to investigate; a gap with a stale or failed sync is just a push that did not land — re-run it.',
        ],
      },
      { t: 'h2', text: 'A worked example: where the 12 units went' },
      {
        t: 'p',
        text: 'One SKU, three systems, the end of a launch day. The storefront says one thing, the warehouse another, the books a third. Walk it the way you would walk it live:',
      },
      {
        t: 'table',
        head: ['System', 'Shows available', 'Why'],
        rows: [
          ['3PL / source of truth', '88', 'The real count: 100 received − 12 shipped (2 on their own, 10 inside a bundle)'],
          ['Shopify (channel)', '94', 'Sync is two polls behind; 6 of the 12 shipments have not decremented yet'],
          ['QuickBooks (finance)', '100', 'Only the 2 standalone sales were relieved (100 − 2 = 98); the 10 units shipped inside the bundle never relieved this component; and 2 customer returns were re-added before they were back on the shelf (98 + 2 = 100)'],
        ],
      },
      {
        t: 'p',
        text: 'Three different numbers, three different stories, and not one of them "broken." Shopify is drift — reconciliation #2: re-sync now, raise the buffer next launch. QuickBooks is counting logic — reconciliation #3: its 12-unit gap to the true 88 is 2 returns re-added plus 10 bundle units never relieved, an accounting fix for the returns and the bundle relief, the same family of gap covered in [where NetSuite inventory and the GL disagree](/notes/netsuite-reconciliation-inventory-and-gl), not a sync problem at all. The 3PL is right, which is the entire point of making it the source of truth. And notice the oversell risk lived only in Shopify\'s six un-decremented units — a buffer of 12 would have absorbed it without a single apology email.',
      },
      { t: 'h2', text: 'When do you actually need software for this?' },
      {
        t: 'p',
        text: 'Two files and a spreadsheet reconcile inventory across two or three channels fine — the by-hand method scales further than people expect. You start needing real tooling when the channel count climbs, when the sync interval has to shrink toward real-time, or when a launch\'s velocity outruns any buffer you would be willing to hold. Multi-channel inventory tools — SkuVault, Veeqo, Cin7 and the like — exist to be that single source of truth and to push faster than a polling middleware can. They earn their keep when manual re-syncs and held buffer cost you more than the subscription. What they do not do is the physical reconciliation: no tool knows a unit was damaged in the warehouse until someone counts it.',
      },
      {
        t: 'p',
        text: 'Whatever you use to move the numbers, the job underneath is the same — one source of truth, a buffer sized to the lag, and a regular check that the channels and the floor still agree. That is the reconciliation. The tool is just how fast you get to run it.',
      },
    ],
    faq: [
      {
        q: 'Why does my inventory oversell even though my systems are synced?',
        a: 'Because a sync is a scheduled push, not a live guarantee. Most connectors poll for changes on an interval — Zapier, for example, polls every 1 to 15 minutes, depending on the Zapier plan. During a fast sales window, two channels can both sell the last unit inside that interval before the decrement reaches the other one. The sync is not broken; it is just behind. A safety buffer sized to cover the poll interval is what prevents the oversell while the lag exists.',
      },
      {
        q: 'What should be my source of truth for inventory?',
        a: 'The system closest to the physical event — usually your OMS, your 3PL or warehouse system, or your ERP, not your storefront. It is the one that knows what actually shipped and what actually arrived. Every sales channel should receive its available count from that system and never overwrite it. When two systems disagree, the one nearest the warehouse wins.',
      },
      {
        q: 'Why doesn\'t my Shopify inventory match QuickBooks even when orders sync correctly?',
        a: 'Because they count different things. Shopify tracks sellable units and splits them into on hand, committed, available, and unavailable. QuickBooks tracks a quantity for valuation, which moves on returns, refunds, bundles, location transfers, and the occasional ghost entry. Those are different logics, so the two numbers were never meant to be identical. Reconcile them as an accounting question, not a sync problem.',
      },
      {
        q: 'How do I calculate an inventory buffer to prevent oversells?',
        a: 'Multiply your worst-case sync latency in minutes by the SKU\'s peak sales velocity in units per minute during a spike, round up, and add a small safety margin. That is the number of units that could sell before the next sync corrects the channel. Stop selling that SKU on the channel when on-hand hits the buffer rather than zero. Raise it for fast movers and known spikes; lower it when demand is predictable.',
      },
      {
        q: 'Do I need inventory software, or can I reconcile by hand?',
        a: 'A spreadsheet handles two or three channels: export available-to-sell from your source of truth and from each channel, join on SKU, and diff. You start needing dedicated multi-channel software when channels multiply, when you need the sync closer to real-time than a polling tool allows, or when launch velocity outruns any buffer you would hold. Software keeps the systems agreeing faster; it still cannot count the warehouse floor for you.',
      },
    ],
  },
  {
    slug: 'marketplace-payout-reconciliation',
    title: 'Marketplace payout reconciliation: the clearing account that makes every platform tie out',
    description:
      'Marketplace and gateway deposits never match the sales in your books, and they were never meant to — the platform bundles many orders into one payout, nets out fees, refunds, chargebacks, and reserves, then pays days later. Trying to match a deposit to your sales is the wrong fight. Give each marketplace its own clearing account, post the settlement report into it, and reconcile the account balance instead of the deposit: the balance should equal money the platform still owes you (in-transit payouts plus reserves), and anything left over is your exception list. This guide covers the journal entries, a step-by-step reconciliation, a worked settlement example, the exceptions to chase, and where the method tops out.',
    keywords: [
      'marketplace payout reconciliation',
      'payment gateway deposits don\'t match quickbooks',
      'reconcile marketplace deposits to gl',
      'clearing account for marketplace payouts',
      'amazon stripe paypal clearing account',
      'settlement report reconciliation',
      'gross vs net deposit reconciliation',
      'reconcile gateway payouts to bank',
    ],
    lead: 'Here is the move that ends the fight: stop trying to make a marketplace deposit equal your sales. It never will, and it was never supposed to. A bookkeeper in [r/Bookkeeping](https://reddit.com/r/Bookkeeping/comments/1s8h7ry/is_anyone_else_dealing_with_payment_gateway/) named the symptom exactly — ["the bank deposit from Stripe/Shopify/PayPal is lower than the sales showing in QuickBooks, and then I have to dig through fees, refunds, chargebacks, and timing differences to figure out what happened."](https://reddit.com/r/Bookkeeping/comments/1s8h7ry/is_anyone_else_dealing_with_payment_gateway/) The dig is the problem. Give each marketplace its own clearing account, post the settlement report into it, and the account does the digging for you. What is left over in the balance is the only thing you ever have to explain — and most months it explains itself.',
    blocks: [
      {
        t: 'p',
        text: 'Someone asked the exact right question in [r/Netsuite](https://reddit.com/r/Netsuite/comments/y9r10m/customer_payments_from_marketplaces/): ["For example, for Amazon, we receive a settlement report showing all the payments for a specific period for multiple invoices. Should we create a bank clearing account for Amazon where the customer payments will be posted?"](https://reddit.com/r/Netsuite/comments/y9r10m/customer_payments_from_marketplaces/) Yes. That is the answer. But the top reply just plugged a tool — ["I run thousands upon thousands of records monthly through Celigo reconciliation products. Probably saves us 80 hours a month in man hours."](https://reddit.com/r/Netsuite/comments/y9r10m/customer_payments_from_marketplaces/) Maybe it does. It still does not tell you how the clearing account works, or how to tell when it is lying to you. That is what is missing everywhere this gets asked, so that is what this is.',
      },
      { t: 'h2', text: 'Why marketplace deposits never match QuickBooks' },
      {
        t: 'p',
        text: 'The most useful reply in that gateway-deposits thread gave the diagnosis in one breath: ["the mismatch is usually because QBO records the gross sale amount but your bank gets the net deposit after processing fees. if you\'re recording both and trying to match them 1:1 they\'ll never line up."](https://reddit.com/r/Bookkeeping/comments/1s8h7ry/is_anyone_else_dealing_with_payment_gateway/) Correct, and it stops one step short. Knowing the deposit is net is not the same as having a way to prove a specific deposit is the right net. For that you need somewhere to land the difference.',
      },
      {
        t: 'p',
        text: 'Three structural facts make the gap permanent, and all three are normal. A payout is a batch, not a sale — the platform takes a window of transactions and wires you one number. The platform nets out its cut before paying: [processing fees, refunds, chargebacks, and dispute fees all come out of the payout](https://help.shopify.com/en/manual/payments/chargebacks), and [refunds you issue are deducted from the next available payout](https://help.shopify.com/en/manual/payments/shopify-payments/payouts/lower-or-missing-payouts), not the one the original sale was in. And the cash lands days late — [a Stripe payout settles a day or two after the charges it bundles](https://docs.stripe.com/reports/balance), Amazon settles roughly every two weeks. A bookkeeper pricing a WooCommerce client summed up the moving parts better than any vendor page: ["the painful part is the settlement mess: shopify / woocommerce reports, paypal, cards, zelle/cashapp, fees, refunds, holds, bank deposits, and clearing balances."](https://reddit.com/r/Bookkeeping/comments/1t0k52r/how_much_would_you_charge_for_monthly_bookkeeping/) Note the last two words. The people who have done this already think in clearing balances. We are just going to make it deliberate.',
      },
      { t: 'h2', text: 'The fix: one clearing account per marketplace' },
      {
        t: 'p',
        text: 'A [clearing account](https://en.wikipedia.org/wiki/Clearing_account) is a holding account on your books for money that is in motion — earned but not yet settled to cash. Give each platform its own: Amazon Clearing, Stripe Clearing, PayPal Clearing, Shopify Payments Clearing. You book gross sales as revenue and route the receivable through that platform\'s clearing account. Every deduction the settlement report lists — fees, refunds, chargebacks, reserves — also posts to that clearing account. When the payout lands, the deposit clears it. The deposit no longer has to match your sales; it only has to clear an account whose balance you can read.',
      },
      {
        t: 'p',
        text: 'This is not a clever trick — it is the method the platforms assume you are using. Stripe\'s own reconciliation docs describe the recommended setup as modeling ["their Stripe balance as a temporary clearing account in their accounting system,"](https://docs.stripe.com/reports/payout-reconciliation) then reconciling each payout against the batch of transactions in it. It is also the grown-up version of the [QuickBooks Undeposited Funds account](https://quickbooks.intuit.com/learn-support/en-us/help-article/bank-deposits/whats-undeposited-funds-account/L6Jan3iRK_US_en_US), which the top answer in one [r/Netsuite](https://reddit.com/r/Netsuite/comments/1llf6m4/can_someone_explain_undeposited_funds_vs/) thread explained plainly: ["you accept credit card and you close your batch for the day, you get 1 deposit entry into your bank account even though you had say 20 credit card customer payments."](https://reddit.com/r/Netsuite/comments/1llf6m4/can_someone_explain_undeposited_funds_vs/) Undeposited Funds batches one processor\'s payments; a named clearing account per platform does the same thing but keeps each platform\'s fees and reserves isolated, which is the only way the balance stays readable once you sell on more than one.',
      },
      {
        t: 'callout',
        kind: 'note',
        text: 'A clearing account holds known, in-transit amounts that clear on a schedule. That is different from a suspense account, which holds amounts you cannot yet classify. Marketplace payouts belong in a clearing account — you know exactly what they are; you are just waiting for the cash. Keep genuine mysteries (an unidentified deposit, a fee you cannot source) out of it, or the balance stops meaning anything.',
      },
      { t: 'h2', text: 'The journal entries, per platform per period' },
      {
        t: 'p',
        text: 'The whole method is three postings and one balance check. Booked at gross, deductions taken from the settlement report, cash clearing the rest:',
      },
      {
        t: 'code',
        text: 'Per marketplace, per settlement period\n--------------------------------------\n1) On sale (gross):\n   Dr  Marketplace Clearing        gross sales\n       Cr  Sales revenue                         gross sales\n\n2) From the settlement report (deductions):\n   Dr  Processing fees (expense)    fees\n   Dr  Refunds / contra-revenue     refunds\n   Dr  Chargebacks + dispute fees   adjustments\n       Cr  Marketplace Clearing                  fees + refunds + adjustments\n\n3) On payout (cash):\n   Dr  Bank                         net deposit\n       Cr  Marketplace Clearing                  net deposit\n\nClearing balance after the payout posts\n   = gross - (fees + refunds + adjustments) - net deposit\n\n   == 0   if the payout covered exactly this period with nothing held\n   != 0   should equal: in-transit payouts (settled, cash not yet arrived)\n                        + reserves / holds the platform is still sitting on\n          anything beyond that is your exception',
      },
      { t: 'h2', text: 'What the clearing balance should be (it is usually not zero)' },
      {
        t: 'p',
        text: 'This is the part the "record gross, deduct fees" advice never gets to. A clearing account that reads zero at month-end is not the goal, and chasing it to zero is how people waste an evening. The balance should equal the money the platform genuinely still owes you: payouts that have been earned but not yet wired (in transit), plus any reserve or hold the platform is sitting on. [Reserves and rolling holds are normal](https://help.shopify.com/en/manual/payments/shopify-payments/payouts/lower-or-missing-payouts) — that money is yours, it just has not moved yet. So you reconcile the balance, not the deposit: take the clearing balance, subtract what you can account for as in-transit and reserves, and whatever remains is the only thing worth your attention.',
      },
      { t: 'h2', text: 'Reconcile a marketplace payout, step by step' },
      {
        t: 'p',
        text: 'Same shape for every platform — only the report column names change. If a sync already posts these entries for you, the steps become a verification instead of data entry, which is exactly what you want to be doing.',
      },
      {
        t: 'ol',
        items: [
          'Pull two files: the settlement / payout report for the period (Stripe\'s [payout reconciliation report](https://docs.stripe.com/reports/payout-reconciliation), Amazon\'s flat-file settlement, your Shopify Payments payout export) and your bank transactions.',
          'Clean the exports first. A payout ID that Excel autoconverted to a number, a comma-as-decimal, or a stray encoding mark will silently break every match downstream — these are the [CSV gotchas that quietly wreck a reconciliation](/notes/csv-gotchas-encoding-delimiters). The payout ID is the [primary ID](/notes/how-to-reconcile-two-systems-by-hand) the whole reconciliation joins on; protect it.',
          'Foot each payout on the report itself: confirm gross − fees − refunds − adjustments equals the net the platform says it paid. If the platform\'s own report does not foot, stop — that is a data problem to escalate, not a books problem to force.',
          'Post the three entries to that platform\'s clearing account (gross to revenue, deductions from the report, net deposit from the bank) — or let your tool post them and spot-check one period by hand.',
          'Match each net payout on the report to a bank line, on amount and date, or on payout ID if the bank line carries one.',
          'Read the clearing balance. Subtract known in-transit payouts and reserves. The remainder is your exception list for the period — work only those rows. A clean close is a balance you can fully explain, not a balance of zero.',
          'Once a month, tie gross to recorded sales. Sum the gross charges across every payout in the month, add what is still in transit at the cutoff, and compare that to the gross sales your [storefront or ERP](/notes/reconcile-shopify-orders-against-your-erp) recorded for the same period. This is an accrual check: [revenue belongs to the period of the sale](https://en.wikipedia.org/wiki/Revenue_recognition), not the period the cash landed. Match the cash to the sale and you end up wrong in both months.',
        ],
      },
      { t: 'h2', text: 'A worked example: one settlement period' },
      {
        t: 'p',
        text: 'Say a marketplace settles a two-week window. The report breaks down like this, and the deposit that hit your bank was 4,310:',
      },
      {
        t: 'table',
        head: ['Settlement line', 'Amount', 'Posts to'],
        rows: [
          ['Gross product sales', '6,200', 'Dr Clearing / Cr Revenue'],
          ['Processing + platform fees', '(930)', 'Dr Fees / Cr Clearing'],
          ['Refunds settled this period', '(540)', 'Dr Refunds / Cr Clearing'],
          ['Chargeback + dispute fee', '(120)', 'Dr Chargebacks / Cr Clearing'],
          ['Reserve held by platform', '(300)', 'stays in Clearing (not paid yet)'],
          ['Net deposit to bank', '4,310', 'Dr Bank / Cr Clearing'],
        ],
      },
      {
        t: 'p',
        text: 'Gross 6,200, minus fees 930, refunds 540, chargebacks 120, and a 300 reserve the platform held back, leaves 4,310 — which matches the deposit. After all three entries post, the clearing account is not zero; it holds 300. That 300 is the reserve, and it is supposed to be there. You did not lose it and you do not chase it. When the reserve releases next period, that payout clears it and the balance returns to whatever the new in-transit amount is. The reconciliation is done the moment you can say, in one sentence, what the balance is.',
      },
      {
        t: 'callout',
        kind: 'tip',
        text: 'Reconcile at the payout level, not the order level. You do not match 4,000 orders to the bank — you match a handful of payouts, and let the orders roll up to their payout total inside the report. That is the difference between a 20-minute close and a lost Saturday.',
      },
      { t: 'h2', text: 'A per-payout sheet you can download' },
      {
        t: 'p',
        text: 'If you track payouts in a spreadsheet, start from [reconciliation-master-sheet.csv](/downloads/reconciliation-master-sheet.csv): one row per payout, with columns for payout ID, bank date, gross sales, refunds, processing fees, adjustments, expected net, bank deposit, difference, and notes, plus three example rows to delete. A CSV holds values, not formulas, so add the two computed columns yourself: Expected net = Gross − Refunds − Fees − Adjustments, and Difference = Bank deposit − Expected net. Filter Difference to everything that is not zero; that short list is the period\'s work. What a non-zero difference usually means:',
      },
      {
        t: 'table',
        head: ['What the difference looks like', 'Most likely cause', 'Where to fix it'],
        rows: [
          ['Deposit short by a round-ish amount', 'A chargeback or dispute fee deducted but not yet booked in your Adjustments column', 'Open the payout statement and find the deduction; add it to Adjustments'],
          ['Deposit short by a small percentage', 'Processing fees under-counted, or a fee tier you missed', 'Re-pull fees from the payout report; do not estimate them'],
          ['Expected net higher than the deposit, refund-sized', 'A refund settled in this payout from an earlier sale', 'Normal timing — record the refund in the payout it settled in, not the original'],
          ['Payout has no bank line at all', 'Timing — the deposit lands in the next period; or it is in transit', 'Carry it open and match it next run; do not force it'],
          ['Difference is tiny and never the same twice', 'Rounding or an FX conversion on a cross-currency payout', 'Expected on [multi-currency payouts](/notes/multi-currency-reconciliation); set a small tolerance, do not chase pennies'],
          ['Two payouts, same amount, one unexplained', 'A duplicate or a miskeyed payout ID', 'A [near-duplicate the ID hides](/notes/fuzzy-matching-records) — verify the IDs are distinct'],
        ],
      },
      { t: 'h2', text: 'When the clearing account will not tie' },
      {
        t: 'p',
        text: 'When the leftover balance is bigger than your known reserves and in-transit, it is almost always one of a short list. An Amazon seller in [r/FulfillmentByAmazon](https://reddit.com/r/FulfillmentByAmazon/comments/1mezcax/anyone_struggling_with_reconciling_amazon/) described the lived version — ["payments come in but when it\'s time to reconcile, things just don\'t line up. Delays, mismatched payouts, and manual back-and-forth every week."](https://reddit.com/r/FulfillmentByAmazon/comments/1mezcax/anyone_struggling_with_reconciling_amazon/) The usual culprits:',
      },
      {
        t: 'ul',
        items: [
          'The payout window straddles month-end — sales in one month, cash in the next. That is in-transit timing, not an error; it is the residual that should be there.',
          'A fee or refund was booked to the wrong account, so clearing never received the credit. The clearing balance is off by exactly that fee.',
          'A refund settled for a sale from a prior period that you booked net the first time, so the gross was never in clearing to net against.',
          'A sync double-posted the payout, or dropped one — common when an integration "runs" but silently skips records. See [catching the records an integration dropped](/notes/reconcile-your-integration-dropped-records) for the dropped-record pattern.',
          'FX: the sale, the fee, and the settlement converted at different rates, leaving a real-looking gap that is just revaluation. That is its own discipline — see [multi-currency reconciliation](/notes/multi-currency-reconciliation).',
        ],
      },
      { t: 'h2', text: 'What about A2X, Synder, Celigo?' },
      {
        t: 'p',
        text: 'They automate exactly this. A2X is the community default for posting Shopify and Amazon settlements to QuickBooks or Xero; Synder gets named when a native integration breaks; Celigo shows up for NetSuite at volume, which is what that r/Netsuite reply was praising. They all do the same job under the hood — parse the settlement report and post the clearing-account journal entries so you do not key them by hand. That is a fair trade and often worth it. The reason to understand the method anyway is simple: a tool that posts entries you cannot read is a tool you cannot audit. Know what the clearing balance should be, and you can check the tool instead of trusting it.',
      },
      { t: 'h2', text: 'Where this method tops out' },
      {
        t: 'p',
        text: 'One clearing account per platform is the right tool for a handful of platforms and a monthly or weekly close. It strains when you are running many marketplaces at once, when you need daily cash visibility rather than period-end truth, when reserves are multi-currency, or when an auditor wants the trail across thousands of individual payouts. At that point the per-platform balance is still correct, but reading it by hand stops scaling — the same way a spreadsheet does once the partial payments and bundled deposits pile up. The structure does not change when you outgrow doing it by hand; only who does the posting does. Get the clearing accounts right first, and every later tool — or model — has something correct to check itself against.',
      },
    ],
    faq: [
      {
        q: 'Should I record marketplace sales at gross or net?',
        a: 'Gross. Book the full sale as revenue and route it through the platform clearing account, then post fees, refunds, and chargebacks separately from the settlement report. Recording only the net deposit hides what you paid in fees and makes per-product margin analysis impossible, because you can no longer see what each sale actually cost you to collect.',
      },
      {
        q: 'Do I need a separate clearing account for each marketplace?',
        a: 'Yes, one per platform or processor. A single shared clearing account mixes Amazon reserves with Stripe fees with PayPal holds, and the balance becomes unreadable — you cannot tell which platform owes you what. A separate account per platform keeps each balance meaningful, which is the entire point of the method.',
      },
      {
        q: 'Why is my clearing account not zero at month-end?',
        a: 'It usually should not be. A clearing account holds money in motion, so at any close it should equal the payouts that have been earned but not yet wired to your bank, plus any reserve or hold the platform is still sitting on. Reconcile the balance to those known amounts rather than forcing it to zero — a balance you can explain in one sentence is a reconciled balance.',
      },
      {
        q: 'Is a clearing account the same as undeposited funds?',
        a: 'Same idea, different scale. Undeposited Funds is the built-in QuickBooks account for batching one processor\'s payments so they match a single bank deposit. A named clearing account per platform does the same batching but isolates each platform\'s fees, refunds, and reserves, which is what keeps the balance readable once you sell on more than one marketplace.',
      },
      {
        q: 'How is this different from just matching the deposit in my bank feed?',
        a: 'Bank-feed matching confirms that cash arrived and ties it to a category. It does not prove the cash equals what the platform actually owed you after fees, refunds, and reserves. The clearing account proves it: gross in, deductions out, deposit clears the rest, and the leftover balance is the exact amount still in transit or held. Bank matching tells you money showed up; the clearing account tells you the right amount showed up.',
      },
    ],
  },
  {
    slug: 'amazon-settlement-reconciliation',
    title: 'Amazon settlement reconciliation: matching disbursements to your ERP when the reserve hides the rest',
    description:
      'Your Amazon disbursement never matches your sales because it is a two-week batch paid net of referral fees, FBA fees, refunds, and ad spend, minus a reserve Amazon holds back — so matching the deposit to a sales total is a fight you cannot win. The settlement report is the source of truth: it lists every financial event in the period and foots to the disbursement by construction. Reconcile it with one Amazon clearing account — book gross sales through it, post every deduction from the report, let the disbursement clear most of the balance — and the leftover is the reserve. Then prove the reserve with a roll-forward: beginning reserve plus what was held this period minus what released equals the reserve at the top of the next settlement. This guide covers the report structure, the journal entries, the reserve roll-forward, a worked settlement example, the Amazon-specific exceptions, and where the method tops out.',
    keywords: [
      'amazon settlement reconciliation',
      'reconcile amazon disbursements to erp',
      'amazon settlement report reconciliation',
      'amazon account level reserve reconciliation',
      'why amazon payout doesn\'t match sales',
      'amazon clearing account quickbooks xero',
      'fba fees referral fees reconciliation',
      'amazon dd+7 reserve reconciliation',
    ],
    lead: 'Here is the part that changes everything: with Amazon, you are not reconciling sales against a deposit. You are reconciling a settlement report against itself. A seller in [r/FulfillmentByAmazon](https://reddit.com/r/FulfillmentByAmazon/comments/1mezcax/anyone_struggling_with_reconciling_amazon/) described the usual mess — ["Orders get shipped, payments come in but when it\'s time to reconcile, things just don\'t line up. Delays, mismatched payouts, and manual back-and-forth every week."](https://reddit.com/r/FulfillmentByAmazon/comments/1mezcax/anyone_struggling_with_reconciling_amazon/) The thread\'s top answer was a link to a Discord server. So here is the actual method. Amazon\'s deposit is short and late on purpose — it nets out referral and FBA fees, holds back a reserve, and pays on a two-week clock. The settlement report already foots to that deposit. Your job is to prove the part it keeps — the reserve — and show it carries into the next report. Do that, and the chaos becomes one number you can name.',
    blocks: [
      { t: 'h2', text: 'Why your Amazon disbursement never matches your sales' },
      {
        t: 'p',
        text: 'Three structural facts make the gap permanent, and all three are normal. A disbursement is a batch over a settlement period, not a single sale — Amazon takes a window of activity and wires you one number. Amazon subtracts its cut first: [referral fees, FBA fulfillment and storage fees, and refunds](https://sellercentral.amazon.com/help/hub/reference/external/G200989190) all come out before the money moves, and so does advertising spend when your ads are billed against your proceeds rather than to a card. And it holds back a reserve. A bookkeeper running four marketplaces in [r/Accounting](https://reddit.com/r/Accounting/comments/1ry3frk/anyone_else_doing_ecom_accounting_for_a_client_on/) summed up the feeling exactly — ["Amazon holds reserves and releases them on some schedule only Amazon understands."](https://reddit.com/r/Accounting/comments/1ry3frk/anyone_else_doing_ecom_accounting_for_a_client_on/) It is less mysterious than that, but the instinct is right: a chunk of your money is parked, on purpose.',
      },
      {
        t: 'p',
        text: 'The reserve comes in two layers, and it helps to name them. First is the standard delivery-date reserve: Amazon now holds an order\'s funds until seven days after delivery — DD+7. Amazon\'s own migration notice, quoted in [r/FulfillmentByAmazon](https://reddit.com/r/FulfillmentByAmazon/comments/1ntxhno/migration_to_dd7_on_march_12_2026/), spelled out why: ["Moving your reserve setting to DD+7 provides time for you to accrue fees and other costs before disbursement."](https://reddit.com/r/FulfillmentByAmazon/comments/1ntxhno/migration_to_dd7_on_march_12_2026/) A seller on that thread put the cash-flow cost plainly — ["this will add 8 to 14 days to cash flow planning."](https://reddit.com/r/FulfillmentByAmazon/comments/1ntxhno/migration_to_dd7_on_march_12_2026/) Second is the account-level reserve, a dynamic hold for estimated returns and claims that can, in a bad month, swallow the whole payout. A seller in [r/FulfillmentByAmazon](https://reddit.com/r/FulfillmentByAmazon/comments/149er0c/account_level_reserve/) watched it happen: ["Amazon is now saying my entire balance is for the account level reserve and no payment is being made."](https://reddit.com/r/FulfillmentByAmazon/comments/149er0c/account_level_reserve/) Neither reserve means money is lost. Both mean the deposit is always smaller than the period\'s sales — so reconciling one against the other directly is a fight you cannot win.',
      },
      { t: 'h2', text: 'The settlement report is the source of truth — read it that way' },
      {
        t: 'p',
        text: 'Before any matching, internalize one fact a seller stated in an Amazon-to-Xero thread in [r/AmazonSeller](https://reddit.com/r/AmazonSeller/comments/166hli3/headaches_importing_syncing_amazon_sales_into/): ["On the Amazon side your books are/should be based on your Amazon settlement reports. These are final and do not change."](https://reddit.com/r/AmazonSeller/comments/166hli3/headaches_importing_syncing_amazon_sales_into/) That is the whole game. The [settlement / Payment Date Range report](https://sellercentral.amazon.com/help/hub/reference/external/G200989190) in Seller Central is the ledger — not your order export. It lists every financial event in the period: orders, refunds, referral fees, FBA fees, storage, ad charges, reserve movements, and the disbursement, and it foots to the net Amazon paid. Reconcile against your order count or your gross sales and you will never tie. Reconcile against the settlement report and it ties by construction — because Amazon built it to.',
      },
      {
        t: 'callout',
        kind: 'note',
        text: 'The settlement report comes two ways: a summary (account-level totals — sales, fees, refunds, reserve movement, disbursement) and a transaction detail (every order-level line). Reconcile the summary to your books and to the bank. Keep the detail to explain a single exception when one shows up. Do not try to post thousands of order lines — post the summary totals, and let the detail answer questions only when they are asked.',
      },
      { t: 'h2', text: 'The fix: one Amazon clearing account, settlement by settlement' },
      {
        t: 'p',
        text: 'The method is the same [clearing-account model that makes every marketplace tie out](/notes/marketplace-payout-reconciliation), applied to Amazon\'s specific line items. A [clearing account](https://en.wikipedia.org/wiki/Clearing_account) is a holding account for money that is earned but not yet settled to cash. Open one — Amazon Clearing — and route everything through it. Book gross sales as revenue through the account. Post every deduction the settlement report lists — referral fees, FBA fees, refunds, ad spend, chargebacks — to that account. When the disbursement lands, it clears most of the balance. What is left is the reserve, and it is supposed to be there. (For the gateway version of the same gross-versus-net gap, see [marketplace payout reconciliation](/notes/marketplace-payout-reconciliation).)',
      },
      {
        t: 'code',
        text: 'Per settlement period, into Amazon Clearing\n-------------------------------------------\n1) Sales (gross):\n   Dr  Amazon Clearing             gross sales\n       Cr  Sales revenue                        gross sales\n\n2) Deductions from the settlement report:\n   Dr  Referral fees (expense)     referral fees\n   Dr  FBA fees (expense)          fulfillment + storage\n   Dr  Refunds / contra-revenue    refunds\n   Dr  Advertising (expense)       sponsored ads spend (only if ads are billed against proceeds)\n       Cr  Amazon Clearing                      fees + refunds + ads\n\n3) Disbursement (cash):\n   Dr  Bank                        net disbursement\n       Cr  Amazon Clearing                      net disbursement\n\nAmazon Clearing balance after posting\n   = gross - (referral + FBA + refunds + ads) - net disbursement\n   = the amount Amazon held back\n\n   should equal:  delivery-date (DD+7) reserve\n                + account-level reserve\n                + any settled disbursement still in transit\n   anything beyond that is your exception',
      },
      { t: 'h2', text: 'The reserve is not a mystery — prove it with a roll-forward' },
      {
        t: 'p',
        text: 'This is the part every thread skips. An accountant in [r/AmazonSeller](https://reddit.com/r/AmazonSeller/comments/1ebzn0v/reconcile_account_level_reserve/) asked the exact right question and got no real answer: ["I am an accountant in a small company so I need details not high level overview. How do I reconcile the Account Level Reserve?"](https://reddit.com/r/AmazonSeller/comments/1ebzn0v/reconcile_account_level_reserve/) Here it is. Amazon\'s settlements are continuous — each report opens with the prior period\'s ending reserve and closes with a new one. So you do not hunt for the reserve; you roll it forward. Beginning reserve, plus what was newly held this period, minus what was released, equals the ending reserve — and that ending number must equal the reserve shown at the top of the next settlement. If it ties, the reserve is proven, not guessed.',
      },
      {
        t: 'code',
        text: 'Account-level + DD+7 reserve roll-forward\n-----------------------------------------\n  Beginning reserve        (top of THIS settlement report)\n+ Amounts newly reserved   (orders delivered < 7 days ago; account-level holds)\n- Amounts released         (prior reserves now disbursed)\n= Ending reserve           (must equal the reserve line at the TOP of the NEXT report)\n\n  Ending reserve == next report\'s beginning reserve  -> reserve proven\n  Ending reserve != next report\'s beginning reserve  -> that gap is your exception',
      },
      {
        t: 'p',
        text: 'The cadence is what makes a sale and its cash land in different reports. A seller in that same thread confirmed the rhythm — ["The automated disbursement is indeed every 14 days"](https://reddit.com/r/AmazonSeller/comments/1ebzn0v/reconcile_account_level_reserve/) — and Amazon\'s payment terms, as another seller quoted them, explain the seven-day piece: ["Professional Sellers are paid every two weeks for orders delivered at least 7 days from the latest estimated delivery date."](https://reddit.com/r/AmazonSeller/comments/1ebzn0v/reconcile_account_level_reserve/) Tie periods to periods, not sales to days, and the timing stops looking like an error.',
      },
      { t: 'h2', text: 'Reconcile an Amazon settlement, step by step' },
      {
        t: 'p',
        text: 'Same shape every period — only the report\'s date range changes. If a sync already posts these entries for you, the steps become a verification instead of data entry, which is exactly what you want to be doing.',
      },
      {
        t: 'ol',
        items: [
          'Pull two files: the settlement report for the period (the summary and, if you want the detail on hand, the transaction view) from Seller Central, and your bank transactions.',
          'Clean the exports first. A settlement ID or order ID that Excel autoconverted to a number, or a stray encoding mark in a product title, will silently break every match downstream — these are the [CSV gotchas that quietly wreck a reconciliation](/notes/csv-gotchas-encoding-delimiters). The settlement ID and order ID are the [primary IDs](/notes/how-to-reconcile-two-systems-by-hand) the whole reconciliation joins on; protect them.',
          'Foot the settlement report against itself: confirm beginning balance + sales − referral fees − FBA fees − refunds − ad spend ± reserve movement equals the disbursement Amazon says it paid. If Amazon\'s own report does not foot, stop — that is a data-pull problem to fix, not a books problem to force.',
          'Post the summary to Amazon Clearing: gross to revenue, each deduction to its own expense or contra account, the disbursement from the bank — or let your tool post them and spot-check one period by hand.',
          'Match the disbursement to a bank line on amount and date, or on settlement ID if the bank memo carries one.',
          'Roll the reserve forward and confirm the ending reserve equals the next report\'s opening reserve. Then read the clearing balance: it should equal the reserve plus any settled disbursement still in transit. The remainder is your exception list — work only those rows.',
        ],
      },
      { t: 'h2', text: 'A worked example: one settlement period' },
      {
        t: 'p',
        text: 'Say a two-week settlement. The summary breaks down like this, and the disbursement that hit your bank was 6,540:',
      },
      {
        t: 'table',
        head: ['Settlement line', 'Amount', 'Posts to'],
        rows: [
          ['Gross product sales', '12,000', 'Dr Clearing / Cr Revenue'],
          ['Referral fees', '(1,800)', 'Dr Referral fees / Cr Clearing'],
          ['FBA fulfillment + storage fees', '(1,400)', 'Dr FBA fees / Cr Clearing'],
          ['Refunds settled this period', '(700)', 'Dr Refunds / Cr Clearing'],
          ['Sponsored Products ad spend', '(560)', 'Dr Advertising / Cr Clearing'],
          ['Reserve held (DD+7 + account level)', '(1,000)', 'stays in Clearing (not paid yet)'],
          ['Net disbursement to bank', '6,540', 'Dr Bank / Cr Clearing'],
        ],
      },
      {
        t: 'p',
        text: 'Gross 12,000, minus referral fees 1,800, FBA fees 1,400, refunds 700, and ad spend 560, leaves 7,540 earned. Amazon held 1,000 of that in reserve, so 6,540 hit the bank — which matches the deposit. After all three entries post, Amazon Clearing is not zero; it holds 1,000. That 1,000 is the reserve, and it is supposed to be there. You did not lose it and you do not chase it. When the reserve releases next period, that disbursement clears it, and the balance returns to whatever the new reserve is. The reconciliation is done the moment you can say, in one sentence, what the balance is: it is the reserve.',
      },
      { t: 'h2', text: 'When the settlement will not tie' },
      {
        t: 'p',
        text: 'When the leftover balance is bigger than your known reserve and in-transit, it is almost always one of a short list. A new seller in [r/FulfillmentByAmazon](https://reddit.com/r/FulfillmentByAmazon/comments/1l1btd6/new_amazon_seller_and_hence_seeking_inputs_on/) hit the classic version — ["the Disbursement Report and the Repository Report (which tracks unit-wise sales and realization) aren\'t lining up."](https://reddit.com/r/FulfillmentByAmazon/comments/1l1btd6/new_amazon_seller_and_hence_seeking_inputs_on/) The usual culprits:',
      },
      {
        t: 'ul',
        items: [
          'Deferred versus settled timing: an order is delivered but still inside its DD+7 window, so it is in the period\'s sales but not yet in the disbursement. That is in-transit, not an error — it belongs in the reserve and rolls forward.',
          'The report straddles month-end — earned in one month, paid in the next. Real timing residual; it lives in the in-transit bucket, not in an exception you chase.',
          'A fee or ad charge posted to the wrong account, so clearing never received the credit. The balance is off by exactly that amount.',
          'Multiple marketplaces (US, CA, MX, or the EU) settling in different currencies and converting at different rates — a real-looking gap that is just revaluation. That is its own discipline; see [multi-currency reconciliation](/notes/multi-currency-reconciliation).',
          'A sync double-posted a settlement or dropped one — common when an integration "runs" but silently skips records. The dropped-record pattern is the same one in [catching the records an integration dropped](/notes/reconcile-your-integration-dropped-records).',
          'Two settlements with the same total, one unexplained — verify the IDs are distinct, because a [near-duplicate the ID hides](/notes/fuzzy-matching-records) reads as a phantom exception.',
        ],
      },
      { t: 'h2', text: 'What about A2X, Link My Books, Synder?' },
      {
        t: 'p',
        text: 'They automate exactly this — parse the settlement report and post the clearing-account entries so you do not key them by hand. A2X is the community default for posting Amazon settlements to QuickBooks or Xero; the others show up for specific stacks. It is a fair trade and often worth it. The reason to understand the method anyway is the one that seller named: your books are based on the settlement report, and those reports "are final and do not change," so a tool that posts entries you cannot read is a tool you cannot audit. Know what the reserve roll-forward should produce and you can check the tool instead of trusting it. The same logic carries to the ERP side, where the settlement totals have to agree with [inventory, the GL, and the AR subledger in NetSuite](/notes/netsuite-reconciliation-inventory-and-gl).',
      },
      { t: 'h2', text: 'Where this method tops out' },
      {
        t: 'p',
        text: 'One clearing account and a settlement-by-settlement roll-forward is the right tool for a seller on one or two marketplaces closing monthly or per settlement. It strains when you run many marketplaces and currencies at once, when you need daily cash visibility instead of period-end truth, or when an auditor wants the trail across thousands of order-level lines under each disbursement. The structure stays correct; reading it by hand stops scaling — the same way a spreadsheet does once partial payments and bundled deposits pile up. A workbook saves the answer but not the reasoning, and a [per-payout sheet](/notes/marketplace-payout-reconciliation) only stretches so far across formats. Get the clearing account and the reserve roll-forward right first, and every later tool — or model — has something correct to check itself against.',
      },
    ],
    faq: [
      {
        q: 'Why doesn\'t my Amazon disbursement match my sales?',
        a: 'Because the disbursement is a batch over a settlement period, not a single sale. Amazon bundles the period\'s activity, subtracts referral fees, FBA fulfillment and storage fees, refunds, and (when ads are billed against proceeds) advertising spend, then holds back a reserve, and pays the net on a roughly two-week cycle. So the deposit is smaller than the sales it represents and arrives later. You reconcile the settlement report — which foots to the disbursement by construction — rather than trying to make a deposit equal a sales total.',
      },
      {
        q: 'What is the Amazon account-level reserve and how do I reconcile it?',
        a: 'It is a dynamic hold Amazon keeps to cover estimated returns and claims, on top of the standard delivery-date (DD+7) reserve. You reconcile it with a roll-forward: beginning reserve, plus amounts newly held this period, minus amounts released, equals the ending reserve — and that ending number must equal the reserve shown at the top of the next settlement report. If it ties, the reserve is proven rather than assumed. Settlements are continuous, so each report\'s opening reserve is the prior report\'s closing reserve.',
      },
      {
        q: 'Should I reconcile every Amazon order or just the settlement?',
        a: 'The settlement. A period may contain thousands of orders but only one disbursement and one summary. The orders only need to roll up to the summary totals; the summary is what you tie to your books and the bank deposit. Keep the order-level transaction detail to explain a specific exception when one appears, not as the thing you reconcile line by line.',
      },
      {
        q: 'What is DD+7 and why did my payouts slow down?',
        a: 'DD+7, the delivery-date-based reserve, means Amazon releases an order\'s funds seven days after confirmed delivery rather than at shipment or order. Combined with the standard two-week disbursement cycle, the cash for a sale can sit roughly two weeks behind the sale itself. It is a timing change, not a loss — the funds appear as deferred or reserved and release on schedule, which is why a reserve roll-forward, not panic, is the right response.',
      },
      {
        q: 'Do I need a separate clearing account just for Amazon?',
        a: 'Yes. A shared clearing account mixes Amazon\'s reserve and FBA fees with other processors\' holds, and the balance stops meaning anything. A dedicated Amazon Clearing account keeps the reserve readable, which is the entire point: after the disbursement posts, the balance should equal the reserve plus any settled disbursement still in transit, and nothing else. A balance you can explain in one sentence is a reconciled balance.',
      },
    ],
  },
  {
    slug: 'multi-currency-reconciliation',
    title: 'Multi-currency reconciliation: how to tell an FX difference from a real one',
    description:
      'A multi-currency "mismatch" is usually three legitimate things stacked together: the exchange rate moved between invoice and payment, intermediary banks took a cut in transit, and the settlement date landed in a different period than the charge. Reconcile in your base currency and you can never tell which is which. The fix is to match in the original transaction currency first, where the amounts should tie to the cent, then let the converted difference fall out as a foreign-exchange gain or loss instead of hunting for a missing transaction. Here is the method, step by step.',
    keywords: [
      'multi-currency reconciliation',
      'foreign currency reconciliation',
      'fx gain loss reconciliation',
      'international payment reconciliation',
      'reconcile payments in multiple currencies',
      'wire transfer reconciliation fees',
      'settlement date fx mismatch',
      'currency conversion reconciliation',
    ],
    lead: 'You owed a supplier `EUR 10,000`. Your bank shows `USD 10,877` left the account, the supplier says only `EUR 9,975` arrived, and your accounting system — set to [reconcile](/notes/how-to-reconcile-two-systems-by-hand) in dollars — flags the invoice as unmatched. Now you are staring at a difference you cannot explain. Most of it is not broken at all. A multi-currency difference is almost never one number; it is three legitimate things stacked on top of each other — the exchange rate moved between the invoice and the payment, intermediary banks took a cut in transit, and the settlement date landed in a different period than the charge. Reconcile in your base currency and you can never tell which is which. The fix is almost boringly simple: match in the original transaction currency first, where the amounts should tie to the cent, then treat the converted difference as a [foreign-exchange gain or loss](https://corporatefinanceinstitute.com/resources/accounting/foreign-exchange-gain-loss/), not a missing transaction. Here is the whole method.',
    blocks: [
      { t: 'h2', text: 'Why a base-currency report makes everything look broken' },
      {
        t: 'p',
        text: 'The reconciliations that error out are the easy ones. The expensive ones balance to a number you cannot account for. In a single currency, a difference is a difference — a [missing row](/notes/reconcile-two-files-in-excel-with-xlookup), a short payment, a duplicate. Across currencies, the same gap can be three unrelated, perfectly legitimate things at once, and your base-currency view collapses all three into one unexplained figure. An operator on [r/Accounting](https://reddit.com/r/Accounting/comments/1simaqd/every_international_wire_we_send_creates_hours_of/) described exactly how an international wire does this:',
      },
      {
        t: 'quote',
        text: 'Payment initiates, something in the correspondent chain takes a cut we didn\'t anticipate, the amount that lands is different from what we sent, the settlement date doesn\'t match the initiation date',
      },
      {
        t: 'p',
        text: 'The thread\'s answers were "Sounds like shitty processes" and a suggestion to find a provider with flat, upfront fees — fair advice for next time, useless for the wire you already sent. The reason it "breaks our reconciliation the same way every time," in the poster\'s words, is that the dollar figure on your statement is the end of a chain of independent changes. Pull them apart and each one has an obvious home — and none of them is the "unmatched transaction" your tool thinks it found.',
      },
      { t: 'h2', text: 'The three things hiding inside one mismatch' },
      {
        t: 'p',
        text: 'Before you treat a multi-currency difference as a discrepancy, separate it into its parts. Almost every "the numbers don\'t match" in foreign currency is some mix of these three, and only one of them is ever an actual error to chase.',
      },
      {
        t: 'table',
        head: ['What changed', 'What you see', 'Why it is legitimate, not an error', 'Where it belongs'],
        rows: [
          ['Exchange rate moved', 'the invoice was `EUR 10,000`; the value booked at invoice date and the value at payment date differ in your base currency', 'The rate on the invoice date is not the rate on the payment date — that movement is a real realized [FX gain or loss](https://corporatefinanceinstitute.com/resources/accounting/foreign-exchange-gain-loss/), not money gone missing', 'A realized FX gain/loss account — an output of the reconciliation, not a row to hunt'],
          ['Fees deducted in transit', 'the amount sent is larger than the amount received', 'Correspondent banks in the chain each take a cut, and the bank\'s [exchange-rate spread](https://en.wikipedia.org/wiki/Bid%E2%80%93ask_spread) is baked into the rate you got — both are real costs, charged by design', 'Bank fees / FX expense, grossed up as its own line — the same trap as [why a payout never matches sales](/notes/marketplace-payout-reconciliation)'],
          ['Settlement date lag', 'the charge sits in one period; the cash lands in the next', 'The transaction and its settlement revalue at different rates and can fall on opposite sides of month-end', 'A per-currency clearing account that holds the in-transit amount until it settles'],
        ],
      },
      { t: 'h2', text: 'Reconcile in the original currency first' },
      {
        t: 'p',
        text: 'Here is the rule that makes the other three legible: never reconcile in your base currency until you have reconciled in the currency the transaction actually happened in. In the source currency, the invoice, the payment, and the receipt should agree to the cent — there is no rate in the way to blur them. So a difference there is a real one, and a difference that only appears after conversion is FX, not a missing transaction. That single ordering decision is what lets you tell the two apart.',
      },
      {
        t: 'ol',
        items: [
          'Match in the transaction currency. Line up the invoice, the payment, and the receipt in their original currency — `EUR` to `EUR`, `GBP` to `GBP`. The amounts should tie exactly. If they do not, that is a genuine discrepancy — a partial payment, a short-pay, a duplicate — and you investigate it the ordinary way.',
          'Gross up the fees as their own line. Book the full invoice amount, then post the wire charge, the intermediary deduction, and the FX spread as separate bank-fee and FX-expense lines. Never net them into the invoice — netting is what makes the invoice look "wrong".',
          'Convert each side at its own correct rate. Book the invoice at the rate on the invoice date and the settlement at the rate on the settlement date, using one canonical rate source and cadence (see below).',
          'Let the base-currency difference fall out as FX. After steps 1 to 3, the leftover gap in your base currency is the realized foreign-exchange gain or loss. Post it to that account. It is a result of the reconciliation, not an exception inside it.',
          'Revalue open items at period-end. For invoices still outstanding at close, revalue the foreign-currency balance at the closing rate; the movement is an unrealized FX gain/loss until the cash actually moves.',
        ],
      },
      {
        t: 'p',
        text: 'The distinction in steps 4 and 5 — [realized vs. unrealized](https://corporatefinanceinstitute.com/resources/accounting/foreign-exchange-gain-loss/) — is the one piece of FX accounting worth internalizing: a realized gain or loss is locked in when the cash settles, an unrealized one is the paper movement on a balance still open at close. Most accounting systems post both, but check what the period-end revaluation actually covers. In NetSuite, for instance, the revaluation process revalues open receivables, payables, and bank balances, while other foreign-currency balance-sheet accounts are revalued only when [Revalue Open Balances](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N1409370.html) is checked on the account. Leave it unchecked on such an account and that balance stays at old rates.',
      },
      {
        t: 'code',
        text: 'Anatomy of one foreign-currency payment\n----------------------------------------\nInvoice                 : EUR 10,000.00\n  booked @ 1.0820       : USD 10,820.00   (AP, invoice-date rate)\nSent                    : EUR 10,000.00\n  converted @ 1.0847    : USD 10,847.00   (settlement-date rate, incl. spread)\nWire fee                : USD     30.00   -> bank fees\nLeft the bank account   : USD 10,877.00   (10,847 + 30)\nIntermediary deduction  : EUR     25.00   (taken in transit, SHA)\nSupplier received       : EUR  9,975.00\n\nMatch test, original currency first\n-----------------------------------\n  EUR 10,000 owed vs EUR 9,975 received : EUR 25 short -> a real difference;\n      the cause is the intermediary deduction. It stays open on the\n      supplier\'s account until you pay the EUR 25 or agree a write-off.\n\nThen base currency\n------------------\n  USD 10,847 paid - USD 10,820 booked   : USD 27 -> realized FX loss (incl. spread)\n  USD 30 wire fee                       : bank fees\n  Neither is "unmatched"',
      },
      {
        t: 'callout',
        kind: 'warning',
        text: 'An FX difference is not a missing transaction. If you make the base-currency numbers tie by plugging the gap — forcing a match or dumping it in a suspense account — you erase a real gain or loss and leave a clearing account that never empties. The gap is supposed to be there. Name it FX and move on.',
      },
      { t: 'h2', text: 'Fix the inputs that silently differ' },
      {
        t: 'p',
        text: 'The method above assumes your systems at least agree on the basics. In multi-currency they usually do not, and the drift is invisible until close. A controller running a 14-country month-end laid out the failure mode on [r/Accounting](https://reddit.com/r/Accounting/comments/1t65w9c/12_currencies_3_erps_and_we_still_handkey_fx/), in a thread titled "12 currencies, 3 ERPs, and we still hand-key FX adjustments at month end":',
      },
      {
        t: 'quote',
        text: 'each one pulls FX rates from a different source on a different cadence. NetSuite uses end-of-month rate, SAP uses average',
      },
      {
        t: 'p',
        text: 'That is the whole problem in one line: two correct systems disagree because they are converting with different rates, and no amount of re-matching fixes a rate mismatch. Another commenter\'s workaround — "We still do it outside the system but it\'s only one translation layer" — is the right instinct (one place where conversion happens), done by hand. Standardize these four inputs and most of the month-end FX scramble disappears:',
      },
      {
        t: 'ul',
        items: [
          'One canonical rate source and cadence. Pick a single FX rate provider and a single timing rule — daily close, month-end, or period average — and apply it across every system. Mismatched rate sources are the single biggest reason two right answers disagree.',
          'A currency code on every amount. Tag every figure with its [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) code — `USD`, `EUR`, `JPY` — never a bare number or a `$` that could be USD, CAD, AUD, or SGD. A loose currency symbol in a [CSV export](/notes/csv-gotchas-encoding-delimiters) also quietly breaks numeric parsing, so the amount stops being a number at all.',
          'Fees grossed up, never netted. Record the gross invoice and the deductions separately. The moment a fee is netted into an amount, the amount no longer matches anything and you are back to chasing a phantom difference.',
          'A per-currency clearing account. Hold in-transit foreign cash in a clearing account by currency until it settles, so the [settlement-date lag](/notes/marketplace-payout-reconciliation) lives somewhere visible instead of floating as an unexplained variance.',
        ],
      },
      { t: 'h2', text: 'Where it still bites: platforms and wires' },
      {
        t: 'p',
        text: 'Two places make all of this worse — your sales platforms and the wires themselves. On the sales side, the payout is already converted before you see it. A store owner on [r/ecommerce](https://reddit.com/r/ecommerce/comments/1s2p85q/whats_the_best_payment_processor_for_an/) put the cost plainly:',
      },
      {
        t: 'quote',
        text: 'Every time Shopify pays out in a non-USD currency, Stripe auto-converts and takes like 1-2% on top of everything else.',
      },
      {
        t: 'p',
        text: 'The [payout you receive](https://help.shopify.com/en/manual/payments/shopify-payments/store-currency/payouts-in-multiple-currencies) is net of an FX conversion and a [conversion fee](https://help.shopify.com/en/manual/payments/shopify-payments/store-currency/currency-conversion-calculation), layered on top of the processing-fee and refund netting you already untangle for every payout. Stripe documents the same split between the [presentment currency and the settlement currency](https://docs.stripe.com/payouts/multicurrency-settlement): you can only avoid the conversion by holding a balance in that currency. So reconcile the payout per currency, in its presentment currency, before you convert — the same order as everything else here, and the same discipline as [reconciling any payout against sales](/notes/marketplace-payout-reconciliation).',
      },
      {
        t: 'p',
        text: 'On the wire side, the poster\'s "the amount that lands is different from what we sent" is the intermediary-fee chain plus the bank\'s spread. The lever most people miss is the charge option: paying [OUR](https://en.wikipedia.org/wiki/Wire_transfer) (you absorb every fee, the full amount arrives) instead of the SHA default (the chain deducts from the transfer in flight) makes the deduction predictable and bookable instead of a surprise on the supplier\'s end. A poster on [r/Bookkeeping](https://reddit.com/r/Bookkeeping/comments/1obkb1m/how_do_you_avoid_hidden_bank_fees_on/) named the reconciliation cost of getting this wrong:',
      },
      {
        t: 'quote',
        text: 'Between my bank\'s wide exchange rate spread and random deductions along the way, reconciliation has become a nightmare.',
      },
      {
        t: 'p',
        text: 'The thread\'s answer was to switch to a cheaper provider — reasonable for the cost, beside the point for the books. Reconciliation does not need the fee to be small; it needs it to be predictable and posted to a line, not silently shaved off the rate. As one commenter on a [separate scaling thread](https://reddit.com/r/smallbusiness/comments/1tl8prz/is_payment_reconciliation_supposed_to_get_this/) put it, "the transfer itself usually isn\'t even the problem. It\'s trying to match everything afterward." The method above is the "afterward".',
      },
      { t: 'h2', text: 'When a spreadsheet stops keeping up' },
      {
        t: 'p',
        text: 'A two-file, single-currency match is fine in [Excel](/notes/reconcile-two-files-in-excel-with-xlookup), and most reconciliations should start there. Multi-currency strains it: every match now carries a rate, a date, and a fee; the same close runs every month across a dozen currencies; and eventually someone has to show an auditor how a base-currency number was reached from a foreign invoice three rates ago. That is where hand-keyed FX adjustments — the exact thing the controller above was still doing — stop being sustainable. [Forgiving matching](/notes/fuzzy-matching-records) on the keys, one documented rate source, and a process that records its own reasoning matter more than any formula. Whether you do that in a workbook, a script, or [an AI model working from a clear prompt](/notes/reconciliation-prompt-pack), the rule does not change: reconcile in the original currency, then let the FX fall out where it belongs.',
      },
    ],
    faq: [
      {
        q: 'Should I reconcile in my base currency or the original transaction currency?',
        a: 'Start in the original transaction currency. In the currency the invoice and payment actually happened in, the amounts should match to the cent, so any difference there is a real discrepancy worth investigating. Convert to your base currency only after that match holds, and treat the converted difference as a foreign-exchange gain or loss rather than a missing transaction.',
      },
      {
        q: 'Why doesn\'t the amount that arrives match the amount I sent?',
        a: 'On an international wire, correspondent and intermediary banks in the chain each deduct a fee from the amount in transit, and your bank\'s exchange-rate spread is built into the rate you got. So the amount that lands is smaller than the amount you sent, by design. Record the difference as a bank fee and FX cost, grossed up as its own line, instead of forcing the invoice to match the net cash.',
      },
      {
        q: 'Is a foreign-exchange gain or loss an error I need to fix?',
        a: 'No. When the exchange rate moves between the date you booked an invoice and the date it settles, the base-currency value legitimately changes. That movement is a realized FX gain or loss and belongs in its own account. If you plug the gap to make the numbers tie, you erase a real result and leave a clearing account that never clears.',
      },
      {
        q: 'Which exchange rate should I use — the invoice date or the payment date?',
        a: 'Both, for their own purpose. Book the invoice at the rate on the invoice date and the settlement at the rate on the payment date; the difference between them is the realized gain or loss. For invoices still open at period-end, revalue the balance at the closing rate, which produces an unrealized gain or loss until the cash moves. The key is to pick one rate source and one cadence and use it consistently.',
      },
      {
        q: 'How do I stop multi-currency FX from dragging out month-end close?',
        a: 'Standardize the inputs before you reconcile: one canonical rate source and timing rule applied across every system, an ISO 4217 currency code on every amount, fees grossed up rather than netted, and a per-currency clearing account that holds in-transit cash until it settles. Most multi-currency close pain comes from two correct systems using different rate sources, not from the math itself.',
      },
    ],
  },
  {
    slug: 'csv-gotchas-encoding-delimiters',
    title: 'CSV gotchas that silently break a reconciliation: encoding, delimiters, and mangled IDs',
    description:
      'The dangerous CSV problems are the silent ones: Excel drops leading zeros, turns long order IDs into scientific notation, garbles encoding, splits on the wrong delimiter, or reinterprets dates by locale. None of it errors — the match just stops matching. Here are the traps, why each is invisible, and a two-minute check that catches them before they cost you an evening.',
    keywords: [
      'csv reconciliation problems',
      'excel csv leading zeros dropped',
      'csv encoding utf-8 windows-1252',
      'csv delimiter semicolon',
      'import csv excel keep as text',
      'scientific notation order id csv',
      'csv gotchas reconciliation',
    ],
    lead: 'The CSV opened fine. The rows look right. So why does your reconciliation suddenly show two hundred orders [missing](/notes/reconcile-two-files-in-excel-with-xlookup) that you know shipped? Because somewhere between the export and the match, the file quietly changed your data and didn\'t tell you. Excel dropped the leading zeros off your SKUs, turned a 16-digit order ID into 1.23E+15, read a European export\'s semicolons as one giant column, or decided 04/05 meant April when it meant May. None of that throws an error. The match just stops matching. Here is the short list of CSV traps that do this, why each one is invisible, and a two-minute check that catches them before they eat your evening.',
    blocks: [
      { t: 'h2', text: 'Why a clean-looking file lies to you' },
      {
        t: 'p',
        text: 'The CSV problems that error out are the easy ones — the import fails, you see a red message, you fix it in minutes. The expensive ones are silent. The file opens, every row is present, the totals look plausible. But the [key column](/notes/how-to-reconcile-two-systems-by-hand) — the field your match depends on — has quietly changed shape. A reconciliation keyed on that column then reports differences that are not real: rows flagged "only in system A" that are sitting right there in system B under a mangled key. You go hunting for missing orders that never went anywhere. An operator on [r/ecommerce](https://reddit.com/r/ecommerce/comments/1pxre20/how_are_you_handling_data_silos_between_shopify/) described the version of this that happens across channels:',
      },
      {
        t: 'quote',
        text: 'your Shopify customer data doesn\'t match your amazon reports and inventory data is scattered across different CSVs.',
      },
      {
        t: 'p',
        text: 'Their one-line verdict — "It\'s absolute hell" — is the sound of a match failing for a reason the grid will not show you. So before you treat a difference as a difference, rule out the file. Here is what to rule out.',
      },
      { t: 'h2', text: 'The gotchas, in the order they bite' },
      {
        t: 'table',
        head: ['Gotcha', 'What you see', 'Why the match breaks', 'How to stop it'],
        rows: [
          ['Leading zeros dropped', '`00421` becomes `421`', 'The key no longer equals the same SKU on the other side, so the row reads as missing', 'Import the column as [text](https://support.microsoft.com/en-us/office/keeping-leading-zeros-and-large-numbers-1bf7b935-36e1-4985-842f-5dfa51f85fe7) — never open the file by double-click'],
          ['Long IDs in scientific notation', 'a 16-digit order ID shows as `1.23E+15`', 'The trailing digits are gone, so two different IDs collapse to one or match nothing', 'Same fix — force the column to text on [import](https://support.microsoft.com/en-us/office/keeping-leading-zeros-and-large-numbers-1bf7b935-36e1-4985-842f-5dfa51f85fe7)'],
          ['Encoding mismatch (mojibake)', '`café` shows as `cafÃ©`, `€` as `â‚¬`', 'Any key or name holding the garbled character stops matching', 'Open as [UTF-8](https://en.wikipedia.org/wiki/Mojibake); the [Windows-1252](https://en.wikipedia.org/wiki/Windows-1252) default is the usual culprit'],
          ['A UTF-8 byte-order mark', 'an invisible marker before the first header', 'The first header (often the key) silently fails to match its mapping', 'Save as plain UTF-8 without the [BOM](https://en.wikipedia.org/wiki/Byte_order_mark), or strip the leading bytes'],
          ['Wrong delimiter', 'every row lands in one column', 'There is no key column at all, so nothing matches', '[RFC 4180](https://www.rfc-editor.org/rfc/rfc4180.html) says comma, but EU exports use semicolons and many use tabs — set the [delimiter](https://en.wikipedia.org/wiki/Comma-separated_values) on import'],
          ['Unquoted comma inside a field', '`Smith, Jr.` splits into two columns', 'Every column after it shifts right, so the wrong field becomes the key', 'A correct export [quotes fields that contain commas](https://www.rfc-editor.org/rfc/rfc4180.html) — re-export, or set the delimiter explicitly'],
          ['Ambiguous dates', '`04/05/2026`', 'One file reads April, the other May, so matched rows look like mismatches', 'Import dates as text or standardize to [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) `YYYY-MM-DD` before matching'],
          ['Trailing / invisible whitespace', '`1001 ` looks identical to `1001`', 'An exact-match comparison fails on the hidden space', '[TRIM](/notes/reconcile-two-files-in-excel-with-xlookup) the key, or clean it on import'],
          ['Text vs number type', '`1001` as text is not `1001` as a number', 'A type-strict match treats them as two different keys', 'Decide one type for the key and enforce it on both files'],
        ],
      },
      {
        t: 'p',
        text: 'Most of these trace back to a single moment: the instant Excel is allowed to guess what your columns are. Take that decision away from it and the list above mostly disappears.',
      },
      { t: 'h2', text: 'The one habit that prevents most of them: never let Excel guess' },
      {
        t: 'p',
        text: 'Double-clicking a CSV opens it with automatic type detection switched on. That is the moment your leading zeros vanish and your long IDs go scientific. The fix is to import the file instead of opening it, and to tell Excel the key column is text before it reads a single row.',
      },
      {
        t: 'ol',
        items: [
          'Open Excel first. Do not double-click the CSV. On the Data tab, choose [From Text/CSV](https://support.microsoft.com/en-us/office/import-or-export-text-txt-or-csv-files-5250ac4c-663c-47ce-937b-339e391393ba) and pick the file.',
          'In the preview, set Data Type Detection to "Do not detect data types" — or use the [Text Import Wizard](https://support.microsoft.com/en-us/office/text-import-wizard-c5b02af6-fda1-4440-899f-f78bafe41857) and set the ID/key and date columns to Text.',
          'Check the File Origin shows UTF-8. If accented characters or the € sign look garbled, it was saved as Windows-1252 — change the origin or re-export.',
          'Confirm the delimiter split the columns correctly. If everything sits in column one, switch the delimiter to semicolon or tab.',
          'Load, then run your match. The key column now holds exactly what the source system exported.',
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        text: 'Open the raw file in a plain text editor (Notepad, TextEdit, VS Code) before Excel ever touches it. In thirty seconds you can see the true delimiter, whether the encoding is clean, and whether the quotes are balanced — none of which the Excel grid shows you, because by then the damage is already done.',
      },
      { t: 'h2', text: 'What "save as CSV UTF-8" actually fixes (and what it doesn\'t)' },
      {
        t: 'p',
        text: 'When a NetSuite import kept failing on an [inventory worksheet](https://reddit.com/r/Netsuite/comments/1tx1vrd/inventory_adjustment_worksheet_import/), two of the most useful replies were about the file, not the system. The first named the trap nobody can see:',
      },
      {
        t: 'quote',
        text: 'Double check there are no spaces behind the characters in the cells. That one has gotten me before and was basically invisible.',
      },
      {
        t: 'p',
        text: 'The second pointed straight at encoding:',
      },
      {
        t: 'quote',
        text: 'Sometimes there are weirdness with UTF-8 vs Windows 1252 character set but that\'s usually with punctuation characters not digits in InternalID.',
      },
      {
        t: 'p',
        text: 'Both are right, and together they show why "just save it as CSV UTF-8" is half an answer. Saving as UTF-8 fixes the [mojibake](https://en.wikipedia.org/wiki/Mojibake) — the garbled accents and symbols that come from a file written in [Windows-1252](https://en.wikipedia.org/wiki/Windows-1252) and read as Unicode, or the reverse. It does nothing about trailing spaces, type coercion, or a wrong delimiter. And a UTF-8 file saved with a [byte-order mark](https://en.wikipedia.org/wiki/Byte_order_mark) can corrupt the very first header — usually your key — so the column maps to nothing. Excel\'s own "CSV UTF-8" save option writes that mark, so a file you fixed this way can still trip a tool that does not expect it. Encoding is one trap on the list, not the list.',
      },
      {
        t: 'callout',
        kind: 'warning',
        text: 'Trailing and leading whitespace is the single most common silent break, because it is literally invisible in the cell. `1001 ` and `1001` look identical and fail every exact match. Run the key through TRIM on both files before you compare anything.',
      },
      { t: 'h2', text: 'Dates: the trap that survives every other fix' },
      {
        t: 'p',
        text: 'You can fix the encoding, force the IDs to text, and get the delimiter right, and dates will still quietly betray you. `04/05/2026` is April 5th to a US export and the 4th of May to most of the rest of the world. When two files disagree about which, every matched row with a date check reads as a mismatch. A seller juggling US and German marketplace reports put it plainly:',
      },
      {
        t: 'quote',
        text: 'the reports are formatted differently (date formats mess me up every time)',
      },
      {
        t: 'p',
        text: 'The durable fix is to stop trusting the locale. Import date columns as text so Excel cannot reinterpret them, then standardize to [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) — `YYYY-MM-DD` — which is unambiguous by design because it leads with the year. Match on the standardized column, never the raw one.',
      },
      { t: 'h2', text: 'Settlement and marketplace files: same traps, higher stakes' },
      {
        t: 'p',
        text: 'Settlement and payout exports — Amazon, Stripe, Shopify — carry the worst combination of these traps at once: long transaction IDs, multiple currencies and locales, decimal commas, and embedded commas inside descriptions. When someone on [r/Netsuite](https://reddit.com/r/Netsuite/comments/y9r10m/customer_payments_from_marketplaces/) asked how to record marketplace customer payments from a settlement report, the community\'s reflex was to throw a tool at it:',
      },
      {
        t: 'quote',
        text: 'I run thousands upon thousands of records monthly through Celigo reconciliation products.',
      },
      {
        t: 'p',
        text: 'That is a fair option at volume — integration platforms like Celigo or A2X do ingest these files and post the journals for you. But a tool does not repair a malformed export; it matches on whatever the file actually contains. Feed it a key mangled by scientific notation and it reconciles wrong, just faster and at scale. Whether you do it by hand or buy the platform, the file has to be clean first — and a settlement file is also a [netted, bundled batch](/notes/marketplace-payout-reconciliation), so once the CSV is sound you are reconciling the payout, not the orders.',
      },
      { t: 'h2', text: 'A two-minute sanity check before you match' },
      {
        t: 'p',
        text: 'Run this on every file before you trust a single comparison. It is faster than chasing a phantom difference for an hour later.',
      },
      {
        t: 'ol',
        items: [
          'Row count: does the imported row count equal the source report\'s row count? A gap means the parser split or merged rows.',
          'Key type: is the key column text, with leading zeros intact and no `E+` anywhere in it?',
          'Spot-check three known IDs: pick three records you know and confirm they survived the import character-for-character.',
          'Raw view: open the file in a text editor — confirm the delimiter, that the encoding is clean (no `Ã` or `â‚¬` garble), and that quotes are balanced.',
          'Dates: are all dates in one unambiguous format before you compare them?',
        ],
      },
      {
        t: 'p',
        text: 'This is the same discipline as cleaning your key in a [spreadsheet](/notes/reconcile-two-files-in-excel-with-xlookup) — done one step earlier, at the door, before a bad column gets into the workbook at all.',
      },
      { t: 'h2', text: 'When the file is clean and the match still fails' },
      {
        t: 'p',
        text: 'If you have ruled out the CSV and rows still will not reconcile, the problem has moved up a layer. Either the [key itself is wrong or non-unique](/notes/reconcile-two-files-in-excel-with-xlookup) — a repeating order number, a missing second field — or the two systems genuinely disagree, and you are now doing real [reconciliation](/notes/how-to-reconcile-two-systems-by-hand) rather than fighting a parser. That is the good kind of difference: the kind worth investigating. CSV hygiene just makes sure every difference you chase is a real one. And where the same export lands on your desk every week, the cleaning belongs in a repeatable step, not re-done by hand each time it costs you an evening.',
      },
    ],
    faq: [
      {
        q: 'Why does Excel drop the leading zeros from my CSV?',
        a: 'Because opening a CSV by double-click lets Excel auto-detect column types, and it reads a zero-padded value like 00421 as the number 421. Import the file through the Data tab\'s From Text/CSV instead, and set that column to Text before loading, so the value is preserved exactly.',
      },
      {
        q: 'Why is my long order ID showing as 1.23E+15?',
        a: 'Excel converted a number longer than 15 digits to scientific notation and discarded the trailing digits, so the ID is no longer accurate. Force the column to Text on import. Once the digits are gone they cannot be recovered, so you must re-import from the original file.',
      },
      {
        q: 'My CSV opens as one big column — what went wrong?',
        a: 'The file uses a delimiter Excel did not expect, usually a semicolon (common in European exports where the comma is the decimal separator) or a tab. Use From Text/CSV and set the delimiter explicitly so the columns split correctly.',
      },
      {
        q: 'Why do accented characters or symbols show up as garbage like cafÃ©?',
        a: 'That is mojibake — the file was written in one character encoding and read in another, most often a Windows-1252 file read as UTF-8 or the reverse. Re-open or re-export the file as UTF-8 and the characters resolve.',
      },
      {
        q: 'How do I stop dates from flipping between day and month when I import?',
        a: 'Import date columns as text so Excel cannot reinterpret them by locale, then convert them to the ISO 8601 format YYYY-MM-DD, which is unambiguous because it leads with the year. Match on the standardized column rather than the raw one.',
      },
    ],
  },
  {
    slug: 'fuzzy-matching-records',
    title: 'Fuzzy matching records: catching the duplicate the invoice number hides',
    description:
      'A vendor invoice paid twice slips through because the invoice numbers differ slightly. The fix is not sharper eyes — it is matching on the fields that do not drift. How to normalize keys, build a composite match on amount, vendor, and date window, score near-duplicates, and the duplicate-payment test that catches what exact matching misses.',
    keywords: [
      'fuzzy matching',
      'catch duplicate payments',
      'find duplicate invoices excel',
      'reconciliation fuzzy match',
      'composite key matching',
      'duplicate vendor payment',
      'approximate string matching',
    ],
    lead: 'An AP team paid the same vendor invoice twice, and the reason it slipped through is the useful part: ["Because the invoice numbers were slightly different, QuickBooks didn\'t catch it."](https://reddit.com/r/QuickBooks/comments/1nog8xi/small_business_ap_how_do_you_catch_duplicate/) That isn\'t a software failure — it\'s what happens when you match on one raw key and trust it. Exact matching only works when both systems write the key the same way, and they almost never do. Fuzzy matching is the fix, but its job is widely misread: it surfaces look-alike pairs for you to confirm, not to auto-merge anything. Here\'s how to normalize keys so more matches land cleanly, how to match on what doesn\'t drift when the key is hopeless, and the duplicate-payment test that would have caught that doubled invoice.',
    blocks: [
      { t: 'h2', text: 'Why didn\'t the software catch the duplicate?' },
      {
        t: 'p',
        text: 'The honest answer isn\'t "invoice numbers are hard." It\'s that almost every out-of-the-box match does exact, one-to-one matching on a single key. An operator named the mechanism precisely in a thread titled ["Reconciliation tools are just fancy VLOOKUPs and nobody wants to say it"](https://reddit.com/r/Accounting/comments/1smq2rr/reconciliation_tools_are_just_fancy_vlookups_and/): "almost everything still does 1:1 exact matching. Meaning — if your ERP spits out ORD-2024-10042 and your bank statement has 10042, the tool says unmatched." Same defect in the duplicate case: two entries that are really one bill look like two records because one key reads INV-4021 and the other 4021-A. The match did exactly what you asked. You asked the wrong question.',
      },
      {
        t: 'p',
        text: 'The seed thread\'s best answer was honest but not a method. A commenter replied that ["Its hard when the invoice numbers are different, that makes it harder to catch"](https://reddit.com/r/QuickBooks/comments/1nog8xi/small_business_ap_how_do_you_catch_duplicate/) and fell back on a person noticing — "there are only 1-2 AP people and usually they would catch the dupe invoice." That holds until volume, turnover, or a second cost category outruns one person\'s memory, which is exactly how this one got through. The fix isn\'t a sharper pair of eyes. It\'s matching on the fields that don\'t drift.',
      },
      { t: 'h2', text: 'What fuzzy matching is — and the one thing it must not do' },
      {
        t: 'p',
        text: 'Fuzzy matching compares records that aren\'t identical and scores how alike they are, so near-misses surface instead of silently failing an exact-match test. The formal name for the whole problem is [record linkage](https://en.wikipedia.org/wiki/Record_linkage), and the probabilistic flavor is literally called [fuzzy matching](https://en.wikipedia.org/wiki/Fuzzy_matching) — pairs above a similarity threshold are matches, below it are non-matches, and the band in between are "possible matches" a person decides.',
      },
      {
        t: 'p',
        text: 'Here is the discipline that everything else hangs on: a similarity score is a candidate flag, not a verdict. It tells you "these two might be the same — look." It must never auto-merge or auto-clear on its own, because the same machinery that pairs INV-4021 with 4021-A will just as happily pair two genuinely different invoices that happen to share an amount. Surface, then confirm. Skip the confirm and you\'ve only traded missed duplicates for invented ones.',
      },
      { t: 'h2', text: 'Normalize before you match (this does most of the work)' },
      {
        t: 'p',
        text: 'Before any scoring, most "non-matching" keys are just formatted differently. Normalization is the cheap, boring step that turns the majority of your near-misses into clean exact matches. Do it to both sides, into a new helper column, and match on that — leave the raw key untouched so you can always trace back.',
      },
      {
        t: 'table',
        head: ['What drifts', 'Normalize it to', 'Why it matters'],
        rows: [
          ['Leading / trailing spaces', 'Trimmed text', 'A trailing space makes 4021 ≠ "4021 "'],
          ['Upper vs lower case', 'One case', 'inv-4021 and INV-4021 are the same bill'],
          ['Prefixes / suffixes (INV-, -A, /2024)', 'The stable core, often just the digits', 'This is the exact gap that hid the duplicate'],
          ['Leading zeros (0004021)', 'Stripped or padded consistently', 'Text-vs-number formatting flips these silently'],
          ['Separators (- / .)', 'Removed', 'ORD-2024-10042 collapses toward 10042'],
        ],
      },
      {
        t: 'code',
        text: '=TRIM(A2)                                       \' strip stray spaces\n=UPPER(TRIM(A2))                                \' spaces + case in one pass\n=SUBSTITUTE(SUBSTITUTE(UPPER(TRIM(A2)),"INV-",""),"-A","")   \' drop known prefix/suffix\n=VALUE(A2)                                      \' force a number, killing leading-zero drift (digits-only keys up to 15 digits)',
      },
      {
        t: 'p',
        text: 'This is the same clean-key discipline that makes an [XLOOKUP reconciliation](/notes/reconcile-two-files-in-excel-with-xlookup) work at all — XLOOKUP and VLOOKUP do exact matching, so they only reward you when the keys are already identical, and normalizing into a helper column is how you earn that. [TRIM](https://support.microsoft.com/en-us/office/trim-function-410388fa-c5df-49c6-b16c-9e5630b479f9) removes only the space character, so pair it with UPPER and SUBSTITUTE for the rest. Use VALUE only on keys that are all digits: it returns #VALUE! on any key with a letter in it, and Excel keeps only 15 significant digits, so two different 16-digit IDs can come back as the same number. Keep those keys as text. The thing you\'re rebuilding here is a stable [primary ID](/notes/how-to-reconcile-two-systems-by-hand) — when the systems never shared one, this is the work that fakes one well enough to match on.',
      },
      { t: 'h2', text: 'When the key is hopeless, match on what doesn\'t drift' },
      {
        t: 'p',
        text: 'Sometimes there\'s no recoverable key — the two sides never shared one, or the invoice number is genuinely different on each. Stop trying to fix the key and match on the fields that don\'t move: the amount, the counterparty, and the date within a window. A duplicate payment almost always keeps the amount and the vendor identical even when the invoice number drifts. That\'s the signature you hunt for.',
      },
      {
        t: 'ol',
        items: [
          'Build a composite key from stable fields: normalized vendor + amount. Concatenate them into one column on both sides. Leave the date out of the key.',
          'Sort by that key, then by date, so identical bills sit next to each other.',
          'Flag any row that has another row with the same key within plus-or-minus five days. Real duplicates often post a few days apart, so compare on a window, not an exact day.',
          'Review each flagged pair by hand. Same bill paid twice, or two real invoices that happen to share an amount? Only a person closes that.',
        ],
      },
      {
        t: 'code',
        text: '\' Composite key on each side (vendor + amount, no date):\n=UPPER(TRIM(Vendor)) & "|" & TEXT(Amount,"0.00")\n\n\' Flag a row when another row has the same key within 5 days of its date (D2):\n=COUNTIFS(KeyCol,K2,DateCol,">="&D2-5,DateCol,"<="&D2+5)>1',
      },
      {
        t: 'callout',
        kind: 'warning',
        text: 'Do not put the month in the key. A bill entered on Jan 30 and again on Feb 2 is three days apart, but a vendor + amount + month key gives the two rows different keys, so they never collide. Key on vendor and amount, and let the date window do the date work.',
      },
      {
        t: 'p',
        text: 'Flagging same-key collisions is the same [set-difference logic](/notes/reconcile-two-files-in-excel-with-xlookup) you\'d use to find missing rows — you\'re just hunting the opposite signal: rows that appear too many times instead of too few.',
      },
      { t: 'h2', text: 'Scoring near-duplicates when you can\'t enumerate the rules' },
      {
        t: 'p',
        text: 'Composite keys catch duplicates where you can name the stable fields. When you can\'t — free-text descriptions, customer names, addresses — you need a similarity score: a number from 0 to 1 for how alike two strings are. The standard measures, and where each one fits:',
      },
      {
        t: 'table',
        head: ['Measure', 'Best for', 'How it works'],
        rows: [
          ['[Levenshtein / edit distance](https://en.wikipedia.org/wiki/Levenshtein_distance)', 'Typos and transpositions in codes', 'Counts the single-character edits to turn one string into the other'],
          ['[Jaro–Winkler](https://en.wikipedia.org/wiki/Jaro%E2%80%93Winkler_distance)', 'Short strings like names', 'Rewards a shared prefix; built for record linkage'],
          ['[Jaccard (token overlap)](https://en.wikipedia.org/wiki/Jaccard_index)', 'Reordered words ("Acme Inc" vs "Inc, Acme")', 'Overlap over union of the words; what Power Query uses'],
        ],
      },
      {
        t: 'p',
        text: 'In a spreadsheet you don\'t implement these by hand. [Power Query\'s fuzzy merge](https://learn.microsoft.com/en-us/power-query/merge-queries-fuzzy-match) exposes a [similarity threshold from 0.00 to 1.00, default 0.80](https://learn.microsoft.com/en-us/power-query/fuzzy-matching), where 1.00 allows only exact matches and lower values match more loosely. Turn on "show similarity scores" so you can see why each pair matched, and tune the threshold against your own data rather than trusting the default.',
      },
      {
        t: 'callout',
        kind: 'warning',
        text: 'A threshold is a dial between two failure modes, and no setting escapes both. Too loose and you pair invoices that were never the same; too tight and the duplicate you\'re hunting slips through again. Set it to surface candidates generously, then confirm every one by hand. The score decides what you look at — never what you clear.',
      },
      { t: 'h2', text: 'The duplicate-payment test, end to end' },
      {
        t: 'p',
        text: 'Put it together against the original problem: a bill paid twice under slightly different invoice numbers. Here\'s the pass that catches it.',
      },
      {
        t: 'ol',
        items: [
          'Pull both payment runs into one sheet with vendor, amount, invoice number, date, and cost category in columns.',
          'Normalize the vendor and invoice number into helper columns (trim, upper, strip prefixes).',
          'Build the composite key: vendor + amount. Ignore the invoice number for this pass — it\'s the field that lied.',
          'COUNTIFS the key within five days either side of each row\'s date. Anything counting more than one is a candidate.',
          'For each candidate, read the two rows. Same vendor, same amount, days apart, two different cost categories is the exact fingerprint of this error.',
          'Confirm and resolve by hand: void the duplicate, document which one was real.',
        ],
      },
      {
        t: 'p',
        text: 'This is the failure mode behind a complaint that a reconciliation can say everything matched and still be wrong. One commenter described how auditors found ["duplicate vendor payments that looked clean because amounts offset perfectly."](https://reddit.com/r/Accounting/comments/1stpdxk/tired_of_excel_reconciliations_that_say_matched/) A top-line "MATCHED" only proves the totals tie; it says nothing about whether two line items are secretly the same bill. The duplicate test above is what looks underneath the checkmark.',
      },
      { t: 'h3', text: 'The same test on a duplicate order' },
      {
        t: 'p',
        text: 'Orders double the same way. An integration that times out and retries can post one storefront order to the ERP twice, each copy under its own ERP document number, so a match on the ERP number sees two clean records. Key on customer + order total, flag pairs posted within a day or two of each other, and read the storefront order number on each (most integrations write it to a reference field). Two ERP orders carrying the same storefront order number are one order posted twice: cancel or void the copy before it ships or invoices.',
      },
      { t: 'h2', text: 'When this stops scaling' },
      {
        t: 'p',
        text: 'A helper column and a COUNTIFS pass are the right tools for a few hundred rows you check monthly — it\'s the [manual method](/notes/how-to-reconcile-two-systems-by-hand) with a normalization step bolted on, and it belongs in any month-end close where a doubled entry is exactly what you\'re watching for. It strains when the same dedup runs every week, when there are thousands of rows, or when "is this really the same vendor" needs judgment a formula can\'t encode. At that point you want the normalization rules and the match logic written down once and run the same way every time, not rebuilt from memory. If you reach for AI there, use it where it\'s actually strong — describing the normalization rules and explaining candidate pairs — and keep [the arithmetic and the matching in code you can audit](/notes/reconciliation-prompt-pack), so "these are duplicates" stays a claim you can defend.',
      },
    ],
    faq: [
      {
        q: 'Why didn\'t QuickBooks catch the duplicate invoice?',
        a: 'Because it matched on the invoice number, and the two entries had slightly different numbers. Out-of-the-box matching is exact and one-to-one on a single key, so any drift in that key reads as two separate records. Matching on stable fields instead — vendor, amount, and a date window — catches the duplicate the invoice number hides.',
      },
      {
        q: 'What is fuzzy matching in reconciliation?',
        a: 'Comparing records that are not identical and scoring how similar they are, so near-misses surface instead of silently failing an exact match. It is a form of record linkage. Its output is candidate pairs for a person to confirm, not an automatic merge.',
      },
      {
        q: 'How do I find duplicate payments in Excel?',
        a: 'Normalize the vendor and amount into helper columns, build a composite key of vendor plus amount, and use COUNTIFS to flag any row with another row of the same key within five days of its date. Do not key on the month, or a duplicate entered either side of a month end slips through. Review each flagged pair by hand; a duplicate keeps the amount and vendor even when the invoice number differs.',
      },
      {
        q: 'Should fuzzy matching merge records automatically?',
        a: 'No. A similarity score flags candidates; it should never auto-merge or auto-clear. The same scoring that pairs a mistyped key with its original will also pair two genuinely different records that share an amount. Always confirm by hand before resolving.',
      },
      {
        q: 'What similarity threshold should I use for fuzzy matching?',
        a: 'There is no universal number. In Power Query the default is 0.80, where 1.00 is an exact match and lower values match more loosely. Start generous to surface candidates, turn on similarity scores to see why pairs matched, and tune against your own data — but always confirm matches manually rather than clearing on the score alone.',
      },
    ],
  },
  {
    slug: 'how-to-reconcile-two-systems-by-hand',
    title: 'How to reconcile two systems by hand: a repeatable method',
    description:
      'A step-by-step manual reconciliation method that works for any two data sources — choose and validate a key (including composite keys), normalize, match, classify differences, and keep the evidence.',
    keywords: [
      'manual reconciliation',
      'how to reconcile data',
      'reconciliation process',
      'data matching',
      'reconciliation steps',
      'account reconciliation',
      'primary id',
      'reconciliation key',
      'composite key',
    ],
    lead: 'Reconciliation has a reputation as tedious detective work. The detective part is real; the tedious part is mostly because no one ever showed you the method. There is one — the same method every time, whether you\'re matching orders to payments or inventory to a warehouse feed. Here it is, written so you can run it by hand and always know exactly where you are.',
    blocks: [
      { t: 'h2', text: 'What does it mean to reconcile two systems?' },
      {
        t: 'p',
        text: 'To [reconcile](https://en.wikipedia.org/wiki/Reconciliation_%28accounting%29) is to prove that two independent records of the same thing agree — and, where they do not, to explain why. The output is not just match or no match. It is a classified list: rows that agree, rows that exist on one side only, and rows that exist on both but disagree on a value. Each difference has a reason and a next action.',
      },
      { t: 'h2', text: 'The five steps' },
      { t: 'h3', text: '1. Choose the primary ID' },
      {
        t: 'p',
        text: 'Decide the field, or combination of fields, that identifies the same record on both sides — its primary ID. This is the single most important decision; a wrong key makes every later step meaningless. A usable key is unique on both sides (one value, at most one record in each system), stable (it does not change after the record is created, so status fields and totals are out), present in both systems, and in the same format on both sides or normalizable to it: `1001`, `#1001`, and `ORD-1001` are one order to a person and three keys to a formula.',
      },
      {
        t: 'p',
        text: 'Many retail records are only unique in combination: a SKU is unique per location, a line item per order plus line number. Then you build a [composite key](https://en.wikipedia.org/wiki/Composite_key) by joining the fields in a fixed order with a fixed separator, for example `sku|location_id`. `sku|loc` and `loc|sku` never match, even on identical data. Before you trust any key, check it:',
      },
      {
        t: 'ol',
        items: [
          'Count rows and count distinct key values on each side. If they differ, the key is not unique there.',
          'Check the overlap: how many keys appear on both sides versus only one.',
          'Normalize formats — trim whitespace, strip prefixes, fix casing and leading zeros — then re-check.',
          'Only then run the comparison.',
        ],
      },
      {
        t: 'table',
        head: ['Symptom', 'Likely cause'],
        rows: [
          ['Everything shows as a mismatch', 'Key format differs between sides (leading zeros, prefixes, casing)'],
          ['Zero matches on a clean dataset', 'Wrong field chosen, or key missing on one side'],
          ['Duplicate matches, inflated counts', 'Key is not unique; one row matches many'],
          ['Random rows unmatched', 'Whitespace, encoding, or type differences (text 1001 vs number 1001)'],
        ],
      },
      { t: 'h3', text: '2. Normalize both sides' },
      {
        t: 'p',
        text: 'Bring both datasets to the same shape before comparing. Trim whitespace, fix casing, strip prefixes, standardize dates to one format, convert amounts to one unit. Do this to the key first, then to the values you intend to compare.',
      },
      { t: 'h3', text: '3. Match on the key' },
      {
        t: 'p',
        text: 'Join the two sides on the primary ID. Every row now falls into one of three buckets: matched on both sides, present only in A, present only in B. The one-sided rows are your first findings — something was created in one system and never made it to the other.',
      },
      { t: 'h3', text: '4. Compare the matched pairs' },
      {
        t: 'p',
        text: 'For rows that matched, compare the fields that matter — amount, quantity, status, date. Equal values confirm the match. Unequal values are mismatches, and you record both values so the difference is visible, not just flagged.',
      },
      { t: 'h3', text: '5. Classify and decide' },
      {
        t: 'p',
        text: 'Sort every difference by cause and assign an action. The classification is what turns a pile of discrepancies into a closeable list.',
      },
      {
        t: 'table',
        head: ['Category', 'Meaning', 'Typical action'],
        rows: [
          ['Missing in B', 'Exists in A only', 'Investigate why it never synced; create or void'],
          ['Missing in A', 'Exists in B only', 'Same, mirrored'],
          ['Value mismatch', 'Matched but a field differs', 'Correct the wrong side'],
          ['Timing difference', 'Same event, different period', 'Accept; expect it to clear next period'],
          ['Accepted variance', 'Known, tolerated difference', 'Document and move on'],
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        text: 'A run that finishes with zero differences is not automatically good news. Check the key first — zero matches and no differences look identical at a glance and mean opposite things.',
      },
      { t: 'h2', text: 'Why keep the evidence?' },
      {
        t: 'p',
        text: 'The valuable artifact of reconciliation is not the final balanced state, it is the trail: which rows matched, which rule classified each difference, and what the two values were. That trail is what lets someone else trust the result without redoing the work — and what lets you answer why three months later.',
      },
      { t: 'h2', text: 'When to stop doing this by hand' },
      {
        t: 'p',
        text: 'The manual method is the right way to learn reconciliation and the right tool for a one-off. It stops scaling when the same comparison runs every week, when datasets grow past what a [spreadsheet](/notes/reconcile-two-files-in-excel-with-xlookup) handles comfortably, or when more than one person needs to trust the result. At that point you want the steps preserved as a repeatable, auditable process rather than a workbook someone rebuilds each month.',
      },
    ],
    faq: [
      {
        q: 'Can a primary ID be more than one field?',
        a: 'Yes. When no single field is unique, combine fields into a composite key — for example SKU plus location, or order number plus line number — joined in a fixed order with a consistent separator.',
      },
      {
        q: 'What is the first step in reconciling two data sources?',
        a: 'Choosing the primary ID — the field or fields that identify the same record on both sides. Every later step depends on it, so validate that the key is unique and present on both sides before comparing any values.',
      },
      {
        q: 'What are the three outcomes of matching two datasets?',
        a: 'After joining on the key, every row is either matched on both sides, present only in the first source, or present only in the second. Matched rows are then compared field by field to find value mismatches.',
      },
      {
        q: 'How do you classify reconciliation differences?',
        a: 'Group each difference by cause: missing on one side, value mismatch, timing difference, or accepted variance. Each category maps to a clear next action, which is what makes the result closeable.',
      },
    ],
  },
  {
    slug: 'reconcile-two-files-in-excel-with-xlookup',
    title: 'Reconcile two files in Excel with XLOOKUP (the right way)',
    description:
      'A practical guide to matching two exports in Excel using XLOOKUP and INDEX/MATCH — finding missing rows (and where COUNTIF quietly miscounts), testing for duplicate keys, catching value mismatches, and the formatting traps that cause false differences.',
    keywords: [
      'excel reconciliation',
      'xlookup',
      'vlookup reconciliation',
      'compare two excel files',
      'match data excel',
      'excel formulas reconciliation',
      'excel compare two lists',
      'countif missing rows',
      'find duplicates excel',
    ],
    lead: 'Most reconciliations start in Excel, and XLOOKUP does the heavy lifting. But the formula is the easy part. What actually trips people up is matching cleanly, catching what\'s missing (not just what differs), and not getting fooled by formatting that makes identical numbers look different. That last one has quietly eaten more evenings than any hard formula ever has.',
    blocks: [
      { t: 'h2', text: 'The setup: two sheets, one shared key' },
      {
        t: 'p',
        text: 'Put each export on its own sheet — call them `SystemA` and `SystemB`. Confirm both have a column that identifies the same record: an order number, SKU, or transaction ID. That column is your key. Everything below assumes the key is in column A on each sheet and the value you want to compare (say, an amount) is in column B.',
      },
      { t: 'h2', text: 'Step 1: Does each key exist on the other side?' },
      {
        t: 'p',
        text: 'Before comparing values, find the rows that have no counterpart. [XLOOKUP](https://support.microsoft.com/en-us/office/xlookup-function-b7fd680e-6d10-43e6-84f9-88eae8bf5929) returns its if-not-found argument when there is no match, which is exactly what you want.',
      },
      { t: 'code', text: '=XLOOKUP(A2, SystemB!$A:$A, SystemB!$A:$A, "MISSING")' },
      {
        t: 'p',
        text: 'Drag this down SystemA. Any row showing MISSING exists in A but not in B. Repeat the formula on SystemB pointing at SystemA to catch the rows missing the other way. Those two columns are your one-sided differences.',
      },
      { t: 'h3', text: 'The COUNTIF version, and where it lies' },
      {
        t: 'p',
        text: '[COUNTIF](https://support.microsoft.com/en-us/office/countif-function-e0de10c6-f885-4e71-abb4-1f464816df34) gives the same presence check as a count, and it drives conditional formatting, which makes the one-sided rows visible at a glance:',
      },
      { t: 'code', text: '=IF(COUNTIF(SystemB!$A:$A, A2)=0, "only in A", "in both")' },
      {
        t: 'ol',
        items: [
          'Select the key column on SystemA.',
          'New Rule, then Use a formula, then `=COUNTIF(SystemB!$A:$A, A1)=0`.',
          'Set a fill color. Every row missing from B is now highlighted.',
          'Repeat on SystemB with the ranges swapped.',
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        text: 'COUNTIF is loose in three ways. It treats number-like text as a number, so text `0042` and number `42` can count as the same key. It compares numbers to only 15 significant digits, so two different 16-digit order or card IDs can count as a match. And it treats `*`, `?`, and `~` in the key as wildcards. Use it for quick looks only. For IDs, use the XLOOKUP check above (exact, no wildcards by default) or an exact count with `=SUMPRODUCT(--(SystemB!$A$2:$A$5000=A2))`. MATCH with `0` is fine for text keys that never contain `*`, `?`, or `~`.',
      },
      {
        t: 'p',
        text: 'Every lookup assumes the key is unique. If a key repeats, XLOOKUP and MATCH return the first hit, and any value you pull belongs to whichever row came first. Test for duplicates before comparing: `=SUMPRODUCT(--($A$2:$A$5000=A2))>1` flags them (`=COUNTIF($A:$A, A2)>1` works for short, plain keys). A repeating key is not a comparison problem; it means the [key is wrong or incomplete](/notes/how-to-reconcile-two-systems-by-hand), and it often needs a second field to become unique.',
      },
      { t: 'h2', text: 'Step 2: Where the key matches, do the values agree?' },
      {
        t: 'p',
        text: 'For rows that exist on both sides, pull the other side value and compare. Put this in column C:',
      },
      { t: 'code', text: '=XLOOKUP(A2, SystemB!$A:$A, SystemB!$B:$B, "-")' },
      { t: 'p', text: 'Then in column D, flag the difference:' },
      { t: 'code', text: '=IF(C2="-","no match",IF(ROUND(B2-C2,2)=0,"ok","diff "&TEXT(B2-C2,"0.00")))' },
      {
        t: 'p',
        text: 'Now column D reads ok, no match, or diff 12.50 for every row. Filter to anything that is not ok and you have your working list.',
      },
      { t: 'h2', text: 'The formatting traps that create fake differences' },
      {
        t: 'table',
        head: ['Trap', 'What you see', 'Fix'],
        rows: [
          ['Amounts stored as text', 'Identical values will not match', 'Run the amount column through `VALUE()`, or multiply by 1 — amounts only, never IDs (it drops leading zeros and digits past 15)'],
          ['Leading zeros lost', '0042 became 42', 'Format key as text before import; compare as text'],
          ['Trailing spaces', '1001 (with space) not equal to 1001', 'Wrap the key in `TRIM()`'],
          ['Hidden prefixes', '#1001 vs 1001', 'Use `SUBSTITUTE()` to remove the prefix on both sides'],
          ['Rounding', '19.999 vs 20.00', 'Compare with `ROUND(...,2)`, never raw'],
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        text: 'Build a single clean-key helper column on each sheet — `=TRIM(SUBSTITUTE(A2,"#",""))` — and look up against that, not the raw key. One clean column saves a dozen confused hours.',
      },
      { t: 'h2', text: 'XLOOKUP vs VLOOKUP for reconciliation' },
      {
        t: 'p',
        text: '[VLOOKUP](https://support.microsoft.com/en-us/office/vlookup-function-0bbc8083-26fe-4963-8ab8-93a18ad188a1) still works, but XLOOKUP is better suited to this job: it has a built-in not-found argument (no IFERROR wrapper), it looks left or right without counting columns, and it does not break when someone inserts a column. If you are on an older Excel without XLOOKUP, [INDEX](https://support.microsoft.com/en-us/office/index-function-a5dcf0dd-996d-40a4-a822-b56b061328bd) with [MATCH](https://support.microsoft.com/en-us/office/match-function-e8dffd45-c762-47d6-bf89-533f4a37673a) is the equivalent: `=INDEX(SystemB!$B:$B, MATCH(A2, SystemB!$A:$A, 0))`.',
      },
      { t: 'h2', text: 'Where the spreadsheet method runs out' },
      {
        t: 'p',
        text: 'Formulas reconcile two files just fine. They start to buckle the moment you\'ve got three or more sources, the same comparison every week, a [composite key](/notes/how-to-reconcile-two-systems-by-hand), or someone who needs to audit how a number was reached. A workbook saves the answer but not the reasoning — and once other people have to trust that number, the reasoning has to live somewhere more repeatable than a cell formula.',
      },
    ],
    faq: [
      {
        q: 'What is the best Excel function to compare two files?',
        a: 'XLOOKUP is the most reliable for reconciliation because it can return a custom not-found value, look in any direction, and survive inserted columns. INDEX with MATCH is the equivalent on Excel versions without XLOOKUP.',
      },
      {
        q: 'Why do identical-looking values show as different in Excel?',
        a: 'Usually because one is a number and the other is text, or there are trailing spaces, lost leading zeros, or hidden prefixes. Clean the key with TRIM and SUBSTITUTE, convert text-numbers with VALUE, and compare amounts with ROUND.',
      },
      {
        q: 'How do I find rows that exist in one file but not the other?',
        a: 'Use XLOOKUP with a MISSING fallback against the other sheet key column, then run it in both directions. Rows returning MISSING exist on only one side.',
      },
      {
        q: 'Is COUNTIF safe for comparing ID columns?',
        a: 'Not for long or number-like IDs. COUNTIF converts number-like text to numbers, compares only 15 significant digits, and treats *, ?, and ~ as wildcards, so different IDs can count as matches. Use XLOOKUP with a not-found value, or an exact count with SUMPRODUCT(--(range=A2)).',
      },
    ],
  },
  {
    slug: 'reconciliation-prompt-pack',
    title: 'A copy-paste reconciliation prompt pack (the directions AI actually needs)',
    description:
      'AI can help you reconcile two files, but only if you hand it very clear directions — which is exactly what most people never do. This is the pack: a sequenced set of copy-paste prompts that walk any capable AI assistant through a reconciliation from file census, to join key, to a deterministic merge, to a classified difference list, to verification. One rule runs through all of them — the model may parse, propose, and explain, but it must never decide whether two numbers are equal; code does the matching and the math. Includes standing-instructions you paste once, a fill-in-your-specifics template, and a downloadable file you can reuse every close.',
    keywords: [
      'reconciliation prompt pack',
      'ai reconciliation prompts',
      'chatgpt reconcile two files prompt',
      'prompt to reconcile csv with ai',
      'copy paste reconciliation prompts',
      'ai prompt for bank reconciliation',
      'how to tell ai to reconcile files',
    ],
    lead: 'The most useful thing anyone says about AI in finance is also the most deflating: it only helps if you tell it exactly what to do. The top-voted reply in an [r/FPandA thread on whether agentic AI actually makes finance teams more effective](https://reddit.com/r/FPandA/comments/1o920tp/are_agentic_ai_tools_really_making_finance_teams/) put it plainly — ["the AI solutions require very clear directions. There is a lot of learning/teaching to be done for the system to answer your questions properly."](https://reddit.com/r/FPandA/comments/1o920tp/are_agentic_ai_tools_really_making_finance_teams/) Right. And almost nobody hands over the directions. So here they are: a copy-paste pack that walks any capable assistant through reconciling two files, in order, with one rule that keeps every number yours to check — the model may parse, propose, and explain, but it never decides whether two numbers are equal. Code does that.',
    blocks: [
      {
        t: 'p',
        text: 'There is no shortage of "use AI to reconcile" advice. What is missing is the actual prompts — the literal text that turns a chatty assistant into a careful one. This is the grab-and-go version. Copy the prompts below in order, swap in your filenames and key, and you have the "very clear directions" that thread was asking for. Then keep them — the same pack works next month.',
      },
      { t: 'h2', text: 'The one rule the whole pack is built on' },
      {
        t: 'p',
        text: 'Every prompt here enforces a single division of labor: the model handles language and judgment, code handles matching and math. The reason is not snobbery about AI — it is that a language model asked to total ten thousand rows will hand you a confident number in the same fluent tone whether it is right or invented. That failure has a name, [hallucination](https://en.wikipedia.org/wiki/Hallucination_%28artificial_intelligence%29), and you cannot catch it by reading the answer. So the matching and the arithmetic live in code the assistant writes and runs in front of you, and the model is left doing the parts it is genuinely good at: proposing a field map, guessing a key, sorting a difference list, explaining a row.',
      },
      {
        t: 'callout',
        kind: 'note',
        text: 'The rule in one sentence: the model may parse, propose, write code, run it, and explain — but it must never be the thing that decides whether two numbers are equal. If a number was not printed by code you can re-run, treat it as decoration.',
      },
      { t: 'h2', text: 'How to use the pack' },
      {
        t: 'ol',
        items: [
          'Paste Prompt 0 once at the top of the chat. It sets the standing rules for the whole session so you are not re-typing them.',
          'Then paste Prompts 1 through 7 in order, one at a time. Read the output of each before pasting the next — the point is to catch a wrong key or a misread column early, not at the end.',
          'Swap the placeholders for your specifics: your two filenames, the join key, and the amount column you are comparing.',
          'Use any assistant that can actually run code in a sandbox. The pack is tool-agnostic; the safety comes from what you ask for, not the brand.',
        ],
      },
      {
        t: 'p',
        text: 'Here is what each prompt produces and the specific trap it heads off — skim it once so the order makes sense.',
      },
      {
        t: 'table',
        head: ['Prompt', 'What it gets you', 'The trap it avoids'],
        rows: [
          ['0 — standing rules', 'A model that refuses to invent numbers for the whole session', 'Re-improvising directions every message, and getting different behavior each time'],
          ['1 — census', 'Column names, row counts, sample rows, a field map', 'Reconciling files the model misread on the way in'],
          ['2 — join key', 'The unique key, confirmed by a distinct count', 'A bad key that silently multiplies or drops rows'],
          ['3 — merge code', 'A short, readable merge you approve before it runs', 'Matching logic you cannot see or re-run'],
          ['4 — real differences', 'Only the nonzero diffs, plus the missing rows', 'A prose summary that hides what actually broke'],
          ['5 — classify', 'Each difference tagged timing / fee / error / missing', 'Doing the tedious sorting by hand'],
          ['6 — explain one', 'A two-sentence cause a reviewer can act on', 'A confident story the numbers do not support'],
          ['7 — verify', 'A row census, file totals, and three traced rows', 'Trusting a result you never checked'],
        ],
      },
      { t: 'h2', text: 'The prompts' },
      {
        t: 'p',
        text: 'These are written to be pasted as-is. The placeholders in angle brackets — `<KEY>`, `<AMOUNT>` — are the only things you change. The full set is also a [single download](/downloads/reconciliation-prompt-pack.md) if you would rather keep it in a file.',
      },
      { t: 'h3', text: 'Prompt 0 — standing instructions (paste once)' },
      {
        t: 'code',
        text: 'You are helping me reconcile two data files. Follow these rules for the\nwhole session:\n- Never state a total, count, or difference unless it was printed by code\n  you just ran. If you didn\'t run code for a number, don\'t give the number.\n- Read all ID/key columns as text. Never let an ID become a float.\n- Do the matching and arithmetic in code (Python/pandas). Use prose only to\n  explain what the code printed.\n- When unsure, stop and ask. Do not guess a key, a mapping, or a number.',
      },
      { t: 'h3', text: 'Prompt 1 — census the files before matching' },
      {
        t: 'p',
        text: 'You are checking the assistant read the files the way you expect. No matching yet. (If it cannot even read them cleanly, that is a [CSV gotcha](/notes/csv-gotchas-encoding-delimiters) to fix before anything else.)',
      },
      {
        t: 'code',
        text: 'Here are two files: system_a.csv and system_b.csv.\nDo NOT reconcile them yet. First, for each file, run code that prints:\n- the column names\n- the row count\n- 3 sample rows\nThen list, side by side, which column in A maps to which column in B. Flag\nany format differences (currency units, date formats, casing). No diffs yet.',
      },
      { t: 'h3', text: 'Prompt 2 — propose the join key (and justify it)' },
      {
        t: 'p',
        text: 'This is the one decision that quietly sinks most reconciliations, so make the model justify it and prove it. It is also where a [composite key](/notes/how-to-reconcile-two-systems-by-hand) gets caught — when no single column is unique on its own.',
      },
      {
        t: 'code',
        text: 'Propose the minimal set of columns that uniquely identifies a row in each\nfile. Explain why a single column is or isn\'t enough. If no single column\nis unique, propose a composite key. Then run code that counts distinct keys\nvs. total rows and prints whether the proposed key is actually unique.\nReason from the column meanings; do not assume.',
      },
      { t: 'h3', text: 'Prompt 3 — write the merge as readable code' },
      {
        t: 'p',
        text: 'Two arguments do the trust work: `indicator=True` tags each row left_only / right_only / both, and `validate="one_to_one"` makes the [pandas merge](https://pandas.pydata.org/docs/reference/api/pandas.merge.html) error out loudly if the key is not unique instead of quietly doubling rows.',
      },
      {
        t: 'code',
        text: 'Write Python (pandas) that:\n- reads both files with every ID column as text (dtype=str)\n- does an OUTER merge on <KEY>, with indicator=True and validate="one_to_one"\n- prints the count of left_only, right_only, and both\nShow me the code first. Don\'t run it until I say go.',
      },
      {
        t: 'p',
        text: 'What you should get back is short enough to read in a minute. If the code it shows you looks much longer than this, ask why:',
      },
      {
        t: 'code',
        text: 'import pandas as pd\n\na = pd.read_csv("system_a.csv", dtype=str)   # keep IDs as text\nb = pd.read_csv("system_b.csv", dtype=str)\n\nmerged = a.merge(\n    b,\n    on="order_id",\n    how="outer",\n    indicator=True,         # tags each row left_only / right_only / both\n    validate="one_to_one",  # raises if the key is not unique on either side\n)\n\nprint(merged["_merge"].value_counts())   # your row-level census',
      },
      { t: 'h3', text: 'Prompt 4 — show only the real differences' },
      {
        t: 'p',
        text: 'The left_only and right_only buckets are the answer, not leftovers — those are the [rows in one file and missing from the other](/notes/reconcile-two-files-in-excel-with-xlookup), which is usually the whole reason you reconciled.',
      },
      {
        t: 'code',
        text: 'Go. After the merge, for rows present in BOTH files, compute the difference\nin the <AMOUNT> column in code. Print ONLY the rows where the difference is\nnonzero, sorted largest-first. Do not summarize the numbers in prose. Also\nprint the full left_only and right_only rows — those are the missing\nrecords, not noise.',
      },
      { t: 'h3', text: 'Prompt 5 — classify the differences' },
      {
        t: 'p',
        text: 'Now the model does what it is actually good at: sorting an already-computed list into categories. Note it is told not to touch the numbers.',
      },
      {
        t: 'code',
        text: 'Here is the list of nonzero differences you just printed. Do NOT change any\nnumbers. For each row, classify the likely cause as one of: timing,\nfee/adjustment, value error, or missing record. Give a one-line reason per\nrow. Flag any you can\'t classify with confidence.',
      },
      { t: 'h3', text: 'Prompt 6 — explain one exception to a human' },
      {
        t: 'p',
        text: 'The model at its best: turning a flagged row into a sentence a reviewer can act on, while being told to flag when the story does not fit the figures.',
      },
      {
        t: 'code',
        text: 'Take row <KEY=...>. Context: <e.g. order placed May 2, refund issued May 9,\nprocessor fee 2.9% + 0.30>. In two sentences, explain the most likely cause\nof the difference for a finance reviewer. If the numbers don\'t support your\nexplanation, say so instead of forcing one.',
      },
      { t: 'h3', text: 'Prompt 7 — verify it did not drop rows' },
      {
        t: 'p',
        text: 'This is the step that separates a number you can defend from a confident guess. Reading IDs as text throughout matters here — a long order number rounded into scientific notation on export is the single most common way a join silently fails. Four cheap checks catch nearly everything:',
      },
      {
        t: 'table',
        head: ['Check', 'What it catches', 'How'],
        rows: [
          ['Row census', 'Rows dropped or duplicated by the join', 'indicator=True, then count left_only / right_only / both and confirm they add up'],
          ['Key is unique', 'A bad join that multiplies rows', 'validate="one_to_one" — it errors instead of guessing'],
          ['Control total', 'Money silently missing', 'Sum the amount column in each file before the merge; the totals must reconcile to your trusted number'],
          ['Spot-check', 'A wrong rule or a misread column', 'Trace three real rows by hand against the output, including one that should not match'],
        ],
      },
      {
        t: 'code',
        text: 'Print three things so I can check your work:\n- the row census again (left_only + right_only + both = total)\n- the sum of <AMOUNT> in each original file, before the merge\n- 3 specific rows traced end to end, including one that should NOT match\nThen I will compare the file totals to a number I already trust.',
      },
      {
        t: 'callout',
        kind: 'warning',
        text: 'Never accept a figure that only appears in the assistant\'s prose. The same prompt can return a different number next time, and a reconciliation has to produce the same result every run on the same data. If you cannot re-run the code that produced it, you do not have a reconciliation — you have a guess in a nicer font.',
      },
      { t: 'h2', text: 'Why "save the directions" matters more than any single prompt' },
      {
        t: 'p',
        text: 'The reason to keep this pack as a file instead of re-improvising each month is not tidiness. Directions you retype from memory come out a little different each time, and a model given different directions can read the same two files differently: a different key, a different column treated as the amount, a different idea of what counts as a match. A reconciliation has to give the same answer on the same data every run. A saved, vetted prompt pack is how you hold the directions still. You write them once, check them once, and stop re-teaching the model from scratch every close. (The formal name for the technique, [prompt engineering](https://en.wikipedia.org/wiki/Prompt_engineering), is just "write down the directions and keep refining them.")',
      },
      { t: 'h2', text: 'Questions to ask before trusting an AI reconciliation' },
      {
        t: 'p',
        text: 'Whether you run this pack yourself or someone hands you a result an AI produced, ask these first:',
      },
      {
        t: 'ol',
        items: [
          'Is the matching done by deterministic code or by the model? (It should be code.)',
          'Does the same input always produce the same output?',
          'Can I see the row-level evidence behind every difference?',
          'Did a human approve the key, the mapping, and the rules?',
          'Where the model classified or explained, can I override it?',
        ],
      },
      { t: 'h2', text: 'When the pack is the wrong tool' },
      {
        t: 'p',
        text: 'Honest limits. This pack shines on the awkward one-off — an odd export, a key you have to reconstruct, a file too messy to wrangle by hand but not worth building a pipeline for. It is not the only answer, and not always the right one.',
      },
      {
        t: 'table',
        head: ['If you are…', 'Reach for', 'Because'],
        rows: [
          ['Reconciling two messy or one-off files', 'This prompt pack + an assistant that runs code', 'The model writes the parsing you would otherwise hand-build'],
          ['Running the same two clean files every week', '[XLOOKUP in Excel](/notes/reconcile-two-files-in-excel-with-xlookup)', 'A stable formula is simpler than re-prompting'],
          ['Reconciling a supported platform monthly', 'A purpose-built parser (A2X, Synder, etc.)', 'It already knows that platform\'s settlement format — but it is locked to the platforms it covers'],
          ['Handing it off entirely', 'A bookkeeper', 'Fine, but you still cannot answer how a number was reached without asking them'],
        ],
      },
      {
        t: 'p',
        text: 'The purpose-built parsers are genuinely good at what they cover; they are also retrospective money-to-ledger tools locked to specific platforms, which is a different job than matching two arbitrary exports. Use whichever fits the file in front of you — the pack is for when nothing off-the-shelf does.',
      },
      {
        t: 'callout',
        kind: 'tip',
        text: 'Free download: the full sequence as one file — [reconciliation-prompt-pack.md](/downloads/reconciliation-prompt-pack.md). Copy it into a notes app or your assistant\'s saved-instructions field, swap in your filenames and key, and reuse it every close. No macros, no signup, nothing to buy.',
      },
      {
        t: 'p',
        text: 'The whole pack is one idea wearing seven prompts: make the assistant show its work in code, and keep yourself as the person who reads it. Do that and you get the speed the demos promise without trusting a number you cannot defend. If the assistant is ever unavailable, the same logic runs as a [by-hand method](/notes/how-to-reconcile-two-systems-by-hand) you control end to end — and either way, a reconciliation you can stand behind is one where you can point at exactly how every number was reached.',
      },
    ],
    faq: [
      {
        q: 'What is a reconciliation prompt pack?',
        a: 'A sequenced set of copy-paste prompts that walk an AI assistant through reconciling two files — from reading the files, to confirming the join key, to running a deterministic merge, to classifying the differences, to verifying nothing was dropped. The point is to hand the model the very clear directions it needs, while keeping every number in code you can re-run rather than in the model\'s prose.',
      },
      {
        q: 'Why not just ask the AI to reconcile the two files?',
        a: 'Because a language model predicts text, so asked for a total over thousands of rows it can return a fluent, confident number that is wrong, and a different one on the next run. The pack avoids this by making the model write and run code for all matching and arithmetic, and using its language only to map fields, propose a key, and explain differences.',
      },
      {
        q: 'Do these prompts work with any AI tool?',
        a: 'Yes, as long as the assistant can actually execute code in a sandbox rather than only chatting. The safety comes from what the prompts ask for — read IDs as text, outer merge, validate the key, print the counts, never state a number code did not produce — not from any one product, so they transfer across capable assistants.',
      },
      {
        q: 'How do I check the AI did not drop or double rows?',
        a: 'Run the verification prompt: print the row census from the merge indicator so left_only, right_only, and both add up to the totals; sum the amount column in each original file and tie it to a number you already trust; and trace three real rows by hand, including one that should not match. If the totals do not tie, the merge changed the data.',
      },
      {
        q: 'Should I save the prompts or rewrite them each time?',
        a: 'Save them. Reusing a vetted pack is what keeps the assistant consistent — re-improvised, one-off instructions are where accuracy tends to drift. Keep the standing-rules prompt and the sequence in a file or your assistant\'s saved-instructions field, and adjust only the filenames, key, and amount column each run.',
      },
    ],
  },
  {
    slug: 'reconcile-shopify-orders-against-your-erp',
    title: 'Reconciling Shopify orders against your ERP: the fields that drift',
    description:
      'A field-by-field guide to matching Shopify orders with an ERP or accounting system — which identifiers to join on, where totals diverge, and how refunds and payouts complicate it.',
    keywords: [
      'shopify reconciliation',
      'shopify erp',
      'ecommerce order reconciliation',
      'shopify accounting',
      'order to cash shopify',
      'shopify payouts',
    ],
    lead: 'Shopify and your ERP both think they know what an order is worth, and they\'re both right — in their own terms. Which is exactly why the totals almost never match on the first pass. Reconciling them isn\'t hard once you know which identifier to trust and which fields are allowed to disagree. Here\'s both.',
    blocks: [
      { t: 'h2', text: 'Which identifier do you join on?' },
      {
        t: 'p',
        text: 'Shopify exposes several identifiers, and choosing the wrong one is the most common reason a reconciliation falls apart before it starts.',
      },
      {
        t: 'table',
        head: ['Identifier', 'What it is', 'Good key?'],
        rows: [
          ['Order name (#1001)', 'The human-facing number', 'Good, but strip the # and watch prefixes'],
          ['Order ID (numeric)', 'Shopify internal ID', 'Best if your ERP stores it'],
          ['Order number', 'Sequence without prefix', 'Usable; confirm it is unique per store'],
          ['Email / customer', 'Identifies a person, not an order', 'Never — one customer, many orders'],
        ],
      },
      {
        t: 'p',
        text: 'Join on whatever the two systems actually share. If your ERP stored Shopify\'s numeric order ID at import (the Id column in the order export), use it — it never changes and has no formatting. If it only kept the order name, [normalize](/notes/how-to-reconcile-two-systems-by-hand) the # and any location prefix on both sides first.',
      },
      { t: 'h2', text: 'Where the totals legitimately diverge' },
      {
        t: 'p',
        text: 'An order total is not one number. Shopify and your [ERP](/notes/netsuite-reconciliation-inventory-and-gl) may each book a different slice, and the differences below are expected, not errors — but only if you account for them explicitly.',
      },
      {
        t: 'ul',
        items: [
          'Taxes. Whether tax is inside or outside the total depends on configuration on both sides.',
          'Shipping. Sometimes a separate line, sometimes folded into the total.',
          'Discounts. Order-level versus line-level discounts can net differently.',
          'Currency rounding. Multi-currency orders round at different points.',
          'Gift cards and store credit. May reduce the Shopify total but appear differently in the ERP.',
        ],
      },
      {
        t: 'callout',
        kind: 'note',
        text: 'Reconcile the components, not just the grand total. Two orders can have matching totals with offsetting errors in tax and shipping — and a matching grand total with wrong parts is a false pass.',
      },
      { t: 'h3', text: 'The component check, per order' },
      {
        t: 'p',
        text: 'Shopify\'s order export gives you the parts as columns: Subtotal, Shipping, Taxes, Discount Amount, Refunded Amount, and Total. Before you build anything on them, check one discounted order by hand: if Subtotal + Shipping + Taxes equals Total, the discount is already inside Subtotal; if it equals Total + Discount Amount, it is not. Then, per order:',
      },
      {
        t: 'code',
        text: 'Expected net (Shopify side), per order\n--------------------------------------\n  Subtotal + Shipping + Taxes\n  - Discount Amount     (only if your Subtotal is before discounts)\n  - Refunded Amount\n\nDifference = ERP order total (net of credits) - Expected net\n\n  |Difference| <= tolerance  -> ok\n  |Difference| >  tolerance  -> compare Subtotal, Shipping, Taxes,\n                                Discount, Refunded one by one to find\n                                the part that disagrees',
      },
      {
        t: 'p',
        text: 'Set the tolerance before you look at the results, not after: a cent or two per order covers rounding on single-currency orders; multi-currency orders need a wider band because each side converts at its own point. Anything over the tolerance gets a component-by-component look, and the part that disagrees tells you which mapping or sync to fix.',
      },
      { t: 'h2', text: 'Refunds, edits, and partial fulfillment' },
      {
        t: 'p',
        text: 'A Shopify order is mutable after creation. It can be edited, partially refunded, partially fulfilled, and refunded again. Each event may or may not flow to the ERP, and on its own schedule. A reconciliation that only looks at order creation will see a clean match and miss that the order was half-refunded yesterday. Compare the current state of both sides, including refund and edit history, not the order as first placed.',
      },
      { t: 'h2', text: 'Payouts are a separate reconciliation' },
      {
        t: 'p',
        text: 'Shopify Payments, or any processor, settles orders into deposits, batched and net of fees. Matching orders to your ERP is one reconciliation; matching [Shopify payouts](https://help.shopify.com/en/manual/payments/shopify-payments/payouts) to your bank is another, with its own key (the payout ID) and its own aggregation, covered in [marketplace payout reconciliation](/notes/marketplace-payout-reconciliation). Keep them separate; conflating order totals with deposit amounts is how teams chase a discrepancy that is just the processor fee.',
      },
      { t: 'h2', text: 'A working sequence' },
      {
        t: 'ol',
        items: [
          'Pick the shared order identifier and normalize it on both sides.',
          'Match orders; resolve one-sided orders first (in Shopify but not ERP, and the reverse).',
          'Compare components — Subtotal, Shipping, Taxes, Discount Amount, Refunded Amount — against the ERP, within a tolerance you set in advance.',
          'Pull in refunds and edits; compare current state, not creation state.',
          'Reconcile payouts to the bank as a separate, batch-level pass.',
        ],
      },
      {
        t: 'p',
        text: 'Run in that order, the Shopify-to-ERP gap resolves into a small set of real differences, and the payout timing noise stays in its own lane where it belongs.',
      },
    ],
    faq: [
      {
        q: 'What field should I use to match Shopify orders to my ERP?',
        a: 'Use whatever both systems store and that uniquely identifies an order — ideally Shopify\'s numeric order ID if your ERP captured it, since it never changes and has no formatting. If only the order name (#1001) is shared, strip the # and any prefix on both sides before matching.',
      },
      {
        q: 'Why do Shopify order totals not match my accounting system?',
        a: 'Because the total is composed of subtotal, tax, shipping, and discounts, and the two systems may book these differently, plus refunds and edits change the order after creation. Reconcile the components and the current state, not just the grand total at order time.',
      },
      {
        q: 'Are Shopify payouts the same as order totals?',
        a: 'No. Payouts are batches of orders settled together, net of processor fees and often on a later date. Reconcile payouts to your bank as a separate pass keyed on the payout ID; do not expect a payout to equal a single order total.',
      },
    ],
  },
  {
    slug: 'netsuite-reconciliation-inventory-and-gl',
    title: 'NetSuite reconciliation: where inventory and the general ledger disagree',
    description:
      'How to reconcile NetSuite against external systems and against itself — matching item records and locations, tracking down why the inventory subledger and the GL drift apart, tying the AR and AP agings to their control accounts with a roll-forward, and checking carrier bills against the rate card.',
    keywords: [
      'netsuite reconciliation',
      'netsuite inventory',
      'subledger gl reconciliation',
      'ar ap reconciliation',
      'aged ar gl control account',
      'three way match accounts payable',
      'netsuite accounting',
      'inventory valuation',
      'erp reconciliation',
    ],
    lead: 'NetSuite reconciliations come in two flavors: NetSuite against an outside system, and NetSuite against itself — when the inventory subledger and the general ledger quietly stop agreeing. The second one is what costs accountants their evenings. The good news: it has a short list of usual suspects, and once you know them, it stops being a mystery.',
    blocks: [
      { t: 'h2', text: 'The two reconciliations people call NetSuite reconciliation' },
      {
        t: 'p',
        text: 'The first is external: matching NetSuite records against a [storefront](/notes/reconcile-shopify-orders-against-your-erp), a 3PL feed, a bank, or another ERP. That is ordinary [two-system reconciliation](/notes/how-to-reconcile-two-systems-by-hand) — pick a shared key, normalize, compare. The second is internal: confirming that NetSuite\'s inventory subledger (what the item records say you hold and what it is worth) ties to the [general ledger](https://en.wikipedia.org/wiki/General_ledger) (what the inventory asset account says). When those drift, the books are wrong even though every individual transaction looks fine.',
      },
      { t: 'h2', text: 'Matching item records across systems' },
      {
        t: 'p',
        text: 'For external reconciliations, the key is usually the item identifier, and NetSuite gives you several.',
      },
      {
        t: 'table',
        head: ['Identifier', 'Notes'],
        rows: [
          ['Internal ID', 'NetSuite\'s own record ID — stable, but rarely stored by other systems'],
          ['Item name/number', 'Human key; watch for hierarchy (Parent : Child) in assembly items'],
          ['UPC / SKU', 'Often the real shared key with storefronts and 3PLs'],
          ['Location', 'Inventory is per location — almost always part of a [composite key](/notes/how-to-reconcile-two-systems-by-hand)'],
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        text: 'NetSuite item names can carry the full hierarchy with a colon separator (Apparel : Shirts : SKU123). Decide whether your other system stores the leaf or the full path, and normalize before matching.',
      },
      { t: 'h2', text: 'Why the subledger and GL drift apart' },
      {
        t: 'p',
        text: 'When NetSuite\'s inventory valuation report does not match the inventory asset account in the GL, the cause is almost always one of a short list.',
      },
      {
        t: 'ul',
        items: [
          'Direct journal entries to the inventory GL account that bypass the item subledger. The GL moved; the items did not.',
          'Transactions posted to the wrong period, so the two reports are effectively as-of different dates.',
          'Inventory adjustments or transfers mid-process — counted on one side, not yet posted on the other.',
          'Costing timing — average-cost recalculations that have not fully propagated.',
          'Items set to the wrong asset account, quietly splitting the balance.',
        ],
      },
      { t: 'h2', text: 'How to track down the gap' },
      {
        t: 'ol',
        items: [
          'Run the inventory valuation report and the GL inventory balance as of the exact same date and time. A date mismatch alone explains most apparent gaps.',
          'Compare totals by location and by item category to localize where the drift lives.',
          'In the suspect slice, list GL transactions against that account and flag any without a corresponding inventory transaction — those are the bypassing journal entries.',
          'Check for transactions dated in the period but entered after the cutoff.',
        ],
      },
      {
        t: 'p',
        text: 'The discipline is the same as any reconciliation: same as-of moment on both sides, then narrow by dimension until the difference is a handful of rows you can name. "The subledger does not match the GL" almost always resolves to a few manual journal entries and a couple of mis-dated transactions.',
      },
      { t: 'h2', text: 'AR and AP: tying the aging to the control account' },
      {
        t: 'p',
        text: 'The same drift hits receivables and payables. The aged AR (or AP) report is the detail behind one GL control account, and the two tie only when every entry reached the control account through the subledger. Each cause below is an entry that took a different path:',
      },
      {
        t: 'table',
        head: ['What happened', 'What you see', 'Where it belongs'],
        rows: [
          ['Manual journal entry posted straight to the AR/AP control account', 'GL control balance moves; no matching invoice or bill in the aging', 'Reverse it and post through the subledger, or move it to the correct account — the control account should not take direct entries'],
          ['Invoice or bill booked into the wrong period', 'Aging as of the cutoff and the GL balance disagree by that document', 'Re-date it to the document date so the period it lands in is correct'],
          ['Payment applied to the wrong customer/vendor or left unapplied', 'Control balance is right; the aging shows the wrong open items', 'Re-apply the payment to the correct invoice; an unapplied receipt sits in a holding account until it is'],
          ['Write-off or credit memo booked on one side only', 'One ledger reflects the adjustment, the other does not', 'Post the matching entry so both move together'],
          ['Foreign-currency revaluation', 'The base-currency control balance revalues; the original-currency aging does not', 'Expected — reconcile in the [transaction currency first](/notes/multi-currency-reconciliation), let the FX fall out separately'],
          ['Duplicate bill entered under a slightly different number', 'AP aging and the GL both overstate by the doubled bill', 'Catch it with a [duplicate test](/notes/fuzzy-matching-records); void the duplicate'],
        ],
      },
      {
        t: 'ol',
        items: [
          'Fix one cutoff date. Run the aged AR (or AP) report and the GL control-account balance as of the exact same date. A different "as of" on each side manufactures a difference that is not real.',
          'Compare the two totals. The aging total should equal the control-account balance. If it does, scan the aging for stale items, but the tie holds.',
          'If they disagree, list the GL entries to the control account that have no match in the subledger. These are the manual journal entries and direct postings — the prime suspects.',
          'List the subledger entries that fall in a different period than the GL. These are the wrong-date postings; re-date them to the document date.',
          'Classify each difference by cause using the table above, and correct it on the side that is wrong — never plug the gap to force a tie.',
          'Keep the reconciliation with the aging report and the GL detail attached, so next close starts from a proven balance.',
        ],
      },
      {
        t: 'p',
        text: 'In a spreadsheet, do not match the GL control-account activity against the open aging: every invoice that was paid during the period shows up in the GL activity and not in the open aging, so it flags as a difference when nothing is wrong. Roll the balance forward instead, and compare its closing figure to the aging total:',
      },
      {
        t: 'code',
        text: 'Control-account roll-forward (same period, same dates)\n------------------------------------------------------\n  Opening balance        (last close, already reconciled)\n+ Invoices / bills posted this period\n- Payments applied this period\n± Credit memos, write-offs, adjustments\n= Closing balance        (must equal the aging total at the cutoff)\n\nIf it does not tie, match each line of the roll-forward to the GL\ncontrol-account activity for the period, keyed on document number.\nGL lines with no subledger document are the direct postings.',
      },
      {
        t: 'callout',
        kind: 'tip',
        text: 'Reconcile by document, not just by total. Two errors in opposite directions — a missing invoice and a duplicate of the same amount — net to zero, so the totals tie while the detail is wrong. Matching invoice by invoice is what surfaces the offsetting pair.',
      },
      { t: 'h3', text: 'Carrier bills need a rate-card check' },
      {
        t: 'p',
        text: 'Tying AP to the GL proves the books are consistent, not that a bill should have been paid. The pre-payment control is the [three-way match](https://www.netsuite.com/portal/resource/articles/accounting/three-way-matching.shtml): the bill against the purchase order and the receipt, keyed on the PO number. For freight it is not enough. A carrier bill can tie to its PO and still charge the wrong rate, accessorial, fuel surcharge, or delivery zone, because the error is usually a correct-looking line at the wrong price, not a missing line. Recompute each charge from the rate card before you approve it.',
      },
      {
        t: 'callout',
        kind: 'warning',
        text: 'A three-way match that "passes" only proves the invoice, PO, and receipt agree with each other — not that the price was right or that the bill is unique. Two controls still have to run alongside it: a rate check on anything priced from a schedule (freight, utilities, usage-based bills), and a duplicate test on vendor, amount, and date.',
      },
      { t: 'h2', text: 'Keep external and internal reconciliations separate' },
      {
        t: 'p',
        text: 'It is tempting to chase a storefront mismatch and a subledger-to-GL gap in the same pass. Do not. They have different keys, different sources of truth, and different fixes. Reconcile NetSuite to the outside world on the item-and-location key; reconcile NetSuite to itself on the as-of-date discipline. Mixing them turns two tractable problems into one intractable one.',
      },
    ],
    faq: [
      {
        q: 'Why does my NetSuite inventory not match the general ledger?',
        a: 'Usually because of direct journal entries to the inventory asset account that bypass the item subledger, transactions posted to the wrong period, or the two reports being run as of different dates. Run both as of the same moment, then narrow by location and item to find the bypassing entries.',
      },
      {
        q: 'What is the best key to reconcile NetSuite items with another system?',
        a: 'The identifier both systems share — often UPC or SKU — combined with location, since inventory is tracked per location. NetSuite internal ID is the most stable key but only works if the other system stored it.',
      },
      {
        q: 'What is the difference between subledger and GL reconciliation in NetSuite?',
        a: 'The subledger is the detailed inventory record from item transactions; the GL is the summarized inventory asset balance. Reconciling them confirms the detail ties to the summary. They drift when entries hit one but not the other, or when periods and dates do not line up.',
      },
      {
        q: 'Why doesn\'t my aged AR report match the AR control account?',
        a: 'Almost always because something hit the control account on a different path than the detail: a manual journal entry posted straight to the control account, an invoice or payment booked into the wrong period, a payment applied to the wrong customer, or a foreign-currency revaluation. Roll the control balance forward from the last reconciled close and compare it to the aging total; the lines that do not tie resolve into those causes.',
      },
    ],
  },
  {
    slug: 'reconcile-your-oms-against-the-source-of-truth',
    title: 'OMS reconciliation: matching order management against the source of truth',
    description:
      'How to reconcile an order management system against the storefront, the ERP, and the warehouse — keeping fulfillment, inventory, and financial truth aligned across an omnichannel operation.',
    keywords: [
      'oms reconciliation',
      'order management system',
      'omnichannel inventory',
      'fulfillment reconciliation',
      'order routing reconciliation',
      'available to promise',
    ],
    lead: 'Your order management system sits in the middle of everything — between the [storefront](/notes/reconcile-shopify-orders-against-your-erp) that takes the order, the warehouses that fill it, and the ERP that books it. That middle seat is exactly why the OMS is where reconciliation breaks: it\'s the one system that has to agree with three others at once. It\'s also the best place to catch a problem before it ships.',
    blocks: [
      { t: 'h2', text: 'What an OMS has to stay reconciled with' },
      {
        t: 'p',
        text: 'An [order management system](https://en.wikipedia.org/wiki/Order_Management_System) ingests orders from sales channels, decides where to fulfill them, tracks inventory across locations, and hands financial outcomes to the ERP. Each of those touch points is a reconciliation surface: orders in versus the channel, inventory versus the warehouses, fulfillments versus what shipped, and financial records versus the ERP. The OMS is correct only when all four agree.',
      },
      {
        t: 'table',
        head: ['Boundary', 'Compare', 'Key'],
        rows: [
          ['Channel to OMS', 'Orders captured vs orders placed', 'Channel order ID'],
          ['OMS to warehouse/3PL', 'Allocations vs actual fulfillments', 'Order + line + location'],
          ['OMS inventory to feeds', 'On-hand vs warehouse counts', 'SKU + facility'],
          ['OMS to ERP', 'Sales/returns vs booked financials', 'Order ID / invoice ID'],
        ],
      },
      { t: 'h2', text: 'Order intake: did every order arrive?' },
      {
        t: 'p',
        text: 'The first reconciliation is the simplest and the most important: every order placed on a channel should appear in the OMS, once. Join channel orders to OMS orders on the channel order ID. One-sided differences mean an order failed to import (revenue at risk) or was duplicated (oversell and double-ship risk). Run this frequently; an order missing from the OMS is invisible to fulfillment until someone complains.',
      },
      {
        t: 'code',
        text: 'Check 1: count and total, per channel, per hour\n-----------------------------------------------\nFor each channel and each hour (by order created time, same time zone on both sides):\n  channel: count(orders), sum(order total)\n  OMS:     count(orders), sum(order total)\n\n  counts differ           -> orders dropped or duplicated in that hour\n  counts equal, sums not  -> an order imported with the wrong amount\n\nCheck 2: anti-join on channel order ID, both directions\n-------------------------------------------------------\n  in channel, not in OMS  -> failed imports (name them)\n  in OMS, not in channel  -> test orders, or orders cancelled at source\n  OMS rows > distinct IDs -> duplicate imports',
      },
      {
        t: 'p',
        text: 'Check 1 is cheap enough to run every hour and tells you which hour to look at; check 2 names the exact orders. Leave the most recent hour out of both, since orders still in flight will show as missing.',
      },
      { t: 'h2', text: 'Inventory: the hardest one to keep honest' },
      {
        t: 'p',
        text: 'An OMS maintains a view of available-to-promise inventory aggregated across facilities, while each warehouse or 3PL holds the physical truth. These drift constantly — every sale, receipt, adjustment, and transfer is a chance for the OMS view and a facility feed to disagree. Reconcile on SKU plus facility, because an aggregate match can hide offsetting errors: the OMS total looks right while two locations are individually wrong in opposite directions.',
      },
      {
        t: 'callout',
        kind: 'warning',
        text: 'Never reconcile omnichannel inventory on SKU alone. The OMS\'s job is knowing where stock is, so a per-facility comparison is the only one that catches the errors that cause mis-routed and cancelled orders.',
      },
      {
        t: 'p',
        text: 'The check: take an on-hand snapshot from each facility feed and from the OMS at the same moment, join on SKU + facility, and list every pair where OMS on-hand minus facility on-hand is not zero. Also list SKU + facility pairs that exist on only one side; a location the OMS does not know about is stock it can never promise. Snapshots taken at different times will differ by whatever sold in between, so line up the timestamps before you read the differences.',
      },
      { t: 'h2', text: 'Fulfillment: allocated is not shipped' },
      {
        t: 'p',
        text: 'The OMS decides which location should fill each line; the location then does, or does not, exactly that. Reconciling allocations against actual fulfillments — on order, line, and location — surfaces split shipments that were not recorded, reassignments the OMS did not hear about, and lines marked fulfilled that never shipped. This boundary is where customer-facing failures hide, because the OMS can believe an order is complete while a line sits unshipped.',
      },
      {
        t: 'p',
        text: 'The check is an allocated-versus-shipped report, joined on order + line + facility against the warehouse or 3PL shipment records: lines allocated to a facility longer ago than your shipping promise with no shipment from that facility; lines the OMS marks fulfilled with no shipment record or tracking number behind them; and shipments from a facility other than the one the OMS allocated, which are the reassignments it never heard about.',
      },
      { t: 'h2', text: 'Financial handoff: orders to the ERP' },
      {
        t: 'p',
        text: 'Finally, what the OMS recorded as sold, shipped, and returned must match what the [ERP booked](/notes/netsuite-reconciliation-inventory-and-gl). This is the order-to-cash boundary again, keyed on order or invoice ID, and it is where returns are most likely to fall through — a return processed in the OMS but never credited in the ERP, or the reverse. Reconcile current state including returns, not just original orders. The returns check: list every return the OMS completed in the period, anti-join it against the ERP\'s credit memos or refunds on return ID (or order ID where the ERP keeps no return ID), and compare the amounts on the pairs that match. Returns with no credit are customers waiting for money; credits with no OMS return are refunds issued outside the return flow.',
      },
      { t: 'h2', text: 'Why the OMS is the reconciliation hub' },
      {
        t: 'p',
        text: 'Because the OMS touches the channel, the warehouse, and the ERP, it is both where discrepancies surface and where they are cheapest to catch — before a mis-routed order ships, before an oversell becomes a cancellation, before a return goes uncredited. Reconciling the OMS against its three neighbors, each on its proper [composite key](/notes/how-to-reconcile-two-systems-by-hand), is what keeps an omnichannel operation honest in the one system positioned to see all of it.',
      },
    ],
    faq: [
      {
        q: 'What does an order management system need to be reconciled against?',
        a: 'Four boundaries: the sales channels (every order imported once), the warehouses or 3PLs (allocated lines actually shipped), the facility inventory feeds (on-hand per SKU and facility), and the ERP (sales, returns, and credits booked). The OMS is correct only when it agrees with all of them.',
      },
      {
        q: 'Why reconcile omnichannel inventory per facility instead of per SKU?',
        a: 'Because an OMS\'s purpose is knowing where stock is. A SKU-level total can match while individual locations are wrong in offsetting directions, which still causes mis-routed and cancelled orders. Reconciling on SKU plus facility catches those.',
      },
      {
        q: 'Where do OMS reconciliations most often fail?',
        a: 'At fulfillment (the OMS believes a line shipped when it did not, or missed a split shipment) and at the ERP handoff for returns (processed on one side, never credited on the other). Both require comparing current state, including returns, not the order as first placed.',
      },
    ],
  },
]

const bySlug: Record<string, Article> = Object.fromEntries(
  articles.map((a) => [a.slug, a]),
)

export function getArticle(slug: string): Article | undefined {
  return bySlug[slug]
}

export { articles }
