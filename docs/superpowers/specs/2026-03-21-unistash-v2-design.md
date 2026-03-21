# Unistash v2 — Design Spec

## Overview

Full revamp of Unistash — a lightweight, dev-friendly React state management library. Ships as a single `unistash` npm package with a built-in zero-dependency engine and optional adapter support for Zustand, Jotai, and Redux via subpath exports.

**Target audience:** App developers who want a simple, unified state API.

**Core principles:**
- Lightweight — zero dependencies for the default engine
- Dev-friendly — learn the full API in under a minute
- Explicit — no magic, every concept has a clear wrapper
- Swappable — change one import line to switch engines

---

## Core API

### `createStore`

One function to create a store. Returns a React hook with utility methods.

```ts
import { createStore } from 'unistash'

const useCounter = createStore({
  state: {
    count: 0,
    name: 'hello',
  },
  actions: {
    increment: (state) => ({ count: state.count + 1 }),
    add: (state, amount: number) => ({ count: state.count + amount }),
  },
  computed: {
    doubled: (state) => state.count * 2,
    isPositive: (state) => state.count > 0,
  },
})
```

### Store config shape

Three top-level keys:

| Key | Purpose | Rule |
|-----|---------|------|
| `state` | Initial values | Plain values only |
| `actions` | State transitions | Functions that receive `(state, ...args)` and return `Partial<State>` |
| `computed` | Derived values | Functions that receive `(state)` and return a value |

### Using the hook

```ts
// In components — everything destructures flat
const { count, name, doubled, isPositive, increment, add } = useCounter()

// With selector — for performance optimization
const count = useCounter((s) => s.count)
```

### Outside React

```ts
useCounter.get()                      // read current state
useCounter.set({ count: 5 })          // write partial state
useCounter.on((state) => console.log(state))  // subscribe
```

### Action rules
- Actions are pure — they receive state, return partial state
- Actions cannot call other actions
- Composition happens in userland (component handlers)

### Computed rules
- Computed values derive from state only
- Computed cannot depend on other computed values
- Each computed is flat and independent

---

## Adapters & Subpath Exports

Externally one npm package. Adapters are subpath exports:

```ts
import { createStore } from 'unistash'           // built-in engine (zero deps)
import { createStore } from 'unistash/zustand'    // requires zustand peer dep
import { createStore } from 'unistash/jotai'      // requires jotai peer dep
import { createStore } from 'unistash/redux'      // requires @reduxjs/toolkit + react-redux peer deps
```

### Contract

Every adapter exports the same `createStore` with the exact same signature and behavior. Switching is a one-line import change. Nothing else changes.

### Why use an adapter?
- Already using Zustand/Jotai/Redux and want shared devtools/middleware
- Team alignment with an existing ecosystem
- Need library-specific features via escape hatches

---

## Scoped Stores

Global stores are the default. For component-scoped stores:

```ts
import { createScopedStore } from 'unistash'

const { Provider, useStore } = createScopedStore({
  state: { value: 0 },
  actions: {
    set: (state, v: number) => ({ value: v }),
  },
})
```

```tsx
<Provider>
  <Widget />  {/* isolated state instance */}
</Provider>
<Provider>
  <Widget />  {/* separate isolated instance */}
</Provider>
```

### Rules
- Separate function: `createScopedStore` (not `createStore`)
- Returns `{ Provider, useStore }`
- Same store config shape as `createStore`
- No `.get()`, `.set()`, `.on()` — scoped stores are tied to a React subtree
- Provider accepts optional `initialState` override

---

## DevTools

### Console logging (built-in)

```ts
const useCounter = createStore({
  state: { count: 0 },
  actions: {
    increment: (state) => ({ count: state.count + 1 }),
  },
  devtools: true,
})
```

Logs: `[unistash] increment → { count: 1 }`

- No extra import needed
- Auto-disabled in production

### Redux DevTools (optional)

