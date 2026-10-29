// Facts shared across pages, so the homepage and the deeper pages cannot drift
// apart. Every claim here traces to the Facts register in
// docs/superpowers/specs/2026-10-29-drpn-site-rethink-design.md.

const SITE_URL = 'https://drpn.ai'

// A page's own title, description, canonical and og/twitter tags. The root
// route sets no canonical or og:url, so every page names itself here once.
export function pageHead(path: string, title: string, description: string) {
  const url = `${SITE_URL}${path}`
  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
    ],
    links: [{ rel: 'canonical', href: url }],
  }
}

export const WALKTHROUGH_HREF =
  'mailto:hello@drpn.ai?subject=Darpan%20walkthrough'

export const NAV_ITEMS: ReadonlyArray<readonly [label: string, href: string]> =
  [
    ['How it works', '/#how'],
    ['Works with', '/works-with'],
    ['Tour', '/tour'],
    ['Security', '/security'],
    ['Notes', '/notes'],
  ]

export type Connector = { name: string; reads: string }

export const CONNECTORS: readonly Connector[] = [
  {
    name: 'Shopify',
    reads: 'Orders, payments, fulfilments, refunds, returns and exchanges.',
  },
  {
    name: 'HotWax Commerce',
    reads: 'Orders, shipments, returns and payments.',
  },
  {
    name: 'NetSuite',
    reads:
      'Sales orders, fulfilments, invoices, return authorizations and credit memos, through queries you can preview.',
  },
  {
    name: 'MySQL, PostgreSQL and IBM Db2',
    reads: 'The rows a SELECT you write returns, through a read-only account.',
  },
  {
    name: 'Files over SFTP',
    reads: 'CSV and JSON files dropped in a folder.',
  },
]

export type SecurityFact = {
  id: 'no-changes' | 'sealed' | 'own-lane'
  heading: string
  body: string
}

export const SECURITY_FACTS: readonly SecurityFact[] = [
  {
    id: 'no-changes',
    heading: 'It doesn’t change your records.',
    body: 'Darpan reads Shopify, HotWax, NetSuite and your databases. It never edits an order, a return or a row.',
  },
  {
    id: 'sealed',
    heading: 'Credentials stay sealed.',
    body: 'Passwords, API tokens and private keys are stored encrypted and can’t be read back once saved.',
  },
  {
    id: 'own-lane',
    heading: 'Each company stays in its own lane.',
    body: 'Every read is filtered to the company you’re signed in to. Another company’s records answer as if they don’t exist.',
  },
]

// The three Notes shown on the homepage: the ones that read as operations.
export const HOME_NOTE_SLUGS = [
  'reconcile-your-integration-dropped-records',
  'spreadsheet-to-system-migration-checklist',
  'fuzzy-matching-records',
] as const
