# Darpan Marketing Site — Top-10 Audit Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **TDD adaptation:** This project has no test infrastructure (no vitest config, no test files). 8 of 11 tasks are visual CSS/JSX changes where TDD doesn't fit. Instead of "write failing test → make it pass," tasks use **grep verification** (the offending pattern is gone) and **browser verification** (the section renders correctly at the target breakpoint). Task 1 (mobile nav) does have one interactive-behavior step that could be unit-tested, but adding vitest is itself out of scope here and is called out as a follow-up.

**Goal:** Apply the top 10 findings from the parallel `redesign-existing-projects` + `impeccable critique` audit to the marketing homepage, in place, without changing the existing palette or fonts.

**Architecture:** All work happens inside `darpan-marketing-site/`. No new dependencies. New routes only if they replace `mailto:` placeholders. One new component (`MobileMenu`). Edits otherwise concentrate in `src/routes/index.tsx` (544 lines) and `src/styles.css`.

**Tech Stack:** TanStack Start, React 19, Vite 7, Tailwind v4 (with custom CSS variables), Phosphor icons. Deploy target: Netlify.

**Ground truth constraints (do not violate):**
- Palette is locked to current `styles.css` `:root` block — deep maroon `#5A1E2A`, rust `#9E4738`, warm grey `#F0F2EE`, near-black `#2A1F1A`. Do not introduce Grove green or Slate ink.
- Fonts locked: DM Serif Display + Plus Jakarta Sans.
- Single homepage; don't expand IA unless a task explicitly creates a route.

**Personality device decision (applied in Task 4):** Keep **only the section-label asterisk** as the recurring rhythm device. Remove squiggle, hero/pain/CTA sparkles, three of four `.text-script` highlights (keep hero only), and persona-card asterisk. This is the recommended call from the audit synthesis; the user can swap which one stays before Task 4 starts.

---

## Verification rhythm (used by every task)

After each task, run this two-part check before committing:

1. **Static check** — `npm run build` from `darpan-marketing-site/` must succeed with no new TypeScript errors. (If the task only touches CSS, skip the build and run `npx tsc --noEmit` instead.)
2. **Visual check** — `npm run dev` from `darpan-marketing-site/`, open `http://localhost:3000/`, verify the changed section at three viewport widths: **375px** (mobile), **768px** (tablet), **1280px** (desktop). Confirm the specific outcome listed at the end of the task.

Commit per task with the message format `chore(marketing): <task title>` — granular history makes any task easy to revert.

---

## Task 1: Mobile navigation

**Findings addressed:** [impeccable P0] nav disappears at 560px with no fallback (`styles.css:989-993`).

**Files:**
- Create: `darpan-marketing-site/src/components/MobileMenu.tsx`
- Modify: `darpan-marketing-site/src/routes/index.tsx` (SiteHeader, lines 108-128; also add a navItems export)
- Modify: `darpan-marketing-site/src/styles.css` (navigation rules around lines 344-400 and the existing `@media (max-width: 560px)` rule near line 989)

- [ ] **Step 1 — Extract `navItems` so it's shared**

  In `src/routes/index.tsx`, the `navItems` const at lines 15-19 is currently scoped to the same file. Leave it where it is (since `MobileMenu` is imported into the same file, not a sibling) but add an `export` keyword:

  ```ts
  export const navItems = [
    ['How it works', '#how-it-works'],
    ['Who it’s for', '#who-its-for'],
    ['Insights', '#insights'],
  ] as const
  ```

- [ ] **Step 2 — Create the MobileMenu component**

  Create `src/components/MobileMenu.tsx`:

  ```tsx
  import { useEffect, useState } from 'react'
  import { List, X } from '@phosphor-icons/react'
  import { navItems } from '@/routes/index'

  export function MobileMenu() {
    const [open, setOpen] = useState(false)

    // Close on route-anchor click + lock body scroll while open
    useEffect(() => {
      if (!open) return
      const prevOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prevOverflow
      }
    }, [open])

    // Close on escape
    useEffect(() => {
      if (!open) return
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false)
      }
      window.addEventListener('keydown', onKey)
      return () => window.removeEventListener('keydown', onKey)
    }, [open])

    return (
      <>
        <button
          type="button"
          className="mobile-menu-trigger"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} weight="regular" aria-hidden /> : <List size={22} weight="regular" aria-hidden />}
        </button>

        {open ? (
          <div id="mobile-menu" className="mobile-menu" role="dialog" aria-modal="true" aria-label="Site navigation">
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
          </div>
        ) : null}
      </>
    )
  }
  ```

  Note the import `from '@/routes/index'`. The project's `tsconfig.json` already supports `@/*` aliasing via `vite-tsconfig-paths`. If the import fails, verify `tsconfig.json` paths and `vite.config.ts` plugin order before changing the import shape.

- [ ] **Step 3 — Wire MobileMenu into SiteHeader**

  In `src/routes/index.tsx`, replace lines 108-128 with:

  ```tsx
  import { MobileMenu } from '@/components/MobileMenu'

  function SiteHeader() {
    return (
      <header className="site-header" aria-label="Darpan marketing navigation">
        <div className="container site-header-inner">
          <a className="brand-link" href="/" aria-label="Darpan home">
            Darpan
          </a>
          <nav className="site-nav" aria-label="Sections">
            {navItems.map(([label, href]) => (
              <a className="nav-link" href={href} key={label}>
                {label}
              </a>
            ))}
          </nav>
          <a className="btn btn-primary site-header-cta" href="#talk">
            Request a walkthrough
          </a>
          <MobileMenu />
        </div>
      </header>
    )
  }
  ```

  The `MobileMenu` is rendered alongside the desktop CTA; CSS will toggle which is visible at the 560px breakpoint.

