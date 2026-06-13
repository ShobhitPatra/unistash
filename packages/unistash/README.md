# unistash

**Write once. Stash anywhere.** A tiny, typed, zero-dependency React state library.

```bash
npm install unistash
```

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
  return <button onClick={() => increment()}>{count} ({doubled})</button>;
}
```

## Selectors

```tsx
// re-renders only when `count` changes
const count = useCounter((s) => s.count);

// custom equality
import { shallow } from "unistash";
const { a, b } = useCounter((s) => ({ a: s.count, b: s.doubled }), shallow);
```

## Imperative API

```ts
useCounter.getState();
useCounter.setState({ count: 5 });
const unsubscribe = useCounter.subscribe((snapshot) => {
  /* ... */
});
```

Requires React 18 or 19 (peer dependency). Zero runtime dependencies.
