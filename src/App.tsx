import { useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { ContactFooter } from "./components/sections/ContactFooter";
import { Hero } from "./components/sections/Hero";
import { SelectedWorks } from "./components/sections/SelectedWorks";
import { SolmateCaseStudy } from "./components/sections/SolmateCaseStudy";
import { TapCaseStudy } from "./components/sections/TapCaseStudy";
import { TisatoCaseStudy } from "./components/sections/TisatoCaseStudy";
import { SECTION_IDS } from "./lib/constants";

function LandingPage() {
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const scrollTarget = window.sessionStorage.getItem("portfolio-scroll-target");

    if (scrollTarget) {
      window.sessionStorage.removeItem("portfolio-scroll-target");
      window.history.replaceState(null, "", window.location.pathname);
      requestAnimationFrame(() => {
        document.getElementById(scrollTarget)?.scrollIntoView();
      });
      return;
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
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
}
