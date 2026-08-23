'use client';

import Link from "next/link";
import { useState, useEffect } from 'react';

export function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-card border-t border-border/50 py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <Link href="/" className="text-2xl font-bold gold-gradient tracking-widest mb-6 block">
            THE EVOLVE ROOM
          </Link>
          <p className="text-muted-foreground max-w-sm mb-8">
            Private emotional healing and deep inner transformation for health, relationships, career, and money.
          </p>
          <div className="flex space-x-6 text-primary">
            <Link href="#" className="hover:opacity-70 transition-opacity">Instagram</Link>
            <Link href="#" className="hover:opacity-70 transition-opacity">WhatsApp</Link>
            <Link href="#" className="hover:opacity-70 transition-opacity">YouTube</Link>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Explore</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="/modalities" className="hover:text-primary transition-colors">Modalities</Link></li>
            <li><Link href="/courses" className="hover:text-primary transition-colors">Courses</Link></li>
            <li><Link href="/let-practice" className="hover:text-primary transition-colors">LET Practice</Link></li>
            <li><Link href="/graphology" className="hover:text-primary transition-colors">Graphology</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Contact</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li>theevolveroom@gmail.com</li>
            <li>Bengaluru, India</li>
            <li><Link href="#" className="hover:text-primary transition-colors">Book a Consultation</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground uppercase tracking-widest">
        <p>© {year ?? new Date().getFullYear()} The Evolve Room. All Rights Reserved.</p>
        <div className="flex space-x-8 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
