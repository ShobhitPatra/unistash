import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { createStore } from "../createStore";

describe("jotai createStore", () => {
  it("exposes state and computed, and actions update them", () => {
    const useStore = createStore({
      state: { count: 0 },
      actions: {
        increment: (s: { count: number }) => ({ count: s.count + 1 }),
      },
      computed: { doubled: (s: { count: number }) => s.count * 2 },
    });

    const { result } = renderHook(() => useStore());

    expect(result.current.count).toBe(0);
    expect(result.current.doubled).toBe(0);

    act(() => result.current.actions.increment());

    expect(result.current.count).toBe(1);
    expect(result.current.doubled).toBe(2);
  });
});
