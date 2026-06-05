import { useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { LinkedinLogo } from '@phosphor-icons/react'
import { writingEntries, pillarColor } from '@/data/writing-entries'
import { StackScene } from '@/components/StackScene'

export const Route = createFileRoute('/')({
  component: VerificationHome,
})

// Exported for MobileMenu, which maps [label, href]. Labels follow the
// operational positioning (lead the COO, name the gap, show the proof).
export const navItems = [
  ['Product', '#product'],
  ['The gap', '#gap'],
  ['Rules', '#rules'],
  ['Proof', '#proof'],
  ['Notes', '/writing'],
] as const

const WALKTHROUGH = 'mailto:hello@drpn.ai?subject=Darpan%20walkthrough'

function VerificationHome() {
  // Scroll-reveal + the instrument's verdict "resolve". SSR-safe: the hiding
  // rules are scoped to `.vl-animate`, a class added here on the client only,
  // so the page renders fully visible without JS and for reduced-motion users.
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
    root
      .querySelectorAll('[data-reveal], .vl-check')
      .forEach((el) => observer.observe(el))

    // 3D pointer parallax: set --rx/--ry on each [data-tilt] host as the pointer
    // moves over it; the 3D children read those vars. rAF-batched; resets on
    // leave. Only wired up here (client + motion-allowed), so SSR/reduced-motion
    // get a still diagram.
    const MAX = 9
    const cleanups: Array<() => void> = []
    root.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
      let raf = 0
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(() => {
          el.style.setProperty('--ry', `${(px * MAX).toFixed(2)}deg`)
          el.style.setProperty('--rx', `${(-py * MAX).toFixed(2)}deg`)
        })
      }
      const reset = () => {
        cancelAnimationFrame(raf)
        el.style.setProperty('--rx', '0deg')
        el.style.setProperty('--ry', '0deg')
      }
      el.addEventListener('pointermove', move)
      el.addEventListener('pointerleave', reset)
      cleanups.push(() => {
        cancelAnimationFrame(raf)
        el.removeEventListener('pointermove', move)
        el.removeEventListener('pointerleave', reset)
      })
    })

    return () => {
      observer.disconnect()
      cleanups.forEach((fn) => fn())
    }
  }, [])

  return (
    <main className="vl">
      <Header />
      <div className="vl-wrap">
        <Hero />
      </div>
      <WhyNow />
      <TheGap />
      <Proof />
      <Product />
      <RuleEngine />
      <Audiences />
      <Close />
      <Notes />
      <Footer />
    </main>
  )
}

function Header() {
  return (
    <header className="vl-header">
      <div className="vl-wrap vl-bar">
        <a className="vl-wordmark" href="/" aria-label="Darpan home">
          Darpan<span className="dot">.</span>
        </a>
        <nav className="vl-nav" aria-label="Primary">
          <a href="#product">Product</a>
          <a href="#gap">The gap</a>
          <a href="#rules">Rules</a>
          <a href="#proof">Proof</a>
          <a href="/writing">Notes</a>
        </nav>
        <a className="vl-cta is-nav" href={WALKTHROUGH}>
          Request a walkthrough
        </a>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="vl-hero" aria-labelledby="vl-hero-heading">
      <div>
        <span
          className="vl-kicker vl-rise"
          style={{ '--i': 0 } as React.CSSProperties}
        >
          The verification layer for the composable stack
        </span>
        <h1
          id="vl-hero-heading"
          className="vl-rise"
          style={{ '--i': 1 } as React.CSSProperties}
        >
          Nobody&rsquo;s checking your systems still{' '}
          <span className="mk">line up</span>.
        </h1>
        <p
          className="vl-hero-lede vl-rise"
          style={{ '--i': 2 } as React.CSSProperties}
        >
          Integration tools move data between Shopify, your OMS, the WMS, and
          the processor &mdash; then call the job done.{' '}
          <span className="em">
            Darpan keeps checking they still line up afterward
          </span>
          , row by row, while there&rsquo;s still time to act.
        </p>
        <div
          className="vl-hero-cta vl-rise"
          style={{ '--i': 3 } as React.CSSProperties}
        >
          <a className="vl-cta" href={WALKTHROUGH}>
            Request a walkthrough <span className="arr">&rarr;</span>
          </a>
          <a className="vl-textlink" href="#gap">
            See the gap <span aria-hidden>&#8599;</span>
          </a>
        </div>
      </div>

      <div
        className="vl-rise vl-check-stage"
        data-tilt
        style={{ '--i': 3 } as React.CSSProperties}
      >
        <div className="vl-check-float">
          <AgreementCheck />
        </div>
      </div>
    </section>
  )
}

