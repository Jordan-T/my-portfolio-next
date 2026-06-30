# AGENTS.md

Entry point for any AI agent or contributor working in this repository. This
file is intentionally **light**: it orients you to the detailed context. Read
the linked file for an area before changing code in it.

> **Golden rule.** The rules in this repo are strict. When a change would
> violate one, do not make it — stop and flag it instead.

## What this is

Personal portfolio **jordan-t.dev**: a static, content-driven site whose own
codebase is held to the standard it presents. Full context:
[`.ai/context/project.md`](.ai/context/project.md).

## Stack — non-negotiable

- **Next.js (App Router) + Turbopack**, **React 19**, **TypeScript `strict`** —
  do not downgrade.
- **CSS Modules + CSS custom properties.** No Tailwind, no CSS-in-JS.
- **PostCSS** is scoped to polyfilling standard CSS only (`@custom-media` for
  breakpoints) — never to invent syntax or compile away tokens. **Stylelint**
  lints CSS (`pnpm lint:css`). Design tokens stay 100% custom properties.
- **MDX** (`@next/mdx`) for project content; frontmatter via **gray-matter**.
- **pnpm** only — do not introduce an `npm`/`yarn` lockfile.
- Static export (`output: "export"`), deployed to **Vercel**.

## Commands

```bash
pnpm dev          # local dev server
pnpm build        # production build — must pass before any PR
pnpm test         # Vitest, single run
pnpm test:a11y    # accessibility (axe) tests
pnpm lint         # ESLint + Stylelint + custom-media check (via npm-run-all2)
pnpm audit:perf   # predictable performance regressions
```

A change is **not done** until `pnpm lint`, `pnpm test`, and `pnpm build` pass
with zero errors.

## Context — read before editing the relevant area

| Topic | File |
|---|---|
| Project, goals, status | [`.ai/context/project.md`](.ai/context/project.md) |
| Architecture & data flow | [`.ai/context/architecture.md`](.ai/context/architecture.md) |
| Code & content conventions | [`.ai/context/conventions.md`](.ai/context/conventions.md) |
| Design system & styling | [`.ai/context/design-system.md`](.ai/context/design-system.md) |

## Skills — reusable procedures, some with scripts

| Skill | Use it to |
|---|---|
| [`accessibility-review`](.ai/skills/accessibility-review/SKILL.md) | Audit a11y before a component is done |
| [`perf-review`](.ai/skills/perf-review/SKILL.md) | Catch predictable performance regressions |
| [`code-review`](.ai/skills/code-review/SKILL.md) | DRY / KISS / SRP / Boy-Scout pass on a diff |
| [`page-content-review`](.ai/skills/page-content-review/SKILL.md) | Review & rewrite page copy (tone, concision, confidentiality) |
| [`article-writing`](.ai/skills/article-writing/SKILL.md) | Write or structure a French blog / tech-watch article |
| [`write-adr`](.ai/skills/write-adr/SKILL.md) | Record an architecture decision |
| [`breakpoints-check`](.ai/skills/breakpoints-check/SKILL.md) | Validate `@custom-media` breakpoints (auto-runs in `pnpm lint`) |

Architecture decisions are logged in [`.ai/decisions/`](.ai/decisions/).
