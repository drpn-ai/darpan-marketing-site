import { createFileRoute } from '@tanstack/react-router'
import { ArrowRight } from '@phosphor-icons/react'

export const Route = createFileRoute('/customers')({
  component: CustomersPage,
  head: () => ({
    meta: [{ title: 'Customers — Darpan' }],
  }),
})

const reconciledBy = [
  '[Retailer A]',
  '[Retailer B]',
  '[Retailer C]',
  '[Retailer D]',
  '[Retailer E]',
] as const

function CustomersPage() {
  return (
    <main className="legal-page section-band">
      <div className="container legal-container">
        <span className="label-smallcaps">02 · Customers</span>
        <h1>Reconciled by retail teams.</h1>
        <p>
          Darpan is in deployment with a small set of corporate retail finance
          and operations teams. Real customer wordmarks land here at general
          availability. Until then, here is the shape.
        </p>
        <ul className="logo-row" aria-label="Customer wordmarks">
          {reconciledBy.map((name) => (
            <li key={name} className="logo-wordmark">{name}</li>
          ))}
        </ul>
        <p className="logo-caption">Real wordmarks at launch.</p>
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
    </main>
  )
}