type Row = {
  rec: string
  a: string
  b: string
  verdict: string
  drift?: boolean
}

const checkRows: readonly Row[] = [
  { rec: 'order #10482', a: '$8,440', b: '$8,440', verdict: 'lines up' },
  { rec: 'SKU AX-22', a: '142', b: '138', verdict: 'drift −4', drift: true },
  { rec: 'payout 06/03', a: '$12,300', b: '$12,070', verdict: 'drift $230', drift: true },
] as const

function AgreementCheck() {
  return (
    <div
      className="vl-check"
      role="img"
      aria-label="Continuous check across systems: 2,481 records verified, 2 drifting — a SKU quantity off by 4 and a payout short by $230 — caught before they cost anything."
    >
      <div className="vl-check-head">
        <span className="vl-check-title">Continuous check</span>
        <span className="vl-live">verifying</span>
      </div>
      <div className="vl-rows">
        <div className="vl-row is-head" aria-hidden>
          <span className="rec">record</span>
          <div className="vl-pair">
            <span className="vl-val">Shopify</span>
            <span className="vl-conn-label">vs</span>
            <span className="vl-val">OMS / WMS</span>
          </div>
          <span>status</span>
        </div>
        {checkRows.map((r) => (
          <div className={`vl-row${r.drift ? ' is-drift' : ''}`} key={r.rec}>
            <span className="rec">{r.rec}</span>
            <div className="vl-pair">
              <span className="vl-val">{r.a}</span>
              <span className="vl-conn" aria-hidden />
              <span className="vl-val">{r.b}</span>
            </div>
            <span className={`vl-verdict ${r.drift ? 'drift' : 'ok'}`}>
              {r.drift ? '⚠' : '✓'} {r.verdict}
            </span>
          </div>
        ))}
      </div>
      <div className="vl-check-foot">
        <span>2,481 records checked</span>
        <span>
          <span className="hit">2 drifting</span> &mdash; caught before they
          cost anything
        </span>
      </div>
    </div>
  )
}

const whyPoints = [
  {
    h: 'Every specialized tool is a new seam.',
    p: 'Five best-of-breed apps have far more places to disagree than one suite. Going composable multiplies the surfaces where data drifts.',
  },
  {
    h: 'Legacy reconciliation was built for the monolith.',
    p: 'The incumbents assume a finance-centric, suite-or-ERP world and a retrospective close. They were never designed to continuously verify a dozen independent operational systems.',
  },
  {
    h: 'Darpan is a specialized tool too — not a new monolith.',
    p: 'We are the one specialized job nobody else owns. We don’t replace your tools; we make the stack trustworthy.',
  },
] as const

