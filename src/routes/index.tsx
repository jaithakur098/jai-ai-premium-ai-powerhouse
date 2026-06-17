import { createFileRoute, Link } from "@tanstack/react-router";
import {
  MessageSquare, GraduationCap, MapPin, Activity, Code2, PenLine,
  FileText, FileQuestion, Sparkles, ArrowRight, Check, Star, Crown,
  Zap, Shield, Globe, ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import heroRobot from "@/assets/jai-hero-robot.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JAI AI — Your Personal AI Assistant" },
      { name: "description", content: "Premium black & gold AI platform. Chat, exam prep, code, content writing and more — powered by JAI AI." },
      { property: "og:title", content: "JAI AI — Luxury AI Assistant" },
      { property: "og:description", content: "ChatGPT-style premium AI for chat, exam prep, code and content." },
    ],
  }),
  component: Landing,
});

const TOOLS = [
  { icon: MessageSquare, name: "AI Chat Assistant", desc: "Natural conversation, instant answers." },
  { icon: GraduationCap, name: "PTI Exam Helper", desc: "Curated prep for Physical Training Instructor exams." },
  { icon: MapPin, name: "Rajasthan GK", desc: "Deep general knowledge, ready for any test." },
  { icon: Activity, name: "Physical Education", desc: "Lesson plans, drills, and theory at your side." },
  { icon: Code2, name: "Code Generator", desc: "Production-ready snippets in any language." },
  { icon: PenLine, name: "Content Writer", desc: "Posts, ads, and long-form, in your tone." },
  { icon: FileText, name: "Resume Builder", desc: "Polished, ATS-friendly resumes in minutes." },
  { icon: FileQuestion, name: "Question Paper Gen", desc: "Generate exam papers by topic and level." },
];

const SUGGESTIONS = [
  "Explain Newton's third law with examples",
  "Write a cover letter for a PTI role",
  "Top 10 GK facts about Rajasthan",
  "Generate a Python script to rename files",
  "Draft a 5-question MCQ on photosynthesis",
  "Suggest a weekly PE training plan",
];

const STATS = [
  { num: "50K+", label: "Happy Users" },
  { num: "1.2M+", label: "Questions Answered" },
  { num: "99.4%", label: "Accuracy Rate" },
  { num: "24/7", label: "Availability" },
];

const TESTIMONIALS = [
  { name: "Priya S.", role: "PTI Aspirant", quote: "JAI AI made my exam prep feel premium. Crystal-clear explanations every time." },
  { name: "Rahul K.", role: "Indie Developer", quote: "The code generator is a real productivity weapon. Clean, idiomatic, fast." },
  { name: "Meera J.", role: "PE Teacher", quote: "Lesson planning that used to take hours now takes minutes. Beautifully done." },
];

const FAQ = [
  { q: "Is JAI AI free to try?", a: "Yes — start chatting instantly. Premium plans unlock higher limits and advanced tools." },
  { q: "Which models power it?", a: "JAI AI runs on a premium frontier model via the Lovable AI Gateway for fast, accurate replies." },
  { q: "Is my data private?", a: "Conversations are stored locally in your browser by default. You control your history." },
  { q: "Can I use it on mobile?", a: "Absolutely — the entire experience is mobile-first and responsive." },
];

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <BackgroundFX />
      <Navbar />
      <Hero />
      <ChatPreview />
      <Stats />
      <Tools />
      <Suggestions />
      <Testimonials />
      <Faq />
      <Footer />
    </div>
  );
}

function BackgroundFX() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10 bg-grid opacity-50" />
      <div className="pointer-events-none fixed -top-40 left-1/2 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full"
           style={{ background: "radial-gradient(closest-side, oklch(0.82 0.14 86 / 18%), transparent)" }} />
      <div className="pointer-events-none fixed bottom-0 right-0 -z-10 h-[500px] w-[500px] rounded-full blur-3xl"
           style={{ background: "radial-gradient(closest-side, oklch(0.62 0.13 70 / 16%), transparent)" }} />
      {/* Floating particles */}
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          className="pointer-events-none fixed -z-10 h-1 w-1 rounded-full bg-gold animate-pulse-gold"
          style={{
            top: `${(i * 53) % 100}%`,
            left: `${(i * 37) % 100}%`,
            animationDelay: `${(i % 6) * 0.5}s`,
            opacity: 0.5,
          }}
        />
      ))}
    </>
  );
}

