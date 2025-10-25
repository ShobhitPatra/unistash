import { createStore } from "@unistash/zustand";
import "./App.css";

const useCounterStore = createStore({
  state: {
    count: 0,
    name: "Zustand Counter",
  },
  actions: {
    increment: (state) => ({ count: state.count + 1 }),
    decrement: (state) => ({ count: state.count - 1 }),
    reset: () => ({ count: 0 }),
    setName: (state, name: string) => ({ name }),
  },
  computed: {
    doubled: (state) => state.count * 2,
    isPositive: (state) => state.count > 0,
    description: (state) => `${state.name}: ${state.count}`,
  },
});

function App() {
  const { count, doubled, isPositive, description, actions } =
    useCounterStore();

  return (
    <div className="App">
      <h1>Unistash Demo - Zustand Adapter</h1>
      <div className="card">
        <h2>{description}</h2>
        <p className="count">Count: {count}</p>
        <p className="computed">Doubled: {doubled}</p>
        <p className="computed">Is Positive: {isPositive ? "✅" : "❌"}</p>

        <div className="button-group">
          <button onClick={actions.increment}>Increment</button>
          <button onClick={actions.decrement}>Decrement</button>
          <button onClick={actions.reset}>Reset</button>
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="Change name"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                actions.setName((e.target as HTMLInputElement).value);
              }
            }}
          />
        </div>

        <div className="info">
          <p>
            ✨ This is using <strong>Zustand</strong> under the hood
          </p>
          <p>🔄 Same code works with Jotai, Redux, etc!</p>
        </div>
      </div>
    </div>
  );
}

export default App;
