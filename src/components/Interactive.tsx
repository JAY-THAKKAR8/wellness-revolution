"use client";

import { useMemo, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, XCircle, CalendarX, Check, ChevronDown } from "lucide-react";
import { PLANS, PERIODS, SCHEDULE, DAYS, DISCIPLINES, wa, type Period, type Day, type Discipline } from "@/data/site";
import { Photo, Reveal, Words, LiveNumber, Spotlight, EASE } from "./motion";

/* ---------------- BMI ---------------- */
function bmiInfo(b: number) {
  if (b < 18.5) return { label: "Underweight", color: "#5ec8ff", text: "Your mass suggests a focus on calorie surplus and muscle gain. Our Iron Foundation program is built for lean mass." };
  if (b < 25) return { label: "Healthy Weight", color: "#bff520", text: "Your mass is well-balanced. To build lean muscle and core strength, start with our Iron Foundation program." };
  if (b < 30) return { label: "Overweight", color: "#ffb020", text: "Target fat loss and cardio output with Burn Protocol plus a personal nutrition plan." };
  return { label: "High Body Mass", color: "#ff6b5e", text: "We recommend a full body assessment and a low-impact strength plan that protects your joints." };
}

export function BMI() {
  const [h, setH] = useState(175);
  const [w, setW] = useState(72);
  const bmi = w / (h / 100) ** 2;
  const info = bmiInfo(bmi);
  const pct = Math.min(Math.max(((bmi - 15) / 20) * 100, 4), 100);
  return (
    <section className="bg-surface-container-lowest py-section">
      <div className="wrap grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <div className="flex flex-col lg:col-span-7">
          <Reveal><span className="eyebrow">Your baseline</span></Reveal>
          <h2 className="section-title mb-4"><Words text="Calculate Your BMI" highlight="BMI" /></h2>
          <Reveal delay={0.1}><p className="mb-8 text-body-md text-secondary">Get a quick read of your body mass ratio. On your trial day, a coach runs a full body composition check.</p></Reveal>
          <Reveal delay={0.2} className="space-y-8 rounded-2xl border border-white/5 bg-surface-container p-6 md:p-8">
            {[
              { id: "h", label: "Height", unit: "cm", v: h, set: setH, min: 140, max: 210 },
              { id: "w", label: "Weight", unit: "kg", v: w, set: setW, min: 40, max: 150 },
            ].map((s) => (
              <div key={s.id} className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label htmlFor={`range-${s.id}`} className="text-label-md text-on-surface">{s.label}</label>
                  <div className="text-headline-sm text-lime tabular-nums">{s.v} <span className="text-body-sm text-secondary">{s.unit}</span></div>
                </div>
                <input id={`range-${s.id}`} type="range" min={s.min} max={s.max} value={s.v} onChange={(e) => s.set(+e.target.value)} className="w-full" />
              </div>
            ))}
          </Reveal>
        </div>
        <div className="lg:col-span-5">
          <Reveal delay={0.2}>
            <div className="relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface-container-high/80 p-6 shadow-2xl backdrop-blur-2xl md:p-8">
              <motion.div aria-hidden className="absolute -top-20 -right-20 h-56 w-56 rounded-full blur-3xl" animate={{ backgroundColor: info.color, opacity: 0.18 }} transition={{ duration: 0.6 }} />
              <div className="relative mb-4 flex items-center justify-between">
                <span className="text-label-sm uppercase tracking-wider text-secondary">Calculated index</span>
                <AnimatePresence mode="wait">
                  <motion.span key={info.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    className="rounded-full px-3 py-1 text-label-sm" style={{ color: info.color, background: `${info.color}22` }}>
                    {info.label}
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="relative mb-6 flex items-baseline gap-3" aria-live="polite">
                <LiveNumber value={bmi} decimals={1} className="text-display-hero" />
                <span className="text-body-md text-secondary">Score</span>
              </div>
              <div className="relative mb-6 h-3 w-full overflow-hidden rounded-full bg-surface-container-highest">
                <motion.div className="h-full rounded-full" animate={{ width: `${pct}%`, backgroundColor: info.color }} transition={{ type: "spring", stiffness: 120, damping: 20 }} />
              </div>
              <AnimatePresence mode="wait">
                <motion.p key={info.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative mb-8 min-h-[54px] text-body-sm text-secondary">{info.text}</motion.p>
              </AnimatePresence>
              <a href={wa(`Hi! My BMI is ${bmi.toFixed(1)} (${info.label}). I want a plan.`)} target="_blank" rel="noopener noreferrer" className="btn-lime relative w-full">Get my plan</a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PRICING ---------------- */
export function Pricing() {
  const [period, setPeriod] = useState<Period>("monthly");
  const p = PERIODS.find((x) => x.id === period)!;
  const unit = period === "monthly" ? "/ month" : period === "quarterly" ? "/ quarter" : "/ year";
  return (
    <section id="pricing" className="bg-surface py-section">
      <div className="wrap">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Reveal><span className="eyebrow">Membership plans</span></Reveal>
          <h2 className="section-title mb-4"><Words text="Transparent Investment" /></h2>
          <Reveal delay={0.1}><p className="text-body-md text-secondary">No hidden lock-ins. Plans built around your ambition.</p></Reveal>
          <Reveal delay={0.2}>
            <div role="tablist" aria-label="Billing period" className="mt-8 inline-flex items-center rounded-full border border-white/10 bg-surface-container p-1.5">
              {PERIODS.map((x) => (
                <button key={x.id} role="tab" aria-selected={period === x.id} onClick={() => setPeriod(x.id)}
                  className={`relative min-h-10 rounded-full px-4 text-label-sm transition-colors sm:px-5 ${period === x.id ? "text-on-surface" : "text-secondary hover:text-on-surface"}`}>
                  {period === x.id && <motion.span layoutId="period" className="absolute inset-0 rounded-full bg-surface-container-highest" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                  <span className="relative">{x.label}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-3">
          {PLANS.map((pl, i) => {
            const price = Math.round((pl.monthly * p.months * (1 - p.discount)) / 10) * 10;
            return (
              <Reveal key={pl.name} delay={i * 0.12} className={pl.hot ? "lg:-translate-y-2" : ""}>
                <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 280, damping: 22 }} className="h-full">
                  <Spotlight className={`flex h-full flex-col rounded-2xl p-8 ${pl.hot ? "border-2 border-lime/80 bg-surface-container-high shadow-[0_0_32px_rgba(191,245,32,0.15)]" : "border border-white/10 bg-surface-container hover:border-white/20"}`}>
                    <div className="flex h-full flex-col">
                      {pl.hot && (
                        <motion.div animate={{ boxShadow: ["0 0 0 0 rgba(191,245,32,.5)", "0 0 0 10px rgba(191,245,32,0)"] }} transition={{ duration: 1.8, repeat: Infinity }}
                          className="absolute -top-11 left-1/2 -translate-x-1/2 rounded-full bg-lime px-4 py-1 text-label-sm uppercase tracking-wider text-on-lime">
                          Most popular
                        </motion.div>
                      )}
                      <span className={`mb-2 text-label-sm uppercase tracking-wider ${pl.hot ? "text-lime" : "text-secondary"}`}>{pl.kicker}</span>
                      <h3 className="mb-2 text-headline-md text-on-surface">{pl.name}</h3>
                      <div className="my-4 flex items-baseline gap-1 overflow-hidden">
                        <LiveNumber value={price} prefix="₹" className={`text-headline-xl-mobile md:text-headline-xl ${pl.hot ? "text-lime" : "text-on-surface"}`} />
                        <span className="text-body-sm whitespace-nowrap text-secondary">{unit}</span>
                      </div>
                      <p className="mb-6 text-body-sm text-secondary">{pl.text}</p>
                      <ul className="mb-8 flex-grow space-y-3">
                        {pl.perks.map(([t, on]) => (
                          <li key={t} className={`flex items-center gap-3 text-body-sm ${on ? "text-on-surface" : "text-secondary/60"}`}>
                            {on ? <CheckCircle2 size={18} className="shrink-0 text-lime" aria-hidden /> : <XCircle size={18} className="shrink-0 text-secondary/40" aria-hidden />}
                            <span>{t}{!on && <span className="sr-only"> (not included)</span>}</span>
                          </li>
                        ))}
                      </ul>
                      <a href={wa(`Hi! I want the ${pl.name} plan (${p.label}).`)} target="_blank" rel="noopener noreferrer"
                        className={pl.hot ? "btn-lime w-full" : "inline-flex h-12 w-full items-center justify-center rounded-full border border-white/20 text-label-md text-on-surface transition-colors hover:bg-white/10"}>
                        {pl.cta}
                      </a>
                    </div>
                  </Spotlight>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-6 text-center text-body-sm text-secondary/60">Sample prices. Edit in src/data/site.ts.</p>
      </div>
    </section>
  );
}

/* ---------------- SCHEDULE ---------------- */
export function Schedule() {
  const [day, setDay] = useState<Day>("Mon");
  const [disc, setDisc] = useState<Discipline | "all">("all");
  const rows = useMemo(() => SCHEDULE[day].filter((r) => disc === "all" || r.d === disc), [day, disc]);
  return (
    <section id="schedule" className="bg-surface-container-lowest py-section">
      <div className="wrap">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal><span className="eyebrow">Weekly cadence</span></Reveal>
            <h2 className="section-title"><Words text="Class Schedule" /></h2>
          </div>
          <Reveal delay={0.1}><p className="max-w-sm text-body-md text-secondary">Reserve your spot early. Classes are capped at 16 so coaches can give real feedback.</p></Reveal>
        </div>

        <Reveal>
          <div role="tablist" aria-label="Day" className="no-scrollbar mb-5 flex gap-2 overflow-x-auto border-b border-white/5 pb-4">
            {DAYS.map((d) => (
              <button key={d} role="tab" aria-selected={day === d} onClick={() => setDay(d)}
                className={`relative min-h-11 shrink-0 rounded-full border px-6 text-label-md transition-colors ${day === d ? "border-transparent text-on-lime" : "border-white/5 bg-surface-container text-secondary hover:border-white/20 hover:text-on-surface"}`}>
                {day === d && <motion.span layoutId="day" className="absolute inset-0 rounded-full bg-lime" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                <span className="relative">{d}</span>
              </button>
            ))}
          </div>
          <div className="no-scrollbar mb-8 flex items-center gap-2.5 overflow-x-auto pb-2" aria-label="Filter by discipline">
            {DISCIPLINES.map((x) => (
              <button key={x.id} aria-pressed={disc === x.id} onClick={() => setDisc(x.id)}
                className={`min-h-10 shrink-0 rounded-full px-5 text-label-md transition-all duration-200 ${disc === x.id ? "bg-lime text-on-lime shadow-[0_0_16px_rgba(191,245,32,0.25)]" : "border border-white/10 bg-surface-container text-secondary hover:border-white/30 hover:text-white"}`}>
                {x.label}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="space-y-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {rows.map((r, i) => (
              <motion.div
                layout key={day + r.t + r.title}
                initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0, transition: { delay: i * 0.05, duration: 0.5, ease: EASE } }}
                exit={{ opacity: 0, x: 24, transition: { duration: 0.2 } }}
                className="group flex flex-col justify-between gap-4 rounded-2xl border border-white/5 bg-surface-container p-5 transition-colors hover:border-lime/30 sm:flex-row sm:items-center"
              >
                <div className="flex items-center gap-4 sm:gap-6">
                  <span className="w-24 shrink-0 text-headline-sm text-lime tabular-nums whitespace-nowrap">{r.t}</span>
                  <div>
                    <h3 className="text-headline-sm text-on-surface">{r.title}</h3>
                    <p className="text-body-sm text-secondary">{r.sub}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 self-end sm:self-center">
                  <span className="rounded-full bg-surface-container-highest px-3 py-1 text-label-sm text-secondary">{r.tag}</span>
                  <a href={wa(`Hi! I want to book ${r.title} on ${day} at ${r.t}.`)} target="_blank" rel="noopener noreferrer" aria-label={`Book ${r.title} at ${r.t}`}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-container-highest transition-all duration-300 group-hover:bg-lime group-hover:text-on-lime">
                    <ArrowRight size={20} className="transition-transform duration-300 group-hover:-rotate-45" />
                  </a>
                </div>
              </motion.div>
            ))}
            {rows.length === 0 && (
              <motion.div key="empty" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-surface-container/50 px-6 py-12 text-center">
                <CalendarX className="mb-3 text-secondary" size={36} aria-hidden />
                <p className="mb-1 text-headline-sm text-on-surface">No classes scheduled</p>
                <p className="text-body-sm text-secondary">No sessions match this discipline on {day}. Pick &ldquo;All Disciplines&rdquo; or switch days.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- FREE TRIAL ---------------- */
export function Trial() {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    window.open(wa(`Hi! I want a FREE TRIAL.\nName: ${f.get("name")}\nPhone: ${f.get("phone")}\nGoal: ${f.get("goal")}\nTime: ${f.get("time")}`), "_blank", "noopener");
    setSent(true);
  };
  const field = "h-12 w-full rounded-xl border border-white/10 bg-surface-container-highest px-4 text-[16px] text-on-surface placeholder:text-secondary/50 transition-colors focus:border-lime focus:outline-none";
  return (
    <section id="trial" className="relative overflow-hidden bg-surface py-section">
      <div className="wrap">
        <Reveal className="relative overflow-hidden rounded-3xl border border-white/10 p-6 sm:p-8 md:p-16">
          <div className="absolute inset-0 z-0">
            <Photo k="trial" alt="" className="h-full w-full" />
            <div className="absolute inset-0 bg-surface-container-lowest/90 backdrop-blur-sm" />
            <motion.div aria-hidden className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-lime/10 blur-3xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 6, repeat: Infinity }} />
          </div>
          <div className="relative z-10 max-w-xl">
            <span className="eyebrow">Zero obligation</span>
            <h2 className="section-title mb-4"><Words text="Your first session is on us" highlight="on us" /></h2>
            <p className="mb-8 text-body-md text-secondary">Meet the coaches, try the equipment, feel the standard. Fill this in and we&rsquo;ll confirm your pass on WhatsApp.</p>
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div key="ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-start gap-4 rounded-2xl border border-lime/30 bg-surface-container/80 p-6" role="status">
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.1 }} className="grid h-12 w-12 place-items-center rounded-full bg-lime text-on-lime"><Check /></motion.span>
                  <p className="text-headline-sm">WhatsApp opened with your details.</p>
                  <p className="text-body-sm text-secondary">Send the message and our desk will confirm your slot.</p>
                  <button onClick={() => setSent(false)} className="text-label-md text-lime underline-offset-4 hover:underline">Edit details</button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} className="space-y-4" exit={{ opacity: 0, y: -10 }}>
                  <div>
                    <label htmlFor="trial-name" className="mb-1.5 block text-label-sm text-secondary">Full name</label>
                    <input id="trial-name" name="name" required autoComplete="name" placeholder="e.g. Vikram Malhotra" className={field} />
                  </div>
                  <div>
                    <label htmlFor="trial-phone" className="mb-1.5 block text-label-sm text-secondary">Phone number (+91)</label>
                    <input id="trial-phone" name="phone" type="tel" inputMode="tel" required autoComplete="tel" pattern="[0-9+ ]{10,15}" placeholder="98250 XXXXX" className={field} />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="trial-goal" className="mb-1.5 block text-label-sm text-secondary">Primary goal</label>
                      <div className="relative">
                        <select id="trial-goal" name="goal" className={`${field} appearance-none pr-10`}><option>Muscle Gain</option><option>Fat Loss</option><option>Endurance</option><option>General Fitness</option></select>
                        <ChevronDown size={18} className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-secondary" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="trial-time" className="mb-1.5 block text-label-sm text-secondary">Preferred time</label>
                      <div className="relative">
                        <select id="trial-time" name="time" className={`${field} appearance-none pr-10`}><option>Morning (6–10 AM)</option><option>Afternoon (12–4 PM)</option><option>Evening (5–10 PM)</option></select>
                        <ChevronDown size={18} className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-secondary" />
                      </div>
                    </div>
                  </div>
                  <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }} type="submit" className="btn-lime mt-4 w-full">Book free trial <ArrowRight size={18} /></motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
