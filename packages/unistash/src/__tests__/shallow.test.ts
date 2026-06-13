import { describe, expect, it } from "vitest";
import { shallow } from "../shallow";

describe("shallow", () => {
  it("treats identical primitives/refs as equal", () => {
    expect(shallow(1, 1)).toBe(true);
    const obj = { a: 1 };
    expect(shallow(obj, obj)).toBe(true);
  });

  it("compares objects one level deep", () => {
    expect(shallow({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    expect(shallow({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false);
  });

  it("returns false when key sets differ", () => {
    expect(shallow({ a: 1 }, { a: 1, b: 2 })).toBe(false);
  });

  it("does not recurse into nested objects", () => {
    const nested = { x: 1 };
    expect(shallow({ a: nested }, { a: nested })).toBe(true);
    expect(shallow({ a: { x: 1 } }, { a: { x: 1 } })).toBe(false);
  });

  it("returns false for null vs object", () => {
    expect(shallow(null, { a: 1 })).toBe(false);
  });
});
