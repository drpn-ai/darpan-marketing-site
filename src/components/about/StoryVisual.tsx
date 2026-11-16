// The About story's picture: one stage that changes with the timeline beat in
// view, scrolling either way. Each piece lists the beats it shows in; pieces
// fade and slide in and out. Drawn in the shared 560 x 480 collage units.
// Order numbers, times and names are illustration; the facts are in the Facts
// register (three nights, $40,000, 23 real fixes, a close of a few hours).
import type { ReactNode } from 'react'
import { ListCard, Msg, at } from '@/components/home/Collage'

// Beats: 0 three nights, 1 write-off, 2 next month, 3 looking back,
// 4 so I built Darpan, 5 the first month.
function Piece({
  on,
  step,
  dim,
  children,
}: {
  on: readonly number[]
  step: number
  dim?: readonly number[]
  children: ReactNode
}) {
  const state = on.includes(step)
    ? 'is-on'
    : dim?.includes(step)
      ? 'is-dim'
      : ''
  return <div className={`vl-sv-piece ${state}`}>{children}</div>
}

const SHEET = [
  ['#4812', '$128.00', null],
  ['#4827', '$64.50', 'CM-2211'],
  ['#4833', '$212.00', null],
  ['#4851', '$89.00', null],
  ['#4866', '$46.00', 'CM-2219'],
  ['#4870', '$310.00', null],
] as const

export function StoryVisual({ step }: { step: number }) {
  return (
    <div
      className="vl-col vl-sv"
      role="img"
      aria-label="A picture that follows the story: a month-end refunds sheet full of missing credit memos and late-night messages; a note about writing off $40,000; the same breaks the next month; one break traced back to an ordinary day, found 27 days later; then a morning list where each break is a day old with an owner; and finally every break closed at the source and the month closed in a few hours."
    >
      <Piece on={[0, 1, 2]} dim={[3]} step={step}>
        <div className="vl-col-item vl-col-sheet" style={at(26, 70, 304, -3)}>
          <div className="vl-col-sheet-title">
            Refunds to match · {step >= 2 ? 'next month' : 'close, day 3'}
          </div>
          <div className="vl-col-sheet-grid is-head">
            <span>Order</span>
            <span>Refund</span>
            <span>Credit memo</span>
          </div>
          <div className="vl-col-sheet-grid">
            {SHEET.map(([order, refund, memo]) => [
              <span key={`${order}o`}>{order}</span>,
              <span key={`${order}r`}>{refund}</span>,
              memo ? (
                <span key={`${order}m`}>{memo}</span>
              ) : (
                <span key={`${order}m`} className="is-missing">
                  missing
                </span>
              ),
            ])}
          </div>
        </div>
      </Piece>

      <Piece on={[0, 1]} step={step}>
        <Msg
          style={at(302, 44, 236, 2)}
          initial="F"
          who="Finance · 11:52 PM"
          text="Are the numbers ready for the board?"
        />
      </Piece>
      <Piece on={[0, 1]} step={step}>
        <div
          className="vl-col-item vl-col-chip is-night"
          style={at(34, 372, undefined, -4)}
        >
          2:14 AM · night 3
        </div>
      </Piece>
      <Piece on={[1]} step={step}>
        <div className="vl-col-item vl-col-note" style={at(282, 250, 196, 4)}>
          write off the last $40,000?
        </div>
      </Piece>

      <Piece on={[2]} step={step}>
        <Msg
          style={at(296, 120, 236, -1.5)}
          initial="R"
          who="Retail ops · 1:37 AM"
          text="Same backorders as last month. Patch them again?"
        />
      </Piece>
      <Piece on={[2]} step={step}>
        <div
          className="vl-col-item vl-col-chip is-night"
          style={at(34, 372, undefined, -3)}
        >
          Month two · the same breaks
        </div>
      </Piece>

      <Piece on={[3]} step={step}>
        <div className="vl-col-item vl-sv-trace" style={at(130, 150, 320, 0)}>
          <span className="vl-sv-trace-k">One break, traced back</span>
          <span className="vl-sv-trace-title">
            Refund #4833 · no credit memo
          </span>
          <span className="vl-sv-trace-row">
            <span>Started</span>
            <span>an ordinary Tuesday</span>
          </span>
          <span className="vl-sv-trace-row">
            <span>Found</span>
            <span>at the close</span>
          </span>
          <span className="vl-sv-trace-gap">27 days later</span>
        </div>
      </Piece>

      <Piece on={[4]} step={step}>
        <ListCard
          style={at(20, 70, 356)}
          title="This morning · 06:00"
          summary="2 open"
          rows={[
            {
              text: 'Refund has no credit memo',
              meta: 'owner: finance',
              badge: 'day 1',
              open: true,
            },
            {
              text: 'Order on backorder, stock short',
              meta: 'owner: retail ops',
              badge: 'day 1',
              open: true,
            },
          ]}
        />
      </Piece>
      <Piece on={[4]} step={step}>
        <div className="vl-col-item vl-col-chip is-day" style={at(20, 352)}>
          Found the morning after
        </div>
      </Piece>

      <Piece on={[5]} step={step}>
        <ListCard
          style={at(20, 60, 356)}
          title="This morning · 06:00"
          summary="2 closed"
          rows={[
            {
              text: 'Refund has its credit memo',
              meta: 'fixed at the source',
              badge: 'closed',
              open: false,
            },
            {
              text: 'Backorder cleared',
              meta: 'fixed at the source',
              badge: 'closed',
              open: false,
            },
          ]}
        />
      </Piece>
      <Piece on={[5]} step={step}>
        <Msg
          style={at(368, 116, 182)}
          initial="F"
          who="Finance · 10:05 AM"
          text="Close is done. Board numbers are in."
        />
      </Piece>
      <Piece on={[5]} step={step}>
        <div
          className="vl-col-item vl-col-note is-calm"
          style={at(384, 286, 150)}
        >
          nothing to write off
        </div>
      </Piece>
      <Piece on={[5]} step={step}>
        <div className="vl-col-item vl-col-chip is-day" style={at(20, 352)}>
          Month-end close · a few hours
        </div>
      </Piece>
    </div>
  )
}
