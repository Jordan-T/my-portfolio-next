# jordan-t.dev

Personal portfolio and tech-watch site. Static, content-driven, built to be
fast and accessible by construction.

## Stack

- [Next.js](https://nextjs.org) (App Router) + Turbopack, exported to static
  HTML/CSS (`output: "export"`).
- React 19, TypeScript (`strict`).
- Styling: CSS Modules + CSS custom properties (no Tailwind, no CSS-in-JS).
- Content: Markdown / MDX read at build time with `gray-matter`.
- Package manager: **pnpm**.

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

## Scripts

```bash
pnpm dev          # dev server
pnpm build        # static production build
pnpm test         # unit tests (Vitest)
pnpm test:a11y    # accessibility (axe) tests
pnpm lint         # ESLint + Stylelint + custom-media check
pnpm lint:css     # CSS only (Stylelint + custom-media check)
pnpm audit:perf   # predictable performance regressions
pnpm format       # Prettier
```

## Project structure

```
src/
  app/          # routes (App Router) — home, projects, veille
  components/   # ui/ · cards/ · sections/ · layout/
  config/       # site, experience, stack, theme, resources, contributions
  content/      # projects (.md/.mdx) and the veille (links)
  lib/          # data layer: reads & types content (testable, injectable)
  styles/       # global tokens + shared CSS bases
  types/        # shared TypeScript types
```

## How the context is organized

This repo separates **cold context** (stable, versioned, true for every working
session) from session-specific work. The cold context lives in [`.ai/`](.ai/)
and is the source of truth for both humans and AI agents:

- [`AGENTS.md`](AGENTS.md) — light entry point that routes to the rest.
- [`.ai/context/`](.ai/context/) — project, architecture, conventions, and
  design system, split into short focused files.
- [`.ai/skills/`](.ai/skills/) — reusable procedures (accessibility,
  performance, code review, ADRs), some backed by runnable scripts.
- [`.ai/decisions/`](.ai/decisions/) — architecture decision records (ADRs).
