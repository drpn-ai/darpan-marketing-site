import { SECURITY_FACTS } from '@/data/site'

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
        <div className="vl-caps">
          {SECURITY_FACTS.map((f) => (
            <div className="vl-cap" key={f.id} data-reveal>
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
