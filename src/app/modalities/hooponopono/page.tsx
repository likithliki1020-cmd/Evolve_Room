import { Button } from "@/components/ui/button";
import { Sparkles, Heart, ShieldCheck, Waves } from "lucide-react";

export default function HooponoponoPage() {
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4">
          <span className="text-primary uppercase tracking-[0.4em] font-bold text-sm">Ancient Hawaiian Wisdom</span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">Emotional Cleansing <br /> & Inner Peace</h1>
          <div className="h-1 w-32 bg-primary mt-6" />
        </div>

        <div className="prose prose-invert max-w-none text-xl text-muted-foreground leading-relaxed">
          <p>
            Ho’oponopono is a profound healing process that focuses on reconciliation and forgiveness. In "The Evolve Room", we use this modality to clear the energetic static of the past.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: "Release Resentment", icon: <ShieldCheck className="w-8 h-8" />, text: "Clear the heavy energy of past conflicts." },
            { title: "Heal Relationships", icon: <Heart className="w-8 h-8" />, text: "Mend deep-seated wounds with self and others." },
            { title: "Clear Guilt", icon: <Waves className="w-8 h-8" />, text: "Release subconscious burdens and self-judgment." },
            { title: "Restore Harmony", icon: <Sparkles className="w-8 h-8" />, text: "Return to a state of flow and internal peace." },
          ].map((item) => (
            <div key={item.title} className="p-8 border border-border/50 bg-card/30 space-y-4">
              <div className="text-primary">{item.icon}</div>
              <h3 className="text-xl font-bold tracking-widest uppercase">{item.title}</h3>
              <p className="text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-gold-subtle p-8 border border-primary/20">
          <h3 className="text-xl font-bold uppercase tracking-widest mb-6">Service Includes:</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>Private Healing Sessions</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>Guided Group Practice</span>
            </li>
          </ul>
        </div>

        <div className="pt-8">
          <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-8 text-xl tracking-widest uppercase rounded-none">
            BOOK HO'OPONOPONO SESSION
          </Button>
        </div>
      </div>
    </div>
  );
}