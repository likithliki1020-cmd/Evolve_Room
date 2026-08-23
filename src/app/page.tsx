
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Heart, Briefcase, Zap, Globe, MessageSquare, Phone } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { BookingDialog } from "@/components/booking-dialog";

export default function Home() {
  const bgImg = PlaceHolderImages.find(img => img.id === 'healing-bg');

  const modalities = [
    { name: "Life Coaching", href: "/modalities/life-coaching", icon: <Heart className="w-5 h-5" /> },
    { name: "Ho'oponopono", href: "/modalities/hooponopono", icon: <Sparkles className="w-5 h-5" /> },
    { name: "EFT", href: "/modalities/eft", icon: <Zap className="w-5 h-5" /> },
    { name: "NLP", href: "/modalities/nlp", icon: <Briefcase className="w-5 h-5" /> },
    { name: "Chakra Healing", href: "/modalities/chakra-healing", icon: <Globe className="w-5 h-5" /> },
    { name: "Graphology", href: "/graphology", icon: <MessageSquare className="w-5 h-5" /> },
  ];

  const WHATSAPP_LINK = "https://wa.me/919876543210?text=I'm%20interested%20in%20booking%20a%20session%20at%20The%20Evolve%20Room.";

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        {bgImg && (
          <Image 
            src={bgImg.imageUrl} 
            alt="The Evolve Room Background" 
            fill 
            className="object-cover animate-in fade-in duration-1000" 
            priority
            data-ai-hint={bgImg.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        
        <div className="max-w-5xl mx-auto text-center z-10 space-y-12">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-9xl font-headline font-bold tracking-tighter text-white animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 drop-shadow-2xl">
              Evolve Beyond <br className="hidden md:block" /> Your Limits.
            </h1>
            <p className="text-xl md:text-3xl text-white/90 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 delay-500 duration-1000 font-medium italic">
              Private Emotional Healing & Deep Inner Transformation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-8 delay-700 duration-1000">
            <BookingDialog 
              trigger={
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-12 py-8 text-xl tracking-widest uppercase rounded-none transition-all hover:scale-105 shadow-2xl">
                  BOOK A SESSION
                </Button>
              }
            />
            <Link href="/let-practice">
              <Button size="lg" variant="outline" className="border-primary text-primary dark:border-white dark:text-white hover:bg-primary/10 dark:hover:bg-white/10 px-12 py-8 text-xl tracking-widest uppercase rounded-none transition-all backdrop-blur-md font-bold">
                JOIN LET'S PRACTICE
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: What We Work On */}
      <section className="py-24 md:py-32 px-6 bg-card">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-headline font-bold tracking-tight">We Work On All <br /> Areas of Life</h2>
            <div className="h-1 w-20 bg-accent" />
            <p className="text-lg text-muted-foreground leading-relaxed">
              At The Evolve Room, transformation is holistic. We don't just treat symptoms; we address the core subconscious patterns that manifest in your outer reality.
            </p>
            <ul className="space-y-4">
              {["Health & Emotional Wellbeing", "Relationships & Attachment Healing", "Career Clarity & Growth", "Money Blocks & Abundance Alignment"].map((item) => (
                <li key={item} className="flex items-center space-x-3 text-lg font-medium group">
                  <span className="w-2 h-2 rounded-full bg-primary transition-all group-hover:scale-150" />
                  <span className="group-hover:text-primary transition-colors">{item}</span>
                </li>
              ))}
            </ul>
            <p className="pt-4 font-bold italic text-primary">Because real evolution is not partial — it is whole.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background p-8 aspect-square flex flex-col justify-end border border-border/50 hover:bg-gold-subtle transition-colors">
              <span className="text-accent text-4xl mb-4 font-headline font-bold">01</span>
              <h3 className="text-xl font-bold uppercase tracking-widest font-headline">Health</h3>
            </div>
            <div className="bg-gold-subtle p-8 aspect-square flex flex-col justify-end border border-primary/20 hover:bg-background transition-colors">
              <span className="text-primary text-4xl mb-4 font-headline font-bold">02</span>
              <h3 className="text-xl font-bold uppercase tracking-widest font-headline">Growth</h3>
            </div>
            <div className="bg-gold-subtle p-8 aspect-square flex flex-col justify-end border border-primary/20 hover:bg-background transition-colors">
              <span className="text-primary text-4xl mb-4 font-headline font-bold">03</span>
              <h3 className="text-xl font-bold uppercase tracking-widest font-headline">Love</h3>
            </div>
            <div className="bg-background p-8 aspect-square flex flex-col justify-end border border-border/50 hover:bg-gold-subtle transition-colors">
              <span className="text-accent text-4xl mb-4 font-headline font-bold">04</span>
              <h3 className="text-xl font-bold uppercase tracking-widest font-headline">Wealth</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Our Healing Modalities */}
      <section className="py-24 md:py-32 px-6 bg-background">
        <div className="max-w-7xl mx-auto text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-6xl font-headline font-bold text-primary">Our Healing Modalities</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg italic">
            A diverse toolkit of ancient wisdom and modern psychology to facilitate your deepest breakthroughs.
          </p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {modalities.map((mod) => (
            <Link 
              key={mod.name} 
              href={mod.href}
              className="group p-10 border border-border/50 hover:border-primary/50 transition-all duration-500 bg-card hover:bg-gold-subtle shadow-sm hover:shadow-xl"
            >
              <div className="text-primary mb-8 group-hover:scale-110 transition-transform duration-500">{mod.icon}</div>
              <h3 className="text-2xl font-bold mb-4 tracking-widest uppercase font-headline">{mod.name}</h3>
              <p className="text-muted-foreground mb-8 line-clamp-2">
                Discover the power of {mod.name} and how it can rewire your emotional state.
              </p>
              <span className="text-primary text-xs uppercase tracking-[0.2em] font-bold flex items-center group-hover:translate-x-2 transition-transform">
                Explore Path <ArrowRight className="w-4 h-4 ml-2" />
              </span>
            </Link>
          ))}
        </div>
        <div className="text-center mt-16">
          <Link href="/modalities">
            <Button variant="link" className="text-primary uppercase tracking-[0.3em] font-bold text-sm">
              Explore All Modalities →
            </Button>
          </Link>
        </div>
      </section>

      {/* Section 6 & 7: Courses & Booking CTA */}
      <section className="py-24 md:py-40 px-6 bg-card border-t border-border/50">
        <div className="max-w-4xl mx-auto text-center space-y-16">
          <h2 className="text-5xl md:text-8xl font-headline font-bold tracking-tight text-primary">Ready to Begin?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-10 border border-border/50 hover:border-primary transition-all bg-background flex flex-col space-y-4 group">
              <h3 className="font-bold tracking-widest uppercase text-xs">1:1 Session</h3>
              <p className="text-[10px] text-muted-foreground italic uppercase">Personalized deep diving</p>
              <div className="pt-4 mt-auto">
                <BookingDialog 
                  trigger={
                    <Button variant="outline" className="w-full border-primary text-primary group-hover:bg-primary group-hover:text-primary-foreground rounded-none uppercase text-[10px] tracking-widest font-bold h-12">BOOK NOW</Button>
                  }
                />
              </div>
            </div>
            <div className="p-10 border border-border/50 hover:border-primary transition-all bg-background flex flex-col space-y-4 group">
              <h3 className="font-bold tracking-widest uppercase text-xs">LET Practice</h3>
              <p className="text-[10px] text-muted-foreground italic uppercase">Community healing</p>
              <div className="pt-4 mt-auto">
                <Link href="/let-practice" className="w-full">
                  <Button variant="outline" className="w-full border-primary text-primary group-hover:bg-primary group-hover:text-primary-foreground rounded-none uppercase text-[10px] tracking-widest font-bold h-12">JOIN GROUP</Button>
                </Link>
              </div>
            </div>
            <div className="p-10 border border-border/50 hover:border-primary transition-all bg-background flex flex-col space-y-4 group">
              <h3 className="font-bold tracking-widest uppercase text-xs">Courses</h3>
              <p className="text-[10px] text-muted-foreground italic uppercase">Self-paced evolution</p>
              <div className="pt-4 mt-auto w-full">
                <Link href="/courses">
                  <Button variant="outline" className="w-full border-primary text-primary group-hover:bg-primary group-hover:text-primary-foreground rounded-none uppercase text-[10px] tracking-widest font-bold h-12">VIEW ALL</Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12">
            <BookingDialog 
              isPayNow={true}
              trigger={
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-12 py-8 text-xl tracking-widest rounded-none w-full sm:w-auto uppercase font-bold transition-all hover:scale-105 shadow-xl">
                  PAY & BOOK NOW
                </Button>
              }
            />
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 px-12 py-8 text-xl tracking-widest rounded-none w-full uppercase font-bold transition-all flex items-center justify-center gap-3">
                <Phone className="w-5 h-5" /> WHATSAPP DIRECT
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
