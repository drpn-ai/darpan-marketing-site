# Darpan Marketing Site — Redesign Concept Spec

> **Date:** 2026-05-29
> **Status:** Approved, ready for implementation planning
> **Scope:** Full homepage rewrite + two new routes (`/customers`, `/writing` + `/writing/[slug]`). Keeps the 11 surgical fixes shipped earlier (mobile nav, contrast, footer routes, etc.).
> **Brainstorming artifacts:** `darpan-marketing-site/.superpowers/brainstorm/29596-1780050954/content/v10-design-lock.html` (final filmstrip) and `v11-notebook-lines.html` (background pattern). Plus prior session artifacts v1–v9 archived in `.superpowers/brainstorm/70834-1780035823/` and `.superpowers/brainstorm/39409-1780040270/`.

---

## 1. Strategic Intent

The current `darpan-marketing-site/` homepage reads as a competent SaaS marketing surface — clean hero, three-up step grids, persona cards, insights cards, closing CTA. The 11-fix surgical pass shipped earlier removed the worst AI-template tells (sparkles, squiggles, hover-rotations, fake editorial covers) but kept the underlying composition. **The composition itself is the problem.** Three-up grids, illustrated process flows, and persona cards are the default vocabulary of every B2B AI-startup site.

This spec is a **structural reimagining**, not a polish. It replaces the current page with a Cognition-inspired editorial spread: numbered sections (`01`–`05`), a single declarative hero sentence, plain customer wordmarks as section 02, three product primitives plainly named, a manifesto paragraph as section 04, and a writing-notes list as section 05. The background carries a college-ruled notebook texture (subtle horizontal rules + a vertical rust margin line) that signals "this is a working notebook" without becoming decoration.

**The audience stays:** corporate retail buyers (VP Finance, Controllers, VP Operations, CFOs) plus retail ops/supply chain/data leaders (the broader reconciliation audience identified during brainstorming). The new headline language is explicitly **not finance-coded** — reconciliation works across inventory, orders, fulfillment, revenue, and customer records.

**The brand intent** moves from "AI startup for retail finance" to **"an editorial publication that happens to be a marketing site for a reconciliation engine."** Less marketing surface, more company-of-record artifact.

---

## 2. Locked Design Decisions

These were settled through 11 iterations during the brainstorming session. They are inputs to implementation, not open questions.

### 2.1 Hero copy (final)

```
01

Darpan operates the reconciliation
infrastructure for retail. Row by row,
across every system.

[ Request a walkthrough  → ]   Read the product brief  ↗

A reconciliation workspace, built in 2026.
```

- Single declarative sentence (no question, no slogan).
- "Row by row, across every system" replaces the original "matched by primary ID" (rejected as database jargon).
- Hero is **left-aligned**, not centered. Cognition's posture, not the centered SaaS posture.
- Italic second clause is rust (`#5A1E2A`).
- One pill CTA (maroon background, cream text) + one ghost link to "Read the product brief."
- A small footer-bar line: *"A reconciliation workspace, built in 2026."*

### 2.2 Page structure (sections 01–05)

| § | Title | Function | Composition |
| --- | --- | --- | --- |
| **01** | Hero | The declarative claim | Single left-aligned sentence, two-tone (roman + italic-rust), pill CTA + ghost link |
| **02** | Reconciled by | Customer slot | Plain wordmarks in display type, set in a single row, no card, no carousel. Placeholder wordmarks until real names land. |
| **03** | The product, written down to its primitives | Three primitives | `I. Schema` · `II. Compare` · `III. Evidence`. Each labeled with roman subprefix in small caps. Editorial body copy, no icons, no cards. Hairlines between primitives. |
| **04** | The work, written down | Manifesto | One philosophical paragraph in editorial serif; one italic closing sentence in rust. Plain language. |
| **05** | Writing | Notes from the team | Plain entry list: `DATE · TITLE · meta-line`. Hairlines between entries. No cards. Footer link: *"All writing →"* |

There is **no Section 06**. The page ends after Writing. The final CTA lives in the hero (the pill + ghost link). The footer (already shipped: tagline, links, LinkedIn) closes the page.

### 2.3 Section copy (final, for implementation)

#### § 02 Heading
> **Reconciled by retail teams at**

(Wordmarks fill the row below. Until real wordmarks land, use display-type placeholders: `[Retailer A]` … `[Retailer E]` so the slot is real.)

#### § 03 Heading
> **The product, written down to its primitives**

