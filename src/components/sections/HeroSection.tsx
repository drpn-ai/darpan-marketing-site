import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react'

export function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="container">
        <div className="hero-inner">
          <span className="section-numeral" aria-hidden>01</span>
          <h1 id="hero-heading" className="hero-headline">
            Darpan operates the reconciliation infrastructure for retail.{' '}
            <em>Row by row, across every system.</em>
          </h1>
          <div className="hero-cta">
            <a
              className="btn btn-primary btn-primary-large"
              href="mailto:hello@drpn.ai?subject=Darpan%20walkthrough"
            >
              Request a walkthrough
              <ArrowRight size={18} weight="bold" aria-hidden />
            </a>
            <a className="hero-secondary" href="/customers">
              Read the product brief
              <ArrowUpRight size={14} weight="bold" aria-hidden />
            </a>
          </div>
          <span className="hero-meta">A reconciliation workspace, built in 2026.</span>
        </div>
      </div>
    </section>
  )
}
