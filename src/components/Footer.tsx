"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, MessageCircle, ArrowUpRight, Phone } from "lucide-react";
import { GYM, NAV, PROGRAMS, wa } from "@/data/site";
import { Reveal, Words, Spotlight, EASE } from "./motion";
import { Logo } from "./Header";

export function Visit() {
  const cards = [
    {
      icon: MapPin, title: "Location",
      body: <p className="mb-6 flex-grow text-body-md text-secondary">{GYM.address}</p>,
      foot: <a href={GYM.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-label-md text-lime hover:underline">Open in Google Maps <ArrowUpRight size={16} /></a>,
    },
    {
      icon: Clock, title: "Hours of operation",
      body: (
        <div className="mb-6 flex-grow space-y-2 text-body-md text-secondary">
          <p><span className="font-semibold text-on-surface">Monday – Saturday</span><br />6:00 AM – 10:00 PM</p>
          <p><span className="font-semibold text-on-surface">Sunday</span><br />7:00 AM – 2:00 PM</p>
        </div>
      ),
      foot: <div className="flex items-center gap-1.5 text-label-sm text-lime"><span className="h-2 w-2 animate-pulse rounded-full bg-lime" /> Open 16 hours daily</div>,
    },
    {
      icon: MessageCircle, title: "Contact & concierge",
      body: <p className="mb-6 flex-grow text-body-md text-secondary">Talk directly with our front desk or book a personal tour.</p>,
      foot: <a href={wa("Hi! I'd like to book a tour of The Wellness Revolution.")} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-whatsapp px-6 text-label-md text-white shadow-[0_0_20px_rgba(37,211,102,0.25)] transition-opacity hover:opacity-90"><MessageCircle size={18} /> Chat on WhatsApp</a>,
    },
  ];
  return (
    <section id="visit" className="bg-surface-container-lowest py-section">
      <div className="wrap">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Reveal><span className="eyebrow">Facility location</span></Reveal>
          <h2 className="section-title mb-4"><Words text="Visit The Club" /></h2>
          <Reveal delay={0.1}><p className="text-body-md text-secondary">In the heart of Akota, Vadodara, beside the Mahindra showroom on Mujmahuda Road.</p></Reveal>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.12}>
              <Spotlight className="card flex h-full flex-col p-8 hover:border-lime/40">
                <div className="flex h-full flex-col">
                  <motion.div whileHover={{ rotate: -8, scale: 1.08 }} className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container-highest text-lime">
                    <c.icon size={24} aria-hidden />
                  </motion.div>
                  <h3 className="mb-2 text-headline-sm text-on-surface">{c.title}</h3>
                  {c.body}
                  {c.foot}
                </div>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-surface-container-lowest pt-16 pb-10">
      <div className="wrap">
        <div className="grid grid-cols-1 gap-12 border-b border-white/5 pb-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex max-w-sm flex-col gap-4 lg:col-span-1">
            <div className="flex items-center gap-2"><Logo small /><span className="text-headline-sm text-on-surface">The Wellness Revolution</span></div>
            <p className="text-body-sm text-on-surface-variant">Akota, Vadodara. Strength, conditioning and recovery for people who show up.</p>
            <div className="flex items-center gap-3">
              <a href={GYM.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-secondary transition-colors hover:border-lime/40 hover:text-lime">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
              </a>
              <a href={GYM.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-secondary transition-colors hover:border-lime/40 hover:text-lime">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="2" y="5" width="20" height="14" rx="4" /><path d="M10 9l5 3-5 3V9z" fill="currentColor" stroke="none" /></svg>
              </a>
              <a href={wa("Hi! I want to join The Wellness Revolution.")} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-secondary transition-colors hover:border-lime/40 hover:text-lime"><MessageCircle size={18} /></a>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-label-sm font-semibold tracking-wide text-on-surface uppercase">Explore</h3>
            <nav aria-label="Footer" className="flex flex-col gap-2">
              {NAV.map((n) => <a key={n.id} href={`#${n.id}`} className="min-h-11 w-fit content-center text-body-sm text-on-surface-variant transition-colors hover:text-lime">{n.label}</a>)}
            </nav>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-label-sm font-semibold tracking-wide text-on-surface uppercase">Programs</h3>
            <nav aria-label="Programs" className="flex flex-col gap-2">
              {PROGRAMS.map((p) => <a key={p.title} href="#programs" className="min-h-11 w-fit content-center text-body-sm text-on-surface-variant transition-colors hover:text-lime">{p.title}</a>)}
            </nav>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-label-sm font-semibold tracking-wide text-on-surface uppercase">Contact</h3>
            <a href={GYM.mapUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-start gap-2 text-body-sm text-on-surface-variant transition-colors hover:text-lime"><MapPin size={16} className="mt-0.5 shrink-0" /> {GYM.address}</a>
            <a href={wa("Hi! I'd like to know more about The Wellness Revolution.")} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-2 text-body-sm text-on-surface-variant transition-colors hover:text-lime"><Phone size={16} className="shrink-0" /> Chat on WhatsApp</a>
            <div className="flex items-center gap-2 text-body-sm text-on-surface-variant"><Clock size={16} className="shrink-0" /> 6:00 AM – 10:00 PM daily</div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between gap-4 pt-6 sm:flex-row sm:items-center">
          <p className="text-body-sm text-secondary">© 2026 The Wellness Revolution. All rights reserved.</p>
          <a href="#top" className="min-h-11 content-center text-label-sm text-secondary transition-colors hover:text-lime">Back to top ↑</a>
        </div>

        {/* Wordmark: SVG with textLength so it always fits the width — never cropped */}
        <motion.svg
          viewBox="0 0 1000 160" className="mt-10 block h-auto w-full select-none" aria-hidden
          initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
          whileInView={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.4, ease: EASE }}
        >
          <defs>
            <linearGradient id="wm" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#bff520" stopOpacity="0.18" />
              <motion.stop offset="0.5" stopColor="#bff520" animate={{ stopOpacity: [0.18, 0.55, 0.18] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
              <stop offset="1" stopColor="#bff520" stopOpacity="0.18" />
            </linearGradient>
          </defs>
          <text x="500" y="135" textAnchor="middle" textLength="990" lengthAdjust="spacingAndGlyphs" fontSize="168" fontWeight="700" letterSpacing="-4" fill="url(#wm)" style={{ fontFamily: "var(--font-sans)" }}>
            REVOLUTION
          </text>
        </motion.svg>
      </div>
    </footer>
  );
}

export function WhatsAppFab() {
  return (
    <motion.a
      href={wa("Hi! I want to join The Wellness Revolution.")} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 2.4, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08, rotate: -6 }} whileTap={{ scale: 0.92 }}
      className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_4px_24px_rgba(37,211,102,0.4)]"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-whatsapp opacity-30" />
      <svg viewBox="0 0 32 32" width="28" height="28" className="relative" aria-hidden><path fill="currentColor" d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3zm0 23.6c-2 0-4-.6-5.7-1.6l-.4-.2-3.9 1 1-3.8-.3-.4A10.6 10.6 0 1 1 16 26.6zm5.8-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1a8.7 8.7 0 0 1-4.3-3.8c-.3-.6.3-.5 1-1.7.1-.2 0-.4 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.2 3.2 1.3 3.4c.2.2 2.3 3.5 5.6 4.9 2.1.9 2.9 1 4 .8.6-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5l-.6-.4z" /></svg>
    </motion.a>
  );
}