Three primitives:

**I. Schema** — *"You describe the source data once."*
Field names, types, the keys that anchor each record. Darpan uses them to pair every line across every connected system.

**II. Compare** — *"Records pair line by line. Mismatches surface with the rows behind them."*
No spreadsheet pile-up. Variance, missing-object, and resolved-pair classifications come out of one run, with the source line attached to every call.

**III. Evidence** — *"The saved run, the rules applied, the row-level trail. Sign on what's there."*
(Single-line treatment, set in small caps small body, on the trailing hairline.)

#### § 04 Heading
> **The work, written down**

Manifesto paragraph (roman serif):
> Every retail business runs on systems that don't agree. Inventory in the WMS, revenue in the POS, returns in commerce, ledger in the ERP. Reconciliation is the work that makes them agree — usually by hand, mostly in spreadsheets, always late.

Italic closing (rust):
> *Darpan is the infrastructure that makes it the system's job.*

Caption line (small caps):
> A 2026 reconciliation engine. Built on schema, the keys that anchor records, and the row-level trail.

#### § 05 Heading
> **Writing — notes from the team**

Entries (initial three for launch; real posts to follow):

```
APR 12, 2026  ·  ENGINEERING NOTES
Why reconciliation belongs at the data layer, not the spreadsheet layer.
6 min read

MAR 28, 2026  ·  OPERATIONS
The cost of variance you can't see: inventory, revenue, returns.
5 min read

MAR 14, 2026  ·  PRODUCT
What we mean when we say "primary ID."
4 min read
```

Trailing italic link: *All writing →*

### 2.4 Voice rules

These are inputs for any copy that gets added later (about, customers, careers, writing posts):

- **Two-clause headlines, second clause italic in rust.** Hero headline pattern repeats as h2 throughout. Singular declaratives are also acceptable when the claim is sharp enough (e.g. "Records pair line by line.").
- **Plain English, fifth-grade reading level.** The depth comes from what's said, not how it's said. No "AI-powered," "streamline," "best-in-class," "10x," or "next-generation."
- **The product is described as *a reconciliation engine*** or *an infrastructure* — never *a platform*.
- **Tabular numerals** for all numbers (CSS `font-variant-numeric: tabular-nums`).
- **No em-dashes** in body copy (rule shipped in Task 11 — preserve it).
- **"Row," "line," "record," "source," "schema," "key," "evidence," "variance," "match"** are the recurring vocabulary. Use them.

### 2.5 Background pattern (college-ruled)

The page root carries a notebook-paper background via a single CSS `background-image` on `.site-shell` (zero JS, no DOM noise):

```css
.site-shell {
  background-color: var(--color-background);  /* #F0EDE4 */
  background-image:
    /* Vertical margin rule (rust) — at left gutter, full height */
    linear-gradient(
      to right,
      transparent calc(var(--gutter-mobile) - 1px),
      rgba(158, 71, 56, 0.22) calc(var(--gutter-mobile) - 1px),
      rgba(158, 71, 56, 0.22) var(--gutter-mobile),
      transparent var(--gutter-mobile)
    ),
    /* Horizontal rules — 32px repeat, 6% near-black */
    linear-gradient(
      to bottom,
      rgba(42, 31, 26, 0.06) 1px,
      transparent 1px
    );
  background-size: 100% 100%, 100% 32px;
  background-repeat: no-repeat, repeat-y;
  background-position: 0 0, 0 24px;
}
```

