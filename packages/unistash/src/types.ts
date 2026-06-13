/** An action: receives current state plus args, returns a partial to shallow-merge. */
export type ActionFn<TState> = (
  state: TState,
  ...args: never[]
) => Partial<TState>;

/** A computed selector: derives a value from state. */
export type ComputedFn<TState> = (state: TState) => unknown;

/** Configuration passed to createStore. */
export interface StoreConfig<
  TState extends object,
  TActions extends Record<string, ActionFn<TState>>,
  TComputed extends Record<string, ComputedFn<TState>>,
> {
  state: TState;
  actions?: TActions;
  computed?: TComputed;
}

/** Strips the leading `state` param from each action: (state, ...args) => P  ->  (...args) => void. */
export type BoundActions<TActions> = {
  [K in keyof TActions]: TActions[K] extends (
    state: never,
    ...args: infer P
  ) => unknown
    ? (...args: P) => void
    : never;
};

/** Maps each computed fn to its return type. */
export type ComputedReturns<TComputed> = {
  [K in keyof TComputed]: TComputed[K] extends (state: never) => infer R
    ? R
    : never;
};

/** The merged value the hook returns / the selector receives. */
export type Snapshot<TState, TActions, TComputed> = TState &
  ComputedReturns<TComputed> &
  BoundActions<TActions>;

/** The hook returned by createStore: bare call + selector overload + imperative statics. */
export interface StoreHook<TState extends object, TActions, TComputed> {
  (): Snapshot<TState, TActions, TComputed>;
  <U>(
    selector: (snapshot: Snapshot<TState, TActions, TComputed>) => U,
    equalityFn?: (a: U, b: U) => boolean,
  ): U;
  getState: () => TState;
  setState: (
    partial: Partial<TState> | ((state: TState) => Partial<TState>),
  ) => void;
  subscribe: (
    listener: (snapshot: Snapshot<TState, TActions, TComputed>) => void,
  ) => () => void;
}
