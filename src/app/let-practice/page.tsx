import { Button } from "@/components/ui/button";
import { Users, Video, Calendar, MapPin, Heart, ShieldCheck, Zap, Sparkles } from "lucide-react";

export default function LETPracticePage() {
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <span className="text-primary uppercase tracking-[0.4em] font-bold text-sm">Community Evolution</span>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight gold-gradient">You Don’t Have <br /> to Heal Alone.</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Weekly guided group healing & alignment sessions designed to regulate your nervous system and process collective transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold border-b border-border pb-6">What to Expect</h2>
            <div className="grid grid-cols-1 gap-6">
              {[
                { title: "Emotional Regulation", icon: <ShieldCheck className="text-primary" /> },
                { title: "Collective Healing", icon: <Users className="text-primary" /> },
                { title: "Guided Inner Work", icon: <Sparkles className="text-primary" /> },
                { title: "Safe Sharing Circle", icon: <Heart className="text-primary" /> },
              ].map((item) => (
                <div key={item.title} className="flex items-center space-x-6 p-6 bg-card border border-border/50">
                   <div className="w-10 h-10 flex items-center justify-center shrink-0 border border-primary/20 bg-primary/5">{item.icon}</div>
                   <span className="text-lg font-bold tracking-widest uppercase">{item.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-12 bg-gold-subtle p-12 border border-primary/20">
            <div className="space-y-8">
              <h3 className="text-2xl font-bold uppercase tracking-[0.2em]">Formats</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Video className="w-6 h-6 text-primary" />
                  <div>
                    <h4 className="font-bold uppercase text-sm">Online Zoom</h4>
                    <p className="text-muted-foreground text-sm">Join from anywhere in the world weekly.</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6 text-primary" />
                  <div>
                    <h4 className="font-bold uppercase text-sm">Monthly In-Person</h4>
                    <p className="text-muted-foreground text-sm">Deep intensive sessions in Bengaluru.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-primary/20 space-y-4">
              <p className="text-xl font-bold uppercase tracking-widest mb-4">Investment: <span className="currency-symbol">₹</span>1,499 / session</p>
              <Button size="lg" className="w-full bg-primary text-primary-foreground py-8 text-lg tracking-widest uppercase rounded-none shadow-xl">
                JOIN NEXT SESSION
              </Button>
              <Button variant="outline" size="lg" className="w-full border-primary text-primary py-8 text-lg tracking-widest uppercase rounded-none">
                RESERVE MONTHLY SEAT
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}