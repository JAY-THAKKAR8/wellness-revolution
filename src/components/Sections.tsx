import { useRef, useState, useEffect, type FormEvent } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion";
import { ArrowUpRight, Menu, X, MapPin, Clock, Phone, Check, Dumbbell, Flame, ShieldCheck, Users, Sparkles, HeartPulse } from "lucide-react";
import { Photo, Reveal, SplitText, Counter, Magnetic, Marquee } from "./ui";
import { GYM, IMG, PROGRAMS, TRAINERS, PLANS, SCHEDULE } from "../data/site";

const wa = (msg: string) => `https://wa.me/${GYM.whatsapp}?text=${encodeURIComponent(msg)}`;

/* ---------------- NAV ---------------- */
export function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 40);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  const links = [["Programs", "#programs"], ["Coaches", "#coaches"], ["Pricing", "#pricing"], ["Schedule", "#schedule"], ["Visit", "#visit"]];
  return (
    <>
      <motion.div className="progress" style={{ scaleX: bar }} />
      <header className={`nav ${solid ? "solid" : ""}`}>
        <a href="#top" className="logo" aria-label="The Wellness Revolution home">
          <svg viewBox="0 0 40 40" width="34" height="34" aria-hidden><rect width="40" height="40" rx="10" fill="var(--lime)" /><path d="M8 26l7-11 5 8 4-5 8 8" stroke="#0a0a0a" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span>The Wellness<b>Revolution</b></span>
        </a>
        <nav className="nav-links" aria-label="Main">
          {links.map(([l, h]) => <a key={h} href={h}>{l}</a>)}
        </nav>
        <a className="btn btn-lime nav-cta" href="#trial">Free trial <ArrowUpRight size={18} /></a>
        <button className="burger" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" initial={{ clipPath: "circle(0% at 95% 4%)" }} animate={{ clipPath: "circle(150% at 95% 4%)" }} exit={{ clipPath: "circle(0% at 95% 4%)" }} transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}>
            {[...links, ["Free trial", "#trial"]].map(([l, h], i) => (
              <motion.a key={h} href={h} onClick={() => setOpen(false)} initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 + i * 0.06 }}>
                <small>0{i + 1}</small>{l}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------------- HERO ---------------- */
export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const yImg = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const yTxt = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const lines = ["THE WELLNESS", "REVOLUTION"];
  return (
    <section className="hero" id="top" ref={ref}>
      <motion.div className="hero-media" style={{ scale, y: yImg }} initial={{ clipPath: "inset(18% 12% 18% 12% round 32px)" }} animate={ready ? { clipPath: "inset(0% 0% 0% 0% round 0px)" } : {}} transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}>
        <Photo src={IMG.hero} alt="Athlete lifting a heavy barbell at The Wellness Revolution gym" eager />
      </motion.div>
      <div className="hero-shade" />
      <motion.div className="hero-inner" style={{ y: yTxt, opacity: fade }}>
        <motion.p className="hero-kicker" initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.9 }}>
          <span className="dot" /> Akota, Vadodara · Now open
        </motion.p>
        <h1 className="hero-title" aria-label="The Wellness Revolution">
          {lines.map((l, li) => (
            <span className="line" key={li} aria-hidden>
              {l.split(" ").map((word, wi) => (
                <span className="word" key={wi}>
                  {word.split("").map((ch, i) => (
                    <motion.span key={i} className={li === 1 ? "outline-lime" : ""} initial={{ y: "115%" }} animate={ready ? { y: "0%" } : {}} transition={{ delay: 0.5 + li * 0.15 + (wi * 4 + i) * 0.03, duration: 1, ease: [0.16, 1, 0.3, 1] }}>
                      {ch}
                    </motion.span>
                  ))}
                </span>
              ))}
            </span>
          ))}
        </h1>
        <motion.div className="hero-row" initial={{ opacity: 0, y: 30 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.3, duration: 0.8 }}>
          <p>Not a gym. A movement. Real coaches, serious equipment and a crew that shows up — so you do too.</p>
          <div className="hero-ctas">
            <Magnetic><a className="btn btn-lime btn-xl" href="#trial" data-cursor="GO">Claim free trial <ArrowUpRight /></a></Magnetic>
            <a className="btn btn-ghost btn-xl" href="#programs">Explore programs</a>
          </div>
        </motion.div>
      </motion.div>
      <a href="#trial" className="badge" aria-label="Book a free trial">
        <svg viewBox="0 0 200 200" aria-hidden>
          <defs><path id="c" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
          <text><textPath href="#c">FREE TRIAL • FREE TRIAL • FREE TRIAL • </textPath></text>
        </svg>
        <ArrowUpRight className="badge-arrow" size={40} />
      </a>
      <div className="scroll-cue" aria-hidden><span /></div>
    </section>
  );
}

