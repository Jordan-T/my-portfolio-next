# 0006 — Colour tokens as a single TypeScript source

- **Status:** Accepted
- **Date:** 2026-06-18

## Context

The colour layer of the design system lived in `globals.css` (`:root`), per
[ADR-0002](./0002-keep-css-custom-properties-no-build-time-inlining.md). That is
the right *runtime* mechanism, but it is not reachable from everything that needs
the colours: the generated CV ([ADR-0005](./0005-generate-cv-pdf-at-build-from-config.md))
runs in `@react-pdf/renderer`, which cannot read CSS custom properties, so it
carried a **hand-copied palette** that could drift from the site. We also want
room for theme variants — a high-contrast theme for accessibility, a possible
light theme — without maintaining the same colours in two places.

## Decision

Make **`src/config/theme.ts`** the single source of truth for the colour layer.

- `brand` holds the colour **primitives** (Onyx & Azure). Every translucent or
  blended token is **derived** from a primitive via `color-mix(... var(--…) …,
  transparent)`, so a palette swap updates the whole set. (The previous literal
  `rgba()` borders encoded the accent's RGB by hand; the `color-mix` forms are
  exactly equivalent and remove that duplication.)
- `siteColors()` returns the colour custom properties.
  [`scripts/generate-tokens.ts`](../../scripts/generate-tokens.ts) writes them to
  `src/styles/tokens.generated.css`, which `globals.css` imports. The site keeps
  runtime CSS variables — ADR-0002 still holds; only the **authoring source**
  moved.
- The CV imports `cvTheme` directly: a high-contrast, print-oriented variant
  that shares hues with `brand` and is legible in black and white.
- **Non-colour** tokens (spacing, radii, typography, breakpoints) are not
  themeable and stay in `globals.css`.

Generation runs on `predev` and `prebuild`; the output is **gitignored**.

## Adding a variant

Define a new `BrandPalette` and emit `siteColors(variant)` under a
`[data-theme="…"]` selector (high-contrast, light…). Because every token derives
from the primitives, the variant needs only the ~11 seed colours.

## Consequences

- **Positive:** one place defines colour; the CV can never drift from the site;
  translucent tokens are derived, not duplicated; theme variants are now a small,
  typed change; the theme source is unit-tested.
- **Negative / trade-offs:** a generated CSS file now sits between `theme.ts` and
  the site, produced by a build step (a fresh checkout shows a transient missing
  `tokens.generated.css` in editors until `pnpm dev`/`build` runs). `tsx` runs the
  generator. The site does not yet expose a theme switcher — only the default
  palette is emitted today; the structure is ready for more.
