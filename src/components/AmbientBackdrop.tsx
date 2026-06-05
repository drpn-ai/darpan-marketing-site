import { NotebookDoodle } from '@/components/NotebookDoodle'

/**
 * A fixed, very faint layer of large pencil doodles that drift slowly behind
 * all content — so the paper itself feels alive, not just the elements on it.
 *
 * Purely decorative: sits below content (z-index -1 inside the .site-shell
 * stacking context), ignores pointer events, and is hidden from assistive tech.
 * These doodles render pre-drawn (no ink-in stroke animation) and loop gentle,
 * desynchronized drift/rotate animations. All motion is killed under
 * prefers-reduced-motion (see styles.css).
 */
export function AmbientBackdrop() {
  return (
    <div className="ambient-backdrop" aria-hidden>
      <NotebookDoodle kind="circle-emphasis" className="bg-doodle bg-doodle-1" />
      <NotebookDoodle kind="match-arrow" className="bg-doodle bg-doodle-2" />
      <NotebookDoodle kind="tally" className="bg-doodle bg-doodle-3" />
      <NotebookDoodle kind="star" className="bg-doodle bg-doodle-4" />
      <NotebookDoodle kind="underline-squiggle" className="bg-doodle bg-doodle-5" />
      <NotebookDoodle kind="note-bracket" className="bg-doodle bg-doodle-6" />
    </div>
  )
}
