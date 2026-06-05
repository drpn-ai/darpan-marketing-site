# Darpan marketing site — reimagined

_Design spec. Single source: `docs/positioning-coo.md`. Nothing else (no prior site design) was used to make these decisions. Written 2026-06-04._

## 1. What the positioning forces

The positioning isn't just a message — it dictates a register:

- **Anti-hype, evidence-first.** The doc cites every claim, flags its own weak figures, and says "AI-native is the *reason*, never the pitch." A loud, gradient-glow startup look would betray it. → **Quiet, precise, instrument-like. No AI-purple, no glow, no hype.**
- **Operational, never financial.** Lead the COO; never say "reconciliation" as the pitch; attach cost to operations. → Copy and labels use the doc's COO register verbatim.
- **One ownable idea:** _"You've connected your systems. Nobody's checking they still agree."_ Darpan is **the verification layer for the composable stack.** The villain is **silent drift between systems nobody is watching.**
- **Two states are the whole product:** systems **agree** ✓ or they **drift** ⚠. That binary becomes the visual + color system.

## 2. Art direction

- **Theme:** Quiet premium neutral — warm paper, near-black ink. Light, not dark.
- **Texture:** hairline ledger/spec rules between sections; generous whitespace. No aurora, no blobs, no decorative noise.
- **Type character:** Swiss rational hierarchy. Hierarchy from **size + tracking + sans/mono contrast + color** — never weight.
- **Signature components (4):** (1) the **agreement line** — a record, two system values, a connector that's flush when they agree and broken/gapped when they drift, with a verdict; (2) **composable-stack tiles with seams**; (3) **move-vs-verify** two-state split; (4) **evidence blocks with visible sources** (the honest-sourcing motif — we verify our own claims).
- **Motion (2):** calm staggered float-up on scroll; the agreement line **resolves** as it enters view (verdict stamps in, drift delta ticks) — motion that demonstrates the product. All SSR-safe + reduced-motion-safe.

## 3. Tokens

Palette (derived from character; doc specifies no color):
```
--paper   #F4F2EC   warm off-white base
--paper-2 #FBFAF7   raised surface / instrument panel
--ink     #1C1B18   near-black warm — primary text + CTA fill
--ink-2   #57544C   secondary text
--ink-3   #8A867A   tertiary / mono labels
--line    rgba(28,27,24,0.12)   hairlines
--agree   #2F6B4F   deep pine — "systems agree / verified" (also brand mark)
--drift   #B0571B   amber-rust — "drift" (the villain)
```
Green = verified is the core metaphor, so pine is the brand accent (wordmark, marks); amber is reserved strictly for drift state. CTA fill = ink (Swiss, anti-hype). Green/amber stay semantic so they keep meaning.

Type: `IBM Plex Sans` (workhorse) + `IBM Plex Mono` (numerals, system values, labels, eyebrows, sources). **Weight 400 only, no italics, no bold** — restraint is on-brand here. Patrick Hand / Atkinson (the old notebook fonts) are dropped: this is a real reimagining, not a reskin.

## 4. Section architecture (all copy from the doc)

1. **Header** — wordmark + nav (Product · The gap · Proof · Notes) + "Request a walkthrough".
2. **Hero** (asymmetric split) — eyebrow "The verification layer for the composable stack" · h1 wedge · concise operational lede · CTA · **agreement instrument** (focal point).
3. **Why now / seams** — "The stack got specialized — and every tool is a new seam." Composable tiles; stat ≥70% mandated composable by 2026 up from 50% in 2023 (Gartner, directional, cited); legacy reconciliation was built for the monolith.
4. **The gap** (objection) — "Isn't this my integration platform's job?" Move-vs-verify split: a successful sync and a correct check are different guarantees; drift lives between successful syncs.
5. **Proof** — evidence with visible sources. Lead 65% inventory records inaccurate (DeHoratius & Raman, *Management Science*; Auburn RFID Lab). $222.7B "data disconnects / non-integrated systems" (IHL 2015, directional). Payout split = "single largest source of material misstatement" (EcomCPA 2026).
6. **Product** — "One specialized job. Nobody else owns it." Describe (onboard in days, not a six-week implementation) · Verify (continuously, row by row, evidence attached) · Resolve (cause + fix, not a pile of unmatched items). AI-native named once, as the reason.
7. **Audiences** — "Sell the COO. Reassure finance." Two columns: COO (lead) trust the numbers now; CFO (reassure) faster cleaner close as a byproduct.
8. **Close** — "Keep your best-of-breed tools. Add the layer that proves they agree." + CTA.
9. **Notes** — 3 writing entries. 10. **Footer.**

## 5. Constraints honored

- Weight 400 / no bold (saved brand rule; also consonant with the anti-hype register). Flagged to user.
- Honest sourcing: lead with the durable academic stat; label sponsored/dated figures inline; never present a flagged figure as primary.
- Preserve `navItems` export (MobileMenu) and `writingEntries` data.
- SSR-safe, reduced-motion-safe motion (reuse proven IntersectionObserver + `.is-in` pattern).
