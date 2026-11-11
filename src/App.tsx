import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { AppAbandonmentCaseStudy } from "./components/sections/AppAbandonmentCaseStudy";
import { ContactFooter } from "./components/sections/ContactFooter";
import { Hero } from "./components/sections/Hero";
import { NationalLighthouseMuseumCaseStudy } from "./components/sections/NationalLighthouseMuseumCaseStudy";
import { SelectedWorks } from "./components/sections/SelectedWorks";
import { SolmateCaseStudy } from "./components/sections/SolmateCaseStudy";
import { TapCaseStudy } from "./components/sections/TapCaseStudy";
import { TisatoCaseStudy } from "./components/sections/TisatoCaseStudy";
import { TisatoCrmCaseStudy } from "./components/sections/TisatoCrmCaseStudy";
import { TradeTemprCaseStudy } from "./components/sections/TradeTemprCaseStudy";
import { SECTION_IDS } from "./lib/constants";

function LandingPage() {
  const returnTarget = useRef<string | null>(null);

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Retain the destination through StrictMode's effect replay.
    returnTarget.current ??= window.sessionStorage.getItem("portfolio-scroll-target");
    const scrollTarget = returnTarget.current;

    if (scrollTarget) {
      window.sessionStorage.removeItem("portfolio-scroll-target");
      window.history.replaceState(null, "", window.location.pathname);
      const frame = requestAnimationFrame(() => {
        document.getElementById(scrollTarget)?.scrollIntoView({ behavior: "instant" });
      });
      return () => cancelAnimationFrame(frame);
    }

    if (window.location.hash && window.location.hash !== `#${SECTION_IDS.home}`) {
      window.history.replaceState(null, "", window.location.pathname);
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <>
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Hero />
        <SelectedWorks />
        <ContactFooter />
      </motion.main>
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/work/tap" element={<TapCaseStudy />} />
      <Route path="/work/solmate" element={<SolmateCaseStudy />} />
      <Route path="/work/tisato" element={<TisatoCaseStudy />} />
      <Route path="/work/tisato-crm" element={<TisatoCrmCaseStudy />} />
      <Route
        path="/work/national-lighthouse-museum"
        element={<NationalLighthouseMuseumCaseStudy />}
      />
      <Route
        path="/work/why-people-stop-using-apps"
        element={<AppAbandonmentCaseStudy />}
      />
      <Route path="/work/tradetempr" element={<TradeTemprCaseStudy />} />
      <Route
        path="/work/trading-journal-behavioral-mirror"
        element={<Navigate to="/work/tradetempr" replace />}
      />
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
}
