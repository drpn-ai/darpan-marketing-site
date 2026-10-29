import { createFileRoute } from '@tanstack/react-router'
import { VlPage } from '@/components/VlChrome'
import { pageHead } from '@/data/site'

export const Route = createFileRoute('/privacy')({
  component: PrivacyPage,
  head: () =>
    pageHead(
      '/privacy',
      'Privacy — Darpan',
      'How Darpan handles privacy and data questions.',
    ),
})

function PrivacyPage() {
  return (
    <VlPage>
      <section className="vl-band is-plain" aria-labelledby="privacy-heading">
        <div className="vl-wrap vl-prose vl-prose-narrow">
          <span className="vl-kicker">Legal</span>
          <h1 id="privacy-heading">Privacy</h1>
          <p>
            Our full privacy policy is being prepared. For any privacy or data
            handling question in the meantime, write to{' '}
            <a href="mailto:hello@drpn.ai?subject=Privacy">hello@drpn.ai</a>.
          </p>
        </div>
      </section>
    </VlPage>
  )
}
