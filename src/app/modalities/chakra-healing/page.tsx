import type { Metadata } from "next";
import { AudioLines, Flower2, Heart, Sparkles, Sun } from "lucide-react";
import { ModalityPage } from "@/components/modality-page";

export const metadata: Metadata = {
  title: "Chakra Healing | The Evolve Room",
  description:
    "Holistic healing practices that support your emotional, mental, energetic and spiritual wellbeing.",
};

export default function ChakraHealingPage() {
  return (
    <ModalityPage
      eyebrow="Holistic Healing"
      title="Healing for a"
      accent="Balanced"
      accentItalic
      afterAccent="Life"
      intro="Experience holistic healing practices that support your emotional, mental, energetic and spiritual wellbeing. At The Evolve Room, we help you release blocks, restore balance and reconnect with your natural flow."
      heroCard="image"
      heroImage="/chakra/hero.svg"
      heroImageAlt="A figure meditating among leaves in warm sunlight"
      imageCards={[
        {
          title: "Chakra Assessment",
          text: "Identify energetic imbalances and understand your chakra health.",
          icon: Flower2,
          image: "/chakra/chakra-assessment.svg",
        },
        {
          title: "Energy Clearing",
          text: "Release stagnant energy, remove energetic blocks and feel lighter.",
          icon: Sun,
          image: "/chakra/energy-clearing.svg",
        },
        {
          title: "Sound Healing",
          text: "Calm the mind, release tension and realign your energy.",
          icon: AudioLines,
          image: "/chakra/sound-healing.svg",
        },
        {
          title: "Aura Calibration",
          text: "Cleanse, strengthen and harmonise your energy field.",
          icon: Sparkles,
          image: "/chakra/aura-calibration.svg",
        },
        {
          title: "Inner Healing Sessions",
          text: "Support emotional healing, self-acceptance and deeper inner alignment.",
          icon: Heart,
          image: "/chakra/inner-healing.svg",
        },
      ]}
      closing={{
        title: "Return to your natural flow.",
        text: "Release what is blocked, restore balance and feel lighter.",
      }}
      ctaLabel="Book a Healing Session"
    />
  );
}