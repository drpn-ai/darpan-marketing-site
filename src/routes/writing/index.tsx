import { createFileRoute } from '@tanstack/react-router'
import { writingEntries, pillarColor } from '@/data/writing-entries'
import { getArticle } from '@/data/writing-content'
import { VlPage } from '@/components/VlChrome'

// Only surface entries whose article body actually exists — an entry listed
// ahead of its content stays hidden until it's written.
const publishedEntries = writingEntries.filter((entry) => getArticle(entry.slug))

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
            {publishedEntries.map((entry) => (
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
