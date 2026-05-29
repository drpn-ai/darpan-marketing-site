# Darpan Marketing Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **TDD adaptation:** This project has no test infrastructure (no vitest config, no test files). The redesign is visual and structural. Steps use **grep verification** (the expected pattern is present and the unexpected pattern is gone) and **browser-walk verification** (Playwright headed-or-headless screenshots at 375 / 768 / 1280 widths, like the polish session). The Playwright walk script lives at `/tmp/playwright-test/walk.mjs` from the prior session; the final task re-runs and adapts it. Adding vitest + RTL remains a separate, deferred spec.

**Goal:** Replace the current marketing homepage with the Cognition-inspired editorial spread (5 numbered sections on a college-ruled notebook background), and ship three new placeholder routes (`/customers`, `/writing`, `/writing/$slug`).

**Architecture:** Pure React 19 + TanStack Start, no new dependencies. All composition is JSX + CSS. The notebook background is one CSS `background-image` rule (zero JS, zero DOM noise). Section components live in new files under `src/components/sections/` so each section is one focused unit. Writing entries are shared data (`src/data/writing-entries.ts`) so the home page and `/writing` index reference the same source.

**Tech Stack:** TanStack Start, React 19, Vite 7, Tailwind v4 (used via the `@tailwindcss/vite` plugin; we author plain CSS in `src/styles.css`), Phosphor icons, TypeScript strict.

**Branch:** `feature/marketing-redesign-concept` (already checked out; spec lives at `darpan-marketing-site/docs/superpowers/specs/2026-05-29-marketing-redesign-concept.md`, committed as `416ef3d`).

**Ground-truth constraints (do not violate):**
- Palette is locked to the existing `:root` tokens. No new colors.
- Fonts locked: DM Serif Display + Plus Jakarta Sans.
- No new npm dependencies. No marquees, GSAP, or scroll choreography frameworks. Motion is plain CSS transitions + a single IntersectionObserver for scroll-triggered rule-draws.
- The 11 surgical fixes shipped earlier (mobile nav, contrast tokens, footer routes, Privacy/Terms placeholders, etc.) must not regress. The portal fix on `MobileMenu` must be preserved.

---

## File Structure

### To modify

| Path | What changes |
| --- | --- |
| `src/styles.css` | Large additions: notebook background on `.site-shell`, new section system (`.section-band`, `.section-numeral`, `.section-header`), hero rules (`.hero-headline`, `.hero-cta`, `.hero-secondary`, `.hero-meta`), reconciled-by rules (`.logo-row`, `.logo-wordmark`, `.logo-caption`), product rules (`.product-list`, `.product-primitive`, `.product-label`, `.product-headline`, `.product-body`, `.product-coda`), work rules (`.work`, `.manifesto`, `.manifesto-close`, `.work-coda`), writing rules (`.writing-list`, `.writing-entry`, `.writing-meta`, `.writing-title`, `.writing-detail`, `.writing-all`), responsive `--gutter` custom property. Targeted deletions: `.steps-flow`, `.step-node*`, `.persona-columns`, `.persona-column*`, `.pain-grid`, `.pain-copy`, `.stat-list`, `.stat-block`, `.stat-number`, `.stat-label`, `.insights-grid`, `.insight-card*`, `.final-cta*`, `.section-cream`, `.text-script`, `.ps-note`, `.cta-note`, `.section-header-block`, `.hero-headline` (existing rule has only `text-wrap: balance;` — gets superseded by the new much fuller rule). Section background fills on `.section-light` / `.section-cream` removed so the body's notebook background shows through. |
| `src/routes/index.tsx` | Replace `HeroSection`, `PainSection`, `HowItWorksSection`, `PersonasSection`, `InsightsSection`, `FinalCtaSection` with imports + composition of the new `HeroSection`, `ReconciledBySection`, `ProductSection`, `WorkSection`, `WritingSection`. Delete the `steps`, `personas`, `insights`, `stats` constant arrays. Update `navItems` to `[['Product', '#product'], ['Customers', '/customers'], ['Writing', '/writing']]`. Drop the duplicate `<a className="btn btn-primary site-header-cta" ...>` from `SiteHeader` (CTA lives in hero only). Add Phosphor `ArrowUpRight` import for the hero secondary link arrow. `SiteFooter` is unchanged. `MobileMenu` is unchanged. |
| `darpan-marketing-site/.gitignore` | Already excludes `.superpowers/`. No change needed. |

### To create

| Path | Responsibility |
| --- | --- |
| `src/data/writing-entries.ts` | Shared `writingEntries` array + `WritingEntry` type. Used by `WritingSection` on home and by `/writing` index route. Three stub entries at launch. |
| `src/components/sections/HeroSection.tsx` | Section 01 — single declarative hero claim, left-aligned, with `01` numeral, primary CTA, ghost link to product brief, and a small caption line. |
| `src/components/sections/ReconciledBySection.tsx` | Section 02 — "Reconciled by retail teams at" + plain logo row with placeholder wordmarks + caption. |
| `src/components/sections/ProductSection.tsx` | Section 03 — three primitives (Schema, Compare, Evidence). Evidence is a single-line coda; Schema and Compare are full primitives. |
| `src/components/sections/WorkSection.tsx` | Section 04 — manifesto paragraph + italic closing line + caption coda. |
| `src/components/sections/WritingSection.tsx` | Section 05 — entry list using `writingEntries`. Each title links to `/writing/$slug`. Trailing "All writing →" link to `/writing`. |
| `src/routes/customers.tsx` | Placeholder editorial page reusing the section-band pattern. Single paragraph + the same logo row + CTA. |
| `src/routes/writing.tsx` | Index of writing entries (same data as the home WritingSection, just rendered as a full page). |
| `src/routes/writing/$slug.tsx` | Dynamic route. One stub post for the first slug; other slugs render a "post coming soon" body. |

### To preserve (no edits)

- `src/components/MobileMenu.tsx` — Task 1 component + portal fix from the polish session. The `navItems` import resolves to the updated array, which is fine.
- `src/routes/privacy.tsx`, `src/routes/terms.tsx` — Task 10 placeholders.
- `src/routes/__root.tsx` — meta tags, OG, Twitter, canonical, favicon.
- `src/routeTree.gen.ts` — regenerated automatically by the TanStack Router Vite plugin on `npm run build`/`npm run dev`.

---

## Verification rhythm (used by every task)

After each task, run this two-step check before committing:

1. **Build check** — `cd darpan-marketing-site && npm run build` must succeed with no TS errors. (For CSS-only tasks, `npx tsc --noEmit` is sufficient; the build is only required when JSX changes.)
2. **Grep check** — each task lists specific grep patterns and expected counts. Run them.

The **final task** runs a full browser-walk via Playwright at 375 / 768 / 1280px for `/`, `/customers`, `/writing`, and `/writing/why-reconciliation-belongs-at-the-data-layer`.

Commit per task with the message format `feat(marketing): <task title>` — granular history.

---

## Task 1: CSS foundation — responsive `--gutter` token

**Files:** Modify `darpan-marketing-site/src/styles.css` (`:root` block + breakpoint blocks)

The notebook background needs to anchor its vertical margin rule at the same gutter the content uses. We add a single `--gutter` custom property that changes at the existing breakpoints.

- [ ] **Step 1 — Add `--gutter` to `:root`**

In `src/styles.css`, locate the `:root` block (starts around line 3 after the `@import` rules). After the existing `--gutter-desktop` and `--gutter-mobile` declarations (which stay), add:

