# @unistash/zustand

Zustand adapter for Unistash.

## Installation

```bash
npm install @unistash/zustand zustand
```

## Usage

```typescript
import { createStore } from "@unistash/zustand";

const useStore = createStore({
  state: { count: 0 },
  actions: {
    increment: (state) => ({ count: state.count + 1 }),
  },
});
```

See [unistash.dev](https://unistash.dev) for full documentation.
