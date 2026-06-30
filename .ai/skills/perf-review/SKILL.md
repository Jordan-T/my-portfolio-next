# Skill — Performance review

Catch **predictable** performance regressions — the ones that come from
structure, not from a profiler. The site is fast because of how it's built
(Server Components, static export, near-zero client JS); this skill keeps that
property from silently eroding.

## When to run

- Before opening a PR.
- Whenever you add a `"use client"` boundary, an image/asset, or a dependency.

## Automated check

```bash
pnpm audit:perf
```

`check-perf.mjs` (dependency-free Node) flags:

1. **Unjustified `"use client"`** — every client boundary must carry a one-line
   comment explaining *why* (the architecture rule). Missing comment → failure.
2. **Heavy raster images** in `public/` over the size budget — un-optimized
   images are the most common regression in a static export.
3. **Raw `<img>` tags** in components — they invite layout shift and unsized
   media; prefer a properly sized approach.

Exit code is non-zero on any finding, so it can gate CI.

## Manual checklist

- Does this change add client JavaScript that a Server Component could avoid?
- Any new dependency shipped to the browser — is it worth its bytes?
- New assets: compressed, correctly sized, and within budget?
- No render-blocking work that could move to build time?

## Tuning

Size budgets and scanned folders are constants at the top of `check-perf.mjs` —
adjust them there, with a comment, rather than scattering thresholds.
