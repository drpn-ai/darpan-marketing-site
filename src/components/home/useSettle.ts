import { useEffect, useRef, useState } from 'react'

// A story band's picture starts in the "before" state and settles into the
// "after" state when the story turns. On desktop the picture is sticky beside
// the text, so it settles when the turning paragraph scrolls past the middle
// of the screen, where the reader's eye is (a story that fits on one screen
// still starts in "before"); on
// phones the picture sits under the text, so it settles a moment after the
// picture itself is seen. Once settled it stays settled.
export function useSettle<T extends HTMLElement, V extends HTMLElement>() {
  const turnRef = useRef<T>(null)
  const visualRef = useRef<V>(null)
  const [settled, setSettled] = useState(false)

  useEffect(() => {
    const turn = turnRef.current
    const visual = visualRef.current
    if (!turn || !visual || typeof IntersectionObserver === 'undefined') return
    const stacked = window.matchMedia('(max-width: 900px)')
    let timer: number | undefined
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          if (entry.target === turn && !stacked.matches) setSettled(true)
          if (
            entry.target === visual &&
            stacked.matches &&
            timer === undefined
          ) {
            timer = window.setTimeout(() => setSettled(true), 1800)
          }
        }
      },
      { threshold: 0, rootMargin: '0px 0px -50% 0px' },
    )
    observer.observe(turn)
    observer.observe(visual)
    return () => {
      observer.disconnect()
      if (timer !== undefined) window.clearTimeout(timer)
    }
  }, [])

  return { turnRef, visualRef, settled }
}
