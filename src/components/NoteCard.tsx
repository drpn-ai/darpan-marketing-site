import type { CSSProperties } from 'react'
import type { WritingEntry } from '@/data/writing-entries'
import {
  NoteDoodle,
  doodleForCategory,
  tintForCategory,
  brandForCategory,
} from '@/components/NoteDoodle'

type Props = {
  entry: WritingEntry
  /** position in the board — drives the scatter tilt + offset */
  index: number
  /** delay in ms before the doodle draws in */
  delay?: number
}

/**
 * A single writing entry rendered as a sticky note: paper tinted by its content
 * pillar (a Darpan brand color), scattered with a slight tilt, a lifted-corner
 * shadow, a category-relevant pencil doodle, and the article title in the
 * handwriting display face. The whole note is the link.
 */
export function NoteCard({ entry, index, delay = 0 }: Props) {
  // Tint is keyed to the pillar so notes color-code by category. Tilt is keyed
  // to position so adjacent notes lean different ways (the scatter).
  const tilt = (index % 6) + 1
  const scatter = (index % 4) + 1

  const style = {
    '--note-tint': tintForCategory(entry.category),
    '--note-brand': brandForCategory(entry.category),
  } as CSSProperties

  return (
    <li
      className="note-postit"
      data-tilt={tilt}
      data-scatter={scatter}
      data-pillar={entry.category}
      style={style}
    >
      <a className="note-postit-link" href={`/notes/${entry.slug}`}>
        <span className="note-pillar-tab" aria-hidden />
        <span className="note-doodle-slot" aria-hidden>
          <NoteDoodle kind={doodleForCategory(entry.category)} delay={delay} />
        </span>
        <h3 className="note-title">{entry.title}</h3>
        <span className="note-meta label-smallcaps">
          {entry.date}
          <span aria-hidden> · </span>
          {entry.category}
        </span>
      </a>
    </li>
  )
}
