// One real production case, told as a story (written with the darpan-copy
// skill). Names, vendors and order ids stay out; the facts and the closing
// estimate (about one order in a hundred) are in the Facts register
// (docs/superpowers/specs/2026-10-29-drpn-site-rethink-design.md).

// Three more cases from one jewelry brand's 2026-11-13 audit run, re-read
// from production; counts, totals and run ids are in the Facts register.
const alsoFound = [
  {
    k: 'Refunded, then completed',
    p: 'Eight orders were refunded seconds after they were placed, usually because the customer changed their mind. The order system never heard, and completed them anyway: about $11,000 of orders.',
  },
  {
    k: 'Taken home, still on backorder',
    p: 'Ninety store sales left with the customer. The ERP’s stock records for those 40 stores were wrong, so it still lists 166 of their lines on backorder. The orders total about $12,000.',
  },
  {
    k: 'An exchange waiting on the past',
    p: 'A customer finished a store exchange and left with the new piece. The ERP never got it: the order system holds an exchange until its original order ships, and that one had waited six weeks.',
  },
] as const

export function FromProduction() {
  return (
    <section
      className="vl-band"
      id="production"
      aria-labelledby="vl-production-heading"
    >
      <div className="vl-wrap">
        <div className="vl-sec-head" data-reveal>
          <span className="vl-kicker">From production</span>
          <h2 className="vl-h2" id="vl-production-heading">
            The fraud screen worked. The order shipped anyway.
          </h2>
          <p className="vl-lede">
            At a footwear brand, a customer asked to exchange a pair. The
            storefront&rsquo;s fraud screen flagged the request and cancelled
            it, which is exactly what a fraud screen is for.
          </p>
          <p className="vl-lede">
            Nobody told the WMS about the cancellation, so it shipped the
            replacement to a customer the brand had just decided not to trust.
          </p>
          <p className="vl-lede">
            The storefront showed a cancelled exchange, the WMS showed a
            finished shipment, and each was telling the truth. Breaks like this
            usually surface when a customer calls to complain, or at the
            month-end close. This customer was never going to call.
          </p>
          <p className="vl-lede">
            The morning Darpan&rsquo;s checks were switched on, the exchange
            appeared on its list of problems to fix, marked as cancelled in the
            storefront but shipped by the WMS, with the team responsible named
            beside it. It wasn&rsquo;t the only one; the same thing had
            happened nine times.
          </p>
        </div>

        <p className="vl-gap-foot" data-reveal>
          From a brand that runs Darpan; details withheld. Nine replacement
          pairs come to roughly $1,000 of product, estimated at a typical pair price.
          Across the five-plus brands in production, about one order in a
          hundred breaks somewhere between two systems.
        </p>

        <p className="vl-gap-foot vl-also" data-reveal>
          Also found this month, at a jewelry brand:
        </p>
        <div className="vl-caps">
          {alsoFound.map((c) => (
            <div className="vl-cap" key={c.k} data-reveal>
              <div className="k">{c.k}</div>
              <p>{c.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
