// Three short facts under a page opening's buttons: a large green word or
// number, then a one-line gloss. Fills the opening so every split hero is as
// tall as the Agent page's. Each fact is in the Facts register.
export function HeroFacts({
  items,
  label,
}: {
  items: readonly { k: string; p: string }[]
  label: string
}) {
  return (
    <ul className="vl-hero-facts" aria-label={label}>
      {items.map((item) => (
        <li key={item.k}>
          <span className="k">{item.k}</span>
          <span className="p">{item.p}</span>
        </li>
      ))}
    </ul>
  )
}
