# Design system — "Onyx & Azure"

Industrial-blueprint aesthetic: abyssal background, tiered surfaces, 1px
low-opacity borders, isometric feel. **CSS-first** — the platform does the work.

> **Colours** are sourced from `src/config/theme.ts` and generated into
> `src/styles/tokens.generated.css` (see
> [ADR-0006](../decisions/0006-design-tokens-single-source-in-typescript.md));
> **non-colour** tokens (spacing, radii, typography) live in
> `src/styles/globals.css`. Either way the values are tokens — never hardcode a
> design value, always `var(--…)`.

## Hard rules

- **CSS Modules only**, one `.module.css` next to each component. No Tailwind,
  no CSS-in-JS — see
  [ADR-0001](../decisions/0001-css-modules-css-first-over-tailwind.md).
- **No inline styles** in JSX.
- **No hardcoded design values** — colors, fonts, spacing, transitions, radii,
  and widths all come from tokens.
- **px discipline.** `px` is allowed only on `border` / `outline` /
  `background`; everything else uses `rem` or a token. Raw px primitives live
  only in `globals.css` / `media.css`.
- **Colors live only in the theme source** (`src/config/theme.ts`, generated to
  `tokens.generated.css`). Component modules use `var(--color-*)` — never a raw
  hex/rgb/hsl/named color. This keeps one color source and enables theme
  variants.
- The last three rules are enforced by **Stylelint** (`pnpm lint:css`); see
  [ADR-0004](../decisions/0004-css-linting-policy-stylelint.md).

## Surfaces (elevation tiers)

`--color-bg` (page) < `--color-surface` (cards/bento) < `--color-surface-raised`
(hover). Higher tier = more elevated.

## Accents (semantic, not decorative)

- `--color-accent` — electric azure: interactive, CTA, edges, hover.
- `--color-accent2` — indigo: secondary motifs, reflections.
- `--color-accent-alert` — technical amber: concepts, alerts.

For washes/hovers, derive from a token with
`color-mix(in srgb, var(--color-accent) N%, transparent)` — never a hardcoded
rgba. Recurring washes are already tokenized (`--accent-wash`,
`--accent-wash-soft`, `--accent-edge`, `--alert-edge`, `--alert-wash`); reuse
the token rather than re-declaring the `color-mix`.

## Spacing & layout

- Every padding/margin/gap uses a `--space-*` token (`--space-2xs` …
  `--space-4xl`). No ad-hoc `rem` spacing.
- Page container width = `--maxw`; reading/prose column = `--maxw-prose`. Never
  hardcode a width.
- Radii from `--radius-*`; transitions from `--transition-base`.

## Breakpoints

Defined once as **custom media** in `src/styles/media.css` and used via
`@media (--mq-*)`: `--mq-compact` (≤600px, grids → 1 col), `--mq-ui` (≤720px:
burger menu, reduced gutter), `--mq-grid` (≤900px, multi-column reflow). **Never
repeat a literal width in a `@media`**, and never introduce a fourth breakpoint.

`@media (--mq-*)` is not native CSS yet — it is polyfilled at build by
`postcss-custom-media` (+ `@csstools/postcss-global-data`); see
[ADR-0003](../decisions/0003-custom-media-breakpoints-via-postcss.md). Run
`pnpm lint:css` (Stylelint) as the CSS guard-rail.

## Focus

Every interactive element (link, button, card-link) shows a visible
`:focus-visible` ring: `outline: 2px solid var(--color-accent)` with an
`outline-offset`.

## Factoring CSS — DRY over duplication

Shared CSS is composed, not copied. Extract a common base via
`composes: x from "@/styles/…"` (e.g. the `.surface` base in
`src/styles/card.module.css`) or a layout primitive (`ui/Section`). Never
re-declare a card/section base in two modules.
