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

import { createStore } from "../index";

const useTyped = createStore({
  state: { count: 0, name: "a" },
  actions: {
    increment: (s) => ({ count: s.count + 1 }),
    add: (s, n: number) => ({ count: s.count + n }),
  },
  computed: {
    doubled: (s) => s.count * 2,
  },
});

const full = useTyped();
const _c: number = full.count;
const _n: string = full.name;
const _d: number = full.doubled;
full.increment();
full.add(3);
// @ts-expect-error add requires a number argument
full.add("x");
// @ts-expect-error count is a number, not a string
const _wrong: string = full.count;
// @ts-expect-error no such member
full.nope;

// Selector form is typed from the snapshot.
const justCount = useTyped((s) => s.count);
const _jc: number = justCount;

// Statics
const _state = useTyped.getState();
const _sc: number = _state.count;

void _c;
void _n;
void _d;
void _wrong;
void _jc;
void _sc;
