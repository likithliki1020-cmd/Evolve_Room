import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Compass, Flower2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingDialog } from "@/components/booking-dialog";
import { cn } from "@/lib/utils";

export interface ModalityPageProps {
    eyebrow?: string;
    title?: string; // optional first line of the heading
    accent: string; // main heading text, shown in the gold gradient
    accentItalic?: boolean; // show the accent word in italics
    afterAccent?: string; // plain text that follows the accent word on the same line
    tagline?: string;
    intro?: string;
    quote?: string;

    // Hero visual: roadmap card (default), ripples, tapping points, quote card, or an image
    heroCard?: "roadmap" | "ripples" | "points" | "quote" | "image";
    heroIcon?: LucideIcon;
    heroImage?: string;
    heroImageAlt?: string;
    roadmap?: string[];
    roadmapTitle?: string;

    // Optional sections
    phrases?: { title: string; subtitle?: string; items: string[] };
    imageCards?: { title: string; text: string; icon: LucideIcon; image: string }[];
    imageCardsHeading?: string;
    focusTitle?: string;
    focusAreas?: { title: string; text?: string; icon: LucideIcon }[];
    steps?: { heading: string; items: { title: string; text: string }[] };
    feature?: { eyebrow: string; title: string; text: string; icon?: LucideIcon };
    sessionHeading?: string;
    sessionDetails?: { text: string; icon: LucideIcon }[];
    note?: string;
    closing?: { title: string; text: string };
    ctaLabel?: string;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-6">
            <div className="h-px flex-1 bg-primary/40" />
            <h2 className="text-xl sm:text-3xl font-bold uppercase tracking-[0.25em] text-center">
                {children}
            </h2>
            <div className="h-px flex-1 bg-primary/40" />
        </div>
    );
}

function IconCircle({ icon: Icon, index }: { icon: LucideIcon; index: number }) {
    return (
        <div
            className={cn(
                "w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110",
                index % 2 === 0 ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"
            )}
        >
            <Icon className="w-6 h-6" />
        </div>
    );
}

function Ripples({ icon: Icon }: { icon: LucideIcon }) {
    return (
        <div className="relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center">
            {[100, 78, 56].map((size, i) => (
                <span
                    key={size}
                    aria-hidden
                    className="absolute rounded-full border border-primary/30 bg-primary/5 animate-pulse"
                    style={{
                        width: `${size}%`,
                        height: `${size}%`,
                        animationDelay: `${i * 0.6}s`,
                        animationDuration: "3.5s",
                    }}
                />
            ))}
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl">
                <Icon className="h-12 w-12" />
            </div>
        </div>
    );
}

// Glowing constellation of "tapping points"
const POINTS: [number, number][] = [
    [200, 60],
    [135, 125],
    [265, 125],
    [100, 205],
    [300, 205],
    [150, 275],
    [250, 275],
    [200, 340],
];
const LINES: [number, number][] = [
    [0, 1], [0, 2], [1, 2], [1, 3], [2, 4], [3, 5],
    [4, 6], [5, 6], [5, 7], [6, 7], [1, 5], [2, 6],
];

function Constellation({ icon: Icon }: { icon: LucideIcon }) {
    return (
        <div className="relative mx-auto aspect-square w-full max-w-sm">
            <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden>
                <circle cx="200" cy="200" r="185" className="fill-primary/5 stroke-primary/20" strokeWidth="1" />
                <circle
                    cx="200"
                    cy="200"
                    r="140"
                    className="fill-none stroke-accent/40"
                    strokeWidth="1"
                    strokeDasharray="4 6"
                />
                {LINES.map(([a, b]) => (
                    <line
                        key={`${a}-${b}`}
                        x1={POINTS[a][0]}
                        y1={POINTS[a][1]}
                        x2={POINTS[b][0]}
                        y2={POINTS[b][1]}
                        className="stroke-primary/40"
                        strokeWidth="1.2"
                    />
                ))}
                {POINTS.map(([x, y], i) => (
                    <g key={i}>
                        <circle
                            cx={x}
                            cy={y}
                            r="13"
                            className="fill-primary/20 animate-pulse"
                            style={{ animationDelay: `${i * 0.4}s`, animationDuration: "3s" }}
                        />
                        <circle cx={x} cy={y} r="5" className="fill-primary" />
                    </g>
                ))}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl">
                    <Icon className="h-10 w-10" />
                </div>
            </div>
        </div>
    );
}

