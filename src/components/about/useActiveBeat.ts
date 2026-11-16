import { useEffect, useRef, useState } from 'react'

// Which timeline beat is at the middle of the screen, scrolling either way.
// Each beat registers with `beatRef(i)`; the one crossing the centre line
// becomes active, and the last one stays active in the gaps between beats.
export function useActiveBeat(count: number) {
  const nodes = useRef<(HTMLElement | null)[]>([])
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const i = nodes.current.indexOf(entry.target as HTMLElement)
          if (i >= 0) setActive(i)
        }
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
    )
    nodes.current.slice(0, count).forEach((n) => n && observer.observe(n))
    return () => observer.disconnect()
  }, [count])

  const beatRef = (i: number) => (el: HTMLElement | null) => {
    nodes.current[i] = el
  }
  return { active, beatRef }
}
