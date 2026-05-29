type Primitive = {
  label: string
  headline: string
  body: string
}

const primitives: readonly Primitive[] = [
  {
    label: 'I. Schema',
    headline: 'You describe the source data once.',
    body: 'Field names, types, the keys that anchor each record. Darpan uses them to pair every line across every connected system.',
  },
  {
    label: 'II. Compare',
    headline: 'Records pair line by line. Mismatches surface with the rows behind them.',
    body: 'No spreadsheet pile-up. Variance, missing-object, and resolved-pair classifications come out of one run, with the source line attached to every call.',
  },
] as const

export function ProductSection() {
  return (
    <section
      id="product"
      className="section-band product"
      aria-labelledby="product-heading"
    >
      <div className="container">
        <div className="section-header">
          <span className="section-numeral" aria-hidden>03</span>
          <h2 id="product-heading">The product, written down to its primitives</h2>
        </div>
        <ol className="product-list">
          {primitives.map((p) => (
            <li className="product-primitive" key={p.label}>
              <span className="product-label label-smallcaps">{p.label}</span>
              <h3 className="product-headline">{p.headline}</h3>
              <p className="product-body">{p.body}</p>
            </li>
          ))}
        </ol>
        <p className="product-coda">
          <span className="product-coda-label label-smallcaps">III. Evidence</span>
          <span aria-hidden> · </span>
          the saved run, the rules applied, the row-level trail. Sign on what’s there.
        </p>
      </div>
    </section>
  )
}
