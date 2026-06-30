# 0005 — Generate the CV PDF at build from the site config

- **Status:** Accepted
- **Date:** 2026-06-17

## Context

The site links to a downloadable CV (`/cv.pdf`). A hand-maintained PDF drifts
from the live site: a new role, an updated stack, or a reworded highlight has to
be edited in two places, and the two inevitably disagree. The portfolio already
holds the source of truth for identity, experience, and stack in typed configs
(`src/config/site.ts`, `experience.ts`, `stack.ts`).

## Decision

Generate `public/cv.pdf` at build time from those same configs.

- A pure, dependency-free assembler — [`src/lib/cv.ts`](../../src/lib/cv.ts),
  `getCvData()` — gathers and shapes the data (one source of truth, testable).
- A build script — [`scripts/generate-cv.tsx`](../../scripts/generate-cv.tsx) —
  renders that data to PDF with **`@react-pdf/renderer`** and writes
  `public/cv.pdf`. The layout mirrors the site: a dark **sidebar** (Onyx) for
  identity, contact, socials and skills, a light **main column** for experience
  and stack.
- The brand fonts (**Geist**, **Inter**, **Space Grotesk**) are registered from
  the `.woff` files shipped by `@fontsource/*`, so the PDF matches the site type.
- The sidebar carries the **portrait** and a **QR code** to the site with the
  brand logo at its centre. The two SVG brand assets are rasterised to PNG with
  **`sharp`** (react-pdf renders raster, not arbitrary SVG via `<Image>`); the QR
  is produced by **`qrcode`** at error-correction level H so the centred logo
  does not break scanning.
- It runs via the `prebuild` lifecycle (`pnpm build` regenerates the PDF first),
  and on demand with `pnpm generate:cv`. The script is run with **`tsx`** so it
  can import the TypeScript config layer directly (`@/` paths resolved from
  `tsconfig.json`).
- The generated `public/cv.pdf` is **gitignored** — it is a build artifact, not
  source.

## Alternatives considered

- **HTML route + Puppeteer (print to PDF)** — pixel-identical to the site and
  gives a browsable `/cv`, but downloads Chromium in CI (heavy, slow) and adds a
  `@media print` surface to maintain. Rejected: too much weight for one page.
- **Printable `/cv` page, no auto PDF** — zero dependency, but ships no static
  `cv.pdf` and depends on the visitor's browser to export. Rejected: we want a
  stable downloadable file.
- **Keep a hand-made PDF** — zero tooling, but accepts the drift this ADR exists
  to remove. Rejected.

## Consequences

- **Positive:** the CV can never contradict the site; updating a config updates
  both. The PDF is reproducible and reviewed through the same configs the tests
  cover.
- **Negative / trade-offs:** several build-time dev dependencies
  (`@react-pdf/renderer`, `tsx`, `sharp`, `qrcode`, `@fontsource/*`) and a
  bespoke layout in react-pdf's flexbox subset (not the site's CSS), which must
  be kept visually in step with the site by hand. `sharp` is a native module
  (its build is allow-listed in `pnpm-workspace.yaml`).
