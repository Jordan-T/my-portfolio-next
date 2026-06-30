---
name: page-content-review
description: >-
  Review and rewrite the editorial content of jordan-t.dev pages (project
  pages, hero, "about" sections, descriptions, contact block). Trigger when the
  author wants to review, rewrite, shorten, clarify, or check the tone of page
  copy, a description, or a "Décision clé" block. Checks for em dash, overselling,
  repetition, and confidentiality leaks.
---

# Skill — Page content review and rewriting

Before any review, read [`../_shared/tone.md`](../_shared/tone.md) and apply
all of its tone conventions (banned self-promotion, no em dash, honesty about
trade-offs, never invented figures).

## Goal

Clarity, conciseness, tone consistency. The "Lead / Junior Architect" angle is
embraced but never oversold: show the reasoning, don't sell yourself.

## Site-specific constraints

- **Short "Décision clé" block** (2 to 3 lines, italicized): it's reused
  elsewhere on the site, so it must stay self-contained and concise. The page
  description can be longer.
- **No repetition between decision and description**: the page description
  doesn't restate the "Décision clé". It brings something else (intent,
  posture, a salient detail).
- **Single source of truth**: consistency across the site, the CV, and
  LinkedIn. No diverging narrative between channels.
- **Confidentiality**: never a phone number, date of birth, full postal
  address, or other sensitive personal data. Broad location only
  ("Lille métropole").

## Review checklist

To run explicitly on every text under review:

- Is there an em dash (—) anywhere? (forbidden, replace it)
- Any phrasing that oversells? (see the banned list in `_shared/tone.md`)
- Any repetition with the "Décision clé"?
- Any unverified or estimated figure? (get it confirmed by the author)
- Does the tone drift toward "polished AI", smooth and impersonal?
- Any confidential data leak (phone, address, personal data)?

## Method

When a phrasing choice is at stake, propose labeled variants (e.g. "Variant A
(sober)", "Variant B (more direct)") and let the author decide, rather than
imposing a single rewrite.
