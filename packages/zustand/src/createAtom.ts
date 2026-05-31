import type { AtomConfig } from "@unistash/core";
import { create } from "zustand";

/**
 * Creates an atom-like store using Zustand
 */
export function createAtom<T>(config: AtomConfig<T>) {
  const initialValue =
    typeof config.default === "function"
      ? (config.default as () => T)()
      : config.default;

  const useAtom = create<{ value: T; setValue: (newValue: T) => void }>(
    (set) => ({
      value: initialValue,
      setValue: (newValue: T) => set({ value: newValue }),
    }),
  );

  // Return hook that mimics atom behavior
  const useAtomValue = () => {
    const { value, setValue } = useAtom();
    return [value, setValue] as const;
  };

  return useAtomValue;
}
