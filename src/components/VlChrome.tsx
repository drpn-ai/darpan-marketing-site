// Shared chrome for the operational ("verification layer") design system.
// Used by every route except the home (which keeps its own in-page-anchored
// header) and /notebook (the preserved original design). Nav links point at
// home anchors so they work from any page.
import type { ReactNode } from 'react'
import { LinkedinLogo } from '@phosphor-icons/react'

const WALKTHROUGH = 'mailto:hello@drpn.ai?subject=Darpan%20walkthrough'

const NAV: ReadonlyArray<readonly [string, string]> = [
  ['Product', '/#product'],
  ['The gap', '/#gap'],
  ['Rules', '/#rules'],
  ['Proof', '/#proof'],
  ['Notes', '/notes'],
]

export function VlHeader() {
  return (
    <header className="vl-header">
      <div className="vl-wrap vl-bar">
        <a className="vl-wordmark" href="/" aria-label="Darpan home">
          Darpan<span className="dot">.</span>
        </a>
        <nav className="vl-nav" aria-label="Primary">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <a className="vl-cta is-nav" href={WALKTHROUGH}>
          Request a walkthrough
        </a>
      </div>
    </header>
  )
}

export function VlFooter() {
  return (
    <footer className="vl-footer">
      <div className="vl-wrap vl-footer-inner">
        <span>
          © {new Date().getFullYear()} Darpan. The verification layer for the
          composable retail stack. Keep your best-of-breed tools; add the layer
          that proves they line up.
        </span>
        <a
          href="https://www.linkedin.com/company/drpn-ai"
          aria-label="Darpan on LinkedIn"
        >
          <LinkedinLogo size={18} weight="regular" aria-hidden />
        </a>
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
