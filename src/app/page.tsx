import { MotionShell } from "@/components/motion";
import { Header, Preloader } from "@/components/Header";
import { Hero, Marquee, Stats, Why, Programs, Method, Statement, Coaches } from "@/components/Story";
import { BMI, Pricing, Schedule, Trial } from "@/components/Interactive";
import { Visit, Footer, WhatsAppFab } from "@/components/Footer";

export default function Home() {
  return (
    <MotionShell>
      <a href="#programs" className="fixed top-2 left-2 z-[90] -translate-y-20 rounded-full bg-lime px-4 py-2 text-label-md text-on-lime focus:translate-y-0">Skip to content</a>
      <Preloader />
      <Header />
      <main className="w-full">
        <Hero />
        <Marquee />
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
      <WhatsAppFab />
    </MotionShell>
  );
}
