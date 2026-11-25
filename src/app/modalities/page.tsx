import type { Metadata } from "next";
import { ModalityCards } from "@/components/modality-cards";

export const metadata: Metadata = {
  title: "Healing Modalities | The Evolve Room",
  description:
    "Explore Life Coaching, Ho’oponopono, EFT, NLP, Chakra Healing and Graphology. Choose the path that resonates with your current journey toward wholeness.",
};

export default function ModalitiesPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Soft background glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute top-1/3 -right-40 h-[34rem] w-[34rem] rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-3xl" />
      </div>

      <section className="relative z-10 px-6 pt-36 pb-28">
        <div className="mx-auto max-w-7xl space-y-16">
          <div className="animate-in fade-in slide-in-from-bottom-8 space-y-6 text-center duration-1000">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Explore Every Path
            </p>
            <h1 className="font-headline text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
              Our Healing <span className="gold-gradient inline-block pb-2 italic pr-2">Modalities</span>
            </h1>
            <div className="flex items-center justify-center gap-4">
              <span className="h-px w-14 bg-primary/60 sm:w-24" />
              <span className="h-2.5 w-2.5 rotate-45 bg-primary" />
              <span className="h-px w-14 bg-primary/60 sm:w-24" />
            </div>
            <p className="mx-auto max-w-2xl font-headline text-2xl italic text-muted-foreground">
              Choose the path that resonates with your current journey toward wholeness.
            </p>
          </div>

          <ModalityCards />
        </div>
      </section>
    </div>
  );
}