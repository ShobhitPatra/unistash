# @unistash/redux

Redux Toolkit adapter for Unistash.

## Installation

```bash
npm install @unistash/redux @reduxjs/toolkit react-redux
```

## Usage

```typescript
import { createStore, UnistashProvider } from "@unistash/redux";

const useCounterStore = createStore({
  state: {
    count: 0,
  },
  actions: {
    increment: (state) => ({ count: state.count + 1 }),
    decrement: (state) => ({ count: state.count - 1 }),
  },
  computed: {
    doubled: (state) => state.count * 2,
  },
});

// You must wrap your app with the Provider
function App() {
  return (
    <UnistashProvider store={useCounterStore._store}>
      <Counter />
    </UnistashProvider>
  );
}

function Counter() {
  const { count, doubled, actions } = useCounterStore();

  return (
    <div>
      <p>Count: {count}</p>
      <p>Doubled: {doubled}</p>
      <button onClick={actions.increment}>+</button>
      <button onClick={actions.decrement}>-</button>
    </div>
  );
}
```

## Important Notes

- **Provider Required**: Redux needs the `<UnistashProvider>` wrapper at your app root
- **Redux DevTools**: Automatically enabled with Redux Toolkit
- **Middleware**: Redux Toolkit includes thunk middleware by default
- **setState**: Not supported - use actions instead (Redux best practice)

## Advanced Usage

Access the underlying Redux store and slice:

```typescript
const useStore = createStore({
  /* config */
});

// Access Redux store directly
const reduxStore = useStore._store;

// Access Redux slice
const reduxSlice = useStore._slice;

// Dispatch custom actions
reduxStore.dispatch(customAction());
```

See [unistash.dev](https://unistash.dev) for full documentation.
