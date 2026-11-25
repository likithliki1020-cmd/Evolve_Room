"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { LucideIcon } from "lucide-react";
import {
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  ArrowRight,
  Sprout,
  Heart,
  Zap,
  Brain,
  Flower2,
  BookOpen,
  PenLine,
  FileSignature,
  User as UserIcon,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { BookingDialog } from "@/components/booking-dialog";

const outlineBtn =
  "border-primary text-primary hover:bg-primary hover:text-primary-foreground text-xs h-9";

type NavItem = { name: string; href: string; description: string; icon: LucideIcon };
type NavGroup = { label: string; heading: string; items: NavItem[] };

const modalitiesGroup: NavGroup = {
  label: "Journeys",
  heading: "Explore Your Path",
  items: [
    {
      name: "Life Coaching",
      href: "/modalities/life-coaching",
      description: "Gain clarity and create an aligned life",
      icon: Sprout,
    },
    {
      name: "Ho’oponopono",
      href: "/modalities/hooponopono",
      description: "Forgiveness, release and inner peace",
      icon: Heart,
    },
    {
      name: "EFT",
      href: "/modalities/eft",
      description: "Tapping to calm stress and anxiety",
      icon: Zap,
    },
    {
      name: "NLP",
      href: "/modalities/nlp",
      description: "Rewire thought patterns and mindset",
      icon: Brain,
    },
    {
      name: "Chakra Healing",
      href: "/modalities/chakra-healing",
      description: "Balance and realign your energy",
      icon: Flower2,
    },
    {
      name: "Signature Decoding & Correction",
      href: "/graphology/signature",
      description: "Transform your signature, reinforce your growth",
      icon: FileSignature,
    },
  ],
};

const coursesGroup: NavGroup = {
  label: "Graphology Services",
  heading: "Learn & Grow",
  items: [
    {
      name: "All Courses",
      href: "/courses",
      description: "Explore every programme we offer",
      icon: BookOpen,
    },
    {
      name: "Graphology",
      href: "/graphology",
      description: "Basic (2 months) and Advance (4 months)",
      icon: PenLine,
    },
  ],
};

// Desktop: a text link that opens a compact, scrollable panel on click
function NavDropdown({ group }: { group: NavGroup }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group flex items-center gap-1 text-xs uppercase tracking-widest outline-none transition-colors hover:text-primary data-[state=open]:text-primary">
          {group.label}
          <ChevronDown className="h-3 w-3 transition-transform duration-300 group-data-[state=open]:rotate-180" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        sideOffset={14}
        className="relative w-[20rem] overflow-hidden rounded-2xl border border-primary/25 bg-card/95 p-0 shadow-2xl shadow-primary/10 backdrop-blur-xl"
      >
        {/* gold accent bar and soft glow */}
        <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-primary" />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/15 blur-2xl"
        />

        <div className="relative flex items-center gap-3 px-5 pb-1.5 pt-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
            {group.heading}
          </span>
          <span className="h-px flex-1 bg-primary/30" />
        </div>

        {/* Shows about two entries at a time, scrolls for the rest */}
        <div className="relative max-h-[9.5rem] space-y-1 overflow-y-auto overscroll-contain px-2 pb-2 pt-1 [scrollbar-color:hsl(var(--primary)/0.5)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/50 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-primary/10 [&::-webkit-scrollbar]:w-1.5">
          {group.items.map((item) => {
            const Icon = item.icon;
            return (
              <DropdownMenuItem
                key={item.href}
                asChild
                className="rounded-xl p-0 focus:bg-transparent focus:text-foreground"
              >
                <Link
                  href={item.href}
                  className="group/item flex cursor-pointer items-center gap-4 rounded-xl px-3 py-2.5 transition-all duration-300 hover:translate-x-1 hover:bg-primary/10 focus:bg-primary/10"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/25 text-primary transition-all duration-300 group-hover/item:bg-primary group-hover/item:bg-none group-hover/item:text-primary-foreground group-hover/item:shadow-lg">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-headline text-lg font-bold leading-tight">
                      {item.name}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      {item.description}
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 -translate-x-2 text-primary opacity-0 transition-all duration-300 group-hover/item:translate-x-0 group-hover/item:opacity-100" />
                </Link>
              </DropdownMenuItem>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();

  const { data: session, status } = useSession();
  const loading = status === "loading";
  const user = session?.user;

  const dashboardHref = user?.isAdmin ? "/admin" : "/dashboard";
  const dashboardLabel = user?.isAdmin ? "Admin Dashboard" : "My Dashboard";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobile = () => {
    setMobileMenuOpen(false);
    setOpenSection(null);
  };

  const handleLogout = async () => {
    closeMobile();
    await signOut({ callbackUrl: "/" });
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 md:px-12",
        isScrolled ? "bg-background/95 backdrop-blur-md border-b" : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/logo-light-notagline.png"
            alt="The Evolve Room"
            width={655}
            height={165}
            priority
            className="h-12 md:h-16 w-auto dark:hidden"
          />
          <Image
            src="/logo-dark-notagline.png"
            alt="The Evolve Room"
            width={655}
            height={165}
            priority
            className="h-12 md:h-16 w-auto hidden dark:block"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link
            href="/about"
            className="text-xs uppercase tracking-widest hover:text-primary transition-colors"
          >
            About
          </Link>
          <NavDropdown group={modalitiesGroup} />
          <NavDropdown group={coursesGroup} />

          <div className="flex items-center space-x-3 border-l border-border pl-6">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full w-9 h-9">
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            <Link href="/let-practice">
              <Button variant="outline" className={outlineBtn}>
                LET PRACTICE
              </Button>
            </Link>

            <BookingDialog
              trigger={
                <Button variant="outline" className={outlineBtn}>
                  BOOK A SESSION
                </Button>
              }
            />

            {!loading &&
              (user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full w-9 h-9 border border-primary/40"
                    >
                      <UserIcon className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="truncate">
                      {user.name || user.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={dashboardHref} className="cursor-pointer">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        {dashboardLabel}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs h-9">
                    LOGIN / REGISTER
                  </Button>
                </Link>
              ))}
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center space-x-4 lg:hidden">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full w-9 h-9">
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          <button
            className="text-foreground"
            onClick={() => (mobileMenuOpen ? closeMobile() : setMobileMenuOpen(true))}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[72px] bg-background z-40 p-8 flex flex-col space-y-6 overflow-y-auto animate-in slide-in-from-top duration-300">
          <Link
            href="/about"
            className="text-lg uppercase tracking-widest border-b border-border pb-4"
            onClick={closeMobile}
          >
            About
          </Link>

          {[modalitiesGroup, coursesGroup].map((group) => {
            const isOpen = openSection === group.label;
            return (
              <div key={group.label} className="border-b border-border pb-4">
                <button
                  className="w-full flex items-center justify-between text-lg uppercase tracking-widest"
                  onClick={() => setOpenSection(isOpen ? null : group.label)}
                >
                  {group.label}
                  <ChevronDown
                    className={cn("w-5 h-5 transition-transform", isOpen && "rotate-180")}
                  />
                </button>
                {isOpen && (
                  <div className="mt-4 ml-4 flex flex-col space-y-4">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary"
                        onClick={closeMobile}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <Link href="/let-practice" onClick={closeMobile}>
            <Button
              variant="outline"
              className="w-full border-primary text-primary py-6 text-lg tracking-widest uppercase"
            >
              LET PRACTICE
            </Button>
          </Link>

          <BookingDialog
            trigger={
              <Button className="w-full bg-primary text-primary-foreground py-6 text-lg tracking-widest uppercase">
                BOOK A SESSION
              </Button>
            }
          />

          {!loading &&
            (user ? (
              <>
                <Link href={dashboardHref} onClick={closeMobile}>
                  <Button variant="outline" className="w-full py-6 text-lg tracking-widest uppercase">
                    {dashboardLabel}
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="w-full py-6 text-lg tracking-widest uppercase"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/login" onClick={closeMobile}>
                <Button variant="outline" className="w-full py-6 text-lg tracking-widest uppercase">
                  LOGIN / REGISTER
                </Button>
              </Link>
            ))}
        </div>
      )}
    </header>
  );
}