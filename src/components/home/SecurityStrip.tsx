import type { ReactNode } from 'react'
import { SECURITY_FACTS, type SecurityFact } from '@/data/site'

// One line icon per promise: it only reads (an eye), credentials sealed (a
// lock), each company in its own lane (separate lanes).
const ICONS: Record<SecurityFact['id'], ReactNode> = {
  'no-changes': (
    <svg viewBox="0 0 24 24">
      <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  sealed: (
    <svg viewBox="0 0 24 24">
      <rect x="5" y="11" width="14" height="9.5" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  ),
  'own-lane': (
    <svg viewBox="0 0 24 24">
      <path d="M6 3v18M12 3v18M18 3v18" />
    </svg>
  ),
}

export function SecurityStrip() {
  return (
    <section className="vl-band" aria-labelledby="vl-security-heading">
      <div className="vl-wrap">
        <div className="vl-sec-head" data-reveal>
          <span className="vl-kicker">Security</span>
          <h2 className="vl-h2" id="vl-security-heading">
            What Darpan reads, and where it stays.
          </h2>
        </div>
        <div className="vl-promises">
          {SECURITY_FACTS.map((f) => (
            <div className="vl-promise" key={f.id} data-reveal>
              <span className="vl-promise-icon" aria-hidden>
                {ICONS[f.id]}
              </span>
              <h3>{f.heading}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
        <p className="vl-gap-foot">
          <a className="vl-textlink" href="/security">
            How Darpan handles your data <span aria-hidden>&rarr;</span>
          </a>
        </p>
      </div>
    </section>
  )
}
