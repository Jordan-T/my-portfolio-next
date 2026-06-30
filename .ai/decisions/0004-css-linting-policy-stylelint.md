# 0004 — CSS linting policy (Stylelint)

- **Status:** Accepted
- **Date:** 2026-06-17

## Context

The repo linted JS/TS (ESLint) but not CSS. With a token-driven design system
and runtime theming planned, we want CSS discipline that is *machine-enforced*,
not merely conventional — and a real CSS linter is itself part of what the
codebase demonstrates.

## Decision

Adopt **Stylelint** (`stylelint-config-standard` + `stylelint-config-css-modules`,
see [`.stylelintrc.json`](../../.stylelintrc.json)), run via `pnpm lint:css`
which `pnpm lint` orchestrates with ESLint through `npm-run-all2`. Beyond
standard hygiene, we enforce three project rules:

- **Class naming:** kebab-case for global CSS, lowerCamelCase for `*.module.css`
  (the CSS Modules convention).
- **px discipline:** `px` is disallowed except on `border` / `outline` /
  `background`; everything else uses `rem` or a token. Raw px primitives live
  only in `globals.css` and `media.css`.
- **Colors live only in `globals.css`:** hex, `rgb`/`rgba`, `hsl`/`hsla`, and
  named colors are forbidden in component modules — they must use
  `var(--color-*)`. This keeps a single color source and **prepares runtime
  theming**.

Purely stylistic rules that fight the existing house style (color notation,
empty-line formatting) are relaxed: we do not rewrite working CSS for taste.

## Consequences

- **Positive:** token usage and color centralization are enforced; runtime
  theming is unblocked; naming is consistent; CSS is in the lint gate.
- **Negative / trade-offs:** a few intentional exceptions must route through
  tokens (e.g. 1px hairlines reuse `--border-width`); contributors learn the
  px/color rules. Stylelint cannot validate custom-media references — that gap is
  covered by the dedicated check in
  [ADR-0003](./0003-custom-media-breakpoints-via-postcss.md).
