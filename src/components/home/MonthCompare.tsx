// One month drawn two ways, beside the founder story in "Why we built it":
// breaks found at the close (three nights of work) against breaks found the
// morning after (a small check every day, a close of a few hours).
// Facts: the Facts register rows dated 2026-11-16.

const DAYS = Array.from({ length: 30 }, (_, i) => i + 1)

export function MonthCompare() {
  return (
    <div
      className="vl-month"
      role="img"
      aria-label="One month, two ways. Before: nothing is checked for 27 days, then three nights of work at the close. With Darpan: a check every morning, and a close of a few hours."
    >
      <div className="vl-breaks-head">
        <span className="vl-breaks-title">One month, two ways</span>
        <span className="vl-breaks-summary">30 days</span>
      </div>

      <div className="vl-month-row">
        <span className="vl-month-label">Before</span>
        <div className="vl-month-days">
          {DAYS.map((d) => (
            <span
              key={d}
              className={`vl-month-day${d > 27 ? ' is-night' : ''}`}
            />
          ))}
        </div>
        <span className="vl-month-note">
          Found at the close <span className="is-drift">· three nights</span>
        </span>
      </div>

      <div className="vl-month-row">
        <span className="vl-month-label">With Darpan</span>
        <div className="vl-month-days">
          {DAYS.map((d) => (
            <span
              key={d}
              className={`vl-month-day is-checked${d === 30 ? ' is-close' : ''}`}
            />
          ))}
        </div>
        <span className="vl-month-note">
          Found the next morning{' '}
          <span className="is-agree">· a few hours at the close</span>
        </span>
      </div>
    </div>
  )
}
