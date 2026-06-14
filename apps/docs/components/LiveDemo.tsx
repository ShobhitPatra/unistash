"use client";

import { createStore } from "unistash";

const useCounter = createStore({
  state: { count: 0 },
  actions: {
    inc: (s) => ({ count: s.count + 1 }),
    dec: (s) => ({ count: s.count - 1 }),
  },
});

const SOURCE = `const useCounter = createStore({
  state: { count: 0 },
  actions: {
    inc: (s) => ({ count: s.count + 1 }),
    dec: (s) => ({ count: s.count - 1 }),
  },
})`;

export function LiveDemo() {
  const { count, inc, dec } = useCounter();
  return (
    <div className="mx-auto grid w-full max-w-3xl gap-4 md:grid-cols-2">
      <pre className="overflow-x-auto rounded-lg border border-fd-border bg-fd-card p-4 text-left text-xs leading-relaxed text-fd-muted-foreground">
        {SOURCE}
      </pre>
      <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-fd-border bg-fd-card p-6">
        <span className="text-4xl font-semibold tabular-nums">{count}</span>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={dec}
            aria-label="Decrement"
            className="size-10 rounded-md border border-fd-border text-lg transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground active:opacity-80"
          >
            −
          </button>
          <button
            type="button"
            onClick={inc}
            aria-label="Increment"
            className="size-10 rounded-md border border-fd-border text-lg transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground active:opacity-80"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
