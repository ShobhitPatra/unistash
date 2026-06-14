import Link from "next/link";
import { Hero } from "@/components/hero/Hero";
import { LiveDemo } from "@/components/LiveDemo";

const FEATURES = [
  ["Zero dependencies", "One install. No peer libraries."],
  ["Fully typed", "Autocomplete on state, computed & actions."],
  ["Tiny", "A few hundred bytes of engine."],
  ["Selectors", "Fine-grained re-renders, opt-in."],
  ["SSR-ready", "Next.js, no hydration mismatch."],
  ["No boilerplate", "No providers, no reducers."],
];

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col gap-20 px-6 py-10 md:px-8">
      <Hero />

      <section className="flex flex-col gap-6">
        <h2 className="text-center text-xs uppercase tracking-widest text-fd-muted-foreground">
          Live — really running
        </h2>
        <LiveDemo />
      </section>

      <section className="mx-auto grid w-full max-w-3xl gap-x-10 gap-y-8 sm:grid-cols-2 md:grid-cols-3">
        {FEATURES.map(([title, desc]) => (
          <div key={title} className="flex flex-col gap-1">
            <h3 className="text-sm font-semibold uppercase tracking-wide">
              {title}
            </h3>
            <p className="text-xs text-fd-muted-foreground lowercase">{desc}</p>
          </div>
        ))}
      </section>

      <section className="flex flex-col items-center gap-4 py-10 text-center">
        <h2 className="text-lg font-semibold uppercase tracking-wide">
          Ready in one import.
        </h2>
        <Link
          href="/docs"
          className="rounded-md bg-fd-foreground px-5 py-2 text-sm font-medium text-fd-background transition-opacity hover:opacity-90"
        >
          Read the docs →
        </Link>
      </section>
    </main>
  );
}
