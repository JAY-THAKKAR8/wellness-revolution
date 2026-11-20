"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring, animate } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAV } from "@/data/site";
import { EASE } from "./motion";

export function Logo({ small }: { small?: boolean }) {
  return (
    <svg viewBox="0 0 40 40" className={small ? "h-6 w-6" : "h-8 w-8"} aria-hidden>
      <rect width="40" height="40" rx="10" fill="#bff520" />
      <path d="M8 26l7-11 5 8 4-5 8 8" stroke="#151f00" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Lime curtain intro */
export function Preloader() {
  const [n, setN] = useState(0);
  const [show, setShow] = useState(true);
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    const c = animate(0, 100, {
      duration: 1.6, ease: [0.65, 0, 0.35, 1], onUpdate: (v) => setN(Math.round(v)),
      onComplete: () => setTimeout(() => { setShow(false); document.documentElement.style.overflow = ""; window.dispatchEvent(new Event("twr:ready")); }, 200),
    });
    return () => { c.stop(); document.documentElement.style.overflow = ""; };
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-surface-container-lowest"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, ease: EASE }} className="mb-6">
            <Logo />
          </motion.div>
          <div className="overflow-hidden">
            <motion.p initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ delay: 0.15, duration: 0.8, ease: EASE }} className="text-headline-md text-on-surface">
              The Wellness <span className="text-lime">Revolution</span>
            </motion.p>
          </div>
          <div className="mt-8 h-[2px] w-48 overflow-hidden rounded-full bg-white/10">
            <motion.div className="h-full origin-left bg-lime" style={{ scaleX: n / 100 }} />
          </div>
          <p className="mt-3 text-label-sm tabular-nums text-secondary">{n}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  // scroll-spy: highlight the section in view
  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.div className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-lime" style={{ scaleX: progress }} />
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ delay: 1.9, duration: 0.8, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50 bg-surface/80 shadow-[0_1px_12px_rgba(0,0,0,0.4)] backdrop-blur-2xl"
      >
        <div className="flex h-16 w-full items-center justify-between gap-4 px-margin-mobile md:px-margin-tablet lg:px-margin">
          <a href="#top" className="flex shrink-0 items-center gap-2" aria-label="The Wellness Revolution, back to top">
            <Logo />
            <span className="select-none text-headline-sm uppercase tracking-tight text-on-surface max-sm:text-[15px]">The Wellness Revolution</span>
          </a>
          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} aria-current={active === n.id ? "true" : undefined} className={`relative rounded-full px-4 py-1.5 text-label-md transition-colors ${active === n.id ? "text-on-surface" : "text-on-surface-variant hover:text-on-surface"}`}>
                {active === n.id && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-surface-container-highest" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-3">
            <a href="#trial" className="btn-lime h-10! px-6! max-sm:hidden">Free trial</a>
            <button onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open} className="grid h-11 w-11 place-items-center rounded-full border border-white/10 lg:hidden">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog" aria-modal="true" aria-label="Menu"
            className="fixed inset-0 z-[70] flex flex-col bg-surface-container-lowest/95 px-margin-mobile backdrop-blur-2xl"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
          >
            <div className="flex h-16 items-center justify-end">
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-11 w-11 place-items-center rounded-full border border-white/10"><X size={20} /></button>
            </div>
            <motion.nav className="mt-8 flex flex-col" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}>
              {[...NAV, { label: "Free trial", id: "trial" }].map((n) => (
                <motion.a
                  key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)}
                  variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
                  className="flex items-center justify-between border-b border-white/5 py-4 text-headline-xl-mobile"
                >
                  <span className={n.id === "trial" ? "text-lime" : ""}>{n.label}</span>
                  <ArrowUpRight className="text-secondary" />
                </motion.a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
