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
      <div className="vl-wrap">
        <div className="vl-sec-head" data-reveal>
          <span className="vl-kicker">Not just commerce</span>
          <h2 className="vl-h2" id="vl-breadth-heading">
            Anywhere two systems have to line up.
          </h2>
          <p className="vl-lede">
            Every check is one sentence your team would say out loud.
          </p>
        </div>
        <div className="vl-caps">
          {statements.map((x) => (
            <div className="vl-cap" key={x.k} data-reveal>
              <div className="k">{x.k}</div>
              <h3>{x.s}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
