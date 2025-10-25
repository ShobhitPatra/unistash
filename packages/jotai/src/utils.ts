import { atom } from "jotai";
import type { WritableAtom, Atom } from "jotai";

/**
 * Builds action atoms for Jotai
 */
export function buildActionAtoms(
  actions: Record<string, (state: any, ...args: any[]) => any> | undefined,
  storeAtom: WritableAtom<any, any, any>
) {
  const actionAtoms = {} as Record<string, WritableAtom<null, any, void>>;

  if (actions) {
    Object.entries(actions).forEach(([key, actionFn]) => {
      actionAtoms[key] = atom(null, (get, set, ...args: any[]) => {
        const currentState = get(storeAtom);
        const updates = actionFn(currentState, ...args);
        set(storeAtom, { ...currentState, ...updates });
      });
    });
  }

  return actionAtoms;
}

/**
 * Builds computed atoms for Jotai
 */
export function buildComputedAtoms(
  computed: Record<string, (state: any) => any> | undefined,
  storeAtom: Atom<any>
) {
  const computedAtoms = {} as Record<string, Atom<any>>;

  if (computed) {
    Object.entries(computed).forEach(([key, computeFn]) => {
      computedAtoms[key] = atom((get) => {
        const state = get(storeAtom);
        return computeFn(state);
      });
    });
  }

  return computedAtoms;
}
