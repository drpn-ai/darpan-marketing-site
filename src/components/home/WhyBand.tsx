// Why Darpan exists, short: the turn and the payoff in Aditi's words
// (2026-11-16); the full story lives on /about. Every claim is in the Facts
// register.
import { NightsCollage } from '@/components/home/NightsCollage'
import { useSettle } from '@/components/home/useSettle'

export function WhyBand() {
  // The picture settles from the three nights into the morning list when the
  // story turns to the next morning.
  const { turnRef, visualRef, settled } = useSettle<
    HTMLParagraphElement,
    HTMLDivElement
  >()
  return (
    <section className="vl-band" aria-labelledby="vl-why-heading">
      <div className="vl-wrap vl-split">
        <div className="vl-sec-head" data-reveal>
          <span className="vl-kicker">Why we built it</span>
          <h2 className="vl-h2" id="vl-why-heading">
            None of it was a month-end problem.
          </h2>
          <p className="vl-lede">
            I once spent three nights on a single month-end close, chasing
            breaks that had started weeks earlier on ordinary days. Even then,
            we wrote off $40,000 we couldn’t trace.
          </p>
          <p className="vl-lede" ref={turnRef}>
            Caught early, each break would have been small and fixed for good.
            That&rsquo;s why Darpan treats every day like a close day. The next
            close took a few hours, not three nights.
          </p>
          <a className="vl-textlink vl-why-more" href="/about">
            Read more about why we built it <span aria-hidden>&rarr;</span>
          </a>
        </div>
        <div className="vl-split-visual" data-reveal>
          <NightsCollage settled={settled} visualRef={visualRef} />
        </div>
      </div>
    </section>
  )
}
