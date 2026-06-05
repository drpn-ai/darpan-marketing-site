import { createFileRoute } from '@tanstack/react-router'
import { VlPage } from '@/components/VlChrome'

export const Route = createFileRoute('/privacy')({
  component: PrivacyPage,
  head: () => ({
    meta: [{ title: 'Privacy — Darpan' }],
  }),
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