```css
  --gutter: var(--gutter-desktop);
```

So the relevant block reads:
```css
  --gutter-desktop: 120px;
  --gutter-mobile: 24px;
  --gutter: var(--gutter-desktop);
```

- [ ] **Step 2 — Add breakpoint overrides**

In `src/styles.css`, find an appropriate place near other media queries (search for `@media (max-width: 980px)` and `@media (max-width: 560px)`). Add at the top of each existing media query block, or as new blocks if none exist:

```css
@media (max-width: 980px) {
  :root { --gutter: 80px; }
  /* ...existing rules in this query... */
}

@media (max-width: 560px) {
  :root { --gutter: var(--gutter-mobile); }
  /* ...existing rules in this query... */
}
```

If a `@media (max-width: 980px)` block does not exist yet, create one right before the existing `@media (max-width: 760px)` block. If neither exists, create both at the bottom of the file before the final `@media (prefers-reduced-motion: reduce)` block.

- [ ] **Step 3 — Verify**

```bash
cd darpan-marketing-site
grep -n "^  --gutter:" src/styles.css
```
Expected: 1 match in `:root` (line ~25 area) reading `  --gutter: var(--gutter-desktop);`.

```bash
grep -nE ":root \{ --gutter: " src/styles.css
```
Expected: 2 matches inside `@media (max-width: 980px)` and `@media (max-width: 560px)`.

```bash
npx tsc --noEmit 2>&1 | tail -3
```
Expected: clean (CSS-only change, no TS impact).

- [ ] **Step 4 — Commit**

```bash
cd darpan-marketing-site
git add src/styles.css
git commit -m "feat(marketing): add responsive --gutter token"
```

---

## Task 2: Notebook background on `.site-shell`

**Files:** Modify `darpan-marketing-site/src/styles.css` (`.site-shell` rule)

College-ruled paper: subtle horizontal lines every 32px + a single vertical rust margin rule at the page gutter.

- [ ] **Step 1 — Update `.site-shell` rule**

In `src/styles.css`, find the existing `.site-shell` rule (around line 140-150 after polish-pass shipped). It currently reads approximately:
```css
.site-shell {
  background: var(--color-background);
  color: var(--color-text);
  min-height: 100dvh;
}
```

Replace it with:
```css
.site-shell {
  background-color: var(--color-background);
  color: var(--color-text);
  min-height: 100dvh;
  background-image:
    linear-gradient(
      to right,
      transparent calc(var(--gutter) - 1px),
      rgba(158, 71, 56, 0.22) calc(var(--gutter) - 1px),
      rgba(158, 71, 56, 0.22) var(--gutter),
      transparent var(--gutter)
    ),
    linear-gradient(
      to bottom,
      rgba(42, 31, 26, 0.06) 1px,
      transparent 1px
    );
  background-size: 100% 100%, 100% 32px;
  background-repeat: no-repeat, repeat-y;
  background-position: 0 0, 0 24px;
  background-attachment: scroll, scroll;
}
```

- [ ] **Step 2 — Remove section background fills (so the body background shows through)**

In `src/styles.css`, find:
```css
.section-light {
  background: var(--color-background);
  color: var(--color-text);
}

.section-cream {
  background: var(--color-section-alt);
  color: var(--color-text);
}
```

Change `.section-light` to:
```css
.section-light {
  background: transparent;
  color: var(--color-text);
}
```

Delete the entire `.section-cream` rule. Also delete any `.section-cream p,` / `.section-cream li,` / `.section-cream .pain-copy p,` / `.section-cream .persona-column p` rule blocks added in earlier tasks.

- [ ] **Step 3 — Verify**

```bash
cd darpan-marketing-site
grep -A 1 "^\.site-shell {" src/styles.css | grep "background-color"
```
Expected: 1 line containing `background-color: var(--color-background);`.

```bash
grep -nE "^\.section-cream" src/styles.css
```
Expected: 0 matches.

```bash
grep -nE "^\.section-light" src/styles.css
```
Expected: 1 match.

```bash
npm run build 2>&1 | tail -3
```
Expected: clean build.

- [ ] **Step 4 — Commit**

```bash
git add src/styles.css
git commit -m "feat(marketing): add notebook-paper background to site shell"
```

---

## Task 3: Section-system CSS (numerals, headers, bands)

**Files:** Modify `darpan-marketing-site/src/styles.css`

Add the shared rules used by all five new sections. These are the chassis that each section component will hang content on.

- [ ] **Step 1 — Add section-system rules**

Append to `src/styles.css` (anywhere below the existing `.section` rule; recommended just after `.section-light`):

```css
/* ============================================================
   Section system — used by all 5 new sections (01–05)
   ============================================================ */

.section-band {
  position: relative;
  padding: var(--section-padding) 0;
}

.section-band > .container {
  position: relative;
}

.section-header {
  display: flex;
  align-items: baseline;
  gap: 24px;
  margin-bottom: 48px;
}

.section-numeral {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 400;
  font-size: clamp(48px, 6vw, 60px);
  line-height: 1;
  color: var(--color-accent);
  opacity: 0.78;
  letter-spacing: -0.02em;
}

.section-header h2 {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(22px, 2.6vw, 28px);
  line-height: 1.15;
  color: var(--color-text);
  letter-spacing: -0.005em;
  margin: 0;
}

.section-header h2 em {
  font-style: italic;
  color: var(--color-primary);
}

/* Small caps label used by product primitives, writing meta, etc. */
.label-smallcaps {
  display: inline-block;
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-secondary);
}

@media (max-width: 980px) {
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    margin-bottom: 36px;
  }
}

@media (max-width: 560px) {
  .section-band {
    padding: var(--section-padding-mobile) 0;
  }
}
```

- [ ] **Step 2 — Verify**

```bash
grep -nE "^\.(section-band|section-header|section-numeral|label-smallcaps)" src/styles.css
```
Expected: 4 matches.

```bash
npm run build 2>&1 | tail -3
```
Expected: clean.

- [ ] **Step 3 — Commit**

```bash
git add src/styles.css
git commit -m "feat(marketing): add section-system CSS (numerals, header, label-smallcaps)"
```

---

## Task 4: Hero CSS

**Files:** Modify `darpan-marketing-site/src/styles.css`

Replace the existing centered hero rules with the new left-aligned hero, dropping the `.hero-emphasis`, `.cta-note`, `.hero-attribution` patterns that the new design doesn't use.

- [ ] **Step 1 — Find and delete the existing `.hero*` rules**

In `src/styles.css`, find and delete:
- `.hero` rule (currently sets `background: var(--color-background); padding: 140px 0 120px;` and possibly more)
- `.hero-inner` rule
- The second `.hero` rule that sets `position: relative; overflow: hidden;`
- `.hero h1` rule
- `.hero-emphasis` rule
- `.hero-headline` rule from the polish pass (currently only has `text-wrap: balance;`)
- `.hero-subhead` rule
- `.hero-cta` rule
- `.hero-attribution` and `.hero-attribution a` rules from the polish pass

Locate via:
```bash
grep -nE "^\.hero" src/styles.css
```

Delete each rule block (from selector through the matching `}`).

- [ ] **Step 2 — Add the new hero rules**

Append to `src/styles.css`:

