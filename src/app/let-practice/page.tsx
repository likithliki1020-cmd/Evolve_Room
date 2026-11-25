import type { Metadata } from "next";
import {
  CalendarCheck,
  CalendarDays,
  Clock,
  Eye,
  Monitor,
  Target,
  Timer,
  Users,
} from "lucide-react";
import { ModalityPage } from "@/components/modality-page";

export const metadata: Metadata = {
  title: "Let’s Practise | The Evolve Room",
  description:
    "Let’s Evolve Together is a guided group practice to help you become more aware of your subconscious patterns and consciously practise new ways of thinking.",
};

export default function LetPracticePage() {
  return (
    <ModalityPage
      eyebrow="Let’s Practise"
      title="Let’s Evolve"
      accent="Together"
      tagline="Small Daily Practices | Meaningful Inner Change"
      intro="Let’s Evolve Together is a guided group practice designed to help you become more aware of your subconscious patterns and consciously practise new ways of thinking."
      heroCard="ripples"
      heroIcon={Users}
      focusTitle="How We Practise"
      focusAreas={[
        {
          title: "Subconscious Awareness",
          text: "Recognise familiar thought patterns and explore new perspectives.",
          icon: Eye,
        },
        {
          title: "Intentional Thinking",
          text: "Practise thoughts and beliefs that support the life you want to create.",
          icon: Target,
        },
        {
          title: "Guided Daily Practice",
          text: "Use simple exercises, visualisation, affirmations, and reflection to build consistency.",
          icon: CalendarCheck,
        },
        {
          title: "Grow Together",
          text: "Experience the encouragement of a community committed to learning, practising, and evolving together.",
          icon: Users,
        },
      ]}
      feature={{
        eyebrow: "Session Format",
        title: "Online Guided Group Practice",
        text: "Practise together in a supportive environment and experience the collective energy.",
        icon: Monitor,
      }}
      sessionHeading="Session Details"
      sessionDetails={[
        { text: "Days: Monday to Friday", icon: CalendarDays },
        { text: "Duration: 30 minutes", icon: Timer },
        { text: "Timings: 9.30 pm to 10 pm IST", icon: Clock },
      ]}
      closing={{
        title: "Evolve, one practice at a time.",
        text: "Small daily practices create meaningful inner change.",
      }}
      ctaLabel="Join the Practice"
    />
  );
}