- [ ] **Step 4 — Add CSS for the mobile menu and breakpoint behavior**

  In `src/styles.css`, add a new block (place it near the existing `.site-nav` rules, ~line 400; the existing `@media (max-width: 560px) { .site-nav { display: none; } }` block stays):

  ```css
  /* Mobile menu trigger — hidden by default, shown below 560px */
  .mobile-menu-trigger {
    display: none;
    width: 44px;
    height: 44px;
    align-items: center;
    justify-content: center;
    color: var(--color-text);
    border-radius: var(--radius-sm);
  }

  .mobile-menu-trigger:hover {
    background: rgba(42, 31, 26, 0.04);
  }

  .mobile-menu {
    position: fixed;
    inset: 72px 0 0 0;
    background: var(--color-background);
    z-index: 49;
    overflow-y: auto;
  }

  .mobile-menu-nav {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 32px var(--gutter-mobile);
  }

  .mobile-menu-link,
  .mobile-menu-cta {
    font-family: var(--font-body);
    font-size: 22px;
    font-weight: 500;
    color: var(--color-text);
    padding: 16px 0;
    border-bottom: 1px solid var(--color-border);
  }

  .mobile-menu-cta {
    margin-top: 24px;
    color: var(--color-background);
    background: var(--color-primary);
    border: 0;
    border-radius: var(--radius-sm);
    text-align: center;
    padding: 16px 24px;
  }

  @media (max-width: 560px) {
    .mobile-menu-trigger { display: inline-flex; }
    .site-header-cta { display: none; }
    /* The existing rule `.site-nav { display: none; }` already lives near line 989 — keep it. */
  }
  ```

- [ ] **Step 5 — Verify**

  ```bash
  cd darpan-marketing-site
  npm run build
  ```
  Expected: build succeeds.

  Then:
  ```bash
  npm run dev
  ```
  Open `http://localhost:3000/` at 375px width. Confirm: hamburger icon visible top-right, tapping it opens a full-screen menu over the page, links scroll to anchors and close the menu, Escape closes it, body scroll is locked while open. At 768px and 1280px the hamburger is hidden and the desktop nav+CTA show.

- [ ] **Step 6 — Commit**

  ```bash
  git add darpan-marketing-site/src/components/MobileMenu.tsx \
          darpan-marketing-site/src/routes/index.tsx \
          darpan-marketing-site/src/styles.css
  git commit -m "chore(marketing): add mobile navigation with hamburger toggle"
  ```

---

## Task 2: Contrast fixes (WCAG AA)

**Findings addressed:** [impeccable P0/P0/P1] body text on cream sections ~4.2:1, CTA subnote on maroon <4.5:1, footer bottom-bar ~2.4:1.

**Files:**
- Modify: `darpan-marketing-site/src/styles.css` (three rule blocks)

- [ ] **Step 1 — Body text on cream sections**

  The issue: `--color-text-muted: #5E5E54` (line 13) on `--color-section-alt: #DDE0D7` (line 11) is borderline. The `.pain-copy p` and `.persona-card p` selectors use the muted token via inheritance from token scoping. Quickest fix: scope an explicit text color inside `.section-cream`.

  In `src/styles.css`, add immediately after the existing `.section-cream` rule (line 188):

  ```css
  .section-cream {
    background: var(--color-section-alt);
    color: var(--color-text);
  }

  .section-cream p,
  .section-cream li,
  .section-cream .pain-copy p,
  .section-cream .persona-card p {
    color: var(--color-text);
  }
  ```

  The existing `.section-cream` rule already sets `color: var(--color-text)`; the per-element overrides defend against descendant rules that override to muted.

- [ ] **Step 2 — CTA subnote contrast**

  In `src/styles.css`, the `.final-cta-note` and `.ps-note` rules (search for `.final-cta-note` and `.ps-note`) use low alpha. Change:

  ```css
  /* before */
  .ps-note {
    /* ... */
    color: rgba(240, 242, 238, 0.62);
    /* ... */
  }
  ```

  to:

  ```css
  .ps-note {
    /* ... */
    color: var(--color-on-dark-body);  /* 0.82 alpha */
    /* ... */
  }
  ```

  Note: `.ps-note` itself will be deleted entirely in Task 7. This step is here so contrast is correct in the interim and so the pattern is documented for any future "subnote on dark" use.

  For `.final-cta-note` (search line ~840-850 in styles.css), change the color value to `var(--color-on-dark-body)`.

- [ ] **Step 3 — Footer bottom-bar**

  Find the `.footer-bottom` rule and any descendant `.footer-bottom span`, `.footer-bottom a` rules in `src/styles.css` (around lines 905-928). Change any `color: var(--color-text-muted)` references inside `.footer-bottom` to `color: var(--color-footer-link)` (which is `#8C8E84`, a brighter near-grey already in the token set).

  Example diff target:

  ```css
  .footer-bottom {
    /* ... existing ... */
    color: var(--color-footer-link);  /* was var(--color-text-muted) */
  }

  .footer-bottom a {
    color: var(--color-footer-link);
  }
  ```

- [ ] **Step 4 — Verify**

  Run a quick grep to confirm no `--color-text-muted` references remain inside dark backgrounds:

  ```bash
  cd darpan-marketing-site
  grep -n "color-text-muted" src/styles.css
  ```

  Expected: any remaining uses should be on light backgrounds only (e.g., `.cta-note` at line 341 is on the light hero — fine).

  Then `npm run dev` and visually confirm: pain section body copy and persona body copy read at full near-black contrast on cream; footer bottom-bar copyright reads as light-grey on near-black, not invisible-grey.

  Optional: paste a small DevTools snippet to programmatically check contrast:
  ```js
  const el = document.querySelector('.footer-bottom span')
  const cs = getComputedStyle(el)
  console.log(cs.color, cs.backgroundColor) // confirm parent bg
  ```

- [ ] **Step 5 — Commit**

  ```bash
  git add darpan-marketing-site/src/styles.css
  git commit -m "chore(marketing): fix three WCAG AA contrast failures"
  ```

---

## Task 3: Remove card hover-rotations

**Findings addressed:** [redesign-skill HIGH] generic tilt-on-hover; [impeccable P1] every card rotates.

**Files:**
- Modify: `darpan-marketing-site/src/styles.css` (step-card, persona-card, insight-card hover rules around lines 598-742; persona ✱ rotation block around 662-684)

