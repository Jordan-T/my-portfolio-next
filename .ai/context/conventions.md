# Conventions

> Deduced from the codebase, not bolted on top of it. New code should be
> indistinguishable from existing code.

## Naming & structure

- One component per folder: `ComponentName/ComponentName.tsx` +
  `ComponentName.module.css`.
- Components grouped by role: `ui/` (primitives), `cards/`, `sections/`,
  `layout/`.
- Components and types in `PascalCase`; functions and variables in `camelCase`.
- Default-export the component from its file.
- Path alias `@/*` → `src/*` (see `tsconfig.json`). Import via `@/…`, not deep
  relative paths.

## TypeScript

- `strict` mode. No implicit `any`; don't reach for a non-null `!` to silence
  the compiler.
- Type content against `src/types`; add defaults in `lib`, not in components.

## Language

- **Code, identifiers, comments, and documentation: English.**
- **User-facing copy (JSX text): French.** This is a French site, so follow
  French typography: never use the em-dash (`—`); prefer a colon, comma, or
  parentheses instead. (This rule is about the French copy; these English docs
  use normal English punctuation.)
- **Commit messages: English, Conventional Commits** (`feat:`, `fix:`,
  `refactor:`, `chore:`, `test:`, `docs:`, `style:`). One logical change per
  commit.

## Code quality — non-negotiable

- **DRY.** Markup, CSS, or logic duplicated twice or more gets factored out
  (e.g. `ui/Tags`, `sections/PageHeader`, `styles/card.module.css`).
- **KISS.** The simplest solution that works. Never extract a component/helper
  used in a single place; don't over-abstract.
- **Clean code.** Small focused units, descriptive names, no dead or
  commented-out code, no leftover `console.log`.
- **Comments: sparse, only when truly useful.** Code should be self-explanatory
  through naming and structure. Add a comment only to capture a non-obvious
  "why" (a constraint, a trade-off, a workaround) that the code itself can't
  express — never to restate what the code already says.
- Run a DRY/KISS pass on the diff after every feature — see
  [`code-review`](../skills/code-review/SKILL.md).

## Testing

Vitest only. TDD encouraged for `lib/`.

**Test:** business logic in `src/lib/` (parsing, sorting, defaults, lookups);
presentational components **only when they contain a branch/decision** (empty
state, value→label mapping).

**Don't test:** the framework (rendering, routing, `generateStaticParams`),
async Server Components (RTL can't render them), markup/snapshots, CSS, or
third-party libraries.

**How:** co-locate as `*.test.ts(x)` next to the unit; point `lib` tests at
`src/lib/__fixtures__/` so real content changes never break tests.

**Accessibility:** every new or modified visible component gets an axe test via
`findA11yViolations` (`src/test/axe.ts`) — see
[`accessibility-review`](../skills/accessibility-review/SKILL.md).

## Definition of done

A change is **not done** until `pnpm lint`, `pnpm test`, and `pnpm build` all
pass with zero errors.
