import { createFileRoute } from '@tanstack/react-router'
import { HeroFacts } from '@/components/HeroFacts'
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
      'Darpan means mirror: every day it holds your systems up side by side, so your team sees each break the day it starts. Aditi Patel built it after closing the month by hand.',
    ),
})

const LINKEDIN = 'https://www.linkedin.com/company/drpn-ai'

const today = [
  { n: '5+', k: 'brands live' },
  { n: '100+', k: 'code fixes' },
  { n: '50+', k: 'hours saved' },
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
              Every day it holds your systems up side by side, so your team
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
            <HeroFacts
              label="Darpan today"
              items={today.map((t) => ({ k: t.n, p: t.k }))}
            />
          </div>
          <div className="vl-split-visual">
            <figure className="vl-founder" data-reveal>
              <img
                className="vl-founder-photo"
                src="/team/aditi-patel.webp"
                alt="Aditi Patel, founder of Darpan, drawn in pencil"
                width={720}
                height={720}
                loading="lazy"
              />
              <figcaption>
                <span className="vl-founder-name">Aditi Patel</span>
                <span className="vl-founder-role">Founder, Darpan</span>
              </figcaption>
            </figure>
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
                <p className="vl-timeline-big">Check every day.</p>
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
              </li>
            </ol>
            <div className="vl-split-visual vl-story-visual">
              <div className="vl-sv-stick" data-reveal>
                <StoryVisual step={active} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The values as a letter from Aditi, in her words (2026-11-17): a
          mirror shows, it never blames; fix the root cause, in customers'
          systems and our own code; need Darpan less every month. */}
      <section className="vl-band" aria-labelledby="about-believe-heading">
        <div className="vl-wrap vl-split is-flip vl-letter">
          <div className="vl-sec-head" data-reveal>
            <span className="vl-kicker is-agree">Core values</span>
            <h2 className="vl-h2" id="about-believe-heading">
              What those nights taught me.
            </h2>
            <div className="vl-letter-body">
              <h3>Clarity</h3>
              <p>
                Darpan means mirror, and a mirror{' '}
                <span className="mk">shows, it never blames</span>. We are not
                here to police your data. We want every team to see what broke,
                and fix it together.
              </p>
              <h3>Rigor</h3>
              <p>
                I believe in{' '}
                <span className="mk">fixing the root, not the row</span>. A
                patch quiets one month; a real fix ends the break. We hold our
                own code to the same rule.
              </p>
              <h3>Progress</h3>
              <p>
                And I hope that, every month, you{' '}
                <span className="mk">need Darpan a little less</span>. When the
                causes are fixed, the morning list grows shorter. That is the
                goal.
              </p>
            </div>
            <p className="vl-letter-sign">
              <img
                src="/team/aditi-patel-signature.webp"
                alt="Aditi Patel"
                width={639}
                height={402}
                loading="lazy"
              />
              <span>Founder, Darpan</span>
            </p>
          </div>
          <div className="vl-split-visual" data-reveal>
            <img
              className="vl-letter-portrait"
              src="/team/aditi-patel-writing.webp"
              alt="Aditi Patel writing in a notebook, drawn in pencil"
              width={900}
              height={900}
              loading="lazy"
            />
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
      ></PageClose>
    </VlPage>
  )
}