function QuoteCard({ quote, icon: Icon }: { quote: string; icon: LucideIcon }) {
    return (
        <div className="relative">
            <div className="absolute -inset-3 -rotate-3 bg-primary/10 border border-primary/20" />
            <div className="relative border border-border/60 bg-card shadow-2xl px-8 sm:px-10 py-12">
                <span
                    aria-hidden
                    className="block h-10 font-headline text-8xl font-bold leading-[0.6] text-primary"
                >
                    “
                </span>
                <p className="mt-4 font-headline text-3xl sm:text-4xl italic font-semibold leading-snug">
                    {quote}
                </p>
                <div className="mt-8 h-px w-16 bg-primary" />
            </div>
            <div className="absolute -top-6 -right-4 rotate-12 rounded-full bg-primary text-primary-foreground p-4 shadow-xl">
                <Icon className="w-7 h-7" />
            </div>
        </div>
    );
}

function HeroImage({ src, alt }: { src: string; alt: string }) {
    return (
        <div className="relative">
            <div className="absolute -inset-3 rotate-3 bg-primary/10 border border-primary/20" />
            <div className="relative aspect-[4/5] overflow-hidden border border-border/60 shadow-2xl">
                <Image
                    src={src}
                    alt={alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    className="object-cover"
                    unoptimized={src.endsWith(".svg")}
                />
            </div>
        </div>
    );
}

export function ModalityPage({
    eyebrow = "Healing Modality",
    title,
    accent,
    accentItalic = false,
    afterAccent,
    tagline,
    intro,
    quote,
    heroCard = "roadmap",
    heroIcon = Flower2,
    heroImage,
    heroImageAlt = "",
    roadmap = ["Awareness", "Release", "Realign", "Evolve"],
    roadmapTitle = "Your Evolution Roadmap",
    phrases,
    imageCards,
    imageCardsHeading,
    focusTitle = "Focus Areas",
    focusAreas,
    steps,
    feature,
    sessionHeading = "Session Format",
    sessionDetails,
    note,
    closing = {
        title: "Your evolution begins here.",
        text: "One conversation can change the direction of everything.",
    },
    ctaLabel = "Book a Session",
}: ModalityPageProps) {
    const FeatureIcon = feature?.icon;

    const bookButton = (
        <BookingDialog
            trigger={
                <Button
                    size="lg"
                    className="rounded-none px-10 py-7 text-sm tracking-[0.3em] uppercase font-bold shadow-xl hover:scale-105 transition-transform"
                >
                    {ctaLabel} <ArrowRight className="ml-3 w-5 h-5" />
                </Button>
            }
        />
    );

    return (
        <div className="flex flex-col">
            {/* ---------- Hero ---------- */}
            <section className="relative overflow-hidden pt-32 pb-20 md:pb-28 px-6">
                <div aria-hidden className="pointer-events-none absolute inset-0">
                    <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
                    <div className="absolute top-24 -right-20 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
                    <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
                </div>

                <div className="relative max-w-7xl mx-auto grid lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
                        <h1 className="text-[2.8rem] sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]">
                            {title && (
                                <>
                                    {title}
                                    <br />
                                </>
                            )}
                            <span
                                className={cn("gold-gradient inline-block pb-2", accentItalic && "italic pr-2")}
                            >
                                {accent}
                            </span>
                            {afterAccent && <> {afterAccent}</>}
                        </h1>
                        <div className="h-px w-20 bg-primary" />
                        {tagline && (
                            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em]">{tagline}</p>
                        )}
                        {intro && (
                            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                                {intro}
                            </p>
                        )}
                        {bookButton}
                    </div>

                    <div className="relative mx-auto w-full max-w-md animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
                        {heroCard === "ripples" ? (
                            <Ripples icon={heroIcon} />
                        ) : heroCard === "points" ? (
                            <Constellation icon={heroIcon} />
                        ) : heroCard === "quote" ? (
                            <QuoteCard quote={quote ?? ""} icon={heroIcon} />
                        ) : heroCard === "image" && heroImage ? (
                            <HeroImage src={heroImage} alt={heroImageAlt} />
                        ) : (
                            <>
                                <div className="absolute -inset-3 rotate-3 bg-primary/10 border border-primary/20" />
                                <div className="relative border border-border/60 bg-card shadow-2xl p-8 sm:p-10">
                                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-8">
                                        {roadmapTitle}
                                    </p>
                                    <ol className="relative space-y-8">
                                        <span
                                            aria-hidden
                                            className="absolute left-5 top-5 bottom-5 w-px bg-gradient-to-b from-primary/60 to-accent/60"
                                        />
                                        {roadmap.map((step, i) => (
                                            <li key={step} className="relative flex items-center gap-5">
                                                <span
                                                    className={cn(
                                                        "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-headline text-lg font-bold shadow-lg",
                                                        i % 2 === 0
                                                            ? "bg-primary text-primary-foreground"
                                                            : "bg-accent text-accent-foreground"
                                                    )}
                                                >
                                                    {i + 1}
                                                </span>
                                                <span className="font-headline text-2xl font-semibold">{step}</span>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                                <div className="absolute -top-6 -right-4 rotate-12 rounded-full bg-primary text-primary-foreground p-4 shadow-xl">
                                    <Compass className="w-7 h-7" />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* ---------- Image cards (optional) ---------- */}
            {imageCards && imageCards.length > 0 && (
                <section className="px-6 py-20 border-y border-border/50 bg-card/60">
                    <div className="max-w-7xl mx-auto space-y-12">
                        {imageCardsHeading && <SectionHeading>{imageCardsHeading}</SectionHeading>}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                            {imageCards.map((c) => {
                                const Icon = c.icon;
                                return (
                                    <div
                                        key={c.title}
                                        className="group flex flex-col overflow-hidden border border-border/60 bg-card shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-2xl"
                                    >
                                        <div className="relative aspect-[4/3] overflow-hidden">
                                            <Image
                                                src={c.image}
                                                alt={c.title}
                                                fill
                                                sizes="(min-width: 1280px) 20vw, (min-width: 640px) 45vw, 90vw"
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                unoptimized={c.image.endsWith(".svg")}
                                            />
                                            <div
                                                aria-hidden
                                                className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-card to-transparent"
                                            />
                                        </div>
                                        <div className="relative -mt-7 flex flex-1 flex-col items-center px-6 pb-8 text-center">
                                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-card transition-transform duration-500 group-hover:scale-110">
                                                <Icon className="h-6 w-6" />
                                            </div>
                                            <h3 className="mt-5 text-lg font-bold uppercase leading-snug tracking-wide">
                                                {c.title}
                                            </h3>
                                            <div className="my-4 h-px w-10 bg-primary" />
                                            <p className="text-sm leading-relaxed text-muted-foreground">{c.text}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* ---------- Phrases (optional) ---------- */}
            {phrases && (
                <section className="px-6 py-20 border-y border-border/50 bg-card/60">
                    <div className="max-w-6xl mx-auto space-y-10">
                        <SectionHeading>{phrases.title}</SectionHeading>
                        {phrases.subtitle && (
                            <p className="text-center text-lg md:text-xl text-muted-foreground italic max-w-2xl mx-auto">
                                {phrases.subtitle}
                            </p>
                        )}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {phrases.items.map((phrase, i) => (
                                <div
                                    key={phrase}
                                    className={cn(
                                        "group relative overflow-hidden border px-6 py-12 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl",
                                        i % 2 === 0
                                            ? "bg-accent/10 border-accent/30"
                                            : "bg-primary/10 border-primary/30"
                                    )}
                                >
                                    <span className="absolute top-2 left-4 font-headline text-6xl font-bold text-primary/10 group-hover:text-primary/25 transition-colors">
                                        {i + 1}
                                    </span>
                                    <p className="relative font-headline text-3xl md:text-4xl italic font-semibold leading-tight">
                                        {phrase}
                                    </p>
                                    <div className="relative mx-auto mt-6 h-px w-10 bg-primary" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ---------- Focus areas (optional) ---------- */}
            {focusAreas && focusAreas.length > 0 && (
                <section className="px-6 py-20 border-y border-border/50 bg-card/60">
                    <div className="max-w-6xl mx-auto space-y-12">
                        <SectionHeading>{focusTitle}</SectionHeading>
                        <div
                            className={cn(
                                "grid sm:grid-cols-2 gap-6",
                                focusAreas.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
                            )}
                        >
                            {focusAreas.map((area, i) => (
                                <div
                                    key={area.title}
                                    className="group relative border border-border/60 bg-background p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl"
                                >
                                    <span className="absolute top-4 right-5 font-headline text-5xl font-bold text-primary/10 group-hover:text-primary/25 transition-colors">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <div className="mb-6">
                                        <IconCircle icon={area.icon} index={i} />
                                    </div>
                                    <h3 className="text-xl font-bold leading-snug pr-6">{area.title}</h3>
                                    {area.text && (
                                        <>
                                            <div className="my-4 h-px w-10 bg-primary" />
                                            <p className="text-muted-foreground leading-relaxed">{area.text}</p>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ---------- Numbered points (optional) ---------- */}
            {steps && (
                <section className="px-6 py-24">
                    <div className="max-w-6xl mx-auto space-y-14">
                        <SectionHeading>{steps.heading}</SectionHeading>
                        <div className="grid md:grid-cols-3 gap-12 md:gap-0 md:divide-x divide-border">
                            {steps.items.map((s, i) => (
                                <div
                                    key={s.title}
                                    className="space-y-4 text-center md:text-left md:px-10 first:md:pl-0 last:md:pr-0"
                                >
                                    <span className="gold-gradient inline-block pb-1 font-headline text-6xl font-bold">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <h3 className="text-2xl font-bold">{s.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{s.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ---------- Feature highlight (optional) ---------- */}
            {feature && (
                <section className="px-6 py-24">
                    <div className="relative max-w-5xl mx-auto overflow-hidden border border-primary/30 bg-gold-subtle p-10 md:p-16 text-center">
                        <div aria-hidden className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
                        <div aria-hidden className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
                        <div className="relative space-y-6">
                            {FeatureIcon && (
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                                    <FeatureIcon className="h-7 w-7" />
                                </div>
                            )}
                            <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
                                {feature.eyebrow}
                            </p>
                            <div>
                                <h2 className="gold-gradient inline-block pb-1 text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight">
                                    {feature.title}
                                </h2>
                            </div>
                            <div className="mx-auto h-px w-20 bg-primary" />
                            <p className="mx-auto max-w-2xl text-lg md:text-xl italic text-muted-foreground">
                                {feature.text}
                            </p>
                        </div>
                    </div>
                </section>
            )}

            {/* ---------- Session details (optional) ---------- */}
            {sessionDetails && sessionDetails.length > 0 && (
                <section className="px-6 py-24">
                    <div className="max-w-5xl mx-auto space-y-12">
                        <SectionHeading>{sessionHeading}</SectionHeading>
                        <div
                            className={cn(
                                "grid gap-6",
                                sessionDetails.length === 2 ? "md:grid-cols-2 max-w-3xl mx-auto" : "md:grid-cols-3"
                            )}
                        >
                            {sessionDetails.map((d, i) => (
                                <div
                                    key={d.text}
                                    className={cn(
                                        "group flex flex-col items-center text-center gap-4 border p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl",
                                        i % 2 === 0
                                            ? "bg-accent/10 border-accent/30"
                                            : "bg-primary/10 border-primary/30"
                                    )}
                                >
                                    <IconCircle icon={d.icon} index={i} />
                                    <p className="text-lg font-medium">{d.text}</p>
                                </div>
                            ))}
                        </div>

                        {note && (
                            <div className="max-w-3xl mx-auto border-l-4 border-primary bg-primary/10 px-8 py-6">
                                <p className="font-headline text-2xl italic">{note}</p>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* ---------- Closing call to action ---------- */}
            <section className="px-6 py-24 bg-gold-subtle border-t border-border/50">
                <div className="max-w-3xl mx-auto text-center space-y-10">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-primary">
                        {closing.title}
                    </h2>
                    <p className="text-lg text-muted-foreground italic">{closing.text}</p>
                    {bookButton}
                </div>
            </section>
        </div>
    );
}