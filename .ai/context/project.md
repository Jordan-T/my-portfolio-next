# Project — jordan-t.dev

Personal portfolio and tech-watch site of a senior front-end developer. A
static, content-driven website whose own codebase is held to the same standard
as the work it presents.

## What it is

- A static site built with Next.js (App Router) and exported to plain HTML/CSS.
- Content-driven: projects and a curated "resources" (tech-watch) are authored as
  Markdown/MDX and read at build time — no CMS, no database, no runtime backend.
- Three public surfaces: the home page (hero, vision, projects, experience,
  resources, contact), the projects index + per-project detail, and the resources.

## Goals that drive every decision

These are not aspirations; they are constraints the code must keep satisfying.

- **Performance by structure, not by patching.** Server Components by default,
  near-zero client JavaScript, static export. The architecture makes the site
  fast — we don't optimize a slow baseline after the fact. See
  [`perf-review`](../skills/perf-review/SKILL.md).
- **Accessibility is a build gate, not a review step.** WCAG-minded markup,
  `eslint-plugin-jsx-a11y` green, axe assertions in the test suite. See
  [`accessibility-review`](../skills/accessibility-review/SKILL.md).
- **Clean, durable architecture.** Strict separation of concerns (data layer,
  content, presentation), a real design-token system, DRY/KISS enforced on
  every change. The structure should still read clearly months later.
- **CSS-first.** Layout and interaction lean on the platform (CSS Modules,
  custom properties, a CSS-only mobile menu) before reaching for JavaScript.

## Status

Pre-launch. `robots: { index: false }` in the root layout is **intentional** —
remove the noindex (and confirm `metadataBase`) when the site goes live.

## Where things live

| Concern                       | File                                     |
| ----------------------------- | ---------------------------------------- |
| Architecture & data flow      | [`architecture.md`](./architecture.md)   |
| Code & content conventions    | [`conventions.md`](./conventions.md)     |
| Design tokens & styling rules | [`design-system.md`](./design-system.md) |
| Reusable agent skills         | [`../skills/`](../skills/)               |
| Architecture decisions (ADRs) | [`../decisions/`](../decisions/)         |
