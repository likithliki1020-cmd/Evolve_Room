import Link from "next/link";
import { ArrowRight, Heart, Sparkles, Zap, Briefcase, Globe, MessageSquare } from "lucide-react";

export default function ModalitiesPage() {
  const modalities = [
    { name: "Life Coaching", href: "/modalities/life-coaching", icon: <Heart className="w-8 h-8" />, desc: "Deep emotional clarity and mindset reset." },
    { name: "Ho'oponopono", href: "/modalities/hooponopono", icon: <Sparkles className="w-8 h-8" />, desc: "Emotional cleansing and inner peace." },
    { name: "EFT", href: "/modalities/eft", icon: <Zap className="w-8 h-8" />, desc: "Emotional Freedom Technique (Tapping)." },
    { name: "NLP", href: "/modalities/nlp", icon: <Briefcase className="w-8 h-8" />, desc: "Neuro Linguistic Programming for mind reprogramming." },
    { name: "Chakra Healing", href: "/modalities/chakra-healing", icon: <Globe className="w-8 h-8" />, desc: "Energy alignment and emotional balance." },
    { name: "Graphology", href: "/graphology", icon: <MessageSquare className="w-8 h-8" />, desc: "Decode your subconscious through handwriting." },
  ];

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight gold-gradient">Healing Modalities</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the path that resonates with your current journey toward wholeness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modalities.map((mod) => (
            <Link 
              key={mod.name} 
              href={mod.href}
              className="group p-10 border border-border/50 bg-card hover:bg-gold-subtle hover:border-primary/50 transition-all duration-500 flex flex-col items-center text-center space-y-6"
            >
              <div className="text-primary group-hover:scale-110 transition-transform duration-500">{mod.icon}</div>
              <h3 className="text-2xl font-bold tracking-widest uppercase">{mod.name}</h3>
              <p className="text-muted-foreground">{mod.desc}</p>
              <span className="text-primary font-bold uppercase tracking-widest text-xs flex items-center pt-4">
                Explore Modality <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}