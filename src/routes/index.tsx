import { useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { MobileMenu } from '@/components/MobileMenu'
import { HeroSection } from '@/components/sections/HeroSection'
import { ReconciledBySection } from '@/components/sections/ReconciledBySection'
import { ProductSection } from '@/components/sections/ProductSection'
import { WorkSection } from '@/components/sections/WorkSection'
import { WritingSection } from '@/components/sections/WritingSection'
import { LinkedinLogo } from '@phosphor-icons/react'

export const Route = createFileRoute('/')({
  component: Home,
})

export const navItems = [
  ['Product', '#product'],
  ['Customers', '/customers'],
  ['Writing', '/writing'],
] as const

function Home() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-revealed', 'true')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' },
    )

    const viewportHeight = window.innerHeight
    document.querySelectorAll('.section-band').forEach((node) => {
      const rect = node.getBoundingClientRect()
      // Section is fully or partially in initial viewport — show immediately.
      // Section is entirely below the fold — start hidden and let observer reveal on scroll.
      const isAboveOrInViewport = rect.top < viewportHeight
      if (isAboveOrInViewport) {
        node.setAttribute('data-revealed', 'true')
      } else {
        node.setAttribute('data-revealed', 'false')
      }
      observer.observe(node)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <main className="site-shell">
      <SiteHeader />
      <HeroSection />
      <ReconciledBySection />
      <ProductSection />
      <WorkSection />
      <WritingSection />
      <SiteFooter />
    </main>
  )
}

function SiteHeader() {
  return (
    <header className="site-header" aria-label="Darpan marketing navigation">
      <div className="container site-header-inner">
        <a className="brand-link" href="/" aria-label="Darpan home">
          Darpan
        </a>
        <nav className="site-nav" aria-label="Sections">
          {navItems.map(([label, href]) => (
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

function SiteFooter() {
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
