import { Hero } from "@/components/hero/Hero";
import { HeroExampleCodeBlock } from "@/components/HeroExampleCodeBlock";
import { Github, X } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center text-center flex-1  md:gap-32 gap-16 dark:bg-linear-to-t dark:from-black  dark:via-slate-950 dark:to-black bg-linear-to-t from-gray-300 via-indigo-200 to-white p-2">
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
      <div>
        <Link href={"/docs/installation"}>
          <button className="dark:bg-white dark:text-black py-2 px-4 rounded-md hover:dark:bg-gray-300 bg-black text-white hover:bg-gray-800">
            Get Started
          </button>
        </Link>
      </div>
      <footer>
        <div className="h-[0.5px] dark:bg-gray-600 bg-gray-700 md:mx-32 md:mb-16"></div>
        <div className="flex justify-center items-center gap-5 mb-2">
          <p>Unisatsh v1.0.0</p>
          <p>by Shobhit Patra</p>
          <Link href={"https://github.com/ShobhitPatra"}>
            <Github size={18} />
          </Link>
          <Link href={"https://x.com/shobhit_tw"}>
            <X size={20} />
          </Link>
        </div>
      </footer>
    </div>
  );
}
