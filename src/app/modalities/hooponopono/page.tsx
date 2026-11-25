import type { Metadata } from "next";
import { Flower2, Heart, MessageCircleHeart, Users } from "lucide-react";
import { ModalityPage } from "@/components/modality-page";

export const metadata: Metadata = {
  title: "Ho’oponopono | The Evolve Room",
  description:
    "A gentle Hawaiian practice to release emotional burdens, restore harmony and create a more peaceful, fulfilling life.",
};

export default function HooponoponoPage() {
  return (
    <ModalityPage
      eyebrow="Hawaiian Healing Practice"
      accent="Ho’oponopono"
      intro="A gentle Hawaiian practice to release emotional burdens, restore harmony and create a more peaceful, fulfilling life."
      heroCard="ripples"
      heroIcon={Flower2}
      phrases={{
        title: "Healing Phrases",
        subtitle: "Simple yet powerful phrases to bring healing and harmony.",
        items: ["I’m sorry", "Please forgive me", "Thank you", "I love you"],
      }}
      feature={{
        eyebrow: "At The Evolve Room, we take the practice deeper through",
        title: "Advanced Conversational Ho’oponopono",
        text: "Guiding inner conversations and deeper connections.",
        icon: MessageCircleHeart,
      }}
      sessionHeading="Sessions Include"
      sessionDetails={[
        { text: "Private Healing Sessions", icon: Heart },
        { text: "Guided Group Practices", icon: Users },
      ]}
      closing={{
        title: "Return to peace.",
        text: "Gentle practice, lasting harmony.",
      }}
      ctaLabel="Book Ho’oponopono Session"
    />
  );
}