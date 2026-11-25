import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Sparkles,
  Heart,
  Zap,
  Phone,
  ChevronDown,
  Flower2,
  Coins,
  TrendingUp,
  Sprout,
  Brain,
  PenLine,
} from "lucide-react";
import { BookingDialog } from "@/components/booking-dialog";
import { cn } from "@/lib/utils";

export default function Home() {
  const modalities = [
    {
      name: "Life Coaching",
      href: "/modalities/life-coaching",
      icon: Sprout,
      image: "/modalities/life-coaching.svg",
      text: "Gain clarity, break limiting patterns and create a life that feels aligned, fulfilling and truly yours.",
      button: "bg-[#0F5257]",
    },
    {
      name: "Ho’oponopono",
      href: "/modalities/hooponopono",
      icon: Heart,
      image: "/modalities/hooponopono.svg",
      text: "Release the past, cultivate forgiveness and create inner peace in your relationships and within yourself.",
      button: "bg-[#4B5E2F]",
    },
    {
      name: "EFT",
      subtitle: "Emotional Freedom Technique",
      href: "/modalities/eft",
      icon: Zap,
      image: "/modalities/eft.svg",
      text: "Release emotional blocks, calm anxiety and restore balance through simple yet powerful tapping techniques.",
      button: "bg-[#8A6414]",
    },
    {
      name: "NLP",
      href: "/modalities/nlp",
      icon: Brain,
      image: "/modalities/nlp.svg",
      text: "Rewire your thought patterns, shift your mindset and create new possibilities for a more empowered you.",
      button: "bg-[#8B4A44]",
    },
    {
      name: "Chakra Healing",
      href: "/modalities/chakra-healing",
      icon: Flower2,
      image: "/chakra/chakra-assessment.svg",
      text: "Balance your energy, release blockages and feel more grounded, vibrant and aligned in your daily life.",
      button: "bg-[#0E4B4B]",
    },
    {
      name: "Graphology",
      href: "/graphology",
      icon: PenLine,
      image: "/modalities/graphology.svg",
      text: "Discover what your handwriting reveals about your personality, emotions and hidden strengths.",
      button: "bg-[#6A4A5C]",
    },
  ];

  const areas = [
    {
      number: "01",
      title: "Health",
      text: "Regulate your nervous system and build a healthier, more balanced you.",
      icon: Flower2,
      image: "/areas/health.svg",
    },
    {
      number: "02",
      title: "Relationships",
      text: "Heal patterns, build healthier connections and experience more fulfilling relationships.",
      icon: Heart,
      image: "/areas/relationships.svg",
    },
    {
      number: "03",
      title: "Career",
      text: "Gain clarity, overcome inner blocks and create growth with purpose.",
      icon: TrendingUp,
      image: "/areas/career.svg",
    },
    {
      number: "04",
      title: "Money",
      text: "Shift limiting beliefs, invite abundance and create a healthier relationship with money.",
      icon: Coins,
      image: "/areas/money.svg",
    },
  ];

  const WHATSAPP_LINK = "https://wa.me/919876543210?text=I'm%20interested%20in%20booking%20a%20session%20at%20The%20Evolve%20Room.";

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-28 pb-24">
        {/* Background: gradient, glows and flowing waves */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/60" />
          <div className="absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-accent/25 blur-3xl" />
          <div className="absolute top-1/4 -right-40 h-[34rem] w-[34rem] rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-40 left-1/4 h-[28rem] w-[28rem] rounded-full bg-accent/15 blur-3xl" />

          <Image
            src="/hero/hero-aurora.svg"
            alt=""
            fill
            unoptimized
            priority
            sizes="100vw"
            className="object-cover opacity-90"
          />

          <Sparkles className="absolute left-[12%] top-[30%] hidden h-6 w-6 animate-pulse text-primary/60 md:block" />
          <Sparkles className="absolute right-[14%] top-[24%] hidden h-5 w-5 animate-pulse text-accent/70 [animation-delay:700ms] md:block" />
          <Sparkles className="absolute bottom-[26%] right-[20%] hidden h-6 w-6 animate-pulse text-primary/60 [animation-delay:1400ms] md:block" />
          <Sparkles className="absolute bottom-[30%] left-[18%] hidden h-5 w-5 animate-pulse text-accent/70 [animation-delay:2100ms] md:block" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center space-y-12">
          <div className="space-y-8">
            <h1 className="font-headline text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl md:text-9xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              <span className="block">Evolve Beyond</span>
              <span className="gold-gradient inline-block pb-3 pr-3 italic">Your Limits</span>
            </h1>

            <div className="flex items-center justify-center gap-4 animate-in fade-in duration-1000 delay-500">
              <span className="h-px w-14 bg-primary/60 sm:w-24" />
              <span className="h-2.5 w-2.5 rotate-45 bg-primary" />
              <span className="h-px w-14 bg-primary/60 sm:w-24" />
            </div>

            <p className="mx-auto max-w-3xl font-headline text-2xl italic leading-snug text-foreground/80 sm:text-3xl md:text-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
              A journey of Self-Discovery, Inner Growth and Lasting Transformation
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-5 sm:flex-row animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700">
            <BookingDialog
              trigger={
                <Button
                  size="lg"
                  className="rounded-none bg-primary px-12 py-8 text-lg font-bold uppercase tracking-[0.25em] text-primary-foreground shadow-2xl shadow-primary/30 transition-all hover:scale-105 hover:bg-primary/90"
                >
                  Book a Session
                </Button>
              }
            />
            <Link href="/let-practice">
              <Button
                size="lg"
                variant="outline"
                className="rounded-none border-primary px-12 py-8 text-lg font-bold uppercase tracking-[0.25em] text-primary transition-all hover:bg-primary/10 hover:text-primary"
              >
                Join Let&rsquo;s Practice
              </Button>
            </Link>
          </div>
        </div>

        <ChevronDown className="absolute bottom-8 left-1/2 h-7 w-7 -translate-x-1/2 animate-bounce text-primary/70" />
      </section>

      {/* Section 2: What We Work On */}
      <section className="py-24 md:py-32 px-6 bg-card">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-headline font-bold tracking-tight">We Work On All <br /> Areas of Life</h2>
            <div className="h-1 w-20 bg-accent" />
            <p className="text-lg text-muted-foreground leading-relaxed">
              At The Evolve Room, transformation is holistic. We don't just treat symptoms; we address the core subconscious patterns that manifest in your outer reality.
            </p>
            <ul className="space-y-4">
              {["Health & Emotional Wellbeing", "Relationships & Attachment Healing", "Career Clarity & Growth", "Money Blocks & Abundance Alignment"].map((item) => (
                <li key={item} className="flex items-center space-x-3 text-lg font-medium group">
                  <span className="w-2 h-2 rounded-full bg-primary transition-all group-hover:scale-150" />
                  <span className="group-hover:text-primary transition-colors">{item}</span>
                </li>
              ))}
            </ul>
            <p className="pt-4 font-bold italic text-primary">Because real evolution is not partial — it is whole.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {areas.map((area) => {
              const Icon = area.icon;
              return (
                <div
                  key={area.title}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-background shadow-md transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-2xl"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={area.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
                      unoptimized
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="relative -mt-7 flex flex-1 flex-col items-center px-5 pb-7 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-background transition-transform duration-500 group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="mt-4 font-headline text-lg font-bold text-accent">{area.number}</span>
                    <h3 className="font-headline text-xl font-bold uppercase tracking-widest">{area.title}</h3>
                    <div className="my-3 h-px w-8 bg-primary" />
                    <p className="text-sm leading-relaxed text-muted-foreground">{area.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3: Our Healing Modalities */}
      <section className="py-24 md:py-32 px-6 bg-background">
        <div className="max-w-7xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl font-headline font-bold text-primary">Our Healing Modalities</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg italic">
            A diverse toolkit of ancient wisdom and modern psychology to facilitate your deepest breakthroughs.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {modalities.map((mod) => {
            const Icon = mod.icon;
            return (
              <Link
                key={mod.name}
                href={mod.href}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-md transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-2xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={mod.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    unoptimized={mod.image.endsWith(".svg")}
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-card to-transparent"
                  />
                </div>

                <div className="relative -mt-9 flex flex-1 flex-col items-center px-8 pb-8 text-center">
                  <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border border-primary/40 bg-background text-primary shadow-lg transition-transform duration-500 group-hover:scale-110">
                    <Icon className="h-8 w-8" />
                  </div>

                  <h3 className="mt-5 font-headline text-2xl font-bold uppercase tracking-widest">
                    {mod.name}
                  </h3>
                  {mod.subtitle && (
                    <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      ({mod.subtitle})
                    </span>
                  )}
                  <div className="my-4 h-px w-10 bg-primary" />
                  <p className="leading-relaxed text-muted-foreground">{mod.text}</p>

                  <div className="mt-auto w-full pt-7">
                    <span
                      className={cn(
                        "inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-[0.25em] text-white shadow-md transition-all duration-500 group-hover:gap-4 group-hover:shadow-xl",
                        mod.button
                      )}
                    >
                      Explore Path <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <Link href="/modalities">
            <Button variant="link" className="text-primary uppercase tracking-[0.3em] font-bold text-sm">
              Explore All Modalities →
            </Button>
          </Link>
        </div>
      </section>

      {/* Section 6 & 7: Courses & Booking CTA */}
      <section className="py-24 md:py-40 px-6 bg-card border-t border-border/50">
        <div className="max-w-4xl mx-auto text-center space-y-16">
          <h2 className="text-5xl md:text-8xl font-headline font-bold tracking-tight text-primary">Ready to Begin?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-10 border border-border/50 hover:border-primary transition-all bg-background flex flex-col space-y-4 group">
              <h3 className="font-bold tracking-widest uppercase text-xs">1:1 Session</h3>
              <p className="text-[10px] text-muted-foreground italic uppercase">Personalized deep diving</p>
              <div className="pt-4 mt-auto">
                <BookingDialog
                  trigger={
                    <Button variant="outline" className="w-full border-primary text-primary group-hover:bg-primary group-hover:text-primary-foreground rounded-none uppercase text-[10px] tracking-widest font-bold h-12">BOOK NOW</Button>
                  }
                />
              </div>
            </div>
            <div className="p-10 border border-border/50 hover:border-primary transition-all bg-background flex flex-col space-y-4 group">
              <h3 className="font-bold tracking-widest uppercase text-xs">LET Practice</h3>
              <p className="text-[10px] text-muted-foreground italic uppercase">Community healing</p>
              <div className="pt-4 mt-auto">
                <Link href="/let-practice" className="w-full">
                  <Button variant="outline" className="w-full border-primary text-primary group-hover:bg-primary group-hover:text-primary-foreground rounded-none uppercase text-[10px] tracking-widest font-bold h-12">JOIN GROUP</Button>
                </Link>
              </div>
            </div>
            <div className="p-10 border border-border/50 hover:border-primary transition-all bg-background flex flex-col space-y-4 group">
              <h3 className="font-bold tracking-widest uppercase text-xs">Courses</h3>
              <p className="text-[10px] text-muted-foreground italic uppercase">Self-paced evolution</p>
              <div className="pt-4 mt-auto w-full">
                <Link href="/courses">
                  <Button variant="outline" className="w-full border-primary text-primary group-hover:bg-primary group-hover:text-primary-foreground rounded-none uppercase text-[10px] tracking-widest font-bold h-12">VIEW ALL</Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12">
            <BookingDialog
              isPayNow={true}
              trigger={
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-12 py-8 text-xl tracking-widest rounded-none w-full sm:w-auto uppercase font-bold transition-all hover:scale-105 shadow-xl">
                  PAY & BOOK NOW
                </Button>
              }
            />
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 px-12 py-8 text-xl tracking-widest rounded-none w-full uppercase font-bold transition-all flex items-center justify-center gap-3">
                <Phone className="w-5 h-5" /> WHATSAPP DIRECT
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}