import Link from "next/link";
import type { ReactNode } from "react";
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

const PLUS =
  "pointer-events-none absolute z-10 select-none text-fd-muted-foreground/40";

/** A "+" crosshair centered exactly on a corner. */
function Plus({ position }: { position: string }) {
  return <span className={`${PLUS} ${position}`}>+</span>;
}

/** A section with a top divider line and "+" marks where it meets the frame. */
function GridSection({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`relative border-t border-fd-border/60 ${className}`}>
      <Plus position="left-0 top-0 -translate-x-1/2 -translate-y-1/2" />
      <Plus position="right-0 top-0 translate-x-1/2 -translate-y-1/2" />
      {children}
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col px-6 py-10 md:px-8">
      <div className="relative mx-auto w-full max-w-5xl border-x border-fd-border/60">
        {/* frame corner crosshairs */}
        <Plus position="left-0 top-0 -translate-x-1/2 -translate-y-1/2" />
        <Plus position="right-0 top-0 translate-x-1/2 -translate-y-1/2" />
        <Plus position="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
        <Plus position="bottom-0 right-0 translate-x-1/2 translate-y-1/2" />

        <Hero />

        <GridSection className="px-4 py-12">
          <LiveDemo />
        </GridSection>

        <GridSection className="px-4 py-12">
          <div className="mx-auto grid w-full max-w-3xl gap-x-10 gap-y-8 sm:grid-cols-2 md:grid-cols-3">
            {FEATURES.map(([title, desc]) => (
              <div key={title} className="flex flex-col gap-1">
                <h3 className="text-sm font-semibold uppercase tracking-wide">
                  {title}
                </h3>
                <p className="text-xs lowercase text-fd-muted-foreground">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </GridSection>

        <GridSection className="flex flex-col items-center gap-4 px-4 py-14 text-center">
          <h2 className="text-lg font-semibold uppercase tracking-wide">
            Ready in one import.
          </h2>
          <Link
            href="/docs"
            className="rounded-md bg-fd-foreground px-5 py-2 text-sm font-medium text-fd-background transition-opacity hover:opacity-90"
          >
            Read the docs →
          </Link>
        </GridSection>
      </div>
    </main>
  );
}
