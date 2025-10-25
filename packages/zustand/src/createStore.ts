import { create } from "zustand";
import type { StoreConfig } from "@unistash/core";
import { buildComputedValues } from "./utils";

/**
 * Creates a Unistash store using Zustand as the underlying implementation
 */
export function createStore<
  TState extends object,
  TActions extends Record<string, (...args: any[]) => any> = {}
>(config: StoreConfig<TState>) {
  // Create Zustand store with actions embedded
  const useStore = create<TState & { _actions: any }>((set, get) => {
    const actions = {} as any;

    if (config.actions) {
      Object.entries(config.actions).forEach(([key, actionFn]) => {
        actions[key] = (...args: any[]) => {
          set((state) => {
            const updates = actionFn(state, ...args);
            return updates as any;
          });
        };
      });
    }

    return {
      ...config.state,
      _actions: actions,
    } as TState & { _actions: any };
  });

  // Build computed value hooks
  const computed = buildComputedValues(config.computed, useStore);

  // Return normalized hook that matches Unistash standard API
  const useStoreNormalized: any = () => {
    const state = useStore();
    const { _actions, ...stateWithoutActions } = state;

    // Get all computed values
    const computedValues = {} as any;
    Object.entries(computed).forEach(([key, hook]) => {
      computedValues[key] = (hook as any)();
    });

    return {
      ...stateWithoutActions,
      ...computedValues,
      actions: _actions,
    };
  };

  // Add utility methods
  useStoreNormalized.getState = () => {
    const { _actions, ...state } = useStore.getState();
    return state;
  };

  useStoreNormalized.setState = (partial: Partial<TState>) => {
    useStore.setState(partial as any);
  };

  return useStoreNormalized;
}