- [ ] **Step 1 — Strip the rotation transforms**

  In `src/styles.css`, find these blocks and remove the `rotate(...)` part of the transform; keep `translateY(-4px)` and the shadow change. Targets to edit:

  ```css
  /* .step-card:hover (around line 598) */
  .step-card:hover {
    transform: translateY(-4px);  /* was: translateY(-4px) rotate(-0.4deg) */
    box-shadow: var(--shadow-card-hover);
  }

  /* .persona-card:hover (around line 676) */
  .persona-card:hover {
    transform: translateY(-4px);  /* was: translateY(-4px) rotate(0.4deg) */
    box-shadow: var(--shadow-card-hover);
  }

  /* .insight-card:hover (around line 727) */
  .insight-card:hover {
    transform: translateY(-4px);  /* was: translateY(-4px) rotate(-0.3deg) */
    box-shadow: var(--shadow-card-hover);
  }

  /* Per-child rotation overrides for insight cards (around line 732-742) */
  /* DELETE THESE BLOCKS ENTIRELY: */
  .insight-card:nth-child(2):hover { /* delete */ }
  .insight-card:nth-child(3):hover { /* delete */ }
  /* (Any nth-child override that only sets a different rotation value.) */

  /* .persona-card::before rotation on hover (around line 676-684) */
  /* Find the .persona-card:hover::before rule and remove the rotate change.
     The pseudo-element itself stays (it will be removed in Task 4). */
  ```

- [ ] **Step 2 — Verify**

  ```bash
  cd darpan-marketing-site
  grep -n "rotate(" src/styles.css
  ```

  Expected output: no remaining `rotate()` calls inside `:hover` selectors. The `.section-label::before { transform: translateY(-1px) rotate(-8deg); }` (around line 222) is a static rotation on the asterisk decoration and should remain — that one is the kept device per the personality decision; Task 4 confirms.

  Browser check: hover any card on `/`. Card lifts 4px with a deeper shadow. No drunk tilt.

- [ ] **Step 3 — Commit**

  ```bash
  git add darpan-marketing-site/src/styles.css
  git commit -m "chore(marketing): remove card hover rotation tilts"
  ```

---

## Task 4: Cut personality device count from 5 → 1 (keep section-label asterisk only)

**Findings addressed:** [redesign-skill HIGH] sparkle/asterisk motif overused; [impeccable P1] 9+ asterisk/sparkle motifs; [redesign-skill MEDIUM] squiggle; [impeccable P1] 4× italic-script highlights.

**Decision being applied:** keep only `.section-label::before` (the small ✱ on UPPERCASE section labels). Remove all Phosphor `Sparkle` icons, the `HeroSquiggle` SVG, three of four `.text-script` usages (keep the hero only), and the `.persona-card::before` ✱ pseudo-element.

**Files:**
- Modify: `darpan-marketing-site/src/routes/index.tsx` (Sparkle import + 3 Sparkle usages + HeroSquiggle removal + 3 `.text-script` removals from non-hero sections)
- Modify: `darpan-marketing-site/src/styles.css` (drop `.deco-spark*`, `.hero-squiggle`, `.persona-card::before` / `::after` blocks, possibly the `.section-dark .text-script` variant)

- [ ] **Step 1 — Strip Sparkle from imports and JSX**

  In `src/routes/index.tsx`:

  - Line 1-9 import block: remove `Sparkle` from the Phosphor import:
    ```tsx
    import {
      ArrowRight,
      CheckCircle,
      GitBranch,
      LinkedinLogo,
      MagnifyingGlass,
    } from '@phosphor-icons/react'
    ```
  - HeroSection (line 132-144): delete both `<Sparkle ... className="deco-spark--hero-tr" />` and `<Sparkle ... className="deco-spark--hero-bl" />` blocks.
  - PainSection (line 211-216): delete the `<Sparkle ... className="deco-spark--pain" />` block.
  - FinalCtaSection (line 336-341): delete the `<Sparkle ... className="deco-spark--cta" />` block.

- [ ] **Step 2 — Remove the hero squiggle**

  In `src/routes/index.tsx`:

  - HeroSection h1 (line 146-153): change

    ```tsx
    <h1>
      Retail reconciliation that closes in{' '}
      <span className="hero-emphasis">
        hours, not weeks
        <HeroSquiggle />
      </span>
      .
    </h1>
    ```

    to

    ```tsx
    <h1 className="hero-headline">
      Retail reconciliation that closes in{' '}
      <span className="hero-emphasis">hours, not weeks</span>.
    </h1>
    ```

  - Delete the `HeroSquiggle` component definition (lines 170-187).

- [ ] **Step 3 — Reduce `.text-script` to one usage**

  In `src/routes/index.tsx`, four h2 headings currently use the script highlight. Keep it on the PainSection h2 (line 220-222) only — that's the highest-stakes headline. Remove from the other three:

  - HowItWorksSection (line 247-249): change
    ```tsx
    <h2 id="how-heading">
      Three steps from data <span className="text-script">chaos</span> to closed books
    </h2>
    ```
    to
    ```tsx
    <h2 id="how-heading">Three steps from data chaos to closed books</h2>
    ```

  - PersonasSection (line 277-279): change
    ```tsx
    <h2 id="who-heading">
      Built for <span className="text-script">every</span> stakeholder in the close cycle
    </h2>
    ```
    to
    ```tsx
    <h2 id="who-heading">Built for every stakeholder in the close cycle</h2>
    ```

  - InsightsSection (line 302-304): change
    ```tsx
    <h2 id="insights-heading">
      Thinking <span className="text-script">out loud</span> on retail finance and reconciliation
    </h2>
    ```
    to
    ```tsx
    <h2 id="insights-heading">Thinking out loud on retail finance and reconciliation</h2>
    ```

- [ ] **Step 4 — Strip dead CSS**

  In `src/styles.css`, delete these rule blocks (line numbers approximate):

  - `.deco-spark`, `.deco-spark--hero-tr`, `.deco-spark--hero-bl`, `.deco-spark--pain`, `.deco-spark--cta` — around lines 445-478.
  - `.hero-squiggle` — around lines 434-443.
  - `.persona-card::before` and `.persona-card:hover::before` — the rotating ✱ pseudo-element, around lines 662-684.

  Keep:
  - `.section-label::before` (the kept asterisk).
  - `.text-script` rule itself (still used by the one remaining hero/pain instance).
  - The `.section-dark .text-script` / `.final-cta .text-script` variants (still valid for the kept usage; harmless if unused).

- [ ] **Step 5 — Verify**

  ```bash
  cd darpan-marketing-site
  grep -n "Sparkle\|HeroSquiggle\|deco-spark" src/routes/index.tsx src/styles.css
  ```

  Expected: zero matches in JSX; CSS may still reference removed selectors only if you missed one — clean those up. Then:

  ```bash
  grep -c "text-script" src/routes/index.tsx
  ```

  Expected: `1` (only the kept hero/pain instance).

  ```bash
  npm run build
  ```

  Expected: succeeds, no unused-import warning for `Sparkle`.

  Browser check at 1280px: hero has no sparkles and no squiggle; pain headline still has the rust-highlight italic on "hidden"; how-it-works, personas, and insights headlines render in roman serif with no highlight; section labels still show the small ✱ before the uppercase text.

