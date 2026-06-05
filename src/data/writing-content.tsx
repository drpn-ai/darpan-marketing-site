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
    lead: 'Before you can compare two systems, you have to agree on what counts as the same row. That agreement is the primary ID — the field, or combination of fields, that identifies one record in both systems. Get it right and reconciliation is just arithmetic. Get it wrong and every number downstream is quietly suspect. This is the step people skip, and it\'s the one that bites hardest.',
    blocks: [
      { t: 'h2', text: 'What is a primary ID in reconciliation?' },
      {
        t: 'p',
        text: 'A primary ID is the value you use to match a record in one system against the corresponding record in another. In a sales reconciliation it might be the order number; in inventory it might be SKU plus location; in a [bank reconciliation](https://en.wikipedia.org/wiki/Bank_reconciliation) it might be a transaction reference. The only requirement is that it means the same thing on both sides and points to exactly one record on each.',
      },
      {
        t: 'p',
        text: 'This is different from a [database primary key](https://en.wikipedia.org/wiki/Primary_key). A database primary key is unique within one system. A reconciliation primary ID has to be unique and shared across two systems that were never designed to agree.',
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
        text: 'Many retail records are only unique in combination. A single SKU is not unique across warehouses; a SKU is unique per location. A line item is unique per order plus line number. When no single field identifies a row, you build a [composite key](https://en.wikipedia.org/wiki/Composite_key) by concatenating fields in a fixed order, for example `sku | location_id`.',
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
        text: 'The discipline is simple: prove the key is unique and shared before you compare a single value. Reconciliation done on a bad key produces confident, wrong answers. Choosing it well is step one of the [manual reconciliation method](/writing/how-to-reconcile-two-systems-by-hand).',
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
        text: 'Decide the field, or combination of fields, that identifies the same record on both sides — its [primary ID](/writing/what-we-mean-when-we-say-primary-id). This is the single most important decision; a wrong key makes every later step meaningless.',
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
        text: 'The manual method is the right way to learn reconciliation and the right tool for a one-off. It stops scaling when the same comparison runs every week, when datasets grow past what a [spreadsheet](/writing/reconcile-two-files-in-excel-with-xlookup) handles comfortably, or when more than one person needs to trust the result. At that point you want the steps preserved as a repeatable, auditable process rather than a workbook someone rebuilds each month.',
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
        text: 'Drag this down SystemA. Any row showing MISSING exists in A but not in B. Repeat the formula on SystemB pointing at SystemA to catch the rows missing the other way. Those two columns are your one-sided differences — the same set difference you can get with [COUNTIF and MATCH](/writing/find-missing-rows-in-excel-countif-match).',
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
        text: '[VLOOKUP](https://support.microsoft.com/en-us/office/vlookup-function-0bbc8083-26fe-4963-8ab8-93a18ad188a1) still works, but XLOOKUP is better suited to this job: it has a built-in not-found argument (no IFERROR wrapper), it looks left or right without counting columns, and it does not break when someone inserts a column. If you are on an older Excel without XLOOKUP, [INDEX](https://support.microsoft.com/en-us/office/index-function-a5dcf0dd-996d-40a4-a822-b56b061328bd) with [MATCH](https://support.microsoft.com/en-us/office/match-function-e8dffd45-c762-47d6-bf89-533f4a37673a) is the equivalent: `=INDEX(SystemB!$B:$B, MATCH(A2, SystemB!$A:$A, 0))`.',
      },
      { t: 'h2', text: 'Where the spreadsheet method runs out' },
      {
        t: 'p',
        text: 'Formulas reconcile two files just fine. They start to buckle the moment you\'ve got three or more sources, the same comparison every week, a [composite key](/writing/what-we-mean-when-we-say-primary-id), or someone who needs to audit how a number was reached. A workbook saves the answer but not the reasoning — and once other people have to trust that number, the reasoning has to live somewhere more repeatable than a cell formula.',
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
    lead: '"What\'s in list A but not list B?" is the most common reconciliation question there is — and one spreadsheets actually answer well. The catch: you have to know which formula does what, and where each one quietly lies to you. Here\'s which to reach for, and the trap hiding in each.',
    blocks: [
      { t: 'h2', text: 'The question behind most reconciliations' },
      {
        t: 'p',
        text: 'Reconciliation is, at its core, set arithmetic. You want three sets: rows in both, rows only in A, and rows only in B. Excel can produce all three from a shared key column. The functions to reach for are [COUNTIF](https://support.microsoft.com/en-us/office/countif-function-e0de10c6-f885-4e71-abb4-1f464816df34) and [MATCH](https://support.microsoft.com/en-us/office/match-function-e8dffd45-c762-47d6-bf89-533f4a37673a); conditional formatting makes the result visible.',
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
        text: 'Use MATCH when you will reuse the position (for example to pull a value with [INDEX](https://support.microsoft.com/en-us/office/index-function-a5dcf0dd-996d-40a4-a822-b56b061328bd)). Use COUNTIF when you only care whether it exists — and when you suspect duplicates, because COUNTIF returns a count greater than one where MATCH silently reports only the first hit.',
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
        text: 'Every formula above assumes the key is unique. If a key repeats, COUNTIF returns 2 or 3, MATCH finds only the first, and any value you pull is the value of whichever row happened to come first. Before comparing, check for duplicates: `=COUNTIF($A:$A, A2)>1` flags them. A repeating key is not a comparison problem, it is a sign the [key is wrong or incomplete](/writing/what-we-mean-when-we-say-primary-id) — often it needs a second field to become unique.',
      },
      { t: 'h2', text: 'Mismatch, not just missing' },
      {
        t: 'p',
        text: 'Presence is half the job; the other half is agreement. For keys found on both sides, compare the value with INDEX and MATCH and a rounded difference, as covered in the [XLOOKUP guide](/writing/reconcile-two-files-in-excel-with-xlookup). The combined output — missing-in-A, missing-in-B, value-mismatch, and matched — is a complete reconciliation, and it is exactly the shape any dedicated tool produces automatically.',
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
    lead: '"Can\'t AI just do my reconciliation?" Yes and no — and the people who get burned are the ones who don\'t know which. AI is genuinely great at the judgment parts and genuinely dangerous at the arithmetic. Here\'s exactly where that line sits, so you get the speed without ever trusting a number you can\'t defend.',
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
          'Key suggestion. A model can spot that SKU alone is not unique and suggest SKU plus location as the [composite key](/writing/what-we-mean-when-we-say-primary-id), then you validate it.',
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
        text: 'If the answer to the first two is "the model" and "no," you don\'t have a reconciliation you can defend. You have a confident guess. Keep the AI on setup and explanation, keep the arithmetic in code, and you get both. The [prompt patterns that keep a model in its lane](/writing/prompting-ai-to-help-reconcile-two-files) are the practical version of this.',
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
    lead: 'If you\'re going to use an AI assistant for reconciliation, the prompt is where you decide whether it helps or quietly hurts. These are the patterns that keep the model on the work it\'s actually good at — mapping, classifying, explaining — and off the arithmetic it isn\'t. Steal them as-is; they work with any capable model.',
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
        text: 'The model reasons that sku repeats across locations and proposes sku plus location_id. You still validate by counting distinct keys, but it pointed you at the [composite key](/writing/what-we-mean-when-we-say-primary-id) immediately.',
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
        text: 'Used this way, the model is a fast assistant for the setup and the story, and your code or tool is the source of every number. The prompts above are deliberately tool-agnostic — they work with any capable assistant — because the discipline is in what you ask, not which model answers. For where this fits the bigger picture, see [what an AI agent can and cannot reconcile](/writing/can-an-ai-agent-reconcile-your-data).',
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
        text: 'Join on whatever the two systems actually share. If your ERP stored Shopify numeric order ID at import, use it — it never changes and has no formatting. If it only kept the order name, [normalize](/writing/what-we-mean-when-we-say-primary-id) the # and any location prefix on both sides first.',
      },
      { t: 'h2', text: 'Where the totals legitimately diverge' },
      {
        t: 'p',
        text: 'An order total is not one number. Shopify and your [ERP](/writing/netsuite-reconciliation-inventory-and-gl) may each book a different slice, and the differences below are expected, not errors — but only if you account for them explicitly.',
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
        text: 'Shopify Payments, or any processor, settles orders into deposits, batched and net of fees — the three-way problem in a retail wrapper. Matching orders to your ERP is one reconciliation; matching [Shopify payouts](https://help.shopify.com/en/manual/payments/shopify-payments/payouts) to your bank is another, with its own key (the payout ID) and its own aggregation. Keep them separate; conflating order totals with deposit amounts is how teams chase a discrepancy that is just the processor fee.',
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
    lead: 'NetSuite reconciliations come in two flavors: NetSuite against an outside system, and NetSuite against itself — when the inventory subledger and the general ledger quietly stop agreeing. The second one is what costs accountants their evenings. The good news: it has a short list of usual suspects, and once you know them, it stops being a mystery.',
    blocks: [
      { t: 'h2', text: 'The two reconciliations people call NetSuite reconciliation' },
      {
        t: 'p',
        text: 'The first is external: matching NetSuite records against a [storefront](/writing/reconcile-shopify-orders-against-your-erp), a 3PL feed, a bank, or another ERP. That is ordinary [two-system reconciliation](/writing/how-to-reconcile-two-systems-by-hand) — pick a [shared key](/writing/what-we-mean-when-we-say-primary-id), normalize, compare. The second is internal: confirming that NetSuite inventory subledger (what the item records say you hold and what it is worth) ties to the [general ledger](https://en.wikipedia.org/wiki/General_ledger) (what the inventory asset account says). When those drift, the books are wrong even though every individual transaction looks fine.',
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
          ['Location', 'Inventory is per location — almost always part of a [composite key](/writing/what-we-mean-when-we-say-primary-id)'],
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
    lead: 'Your order management system sits in the middle of everything — between the [storefront](/writing/reconcile-shopify-orders-against-your-erp) that takes the order, the warehouses that fill it, and the ERP that books it. That middle seat is exactly why the OMS is where reconciliation breaks: it\'s the one system that has to agree with three others at once. It\'s also the best place to catch a problem before it ships.',
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
        text: 'Finally, what the OMS recorded as sold, shipped, and returned must match what the [ERP booked](/writing/netsuite-reconciliation-inventory-and-gl). This is the order-to-cash boundary again, keyed on order or invoice ID, and it is where returns are most likely to fall through — a return processed in the OMS but never credited in the ERP, or the reverse. Reconcile current state including returns, not just original orders.',
      },
      { t: 'h2', text: 'Why the OMS is the reconciliation hub' },
      {
        t: 'p',
        text: 'Because the OMS touches the channel, the warehouse, and the ERP, it is both where discrepancies surface and where they are cheapest to catch — before a mis-routed order ships, before an oversell becomes a cancellation, before a return goes uncredited. Reconciling the OMS against its three neighbors, each on its proper [composite key](/writing/what-we-mean-when-we-say-primary-id), is what keeps an omnichannel operation honest in the one system positioned to see all of it.',
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
]

const bySlug: Record<string, Article> = Object.fromEntries(
  articles.map((a) => [a.slug, a]),
)

export function getArticle(slug: string): Article | undefined {
  return bySlug[slug]
}

export { articles }
