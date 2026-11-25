import type { Metadata } from "next";
import { Brain, RefreshCw, Sprout, Target } from "lucide-react";
import { ModalityPage } from "@/components/modality-page";

export const metadata: Metadata = {
  title: "NLP | The Evolve Room",
  description:
    "Neuro-Linguistic Programming: recognise your patterns, shift limiting beliefs, build empowering habits and clarify your goals.",
};

export default function NlpPage() {
  return (
    <ModalityPage
      eyebrow="Neuro-Linguistic Programming"
      title="Change the Way"
      accent="You Think"
      intro="Explore how your thoughts, language and habits shape your everyday experience, and learn to respond with more clarity and choice."
      heroCard="quote"
      heroIcon={Brain}
      quote="The words you use shape the possibilities you see."
      focusTitle="How NLP Helps"
      focusAreas={[
        {
          title: "Recognise Your Patterns",
          text: "Notice the thoughts and language that influence your everyday choices.",
          icon: Brain,
        },
        {
          title: "Shift Limiting Beliefs",
          text: "Explore new perspectives that support confidence and personal growth.",
          icon: Sprout,
        },
        {
          title: "Build Empowering Habits",
          text: "Practise more helpful ways to respond, communicate, and move forward.",
          icon: RefreshCw,
        },
        {
          title: "Clarify Your Goals",
          text: "Turn intentions into meaningful steps you can take with purpose.",
          icon: Target,
        },
      ]}
      closing={{
        title: "Rewrite your inner script.",
        text: "Small shifts in language can open new possibilities.",
      }}
      ctaLabel="Book an NLP Session"
    />
  );
}