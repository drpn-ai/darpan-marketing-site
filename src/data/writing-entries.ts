export type WritingEntry = {
  slug: string
  date: string
  category: string
  title: string
  meta: string
}

// Each pillar (category) gets a muted, on-brand color — used for the sticky-note
// top strip on the home and the writing index.
export const pillarColor: Record<string, string> = {
  Guides: '#2f6b4f',
  Methods: '#3d6f8e',
  Concepts: '#9a6b2e',
  AI: '#6b5b8a',
  Operations: '#b0571b',
  Spreadsheets: '#4f7a63',
  'Engineering notes': '#5c6470',
}

export const writingEntries: readonly WritingEntry[] = [
  {
    slug: 'spreadsheet-to-system-migration-checklist',
    date: 'JUN 15, 2026',
    category: 'Methods',
    title: 'Moving off spreadsheets: a migration checklist that proves nothing got lost.',
    meta: '8 min read',
  },
  {
    slug: 'inventory-reconciliation-cycle-counts',
    date: 'JUN 8, 2026',
    category: 'Guides',
    title: 'Inventory reconciliation with cycle counts: keeping the shelf, the storefront, and the books in agreement.',
    meta: '9 min read',
  },
  {
    slug: 'reconcile-your-integration-dropped-records',
    date: 'JUN 4, 2026',
    category: 'Guides',
    title: 'Your integration ran clean and still dropped records: catching the orders that never made it across.',
    meta: '9 min read',
  },
  {
    slug: '3pl-inventory-sync-oversells',
    date: 'JUN 1, 2026',
    category: 'Guides',
    title: 'Why inventory oversells across Shopify, Amazon, and your 3PL — and how to reconcile it.',
    meta: '9 min read',
  },
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
    slug: 'reconcile-two-files-in-excel-with-xlookup',
    date: 'MAY 12, 2026',
    category: 'Spreadsheets',
    title: 'Reconcile two files in Excel with XLOOKUP, the right way.',
    meta: '7 min read',
  },
  {
    slug: 'how-to-reconcile-two-systems-by-hand',
    date: 'MAY 5, 2026',
    category: 'Methods',
    title: 'How to reconcile two systems by hand: a repeatable method.',
    meta: '6 min read',
  },
  {
    slug: 'reconciliation-prompt-pack',
    date: 'APR 29, 2026',
    category: 'AI',
    title: 'A copy-paste reconciliation prompt pack (the directions AI actually needs).',
    meta: '7 min read',
  },
  {
    slug: 'amazon-settlement-reconciliation',
    date: 'APR 22, 2026',
    category: 'Guides',
    title: 'Amazon settlement reconciliation: matching disbursements to your ERP when the reserve hides the rest.',
    meta: '9 min read',
  },
  {
    slug: 'marketplace-payout-reconciliation',
    date: 'APR 18, 2026',
    category: 'Guides',
    title: 'Marketplace payout reconciliation: the clearing account that makes every platform tie out.',
    meta: '9 min read',
  },
  {
    slug: 'multi-currency-reconciliation',
    date: 'APR 4, 2026',
    category: 'Guides',
    title: 'Multi-currency reconciliation: telling an FX difference from a real one.',
    meta: '9 min read',
  },
  {
    slug: 'csv-gotchas-encoding-delimiters',
    date: 'APR 1, 2026',
    category: 'Spreadsheets',
    title: 'CSV gotchas that silently break a reconciliation: encoding, delimiters, and mangled IDs.',
    meta: '7 min read',
  },
  {
    slug: 'fuzzy-matching-records',
    date: 'MAR 21, 2026',
    category: 'Methods',
    title: 'Fuzzy matching records: catching the duplicate the invoice number hides.',
    meta: '7 min read',
  },
] as const
