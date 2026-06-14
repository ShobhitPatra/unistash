# Unistash

[![CI](https://github.com/ShobhitPatra/unistash/actions/workflows/ci.yml/badge.svg)](https://github.com/ShobhitPatra/unistash/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/unistash.svg)](https://www.npmjs.com/package/unistash)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Write once. Stash anywhere.**

The simplest way to manage React state — a tiny, fully-typed, zero-dependency
store. One `createStore`, no providers, no reducers.

[Documentation](https://unistashjs.vercel.app)

## Install

```bash
npm install unistash
```

## Quick start

```tsx
import { createStore } from "unistash";

const useCounter = createStore({
  state: { count: 0 },
  actions: {
    increment: (s) => ({ count: s.count + 1 }),
    add: (s, n: number) => ({ count: s.count + n }),
  },
  computed: {
    doubled: (s) => s.count * 2,
  },
});

function Counter() {
  const { count, doubled, increment } = useCounter();
  return (
    <button onClick={increment}>
      {count} ({doubled})
    </button>
  );
}
```

State, computed values, and actions all come from one hook.

## Selectors

```tsx
// re-renders only when count changes
const count = useCounter((s) => s.count);

import { shallow } from "unistash";
const slice = useCounter((s) => ({ a: s.count, b: s.doubled }), shallow);
```

## Imperative API

```ts
useCounter.getState();
useCounter.setState({ count: 5 });
const unsubscribe = useCounter.subscribe((snapshot) => {});
```

## Features

- **Zero dependencies** — just React (a peer).
- **Fully typed** — autocomplete on state, computed, and actions.
- **Selectors** — fine-grained re-renders, opt-in.
- **SSR-ready** — built on `useSyncExternalStore`, no hydration mismatch.
- **No boilerplate** — no providers, no reducers.

## Development

```bash
pnpm install
pnpm build
pnpm test
```

## License

MIT