/* ---------------- MARQUEE + STATS ---------------- */
export function Band() {
  return (
    <div className="band-wrap">
      <Marquee items={["STRENGTH", "HIIT", "BOXING", "YOGA", "CARDIO", "PERSONAL TRAINING", "NUTRITION"]} className="m-lime" />
      <Marquee items={["NO EXCUSES", "SHOW UP", "LIFT HEAVY", "MOVE BETTER", "FEEL ALIVE"]} reverse className="m-dark" />
    </div>
  );
}

export function Stats() {
  const s = [
    { n: 5000, suf: "+", l: "sq. ft. training floor" },
    { n: 60, suf: "+", l: "machines & stations" },
    { n: 25, suf: "+", l: "classes every week" },
    { n: 16, suf: " hrs", l: "open every weekday" },
  ];
  return (
    <section className="stats sec">
      <div className="wrap stats-grid">
        {s.map((x, i) => (
          <Reveal key={i} delay={i * 0.08} className="stat">
            <div className="stat-n"><Counter to={x.n} suffix={x.suf} /></div>
            <div className="stat-l">{x.l}</div>
          </Reveal>
        ))}
      </div>
      <p className="wrap fine">Figures are sample content — update in <code>Sections.tsx</code>.</p>
    </section>
  );
}

/* ---------------- WHY ---------------- */
export function Why() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["-5%", "15%"]);
  const items = [
    { i: <ShieldCheck />, t: "Clean & hygienic", d: "Wiped-down kit, fresh air, spotless showers. Every hour." },
    { i: <Dumbbell />, t: "Advanced machines", d: "Plate-loaded, cable and free weights for every muscle." },
    { i: <Users />, t: "Group + 1:1 training", d: "Train with the crew or a coach who knows your name." },
    { i: <HeartPulse />, t: "Supportive vibe", d: "Beginners welcome. No ego. Just progress." },
  ];
  return (
    <section className="why sec" ref={ref}>
      <div className="wrap why-grid">
        <div>
          <p className="eyebrow">Why the revolution</p>
          <SplitText text="Built for people who are done waiting for Monday." className="h2" />
          <div className="why-list">
            {items.map((x, i) => (
              <Reveal key={i} delay={i * 0.08} className="why-item">
                <span className="ico">{x.i}</span>
                <div><h3>{x.t}</h3><p>{x.d}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="why-pics">
          <motion.div style={{ y: y1 }} className="wp wp1"><Photo src={IMG.floor} alt="Training floor with strength machines" /></motion.div>
          <motion.div style={{ y: y2 }} className="wp wp2"><Photo src={IMG.group} alt="Group HIIT class with kettlebells" /></motion.div>
          <div className="why-sticker"><Sparkles size={18} /> Akota's high-energy gym</div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PROGRAMS: horizontal scroll pinned ---------------- */
export function Programs() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(PROGRAMS.length - 1) * 19 + 8}%`]);
  return (
    <section className="programs" id="programs" ref={ref} style={{ height: `${PROGRAMS.length * 70}vh` }}>
      <div className="programs-sticky">
        <div className="wrap programs-head">
          <div><p className="eyebrow">Programs</p><SplitText text="Pick your fight." className="h2" /></div>
          <p className="muted">Five ways to train. One goal: the strongest version of you. Scroll to explore →</p>
        </div>
        <motion.div className="programs-track" style={{ x }}>
          {PROGRAMS.map((p, i) => (
            <article className="pcard" key={p.title} data-cursor="VIEW">
              <Photo src={p.img} alt={`${p.title} — ${p.tag} program`} />
              <div className="pcard-shade" />
              <span className="pcard-num">{String(i + 1).padStart(2, "0")}</span>
              <div className="pcard-body">
                <span className="chip">{p.tag} · {p.lvl}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <a href={wa(`Hi! I want to know more about ${p.title} at ${GYM.name}.`)} target="_blank" rel="noreferrer" className="pcard-link">Ask about it <ArrowUpRight size={18} /></a>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- METHOD: path draws as you scroll ---------------- */
export function Method() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const steps = [
    { t: "Assess", d: "Body scan, posture check and goal talk on day one." },
    { t: "Plan", d: "Coach builds your training split and Indian diet plan." },
    { t: "Train", d: "Show up. Get coached. Log every rep." },
    { t: "Evolve", d: "Re-test every 4 weeks. Raise the bar." },
  ];
  return (
    <section className="method sec">
      <div className="wrap">
        <p className="eyebrow">The revolution method</p>
        <SplitText text="Four steps. Zero guesswork." className="h2" />
        <div className="method-grid" ref={ref}>
          <svg className="method-line" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden>
            <path d="M0,60 C150,0 250,120 400,60 S650,0 800,60 S950,120 1000,60" stroke="rgba(255,255,255,.12)" strokeWidth="3" fill="none" />
            <motion.path d="M0,60 C150,0 250,120 400,60 S650,0 800,60 S950,120 1000,60" stroke="var(--lime)" strokeWidth="4" fill="none" style={{ pathLength: scrollYProgress }} />
          </svg>
          {steps.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.12} className="step">
              <span className="step-n">0{i + 1}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- BIG IMAGE PARALLAX QUOTE ---------------- */
export function Statement() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const clip = useTransform(scrollYProgress, [0, 0.4], ["inset(12% 10% 12% 10% round 40px)", "inset(0% 0% 0% 0% round 0px)"]);
  return (
    <section className="statement" ref={ref}>
      <motion.div className="statement-media" style={{ clipPath: clip }}>
        <motion.div style={{ y, height: "130%", marginTop: "-15%" }}>
          <Photo src={IMG.boxer} alt="Boxer training on a heavy bag" />
        </motion.div>
      </motion.div>
      <div className="statement-text wrap">
        <SplitText text="Sweat today. Strong forever." className="mega" />
      </div>
    </section>
  );
}

/* ---------------- COACHES ---------------- */
export function Coaches() {
  return (
    <section className="coaches sec" id="coaches">
      <div className="wrap">
        <div className="sec-head">
          <div><p className="eyebrow">Coaches</p><SplitText text="Your corner team." className="h2" /></div>
          <p className="muted">Certified coaches who plan, push and track every session. Add real names and photos in <code>site.ts</code>.</p>
        </div>
        <div className="coach-grid">
          {TRAINERS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <TiltCard>
                <Photo src={t.img} alt={`${t.role} coach`} />
                <div className="coach-info"><h3>{t.name}</h3><p>{t.role}</p></div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TiltCard({ children }: { children: React.ReactNode }) {
  const rx = useSpring(0, { stiffness: 150, damping: 15 }), ry = useSpring(0, { stiffness: 150, damping: 15 });
  return (
    <motion.div
      className="coach"
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 14);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 14);
      }}
      onPointerLeave={() => { rx.set(0); ry.set(0); }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- BMI ---------------- */
export function BMI() {
  const [h, setH] = useState(170);
  const [w, setW] = useState(72);
  const bmi = w / (h / 100) ** 2;
  const zone = bmi < 18.5 ? { l: "Underweight", c: "#5ec8ff", tip: "Strength + calorie surplus plan." } : bmi < 23 ? { l: "Healthy", c: "var(--lime)", tip: "Keep it. Build muscle, stay lean." } : bmi < 27.5 ? { l: "Overweight", c: "#ffb020", tip: "HIIT + strength combo works great." } : { l: "Obese", c: "#ff4d4d", tip: "Start with coached low-impact plan." };
  const pos = Math.min(100, Math.max(0, ((bmi - 14) / (36 - 14)) * 100));
  return (
    <section className="bmi sec">
      <div className="wrap bmi-grid">
        <div>
          <p className="eyebrow">Quick check</p>
          <SplitText text="Know your number." className="h2" />
          <p className="muted">Drag the sliders. Uses Asian BMI cut-offs. A coach will do a full body scan on your trial day.</p>
          <label className="slider">
            <span>Height <b className="tnum">{h} cm</b></span>
            <input type="range" min={130} max={210} value={h} onChange={(e) => setH(+e.target.value)} aria-label="Height in centimetres" />
          </label>
          <label className="slider">
            <span>Weight <b className="tnum">{w} kg</b></span>
            <input type="range" min={35} max={160} value={w} onChange={(e) => setW(+e.target.value)} aria-label="Weight in kilograms" />
          </label>
        </div>
        <div className="bmi-card" aria-live="polite">
          <div className="bmi-num tnum" style={{ color: zone.c }}>{bmi.toFixed(1)}</div>
          <div className="bmi-zone">{zone.l}</div>
          <div className="bmi-scale"><motion.i animate={{ left: `${pos}%` }} transition={{ type: "spring", stiffness: 200, damping: 20 }} /></div>
          <div className="bmi-legend"><span>18.5</span><span>23</span><span>27.5</span></div>
          <p className="bmi-tip"><Flame size={18} /> {zone.tip}</p>
          <a className="btn btn-lime" href={wa(`Hi! My BMI is ${bmi.toFixed(1)} (${zone.l}). I want a plan at ${GYM.name}.`)} target="_blank" rel="noreferrer">Get my plan <ArrowUpRight size={18} /></a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PRICING ---------------- */
export function Pricing() {
  const [p, setP] = useState<"m" | "q" | "y">("q");
  const lab = { m: "Monthly", q: "Quarterly", y: "Yearly" };
  return (
    <section className="pricing sec" id="pricing">
      <div className="wrap">
        <div className="sec-head">
          <div><p className="eyebrow">Membership</p><SplitText text="Invest in you." className="h2" /></div>
          <div className="toggle" role="tablist" aria-label="Billing period">
            {(["m", "q", "y"] as const).map((k) => (
              <button key={k} role="tab" aria-selected={p === k} className={p === k ? "on" : ""} onClick={() => setP(k)}>
                {p === k && <motion.span layoutId="tog" className="tog-bg" />}
                <span>{lab[k]}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="plan-grid">
          {PLANS.map((pl, i) => (
            <Reveal key={pl.name} delay={i * 0.1}>
              <div className={`plan ${pl.hot ? "hot" : ""}`}>
                {pl.hot && <span className="plan-flag">Most popular</span>}
                <h3>{pl.name}</h3>
                <div className="price">
                  <span>₹</span>
                  <AnimatePresence mode="popLayout">
                    <motion.b key={p} className="tnum" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -30, opacity: 0 }}>
                      {pl.price[p].toLocaleString("en-IN")}
                    </motion.b>
                  </AnimatePresence>
                  <small>/{lab[p].toLowerCase().replace("ly", "")}</small>
                </div>
                <ul>{pl.perks.map((x) => <li key={x}><Check size={18} /> {x}</li>)}</ul>
                <a className={`btn ${pl.hot ? "btn-lime" : "btn-ghost"}`} href={wa(`Hi! I want the ${pl.name} plan (${lab[p]}) at ${GYM.name}.`)} target="_blank" rel="noreferrer">Join {pl.name} <ArrowUpRight size={18} /></a>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="fine">Sample prices — set real ones in <code>src/data/site.ts</code>.</p>
      </div>
    </section>
  );
}

/* ---------------- SCHEDULE ---------------- */
export function Schedule() {
  const days = Object.keys(SCHEDULE);
  const [d, setD] = useState(days[0]);
  return (
    <section className="schedule sec" id="schedule">
      <div className="wrap">
        <p className="eyebrow">Class schedule</p>
        <SplitText text="Find your slot." className="h2" />
        <div className="days" role="tablist" aria-label="Day">
          {days.map((x) => (
            <button key={x} role="tab" aria-selected={d === x} className={d === x ? "on" : ""} onClick={() => setD(x)}>{x}</button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.ul key={d} className="slots" initial="h" animate="s" exit="h" variants={{ s: { transition: { staggerChildren: 0.05 } } }}>
            {SCHEDULE[d].map((s) => (
              <motion.li key={s.t + s.c} variants={{ h: { opacity: 0, x: -30 }, s: { opacity: 1, x: 0 } }}>
                <span className="slot-t tnum">{s.t}</span>
                <span className="slot-c">{s.c}</span>
                <span className="slot-k">{s.coach}</span>
                <a href={wa(`Hi! I want to book ${s.c} on ${d} at ${s.t}.`)} target="_blank" rel="noreferrer" aria-label={`Book ${s.c} at ${s.t}`}><ArrowUpRight /></a>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ---------------- TRIAL FORM ---------------- */
export function Trial() {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const msg = `Hi! I want a FREE TRIAL at ${GYM.name}.\nName: ${f.get("name")}\nPhone: ${f.get("phone")}\nGoal: ${f.get("goal")}\nTime: ${f.get("time")}`;
    window.open(wa(msg), "_blank", "noopener");
    setSent(true);
  };
  return (
    <section className="trial sec" id="trial">
      <div className="trial-bg"><Photo src={IMG.floor} alt="" /></div>
      <div className="wrap trial-grid">
        <div>
          <p className="eyebrow">Free trial</p>
          <SplitText text="Your first session is on us." className="h2 big" />
          <p className="muted">Fill this in. We open WhatsApp with your details. A coach confirms your slot.</p>
        </div>
        <form className="form" onSubmit={submit}>
          <label>Full name<input name="name" required autoComplete="name" placeholder="Your name" /></label>
          <label>Phone<input name="phone" required type="tel" autoComplete="tel" inputMode="tel" pattern="[0-9+ ]{10,15}" placeholder="98xxxxxxxx" /></label>
          <label>Goal
            <select name="goal" defaultValue="Fat loss">
              <option>Fat loss</option><option>Muscle gain</option><option>Strength</option><option>General fitness</option><option>Boxing / HIIT</option>
            </select>
          </label>
          <label>Preferred time
            <select name="time" defaultValue="Morning">
              <option>Morning</option><option>Afternoon</option><option>Evening</option>
            </select>
          </label>
          <button className="btn btn-lime btn-xl" type="submit">{sent ? "Opened WhatsApp ✓" : "Book free trial"} <ArrowUpRight /></button>
        </form>
      </div>
    </section>
  );
}

/* ---------------- VISIT + FOOTER ---------------- */
export function Visit() {
  return (
    <section className="visit sec" id="visit">
      <div className="wrap visit-grid">
        <Reveal className="vcard">
          <MapPin /><h3>Find us</h3><p>{GYM.address}</p>
          <a href={GYM.mapUrl} target="_blank" rel="noreferrer" className="link">Open in Google Maps <ArrowUpRight size={16} /></a>
        </Reveal>
        <Reveal className="vcard" delay={0.1}>
          <Clock /><h3>Hours</h3>
          {GYM.hours.map((h) => <p key={h.d} className="row"><span>{h.d}</span><b className="tnum">{h.t}</b></p>)}
          <p className="fine">Sample hours — confirm and edit.</p>
        </Reveal>
        <Reveal className="vcard" delay={0.2}>
          <Phone /><h3>Talk to us</h3><p className="tnum">{GYM.phone}</p>
          <a href={wa(`Hi ${GYM.name}!`)} target="_blank" rel="noreferrer" className="link">Chat on WhatsApp <ArrowUpRight size={16} /></a>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap foot-top">
        <p>© {new Date().getFullYear()} {GYM.name}, {GYM.city}</p>
        <a href={GYM.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg></a>
        <a href="#top">Back to top ↑</a>
      </div>
      <div className="foot-mega" aria-hidden>REVOLUTION</div>
    </footer>
  );
}

export function FloatWA() {
  return (
    <a className="float-wa" href={wa(`Hi ${GYM.name}! I want to join.`)} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden><path fill="currentColor" d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3zm0 23.6c-2 0-4-.6-5.7-1.6l-.4-.2-3.9 1 1-3.8-.3-.4A10.6 10.6 0 1 1 16 26.6zm5.8-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1a8.7 8.7 0 0 1-4.3-3.8c-.3-.6.3-.5 1-1.7.1-.2 0-.4 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.2 3.2 1.3 3.4c.2.2 2.3 3.5 5.6 4.9 2.1.9 2.9 1 4 .8.6-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5l-.6-.4z"/></svg>
    </a>
  );
}
