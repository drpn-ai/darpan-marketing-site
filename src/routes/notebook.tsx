import { useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { MobileMenu } from '@/components/MobileMenu'
import { AmbientBackdrop } from '@/components/AmbientBackdrop'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProductSection } from '@/components/sections/ProductSection'
import { WorkSection } from '@/components/sections/WorkSection'
import { DifferenceSection } from '@/components/sections/DifferenceSection'
import { WritingSection } from '@/components/sections/WritingSection'
import { LinkedinLogo } from '@phosphor-icons/react'

// Preserved notebook homepage, kept live at /notebook so the original
// hand-drawn variant can be compared side by side against the operational
// redesign now living at /. This is a faithful copy of the prior index route.
export const Route = createFileRoute('/notebook')({
  component: NotebookHome,
})

const notebookNav = [
  ['Product', '#product'],
  ['Why Darpan', '/why'],
  ['Customers', '/customers'],
  ['Notes', '/writing'],
] as const

function NotebookHome() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.intersectionRatio >= 0.12) {
            entry.target.setAttribute('data-revealed', 'true')
          } else if (entry.intersectionRatio === 0) {
            entry.target.setAttribute('data-revealed', 'false')
          }
        }
      },
      { threshold: [0, 0.12], rootMargin: '0px 0px -10% 0px' },
    )

    const viewportHeight = window.innerHeight
    document.querySelectorAll('.section-band').forEach((node) => {
      const rect = node.getBoundingClientRect()
      const isAboveOrInViewport = rect.top < viewportHeight
      node.setAttribute('data-revealed', isAboveOrInViewport ? 'true' : 'false')
      observer.observe(node)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <main className="site-shell">
      <AmbientBackdrop />
      <NotebookHeader />
      <HeroSection />
      <ProductSection />
      <WorkSection />
      <DifferenceSection />
      <WritingSection />
      <NotebookFooter />
    </main>
  )
}

function NotebookHeader() {
  return (
    <header className="site-header" aria-label="Darpan marketing navigation">
      <div className="container site-header-inner">
        <a className="brand-link" href="/notebook" aria-label="Darpan home">
          Darpan
        </a>
        <nav className="site-nav" aria-label="Sections">
          {notebookNav.map(([label, href]) => (
            <a className="nav-link" href={href} key={label}>
              {label}
            </a>
          ))}
        </nav>
        <MobileMenu />
      </div>
    </header>
  )
}

function NotebookFooter() {
  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <span className="footer-wordmark">Darpan</span>
            <span className="footer-tagline">AI reconciliation for retail finance.</span>
          </div>
          <div className="footer-column">
            <span className="footer-heading">Product</span>
            <a className="footer-link" href="#how-it-works">How it works</a>
            <a className="footer-link" href="#who-its-for">Who it&#x2019;s for</a>
          </div>
          <div className="footer-column">
            <span className="footer-heading">Company</span>
            <a className="footer-link" href="#insights">Insights</a>
            <a className="footer-link" href="mailto:hello@drpn.ai">Contact</a>
          </div>
          <div className="footer-column">
            <span className="footer-heading">Legal</span>
            <a className="footer-link" href="/privacy">Privacy</a>
            <a className="footer-link" href="/terms">Terms</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Darpan. All rights reserved.</span>
          <a href="https://www.linkedin.com/company/drpn-ai" aria-label="Darpan on LinkedIn">
            <LinkedinLogo size={20} weight="regular" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  )
}
