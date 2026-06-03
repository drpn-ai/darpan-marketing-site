import { createFileRoute } from '@tanstack/react-router'
import { ArrowRight } from '@phosphor-icons/react'

export const Route = createFileRoute('/why')({
  component: WhyPage,
  head: () => ({
    meta: [
      { title: 'Why Darpan — the verification layer for the retail stack' },
      {
        name: 'description',
        content:
          'Integration platforms move your data. Close tools prove last month tied out. Darpan continuously verifies that every connected retail system still agrees — by primary ID, with the rows behind every call.',
      },
      { property: 'og:title', content: 'Why Darpan' },
      {
        property: 'og:description',
        content:
          'A successful sync and a correct number are different guarantees. Darpan is the layer that proves your systems still agree.',
      },
      { property: 'og:url', content: 'https://drpn.ai/why' },
    ],
    links: [{ rel: 'canonical', href: 'https://drpn.ai/why' }],
  }),
})

function WhyPage() {
  return (
    <main className="legal-page section-band">
      <div className="container">
        <div className="writing-post" style={{ maxWidth: 820, margin: '0 auto' }}>
          <span className="label-smallcaps">Why Darpan</span>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 4.4vw, 48px)',
              lineHeight: 1.1,
              margin: '16px 0 24px',
              maxWidth: '20ch',
            }}
          >
            Your tools are connected. Nobody&rsquo;s checking they still agree.
          </h1>

          <p className="writing-lead">
            Retail moved to best-of-breed on purpose — a specialist for every
            job: a storefront, an OMS, a WMS or 3PL, a processor, returns,
            planning, POS. It beats one monolith that does everything
            okay-ish. But those systems are supposed to agree, and they
            silently don&rsquo;t. Darpan is the layer that proves they do.
          </p>

          <h2 className="writing-h2">A sync that succeeds is not a number that&rsquo;s correct</h2>
          <p>
            Integration platforms are built to move a record from one system to
            another and confirm the transfer landed. That is a real job, and
            they do it well. It is also a different guarantee than{' '}
            <em>the two systems still reconcile afterward</em> — across timing
            lags, partial syncs, retries, schema mismatches, and the one-off
            exceptions every retail business accumulates. Drift builds up{' '}
            <em>between</em> successful syncs, which is exactly where no one is
            looking. Add another best-of-breed tool and you add another seam
            where the numbers can quietly diverge.
          </p>
          <div className="writing-callout">
            <span className="writing-callout-label label-smallcaps">The question Darpan answers</span>
            <p>
              &ldquo;Why doesn&rsquo;t inventory in one system match the next —
              even when everything syncs?&rdquo; A green checkmark means the
              data moved. It does not mean the systems agree.
            </p>
          </div>

          <h2 className="writing-h2">Where Darpan sits</h2>
          <p>
            Darpan is not trying to replace your stack or become a new
            monolith. It is the one specialized job nobody else owns:
            continuous verification across everything you&rsquo;ve already
            connected. Here is how that differs from the categories it&rsquo;s
            often confused with.
          </p>
          <div className="writing-table-wrap">
            <table className="writing-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Built to</th>
                  <th>Leaves unsolved</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Integration platforms<br /><em>(Celigo, Boomi, in-house)</em></td>
                  <td>Move records between systems and confirm delivery.</td>
                  <td>Whether the connected systems still agree once the data lands.</td>
                </tr>
                <tr>
                  <td>Close &amp; GL automation<br /><em>(BlackLine, FloQast, Trintech, Numeric)</em></td>
                  <td>Get finance to a clean, audit-ready month-end tie-out.</td>
                  <td>Operational drift you need to catch <em>now</em>, not retrospectively at close.</td>
                </tr>
                <tr>
                  <td>Settlement parsers<br /><em>(A2X, Synder, Link My Books)</em></td>
                  <td>Split a marketplace payout into the ledger by fees, refunds, and reserves.</td>
                  <td>Every seam upstream of the payout — storefront, OMS, WMS, processor.</td>
                </tr>
                <tr>
                  <td><strong>Darpan</strong></td>
                  <td><strong>Continuously verify that every connected system agrees, by primary ID.</strong></td>
                  <td><strong>—</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="writing-h2">How the verification works</h2>
          <p>
            The product is small on purpose. You describe each source once —
            field names, types, and the primary IDs that anchor a record.
            Darpan pairs every line across the connected systems, then sorts the
            result into variance, missing-object, and resolved-pair, with the
            source rows attached to every call. RuleSets capture the
            tolerances and known patterns your data actually has, so a
            $9,965 wire against a $10,000 invoice resolves as a fee variance
            instead of a false mismatch. Every run is saved with the rules it
            applied and the row-level trail behind it. Ask Darpan answers
            questions against that evidence in plain language.
          </p>
          <p>
            None of that requires you to rip anything out. Darpan reads what
            your systems already produce and tells you where they disagree.
          </p>

          <h2 className="writing-h2">One product, two readers</h2>
          <p>
            Operations and finance feel this gap differently, and Darpan
            speaks to both without picking a fight between them.
          </p>
          <div className="writing-table-wrap">
            <table className="writing-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Operations</th>
                  <th>Finance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>The problem</td>
                  <td>Daily decisions made on numbers no one fully trusts.</td>
                  <td>Close is slow, manual, and easy to get wrong.</td>
                </tr>
                <tr>
                  <td>What Darpan gives</td>
                  <td>Confidence systems agree in time to act — reorder, chase, catch leakage this week.</td>
                  <td>A faster, cleaner, audit-ready close as a byproduct.</td>
                </tr>
                <tr>
                  <td>In their words</td>
                  <td>Inventory you can trust, payouts you can verify, true margin by channel.</td>
                  <td>Fewer exceptions, less manual matching, evidence behind every line.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="writing-h2">What we don&rsquo;t claim</h2>
          <p>
            Darpan is in deployment with a small set of retail finance and
            operations teams; it is not a decade-old suite, and we won&rsquo;t
            pretend otherwise. We don&rsquo;t lead with the AI — we let the work
            show it: a discrepancy surfaced by primary ID, a variance resolved
            instead of just flagged, a run you can sign on because the rows are
            right there. The category word is reconciliation. The job is making
            your systems trustworthy enough to run the business on.
          </p>

          <p style={{ marginTop: 48 }}>
            <a
              className="btn btn-primary"
              href="mailto:hello@drpn.ai?subject=Darpan%20walkthrough"
            >
              Request a walkthrough
              <ArrowRight size={16} weight="regular" aria-hidden />
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
