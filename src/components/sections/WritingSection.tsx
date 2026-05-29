import { writingEntries } from '@/data/writing-entries'

export function WritingSection() {
  return (
    <section
      id="writing"
      className="section-band writing"
      aria-labelledby="writing-heading"
    >
      <div className="container">
        <div className="section-header">
          <span className="section-numeral" aria-hidden>05</span>
          <h2 id="writing-heading">Notes from the team</h2>
        </div>
        <ul className="writing-list">
          {writingEntries.map((entry) => (
            <li key={entry.slug} className="writing-entry">
              <span className="writing-meta label-smallcaps">
                {entry.date}
                <span aria-hidden> · </span>
                {entry.category}
              </span>
              <h3 className="writing-title">
                <a href={`/writing/${entry.slug}`}>{entry.title}</a>
              </h3>
              <span className="writing-detail">{entry.meta}</span>
            </li>
          ))}
        </ul>
        <a className="writing-all" href="/writing">
          All notes →
        </a>
      </div>
    </section>
  )
}
