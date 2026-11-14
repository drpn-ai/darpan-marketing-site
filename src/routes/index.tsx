import { useEffect } from 'react'
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

// One quotable sentence for search and answer engines: what Darpan is, who it
// reads, what it does. Used as the meta description and in the JSON-LD.
const DEFINITION =
  'Darpan checks every morning that orders, returns and refunds line up across Shopify, HotWax, NetSuite and your databases, and lists each break with the team that owns it until it’s fixed.'

const JSON_LD = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://drpn.ai/#org',
      name: 'Darpan',
      url: 'https://drpn.ai',
      logo: 'https://drpn.ai/darpan-mark.svg',
      sameAs: ['https://www.linkedin.com/company/drpn-ai'],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Darpan',
      url: 'https://drpn.ai',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description: DEFINITION,
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
    pageHead(
      '/',
      'Darpan — daily checks that orders, returns and refunds line up',
      DEFINITION,
    ),
})

function Home() {
  // Scroll-reveal. SSR-safe: the hiding rules are scoped to `.vl-animate`, a
  // class added here on the client only, so the page renders fully visible
  // without JS and for reduced-motion users.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const root = document.querySelector('.vl')
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    root.classList.add('vl-animate')
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
    )
    root.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <main className="vl">
      <VlHeader />
      <div className="vl-wrap">
        <Hero />
      </div>
      <Gap />
      <FromProduction />
      <WhyBand />
      <HowItWorks />
      <Breadth />
      <SecurityStrip />
      <FinanceBand />
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
