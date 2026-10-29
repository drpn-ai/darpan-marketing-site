const steps = [
  { k: 'Say it', p: 'Write what must stay true, in plain English.' },
  { k: 'Check it', p: 'Darpan reads every system, every morning.' },
  { k: 'Explain it', p: 'Each break arrives with evidence and an owner.' },
  { k: 'Keep it', p: 'It stays listed until a check sees it fixed.' },
] as const

export function HowItWorks() {
  return (
    <section className="vl-band" id="how" aria-labelledby="vl-how-heading">
      <div className="vl-wrap">
        <div className="vl-sec-head" data-reveal>
          <span className="vl-kicker is-agree">How it works</span>
          <h2 className="vl-h2" id="vl-how-heading">
            Say it. Check it. Explain it. Keep it.
          </h2>
        </div>
        <div className="vl-caps is-four">
          {steps.map((s) => (
            <div className="vl-cap" key={s.k} data-reveal>
              <div className="k">{s.k}</div>
              <p>{s.p}</p>
            </div>
          ))}
        </div>
        <p className="vl-gap-foot" data-reveal>
          Darpan matches records across systems that name them differently
          &mdash; a prefix here, a different id there &mdash; by the keys you
          choose.
        </p>
      </div>
    </section>
  )
}
