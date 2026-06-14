# AGENTS.md

Guidance for AI agents and contributors working in this repository.

## What this is

Unistash is a tiny, zero-dependency, fully-typed React state-management library
(an alternative to zustand). This is a **pnpm + Turborepo monorepo**. The shipped
product is the **`unistash`** package; everything else supports it.

## Repository layout

- `packages/unistash` — the v2 library. **The only actively developed package.** Published to npm as `unistash`.
- `packages/{core,zustand,jotai,redux}` — **deprecated v1 adapter packages.** Frozen. Do not add features, docs, or tests to them; they only exist for backwards compatibility and are deprecated on npm.
- `apps/docs` — docs + landing site (Next 16, Fumadocs, Tailwind v4). Deploys to https://unistashjs.vercel.app.
- `examples/*` — Vite example apps for the deprecated adapters.
- `tooling/tsconfig` — shared `@unistash/tsconfig` base TS configs that every package extends.

## Setup & commands

Use **pnpm** (pinned via corepack — run `corepack enable` first).

- `pnpm install`
- `pnpm build` — build all packages (Turborepo).
- `pnpm test` — Vitest across packages.
- `pnpm typecheck` — `tsc --noEmit` across packages.
- `pnpm lint` — Biome check (no writes). `pnpm check` — Biome check with `--write`.
- `pnpm build:docs` — build the docs site. **This is the gate for any docs change.**
- Scope to one package: `pnpm --filter unistash <build|test|typecheck>`.

> Vitest runs through esbuild and does **not** type-check. After changing types,
> always run `pnpm --filter <pkg> typecheck` in addition to `pnpm test`.

> Never run `pnpm dev:docs` in automation — it is a persistent server and will hang.
> Verify docs with `pnpm build:docs` instead.

## Conventions

- **Lint/format: Biome** (not ESLint/Prettier). Config: root `biome.json`. Do not add new `any` — `noExplicitAny` is set to `warn` only to grandfather the old adapter code, not as license to add more.
- **Commits: Conventional Commits**, enforced by a husky `commit-msg` hook (commitlint). A `pre-commit` hook runs Biome via lint-staged. Do **not** add `Co-Authored-By` or any AI-attribution trailer to commit messages.
- **PRs: squash-merge** to keep `main` linear.
- **Tests: TDD with Vitest.** Runtime tests live in `src/__tests__/*.test.ts(x)`. Compile-time type assertions live in `src/__tests__/*.test-d.ts` (type-checked by `tsc`, ignored by Vitest because the name doesn't match its glob).
- Every package extends `@unistash/tsconfig`. The published `unistash` package builds with `tsconfig.build.json` (which excludes tests from `dist`).

## `unistash` architecture (`packages/unistash/src`)

Hook-only, no provider, no context — the store is a module-level singleton, the
same model as zustand.

- `vanilla/store.ts` — framework-agnostic engine: module-scoped `state`, a listener `Set`, `getState`/`setState` (shallow-merge then notify), bound actions, derived `computed`, and a **memoized snapshot** (`{ ...state, ...computed, ...actions }`) that stays referentially stable between changes (required by `useSyncExternalStore`). Throws at creation if a name collides across state/computed/actions.
- `react/createStore.ts` — the `createStore` hook factory. Built on React's `useSyncExternalStore` with a hand-rolled, zero-dependency selector-memoization layer. Statics `getState`/`setState`/`subscribe` are attached to the hook.
- `types.ts` — inference types: `BoundActions` (drops the leading `state` param), `ComputedReturns`, `Snapshot`, `StoreHook`.
- `shallow.ts` — one-level structural equality helper, exported for use as a selector `equalityFn`.

Public API: `createStore({ state, actions, computed })` returns a hook. A bare call
returns the flattened snapshot; `useStore(selector, equalityFn?)` gives fine-grained
subscriptions (default equality `Object.is`). Actions are pure: `(state, ...args) => Partial<state>`,
shallow-merged. SSR works via `getServerSnapshot`.

## Deploy & release

- Production deploys from `main` to https://unistashjs.vercel.app (Vercel).
- Releases use Changesets: add a changeset → the workflow opens a "Version Packages" PR → publishing happens when that PR merges. Requires the `NPM_TOKEN` repo secret (a bypass-2FA token).

## Roadmap (planned — not built yet)

These are planned, not yet implemented — **do not document them as current
features or assume they exist.** In rough priority order:

1. **Async / thunk actions** — express async updates (fetch, then set) without dropping to `setState`.
2. **Middleware system** — a small extension layer so the items below compose cleanly (the zustand model).
3. **Persistence** — opt-in localStorage/sessionStorage, built as the first middleware.
4. **Devtools** — Redux DevTools integration (action log, time travel), built as middleware.
5. **Vanilla entry** (`unistash/vanilla`) — expose the already-framework-agnostic engine as a public entry point.

Async actions and the middleware system change the core API, so each gets its own
design cycle (brainstorm → spec → plan) before implementation. `createAtom` is
intentionally **out of scope** — a one-field store covers it, and "atoms" is jotai's lane.
