import type { Metadata } from "next";
import Image from "next/image";
import {
    ArrowRight,
    Briefcase,
    CalendarCheck,
    Coins,
    Compass,
    Eye,
    HeartPulse,
    MoveHorizontal,
    PenTool,
    Repeat,
    Ruler,
    Shapes,
    Sparkles,
    Trophy,
    Users,
    Waves,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingDialog } from "@/components/booking-dialog";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
    title: "Signature Decoding & Signature Correction | The Evolve Room",
    description:
        "Transform your signature, reinforce your growth. A handwriting-based practice to explore your signature patterns and develop a signature that represents who you aspire to become.",
};

const features = [
    { label: "Direction", icon: Compass },
    { label: "Shape", icon: Shapes },
    { label: "Size", icon: Ruler },
    { label: "Flow", icon: Waves },
    { label: "Spacing", icon: MoveHorizontal },
    { label: "Formation", icon: PenTool },
];

const focusAreas = [
    {
        title: "Health & Well-being",
        text: "Develop a more positive and conscious relationship with yourself.",
        icon: HeartPulse,
    },
    {
        title: "Relationships",
        text: "Reinforce qualities of understanding, emotional balance, and harmonious communication.",
        icon: Users,
    },
    {
        title: "Career & Professional Growth",
        text: "Develop a signature that represents confidence, clarity, and professional identity.",
        icon: Briefcase,
    },
    {
        title: "Money & Abundance",
        text: "Cultivate a mindset of responsibility, confidence, opportunity, and growth.",
        icon: Coins,
    },
    {
        title: "Success & Personal Transformation",
        text: "Align your daily practice with the person you aspire to become.",
        icon: Trophy,
    },
];

