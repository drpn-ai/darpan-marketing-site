import type { CSSProperties } from 'react'
import { writingEntries, pillarColor } from '@/data/writing-entries'
import { HOME_NOTE_SLUGS } from '@/data/site'

export function NotesStrip() {
  const entries = HOME_NOTE_SLUGS.map((slug) =>
    writingEntries.find((e) => e.slug === slug),
  ).filter((e) => e !== undefined)

  return (
    <section className="vl-band" aria-labelledby="vl-notes-heading">
      <div className="vl-wrap">
        <div className="vl-sec-head" data-reveal>
          <span className="vl-kicker">Notes</span>
          <h2 className="vl-h2" id="vl-notes-heading">
            Where systems drift, and what to do about it.
          </h2>
        </div>
        <div className="vl-cards">
          {entries.map((entry) => (
            <a
              className="vl-card"
              key={entry.slug}
              href={`/notes/${entry.slug}`}
              style={
                {
                  '--pillar': pillarColor[entry.category] ?? '#8a867a',
                } as CSSProperties
              }
            >
              <span className="tag">{entry.category}</span>
              <h3>{entry.title}</h3>
              <span className="date">{entry.date}</span>
            </a>
          ))}
        </div>
        <a className="vl-notes-more" href="/notes">
          All notes <span aria-hidden>&rarr;</span>
        </a>
      </div>
    </section>
  )
}
