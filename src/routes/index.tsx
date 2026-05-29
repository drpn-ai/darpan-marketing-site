import { createFileRoute } from '@tanstack/react-router'
import {
  ArrowRight,
  CheckCircle,
  GitBranch,
  LinkedinLogo,
  MagnifyingGlass,
} from '@phosphor-icons/react'
import { MobileMenu } from '@/components/MobileMenu'

export const Route = createFileRoute('/')({
  component: Home,
})

export const navItems = [
  ['How it works', '#how-it-works'],
  ["Who it's for", '#who-its-for'],
  ['Insights', '#insights'],
] as const

const stats = [
  {
    number: '11 days',
    label: 'a month the average finance team spends reconciling things by hand.',
  },
  {
    number: '3–4%',
    label: 'of inventory hiding in plain sight every quarter, unreconciled.',
  },
  {
    number: '$2.1M',
    label: 'of revenue quietly going missing each year in SKU-level gaps.',
  },
] as const

const steps = [
  {
    icon: GitBranch,
    title: 'Connect your systems',
    body: 'Point Darpan at the systems your team already runs — POS, ERP, WMS, commerce, files, REST. Connectors handle the schemas; primary IDs anchor the match. No custom ETL, no IT project.',
  },
  {
    icon: MagnifyingGlass,
    title: "Surface what doesn't reconcile",
    body: "Darpan compares every record by primary ID, classifies what's missing, different, or out of sync, and groups the variance by SKU and location — with the evidence behind each call. Automatically.",
  },
  {
    icon: CheckCircle,
    title: 'Close with confidence',
    body: 'Finance and ops review flagged items in one view, resolve them at the source, and close the books with a full audit trail attached to every decision. Save the run, automate the rerun.',
  },
] as const

const personas = [
  {
    role: 'CFO / Finance leadership',
    title: 'Variance visibility without the manual grind',
    body: 'Know your P&L exposure from inventory and revenue discrepancies before close, not after. Darpan surfaces the gap and the rows behind it, so the number on the board deck is one you can defend.',
  },
  {
    role: 'VP of Operations',
    title: 'One source of truth across every location',
    body: 'Stop fielding conflicting reports from POS, WMS, and ERP. Darpan reconciles at the SKU and location level, so the ops team works from one mismatch list instead of three exports.',
  },
  {
    role: 'Controller',
    title: 'Audit-ready from day one',
    body: 'Every reconciled item carries the saved run, the schema, the primary IDs, and the resolution trail. Close prep becomes a check, not a project — and audit follow-ups become a search, not a forensic dig.',
  },
] as const

const insights = [
  {
    tag: 'Reconciliation',
    title: 'Why retail reconciliation breaks at scale — and what to fix first',
    meta: '6 min read · April 2026',
    art: 'rows',
  },
  {
    tag: 'Finance ops',
    title: 'The hidden P&L cost of waiting for inventory variance to surface in close',
    meta: '5 min read · March 2026',
    art: 'columns',
  },
  {
    tag: 'Architecture',
    title: 'How AI reconciliation works when your data lives in five systems',
    meta: '8 min read · February 2026',
    art: 'nodes',
  },
] as const

function Home() {
  return (
    <main className="site-shell">
      <SiteHeader />
      <HeroSection />
      <PainSection />
      <HowItWorksSection />
      <PersonasSection />
      <InsightsSection />
      <FinalCtaSection />
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
        <a className="btn btn-primary site-header-cta" href="mailto:hello@drpn.ai?subject=Darpan%20walkthrough">
          Request a walkthrough
        </a>
        <MobileMenu />
      </div>
    </header>
  )
}

function HeroSection() {
  return (
    <section className="hero section-light">
      <div className="container hero-inner">
        <h1 className="hero-headline">
          Retail reconciliation that closes in{' '}
          <span className="hero-emphasis">hours, not weeks</span>.
        </h1>
        <p className="hero-subhead">
          We connect your retail systems, compare every record by primary ID, and surface what doesn’t add up — so your finance team can spend the month doing finance, not chasing variances.
        </p>
        <div className="hero-cta">
          <a className="btn btn-primary btn-primary-large" href="mailto:hello@drpn.ai?subject=Darpan%20walkthrough">
            Request a walkthrough
            <ArrowRight size={18} weight="bold" aria-hidden />
          </a>
          <span className="cta-note">30 minutes. No pitch deck.</span>
        </div>
      </div>
    </section>
  )
}