```css
/* ============================================================
   Section 01 — Hero
   ============================================================ */

.hero {
  position: relative;
  padding: 140px 0 80px;
  overflow: hidden;
}

.hero-inner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  max-width: 880px;
}

.hero-inner > .section-numeral {
  margin-bottom: -8px;
}

.hero-headline {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(34px, 5.2vw, 56px);
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: var(--color-text);
  text-wrap: balance;
  max-width: 22ch;
  margin: 0;
}

.hero-headline em {
  font-style: italic;
  color: var(--color-primary);
}

.hero-cta {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.hero-secondary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text);
  text-decoration: none;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 2px;
  transition: color 150ms var(--ease-out), border-color 150ms var(--ease-out);
}

.hero-secondary:hover {
  color: var(--color-accent);
  border-bottom-color: currentColor;
}

.hero-meta {
  display: block;
  font-family: var(--font-body);
  font-size: 12px;
  letter-spacing: 0.04em;
  color: var(--color-secondary);
  margin-top: 16px;
}

@media (max-width: 760px) {
  .hero {
    padding: 100px 0 64px;
  }
  .hero-inner {
    gap: 24px;
  }
}
```

- [ ] **Step 3 — Verify**

```bash
grep -nE "^\.hero" src/styles.css
```
Expected: `.hero`, `.hero-inner`, `.hero-inner > .section-numeral`, `.hero-headline`, `.hero-headline em`, `.hero-cta`, `.hero-secondary`, `.hero-secondary:hover`, `.hero-meta` — and nothing else with `^\.hero` prefix. The polish-pass `.hero-attribution` and `.hero-emphasis` and `.hero-subhead` should be gone.

```bash
grep -cE "^\.hero-(emphasis|subhead|attribution)" src/styles.css
```
Expected: 0.

```bash
npm run build 2>&1 | tail -3
```
Expected: build may fail HERE because `index.tsx` still references the old hero JSX with `.hero-subhead` etc. That's fine — the next task replaces the hero JSX. Note the failure mode but proceed.

- [ ] **Step 4 — Commit (with build break noted)**

```bash
git add src/styles.css
git commit -m "feat(marketing): rewrite hero CSS to left-aligned editorial pattern

Removes the old centered .hero-emphasis / .hero-subhead / .hero-attribution
patterns. The JSX in index.tsx still references the old classes — build
will be repaired by Task 5 (which replaces the JSX)."
```

---

## Task 5: Create `HeroSection` component

**Files:**
- Create: `darpan-marketing-site/src/components/sections/HeroSection.tsx`

- [ ] **Step 1 — Create the section file**

Create `src/components/sections/HeroSection.tsx`:

```tsx
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react'

export function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="container hero-inner">
        <span className="section-numeral" aria-hidden>01</span>
        <h1 id="hero-heading" className="hero-headline">
          Darpan operates the reconciliation infrastructure for retail.{' '}
          <em>Row by row, across every system.</em>
        </h1>
        <div className="hero-cta">
          <a
            className="btn btn-primary btn-primary-large"
            href="mailto:hello@drpn.ai?subject=Darpan%20walkthrough"
          >
            Request a walkthrough
            <ArrowRight size={18} weight="bold" aria-hidden />
          </a>
          <a className="hero-secondary" href="/customers">
            Read the product brief
            <ArrowUpRight size={14} weight="bold" aria-hidden />
          </a>
        </div>
        <span className="hero-meta">A reconciliation workspace, built in 2026.</span>
      </div>
    </section>
  )
}
```

- [ ] **Step 2 — Verify the file exists**

```bash
ls darpan-marketing-site/src/components/sections/HeroSection.tsx
```
Expected: file exists.

- [ ] **Step 3 — Defer build verification**

The build will still fail because `index.tsx` hasn't been updated to use this component yet. Task 9 wires it up; until then, this file is unused. Skip `npm run build` here.

- [ ] **Step 4 — Commit**

```bash
git add darpan-marketing-site/src/components/sections/HeroSection.tsx
git commit -m "feat(marketing): create HeroSection component (Section 01)"
```

---

## Task 6: Create `ReconciledBySection` component

**Files:**
- Create: `darpan-marketing-site/src/components/sections/ReconciledBySection.tsx`

- [ ] **Step 1 — Create the section file**

```tsx
const reconciledBy = [
  '[Retailer A]',
  '[Retailer B]',
  '[Retailer C]',
  '[Retailer D]',
  '[Retailer E]',
] as const

export function ReconciledBySection() {
  return (
    <section
      className="section-band reconciled-by"
      aria-labelledby="reconciled-heading"
    >
      <div className="container">
        <div className="section-header">
          <span className="section-numeral" aria-hidden>02</span>
          <h2 id="reconciled-heading">Reconciled by retail teams at</h2>
        </div>
        <ul className="logo-row" aria-label="Customer wordmarks">
          {reconciledBy.map((name) => (
            <li key={name} className="logo-wordmark">{name}</li>
          ))}
        </ul>
        <p className="logo-caption">Real wordmarks at launch.</p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2 — Add the logo-row CSS**

Append to `src/styles.css`:

```css
/* ============================================================
   Section 02 — Reconciled by
   ============================================================ */

.logo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 56px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.logo-wordmark {
  font-family: var(--font-display);
  font-weight: 400;
  font-style: italic;
  font-size: 22px;
  letter-spacing: -0.01em;
  color: var(--color-text);
  opacity: 0.55;
}

.logo-caption {
  margin-top: 32px;
  font-family: var(--font-body);
  font-size: 11px;
  letter-spacing: 0.16em;
  color: var(--color-secondary);
  text-transform: uppercase;
}

@media (max-width: 768px) {
  .logo-row {
    gap: 28px;
  }
  .logo-wordmark {
    font-size: 18px;
  }
}
```

- [ ] **Step 3 — Verify**

```bash
ls darpan-marketing-site/src/components/sections/ReconciledBySection.tsx
grep -nE "^\.(logo-row|logo-wordmark|logo-caption)" darpan-marketing-site/src/styles.css
```
Expected: file exists; 3 grep matches.

- [ ] **Step 4 — Commit**

```bash
git add darpan-marketing-site/src/components/sections/ReconciledBySection.tsx \
        darpan-marketing-site/src/styles.css
git commit -m "feat(marketing): create ReconciledBySection (Section 02) + logo-row CSS"
```

---

## Task 7: Create `ProductSection` component

**Files:**
- Create: `darpan-marketing-site/src/components/sections/ProductSection.tsx`

- [ ] **Step 1 — Create the section file**

```tsx
type Primitive = {
  label: string
  headline: string
  body: string
}

const primitives: readonly Primitive[] = [
  {
    label: 'I. Schema',
    headline: 'You describe the source data once.',
    body: 'Field names, types, the keys that anchor each record. Darpan uses them to pair every line across every connected system.',
  },
  {
    label: 'II. Compare',
    headline: 'Records pair line by line. Mismatches surface with the rows behind them.',
    body: 'No spreadsheet pile-up. Variance, missing-object, and resolved-pair classifications come out of one run, with the source line attached to every call.',
  },
] as const

export function ProductSection() {
  return (
    <section
      id="product"
      className="section-band product"
      aria-labelledby="product-heading"
    >
      <div className="container">
        <div className="section-header">
          <span className="section-numeral" aria-hidden>03</span>
          <h2 id="product-heading">The product, written down to its primitives</h2>
        </div>
        <ol className="product-list">
          {primitives.map((p) => (
            <li className="product-primitive" key={p.label}>
              <span className="product-label label-smallcaps">{p.label}</span>
              <h3 className="product-headline">{p.headline}</h3>
              <p className="product-body">{p.body}</p>
            </li>
          ))}
        </ol>
        <p className="product-coda">
          <span className="product-coda-label label-smallcaps">III. Evidence</span>
          <span aria-hidden> · </span>
          the saved run, the rules applied, the row-level trail. Sign on what’s there.
        </p>
      </div>
    </section>
  )
}
```

(Note the curly apostrophe `’` in "what’s there.")

- [ ] **Step 2 — Add the product CSS**

Append to `src/styles.css`:

```css
/* ============================================================
   Section 03 — The product
   ============================================================ */

