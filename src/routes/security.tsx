import type { ReactNode } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { PageClose } from '@/components/PageClose'
import {
  RecordsVisual,
  SealedVisual,
  SignInVisual,
} from '@/components/security/SecurityVisuals'
import { useReveal } from '@/components/useReveal'
import { VlPage } from '@/components/VlChrome'
import { CONNECTORS, WALKTHROUGH_HREF, pageHead } from '@/data/site'
import { ReviewPicture } from '@/components/HeroPictures'

// Facts only: every line here traces to the Facts register in
// docs/superpowers/specs/2026-10-29-drpn-site-rethink-design.md.
export const Route = createFileRoute('/security')({
  component: SecurityPage,
  head: () =>
    pageHead(
      '/security',
      'Security — Darpan',
      'What Darpan reads, what it never changes, how credentials are stored and how each company’s data is kept to itself.',
    ),
})

// Six promises in three pairs, one band each with a picture. Two-factor
// sign-in and passkeys are built and about to ship (DAR-BE-264, DAR-BE-270);
// the Facts register marks them as direction until they are live.
type Band = {
  id: string
  kicker: string
  title: string
  points: readonly { h: string; p: string }[]
  visual: () => ReactNode
  foot?: string
}
const bands: readonly Band[] = [
  {
    id: 'records',
    kicker: 'Your records',
    title: 'It reads. It never writes.',
    points: [
      {
        h: 'It never changes your records.',
        p: 'Databases connect through a read-only account and Darpan only runs SELECT. Over SFTP it archives the files it has read and writes back each run’s result file.',
      },
      {
        h: 'Each company stays in its own lane.',
        p: 'Every read is limited to the company you’re signed in to. Another company’s records answer as if they don’t exist, and automated tests check both.',
      },
    ],
    visual: RecordsVisual,
  },
  {
    id: 'sealed',
    kicker: 'Credentials',
    title: 'Locked at every step.',
    points: [
      {
        h: 'Credentials stay sealed.',
        p: 'Passwords, API tokens and private keys are stored encrypted. Once saved, a credential can be replaced, but no screen or report ever shows it again.',
      },
      {
        h: 'Encrypted in transit and at rest.',
        p: 'Every connection to Darpan uses TLS 1.2 or 1.3. The database is encrypted at rest, sits on a private network and accepts only encrypted connections.',
      },
    ],
    visual: SealedVisual,
  },
  {
    id: 'access',
    kicker: 'Access',
    title: 'Only your people get in.',
    points: [
      {
        h: 'A second step to sign in.',
        p: 'Two-factor sign-in with an authenticator app, or a passkey such as Touch ID, Windows Hello or a security key. Everyone who signs in is required to use one.',
      },
      {
        h: 'Where it runs.',
        p: 'Darpan runs on Amazon Web Services in the United States (Ohio). People at Darpan reach its servers through single sign-on, never a shared password.',
      },
    ],
    visual: SignInVisual,
    foot: 'Working toward SOC 2 Type I. Ask us for a security review.',
  },
]

function SecurityPage() {
  useReveal()
  return (
    <VlPage>
      <section className="vl-band is-plain" aria-labelledby="security-heading">
        <div className="vl-wrap vl-split">
          <div className="vl-sec-head" data-reveal>
            <span className="vl-kicker">Security</span>
            <h1 className="vl-h2" id="security-heading">
              What Darpan reads, and where it stays.
            </h1>
            <p className="vl-lede">
              Darpan looks at your orders, returns and refunds so your team
              doesn’t have to chase them. It never changes them, and nobody
              outside your company ever sees them.
            </p>
            <div className="vl-hero-cta">
              <a className="vl-cta" href={WALKTHROUGH_HREF}>
                Talk to us <span className="arr">&rarr;</span>
              </a>
              <a
                className="vl-textlink"
                href="https://docs.drpn.ai"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read the docs <span aria-hidden>&#8599;</span>
              </a>
            </div>
          </div>
          <div className="vl-split-visual" data-reveal>
            <ReviewPicture />
          </div>
        </div>
      </section>

      {bands.map((band, i) => (
        <section
          className="vl-band"
          key={band.id}
          aria-labelledby={`security-${band.id}-heading`}
        >
          <div className={`vl-wrap vl-split${i % 2 ? ' is-flip' : ''}`}>
            <div className="vl-sec-head" data-reveal>
              <span className="vl-kicker is-agree">{band.kicker}</span>
              <h2 className="vl-h2" id={`security-${band.id}-heading`}>
                {band.title}
              </h2>
              <div className="vl-sec-points">
                {band.points.map((pt) => (
                  <div key={pt.h}>
                    <h3>{pt.h}</h3>
                    <p>{pt.p}</p>
                  </div>
                ))}
              </div>
              {band.foot ? <p className="vl-sec-foot">{band.foot}</p> : null}
            </div>
            <div className="vl-split-visual" data-reveal>
              <band.visual />
            </div>
          </div>
        </section>
      ))}

      <section className="vl-band" aria-labelledby="security-reads-heading">
        <div className="vl-wrap">
          <div className="vl-sec-head" data-reveal>
            <span className="vl-kicker is-agree">What Darpan reads</span>
            <h2 className="vl-h2 is-line" id="security-reads-heading">
              Each kind of system, and what it shares.
            </h2>
          </div>
          <dl className="vl-reads" data-reveal>
            {CONNECTORS.map((c) => (
              <div key={c.name}>
                <dt>{c.name}</dt>
                <dd>{c.reads}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <PageClose
        title="Safe to connect on day one."
        link={{
          href: 'https://docs.drpn.ai',
          label: 'Read the docs',
          external: true,
        }}
      />
    </VlPage>
  )
}
