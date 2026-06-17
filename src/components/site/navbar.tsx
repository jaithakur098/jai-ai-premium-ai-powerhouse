import { Link } from "@tanstack/react-router";
import { Crown, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Home", to: "/" },
  { label: "Features", to: "/#features" },
  { label: "AI Tools", to: "/#tools" },
  { label: "Resources", to: "/#resources" },
  { label: "About", to: "/#about" },
  { label: "Contact", to: "/#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid h-9 w-9 place-items-center rounded-full gradient-gold text-primary-foreground shadow-[0_0_24px_-4px_oklch(0.82_0.14_86_/_60%)]">
            <Crown className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-semibold tracking-wide">
            <span className="text-gradient-gold">JAI</span>{" "}
            <span className="text-foreground/90">AI</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.to}
              href={n.to}
              className="text-sm text-muted-foreground hover:text-gold transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/chat"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Login
          </Link>
          <Link
            to="/chat"
            className="rounded-full gradient-gold px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition glow-gold"
          >
            Sign up
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-border/60"
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className={cn(
        "lg:hidden overflow-hidden border-t border-border/60 transition-all duration-300",
        open ? "max-h-96" : "max-h-0",
      )}>
        <div className="px-4 py-4 flex flex-col gap-3 bg-background/80 backdrop-blur-xl">
          {NAV.map((n) => (
            <a key={n.to} href={n.to} onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-gold">
              {n.label}
            </a>
          ))}
          <div className="h-px bg-border/60 my-1" />
          <Link to="/chat" className="text-sm">Login</Link>
          <Link to="/chat" className="rounded-full gradient-gold px-4 py-2 text-sm font-medium text-primary-foreground text-center">
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}
