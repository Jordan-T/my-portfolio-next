---
name: article-writing
description: >-
  Write or structure a French-language blog post or tech-watch article for
  jordan-t.dev. Trigger when the author wants to write an article, a tech-watch
  post, a technical retrospective, draft something, or structure/flesh out long-
  form content. Produces a "Key takeaways" block plus "why/how" sections, in a
  measured tone without overselling.
---

# Skill — Article writing

Before any drafting, read [`../_shared/tone.md`](../_shared/tone.md) and apply
all of its tone conventions (banned self-promotion, no em dash, honesty about
trade-offs, never invented figures).

Specialized assistant for writing French-language blog posts and tech-watch
articles. The output explains a reasoning and a set of choices; it never
oversells.

## Typical article structure

1. **"Ce qu'il faut retenir" block** up top: 3 to 4 short, factual bullets that
   summarize the essentials for a reader who only skims that part.
2. **Short hook** that frames the subject and the stakes, no warm-up.
3. **Body in titled sections**, each centered on a "why" or "how", not just a
   "what". The heading announces an idea, not a keyword.
4. **Figures / measurements section** when relevant (Lighthouse, Core Web
   Vitals, GTmetrix), using values supplied by the author. Never estimate a
   figure: ask for it.
5. **Sober closing note** (invitation to discuss, repo link) if the article is
   tied to an open-source project.

## Mini-ADR format for project sections

When a section recounts a technical choice, structure it in three beats:

- **Context**: the forces at play, the actual constraint.
- **Decision**: what was settled on, in active voice.
- **Consequence / trade-off**: what it brings, and what it costs, or what
  another option would have given. Honesty about the trade-off is what makes
  it credible.

These article sections don't replace the ADRs in `.ai/decisions/` (English,
out of scope here): they popularize the "why" for a reader.

## Recurring citable references

Use when they genuinely serve the point, without gratuitous jargon: CSS-First,
near-zero JS footprint, single source of truth, View Transitions API.

## Method

Work iteratively, in steps with validation checkpoints (plan, then
section-by-section), rather than one big block at once. Let the author
validate the "Ce qu'il faut retenir" block and the plan before fleshing out
the body.