const pillars = [
    { label: "Repetition", icon: Repeat },
    { label: "Awareness", icon: Eye },
    { label: "Consistency", icon: CalendarCheck },
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

function PartHeading({
    number,
    title,
    subtitle,
    center = false,
}: {
    number: string;
    title: string;
    subtitle: string;
    center?: boolean;
}) {
    return (
        <div className={cn("space-y-4", center && "text-center")}>
            <span className="gold-gradient inline-block pb-1 font-headline text-5xl font-bold">
                {number}
            </span>
            <h2 className="font-headline text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                {title}
            </h2>
            <p className="font-headline text-2xl font-semibold italic text-primary sm:text-3xl">
                {subtitle}
            </p>
        </div>
    );
}

export default function SignaturePage() {
    const registerButton = (label: string) => (
        <BookingDialog
            trigger={
                <Button
                    size="lg"
                    className="rounded-none px-10 py-7 text-sm font-bold uppercase tracking-[0.3em] shadow-xl transition-transform hover:scale-105"
                >
                    {label} <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
            }
        />
    );

    return (
        <div className="relative overflow-hidden">
            {/* ---------- Background ---------- */}
            <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
                <div className="absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-accent/20 blur-3xl" />
                <div className="absolute top-1/4 -right-40 h-[34rem] w-[34rem] rounded-full bg-primary/15 blur-3xl" />
                <div className="absolute top-[60%] -left-40 h-[30rem] w-[30rem] rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute bottom-0 right-1/4 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-3xl" />
                <Image
                    src="/graphology/foliage-left.svg"
                    alt=""
                    width={300}
                    height={700}
                    unoptimized
                    className="absolute -left-12 top-24 hidden h-[480px] w-auto opacity-60 md:block"
                />
                <Image
                    src="/graphology/foliage-right.svg"
                    alt=""
                    width={300}
                    height={700}
                    unoptimized
                    className="absolute -right-12 bottom-24 hidden h-[480px] w-auto scale-y-[-1] opacity-60 md:block"
                />
            </div>

            <div className="relative z-10">
                {/* ================= Hero ================= */}
                <section className="px-6 pb-20 pt-32">
                    <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
                        <div className="animate-in fade-in slide-in-from-bottom-8 space-y-8 duration-1000">
                            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                                Graphology Services
                            </p>
                            <h1 className="font-headline text-5xl font-bold leading-[1] tracking-tight sm:text-6xl lg:text-7xl">
                                Signature Decoding
                                <span className="gold-gradient mt-1 block pb-2 pr-3 italic">
                                    &amp; Signature Correction
                                </span>
                            </h1>
                            <div className="h-px w-20 bg-primary" />
                            <p className="text-xs font-bold uppercase tracking-[0.25em] sm:text-sm">
                                Transform Your Signature. Reinforce Your Growth.
                            </p>
                            <div className="max-w-xl space-y-5 text-lg leading-relaxed text-muted-foreground">
                                <p className="font-headline text-2xl font-medium leading-snug text-foreground">
                                    Your signature is more than just your name. It is a personal expression of how
                                    you identify, present, and affirm yourself to the world.
                                </p>
                                <p>
                                    At The Evolve Room, Signature Decoding and Signature Correction is an empowering
                                    handwriting-based practice designed to help you explore your signature patterns
                                    and consciously develop a signature that represents the person you aspire to
                                    become.
                                </p>
                            </div>
                            {registerButton("Register Now")}
                        </div>

                        <div className="animate-in fade-in slide-in-from-right-8 relative mx-auto w-full max-w-md duration-1000 delay-300">
                            <div className="absolute -inset-3 rotate-3 border border-primary/20 bg-primary/10" />
                            <div className="relative aspect-square overflow-hidden rounded-2xl border border-border/60 shadow-2xl">
                                <Image
                                    src="/signature/hero.svg"
                                    alt="A handwritten signature on paper with a fountain pen"
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

                {/* ================= 01 Signature Decoding ================= */}
                <section className="border-y border-border/50 bg-card/60 px-6 py-24">
                    <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
                        <div className="space-y-8">
                            <PartHeading
                                number="01"
                                title="Signature Decoding"
                                subtitle="Understand Your Signature"
                            />
                            <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
                                <p>
                                    Every signature has its own unique style, structure, movement, and expression.
                                    Through signature decoding, we explore different features of your signature,
                                    such as its direction, shape, size, flow, spacing, and formation.
                                </p>
                                <p className="font-headline text-2xl italic leading-snug text-foreground">
                                    This process offers an opportunity for self-reflection and understanding of the
                                    patterns you may wish to consciously transform.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
                            {features.map((f, i) => {
                                const Icon = f.icon;
                                return (
                                    <div
                                        key={f.label}
                                        className="group flex flex-col items-center gap-4 rounded-2xl border border-border/60 bg-background p-6 text-center transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl"
                                    >
                                        <div
                                            className={cn(
                                                "flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform duration-500 group-hover:scale-110",
                                                i % 2 === 0
                                                    ? "bg-accent text-accent-foreground"
                                                    : "bg-primary text-primary-foreground"
                                            )}
                                        >
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <span className="font-headline text-xl font-bold">{f.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ================= 02 Signature Correction ================= */}
                <section className="px-6 py-24">
                    <div className="mx-auto max-w-6xl space-y-16">
                        <div className="mx-auto max-w-3xl space-y-8">
                            <PartHeading
                                number="02"
                                title="Signature Correction"
                                subtitle="Create Your New Signature"
                                center
                            />
                            <div className="space-y-5 text-center text-lg leading-relaxed text-muted-foreground">
                                <p>
                                    Your signature can become a conscious expression of your aspirations,
                                    confidence, identity, and personal growth.
                                </p>
                                <p>
                                    Through guided signature correction, you learn to develop a new signature that
                                    reflects your desired qualities and future direction.
                                </p>
                            </div>
                        </div>

                        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border/60 shadow-2xl">
                            <Image
                                src="/signature/transform.svg"
                                alt="A signature being analysed, then transformed into a stronger, rising signature"
                                width={1200}
                                height={600}
                                unoptimized
                                sizes="(min-width: 1024px) 1024px, 100vw"
                                className="h-auto w-full"
                            />
                        </div>

                        <div className="space-y-10">
                            <p className="text-center font-headline text-2xl font-semibold italic text-primary sm:text-3xl">
                                The practice focuses on reinforcing empowering patterns associated with:
                            </p>

                            <div className="flex flex-wrap justify-center gap-6">
                                {focusAreas.map((a, i) => {
                                    const Icon = a.icon;
                                    return (
                                        <div
                                            key={a.title}
                                            className="group relative w-full rounded-2xl border border-border/60 bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
                                        >
                                            <span className="absolute right-5 top-4 font-headline text-5xl font-bold text-primary/10 transition-colors group-hover:text-primary/25">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                            <div
                                                className={cn(
                                                    "mb-6 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform duration-500 group-hover:scale-110",
                                                    i % 2 === 0
                                                        ? "bg-accent text-accent-foreground"
                                                        : "bg-primary text-primary-foreground"
                                                )}
                                            >
                                                <Icon className="h-6 w-6" />
                                            </div>
                                            <h3 className="pr-8 font-headline text-xl font-bold leading-snug">
                                                {a.title}
                                            </h3>
                                            <div className="my-4 h-px w-10 bg-primary" />
                                            <p className="leading-relaxed text-muted-foreground">{a.text}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ================= 03 The Evolve Method ================= */}
                <section className="border-y border-border/50 bg-card/60 px-6 py-24">
                    <div className="mx-auto max-w-5xl space-y-14">
                        <div className="mx-auto max-w-3xl space-y-8">
                            <PartHeading
                                number="03"
                                title="The Evolve Method"
                                subtitle="Practice Your New Signature"
                                center
                            />
                            <div className="space-y-5 text-center text-lg leading-relaxed text-muted-foreground">
                                <p className="font-headline text-2xl font-medium leading-snug text-foreground">
                                    Creating a new signature is only the beginning. The real practice lies in
                                    repetition, awareness, and consistency.
                                </p>
                                <p>
                                    Through structured signature practice, you repeatedly write your new signature
                                    while consciously reinforcing the qualities and intentions you wish to embody.
                                </p>
                                <p>
                                    Over time, this practice may help you become more familiar and comfortable with
                                    your new signature and support your broader personal development goals.
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-3">
                            {pillars.map((p, i) => {
                                const Icon = p.icon;
                                return (
                                    <div
                                        key={p.label}
                                        className={cn(
                                            "group flex flex-col items-center gap-5 rounded-2xl border p-10 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl",
                                            i % 2 === 0
                                                ? "border-accent/30 bg-accent/10"
                                                : "border-primary/30 bg-primary/10"
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "flex h-16 w-16 items-center justify-center rounded-full shadow-lg transition-transform duration-500 group-hover:scale-110",
                                                i % 2 === 0
                                                    ? "bg-accent text-accent-foreground"
                                                    : "bg-primary text-primary-foreground"
                                            )}
                                        >
                                            <Icon className="h-7 w-7" />
                                        </div>
                                        <span className="font-headline text-2xl font-bold uppercase tracking-wide">
                                            {p.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ================= Transformation ================= */}
                <section className="px-6 py-24">
                    <div className="mx-auto max-w-4xl space-y-10 text-center">
                        <h2 className="font-headline text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
                            Your Transformation Begins With a{" "}
                            <span className="gold-gradient inline-block pb-1 pr-2 italic">Signature</span>
                        </h2>
                        <Ornament />
                        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                            Imagine signing your name every day with greater awareness, confidence, and a clear
                            intention for the future you want to create.
                        </p>
                        <div className="space-y-2 font-headline text-3xl font-semibold italic leading-tight sm:text-5xl">
                            <p>Your signature.</p>
                            <p>Your identity.</p>
                            <p className="text-primary">Your conscious evolution.</p>
                        </div>
                    </div>
                </section>

                {/* ================= Call to action ================= */}
                <section className="border-t border-border/50 bg-gold-subtle px-6 py-24">
                    <div className="mx-auto max-w-3xl space-y-10 text-center">
                        <h2 className="font-headline text-4xl font-bold leading-tight tracking-tight text-primary sm:text-5xl md:text-6xl">
                            Begin Your Signature Transformation Today
                        </h2>
                        <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
                            Discover what your current signature reveals through our signature decoding process
                            and learn how to develop your new signature through guided signature correction and
                            practice.
                        </p>
                        <p className="font-headline text-2xl font-semibold leading-snug sm:text-3xl">
                            Register for Signature Decoding &amp; Correction at The Evolve Room.
                        </p>
                        {registerButton("Register Now")}
                        <p className="font-headline text-xl italic text-muted-foreground sm:text-2xl">
                            Your journey towards conscious growth begins with a single signature.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}