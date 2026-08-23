"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getGraphologyTeaser } from "@/ai/flows/ai-graphology-teaser-flow";
import { Loader2, Sparkles, MessageSquare, PenTool, Search, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function GraphologyPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleTeaserRequest = async () => {
    if (!file) {
      toast({ title: "Please select an image first." });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const dataUri = reader.result as string;
        const output = await getGraphologyTeaser({ handwritingDataUri: dataUri });
        setResult(output.insights);
        setLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast({ title: "Failed to analyze handwriting. Please try again." });
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <span className="text-primary uppercase tracking-[0.4em] font-bold text-sm">Subconscious Decoding</span>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight">Graphology</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto italic">
            "Your handwriting reveals more than words. It reveals personality patterns, emotional tendencies, and subconscious blocks."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2 space-y-8">
            <h2 className="text-3xl font-bold uppercase tracking-widest border-b border-border pb-4">A Tool for Discovery</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At The Evolve Room, Graphology is used as a powerful self-discovery and transformation tool. Every stroke, loop, and slant in your writing is a map of your subconscious architecture.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {[
                 { title: "Personality traits", icon: <UserIcon /> },
                 { title: "Emotional patterns", icon: <HeartIcon /> },
                 { title: "Confidence levels", icon: <Zap /> },
                 { title: "Leadership qualities", icon: <TargetIcon /> },
               ].map((item) => (
                 <div key={item.title} className="flex items-center space-x-3 p-4 bg-card/50 border border-border">
                    <div className="text-primary">{item.icon}</div>
                    <span className="text-sm font-bold uppercase tracking-widest">{item.title}</span>
                 </div>
               ))}
            </div>

            <div className="bg-gold-subtle p-8 border border-primary/20 space-y-6">
              <h3 className="text-xl font-bold uppercase tracking-widest">Full Session Format</h3>
              <p className="text-sm text-muted-foreground">Handwriting sample submission + 60-minute review session</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary"><span className="currency-symbol">₹</span>5,000</span>
                <Button className="bg-primary text-primary-foreground tracking-widest uppercase">BOOK ANALYSIS</Button>
              </div>
            </div>
          </div>

          <Card className="border-primary/20 bg-background/40 backdrop-blur-md lg:sticky lg:top-32">
            <CardHeader className="text-center">
              <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
              <CardTitle className="uppercase tracking-widest">AI Insights Teaser</CardTitle>
              <CardDescription>Upload a clear photo of your handwriting for a preliminary glimpse into your subconscious.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="handwriting" className="text-xs uppercase tracking-widest">Upload Sample</Label>
                <Input 
                  id="handwriting" 
                  type="file" 
                  accept="image/*" 
                  className="bg-background cursor-pointer"
                  onChange={handleFileChange}
                />
              </div>
              <Button 
                onClick={handleTeaserRequest} 
                disabled={loading || !file} 
                className="w-full bg-primary text-primary-foreground rounded-none h-14 tracking-widest uppercase font-bold"
              >
                {loading ? <Loader2 className="animate-spin mr-2" /> : "GET PRELIMINARY INSIGHTS"}
              </Button>

              {result && (
                <div className="p-6 bg-card border border-primary/20 animate-in fade-in slide-in-from-top-4 duration-500">
                  <h4 className="font-bold uppercase tracking-widest text-primary text-xs mb-4">Initial Observations:</h4>
                  <p className="text-sm text-muted-foreground italic leading-relaxed whitespace-pre-line">
                    "{result}"
                  </p>
                  <p className="mt-6 text-[10px] text-muted-foreground uppercase text-center">
                    Note: This is a preliminary AI analysis. For a deep-dive, book a full session.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function UserIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
}

function HeartIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
}

function TargetIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-target"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
}