.product-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.product-primitive {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 24px;
  align-items: baseline;
  padding: 32px 0;
  border-top: 1px solid rgba(42, 31, 26, 0.18);
}

.product-primitive:first-child {
  border-top: 1px solid rgba(42, 31, 26, 0.18);
}

.product-label {
  align-self: start;
  padding-top: 4px;
}

.product-headline {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 400;
  font-size: 20px;
  line-height: 1.25;
  color: var(--color-primary);
  margin: 0 0 12px 0;
  max-width: 36em;
}

.product-body {
  font-family: var(--font-body);
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-text);
  margin: 0;
  max-width: 60ch;
}

.product-coda {
  margin-top: 0;
  padding: 28px 0;
  border-top: 1px solid rgba(42, 31, 26, 0.18);
  font-family: var(--font-body);
  font-size: 13px;
  line-height: 1.6;
  color: var(--color-text);
}

.product-coda-label {
  margin-right: 4px;
}

@media (max-width: 760px) {
  .product-primitive {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 28px 0;
  }
  .product-headline {
    font-size: 18px;
  }
}
```

- [ ] **Step 3 — Verify**

```bash
ls darpan-marketing-site/src/components/sections/ProductSection.tsx
grep -nE "^\.(product-list|product-primitive|product-label|product-headline|product-body|product-coda)" darpan-marketing-site/src/styles.css
```
Expected: file exists; 6 grep matches.

- [ ] **Step 4 — Commit**

```bash
git add darpan-marketing-site/src/components/sections/ProductSection.tsx \
        darpan-marketing-site/src/styles.css
git commit -m "feat(marketing): create ProductSection (Section 03) + product CSS"
```

---

## Task 8: Create `WorkSection` component

**Files:**
- Create: `darpan-marketing-site/src/components/sections/WorkSection.tsx`

- [ ] **Step 1 — Create the section file**

```tsx
export function WorkSection() {
  return (
    <section
      className="section-band work"
      aria-labelledby="work-heading"
    >
      <div className="container">
        <div className="section-header">
          <span className="section-numeral" aria-hidden>04</span>
          <h2 id="work-heading">The work, written down</h2>
        </div>
        <div className="manifesto">
          <p className="manifesto-body">
            Every retail business runs on systems that don’t agree. Inventory
            in the WMS, revenue in the POS, returns in commerce, ledger in the
            ERP. Reconciliation is the work that makes them agree — usually by
            hand, mostly in spreadsheets, always late.
          </p>
          <p className="manifesto-close">
            Darpan is the infrastructure that makes it the system’s job.
          </p>
        </div>
        <p className="work-coda">
          A 2026 reconciliation engine.{' '}
          <span aria-hidden> · </span>
          Built on schema, the keys that anchor records, and the row-level trail.
        </p>
      </div>
    </section>
  )
}
```

(Note the curly apostrophes in "don’t" and "system’s." The em-dash in the manifesto is intentional per the spec — the manifesto is the single approved exception to the no-em-dashes voice rule.)

- [ ] **Step 2 — Add the work / manifesto CSS**

Append to `src/styles.css`:

```css
/* ============================================================
   Section 04 — The work (manifesto)
   ============================================================ */

.manifesto {
  max-width: 760px;
}

.manifesto-body {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(18px, 1.9vw, 22px);
  line-height: 1.45;
  color: var(--color-text);
  letter-spacing: -0.005em;
  margin: 0;
}

.manifesto-close {
  margin-top: 28px;
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 400;
  font-size: clamp(18px, 1.9vw, 22px);
  line-height: 1.4;
  color: var(--color-primary);
  letter-spacing: -0.005em;
}

.work-coda {
  margin-top: 56px;
  padding-top: 24px;
  border-top: 1px solid rgba(42, 31, 26, 0.18);
  font-family: var(--font-body);
  font-size: 12px;
  letter-spacing: 0.04em;
  color: var(--color-secondary);
}
```

- [ ] **Step 3 — Verify**

```bash
ls darpan-marketing-site/src/components/sections/WorkSection.tsx
grep -nE "^\.(manifesto|manifesto-body|manifesto-close|work-coda)" darpan-marketing-site/src/styles.css
```
Expected: file exists; 4 grep matches.

- [ ] **Step 4 — Commit**

```bash
git add darpan-marketing-site/src/components/sections/WorkSection.tsx \
        darpan-marketing-site/src/styles.css
git commit -m "feat(marketing): create WorkSection (Section 04) + manifesto CSS"
```

---

## Task 9: Create writing data + `WritingSection` component

**Files:**
- Create: `darpan-marketing-site/src/data/writing-entries.ts`
- Create: `darpan-marketing-site/src/components/sections/WritingSection.tsx`

- [ ] **Step 1 — Create `src/data/writing-entries.ts`**

```ts
export type WritingEntry = {
  slug: string
  date: string
  category: string
  title: string
  meta: string
}

export const writingEntries: readonly WritingEntry[] = [
  {
    slug: 'why-reconciliation-belongs-at-the-data-layer',
    date: 'APR 12, 2026',
    category: 'Engineering notes',
    title:
      'Why reconciliation belongs at the data layer, not the spreadsheet layer.',
    meta: '6 min read',
  },
  {
    slug: 'the-cost-of-variance-you-cant-see',
    date: 'MAR 28, 2026',
    category: 'Operations',
    title: 'The cost of variance you can’t see: inventory, revenue, returns.',
    meta: '5 min read',
  },
  {
    slug: 'what-we-mean-when-we-say-primary-id',
    date: 'MAR 14, 2026',
    category: 'Product',
    title: 'What we mean when we say “primary ID.”',
    meta: '4 min read',
  },
] as const
```

(Note curly quotes in "can’t" and "“primary ID.”")

- [ ] **Step 2 — Create the section component**

`src/components/sections/WritingSection.tsx`:

```tsx
import { writingEntries } from '@/data/writing-entries'

export function WritingSection() {
  return (
    <section
      id="writing"
      className="section-band writing"
      aria-labelledby="writing-heading"
    >
      <div className="container">
        <div className="section-header">
          <span className="section-numeral" aria-hidden>05</span>
          <h2 id="writing-heading">Writing — notes from the team</h2>
        </div>
        <ul className="writing-list">
          {writingEntries.map((entry) => (
            <li key={entry.slug} className="writing-entry">
              <span className="writing-meta label-smallcaps">
                {entry.date}
                <span aria-hidden> · </span>
                {entry.category}
              </span>
              <h3 className="writing-title">
                <a href={`/writing/${entry.slug}`}>{entry.title}</a>
              </h3>
              <span className="writing-detail">{entry.meta}</span>
            </li>
          ))}
        </ul>
        <a className="writing-all" href="/writing">
          All writing →
        </a>
      </div>
    </section>
  )
}
```

- [ ] **Step 3 — Add writing CSS**

Append to `src/styles.css`:

```css
/* ============================================================
   Section 05 — Writing
   ============================================================ */

.writing-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.writing-entry {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 28px 0;
  border-top: 1px solid rgba(42, 31, 26, 0.18);
}

.writing-meta {
  margin: 0;
}

