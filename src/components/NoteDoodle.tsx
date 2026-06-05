import { type CSSProperties } from 'react'

/**
 * Pencil doodles for note post-its. One per writing category, drawn in the same
 * wobbly hand-drawn stroke style as NotebookDoodle but sized + colored for the
 * face of a sticky note (graphite "pencil" rather than the rust margin accent).
 */
export type NoteDoodleKind =
  | 'book' // Guides — an open book
  | 'spark' // AI — a sparkle
  | 'grid' // Spreadsheets — a little table grid
  | 'checklist' // Methods — ticked steps
  | 'bulb' // Concepts — a lightbulb
  | 'gear' // Engineering notes — a cog
  | 'chart' // Operations — a trend line

const CATEGORY_DOODLE: Record<string, NoteDoodleKind> = {
  Guides: 'book',
  AI: 'spark',
  Spreadsheets: 'grid',
  Methods: 'checklist',
  Concepts: 'bulb',
  'Engineering notes': 'gear',
  Operations: 'chart',
}

/** Map a writing category to its doodle, falling back to a book. */
export function doodleForCategory(category: string): NoteDoodleKind {
  return CATEGORY_DOODLE[category] ?? 'book'
}

/**
 * Pillar tints — one soft sticky-note paper per content pillar, each a light
 * tint of a Darpan brand color so the wall color-codes by category while
 * staying on-brand and legible under the dark ink.
 *   maroon  #5A1E2A → rose        (Guides)
 *   rust    #9E4738 → terracotta  (AI)
 *   sage    #DDE0D7 → sage         (Spreadsheets)
 *   taupe   #6B5648 → sand         (Methods, Engineering notes)
 *   + warm cream / slate accents derived from the same family
 */
type Pillar = {
  /** sticky-note paper color */
  tint: string
  /** the brand color it derives from — used for the pillar tab/legend */
  brand: string
}

const PILLAR: Record<string, Pillar> = {
  Guides: { tint: '#EBD1CE', brand: 'var(--color-primary)' },
  AI: { tint: '#F1D8C5', brand: 'var(--color-accent)' },
  Spreadsheets: { tint: '#DCE6D0', brand: '#7C8A6A' },
  Methods: { tint: '#E8DDCC', brand: 'var(--color-secondary)' },
  Concepts: { tint: '#F2E7C0', brand: '#B98A3C' },
  'Engineering notes': { tint: '#D4DEDA', brand: '#516B66' },
  Operations: { tint: '#F1DBC6', brand: '#B5663F' },
}

const FALLBACK_PILLAR: Pillar = {
  tint: '#EFE6CF',
  brand: 'var(--color-secondary)',
}

/** Sticky-note paper tint for a content pillar (category). */
export function tintForCategory(category: string): string {
  return (PILLAR[category] ?? FALLBACK_PILLAR).tint
}

/** Brand color the pillar derives from — for the colored tab/legend. */
export function brandForCategory(category: string): string {
  return (PILLAR[category] ?? FALLBACK_PILLAR).brand
}

type Props = {
  kind: NoteDoodleKind
  className?: string
  style?: CSSProperties
  /** delay in ms before the draw-in animation starts (default 0) */
  delay?: number
  /** pencil ink color */
  color?: string
}

const PENCIL = '#4a433b'

