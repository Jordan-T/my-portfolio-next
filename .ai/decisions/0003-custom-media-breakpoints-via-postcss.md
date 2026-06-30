# 0003 — Centralize breakpoints with `@custom-media` (PostCSS-polyfilled)

- **Status:** Accepted
- **Date:** 2026-06-17

## Context

Four breakpoints (600 / 720 / 900 / 1180 px) were repeated as literal values across
~12 CSS files: a DRY violation, and a typo in one copy is easy to miss.
`@custom-media` (Media Queries Level 5) is the standards-track way to name a
breakpoint once and reuse it. As of June 2026 it is **not supported natively** in
browsers (no Baseline), so it requires a build-time polyfill.

## Decision

Introduce a **minimal PostCSS pipeline** that polyfills on-track standard CSS
only (see [`postcss.config.mjs`](../../postcss.config.mjs)):

- `postcss-custom-media` resolves `@media (--mq-*)` to literal queries at build.
- `@csstools/postcss-global-data` injects the definitions from
  `src/styles/media.css` into every module (PostCSS runs per file in Next).
- `autoprefixer` is re-declared (a custom PostCSS config replaces Next's
  default).

Breakpoints live once in `src/styles/media.css`: `--mq-compact` (600),
`--mq-ui` (720), `--mq-grid` (900), `--mq-until-desk` (1180). Literal widths in `@media` are forbidden.

The scope is bounded: **polyfill standard CSS only.** We do not use PostCSS to
invent syntax or to compile away the token layer (see
[ADR-0002](./0002-keep-css-custom-properties-no-build-time-inlining.md)).

## Guard-rail

`@custom-media` is not native, so an undefined or mistyped custom media fails
silently (the query never matches). A dedicated dependency-free check —
[`.ai/skills/breakpoints-check/check-custom-media.mjs`](../skills/breakpoints-check/check-custom-media.mjs),
run via `pnpm lint:css` — fails on (1) a `@media` referencing an undefined
custom media, and (2) any literal px breakpoint surviving in a `@media`.
Stylelint ([ADR-0004](./0004-css-linting-policy-stylelint.md)) lints the rest;
it cannot validate custom-media references, which is why this check exists.

## Alternatives considered

- **Sass `$breakpoints`** — honestly compiled, but reintroduces Sass + renaming;
  rejected for the reasons in
  [ADR-0002](./0002-keep-css-custom-properties-no-build-time-inlining.md).
- **Keep literal breakpoints** — zero tooling, but accepts the DRY violation and
  the silent-typo risk; rejected.

## Consequences

- **Positive:** breakpoints are a single source of truth, intent-named
  (`--mq-ui`) rather than magic numbers, and validated in CI.
- **Negative / trade-offs:** the polyfill is **load-bearing and effectively
  permanent** (no near-term native support); `@media (--mq-*)` is not valid CSS
  natively today — accepted under the line "future standard CSS, honestly
  polyfilled" (versus never-CSS preprocessor syntax, which we reject). A custom
  PostCSS config now owns autoprefixing.
