// The story bands' pictures: a collage of the work items a team actually sees,
// drawn as one 560 × 480 design and scaled by container width (--u is one
// design pixel). Each collage has a "before" layer (the mess) and an "after"
// layer (the calm); `settled` swaps them. The order numbers, times and
// messages are illustrations; the facts they stand for are in the Facts
// register (three nights, $40,000, a close of a few hours, nine exchanges).
import type { CSSProperties, ReactNode, Ref } from 'react'

export const at = (x: number, y: number, w?: number, r = 0) =>
  ({ '--x': x, '--y': y, '--w': w, '--r': `${r}deg` }) as CSSProperties

export function Collage({
  label,
  settled,
  before,
  after,
  visualRef,
}: {
  label: string
  settled: boolean
  before: ReactNode
  after: ReactNode
  visualRef: Ref<HTMLDivElement>
}) {
  return (
    <div
      ref={visualRef}
      className={`vl-col${settled ? ' is-settled' : ''}`}
      role="img"
      aria-label={label}
    >
      <div className="vl-col-layer is-before" aria-hidden>
        {before}
      </div>
      <div className="vl-col-layer is-after" aria-hidden>
        {after}
      </div>
    </div>
  )
}

export function Msg({
  style,
  initial,
  who,
  text,
}: {
  style: CSSProperties
  initial: string
  who: string
  text: string
}) {
  return (
    <div className="vl-col-item vl-col-msg" style={style}>
      <span className="vl-col-avatar">{initial}</span>
      <span>
        <span className="vl-col-who">{who}</span>
        <span className="vl-col-text">{text}</span>
      </span>
    </div>
  )
}

export function ListCard({
  style,
  title,
  summary,
  rows,
}: {
  style: CSSProperties
  title: string
  summary: string
  rows: readonly { text: string; meta: string; badge: string; open: boolean }[]
}) {
  return (
    <div className="vl-col-item vl-col-list" style={style}>
      <div className="vl-col-list-head">
        <span>{title}</span>
        <span>{summary}</span>
      </div>
      {rows.map((row) => (
        <div className="vl-col-list-row" key={row.text}>
          <span>
            <span className="vl-col-text">{row.text}</span>
            <span className="vl-col-meta">{row.meta}</span>
          </span>
          <span
            className={`vl-col-badge ${row.open ? 'is-open' : 'is-closed'}`}
          >
            {row.badge}
          </span>
        </div>
      ))}
    </div>
  )
}
