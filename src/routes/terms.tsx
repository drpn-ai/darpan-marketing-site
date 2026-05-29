import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/terms')({
  component: TermsPage,
  head: () => ({
    meta: [{ title: 'Terms — Darpan' }],
  }),
})

function TermsPage() {
  return (
    <main className="legal-page section section-light" aria-labelledby="terms-heading">
      <div className="container legal-container">
        <span className="section-label">Legal</span>
        <h1 id="terms-heading">Terms</h1>
        <p>
          Our terms of service are being prepared. For contract or licensing
          questions in the meantime, write to{' '}
          <a href="mailto:hello@drpn.ai?subject=Terms">hello@drpn.ai</a>.
        </p>
      </div>
    </main>
  )
}
