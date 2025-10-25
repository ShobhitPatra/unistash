import { atom, useAtom } from "jotai";
import type { AtomConfig } from "@unistash/core";

/**
 * Creates an atom using Jotai's native implementation
 */
export function createAtom<T>(config: AtomConfig<T>) {
  const initialValue =
    typeof config.default === "function"
      ? (config.default as () => T)()
      : config.default;

  const baseAtom = atom(initialValue);

  // Return hook that uses the atom
  const useAtomValue = () => {
    return useAtom(baseAtom);
  };

  return useAtomValue;
}
