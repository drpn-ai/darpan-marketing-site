import { createFileRoute } from '@tanstack/react-router'
import { VlPage } from '@/components/VlChrome'
import { DemoVideo } from '@/components/DemoVideo'
import { WALKTHROUGH_HREF, pageHead } from '@/data/site'

export const Route = createFileRoute('/tour')({
  component: TourPage,
  head: () =>
    pageHead(
      '/tour',
      'Tour — Darpan',
      'Three minutes in Darpan: a team describes how its month should close, Darpan writes the checks, and a real month close lists every break with the team that owns it.',
    ),
})

function TourPage() {
  return (
    <VlPage>
      <section className="vl-band is-plain" aria-labelledby="tour-heading">
        <div className="vl-wrap">
          <div className="vl-sec-head">
            <span className="vl-kicker">Tour</span>
            <h1 className="vl-h2" id="tour-heading">
              Under three minutes, start to finish.
            </h1>
          </div>
          <DemoVideo />
          <p className="vl-page-cta">
            <a className="vl-cta" href={WALKTHROUGH_HREF}>
              Talk to us <span className="arr">&rarr;</span>
            </a>
            <a className="vl-textlink" href="/works-with">
              See what Darpan checks <span aria-hidden>&#8599;</span>
            </a>
          </p>
        </div>
      </section>
    </VlPage>
  )
}
