import type { Metadata } from "next";
import Image from "next/image";
import fs from "node:fs";
import path from "node:path";
import { Brain, Compass, Flower2, Lightbulb, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About | The Evolve Room",
  description:
    "Meet Chandrika Aralalsandra Jayaram, founder of The Evolve Room, and Pradeep Sharma, Master Practitioner of Graphology, Mind Management Coach, NLP Practitioner and Healer.",
};

// Justified text with automatic hyphenation, so the lines stay tidy
const justify = "text-justify [hyphens:auto]";

const hasPublicFile = (file: string) =>
  fs.existsSync(path.join(process.cwd(), "public", "about", file));

const principles = [
  {
    title: "Self-awareness first",
    text: "Understanding your patterns is the first step to changing them.",
    icon: Brain,
  },
  {
    title: "Simple, practical tools",
    text: "Techniques that fit into everyday life, not abstract theory.",
    icon: Lightbulb,
  },
  {
    title: "Whole-person growth",
    text: "Mind, emotions, energy and behaviour working together.",
    icon: Flower2,
  },
  {
    title: "Leadership experience meets mind science",
    text: "The discipline of a corporate leader with the empathy of a coach and healer.",
    icon: Compass,
  },
];

const stats = [
  { value: "30+", label: "Years of global leadership experience" },
  { value: "200+", label: "Offline workshops conducted" },
  { value: "25,000+", label: "Students, educators, doctors and entrepreneurs empowered" },
];

function Ornament() {
  return (
    <div className="flex items-center justify-center gap-4">
      <span className="h-px w-14 bg-primary/60 sm:w-24" />
      <span className="h-2.5 w-2.5 rotate-45 bg-primary" />
      <span className="h-px w-14 bg-primary/60 sm:w-24" />
    </div>
  );
}

function MeetHeading({ name, level }: { name: string; level: 1 | 2 }) {
  const Tag = level === 1 ? "h1" : "h2";
  return (
    <Tag className="animate-in fade-in slide-in-from-bottom-8 duration-1000 font-headline font-bold leading-[1.02] tracking-tight text-balance">
      <span className="mb-4 block text-3xl font-medium italic text-primary sm:text-5xl">Meet</span>
      <span className="block text-4xl sm:text-6xl lg:text-7xl">{name}</span>
    </Tag>
  );
}

function Portrait({
  src,
  alt,
  initials,
  show,
}: {
  src: string;
  alt: string;
  initials: string;
  show: boolean;
}) {
  return (
    <div className="relative mx-auto w-[250px] sm:w-[320px] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
      <div
        aria-hidden
        className="absolute -inset-3 translate-x-3 translate-y-3 rounded-t-[999px] rounded-b-3xl border border-primary/40"
      />
      <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-3xl border-4 border-card bg-gradient-to-b from-accent/30 to-primary/20 shadow-2xl ring-1 ring-primary/40">
        {show ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 640px) 320px, 250px"
            className="object-cover object-top"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-primary/70">
            <Flower2 className="h-14 w-14" />
            <span className="font-headline text-6xl font-bold">{initials}</span>
          </div>
        )}
      </div>
      <Sparkles className="absolute -left-10 top-10 h-6 w-6 animate-pulse text-primary/70" />
      <Sparkles className="absolute -right-9 bottom-16 h-5 w-5 animate-pulse text-accent [animation-delay:900ms]" />
    </div>
  );
}

function Roles({ items }: { items: string[] }) {
  return (
    <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs font-bold uppercase tracking-[0.25em] sm:text-sm">
      {items.map((role, i) => (
        <span key={role} className="inline-flex items-center gap-3">
          {role}
          {i < items.length - 1 && <span className="text-primary">|</span>}
        </span>
      ))}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-6">
      <div className="h-px flex-1 bg-primary/40" />
      <h3 className="text-center text-xl font-bold uppercase tracking-[0.25em] sm:text-3xl">
        {children}
      </h3>
      <div className="h-px flex-1 bg-primary/40" />
    </div>
  );
}

