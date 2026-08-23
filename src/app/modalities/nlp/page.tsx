import { Button } from "@/components/ui/button";
import { BrainCircuit, Repeat, Target, Lock } from "lucide-react";

export default function NLPPage() {
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border pb-12">
          <div className="space-y-4">
            <span className="text-primary uppercase tracking-[0.4em] font-bold text-sm">Mind Architecture</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">Reprogram <br /> Your Mind</h1>
          </div>
          <p className="text-muted-foreground max-w-xs text-lg italic">
            "Your language creates your world. Rewrite the code."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex space-x-6">
              <div className="bg-primary/10 p-4 shrink-0 h-fit text-primary border border-primary/20"><BrainCircuit className="w-8 h-8" /></div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold uppercase tracking-widest">Break Limiting Beliefs</h3>
                <p className="text-muted-foreground">Identify and dismantle the 'glass ceilings' you've placed on your own potential.</p>
              </div>
            </div>
            <div className="flex space-x-6">
              <div className="bg-primary/10 p-4 shrink-0 h-fit text-primary border border-primary/20"><Repeat className="w-8 h-8" /></div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold uppercase tracking-widest">Rewire thought patterns</h3>
                <p className="text-muted-foreground">Replace repetitive negative cycles with empowering mental architecture.</p>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <div className="flex space-x-6">
              <div className="bg-primary/10 p-4 shrink-0 h-fit text-primary border border-primary/20"><Target className="w-8 h-8" /></div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold uppercase tracking-widest">Build success mindset</h3>
                <p className="text-muted-foreground">Anchor states of high performance and unwavering confidence.</p>
              </div>
            </div>
            <div className="flex space-x-6">
              <div className="bg-primary/10 p-4 shrink-0 h-fit text-primary border border-primary/20"><Lock className="w-8 h-8" /></div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold uppercase tracking-widest">Remove subconscious blocks</h3>
                <p className="text-muted-foreground">Unlock the hidden resistance that keeps you from your goals.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12">
          <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-8 text-xl tracking-widest uppercase rounded-none">
            BOOK NLP SESSION
          </Button>
        </div>
      </div>
    </div>
  );
}