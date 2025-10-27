# @unistash/jotai

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
