// Why Darpan exists, in Aditi's words (2026-11-16), written with the
// darpan-copy skill. No company names; every claim is in the Facts register.
import { MonthCompare } from '@/components/home/MonthCompare'

export function WhyBand() {
  return (
    <section className="vl-band" aria-labelledby="vl-why-heading">
      <div className="vl-wrap vl-split">
        <div className="vl-sec-head" data-reveal>
          <span className="vl-kicker">Why we built it</span>
          <h2 className="vl-h2" id="vl-why-heading">
            None of it was a month-end problem.
          </h2>
          <p className="vl-lede">
            I once spent three nights in a row on a single month-end close with
            an integration team and a retail tech ops lead. We chased refunds
            that had no credit memo and orders stuck on backorder until the
            numbers the board would see lined up. Even then, we wrote off
            $40,000 we couldn’t trace.
          </p>
          <p className="vl-lede">
            Any one of those breaks could be patched by hand in an evening. The
            permanent cure meant a code change and a deploy, and even that
            couldn’t repair a month already on the books. So we patched,
            promised to come back, and once the pressure lifted, nobody did. The
            same breaks were waiting the next month.
          </p>
          <p className="vl-lede">
            Looking back, none of them belonged to month-end. Every break had
            started on an ordinary day and sat unnoticed for weeks. Caught the
            next morning, each one would have been small, fresh enough to trace
            to its cause, and cheap enough to fix for good.
          </p>
          <p className="vl-lede">
            Darpan treats every morning as a close day. In its first month with
            the team where it began, it turned up 23 bugs that were then fixed
            in code, and the next close took a few hours, not three nights.
          </p>
        </div>
        <div className="vl-split-visual" data-reveal>
          <MonthCompare />
        </div>
      </div>
    </section>
  )
}
