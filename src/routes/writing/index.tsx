import { createFileRoute } from '@tanstack/react-router'
import { writingEntries } from '@/data/writing-entries'

export const Route = createFileRoute('/writing/')({
  component: WritingIndexPage,
  head: () => ({
    meta: [{ title: 'Writing — Darpan' }],
  }),
})

function WritingIndexPage() {
  return (
    <main className="legal-page section-band">
      <div className="container legal-container">
        <span className="label-smallcaps">05 · Writing</span>
        <h1>Notes from the team.</h1>
        <p>
          Working notes on reconciliation, retail data, and how the books close
          when they do. New entries land as we have something worth writing
          down.
        </p>
        <ul className="writing-list" style={{ marginTop: 48 }}>
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
      </div>
    </main>
  )
}