export function NoteDoodle({
  kind,
  className,
  style,
  delay = 0,
  color = PENCIL,
}: Props) {
  const animationStyle: CSSProperties = { ...style, animationDelay: `${delay}ms` }
  const sw = 1.7

  const svgProps = {
    className: `note-doodle ${className ?? ''}`,
    style: animationStyle,
    fill: 'none' as const,
    stroke: color,
    strokeWidth: sw,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }

  switch (kind) {
    case 'book':
      return (
        <svg {...svgProps} viewBox="0 0 80 64">
          <path d="M 40,14 C 30,8 16,8 8,12 L 8,52 C 16,48 30,48 40,54" className="doodle-path" />
          <path d="M 40,14 C 50,8 64,8 72,12 L 72,52 C 64,48 50,48 40,54" className="doodle-path" />
          <path d="M 40,14 L 40,54" className="doodle-path" />
          <path d="M 15,22 C 22,20 30,21 35,24" className="doodle-path" />
          <path d="M 15,32 C 22,30 30,31 35,34" className="doodle-path" />
          <path d="M 45,24 C 50,21 58,20 65,22" className="doodle-path" />
          <path d="M 45,34 C 50,31 58,30 65,32" className="doodle-path" />
        </svg>
      )

    case 'spark':
      return (
        <svg {...svgProps} viewBox="0 0 72 72">
          <path
            d="M 36,8 C 38,24 42,30 60,36 C 42,42 38,48 36,64 C 34,48 30,42 12,36 C 30,30 34,24 36,8 Z"
            className="doodle-path"
          />
          <path d="M 58,10 C 59,16 60,18 66,20 C 60,22 59,24 58,30 C 57,24 56,22 50,20 C 56,18 57,16 58,10 Z" className="doodle-path" />
        </svg>
      )

    case 'grid':
      return (
        <svg {...svgProps} viewBox="0 0 78 64">
          <path d="M 9,10 L 69,9 L 70,54 L 8,55 Z" className="doodle-path" />
          <path d="M 9,25 C 29,24 49,24 69,24" className="doodle-path" />
          <path d="M 9,39 C 29,38 49,38 69,39" className="doodle-path" />
          <path d="M 29,10 L 29,54" className="doodle-path" />
          <path d="M 49,9 L 50,54" className="doodle-path" />
        </svg>
      )

    case 'checklist':
      return (
        <svg {...svgProps} viewBox="0 0 78 64">
          <path d="M 10,14 L 16,20 L 26,8" className="doodle-path" />
          <path d="M 38,15 C 50,14 62,14 70,15" className="doodle-path" />
          <path d="M 10,33 L 16,39 L 26,27" className="doodle-path" />
          <path d="M 38,34 C 50,33 62,33 70,34" className="doodle-path" />
          <path d="M 10,52 L 16,58 L 26,46" className="doodle-path" />
          <path d="M 38,53 C 50,52 62,52 70,53" className="doodle-path" />
        </svg>
      )

    case 'bulb':
      return (
        <svg {...svgProps} viewBox="0 0 60 72">
          <path
            d="M 30,8 C 17,8 9,18 11,30 C 12,38 18,42 21,50 L 39,50 C 42,42 48,38 49,30 C 51,18 43,8 30,8 Z"
            className="doodle-path"
          />
          <path d="M 22,56 C 27,58 33,58 38,56" className="doodle-path" />
          <path d="M 24,62 C 28,64 32,64 36,62" className="doodle-path" />
          <path d="M 25,28 C 25,22 28,19 33,19" className="doodle-path" />
        </svg>
      )

    case 'gear':
      return (
        <svg {...svgProps} viewBox="0 0 72 72">
          <path
            d="M 36,16 L 40,16 L 42,24 L 48,27 L 55,23 L 58,26 L 54,33 L 56,39 L 64,41 L 64,45 L 56,47 L 53,53 L 57,60 L 54,63 L 47,59 L 41,61 L 39,69 L 35,69 L 33,61 L 27,58 L 20,62 L 17,59 L 21,52 L 19,46 L 11,44 L 11,40 L 19,38 L 22,32 L 18,25 L 21,22 L 28,26 L 34,24 Z"
            className="doodle-path"
          />
          <circle cx="38" cy="42" r="9" className="doodle-path" />
        </svg>
      )

    case 'chart':
      return (
        <svg {...svgProps} viewBox="0 0 80 64">
          <path d="M 12,8 L 12,54 L 70,54" className="doodle-path" />
          <path d="M 18,44 C 28,40 32,30 40,30 C 48,30 52,20 64,12" className="doodle-path" />
          <path d="M 56,12 L 65,11 L 64,20" className="doodle-path" />
        </svg>
      )
  }
}