- [ ] **Step 6 — Commit**

  ```bash
  git add darpan-marketing-site/src/routes/index.tsx darpan-marketing-site/src/styles.css
  git commit -m "chore(marketing): cut personality device count to section-label asterisk only"
  ```

---

## Task 5: Differentiate the three card grids

**Findings addressed:** [redesign-skill HIGH] three identical 3-up grids; [impeccable P1] six identical rounded cards + fake nth-child zig-zag; [redesign-skill drift] plan calls for illustrated process flow for How It Works.

**Approach:**
- **Steps** becomes a horizontal connected flow (no card chrome, no shadows) with a 1px continuous rule connecting the three step nodes and the giant italic step numerals preserved as the typographic anchor.
- **Personas** becomes a typographic 3-column block with vertical hairline dividers between columns and no card chrome.
- **Insights** stays carded because each item has a hero image, but the `nth-child(2) { margin-top: 24px }` fake-asymmetry is removed and all three cards baseline-align.

**Files:**
- Modify: `darpan-marketing-site/src/routes/index.tsx` (HowItWorksSection, PersonasSection)
- Modify: `darpan-marketing-site/src/styles.css` (.steps-grid, .step-card, .persona-grid, .persona-card, .insights-grid)

- [ ] **Step 1 — Steps as horizontal flow**

  In `src/routes/index.tsx`, replace the `HowItWorksSection` component (lines 241-269) body with:

  ```tsx
  function HowItWorksSection() {
    return (
      <section id="how-it-works" className="section section-light" aria-labelledby="how-heading">
        <div className="container">
          <div className="section-header-block">
            <span className="section-label">How it works</span>
            <h2 id="how-heading">Three steps from data chaos to closed books</h2>
          </div>
          <ol className="steps-flow" aria-label="Three-step process">
            {steps.map((step, index) => (
              <li className="step-node" key={step.title}>
                <span className="step-index" aria-hidden>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="step-icon">
                  <step.icon size={36} weight="light" aria-hidden />
                </span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    )
  }
  ```

  Note the structural changes: `<ol>` with class `steps-flow`, `<li>` with class `step-node`. The old `step-card` class is dropped from JSX; CSS in step 3 will delete its rules.

- [ ] **Step 2 — Personas as typographic columns**

  In `src/routes/index.tsx`, replace the `PersonasSection` component (lines 271-294) body with:

  ```tsx
  function PersonasSection() {
    return (
      <section id="who-its-for" className="section section-cream" aria-labelledby="who-heading">
        <div className="container">
          <div className="section-header-block">
            <span className="section-label">Who it’s for</span>
            <h2 id="who-heading">Built for every stakeholder in the close cycle</h2>
          </div>
          <div className="persona-columns">
            {personas.map((persona) => (
              <article className="persona-column" key={persona.role}>
                <span className="persona-role">{persona.role}</span>
                <h3>{persona.title}</h3>
                <p>{persona.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    )
  }
  ```

  The old `persona-card` class is dropped; `persona-column` replaces it.

- [ ] **Step 3 — Replace .steps-grid + .step-card CSS with flow rules**

  In `src/styles.css`, find the `.steps-grid` and `.step-card` rules (around lines 579-640). Delete them all. Insert in their place:

  ```css
  .steps-flow {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 48px;
    position: relative;
    padding: 56px 0 16px;
  }

  /* Continuous hairline behind the three nodes, mid-icon */
  .steps-flow::before {
    content: "";
    position: absolute;
    top: 96px;  /* aligns to vertical center of .step-icon */
    left: 56px;
    right: 56px;
    height: 1px;
    background: var(--color-border);
    z-index: 0;
  }

  .step-node {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    z-index: 1;
  }

  .step-node .step-index {
    font-family: var(--font-display);
    font-style: italic;
    font-size: 56px;
    line-height: 1;
    color: var(--color-accent);
  }

  .step-node .step-icon {
    display: inline-flex;
    width: 64px;
    height: 64px;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    background: var(--color-background);
    border: 1px solid var(--color-border);
    color: var(--color-primary);
  }

  .step-node h3 {
    font-size: 20px;
    margin-top: 4px;
  }

  .step-node p {
    font-size: 16px;
    color: var(--color-text);
    max-width: 36ch;
  }

  @media (max-width: 760px) {
    .steps-flow {
      grid-template-columns: 1fr;
      gap: 40px;
      padding-top: 0;
    }
    .steps-flow::before { display: none; }
  }
  ```

- [ ] **Step 4 — Replace .persona-grid + .persona-card CSS with column rules**

  In `src/styles.css`, find the `.persona-grid` and `.persona-card` rule blocks (around lines 644-706). Delete them all. Insert:

  ```css
  .persona-columns {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 56px;
    position: relative;
  }

  .persona-columns > .persona-column + .persona-column {
    border-left: 1px solid var(--color-border);
    padding-left: 56px;
  }

  .persona-column {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .persona-column .persona-role {
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-secondary);
  }

  .persona-column h3 {
    font-family: var(--font-display);
    font-weight: 400;
    font-size: 26px;
    line-height: 1.15;
    color: var(--color-text);
  }

  .persona-column p {
    font-size: 16px;
    color: var(--color-text);
    max-width: 36ch;
  }

  @media (max-width: 760px) {
    .persona-columns {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    .persona-columns > .persona-column + .persona-column {
      border-left: 0;
      padding-left: 0;
      border-top: 1px solid var(--color-border);
      padding-top: 40px;
    }
  }
  ```

- [ ] **Step 5 — Remove the insights nth-child zig-zag**

  In `src/styles.css`, find the rule:

  ```css
  .insights-grid > .insight-card:nth-child(2) {
    margin-top: 24px;
  }
  ```

  (around lines 732-734) and any `nth-child(3)` companion. Delete them.

