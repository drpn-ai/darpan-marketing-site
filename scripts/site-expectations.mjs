// What the prerendered site must hold. `npm run check` reads this after a build
// (see check-site.mjs). Add a page's expectations before building the page.

/** @type {Array<{ path: string; title: string; mustContain: string[] }>} */
export const PAGES = [
  {
    path: '/',
    title: 'Darpan',
    mustContain: [
      'Your systems are up. Are they still lining up?',
      'Every sync says it worked. Nobody checks that it did.',
      'Say it. Check it. Explain it. Keep it.',
      'Each break arrives with evidence and an owner.',
      'Anywhere two systems have to line up.',
      'Every closed deal has an active subscription.',
      'Reads the systems you already run.',
      'Each company stays in its own lane.',
      'And month-end has nothing left to chase.',
      'Tomorrow your systems will report success. Darpan will tell you whether they still line up.',
      'Talk to us',
    ],
  },
  { path: '/notes', title: 'Notes', mustContain: ['Notes'] },
  { path: '/privacy', title: 'Privacy', mustContain: ['Privacy'] },
  { path: '/terms', title: 'Terms', mustContain: ['Terms'] },
  {
    path: '/security',
    title: 'Security',
    mustContain: [
      'What Darpan reads, and where it stays',
      'It doesn’t change your records.',
      'archive',
      'Credentials stay sealed.',
      'Each company stays in its own lane.',
      'runs in the cloud',
      'writes each run’s result file back to that server',
      'Shopify: Orders, payments, fulfilments, refunds, returns and exchanges.',
    ],
  },
  {
    path: '/works-with',
    title: 'Works with',
    mustContain: [
      'Reads the systems you already run.',
      'Shopify and NetSuite',
      'HotWax and NetSuite',
      'Shopify and HotWax',
      'Databases and files',
    ],
  },
  {
    path: '/works-with/shopify-netsuite',
    title: 'Shopify and NetSuite',
    mustContain: [
      'Shopify orders, returns and exchanges missing in NetSuite, found the morning after.',
      'Every exchange Shopify completes is in NetSuite.',
      'Every return Shopify completes with a refund has a refunded RMA in NetSuite.',
      'Talk to us',
    ],
  },
  {
    path: '/works-with/hotwax-netsuite',
    title: 'HotWax and NetSuite',
    mustContain: [
      'Orders HotWax completed that NetSuite never billed, found the morning after.',
      'Every item HotWax completes is billed in NetSuite.',
      'Talk to us',
    ],
  },
  {
    path: '/works-with/shopify-hotwax',
    title: 'Shopify and HotWax',
    mustContain: [
      'Shopify orders that never reached HotWax, found the morning after.',
      'Every Shopify order is in HotWax.',
      'Talk to us',
    ],
  },
  {
    path: '/works-with/databases-and-files',
    title: 'Databases and files',
    mustContain: [
      'A database or a file on each side, checked every morning.',
      'read-only account',
      'SELECT',
      'write your own statements',
      'Talk to us',
    ],
  },
  {
    path: '/tour',
    title: 'Tour',
    mustContain: [
      'One morning, start to finish.',
      'One audit holds the statements your team wrote.',
      'Each statement is tested by a check that reads both systems.',
      'At 06:00, this morning’s findings arrive.',
      'A finding shows its owner, the evidence on each side and, when Darpan can name it, the cause.',
      'One schedule runs every check, in your time zone.',
      'When a later check sees it fixed, the finding closes and keeps its history.',
    ],
  },
]

// Pages whose visible text must avoid BANNED (the voice rules).
export const VOICE_CHECKED = [
  '/',
  '/security',
  '/works-with',
  '/works-with/shopify-netsuite',
  '/works-with/hotwax-netsuite',
  '/works-with/shopify-hotwax',
  '/works-with/databases-and-files',
  '/tour',
]

export const BANNED = [
  /\bagree(ment)?s?\b/i,
  /ai-powered/i,
  /agentic/i,
  /seamless/i,
  /single source of truth/i,
  /real-time/i,
  /observability/i,
  /trust your data/i,
  /reconcil/i,
  /revenue leakage/i,
  /360°/,
]

// Paths nothing may link to; each needs a 301 to / in netlify.toml.
export const RETIRED = ['/why', '/customers']

// When true, every .vl-* class selector in the stylesheet must be used in src/.
export const CHECK_UNUSED_CSS = true
