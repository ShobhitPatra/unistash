import type { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";

interface UnistashProviderProps {
  children: ReactNode;
  store: any; // The Redux store from createStore()._store
}

/**
 * Provider component that wraps your app for Redux
 *
 * @example
 * const useStore = createStore({ ... });
 *
 * function App() {
 *   return (
 *     <UnistashProvider store={useStore._store}>
 *       <YourApp />
 *     </UnistashProvider>
 *   );
 * }
 */
export function UnistashProvider({ children, store }: UnistashProviderProps) {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
}