- [ ] **Step 6 — Verify**

  ```bash
  cd darpan-marketing-site
  grep -n "step-card\|persona-card\|nth-child(2)" src/routes/index.tsx src/styles.css
  ```

  Expected: zero matches in JSX. CSS may still reference `step-card`/`persona-card` only if a cleanup miss — remove any stragglers.

  ```bash
  npm run build
  ```

  Expected: succeeds.

  Browser check at 1280px: How It Works now reads as a connected horizontal flow with a thin hairline behind three round-bordered icon wells. Personas reads as three columns separated by vertical hairlines (no card chrome, no shadow). Insights cards baseline-align (no offset). At 760px, both collapse to single column with horizontal dividers between persona columns.

- [ ] **Step 7 — Commit**

  ```bash
  git add darpan-marketing-site/src/routes/index.tsx darpan-marketing-site/src/styles.css
  git commit -m "chore(marketing): differentiate three card grids (flow + columns + baseline-aligned)"
  ```

---

## Task 6: Remove decorative SectionWaves

**Findings addressed:** [redesign-skill MEDIUM] 6 decorative wave dividers; [impeccable P2] 5 SectionWaves dated.

**Approach:** delete all six `<SectionWave ... />` call sites and the `SectionWave` component. Background color contrast between sections (light → cream → light → cream → dark → footer) already provides the section break.

**Files:**
- Modify: `darpan-marketing-site/src/routes/index.tsx`
- Modify: `darpan-marketing-site/src/styles.css`

- [ ] **Step 1 — Strip SectionWave call sites**

  In `src/routes/index.tsx`, remove every `<SectionWave ... />` line:
  - HeroSection end (line 165): delete `<SectionWave to="oat" />`
  - PainSection end (line 236): delete `<SectionWave to="ivory" variant="b" />`
  - HowItWorksSection end (line 266): delete `<SectionWave to="oat" />`
  - PersonasSection end (line 291): delete `<SectionWave to="ivory" variant="b" />`
  - InsightsSection end (line 328): delete `<SectionWave to="navy" />`
  - FinalCtaSection end (line 356): delete `<SectionWave to="footer" variant="b" />`

- [ ] **Step 2 — Delete the SectionWave component and its type alias**

  Lines 189-206. Delete the `type WaveTone = ...` and the entire `function SectionWave` body.

- [ ] **Step 3 — Delete the CSS rules**

  In `src/styles.css`, delete the `.section-wave`, `.section-wave--ivory`, `.section-wave--oat`, `.section-wave--navy`, `.section-wave--footer`, and the `@media (max-width: 980px) { .section-wave { height: 56px; } }` block (lines 161-181).

- [ ] **Step 4 — Verify**

  ```bash
  cd darpan-marketing-site
  grep -n "SectionWave\|section-wave" src/routes/index.tsx src/styles.css
  ```

  Expected: zero matches.

  Browser check: sections now meet at a flat color edge with no decorative wave seam. The site reads tighter, more institutional.

- [ ] **Step 5 — Commit**

  ```bash
  git add darpan-marketing-site/src/routes/index.tsx darpan-marketing-site/src/styles.css
  git commit -m "chore(marketing): remove decorative section wave dividers"
  ```

---

## Task 7: Unify CTA behavior + tighten voice

**Findings addressed:** [impeccable P1] same label / different destinations across three CTAs; [impeccable P1] "30 minutes. No slides" vs "No pitch deck" inconsistency; [redesign-skill MEDIUM + impeccable P1] casual P.S. voice mismatch; [impeccable P2] "Find what doesn't match" weakest step title.

**Decision being applied:** all three "Request a walkthrough" buttons fire the same `mailto:hello@drpn.ai?subject=Darpan%20walkthrough` (the most committed action). Unify subnote to "30 minutes. No pitch deck." Delete the P.S. line entirely.

**Files:**
- Modify: `darpan-marketing-site/src/routes/index.tsx` (3 CTA href values + 2 subnote strings + 1 P.S. removal; also fix the step title at line 44)

- [ ] **Step 1 — SiteHeader CTA → mailto**

  Line 122-124, change `href="#talk"` to `href="mailto:hello@drpn.ai?subject=Darpan%20walkthrough"`:

  ```tsx
  <a className="btn btn-primary site-header-cta" href="mailto:hello@drpn.ai?subject=Darpan%20walkthrough">
    Request a walkthrough
  </a>
  ```

- [ ] **Step 2 — Hero CTA → mailto + subnote unified**

  Lines 158-162, change the same way:

  ```tsx
  <div className="hero-cta">
    <a className="btn btn-primary btn-primary-large" href="mailto:hello@drpn.ai?subject=Darpan%20walkthrough">
      Request a walkthrough
      <ArrowRight size={18} weight="bold" aria-hidden />
    </a>
    <span className="cta-note">30 minutes. No pitch deck.</span>
  </div>
  ```

- [ ] **Step 3 — Final CTA stays mailto; delete P.S.; unify subnote (already correct)**

  Line 351 already reads "30 minutes. No pitch deck." — keep as is. Lines 352-354 (the `<p className="ps-note">P.S. ...`) — delete the entire `<p>` block.

- [ ] **Step 4 — Also delete the section-anchor target shell that's now orphaned**

  The CTAs no longer point to `#talk`, but the section element keeps the `id="talk"` for the footer "Security" link (which we fix in Task 10) and for screen-reader landmark stability. Leave `id="talk"` on the section.

- [ ] **Step 5 — Strengthen the weakest step title**

  Line 43-46, the second step:

  ```ts
  {
    icon: MagnifyingGlass,
    title: 'Find what doesn’t match',
    body: '...',
  },
  ```

  Change `title` to `'Surface what doesn’t reconcile'`. (Verb-led, retail-finance vocabulary, matches the action-led pattern of the other two titles.)

- [ ] **Step 6 — Verify**

  ```bash
  cd darpan-marketing-site
  grep -n 'href="#talk"' src/routes/index.tsx
  ```

  Expected: 1 match — the footer Security link, which Task 10 fixes separately. No other `#talk` anchors should remain in CTAs.

  ```bash
  grep -n 'ps-note\|P\.S\.' src/routes/index.tsx
  ```

  Expected: 0 matches.

  ```bash
  grep -n "No slides\|No pitch deck" src/routes/index.tsx
  ```

  Expected: 2 matches, both reading `No pitch deck`.

  ```bash
  grep -n "Find what doesn" src/routes/index.tsx
  ```

  Expected: 0 matches.

- [ ] **Step 7 — Commit**

  ```bash
  git add darpan-marketing-site/src/routes/index.tsx
  git commit -m "chore(marketing): unify CTA behavior + tighten voice"
  ```

---

