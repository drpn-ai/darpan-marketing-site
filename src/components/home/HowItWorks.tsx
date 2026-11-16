const steps = [
  { k: 'Tell it', p: 'Describe how the work should flow, in your own words.' },
  {
    k: 'Darpan writes the checks',
    p: 'Its AI turns your story into plain statements people and machines can both read: the rules you’d say out loud, and the ones nobody wrote down, like “a piece can be returned or claimed under warranty, never both.”',
  },
  {
    k: 'Check it every morning',
    p: 'Each check matches records across systems that name them differently, a prefix here, a different id there, by the keys you choose.',
  },
  {
    k: 'Keep it until it’s fixed',
    p: 'Each break arrives with evidence, an owner and, where Darpan can name one, its cause. Ops managers work the list each morning and can share it with partner teams; a break stays listed until a check sees it fixed.',
  },
] as const

export function HowItWorks() {
  return (
    <section className="vl-band" id="how" aria-labelledby="vl-how-heading">
      <div className="vl-wrap">
        <div className="vl-sec-head" data-reveal>
          <span className="vl-kicker is-agree">How it works</span>
          <h2 className="vl-h2" id="vl-how-heading">
            Your business story, as checks.
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
          Your integration tool confirms each hand-off. Darpan checks the next
          morning that what was handed off arrived, complete and at the same
          amount, everywhere it was meant to go. Your own AI assistants can ask
          Darpan questions in plain language, too.
        </p>
      </div>
    </section>
  )
}
