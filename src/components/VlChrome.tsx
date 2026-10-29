// Shared chrome for the operational design system. Used by every route except
// /notebook (the preserved original design).
import type { ReactNode } from 'react'
import { LinkedinLogo } from '@phosphor-icons/react'
import { MobileMenu } from '@/components/MobileMenu'
import { NAV_ITEMS, WALKTHROUGH_HREF } from '@/data/site'

export function VlHeader() {
  return (
    <header className="vl-header">
      <div className="vl-wrap vl-bar">
        <a className="vl-wordmark" href="/" aria-label="Darpan home">
          Darpan<span className="dot">.</span>
        </a>
        <nav className="vl-nav" aria-label="Primary">
          {NAV_ITEMS.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <a className="vl-cta is-nav" href={WALKTHROUGH_HREF}>
          Talk to us
        </a>
        <MobileMenu />
      </div>
    </header>
  )
}

export function VlFooter() {
  return (
    <footer className="vl-footer">
      <div className="vl-wrap vl-footer-inner">
        <span>
          © {new Date().getFullYear()} Darpan. Checks for the work between
          your systems.
        </span>
        <nav className="vl-footer-links" aria-label="Footer">
          <a href="https://docs.drpn.ai">Docs</a>
          <a href="https://developers.drpn.ai">Developers</a>
          <a
            href="https://www.linkedin.com/company/drpn-ai"
            aria-label="Darpan on LinkedIn"
          >
            <LinkedinLogo size={18} weight="regular" aria-hidden />
          </a>
        </nav>
      </div>
    </footer>
  )
}

export function VlPage({ children }: { children: ReactNode }) {
  return (
    <main className="vl">
      <VlHeader />
      {children}
      <VlFooter />
    </main>
  )
}
