/**
 * Builds computed value hooks using Zustand selectors
 */
export function buildComputedValues(
  computed: Record<string, (state: any) => any> | undefined,
  useStore: any
) {
  const computedHooks = {} as any;

  if (computed) {
    Object.entries(computed).forEach(([key, computeFn]) => {
      computedHooks[key] = () => useStore((state: any) => computeFn(state));
    });
  }

  return computedHooks;
}
