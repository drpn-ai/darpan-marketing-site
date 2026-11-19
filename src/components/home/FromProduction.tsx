// One real production case, told as a story (written with the darpan-copy
// skill). Names, vendors and order ids stay out; the facts and the closing
// estimate (about one order in a hundred) are in the Facts register
// (docs/superpowers/specs/2026-10-29-drpn-site-rethink-design.md).
import { ExchangeCollage } from '@/components/home/ExchangeCollage'
import { useSettle } from '@/components/home/useSettle'

// Three more cases from one jewelry brand's 2026-11-13 audit run, re-read
// from production; counts, totals and run ids are in the Facts register.
const alsoFound = [
  {
    k: 'Refunded, then completed',
    p: '8 orders were refunded seconds after they were placed, usually because the customer changed their mind. The order system never heard and completed them anyway. That’s about $11,000 of orders.',
  },
  {
    k: 'Taken home, still on backorder',
    p: '90 store sales left with the customer, across 40 stores. The ERP’s stock records were wrong, so it still lists 166 of their lines on backorder. Those sales were never logged as revenue.',
  },
  {
    k: 'An exchange waiting on the past',
    p: 'A customer left a store with an exchanged piece. The ERP never took it out of stock. The exchange was stuck behind an order that hadn’t shipped in six weeks.',
  },
] as const

export function FromProduction() {
  // The picture moves from the two systems' screens to Darpan's first list
  // as the story sets them side by side, so it is in view while the reader
  // reaches the morning Darpan was switched on.
  const { turnRef, visualRef, settled } = useSettle<
    HTMLParagraphElement,
    HTMLDivElement
  >()
  return (
    <section
      className="vl-band"
      id="production"
      aria-labelledby="vl-production-heading"
    >
      <div className="vl-wrap">
        <div className="vl-split is-flip">
          <div className="vl-sec-head" data-reveal>
            <span className="vl-kicker">From production</span>
            <h2 className="vl-h2" id="vl-production-heading">
              The fraud screen worked. The order shipped anyway.
            </h2>
            <p className="vl-lede">
              At a footwear brand, a customer submitted an online request to
              exchange a pair of sneakers. The storefront&rsquo;s fraud screen
              flagged the request and cancelled it. That is exactly what a
              fraud screen is for.
            </p>
            <p className="vl-lede">
              But no one told the WMS about the cancellation. So the warehouse
              shipped the replacement anyway, to a customer the brand had just
              decided not to trust.
            </p>
            <p className="vl-lede" ref={turnRef}>
              The storefront showed a cancelled exchange. The WMS showed a
              finished shipment. Each was telling the truth.
            </p>
            <p className="vl-lede">
              When Darpan&rsquo;s audits were turned on, the brand found this
              order. Breaks like this usually surface when a customer calls to
              complain. This customer was never going to call. And this order
              wasn&rsquo;t the only one: the same thing had happened nine times.
            </p>
          </div>
          <div className="vl-split-visual" data-reveal>
            <ExchangeCollage settled={settled} visualRef={visualRef} />
          </div>
        </div>

        <p className="vl-gap-foot" data-reveal>
          From a brand that runs Darpan. Nine pairs came to about $1,000 of
          product. Across our brands, about one order in a hundred breaks
          between two systems.
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
