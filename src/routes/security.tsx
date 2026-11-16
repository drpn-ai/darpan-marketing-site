import { createFileRoute } from '@tanstack/react-router'
import { VlPage } from '@/components/VlChrome'
import { CONNECTORS, WALKTHROUGH_HREF, pageHead } from '@/data/site'

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

// Six promises, each the same length so the grid reads evenly. Two-factor
// sign-in and passkeys are built and about to ship (DAR-BE-264, DAR-BE-270);
// the Facts register marks them as direction until they are live.
const promises = [
  {
    h: 'It never changes your records.',
    p: 'Databases connect through a read-only account and Darpan only runs SELECT. Over SFTP it archives the files it has read and writes back each run’s result file.',
  },
  {
    h: 'Credentials stay sealed.',
    p: 'Passwords, API tokens and private keys are stored encrypted. Once saved, a credential can be replaced, but no screen or report ever shows it again.',
  },
  {
    h: 'Each company stays in its own lane.',
    p: 'Every read is limited to the company you’re signed in to. Another company’s records answer as if they don’t exist, and automated tests check both.',
  },
  {
    h: 'Encrypted in transit and at rest.',
    p: 'Every connection to Darpan uses TLS 1.2 or 1.3. The database is encrypted at rest, sits on a private network and accepts only encrypted connections.',
  },
  {
    h: 'A second step to sign in.',
    p: 'Two-factor sign-in with an authenticator app, or a passkey such as Touch ID, Windows Hello or a security key. Everyone who signs in is required to use one.',
  },
  {
    h: 'Where it runs.',
    p: 'Darpan runs on Amazon Web Services in the United States (Ohio). People at Darpan reach its servers through single sign-on, never a shared password.',
  },
] as const

function SecurityPage() {
  return (
    <VlPage>
      <section className="vl-band is-plain" aria-labelledby="security-heading">
        <div className="vl-wrap">
          <div className="vl-sec-head">
            <span className="vl-kicker">Security</span>
            <h1 className="vl-h2" id="security-heading">
              What Darpan reads, and where it stays.
            </h1>
            <p className="vl-lede">
              Darpan looks at your orders, returns and refunds so your team
              doesn’t have to chase them. It never changes them, and nobody
              outside your company ever sees them.
            </p>
          </div>

          <div className="vl-caps vl-sec-grid">
            {promises.map((x) => (
              <div className="vl-cap" key={x.h}>
                <h3>{x.h}</h3>
                <p>{x.p}</p>
              </div>
            ))}
          </div>

          <p className="vl-ww-foot vl-soc2-line">
            Working toward SOC 2 Type I. Ask us for a security review.
          </p>

          <h2 className="vl-ww-h">What Darpan reads</h2>
          <dl className="vl-reads">
            {CONNECTORS.map((c) => (
              <div key={c.name}>
                <dt>{c.name}</dt>
                <dd>{c.reads}</dd>
              </div>
            ))}
          </dl>

          <p className="vl-page-cta">
            <a className="vl-cta" href={WALKTHROUGH_HREF}>
              Talk to us <span className="arr">&rarr;</span>
            </a>
            <a className="vl-textlink" href="https://docs.drpn.ai">
              Read the docs <span aria-hidden>&#8599;</span>
            </a>
          </p>
        </div>
      </section>
    </VlPage>
  )
}
