// Breadth without claiming integrations: these are the kind of statements a
// team in each industry would write, not connectors Darpan ships.
const statements = [
  { k: 'Commerce', s: 'Every exchange we approve ships.' },
  { k: 'SaaS', s: 'Every closed deal has an active subscription.' },
  { k: 'Hospitality', s: 'Rooms sold never exceed rooms available.' },
  {
    k: 'People & IT',
    s: 'Everyone who leaves is out of payroll and every app by end of day.',
  },
  {
    k: 'Healthcare',
    s: 'Every procedure tomorrow has an approved authorization.',
  },
  { k: 'Utilities', s: 'Every meter that reported a reading gets a bill.' },
] as const

export function Breadth() {
  return (
    <section className="vl-band" aria-labelledby="vl-breadth-heading">
      <div className="vl-wrap vl-split is-flip">
        <div className="vl-sec-head" data-reveal>
          <span className="vl-kicker">Not just commerce</span>
          <h2 className="vl-h2" id="vl-breadth-heading">
            Anywhere two systems have to line up.
          </h2>
          <p className="vl-lede">
            Every check is one sentence your team would say out loud.
          </p>
        </div>
        <ul className="vl-split-visual vl-sentences">
          {statements.map((x) => (
            <li key={x.k} data-reveal>
              <span className="vl-sentences-tick" aria-hidden>
                ✓
              </span>
              <span>
                <span className="vl-sentences-k">{x.k}</span>
                <span className="vl-sentences-s">{x.s}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
