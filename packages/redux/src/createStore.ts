import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import type { StoreConfig } from "@unistash/core";
import { buildComputedSelectors } from "./utils";

/**
 * Creates a Unistash store using Redux Toolkit as the underlying implementation
 */
export function createStore<TState extends object>(
  config: StoreConfig<TState>
) {
  // Build reducers from actions
  const reducers = {} as any;

  if (config.actions) {
    Object.entries(config.actions).forEach(([key, actionFn]) => {
      reducers[key] = (state: TState, action: PayloadAction<any[]>) => {
        const updates = actionFn(state, ...action.payload);
        return { ...state, ...updates };
      };
    });
  }

  // Create Redux slice
  const slice = createSlice({
    name: "unistash",
    initialState: config.state,
    reducers,
  });

  // Create Redux store
  const store = configureStore({
    reducer: {
      unistash: slice.reducer,
    },
  });

  // Select state from root
  const selectState = (rootState: any) => rootState.unistash;

  // Build computed selectors
  const computedSelectors = buildComputedSelectors(
    config.computed,
    selectState
  );

  // Action creators
  const actionCreators = slice.actions;

  // Return normalized hook that matches Unistash standard API
  const useStoreNormalized: any = () => {
    const dispatch = useDispatch();
    const state = useSelector(selectState);

    // Get all computed values
    const computedValues = {} as any;
    Object.entries(computedSelectors).forEach(([key, selector]) => {
      computedValues[key] = useSelector(selector);
    });

    // Wrap actions to match Unistash API
    const actions = {} as any;
    Object.entries(actionCreators).forEach(([key, actionCreator]) => {
      actions[key] = (...args: any[]) => {
        dispatch((actionCreator as any)(args));
      };
    });

    return {
      ...state,
      ...computedValues,
      actions,
    };
  };

  // Add utility methods
  useStoreNormalized.getState = () => {
    return store.getState().unistash;
  };

  useStoreNormalized.setState = (partial: Partial<TState>) => {
    // Redux doesn't support direct setState, would need a custom action
    console.warn(
      "setState is not directly supported with Redux adapter. Use actions instead."
    );
  };

  // Expose Redux store for advanced use cases
  (useStoreNormalized as any)._store = store;
  (useStoreNormalized as any)._slice = slice;

  return useStoreNormalized;
}
