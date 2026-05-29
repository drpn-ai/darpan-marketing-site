import { type CSSProperties } from 'react'

export type DoodleKind =
  | 'match-arrow'      // Curved arrow connecting two dots — "match" annotation
  | 'variance-delta'   // Hand-drawn Δ with a circle around it
  | 'checkmark'        // Tick mark, slightly wobbly
  | 'primary-key-dot'  // A dot with rays around it (a "key" marker)
  | 'evidence-arrow'   // Down arrow with "evidence" written next to it
  | 'tally'            // Four hash marks with a diagonal slash — a tally count
  | 'circle-emphasis'  // Loose circle drawn around something
  | 'underline-squiggle' // Wavy underline doodle

type Props = {
  kind: DoodleKind
  className?: string
  style?: CSSProperties
  /** delay in ms before the draw-in animation starts (default 0) */
  delay?: number
  /** stroke color, default the rust accent token */
  color?: string
}

export function NotebookDoodle({ kind, className, style, delay = 0, color = 'var(--color-accent)' }: Props) {
  const animationStyle: CSSProperties = {
    ...style,
    animationDelay: `${delay}ms`,
  }

  // Each doodle is a 1.5px stroke, slightly wobbly path. stroke-dasharray + dashoffset
  // animation gives the "drawing" effect. fill=none on paths, fill=currentColor on labels.

  const sw = 1.6 // stroke width

  switch (kind) {
    case 'match-arrow':
      return (
        <svg
          className={`doodle doodle-match-arrow ${className ?? ''}`}
          style={animationStyle}
          viewBox="0 0 120 80"
          fill="none"
          stroke={color}
          strokeWidth={sw}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <circle cx="10" cy="20" r="3" fill={color} />
          <circle cx="110" cy="60" r="3" fill={color} />
          <path d="M 14,22 C 40,18 60,55 106,58" className="doodle-path" />
          <path d="M 102,52 L 108,58 L 100,62" className="doodle-path" />
          <text x="55" y="38" fontFamily="Caveat, cursive" fontSize="14" fill={color} stroke="none">
            match
          </text>
        </svg>
      )

    case 'variance-delta':
      return (
        <svg
          className={`doodle doodle-variance-delta ${className ?? ''}`}
          style={animationStyle}
          viewBox="0 0 80 80"
          fill="none"
          stroke={color}
          strokeWidth={sw}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <circle cx="40" cy="40" r="24" className="doodle-path" />
          <path d="M 26,52 L 40,24 L 54,52 Z" className="doodle-path" />
        </svg>
      )

    case 'checkmark':
      return (
        <svg
          className={`doodle doodle-checkmark ${className ?? ''}`}
          style={animationStyle}
          viewBox="0 0 40 40"
          fill="none"
          stroke={color}
          strokeWidth={sw + 0.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M 8,22 L 17,32 L 34,10" className="doodle-path" />
        </svg>
      )

    case 'primary-key-dot':
      return (
        <svg
          className={`doodle doodle-key-dot ${className ?? ''}`}
          style={animationStyle}
          viewBox="0 0 60 60"
          fill="none"
          stroke={color}
          strokeWidth={sw}
          strokeLinecap="round"
          aria-hidden
        >
          <circle cx="30" cy="30" r="4" fill={color} />
          <line x1="30" y1="12" x2="30" y2="6" className="doodle-path" />
          <line x1="30" y1="48" x2="30" y2="54" className="doodle-path" />
          <line x1="12" y1="30" x2="6" y2="30" className="doodle-path" />
          <line x1="48" y1="30" x2="54" y2="30" className="doodle-path" />
          <line x1="16" y1="16" x2="11" y2="11" className="doodle-path" />
          <line x1="44" y1="16" x2="49" y2="11" className="doodle-path" />
          <line x1="16" y1="44" x2="11" y2="49" className="doodle-path" />
          <line x1="44" y1="44" x2="49" y2="49" className="doodle-path" />
        </svg>
      )

    case 'evidence-arrow':
      return (
        <svg
          className={`doodle doodle-evidence-arrow ${className ?? ''}`}
          style={animationStyle}
          viewBox="0 0 100 60"
          fill="none"
          stroke={color}
          strokeWidth={sw}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <text x="6" y="22" fontFamily="Caveat, cursive" fontSize="18" fill={color} stroke="none">
            evidence
          </text>
          <path d="M 78,12 C 82,24 82,38 78,52" className="doodle-path" />
          <path d="M 72,46 L 78,54 L 84,46" className="doodle-path" />
        </svg>
      )

    case 'tally':
      return (
        <svg
          className={`doodle doodle-tally ${className ?? ''}`}
          style={animationStyle}
          viewBox="0 0 80 60"
          fill="none"
          stroke={color}
          strokeWidth={sw + 0.2}
          strokeLinecap="round"
          aria-hidden
        >
          <line x1="10" y1="14" x2="12" y2="46" className="doodle-path" />
          <line x1="22" y1="14" x2="24" y2="46" className="doodle-path" />
          <line x1="34" y1="14" x2="36" y2="46" className="doodle-path" />
          <line x1="46" y1="14" x2="48" y2="46" className="doodle-path" />
          <line x1="6" y1="40" x2="52" y2="20" className="doodle-path" />
        </svg>
      )

    case 'circle-emphasis':
      return (
        <svg
          className={`doodle doodle-circle ${className ?? ''}`}
          style={animationStyle}
          viewBox="0 0 200 80"
          fill="none"
          stroke={color}
          strokeWidth={sw}
          strokeLinecap="round"
          aria-hidden
        >
          <path
            d="M 12,40 C 20,12 80,8 140,12 C 180,16 196,32 192,48 C 188,64 144,72 84,68 C 36,64 8,52 14,40 Z"
            className="doodle-path"
          />
        </svg>
      )

    case 'underline-squiggle':
      return (
        <svg
          className={`doodle doodle-underline ${className ?? ''}`}
          style={animationStyle}
          viewBox="0 0 240 16"
          fill="none"
          stroke={color}
          strokeWidth={sw + 0.2}
          strokeLinecap="round"
          aria-hidden
        >
          <path
            d="M 4,10 Q 22,4 44,8 T 88,8 Q 110,12 132,7 T 176,7 Q 198,12 220,6 T 236,9"
            className="doodle-path"
          />
        </svg>
      )
  }
}
