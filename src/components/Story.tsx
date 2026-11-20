"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, BadgeCheck, Dumbbell, Smile, SprayCan, Users } from "lucide-react";
import { MARQUEE, STATS, FEATURES, PROGRAMS, METHOD, COACHES, wa } from "@/data/site";
import { Photo, Reveal, Words, CountUp, Spotlight, Tilt, Magnetic, stagger, rise, EASE } from "./motion";

/* ---------------- HERO ---------------- */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const go = () => setReady(true);
    window.addEventListener("twr:ready", go);
    const t = setTimeout(go, 2600); // safety
    return () => { window.removeEventListener("twr:ready", go); clearTimeout(t); };
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const a = (d: number) => ({ initial: { opacity: 0, y: 24 }, animate: ready ? { opacity: 1, y: 0 } : {}, transition: { delay: d, duration: 0.9, ease: EASE } });

  return (
    <section id="top" ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-20 lg:min-h-[921px]">
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <motion.div className="h-full w-full" initial={{ scale: 1.25 }} animate={ready ? { scale: 1.05 } : {}} transition={{ duration: 2.4, ease: EASE }}>
          <Photo k="hero" alt="Athlete deadlifting a heavy barbell in a dark gym" eager className="h-full w-full" imgClassName="object-[60%_8%]" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-surface/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-surface/95 via-surface/50 to-transparent" />
      </motion.div>

      <motion.div {...a(1.2)} className="absolute top-24 right-6 z-20 md:right-12">
        <motion.a href="#trial" animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-surface-container/70 px-4 py-2 shadow-[0_0_24px_rgba(191,245,32,0.15)] backdrop-blur-xl">
          <span className="h-2.5 w-2.5 rounded-full bg-lime shadow-[0_0_8px_#bff520]" />
          <span className="text-label-sm uppercase tracking-wider text-lime">Free trial available</span>
        </motion.a>
      </motion.div>

      <motion.div style={{ y: textY, opacity: fade }} className="wrap relative z-10 flex flex-col items-start">
        <motion.div {...a(0.2)} className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface-container-high/80 px-4 py-1.5 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
          </span>
          <span className="text-label-sm tracking-wide text-secondary">Akota, Vadodara · Now open</span>
        </motion.div>

        <h1 className="mb-6 max-w-4xl text-headline-xl-mobile text-on-surface md:text-headline-xl lg:text-display-hero" aria-label="The Wellness Revolution">
          {["The", "Wellness", "Revolution"].map((w, i) => (
            <span key={w} aria-hidden className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom">
              <motion.span
                className={`inline-block ${w === "Revolution" ? "text-lime" : ""}`}
                initial={{ y: "110%" }}
                animate={ready ? { y: "0%" } : {}}
                transition={{ delay: 0.35 + i * 0.12, duration: 1.1, ease: EASE }}
              >
                {w}
              </motion.span>
              {i < 2 && " "}
            </span>
          ))}
        </h1>

        <motion.p {...a(0.75)} className="mb-10 max-w-2xl text-body-lg text-secondary">
          Not a gym. A movement. Real coaches, serious equipment, and a crew that shows up every single day.
        </motion.p>

        <motion.div {...a(0.9)} className="flex w-full flex-wrap items-center gap-4 sm:w-auto">
          <Magnetic className="max-sm:w-full"><a href="#trial" className="btn-lime max-sm:w-full">Claim free trial <ArrowRight size={18} /></a></Magnetic>
          <a href="#programs" className="btn-ghost max-sm:w-full">Explore programs</a>
        </motion.div>
      </motion.div>

      <motion.div {...a(1.4)} aria-hidden className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 md:block">
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/30 pt-2">
          <motion.span className="h-2 w-1 rounded-full bg-lime" animate={{ y: [0, 12], opacity: [1, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
        </div>
      </motion.div>
    </section>
  );
}

/* ---------------- MARQUEE ---------------- */
export function Marquee() {
  const row = [...MARQUEE, ...MARQUEE];
  return (
    <div className="group relative overflow-hidden border-y border-white/5 bg-surface-container-lowest py-4 select-none" aria-label={MARQUEE.join(", ")}>
      <div aria-hidden className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]">
        {[0, 1].map((k) => (
          <div key={k} className="flex items-center gap-8 pr-8 text-label-md uppercase tracking-widest text-secondary">
            {row.map((t, i) => (
              <span key={i} className="flex items-center gap-8">
                <span className="transition-colors hover:text-lime">{t}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-lime" />
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-surface-container-lowest" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-surface-container-lowest" />
    </div>
  );
}

/* ---------------- STATS ---------------- */
export function Stats() {
  return (
    <section className="bg-surface py-16">
      <motion.div className="wrap grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-4" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={stagger(0.1)}>
        {STATS.map((s) => (
          <motion.div key={s.unit} variants={rise}>
            <Spotlight className="h-full overflow-hidden rounded-2xl border border-white/5 bg-surface-container-low p-5 transition-colors hover:border-lime/30 md:p-6">
              <div className="mb-2 text-headline-xl-mobile text-lime md:text-headline-xl"><CountUp to={s.n} suffix={s.suffix} /></div>
              <div className="mb-1 text-headline-sm text-on-surface">{s.unit}</div>
              <p className="text-body-sm text-secondary">{s.note}</p>
            </Spotlight>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ---------------- WHY ---------------- */
const ICONS = { sanitizer: SprayCan, dumbbell: Dumbbell, users: Users, smile: Smile };

export function Why() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const cardY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  return (
    <section className="bg-surface-container-lowest py-section">
      <div className="wrap grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col lg:col-span-6">
          <Reveal><span className="eyebrow">Built for results</span></Reveal>
          <h2 className="section-title mb-6"><Words text="Built for people done waiting for Monday" highlight="Monday" /></h2>
          <Reveal delay={0.1}><p className="mb-10 text-body-lg text-secondary">A serious training space in the heart of Akota. No gimmicks, zero fluff, just good coaching and results that last.</p></Reveal>
          <motion.div className="space-y-4" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={stagger(0.1)}>
            {FEATURES.map((f) => {
              const I = ICONS[f.icon];
              return (
                <motion.div key={f.title} variants={{ hidden: { opacity: 0, x: -30 }, show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } } }}
                  whileHover={{ x: 6 }} className="flex items-start gap-4 rounded-xl border border-white/5 bg-surface-container p-4 transition-colors hover:border-lime/30">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-lime/20 bg-surface-container-highest">
                    <I className="text-lime" size={22} aria-hidden />
                  </div>
                  <div>
                    <h3 className="mb-1 text-headline-sm text-on-surface">{f.title}</h3>
                    <p className="text-body-md text-secondary">{f.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <div ref={ref} className="relative flex flex-col items-center lg:col-span-6">
          <motion.div
            initial={{ clipPath: "inset(100% 0 0 0 round 16px)" }}
            whileInView={{ clipPath: "inset(0% 0 0 0 round 16px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
            className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)]"
          >
            <motion.div style={{ y: imgY }} className="absolute -inset-y-[10%] inset-x-0">
              <Photo k="why" alt="Coach guiding a member through a barbell squat" sizes="(min-width:1024px) 448px, 100vw" className="h-full w-full" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent" />
          </motion.div>
          <motion.div style={{ y: cardY }} className="relative -mt-16 w-4/5 max-w-xs lg:-mt-24 lg:-ml-20">
            <Reveal delay={0.4} className="rounded-xl border border-lime/40 bg-surface-container-high/90 p-4 shadow-[0_20px_40px_rgba(0,0,0,0.9)] backdrop-blur-xl">
              <div className="mb-3 flex items-center gap-3">
                <BadgeCheck className="text-lime" size={22} aria-hidden />
                <span className="text-label-md text-on-surface">100% coach accountability</span>
              </div>
              <p className="text-body-sm text-secondary">Every session logged, reviewed and adjusted toward your goals.</p>
            </Reveal>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PROGRAMS ---------------- */
export function Programs() {
  return (
    <section id="programs" className="bg-surface py-section">
      <div className="wrap">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal><span className="eyebrow">Specialized disciplines</span></Reveal>
            <h2 className="section-title"><Words text="Structured Programs" /></h2>
          </div>
          <Reveal delay={0.1}><p className="max-w-md text-body-md text-secondary">Each program is rooted in sports science, built for raw power, cardio resilience and mobility that lasts.</p></Reveal>
        </div>
        <motion.div
          className="no-scrollbar -mx-margin-mobile flex snap-x snap-mandatory gap-5 overflow-x-auto px-margin-mobile pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-5"
          initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={stagger(0.09)}
        >
          {PROGRAMS.map((p) => (
            <motion.article key={p.title} variants={rise} className="w-[78%] shrink-0 snap-start sm:w-[46%] md:w-auto">
              <Tilt className="h-full">
                <Spotlight className="card flex h-full flex-col overflow-hidden p-6 hover:border-lime/50">
                  <div className="flex h-full flex-col">
                    <div className="relative mb-6 h-44 w-full overflow-hidden rounded-xl">
                      <Photo k={p.img} alt={`${p.title} program`} sizes="(min-width:1024px) 240px, (min-width:768px) 33vw, 80vw" className="h-full w-full" imgClassName="group-hover:scale-110!" />
                      <span className="absolute top-3 left-3 rounded-full bg-lime px-3 py-1 text-label-sm uppercase tracking-wide text-on-lime">{p.tag}</span>
                    </div>
                    <h3 className="mb-2 text-headline-sm text-on-surface">{p.title}</h3>
                    <p className="mb-6 flex-grow text-body-sm text-secondary">{p.text}</p>
                    <a href={wa(`Hi! I want to know more about ${p.title}.`)} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex min-h-11 items-center gap-2 text-label-md text-lime transition-colors hover:text-white">
                      Ask about it <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </Spotlight>
              </Tilt>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- METHOD ---------------- */
export function Method() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  return (
    <section className="bg-surface-container-lowest py-section">
      <div className="wrap">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Reveal><span className="eyebrow">Systematic progression</span></Reveal>
          <h2 className="section-title mb-4"><Words text="The Method" /></h2>
          <Reveal delay={0.1}><p className="text-body-md text-secondary">Four disciplined phases that take you from your baseline to your peak.</p></Reveal>
        </div>
        <div ref={ref} className="relative grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="absolute top-[52px] right-8 left-8 hidden h-0.5 bg-white/10 lg:block" aria-hidden>
            <motion.div style={{ scaleX: scrollYProgress }} className="h-full origin-left bg-gradient-to-r from-lime/30 via-lime to-lime shadow-[0_0_12px_#bff520]" />
          </div>
          {METHOD.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.12} className="relative z-10">
              <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="card flex h-full flex-col p-6 hover:border-lime/40">
                <motion.div
                  initial={{ scale: 0, rotate: -90 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.15, type: "spring", stiffness: 260, damping: 18 }}
                  className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-lime bg-surface-container-highest text-headline-sm text-lime"
                >
                  0{i + 1}
                </motion.div>
                <h3 className="mb-2 text-headline-sm text-on-surface">{m.title}</h3>
                <p className="text-body-sm text-secondary">{m.text}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- STATEMENT ---------------- */
export function Statement() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.88, 1]);
  return (
    <section ref={ref} className="relative flex h-[600px] items-center justify-center overflow-hidden">
      <motion.div style={{ y }} className="absolute -inset-y-[25%] inset-x-0 z-0">
        <Photo k="statement" alt="Boxer striking a heavy bag" className="h-full w-full" />
        <div className="absolute inset-0 bg-surface/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-surface" />
      </motion.div>
      <motion.div style={{ scale }} className="wrap relative z-10 text-center">
        <Reveal><span className="eyebrow mb-4! tracking-widest">The uncompromising standard</span></Reveal>
        <h2 className="mb-8 text-headline-xl-mobile text-on-surface md:text-headline-xl lg:text-display-hero">
          <Words text="Sweat today." />
          <br className="hidden sm:inline" />{" "}
          <span><Words text="Strong forever." highlight="Strong forever." delay={0.2} /></span>
        </h2>
        <Reveal delay={0.4}><Magnetic><a href="#trial" className="btn-lime hover:scale-105">Experience the energy</a></Magnetic></Reveal>
      </motion.div>
    </section>
  );
}

/* ---------------- COACHES ---------------- */
export function Coaches() {
  return (
    <section id="coaches" className="bg-surface py-section">
      <div className="wrap">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Reveal><span className="eyebrow">Pedigree &amp; practice</span></Reveal>
          <h2 className="section-title mb-4"><Words text="Master Coaches" /></h2>
          <Reveal delay={0.1}><p className="text-body-md text-secondary">Certified specialists who live the discipline. Every movement is checked, every rep counts.</p></Reveal>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {COACHES.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.12}>
              <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 260, damping: 20 }} className="card group flex flex-col overflow-hidden hover:border-lime/40">
                <motion.div
                  initial={{ clipPath: "inset(0 0 100% 0)" }} whileInView={{ clipPath: "inset(0 0 0% 0)" }} viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 1.2, delay: i * 0.12, ease: [0.76, 0, 0.24, 1] }}
                  className="relative h-96 w-full overflow-hidden"
                >
                  <Photo k={c.img} alt={`Portrait of coach ${c.name}`} sizes="(min-width:768px) 33vw, 100vw" className="h-full w-full" imgClassName="group-hover:scale-105!" />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent" />
                </motion.div>
                <div className="relative z-10 -mt-8 p-6">
                  <span className="mb-3 inline-block rounded-full border border-white/10 bg-surface-container-highest px-3 py-1 text-label-sm text-lime">{c.badge}</span>
                  <h3 className="mb-1 text-headline-md text-on-surface">{c.name}</h3>
                  <p className="text-body-sm text-secondary">{c.role}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
