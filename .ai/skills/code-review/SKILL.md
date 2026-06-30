# Skill — Code review (Boy-Scout / SRP / KISS / DRY)

A focused quality pass on a diff before it's considered done. Not a bug hunt —
this is about keeping the codebase clean, small, and consistent. Leave the code
cleaner than you found it.

## When to run

After every feature or refactor, on the diff (`git diff`), before declaring done.

## Checklist

**DRY**
- Is any markup, CSS, or logic duplicated twice or more? Factor it (shared
  component, `composes:` from a base module, a `lib` helper).
- Is a design value hardcoded instead of using a token?

**KISS**
- Is this the simplest thing that works? Remove speculative flexibility.
- Any abstraction (component/helper) used in only one place? Inline it.

**SRP / structure**
- Does each unit do one thing? Split mixed responsibilities (e.g. data access
  leaking into a component — it belongs in `lib`).
- Right layer? `ui/` primitive vs `sections/` vs `cards/` vs `lib/`.

**Boy-Scout**
- Dead code, commented-out blocks, leftover `console.log`? Remove them.
- Names descriptive and consistent with neighbours (English, casing)?
- Touched something fragile nearby that's cheap to improve? Improve it.

**Conventions** (see [`conventions.md`](../../context/conventions.md))
- One component per folder; default export; `@/…` imports.
- Comments and identifiers in English; user copy in French.

## Finish

`pnpm lint && pnpm test && pnpm build` green. If a finding is too big to fix
now, note it — don't leave it silently.
