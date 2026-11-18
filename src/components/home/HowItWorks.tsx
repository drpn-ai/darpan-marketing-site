const steps = [
  {
    k: 'Tell it',
    p: 'Describe how your business should run, in your own words, the way you’d explain it to a new hire.',
  },
  {
    k: 'Darpan writes the checks',
    p: 'Darpan’s agent turns what you told it into checks. It also adds the rules you didn’t think to say, like “a piece is returned or claimed under warranty, never both.”',
  },
  {
    k: 'Check it every day',
    p: 'Every day, it finds each order, return and refund in every system, even where each one has a different id.',
  },
  {
    k: 'Fix it for good',
    p: 'Each break comes with its owner and, often, its cause, so it gets fixed at the source and stays listed until it is.',
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
      </div>
    </section>
  )
}
