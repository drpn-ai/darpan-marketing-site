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
    slug: 'the-complete-guide-to-data-reconciliation',
    title: 'The complete guide to data reconciliation',
    description:
      'Data reconciliation is proving that two independent records of the same thing agree — and explaining every place they do not. The concepts, the method, and where each approach tops out.',
    keywords: [
      'data reconciliation',
      'what is reconciliation',
      'reconciliation guide',
      'account reconciliation',
      'how to reconcile data',
      'reconciliation process',
    ],
    lead: 'Data reconciliation is the practice of proving that two independent records of the same thing agree — and, where they do not, explaining why. This guide is the map for the rest of the library: what reconciliation actually is, the handful of concepts every reconciliation rests on, the method that stays the same whether you work by hand or at scale, and an honest read on where each approach — manual, spreadsheet, AI — runs out. Read it top to bottom, or jump to the piece you need.',
    blocks: [
      { t: 'h2', text: 'What is data reconciliation?' },
      {
        t: 'p',
        text: 'Reconciliation is the act of comparing two records of the same events — two systems, two files, a ledger and a bank statement — and resolving them to a single agreed picture. The output is not a yes-or-no. It is a classified list: rows that agree, rows that exist on one side only, and rows that exist on both but disagree on a value. Every difference gets a reason and a next action. A comparison that only tells you the totals do not match is not yet a reconciliation; it is the first ten seconds of one.',
      },
      {
        t: 'p',
        text: 'The shape is the same everywhere it shows up. Matching orders to payments, inventory to a warehouse feed, a subledger to the general ledger, a storefront to an ERP — all of it is the same underlying job wearing different clothes. Learn the job once and every specific scenario becomes a variation.',
      },
      { t: 'h2', text: 'Why does reconciliation feel like it is never "done"?' },
      {
        t: 'p',
        text: 'Because most people reconcile by chasing symptoms instead of sorting causes. They re-run an auto-match that "works maybe 60% of the time," re-key the leftovers, and find the same exceptions waiting next month. The thing that makes a reconciliation closeable is classification: knowing which differences are real errors, which are expected timing lag, and which are just the data being messy. Without that, the work never converges — you are re-deciding the same rows every period.',
      },
      {
        t: 'quote',
        text: 'I am finding that even for straightforward small business clients, I am spending 2 to 4 hours per month just on reconciliation. QB auto-match works maybe 60% of the time; descriptions do not line up.',
      },
      {
        t: 'p',
        text: 'That frustration is the most common one operators voice publicly, and it is almost always a process problem, not an effort problem. The fix is not working harder through the exceptions; it is having a method that names each difference so it stops coming back.',
      },
      { t: 'h2', text: 'The vocabulary: the ideas every reconciliation rests on' },
      {
        t: 'p',
        text: 'A few concepts carry the entire practice. Each has its own deep-dive in the Foundations track; here is the map of how they fit together.',
      },
      {
        t: 'table',
        head: ['Concept', 'What it answers', 'Where it bites if you skip it'],
        rows: [
          ['Primary ID', 'What counts as the same row in both systems', 'A wrong key makes every later number suspect'],
          ['Schema', 'What each field is and means before you compare', 'Dates and amounts compare as text and never match'],
          ['Difference taxonomy', 'What kind of difference this is, and the action it needs', 'A pile of flags with no decisions attached'],
          ['Two-way vs three-way', 'How many sources must agree (orders, processor, bank)', 'Chasing a "gap" that is really a processor fee'],
          ['The cost of variance', 'Why a small unseen difference matters', 'Margin and inventory decisions made on wrong numbers'],
        ],
      },
      {
        t: 'p',
        text: 'If you read only two before starting, read the primary-ID piece and the difference-taxonomy piece. The first decides whether your comparison is even valid; the second is what turns its output into a short, real list instead of a thousand undifferentiated flags.',
      },
      { t: 'h2', text: 'The universal method: the same five steps every time' },
      {
        t: 'p',
        text: 'Whether you do this in your head, in a workbook, or with a tool, the method does not change. The manual-method guide walks each step in detail; this is the spine.',
      },
      {
        t: 'ol',
        items: [
          'Choose the primary ID — the field, or combination of fields, that identifies the same record on both sides. Validate that it is unique and present on both before trusting it.',
          'Normalize both sides — trim whitespace, fix casing, strip prefixes, standardize dates to one format, convert amounts to one unit. Clean the key first, then the values.',
          'Match on the key — every row now lands in one of three buckets: matched on both sides, present only in A, present only in B. The one-sided rows are your first findings.',
          'Compare the matched pairs — for rows that matched, check the fields that matter (amount, quantity, status) and record both values so a difference is visible, not just flagged.',
          'Classify and decide — sort every difference by cause and assign an action. This step is what makes the result closeable.',
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        text: 'A green "MATCHED" is not the same as agreement. A run can report everything matched while duplicates and missing rows hide underneath a bad key. A run that finishes with zero differences and a run with zero matches look identical at a glance and mean opposite things — always check the key before you celebrate.',
      },
      { t: 'h2', text: 'How do you know which method to use?' },
      {
        t: 'p',
        text: 'There is no single right tool — there is a ladder, and each rung tops out somewhere. The honest question is not "what is best" but "where does my current rung stop holding the weight." Every scenario guide in this library climbs the same ladder and says where each rung ends.',
      },
      {
        t: 'table',
        head: ['Method', 'Best for', 'Where it tops out'],
        rows: [
          ['By hand', 'Learning the method; one-off checks', 'Repetition, volume, more than one reviewer'],
          ['Spreadsheet', 'Two files, a known key, a person who trusts the workbook', 'Three-plus sources, composite keys, audit by others'],
          ['AI-assisted', 'Mapping fields, suggesting keys, classifying and explaining', 'Doing the arithmetic — that must stay deterministic'],
          ['Fully automated', 'The same comparison every week, audit trail required', 'Setup cost; needs the method defined first'],
        ],
      },
      {
        t: 'p',
        text: 'Notice the AI row. A model is genuinely useful for the judgment-and-language work at the edges — proposing a mapping, spotting a composite key, sorting differences, drafting the explanation a human reviews. It is not the thing that should decide whether two numbers are equal. Keep the matching and math in code that returns the same answer every time, and AI makes you faster without ever being the source of the number.',
      },
      { t: 'h2', text: 'Why do two systems not just agree in the first place?' },
      {
        t: 'p',
        text: 'Because they were never designed to. A growing operation runs on five to ten systems that each hold a slice of the transaction and none of which talk natively to the others. A single order can split across the storefront, the payment processor, the bank settlement, and the fee line — with no shared transaction ID tying them together. A "sync" moves data between two of them; it does not prove they still agree afterward. That gap between moved and verified is exactly what reconciliation exists to close, and why it never fully disappears as long as the systems are independent.',
      },
      { t: 'h2', text: 'A reading path through this library' },
      {
        t: 'p',
        text: 'If you want a curriculum rather than a single page, work the tracks in this order:',
      },
      {
        t: 'ol',
        items: [
          'Foundations — start with what a primary ID is and why variance you cannot see still costs you, then schemas, the difference taxonomy, and two-way vs three-way reconciliation.',
          'By hand — the repeatable manual method, so you understand what any tool is doing on your behalf.',
          'In a spreadsheet — matching two files with XLOOKUP and finding set differences with COUNTIF and MATCH.',
          'With AI — prompting patterns that keep a model on mapping and explanation, and an honest look at what an AI agent can and cannot reconcile.',
          'By system — the scenario guides: Shopify against your ERP, NetSuite inventory and the GL, your OMS against the source of truth.',
        ],
      },
      {
        t: 'p',
        text: 'Wherever you start, the test for every page is the same: you should leave able to do something today that you could not do an hour ago. If a method here ever stops scaling for you, that is not a failure of the method — it is the signal to move one rung up the ladder.',
      },
    ],
    faq: [
      {
        q: 'What is data reconciliation, in plain terms?',
        a: 'It is comparing two independent records of the same events and resolving them to one agreed picture — confirming the rows that match, finding the rows present on only one side, and explaining the rows that match but disagree on a value. The useful output is a classified list of differences with an action for each, not just a pass or fail.',
      },
      {
        q: 'Why does bank reconciliation feel like it is never truly done?',
        a: 'Usually because the process flags differences without sorting them by cause, so the same exceptions return every period. Reconciling once a month against a defined method, setting up matching rules, and classifying each difference as real, timing, or data-quality is what lets the work actually converge instead of repeating.',
      },
      {
        q: 'How long should reconciliation take?',
        a: 'It varies with volume and number of systems, but spending several hours every month on a simple account usually points to a process gap — typically a weak matching key or no classification step — rather than to the work being inherently that large. Tightening the key and normalizing inputs first removes most of the manual time.',
      },
      {
        q: 'Do I need software to reconcile, or can I do it in a spreadsheet?',
        a: 'For two files with a clean shared key, a spreadsheet is genuinely enough. You outgrow it when there are three or more sources, the key is composite, the same comparison runs every week, or other people need to audit how a number was reached — at which point a repeatable, auditable process beats a workbook someone rebuilds each month.',
      },
      {
        q: 'What is the difference between a sync and a reconciliation?',
        a: 'A sync moves data from one system to another. A reconciliation proves the two systems still agree after the fact. A sync can run successfully and still leave quantities or totals disagreeing, which is why "everything synced" is not the same as "everything matches."',
      },
    ],
  },
  {
    slug: 'what-we-mean-when-we-say-primary-id',
    title: 'What a primary ID is, and why every reconciliation depends on it',
    description:
      'A primary ID is the shared key that lets two systems agree they are talking about the same record. How to choose one, and what breaks when you do not.',
    keywords: [
      'primary id',
      'reconciliation key',
      'matching key',
      'join key',
      'record matching',
      'data reconciliation',
    ],
    lead: 'Before you can compare two systems, you have to agree on what counts as the same row. That agreement is the primary ID: the field, or combination of fields, that uniquely identifies a record in both systems. Get it right and reconciliation is arithmetic. Get it wrong and every number downstream is suspect.',
    blocks: [
      { t: 'h2', text: 'What is a primary ID in reconciliation?' },
      {
        t: 'p',
        text: 'A primary ID is the value you use to match a record in one system against the corresponding record in another. In a sales reconciliation it might be the order number; in inventory it might be SKU plus location; in a bank reconciliation it might be a transaction reference. The only requirement is that it means the same thing on both sides and points to exactly one record on each.',
      },
      {
        t: 'p',
        text: 'This is different from a database primary key. A database primary key is unique within one system. A reconciliation primary ID has to be unique and shared across two systems that were never designed to agree.',
      },
      { t: 'h2', text: 'What makes a good primary ID?' },
      {
        t: 'ul',
        items: [
          'Unique on both sides. One value points to at most one record in each system. If `order_id` appears twice in the export, it is not yet a usable key.',
          'Stable over time. The value does not change after the record is created. Status fields and computed totals make poor keys.',
          'Present in both systems. A perfect key that only one side records cannot match anything.',
          'Same format on both sides, or normalizable to it. `1001`, `#1001`, and `ORD-1001` are the same order to a human and three different keys to a computer.',
        ],
      },
      { t: 'h2', text: 'When one field is not enough: composite keys' },
      {
        t: 'p',
        text: 'Many retail records are only unique in combination. A single SKU is not unique across warehouses; a SKU is unique per location. A line item is unique per order plus line number. When no single field identifies a row, you build a composite key by concatenating fields in a fixed order, for example `sku | location_id`.',
      },
      {
        t: 'callout',
        kind: 'tip',
        text: 'Decide the separator and field order once, and apply it identically on both sides. `sku|loc` and `loc|sku` will never match, even with identical data.',
      },
      { t: 'h2', text: 'What breaks when the primary ID is wrong' },
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
      { t: 'h2', text: 'How to validate a primary ID before you trust it' },
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
        t: 'p',
        text: 'The discipline is simple: prove the key is unique and shared before you compare a single value. Reconciliation done on a bad key produces confident, wrong answers.',
      },
    ],
    faq: [
      {
        q: 'What is the difference between a primary key and a primary ID?',
        a: 'A database primary key guarantees uniqueness inside one system. A reconciliation primary ID is the value you use to match records across two systems. A primary key can serve as a primary ID only if both systems store the same value.',
      },
      {
        q: 'Can a primary ID be more than one field?',
        a: 'Yes. When no single field is unique, you combine fields into a composite key — for example SKU plus location, or order number plus line number — joined in a fixed order with a consistent separator.',
      },
      {
        q: 'Why does my reconciliation show everything as a mismatch?',
        a: 'Most often the key formats differ between systems: leading zeros, prefixes like ORD-, casing, or a text value on one side and a number on the other. Normalize both sides to the same format and re-run before assuming the data itself is wrong.',
      },
    ],
  },
  {
    slug: 'schemas-explained-describe-your-data',
    title: 'Schemas, explained: describing your data before you compare it',
    description:
      'A schema is the agreed shape of a data source — its fields, types, and meaning. Defining one before reconciliation turns a messy export into something you can compare reliably.',
    keywords: [
      'data schema',
      'schema definition',
      'data mapping',
      'field mapping',
      'csv schema',
      'json schema',
    ],
    lead: 'Two CSVs that look alike to a person can be wildly different to a computer: one stores dates as 2026-05-30, the other as 30/05/2026; one calls it qty, the other Quantity. A schema is where you write down what each source actually contains, so the comparison step has stable ground to stand on.',
    blocks: [
      { t: 'h2', text: 'What is a data schema?' },
      {
        t: 'p',
        text: 'A schema is a description of a data source structure: the fields it contains, the type of each field (text, number, date, boolean), and what each field means. It is the contract between a messy source file and the logic that reads it. With a schema, your tooling knows `total` is a number to be compared numerically, not text to be matched character by character.',
      },
      { t: 'h2', text: 'Why define a schema before reconciling?' },
      {
        t: 'ul',
        items: [
          'Field names get stable. `Qty`, `qty`, and `Quantity` all map to one logical field, so downstream logic stops caring which export it came from.',
          'Types get enforced. The text 1,000 and the number 1000 compare as equal instead of unequal strings.',
          'Dates and currencies normalize. One place decides that all dates become ISO YYYY-MM-DD and all amounts become a number of cents.',
          'Missing or extra columns surface early, before they corrupt a run.',
        ],
      },
      { t: 'h2', text: 'The parts of a schema' },
      {
        t: 'table',
        head: ['Element', 'What it captures', 'Example'],
        rows: [
          ['Field name', 'The logical name used everywhere downstream', '`order_id`'],
          ['Source label', 'What the field is actually called in the file', 'Order #'],
          ['Type', 'How to parse and compare the value', 'number, text, date'],
          ['Format', 'How to read the raw value', 'date DD/MM/YYYY'],
          ['Required', 'Whether a row is valid without it', 'true / false'],
        ],
      },
      { t: 'h2', text: 'Schema-on-write versus schema-on-read' },
      {
        t: 'p',
        text: 'Some systems enforce a schema when data is written (a database table). Reconciliation usually works the other way: the file already exists, and you apply a schema on read. That means your schema main job is translation — mapping whatever the source actually produced onto the clean field names and types your comparison expects.',
      },
      {
        t: 'callout',
        kind: 'warning',
        text: 'Source exports change without warning. A vendor renames `Qty` to `Quantity`, adds a column, or switches date formats. A schema localizes that breakage to one mapping instead of every formula and rule that touches the data.',
      },
      { t: 'h2', text: 'How to build a schema from a sample file' },
      {
        t: 'ol',
        items: [
          'List every column in the source export exactly as it appears.',
          'For each, decide the logical field name you want to use downstream.',
          'Assign a type and, where needed, a format (date pattern, decimal separator).',
          'Mark which fields are required for a row to be usable.',
          'Identify which field or combination is the primary ID.',
        ],
      },
      {
        t: 'p',
        text: 'A schema and a primary ID work together: the schema gives every field a stable name and type, and the primary ID names which of those fields identifies the row. Define the schema first; choosing the key is much easier once the fields are clean.',
      },
    ],
    faq: [
      {
        q: 'What is the difference between a schema and a mapping?',
        a: 'A schema describes one source shape — its fields and types. A mapping connects fields across two sources so they can be compared. You usually define a schema per source, then map equivalent fields between them.',
      },
      {
        q: 'Do I need a schema for CSV files?',
        a: 'CSV carries no type information — every value is text. A schema is what tells your tooling that a column is a date or a number, which is exactly what you need for a reliable comparison. JSON carries some types but still benefits from an explicit schema for naming and required-field rules.',
      },
      {
        q: 'What happens if the source file changes its columns?',
        a: 'With a schema, you update one mapping and everything downstream keeps working. Without one, every formula, lookup, and rule that referenced the old column breaks individually.',
      },
    ],
  },
  {
    slug: 'a-taxonomy-of-reconciliation-differences',
    title: 'A taxonomy of reconciliation differences (and what to do with each)',
    description:
      'Not all reconciliation differences mean the same thing. A practical taxonomy — missing, value, timing, mapping, and data-quality differences — with the right action for each.',
    keywords: [
      'reconciliation differences',
      'variance types',
      'discrepancy classification',
      'timing difference',
      'data quality',
      'reconciliation taxonomy',
    ],
    lead: 'A reconciliation that just flags 1,240 differences is barely more useful than no reconciliation at all. The value is in the classification: knowing which differences are errors, which are expected, and which are just the data being messy. Here is the taxonomy that turns a flag into an action.',
    blocks: [
      { t: 'h2', text: 'Why classification is the real output' },
      {
        t: 'p',
        text: 'Finding that two systems disagree is the easy part; any comparison does that. The work that makes reconciliation useful is sorting the disagreements by cause, because the cause determines the action. A timing difference and a value error look identical in a raw diff and demand opposite responses — wait versus fix. A good reconciliation hands you categories, not just counts.',
      },
      { t: 'h2', text: 'The five kinds of difference' },
      { t: 'h3', text: '1. Missing records (one-sided)' },
      {
        t: 'p',
        text: 'A record exists on one side and not the other. Something was created in one system and never propagated, or was deleted on one side only. Action: find out which, then create, void, or resync. These are usually the highest-signal differences — a missing order or a missing payment is rarely benign.',
      },
      { t: 'h3', text: '2. Value mismatches' },
      {
        t: 'p',
        text: 'The record matched on the key but a field disagrees — different amount, quantity, or status. Action: determine which side is correct and correct the other. Value mismatches are where you most need the row-level evidence, both values side by side, to decide.',
      },
      { t: 'h3', text: '3. Timing differences' },
      {
        t: 'p',
        text: 'The same real event recorded in different periods because of lag — a sale that settles the next day, a transfer in flight. Action: recognize it and expect it to clear; do not fix it. The skill is telling a timing difference apart from a real one, usually by checking whether it resolves in the next period.',
      },
      { t: 'h3', text: '4. Mapping differences' },
      {
        t: 'p',
        text: 'Not a data problem at all — the two systems describe the same thing differently. One uses cents, the other dollars; one splits a name the other keeps whole; statuses use different vocabularies. Action: fix the schema or mapping, not the data. These masquerade as value mismatches until you notice every row is off by the same factor.',
      },
      { t: 'h3', text: '5. Data-quality differences' },
      {
        t: 'p',
        text: 'Whitespace, casing, encoding, duplicate keys, truncated values. Action: normalize. Like mapping differences, these are upstream of the real comparison and will manufacture false positives across the whole dataset until cleaned.',
      },
      {
        t: 'table',
        head: ['Type', 'Root cause', 'Action', 'Recoverable later?'],
        rows: [
          ['Missing record', 'Sync gap', 'Investigate, create or void', 'Often no'],
          ['Value mismatch', 'Real disagreement', 'Correct wrong side', 'Sometimes'],
          ['Timing', 'Settlement lag', 'Wait, expect to clear', 'N/A — expected'],
          ['Mapping', 'Schema mismatch', 'Fix mapping', 'Yes'],
          ['Data quality', 'Dirty input', 'Normalize', 'Yes'],
        ],
      },
      {
        t: 'callout',
        kind: 'tip',
        text: 'Resolve mapping and data-quality differences first. They are not findings, they are noise, and clearing them often makes a thousand differences collapse to the few dozen that actually matter.',
      },
      { t: 'h2', text: 'The order to work them in' },
      {
        t: 'ol',
        items: [
          'Normalize data-quality issues so the comparison is honest.',
          'Fix mapping differences so equal things compare as equal.',
          'Triage the remaining real differences: missing, value, timing.',
          'Quarantine timing differences and confirm they clear next period.',
          'Resolve the missing and value differences — those are the actual work.',
        ],
      },
      {
        t: 'p',
        text: 'Worked in this order, the count drops at every step, and what is left is a short, real list. A reconciliation that cannot tell you which category a difference belongs to is making you do this sorting in your head, every time.',
      },
    ],
    faq: [
      {
        q: 'What are the main types of reconciliation differences?',
        a: 'Five: missing records (present on one side only), value mismatches (matched but a field differs), timing differences (same event, different period), mapping differences (systems describe data differently), and data-quality differences (dirty input). Each has a distinct correct action.',
      },
      {
        q: 'How do you tell a timing difference from an error?',
        a: 'A timing difference clears on its own in the next period as the lagging system catches up; a real error does not. Near period boundaries, quarantine suspected timing differences and confirm they resolve before treating them as discrepancies.',
      },
      {
        q: 'Why do all my rows differ by the same amount?',
        a: 'That is a mapping difference, not a data error — typically one system stores cents and the other dollars, or applies a consistent format difference. Fix the schema or mapping rather than correcting individual rows.',
      },
    ],
  },
  {
    slug: 'how-to-reconcile-two-systems-by-hand',
    title: 'How to reconcile two systems by hand: a repeatable method',
    description:
      'A step-by-step manual reconciliation method that works for any two data sources — choose a key, normalize, match, classify differences, and keep the evidence.',
    keywords: [
      'manual reconciliation',
      'how to reconcile data',
      'reconciliation process',
      'data matching',
      'reconciliation steps',
      'account reconciliation',
    ],
    lead: 'Reconciliation has a reputation as tedious detective work, but the method underneath it is the same every time, whether you are matching orders to payments or inventory to a warehouse feed. This is that method, written so you can run it by hand and know exactly where you are.',
    blocks: [
      { t: 'h2', text: 'What does it mean to reconcile two systems?' },
      {
        t: 'p',
        text: 'To reconcile is to prove that two independent records of the same thing agree — and, where they do not, to explain why. The output is not just match or no match. It is a classified list: rows that agree, rows that exist on one side only, and rows that exist on both but disagree on a value. Each difference has a reason and a next action.',
      },
      { t: 'h2', text: 'The five steps' },
      { t: 'h3', text: '1. Choose the primary ID' },
      {
        t: 'p',
        text: 'Decide the field, or combination of fields, that identifies the same record on both sides. This is the single most important decision; a wrong key makes every later step meaningless.',
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
        text: 'The manual method is the right way to learn reconciliation and the right tool for a one-off. It stops scaling when the same comparison runs every week, when datasets grow past what a spreadsheet handles comfortably, or when more than one person needs to trust the result. At that point you want the steps preserved as a repeatable, auditable process rather than a workbook someone rebuilds each month.',
      },
    ],
    faq: [
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
    slug: 'two-way-vs-three-way-reconciliation',
    title: 'Two-way vs three-way reconciliation: orders, payments, and the bank',
    description:
      'What two-way and three-way reconciliation mean, when each applies, and how retail order-to-cash reconciliation chains orders, payment processors, and bank deposits together.',
    keywords: [
      'three-way reconciliation',
      'two-way reconciliation',
      'order to cash',
      'payment reconciliation',
      'bank reconciliation',
      'retail finance reconciliation',
    ],
    lead: 'Reconcile the payments sounds like one task. In retail it is usually a chain: the order says one thing, the processor says another, the bank deposit says a third, and the truth lives in whether all three agree. Knowing whether you are doing a two-way or three-way reconciliation tells you how many places a dollar can hide.',
    blocks: [
      { t: 'h2', text: 'What is two-way reconciliation?' },
      {
        t: 'p',
        text: 'Two-way reconciliation compares two sources that should agree about the same set of records — your order system against your payment processor, for example. Each order should have a matching charge; each charge should trace to an order. Differences fall into the familiar buckets: orders with no charge, charges with no order, and amounts that disagree.',
      },
      { t: 'h2', text: 'What is three-way reconciliation?' },
      {
        t: 'p',
        text: 'Three-way reconciliation adds a third source that must agree with the other two. The classic finance example is purchasing: purchase order, goods receipt, and supplier invoice all have to line up before payment. The retail order-to-cash version is the order, the processor settlement, and the bank deposit. A charge can succeed at the processor and still not land in the bank on the day or in the amount you expect, because of fees, batching, holds, and timing.',
      },
      {
        t: 'table',
        head: ['Reconciliation', 'Sources', 'The question it answers'],
        rows: [
          ['Two-way', 'Orders and processor', 'Did every sale get charged, at the right amount?'],
          ['Two-way', 'Processor and bank', 'Did every settlement reach the account?'],
          ['Three-way', 'Orders, processor, bank', 'Did the sale, the charge, and the cash all agree?'],
        ],
      },
      { t: 'h2', text: 'Why three-way is harder than two two-ways' },
      {
        t: 'p',
        text: 'You might think a three-way reconciliation is just two two-way ones stacked. It usually is not, because the three sources rarely share one key. The order system keys on order number; the processor keys on its own charge ID; the bank keys on a deposit reference that bundles many charges into one line. Reconciling them means bridging keys — mapping order numbers to charge IDs, then aggregating charges into the deposit batch the bank actually shows.',
      },
      { t: 'h3', text: 'The aggregation problem' },
      {
        t: 'p',
        text: 'A bank deposit of 4,812.66 is not one sale; it is a day of charges minus fees, settled together. To reconcile it you have to group the processor individual transactions into the same batch the bank settled, subtract the processor fees, and only then compare to the deposit. Row-to-row matching does not work when one side is a sum of the other.',
      },
      {
        t: 'callout',
        kind: 'note',
        text: 'Fees are where three-way reconciliations most often fail when nothing is actually wrong. Account for the processor cut explicitly, or every deposit will look short by exactly the fee.',
      },
      { t: 'h2', text: 'Timing differences are expected, not errors' },
      {
        t: 'p',
        text: 'A sale on Friday may settle Saturday and deposit Monday. Across a period boundary that looks like a missing deposit, then a surprise one. These are timing differences, not discrepancies — the correct treatment is to recognize them, expect them to clear in the next period, and not fix them. Distinguishing a timing difference from a real loss is most of the skill in payment reconciliation.',
      },
      { t: 'h2', text: 'A practical order of operations' },
      {
        t: 'ol',
        items: [
          'Reconcile orders to the processor first, on the order and charge key. Resolve missing and mismatched charges.',
          'Group processor transactions into settlement batches; subtract fees.',
          'Reconcile each batch to the matching bank deposit.',
          'Quarantine timing differences near period boundaries and confirm they clear.',
        ],
      },
      {
        t: 'p',
        text: 'Done in that order, a three-way reconciliation stays tractable: each step has one key and one question, and the hard part — aggregation and fees — is isolated to the middle.',
      },
    ],
    faq: [
      {
        q: 'What is the difference between two-way and three-way reconciliation?',
        a: 'Two-way reconciliation compares two sources that should agree, such as orders and payments. Three-way adds a third that must also agree — classically purchase order, receipt, and invoice; in retail, order, processor settlement, and bank deposit.',
      },
      {
        q: 'Why does my bank deposit not match my sales total?',
        a: 'Because the deposit is a batch of charges settled together, minus processor fees, and often on a different day than the sale. Group transactions into the settlement batch, subtract fees, and account for timing before comparing to the deposit.',
      },
      {
        q: 'What is a timing difference in reconciliation?',
        a: 'A real, matching transaction that appears in the two sources in different periods because of settlement or deposit delay. It is expected and should clear in the next period, unlike a true discrepancy that needs correction.',
      },
    ],
  },
  {
    slug: 'reconcile-two-files-in-excel-with-xlookup',
    title: 'Reconcile two files in Excel with XLOOKUP (the right way)',
    description:
      'A practical guide to matching two exports in Excel using XLOOKUP and INDEX/MATCH — handling missing rows, value mismatches, and the formatting traps that cause false differences.',
    keywords: [
      'excel reconciliation',
      'xlookup',
      'vlookup reconciliation',
      'compare two excel files',
      'match data excel',
      'excel formulas reconciliation',
    ],
    lead: 'Excel is where most reconciliations are born, and XLOOKUP is the function that does the real work. The trick is not the formula itself — it is matching cleanly, surfacing what is missing as well as what differs, and not getting fooled by formatting.',
    blocks: [
      { t: 'h2', text: 'The setup: two sheets, one shared key' },
      {
        t: 'p',
        text: 'Put each export on its own sheet — call them `SystemA` and `SystemB`. Confirm both have a column that identifies the same record: an order number, SKU, or transaction ID. That column is your key. Everything below assumes the key is in column A on each sheet and the value you want to compare (say, an amount) is in column B.',
      },
      { t: 'h2', text: 'Step 1: Does each key exist on the other side?' },
      {
        t: 'p',
        text: 'Before comparing values, find the rows that have no counterpart. XLOOKUP returns its if-not-found argument when there is no match, which is exactly what you want.',
      },
      { t: 'code', text: '=XLOOKUP(A2, SystemB!$A:$A, SystemB!$A:$A, "MISSING")' },
      {
        t: 'p',
        text: 'Drag this down SystemA. Any row showing MISSING exists in A but not in B. Repeat the formula on SystemB pointing at SystemA to catch the rows missing the other way. Those two columns are your one-sided differences.',
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
          ['Numbers stored as text', 'Identical values will not match', 'Run the column through `VALUE()`, or multiply by 1'],
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
        text: 'VLOOKUP still works, but XLOOKUP is better suited to this job: it has a built-in not-found argument (no IFERROR wrapper), it looks left or right without counting columns, and it does not break when someone inserts a column. If you are on an older Excel without XLOOKUP, INDEX with MATCH is the equivalent: `=INDEX(SystemB!$B:$B, MATCH(A2, SystemB!$A:$A, 0))`.',
      },
      { t: 'h2', text: 'Where the spreadsheet method runs out' },
      {
        t: 'p',
        text: 'Formulas reconcile two files well. They strain when there are three or more sources, when the same comparison runs every week, when keys are composite, or when someone needs to audit how a number was reached. A workbook records the answer but not the reasoning; when the reasoning has to be trusted by others, it belongs in a repeatable process rather than cell formulas.',
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
    ],
  },
  {
    slug: 'find-missing-rows-in-excel-countif-match',
    title: 'Finding what is missing: Excel set differences with COUNTIF and MATCH',
    description:
      'How to find rows present in one spreadsheet but not another, and surface mismatches, using COUNTIF, MATCH, and conditional formatting — plus where these formulas quietly fail.',
    keywords: [
      'excel compare two lists',
      'countif missing rows',
      'find differences excel',
      'set difference excel',
      'conditional formatting reconciliation',
      'excel match',
    ],
    lead: 'What is in list A but not list B is the most common reconciliation question and the one spreadsheets answer well — if you know which formula does what and where each one lies to you.',
    blocks: [
      { t: 'h2', text: 'The question behind most reconciliations' },
      {
        t: 'p',
        text: 'Reconciliation is, at its core, set arithmetic. You want three sets: rows in both, rows only in A, and rows only in B. Excel can produce all three from a shared key column. The functions to reach for are COUNTIF and MATCH; conditional formatting makes the result visible.',
      },
      { t: 'h2', text: 'COUNTIF: is this key present over there?' },
      {
        t: 'p',
        text: 'COUNTIF counts how many times a value appears in a range. Zero means absent.',
      },
      { t: 'code', text: '=IF(COUNTIF(SystemB!$A:$A, A2)=0, "only in A", "in both")' },
      {
        t: 'p',
        text: 'Run it down SystemA, then mirror it on SystemB with the ranges swapped. You now have both one-sided sets. COUNTIF is forgiving and readable, which makes it the right default for presence checks.',
      },
      { t: 'h2', text: 'MATCH: where is it, and is it there at all?' },
      {
        t: 'p',
        text: 'MATCH returns the position of a value, or an N/A error if absent. Wrap it to get a clean flag:',
      },
      { t: 'code', text: '=IF(ISNA(MATCH(A2, SystemB!$A:$A, 0)), "missing", "found")' },
      {
        t: 'p',
        text: 'Use MATCH when you will reuse the position (for example to pull a value with INDEX). Use COUNTIF when you only care whether it exists — and when you suspect duplicates, because COUNTIF returns a count greater than one where MATCH silently reports only the first hit.',
      },
      { t: 'h2', text: 'See it: conditional formatting for differences' },
      {
        t: 'ol',
        items: [
          'Select the key column on SystemA.',
          'New Rule, then Use a formula, then `=COUNTIF(SystemB!$A:$A, A1)=0`.',
          'Set a fill color. Now every row missing from B is highlighted.',
          'Repeat on SystemB. Two coloured columns, the whole picture at a glance.',
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        text: 'COUNTIF matches on display value and ignores type, so 1001 as a number and 1001 as text can count as equal here but fail an exact value comparison elsewhere. Decide one type for the key and enforce it before you trust any of these results.',
      },
      { t: 'h2', text: 'The duplicate trap' },
      {
        t: 'p',
        text: 'Every formula above assumes the key is unique. If a key repeats, COUNTIF returns 2 or 3, MATCH finds only the first, and any value you pull is the value of whichever row happened to come first. Before comparing, check for duplicates: `=COUNTIF($A:$A, A2)>1` flags them. A repeating key is not a comparison problem, it is a sign the key is wrong or incomplete — often it needs a second field to become unique.',
      },
      { t: 'h2', text: 'Mismatch, not just missing' },
      {
        t: 'p',
        text: 'Presence is half the job; the other half is agreement. For keys found on both sides, compare the value with INDEX and MATCH and a rounded difference, as covered in the XLOOKUP guide. The combined output — missing-in-A, missing-in-B, value-mismatch, and matched — is a complete reconciliation, and it is exactly the shape any dedicated tool produces automatically.',
      },
    ],
    faq: [
      {
        q: 'How do I find items in one Excel list but not another?',
        a: 'Add a column with =IF(COUNTIF(OtherSheet!$A:$A, A2)=0,"only here","in both") and run it on both sheets with the ranges swapped. The only-here rows are your set differences.',
      },
      {
        q: 'Should I use COUNTIF or MATCH to compare lists?',
        a: 'Use COUNTIF for a simple presence check and when duplicates may exist, since it counts every occurrence. Use MATCH when you need the row position to pull a value with INDEX. MATCH only reports the first occurrence.',
      },
      {
        q: 'Why are my Excel comparison results wrong?',
        a: 'The usual culprit is a non-unique key (duplicates) or a type mismatch between number and text keys. Check for duplicates with COUNTIF(range, value)>1 and standardize the key type before comparing.',
      },
    ],
  },
  {
    slug: 'can-an-ai-agent-reconcile-your-data',
    title: 'Can an AI agent reconcile your data? What works and what does not',
    description:
      'A grounded look at using AI agents and large language models for data reconciliation — where they genuinely help, where they fail, and how to keep the result trustworthy.',
    keywords: [
      'ai reconciliation',
      'ai agent data',
      'llm reconciliation',
      'automate reconciliation',
      'ai data matching',
      'machine learning reconciliation',
    ],
    lead: 'AI is good at some parts of reconciliation and dangerous at others. The difference comes down to one question: is the step about judgment, or about arithmetic? Knowing which is which is how you get the speed without trusting a number you cannot defend.',
    blocks: [
      { t: 'h2', text: 'What AI reconciliation actually means' },
      {
        t: 'p',
        text: 'There are two very different things people mean by AI reconciliation. The first is using a model to help set up and interpret a reconciliation — mapping fields, guessing the key, explaining a difference, drafting a rule. The second is letting a model do the matching and math itself. The first is where todays models shine. The second is where they quietly cause damage.',
      },
      { t: 'h2', text: 'Where AI agents genuinely help' },
      {
        t: 'ul',
        items: [
          'Field mapping. Given two messy exports, a model is good at proposing which column maps to which — that Order # and `order_id` are the same field. You confirm; it saves the tedium.',
          'Key suggestion. A model can spot that SKU alone is not unique and suggest SKU plus location as the composite key, then you validate it.',
          'Classifying differences. Sorting a list of discrepancies into timing, fee, and real by their patterns is pattern recognition, which models do well.',
          'Explaining in plain language. Turning row 4471 differs by 12.50 into this order was refunded after settlement — drafting the narrative a human reviews.',
          'Drafting rules. Translating ignore differences under a dollar into a concrete rule you then run deterministically.',
        ],
      },
      { t: 'h2', text: 'Where AI agents fail' },
      {
        t: 'ul',
        items: [
          'Doing the arithmetic. A language model predicts text; it does not compute a reliable sum over ten thousand rows. Matching and totaling must be deterministic code, not model output.',
          'Silent confidence. A model will produce a plausible reconciliation that is wrong, with the same fluent tone as a correct one. There is no I am not sure unless you engineer for it.',
          'Reproducibility. The same prompt can give different answers. A reconciliation has to produce the same result every time it runs on the same data.',
          'Auditability. The AI said so is not evidence. A close needs the row-level trail, which a freeform answer does not provide.',
        ],
      },
      {
        t: 'callout',
        kind: 'warning',
        text: 'Never let a model be the system that decides whether two numbers are equal. Use it to set up and explain the comparison; run the comparison itself in deterministic code that produces the same answer every time.',
      },
      { t: 'h2', text: 'The pattern that works: AI for setup, code for truth' },
      {
        t: 'p',
        text: 'The reliable division of labor is to let the model do the judgment-heavy, language-heavy work at the edges, and let deterministic logic do the matching and math in the middle. The model proposes the mapping, the key, and the rules; you approve them; an engine applies them identically on every run; the model then helps explain the output. The number is computed by code and is reproducible; the AI made getting there faster without ever being the source of the answer.',
      },
      { t: 'h2', text: 'Questions to ask before trusting an AI reconciliation' },
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
      {
        t: 'p',
        text: 'If the answer to the first two is the model and no, you do not have a reconciliation you can defend — you have a confident guess. Keep AI on the setup and the explanation, keep arithmetic in code, and you get the best of both.',
      },
    ],
    faq: [
      {
        q: 'Can AI reconcile financial data automatically?',
        a: 'AI helps with the judgment parts — mapping fields, suggesting keys, classifying and explaining differences — but the matching and arithmetic should run as deterministic code. Letting a language model compute the numbers risks confident, unreproducible errors.',
      },
      {
        q: 'Is it safe to use a large language model for reconciliation?',
        a: 'Yes, for setup and explanation, where its language and pattern skills add speed. It is not safe as the thing that decides whether two values are equal, because it can produce plausible wrong answers and different results on re-runs. Keep arithmetic deterministic.',
      },
      {
        q: 'What can AI do better than a human in reconciliation?',
        a: 'Proposing field mappings across messy exports, spotting composite-key candidates, and sorting large lists of differences into likely categories quickly. A human then validates these, which is faster than doing the categorization from scratch.',
      },
    ],
  },
  {
    slug: 'prompting-ai-to-help-reconcile-two-files',
    title: 'Prompting an AI model to help reconcile two files: patterns that work',
    description:
      'Concrete, tool-agnostic prompt patterns for using an AI assistant to map fields, propose keys, classify differences, and explain variance — without letting it do the math.',
    keywords: [
      'ai prompting reconciliation',
      'llm prompt data',
      'reconcile files with ai',
      'prompt patterns data',
      'ai field mapping prompt',
      'ai reconciliation prompt',
    ],
    lead: 'If you are going to use an AI assistant in reconciliation, the prompt is where you decide whether it helps or hurts. These patterns keep the model on the work it is good at — mapping, classifying, explaining — and off the arithmetic it is not.',
    blocks: [
      { t: 'h2', text: 'The golden rule of reconciliation prompts' },
      {
        t: 'p',
        text: 'Ask the model to reason about structure and language, never to compute the result. Which column maps to which is a good prompt. Reconcile these and tell me the total variance is a bad one — it invites a fluent, unverifiable number. Every pattern below follows from that rule.',
      },
      { t: 'h2', text: 'Pattern 1: Field mapping' },
      {
        t: 'p',
        text: 'Give the model the column headers and a few sample rows from each source, and ask only for the mapping.',
      },
      {
        t: 'code',
        text: 'Here are the headers and 3 sample rows from two exports.\nSOURCE A: order_id, Order Total, Placed On\nSOURCE B: Order #, amount_cents, created_at\nMap each Source A field to its Source B equivalent. For each pair, note\nany format difference (currency units, date format). Do not compute\nanything. List unmapped fields separately.',
      },
      {
        t: 'p',
        text: 'You get a reviewable mapping plus a heads-up that one side is in cents and the other in dollars — which is exactly the kind of trap that causes fake mismatches.',
      },
      { t: 'h2', text: 'Pattern 2: Primary key proposal' },
      {
        t: 'code',
        text: 'These are the columns of a retail inventory export:\nsku, location_id, on_hand, updated_at.\nPropose the minimal set of fields that uniquely identifies a row.\nExplain why a single field is or is not sufficient. Reason from the\nfield meanings; do not assume.',
      },
      {
        t: 'p',
        text: 'The model reasons that sku repeats across locations and proposes sku plus location_id. You still validate by counting distinct keys, but it pointed you at the composite immediately.',
      },
      { t: 'h2', text: 'Pattern 3: Classifying a list of differences' },
      {
        t: 'p',
        text: 'Once you have computed the differences in code, you can hand the model the list to categorize.',
      },
      {
        t: 'code',
        text: 'Below is a list of reconciliation differences (already computed).\nFor each, classify as: timing, fee/adjustment, value error, or missing\nrecord. Give a one-line reason. Do not change any numbers.\n[paste the computed differences]',
      },
      {
        t: 'callout',
        kind: 'tip',
        text: 'Notice the differences are already computed. The model sorts and explains; it never produces the figures. That single constraint is what keeps the output trustworthy.',
      },
      { t: 'h2', text: 'Pattern 4: Explaining variance to a human' },
      {
        t: 'code',
        text: 'This order reconciles with a 12.50 difference. Context: order placed\nMay 2, refund issued May 9, processor fee 2.9% + 0.30. In two\nsentences, explain the likely cause for a finance reviewer. Flag if\nthe numbers do not support your explanation.',
      },
      {
        t: 'p',
        text: 'This is the model at its best: turning a flagged row into a sentence a reviewer can act on, while being told to flag when the story does not fit the figures.',
      },
      { t: 'h2', text: 'What never to put in a reconciliation prompt' },
      {
        t: 'ul',
        items: [
          'Add these up or what is the total — arithmetic belongs in code.',
          'Decide if these match across a large set — matching belongs in deterministic logic.',
          'Thousands of rows pasted in for the model to process — it will truncate, sample, or hallucinate coverage.',
          'Anything where a wrong, confident answer would be acted on without review.',
        ],
      },
      { t: 'h2', text: 'Putting it together' },
      {
        t: 'p',
        text: 'Used this way, the model is a fast assistant for the setup and the story, and your code or tool is the source of every number. The prompts above are deliberately tool-agnostic — they work with any capable assistant — because the discipline is in what you ask, not which model answers.',
      },
    ],
    faq: [
      {
        q: 'How do I prompt an AI to reconcile two files?',
        a: 'Do not ask it to reconcile. Ask it to map fields, propose a primary key, and classify or explain differences you have already computed. Keep the matching and arithmetic in deterministic code, and use the model only for the language and judgment steps.',
      },
      {
        q: 'Why should I not ask an AI to calculate reconciliation totals?',
        a: 'Language models predict text rather than compute, so they can return plausible but wrong totals and different answers on re-runs. Totals and matching must be reproducible, which means they belong in code, not in a model response.',
      },
      {
        q: 'Do these prompt patterns work with any AI assistant?',
        a: 'Yes. The patterns constrain what you ask — mapping, key proposal, classification, explanation — rather than relying on a specific model features, so they transfer across any capable assistant.',
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
    lead: 'Shopify and your ERP both think they know what an order is worth, and they are both right in their own terms — which is why the totals rarely match on the first pass. Reconciling them is mostly about knowing which identifier to trust and which fields are allowed to differ.',
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
        text: 'Join on whatever the two systems actually share. If your ERP stored Shopify numeric order ID at import, use it — it never changes and has no formatting. If it only kept the order name, normalize the # and any location prefix on both sides first.',
      },
      { t: 'h2', text: 'Where the totals legitimately diverge' },
      {
        t: 'p',
        text: 'An order total is not one number. Shopify and your ERP may each book a different slice, and the differences below are expected, not errors — but only if you account for them explicitly.',
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
      { t: 'h2', text: 'Refunds, edits, and partial fulfillment' },
      {
        t: 'p',
        text: 'A Shopify order is mutable after creation. It can be edited, partially refunded, partially fulfilled, and refunded again. Each event may or may not flow to the ERP, and on its own schedule. A reconciliation that only looks at order creation will see a clean match and miss that the order was half-refunded yesterday. Compare the current state of both sides, including refund and edit history, not the order as first placed.',
      },
      { t: 'h2', text: 'Payouts are a separate reconciliation' },
      {
        t: 'p',
        text: 'Shopify Payments, or any processor, settles orders into deposits, batched and net of fees — the three-way problem in a retail wrapper. Matching orders to your ERP is one reconciliation; matching Shopify payouts to your bank is another, with its own key (the payout ID) and its own aggregation. Keep them separate; conflating order totals with deposit amounts is how teams chase a discrepancy that is just the processor fee.',
      },
      { t: 'h2', text: 'A working sequence' },
      {
        t: 'ol',
        items: [
          'Pick the shared order identifier and normalize it on both sides.',
          'Match orders; resolve one-sided orders first (in Shopify but not ERP, and the reverse).',
          'Compare components — subtotal, tax, shipping, discount — not just the total.',
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
        a: 'Use whatever both systems store and that uniquely identifies an order — ideally Shopify numeric order ID if your ERP captured it, since it never changes and has no formatting. If only the order name (#1001) is shared, strip the # and any prefix on both sides before matching.',
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
      'How to reconcile NetSuite against external systems and against itself — matching item records and locations, and tracking down why the inventory subledger and the GL drift apart.',
    keywords: [
      'netsuite reconciliation',
      'netsuite inventory',
      'subledger gl reconciliation',
      'netsuite accounting',
      'inventory valuation',
      'erp reconciliation',
    ],
    lead: 'NetSuite reconciliations come in two flavors: NetSuite against an outside system, and NetSuite against itself when the inventory subledger and the general ledger stop agreeing. The second is the one that costs accountants their evenings, and it has a small number of usual suspects.',
    blocks: [
      { t: 'h2', text: 'The two reconciliations people call NetSuite reconciliation' },
      {
        t: 'p',
        text: 'The first is external: matching NetSuite records against a storefront, a 3PL feed, a bank, or another ERP. That is ordinary two-system reconciliation — pick a shared key, normalize, compare. The second is internal: confirming that NetSuite inventory subledger (what the item records say you hold and what it is worth) ties to the general ledger (what the inventory asset account says). When those drift, the books are wrong even though every individual transaction looks fine.',
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
          ['Internal ID', 'NetSuite own record ID — stable, but rarely stored by other systems'],
          ['Item name/number', 'Human key; watch for hierarchy (Parent : Child) in assembly items'],
          ['UPC / SKU', 'Often the real shared key with storefronts and 3PLs'],
          ['Location', 'Inventory is per location — almost always part of a composite key'],
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
        text: 'When NetSuite inventory valuation report does not match the inventory asset account in the GL, the cause is almost always one of a short list.',
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
        text: 'The discipline is the same as any reconciliation: same as-of moment on both sides, then narrow by dimension until the difference is a handful of rows you can name. The subledger does not match the GL almost always resolves to a few manual journal entries and a couple of mis-dated transactions.',
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
    lead: 'An order management system sits in the middle — between the storefront that takes the order, the warehouses that fill it, and the ERP that books it. That middle position makes the OMS the natural place reconciliation breaks, because it is the one system that has to agree with three others at once.',
    blocks: [
      { t: 'h2', text: 'What an OMS has to stay reconciled with' },
      {
        t: 'p',
        text: 'An order management system ingests orders from sales channels, decides where to fulfill them, tracks inventory across locations, and hands financial outcomes to the ERP. Each of those touch points is a reconciliation surface: orders in versus the channel, inventory versus the warehouses, fulfillments versus what shipped, and financial records versus the ERP. The OMS is correct only when all four agree.',
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
      { t: 'h2', text: 'Inventory: the hardest one to keep honest' },
      {
        t: 'p',
        text: 'An OMS maintains a view of available-to-promise inventory aggregated across facilities, while each warehouse or 3PL holds the physical truth. These drift constantly — every sale, receipt, adjustment, and transfer is a chance for the OMS view and a facility feed to disagree. Reconcile on SKU plus facility, because an aggregate match can hide offsetting errors: the OMS total looks right while two locations are individually wrong in opposite directions.',
      },
      {
        t: 'callout',
        kind: 'warning',
        text: 'Never reconcile omnichannel inventory on SKU alone. The OMS job is knowing where stock is, so a per-facility comparison is the only one that catches the errors that cause mis-routed and cancelled orders.',
      },
      { t: 'h2', text: 'Fulfillment: allocated is not shipped' },
      {
        t: 'p',
        text: 'The OMS decides which location should fill each line; the location then does, or does not, exactly that. Reconciling allocations against actual fulfillments — on order, line, and location — surfaces split shipments that were not recorded, reassignments the OMS did not hear about, and lines marked fulfilled that never shipped. This boundary is where customer-facing failures hide, because the OMS can believe an order is complete while a line sits unshipped.',
      },
      { t: 'h2', text: 'Financial handoff: orders to the ERP' },
      {
        t: 'p',
        text: 'Finally, what the OMS recorded as sold, shipped, and returned must match what the ERP booked. This is the order-to-cash boundary again, keyed on order or invoice ID, and it is where returns are most likely to fall through — a return processed in the OMS but never credited in the ERP, or the reverse. Reconcile current state including returns, not just original orders.',
      },
      { t: 'h2', text: 'Why the OMS is the reconciliation hub' },
      {
        t: 'p',
        text: 'Because the OMS touches the channel, the warehouse, and the ERP, it is both where discrepancies surface and where they are cheapest to catch — before a mis-routed order ships, before an oversell becomes a cancellation, before a return goes uncredited. Reconciling the OMS against its three neighbors, each on its proper composite key, is what keeps an omnichannel operation honest in the one system positioned to see all of it.',
      },
    ],
    faq: [
      {
        q: 'What does an order management system need to be reconciled against?',
        a: 'Four boundaries: the sales channels (every order imported once), the warehouses or 3PLs (inventory and fulfillments), the physical inventory feeds (on-hand per facility), and the ERP (financial records). The OMS is correct only when it agrees with all of them.',
      },
      {
        q: 'Why reconcile omnichannel inventory per facility instead of per SKU?',
        a: 'Because an OMS purpose is knowing where stock is. A SKU-level total can match while individual locations are wrong in offsetting directions, which still causes mis-routed and cancelled orders. Reconciling on SKU plus facility catches those.',
      },
      {
        q: 'Where do OMS reconciliations most often fail?',
        a: 'At fulfillment (the OMS believes a line shipped when it did not, or missed a split shipment) and at the ERP handoff for returns (processed on one side, never credited on the other). Both require comparing current state, including returns, not the order as first placed.',
      },
    ],
  },
  {
    slug: 'why-reconciliation-belongs-at-the-data-layer',
    title: 'Why reconciliation belongs at the data layer, not the spreadsheet layer',
    description:
      'Reconciliation treated as a spreadsheet task produces workbooks nobody can audit. Treated as a data-layer problem — shared key, classified difference, preserved evidence — it becomes repeatable and trustworthy.',
    keywords: [
      'data layer reconciliation',
      'spreadsheet reconciliation',
      'reconciliation evidence',
      'auditable reconciliation',
      'data reconciliation process',
    ],
    lead: 'Most retail finance teams treat reconciliation as a spreadsheet problem. They export from each system, paste into Excel, write lookups, and call the result reconciled. The output is a workbook nobody else can read and a trail that lives in cell comments. Reconciliation is a data-layer problem, and moving it there changes what you get out of it.',
    blocks: [
      { t: 'h2', text: 'The spreadsheet pile' },
      {
        t: 'p',
        text: 'Export from each system, paste into a workbook, write a column of lookups, eyeball the mismatches, fix a few, save as recon_final_v3. It works once. It is also unauditable, unrepeatable, and only legible to the person who built it. The reasoning — why this row was accepted, which rule classified that one — is in someone head or a cell comment, which means it effectively does not exist.',
      },
      { t: 'h2', text: 'Reconciliation is two systems disagreeing about one record' },
      {
        t: 'p',
        text: 'Strip away the workbook and the actual problem is simple: two systems track the same thing independently, so they disagree, and you need to compare them by their shared key, classify each difference, and keep the row-level evidence. That is a data operation — a join, a comparison, a classification — not a spreadsheet layout. The spreadsheet pile is what happens when no system is responsible for that operation.',
      },
      { t: 'h2', text: 'What moving to the data layer gives you' },
      {
        t: 'ul',
        items: [
          'Repeatability. The same comparison runs again next period without rebuilding it.',
          'Auditability. The trail — keys matched, rules applied, values compared — is the output, not an afterthought.',
          'Legibility. Someone other than the author can read the result and trust it.',
          'Scale. Three sources, composite keys, and large datasets stop being a problem the workbook strains against.',
        ],
      },
      { t: 'h2', text: 'The shape of a data-layer reconciliation' },
      {
        t: 'p',
        text: 'A schema describes each source fields and types. A shared key pairs records across sources. A comparison step computes matches and differences. Rules classify the differences into expected and real. The evidence — the saved run, the rules applied, the row-level trail — is preserved so the result can be defended later. None of that needs to happen in a workbook, and all of it is hard to do well in one.',
      },
      { t: 'quote', text: 'Sign on what is there.' },
      { t: 'h2', text: 'When a spreadsheet is still fine' },
      {
        t: 'p',
        text: 'For a genuine one-off — a comparison you will run once and never again — a spreadsheet is the right tool, and the manual method is worth knowing. The data-layer argument is about the reconciliations that repeat, that others rely on, and that someone will eventually have to explain. Those have outgrown the workbook the first time you ran them; they just have not been moved yet.',
      },
    ],
    faq: [
      {
        q: 'Why is reconciling in spreadsheets a problem?',
        a: 'A workbook records the answer but not the reasoning, is rebuilt from scratch each period, and is only legible to its author. For any reconciliation that repeats or that others must trust, that makes it unrepeatable and unauditable.',
      },
      {
        q: 'What does it mean to reconcile at the data layer?',
        a: 'To treat reconciliation as a data operation — describe each source with a schema, pair records on a shared key, compute and classify differences, and preserve the row-level evidence — rather than as a spreadsheet layout. The result is repeatable, auditable, and legible to others.',
      },
      {
        q: 'Is a spreadsheet ever the right tool for reconciliation?',
        a: 'Yes, for a true one-off you will never repeat. The data-layer approach matters for reconciliations that recur, that others depend on, or that someone will later have to explain.',
      },
    ],
  },
  {
    slug: 'the-cost-of-variance-you-cant-see',
    title: 'The cost of variance you cannot see: inventory, revenue, returns',
    description:
      'Small, invisible discrepancies between retail systems compound into real money. Where unreconciled variance hides across inventory, revenue, and returns — and what it actually costs.',
    keywords: [
      'inventory variance',
      'revenue leakage',
      'returns reconciliation',
      'retail shrinkage',
      'data variance cost',
      'unreconciled data',
    ],
    lead: 'The expensive discrepancies are rarely the big obvious ones. They are the small, steady gaps between what two systems believe — a few units here, a few dollars there — that no one is reconciling, because no one can see them. This is where that money goes.',
    blocks: [
      { t: 'h2', text: 'Variance you can see versus variance you cannot' },
      {
        t: 'p',
        text: 'Every retailer reconciles the things that scream: a deposit that is thousands short, an order that errored loudly. The costly variance is quiet. It is the difference between what the storefront thinks is in stock and what the warehouse actually holds; between revenue booked and cash settled; between returns issued and returns received. Each instance is small. None of them screams. Together they are a line item.',
      },
      { t: 'h2', text: 'Inventory: the variance that sells what you do not have' },
      {
        t: 'p',
        text: 'When the storefront and the warehouse disagree about on-hand quantity, both errors cost. Phantom stock — the store thinks it has units it does not — leads to oversells, cancellations, and the customer you lose for good. Hidden stock — units the system has written off but the shelf still holds — leads to markdowns and lost margin on goods you could have sold at full price. The variance is the same data gap viewed two ways, and both directions cost money.',
      },
      {
        t: 'table',
        head: ['Variance', 'What it causes', 'Where it shows up'],
        rows: [
          ['Phantom stock', 'Oversells, cancellations, lost customers', 'Storefront > warehouse on-hand'],
          ['Hidden stock', 'Unnecessary markdowns, lost margin', 'Warehouse > storefront on-hand'],
          ['Stale sync', 'Both, intermittently', 'Timestamps drift between systems'],
        ],
      },
      { t: 'h2', text: 'Revenue: booked is not banked' },
      {
        t: 'p',
        text: 'Revenue recognized in the order system and cash settled in the bank are two different numbers, and the gap between them is normal — fees, timing, refunds. The danger is when no one reconciles the gap, because then a real loss looks identical to an expected timing difference. Unreconciled, a processor error or a missed settlement batch can sit for months disguised as that is just the fee.',
      },
      { t: 'h2', text: 'Returns: the variance that runs backwards' },
      {
        t: 'p',
        text: 'Returns are reconciliation in reverse, and they are where variance compounds. A refund issued but goods never received; goods received but never restocked; a return credited at the wrong amount. Each breaks the chain between revenue, inventory, and cash at the same time. Returns variance is small per transaction and structural in aggregate, which is exactly the profile of a cost no one notices.',
      },
      {
        t: 'callout',
        kind: 'note',
        text: 'The common thread is invisibility. None of these losses are dramatic. They are expensive precisely because each instance is too small to investigate, so nobody does — until the totals are added up at the period close and the gap has a number.',
      },
      { t: 'h2', text: 'Why we will catch it at close is the expensive plan' },
      {
        t: 'p',
        text: 'Catching variance at the close means catching it after the customer is gone, the markdown is taken, and the settlement window has passed. By then the discrepancy is historical — you can record it, not recover it. The variance that is cheap to fix is the variance you see the day it appears, on the key that ties the two systems together, before it has done anything.',
      },
      { t: 'h2', text: 'What seeing it requires' },
      {
        t: 'p',
        text: 'Making invisible variance visible is not complicated, it is just unglamorous: compare the two systems on a shared key, on a regular cadence, and classify the differences so the real ones separate from the expected ones. The cost of doing that is small and fixed. The cost of not doing it is variable, invisible, and paid every period.',
      },
    ],
    faq: [
      {
        q: 'What is inventory variance and why does it cost money?',
        a: 'Inventory variance is a disagreement between systems about how much stock is on hand. Phantom stock causes oversells and lost customers; hidden stock causes unnecessary markdowns and lost margin. Both are the same data gap and both cost money.',
      },
      {
        q: 'Why is small, unreconciled variance dangerous?',
        a: 'Because each instance is too small to investigate, real losses look identical to expected timing differences, and the total only becomes visible at the period close — after it is too late to recover. Seeing it early, on a shared key, is what keeps it cheap.',
      },
      {
        q: 'How do returns create reconciliation problems?',
        a: 'A return touches revenue, inventory, and cash at once — refund issued, goods received, stock restocked, amount credited. When any link breaks, variance compounds across all three systems, and per-transaction it is small enough to go unnoticed.',
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