function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 pt-12 pb-20 sm:px-6 sm:pt-20 lg:px-8 lg:pt-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-gold">
            <Sparkles className="h-3.5 w-3.5" />
            Introducing JAI AI — luxury intelligence
          </div>
          <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
            Your <span className="text-gradient-gold">Personal</span><br />
            AI Assistant
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            A premium AI experience inspired by the world's best. Chat, study,
            code, and create — wrapped in a black & gold standard built for those
            who expect more.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/chat"
              className="inline-flex items-center gap-2 rounded-full gradient-gold px-6 py-3 text-sm font-medium text-primary-foreground glow-gold hover:opacity-95"
            >
              Start Chatting <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium hover:bg-white/[0.06]"
            >
              Explore Features
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-gold" /> Streaming replies</div>
            <div className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-gold" /> Private & local</div>
            <div className="flex items-center gap-1.5"><Globe className="h-3.5 w-3.5 text-gold" /> Works everywhere</div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 -z-10 animate-pulse-gold rounded-full blur-3xl"
               style={{ background: "radial-gradient(closest-side, oklch(0.82 0.14 86 / 35%), transparent)" }} />
          <img
            src={heroRobot}
            alt="JAI AI luxury robot"
            width={1024}
            height={1024}
            className="mx-auto w-full max-w-md animate-float drop-shadow-[0_30px_60px_oklch(0.82_0.14_86_/_25%)]"
          />
        </div>
      </div>
    </section>
  );
}

function ChatPreview() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Live preview"
        title="A chat interface worth lingering in"
        sub="Streaming replies, threaded history, code highlighting, and a quiet, focused canvas."
      />
      <div className="mt-10 overflow-hidden rounded-3xl glass-strong glow-gold">
        <div className="grid lg:grid-cols-[260px_1fr]">
          <aside className="hidden lg:block border-r border-border/60 bg-onyx/40 p-4">
            <button className="w-full rounded-lg gradient-gold px-3 py-2 text-sm font-medium text-primary-foreground">
              + New Chat
            </button>
            <p className="mt-5 text-[10px] uppercase tracking-widest text-muted-foreground">Recent</p>
            <ul className="mt-2 space-y-1 text-sm">
              {["Resume polish for PTI role", "Rajasthan GK quiz #4", "Python file renamer", "Lesson plan: Week 3"].map((t) => (
                <li key={t} className="truncate rounded-md px-2 py-2 text-muted-foreground hover:bg-white/[0.04] hover:text-foreground cursor-pointer">
                  {t}
                </li>
              ))}
            </ul>
          </aside>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 border-b border-border/60 px-5 py-3">
              <span className="grid h-7 w-7 place-items-center rounded-full gradient-gold text-primary-foreground">
                <Crown className="h-3.5 w-3.5" />
              </span>
              <span className="text-sm font-medium">JAI AI</span>
              <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> online
              </span>
            </div>
            <div className="space-y-4 p-5">
              <Bubble role="user">Help me write an opening line for a PTI cover letter.</Bubble>
              <Bubble role="ai">
                Absolutely — try this:{" "}
                <span className="text-foreground">
                  "As a fitness-first educator with three years coaching athletes across Rajasthan, I'd love to bring discipline, energy, and modern training science to your team."
                </span>
              </Bubble>
              <Bubble role="user">Make it more confident.</Bubble>
              <Bubble role="ai" typing />
            </div>
            <div className="border-t border-border/60 p-4">
              <div className="flex items-center gap-2 rounded-2xl glass px-4 py-3">
                <input
                  className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
                  placeholder="Ask JAI AI anything…"
                  readOnly
                />
                <Link to="/chat" className="rounded-full gradient-gold px-3 py-1.5 text-xs font-medium text-primary-foreground">
                  Try live →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Bubble({ role, children, typing }: { role: "user" | "ai"; children?: React.ReactNode; typing?: boolean }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={
        isUser
          ? "max-w-[80%] rounded-2xl rounded-tr-sm bg-gradient-to-br from-gold to-[oklch(0.62_0.13_70)] px-4 py-2.5 text-sm text-primary-foreground"
          : "max-w-[80%] rounded-2xl rounded-tl-sm glass px-4 py-2.5 text-sm text-muted-foreground"
      }>
        {typing ? (
          <span className="inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" style={{ animationDelay: "120ms" }} />
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" style={{ animationDelay: "240ms" }} />
          </span>
        ) : children}
      </div>
    </div>
  );
}

