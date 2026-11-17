// Who wrote a note: Aditi's writing portrait (her own pencil drawing,
// cropped to her face and the hand at her chin; the paper behind her is
// tinted warm grey so the white hand keeps its shape at byline size), her
// name, and the date.
export function Byline({ date, small }: { date?: string; small?: boolean }) {
  return (
    <span className={`vl-byline${small ? ' is-small' : ''}`}>
      <img
        src="/team/aditi-patel-writing-face.webp"
        alt=""
        width={240}
        height={240}
        loading="lazy"
      />
      <span>
        <span className="vl-byline-name">Aditi Patel</span>
        <span className="vl-byline-meta">
          Founder, Darpan{date ? ` · ${date}` : ''}
        </span>
      </span>
    </span>
  )
}
