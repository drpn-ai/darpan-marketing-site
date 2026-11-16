// Buyer objections, answered in one or two sentences each. The same list feeds the
// homepage FAQPage JSON-LD (routes/index.tsx), so page and structured data can't
// drift. Every answer traces to the Facts register.
export const FAQ = [
  {
    q: 'How long does setup take?',
    a: 'About a day. Connect your systems, and your first list arrives the next morning.',
  },
  {
    q: 'Who writes the checks?',
    a: 'You do, in plain words. Darpan’s agent turns them into checks, and you approve each one.',
  },
  {
    q: 'Does it change our data?',
    a: 'No. It never edits an order, a return or a row; you fix each break at its source.',
  },
  {
    q: 'What if a check is wrong?',
    a: 'Edit the sentence it checks. Each check is one plain statement, not code.',
  },
] as const

export function FaqStrip() {
  return (
    <section className="vl-band" aria-labelledby="vl-faq-heading">
      <div className="vl-wrap">
        <div className="vl-sec-head" data-reveal>
          <span className="vl-kicker">Questions</span>
          <h2 className="vl-h2" id="vl-faq-heading">
            What teams ask first.
          </h2>
        </div>
        <div className="vl-caps is-four">
          {FAQ.map((f) => (
            <div className="vl-cap" key={f.q} data-reveal>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
