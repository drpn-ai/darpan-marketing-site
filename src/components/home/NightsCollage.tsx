// Beside "Why we built it": the three nights of one close (a refunds sheet
// with missing credit memos, late messages, a write-off note) settle into one
// calm morning list when the story turns to Darpan.
import type { Ref } from 'react'
import { Collage, ListCard, Msg, at } from '@/components/home/Collage'

const SHEET = [
  ['#4812', '$128.00', null],
  ['#4827', '$64.50', 'CM-2211'],
  ['#4833', '$212.00', null],
  ['#4851', '$89.00', null],
  ['#4866', '$46.00', 'CM-2219'],
  ['#4870', '$310.00', null],
  ['#4874', '$72.00', null],
] as const

export function NightsCollage({
  settled,
  visualRef,
}: {
  settled: boolean
  visualRef: Ref<HTMLDivElement>
}) {
  return (
    <Collage
      visualRef={visualRef}
      settled={settled}
      label="Before: a refunds sheet full of missing credit memos, messages at midnight about the board numbers and the same backorders, and a note asking whether to write off $40,000. After: one morning list with owners, the close done by mid-morning, nothing to write off."
      before={
        <>
          <svg
            className="vl-col-item vl-col-ring"
            style={at(404, 318, 120)}
            viewBox="0 0 120 120"
          >
            <circle cx="60" cy="60" r="44" />
            <circle cx="62" cy="58" r="40" />
          </svg>
          <div className="vl-col-item vl-col-sheet" style={at(26, 70, 304, -3)}>
            <div className="vl-col-sheet-title">
              Refunds to match · close, day 3
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
          <Msg
            style={at(302, 44, 236, 2)}
            initial="F"
            who="Finance · 11:52 PM"
            text="Are the numbers ready for the board?"
          />
          <Msg
            style={at(284, 156, 236, -1.5)}
            initial="R"
            who="Retail ops · 1:37 AM"
            text="Same backorders as last month. Patch them again?"
          />
          <div
            className="vl-col-item vl-col-chip is-night"
            style={at(34, 352, undefined, -4)}
          >
            2:14 AM · night 3
          </div>
          <div className="vl-col-item vl-col-note" style={at(252, 296, 176, 4)}>
            write off the last $40,000?
          </div>
        </>
      }
      after={
        <>
          <svg
            className="vl-col-light"
            viewBox="0 0 560 480"
            preserveAspectRatio="none"
          >
            <polygon points="360,0 420,0 160,480 100,480" />
            <polygon points="450,0 500,0 240,480 190,480" />
          </svg>
          <ListCard
            style={at(20, 60, 356)}
            title="This morning · 06:00"
            summary="2 open · 1 closed"
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
              {
                text: 'Yesterday’s refund has its memo',
                meta: 'fixed at the source',
                badge: 'closed',
                open: false,
              },
            ]}
          />
          <Msg
            style={at(368, 116, 182)}
            initial="F"
            who="Finance · 10:05 AM"
            text="Close is done. Board numbers are in."
          />
          <div
            className="vl-col-item vl-col-note is-calm"
            style={at(384, 286, 150)}
          >
            nothing to write off
          </div>
          <div className="vl-col-item vl-col-chip is-day" style={at(20, 352)}>
            Month-end close · a few hours
          </div>
        </>
      }
    />
  )
}
