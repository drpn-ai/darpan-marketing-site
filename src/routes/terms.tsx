import { createFileRoute } from '@tanstack/react-router'
import { VlPage } from '@/components/VlChrome'
import { pageHead } from '@/data/site'

export const Route = createFileRoute('/terms')({
  component: TermsPage,
  head: () =>
    pageHead(
      '/terms',
      'Terms — Darpan',
      'Terms of use for Darpan.',
    ),
})

function TermsPage() {
  return (
    <VlPage>
      <section className="vl-band is-plain" aria-labelledby="terms-heading">
        <div className="vl-wrap vl-prose vl-prose-narrow">
          <span className="vl-kicker">Legal</span>
          <h1 id="terms-heading">Terms</h1>
          <p>
            Our terms of service are being prepared. For contract or licensing
            questions in the meantime, write to{' '}
            <a href="mailto:hello@drpn.ai?subject=Terms">hello@drpn.ai</a>.
          </p>
        </div>
      </section>
    </VlPage>
  )
}
