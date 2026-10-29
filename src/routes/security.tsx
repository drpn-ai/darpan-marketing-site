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

function SecurityPage() {
  return (
    <VlPage>
      <section className="vl-band is-plain" aria-labelledby="security-heading">
        <div className="vl-wrap vl-prose vl-prose-narrow">
          <span className="vl-kicker">Security</span>
          <h1 id="security-heading">What Darpan reads, and where it stays.</h1>

          <h2 className="writing-h2">What Darpan reads</h2>
          <ul>
            {CONNECTORS.map((c) => (
              <li key={c.name}>
                {c.name}: {c.reads}
              </li>
            ))}
          </ul>

          <h2 className="writing-h2">It doesn’t change your records.</h2>
          <p>
            Darpan never edits an order, a return, a payment or a row in
            Shopify, HotWax, NetSuite or your database. Databases connect with
            a read-only account, and Darpan only ever runs SELECT. Over SFTP it
            writes in one folder you give it: a file it has finished reading
            moves into an archive folder beside it, and an automation writes
            each run’s result file back to that server.
          </p>

          <h2 className="writing-h2">Credentials stay sealed.</h2>
          <p>
            Passwords, API tokens and private keys are stored encrypted. Once
            saved, they can be replaced but not read back.
          </p>

          <h2 className="writing-h2">Each company stays in its own lane.</h2>
          <p>
            Every read of a company’s records is filtered to the company you’re
            signed in to, and with no company selected a read returns nothing.
            Asking for another company’s record gets the same answer as asking
            for one that doesn’t exist. Automated tests check both.
          </p>

          <h2 className="writing-h2">Where it runs</h2>
          <p>Darpan runs in the cloud.</p>

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
