# Contributing

This is a personal portfolio, so it has no roadmap open to outside features.
That said, feedback is genuinely welcome, an accessibility or performance issue,
a bug, a typo, or a question about an architecture choice.

## Feedback and issues

Open an issue: a clear title, what you expected, what you observed, and the page
or browser if relevant. Discussions about the technical trade-offs documented in
[`.ai/decisions/`](.ai/decisions/) are welcome too.

## If you do open a pull request

Read [`AGENTS.md`](AGENTS.md) first, it routes to the detailed context. The rules
in this repo are strict by design:

- Stack is non-negotiable (Next.js App Router, React 19, TypeScript `strict`,
  CSS Modules, pnpm). See [`AGENTS.md`](AGENTS.md).
- Conventions, architecture, and the design system live in
  [`.ai/context/`](.ai/context/).
- A change is not done until `pnpm lint`, `pnpm test`, and `pnpm build` pass
  with zero errors. Accessibility and predictable performance are build gates
  (`pnpm test:a11y`, `pnpm audit:perf`).

Code, comments, and commit messages in English (Conventional Commits);
user-facing copy in French.
