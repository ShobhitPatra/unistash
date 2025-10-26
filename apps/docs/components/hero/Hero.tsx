"use client";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { AnimatedShinyText } from "../ui/animated-shiny-text";
import { AnimatedBeamSection } from "./AnimatedBeamSection";
import ShikiHighlighter from "react-shiki";

const installation_commannds = {
  zustand: "npm install @unistash/zustand",
  jotai: "npm install @unistash/jotai",
  redux: "npm install @unistash/redux",
  recoil: "npm install @unistash/recoil",
  valtio: "npm install @unistash/valtio",
};
export const Hero = () => {
  return (
    <main className="flex justify-center flex-wrap md:mt-16">
      <section className="flex flex-col items-start justify-center gap-2 ">
        <h1 className="md:text-2xl text-xl font-semibold">
          <AnimatedShinyText>Unistash</AnimatedShinyText>
        </h1>
        <p className="tagline  md:text-4xl text-2xl font-bold">
          Write once. Stash anywhere.
        </p>
        <div className="description dark:text-gray-400 md:w-2xl text-left">
          One API for every React state library. Switch between Zustand, Jotai,
          Redux, and more by changing a single import.
        </div>
        <Tabs
          items={["Zustand", "Jotai", "Redux", "Recoil", "Valtio"]}
          defaultIndex={0}
          className="dark:bg-black "
        >
          <Tab value="Zustand" className="rounded-none p-1 dark:bg-black ">
            <ShikiHighlighter
              className="text-xs "
              showLanguage={false}
              style={{ textAlign: "left" }}
              language={"bash"}
              theme={{
                light: "everforest-light",
                dark: "github-dark",
                dim: "github-dark-dimmed",
              }}
              defaultColor="dark"
            >
              {installation_commannds.zustand}
            </ShikiHighlighter>
          </Tab>
          <Tab value="Jotai" className="rounded-none p-1 dark:bg-black  ">
            <ShikiHighlighter
              className="text-xs "
              showLanguage={false}
              style={{ textAlign: "left" }}
              language={"bash"}
              theme={{
                light: "everforest-light",
                dark: "github-dark",
                dim: "github-dark-dimmed",
              }}
              defaultColor="dark"
            >
              {installation_commannds.jotai}
            </ShikiHighlighter>
          </Tab>
          <Tab value="Redux" className="rounded-none p-1 dark:bg-black  ">
            <ShikiHighlighter
              className="text-xs "
              showLanguage={false}
              style={{ textAlign: "left" }}
              language={"bash"}
              theme={{
                light: "everforest-light",
                dark: "github-dark",
                dim: "github-dark-dimmed",
              }}
              defaultColor="dark"
            >
              {installation_commannds.redux}
            </ShikiHighlighter>
          </Tab>
          <Tab value="Recoil" className="rounded-none p-1 dark:bg-black  ">
            <ShikiHighlighter
              className="text-xs "
              showLanguage={false}
              style={{ textAlign: "left" }}
              language={"bash"}
              theme={{
                light: "everforest-light",
                dark: "github-dark",
                dim: "github-dark-dimmed",
              }}
              defaultColor="dark"
            >
              {installation_commannds.recoil}
            </ShikiHighlighter>
          </Tab>
          <Tab value="Valtio" className="rounded-none p-1 dark:bg-black  ">
            <ShikiHighlighter
              className="text-xs "
              showLanguage={false}
              style={{ textAlign: "left" }}
              language={"bash"}
              theme={{
                light: "everforest-light",
                dark: "github-dark",
                dim: "github-dark-dimmed",
              }}
              defaultColor="dark"
            >
              {installation_commannds.valtio}
            </ShikiHighlighter>
          </Tab>
        </Tabs>
      </section>
      <section className="lex just items-center">
        <AnimatedBeamSection />
      </section>
    </main>
  );
};
