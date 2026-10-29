// One page per system pair Darpan supports today. The statements are the real
// ones from production audits, rewritten the way a customer would say them, with
// every client name, id and account stripped (DAR-MKT-001).
import type { BreakItem } from '@/components/BreakList'

export type PairSlug =
  | 'shopify-netsuite'
  | 'hotwax-netsuite'
  | 'shopify-hotwax'
  | 'databases-and-files'

export type SystemPair = {
  slug: PairSlug
  name: string
  h1: string
  description: string
  summary: string
  reads: ReadonlyArray<{ system: string; records: string }>
  statements: readonly string[]
  exampleBreak: BreakItem
}

export const PAIRS: readonly SystemPair[] = [
  {
    slug: 'shopify-netsuite',
    name: 'Shopify and NetSuite',
    h1: 'Shopify orders, returns and exchanges missing in NetSuite, found the morning after.',
    description:
      'Darpan checks every morning that what Shopify completes — exchanges, refunds, store credit — reached NetSuite at the same amount, and keeps each break listed until it is fixed.',
    summary: 'Exchanges, refunds and store credit that never reached the ERP.',
    reads: [
      {
        system: 'Shopify',
        records: 'orders, payments, fulfilments, refunds, returns and exchanges',
      },
      {
        system: 'NetSuite',
        records:
          'sales orders, invoices, return authorizations and credit memos',
      },
    ],
    statements: [
      'Every exchange Shopify completes is in NetSuite.',
      'Every return Shopify completes with a refund has a refunded RMA in NetSuite.',
      'Store credit given in Shopify is in NetSuite at the same amount.',
      'Every refund we give a customer is booked in NetSuite at the same amount, to the cent, with nothing left open.',
      'Every invoice and credit memo carries the Shopify order id.',
      'A cancelled exchange leaves nothing open in NetSuite.',
    ],
    exampleBreak: {
      text: 'Exchange for order 1038 isn’t in NetSuite',
      meta: 'cause: original order not fulfilled · owner: ops',
      state: 'open',
      badge: 'day 1',
    },
  },
  {
    slug: 'hotwax-netsuite',
    name: 'HotWax and NetSuite',
    h1: 'Orders HotWax completed that NetSuite never billed, found the morning after.',
    description:
      'Darpan checks every morning that what HotWax Commerce fulfils, completes and takes back is in NetSuite, billed and closed, and keeps each break listed until it is fixed.',
    summary: 'Fulfilled orders, store sales and returns the ERP never saw.',
    reads: [
      {
        system: 'HotWax Commerce',
        records: 'orders, shipments, returns and payments',
      },
      {
        system: 'NetSuite',
        records: 'sales orders, fulfilments, invoices and return authorizations',
      },
    ],
    statements: [
      'Every order that is fulfilled, in store or online, is in NetSuite with its invoice.',
      'Every item HotWax completes is billed in NetSuite.',
      'An order HotWax completed or cancelled does not stay open in NetSuite.',
      'Every return reaches NetSuite.',
      'Every store sale carries its store in NetSuite.',
      'An exchange item handed over at a store is booked at that store.',
    ],
    exampleBreak: {
      text: 'Order 1042 completed in HotWax, not billed in NetSuite',
      meta: 'cause: stuck in Packed · owner: warehouse',
      state: 'open',
      badge: 'day 1',
    },
  },
  {
    slug: 'shopify-hotwax',
    name: 'Shopify and HotWax',
    h1: 'Shopify orders that never reached HotWax, found the morning after.',
    description:
      'Darpan checks every morning that every Shopify order and payment reached HotWax Commerce, and that what HotWax completes shows as fulfilled in Shopify.',
    summary: 'Orders and payments that dropped between storefront and OMS.',
    reads: [
      { system: 'Shopify', records: 'orders, payments and fulfilments' },
      { system: 'HotWax Commerce', records: 'orders, payments and shipments' },
    ],
    statements: [
      'Every Shopify order is in HotWax.',
      'Every order paid in Shopify has its payment in HotWax.',
      'Every order HotWax completes is fulfilled in Shopify.',
    ],
    exampleBreak: {
      text: 'Order 1051 paid in Shopify, no payment in HotWax',
      meta: 'owner: ops',
      state: 'open',
      badge: 'day 1',
    },
  },
  {
    slug: 'databases-and-files',
    name: 'Databases and files',
    h1: 'A database or a file on each side, checked every morning.',
    description:
      'Point Darpan at a MySQL, PostgreSQL or IBM Db2 database through a read-only account, or at CSV and JSON files over SFTP, and write your own statements about what must line up.',
    summary: 'A SELECT or a file on each side; you write the statements.',
    reads: [
      {
        system: 'MySQL, PostgreSQL or IBM Db2',
        records:
          'the rows a SELECT you write returns, through a read-only account',
      },
      { system: 'Files over SFTP', records: 'CSV and JSON files in a folder' },
    ],
    statements: [
      'Every row in our orders table has a matching row in the warehouse’s daily file.',
      'Every subscription marked active in the app database has a paid invoice this month.',
      'Every account closed in the CRM export is closed in the billing database.',
      'Every shipment in the carrier file belongs to an order we have.',
    ],
    exampleBreak: {
      text: 'Order row 88213 has no match in today’s warehouse file',
      meta: 'owner: data team',
      state: 'open',
      badge: 'day 1',
    },
  },
]

export function findPair(slug: string): SystemPair | undefined {
  return PAIRS.find((p) => p.slug === slug)
}
