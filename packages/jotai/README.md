# @unistash/jotai

> ⚠️ **Deprecated.** Unistash v2 is a single, zero-dependency package — install **[`unistash`](https://www.npmjs.com/package/unistash)** instead. See the [v1 → v2 migration guide](https://github.com/ShobhitPatra/unistash/blob/main/apps/docs/content/docs/migration/v1-to-v2.mdx). This adapter is no longer maintained.

Jotai adapter for Unistash.

## Installation

```bash
npm install @unistash/jotai jotai
```

## Usage

```typescript
import { createStore } from "@unistash/jotai";
import { Provider } from "jotai";

const useStore = createStore({
  state: { count: 0 },
  actions: {
    increment: (state) => ({ count: state.count + 1 }),
  },
});

function App() {
  return (
    <Provider>
      <Counter />
    </Provider>
  );
}
```

**Note:** Jotai requires a `<Provider>` wrapper at the root of your app.

See [unistash.dev](https://unistash-seven.vercel.app/docs/adapter/jotai) for full documentation.