- **Vertical margin rule:** 1px at the left gutter, rust at 22% alpha. On desktop, the gutter is `--gutter-desktop` (120px); on mobile it's `--gutter-mobile` (24px). The margin rule must adapt — see the responsive section.
- **Horizontal rules:** 1px every 32px (matching body line-height), near-black at 6% alpha. Offset by 24px from the top so the first line sits beneath the header.
- **Text baseline alignment:** all text sits *on* the lines (descenders cross). The 32px grid is the page's primary rhythm.
- **`prefers-reduced-motion`:** N/A — the background is static. (It's printed, not animated.)
- **Print stylesheet:** background lines preserve at 100% opacity for print, in case anyone prints the page (which is on-brand for a "notebook").

### 2.6 Design system

| Token | Value | Use |
| --- | --- | --- |
| `--color-background` | `#F0EDE4` | Page background |
| `--color-primary` | `#5A1E2A` | Maroon. Headlines second-clause italic, CTA pill background, brand wordmark, italic h3 in primitive sections |
| `--color-accent` | `#9E4738` | Rust. Section numerals (`01`–`05`), margin rule, italic display accents |
| `--color-text` | `#2A1F1A` | Near-black. Body, h2 roman first-clause |
| `--color-secondary` | `#6B5648` | Small caps labels, footer links, source citations, captions |
| `--color-section-alt` | `#DDE0D7` | Currently used for `.section-cream`; retain for any inverted region (none in this spec). |
| Font display | `'DM Serif Display'` | h1 hero, h2 section headlines, italic accents, section numerals, manifesto body |
| Font body | `'Plus Jakarta Sans'` | Nav, body paragraphs, small caps labels, CTAs, source lines |
| h1 hero | `clamp(34px, 5.2vw, 56px)`, line-height 1.05, letter-spacing -0.02em | Three lines, left-aligned |
| h2 sections | `clamp(22px, 2.6vw, 28px)`, line-height 1.15, letter-spacing -0.01em | Roman first-clause + italic rust second-clause |
| h3 primitive titles | `20px` italic serif, color `--color-primary` | Schema / Compare / Evidence headings |
| Body | `13.5–14px` Plus Jakarta Sans, line-height 1.55, `--color-text` | All paragraphs |
| Small caps label | `10px` Plus Jakarta Sans, weight 500, letter-spacing `0.22em`, uppercase, `--color-secondary` | `I.` / `II.` / `III.` labels, date+category labels, footer-bar |
| Section numeral | `clamp(48px, 6vw, 60px)` italic DM Serif Display, `--color-accent`, opacity 0.78 | Large `01`–`05` numerals at section start |
| Hairline rule | `1px` `var(--color-text)` at 18–32% opacity | Section dividers, subsection dividers, top/bottom of section bands |
| CTA pill | `12px 22px` padding, `4px` radius, `--color-primary` bg, `--color-background` text, weight 600 Plus Jakarta Sans | Hero CTA |
| Ghost link | Plus Jakarta Sans 13px, `--color-text`, underline-on-hover via border-bottom | Secondary action |

### 2.7 Motion budget

- **On initial load:** Top and bottom hairline rules draw left-to-right over ~500ms (eased), section numerals fade in after rules complete, headline fades in after numerals, subhead and CTA follow. Total load choreography ~1.2s.
- **Scroll-triggered (per section):** Each section's leading hairline draws left-to-right as it enters viewport (one-shot, not continuous). Section numeral fades in alongside the rule.
- **Hover:** Only on the primary CTA pill (background-color shift toward `--color-cta-hover` `#421621`). No transforms anywhere.
- **`prefers-reduced-motion: reduce`:** all rule-draws disabled, content renders statically.
- **No marquees.** No GSAP. No ScrollTriggers. No parallax. The page is meant to be calm.

### 2.8 Information architecture

| Route | Status | Purpose |
| --- | --- | --- |
| `/` | **Rewrite** | The home spread described in this spec (§ 01–05) |
| `/customers` | **New (placeholder)** | Section 02's "Reconciled by" expanded into a longer customer page. Placeholder copy until pilots exist. |
| `/writing` | **New (placeholder)** | Index of all Section 05 entries. Placeholder list until real posts exist. |
| `/writing/[slug]` | **New (placeholder)** | Individual writing post. One stub post at launch (`why-reconciliation-belongs-at-the-data-layer`). |
| `/careers` | **Out of scope** | Nav slot reserved but route not built in this iteration. Nav link renders as text-only ("Careers — soon") until ready. |
| `/privacy` | **Already shipped** | Task 10 placeholder. Stays. |
| `/terms` | **Already shipped** | Task 10 placeholder. Stays. |

**Nav** at top of every page:
- Left: `Darpan` wordmark, links to `/`.
- Right (desktop): `Product` (anchors to `#product` on `/`, falls back to `/` if elsewhere) · `Customers` (links to `/customers`) · `Writing` (links to `/writing`) · `Careers` ("soon" affordance).
- Right (mobile, <560px): hamburger trigger that opens the mobile menu (already shipped Task 1 + portal fix). Same links, full-screen overlay.
- The pill CTA at the top right of v8/v10 mockups is **dropped from the nav** — it lived in the hero already, and the duplicated CTA was a pre-shipped redundancy.

### 2.9 Mobile breakpoints

- **<= 980px:** Hero font scales down via `clamp()`. Section header pattern (numeral + title) stacks vertically — numeral above title rather than inline with it.
- **<= 768px:** Customer logo row (Section 02) wraps with `flex-wrap` + `gap: 16px`. Product primitives (Section 03) collapse from inline label+body to stacked label-then-body. Writing entries stay single-column (they're already vertical).
- **<= 560px:** Site header collapses to wordmark + hamburger trigger. Mobile menu overlay handles nav.
- **Margin rule on mobile:** at narrow widths, the desktop 120px gutter shrinks to 24px. The vertical rust margin line moves with the gutter — it's always at `--gutter` from the left. The CSS `linear-gradient` uses `var(--gutter)` (a custom property that changes at the 980px / 560px breakpoints).
- **Horizontal lines on mobile:** stay at 32px spacing regardless of viewport. The 32px line-height grid is the page's rhythm anchor and doesn't scale.

---

## 3. File-level changes

### 3.1 To rewrite

| File | Change | Notes |
| --- | --- | --- |
| `src/routes/index.tsx` | Full rewrite | Replaces HeroSection, PainSection, HowItWorksSection, PersonasSection, InsightsSection, FinalCtaSection. Five new section components: `HeroSection`, `ReconciledBySection`, `ProductSection`, `WorkSection`, `WritingSection`. SiteHeader and SiteFooter stay (footer already shipped Task 10). MobileMenu stays (Task 1 + portal fix). |
| `src/styles.css` | Significant additions, some deletions | Add: `.site-shell` background-image rules (notebook lines), `.section-numeral`, `.section-band`, `.product-primitive`, `.manifesto`, `.manifesto-close`, `.writing-list`, `.writing-entry`, `.logo-row`, `.logo-wordmark`. Remove: `.steps-flow`, `.step-node`, `.persona-columns`, `.persona-column`, `.pain-grid`, `.pain-copy`, `.stat-block`, `.stat-list`, `.insights-grid`, `.insight-card`, `.insight-body`, `.insight-tag`, `.insight-meta`, `.final-cta`, `.final-cta-inner`, `.final-cta-body`, `.final-cta-note`, `.section-cream`. The `.text-script` device is dropped (it was specific to the previous voice; the new voice uses italic-rust on h2 second-clauses without a highlight band). |

### 3.2 To create

| File | Purpose |
| --- | --- |
| `src/routes/customers.tsx` | Placeholder page. Reuses `legal-page` skeleton from `/privacy`/`/terms`. Single editorial paragraph + the same Section 02 logo row + CTA. |
| `src/routes/writing.tsx` | Index page. Section 05's pattern (`DATE · CATEGORY` / title / meta) repeated as a vertical list with one entry per real post. Stubs at launch. |
| `src/routes/writing/$slug.tsx` | TanStack-Start dynamic route. Renders post markdown (or hardcoded JSX initially). One stub post at launch. |

(Use the TanStack Start file-based routing skill for the new routes. The Router plugin regenerates `routeTree.gen.ts` automatically on build/dev.)

### 3.3 To preserve (do not regress)

- `src/components/MobileMenu.tsx` — Task 1 component, including the portal fix from the browser-walk session.
- `src/routes/privacy.tsx` and `src/routes/terms.tsx` — Task 10 placeholders.
- Footer in `src/routes/index.tsx` — Task 10 footer (tagline, four columns, `/privacy` and `/terms` links, LinkedIn).
- `src/routes/__root.tsx` — meta tags, OG, Twitter, canonical, favicon. No change.
- Mobile contrast fixes from Task 2 (color tokens). The new spec uses the same palette.

### 3.4 Out of scope for this spec (deferred follow-ups)

- **Real customer logo assets.** Section 02 ships with placeholder wordmarks until pilot accounts agree to be named.
- **Real writing posts.** Section 05 ships with three stub titles. Real long-form posts arrive over the next quarter via `/writing/[slug]` routes.
- **Real `/customers` case studies.** Page exists with a placeholder paragraph; real content follows.
- **`/careers` route.** Reserved in nav as "soon" — full page deferred until hiring begins.
- **Test infrastructure.** No vitest config exists in `darpan-marketing-site/`. The redesign is visual; verification is via browser-walk (Playwright headed mode at 375 / 768 / 1280) plus `npm run build` + `tsc --noEmit`. Adding vitest + RTL is a separate spec.
- **A11y deep audit.** The 11-fix pass shipped the WCAG-AA fixes for the old layout. The new layout introduces new components (`.section-numeral`, `.product-primitive`, etc.) that must pass the same bar. The implementation plan will enumerate the a11y checks per section.

---

## 4. Risks and decisions deliberately accepted

- **The page is visually quiet.** No imagery, no product screenshots, no animation beyond the rule-draws on load. The trade is intentional: distinction comes from restraint. The risk is that buyers expecting SaaS marketing surface read it as "not finished." The Cognition reference is the proof point — this register works for an enterprise audience when the copy carries the weight.
- **The hero has no imagery.** The redesign-plan doc (in repo root) acknowledged this for the old design too — "the product isn't ready for screenshots, and a polished fake mockup would signal inauthenticity to enterprise buyers." Same logic applies, harder. No mockups, no diagrams, no hero illustration. The headline and the notebook texture do everything.
- **Customer logos are placeholders.** Section 02 ships with wordmark slots that read `[Retailer A]`. This is *worse* than dropping Section 02 entirely (the original redesign plan said "skip if no logos"). The deliberate choice: ship the placeholder so the page's IA is complete, document the placeholder publicly (a small caption: *"Real wordmarks at launch."*), and replace them as pilots agree.
- **The notebook background lines are a fixed feature, not a toggle.** Users who find the lines distracting cannot turn them off. The rationale: they're part of the brand identity, not a setting. The lines are at 6% opacity — well below the threshold that would impair body-text reading. The margin rule is at 22% but only 1px wide; it doesn't compete with content.
- **No /pricing page.** Reconciliation isn't sold on a self-serve pricing page in this category. The CTA is "Request a walkthrough" everywhere. If/when pricing becomes public, a new spec adds the route.

---

## 5. Implementation plan handoff

This spec hands off to `superpowers:writing-plans` to generate a task-by-task implementation plan. The plan will cover:

1. Add notebook-line background to `.site-shell` (CSS only).
2. Build the section-numeral pattern (`.section-band` + `.section-numeral` + `.section-title`).
3. Replace `HeroSection` with the new declarative hero.
4. Build `ReconciledBySection` (logo row with placeholder wordmarks).
5. Replace `HowItWorksSection` with `ProductSection` (Schema · Compare · Evidence).
6. Replace `PersonasSection` with — *(deleted; voice cascades into the manifesto)*.
7. Replace existing `InsightsSection` with `WritingSection` (plain entry list).
8. Build `WorkSection` (manifesto paragraph).
9. Update SiteHeader nav (Product · Customers · Writing · Careers; drop duplicate CTA).
10. Create `/customers` route (placeholder).
11. Create `/writing` index route (placeholder).
12. Create `/writing/$slug` dynamic route (one stub post).
13. Add motion choreography (rule draws on load + scroll, `prefers-reduced-motion` gate).
14. Mobile breakpoint adjustments (margin rule responsive, section-numeral stacks above title at < 980px).
15. Final cross-page walk (Playwright at 375 / 768 / 1280, `/`, `/customers`, `/writing`, `/writing/[stub-slug]`).

The writing-plans skill will expand each item into bite-sized TDD-substitute steps (grep verification + browser screenshot verification, since no test infra exists).

---

## 6. Spec self-review checklist

Run mentally against the spec body above before passing to writing-plans:

- [x] **Placeholder scan:** No "TBD," no "TODO." Every section has decided copy or an explicit placeholder slot.
- [x] **Internal consistency:** Hero copy in §2.1 matches manifesto framing in §2.3 (both reference "reconciliation," "row," "system," "infrastructure"). Background pattern in §2.5 uses tokens defined in §2.6. File changes in §3 reference components named in §2.
- [x] **Scope check:** Single homepage rewrite + three new placeholder routes. Manageable as one implementation plan, not multiple.
- [x] **Ambiguity check:** Section copy is final, not "something like." CSS values are tokens, not narrative descriptions. Where placeholders are intentional (logos, posts), they are flagged as such.
- [x] **Voice consistency:** All copy reads in the locked register (plain English, "row by row," manifest framing). No "AI-powered," no "streamline," no "best-in-class" in any section.
- [x] **A11y scope:** Color contrast tokens preserve existing WCAG AA. New components (numerals, primitive labels) inherit from established token system. Motion gate via `prefers-reduced-motion` is explicit.
- [x] **Mobile addressed:** §2.9 covers all three breakpoints (980 / 768 / 560) with concrete adaptations.
- [x] **Out-of-scope documented:** §3.4 lists deferred follow-ups so the implementation plan doesn't accidentally scope-creep into them.
