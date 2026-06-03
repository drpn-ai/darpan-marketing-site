import { NotebookDoodle } from '@/components/NotebookDoodle'

const reconciledBy = [
  '[Retailer A]',
  '[Retailer B]',
  '[Retailer C]',
  '[Retailer D]',
  '[Retailer E]',
] as const

export function ReconciledBySection() {
  return (
    <section
      className="section-band reconciled-by"
      aria-labelledby="reconciled-heading"
    >
      <div className="container">
        <div className="section-header" style={{ position: 'relative' }}>
          <span className="section-numeral" aria-hidden>02</span>
          <h2 id="reconciled-heading">Reconciled by retail teams at</h2>
          <NotebookDoodle
            kind="star"
            delay={600}
            style={{ left: '-46px', top: '-4px', transform: 'rotate(-10deg)' }}
          />
        </div>
        <div className="logo-block">
          <ul className="logo-row" aria-label="Customer wordmarks">
            {reconciledBy.map((name) => (
              <li key={name} className="logo-wordmark">{name}</li>
            ))}
          </ul>
          <NotebookDoodle
            kind="match-arrow"
            delay={800}
            style={{ left: '8px', top: '6px' }}
          />
        </div>
        <p className="logo-caption">Real wordmarks at launch.</p>
      </div>
    </section>
  )
}