.writing-title {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(18px, 1.9vw, 22px);
  line-height: 1.25;
  color: var(--color-text);
  letter-spacing: -0.005em;
  margin: 0;
  max-width: 720px;
}

.writing-title a {
  color: inherit;
  text-decoration: none;
  transition: color 150ms var(--ease-out);
}

.writing-title a:hover {
  color: var(--color-accent);
}

.writing-detail {
  font-family: var(--font-body);
  font-size: 12px;
  letter-spacing: 0.04em;
  color: var(--color-secondary);
}

.writing-all {
  display: inline-block;
  margin-top: 36px;
  font-family: var(--font-display);
  font-style: italic;
  font-size: 14px;
  color: var(--color-primary);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 150ms var(--ease-out);
}

.writing-all:hover {
  border-bottom-color: var(--color-primary);
}

.writing-entry:last-of-type {
  border-bottom: 1px solid rgba(42, 31, 26, 0.18);
}
```

- [ ] **Step 4 — Verify**

```bash
ls darpan-marketing-site/src/data/writing-entries.ts \
   darpan-marketing-site/src/components/sections/WritingSection.tsx
grep -nE "^\.(writing-list|writing-entry|writing-meta|writing-title|writing-detail|writing-all)" darpan-marketing-site/src/styles.css
```
Expected: both files exist; 6 grep matches.

- [ ] **Step 5 — Commit**

```bash
git add darpan-marketing-site/src/data/writing-entries.ts \
        darpan-marketing-site/src/components/sections/WritingSection.tsx \
        darpan-marketing-site/src/styles.css
git commit -m "feat(marketing): create writing data + WritingSection (Section 05)"
```

---

## Task 10: Rewrite the Home component in `index.tsx`

**Files:** Modify `darpan-marketing-site/src/routes/index.tsx`

Replace all old section components with imports + composition of the new sections. This is the largest single change — it removes ~200 lines and adds ~30.

- [ ] **Step 1 — Replace the imports block at the top of `index.tsx`**

The current top of `src/routes/index.tsx` imports several Phosphor icons used only by the old sections. Replace lines 1-9 (the entire Phosphor import block) with the imports the new file needs:

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { MobileMenu } from '@/components/MobileMenu'
import { HeroSection } from '@/components/sections/HeroSection'
import { ReconciledBySection } from '@/components/sections/ReconciledBySection'
import { ProductSection } from '@/components/sections/ProductSection'
import { WorkSection } from '@/components/sections/WorkSection'
import { WritingSection } from '@/components/sections/WritingSection'
import { LinkedinLogo } from '@phosphor-icons/react'
```

(The `LinkedinLogo` is still used by the footer. `ArrowRight`, `CheckCircle`, `GitBranch`, `MagnifyingGlass`, and any other Phosphor icons used only by the deleted sections are gone.)

The existing `MobileMenu` import line may already exist near the top — make sure only one remains.

The existing `createFileRoute` import stays.

- [ ] **Step 2 — Update the `navItems` constant**

Find the `export const navItems` declaration (around line 15-19). Replace its content:

```tsx
export const navItems = [
  ['Product', '#product'],
  ['Customers', '/customers'],
  ['Writing', '/writing'],
] as const
```

(Drops the previous `How it works` / `Who it's for` / `Insights` entries since those sections are gone.)

- [ ] **Step 3 — Delete the data constants**

Delete these constant declarations entirely (they were used by the deleted sections):
- `stats` array
- `steps` array
- `personas` array
- `insights` array

Run:
```bash
grep -nE "^const (stats|steps|personas|insights) " src/routes/index.tsx
```
Expected after the delete: 0 matches.

- [ ] **Step 4 — Replace the `Home` component**

Find the `function Home()` declaration (and the route export above it). The route export stays:

```tsx
export const Route = createFileRoute('/')({
  component: Home,
})
```

Replace the `Home` function body with:

```tsx
function Home() {
  return (
    <main className="site-shell">
      <SiteHeader />
      <HeroSection />
      <ReconciledBySection />
      <ProductSection />
      <WorkSection />
      <WritingSection />
      <SiteFooter />
    </main>
  )
}
```

- [ ] **Step 5 — Delete the old section function components**

