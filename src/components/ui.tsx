import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import { motion, useInView, useMotionValue, useSpring, animate, useReducedMotion } from "framer-motion";
import Lenis from "lenis";

/* Photo: try each HD source in order. If all fail, show brand gradient (never low-res). */
export function Photo({ src, alt, className, style, eager }: { src: string[]; alt: string; className?: string; style?: CSSProperties; eager?: boolean }) {
  const [i, setI] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const failed = i >= src.length;
  return (
    <div className={`photo ${loaded ? "is-loaded" : ""} ${className ?? ""}`} style={style}>
      {!failed && (
        <img
          src={src[i]}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => { setLoaded(false); setI((n) => n + 1); }}
        />
      )}
    </div>
  );
}

/* Smooth scroll */
export function useLenis() {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4) });
    let id = 0;
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const el = document.querySelector(a.getAttribute("href")!);
      if (el) { e.preventDefault(); lenis.scrollTo(el as HTMLElement, { offset: -70 }); }
    };
    document.addEventListener("click", onClick);
    return () => { cancelAnimationFrame(id); lenis.destroy(); document.removeEventListener("click", onClick); };
  }, [reduce]);
}

/* Reveal on scroll */
export function Reveal({ children, delay = 0, y = 40, className }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Split headline: each word slides up from a mask */
export function SplitText({ text, className, delay = 0, as = "h2" }: { text: string; className?: string; delay?: number; as?: "h1" | "h2" | "h3" }) {
  const Tag = motion[as];
  const words = text.split(" ");
  return (
    <Tag className={`split ${className ?? ""}`} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }} aria-label={text}>
      {words.map((w, i) => (
        <span className="split-mask" key={i} aria-hidden>
          <motion.span
            className="split-word"
            variants={{ hidden: { y: "110%", rotate: 4 }, show: { y: "0%", rotate: 0 } }}
            transition={{ duration: 0.9, delay: delay + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* Number that counts up when seen */
export function Counter({ to, suffix = "", duration = 2 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: (n) => setV(Math.round(n)) });
    return () => c.stop();
  }, [inView, to, duration]);
  return <span ref={ref} className="tnum">{v.toLocaleString("en-IN")}{suffix}</span>;
}

/* Button that leans toward the pointer */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 15 });
  const y = useSpring(0, { stiffness: 200, damping: 15 });
  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: "inline-block" }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

/* Custom cursor (desktop only) */
export function Cursor() {
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40 }), sy = useSpring(y, { stiffness: 500, damping: 40 });
  const [big, setBig] = useState(false);
  const [label, setLabel] = useState("");
  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX); y.set(e.clientY);
      const t = (e.target as HTMLElement).closest("a,button,[data-cursor]") as HTMLElement | null;
      setBig(!!t);
      setLabel(t?.dataset.cursor ?? "");
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);
  return (
    <motion.div className={`cursor ${big ? "big" : ""} ${label ? "lab" : ""}`} style={{ x: sx, y: sy }} aria-hidden>
      <span>{label}</span>
    </motion.div>
  );
}

/* Preloader: counter + slam word */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const c = animate(0, 100, { duration: 1.8, ease: [0.65, 0, 0.35, 1], onUpdate: (v) => setN(Math.round(v)), onComplete: () => setTimeout(onDone, 250) });
    return () => c.stop();
  }, [onDone]);
  return (
    <motion.div className="preloader" exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}>
      <div className="pre-word">
        {"REVOLUTION".split("").map((ch, i) => (
          <motion.span key={i} initial={{ y: "120%", opacity: 0 }} animate={{ y: "0%", opacity: 1 }} transition={{ delay: 0.05 * i, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            {ch}
          </motion.span>
        ))}
      </div>
      <div className="pre-bar"><motion.i style={{ scaleX: n / 100 }} /></div>
      <div className="pre-count tnum">{String(n).padStart(3, "0")}</div>
    </motion.div>
  );
}

/* Endless marquee */
export function Marquee({ items, reverse, className }: { items: string[]; reverse?: boolean; className?: string }) {
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className={`marquee ${className ?? ""}`} aria-hidden>
      <div className={`marquee-track ${reverse ? "rev" : ""}`}>
        {row.map((t, i) => (
          <span key={i}>{t}<svg viewBox="0 0 24 24" width="28" height="28"><path d="M12 2l2.6 7.4H22l-6 4.6 2.3 7.4L12 17l-6.3 4.4L8 14 2 9.4h7.4z" fill="currentColor" /></svg></span>
        ))}
      </div>
    </div>
  );
}
