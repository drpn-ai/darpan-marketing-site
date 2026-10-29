import { createFileRoute } from '@tanstack/react-router'
import { VlPage } from '@/components/VlChrome'
import { TOUR_FRAMES } from '@/components/tour/TourFrames'
import { WALKTHROUGH_HREF, pageHead } from '@/data/site'

export const Route = createFileRoute('/tour')({
  component: TourPage,
  head: () =>
    pageHead(
      '/tour',
      'Tour — Darpan',
      'One morning in Darpan: the statements your team wrote, the checks behind them, the findings at 06:00, and how a finding closes.',
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
              One morning, start to finish.
            </h1>
          </div>
          <ol className="vl-tour">
            {TOUR_FRAMES.map((frame, i) => (
              <li className="vl-tour-frame" key={frame.id}>
                <p className="vl-tour-caption">
                  <span className="vl-tour-step">{i + 1}</span>
                  {frame.caption}
                </p>
                {frame.render()}
              </li>
            ))}
          </ol>
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
