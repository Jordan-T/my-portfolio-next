# 0002 — Keep CSS custom properties; reject build-time token inlining

- **Status:** Accepted
- **Date:** 2026-06-17
- **Supersedes:** —

## Context

The design system is a token layer of CSS custom properties in
`src/styles/globals.css`. We evaluated compiling the *static* tokens (spacing,
radii, container widths, transition) to literal values at build time — à la
Sass `$variables` — so that only genuinely runtime values would remain as
custom properties. The stated motivations were architectural clarity ("a
`var()` should exist only for what truly varies at runtime") and avoiding a
runtime cost.

We studied this seriously rather than dismissing it; this ADR records the
conclusion so the option is visibly considered, not ignored.

## Decision

We **keep 100% CSS custom properties** for design tokens. We do **not** compile
or inline any token to a build-time literal. No Sass, no `postcss-simple-vars`.

## Alternatives considered

- **`postcss-simple-vars` (`$token` inlined at build)** — rejected: `$token` is
  not CSS and never will be; hiding non-CSS syntax inside a `.css` file misleads
  about the file's nature. (Sass is at least honest about being compiled via the
  `.scss` extension — but see below.)
- **Sass for static tokens (`$token` in `.scss`)** — rejected: for ~19 scalar
  constants it is over-engineering, forces renaming most `.module.css`, and
  reverses the "platform CSS, no preprocessor" spirit of
  [ADR-0001](./0001-css-modules-css-first-over-tailwind.md) for no proportionate
  gain.
- **`postcss-custom-properties` with `preserve: false`** — rejected: static
  per-file replacement breaks `--gutter` (reassigned in a `@media` query),
  cannot resolve the `next/font` variables, and tends to *increase* transferred
  CSS (literals repeat; `var()` references compress well).

## Consequences

- **Positive:** one styling model, no second variable syntax, full runtime
  overridability kept (theming is planned), tokens stay a single source of
  truth. Authoring stays honest CSS.
- **Negative / trade-offs:** the runtime tokens that are *not* genuinely dynamic
  remain custom properties — a small, accepted theoretical cost. At this scale
  (~40 tokens, static page) it is negligible; at very large scale this calculus
  would be revisited. The discipline "custom properties only for genuine runtime
  variance" is therefore a *convention*, not enforced by tooling.
