// The tour's drawn frames: one morning in Darpan, in the product's own labels
// (darpan-docs/guides/audits.mdx), with invented, obviously generic records.
// Drawn rather than screenshotted until a synthetic demo tenant exists.
import type { ReactNode } from 'react'
import { BreakList } from '@/components/BreakList'

function Panel({
  title,
  aside,
  label,
  children,
}: {
  title: string
  aside: string
  label: string
  children: ReactNode
}) {
  return (
    <div className="vl-breaks" role="img" aria-label={label}>
      <div className="vl-breaks-head">
        <span>{title}</span>
        <span>{aside}</span>
      </div>
      {children}
    </div>
  )
}

function Row({ k, v, tone }: { k: string; v: string; tone?: 'open' | 'closed' }) {
  return (
    <div className="vl-breaks-row vl-tour-kv">
      <span className="vl-breaks-meta">{k}</span>
      <span
        className={
          tone ? `vl-verdict ${tone === 'open' ? 'drift' : 'ok'}` : 'vl-breaks-text'
        }
      >
        {v}
      </span>
    </div>
  )
}

export type TourFrame = {
  id: string
  caption: string
  render: () => ReactNode
}

export const TOUR_FRAMES: readonly TourFrame[] = [
  {
    id: 'audit',
    caption: 'One audit holds the statements your team wrote.',
    render: () => (
      <Panel
        title="Daily checks · A day"
        aside="Statements"
        label="An audit called Daily checks, covering a day, with four statements and how many breaks each has open."
      >
        <Row k="Every exchange we complete is in NetSuite." v="1 open" tone="open" />
        <Row k="Every order we fulfil is billed in NetSuite." v="1 open" tone="open" />
        <Row k="Every order paid in Shopify has its payment in HotWax." v="holds" tone="closed" />
        <Row k="Every refund is booked at the same amount." v="holds" tone="closed" />
      </Panel>
    ),
  },
  {
    id: 'check',
    caption: 'Each statement is tested by a check that reads both systems.',
    render: () => (
      <Panel
        title="Add check"
        aside="Every exchange we complete is in NetSuite."
        label="A check for the exchange statement: it reads Shopify exchanges and NetSuite sales orders, matches them by order id, waits one grace day, and names Ops as the fix owner."
      >
        <Row k="Run" v="Shopify exchanges vs NetSuite sales orders" />
        <Row k="Matched by" v="Shopify order id" />
        <Row k="Grace days" v="1" />
        <Row k="Fix owner" v="Ops" />
        <Row k="Fix where" v="Shopify" />
      </Panel>
    ),
  },
  {
    id: 'morning',
    caption: 'At 06:00, this morning’s findings arrive.',
    render: () => (
      <BreakList
        title="This morning · 06:00"
        summary="2 open · 1 pending"
        label="This morning's findings: two open, one pending inside its grace day."
        items={[
          {
            text: 'Exchange for order 1038 isn’t in NetSuite',
            meta: 'cause: original order not fulfilled · owner: ops',
            state: 'open',
            badge: 'Open',
          },
          {
            text: 'Order 1042 fulfilled, not billed in NetSuite',
            meta: 'owner: finance ops',
            state: 'open',
            badge: 'Open',
          },
          {
            text: 'Order 1047 fulfilled last night',
            meta: 'inside its grace day',
            state: 'closed',
            badge: 'Pending',
          },
        ]}
      />
    ),
  },
  {
    id: 'finding',
    caption:
      'A finding shows its owner, the evidence on each side and, when Darpan can name it, the cause.',
    render: () => (
      <Panel
        title="Exchange for order 1038"
        aside="Open · first found Oct 14"
        label="One finding opened: owner Ops; Shopify shows the exchange completed on October 13, NetSuite has no sales order; cause, original order not fulfilled; fix, fulfil the original order."
      >
        <Row k="Owner" v="Ops" />
        <Row k="Shopify" v="Exchange completed Oct 13" />
        <Row k="NetSuite" v="No sales order" />
        <Row k="Cause" v="Original order not fulfilled" />
        <Row k="Fix" v="Fulfil the original order; the exchange follows." />
      </Panel>
    ),
  },
  {
    id: 'schedule',
    caption: 'One schedule runs every check, in your time zone.',
    render: () => (
      <Panel
        title="Audit settings"
        aside="Schedule"
        label="The audit's schedule: daily, at 06:00, in the company's time zone, covering every check."
      >
        <Row k="Daily" v="On" />
        <Row k="Time" v="06:00" />
        <Row k="Timezone" v="America/New_York" />
        <Row k="Covers" v="Every check in this audit" />
      </Panel>
    ),
  },
  {
    id: 'closed',
    caption:
      'When a later check sees it fixed, the finding closes and keeps its history.',
    render: () => (
      <Panel
        title="Exchange for order 1038"
        aside="Closed Oct 16"
        label="The same finding closed: found October 14, still open October 15, seen fixed and closed October 16."
      >
        <Row k="Oct 14" v="Found" tone="open" />
        <Row k="Oct 15" v="Still open" tone="open" />
        <Row k="Oct 16" v="Seen fixed · closed" tone="closed" />
      </Panel>
    ),
  },
]
