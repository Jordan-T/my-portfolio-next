# Skill — Accessibility review

Audit the accessibility of a new or modified visible component before
considering it done. Accessibility is a **build gate** here, not an afterthought.

## When to run

- After creating or changing any component that renders visible UI.
- Before opening a PR that touches markup.

## Steps

1. **Run the automated gates.**

   ```bash
   pnpm lint        # eslint-plugin-jsx-a11y (via eslint-config-next)
   pnpm test:a11y   # axe assertions on rendered components
   ```

   Both must be green. `jsx-a11y` lint failures are blockers, not warnings.

2. **Add or update an axe test** for the component, using `findA11yViolations`
   from `src/test/axe.ts` (see `src/components/a11y.test.tsx` for the pattern).
   Every new or modified visible component gets one — home sections (Hero
   included) and the project detail page included.

3. **Manual checklist** (axe can't see everything, especially in jsdom):
   - Semantic landmarks and a single logical heading order.
   - Every interactive element is reachable and operable by keyboard, with a
     visible `:focus-visible` ring.
   - Images/SVGs have meaningful `alt` (or `alt=""` + `aria-hidden` when purely
     decorative).
   - Interactive controls have an accessible name (text, `aria-label`, …).
   - Color is never the only carrier of meaning.
   - The mobile menu still works **without JavaScript** (CSS-only checkbox).

## Notes

`color-contrast`, `region`, and `heading-order` are disabled in the axe helper
because jsdom can't assess them on an isolated component — verify contrast and
landmark/heading structure manually against the design tokens.
