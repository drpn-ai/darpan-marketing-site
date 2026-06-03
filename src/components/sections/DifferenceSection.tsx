import { NotebookDoodle } from '@/components/NotebookDoodle'

type Distinction = {
  label: string
  headline: string
  body: string
}

const distinctions: readonly Distinction[] = [
  {
    label: 'Not an integration platform',
    headline: 'iPaaS moves a record from A to B and confirms the transfer.',
    body: 'Darpan checks that A and B still agree after it lands — across timing lags, partial syncs, retries, and schema drift. A successful sync and a correct number are different guarantees. We watch the second one.',
  },
  {
    label: 'Not a month-end close tool',
    headline: 'Close software proves the books tied out last month.',
    body: 'Darpan surfaces the discrepancy now — paired by primary ID, with the source rows attached — while there is still time to reorder, chase a 3PL, or catch the leak. Finance still gets the clean, audit-ready trail, as a byproduct.',
  },
  {
    label: 'Not a settlement parser',
    headline: 'Payout tools split one marketplace deposit into the ledger.',
    body: 'Darpan covers every seam, not just the payout-to-GL leg: storefront vs. OMS, OMS vs. WMS, WMS vs. processor. The more best-of-breed tools you add, the more places they quietly disagree.',
  },
] as const

export function DifferenceSection() {
  return (
    <section
      id="difference"
      className="section-band difference"
      aria-labelledby="difference-heading"
    >
      <div className="container">
        <div className="section-header">
          <span className="section-numeral" aria-hidden>04</span>
          <h2 id="difference-heading">Moving data is not the same as proving it agrees</h2>
        </div>
        <div className="manifesto">
          <p className="manifesto-body">
            You bought best-of-breed on purpose — a specialist for every job
            instead of one suite that does everything okay-ish. Every tool you
            add is a new place the numbers can drift. Connectors keep them
            talking; <span className="hl-rust">almost nobody checks they still agree once the data lands</span>.
          </p>
          <p className="manifesto-close" style={{ position: 'relative' }}>
            <span className="under-2">Even when everything syncs, the quantities don&rsquo;t match.</span>
            <NotebookDoodle
              kind="circle-emphasis"
              delay={1000}
              style={{ left: '-12px', top: '-12px' }}
            />
          </p>
        </div>
        <ol className="product-list" style={{ marginTop: 48 }}>
          {distinctions.map((d) => (
            <li className="product-primitive" key={d.label}>
              <span className="product-label label-smallcaps">{d.label}</span>
              <div className="product-content">
                <h3 className="product-headline">{d.headline}</h3>
                <p className="product-body">{d.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="work-coda">
          The verification layer for the composable retail stack.{' '}
          <span aria-hidden> · </span>
          <a className="hero-secondary" href="/why">Why Darpan is built this way →</a>
        </p>
      </div>
    </section>
  )
}
