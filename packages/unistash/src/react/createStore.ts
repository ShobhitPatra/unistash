import { useRef, useSyncExternalStore } from "react";
import type { Snapshot, StoreHook } from "../types";
import { createVanillaStore } from "../vanilla/store";

export function createStore<
  TState extends object,
  TActions extends Record<
    string,
    (state: TState, ...args: never[]) => Partial<TState>
  >,
  TComputed extends Record<string, (state: TState) => unknown>,
>(config: {
  state: TState;
  actions?: TActions;
  computed?: TComputed;
}): StoreHook<TState, TActions, TComputed> {
  type Snap = Snapshot<TState, TActions, TComputed>;

  // The vanilla store is internally loosely typed; we apply the real types here.
  const store = createVanillaStore<Snap>(config as never);

  const identity = (snapshot: Snap): unknown => snapshot;

  function useStore(): Snap;
  function useStore<U>(
    selector: (snapshot: Snap) => U,
    equalityFn?: (a: U, b: U) => boolean,
  ): U;
  function useStore<U>(
    selector: (snapshot: Snap) => U = identity as (snapshot: Snap) => U,
    equalityFn: (a: U, b: U) => boolean = Object.is,
  ): U {
    // Per-component memo so the value handed to useSyncExternalStore is
    // referentially stable when the selected slice is unchanged.
    const memo = useRef<{ snapshot: Snap; selection: U } | null>(null);

    const getSelection = (snapshot: Snap): U => {
      const cached = memo.current;
      if (cached && cached.snapshot === snapshot) {
        return cached.selection;
      }
      const next = selector(snapshot);
      if (cached && equalityFn(cached.selection, next)) {
        // Keep the previous selection reference; just advance the snapshot pointer.
        memo.current = { snapshot, selection: cached.selection };
        return cached.selection;
      }
      memo.current = { snapshot, selection: next };
      return next;
    };

    return useSyncExternalStore(
      store.subscribe,
      () => getSelection(store.getSnapshot()),
      () => getSelection(store.getServerSnapshot()),
    );
  }

  const hook = useStore as StoreHook<TState, TActions, TComputed>;
  hook.getState = store.getState as StoreHook<
    TState,
    TActions,
    TComputed
  >["getState"];
  hook.setState = store.setState as StoreHook<
    TState,
    TActions,
    TComputed
  >["setState"];
  hook.subscribe = store.subscribe as StoreHook<
    TState,
    TActions,
    TComputed
  >["subscribe"];

  return hook;
}
