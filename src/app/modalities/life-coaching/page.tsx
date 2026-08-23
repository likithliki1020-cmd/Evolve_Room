import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, Monitor, MapPin } from "lucide-react";

export default function LifeCoachingPage() {
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4">
          <span className="text-primary uppercase tracking-[0.4em] font-bold text-sm">One-on-One Transformation</span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">Private 1:1 <br /> Life Coaching</h1>
          <div className="h-1 w-32 bg-primary mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h3 className="text-2xl font-bold uppercase tracking-widest border-b border-border pb-4">Focus Areas</h3>
            <ul className="space-y-6">
              {[
                "Deep emotional clarity",
                "Mindset reset",
                "Attachment healing",
                "Confidence & self-worth rebuilding"
              ].map((item) => (
                <li key={item} className="flex items-start space-x-4">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                  <span className="text-lg text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card border border-border/50 p-8 space-y-8">
            <h3 className="text-xl font-bold uppercase tracking-widest">Session Format</h3>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">60-minute intensive sessions</span>
              </div>
              <div className="flex items-center space-x-4">
                <Monitor className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">Online via Zoom</span>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">In-Person (Bengaluru)</span>
              </div>
              <p className="text-sm font-bold text-foreground bg-primary/10 p-4 border-l-4 border-primary italic">
                Each journey includes a personalized evolution roadmap.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-8">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-8 text-lg tracking-widest uppercase flex-1 rounded-none">
            BOOK NOW
          </Button>
          <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 px-10 py-8 text-lg tracking-widest uppercase flex-1 rounded-none">
            PAY DIRECTLY
          </Button>
        </div>
      </div>
    </div>
  );
}