Below `Home`, delete all of these function declarations (they're now unused):
- `function HeroSection() { ... }` (the OLD one in `index.tsx`; we now import the new one from `@/components/sections/HeroSection`)
- `function HeroSquiggle() { ... }` (if any reference remains from polish-pass)
- `function PainSection() { ... }`
- `function HowItWorksSection() { ... }`
- `function PersonasSection() { ... }`
- `function InsightsSection() { ... }`
- `function FinalCtaSection() { ... }`

Keep:
- `function SiteHeader() { ... }` — but Task 11 updates its contents.
- `function SiteFooter() { ... }` — unchanged from Task 10 of the polish pass.

- [ ] **Step 6 — Verify**

```bash
grep -cE "^function (HeroSection|HeroSquiggle|PainSection|HowItWorksSection|PersonasSection|InsightsSection|FinalCtaSection)\b" darpan-marketing-site/src/routes/index.tsx
```
Expected: 0.

```bash
grep -cE "^const (stats|steps|personas|insights) " darpan-marketing-site/src/routes/index.tsx
```
Expected: 0.

```bash
grep -nE "from '@/components/sections/" darpan-marketing-site/src/routes/index.tsx
```
Expected: 5 lines (Hero, ReconciledBy, Product, Work, Writing).

```bash
cd darpan-marketing-site
npm run build 2>&1 | tail -10
```
Expected: clean build. This is the FIRST task in the redesign where the build should succeed.

- [ ] **Step 7 — Commit**

```bash
git add darpan-marketing-site/src/routes/index.tsx
git commit -m "feat(marketing): rewrite Home to compose new section components"
```

---

## Task 11: Update `SiteHeader` (drop duplicate CTA, update nav)

**Files:** Modify `darpan-marketing-site/src/routes/index.tsx` (`SiteHeader` function body)

- [ ] **Step 1 — Replace `SiteHeader` body**

Find the `function SiteHeader()` declaration. Replace its body:

```tsx
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
        <MobileMenu />
      </div>
    </header>
  )
}
```

Differences vs. the polish-pass header:
- The `<a className="btn btn-primary site-header-cta">` pill CTA is removed (the hero owns the CTA now).
- `<MobileMenu />` stays.
- `navItems` already updated in Task 10.

- [ ] **Step 2 — Remove the orphan CSS rules**

In `src/styles.css`, find and delete:
```css
.site-header-cta {
  /* ... */
}
```
And any `@media (max-width: 560px) { .site-header-cta { display: none; } }` rule (the rule lives inside the existing `@media (max-width: 560px)` block — just remove the single line).

- [ ] **Step 3 — Verify**

```bash
grep -c "site-header-cta" darpan-marketing-site/src/routes/index.tsx
grep -c "site-header-cta" darpan-marketing-site/src/styles.css
```
Expected: both 0.

```bash
npm run build 2>&1 | tail -3
```
Expected: clean.

- [ ] **Step 4 — Commit**

```bash
git add darpan-marketing-site/src/routes/index.tsx \
        darpan-marketing-site/src/styles.css
git commit -m "feat(marketing): drop duplicate header CTA; nav points to new sections"
```

---

## Task 12: Delete dead CSS for the removed sections

**Files:** Modify `darpan-marketing-site/src/styles.css`

Now that no JSX references the old patterns, scrub all related CSS for cleanliness. (We left them lying around through Task 11 to avoid noisy diffs; consolidating the cleanup here is intentional.)

- [ ] **Step 1 — Delete sections-no-longer-rendered**

In `src/styles.css`, find and DELETE the following rule blocks (anywhere they appear):
- `.steps-flow`, `.steps-flow::before`, `.step-node`, `.step-node .step-index`, `.step-node .step-icon`, `.step-node h3`, `.step-node p`, plus any `@media` overrides for these.
- `.persona-columns`, `.persona-columns > .persona-column + .persona-column`, `.persona-column`, `.persona-column .persona-role`, `.persona-column h3`, `.persona-column p`, plus any media overrides.
- `.pain-grid`, `.pain-copy`, `.pain-copy p`, `.stat-list`, `.stat-block`, `.stat-number`, `.stat-label`, plus media overrides.
- `.insights-grid`, `.insight-card`, `.insight-body`, `.insight-tag`, `.insight-meta`, plus media overrides.
- `.final-cta`, `.final-cta-inner`, `.final-cta-body`, `.final-cta-note`, `.final-cta .btn-accent`, `.final-cta .btn-accent:hover`, `.final-cta .text-script` (if present).
- `.text-script`, `.section-dark .text-script` (if present).
- `.ps-note`.
- `.cta-note`.
- `.section-header-block` (was the polish-pass header wrapper; superseded by `.section-header`).

- [ ] **Step 2 — Verify the page still builds**

```bash
cd darpan-marketing-site
npm run build 2>&1 | tail -3
```
Expected: clean.

- [ ] **Step 3 — Verify the deletions are complete**

```bash
grep -cE "^\.(steps-flow|step-node|persona-columns|persona-column|pain-grid|pain-copy|stat-list|stat-block|stat-number|stat-label|insights-grid|insight-card|insight-body|insight-tag|insight-meta|final-cta|text-script|ps-note|cta-note|section-header-block)" src/styles.css
```
Expected: 0.

- [ ] **Step 4 — Commit**

```bash
git add darpan-marketing-site/src/styles.css
git commit -m "feat(marketing): delete CSS for removed sections (steps/persona/pain/insight/final-cta)"
```

---

## Task 13: Create `/customers` route

**Files:**
- Create: `darpan-marketing-site/src/routes/customers.tsx`

- [ ] **Step 1 — Create the route**

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { ArrowRight } from '@phosphor-icons/react'

export const Route = createFileRoute('/customers')({
  component: CustomersPage,
  head: () => ({
    meta: [{ title: 'Customers — Darpan' }],
  }),
})

const reconciledBy = [
  '[Retailer A]',
  '[Retailer B]',
  '[Retailer C]',
  '[Retailer D]',
  '[Retailer E]',
] as const

function CustomersPage() {
  return (
    <main className="legal-page section-band">
      <div className="container legal-container">
        <span className="label-smallcaps">02 · Customers</span>
        <h1>Reconciled by retail teams.</h1>
        <p>
          Darpan is in deployment with a small set of corporate retail finance
          and operations teams. Real customer wordmarks land here at general
          availability. Until then, here is the shape.
        </p>
        <ul className="logo-row" aria-label="Customer wordmarks">
          {reconciledBy.map((name) => (
            <li key={name} className="logo-wordmark">{name}</li>
          ))}
        </ul>
        <p className="logo-caption">Real wordmarks at launch.</p>
        <p style={{ marginTop: 48 }}>
          <a
            className="btn btn-primary"
            href="mailto:hello@drpn.ai?subject=Darpan%20walkthrough"
          >
            Request a walkthrough
            <ArrowRight size={16} weight="bold" aria-hidden />
          </a>
        </p>
      </div>
    </main>
  )
}
```

- [ ] **Step 2 — Verify**

```bash
ls darpan-marketing-site/src/routes/customers.tsx
cd darpan-marketing-site && npm run build 2>&1 | tail -5
```
Expected: file exists; clean build (the TanStack Router plugin regenerates `routeTree.gen.ts` to include `/customers`).

- [ ] **Step 3 — Commit**

```bash
git add darpan-marketing-site/src/routes/customers.tsx \
        darpan-marketing-site/src/routeTree.gen.ts
git commit -m "feat(marketing): create /customers placeholder route"
```

---

## Task 14: Create `/writing` index route

**Files:**
- Create: `darpan-marketing-site/src/routes/writing.tsx`

- [ ] **Step 1 — Create the route**

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { writingEntries } from '@/data/writing-entries'

export const Route = createFileRoute('/writing')({
  component: WritingIndexPage,
  head: () => ({
    meta: [{ title: 'Writing — Darpan' }],
  }),
})

function WritingIndexPage() {
  return (
    <main className="legal-page section-band">
      <div className="container legal-container">
        <span className="label-smallcaps">05 · Writing</span>
        <h1>Notes from the team.</h1>
        <p>
          Working notes on reconciliation, retail data, and how the books close
          when they do. New entries land as we have something worth writing
          down.
        </p>
        <ul className="writing-list" style={{ marginTop: 48 }}>
          {writingEntries.map((entry) => (
            <li key={entry.slug} className="writing-entry">
              <span className="writing-meta label-smallcaps">
                {entry.date}
                <span aria-hidden> · </span>
                {entry.category}
              </span>
              <h3 className="writing-title">
                <a href={`/writing/${entry.slug}`}>{entry.title}</a>
              </h3>
              <span className="writing-detail">{entry.meta}</span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
```

- [ ] **Step 2 — Verify**

```bash
ls darpan-marketing-site/src/routes/writing.tsx
cd darpan-marketing-site && npm run build 2>&1 | tail -5
```
Expected: file exists; clean build (route auto-registered).

- [ ] **Step 3 — Commit**

```bash
git add darpan-marketing-site/src/routes/writing.tsx \
        darpan-marketing-site/src/routeTree.gen.ts
git commit -m "feat(marketing): create /writing index route"
```

---

## Task 15: Create `/writing/$slug` dynamic route + one stub post

**Files:**
- Create: `darpan-marketing-site/src/routes/writing/$slug.tsx`

- [ ] **Step 1 — Create the dynamic route**

Create the directory and file. From the wrapper root:

```bash
mkdir -p darpan-marketing-site/src/routes/writing
```

Then write `darpan-marketing-site/src/routes/writing/$slug.tsx`:

```tsx
import { createFileRoute, useParams } from '@tanstack/react-router'
import { writingEntries } from '@/data/writing-entries'

export const Route = createFileRoute('/writing/$slug')({
  component: WritingPostPage,
  head: ({ params }) => ({
    meta: [
      {
        title:
          writingEntries.find((e) => e.slug === params.slug)?.title ??
          'Writing — Darpan',
      },
    ],
  }),
})

function WritingPostPage() {
  const { slug } = useParams({ from: '/writing/$slug' })
  const entry = writingEntries.find((e) => e.slug === slug)

  if (slug === 'why-reconciliation-belongs-at-the-data-layer') {
    return (
      <main className="legal-page section-band">
        <article className="container legal-container">
          <span className="label-smallcaps">
            {entry?.date}
            <span aria-hidden> · </span>
            {entry?.category}
          </span>
          <h1>{entry?.title ?? 'Writing'}</h1>
          <p>
            Most retail finance teams treat reconciliation as a spreadsheet
            problem. They export from each system, paste into Excel, write
            VLOOKUPs, and call the result reconciled. The output is a
            workbook nobody else can read. The trail is in cell comments.
          </p>
          <p>
            Reconciliation is a data-layer problem. Two systems disagree about
            the same record because they're tracking it independently. The
            answer is to compare the records by their shared key, classify the
            difference, and keep the row-level evidence. The spreadsheet pile
            is what happens when no system is responsible for that work.
          </p>
          <p>
            Darpan is responsible for that work. The schema describes the
            shape of each source. The compare step pairs records by primary
            ID. The evidence is the saved run, the rules applied, the
            row-level trail. Nothing about that needs to happen in a
            workbook.
          </p>
          <p>
            <em>
              Sign on what's there.
            </em>
          </p>
          <p style={{ marginTop: 56 }}>
            <a className="writing-all" href="/writing">
              ← All writing
            </a>
          </p>
        </article>
      </main>
    )
  }

  return (
    <main className="legal-page section-band">
      <article className="container legal-container">
        <span className="label-smallcaps">
          {entry?.date ?? ''}
          {entry?.date ? <span aria-hidden> · </span> : null}
          {entry?.category ?? 'Writing'}
        </span>
        <h1>{entry?.title ?? 'Post coming soon'}</h1>
        <p>
          This entry is being prepared. Check back, or see{' '}
          <a href="/writing">all writing</a>.
        </p>
      </article>
    </main>
  )
}
```

- [ ] **Step 2 — Verify**

```bash
ls darpan-marketing-site/src/routes/writing/\$slug.tsx
cd darpan-marketing-site && npm run build 2>&1 | tail -8
```
Expected: file exists; clean build with new chunk for `/writing/$slug` in the output.

- [ ] **Step 3 — Commit**

```bash
git add darpan-marketing-site/src/routes/writing/\$slug.tsx \
        darpan-marketing-site/src/routeTree.gen.ts
git commit -m "feat(marketing): create /writing/\$slug dynamic route + first post"
```

---

## Task 16: Add load + scroll motion choreography

**Files:** Modify `darpan-marketing-site/src/styles.css`

Plan: rule-draw on initial load (top hairline of each `.section-band` draws left-to-right via a CSS keyframe), and scroll-triggered reveal (sections fade their numeral + headline as they enter viewport via an IntersectionObserver). Both gated by `prefers-reduced-motion`.

For simplicity and zero JS-framework cost, we use:
- CSS-only animation on the section header (numeral + title): subtle 240ms opacity fade-in driven by a single class toggle from IntersectionObserver.
- Pure-CSS keyframe animation on the first section's header on initial page load (so the hero animates without needing an observer).

- [ ] **Step 1 — Add the keyframes and the entrance rules**

Append to `src/styles.css`:

```css
/* ============================================================
   Motion — entrance choreography
   ============================================================ */

@keyframes section-fade-in {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-band .section-header,
.hero .section-numeral,
.hero .hero-headline,
.hero .hero-cta,
.hero .hero-meta {
  animation: section-fade-in 560ms var(--ease-out) both;
}

.hero .hero-headline { animation-delay: 80ms; }
.hero .hero-cta { animation-delay: 160ms; }
.hero .hero-meta { animation-delay: 240ms; }

.section-band[data-revealed='false'] .section-header,
.section-band[data-revealed='false'] > .container > :not(.section-header) {
  opacity: 0;
  transform: translateY(6px);
}

.section-band[data-revealed='true'] .section-header,
.section-band[data-revealed='true'] > .container > :not(.section-header) {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 480ms var(--ease-out), transform 480ms var(--ease-out);
}

@media (prefers-reduced-motion: reduce) {
  .section-band .section-header,
  .hero .section-numeral,
  .hero .hero-headline,
  .hero .hero-cta,
  .hero .hero-meta {
    animation: none;
  }
  .section-band[data-revealed='false'] .section-header,
  .section-band[data-revealed='false'] > .container > :not(.section-header),
  .section-band[data-revealed='true'] .section-header,
  .section-band[data-revealed='true'] > .container > :not(.section-header) {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

- [ ] **Step 2 — Wire the IntersectionObserver in the home route**

In `src/routes/index.tsx`, at the top of the `Home` function, add:

```tsx
import { useEffect } from 'react'

// ... (existing imports above)

function Home() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-revealed', 'true')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' },
    )

    document.querySelectorAll('.section-band').forEach((node) => {
      node.setAttribute('data-revealed', 'false')
      observer.observe(node)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <main className="site-shell">
      <SiteHeader />
      <HeroSection />
      <ReconciledBySection />
      <ProductSection />
      <WorkSection />
      <WritingSection />
      <SiteFooter />
    </main>
  )
}
```

Hoist the `import { useEffect } from 'react'` to the top of the existing import block.

- [ ] **Step 3 — Verify**

```bash
grep -nE "data-revealed" darpan-marketing-site/src/styles.css darpan-marketing-site/src/routes/index.tsx
```
Expected: matches in both files.

```bash
cd darpan-marketing-site && npm run build 2>&1 | tail -3
```
Expected: clean.

- [ ] **Step 4 — Commit**

```bash
git add darpan-marketing-site/src/routes/index.tsx \
        darpan-marketing-site/src/styles.css
