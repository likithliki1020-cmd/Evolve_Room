import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Hourglass, PenLine, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Courses | The Evolve Room",
  description:
    "Explore thoughtfully designed learning experiences that encourage self-awareness, new perspectives, and personal growth.",
};

function Ornament() {
  return (
    <div className="flex items-center justify-center gap-4">
      <span className="h-px w-14 bg-primary/60 sm:w-24" />
      <span className="h-2.5 w-2.5 rotate-45 bg-primary" />
      <span className="h-px w-14 bg-primary/60 sm:w-24" />
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-6">
      <div className="h-px flex-1 bg-primary/40" />
      <h2 className="text-center text-xl font-bold uppercase tracking-[0.25em] sm:text-3xl">
        {children}
      </h2>
      <div className="h-px flex-1 bg-primary/40" />
    </div>
  );
}

// A faint "course card" outline that hints at what is coming
function GhostCard({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`absolute hidden h-64 w-44 rounded-2xl border-2 border-dashed border-primary/30 bg-card/50 p-5 lg:block ${className}`}
    >
      <div className="flex h-24 items-center justify-center rounded-xl bg-primary/10">
        <Sparkles className="h-8 w-8 animate-pulse text-primary/50" />
      </div>
      <div className="mt-5 h-2.5 w-3/4 animate-pulse rounded bg-primary/15" />
      <div className="mt-3 h-2 w-full animate-pulse rounded bg-primary/10" />
      <div className="mt-2 h-2 w-2/3 animate-pulse rounded bg-primary/10" />
    </div>
  );
}

export default function CoursesPage() {
  return (
    <div className="relative overflow-hidden">
      {/* ---------- Background ---------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute top-1/4 -right-40 h-[34rem] w-[34rem] rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-3xl" />

        <Image
          src="/graphology/foliage-left.svg"
          alt=""
          width={300}
          height={700}
          unoptimized
          className="absolute -left-12 top-20 hidden h-[480px] w-auto opacity-70 md:block"
        />
        <Image
          src="/graphology/foliage-right.svg"
          alt=""
          width={300}
          height={700}
          unoptimized
          className="absolute -right-12 bottom-10 hidden h-[480px] w-auto scale-y-[-1] opacity-60 md:block"
        />
      </div>

      <div className="relative z-10">
        {/* ---------- Hero ---------- */}
        <section className="px-6 pt-32 pb-20">
          <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
            <div className="animate-in fade-in slide-in-from-bottom-8 space-y-8 duration-1000">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Courses</p>
              <h1 className="font-headline text-6xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
                <span className="block">Learn.</span>
                <span className="block">Practise.</span>
                <span className="gold-gradient block pb-3 pr-3 italic">Evolve.</span>
              </h1>
              <div className="h-px w-20 bg-primary" />
              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                Explore thoughtfully designed learning experiences that encourage self-awareness,
                new perspectives, and personal growth.
              </p>
            </div>

            {/* Illustration */}
            <div className="animate-in fade-in slide-in-from-right-8 relative mx-auto w-full max-w-md duration-1000 delay-300">
              <div className="absolute -inset-3 rotate-3 border border-primary/20 bg-primary/10" />
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-border/60 shadow-2xl">
                <Image
                  src="/courses/hero.svg"
                  alt="An open book with a glowing lotus rising from its pages"
                  fill
                  priority
                  unoptimized
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                />
              </div>
              <Sparkles className="absolute -left-8 top-10 h-6 w-6 animate-pulse text-primary/70" />
              <Sparkles className="absolute -right-7 bottom-14 h-5 w-5 animate-pulse text-accent [animation-delay:900ms]" />
            </div>
          </div>
        </section>

        {/* ---------- Currently available ---------- */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-7xl space-y-14">
            <SectionHeading>Currently Available</SectionHeading>

            <div className="flex flex-wrap justify-center gap-8">
              <Link
                href="/graphology"
                className="group flex w-full max-w-[26rem] flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-md transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-2xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/modalities/graphology.svg"
                    alt=""
                    fill
                    unoptimized
                    sizes="(min-width: 640px) 26rem, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-card to-transparent"
                  />
                </div>

                <div className="relative -mt-9 flex flex-1 flex-col items-center px-8 pb-8 text-center">
                  <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border border-primary/40 bg-background text-primary shadow-lg transition-transform duration-500 group-hover:scale-110">
                    <PenLine className="h-8 w-8" />
                  </div>

                  <h3 className="mt-5 font-headline text-2xl font-bold uppercase tracking-widest">
                    Graphology Course
                  </h3>
                  <div className="my-4 h-px w-10 bg-primary" />
                  <p className="leading-relaxed text-muted-foreground">
                    Discover the art of handwriting analysis and explore how handwriting can offer
                    insights for observation, interpretation, and self-reflection.
                  </p>

                  <div className="mt-auto w-full pt-7">
                    <span className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#6A4A5C] px-6 py-3 text-xs font-bold uppercase tracking-[0.25em] text-white shadow-md transition-all duration-500 group-hover:gap-4 group-hover:shadow-xl">
                      Explore Course <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ---------- Coming in the future ---------- */}
        <section className="px-6 pt-16 pb-32">
          <div className="mx-auto max-w-4xl space-y-12 text-center">
            <h2 className="font-headline text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
              More Learning Experiences,{" "}
              <span className="gold-gradient inline-block pb-1 pr-2 italic">
                Coming in the Future
              </span>
            </h2>

            <div className="relative">
              <GhostCard className="-left-20 top-1/2 -translate-y-1/2 -rotate-6" />
              <GhostCard className="-right-20 top-1/2 -translate-y-1/2 rotate-6" />

              <div className="relative overflow-hidden rounded-3xl border border-dashed border-primary/40 bg-gold-subtle px-8 py-16 sm:px-16">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/15 blur-3xl"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl"
                />

                <div className="relative space-y-8">
                  {/* Pulsing rings around the icon */}
                  <div className="relative mx-auto flex h-32 w-32 items-center justify-center">
                    {[100, 76].map((size, i) => (
                      <span
                        key={size}
                        aria-hidden
                        className="absolute animate-pulse rounded-full border border-primary/30 bg-primary/5"
                        style={{
                          width: `${size}%`,
                          height: `${size}%`,
                          animationDelay: `${i * 0.6}s`,
                          animationDuration: "3.5s",
                        }}
                      />
                    ))}
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl">
                      <Hourglass className="h-7 w-7" />
                    </div>
                  </div>

                  <Ornament />

                  <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                    The journey of learning never ends. New courses and programs will be
                    introduced soon.
                  </p>
                  <p className="font-headline text-2xl font-semibold italic leading-snug text-primary sm:text-3xl">
                    Stay connected and be the first to explore what’s next.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}