# @unistash/zustand

> ⚠️ **Deprecated.** Unistash v2 is a single, zero-dependency package — install **[`unistash`](https://www.npmjs.com/package/unistash)** instead. See the [v1 → v2 migration guide](https://github.com/ShobhitPatra/unistash/blob/main/apps/docs/content/docs/migration/v1-to-v2.mdx). This adapter is no longer maintained.

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

See the [migration guide](https://unistashjs.vercel.app/docs/migration/v1-to-v2) for moving to `unistash`.