```ts
import { devtools } from 'unistash/devtools'

const useCounter = createStore({
  state: { count: 0 },
  actions: {
    increment: (state) => ({ count: state.count + 1 }),
  },
  devtools: devtools({ name: 'Counter' }),
})
```

- Connects to Redux DevTools browser extension
- Time travel, state diff, action history
- Per-store, not global
- Auto-disabled in production

---

## CLI (`create-unistash`)

Scaffolding CLI for quick setup:

```
npx create-unistash
```

### Interactive prompts
1. **Project name** — folder/store name
2. **Adapter** — Built-in (default) / Zustand / Jotai / Redux
3. **DevTools** — Console logging / Redux DevTools / None
4. **TypeScript** — Yes / No

### Output
- A starter store file (e.g., `stores/counter.ts`)
- DevTools pre-configured if selected
- Install command with correct peer deps

### What it does NOT do
- No full app scaffolding — assumes existing React project
- No config files, no boilerplate

### Dependencies
- `@clack/prompts` for interactive UI

---

## Package Structure (Internal Monorepo)

Two published packages: `unistash` and `create-unistash`.

```
unistash/
├── packages/
│   ├── unistash/                # Published as `unistash`
│   │   ├── src/
│   │   │   ├── core/            # createStore, types, store engine
│   │   │   ├── adapters/
│   │   │   │   ├── zustand/
│   │   │   │   ├── jotai/
│   │   │   │   └── redux/
│   │   │   ├── scoped/          # createScopedStore + Provider
│   │   │   ├── devtools/        # console logger + Redux DevTools
│   │   │   └── index.ts
│   │   └── package.json         # subpath exports
│   │
│   └── create-unistash/         # Published as `create-unistash`
│       ├── src/
│       │   ├── prompts.ts
│       │   ├── scaffold.ts
│       │   └── index.ts
│       └── package.json
│
├── apps/
│   └── docs/                    # Next.js + Fumadocs
│
├── examples/
│   ├── basic/
│   ├── zustand/
│   ├── scoped/
│   └── devtools/
│
└── tests/
    └── conformance/             # Shared tests — all adapters must pass
```

### Exports map (`package.json`)

```json
{
  "exports": {
    ".": "./dist/index.js",
    "./zustand": "./dist/adapters/zustand/index.js",
    "./jotai": "./dist/adapters/jotai/index.js",
    "./redux": "./dist/adapters/redux/index.js",
    "./devtools": "./dist/devtools/index.js"
  }
}
```

---

## TypeScript

Full type inference with zero manual annotations:

```ts
const useCounter = createStore({
  state: { count: 0, name: 'hello' },
  actions: {
    increment: (state) => ({ count: state.count + 1 }),
    add: (state, amount: number) => ({ count: state.count + amount }),
  },
  computed: {
    doubled: (state) => state.count * 2,
  },
})

const { count, name, doubled, increment, add } = useCounter()
//      ^number ^string ^number  ^() => void  ^(amount: number) => void
```

### Rules
- State types inferred from initial values
- Action args inferred — `state` param stripped, only user args exposed
- Computed return types inferred
- `.set()` accepts `Partial<State>` only — invalid keys are TS errors
- Selector return type flows through
- Same types across all adapters
- No generics needed by the user (optional `createStore<T>(...)` supported but never necessary)

---

## Built-in Engine

Powered by React's `useSyncExternalStore`:
- Zero external dependencies
- React-blessed primitive
- Battle-tested (same approach Zustand uses internally)
- No proxy magic, no signals — straightforward subscribe/getSnapshot pattern

---

## Conformance Testing

A shared test suite that every adapter must pass:
- State initialization
- Action execution and partial state merge
- Computed value derivation
- Selector-based re-render optimization
- `.get()`, `.set()`, `.on()` outside React
- Scoped store isolation
- DevTools integration

This guarantees that switching adapters is truly a one-line change with no behavioral differences.
