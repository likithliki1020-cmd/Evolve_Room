import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function AboutPage() {
  const founderImg = PlaceHolderImages.find(img => img.id === 'founder');

  return (
    <div className="pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-12">
            <div>
              <span className="text-primary uppercase tracking-[0.4em] text-sm font-bold mb-4 block">Meet the Founder</span>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">Not Just Coaching. <br /> Deep Emotional <br /> Rewiring.</h1>
            </div>
            
            <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
              <p className="text-foreground font-medium text-xl italic">
                "Chandrika Jayaram founded The Evolve Room with one vision — to create a safe, intelligent space where emotional healing meets deep inner evolution."
              </p>
              
              <p>
                Her work goes beyond surface-level motivation. She guides individuals through subconscious patterns, emotional trauma, attachment wounds, money blocks, and nervous system dysregulation.
              </p>
              
              <p>
                Through Life Coaching, Ho’oponopono, EFT, NLP, and Chakra Healing, she helps clients align internally — so external life shifts naturally.
              </p>

              <div className="py-8 border-y border-border/50">
                <h3 className="text-foreground font-bold uppercase tracking-widest mb-6">We Work On All Areas of Life:</h3>
                <ul className="grid grid-cols-2 gap-4">
                  {["Health", "Relationships", "Career", "Money"].map((area) => (
                    <li key={area} className="flex items-center space-x-2 text-primary font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-primary font-bold">
                Because when the inner world transforms, the outer world follows.
              </p>
            </div>
            
            <Button size="lg" className="bg-primary text-primary-foreground px-10 py-7 tracking-widest uppercase">
              WORK WITH CHANDRIKA
            </Button>
          </div>

          <div className="relative aspect-[3/4] lg:sticky lg:top-32 border border-primary/20 p-2">
            <div className="relative w-full h-full overflow-hidden grayscale shadow-2xl">
              {founderImg && (
                <Image 
                  src={founderImg.imageUrl} 
                  alt="Chandrika Jayaram" 
                  fill 
                  className="object-cover" 
                  data-ai-hint={founderImg.imageHint}
                />
              )}
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-gold-subtle -z-10" />
            <div className="absolute -top-8 -left-8 w-48 h-48 border border-primary/10 -z-10" />
          </div>
        </div>
      </div>
    </div>
  );
}