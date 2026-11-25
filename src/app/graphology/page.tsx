import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  Brain,
  Flower2,
  Heart,
  RefreshCw,
  TrendingUp,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingDialog } from "@/components/booking-dialog";
import { GraphologyCourses } from "@/components/graphology-courses";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Graphology | The Evolve Room",
  description:
    "Your handwriting reveals your mind, emotions and hidden patterns. Practise Graphology to create positive changes in your health, relationships and life.",
};

const benefits = [
  { title: "Know Yourself", text: "Understand your thoughts and emotions.", icon: Brain },
  { title: "Break Patterns", text: "Identify and release limiting patterns.", icon: RefreshCw },
  { title: "Support Better Health", text: "Create positive changes in your mind and body.", icon: Flower2 },
  { title: "Improve Relationships", text: "Understand yourself and others better.", icon: Users },
  { title: "Unlock Your Potential", text: "Make empowered choices for a fulfilling life.", icon: TrendingUp },
];

const handwritten = ["Awareness", "Clarity", "Healing", "Growth"];
const ruledLines =
  "repeating-linear-gradient(to bottom, transparent 0, transparent 39px, rgba(154,116,36,0.22) 39px, rgba(154,116,36,0.22) 40px)";

export default function GraphologyPage() {
  return (
    <div className="relative overflow-hidden">
      {/* ---------- Decorative background ---------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute top-24 -right-20 h-[28rem] w-[28rem] rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-40 left-1/3 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />

        <Image
          src="/graphology/foliage-left.svg"
          alt=""
          width={300}
          height={700}
          unoptimized
          className="absolute -left-10 top-24 hidden h-[520px] w-auto opacity-80 md:block"
        />
        <Image
          src="/graphology/foliage-right.svg"
          alt=""
          width={300}
          height={700}
          unoptimized
          className="absolute -right-10 top-72 hidden h-[560px] w-auto opacity-80 md:block"
        />
        <Image
          src="/graphology/books.svg"
          alt=""
          width={480}
          height={300}
          unoptimized
          className="absolute right-6 top-16 hidden w-[340px] opacity-60 xl:block"
        />
        <Image
          src="/graphology/foliage-left.svg"
          alt=""
          width={300}
          height={700}
          unoptimized
          className="absolute -left-14 bottom-0 hidden h-[420px] w-auto scale-y-[-1] opacity-70 md:block"
        />
        <Image
          src="/graphology/foliage-right.svg"
          alt=""
          width={300}
          height={700}
          unoptimized
          className="absolute -right-14 bottom-0 hidden h-[420px] w-auto scale-y-[-1] opacity-70 md:block"
        />
      </div>

      <div className="relative z-10">
        {/* ---------- Hero ---------- */}
        <section className="px-6 pt-32 pb-16">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.15fr_1fr] gap-16 items-center">
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <h1 className="text-[2.6rem] sm:text-7xl lg:text-8xl font-bold uppercase tracking-tight leading-none">
                Graph<span className="text-primary">o</span>logy
              </h1>
              <div className="h-px w-20 bg-primary" />
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em]">
                Understand · Break Patterns · Create a Better You
              </p>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                Your handwriting reveals your mind, emotions and hidden patterns. Practise
                Graphology to create positive changes in your health, relationships and life.
              </p>
            </div>

            {/* Notebook with pen */}
            <div className="relative mx-auto w-full max-w-md lg:max-w-lg animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
              <div className="absolute inset-0 translate-x-3 translate-y-4 -rotate-[7deg] bg-[#EFE6D2] shadow-xl" />
              <div className="absolute inset-0 translate-x-1.5 translate-y-2 -rotate-[5.5deg] bg-[#F5EDDC] shadow-lg" />
              <div className="relative -rotate-6 bg-[#FBF7EE] text-[#2F3E36] shadow-2xl border border-black/5 px-8 sm:px-12 py-14">
                <div className="h-[240px]" style={{ backgroundImage: ruledLines }}>
                  <ul style={{ fontFamily: "'Caveat', cursive" }}>
                    {handwritten.map((word, i) => (
                      <li
                        key={word}
                        className="h-[40px] text-4xl leading-[40px] font-semibold"
                        style={{ marginLeft: i * 28 }}
                      >
                        {word}
                        {i === handwritten.length - 1 && (
                          <Heart className="inline ml-2 w-6 h-6 text-primary" />
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Pen: its nib rests near the last handwritten word */}
              <div
                aria-hidden
                className="pointer-events-none absolute w-[240px] sm:w-[320px] origin-left -rotate-[38deg] drop-shadow-[0_10px_12px_rgba(0,0,0,0.35)]"
                style={{ left: "64%", top: "calc(66% - 20px)" }}
              >
                <Image
                  src="/graphology/pen.svg"
                  alt=""
                  width={620}
                  height={80}
                  unoptimized
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Benefits ---------- */}
        <section className="px-6 py-14">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-12 lg:divide-x divide-border">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="group flex flex-col items-center text-center px-6">
                  <div
                    className={cn(
                      "w-16 h-16 rounded-full flex items-center justify-center shadow-lg mb-5 transition-transform duration-500 group-hover:scale-110",
                      i % 2 === 0
                        ? "bg-accent text-accent-foreground"
                        : "bg-primary text-primary-foreground"
                    )}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold uppercase tracking-wide mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground max-w-[200px]">{b.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ---------- Courses ---------- */}
        <section className="px-6 py-16">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="flex items-center gap-6">
              <div className="h-px flex-1 bg-primary/40" />
              <h2 className="text-xl sm:text-3xl font-bold uppercase tracking-[0.25em] text-center">
                Graphology Courses
              </h2>
              <div className="h-px flex-1 bg-primary/40" />
            </div>

            <GraphologyCourses />
          </div>
        </section>

        {/* ---------- Book a session ---------- */}
        <section className="px-6 pt-6 pb-28">
          <div className="text-center">
            <BookingDialog
              trigger={
                <Button
                  size="lg"
                  className="rounded-full px-14 py-7 text-sm tracking-[0.3em] uppercase font-bold shadow-xl hover:scale-105 transition-transform"
                >
                  Book a Session <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              }
            />
          </div>
        </section>
      </div>
    </div>
  );
}