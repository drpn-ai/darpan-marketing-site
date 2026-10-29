import { useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { VlHeader, VlFooter } from '@/components/VlChrome'
import { Hero } from '@/components/home/Hero'
import { Gap } from '@/components/home/Gap'
import { HowItWorks } from '@/components/home/HowItWorks'
import { Breadth } from '@/components/home/Breadth'
import { WorksWithStrip } from '@/components/home/WorksWithStrip'
import { SecurityStrip } from '@/components/home/SecurityStrip'
import { FinanceBand } from '@/components/home/FinanceBand'
import { Close } from '@/components/home/Close'
import { NotesStrip } from '@/components/home/NotesStrip'
import { pageHead } from '@/data/site'

export const Route = createFileRoute('/')({
  component: Home,
  head: () =>
    pageHead(
      '/',
      'Darpan — checks for the work between your systems',
      'Your integrations report success. Darpan checks the outcome every morning and keeps each break on a list, with its owner and evidence, until it’s fixed.',
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
      <HowItWorks />
      <Breadth />
      <WorksWithStrip />
      <SecurityStrip />
      <FinanceBand />
      <Close />
      <NotesStrip />
      <VlFooter />
    </main>
  )
}