git commit -m "feat(marketing): add section-entrance motion (CSS + IO, reduced-motion gated)"
```

---

## Task 17: Mobile responsive sweep + small fixes

**Files:** Modify `darpan-marketing-site/src/styles.css`

Some responsive rules were left implicit. This task makes them explicit and consolidates.

- [ ] **Step 1 — Audit the existing `@media` blocks**

```bash
grep -nE "^@media" darpan-marketing-site/src/styles.css
```

Confirm three blocks exist: `(max-width: 980px)`, `(max-width: 760px)`, `(max-width: 560px)`, plus the `prefers-reduced-motion` block.

- [ ] **Step 2 — Confirm section-band padding scales at narrow widths**

Inside the `(max-width: 560px)` block, ensure:
```css
@media (max-width: 560px) {
  :root { --gutter: var(--gutter-mobile); }
  .section-band {
    padding: var(--section-padding-mobile) 0;
  }
  /* ... existing rules ... */
}
```

If `.section-band { padding: var(--section-padding-mobile) 0; }` is already there from Task 3, leave it. Otherwise add it.

- [ ] **Step 3 — Confirm `.hero` mobile padding is present**

The hero already has a `(max-width: 760px)` mobile padding rule from Task 4. Verify with:
```bash
awk '/^@media \(max-width: 760px\)/,/^}/' darpan-marketing-site/src/styles.css | grep -A 1 "^  \.hero "
```
Expected: shows `padding: 100px 0 64px;` inside the 760px block. If missing, add it to the existing `(max-width: 760px)` block.

- [ ] **Step 4 — Confirm `.section-header` collapses to column at 980px**

Verify with:
```bash
awk '/^@media \(max-width: 980px\)/,/^}/' darpan-marketing-site/src/styles.css | grep -A 3 "\.section-header"
```
Expected: shows `flex-direction: column;` etc. (added in Task 3).

- [ ] **Step 5 — Build**

```bash
cd darpan-marketing-site && npm run build 2>&1 | tail -3
```
Expected: clean.

- [ ] **Step 6 — Commit (only if anything changed)**

```bash
git add darpan-marketing-site/src/styles.css
git commit -m "feat(marketing): consolidate responsive rules for new sections" --allow-empty
```

(Use `--allow-empty` if nothing changed — preserves the task boundary in history.)

---

## Task 18: Final cross-route browser walk

**Files:** No code change. Pure verification.

Run a Playwright walk across all four routes at three widths each. Compare against the spec for the hero + each section.

- [ ] **Step 1 — Ensure Playwright is installed**

```bash
ls /tmp/playwright-test/node_modules/playwright >/dev/null 2>&1 && echo "playwright installed" || (cd /tmp && mkdir -p playwright-test && cd playwright-test && npm init -y >/dev/null && npm i playwright && npx playwright install chromium)
```

- [ ] **Step 2 — Start the dev server**

```bash
cd darpan-marketing-site
lsof -ti:3000 | xargs -r kill -9 2>/dev/null
npm run dev > /tmp/marketing-dev.log 2>&1 &
for i in $(seq 1 20); do
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 2 http://localhost:3000)
  if [ "$code" = "200" ]; then echo "ready"; break; fi
  sleep 1
