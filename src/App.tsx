import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Cursor, Preloader, useLenis } from "./components/ui";
import { Nav, Hero, Band, Stats, Why, Programs, Method, Statement, Coaches, BMI, Pricing, Schedule, Trial, Visit, Footer, FloatWA } from "./components/Sections";

export default function App() {
  const [loading, setLoading] = useState(true);
  const done = useCallback(() => setLoading(false), []);
  useLenis();
  useEffect(() => {
    document.documentElement.style.overflow = loading ? "hidden" : "";
  }, [loading]);
  return (
    <>
      <a href="#programs" className="skip">Skip to content</a>
      <AnimatePresence>{loading && <Preloader onDone={done} />}</AnimatePresence>
      <Cursor />
      <div className="grain" aria-hidden />
      <Nav />
      <main>
        <Hero ready={!loading} />
        <Band />
        <Stats />
        <Why />
        <Programs />
        <Method />
        <Statement />
        <Coaches />
        <BMI />
        <Pricing />
        <Schedule />
        <Trial />
        <Visit />
      </main>
      <Footer />
      <FloatWA />
    </>
  );
}
