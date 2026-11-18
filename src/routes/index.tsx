import { useReveal } from '@/components/useReveal'
import { createFileRoute } from '@tanstack/react-router'
import { VlHeader, VlFooter } from '@/components/VlChrome'
import { Hero } from '@/components/home/Hero'
import { Gap } from '@/components/home/Gap'
import { FromProduction } from '@/components/home/FromProduction'
import { WhyBand } from '@/components/home/WhyBand'
import { HowItWorks } from '@/components/home/HowItWorks'
import { Breadth } from '@/components/home/Breadth'
import { SecurityStrip } from '@/components/home/SecurityStrip'
import { FinanceBand } from '@/components/home/FinanceBand'
import { Close } from '@/components/home/Close'
import { FaqStrip, FAQ } from '@/components/home/FaqStrip'
import { NotesStrip } from '@/components/home/NotesStrip'
import { pageHead } from '@/data/site'

// Search and answer engines. The category noun ("order reconciliation") lives
// here and in the subhead's first sentence; page copy keeps ops words.
// TITLE: keyword first, brand last, 60 characters.
// DESCRIPTION: the snippet, 160 characters.
// DEFINITION: one quotable "Darpan is…" sentence for answer engines (JSON-LD).
const TITLE = 'Daily order reconciliation for Shopify, OMS and ERP | Darpan'
const DESCRIPTION =
  'Daily order reconciliation for ops teams. Every morning, Darpan lists orders, returns and refunds that missed Shopify, your OMS or NetSuite, and who fixes each.'
const DEFINITION =
  'Darpan is daily order reconciliation software for ecommerce and retail operations teams. Every morning it checks that each order, return and refund reached every system it was meant to (Shopify, an order management system such as HotWax, NetSuite and your databases) and lists each one that didn’t, with the team that owns the fix.'

const JSON_LD = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://drpn.ai/#org',
      name: 'Darpan',
      url: 'https://drpn.ai',
      logo: 'https://drpn.ai/darpan-mark.svg',
      description: DEFINITION,
      founder: { '@type': 'Person', name: 'Aditi Patel', jobTitle: 'Founder' },
      sameAs: ['https://www.linkedin.com/company/drpn-ai'],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://drpn.ai/#website',
      name: 'Darpan',
      url: 'https://drpn.ai',
      publisher: { '@id': 'https://drpn.ai/#org' },
    },
    {
      '@type': 'WebPage',
      '@id': 'https://drpn.ai/#webpage',
      url: 'https://drpn.ai/',
      name: TITLE,
      description: DESCRIPTION,
      isPartOf: { '@id': 'https://drpn.ai/#website' },
      about: { '@id': 'https://drpn.ai/#app' },
      primaryImageOfPage: 'https://drpn.ai/darpan-hero-light.png',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://drpn.ai/#app',
      name: 'Darpan',
      url: 'https://drpn.ai',
      applicationCategory: 'BusinessApplication',
      applicationSubCategory: 'Order reconciliation',
      operatingSystem: 'Web',
      description: DEFINITION,
      audience: {
        '@type': 'BusinessAudience',
        audienceType: 'Ecommerce and retail operations teams',
      },
      featureList: [
        'Checks every morning that each order, return and refund reached Shopify, your order management system (such as HotWax), NetSuite and your databases',
        'Lists each one that missed a system, with its evidence, the team that owns the fix and, where it can name one, the cause',
        'Checks written in plain words; Darpan’s agent turns them into checks and your team approves each one',
        'Read-only: never changes an order, a return or a row',
        'Setup in about a day; the first list arrives the next morning',
        'Works from Claude, ChatGPT, Gemini and any MCP client through the Darpan CLI',
      ],
      keywords:
        'order reconciliation, Shopify NetSuite reconciliation, OMS ERP reconciliation, order sync monitoring, returns and refunds reconciliation, ecommerce operations',
      publisher: { '@id': 'https://drpn.ai/#org' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
}).replace(/</g, '\\u003c')

export const Route = createFileRoute('/')({
  component: Home,
  head: () =>
    pageHead('/', TITLE, DESCRIPTION),
})

function Home() {
  useReveal()

  return (
    <main className="vl">
      <VlHeader />
      <div className="vl-wrap">
        <Hero />
      </div>
      <Gap />
      <WhyBand />
      <FromProduction />
      <HowItWorks />
      <FinanceBand />
      <Breadth />
      <SecurityStrip />
      <FaqStrip />
      <Close />
      <NotesStrip />
      <VlFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON_LD }}
      />
    </main>
  )
}
