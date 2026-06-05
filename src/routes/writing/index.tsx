import { createFileRoute } from '@tanstack/react-router'
import { writingEntries, pillarColor } from '@/data/writing-entries'
import { VlPage } from '@/components/VlChrome'

export const Route = createFileRoute('/writing/')({
  component: WritingIndexPage,
  head: () => ({
    meta: [{ title: 'Writing — Darpan' }],
  }),
})

function WritingIndexPage() {
  return (
    <VlPage>
      <section className="vl-band is-plain" aria-labelledby="writing-heading">
        <div className="vl-wrap">
          <div className="vl-sec-head">
            <span className="vl-kicker">Notes</span>
            <h2 className="vl-h2" id="writing-heading">
              Notes from the team.
            </h2>
            <p className="vl-lede">
              Working notes on reconciliation, retail data, and how the books
              close when they do. New entries land as we have something worth
              writing down.
            </p>
          </div>
          <div className="vl-cards-wall">
            {writingEntries.map((entry) => (
              <a
                className="vl-card"
                key={entry.slug}
                href={`/writing/${entry.slug}`}
                style={
                  {
                    '--pillar': pillarColor[entry.category] ?? '#8a867a',
                  } as React.CSSProperties
                }
              >
                <span className="tag">{entry.category}</span>
                <h3>{entry.title}</h3>
                <span className="date">{entry.date}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </VlPage>
  )
}
