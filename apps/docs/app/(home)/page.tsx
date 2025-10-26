import { Hero } from "@/components/hero/Hero";
import { HeroExampleCodeBlock } from "@/components/HeroExampleCodeBlock";

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center text-center flex-1  md:gap-32 dark:bg-linear-to-t dark:from-black  dark:via-slate-950 dark:to-black bg-linear-to-t from-gray-300 via-indigo-200 to-white ">
      <Hero />
      <HeroExampleCodeBlock />
      <section className="text-center md:px-64 ">
        <h3 className="md:text-4xl text-2xl font-bold md:my-16">
          Why Unstash ?
        </h3>
        <ul className="space-y-6 text-left md:pl-96">
          <li className="flex justify-start items-center gap-4">
            <p className="md:text-2xl text-xl font-semibold">
              Switch libraries instantly
            </p>
            <p className="font-light text-xl dark:text-gray-300">
              Change one import, keep your code
            </p>
          </li>
          <li className="flex justify-start items-center gap-4">
            <p className="md:text-2xl text-xl font-semibold">
              Learn once, use everywhere
            </p>
            <p className="font-light text-xl dark:text-gray-300">
              One API for all state librarie
            </p>
          </li>
          <li className="flex justify-start items-center gap-4">
            <p className="md:text-2xl text-xl font-semibold">
              Zero vendor lock-in
            </p>
            <p className="font-light text-xl dark:text-gray-300">
              Never rewrite state logic again
            </p>
          </li>
          <li className="flex justify-start items-center gap-4">
            <p className="md:text-2xl text-xl font-semibold">
              Perfect for OSS Contributors
            </p>
            <p className="font-light text-xl dark:text-gray-300">
              don't need to learn every library
            </p>
          </li>
          <li className="flex justify-start items-center gap-4">
            <p className="md:text-2xl text-xl font-semibold">Type-safe</p>
            <p className="font-light text-xl dark:text-gray-300">
              Full TypeScript support across all adapters
            </p>
          </li>
        </ul>
      </section>
      <footer>footer</footer>
    </div>
  );
}
