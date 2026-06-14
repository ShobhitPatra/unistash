import Link from "next/link";

export const Hero = () => {
  return (
    <section className="flex flex-col items-center gap-6 pt-24 pb-12 text-center">
      <h1 className="max-w-3xl text-balance text-3xl font-semibold uppercase leading-[1.1] tracking-tight md:text-5xl">
        The simplest way to manage React state.
      </h1>
      <p className="text-sm lowercase tracking-wide text-fd-muted-foreground md:text-base">
        tiny &middot; fully typed &middot; zero dependencies
      </p>
      <code className="mt-1 inline-flex items-center gap-2 rounded-md border border-fd-border bg-fd-card px-4 py-2 text-sm text-fd-foreground">
        <span className="select-none text-fd-muted-foreground">$</span>
        npm install unistash
      </code>
      <div className="flex gap-3 pt-2">
        <Link
          href="/docs"
          className="rounded-md bg-fd-foreground px-4 py-2 text-sm font-medium text-fd-background transition-opacity hover:opacity-90"
        >
          Get started
        </Link>
        <Link
          href="https://github.com/ShobhitPatra/unistash"
          className="rounded-md border border-fd-border px-4 py-2 text-sm transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
        >
          GitHub
        </Link>
      </div>
    </section>
  );
};
