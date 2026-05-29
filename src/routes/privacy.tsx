import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/privacy')({
  component: PrivacyPage,
  head: () => ({
    meta: [{ title: 'Privacy — Darpan' }],
  }),
})

function PrivacyPage() {
  return (
    <main className="legal-page section section-light" aria-labelledby="privacy-heading">
      <div className="container legal-container">
        <span className="section-label">Legal</span>
        <h1 id="privacy-heading">Privacy</h1>
        <p>
          Our full privacy policy is being prepared. For any privacy or data
          handling question in the meantime, write to{' '}
          <a href="mailto:hello@drpn.ai?subject=Privacy">hello@drpn.ai</a>.
        </p>
      </div>
    </main>
  )
}
