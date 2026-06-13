import { describe, expect, it, vi } from "vitest";
import { createVanillaStore } from "../vanilla/store";

describe("vanilla store: state, setState, subscribe", () => {
  it("returns initial raw state via getState", () => {
    const store = createVanillaStore({ state: { count: 0, name: "a" } });
    expect(store.getState()).toEqual({ count: 0, name: "a" });
  });

  it("shallow-merges a partial on setState", () => {
    const store = createVanillaStore({ state: { count: 0, name: "a" } });
    store.setState({ count: 5 });
    expect(store.getState()).toEqual({ count: 5, name: "a" });
  });

  it("accepts an updater function on setState", () => {
    const store = createVanillaStore({ state: { count: 1 } });
    store.setState((s) => ({ count: (s.count as number) + 9 }));
    expect(store.getState()).toEqual({ count: 10 });
  });

  it("notifies subscribers on change and stops after unsubscribe", () => {
    const store = createVanillaStore({ state: { count: 0 } });
    const listener = vi.fn();
    const unsub = store.subscribe(listener);
    store.setState({ count: 1 });
    expect(listener).toHaveBeenCalledTimes(1);
    unsub();
    store.setState({ count: 2 });
    expect(listener).toHaveBeenCalledTimes(1);
  });
});

describe("vanilla store: actions, computed, snapshot", () => {
  const makeStore = () =>
    createVanillaStore({
      state: { count: 0 },
      actions: {
        increment: (s) => ({ count: (s.count as number) + 1 }),
        add: (s, n) => ({ count: (s.count as number) + (n as number) }),
      },
      computed: {
        doubled: (s) => (s.count as number) * 2,
      },
    });

  it("snapshot merges state, computed, and actions", () => {
    const snap = makeStore().getSnapshot() as Record<string, unknown>;
    expect(snap.count).toBe(0);
    expect(snap.doubled).toBe(0);
    expect(typeof snap.increment).toBe("function");
    expect(typeof snap.add).toBe("function");
  });

  it("bound actions update state and recompute computed", () => {
    const store = makeStore();
    (store.getSnapshot() as any).increment();
    expect(store.getState()).toEqual({ count: 1 });
    expect((store.getSnapshot() as any).doubled).toBe(2);
  });

  it("bound actions forward args after dropping state", () => {
    const store = makeStore();
    (store.getSnapshot() as any).add(5);
    expect(store.getState()).toEqual({ count: 5 });
  });

  it("getSnapshot is referentially stable until state changes, then new", () => {
    const store = makeStore();
    const a = store.getSnapshot();
    const b = store.getSnapshot();
    expect(a).toBe(b);
    store.setState({ count: 1 });
    const c = store.getSnapshot();
    expect(c).not.toBe(a);
  });

  it("getServerSnapshot returns a stable snapshot reference", () => {
    const store = makeStore();
    expect(store.getServerSnapshot()).toBe(store.getServerSnapshot());
  });

  it("throws on a key that collides across state/computed/actions", () => {
    expect(() =>
      createVanillaStore({
        state: { count: 0 },
        computed: { count: (s) => s.count },
      }),
    ).toThrow(/collid/i);
  });
});
