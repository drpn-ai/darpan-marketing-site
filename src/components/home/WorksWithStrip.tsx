import { CONNECTORS } from '@/data/site'

export function WorksWithStrip() {
  return (
    <section className="vl-band" aria-labelledby="vl-works-heading">
      <div className="vl-wrap">
        <div className="vl-sec-head" data-reveal>
          <span className="vl-kicker">Works with</span>
          <h2 className="vl-h2" id="vl-works-heading">
            Reads the systems you already run.
          </h2>
        </div>
        <ul className="vl-chips" data-reveal>
          {CONNECTORS.map((c) => (
            <li key={c.name}>{c.name}</li>
          ))}
        </ul>
        <a className="vl-textlink" href="/works-with">
          See what Darpan checks for each <span aria-hidden>&rarr;</span>
        </a>
      </div>
    </section>
  )
}
