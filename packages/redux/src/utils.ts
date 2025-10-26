import { createSelector } from "@reduxjs/toolkit";

/**
 * Builds computed selectors using Redux Toolkit's createSelector
 */
export function buildComputedSelectors(
  computed: Record<string, (state: any) => any> | undefined,
  selectState: (rootState: any) => any
) {
  const computedSelectors = {} as Record<string, any>;

  if (computed) {
    Object.entries(computed).forEach(([key, computeFn]) => {
      computedSelectors[key] = createSelector([selectState], (state) =>
        computeFn(state)
      );
    });
  }

  return computedSelectors;
}
