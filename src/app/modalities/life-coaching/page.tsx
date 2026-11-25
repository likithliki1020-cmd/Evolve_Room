import type { Metadata } from "next";
import {
  Brain,
  Briefcase,
  Clock,
  Coins,
  Heart,
  MapPin,
  Monitor,
  Sparkles,
  Users,
} from "lucide-react";
import { ModalityPage } from "@/components/modality-page";

export const metadata: Metadata = {
  title: "Life Coaching | The Evolve Room",
  description:
    "Private 1:1 life coaching for emotional clarity, mindset, relationships, confidence, career and money.",
};

export default function LifeCoachingPage() {
  return (
    <ModalityPage
      title="Private 1:1"
      accent="Life Coaching"
      tagline="Clarity · Confidence · Conscious Change"
      intro="Personalised, one-to-one sessions that help you understand your inner patterns, release what is holding you back, and build a life aligned with who you are becoming."
      focusAreas={[
        { title: "Emotional Clarity & Wellbeing", icon: Heart },
        { title: "Mindset & Subconscious Patterns", icon: Brain },
        { title: "Relationships & Boundaries", icon: Users },
        { title: "Confidence & Self-Worth", icon: Sparkles },
        { title: "Career Clarity & Growth", icon: Briefcase },
        { title: "Money Mindset & Abundance", icon: Coins },
      ]}
      sessionDetails={[
        { text: "90-minute intensive sessions", icon: Clock },
        { text: "Online via Zoom", icon: Monitor },
        { text: "In-Person (Bengaluru)", icon: MapPin },
      ]}
      note="Each journey includes a personalized evolution roadmap."
      ctaLabel="Book a Session"
    />
  );
}