# Unistash

**Write once. Stash anywhere.**

Lightweight React state management that just works. One package, zero dependencies, full TypeScript support. Swap engines with a single import change.

## Install

```bash
npm install unistash
```

## Quick Start

```typescript
import { createStore } from "unistash";

const useCounter = createStore({
  state: {
    count: 0,
  },
  actions: {
    increment: (state) => ({ count: state.count + 1 }),
    decrement: (state) => ({ count: state.count - 1 }),
    add: (state, amount: number) => ({ count: state.count + amount }),
  },
  computed: {
    doubled: (state) => state.count * 2,
    isPositive: (state) => state.count > 0,
  },
});

function Counter() {
  const { count, doubled, increment, decrement } = useCounter();

  return (
    <div>
      <p>
        Count: {count} (doubled: {doubled})
      </p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

## Features

- **Lightweight** — zero dependencies, built on React's `useSyncExternalStore`
- **Simple API** — `createStore` is the entire API
- **Type-safe** — full inference, no generics needed
- **Swappable** — change one import to switch to Zustand, Jotai, or Redux
- **DevTools** — built-in console logging + optional Redux DevTools

## Adapters

The default engine works out of the box. Need to plug into an existing ecosystem? Swap with one line:

```typescript
import { createStore } from "unistash";          // built-in engine
import { createStore } from "unistash/zustand";   // zustand
import { createStore } from "unistash/jotai";     // jotai
import { createStore } from "unistash/redux";     // redux
```

Same API, same behavior. Adapter peer dependencies are installed separately only when needed.

## Outside React

```typescript
useCounter.get();                         // read state
useCounter.set({ count: 5 });             // write state
const unsub = useCounter.on((s) => {});   // subscribe
```

## Scoped Stores

For component-scoped state with isolated instances:

```typescript
import { createScopedStore } from "unistash";

const { Provider, useStore } = createScopedStore({
  state: { value: 0 },
  actions: {
    set: (state, v: number) => ({ value: v }),
  },
});

// Each Provider gets its own state
<Provider><Widget /></Provider>
<Provider><Widget /></Provider>
```

## DevTools

```typescript
// Console logging — built-in, no extra imports
const useCounter = createStore({
  state: { count: 0 },
  actions: { increment: (state) => ({ count: state.count + 1 }) },
  devtools: true,
});

// Redux DevTools — optional import
import { devtools } from "unistash/devtools";

const useCounter = createStore({
  state: { count: 0 },
  actions: { increment: (state) => ({ count: state.count + 1 }) },
  devtools: devtools({ name: "Counter" }),
});
```

## CLI

Scaffold a store into an existing React project:

```bash
npx create-unistash
```

## Development

```bash
pnpm install
pnpm build
pnpm test
```

## License

MIT