function PainSection() {
  return (
    <section className="section section-cream" aria-labelledby="pain-heading">
      <div className="container pain-grid">
        <div className="pain-copy">
          <span className="section-label">Why it matters</span>
          <h2 id="pain-heading">
            The <span className="text-script">hidden</span> cost of manual reconciliation in retail
          </h2>
          <p>
            Finance teams at multi-location retailers spend an average of 11 days per month manually reconciling inventory, POS, and ERP data. Every day that data stays misaligned is a day your margins are invisible.
          </p>
        </div>
        <ul className="stat-list" aria-label="Reconciliation cost benchmarks">
          {stats.map((stat) => (
            <li key={stat.number} className="stat-block">
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section section-light" aria-labelledby="how-heading">
      <div className="container">
        <div className="section-header-block">
          <span className="section-label">How it works</span>
          <h2 id="how-heading">Three steps from data chaos to closed books</h2>
        </div>
        <ol className="steps-flow" aria-label="Three-step process">
          {steps.map((step, index) => (
            <li className="step-node" key={step.title}>
              <span className="step-index" aria-hidden>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="step-icon">
                <step.icon size={36} weight="light" aria-hidden />
              </span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function PersonasSection() {
  return (
    <section id="who-its-for" className="section section-cream" aria-labelledby="who-heading">
      <div className="container">
        <div className="section-header-block">
          <span className="section-label">Who it&#x2019;s for</span>
          <h2 id="who-heading">Built for every stakeholder in the close cycle</h2>
        </div>
        <div className="persona-columns">
          {personas.map((persona) => (
            <article className="persona-column" key={persona.role}>
              <span className="persona-role">{persona.role}</span>
              <h3>{persona.title}</h3>
              <p>{persona.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function InsightsSection() {
  return (
    <section id="insights" className="section section-light" aria-labelledby="insights-heading">
      <div className="container">
        <div className="section-header-block">
          <span className="section-label">Insights</span>
          <h2 id="insights-heading">Thinking out loud on retail finance and reconciliation</h2>
        </div>
        <div className="insights-grid">
          {insights.map((post) => (
            <article className="insight-card" key={post.title}>
              <div className="insight-body">
                <span className="insight-tag">{post.tag}</span>
                <h3>{post.title}</h3>
                <span className="insight-meta">{post.meta}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCtaSection() {
  return (
    <section id="talk" className="final-cta">
      <div className="container final-cta-inner">
        <h2>Ready to close faster?</h2>
        <p className="final-cta-body">
          Tell us what your close cycle looks like today. We’ll show you where Darpan fits — and, honestly, where it doesn’t.
        </p>
        <a className="btn btn-accent" href="mailto:hello@drpn.ai?subject=Darpan%20walkthrough">
          Request a walkthrough
          <ArrowRight size={18} weight="bold" aria-hidden />
        </a>
        <span className="final-cta-note">30 minutes. No pitch deck.</span>
      </div>
    </section>
  )
}

function SiteFooter() {
  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <span className="footer-wordmark">Darpan</span>
            <span className="footer-tagline">AI reconciliation for retail, minus the busywork.</span>
          </div>
          <div className="footer-column">
            <span className="footer-heading">Product</span>
            <a className="footer-link" href="#how-it-works">How it works</a>
            <a className="footer-link" href="#who-its-for">Who it’s for</a>
            <a className="footer-link" href="#talk">Security</a>
          </div>
          <div className="footer-column">
            <span className="footer-heading">Company</span>
            <a className="footer-link" href="#insights">Insights</a>
            <a className="footer-link" href="mailto:hello@drpn.ai">Contact</a>
            <a className="footer-link" href="https://docs.drpn.ai">Docs</a>
          </div>
          <div className="footer-column">
            <span className="footer-heading">Legal</span>
            <a className="footer-link" href="mailto:hello@drpn.ai?subject=Privacy">Privacy</a>
            <a className="footer-link" href="mailto:hello@drpn.ai?subject=Terms">Terms</a>
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
