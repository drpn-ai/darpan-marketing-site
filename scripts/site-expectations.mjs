// What the prerendered site must hold. `npm run check` reads this after a build
// (see check-site.mjs). Add a page's expectations before building the page.

/** @type {Array<{ path: string; title: string; mustContain: string[] }>} */
export const PAGES = [
  {
    path: '/',
    title: 'Darpan',
    mustContain: [
      'For ops teams running Shopify, an OMS and an ERP',
      'Every sync says it worked. Nobody checks that it did.',
      'Integrations confirm the hand-off, not the result.',
      'Tell Darpan, in plain words, how your business runs.',
      'The fraud screen worked. The order shipped anyway.',
      'each was telling the truth',
      'This customer was never going to call.',
      'Also found this month, at a jewelry brand:',
      'What teams ask first.',
      'How long does setup take?',
      'you approve each one',
      'about $11,000 of orders',
      'never both.',
      'Running every morning at five-plus brands.',
      'None of it was a month-end problem.',
      'about one order in a hundred breaks somewhere between two systems',
      'Your business story, as checks.',
      'With Darpan, you finally get to believe it',
      'even unwritten rules',
      'fixed while its cause is fresh',
      'Anywhere two systems have to line up.',
      'Every closed deal has an active subscription.',
      'Your records stay yours.',
      'The close becomes a review, not a rescue.',
      'Make every morning a close day. Each break gets fixed while it’s still small.',
      'Talk to us',
    ],
  },
  {
    path: '/talk',
    title: 'Talk to us',
    mustContain: [
      'Tell us which systems you run.',
      'Work email',
      'Which systems do you run?',
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
      'Working toward SOC 2 Type I.',
      'It never changes your records.',
      'archives the files it has read',
      'Credentials stay sealed.',
      'Each company stays in its own lane.',
      'Encrypted in transit and at rest.',
      'Amazon Web Services in the United States (Ohio)',
      'Orders, payments, fulfilments, refunds, returns and exchanges.',
    ],
  },
  {
    path: '/works-with',
    title: 'Works with',
    mustContain: [
      'Darpan fits around what you already run.',
      'And with your AI',
      'Darpan can easily connect with anything that has an',
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
    path: '/agent',
    title: 'The agent',
    mustContain: [
      'One brain. Every order. Every system. Every morning.',
      'The brain behind it',
      'questions asked twice',
      'Talk to us',
    ],
  },
  {
    path: '/tour',
    title: 'Tour',
    mustContain: [
      'A month close that ends with a list, not a long night.',
      'the way they’d explain it to a new hire',
      'From a brand that runs Darpan; names and ids changed.',
      'Talk to us',
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
  '/agent',
  '/talk',
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
