'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ArrowUpRight, Check, Sparkles, GraduationCap, Briefcase, Building2,
  Code2, BarChart3, Brain, Compass, Palette, Megaphone, Shield, Wallet, Cloud, MessageSquare,
  FileText, ClipboardList, Award, Users, LineChart, Rocket, Menu, X, Phone, Mail, MapPin,
  Star, CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';

const RED = '#E53935';

function Wordmark({ className = '' }) {
  return (
    <span className={`font-display font-extrabold tracking-tight text-[22px] leading-none ${className}`}>
      Ad<span style={{ color: RED }}>o</span>p<span style={{ color: RED }}>f</span>ide
    </span>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 } }),
};

function Eyebrow({ children }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-white px-3 py-1 text-xs font-medium text-brand-ink/70">
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: RED }} />
      {children}
    </div>
  );
}

function SectionTitle({ eyebrow, title, sub, center = false }) {
  return (
    <div className={`max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <div className={`mb-4 ${center ? 'flex justify-center' : ''}`}><Eyebrow>{eyebrow}</Eyebrow></div>}
      <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-balance">{title}</h2>
      {sub && <p className="mt-4 text-base sm:text-lg text-brand-ink/60 text-pretty">{sub}</p>}
    </div>
  );
}

const NAV = [
  { key: 'students', label: 'Students' },
  { key: 'professionals', label: 'Professionals' },
  { key: 'business', label: 'Business' },
  { key: 'programs', label: 'Programs' },
  { key: 'assessment', label: 'Career Assessment' },
];

function Nav({ view, setView }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on(); window.addEventListener('scroll', on); return () => window.removeEventListener('scroll', on);
  }, []);
  const go = (k) => { setView(k); setOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? 'backdrop-blur-md bg-white/75 border-b border-brand-line' : 'bg-transparent'}`}>
      <div className="container flex h-16 items-center justify-between">
        <button onClick={() => go('home')} className="flex items-center gap-2"><Wordmark /></button>
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <button key={n.key} onClick={() => go(n.key)}
              className={`px-3 py-2 text-sm rounded-full transition ${view === n.key ? 'text-brand-ink bg-brand-muted' : 'text-brand-ink/65 hover:text-brand-ink'}`}>
              {n.label}
            </button>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-2">
          <button onClick={() => go('contact')} className="text-sm text-brand-ink/70 hover:text-brand-ink px-3 py-2">Contact</button>
          <Button onClick={() => go('contact')} className="rounded-full bg-brand-ink text-white hover:bg-black h-9 px-4">
            Book Consultation <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <button className="lg:hidden p-2 -mr-2" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="lg:hidden border-t border-brand-line bg-white">
            <div className="container py-3 flex flex-col gap-1">
              {NAV.map((n) => (
                <button key={n.key} onClick={() => go(n.key)} className="text-left px-3 py-2.5 rounded-lg hover:bg-brand-muted text-brand-ink">{n.label}</button>
              ))}
              <button onClick={() => go('contact')} className="text-left px-3 py-2.5 rounded-lg hover:bg-brand-muted">Contact</button>
              <Button onClick={() => go('contact')} className="mt-2 rounded-full bg-brand-ink text-white hover:bg-black h-10">Book Consultation</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero({ setView }) {
  const brands = ['IIT Alumni Network', 'Tata Steel', 'Razorpay', 'Zomato', 'Cred', 'Swiggy', 'Flipkart Labs', 'Mahindra', 'Polygon', 'Postman'];
  return (
    <section className="relative pt-32 sm:pt-40 pb-20 overflow-hidden">
      <div className="hero-glow" />
      <div className="absolute inset-0 grid-bg mask-fade-y opacity-60" />
      <div className="container relative">
        <motion.div initial="hidden" animate="show" variants={fadeUp} className="flex justify-center">
          <Eyebrow>New \u00b7 Career Operating System for India</Eyebrow>
        </motion.div>
        <motion.h1 initial="hidden" animate="show" custom={1} variants={fadeUp}
          className="mt-6 mx-auto max-w-5xl text-center font-display font-semibold tracking-tight text-balance text-[44px] sm:text-[64px] lg:text-[80px] leading-[1.02]">
          Transform Learning Into
          <br className="hidden sm:block" /> <span className="relative inline-block">
            Career Success
            <svg viewBox="0 0 300 12" className="absolute -bottom-2 left-0 w-full" preserveAspectRatio="none" aria-hidden>
              <path d="M2 8 C 60 -2, 180 14, 298 4" stroke={RED} strokeWidth="3" fill="none" strokeLinecap="round" />
            </svg>
          </span>.
        </motion.h1>
        <motion.p initial="hidden" animate="show" custom={2} variants={fadeUp}
          className="mt-8 mx-auto max-w-2xl text-center text-lg sm:text-xl text-brand-ink/60 text-pretty">
          Industry-focused learning, internships, certifications, placements, and business-ready talent solutions \u2014 all in one premium platform.
        </motion.p>
        <motion.div initial="hidden" animate="show" custom={3} variants={fadeUp}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button onClick={() => setView('programs')} className="rounded-full bg-brand-ink text-white hover:bg-black h-12 px-6 text-base">
            Explore Programs <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button onClick={() => setView('contact')} variant="outline" className="rounded-full h-12 px-6 text-base border-brand-line bg-white hover:bg-brand-muted">
            Book Consultation
          </Button>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-16">
          <p className="text-center text-xs uppercase tracking-[0.18em] text-brand-ink/40">Trusted by ambitious campuses and hiring teams</p>
          <div className="mt-6 mask-fade-x overflow-hidden">
            <div className="flex gap-12 animate-marquee whitespace-nowrap will-change-transform">
              {brands.concat(brands).map((b, i) => (
                <span key={i} className="text-brand-ink/50 text-lg font-display font-semibold">{b}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const ECOSYSTEMS = [
  { key: 'students', icon: GraduationCap, title: 'For Students',
    desc: 'Programs, certifications, live projects, internships, mock tests and a job-ready roadmap \u2014 built by industry mentors.',
    points: ['Industry-mentored programs', 'Live capstone projects', 'Placement assistance'], cta: 'Explore student programs' },
  { key: 'professionals', icon: Briefcase, title: 'For Professionals',
    desc: 'Upskill, transition or accelerate \u2014 with structured career tracks, interview prep and senior hiring access.',
    points: ['Career transition tracks', 'Interview & resume prep', 'Senior role placement'], cta: 'Plan your next move' },
  { key: 'business', icon: Building2, title: 'For Business',
    desc: 'Custom corporate training, campus hiring and talent solutions \u2014 designed around your operating reality.',
    points: ['Corporate training', 'Campus hiring partners', 'Workforce consulting'], cta: 'Talk to our team' },
];

function Ecosystem({ setView }) {
  return (
    <section className="py-24 sm:py-32">
      <div className="container">
        <SectionTitle eyebrow="Three ecosystems. One platform." title="Built for every stage of the career journey."
          sub="Whether you\u2019re a student preparing for your first role, a professional ready for the next leap, or a company building a future-ready workforce \u2014 Adopfide meets you exactly where you are." />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {ECOSYSTEMS.map((e, i) => (
            <motion.button key={e.key} onClick={() => setView(e.key)}
              initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} custom={i} variants={fadeUp}
              className="group relative text-left rounded-2xl border border-brand-line bg-white p-7 hover:border-brand-ink/30 transition-all overflow-hidden">
              <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `radial-gradient(closest-side, ${RED}14, transparent)` }} />
              <div className="relative">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-ink text-white"><e.icon className="h-5 w-5" /></div>
                <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight">{e.title}</h3>
                <p className="mt-3 text-brand-ink/60 text-[15px]">{e.desc}</p>
                <ul className="mt-5 space-y-2">
                  {e.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-brand-ink/80">
                      <CheckCircle2 className="h-4 w-4" style={{ color: RED }} /> {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 inline-flex items-center gap-1 text-sm font-medium text-brand-ink group-hover:gap-2 transition-all">
                  {e.cta} <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

const TRACKS = [
  { icon: Code2, name: 'Software Engineering', desc: 'Frontend, backend, full-stack and mobile.' },
  { icon: BarChart3, name: 'Data & Analytics', desc: 'Analyst, data engineer, data scientist.' },
  { icon: Brain, name: 'Artificial Intelligence', desc: 'LLMs, ML systems, applied AI.' },
  { icon: Compass, name: 'Product Management', desc: 'Discovery, growth and platform PM.' },
  { icon: Palette, name: 'Design (UI/UX)', desc: 'Product design and design systems.' },
  { icon: Megaphone, name: 'Digital Marketing', desc: 'Performance, SEO and content.' },
  { icon: Shield, name: 'Cybersecurity', desc: 'Blue team, AppSec and cloud security.' },
  { icon: Wallet, name: 'Finance & Analyst', desc: 'Valuation, modelling and FP&A.' },
  { icon: Cloud, name: 'Cloud & DevOps', desc: 'AWS, Kubernetes and reliability.' },
  { icon: MessageSquare, name: 'Business Communication', desc: 'Speaking, writing, interviewing.' },
];

function Tracks() {
  return (
    <section className="py-24 sm:py-32 bg-brand-muted/60 border-y border-brand-line">
      <div className="container">
        <SectionTitle eyebrow="Career tracks" title="Pick a direction. We\u2019ll build the runway." />
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {TRACKS.map((t, i) => (
            <motion.div key={t.name}
              initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} custom={i} variants={fadeUp}
              className="rounded-xl bg-white border border-brand-line p-5 hover:border-brand-ink/30 hover:shadow-[0_1px_0_rgba(17,17,17,0.04),0_8px_30px_rgba(17,17,17,0.06)] transition-all">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-ink/[0.04]">
                <t.icon className="h-[18px] w-[18px] text-brand-ink" />
              </div>
              <h4 className="mt-4 font-display font-semibold text-[15px]">{t.name}</h4>
              <p className="mt-1 text-xs text-brand-ink/55">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResumePreviewSVG() {
  return (
    <div className="mt-8 relative">
      <div className="rounded-2xl border border-brand-line bg-white shadow-[0_30px_80px_-30px_rgba(17,17,17,0.25)] p-5 max-w-md ml-auto">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-brand-ink text-white grid place-items-center font-semibold">A</div>
          <div>
            <div className="h-3 w-32 rounded bg-brand-ink/80" />
            <div className="mt-1.5 h-2 w-24 rounded bg-brand-ink/15" />
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-2 rounded bg-brand-ink/10 w-11/12" />
          <div className="h-2 rounded bg-brand-ink/10 w-10/12" />
          <div className="h-2 rounded bg-brand-ink/10 w-9/12" />
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {[0,1].map(k => (
            <div key={k} className="rounded-lg bg-brand-muted p-3">
              <div className="h-2 w-16 rounded bg-brand-ink/30" />
              <div className="mt-2 h-1.5 w-20 rounded bg-brand-ink/15" />
              <div className="mt-1.5 h-1.5 w-14 rounded bg-brand-ink/15" />
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2">
          <span className="text-[10px] px-2 py-0.5 rounded-full border border-brand-line">React</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full border border-brand-line">Node</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full text-white" style={{ background: RED }}>ATS Ready</span>
        </div>
      </div>
    </div>
  );
}

function MockChartSVG() {
  return (
    <div className="mt-8 rounded-2xl bg-white/5 border border-white/10 p-5">
      <div className="flex items-end gap-3 h-32">
        {[40, 65, 50, 80, 60, 92, 70].map((h, i) => (
          <div key={i} className="flex-1 rounded-md" style={{ height: `${h}%`, background: i === 5 ? RED : 'rgba(255,255,255,0.25)' }} />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-white/60">
        <span>Last 7 attempts</span>
        <span className="font-semibold text-white">Top 4%</span>
      </div>
    </div>
  );
}

function Features() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container">
        <SectionTitle eyebrow="Platform" title="A modern operating system for your career."
          sub="Every tool you need \u2014 from learning to placement \u2014 designed with the polish of a SaaS product, not an EdTech portal." />
        <div className="mt-14 grid grid-cols-12 gap-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="col-span-12 lg:col-span-7 rounded-3xl border border-brand-line bg-white p-8 sm:p-10 overflow-hidden relative">
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full opacity-70" style={{ background: `radial-gradient(closest-side, ${RED}14, transparent)` }} />
            <div className="relative">
              <Badge variant="outline" className="rounded-full border-brand-line">Resume Builder</Badge>
              <h3 className="mt-4 font-display text-3xl sm:text-4xl font-semibold tracking-tight">A recruiter-grade resume in under 10 minutes.</h3>
              <p className="mt-3 text-brand-ink/60 max-w-lg">Multiple modern templates, live preview, ATS-friendly output and one-click PDF export.</p>
              <ResumePreviewSVG />
            </div>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} custom={1} variants={fadeUp}
            className="col-span-12 lg:col-span-5 rounded-3xl bg-brand-ink text-white p-8 sm:p-10 relative overflow-hidden">
            <Badge className="rounded-full bg-white/10 text-white hover:bg-white/10">Mock Tests</Badge>
            <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight">Aptitude, Technical &amp; Soft-skill drills.</h3>
            <p className="mt-3 text-white/60">Timed tests, auto-evaluation, performance analytics and a leaderboard.</p>
            <MockChartSVG />
          </motion.div>
          {[
            { icon: Rocket, title: 'Live Industry Projects', d: 'Ship real product work with mentors from top companies.' },
            { icon: Compass, title: 'Career Assessment', d: 'A 10-question profile that maps you to the right track \u2014 with match score and program path.' },
            { icon: Briefcase, title: 'Internship & Job Portal', d: 'Curated opportunities, applications tracker and saved jobs in one place.' },
          ].map((c, i) => (
            <motion.div key={c.title} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} variants={fadeUp}
              className="col-span-12 sm:col-span-6 lg:col-span-4 rounded-3xl border border-brand-line bg-white p-7">
              <c.icon className="h-6 w-6" style={{ color: RED }} />
              <h4 className="mt-4 font-display text-xl font-semibold">{c.title}</h4>
              <p className="mt-2 text-brand-ink/60 text-sm">{c.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const STATS = [
  { kpi: '95%', label: 'Placement assistance success' },
  { kpi: '200+', label: 'Hiring & campus partners' },
  { kpi: '50+', label: 'Industry-led programs' },
  { kpi: '10k+', label: 'Learners onboarded' },
];

function Why() {
  const items = ['Outcome-first program design', 'Mentors from companies hiring today', 'Live capstone projects, not toy demos', 'Dedicated placement & interview coaching'];
  return (
    <section className="py-24 sm:py-32 bg-brand-ink text-white">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-end">
          <div>
            <Eyebrow>Why Adopfide</Eyebrow>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl font-semibold tracking-tight text-balance">Built like a product, not a portal.</h2>
            <p className="mt-4 text-white/60 max-w-xl">We obsess over outcomes \u2014 not just enrolments. Every program is reverse-engineered from real industry roles, with mentors, capstones and placement pathways.</p>
          </div>
          <ul className="space-y-3">
            {items.map((p) => (
              <li key={p} className="flex items-start gap-3 text-white/85">
                <Check className="h-5 w-5 mt-0.5" style={{ color: RED }} /> <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden">
          {STATS.map((s) => (
            <div key={s.label} className="bg-brand-ink p-8">
              <div className="font-display text-5xl font-semibold tracking-tight" style={{ color: RED }}>{s.kpi}</div>
              <div className="mt-2 text-sm text-white/60">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const STORIES = [
  { name: 'Aarav Mehta', role: 'SDE \u00b7 Razorpay', quote: 'The capstone projects and mock interviews were a different league. I had three offers before graduation.' },
  { name: 'Sneha Iyer', role: 'Data Analyst \u00b7 Swiggy', quote: 'Adopfide\u2019s career assessment pointed me to data \u2014 a track I never would have considered. Six months later I was placed.' },
  { name: 'Rohit Verma', role: 'PM \u00b7 Cred', quote: 'I transitioned from engineering to product in 14 weeks. Mentors were senior PMs who actually ship.' },
];

function Stories() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container">
        <SectionTitle eyebrow="Success stories" title="Outcomes that compound." />
        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {STORIES.map((s, i) => (
            <motion.div key={s.name} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} variants={fadeUp}
              className="rounded-2xl border border-brand-line bg-white p-7 flex flex-col">
              <div className="flex gap-1">{Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-4 w-4" style={{ color: RED, fill: RED }} />)}</div>
              <p className="mt-4 text-[15px] text-brand-ink/85 leading-relaxed">\u201C{s.quote}\u201D</p>
              <div className="mt-6 pt-5 border-t border-brand-line flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-brand-ink text-white grid place-items-center font-semibold text-sm">{s.name[0]}</div>
                <div>
                  <div className="font-medium text-sm">{s.name}</div>
                  <div className="text-xs text-brand-ink/55">{s.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  { q: 'Who are Adopfide programs designed for?', a: 'Students preparing for their first roles, working professionals upskilling or transitioning careers, and companies hiring or training talent.' },
  { q: 'Do you offer placement assistance?', a: 'Yes. Every flagship program includes interview preparation, mock interviews, resume reviews and access to our hiring partners.' },
  { q: 'Are programs online, hybrid or in-person?', a: 'Most programs run live online with hybrid options for select cohorts. Corporate engagements can be delivered on-site.' },
  { q: 'How does the career assessment work?', a: 'A short questionnaire maps your interests and strengths to a recommended track with a match score and a suggested learning path. Free to take.' },
  { q: 'Do you provide certifications?', a: 'Yes. All completed programs include an industry-recognised certificate issued by Adopfide Technologies.' },
  { q: 'How can companies partner with Adopfide?', a: 'Reach out via our Business page \u2014 we work with companies on corporate training, campus hiring and workforce development.' },
];

function FAQ() {
  return (
    <section className="py-24 sm:py-32 bg-brand-muted/60 border-y border-brand-line">
      <div className="container max-w-3xl">
        <SectionTitle eyebrow="FAQ" title="Quick answers." center />
        <div className="mt-10 rounded-2xl border border-brand-line bg-white">
          <Accordion type="single" collapsible className="px-4">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`i-${i}`} className="border-brand-line">
                <AccordionTrigger className="text-left font-medium hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-brand-ink/65">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

function CTA({ setView }) {
  return (
    <section className="py-24 sm:py-32">
      <div className="container">
        <div className="rounded-3xl bg-brand-ink text-white p-10 sm:p-16 relative overflow-hidden">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full" style={{ background: `radial-gradient(closest-side, ${RED}33, transparent)` }} />
          <div className="relative max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: RED }} /> Start today
            </div>
            <h2 className="mt-4 font-display text-4xl sm:text-6xl font-semibold tracking-tight text-balance">Your career, engineered.</h2>
            <p className="mt-4 text-white/65 text-lg max-w-xl">Take the free assessment, browse programs, or book a one-on-one consultation with our team.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button onClick={() => setView('assessment')} className="rounded-full bg-white text-brand-ink hover:bg-white/90 h-12 px-6 text-base">
                Take Career Assessment <Sparkles className="ml-2 h-4 w-4" />
              </Button>
              <Button onClick={() => setView('contact')} variant="outline" className="rounded-full h-12 px-6 text-base bg-transparent text-white border-white/20 hover:bg-white/10 hover:text-white">
                Book Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ setView }) {
  return (
    <footer className="border-t border-brand-line">
      <div className="container py-16 grid gap-12 md:grid-cols-5">
        <div className="md:col-span-2">
          <Wordmark />
          <p className="mt-4 text-sm text-brand-ink/60 max-w-sm">Adopfide Technologies Pvt Ltd \u2014 a career operating system for students, professionals and enterprises.</p>
          <div className="mt-6 space-y-2 text-sm text-brand-ink/70">
            <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@adopfide.com</div>
            <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> +91 \u00b7 contact via website</div>
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> India</div>
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold mb-3">Ecosystems</div>
          <ul className="space-y-2 text-sm text-brand-ink/65">
            <li><button onClick={() => setView('students')} className="hover:text-brand-ink">Students</button></li>
            <li><button onClick={() => setView('professionals')} className="hover:text-brand-ink">Professionals</button></li>
            <li><button onClick={() => setView('business')} className="hover:text-brand-ink">Business</button></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold mb-3">Platform</div>
          <ul className="space-y-2 text-sm text-brand-ink/65">
            <li><button onClick={() => setView('programs')} className="hover:text-brand-ink">Programs</button></li>
            <li><button onClick={() => setView('assessment')} className="hover:text-brand-ink">Career Assessment</button></li>
            <li><button onClick={() => setView('contact')} className="hover:text-brand-ink">Contact</button></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold mb-3">Company</div>
          <ul className="space-y-2 text-sm text-brand-ink/65">
            <li>About</li><li>Careers</li><li>Privacy</li><li>Terms</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-brand-line">
        <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-brand-ink/55">
          <div>\u00a9 {new Date().getFullYear()} Adopfide Technologies Pvt Ltd. All rights reserved.</div>
          <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full" style={{ background: RED }} /> Built for outcomes.</div>
        </div>
      </div>
    </footer>
  );
}

function HomeView({ setView }) {
  return (
    <>
      <Hero setView={setView} />
      <Ecosystem setView={setView} />
      <Tracks />
      <Features />
      <Why />
      <Stories />
      <FAQ />
      <CTA setView={setView} />
    </>
  );
}

function PageHeader({ eyebrow, title, sub, children }) {
  return (
    <section className="relative pt-32 sm:pt-40 pb-12 overflow-hidden">
      <div className="hero-glow" />
      <div className="absolute inset-0 grid-bg mask-fade-y opacity-50" />
      <div className="container relative max-w-4xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-5 font-display text-4xl sm:text-6xl font-semibold tracking-tight text-balance">{title}</h1>
        {sub && <p className="mt-5 text-lg text-brand-ink/60 max-w-2xl">{sub}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

function StudentsView({ setView }) {
  const items = [
    { icon: GraduationCap, title: 'Programs & Certifications', d: 'Industry-led tracks in tech, product, design, business and beyond.' },
    { icon: Rocket, title: 'Live Projects', d: 'Ship real work with mentors from top product companies.' },
    { icon: Briefcase, title: 'Internships', d: 'Curated internships with our hiring partners across India.' },
    { icon: Compass, title: 'Career Roadmaps', d: 'A structured 12\u201318 month roadmap from learner to hire.' },
    { icon: ClipboardList, title: 'Mock Tests', d: 'Aptitude, technical and domain tests with leaderboards.' },
    { icon: FileText, title: 'Resume Builder', d: 'Recruiter-grade resumes, ATS-ready, downloadable PDF.' },
  ];
  return (
    <>
      <PageHeader eyebrow="Students" title="Become the candidate everyone wants to hire."
        sub="Programs, projects, internships and placement assistance \u2014 built for outcomes, not certificates.">
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setView('programs')} className="rounded-full bg-brand-ink text-white hover:bg-black h-11 px-5">Browse Programs</Button>
          <Button onClick={() => setView('assessment')} variant="outline" className="rounded-full h-11 px-5 border-brand-line">Take Career Assessment</Button>
        </div>
      </PageHeader>
      <section className="py-16">
        <div className="container grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((i) => (
            <div key={i.title} className="rounded-2xl border border-brand-line bg-white p-6">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-ink/[0.04]"><i.icon className="h-[18px] w-[18px]" /></div>
              <h3 className="mt-4 font-display text-xl font-semibold">{i.title}</h3>
              <p className="mt-2 text-brand-ink/60 text-sm">{i.d}</p>
            </div>
          ))}
        </div>
      </section>
      <CTA setView={setView} />
    </>
  );
}

function ProfessionalsView({ setView }) {
  const items = [
    { icon: Brain, title: 'Upskilling Programs', d: 'Stay relevant with deep dives into AI, data and modern systems.' },
    { icon: Award, title: 'Industry Certifications', d: 'Globally-recognised certifications across high-demand tracks.' },
    { icon: Compass, title: 'Career Transition Tracks', d: 'Move from your current role into product, data or AI in 12\u201316 weeks.' },
    { icon: Briefcase, title: 'Placement Assistance', d: 'Senior role openings with our network of hiring partners.' },
    { icon: LineChart, title: 'Career Assessment', d: 'Map your strengths, get a personalised next-move recommendation.' },
    { icon: Users, title: 'Interview Preparation', d: '1:1 mock interviews with senior practitioners.' },
  ];
  return (
    <>
      <PageHeader eyebrow="Professionals" title="Make your next move \u2014 with confidence."
        sub="Upskill, transition or accelerate. Built for working professionals who want a measurable career step.">
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setView('assessment')} className="rounded-full bg-brand-ink text-white hover:bg-black h-11 px-5">Take Career Assessment</Button>
          <Button onClick={() => setView('contact')} variant="outline" className="rounded-full h-11 px-5 border-brand-line">Book Consultation</Button>
        </div>
      </PageHeader>
      <section className="py-16">
        <div className="container grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((i) => (
            <div key={i.title} className="rounded-2xl border border-brand-line bg-white p-6">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-ink/[0.04]"><i.icon className="h-[18px] w-[18px]" /></div>
              <h3 className="mt-4 font-display text-xl font-semibold">{i.title}</h3>
              <p className="mt-2 text-brand-ink/60 text-sm">{i.d}</p>
            </div>
          ))}
        </div>
      </section>
      <CTA setView={setView} />
    </>
  );
}

function BusinessView({ setView }) {
  const [form, setForm] = useState({ name: '', workEmail: '', company: '', teamSize: '', useCase: 'training', notes: '' });
  const [state, setState] = useState({ loading: false, ok: false, error: '' });
  const submit = async (e) => {
    e.preventDefault();
    setState({ loading: true, ok: false, error: '' });
    try {
      const res = await fetch('/api/corporate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      setState({ loading: false, ok: true, error: '' });
      setForm({ name: '', workEmail: '', company: '', teamSize: '', useCase: 'training', notes: '' });
    } catch (err) { setState({ loading: false, ok: false, error: err.message }); }
  };
  const items = [
    { icon: GraduationCap, title: 'Corporate Training', d: 'Custom curriculum for your engineering, product and ops teams.' },
    { icon: Users, title: 'Campus Hiring', d: 'Pre-trained, evaluated talent shortlists from our network.' },
    { icon: Briefcase, title: 'Talent Solutions', d: 'Bench-ready professionals across tech, product and data.' },
    { icon: LineChart, title: 'Consulting', d: 'Workforce strategy, capability mapping and L&D consulting.' },
  ];
  return (
    <>
      <PageHeader eyebrow="Business Solutions" title="Build a future-ready workforce."
        sub="Corporate training, campus hiring and talent solutions \u2014 designed around your operating reality.">
        <Button onClick={() => document.getElementById('biz-form')?.scrollIntoView({ behavior: 'smooth' })} className="rounded-full bg-brand-ink text-white hover:bg-black h-11 px-5">Talk to Sales</Button>
      </PageHeader>
      <section className="py-16">
        <div className="container grid md:grid-cols-2 gap-5">
          {items.map((i) => (
            <div key={i.title} className="rounded-2xl border border-brand-line bg-white p-7">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-ink/[0.04]"><i.icon className="h-[18px] w-[18px]" /></div>
              <h3 className="mt-4 font-display text-2xl font-semibold">{i.title}</h3>
              <p className="mt-2 text-brand-ink/60">{i.d}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="biz-form" className="py-16 bg-brand-muted/60 border-y border-brand-line">
        <div className="container max-w-2xl">
          <SectionTitle eyebrow="Talk to sales" title="Tell us about your team." center />
          <form onSubmit={submit} className="mt-10 rounded-2xl border border-brand-line bg-white p-6 sm:p-8 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div><Label>Full name</Label><Input className="mt-1.5" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
              <div><Label>Work email</Label><Input type="email" className="mt-1.5" value={form.workEmail} onChange={(e) => setForm({ ...form, workEmail: e.target.value })} required /></div>
              <div><Label>Company</Label><Input className="mt-1.5" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} required /></div>
              <div><Label>Team size</Label><Input className="mt-1.5" placeholder="e.g. 50\u2013200" value={form.teamSize} onChange={(e) => setForm({ ...form, teamSize: e.target.value })} /></div>
            </div>
            <div>
              <Label>Use case</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {[['training', 'Corporate training'], ['hiring', 'Campus hiring'], ['consulting', 'Workforce consulting']].map(([k, v]) => (
                  <button type="button" key={k} onClick={() => setForm({ ...form, useCase: k })}
                    className={`px-3 py-1.5 rounded-full text-sm border transition ${form.useCase === k ? 'bg-brand-ink text-white border-brand-ink' : 'bg-white border-brand-line hover:border-brand-ink/40'}`}>
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div><Label>Anything else?</Label><Textarea rows={4} className="mt-1.5" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></div>
            <div className="flex items-center justify-between pt-2">
              <p className="text-xs text-brand-ink/55">We typically respond within 1 business day.</p>
              <Button disabled={state.loading} className="rounded-full bg-brand-ink text-white hover:bg-black h-11 px-5">{state.loading ? 'Sending\u2026' : 'Send inquiry'}</Button>
            </div>
            {state.ok && <div className="text-sm text-green-600">Thanks \u2014 we\u2019ll reach out shortly.</div>}
            {state.error && <div className="text-sm text-red-600">{state.error}</div>}
          </form>
        </div>
      </section>
    </>
  );
}

function ProgramsView({ setView }) {
  const [programs, setPrograms] = useState([]);
  const [filter, setFilter] = useState('All');
  const [q, setQ] = useState('');
  useEffect(() => { fetch('/api/programs').then((r) => r.json()).then((d) => setPrograms(d.programs || [])); }, []);
  const categories = useMemo(() => ['All', ...Array.from(new Set(programs.map((p) => p.category)))], [programs]);
  const filtered = programs.filter((p) => (filter === 'All' || p.category === filter) && (q === '' || (p.title + p.summary + p.tags.join(' ')).toLowerCase().includes(q.toLowerCase())));
  return (
    <>
      <PageHeader eyebrow="Programs" title="Programs designed for the careers being hired today."
        sub="Industry-led curriculum, mentors who ship, capstones and placement pathways." />
      <section className="pb-24">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button key={c} onClick={() => setFilter(c)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition ${filter === c ? 'bg-brand-ink text-white border-brand-ink' : 'bg-white border-brand-line hover:border-brand-ink/40'}`}>
                  {c}
                </button>
              ))}
            </div>
            <Input placeholder="Search programs\u2026" value={q} onChange={(e) => setQ(e.target.value)} className="md:max-w-xs" />
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p) => (
              <div key={p.id} className="group rounded-2xl border border-brand-line bg-white p-6 hover:border-brand-ink/30 transition-all flex flex-col">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="rounded-full border-brand-line">{p.category}</Badge>
                  {p.featured && <span className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: RED }}>Featured</span>}
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-brand-ink/60">{p.summary}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => <span key={t} className="text-[11px] px-2 py-0.5 rounded-full bg-brand-muted text-brand-ink/70">{t}</span>)}
                </div>
                <div className="mt-5 pt-5 border-t border-brand-line flex items-center justify-between text-sm">
                  <div className="text-brand-ink/65">{p.duration} \u00b7 {p.level}</div>
                  <button onClick={() => setView('contact')} className="font-medium inline-flex items-center gap-1 group-hover:gap-1.5 transition-all" style={{ color: RED }}>
                    Apply <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && <div className="col-span-full text-center py-16 text-brand-ink/50">No programs match your filter.</div>}
          </div>
        </div>
      </section>
    </>
  );
}

const QUESTIONS = [
  { q: 'Which of these makes you lose track of time?', opts: [
    { t: 'Building a website or app', tracks: [{ track: 'Software', weight: 3 }, { track: 'Cloud', weight: 1 }] },
    { t: 'Finding patterns in data', tracks: [{ track: 'Data', weight: 3 }, { track: 'AI', weight: 1 }, { track: 'Finance', weight: 1 }] },
    { t: 'Designing how something feels to use', tracks: [{ track: 'Design', weight: 3 }, { track: 'Product', weight: 1 }] },
    { t: 'Crafting messages that change minds', tracks: [{ track: 'Marketing', weight: 3 }, { track: 'Soft', weight: 1 }] },
  ]},
  { q: 'You\u2019re most energised when you\u2026', opts: [
    { t: 'Ship something real people use', tracks: [{ track: 'Software', weight: 2 }, { track: 'Product', weight: 2 }] },
    { t: 'Spot insight others missed', tracks: [{ track: 'Data', weight: 3 }, { track: 'AI', weight: 1 }] },
    { t: 'Lead a meeting and align a team', tracks: [{ track: 'Product', weight: 3 }, { track: 'Soft', weight: 2 }] },
    { t: 'Make something protect or scale safely', tracks: [{ track: 'Security', weight: 3 }, { track: 'Cloud', weight: 2 }] },
  ]},
  { q: 'Pick the toolset you\u2019d rather master:', opts: [
    { t: 'React, Node, MongoDB', tracks: [{ track: 'Software', weight: 3 }] },
    { t: 'Python, SQL, dashboards', tracks: [{ track: 'Data', weight: 3 }] },
    { t: 'PyTorch, transformers, LLMs', tracks: [{ track: 'AI', weight: 3 }] },
    { t: 'Figma, design systems', tracks: [{ track: 'Design', weight: 3 }] },
  ]},
  { q: 'When something breaks, you\u2026', opts: [
    { t: 'Crack open logs and stack traces', tracks: [{ track: 'Software', weight: 2 }, { track: 'Cloud', weight: 2 }] },
    { t: 'Trace it back to the data', tracks: [{ track: 'Data', weight: 2 }, { track: 'AI', weight: 1 }] },
    { t: 'Ask why the user did that', tracks: [{ track: 'Product', weight: 2 }, { track: 'Design', weight: 2 }] },
    { t: 'Check who else might exploit it', tracks: [{ track: 'Security', weight: 3 }] },
  ]},
  { q: 'Pick a satisfying outcome:', opts: [
    { t: 'A dashboard executives actually use', tracks: [{ track: 'Data', weight: 3 }, { track: 'Finance', weight: 1 }] },
    { t: 'A landing page that converts', tracks: [{ track: 'Marketing', weight: 3 }, { track: 'Design', weight: 1 }] },
    { t: 'A robust deployment pipeline', tracks: [{ track: 'Cloud', weight: 3 }] },
    { t: 'A clean, intuitive product flow', tracks: [{ track: 'Product', weight: 2 }, { track: 'Design', weight: 2 }] },
  ]},
  { q: 'Your communication superpower is\u2026', opts: [
    { t: 'Writing clearly and persuasively', tracks: [{ track: 'Marketing', weight: 2 }, { track: 'Product', weight: 2 }, { track: 'Soft', weight: 2 }] },
    { t: 'Explaining numbers in plain language', tracks: [{ track: 'Data', weight: 2 }, { track: 'Finance', weight: 2 }] },
    { t: 'Mediating disagreements', tracks: [{ track: 'Product', weight: 2 }, { track: 'Soft', weight: 3 }] },
    { t: 'Pitching ideas confidently', tracks: [{ track: 'Marketing', weight: 2 }, { track: 'Soft', weight: 2 }] },
  ]},
  { q: 'Which class would you take just for fun?', opts: [
    { t: 'Probability and statistics', tracks: [{ track: 'Data', weight: 3 }, { track: 'AI', weight: 2 }, { track: 'Finance', weight: 2 }] },
    { t: 'Behavioural psychology', tracks: [{ track: 'Product', weight: 2 }, { track: 'Design', weight: 2 }, { track: 'Marketing', weight: 2 }] },
    { t: 'Systems & networks', tracks: [{ track: 'Cloud', weight: 2 }, { track: 'Security', weight: 2 }, { track: 'Software', weight: 1 }] },
    { t: 'Visual design history', tracks: [{ track: 'Design', weight: 3 }] },
  ]},
  { q: 'What kind of company excites you most?', opts: [
    { t: 'A product company shipping fast', tracks: [{ track: 'Software', weight: 2 }, { track: 'Product', weight: 2 }, { track: 'Design', weight: 1 }] },
    { t: 'A data-driven scale-up', tracks: [{ track: 'Data', weight: 3 }, { track: 'AI', weight: 2 }] },
    { t: 'A fintech or banking firm', tracks: [{ track: 'Finance', weight: 3 }, { track: 'Security', weight: 1 }] },
    { t: 'A consumer brand', tracks: [{ track: 'Marketing', weight: 3 }, { track: 'Design', weight: 1 }] },
  ]},
  { q: 'Pick a role title that sounds like you in 2 years:', opts: [
    { t: 'Software Engineer', tracks: [{ track: 'Software', weight: 3 }] },
    { t: 'Data Scientist / Analyst', tracks: [{ track: 'Data', weight: 3 }] },
    { t: 'Product Manager', tracks: [{ track: 'Product', weight: 3 }] },
    { t: 'Designer / UX Lead', tracks: [{ track: 'Design', weight: 3 }] },
  ]},
  { q: 'How do you prefer to work?', opts: [
    { t: 'Deep solo focus on hard problems', tracks: [{ track: 'Software', weight: 2 }, { track: 'AI', weight: 2 }, { track: 'Security', weight: 2 }] },
    { t: 'Cross-functional with many teams', tracks: [{ track: 'Product', weight: 3 }, { track: 'Soft', weight: 2 }] },
    { t: 'Creative iteration with feedback', tracks: [{ track: 'Design', weight: 2 }, { track: 'Marketing', weight: 2 }] },
    { t: 'Numbers, models and rigor', tracks: [{ track: 'Data', weight: 2 }, { track: 'Finance', weight: 3 }] },
  ]},
];

function AssessmentView({ setView }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const total = QUESTIONS.length;
  const progress = Math.min(100, Math.round((step / (total + 1)) * 100));

  const select = (opt) => {
    const next = [...answers]; next[step] = opt.tracks; setAnswers(next);
    setTimeout(() => setStep((s) => s + 1), 180);
  };
  const submit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/assessment', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ answers, profile }) });
      const data = await res.json();
      setResult(data.result); setStep(total + 1);
    } catch { /* noop */ }
    setLoading(false);
  };
  const restart = () => { setStep(0); setAnswers([]); setResult(null); };

  return (
    <>
      <PageHeader eyebrow="Career Assessment" title="Find your highest-leverage career track."
        sub="A 10-question questionnaire that maps your interests and strengths to a personalised recommendation \u2014 with match score and program path." />
      <section className="pb-24">
        <div className="container max-w-2xl">
          <div className="rounded-2xl border border-brand-line bg-white p-6 sm:p-8">
            <div className="flex items-center justify-between text-xs text-brand-ink/55">
              <span>{step < total ? `Question ${step + 1} of ${total}` : step === total ? 'Almost there' : 'Your result'}</span>
              <span>{progress}%</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-brand-muted overflow-hidden">
              <div className="h-full transition-all" style={{ width: `${progress}%`, background: RED }} />
            </div>
            <div className="mt-8 min-h-[260px]">
              <AnimatePresence mode="wait">
                {step < total && (
                  <motion.div key={step} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
                    <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">{QUESTIONS[step].q}</h3>
                    <div className="mt-6 grid gap-2.5">
                      {QUESTIONS[step].opts.map((opt, i) => (
                        <button key={i} onClick={() => select(opt)}
                          className="group text-left rounded-xl border border-brand-line bg-white hover:border-brand-ink/40 hover:bg-brand-muted/50 transition-all p-4 flex items-center justify-between">
                          <span>{opt.t}</span>
                          <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                    {step > 0 && (
                      <button onClick={() => setStep((s) => Math.max(0, s - 1))} className="mt-6 text-sm text-brand-ink/55 hover:text-brand-ink">\u2190 Back</button>
                    )}
                  </motion.div>
                )}
                {step === total && (
                  <motion.div key="profile" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
                    <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">Where should we send your report?</h3>
                    <p className="mt-2 text-brand-ink/60">We\u2019ll keep your result on file so a counsellor can help if you want.</p>
                    <div className="mt-6 space-y-3">
                      <div><Label>Your name</Label><Input className="mt-1.5" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} /></div>
                      <div><Label>Email</Label><Input type="email" className="mt-1.5" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} /></div>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <button onClick={() => setStep((s) => s - 1)} className="text-sm text-brand-ink/55 hover:text-brand-ink">\u2190 Back</button>
                      <Button onClick={submit} disabled={loading} className="rounded-full bg-brand-ink text-white hover:bg-black h-11 px-5">{loading ? 'Analyzing\u2026' : 'See my result'}</Button>
                    </div>
                  </motion.div>
                )}
                {step > total && result && (
                  <motion.div key="result" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                    <div className="text-center">
                      <div className="text-xs uppercase tracking-[0.18em] text-brand-ink/50">Your top track</div>
                      <div className="mt-2 font-display text-4xl sm:text-5xl font-semibold tracking-tight">{result.recommended[0]?.program}</div>
                      <div className="mt-6 inline-flex items-center gap-3">
                        <div className="relative h-24 w-24">
                          <svg viewBox="0 0 36 36" className="h-24 w-24 -rotate-90">
                            <circle cx="18" cy="18" r="16" fill="none" stroke="#F1F3F5" strokeWidth="3" />
                            <circle cx="18" cy="18" r="16" fill="none" stroke={RED} strokeWidth="3"
                              strokeDasharray={`${result.match} 100`} strokeLinecap="round" pathLength="100" />
                          </svg>
                          <div className="absolute inset-0 grid place-items-center font-display font-semibold text-xl">{result.match}%</div>
                        </div>
                        <div className="text-left">
                          <div className="font-medium">Career Match</div>
                          <div className="text-sm text-brand-ink/60 max-w-xs">Based on your answers, this is your highest-fit direction.</div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-8">
                      <div className="text-sm font-semibold mb-3">Also strong matches</div>
                      <div className="grid sm:grid-cols-3 gap-3">
                        {result.recommended.slice(1).map((r) => (
                          <div key={r.track} className="rounded-xl border border-brand-line p-4">
                            <div className="text-xs text-brand-ink/55">Track</div>
                            <div className="mt-1 font-medium">{r.program}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                      <Button onClick={() => setView('programs')} className="rounded-full bg-brand-ink text-white hover:bg-black h-11 px-5">See matching programs <ArrowRight className="ml-2 h-4 w-4" /></Button>
                      <Button onClick={() => setView('contact')} variant="outline" className="rounded-full h-11 px-5 border-brand-line">Talk to a counsellor</Button>
                      <Button onClick={restart} variant="ghost" className="rounded-full h-11 px-4">Restart</Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactView() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: 'consultation', message: '' });
  const [state, setState] = useState({ loading: false, ok: false, error: '' });
  const submit = async (e) => {
    e.preventDefault();
    setState({ loading: true, ok: false, error: '' });
    try {
      const res = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, source: 'contact-page' }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      setState({ loading: false, ok: true, error: '' });
      setForm({ name: '', email: '', phone: '', type: 'consultation', message: '' });
    } catch (err) { setState({ loading: false, ok: false, error: err.message }); }
  };
  return (
    <>
      <PageHeader eyebrow="Contact" title="Let\u2019s talk." sub="Book a consultation, ask about a program, or partner with us." />
      <section className="pb-24">
        <div className="container grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <div><div className="text-sm font-semibold">Email</div><div className="mt-1 text-brand-ink/70">hello@adopfide.com</div></div>
            <div><div className="text-sm font-semibold">Hours</div><div className="mt-1 text-brand-ink/70">Mon \u2013 Sat, 10:00 \u2013 19:00 IST</div></div>
            <div><div className="text-sm font-semibold">Office</div><div className="mt-1 text-brand-ink/70">Adopfide Technologies Pvt Ltd<br />India</div></div>
            <div className="rounded-2xl border border-brand-line bg-brand-muted/40 p-5 text-sm text-brand-ink/70">
              We respond to most inquiries within 1 business day. For urgent partnership requests, mention <span className="font-semibold">URGENT</span> in your message.
            </div>
          </div>
          <form onSubmit={submit} className="lg:col-span-3 rounded-2xl border border-brand-line bg-white p-6 sm:p-8 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div><Label>Full name</Label><Input className="mt-1.5" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
              <div><Label>Email</Label><Input type="email" className="mt-1.5" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></div>
              <div><Label>Phone</Label><Input className="mt-1.5" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
              <div>
                <Label>I am a\u2026</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[['consultation', 'Student / Learner'], ['corporate', 'Business / Hiring'], ['general', 'Other']].map(([k, v]) => (
                    <button type="button" key={k} onClick={() => setForm({ ...form, type: k })}
                      className={`px-3 py-1.5 rounded-full text-sm border transition ${form.type === k ? 'bg-brand-ink text-white border-brand-ink' : 'bg-white border-brand-line hover:border-brand-ink/40'}`}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div><Label>How can we help?</Label><Textarea rows={5} className="mt-1.5" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></div>
            <div className="flex items-center justify-between pt-2">
              <p className="text-xs text-brand-ink/55">By submitting, you agree to be contacted about your inquiry.</p>
              <Button disabled={state.loading} className="rounded-full bg-brand-ink text-white hover:bg-black h-11 px-5">{state.loading ? 'Sending\u2026' : 'Send message'} <ArrowRight className="ml-1.5 h-4 w-4" /></Button>
            </div>
            {state.ok && <div className="text-sm text-green-600 flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Thanks \u2014 we\u2019ll reach out shortly.</div>}
            {state.error && <div className="text-sm text-red-600">{state.error}</div>}
          </form>
        </div>
      </section>
    </>
  );
}

function App() {
  const [view, setView] = useState('home');
  useEffect(() => { window.scrollTo({ top: 0 }); }, [view]);
  return (
    <div className="min-h-screen bg-white text-brand-ink">
      <Nav view={view} setView={setView} />
      <main>
        {view === 'home' && <HomeView setView={setView} />}
        {view === 'students' && <StudentsView setView={setView} />}
        {view === 'professionals' && <ProfessionalsView setView={setView} />}
        {view === 'business' && <BusinessView setView={setView} />}
        {view === 'programs' && <ProgramsView setView={setView} />}
        {view === 'assessment' && <AssessmentView setView={setView} />}
        {view === 'contact' && <ContactView />}
      </main>
      <Footer setView={setView} />
    </div>
  );
}

export default App;