export default function AboutPage() {
  const founderPhoto = hasPublicFile("chandrika.jpg");
  const guidePhoto = hasPublicFile("pradeep.jpg");

  return (
    <div className="relative overflow-hidden">
      {/* Soft background glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute top-1/4 -right-40 h-[34rem] w-[34rem] rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute top-[55%] -left-40 h-[30rem] w-[30rem] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* =============== Founder: heading + photo =============== */}
        <section className="px-6 pt-36 pb-16 text-center">
          <div className="mx-auto max-w-5xl space-y-12">
            <MeetHeading name="Chandrika Aralalsandra Jayaram" level={1} />

            <Portrait
              src="/about/chandrika.jpg"
              alt="Chandrika Aralalsandra Jayaram, founder of The Evolve Room"
              initials="CJ"
              show={founderPhoto}
            />

            <div className="space-y-4 animate-in fade-in duration-1000 delay-500">
              <Roles items={["Entrepreneur", "Certified Life Coach", "Certified Graphologist"]} />
              <p className="font-headline text-xl italic text-muted-foreground sm:text-2xl">
                Founder of The Evolve Room <span className="mx-2 text-primary not-italic">|</span>{" "}
                Bengaluru, India
              </p>
            </div>

            <Ornament />
          </div>
        </section>

        {/* =============== Founder: story =============== */}
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-3xl space-y-8 text-lg leading-[1.9] text-muted-foreground">
            <p
              className={cn(
                justify,
                "font-headline text-2xl font-medium leading-relaxed text-foreground sm:text-[1.7rem]"
              )}
            >
              I’m Chandrika Aralalsandra Jayaram, an entrepreneur, Certified Life Coach, and
              Certified Graphologist with an academic background in law and business, holding an
              LL.B. and a Master’s degree in Business Laws.
            </p>

            <p className={justify}>
              My interest in human behaviour, self-awareness, and personal development inspired me
              to create The Evolve Room – a space dedicated to helping individuals understand
              themselves better, discover new perspectives, and embrace meaningful personal growth.
            </p>

            <p className={justify}>
              Through life coaching, graphology, guided practices, and personal development
              programs, I encourage individuals to explore their patterns, develop greater
              self-awareness and make more conscious choices in their lives.
            </p>

            <blockquote className="relative my-14 border-y border-primary/30 py-12 text-center">
              <span
                aria-hidden
                className="absolute -top-8 left-1/2 -translate-x-1/2 bg-background px-4 font-headline text-7xl leading-none text-primary"
              >
                “
              </span>
              <p className="font-headline text-2xl font-semibold italic leading-snug text-foreground sm:text-4xl">
                I believe that growth is not about becoming someone else, it is about understanding
                who you are, recognising your potential, and consciously choosing who you want to
                become.
              </p>
            </blockquote>

            <p className={justify}>
              At The Evolve Room, my intention is to make self-discovery a meaningful part of
              everyday life by creating a supportive space for reflection, learning, and personal
              evolution.
            </p>

            <div className="space-y-8 pt-6">
              <Ornament />
              <p className="text-center font-headline text-2xl font-semibold italic leading-snug text-primary sm:text-3xl">
                Welcome to The Evolve Room – a space to understand yourself, grow with awareness,
                and create a life that reflects who you choose to be.
              </p>
            </div>

            {/* Sign-off */}
            <div className="mt-14 border-l-2 border-primary/50 pl-6 text-left">
              <p
                className="text-4xl text-primary sm:text-5xl"
                style={{ fontFamily: "'Caveat', cursive" }}
              >
                With warmth,
              </p>
              <p className="mt-4 font-headline text-2xl font-bold text-foreground sm:text-3xl">
                Chandrika Aralalsandra Jayaram
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
                Founder, The Evolve Room
              </p>
            </div>
          </div>
        </section>

        {/* =============== Guide: Pradeep Sharma =============== */}
        <section className="border-y border-border/50 bg-card/60 px-6 py-24">
          <div className="mx-auto max-w-5xl space-y-12 text-center">
            <MeetHeading name="Pradeep Sharma" level={2} />

            <Portrait
              src="/about/pradeep.jpg"
              alt="Pradeep Sharma, Master Practitioner of Graphology and Mind Management Coach"
              initials="PS"
              show={guidePhoto}
            />

            <div className="animate-in fade-in duration-1000 delay-500">
              <Roles
                items={[
                  "Master Practitioner of Graphology",
                  "Mind Management Coach",
                  "NLP Practitioner",
                  "Healer",
                ]}
              />
            </div>

            <Ornament />

            {/* Highlights */}
            <div className="grid gap-10 sm:grid-cols-3 sm:gap-0 sm:divide-x divide-border">
              {stats.map((s) => (
                <div key={s.value} className="px-6">
                  <p className="gold-gradient inline-block pb-1 font-headline text-5xl font-bold sm:text-6xl">
                    {s.value}
                  </p>
                  <p className="mx-auto mt-2 max-w-[15rem] text-sm text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Story */}
          <div className="mx-auto mt-20 max-w-3xl space-y-8 text-lg leading-[1.9] text-muted-foreground">
            <p
              className={cn(
                justify,
                "font-headline text-2xl font-medium leading-relaxed text-foreground sm:text-[1.7rem]"
              )}
            >
              An internationally certified Master Practitioner of Graphology, Mind Management Coach,
              NLP Practitioner and Healer, Pradeep Sharma brings over three decades of global
              leadership experience to the work of personal transformation.
            </p>

            <p className={justify}>
              His journey began in the steel industry, where he rose to the role of Chief Operating
              Officer. Leading large teams, complex operations and high-pressure decisions taught
              him a lesson that now shapes all his work: lasting results, in business and in life,
              begin with the mind. Habits, beliefs, emotions and self-image drive performance far
              more than skill alone. That conviction led him to leave the boardroom and dedicate
              himself to helping people understand and reshape their inner world.
            </p>

            <blockquote className="relative my-14 border-y border-primary/30 py-12 text-center">
              <span
                aria-hidden
                className="absolute -top-8 left-1/2 -translate-x-1/2 bg-card px-4 font-headline text-7xl leading-none text-primary"
              >
                “
              </span>
              <p className="font-headline text-2xl font-semibold italic leading-snug text-foreground sm:text-4xl">
                Lasting results, in business and in life, begin with the mind.
              </p>
            </blockquote>

            <p className={justify}>
              Today, Pradeep combines Graphotherapy (the practice of using handwriting to
              understand and gradually reshape thought and behaviour patterns) with NLP, mind
              management techniques and Healing. His approach is practical and personal.
              Handwriting is a window into the subconscious, and small, guided changes can lead to
              real shifts in confidence, focus, emotional balance and relationships.
            </p>

            <p className={justify}>
              Over the years, he has conducted 200+ offline workshops and empowered more than
              25,000 students, educators, doctors and entrepreneurs. Each audience brings a
              different challenge, such as exam stress and concentration for students, burnout and
              communication for professionals, or clarity and decision-making for business owners.
              His sessions are built around the individual and designed to leave participants with
              tools they can use the same day.
            </p>
          </div>

          {/* What guides his work */}
          <div className="mx-auto mt-24 max-w-5xl space-y-12">
            <SectionHeading>What guides his work</SectionHeading>

            <div className="grid gap-6 md:grid-cols-2">
              {principles.map((p, i) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.title}
                    className="group flex items-start gap-5 rounded-2xl border border-border/60 bg-background p-7 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl"
                  >
                    <div
                      className={cn(
                        "flex h-14 w-14 shrink-0 items-center justify-center rounded-full shadow-lg transition-transform duration-500 group-hover:scale-110",
                        i % 2 === 0
                          ? "bg-accent text-accent-foreground"
                          : "bg-primary text-primary-foreground"
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-headline text-xl font-bold leading-snug">{p.title}</h4>
                      <p className="mt-2 leading-relaxed text-muted-foreground">{p.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="space-y-8 pt-6">
              <Ornament />
              <p className="mx-auto max-w-3xl text-center font-headline text-2xl font-semibold italic leading-snug text-primary sm:text-3xl">
                Whether you are a student seeking focus, an educator inspiring a classroom, a
                professional facing stress, or an entrepreneur building a vision, Pradeep helps you
                turn inner clarity into outer results.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}