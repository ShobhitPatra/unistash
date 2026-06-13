type AnyState = Record<string, unknown>;

export interface VanillaStore<TSnapshot> {
  getState: () => AnyState;
  setState: (partial: AnyState | ((state: AnyState) => AnyState)) => void;
  subscribe: (listener: (snapshot: TSnapshot) => void) => () => void;
  getSnapshot: () => TSnapshot;
  getServerSnapshot: () => TSnapshot;
}

export interface VanillaConfig {
  state: AnyState;
  actions?: Record<string, (state: AnyState, ...args: unknown[]) => AnyState>;
  computed?: Record<string, (state: AnyState) => unknown>;
}

function assertNoCollisions(config: VanillaConfig): void {
  const seen = new Set<string>();
  const groups: Array<[string, string[]]> = [
    ["state", Object.keys(config.state)],
    ["computed", config.computed ? Object.keys(config.computed) : []],
    ["actions", config.actions ? Object.keys(config.actions) : []],
  ];
  for (const [, keys] of groups) {
    for (const key of keys) {
      if (seen.has(key)) {
        throw new Error(
          `unistash: key "${key}" collides across state/computed/actions. ` +
            `State, computed, and action names must be unique.`,
        );
      }
      seen.add(key);
    }
  }
}

export function createVanillaStore<TSnapshot = AnyState>(
  config: VanillaConfig,
): VanillaStore<TSnapshot> {
  assertNoCollisions(config);

  let state: AnyState = { ...config.state };
  const listeners = new Set<(snapshot: TSnapshot) => void>();

  // Bound actions are created once and reused (stable references).
  const boundActions: Record<string, (...args: unknown[]) => void> = {};
  if (config.actions) {
    for (const key of Object.keys(config.actions)) {
      const fn = config.actions[key];
      boundActions[key] = (...args: unknown[]) => {
        setState(fn(state, ...args));
      };
    }
  }

  function buildSnapshot(): TSnapshot {
    const computedValues: AnyState = {};
    if (config.computed) {
      for (const key of Object.keys(config.computed)) {
        computedValues[key] = config.computed[key](state);
      }
    }
    return {
      ...state,
      ...computedValues,
      ...boundActions,
    } as unknown as TSnapshot;
  }

  let snapshot = buildSnapshot();
  const serverSnapshot = snapshot; // stable reference for SSR

  const getState = () => state;

  function setState(partial: AnyState | ((state: AnyState) => AnyState)) {
    const next = typeof partial === "function" ? partial(state) : partial;
    state = { ...state, ...next };
    snapshot = buildSnapshot();
    for (const listener of listeners) {
      listener(snapshot);
    }
  }

  const subscribe = (listener: (snapshot: TSnapshot) => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  const getSnapshot = () => snapshot;
  const getServerSnapshot = () => serverSnapshot;

  return { getState, setState, subscribe, getSnapshot, getServerSnapshot };
}
