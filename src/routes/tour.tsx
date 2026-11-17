import { createFileRoute } from '@tanstack/react-router'
import { PageClose } from '@/components/PageClose'
import { VlPage } from '@/components/VlChrome'
import { useReveal } from '@/components/useReveal'
import { TourPlayer } from '@/components/TourPlayer'
import { WALKTHROUGH_HREF, pageHead } from '@/data/site'

export const Route = createFileRoute('/tour')({
  component: TourPage,
  head: () =>
    pageHead(
      '/tour',
      'Tour — Darpan',
      'A ten-stop tour of Darpan in under three minutes: a team tells the agent how its business should run, approves the checks, and a real month is checked, every break listed with its owner.',
    ),
})

function TourPage() {
  useReveal()
  return (
    <VlPage>
      <section className="vl-band is-plain" aria-labelledby="tour-heading">
        <div className="vl-wrap">
          <div className="vl-sec-head vl-tour-head" data-reveal>
            <span className="vl-kicker">Tour</span>
            <h1 className="vl-h2 is-line" id="tour-heading">
              Watch Darpan find every break.
            </h1>
            <p className="vl-lede">
              Ten stops in under three minutes. Pick one to jump straight to it.
            </p>
            <div className="vl-hero-cta">
              <a className="vl-cta" href={WALKTHROUGH_HREF}>
                Talk to us <span className="arr">&rarr;</span>
              </a>
              <a className="vl-textlink" href="/agent">
                Meet the agent <span aria-hidden>&rarr;</span>
              </a>
            </div>
          </div>
          <TourPlayer />
        </div>
      </section>
      <PageClose
        title="See it on your own systems."
        link={{ href: '/works-with', label: 'See what it connects to' }}
      />
    </VlPage>
  )
}