function WhyNow() {
  return (
    <section className="vl-band" id="why" aria-labelledby="vl-why-heading">
      <div className="vl-wrap">
        <div className="vl-sec-head" data-reveal>
          <span className="vl-kicker">Why now</span>
          <h2 className="vl-h2" id="vl-why-heading">
            The stack got specialized &mdash; and every tool is a new{' '}
            <span className="mk-drift">seam</span>.
          </h2>
          <p className="vl-lede">
            Retailers traded the monolithic suite for best-of-breed point
            tools, each excellent at one job. Gartner projects{' '}
            <span className="em">
              ≥70% of organizations will be mandated to acquire composable
              technology by 2026
            </span>
            , up from 50% in 2023. The trend creates the problem: the more tools
            you connect, the more seams there are for data to drift through.
          </p>
        </div>

        <div className="vl-why-grid">
          <div data-reveal>
            <StackScene />
            <p className="vl-stack-note">
              Integration platforms scale the number of{' '}
              <span>connections</span> &mdash; not the assurance the connected
              systems still <span className="hit">reconcile</span>.
            </p>
          </div>

          <div className="vl-why-points">
            {whyPoints.map((pt) => (
              <div className="vl-point" key={pt.h} data-reveal>
                <h3>{pt.h}</h3>
                <p>{pt.p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TheGap() {
  return (
    <section className="vl-band" id="gap" aria-labelledby="vl-gap-heading">
      <div className="vl-wrap">
        <div className="vl-sec-head" data-reveal>
          <span className="vl-kicker">The objection we beat</span>
          <p className="vl-objection" id="vl-gap-heading">
            <span className="q">&ldquo;</span>Isn&rsquo;t this my integration
            platform&rsquo;s job?<span className="q">&rdquo;</span>
          </p>
        </div>

        <div className="vl-mv" data-reveal>
          <div className="vl-mv-cell move">
            <span className="k">Move</span>
            <h3>A successful sync moves a record from A to B.</h3>
            <p>
              Integration platforms are built to transfer a record and confirm
              the transfer succeeded. That is the guarantee they make.
            </p>
          </div>
          <div className="vl-mv-cell verify">
            <span className="k">Verify</span>
            <h3>
              A correct check proves A and B{' '}
              <span className="agree-u">still line up</span> afterward.
            </h3>
            <p>
              Across timing lags, partial syncs, retries, schema mismatches, and
              one-off exceptions. A different guarantee entirely.
            </p>
          </div>
        </div>

        <p className="vl-gap-foot" data-reveal>
          Drift accumulates <span className="em">between</span> successful syncs
          &mdash; exactly where nobody is looking. The integration ran fine; the
          numbers are still wrong.
        </p>
      </div>
    </section>
  )
}

type Stat = { num: string; claim: string; src: string; lead?: boolean }

const stats: readonly Stat[] = [
  {
    num: '65%',
    lead: true,
    claim:
      'of inventory records were inaccurate in a study of ~370,000 records across 37 stores. Operational data is chronically wrong — and operations owns it.',
    src: 'DeHoratius & Raman, Management Science (2008); Auburn RFID Lab field work lands in the same range.',
  },
  {
    num: '$222.7B',
    claim:
      'of global inventory distortion attributed to “data disconnects and systems that are not integrated” — its own root-cause category.',
    src: 'IHL Group / OrderDynamics (2015). Vendor-sponsored and dated — directional, not primary.',
  },
  {
    num: '#1',
    claim:
      'Splitting a marketplace payout back into sales, fees, and refunds is the single largest source of material misstatement in ecommerce financials.',
    src: 'EcomCPA (2026), practitioner account.',
  },
] as const

function Proof() {
  return (
    <section className="vl-band" id="proof" aria-labelledby="vl-proof-heading">
      <div className="vl-wrap">
        <div className="vl-sec-head" data-reveal>
          <span className="vl-kicker">The problem, with proof</span>
          <h2 className="vl-h2" id="vl-proof-heading">
            The cost of systems not lining up is large, real, and{' '}
            <span className="mk-drift">measured</span>.
          </h2>
        </div>

        <div className="vl-evidence">
          {stats.map((s) => (
            <div
              className={`vl-stat${s.lead ? ' is-lead' : ''}`}
              key={s.num}
              data-reveal
            >
              <div className="num">{s.num}</div>
              <p className="claim">{s.claim}</p>
              <span className="src">{s.src}</span>
            </div>
          ))}
        </div>

        <p className="vl-proof-note" data-reveal>
          We cite where each figure comes from, and flag what’s sponsored or
          dated. The verification layer verifies its own claims too.
        </p>
      </div>
    </section>
  )
}

const caps = [
  {
    k: 'Describe',
    h: 'Map each system once.',
    p: 'The fields, the types, the keys that anchor a record. No six-week implementation — onboard a new system in days.',
  },
  {
    k: 'Verify',
    h: 'Every record paired, every mismatch surfaced with the rows behind it.',
    p: 'Drift, missing objects, and resolved pairs out of one continuous run, with the source line attached to every call.',
  },
  {
    k: 'Resolve',
    h: 'Cause and fix — not a pile of unmatched items.',
    p: 'A discrepancy is named and explained while it’s still cheap to act on — before it’s a stockout or a leak, not at month-end.',
  },
] as const

function Product() {
  return (
    <section className="vl-band" id="product" aria-labelledby="vl-product-heading">
      <div className="vl-wrap">
        <div className="vl-sec-head" data-reveal>
          <span className="vl-kicker is-agree">The product</span>
          <h2 className="vl-h2" id="vl-product-heading">
            One specialized job. <span className="mk">Nobody else owns it.</span>
          </h2>
        </div>

        <div className="vl-caps">
          {caps.map((c) => (
            <div className="vl-cap" key={c.k} data-reveal>
              <div className="k">{c.k}</div>
              <h3>{c.h}</h3>
              <p>{c.p}</p>
            </div>
          ))}
        </div>

        <p className="vl-ai-line" data-reveal>
          AI-native is the <span className="em">reason</span> we can do this —
          never the pitch. We demonstrate the capability and let the work speak.
        </p>
      </div>
    </section>
  )
}

const ruleRows = [
  { op: 'match', pre: 'key ', k: 'order_id', res: '✓ paired', cls: 'ok' },
  { op: 'normalize', pre: 'strip ', k: '“ORD-” prefix', res: '✓ applied', cls: 'ok' },
  { op: 'tolerance', pre: 'qty within ', k: '±0', res: '⚠ drift −4', cls: 'drift' },
  { op: 'resolve', pre: 'propose ', k: 'WMS recount', res: '→ WMS short 4', cls: 'note' },
] as const

const rulePrims = [
  {
    k: 'Match',
    p: 'Pair records by the keys you name — order id, SKU, payout — across systems that label them differently.',
  },
  {
    k: 'Tolerate',
    p: 'Define what counts as lined up: exact, within ±n, inside a date window. Drift is anything outside it.',
  },
  {
    k: 'Normalize',
    p: 'Trim prefixes, fix casing, convert currency and units — so messy, novel retail data still lines up.',
  },
  {
    k: 'Resolve',
    p: 'When a rule fails, name the cause and propose the fix — not just a pile of unmatched items.',
  },
] as const

function RuleEngine() {
  return (
    <section className="vl-band" id="rules" aria-labelledby="vl-rules-heading">
      <div className="vl-wrap">
        <div className="vl-sec-head" data-reveal>
          <span className="vl-kicker is-agree">The rule engine</span>
          <h2 className="vl-h2" id="vl-rules-heading">
            You decide when your systems <span className="mk">line up</span>.
            The engine enforces it, every run.
          </h2>
          <p className="vl-lede">
            Darpan matches records by the keys you name, within the tolerances
            you set, across formats that never quite line up. Rules are
            declarative — readable, versioned, changed in minutes, not a
            six-week re-implementation. A new system or a messy field shows up,
            you adjust a rule, not rewrite an integration.
          </p>
        </div>

        <div className="vl-why-grid">
          <div
            className="vl-rules-panel"
            data-reveal
            role="img"
            aria-label="A matching pass for SKU AX-22: Shopify reads order #10482 qty 142, WMS reads ORD-10482 qty 138. Rules evaluate in turn — match on order id pairs them, normalize strips the ORD- prefix, the qty tolerance flags a drift of −4, and resolve proposes the cause: WMS short 4."
          >
            <div className="vl-rules-head">
              <span className="vl-rules-title">matching pass · SKU AX-22</span>
              <span className="vl-live">running</span>
            </div>
            <div className="vl-rules-io">
              <span className="vl-rec">
                <span className="sys">Shopify</span> order #10482 · qty 142
              </span>
              <span className="vl-rec">
                <span className="sys">WMS</span> ORD-10482 · qty 138
              </span>
            </div>
            <div className="vl-rules-list">
              {ruleRows.map((r, i) => (
                <div
                  className="vl-rule"
                  key={r.k}
                  style={{ '--ri': i } as React.CSSProperties}
                >
                  <span className="vl-rule-op">{r.op}</span>
                  <span className="vl-rule-detail">
                    {r.pre}
                    <span className="k">{r.k}</span>
                  </span>
                  <span className={`vl-rule-res ${r.cls}`}>{r.res}</span>
                </div>
              ))}
              <span className="vl-rules-scan" aria-hidden />
            </div>
            <div className="vl-rules-foot">
              <span>4 rules evaluated</span>
              <span>
                <span className="hit">1 discrepancy</span> · cause proposed,
                before it cost anything
              </span>
            </div>
          </div>

          <div className="vl-why-points">
            {rulePrims.map((p) => (
              <div className="vl-point" key={p.k} data-reveal>
                <h3>{p.k}</h3>
                <p>{p.p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Audiences() {
  return (
    <section className="vl-band" aria-labelledby="vl-aud-heading">
      <div className="vl-wrap">
        <div className="vl-sec-head" data-reveal>
          <span className="vl-kicker">Two value stories, one product</span>
          <h2 className="vl-h2" id="vl-aud-heading">
            Built for the operator. Reassuring to finance.
          </h2>
        </div>

        <div className="vl-aud">
          <div className="vl-aud-col lead" data-reveal>
            <div className="k">Lead — the COO</div>
            <h3>Trust the numbers now, in time to act.</h3>
            <p>
              Operations makes daily decisions — reorder, chase a 3PL
              discrepancy, catch leakage this week — on numbers that have to be
              right <span className="em">today</span>. The lag finance tolerates
              is intolerable here.
            </p>
            <dl>
              <dt>Problem</dt>
              <dd>Systems disagree; decisions made on numbers nobody trusts.</dd>
              <dt>Why buy</dt>
              <dd>Stop leakage and stockouts before they cost money.</dd>
            </dl>
          </div>

          <div className="vl-aud-col reassure" data-reveal>
            <div className="k">Reassure — the CFO</div>
            <h3>A cleaner, audit-ready close, as a byproduct.</h3>
            <p>
              Anything touching money keeps finance in the room. Darpan feeds a
              faster, cleaner close with the evidence behind every line — without
              threatening anyone’s controls.
            </p>
            <dl>
              <dt>Problem</dt>
              <dd>The close is slow and manual.</dd>
              <dt>Why buy</dt>
              <dd>Less manual effort, fewer errors, a clean audit trail.</dd>
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}

function Close() {
  return (
    <section className="vl-close" id="talk">
      <div className="vl-wrap">
        <h2>
          Keep your best-of-breed tools. Add the layer that proves they{' '}
          <span className="mk">line up</span>.
        </h2>
        <p>
          Don’t go back to one system that does everything okay-ish. Add the one
          specialized job nobody else owns: continuous proof your systems still
          reconcile.
        </p>
        <a className="vl-close-cta" href={WALKTHROUGH}>
          Request a walkthrough <span className="arr">&rarr;</span>
        </a>
      </div>
    </section>
  )
}

function Notes() {
  // Surface three different pillars on the home so the color-coding reads:
  // keep the latest two Guides, swap the middle for a Methods note.
  const entries = [
    writingEntries[0],
    writingEntries.find((e) => e.category === 'Methods') ?? writingEntries[1],
    writingEntries[2],
  ]
  return (
    <section className="vl-band" aria-labelledby="vl-notes-heading">
      <div className="vl-wrap">
        <div className="vl-sec-head" data-reveal>
          <span className="vl-kicker">Notes</span>
          <h2 className="vl-h2" id="vl-notes-heading">
            Where systems drift, and what to do about it.
          </h2>
        </div>
        <div className="vl-cards">
          {entries.map((entry) => (
            <a
              className="vl-card"
              key={entry.slug}
              href={`/writing/${entry.slug}`}
              style={
                {
                  '--pillar': pillarColor[entry.category] ?? '#8a867a',
                } as React.CSSProperties
              }
            >
              <span className="tag">{entry.category}</span>
              <h3>{entry.title}</h3>
              <span className="date">{entry.date}</span>
            </a>
          ))}
        </div>
        <a className="vl-notes-more" href="/writing">
          All notes <span aria-hidden>&rarr;</span>
        </a>
      </div>
    </section>
  )
}

function Footer() {
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
