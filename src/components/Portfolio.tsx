import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import {
  Menu, X, ArrowRight, Download, Mail, Github, Linkedin, Phone,
  MapPin, Code2, Cpu, Database, Wrench, Layers, Trophy, Award,
  Briefcase, GraduationCap, Sparkles, ExternalLink, Send, Star,
  CheckCircle2, Rocket, BrainCircuit, Globe,
} from "lucide-react";

type NavId = "home" | "about" | "skills" | "achievements" | "experience" | "projects" | "resume" | "contact";
const NAV: { id: NavId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

const NAME = "Aditya Verma";
const TAGLINE = "Computer Science Student · Problem Solver · Aspiring Software Engineer";
const EMAIL = "adityaverma12609@gmail.com";
const PHONE = "+91 8962654383";
const LOCATION = "Patan, India";
const GITHUB = "https://github.com/AdityaVerma126";
const LINKEDIN = "https://linkedin.com/in/aditya-verma-07126b252";
const LEETCODE = "https://leetcode.com/u/AdityaVerma126/";
const CODEFORCES = "https://codeforces.com";
const AVATAR_URL = "https://media.licdn.com/dms/image/v2/D4D03AQHR4UInqoQcSA/profile-displayphoto-scale_400_400/B4DZyn_o35IUAg-/0/1772345006106?e=1784160000&v=beta&t=2jsAA-7LeTcMb7xHrKFJrE-ylrHLFaRc0Q72Sz-EZmw"; // <-- Replace with your photo URL (e.g. "/avatar.jpg" or external link)


/* ----------------------------- helpers ----------------------------- */

function useActiveSection(): NavId {
  const [active, setActive] = useState<NavId>("home");
  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id as NavId);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);
  return active;
}

function FadeIn({ children, delay = 0, y = 24 }: { children: ReactNode; delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      <FadeIn>
        <div className="inline-flex items-center gap-2 rounded-full border border-teal/30 bg-mint/30 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-deep-teal">
          <Sparkles className="h-3.5 w-3.5" /> {eyebrow}
        </div>
      </FadeIn>
      <FadeIn delay={0.05}>
        <h2 className="mt-4 text-4xl font-bold leading-tight text-navy-teal sm:text-5xl">
          {title.split(" ").map((w, i) =>
            i === title.split(" ").length - 1 ? (
              <span key={i} className="text-gradient"> {w}</span>
            ) : (
              <span key={i}>{i ? " " : ""}{w}</span>
            ),
          )}
        </h2>
      </FadeIn>
      {description && (
        <FadeIn delay={0.1}>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">{description}</p>
        </FadeIn>
      )}
    </div>
  );
}

/* ----------------------------- Navbar ----------------------------- */

