import { atom, useAtomValue, useSetAtom } from "jotai";
import type { StoreConfig } from "@unistash/core";
import { buildActionAtoms, buildComputedAtoms } from "./utils";

/**
 * Creates a Unistash store using Jotai as the underlying implementation
 */
export function createStore<TState extends object>(
  config: StoreConfig<TState>
) {
  // Create base atom for state
  const storeAtom = atom(config.state);

  // Build action and computed atoms
  const actionAtoms = buildActionAtoms(config.actions, storeAtom);
  const computedAtoms = buildComputedAtoms(config.computed, storeAtom);

  // Return normalized hook that matches Unistash standard API
  const useStoreNormalized = () => {
    const state = useAtomValue(storeAtom);

    // Get all computed values
    const computedValues = {} as any;
    Object.entries(computedAtoms).forEach(([key, atom]) => {
      computedValues[key] = useAtomValue(atom);
    });

    // Get all action setters
    const actions = {} as any;
    Object.entries(actionAtoms).forEach(([key, atom]) => {
      actions[key] = useSetAtom(atom);
    });

    return {
      ...state,
      ...computedValues,
      actions,
    };
  };

  // Add utility methods (with warnings for Jotai limitations)
  useStoreNormalized.getState = () => {
    console.warn(
      "getState() is not fully supported with Jotai adapter outside React context"
    );
    return config.state;
  };

  useStoreNormalized.setState = () => {
    console.warn(
      "setState() is not fully supported with Jotai adapter outside React context"
    );
  };

  // Expose raw atom for advanced use cases
  (useStoreNormalized as any)._atom = storeAtom;

  return useStoreNormalized;
}
