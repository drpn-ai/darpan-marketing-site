import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { List, X } from '@phosphor-icons/react'
import { navItems } from '@/routes/index'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  // Focus management + escape + tab trap
  useEffect(() => {
    if (!open) {
      // Return focus on close — only if the active element is inside the menu
      // (avoids stealing focus from a post-navigation target when a link was clicked)
      const activeInsideMenu = dialogRef.current?.contains(document.activeElement)
      if (activeInsideMenu) {
        triggerRef.current?.focus()
      }
      return
    }

    // Focus first focusable element on open
    const dialog = dialogRef.current
    if (!dialog) return
    const focusables = dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    focusables[0]?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
      if (e.key !== 'Tab') return
      const list = dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      if (list.length === 0) return
      const first = list[0]
      const last = list[list.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="mobile-menu-trigger"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X size={22} weight="regular" aria-hidden /> : <List size={22} weight="regular" aria-hidden />}
      </button>

      {open
        ? createPortal(
            // Portal the dialog to document.body so the header's `backdrop-filter`
            // doesn't trap our `position: fixed` inset inside the 72px-tall header
            // (per CSS spec, backdrop-filter establishes a containing block for
            // fixed-positioned descendants — that collapses this dialog to 0 height).
            <div
              ref={dialogRef}
              id="mobile-menu"
              className="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
            >
              <nav className="mobile-menu-nav" aria-label="Sections">
                {navItems.map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    className="mobile-menu-link"
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </a>
                ))}
                <a
                  href="#talk"
                  className="mobile-menu-cta"
                  onClick={() => setOpen(false)}
                >
                  Request a walkthrough
                </a>
              </nav>
            </div>,
            document.body
          )
        : null}
    </>
  )
}
