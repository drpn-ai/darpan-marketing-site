import { useEffect } from 'react'

// Scroll-reveal for a page under `.vl`. SSR-safe: the hiding rules are scoped
// to `.vl-animate`, a class added here on the client only, so the page renders
// fully visible without JS and for reduced-motion users. Elements with
// `data-reveal` get `is-in` once they scroll into view.
export function useReveal(): void {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const root = document.querySelector('.vl')
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    root.classList.add('vl-animate')
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            observer.unobserve(entry.target)
          }
        }
      },
      // The bottom 15% of the screen doesn't count, so a heading that only
      // peeks in at page load still fades in once the reader scrolls.
      { threshold: 0.16, rootMargin: '0px 0px -15% 0px' },
    )
    root.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