function Stats() {
  return (
    <section id="resources" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-4 rounded-3xl glass-strong p-6 sm:p-10 md:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display text-4xl font-semibold text-gradient-gold sm:text-5xl">{s.num}</div>
            <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Tools() {
  return (
    <section id="tools" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="AI Tools"
        title="Every workflow, one luxurious toolkit"
        sub="Eight precision tools — tuned for students, teachers, creators and engineers."
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TOOLS.map(({ icon: Icon, name, desc }) => (
          <Link
            key={name}
            to="/chat"
            className="group relative overflow-hidden rounded-2xl glass p-5 transition hover:-translate-y-1 hover:glass-strong"
          >
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gold/15 text-gold ring-1 ring-gold/30">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-semibold">{name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
            <div className="mt-4 inline-flex items-center gap-1 text-xs text-gold opacity-0 transition group-hover:opacity-100">
              Open <ArrowRight className="h-3 w-3" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Suggestions() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Try a prompt" title="Pick a spark, get a brilliant reply" />
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SUGGESTIONS.map((s) => (
          <Link
            key={s}
            to="/chat"
            className="rounded-xl glass px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:glass-strong transition"
          >
            <span className="text-gold mr-2">›</span>{s}
          </Link>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Loved by ambitious minds" title="Words from our community" />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure key={t.name} className="rounded-2xl glass p-6">
            <div className="flex gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
            </div>
            <blockquote className="mt-4 text-sm text-foreground/90">"{t.quote}"</blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full gradient-gold text-primary-foreground text-sm font-semibold">
                {t.name.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-medium">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="FAQ" title="Questions, answered" />
      <div className="mt-10 divide-y divide-border/60 rounded-2xl glass">
        {FAQ.map((f, i) => {
          const isOpen = open === i;
          return (
            <button
              key={f.q}
              onClick={() => setOpen(isOpen ? null : i)}
              className="block w-full text-left p-5"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-medium">{f.q}</span>
                <ChevronDown className={`h-4 w-4 text-gold transition ${isOpen ? "rotate-180" : ""}`} />
              </div>
              {isOpen && <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>}
            </button>
          );
        })}
      </div>

      <div className="mt-10 rounded-3xl glass-strong p-8 text-center">
        <Check className="mx-auto h-6 w-6 text-gold" />
        <h3 className="mt-3 font-display text-3xl">Ready to feel the gold standard?</h3>
        <p className="mt-2 text-sm text-muted-foreground">Start chatting in seconds. No signup required to try.</p>
        <Link to="/chat" className="mt-6 inline-flex items-center gap-2 rounded-full gradient-gold px-6 py-3 text-sm font-medium text-primary-foreground glow-gold">
          Launch JAI AI <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="text-xs uppercase tracking-[0.25em] text-gold">{eyebrow}</div>
      <h2 className="mt-3 font-display text-3xl font-semibold sm:text-5xl">{title}</h2>
      {sub && <p className="mt-3 text-sm text-muted-foreground sm:text-base">{sub}</p>}
    </div>
  );
}
