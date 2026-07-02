# Architecture

> Why before what: each rule exists to keep the site fast, statically
> exportable, and easy to reason about. When a change would break one of these,
> stop and flag it rather than working around it.

## Rendering model

- **Server Components by default.** `"use client"` is forbidden unless strictly
  necessary (browser-only APIs, real interactivity). When unavoidable, the
  directive must carry a one-line comment explaining _why_ — this is checked by
  [`perf-review`](../skills/perf-review/SKILL.md).
- **Static export.** `next.config.ts` sets `output: "export"` with
  `images.unoptimized`. There is no server at runtime: no route handlers, no
  server actions, no ISR. Everything is computed at build time.
- Dynamic routes pre-render their full set with `generateStaticParams()`.

## Layout & routing

- `Nav` and `Footer` live in the root `src/app/layout.tsx`, never inside a page.
- Routes: `/` (home), `/projects` + `/projects/[slug]`, `/resources`.
- Route-segment styles sit beside the route as `<segment>.module.css`.

## Data layer

- **All filesystem/content access lives in `src/lib/`.** Pages and components
  consume `lib` functions; they never read the filesystem directly.
- `lib` parses Markdown frontmatter with **gray-matter** and returns objects
  typed against `src/types`. Every optional frontmatter field gets a default in
  `lib` (e.g. `published` defaults to `true`, `status` to `"wip"`).
- `lib` functions accept an **injectable source directory** (`dir?`) so tests
  point at `src/lib/__fixtures__/` instead of real content.

## Content pipeline

- **Projects** — one Markdown/MDX file per project in `src/content/projects/`.
  Typed frontmatter: `title`, `description`, `status` (`wip|done|client`),
  `featured`, `tags` (`{ label, type }`), `date` (ISO `YYYY-MM-DD`, **always
  quoted**), optional `image`, optional `external`/`github`/`gitlab`, optional
  `decision`, and `published` (default `true`; `false` hides it _and_ skips the
  build). Sort order: featured first, then newest date.
- **Resources / "resources"** — a typed `Resource[]` in
  `src/config/resources.ts`, each `article|video|book|talk|podcast|tool`, sorted
  by `src/lib/resources.ts`. The route label stays French ("Resources"); all code
  identifiers use the English term **Resource**.
- **Site & experience data** — personal info in `src/config/site.ts`, work
  history in `src/config/experience.ts`, the vision stack in
  `src/config/stack.ts`. Never hardcode these in components; import the config.

## Shared types

Shared types live in `src/types`. Do not redeclare a type that already exists
there.

## SEO

- Metadata in `src/app/layout.tsx` (+ per-route `generateMetadata`).
- `robots: { index: false }` is intentional pre-launch (see
  [`project.md`](./project.md)).
