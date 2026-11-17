import { createFileRoute } from '@tanstack/react-router'
import { PageClose } from '@/components/PageClose'
import { VlPage } from '@/components/VlChrome'
import { StoryVisual } from '@/components/about/StoryVisual'
import { useActiveBeat } from '@/components/about/useActiveBeat'
import { useReveal } from '@/components/useReveal'
import { pageHead } from '@/data/site'

// Why Darpan exists, in Aditi Patel's words (2026-11-16): the founder story in
// full (the home page carries a short version), what it taught us, and where
// Darpan is today. Every claim is in the Facts register.
export const Route = createFileRoute('/about')({
  component: AboutPage,
  head: () =>
    pageHead(
      '/about',
      'About — Darpan',
      'Darpan means mirror: every morning it holds your systems up side by side, so your team sees each break the day it starts. Aditi Patel built it after closing the month by hand.',
    ),
})

const LINKEDIN = 'https://www.linkedin.com/company/drpn-ai'

const beliefs = [
  {
    k: 'Every morning is a close day.',
    p: 'Breaks start on ordinary days. Looking every morning finds each one while it is a day old and still small.',
  },
  {
    k: 'Fix it at the source, not by hand.',
    p: 'A patch keeps the numbers right for one month. A fix in the system keeps the same break from coming back.',
  },
  {
    k: 'The answer belongs to the team.',
    p: 'When someone explains a break once, it should be remembered for good, not live in one person’s head.',
  },
] as const

const today = [
  { n: '5+', k: 'brands live' },
  { n: '100+', k: 'fixes in code' },
  { n: '0', k: 'records changed' },
] as const

function AboutPage() {
  useReveal()
  // The picture follows the timeline beat at the middle of the screen.
  const { active, beatRef } = useActiveBeat(6)
  return (
    <VlPage>
      <section className="vl-band is-plain" aria-labelledby="about-heading">
        <div className="vl-wrap vl-split vl-about-hero">
          <div className="vl-sec-head" data-reveal>
            <span className="vl-kicker is-agree">About</span>
            <h1 className="vl-h2" id="about-heading">
              Darpan means mirror.
            </h1>
            <p className="vl-lede">
              Every morning it holds your systems up side by side, so your team
              sees each break the day it starts, not at month-end. I built it
              after closing the month by hand, so no team has to do that again.
            </p>
            <a
              className="vl-linkedin"
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow Darpan on LinkedIn <span aria-hidden>&#8599;</span>
            </a>
          </div>
          <div className="vl-split-visual">
            <div className="vl-founder" data-reveal>
              <span className="vl-founder-frame">
                <img
                  className="vl-founder-photo"
                  src="/team/aditi-patel.webp"
                  alt="Aditi Patel, founder of Darpan, drawn in pencil"
                  width={720}
                  height={720}
                  loading="lazy"
                />
              </span>
              <span className="vl-founder-name">Aditi Patel</span>
              <span className="vl-founder-role">Founder, Darpan</span>
              <p>
                Built Darpan inside an order-management team, starting from the
                close she used to do by hand.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="vl-band" aria-labelledby="about-story-heading">
        <div className="vl-wrap">
          <div className="vl-sec-head" data-reveal>
            <span className="vl-kicker is-agree">The story</span>
            <h2 className="vl-h2" id="about-story-heading">
              How one close changed how I think about every day.
            </h2>
          </div>
          <div className="vl-split vl-story">
            <ol className="vl-timeline">
              <li className="is-night" data-reveal ref={beatRef(0)}>
                <span className="vl-timeline-k">Three nights</span>
                <p className="vl-timeline-big">Three nights on one close.</p>
                <p className="vl-timeline-small">
                  An integration team, a retail tech ops lead and me, chasing
                  refunds and backorders until the numbers lined up.
                </p>
              </li>
              <li className="is-night" data-reveal ref={beatRef(1)}>
                <span className="vl-timeline-k">The write-off</span>
                <p className="vl-timeline-big">
                  <span className="vl-timeline-num">$40,000</span> written off.
                </p>
                <p className="vl-timeline-small">
                  Even after three nights, some refunds couldn’t be traced, so
                  we wrote them off and closed the month.
                </p>
              </li>
              <li className="is-night" data-reveal ref={beatRef(2)}>
                <span className="vl-timeline-k">The next month</span>
                <p className="vl-timeline-big">The same breaks came back.</p>
                <p className="vl-timeline-small">
                  Found at month-end with the board waiting, they only got
                  patched by hand. The real fix never happened.
                </p>
              </li>
              <li className="is-turn" data-reveal ref={beatRef(3)}>
                <span className="vl-timeline-k">Looking back</span>
                <p className="vl-timeline-big">Not a month-end problem.</p>
                <p className="vl-timeline-small">
                  Every break had started weeks earlier, on an ordinary day. We
                  just found it too late to fix properly.
                </p>
              </li>
              <li className="is-turn" data-reveal ref={beatRef(4)}>
                <span className="vl-timeline-k">So I built Darpan</span>
                <p className="vl-timeline-big">Check every morning.</p>
                <p className="vl-timeline-small">
                  Caught the morning after, a break is small, its cause is
                  fresh, and there is time to fix it for real.
                </p>
              </li>
              <li className="is-turn" data-reveal ref={beatRef(5)}>
                <span className="vl-timeline-k">
                  The first month with Darpan
                </span>
                <p className="vl-timeline-big">
                  <span className="vl-timeline-num">23</span> real fixes, in
                  code.
                </p>
                <p className="vl-timeline-small">
                  Each break fixed in the system that caused it, not patched in
                  the data, and the close took a few hours.
                </p>
                <p className="vl-about-sign">Aditi Patel, founder</p>
              </li>
            </ol>
            <div className="vl-split-visual vl-story-visual">
              <div className="vl-sv-stick">
                <StoryVisual step={active} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="vl-band" aria-labelledby="about-believe-heading">
        <div className="vl-wrap">
          <div className="vl-sec-head" data-reveal>
            <span className="vl-kicker is-agree">What we believe</span>
            <h2 className="vl-h2 is-line" id="about-believe-heading">
              Three things those nights taught us.
            </h2>
          </div>
          <div className="vl-promises">
            {beliefs.map((b) => (
              <div className="vl-promise" key={b.k} data-reveal>
                <h3>{b.k}</h3>
                <p>{b.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageClose
        id="about-cta"
        title="See what Darpan finds."
        link={{
          href: LINKEDIN,
          label: 'Follow Darpan on LinkedIn',
          external: true,
        }}
      >
        <ul className="vl-about-proof" aria-label="Darpan today">
          {today.map((t) => (
            <li key={t.k}>
              <span className="n">{t.n}</span>
              <span className="k">{t.k}</span>
            </li>
          ))}
        </ul>
      </PageClose>
    </VlPage>
  )
}