## Task 8: Insight cards — fix the affordance lie

**Findings addressed:** [impeccable P1] insight cards have `cursor: pointer` and hover lift but no link target.

**Decision being applied:** since the insights are not yet real posts (and there is no `/insights/$slug` route), the right move is to **remove the link affordance now** rather than create three placeholder pages. When the blog ships, the cards can wrap in `<Link>` and the affordance returns.

**Files:**
- Modify: `darpan-marketing-site/src/styles.css` (.insight-card)

- [ ] **Step 1 — Strip cursor + hover lift from insight cards**

  In `src/styles.css`, the `.insight-card` and `.insight-card:hover` rules (around lines 716-731). Edit:

  ```css
  .insight-card {
    /* keep: background, border-radius, padding, etc. */
    cursor: default;            /* was: cursor: pointer; */
    transition: none;           /* remove the transform/shadow transitions on hover */
  }

  /* Delete the .insight-card:hover block entirely. */
  ```

- [ ] **Step 2 — Verify**

  ```bash
  grep -n "insight-card:hover\|cursor: pointer" darpan-marketing-site/src/styles.css
  ```

  Expected: no `insight-card:hover` rules; the only `cursor: pointer` left in the file should be on actual buttons/links (`.btn`, `.mobile-menu-trigger`, etc.).

  Browser check: hovering an insight card no longer lifts; cursor stays as default text/arrow rather than the hand-pointer.

- [ ] **Step 3 — Commit**

  ```bash
  git add darpan-marketing-site/src/styles.css
  git commit -m "chore(marketing): remove insight card affordance lie (no link target yet)"
  ```

---

## Task 9: Insight cover art — strip the fake editorial hero

**Findings addressed:** [redesign-skill LOW] SVG art labeled "editorial cover" reads as placeholder; [impeccable P2] inline SVG with `feTurbulence` grain filters simulate editorial covers without being editorial.

**Decision being applied:** strip the SVG `<div className="insight-hero">` wrapper from each card and let `tag → title → meta` carry the article alone. This matches the redesign plan's "magazine grid" intent more honestly than fake editorial covers. When real warm-tone images are generated per the asset playbook, they wrap in the same `.insight-hero` shell as a `<img>`.

**Files:**
- Modify: `darpan-marketing-site/src/routes/index.tsx` (InsightsSection rendering + dead component cleanup)
- Modify: `darpan-marketing-site/src/styles.css` (.insight-hero rule removal)

