"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import { motion, MotionConfig, animate, useInView, useMotionValue, useSpring, useMotionTemplate, type Variants } from "framer-motion";
import Lenis from "lenis";
import Image from "next/image";
import { IMG, type ImgKey } from "@/data/images";

export const EASE = [0.16, 1, 0.3, 1] as const;

/* App-wide: smooth scroll + respect reduced motion */
export function MotionShell({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4) });
    let id = requestAnimationFrame(function raf(t) { lenis.raf(t); id = requestAnimationFrame(raf); });
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      const href = a?.getAttribute("href");
      if (!href) return;
      e.preventDefault();
      if (href === "#" || href === "#top") lenis.scrollTo(0);
      else { const el = document.querySelector(href); if (el) lenis.scrollTo(el as HTMLElement, { offset: -64 }); }
    };
    document.addEventListener("click", onClick);
    return () => { cancelAnimationFrame(id); lenis.destroy(); document.removeEventListener("click", onClick); };
  }, []);
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/* HD photo from public/images (static, optimized by next/image) */
export function Photo({ k, alt, className = "", imgClassName = "", eager, sizes = "100vw" }: { k: ImgKey; alt: string; className?: string; imgClassName?: string; eager?: boolean; sizes?: string }) {
  const [ok, setOk] = useState(false);
  const [missing, setMissing] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-[radial-gradient(120%_90%_at_30%_20%,#26300f,#151614_55%,#0e0e0e)] ${className}`}>
      {!missing && (
        <Image
          src={IMG[k]}
          alt={alt}
          fill
          sizes={sizes}
          quality={90}
          priority={eager}
          onLoad={() => setOk(true)}
          onError={() => setMissing(true)}
          className={`object-cover transition-[opacity,transform] duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] ${ok ? "opacity-100 scale-100" : "opacity-0 scale-105"} ${imgClassName}`}
        />
      )}
    </div>
  );
}

/* Fade + rise when scrolled into view */
export function Reveal({ children, delay = 0, y = 32, className, as = "div" }: { children: ReactNode; delay?: number; y?: number; className?: string; as?: "div" | "li" | "article" }) {
  const M = motion[as];
  return (
    <M className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.9, delay, ease: EASE }}>
      {children}
    </M>
  );
}

/* Stagger container */
export const stagger = (gap = 0.08, delay = 0): Variants => ({ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } });
export const rise: Variants = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } };

/* Headline: words slide up from a mask */
export function Words({ text, className = "", delay = 0, highlight }: { text: string; className?: string; delay?: number; highlight?: string }) {
  const words = text.split(" ");
  const hi = new Set(highlight?.split(" "));
  return (
    <motion.span className={`inline ${className}`} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} transition={{ staggerChildren: 0.06, delayChildren: delay }} aria-label={text} role="text">
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span
            className={`inline-block ${hi.has(w) ? "text-lime" : ""}`}
            variants={{ hidden: { y: "105%", opacity: 0 }, show: { y: "0%", opacity: 1, transition: { duration: 0.9, ease: EASE } } }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </motion.span>
  );
}

/* Count up when visible */
export function CountUp({ to, suffix = "", className = "" }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2, ease: EASE, onUpdate: (n) => setV(Math.round(n)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref} className={`tabular-nums ${className}`}>{v.toLocaleString("en-IN")}{suffix}</span>;
}

/* Animated number for live values (BMI, price) */
export function LiveNumber({ value, decimals = 0, prefix = "", className = "" }: { value: number; decimals?: number; prefix?: string; className?: string }) {
  const [v, setV] = useState(value);
  const last = useRef(value);
  useEffect(() => {
    const c = animate(last.current, value, { duration: 0.6, ease: EASE, onUpdate: setV });
    last.current = value;
    return () => c.stop();
  }, [value]);
  return <span className={`tabular-nums ${className}`}>{prefix}{decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString("en-IN")}</span>;
}

/* Card with a lime spotlight that follows the pointer */
export function Spotlight({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  const x = useMotionValue(-200), y = useMotionValue(-200);
  const bg = useMotionTemplate`radial-gradient(260px circle at ${x}px ${y}px, rgba(191,245,32,0.12), transparent 70%)`;
  return (
    <motion.div
      className={`group relative ${className}`}
      style={style}
      onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); x.set(e.clientX - r.left); y.set(e.clientY - r.top); }}
      onPointerLeave={() => { x.set(-200); y.set(-200); }}
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: bg }} />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}

/* Gentle 3D tilt */
export function Tilt({ children, className = "", max = 8 }: { children: ReactNode; className?: string; max?: number }) {
  const rx = useSpring(0, { stiffness: 160, damping: 16 }), ry = useSpring(0, { stiffness: 160, damping: 16 });
  return (
    <motion.div
      className={className}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2);
      }}
      onPointerLeave={() => { rx.set(0); ry.set(0); }}
    >
      {children}
    </motion.div>
  );
}

/* Button that leans toward the pointer */
export function Magnetic({ children, strength = 0.3, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const x = useSpring(0, { stiffness: 220, damping: 15 }), y = useSpring(0, { stiffness: 220, damping: 15 });
  return (
    <motion.div
      className={`inline-block ${className}`}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}
