import type { BoundActions, ComputedReturns, Snapshot } from "../types";

type Counter = { count: number };

// BoundActions strips the state param and erases the return type to void.
type Actions = {
  increment: (s: Counter) => Counter;
  add: (s: Counter, n: number) => Counter;
};
type Bound = BoundActions<Actions>;

const _inc: Bound["increment"] = () => {};
const _add: Bound["add"] = (_n: number) => {};
// @ts-expect-error increment takes no args after binding
const _incBad: Bound["increment"] = (_x: number) => {};

// ComputedReturns maps each fn to its return type.
type Computed = { doubled: (s: Counter) => number };
const _ok: ComputedReturns<Computed> = { doubled: 4 };
// @ts-expect-error doubled must be a number
const _bad: ComputedReturns<Computed> = { doubled: "no" };

// Snapshot merges all three.
type Snap = Snapshot<Counter, Actions, Computed>;
const _snap: Snap = {
  count: 1,
  doubled: 2,
  increment: () => {},
  add: (_n: number) => {},
};
// @ts-expect-error count is a number
const _snapBad: Snap = { ..._snap, count: "x" };

// Silence "declared but never read" without changing assertions.
void _inc;
void _add;
void _incBad;
void _ok;
void _bad;
void _snap;
void _snapBad;
