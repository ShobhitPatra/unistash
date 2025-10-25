/**
 * Configuration for creating a store
 */
export interface StoreConfig<T> {
  /** Initial state */
  state: T;
  /** Action functions that update state */
  actions?: Record<string, (state: T, ...args: any[]) => Partial<T>>;
  /** Computed/derived values from state */
  computed?: Record<string, (state: T) => any>;
}

/**
 * Configuration for creating an atom
 */
export interface AtomConfig<T> {
  /** Default/initial value or async initializer */
  default: T | (() => T | Promise<T>);
}

/**
 * The hook returned by createStore
 */
export type StoreHook<T, A> = {
  (): T & { actions: A };
  getState: () => T;
  setState: (partial: Partial<T>) => void;
};
