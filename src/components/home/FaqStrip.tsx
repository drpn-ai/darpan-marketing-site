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
    a: 'You describe how your business should run, in plain words. Darpan’s AI turns that into checks, and your team approves each one before it runs.',
  },
  {
    q: 'Does Darpan change our data?',
    a: 'No. It never edits an order, a return or a row; over SFTP it only archives the files it has read. You fix a break in its own system, and the next morning’s check sees it fixed.',
  },
  {
    q: 'What if a check is wrong?',
    a: 'Change the sentence it checks. Each check is one plain statement, so fixing it means editing a sentence, not code.',
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
