"use client";

import { ArrowRight, BookOpen, Clock, Target, TrendingUp } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const courses = [
    {
        id: "basic",
        cardTitle: "Basic Course",
        duration: "2 Months",
        cardText: "Learn the fundamentals of Graphology.",
        popupTitle: "Basic Graphology",
        focus: "Foundation in handwriting analysis",
        objective:
            "Learn to observe handwriting patterns and understand the basic principles of graphology.",
        icon: BookOpen,
        tone: "sage",
    },
    {
        id: "advanced",
        cardTitle: "Advance Course",
        duration: "4 Months",
        cardText: "In-depth learning and practical application.",
        popupTitle: "Advanced Graphology",
        focus: "Advanced analysis and Graphotherapy",
        objective:
            "Develop the ability to conduct structured handwriting assessments, interpret combinations of features and design handwriting practice programmes and BioHacking.",
        icon: TrendingUp,
        tone: "gold",
    },
];

function LeafSpray({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 140 140"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            aria-hidden
            className={className}
        >
            <path d="M8 132 C 14 70 52 28 118 8 C 112 70 70 112 8 132 Z" />
            <path d="M8 132 L 104 24" />
            <path d="M34 106 C 44 84 62 66 86 54" />
            <path d="M22 70 C 24 50 34 36 50 26 C 52 46 42 60 22 70 Z" />
        </svg>
    );
}

export function GraphologyCourses() {
    return (
        <div className="grid gap-8 md:grid-cols-2">
            {courses.map((c) => {
                const Icon = c.icon;
                const sage = c.tone === "sage";

                return (
                    <Dialog key={c.id}>
                        {/* ---------- The card (click to open) ---------- */}
                        <DialogTrigger asChild>
                            <button
                                type="button"
                                className={cn(
                                    "group relative flex w-full cursor-pointer items-start gap-6 overflow-hidden rounded-2xl border p-8 text-left transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                                    sage ? "border-accent/30 bg-accent/10" : "border-primary/30 bg-primary/10"
                                )}
                            >
                                <LeafSpray
                                    className={cn(
                                        "pointer-events-none absolute bottom-0 h-36 w-36 opacity-40",
                                        sage
                                            ? "left-0 -translate-x-4 text-accent"
                                            : "right-0 translate-x-4 scale-x-[-1] text-primary"
                                    )}
                                />
                                <span
                                    className={cn(
                                        "relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full shadow-lg",
                                        sage
                                            ? "bg-accent text-accent-foreground"
                                            : "bg-primary text-primary-foreground"
                                    )}
                                >
                                    <Icon className="h-7 w-7" />
                                </span>
                                <span className="relative block border-l border-border pl-6">
                                    <span className="block font-headline text-2xl font-bold uppercase tracking-wide">
                                        {c.cardTitle}
                                    </span>
                                    <span className="mt-1 block text-sm font-semibold">{c.duration}</span>
                                    <span className="my-4 block h-px w-10 bg-primary" />
                                    <span className="block text-muted-foreground">{c.cardText}</span>
                                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary transition-all group-hover:gap-3">
                                        View details <ArrowRight className="h-4 w-4" />
                                    </span>
                                </span>
                            </button>
                        </DialogTrigger>

                        {/* ---------- The popup ---------- */}
                        <DialogContent className="max-w-xl overflow-hidden rounded-2xl border-primary/30 bg-card p-0 sm:rounded-2xl">
                            <div className="h-1.5 w-full bg-gradient-to-r from-primary via-accent to-primary" />

                            <div className="relative space-y-6 p-8 sm:p-10">
                                <div
                                    aria-hidden
                                    className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/15 blur-3xl"
                                />

                                <div className="relative flex items-center gap-5">
                                    <div
                                        className={cn(
                                            "flex h-16 w-16 shrink-0 items-center justify-center rounded-full shadow-lg",
                                            sage
                                                ? "bg-accent text-accent-foreground"
                                                : "bg-primary text-primary-foreground"
                                        )}
                                    >
                                        <Icon className="h-7 w-7" />
                                    </div>
                                    <div>
                                        <DialogTitle className="font-headline text-3xl font-bold leading-tight sm:text-4xl">
                                            {c.popupTitle}
                                        </DialogTitle>
                                        <span className="mt-2 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                                            <Clock className="h-3.5 w-3.5" />
                                            {c.duration}
                                        </span>
                                    </div>
                                </div>

                                <div className="relative h-px w-16 bg-primary" />

                                <DialogDescription className="relative font-headline text-2xl italic leading-snug text-primary">
                                    {c.focus}
                                </DialogDescription>

                                <div className="relative rounded-xl border border-border/60 bg-background/70 p-6">
                                    <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
                                        <Target className="h-4 w-4 text-primary" />
                                        Objective
                                    </p>
                                    <p className="text-lg leading-relaxed">{c.objective}</p>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                );
            })}
        </div>
    );
}