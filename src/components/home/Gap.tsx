export function Gap() {
  return (
    <section className="vl-band" id="gap" aria-labelledby="vl-gap-heading">
      <div className="vl-wrap">
        <div className="vl-sec-head" data-reveal>
          <span className="vl-kicker">The gap</span>
          <h2 className="vl-h2" id="vl-gap-heading">
            Every sync says it worked. Nobody checks that it did.
          </h2>
          <p className="vl-lede">
            Integrations confirm the hand-off, not the result. An order can
            leave the storefront, log &ldquo;success&rdquo;, and never arrive.
            The first person to notice is usually the customer.
          </p>
        </div>

        <div className="vl-mv" data-reveal>
          <div className="vl-mv-cell verify">
            <span className="k">Day 1 &middot; with Darpan</span>
            <p>
              The order is on this morning&rsquo;s list. The warehouse knows
              why, and fixes it before lunch.
            </p>
          </div>
          <div className="vl-mv-cell move">
            <span className="k">Day 8 &middot; without</span>
            <p>
              The customer calls asking where it is. Support offers a discount.
              Someone starts digging through three systems.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
