import { useRef, useState } from "react";
import { roles, videoSource } from "../../data/portfolio";
import { useGsapContext } from "../../hooks/useGsapContext";
import { useRoleCycle } from "../../hooks/useRoleCycle";
import { SECTION_IDS } from "../../lib/constants";
import { gsap } from "../../lib/animation";
import { HlsVideo } from "../layout/HlsVideo";
import { Button } from "../ui/Button";

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const clarityPhrase = "Designing clarity from complexity.";
const messyPhrase = "XQ7 / 4R9N :: V3LTA-09 // KRYPT";

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const roleIndex = useRoleCycle(roles.length, 2000);
  const [isPhraseLocked, setIsPhraseLocked] = useState(false);

  useGsapContext(sectionRef, () => {
    const revealTargets = [
      ".hero-name-reveal",
      ".hero-role-reveal",
      ".hero-phrase-reveal",
      ".hero-cta-reveal",
      ".hero-scroll-reveal",
    ];
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      gsap.set([".hero-video-reveal", ...revealTargets], {
        opacity: 1,
        filter: "none",
      });
      return;
    }

    const timeline = gsap.timeline({
      defaults: { ease: "power3.out" },
      delay: 0.08,
    });

    timeline.fromTo(
      ".hero-video-reveal",
      { opacity: 0, scale: 1.06 },
      { opacity: 0.58, scale: 1, duration: 1.4, clearProps: "transform" },
      0,
    );

    timeline.fromTo(
      ".hero-name-reveal",
      { opacity: 0, y: 56, scale: 0.98, filter: "blur(14px)" },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.15,
        clearProps: "transform,filter",
      },
      0.28,
    );

    timeline.fromTo(
      ".hero-role-reveal",
      { opacity: 0, y: 22, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.78,
        clearProps: "transform,filter",
      },
      0.68,
    );

    timeline.fromTo(
      ".hero-phrase-reveal",
      { opacity: 0, y: 26, scaleX: 0.86, filter: "blur(13px)" },
      {
        opacity: 1,
        y: 0,
        scaleX: 1,
        filter: "blur(0px)",
        duration: 0.88,
        clearProps: "transform,filter",
      },
      0.92,
    );

    timeline.fromTo(
      ".hero-cta-reveal",
      { opacity: 0, y: 24, scale: 0.96, filter: "blur(8px)" },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.72,
        stagger: 0.08,
        clearProps: "transform,filter",
      },
      1.22,
    );

    timeline.fromTo(
      ".hero-scroll-reveal",
      { opacity: 0, y: 18, filter: "blur(6px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.72,
        clearProps: "transform,filter",
      },
      1.62,
    );

    timeline.fromTo(
      ".hero-scroll-line",
      { scaleY: 0, transformOrigin: "top center" },
      { scaleY: 1, duration: 0.64, clearProps: "transform,transformOrigin" },
      1.76,
    );
  }, []);

  return (
    <section
      id={SECTION_IDS.home}
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-center"
    >
      <HlsVideo
        src={videoSource}
        className="hero-video-reveal opacity-[0.58]"
        overlayClassName="bg-black/40"
      />
      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-black via-bg/85 to-transparent" />
      <div className="relative z-10 mx-auto max-w-5xl">
        <h1 className="hero-name-reveal mb-6 font-display text-6xl italic leading-[0.9] tracking-tight text-text-primary md:text-8xl lg:text-9xl">
          Tobi Aro.
        </h1>
        <p className="hero-role-reveal mx-auto mb-5 text-lg text-text-primary/85 md:text-2xl">
          A{" "}
          <span
            key={roleIndex}
            className="inline-block animate-role-fade-in font-display italic text-text-primary"
          >
            {roles[roleIndex]}
          </span>{" "}
          in Orlando, FL.
        </p>
        <button
          type="button"
          className={`hero-phrase-reveal group relative mx-auto mb-12 block w-full max-w-3xl cursor-pointer overflow-hidden rounded-full px-3 py-2 leading-[1.04] text-text-primary outline-none transition-all duration-1000 ease-out ${
            isPhraseLocked ? "" : "hero-phrase-pulse"
          } ${
            isPhraseLocked
              ? "min-h-[4rem] text-[0.92rem] sm:text-lg md:min-h-[4.75rem] md:text-2xl lg:text-3xl"
              : "min-h-[6rem] text-xs md:min-h-[7rem] md:text-base"
          }`}
          aria-label={clarityPhrase}
          aria-pressed={isPhraseLocked}
          onClick={() => setIsPhraseLocked(true)}
          onTouchStart={() => setIsPhraseLocked(true)}
        >
          <span
            aria-hidden="true"
            className={`absolute left-1/2 top-1/2 h-20 w-[90%] -translate-x-1/2 -translate-y-1/2 scale-95 rounded-full opacity-0 blur-2xl transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100 group-focus-visible:scale-105 group-focus-visible:opacity-100 md:h-24 ${
              isPhraseLocked ? "opacity-0 group-hover:opacity-0 group-focus-visible:opacity-0" : ""
            }`}
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(137,170,204,0.28) 0%, rgba(137,170,204,0.16) 36%, rgba(137,170,204,0.07) 55%, transparent 74%)",
            }}
          />
          <span
            aria-hidden="true"
            className={`absolute inset-x-0 top-1/2 block -translate-y-1/2 select-none whitespace-normal px-3 font-body uppercase transition-all duration-700 ease-out group-focus-visible:text-white ${
              isPhraseLocked
                ? "translate-x-16 scale-[0.78] opacity-0 blur-[10px]"
                : "translate-x-[2px] scale-[1.025] opacity-95 blur-[2px] group-hover:text-white group-focus-visible:text-white"
            }`}
            style={{
              letterSpacing: isPhraseLocked ? "0.01em" : "0.34em",
              textShadow: isPhraseLocked
                ? "none"
                : "12px 0 rgba(137,170,204,0.34), -11px 0 rgba(255,255,255,0.16), 0 0 20px rgba(255,255,255,0.18), 0 8px rgba(255,255,255,0.08)",
              transform: `translateY(-50%) ${
                isPhraseLocked ? "translateX(64px) skewX(-28deg)" : "translateX(2px) skewX(-15deg)"
              }`,
            }}
          >
            {messyPhrase}
          </span>
          <span
            aria-hidden="true"
            className={`absolute inset-x-0 top-1/2 block -translate-y-1/2 select-none whitespace-normal px-3 font-body uppercase transition-all duration-700 ease-out ${
              isPhraseLocked
                ? "-translate-x-20 opacity-0 blur-[12px]"
                : "-translate-x-2 opacity-60 blur-[5px] group-hover:opacity-90 group-focus-visible:opacity-90"
            }`}
            style={{
              letterSpacing: isPhraseLocked ? "0.01em" : "0.28em",
              textShadow: isPhraseLocked
                ? "none"
                : "-14px 0 rgba(137,170,204,0.22), 9px 0 rgba(255,255,255,0.1)",
              transform: `translateY(-50%) ${
                isPhraseLocked ? "translateX(-80px) skewX(24deg)" : "translateX(-8px) skewX(11deg)"
              }`,
            }}
          >
            ZR-41 :: NOISE / 8X2 / AETHER
          </span>
          <span
            aria-hidden="true"
            className={`accent-gradient absolute left-1/2 top-1/2 h-px w-3/4 origin-center -translate-x-1/2 -translate-y-1/2 opacity-0 blur-sm ${
              isPhraseLocked ? "phrase-sweep" : ""
            }`}
          />
          <span
            aria-hidden="true"
            className={`relative block select-none whitespace-nowrap font-display italic transition-all duration-1000 ease-out ${
              isPhraseLocked
                ? "translate-y-0 scale-100 opacity-100 blur-0"
                : "translate-y-5 scale-[0.42] opacity-0 blur-[16px]"
            }`}
            style={{
              letterSpacing: isPhraseLocked ? "0em" : "0.28em",
              textShadow: isPhraseLocked
                ? "0 0 24px rgba(137,170,204,0.22), 0 10px 36px rgba(0,0,0,0.45)"
                : "none",
              transform: isPhraseLocked
                ? "translateY(0) scale(1) rotateX(0deg)"
                : "translateY(20px) scale(0.42) rotateX(64deg)",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {clarityPhrase}
          </span>
        </button>
        <div className="inline-flex flex-wrap justify-center gap-4">
          <Button
            href={`#${SECTION_IDS.work}`}
            className="hero-cta-reveal"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection(SECTION_IDS.work);
            }}
          >
            See Works
          </Button>
          <Button
            href={`#${SECTION_IDS.contact}`}
            variant="outline"
            className="hero-cta-reveal"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection(SECTION_IDS.contact);
            }}
          >
            Reach out...
          </Button>
        </div>
      </div>
      <div className="hero-scroll-reveal absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted">
        <span>SCROLL</span>
        <span className="hero-scroll-line relative h-10 w-px overflow-hidden bg-stroke">
          <span className="accent-gradient absolute left-0 top-0 h-4 w-px animate-scroll-down" />
        </span>
      </div>
    </section>
  );
}
