# 0001 — CSS Modules + CSS-first over Tailwind / CSS-in-JS

- **Status:** Accepted
- **Date:** 2026-06-17

## Context

The site needs a styling strategy for a static, content-driven portfolio with a
distinctive "industrial blueprint" visual identity. Styling here is not an
afterthought — it carries the design and is part of what the codebase
demonstrates. The constraints: a static export, Server Components by default,
near-zero client JavaScript, and a strong preference for leaning on the web
platform.

## Decision

We style with **CSS Modules + global CSS custom properties**, one `.module.css`
scoped per component, on top of a token system in `src/styles/globals.css`.
Shared bases are composed via `composes:`. We **forbid Tailwind and any
CSS-in-JS** library.

A build step is acceptable only to *polyfill on-track standard CSS* (see
[ADR-0003](./0003-custom-media-breakpoints-via-postcss.md)); we do not adopt a
preprocessor (Sass) or a utility framework.

## Alternatives considered

- **Tailwind CSS** — utility classes in markup. Rejected: couples design values
  to JSX, obscures a deliberate token system, adds a build dependency and config
  surface, and pushes against the "no hardcoded design values" rule we want to
  enforce. The visual identity is bespoke, not utility-shaped.
- **CSS-in-JS (styled-components, Emotion)** — rejected: most solutions imply a
  runtime and/or client components, directly conflicting with Server Components
  by default and the near-zero-client-JS goal.
- **Plain global CSS** — rejected: no scoping, class-name collisions, and
  duplication that scales badly across components.

## Consequences

- **Positive:** zero styling runtime; styles are plain CSS the platform
  understands; tokens are the single source of truth; scoping prevents leaks;
  the approach is portable and tool-agnostic.
- **Negative / trade-offs:** no utility-class velocity; contributors must learn
  the token vocabulary.
