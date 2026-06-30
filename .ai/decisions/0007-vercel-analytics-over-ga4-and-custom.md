# 0007 — Vercel Analytics over GA4 and a custom solution

- **Status:** Accepted
- **Date:** 2026-06-22

## Context

The site treats a minimal JS footprint as a core technical argument
(CSS-first, no animation frameworks). Despite that, there is a real need for
basic visit data — which pages and sections actually get reached — to inform
future decisions about the site's content. Any analytics addition must
minimize impact on weight and on visitor privacy.

## Decision

Use **`@vercel/analytics`**.

- Cookieless, no consent banner required, minimal script weight (~1–2 kB
  gzipped), free tier sufficient at current traffic.
- Per-section view tracking is approximated by updating the URL hash
  (`history.replaceState`, never `pushState`) via an `IntersectionObserver`
  when a section enters the viewport (`#about`, `#projects`, `#resources`,
  `#contact`...). Vercel Analytics records each hash change as a distinct
  page view, giving section-level reach data without any extra script — this
  relies only on the built-in page-view tracking, not on custom events (not
  available on the free plan).

> **Implementation status (2026-06-23):** only the base `<Analytics/>`
> page-view tracking is wired (`src/app/layout.tsx`). The section-level hash
> tracking described above is the agreed design but is **not yet implemented**
> — it needs a small client island (`IntersectionObserver` +
> `history.replaceState`), tracked as a follow-up.

## Alternatives considered

- **Google Analytics (GA4)** — free, gives native scroll-depth and richer
  events, but ships a ~50 kB+ third-party script and legally requires a
  cookie consent banner. Rejected: too heavy and adds compliance surface for
  a site whose stated goal is minimal impact.
- **Custom self-hosted analytics** (NAS endpoint, `sendBeacon`, own storage) —
  zero third party, full control over the data model. Rejected for now: scope
  creep before the site ships, and getting anonymization/RGPD right correctly
  takes real work. Left open as a future option if Vercel's free tier becomes
  insufficient or more detailed data is needed.
- **No analytics at all** — fully consistent with the minimal-footprint
  claim, but removes the only signal on which sections/content actually get
  reached, which is needed to guide future content decisions.

## Consequences

- **Positive:** no cookie banner, page-level and section-level reach data,
  stays within the Vercel free tier at current traffic, smallest analytics
  footprint that still yields useful data.
- **Negative / trade-offs:** no custom events (free plan limitation) — no
  per-interaction tracking beyond what page views capture; no pixel-level
  scroll percentage, only section granularity; `replaceState` discipline is
  required (using `pushState` would break the back button); shared URLs may
  carry a section hash.
