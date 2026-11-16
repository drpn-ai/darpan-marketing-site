import { createFileRoute } from '@tanstack/react-router'
import { VlPage } from '@/components/VlChrome'
import { StoryVisual } from '@/components/about/StoryVisual'
import { useActiveBeat } from '@/components/about/useActiveBeat'
import { useReveal } from '@/components/useReveal'
import { WALKTHROUGH_HREF, pageHead } from '@/data/site'

// Why Darpan exists, in Aditi Patel's words (2026-11-16): the founder story in
// full (the home page carries a short version), what it taught us, and where
// Darpan is today. Every claim is in the Facts register.
export const Route = createFileRoute('/about')({
  component: AboutPage,
  head: () =>
    pageHead(
      '/about',
      'About — Darpan',
      'Darpan began with three nights at one month-end close. Aditi Patel built it so every morning is a close day: breaks caught while they are small, and fixed for good.',
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
  { n: '5+', k: 'brands run it every morning' },
  { n: '100+', k: 'real fixes made in code' },
  { n: 'Hours', k: 'to close the month, not nights' },
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
              Darpan began with three nights at one month-end close.
            </h1>
            <p className="vl-lede">
              It was built by someone who closed the month by hand, so that no
              team has to spend its nights that way again.
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
              <span className="vl-founder-mark" aria-hidden>
                AP
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
                <p className="vl-timeline-big">
                  Three nights on one month-end close.
                </p>
                <p className="vl-timeline-small">
                  An integration team, a retail tech ops lead and me, chasing
                  refunds with no credit memo and orders stuck on backorder
                  until the numbers the board would see lined up.
                </p>
              </li>
              <li className="is-night" data-reveal ref={beatRef(1)}>
                <span className="vl-timeline-k">The write-off</span>
                <p className="vl-timeline-big">
                  <span className="vl-timeline-num">$40,000</span> written off,
                  because we couldn’t trace it.
                </p>
              </li>
              <li className="is-night" data-reveal ref={beatRef(2)}>
                <span className="vl-timeline-k">The next month</span>
                <p className="vl-timeline-big">The same breaks were back.</p>
                <p className="vl-timeline-small">
                  We had found them at month-end with the board waiting, so
                  there was only time to patch the numbers by hand. The real
                  fix, a change to the code, could wait. Once the close was
                  over, it never happened.
                </p>
              </li>
              <li className="is-turn" data-reveal ref={beatRef(3)}>
                <span className="vl-timeline-k">Looking back</span>
                <p className="vl-timeline-big">
                  None of it was a month-end problem.
                </p>
                <p className="vl-timeline-small">
                  Every break had started weeks earlier, on an ordinary day. The
                  breaks weren’t the problem. Finding them too late to fix
                  properly was.
                </p>
              </li>
              <li className="is-turn" data-reveal ref={beatRef(4)}>
                <span className="vl-timeline-k">So I built Darpan</span>
                <p className="vl-timeline-big">
                  Check every morning, not every month.
                </p>
                <p className="vl-timeline-small">
                  Caught the morning after, a break is small, its cause is still
                  fresh, and there is time to fix it for real.
                </p>
              </li>
              <li className="is-turn" data-reveal ref={beatRef(5)}>
                <span className="vl-timeline-k">
                  The first month with Darpan
                </span>
                <p className="vl-timeline-big">
                  <span className="vl-timeline-num">23</span> real fixes. A
                  close of a few hours.
                </p>
                <p className="vl-timeline-small">
                  Every break was fixed in the system that caused it, with a
                  change to the code, not a makeshift patch to the data.
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
            <h2 className="vl-h2" id="about-believe-heading">
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

      <section className="vl-band" aria-labelledby="about-today-heading">
        <div className="vl-wrap">
          <div className="vl-sec-head" data-reveal>
            <span className="vl-kicker is-agree">Today</span>
            <h2 className="vl-h2" id="about-today-heading">
              From one team’s close to brands’ every morning.
            </h2>
          </div>
          <div className="vl-caps vl-about-today">
            {today.map((t) => (
              <div className="vl-cap" key={t.k} data-reveal>
                <span className="vl-brain-num">{t.n}</span>
                <div className="k">{t.k}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="vl-close">
        <div className="vl-wrap">
          <h2>Come and see your own mornings.</h2>
          <div className="vl-hero-cta">
            <a className="vl-close-cta" href={WALKTHROUGH_HREF}>
              Talk to us <span className="arr">&rarr;</span>
            </a>
            <a
              className="vl-linkedin"
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow Darpan on LinkedIn <span aria-hidden>&#8599;</span>
            </a>
          </div>
        </div>
      </section>
    </VlPage>
  )
}