done
```

Expected: `ready` printed within 20s.

- [ ] **Step 3 — Run the walk script**

Write `/tmp/playwright-test/walk-redesign.mjs`:

```js
import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

const OUT = '/tmp/marketing-redesign-walk'
await mkdir(OUT, { recursive: true })

const browser = await chromium.launch()
const viewports = [
  { name: 'desktop-1280', width: 1280, height: 900,  isMobile: false, dsf: 1 },
  { name: 'tablet-768',   width: 768,  height: 1024, isMobile: false, dsf: 1 },
  { name: 'mobile-375',   width: 375,  height: 800,  isMobile: true,  dsf: 2 },
]
const routes = [
  { path: '/',                                                          slug: 'home' },
  { path: '/customers',                                                 slug: 'customers' },
  { path: '/writing',                                                   slug: 'writing-index' },
  { path: '/writing/why-reconciliation-belongs-at-the-data-layer',      slug: 'writing-post-1' },
  { path: '/writing/some-nonexistent-slug',                             slug: 'writing-post-stub' },
]

for (const vp of viewports) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.dsf,
    isMobile: vp.isMobile,
    hasTouch: vp.isMobile,
  })
  const page = await ctx.newPage()
  for (const r of routes) {
    await page.goto(`http://localhost:3000${r.path}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(600)
    await page.screenshot({ path: `${OUT}/${r.slug}-${vp.name}.png`, fullPage: true })
    console.log(`saved ${r.slug}-${vp.name}.png`)
  }
  await ctx.close()
}

// Hero spot check at mobile 375
const ctx = await browser.newContext({
  viewport: { width: 375, height: 800 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
})
const page = await ctx.newPage()
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' })
await page.waitForTimeout(2500)
const hero = await page.evaluate(() => {
  const h = document.getElementById('hero-heading')
  const num = document.querySelector('.hero .section-numeral')
  return {
    headlineText: h?.textContent,
    numeralText: num?.textContent,
    triggerVisible: !!document.querySelector('.mobile-menu-trigger'),
  }
})
console.log(JSON.stringify(hero, null, 2))

await ctx.close()
await browser.close()
```

Run it:
```bash
cd /tmp/playwright-test && node walk-redesign.mjs
```

Expected output: 15 screenshots saved (5 routes × 3 viewports); the JSON dump at the end shows the hero headline starts with "Darpan operates the reconciliation infrastructure for retail." and the numeral reads "01".

- [ ] **Step 4 — Inspect the screenshots**

Open `/tmp/marketing-redesign-walk/home-desktop-1280.png` and verify:
- The `01` numeral appears in italic display rust on the left
- The hero headline reads on three lines, left-aligned, with "Row by row, across every system." in italic rust on the third line
- Below the CTA pill, the secondary "Read the product brief ↗" link
- "A reconciliation workspace, built in 2026." footer-line
- Notebook lines (horizontal rules every 32px) visible faintly behind everything
- Vertical rust margin line on the left at the gutter
- Section `02 Reconciled by retail teams at` follows with the placeholder wordmark row
- Section `03 The product, written down to its primitives` with Schema · Compare · Evidence
- Section `04 The work, written down` with the manifesto paragraph and the italic-rust closing line
- Section `05 Writing — notes from the team` with three entry rows

Open `/tmp/marketing-redesign-walk/home-mobile-375.png` and verify:
- Hero scales down via clamp
- Hamburger trigger visible top-right
- Section numerals stack above titles (column layout)
- All sections render

Open `/tmp/marketing-redesign-walk/customers-desktop-1280.png`, `/tmp/marketing-redesign-walk/writing-index-desktop-1280.png`, `/tmp/marketing-redesign-walk/writing-post-1-desktop-1280.png` and verify each renders without errors.

- [ ] **Step 5 — Stop the dev server**

```bash
lsof -ti:3000 | xargs -r kill -9 2>/dev/null
```

- [ ] **Step 6 — Commit (verification only, no code)**

```bash
cd darpan-marketing-site
git commit --allow-empty -m "verify(marketing): cross-route browser walk at 375/768/1280

15 screenshots captured at /tmp/marketing-redesign-walk/. Hero headline
verified via DOM scrape. Mobile hamburger trigger visible at 375px (the
Task 1 + portal-fix mechanism preserved through redesign)."
```

---

## Post-implementation summary

After all 18 tasks land:

- The homepage renders the 5-section editorial spread (Hero · Reconciled by · The product · The work · Writing).
- The notebook-paper background is live on every page (homepage + customers + writing index + writing posts) since it's on `.site-shell`.
- Three new routes ship as placeholders: `/customers`, `/writing`, `/writing/$slug` (with one real post and a stub fallback for unknown slugs).
- The 11 polish-pass fixes remain intact (mobile nav with portal, contrast tokens, footer Privacy/Terms routes, em-dash sweep where applicable, etc.).
- Build is clean; TypeScript is clean.
- Browser-walked at 375 / 768 / 1280 across all four routes.

## Out-of-scope follow-ups

These were deferred during brainstorming and stay deferred:

- **Real customer wordmarks.** Section 02 and `/customers` both ship with placeholder strings.
- **More writing posts.** Only the first slug has real content; others use the stub fallback.
- **Real `/customers` case studies.** Page is a placeholder paragraph.
- **`/careers` page.** Nav slot reserved but not built.
- **Real privacy and terms policy copy.** Existing Task 10 placeholders stay.
- **Test infrastructure (vitest + RTL).** Browser walk is the verification mechanism for this redesign.
- **A11y deep audit beyond contrast.** The polish-pass shipped the WCAG-AA contrast fixes. New components inherit from the token system but a comprehensive a11y audit is a separate spec.

---

## Self-review (run mentally against the spec before handing off)

- **Spec coverage.** Every section in the spec (§§ 1-5) maps to one or more tasks above. Hero (§2.1) → Tasks 4-5. Page structure (§2.2) → Tasks 5-15. Section copy (§2.3) → embedded verbatim in each section component. Voice rules (§2.4) → encoded in copy + em-dash exception noted in Task 8. Background pattern (§2.5) → Task 2. Design system (§2.6) → Tasks 1, 3, and per-section CSS. Motion (§2.7) → Task 16. IA (§2.8) → Tasks 11-15. Mobile (§2.9) → Tasks 3, 4, 6, 7, 17.
- **Placeholder scan.** No "TBD" / "TODO" / "fill in details" anywhere. Where placeholders are intentional (customer wordmarks, post stubs), they're flagged as such in the task and reflected in the out-of-scope list.
- **Type consistency.** All section component names match between Task 10's imports and the per-section task names. The `writingEntries` data file is referenced by `WritingSection`, `/writing/index`, and `/writing/$slug` — all use the same import path.
- **No code-step skipped.** Every step that says "Add this" / "Replace with" includes the exact code.

Plan complete and saved to `darpan-marketing-site/docs/superpowers/plans/2026-05-29-marketing-redesign-build.md`.
