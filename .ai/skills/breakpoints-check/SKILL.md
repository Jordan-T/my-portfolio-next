# Skill — Custom-media guard-rail

Validate that responsive breakpoints stay correct. `@media (--mq-*)` is not
native CSS — it is polyfilled at build by `postcss-custom-media`, so a mistyped
or undefined custom media **fails silently** (the query never matches and the
responsive rule is simply dropped). Stylelint cannot catch this.

## When it runs

Automatically as part of `pnpm lint:css` (and therefore `pnpm lint`). Run it
directly with `node .ai/skills/breakpoints-check/check-custom-media.mjs`.

## What it checks

1. **Undefined custom media** — every `@media (--name)` must reference a
   `@custom-media` defined in `src/styles/media.css` (the single source of
   truth). A typo like `@media (--mq-uii)` fails the check.
2. **No literal pixel breakpoint** — a raw `@media (max-width: 720px)` is
   rejected; use the corresponding `--mq-*` token.

Exit code is non-zero on any finding, so it gates CI alongside Stylelint.

## Naming convention

Breakpoints are named *scale + direction*, on a rem scale
(`sm 37.5rem` · `md 45rem` · `lg 56.25rem` · `xl 73.75rem`). Each has up to
three directions so you always author in the sense that avoids a set-then-reset:

- `--mq-from-*` — `min-width`, add behaviour on the desktop side of a mobile base.
- `--mq-until-*` — `max-width`, override / strip on a desktop base.
- `--mq-only-*` — a range (`X <= width < Y`), a single band (e.g. tablet).

Rule of thumb: **choose the direction per property.** Put a value in the base
only if it's the one you'd keep on the smallest screen; otherwise start from the
off/mobile state and add it via `--mq-from-*`. Never set-then-reset.

Range syntax (`width >= …`) is exclusive by construction, so `from-X` and
`until-X` partition cleanly at X — no ±1px overlap.

## Adding a breakpoint

Add it once to `src/styles/media.css` (`@custom-media --mq-… (…)`), then use
`@media (--mq-…)`. Keep the set small — reuse the existing scale before adding a
new step.

## Not covered: container queries

`@container` queries are **not** validated by this guard-rail (it only scans
`@media`). They react to a component's own width rather than the viewport — use
them for reusable components (a wrapper sets `container-type: inline-size`, the
inner element queries it). Their thresholds are component-relative, so they do
not map 1:1 onto the `--mq-*` viewport scale.
