export type WritingEntry = {
  slug: string
  date: string
  category: string
  title: string
  meta: string
}

export const writingEntries: readonly WritingEntry[] = [
  {
    slug: 'reconcile-shopify-orders-against-your-erp',
    date: 'MAY 28, 2026',
    category: 'Guides',
    title: 'Reconciling Shopify orders against your ERP: the fields that drift.',
    meta: '8 min read',
  },
  {
    slug: 'netsuite-reconciliation-inventory-and-gl',
    date: 'MAY 26, 2026',
    category: 'Guides',
    title: 'NetSuite reconciliation: where inventory and the GL disagree.',
    meta: '8 min read',
  },
  {
    slug: 'reconcile-your-oms-against-the-source-of-truth',
    date: 'MAY 23, 2026',
    category: 'Guides',
    title: 'OMS reconciliation: matching order management against the source of truth.',
    meta: '7 min read',
  },
  {
    slug: 'can-an-ai-agent-reconcile-your-data',
    date: 'MAY 20, 2026',
    category: 'AI',
    title: 'Can an AI agent reconcile your data? What works and what doesn’t.',
    meta: '7 min read',
  },
  {
    slug: 'prompting-ai-to-help-reconcile-two-files',
    date: 'MAY 16, 2026',
    category: 'AI',
    title: 'Prompting an AI model to help reconcile two files: patterns that work.',
    meta: '7 min read',
  },
  {
    slug: 'reconcile-two-files-in-excel-with-xlookup',
    date: 'MAY 12, 2026',
    category: 'Spreadsheets',
    title: 'Reconcile two files in Excel with XLOOKUP, the right way.',
    meta: '7 min read',
  },
  {
    slug: 'find-missing-rows-in-excel-countif-match',
    date: 'MAY 8, 2026',
    category: 'Spreadsheets',
    title: 'Finding what’s missing: Excel set differences with COUNTIF and MATCH.',
    meta: '6 min read',
  },
  {
    slug: 'how-to-reconcile-two-systems-by-hand',
    date: 'MAY 5, 2026',
    category: 'Methods',
    title: 'How to reconcile two systems by hand: a repeatable method.',
    meta: '6 min read',
  },
  {
    slug: 'two-way-vs-three-way-reconciliation',
    date: 'MAY 1, 2026',
    category: 'Methods',
    title: 'Two-way vs three-way reconciliation: orders, payments, and the bank.',
    meta: '7 min read',
  },
  {
    slug: 'schemas-explained-describe-your-data',
    date: 'APR 24, 2026',
    category: 'Concepts',
    title: 'Schemas, explained: describing your data before you compare it.',
    meta: '6 min read',
  },
  {
    slug: 'a-taxonomy-of-reconciliation-differences',
    date: 'APR 18, 2026',
    category: 'Concepts',
    title: 'A taxonomy of reconciliation differences, and what to do with each.',
    meta: '6 min read',
  },
  {
    slug: 'why-reconciliation-belongs-at-the-data-layer',
    date: 'APR 12, 2026',
    category: 'Engineering notes',
    title:
      'Why reconciliation belongs at the data layer, not the spreadsheet layer.',
    meta: '6 min read',
  },
  {
    slug: 'the-cost-of-variance-you-cant-see',
    date: 'MAR 28, 2026',
    category: 'Operations',
    title: 'The cost of variance you can’t see: inventory, revenue, returns.',
    meta: '5 min read',
  },
  {
    slug: 'what-we-mean-when-we-say-primary-id',
    date: 'MAR 14, 2026',
    category: 'Concepts',
    title: 'What we mean when we say “primary ID.”',
    meta: '5 min read',
  },
  {
    slug: 'the-complete-guide-to-data-reconciliation',
    date: 'MAR 3, 2026',
    category: 'Guides',
    title: 'The complete guide to data reconciliation.',
    meta: '9 min read',
  },
] as const
