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

// What the video shows, in order, so a viewer knows what they are watching.
const chapters = [
  {
    k: 'Their words',
    p: 'A team describes how its month should close, the way they’d explain it to a new hire.',
  },
  {
    k: 'The agent’s checks',
    p: 'Darpan’s agent turns that story into checks anyone can read, and the team approves each one.',
  },
  {
    k: 'A real close',
    p: 'A brand’s actual month close: every break listed with its owner and the next step.',
  },
] as const

function TourPage() {
  return (
    <VlPage>
      <section className="vl-band is-plain" aria-labelledby="tour-heading">
        <div className="vl-wrap">
          <div className="vl-sec-head">
            <span className="vl-kicker">Tour</span>
            <h1 className="vl-h2" id="tour-heading">
              A month close that ends with a list, not a long night.
            </h1>
            <p className="vl-lede">
              Under three minutes, from a team’s own words to a real month
              close.
            </p>
          </div>
          <DemoVideo />
          <div className="vl-caps vl-tour-chapters">
            {chapters.map((c) => (
              <div className="vl-cap" key={c.k}>
                <div className="k">{c.k}</div>
                <p>{c.p}</p>
              </div>
            ))}
          </div>
          <p className="vl-page-cta">
            <a className="vl-cta" href={WALKTHROUGH_HREF}>
              Talk to us <span className="arr">&rarr;</span>
            </a>
            <a className="vl-textlink" href="/works-with">
              See what it connects to <span aria-hidden>&rarr;</span>
            </a>
          </p>
        </div>
      </section>
    </VlPage>
  )
}
