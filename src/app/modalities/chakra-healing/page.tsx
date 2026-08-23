import { Button } from "@/components/ui/button";
import { Globe, Sun, Moon, Star, Zap, Shield, Sparkles } from "lucide-react";

export default function ChakraHealingPage() {
  const chakras = [
    { name: "Root", color: "text-red-500", icon: <Shield /> },
    { name: "Sacral", color: "text-orange-500", icon: <Sparkles /> },
    { name: "Solar Plexus", color: "text-yellow-500", icon: <Sun /> },
    { name: "Heart", color: "text-green-500", icon: <Heart /> },
    { name: "Throat", color: "text-blue-500", icon: <Zap /> },
    { name: "Third Eye", color: "text-indigo-500", icon: <Star /> },
    { name: "Crown", color: "text-purple-500", icon: <Moon /> },
  ];

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto space-y-16 text-center">
        <div className="space-y-4">
          <span className="text-primary uppercase tracking-[0.4em] font-bold text-sm">Energetic Alignment</span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">Energy Alignment <br /> & Emotional Balance</h1>
        </div>

        <div className="flex flex-wrap justify-center gap-6 py-8">
          {chakras.map((c) => (
            <div key={c.name} className="flex flex-col items-center space-y-2 group">
              <div className={`w-12 h-12 rounded-full border border-border flex items-center justify-center transition-all duration-500 group-hover:scale-125 group-hover:bg-gold-subtle ${c.color}`}>
                <Globe className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">{c.name}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-3xl mx-auto">
          {[
            { title: "Chakra assessment", desc: "Identify energetic leaks and blockages in your subtle body." },
            { title: "Energy clearing", desc: "Release stagnant emotional charge from your auric field." },
            { title: "Emotional block release", desc: "Process stored emotions mapped to specific energy centers." },
            { title: "Inner alignment", desc: "Synchronize your physical, emotional, and spiritual selves." }
          ].map((item) => (
            <div key={item.title} className="space-y-2 border-l-2 border-primary/30 pl-6">
              <h3 className="text-lg font-bold uppercase tracking-widest">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-12 py-8 text-xl tracking-widest uppercase rounded-none mt-12">
          BOOK CHAKRA HEALING
        </Button>
      </div>
    </div>
  );
}

function Heart(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}