import { WALKTHROUGH_HREF } from '@/data/site'

export function Close() {
  return (
    <section className="vl-close" id="talk">
      <div className="vl-wrap">
        <h2>
          Make every morning a close day. Each break gets fixed while it&rsquo;s
          still small.
        </h2>
        <div className="vl-hero-cta">
          <a className="vl-close-cta" href={WALKTHROUGH_HREF}>
            Talk to us <span className="arr">&rarr;</span>
          </a>
          <a className="vl-textlink" href="/tour">
            Watch the three-minute tour <span aria-hidden>&#8599;</span>
          </a>
        </div>
      </div>
    </section>
  )
}
