import { createFileRoute, redirect } from '@tanstack/react-router'
import { VlPage } from '@/components/VlChrome'
import { BreakList } from '@/components/BreakList'
import { findPair } from '@/data/works-with'
import { WALKTHROUGH_HREF, pageHead } from '@/data/site'

export const Route = createFileRoute('/works-with/$pair')({
  component: PairPage,
  // Only the pairs Darpan supports have a page; anything else lands on the hub.
  beforeLoad: ({ params }) => {
    if (!findPair(params.pair)) {
      throw redirect({ to: '/works-with', statusCode: 301 })
    }
  },
  head: ({ params }) => {
    const pair = findPair(params.pair)
    return pageHead(
      `/works-with/${params.pair}`,
      `${pair?.name ?? 'Works with'} — Darpan`,
      pair?.description ?? '',
    )
  },
})

function PairPage() {
  const { pair: slug } = Route.useParams()
  const pair = findPair(slug)
  if (!pair) return null

  return (
    <VlPage>
      <section className="vl-band is-plain" aria-labelledby="pair-heading">
        <div className="vl-wrap">
          <div className="vl-sec-head">
            <span className="vl-kicker">
              <a href="/works-with">Works with</a> &middot; {pair.name}
            </span>
            <h1 className="vl-h2" id="pair-heading">
              {pair.h1}
            </h1>
            <p className="vl-lede">{pair.description}</p>
          </div>

          <div className="vl-pair-grid">
            <div>
              <h2 className="vl-pair-sub">What Darpan reads</h2>
              <dl className="vl-pair-reads">
                {pair.reads.map((r) => (
                  <div key={r.system}>
                    <dt>{r.system}</dt>
                    <dd>{r.records}</dd>
                  </div>
                ))}
              </dl>

              <h2 className="vl-pair-sub">What Darpan checks</h2>
              <ul className="vl-statements">
                {pair.statements.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>

            <BreakList
              title="This morning · 06:00"
              summary="1 open"
              items={[pair.exampleBreak]}
              label={`An example break for ${pair.name}: ${pair.exampleBreak.text}, ${pair.exampleBreak.meta}, open since day 1.`}
            />
          </div>

          <p className="vl-page-cta">
            <a className="vl-cta" href={WALKTHROUGH_HREF}>
              Talk to us <span className="arr">&rarr;</span>
            </a>
            <a className="vl-textlink" href="/tour">
              See a morning&rsquo;s breaks <span aria-hidden>&#8599;</span>
            </a>
          </p>
        </div>
      </section>
    </VlPage>
  )
}
