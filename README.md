# Unistash

**Write once. Stash anywhere.**

Universal state management abstraction for React. Use the same code with Zustand, Jotai, Redux, Recoil, or any other state library.

## Why Unistash?

- **Switch libraries instantly** - Change one import, keep your code
- **Learn once, use everywhere** - One API for all state libraries
- **Zero vendor lock-in** - Never rewrite state logic again
- **Perfect for OSS** - Contributors don't need to learn every library
- **Type-safe** - Full TypeScript support across all adapters

## Quick Start

```bash
# Install your preferred adapter
npm install @unistash/zustand
# or @unistash/jotai, @unistash/redux, etc.
```

```typescript
import { createStore } from "@unistash/zustand";

const useCounterStore = createStore({
  state: { count: 0 },
  actions: {
    increment: (state) => ({ count: state.count + 1 }),
    decrement: (state) => ({ count: state.count - 1 }),
  },
  computed: {
    doubled: (state) => state.count * 2,
  },
});

function Counter() {
  const { count, doubled, actions } = useCounterStore();

  return (
    <div>
      <p>
        Count: {count} (doubled: {doubled})
      </p>
      <button onClick={actions.increment}>+</button>
      <button onClick={actions.decrement}>-</button>
    </div>
  );
}
```

## Available Adapters

- ✅ `@unistash/zustand` - Zustand adapter
- ✅ `@unistash/jotai` - Jotai adapter
- ✅`@unistash/redux` - Coming soon
- 🚧 `@unistash/recoil` - Coming soon
- 🚧 `@unistash/valtio` - Coming soon

## Documentation

Visit [unistash.dev](https://unistash.dev) for full documentation.

## Monorepo Structure

This is a monorepo managed with pnpm and Turborepo:

```
unistash/
├── packages/
│   ├── core/      - Core types and interfaces
│   ├── zustand/   - Zustand adapter
│   └── jotai/     - Jotai adapter
```

## Development

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Create a changeset
pnpm changeset

# Publish packages
pnpm release
```

## License

MIT © [Shobhit Patra]
