// A morning's list of breaks, drawn the way the product shows them: each row is
// one break with its cause or owner underneath, open until a later check sees it
// fixed. Used by the homepage hero, the works-with pages and the tour.

export type BreakItem = {
  text: string
  meta: string
  state: 'open' | 'closed'
  badge: string
}

export function BreakList({
  title,
  summary,
  items,
  label,
}: {
  title: string
  summary: string
  items: readonly BreakItem[]
  label: string
}) {
  return (
    <div className="vl-breaks" role="img" aria-label={label}>
      <div className="vl-breaks-head">
        <span className="vl-breaks-title">{title}</span>
        <span className="vl-breaks-summary">{summary}</span>
      </div>
      {items.map((item) => (
        <div className="vl-breaks-row" key={item.text}>
          <div>
            <span className="vl-breaks-text">{item.text}</span>
            <span className="vl-breaks-meta">{item.meta}</span>
          </div>
          <span
            className={`vl-verdict ${item.state === 'open' ? 'drift' : 'ok'}`}
          >
            {item.badge}
          </span>
        </div>
      ))}
    </div>
  )
}