- [ ] **Step 1 — Strip the .insight-hero block from JSX**

  In `src/routes/index.tsx`, the `InsightsSection` component (lines 296-331). Inside the `.map(...)` body (lines 307-324), remove the `<div className="insight-hero" ...>{Art()}</div>` block, keeping only `.insight-body`. After edit:

  ```tsx
  {insights.map((post) => (
    <article className="insight-card" key={post.title}>
      <div className="insight-body">
        <span className="insight-tag">{post.tag}</span>
        <h3>{post.title}</h3>
        <span className="insight-meta">{post.meta}</span>
      </div>
    </article>
  ))}
  ```

  Also remove the `const Art = insightArtMap[post.art]` line at the top of the map callback (it's now unused), and remove `art` from each insight object's destructuring if applicable.

- [ ] **Step 2 — Delete the three insight-art components and the map**

  Lines 361-506: delete `InsightArtRows`, `InsightArtColumns`, `InsightArtNodes`, and the `insightArtMap` const (line 502-506).

- [ ] **Step 3 — Remove .insight-hero CSS**

  In `src/styles.css`, find any `.insight-hero` rule (likely around lines 740-760). Delete the block(s). Also remove `.insight-art` if it exists.

- [ ] **Step 4 — Update .insight-card body padding so the card still feels intentional without a hero**

  In `src/styles.css`, the `.insight-card` rule should now use generous interior padding. Adjust (or add):

  ```css
  .insight-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: 32px 28px;
    box-shadow: var(--shadow-card);
    cursor: default;
  }
  ```

- [ ] **Step 5 — Verify**

  ```bash
  cd darpan-marketing-site
  grep -n "InsightArt\|insight-hero\|insightArtMap\|feTurbulence" src/routes/index.tsx src/styles.css
  ```

  Expected: zero matches.

  ```bash
  npm run build
  ```

  Expected: succeeds.

  Browser check: insights row renders three text-only cards with consistent padding and the warm cream surface. The fake editorial grain is gone.

- [ ] **Step 6 — Commit**

  ```bash
  git add darpan-marketing-site/src/routes/index.tsx darpan-marketing-site/src/styles.css
  git commit -m "chore(marketing): strip fake editorial cover SVGs from insight cards"
  ```

---

## Task 10: Footer fixes

**Findings addressed:** [impeccable P2] Security link points to `#talk`; [redesign-skill LOW] mailto Privacy/Terms placeholders; [redesign-skill LOW] "minus the busywork" colloquial; [impeccable] stray maroon border-top on near-black footer.

**Decision being applied:** remove the Security and Docs link rows for now (Docs and Security pages don't exist yet); replace Privacy/Terms mailtos with **real placeholder routes** that say "Coming soon" — these are small enough to ship in this task and procurement readers reach for them; change the tagline.

**Files:**
- Modify: `darpan-marketing-site/src/routes/index.tsx` (SiteFooter; tagline)
- Create: `darpan-marketing-site/src/routes/privacy.tsx`
- Create: `darpan-marketing-site/src/routes/terms.tsx`
- Modify: `darpan-marketing-site/src/styles.css` (.footer-bottom border-top color)

> This task uses the new `tanstack-start-routes` skill for the placeholder routes — file-based routing under `src/routes/`. The TanStack Router plugin auto-regenerates `routeTree.gen.ts` on build/dev start.

- [ ] **Step 1 — Create the two placeholder routes**

  Create `src/routes/privacy.tsx`:

  ```tsx
  import { createFileRoute } from '@tanstack/react-router'

  export const Route = createFileRoute('/privacy')({
    component: PrivacyPage,
    head: () => ({
      meta: [{ title: 'Privacy — Darpan' }],
    }),
  })

  function PrivacyPage() {
    return (
      <main className="legal-page section section-light" aria-labelledby="privacy-heading">
        <div className="container legal-container">
          <span className="section-label">Legal</span>
          <h1 id="privacy-heading">Privacy</h1>
          <p>
            Our full privacy policy is being prepared. For any privacy or data
            handling question in the meantime, write to{' '}
            <a href="mailto:hello@drpn.ai?subject=Privacy">hello@drpn.ai</a>.
          </p>
        </div>
      </main>
    )
  }
  ```

  Create `src/routes/terms.tsx`:

  ```tsx
  import { createFileRoute } from '@tanstack/react-router'

  export const Route = createFileRoute('/terms')({
    component: TermsPage,
    head: () => ({
      meta: [{ title: 'Terms — Darpan' }],
    }),
  })

  function TermsPage() {
    return (
      <main className="legal-page section section-light" aria-labelledby="terms-heading">
        <div className="container legal-container">
          <span className="section-label">Legal</span>
          <h1 id="terms-heading">Terms</h1>
          <p>
            Our terms of service are being prepared. For contract or licensing
            questions in the meantime, write to{' '}
            <a href="mailto:hello@drpn.ai?subject=Terms">hello@drpn.ai</a>.
          </p>
        </div>
      </main>
    )
  }
  ```

- [ ] **Step 2 — Add minimal legal-page CSS**

  In `src/styles.css`, append:

  ```css
  .legal-page {
    min-height: 60vh;
  }

  .legal-container {
    max-width: 720px;
    padding-top: 64px;
    padding-bottom: 64px;
  }

  .legal-container h1 {
    font-family: var(--font-display);
    font-size: clamp(32px, 4vw, 44px);
    margin-bottom: 24px;
  }

  .legal-container p {
    font-size: 17px;
    line-height: 1.7;
  }
  ```

- [ ] **Step 3 — Update SiteFooter**

  In `src/routes/index.tsx`, replace the `SiteFooter` body (lines 508-543) with:

  ```tsx
  function SiteFooter() {
    return (
      <footer className="site-footer" aria-label="Site footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <span className="footer-wordmark">Darpan</span>
              <span className="footer-tagline">AI reconciliation for retail finance.</span>
            </div>
            <div className="footer-column">
              <span className="footer-heading">Product</span>
              <a className="footer-link" href="#how-it-works">How it works</a>
              <a className="footer-link" href="#who-its-for">Who it’s for</a>
            </div>
            <div className="footer-column">
              <span className="footer-heading">Company</span>
              <a className="footer-link" href="#insights">Insights</a>
              <a className="footer-link" href="mailto:hello@drpn.ai">Contact</a>
            </div>
            <div className="footer-column">
              <span className="footer-heading">Legal</span>
              <a className="footer-link" href="/privacy">Privacy</a>
              <a className="footer-link" href="/terms">Terms</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Darpan. All rights reserved.</span>
            <a href="https://www.linkedin.com/company/drpn-ai" aria-label="Darpan on LinkedIn">
              <LinkedinLogo size={20} weight="regular" aria-hidden />
            </a>
          </div>
        </div>
      </footer>
    )
  }
  ```

  Changes vs. original:
  - Tagline: "AI reconciliation for retail, minus the busywork." → "AI reconciliation for retail finance."
  - Product column: removed the "Security" link pointing at `#talk` (broken IA).
  - Company column: removed the `https://docs.drpn.ai` Docs link (domain may not exist).
  - Legal column: Privacy and Terms now point to real `/privacy` and `/terms` routes instead of mailto.

- [ ] **Step 4 — Fix footer bottom-bar border color**

  In `src/styles.css`, find `.footer-bottom` (around line 920-928). If `border-top: 1px solid var(--color-primary)` exists, change to `border-top: 1px solid rgba(140, 142, 132, 0.18)` (a low-alpha version of `--color-footer-link`). This removes the stray maroon line on the near-black footer.

- [ ] **Step 5 — Verify**

  ```bash
  cd darpan-marketing-site
  grep -n '"#talk"\|docs.drpn.ai\|minus the busywork\|"#privacy"\|"#terms"' src/routes/index.tsx
  ```

  Expected: `#talk` appears once (the section id itself on the FinalCtaSection); `docs.drpn.ai` and "minus the busywork" appear 0 times; `/privacy` and `/terms` appear in SiteFooter.

  ```bash
  npm run build
  ```

  Expected: succeeds; the TanStack Router plugin regenerates `routeTree.gen.ts` to include the new routes.

  Browser check: footer renders without Security or Docs link; Privacy and Terms navigate to the two new placeholder routes; the bottom-bar border-top is a faint neutral line, not maroon.

- [ ] **Step 6 — Commit**

  ```bash
  git add darpan-marketing-site/src/routes/index.tsx \
          darpan-marketing-site/src/routes/privacy.tsx \
          darpan-marketing-site/src/routes/terms.tsx \
          darpan-marketing-site/src/styles.css \
          darpan-marketing-site/src/routeTree.gen.ts
  git commit -m "chore(marketing): footer cleanup + Privacy/Terms placeholder routes + tagline"
  ```

---

## Task 11: Small polish sweep (catch-all for remaining low-severity items)

**Findings addressed:** [redesign-skill drift] hero h1 should `text-wrap: balance`; [impeccable P2] hero subhead line-length too long; [impeccable P2/P2] `scroll-padding-top` mismatch; [redesign-skill LOW] `100vh` → `100dvh`; [impeccable P3] em-dashes in prose; [impeccable P2] pain stat numerals shrink too small on mobile; [redesign-skill drift] credibility line missing beneath hero.

**Files:**
- Modify: `darpan-marketing-site/src/styles.css` (small surgical edits)
- Modify: `darpan-marketing-site/src/routes/index.tsx` (em-dash sweep + credibility line)

- [ ] **Step 1 — `100vh` → `100dvh` + matching `scroll-padding-top`**

  In `src/styles.css`:

  - Line 145, `.site-shell { min-height: 100vh; }` → `.site-shell { min-height: 100dvh; }` (no fallback needed; all targeted browsers support `dvh`).
  - Line 51, `html { scroll-padding-top: 88px; }` → `html { scroll-padding-top: 72px; }` (match header height). For mobile, the header keeps the same 72px height, so no breakpoint variant needed unless the header height changes responsively.

- [ ] **Step 2 — Hero h1 text-wrap + subhead max-width**

  In `src/styles.css`:

  - `.hero h1` (line 422-426) — add `text-wrap: balance;` so the headline doesn't leave an orphaned "weeks" line on narrow viewports.
  - `.hero-subhead` (search around line 480-485) — change `max-width: 640px;` to `max-width: 56ch;` so line length stays in the 65-75ch range across viewports.

- [ ] **Step 3 — Pain stat numerals don't shrink below 44px**

  In `src/styles.css`, the `.stat-number` rule (around line 534). Change `font-size: clamp(40px, 4.5vw, 56px);` to `font-size: clamp(44px, 9vw, 56px);` so mobile stats stay bold and hero-status.

- [ ] **Step 4 — Em-dash sweep**

  In `src/routes/index.tsx`, find every em-dash (`—`, U+2014) in the prose and replace with a comma or period as context requires. Quick command:

  ```bash
  cd darpan-marketing-site
  grep -n '—' src/routes/index.tsx
  ```

  Edit each match by hand (these are sentence-level rhythm decisions, not mechanical):

  - Line ~40 `step.body`: rewrite the em-dash phrase as two clauses or a comma break.
  - Line ~45 `step.body`: same.
  - Line ~50 `step.body`: same.
  - Line ~58 persona body: same.
  - Line ~155 `hero-subhead`: "...surface what doesn't add up — so your finance team can spend the month doing finance, not chasing variances." → "...surface what doesn't add up so your finance team can spend the month doing finance, not chasing variances." (the em-dash adds nothing semantic here).

  Note: this rule is contentious and the user can override on aesthetic grounds. The impeccable skill is strict on it; the redesign-skill didn't flag it. Treat as P3 — if it disrupts a sentence's meaning, leave the em-dash.

- [ ] **Step 5 — SKIPPED per user decision**

  The hero credibility line was deferred. The drift item ("no credibility moment beneath the hero" from `darpan-marketing-redesign-plan.md:104-110`) remains open until real social proof (logo strip, pilot outcome, attribution) is available. Tracked in the out-of-scope follow-ups section below.

- [ ] **Step 6 — Verify**

  ```bash
  cd darpan-marketing-site
  grep -n '100vh\|scroll-padding-top: 88px' src/styles.css
  ```

  Expected: zero matches.

  ```bash
  grep -c '—' src/routes/index.tsx
  ```

  Expected: 0 (or a small number with documented reason).

  ```bash
  npm run build && npm run dev
  ```

  Browser check at 375px: hero stats display at no smaller than 44px; hero headline wraps cleanly without orphan; subhead doesn't exceed roughly 65ch; anchor jumps from nav land cleanly without sliver overlap.

- [ ] **Step 7 — Commit**

  ```bash
  git add darpan-marketing-site/src/styles.css darpan-marketing-site/src/routes/index.tsx
  git commit -m "chore(marketing): polish sweep (dvh, scroll-pad, hero balance, em-dashes, credibility line)"
  ```

---

## Post-implementation checks

After all 11 tasks land:

- [ ] **Full local check**

  ```bash
  cd darpan-marketing-site
  npm run build
  npx tsc --noEmit
  npm run dev
  ```

  Walk the page at 375px / 768px / 1280px / 1600px. Confirm: mobile menu works, all three "Request a walkthrough" CTAs open the same `mailto:`, no card rotates on hover, only the section-label asterisk repeats as a personality device, the pain headline is the only `.text-script` instance, all three grids feel structurally distinct, no waves between sections, footer Privacy/Terms navigate to placeholder routes.

- [ ] **A11y spot-check**

  In DevTools, run Lighthouse or axe DevTools on `/`. Expected: no contrast failures on the previously-flagged areas (cream body copy, footer bottom-bar, CTA subnote). Mobile menu should pass keyboard nav (Tab to trigger → Enter → Tab through links → Escape to close).

- [ ] **Deploy verification (optional)**

  If Netlify is wired, push to a preview branch and confirm the deployed site matches local at all breakpoints.

---

## Out-of-scope follow-ups (NOT in this plan)

- **Test infrastructure:** adding vitest + RTL so future visual/behavioral changes can be TDD'd. Suggest as a separate plan if the user wants ongoing test coverage.
- **Real insight content + warm-tone hero imagery:** the asset playbook calls for AI-generated editorial photos. Defer until copy is finalized; the `content-collections` skill is the right tool when ready.
- **Real `/insights/$slug` blog routes:** once posts exist, wrap each `.insight-card` in `<Link to="/insights/$slug">` and re-enable the cursor/hover affordance (Task 8 reversal).
- **Buying-committee copy tightening:** plan calls for sharper Controller / VP Ops / CFO body copy (`darpan-marketing-redesign-plan.md:104-110`). Worth a dedicated copy pass once the structural changes settle.
- **Real Privacy + Terms policies:** the placeholder routes from Task 10 need real legal copy before serious sales motion.
- **Scroll-triggered fade-in for stats + headings** per the plan's motion philosophy — fits naturally with `emil-design-eng` (motion as invisible polish) or `frontend-design` once structure is settled.
- **Hero credibility line / social proof beneath hero** — deferred until real attribution, pilot outcome, or logo strip exists. Plan drift item from `darpan-marketing-redesign-plan.md:104-110` stays open.
- ~~**MobileMenu focus management + focus trap**~~ — RESOLVED in Task 1's amended commit. The amended `MobileMenu.tsx` includes `triggerRef`, `dialogRef`, focus-on-open, return-focus-on-close, and a `FOCUSABLE_SELECTOR`-based Tab/Shift+Tab cycle.
- **Portal-based dialog rendering** — RESOLVED post browser-walk (commit `f3784b9`). Header's `backdrop-filter: blur(14px)` was establishing a containing block for `position: fixed` descendants, collapsing the dialog to 0 height. Fixed by mounting the dialog via `createPortal(..., document.body)`.

---

## Self-review notes

- All 10 audit findings from the synthesis are mapped to numbered tasks (Tasks 1-10), plus a Task 11 catch-all for the secondary items. Spec coverage complete.
- No "TBD" or "implement later" placeholders. Every code block contains the actual code or the exact selector/value to change.
- Personality device decision (Task 4) is made explicit; the user can swap before execution.
- Em-dash rule (Task 11 Step 4) is flagged as contentious so the executor doesn't blindly strip meaning.
- The Hotwax attribution (Task 11 Step 5) is gated on a fact check.
- TDD substitute (grep-verification + browser-verification) is documented in the header and consistently applied per task.
- Tasks are independently revertable — each commit is one task, and the order is engineered so a revert of Task N leaves Tasks 1..N-1 still coherent.
