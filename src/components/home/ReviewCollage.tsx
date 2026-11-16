// Beside "For finance, too": the close as a review, not a rescue. One calm
// frame (no before/after): a close checklist where every line is already
// explained, the close done before lunch, and a note that says home by six.
// Illustration; the facts it stands for are in the Facts register.
import { ListCard, at } from '@/components/home/Collage'

export function ReviewCollage() {
  return (
    <div
      className="vl-col"
      role="img"
      aria-label="A month-end close checklist where every line is already explained, the close done before lunch, and a note that says home by six."
    >
      <svg
        className="vl-col-light"
        viewBox="0 0 560 480"
        preserveAspectRatio="none"
        aria-hidden
      >
        <polygon points="380,0 440,0 180,480 120,480" />
      </svg>
      <ListCard
        style={at(24, 36, 370)}
        title="Month-end close · review"
        summary="4 of 4 explained"
        rows={[
          {
            text: 'Refunds and credit memos',
            meta: 'every break fixed the day it appeared',
            badge: 'explained',
            open: false,
          },
          {
            text: 'Store sales and backorders',
            meta: 'fixed at the source',
            badge: 'explained',
            open: false,
          },
          {
            text: 'Exchanges in the ERP',
            meta: 'nothing open',
            badge: 'explained',
            open: false,
          },
          {
            text: 'Numbers for the board',
            meta: 'ready to send',
            badge: 'explained',
            open: false,
          },
        ]}
      />
      <div className="vl-col-item vl-col-chip is-day" style={at(24, 414)}>
        Close day 1 · done by 11:40 AM
      </div>
      <div
        className="vl-col-item vl-col-note is-calm"
        style={at(404, 318, 140, 3)}
      >
        home by six
      </div>
    </div>
  )
}
