import { createFileRoute } from '@tanstack/react-router'
import { VlPage } from '@/components/VlChrome'

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
    <VlPage>
      <section className="vl-band is-plain" aria-labelledby="customers-heading">
        <div className="vl-wrap vl-prose">
          <span className="vl-kicker">Customers</span>
          <h1 id="customers-heading">Reconciled by retail teams.</h1>
          <p>
            Darpan is in deployment with a small set of corporate retail finance
            and operations teams. Real customer wordmarks land here at general
            availability. Until then, here is the shape.
          </p>
          <ul className="vl-logos" aria-label="Customer wordmarks">
            {reconciledBy.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
          <p className="vl-logos-caption">Real wordmarks at launch.</p>
          <a
            className="vl-cta"
            href="mailto:hello@drpn.ai?subject=Darpan%20walkthrough"
          >
            Request a walkthrough <span className="arr">&rarr;</span>
          </a>
        </div>
      </section>
    </VlPage>
  )
}
