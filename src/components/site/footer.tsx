import { Crown } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border/60 bg-onyx/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full gradient-gold text-primary-foreground">
                <Crown className="h-5 w-5" />
              </span>
              <span className="font-display text-2xl font-semibold">
                <span className="text-gradient-gold">JAI</span> AI
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              The luxury AI platform for exam prep, code, content and conversation.
              Crafted with a black & gold standard.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gold">Product</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-foreground">Features</a></li>
              <li><a href="#tools" className="hover:text-foreground">AI Tools</a></li>
              <li><a href="#pricing" className="hover:text-foreground">Pricing</a></li>
              <li><a href="#faq" className="hover:text-foreground">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gold">Company</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-foreground">About</a></li>
              <li><a href="mailto:hello@jai.ai" className="hover:text-foreground">hello@jai.ai</a></li>
              <li><a href="#" className="hover:text-foreground">Privacy</a></li>
              <li><a href="#" className="hover:text-foreground">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} JAI AI. All rights reserved.</p>
          <p>Crafted with gold standard precision.</p>
        </div>
      </div>
    </footer>
  );
}
