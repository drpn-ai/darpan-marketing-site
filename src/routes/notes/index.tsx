import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { writingEntries, pillarColor } from '@/data/writing-entries'
import { getArticle } from '@/data/writing-content'
import { Byline } from '@/components/Byline'
import { PageClose } from '@/components/PageClose'
import { VlPage } from '@/components/VlChrome'
import { pageHead } from '@/data/site'

// Only surface entries whose article body actually exists — an entry listed
// ahead of its content stays hidden until it's written.
const publishedEntries = writingEntries.filter((entry) =>
  getArticle(entry.slug),
)

export const Route = createFileRoute('/notes/')({
  component: WritingIndexPage,
  head: () =>
    pageHead(
      '/notes',
      'Notes — Darpan',
      'Working notes on where systems drift between each other, and what to do about it.',
    ),
})

// The kinds of note, biggest first, for the filter row above the wall.
const kinds = Object.entries(
  publishedEntries.reduce<Record<string, number>>((acc, entry) => {
    acc[entry.category] = (acc[entry.category] ?? 0) + 1
    return acc
  }, {}),
).sort((x, y) => y[1] - x[1])

const summary = (slug: string) => getArticle(slug)?.description ?? ''

function WritingIndexPage() {
  const [kind, setKind] = useState<string | null>(null)
  const shown = kind
    ? publishedEntries.filter((entry) => entry.category === kind)
    : publishedEntries
  const [featured, ...rest] = shown
  const pillar = (category: string) =>
    ({ '--pillar': pillarColor[category] ?? '#8a867a' }) as React.CSSProperties
  return (
    <VlPage>
      <section
        className="vl-band is-plain vl-notes"
        aria-labelledby="writing-heading"
      >
        <div className="vl-wrap">
          <div className="vl-sec-head">
            <span className="vl-kicker">Notes</span>
            <h1 className="vl-h2 is-line" id="writing-heading">
              Notes from the team.
            </h1>
            <p className="vl-lede">
              Working notes on reconciliation: matching data across the systems
              that never quite line up, and proving what&rsquo;s left over. For
              operators and finance both.
            </p>
          </div>

          <div className="vl-board">
            {featured ? (
              <a
                className="vl-card vl-board-note"
                href={`/notes/${featured.slug}`}
                style={pillar(featured.category)}
              >
                <span className="vl-board-pin" aria-hidden />
                <span className="tag">Latest · {featured.category}</span>
                <h2>{featured.title}</h2>
                <p>{summary(featured.slug)}</p>
                <Byline date={featured.date} />
              </a>
            ) : null}
            <div
              className={`vl-board-scraps${kind ? ' is-filtered' : ''}`}
              role="group"
              aria-label="Filter notes by kind"
            >
              {[['All', publishedEntries.length] as const, ...kinds].map(
                ([name, count]) => {
                  const value = name === 'All' ? null : name
                  const on = kind === value
                  return (
                    <button
                      type="button"
                      key={name}
                      className={`vl-scrap${on ? ' is-on' : ''}`}
                      aria-pressed={on}
                      onClick={() => setKind(value)}
                      style={
                        value
                          ? pillar(value)
                          : ({
                              '--pillar': 'var(--ink-2)',
                            } as React.CSSProperties)
                      }
                    >
                      <span className="vl-scrap-pin" aria-hidden />
                      <span className="n">{count}</span>
                      <span className="k">{name}</span>
                    </button>
                  )
                },
              )}
            </div>
          </div>

          <div className="vl-cards vl-notes-wall">
            {rest.map((entry) => (
              <a
                className="vl-card"
                key={entry.slug}
                href={`/notes/${entry.slug}`}
                style={pillar(entry.category)}
              >
                <span className="tag">{entry.category}</span>
                <h3>{entry.title}</h3>
                <p>{summary(entry.slug)}</p>
                <span className="date">{entry.date}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
      <PageClose
        title="Let Darpan run these checks for you."
        link={{ href: '/tour', label: 'Watch the three-minute tour' }}
      />
    </VlPage>
  )
}
