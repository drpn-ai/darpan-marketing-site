import { createFileRoute } from '@tanstack/react-router'
import { VlPage } from '@/components/VlChrome'
import { PAIRS } from '@/data/works-with'
import { WALKTHROUGH_HREF, pageHead } from '@/data/site'

export const Route = createFileRoute('/works-with/')({
  component: WorksWithPage,
  head: () =>
    pageHead(
      '/works-with',
      'Works with — Darpan',
      'Darpan reads Shopify, HotWax Commerce, NetSuite, MySQL, PostgreSQL, IBM Db2 and files over SFTP, and checks every morning that they still line up.',
    ),
})

function WorksWithPage() {
  return (
    <VlPage>
      <section className="vl-band is-plain" aria-labelledby="works-with-heading">
        <div className="vl-wrap">
          <div className="vl-sec-head">
            <span className="vl-kicker">Works with</span>
            <h1 className="vl-h2" id="works-with-heading">
              Reads the systems you already run.
            </h1>
            <p className="vl-lede">
              Each pair below lists what Darpan reads on each side and the
              statements it checks there every morning.
            </p>
          </div>
          <div className="vl-pairs">
            {PAIRS.map((pair) => (
              <a
                className="vl-pair-card"
                href={`/works-with/${pair.slug}`}
                key={pair.slug}
              >
                <h2>{pair.name}</h2>
                <p>{pair.summary}</p>
                <span className="vl-textlink">
                  What Darpan checks <span aria-hidden>&rarr;</span>
                </span>
              </a>
            ))}
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
