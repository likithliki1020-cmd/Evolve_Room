import { Button } from "@/components/ui/button";
import { Zap, Brain, Shield, HeartPulse } from "lucide-react";

export default function EFTPage() {
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto space-y-12 text-center">
        <div className="space-y-4">
          <span className="text-primary uppercase tracking-[0.4em] font-bold text-sm">Somatic Healing</span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight gold-gradient">Emotional Freedom <br /> Technique (Tapping)</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { title: "Anxiety", icon: <Shield className="w-6 h-6" /> },
            { title: "Overthinking", icon: <Brain className="w-6 h-6" /> },
            { title: "Trauma", icon: <HeartPulse className="w-6 h-6" /> },
            { title: "Regulation", icon: <Zap className="w-6 h-6" /> },
          ].map((item) => (
            <div key={item.title} className="p-6 border border-border bg-card flex flex-col items-center space-y-3">
              <div className="text-primary">{item.icon}</div>
              <span className="text-xs uppercase tracking-widest font-bold">{item.title}</span>
            </div>
          ))}
        </div>

        <div className="text-left space-y-8 max-w-2xl mx-auto py-12">
          <p className="text-xl text-muted-foreground leading-relaxed">
            EFT is a powerful tool that combines ancient Chinese acupressure with modern psychology. By tapping on specific meridian points while focusing on emotional distress, we signal the amygdala to relax.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center space-x-4 border-b border-border/50 pb-4">
              <span className="text-primary font-bold text-2xl">01</span>
              <span className="text-lg uppercase tracking-widest">Reduce Anxiety & Stress</span>
            </li>
            <li className="flex items-center space-x-4 border-b border-border/50 pb-4">
              <span className="text-primary font-bold text-2xl">02</span>
              <span className="text-lg uppercase tracking-widest">Overthinking Reset</span>
            </li>
            <li className="flex items-center space-x-4 border-b border-border/50 pb-4">
              <span className="text-primary font-bold text-2xl">03</span>
              <span className="text-lg uppercase tracking-widest">Deep Trauma Release</span>
            </li>
            <li className="flex items-center space-x-4">
              <span className="text-primary font-bold text-2xl">04</span>
              <span className="text-lg uppercase tracking-widest">Nervous System Regulation</span>
            </li>
          </ul>
        </div>

        <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-12 py-8 text-xl tracking-widest uppercase rounded-none">
          BOOK EFT SESSION
        </Button>
      </div>
    </div>
  );
}