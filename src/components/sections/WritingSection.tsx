import { writingEntries } from '@/data/writing-entries'
import { NotebookDoodle } from '@/components/NotebookDoodle'
import { NoteCard } from '@/components/NoteCard'

export function WritingSection() {
  return (
    <section
      id="writing"
      className="section-band writing"
      aria-labelledby="writing-heading"
    >
      <div className="container">
        <div className="section-header" style={{ position: 'relative' }}>
          <span className="section-numeral" aria-hidden>05</span>
          <h2 id="writing-heading">Notes from the team</h2>
          <NotebookDoodle
            kind="margin-arrow"
            delay={400}
            style={{ left: '-66px', top: '6px' }}
          />
        </div>
        <ul className="note-board">
          {writingEntries.slice(0, 4).map((entry, i) => (
            <NoteCard
              key={entry.slug}
              entry={entry}
              index={i}
              delay={400 + i * 120}
            />
          ))}
        </ul>
        <a className="writing-all" href="/notes">
          All notes →
        </a>
      </div>
    </section>
  )
}
