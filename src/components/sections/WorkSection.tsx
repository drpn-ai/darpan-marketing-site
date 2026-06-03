import { NotebookDoodle } from '@/components/NotebookDoodle'

export function WorkSection() {
  return (
    <section
      className="section-band work"
      aria-labelledby="work-heading"
    >
      <div className="container">
        <div className="section-header">
          <span className="section-numeral" aria-hidden>03</span>
          <h2 id="work-heading">The work, written down</h2>
        </div>
        <div className="manifesto">
          <p className="manifesto-body">
            Every retail business runs on systems that don’t agree. Inventory
            in the WMS, revenue in the POS, returns in commerce, ledger in the
            ERP. Reconciliation is the work that makes them agree — <span className="hl-rust">usually by
            hand, mostly in spreadsheets, always late</span>.
          </p>
          <p className="manifesto-close" style={{ position: 'relative' }}>
            <span className="under-2">Darpan is the infrastructure that makes it the system’s job.</span>
            <NotebookDoodle
              kind="circle-emphasis"
              delay={1000}
              style={{ left: '-12px', top: '-12px' }}
            />
            <NotebookDoodle
              kind="exclamation"
              delay={1400}
              style={{ right: '-32px', top: '0' }}
            />
          </p>
        </div>
        <p className="work-coda">
          A 2026 reconciliation engine.{' '}
          <span aria-hidden> · </span>
          Built on schema, the keys that anchor records, and the row-level trail.
        </p>
      </div>
    </section>
  )
}
