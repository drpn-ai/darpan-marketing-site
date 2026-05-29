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
        <div className="section-header">
          <span className="section-numeral" aria-hidden>02</span>
          <h2 id="reconciled-heading">Reconciled by retail teams at</h2>
        </div>
        <ul className="logo-row" aria-label="Customer wordmarks">
          {reconciledBy.map((name) => (
            <li key={name} className="logo-wordmark">{name}</li>
          ))}
        </ul>
        <p className="logo-caption">Real wordmarks at launch.</p>
      </div>
    </section>
  )
}