function Navbar() {
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: NavId) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4">
        <div className={`flex w-full items-center justify-between gap-4 rounded-2xl px-4 py-3 transition-all duration-300 ${scrolled ? "glass-dark text-cream shadow-elegant" : "glass text-navy-teal"}`}>
          <button onClick={() => go("home")} className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
            <span className={`grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-cream`}>
              <Code2 className="h-4 w-4" />
            </span>
            <span className={scrolled ? "text-cream" : "text-navy-teal"}>{NAME.split(" ")[0]}<span className="text-teal">.</span></span>
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className={`relative rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  active === n.id
                    ? scrolled ? "text-cream" : "text-deep-teal"
                    : scrolled ? "text-cream/70 hover:text-cream" : "text-navy-teal/70 hover:text-navy-teal"
                }`}
              >
                {active === n.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className={`absolute inset-0 rounded-full ${scrolled ? "bg-cream/15" : "bg-mint/60"}`}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative">{n.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => go("contact")}
              className="hidden rounded-full bg-gradient-primary px-4 py-2 text-sm font-semibold text-cream shadow-soft transition hover:shadow-glow md:inline-flex"
            >
              Let's talk
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              className={`grid h-9 w-9 place-items-center rounded-full lg:hidden ${scrolled ? "bg-cream/10 text-cream" : "bg-navy-teal/5 text-navy-teal"}`}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-2 max-w-6xl px-4 lg:hidden"
        >
          <div className="glass rounded-2xl p-3 shadow-elegant">
            <div className="grid grid-cols-2 gap-1">
              {NAV.map((n) => (
                <button
                  key={n.id}
                  onClick={() => go(n.id)}
                  className={`rounded-xl px-3 py-2 text-left text-sm font-medium ${active === n.id ? "bg-mint/60 text-deep-teal" : "text-navy-teal/80 hover:bg-mint/30"}`}
                >
                  {n.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}

/* ----------------------------- Hero ----------------------------- */

function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden bg-hero pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* animated blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 -left-16 h-72 w-72 rounded-full bg-mint/60 blur-3xl animate-blob" />
        <div className="absolute top-1/3 -right-20 h-80 w-80 rounded-full bg-soft-green/60 blur-3xl animate-blob [animation-delay:-4s]" />
        <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-teal/40 blur-3xl animate-blob [animation-delay:-8s]" />
      </div>
      {/* subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(0.43 0.07 210 / 0.18) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.43 0.07 210 / 0.18) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
        }}
      />

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <FadeIn>
            <div className="mb-6 flex items-center">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div className="h-24 w-24 rounded-full bg-gradient-primary p-[3px] shadow-elegant sm:h-28 sm:w-28">
                  <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-cream">
                    {AVATAR_URL ? (
                      <img
                        src={AVATAR_URL}
                        alt={NAME}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="font-display text-3xl font-bold text-navy-teal sm:text-4xl">
                        {NAME.split(" ").map((n) => n[0]).join("")}
                      </span>
                    )}
                  </div>
                </div>
                <span className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full bg-teal text-cream shadow-soft ring-2 ring-cream">
                  <Sparkles className="h-3.5 w-3.5" />
                </span>
              </motion.div>
            </div>
          </FadeIn>
          <FadeIn delay={0.04}>
            <div className="inline-flex items-center gap-2 rounded-full border border-teal/30 bg-cream/70 px-3 py-1 text-xs font-medium text-deep-teal shadow-soft">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
              </span>
              Open to Internships & SDE Roles · 2026
            </div>
          </FadeIn>
          <FadeIn delay={0.06}>
            <h1 className="mt-5 text-5xl font-extrabold leading-[1.05] tracking-tight text-navy-teal sm:text-6xl lg:text-7xl">
              Hi, I'm <span className="text-gradient">{NAME.split(" ")[0]}</span>.<br />
              I build software that <span className="relative whitespace-nowrap">
                <span className="text-gradient">scales</span>
                <svg viewBox="0 0 200 12" className="absolute -bottom-2 left-0 h-2 w-full text-teal/60" preserveAspectRatio="none">
                  <path d="M2 9 Q 60 1 100 6 T 198 4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>.
            </h1>
          </FadeIn>
          <FadeIn delay={0.12}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {TAGLINE}. I love building elegant interfaces, designing thoughtful systems and turning hard problems into clean, shippable code.
            </p>
          </FadeIn>
          <FadeIn delay={0.18}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#resume"
                onClick={(e) => { e.preventDefault(); document.getElementById("resume")?.scrollIntoView({ behavior: "smooth" }); }}
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-5 py-3 text-sm font-semibold text-cream shadow-elegant transition hover:-translate-y-0.5 hover:shadow-glow"
              >
                <Download className="h-4 w-4" /> View Resume
              </a>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
                className="group inline-flex items-center gap-2 rounded-full border border-navy-teal/15 bg-cream/70 px-5 py-3 text-sm font-semibold text-navy-teal backdrop-blur transition hover:-translate-y-0.5 hover:border-teal/40 hover:bg-cream"
              >
                Contact Me <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.25}>
            <div className="mt-10 flex items-center gap-5 text-navy-teal/60">
              <a href={GITHUB} target="_blank" rel="noreferrer" className="transition hover:text-deep-teal"><Github className="h-5 w-5" /></a>
              <a href={LINKEDIN} target="_blank" rel="noreferrer" className="transition hover:text-deep-teal"><Linkedin className="h-5 w-5" /></a>
              <a href={LEETCODE} target="_blank" rel="noreferrer" className="text-sm font-semibold transition hover:text-deep-teal">LeetCode</a>
              <a href={CODEFORCES} target="_blank" rel="noreferrer" className="text-sm font-semibold transition hover:text-deep-teal">Codeforces</a>
            </div>
          </FadeIn>
        </div>

        {/* Visual */}
        <FadeIn delay={0.1} y={32}>
          <div className="relative">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="glass relative rounded-3xl p-5 shadow-elegant"
            >
              {/* mock code card */}
              <div className="flex items-center gap-2 border-b border-navy-teal/10 pb-3">
                <span className="h-3 w-3 rounded-full bg-red-400/70" />
                <span className="h-3 w-3 rounded-full bg-amber-400/70" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
                <span className="ml-2 text-xs text-muted-foreground">~/portfolio/profile.ts</span>
              </div>
              <pre className="mt-4 overflow-hidden font-mono text-[12.5px] leading-relaxed text-navy-teal/90">
{`const dev = {
  name: "${NAME}",
  role: "CS Student & SDE Intern",
  focus: ["Full-Stack", "AI/ML", "Systems"],
  stack: ["TypeScript", "React", "Node",
          "Python", "C++"],
  shipping: true,
};

dev.solve(problem) // → ✨ elegant solution`}
              </pre>
              {/* floating chips */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="glass absolute -left-6 top-10 hidden rounded-2xl px-3 py-2 text-xs font-semibold text-deep-teal shadow-soft sm:flex sm:items-center sm:gap-2"
              >
                <Trophy className="h-4 w-4 text-teal" /> 100+ DSA solved
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="glass absolute -right-4 bottom-6 hidden rounded-2xl px-3 py-2 text-xs font-semibold text-deep-teal shadow-soft sm:flex sm:items-center sm:gap-2"
              >
                <Rocket className="h-4 w-4 text-teal" /> Shipping side projects
              </motion.div>
            </motion.div>
          </div>
        </FadeIn>
      </div>

      {/* stats counter */}
      <div className="mx-auto mt-20 grid max-w-5xl grid-cols-2 gap-3 px-4 sm:grid-cols-4">
        {[
          { v: 100, s: "+", l: "Problems Solved" },
          { v: 12, s: "", l: "Projects Built" },
          { v: 4, s: "", l: "Certifications" },
          { v: 0, s: "", l: "Internships" },
        ].map((s, i) => (
          <FadeIn key={s.l} delay={i * 0.05}>
            <div className="glass rounded-2xl p-5 text-center shadow-soft">
              <div className="font-display text-3xl font-bold text-gradient">
                <Counter to={s.v} />{s.s}
              </div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">{s.l}</div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Counter({ to }: { to: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <>{n}</>;
}

/* ----------------------------- About ----------------------------- */

function About() {
  const interests = [
    { icon: Code2, label: "Software Development" },
    { icon: BrainCircuit, label: "AI / ML" },
    { icon: Globe, label: "Web Development" },
    { icon: Trophy, label: "Competitive Programming" },
  ];
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader eyebrow="About" title="A glimpse into me" description="Curious engineer, lifelong learner, and someone who genuinely enjoys turning ideas into well-crafted products." />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <FadeIn>
            <div className="glass h-full rounded-3xl p-7 shadow-soft">
              <GraduationCap className="h-7 w-7 text-deep-teal" />
              <h3 className="mt-4 text-lg font-semibold text-navy-teal">Education</h3>
              <p className="mt-2 text-sm text-muted-foreground">B.Tech in Computer Science<br />Government Engineering College ,bilaspur<br />CGPA: 8 / 10 · 2022 – 2026</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div className="glass h-full rounded-3xl p-7 shadow-soft">
              <Rocket className="h-7 w-7 text-deep-teal" />
              <h3 className="mt-4 text-lg font-semibold text-navy-teal">Career Goals</h3>
              <p className="mt-2 text-sm text-muted-foreground">Build at the intersection of product and engineering at a top tech company. Long-term: ship developer tools that make engineers 10× happier.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="glass h-full rounded-3xl p-7 shadow-soft">
              <Sparkles className="h-7 w-7 text-deep-teal" />
              <h3 className="mt-4 text-lg font-semibold text-navy-teal">Beyond Code</h3>
              <p className="mt-2 text-sm text-muted-foreground">I mentor juniors at the coding club, write technical blogs, and contribute to open source. Coffee, chess and clean UI deeply matter.</p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.15}>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {interests.map((i) => (
              <div key={i.label} className="group flex items-center gap-3 rounded-2xl border border-navy-teal/10 bg-cream/60 p-4 transition hover:-translate-y-0.5 hover:border-teal/40 hover:shadow-soft">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-cream">
                  <i.icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold text-navy-teal">{i.label}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ----------------------------- Skills ----------------------------- */

const SKILL_GROUPS = [
  { icon: Code2, title: "Languages", items: [
    { n: "C++", v: 80 }, { n: "Python", v: 90 }, { n: "JavaScript", v: 70 }, { n: "Java", v: 50 },
  ]},
  { icon: Layers, title: "Frontend", items: [
    { n: "React", v: 92 }, { n: "TypeScript", v: 88 }, { n: "Tailwind", v: 94 }, { n: "HTML / CSS", v: 95 },
  ]},
  { icon: Cpu, title: "Backend", items: [
    { n: "Node.js", v: 86 }, { n: "Express", v: 84 }, { n: "REST APIs", v: 88 }, { n: "GraphQL", v: 70 },
  ]},
  { icon: Database, title: "Database", items: [
    { n: "MongoDB", v: 82 }, { n: "MySQL", v: 80 }, { n: "PostgreSQL", v: 75 }, { n: "Redis", v: 65 },
  ]},
  { icon: Wrench, title: "Tools", items: [
    { n: "Git / GitHub", v: 93 }, { n: "VS Code", v: 95 }, { n: "Linux", v: 82 }, { n: "Docker", v: 72 },
  ]},
  { icon: BrainCircuit, title: "AI / ML", items: [
    { n: "PyTorch", v: 75 }, { n: "scikit-learn", v: 80 }, { n: "Pandas/NumPy", v: 88 }, { n: "LLM Apps", v: 78 },
  ]},
];

function Skills() {
  return (
    <section id="skills" className="relative py-24">
      <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-mint/30 to-transparent" />
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader eyebrow="Skills" title="My technical toolkit" description="The technologies I reach for to design, build and ship — from low-level systems to modern web." />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((g, gi) => (
            <FadeIn key={g.title} delay={gi * 0.04}>
              <div className="group glass h-full rounded-3xl p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-elegant">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-cream shadow-soft">
                    <g.icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-semibold text-navy-teal">{g.title}</h3>
                </div>
                <div className="mt-5 space-y-4">
                  {g.items.map((it) => (
                    <div key={it.n}>
                      <div className="mb-1.5 flex items-center justify-between text-sm">
                        <span className="font-medium text-navy-teal">{it.n}</span>
                        <span className="text-xs font-semibold text-deep-teal">{it.v}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-navy-teal/10">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${it.v}%` }}
                          viewport={{ once: true, margin: "-60px" }}
                          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full rounded-full bg-gradient-primary"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* contribution graph */}
        <FadeIn delay={0.1}>
          <div className="glass mt-10 rounded-3xl p-6 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-semibold text-navy-teal">Contribution activity</h3>
                <p className="text-sm text-muted-foreground">Last 6 months · consistent shipping</p>
              </div>
              <a href={GITHUB} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-deep-teal hover:underline">
                <Github className="h-4 w-4" /> View GitHub
              </a>
            </div>
            <ContribGraph />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ContribGraph() {
  const weeks = 26;
  const days = 7;
  const cells: number[] = [];
  for (let i = 0; i < weeks * days; i++) {
    const r = Math.random();
    cells.push(r > 0.78 ? 4 : r > 0.6 ? 3 : r > 0.4 ? 2 : r > 0.22 ? 1 : 0);
  }
  const colors = ["bg-navy-teal/10", "bg-mint/70", "bg-soft-green", "bg-sage", "bg-deep-teal"];
  return (
    <div className="mt-5 overflow-x-auto">
      <div className="grid min-w-[600px] grid-flow-col grid-rows-7 gap-1.5">
        {cells.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: (i % weeks) * 0.01 }}
            className={`h-4 w-4 rounded-[4px] ${colors[c]}`}
          />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
        Less {colors.map((c, i) => <span key={i} className={`h-3 w-3 rounded-[3px] ${c}`} />)} More
      </div>
    </div>
  );
}

/* ----------------------------- Achievements ----------------------------- */

const ACHIEVEMENTS = [
 /* { icon: Trophy, title: "LeetCode Knight", sub: "Rating 2050 · Top 3%", year: "2025" },
  { icon: Award, title: "Codeforces Specialist", sub: "Max rating 1620", year: "2025" },
  { icon: Star, title: "Smart India Hackathon", sub: "National Finalist · Team Lead", year: "2024" },*/
  { icon: CheckCircle2, title: "AWS Cloud Practitioner", sub: "Certified · Score 902/1000", year: "2024" },
  { icon: Trophy, title: "GATE CS 2026", sub: "AIR 6034 · Score 526", year: "2026" },
  { icon: Github, title: "Open Source", sub: "20+ merged PRs across OSS repos", year: "2023–25" },
];

function Achievements() {
  return (
    <section id="achievements" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader eyebrow="Achievements" title="Milestones I'm proud of" description="A snapshot of the wins that have pushed my growth as an engineer." />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ACHIEVEMENTS.map((a, i) => (
            <FadeIn key={a.title} delay={i * 0.05}>
              <div className="group relative overflow-hidden rounded-3xl border border-navy-teal/10 bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:border-teal/40 hover:shadow-elegant">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-mint/40 blur-2xl transition group-hover:bg-teal/30" />
                <div className="relative flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-primary text-cream shadow-soft">
                    <a.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate font-semibold text-navy-teal">{a.title}</h3>
                      <span className="rounded-full bg-mint/60 px-2 py-0.5 text-[10px] font-semibold text-deep-teal">{a.year}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{a.sub}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Experience ----------------------------- */

const EXPERIENCE = [
  {
    role: "Software Engineering Intern",
    org: "Razorpay",
    duration: "May 2025 – Jul 2025",
    points: [
      "Shipped 3 customer-facing features in the dashboard used by 50k+ merchants",
      "Reduced p95 API latency by 38% by introducing request-level caching",
      "Collaborated with designers to ship a refreshed analytics module",
    ],
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL"],
  },
  {
    role: "Open Source Contributor",
    org: "Hacktoberfest · Various OSS",
    duration: "2023 – Present",
    points: [
      "20+ merged pull requests across React, dev-tools and CLI projects",
      "Authored docs improvements and bug fixes maintained by core teams",
    ],
    tech: ["TypeScript", "Python", "Markdown"],
  },
  {
    role: "Coding Club Lead",
    org: "CSE Department, IIT",
    duration: "2023 – 2025",
    points: [
      "Mentored 200+ juniors in DSA, system design and interview prep",
      "Organized 5 in-house hackathons with industry sponsorships",
    ],
    tech: ["Leadership", "DSA", "Workshops"],
  },
  {
    role: "Freelance Full-Stack Developer",
    org: "Independent",
    duration: "2024 – Present",
    points: [
      "Designed and shipped landing pages, dashboards and MVPs for 4 startups",
      "End-to-end ownership: design → deploy → analytics",
    ],
    tech: ["Next.js", "Tailwind", "Supabase", "Stripe"],
  },
];

function Experience() {
  return (
    <section id="experience" className="relative py-24">
      <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-mint/30 to-transparent" />
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeader eyebrow="Experience" title="Where I've worked" description="Internships, leadership, freelance and open source — a track record of shipping." />
        <div className="relative">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-teal/40 via-sage/30 to-transparent sm:block" />
          <div className="space-y-6">
            {EXPERIENCE.map((e, i) => (
              <FadeIn key={e.role + e.org} delay={i * 0.05}>
                <div className="relative sm:pl-14">
                  <div className="absolute left-2.5 top-6 hidden h-3 w-3 rounded-full bg-gradient-primary ring-4 ring-cream sm:block" />
                  <div className="glass rounded-3xl p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elegant">
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:justify-between">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 shrink-0 text-deep-teal" />
                          <h3 className="truncate text-base font-semibold text-navy-teal sm:text-lg">{e.role}</h3>
                        </div>
                        <p className="mt-1 text-sm font-medium text-deep-teal">{e.org}</p>
                      </div>
                      <span className="shrink-0 rounded-full bg-mint/60 px-3 py-1 text-xs font-semibold text-deep-teal">{e.duration}</span>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {e.points.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {e.tech.map((t) => (
                        <span key={t} className="rounded-full border border-teal/30 bg-cream/80 px-2.5 py-0.5 text-xs font-medium text-deep-teal">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Projects ----------------------------- */

const PROJECTS = [
  {
    title: "Synapse — AI Study Assistant",
    desc: "An LLM-powered study buddy that turns lecture PDFs into flashcards, summaries and adaptive quizzes.",
    tags: ["Next.js", "OpenAI", "Postgres", "Tailwind"],
    hue: "from-mint/60 via-soft-green/50 to-teal/40",
  },
  {
    title: "DevPulse — GitHub Analytics",
    desc: "A dashboard that visualizes contribution patterns, PR velocity and team health for engineering teams.",
    tags: ["React", "TypeScript", "D3", "Node"],
    hue: "from-soft-green/60 via-sage/50 to-deep-teal/40",
  },
  {
    title: "QuickPay — Mini UPI Clone",
    desc: "A wallet & payments app with transactions, friends list and statement export. Real-time updates via sockets.",
    tags: ["React Native", "Express", "MongoDB", "Socket.IO"],
    hue: "from-sage/60 via-teal/50 to-dark-teal/40",
  },
  {
    title: "InboxZero — Smart Email Triage",
    desc: "Classifies your inbox into actionable buckets with explainable AI tags and one-click reply drafts.",
    tags: ["Python", "FastAPI", "scikit-learn", "React"],
    hue: "from-mint/50 via-teal/50 to-navy-teal/30",
  },
];

function Projects() {
  return (
    <section id="projects" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader eyebrow="Projects" title="Selected work I've built" description="A few things I'm genuinely proud of — built end-to-end with care for design and craft." />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.05}>
              <article className="group relative overflow-hidden rounded-3xl border border-navy-teal/10 bg-card shadow-soft transition hover:-translate-y-1 hover:border-teal/40 hover:shadow-elegant">
                {/* preview */}
                <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${p.hue}`}>
                  <div
                    className="absolute inset-0 opacity-25"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 30% 30%, white 1px, transparent 1.5px), radial-gradient(circle at 70% 60%, white 1px, transparent 1.5px)",
                      backgroundSize: "26px 26px, 32px 32px",
                    }}
                  />
                  <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-cream/80 p-3 backdrop-blur">
                    <div className="flex gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                    </div>
                    <div className="mt-2 h-2 w-3/4 rounded bg-deep-teal/30" />
                    <div className="mt-1.5 h-2 w-2/4 rounded bg-deep-teal/20" />
                  </div>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cream/30 to-transparent transition duration-700 group-hover:translate-x-full" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-navy-teal">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full border border-teal/30 bg-mint/30 px-2.5 py-0.5 text-xs font-medium text-deep-teal">{t}</span>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center gap-2">
                    <a href={GITHUB} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-navy-teal/15 bg-cream px-3 py-1.5 text-xs font-semibold text-navy-teal transition hover:border-teal/40">
                      <Github className="h-3.5 w-3.5" /> Code
                    </a>
                    <a href="#" className="inline-flex items-center gap-1.5 rounded-full bg-gradient-primary px-3 py-1.5 text-xs font-semibold text-cream transition hover:shadow-glow">
                      Live Demo <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Resume CTA ----------------------------- */

function Resume() {
  return (
    <section id="resume" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-primary p-8 shadow-elegant sm:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-mint/30 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 -bottom-24 h-72 w-72 rounded-full bg-sage/30 blur-3xl" />
          <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="text-cream">
              <FadeIn>
                <div className="inline-flex items-center gap-2 rounded-full bg-cream/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em]">
                  <Download className="h-3.5 w-3.5" /> Resume
                </div>
              </FadeIn>
              <FadeIn delay={0.05}>
                <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">Let's get to the good part — my resume.</h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-4 max-w-xl text-cream/80">One page. Zero fluff. A snapshot of education, experience, projects and the skills I bring to your team.</p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a href="#" download className="inline-flex items-center gap-2 rounded-full bg-cream px-5 py-3 text-sm font-semibold text-deep-teal shadow-soft transition hover:-translate-y-0.5 hover:shadow-glow">
                    <Download className="h-4 w-4" /> Download Resume
                  </a>
                  <a href={LINKEDIN} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-cream/30 bg-cream/10 px-5 py-3 text-sm font-semibold text-cream backdrop-blur transition hover:bg-cream/20">
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </a>
                  <a href={GITHUB} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-cream/30 bg-cream/10 px-5 py-3 text-sm font-semibold text-cream backdrop-blur transition hover:bg-cream/20">
                    <Github className="h-4 w-4" /> GitHub
                  </a>
                </div>
              </FadeIn>
            </div>
            <FadeIn delay={0.1} y={36}>
              <div className="relative mx-auto w-full max-w-sm">
                <motion.div
                  animate={{ y: [0, -8, 0], rotate: [-2, 1, -2] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  className="glass rounded-2xl p-5 shadow-elegant"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-base font-semibold text-navy-teal">{NAME}</div>
                      <div className="text-xs text-muted-foreground">CS Student · SDE Intern</div>
                    </div>
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-cream font-bold">AS</div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="h-2 w-3/4 rounded-full bg-navy-teal/15" />
                    <div className="h-2 w-2/3 rounded-full bg-navy-teal/15" />
                    <div className="h-2 w-1/2 rounded-full bg-navy-teal/15" />
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="h-8 rounded-lg bg-mint/40" />
                    ))}
                  </div>
                  <div className="mt-4 space-y-1.5">
                    <div className="h-1.5 w-full rounded-full bg-navy-teal/10" />
                    <div className="h-1.5 w-5/6 rounded-full bg-navy-teal/10" />
                    <div className="h-1.5 w-4/6 rounded-full bg-navy-teal/10" />
                  </div>
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Contact ----------------------------- */

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader eyebrow="Contact" title="Let's build something great" description="Have an opportunity, a project, or just want to say hi? Drop a message — I usually reply within a day." />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.2fr]">
          <FadeIn>
            <div className="glass h-full rounded-3xl p-7 shadow-soft">
              <h3 className="text-lg font-semibold text-navy-teal">Reach me directly</h3>
              <p className="mt-1 text-sm text-muted-foreground">Prefer email or LinkedIn? I'm one click away.</p>
              <div className="mt-6 space-y-4">
                {[
                  { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
                  { icon: Phone, label: "Phone", value: PHONE, href: `tel:${PHONE.replace(/\s/g, "")}` },
                  { icon: Linkedin, label: "LinkedIn", value: "/in/adityaverma", href: LINKEDIN },
                  { icon: Github, label: "GitHub", value: "@adityaverma", href: GITHUB },
                  { icon: MapPin, label: "Location", value: LOCATION },
                ].map((c) => (
                  <a key={c.label} href={c.href} target={c.href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                     className="flex items-center gap-4 rounded-2xl border border-navy-teal/10 bg-cream/60 p-3 transition hover:-translate-y-0.5 hover:border-teal/40 hover:shadow-soft">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-primary text-cream">
                      <c.icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.label}</div>
                      <div className="truncate text-sm font-medium text-navy-teal">{c.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 3000); (e.target as HTMLFormElement).reset(); }}
              className="glass h-full rounded-3xl p-7 shadow-soft"
            >
              <h3 className="text-lg font-semibold text-navy-teal">Send a message</h3>
              <p className="mt-1 text-sm text-muted-foreground">I'll get back within 24 hours.</p>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Name" name="name" placeholder="Your full name" />
                <Field label="Email" name="email" type="email" placeholder="you@company.com" />
              </div>
              <div className="mt-4">
                <Field label="Subject" name="subject" placeholder="Internship opportunity · Project · Hi 👋" />
              </div>
              <div className="mt-4">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell me a bit about the role, project, or what you have in mind…"
                  className="w-full resize-none rounded-2xl border border-navy-teal/10 bg-cream/80 px-4 py-3 text-sm text-navy-teal outline-none ring-teal/30 transition placeholder:text-muted-foreground/70 focus:border-teal/50 focus:ring-4"
                />
              </div>
              <div className="mt-6 flex items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground">By submitting, you agree I may reply by email.</p>
                <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-5 py-3 text-sm font-semibold text-cream shadow-soft transition hover:-translate-y-0.5 hover:shadow-glow">
                  {sent ? <>Sent <CheckCircle2 className="h-4 w-4" /></> : <>Send Message <Send className="h-4 w-4" /></>}
                </button>
              </div>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="w-full rounded-2xl border border-navy-teal/10 bg-cream/80 px-4 py-3 text-sm text-navy-teal outline-none ring-teal/30 transition placeholder:text-muted-foreground/70 focus:border-teal/50 focus:ring-4"
      />
    </div>
  );
}

/* ----------------------------- Footer ----------------------------- */

function Footer() {
  return (
    <footer className="relative mt-10 border-t border-navy-teal/10 bg-cream/60 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:flex-row">
        <div className="flex items-center gap-2 font-display text-lg font-bold text-navy-teal">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-cream">
            <Code2 className="h-4 w-4" />
          </span>
          {NAME}
        </div>
        <div className="flex items-center gap-4 text-navy-teal/60">
          <a href={GITHUB} target="_blank" rel="noreferrer" className="transition hover:text-deep-teal"><Github className="h-5 w-5" /></a>
          <a href={LINKEDIN} target="_blank" rel="noreferrer" className="transition hover:text-deep-teal"><Linkedin className="h-5 w-5" /></a>
          <a href={`mailto:${EMAIL}`} className="transition hover:text-deep-teal"><Mail className="h-5 w-5" /></a>
        </div>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} {NAME} · Built with passion and code.</p>
      </div>
    </footer>
  );
}

/* ----------------------------- Scroll progress + cursor glow ----------------------------- */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.4 });
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-primary" />;
}

function CursorGlow() {
  const [p, setP] = useState({ x: -200, y: -200 });
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) setEnabled(true);
    const move = (e: MouseEvent) => setP({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  if (!enabled) return null;
  return (
    <div
      className="pointer-events-none fixed z-[55] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 mix-blend-multiply blur-3xl transition-transform"
      style={{
        left: p.x, top: p.y,
        background: "radial-gradient(circle, oklch(0.86 0.10 160 / 0.55), transparent 60%)",
      }}
    />
  );
}

/* ----------------------------- Page ----------------------------- */

export default function Portfolio() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Achievements />
        <Experience />
        <Projects />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
