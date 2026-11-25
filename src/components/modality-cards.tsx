import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Brain, Flower2, Heart, PenLine, Sprout, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type Modality = {
    name: string;
    subtitle?: string;
    href: string;
    icon: LucideIcon;
    image: string;
    text: string;
    button: string;
};

export const modalities: Modality[] = [
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

export function ModalityCards() {
    return (
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
    );
}