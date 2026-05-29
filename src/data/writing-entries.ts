export type WritingEntry = {
  slug: string
  date: string
  category: string
  title: string
  meta: string
}

export const writingEntries: readonly WritingEntry[] = [
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
    category: 'Product',
    title: 'What we mean when we say “primary ID.”',
    meta: '4 min read',
  },
] as const
