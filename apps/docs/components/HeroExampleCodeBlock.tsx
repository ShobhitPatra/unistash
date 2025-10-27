"use client";

import { Tabs, Tab } from "fumadocs-ui/components/tabs";
import ShikiHighlighter from "react-shiki";

const examples = {
  zustand: {
    code: `import { createStore } from '@unistash/zustand';

const useCounterStore = createStore({
  state: { count: 0 },
  actions: {
    increment: (state) => ({ count: state.count + 1 }),
    decrement: (state) => ({ count: state.count - 1 }),
  },
  computed: {
    doubled: (state) => state.count * 2,
  }
});

function Counter() {
  const { count, doubled, actions } = useCounterStore();
  
  return (
    <div>
      <p>Count: {count} (Doubled: {doubled})</p>
      <button onClick={actions.increment}>+</button>
      <button onClick={actions.decrement}>-</button>
    </div>
  );
}`,
  },
  jotai: {
    code: `import { createStore,UnistashProvider } from '@unistash/jotai';

const useCounterStore = createStore({
  state: { count: 0 },
  actions: {
    increment: (state) => ({ count: state.count + 1 }),
    decrement: (state) => ({ count: state.count - 1 }),
  },
  computed: {
    doubled: (state) => state.count * 2,
  }
});

function Counter() {
  const { count, doubled, actions } = useCounterStore();
  
  return (
    <div>
      <p>Count: {count} (Doubled: {doubled})</p>
      <button onClick={actions.increment}>+</button>
      <button onClick={actions.decrement}>-</button>
    </div>
  );
}

// Jotai requires Provider
function App() {
  return (
    <UnistashProvider>
      <Counter />
    </UnistashProvider>
  );
}`,
  },
  redux: {
    code: `import { createStore, UnistashProvider  } from '@unistash/redux';

const useCounterStore = createStore({
  state: { count: 0 },
  actions: {
    increment: (state) => ({ count: state.count + 1 }),
    decrement: (state) => ({ count: state.count - 1 }),
  },
  computed: {
    doubled: (state) => state.count * 2,
  }
});

function Counter() {
  const { count, doubled, actions } = useCounterStore();
  
  return (
    <div>
      <p>Count: {count} (Doubled: {doubled})</p>
      <button onClick={actions.increment}>+</button>
      <button onClick={actions.decrement}>-</button>
    </div>
  );
}

// Redux requires Provider
function App() {
  return (
    <UnistashProvider>
      <Counter />
    </UnistashProvider>
  );
}`,
  },
  valtio: {
    install: "npm install @unistash/valtio (coming soon)",
    code: `import { createStore } from '@unistash/valtio';

const useCounterStore = createStore({
  state: { count: 0 },
  actions: {
    increment: (state) => ({ count: state.count + 1 }),
    decrement: (state) => ({ count: state.count - 1 }),
  },
  computed: {
    doubled: (state) => state.count * 2,
  }
});

// Same code, different adapter! `,
  },
};

export function HeroExampleCodeBlock() {
  return (
    <div className=" md:px-64  ">
      <Tabs
        items={["Zustand", "Redux", "Jotai", "Recoil", "Valtio"]}
        defaultIndex={0}
        className="dark:bg-black "
      >
        <Tab value="Zustand" className=" dark:bg-black">
          <ShikiHighlighter
            style={{ textAlign: "left" }}
            showLanguage={false}
            showLineNumbers
            language="tsx"
            theme={{
              light: "everforest-light",
              dark: "github-dark",
              dim: "github-dark-dimmed",
            }}
            defaultColor="dark"
          >
            {examples.zustand.code}
          </ShikiHighlighter>
        </Tab>

        <Tab value="Jotai" className=" dark:bg-black">
          <ShikiHighlighter
            style={{ textAlign: "left" }}
            showLanguage={false}
            showLineNumbers
            language="tsx"
            theme={{
              light: "everforest-light",
              dark: "github-dark",
              dim: "github-dark-dimmed",
            }}
            defaultColor="dark"
          >
            {examples.jotai.code}
          </ShikiHighlighter>
        </Tab>

        <Tab value="Valtio" className=" dark:bg-black">
          <ShikiHighlighter
            style={{ textAlign: "left" }}
            showLanguage={false}
            showLineNumbers
            language="tsx"
            theme={{
              light: "everforest-light",
              dark: "github-dark",
              dim: "github-dark-dimmed",
            }}
            defaultColor="dark"
          >
            {examples.valtio.code}
          </ShikiHighlighter>
        </Tab>
        <Tab value="Redux" className=" dark:bg-black">
          <ShikiHighlighter
            style={{ textAlign: "left" }}
            showLanguage={false}
            showLineNumbers
            language="tsx"
            theme={{
              light: "everforest-light",
              dark: "github-dark",
              dim: "github-dark-dimmed",
            }}
            defaultColor="dark"
          >
            {examples.redux.code}
          </ShikiHighlighter>
        </Tab>
        <Tab value="Recoil" className=" dark:bg-black">
          <ShikiHighlighter
            style={{ textAlign: "left" }}
            showLanguage={false}
            showLineNumbers
            language="tsx"
            theme={{
              light: "everforest-light",
              dark: "github-dark",
              dim: "github-dark-dimmed",
            }}
            defaultColor="dark"
          >
            {examples.redux.code}
          </ShikiHighlighter>
        </Tab>
      </Tabs>

      <div className="mt-6 p-6 dark:bg-linear-to-r dark:from-black dark:via-gray-950 dark:to-gray-900  rounded-lg bg-linear-to-r from-indigo-400 via-indigo-200 to-white ">
        <p className="text-center font-semibold text-gray-900 dark:text-gray-300">
          <strong>Note:</strong> The exact same code works across all adapters!
        </p>
      </div>
    </div>
  );
}
