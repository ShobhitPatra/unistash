import Link from "next/link";
import { CopyCommand } from "@/components/CopyCommand";

export const Hero = () => {
  return (
    <section className="flex flex-col items-center gap-6 pt-24 pb-12 text-center">
      <h1 className="max-w-3xl text-balance text-3xl font-semibold uppercase leading-[1.1] tracking-tight md:text-5xl">
        The simplest way to manage React state.
      </h1>
      <p className="text-sm lowercase tracking-wide text-fd-muted-foreground md:text-base">
        tiny &middot; fully typed &middot; zero dependencies
      </p>
      <CopyCommand command="npm install unistash" />
      <div className="flex gap-3 pt-2">
        <Link
          href="/docs"
          className="rounded-md bg-fd-foreground px-4 py-2 text-sm font-medium text-fd-background transition-opacity hover:opacity-90"
        >
          Get started
        </Link>
        <Link
          href="https://github.com/ShobhitPatra/unistash"
          className="rounded-md bg-[#238636] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2ea043]"
        >
          GitHub
        </Link>
      </div>
    </section>
  );
};
