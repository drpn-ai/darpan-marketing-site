import { ReviewCollage } from '@/components/home/ReviewCollage'

export function FinanceBand() {
  return (
    <section className="vl-band" aria-labelledby="vl-finance-heading">
      <div className="vl-wrap vl-split">
        <div className="vl-sec-head" data-reveal>
          <span className="vl-kicker">For finance, too</span>
          <h2 className="vl-h2" id="vl-finance-heading">
            The close becomes a review, not a rescue.
          </h2>
          <p className="vl-lede">
            Each break is found the morning after it happens and fixed while its
            cause is fresh, so by month-end finance is reviewing work already
            done. The numbers that reach the board have been explained, line by
            line, weeks before anyone asks.
          </p>
        </div>
        <div className="vl-split-visual" data-reveal>
          <ReviewCollage />
        </div>
      </div>
    </section>
  )
}
