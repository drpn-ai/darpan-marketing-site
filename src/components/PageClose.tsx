import type { ReactNode } from 'react'
import { WALKTHROUGH_HREF } from '@/data/site'

// The one way every page ends: a soft green band, a headline about Darpan, the
// green "Talk to us" button and one quiet link. Only the words change by page.
export function PageClose({
  title,
  link,
  id,
  children,
}: {
  title: ReactNode
  link: { href: string; label: string; external?: boolean }
  id?: string
  children?: ReactNode
}) {
  const headingId = id ? `${id}-heading` : undefined
  return (
    <section className="vl-close" id={id} aria-labelledby={headingId}>
      <div className="vl-wrap">
        <h2 id={headingId}>{title}</h2>
        {children}
        <div className="vl-hero-cta">
          <a className="vl-close-cta" href={WALKTHROUGH_HREF}>
            Talk to us <span className="arr">&rarr;</span>
          </a>
          <a
            className="vl-textlink"
            href={link.href}
            {...(link.external
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
          >
            {link.label} <span aria-hidden>{link.external ? '↗' : '→'}</span>
          </a>
        </div>
      </div>
    </section>
  )
}
