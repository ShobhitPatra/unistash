import { act, render, renderHook, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { createStore } from "../react/createStore";
import { shallow } from "../shallow";

const makeCounter = () =>
  createStore({
    state: { count: 0, other: "x" },
    actions: {
      increment: (s) => ({ count: s.count + 1 }),
      add: (s, n: number) => ({ count: s.count + n }),
      setOther: (_s, value: string) => ({ other: value }),
    },
    computed: {
      doubled: (s) => s.count * 2,
    },
  });

describe("createStore (React)", () => {
  it("bare call exposes state, computed, and actions", () => {
    const useCounter = makeCounter();
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
    expect(result.current.doubled).toBe(0);
    expect(typeof result.current.increment).toBe("function");
  });

  it("actions update state and computed", () => {
    const useCounter = makeCounter();
    const { result } = renderHook(() => useCounter());
    act(() => result.current.increment());
    expect(result.current.count).toBe(1);
    expect(result.current.doubled).toBe(2);
    act(() => result.current.add(10));
    expect(result.current.count).toBe(11);
  });

  it("a selector re-renders only when its slice changes", () => {
    const useCounter = makeCounter();
    let renders = 0;
    const { result } = renderHook(() => {
      renders++;
      return useCounter((s) => s.count);
    });
    expect(result.current).toBe(0);
    const after = renders;
    // change an unrelated field -> selected `count` is unchanged -> no re-render
    act(() => useCounter.setState({ other: "y" }));
    expect(renders).toBe(after);
    // change count -> re-render
    act(() => useCounter.setState({ count: 1 }));
    expect(result.current).toBe(1);
    expect(renders).toBe(after + 1);
  });

  it("custom equality (shallow) avoids re-render on equal selections", () => {
    const useCounter = makeCounter();
    let renders = 0;
    renderHook(() => {
      renders++;
      return useCounter((s) => ({ count: s.count }), shallow);
    });
    const after = renders;
    act(() => useCounter.setState({ other: "z" }));
    expect(renders).toBe(after);
  });

  it("action references are stable across renders", () => {
    const useCounter = makeCounter();
    const seen: Array<() => void> = [];
    const { rerender } = renderHook(() => {
      const inc = useCounter((s) => s.increment);
      seen.push(inc);
      return inc;
    });
    rerender();
    expect(seen[0]).toBe(seen[1]);
  });

  it("statics work outside React", () => {
    const useCounter = makeCounter();
    expect(useCounter.getState()).toEqual({ count: 0, other: "x" });
    useCounter.setState({ count: 3 });
    expect(useCounter.getState().count).toBe(3);
  });

  it("renders in a real component and updates on action", () => {
    const useCounter = makeCounter();
    function View() {
      const { count, doubled, increment } = useCounter();
      return (
        <button type="button" onClick={() => increment()}>
          {count}:{doubled}
        </button>
      );
    }
    render(<View />);
    const btn = screen.getByRole("button");
    expect(btn.textContent).toBe("0:0");
    act(() => btn.click());
    expect(btn.textContent).toBe("1:2");
  });

  it("renders on the server using the server snapshot", () => {
    const useCounter = makeCounter();
    function View() {
      const { count, doubled } = useCounter();
      return <span>{`${count}:${doubled}`}</span>;
    }
    const html = renderToString(<View />);
    expect(html).toContain("0:0");
  });

  it("memoizes correctly when the selector returns a falsy value", () => {
    const useCounter = makeCounter();
    let renders = 0;
    const { result } = renderHook(() => {
      renders++;
      return useCounter((s) => s.count); // starts at 0 (falsy)
    });
    expect(result.current).toBe(0);
    const after = renders;
    act(() => useCounter.setState({ other: "changed" }));
    // selected value still 0 -> no re-render despite a new snapshot
    expect(renders).toBe(after);
    expect(result.current).toBe(0);
  });
});
