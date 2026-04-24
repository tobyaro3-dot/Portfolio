import { useRef } from "react";
import { socials, videoSource } from "../../data/portfolio";
import { useGsapContext } from "../../hooks/useGsapContext";
import { SECTION_IDS } from "../../lib/constants";
import { gsap } from "../../lib/animation";
import { HlsVideo } from "../layout/HlsVideo";

export function ContactFooter() {
  const footerRef = useRef<HTMLElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  useGsapContext(footerRef, () => {
    if (!marqueeRef.current) {
      return;
    }

    gsap.to(marqueeRef.current, {
      xPercent: -50,
      duration: 40,
      ease: "none",
      repeat: -1,
    });
  }, []);

  return (
    <footer
      id={SECTION_IDS.contact}
      ref={footerRef}
      className="relative overflow-hidden bg-bg pt-16 md:pt-20"
    >
      <div className="absolute inset-0">
        <HlsVideo src={videoSource} flipped overlayClassName="bg-black/60" />
      </div>
      <div className="relative z-10 overflow-hidden py-8">
        <div
          ref={marqueeRef}
          className="flex w-max whitespace-nowrap font-display text-7xl italic leading-none text-text-primary/15 md:text-9xl"
        >
          {Array.from({ length: 20 }, (_, index) => (
            <span key={index} className="pr-8">
              BUILDING THE FUTURE •
            </span>
          ))}
        </div>
      </div>
      <div className="relative z-10 mx-auto flex max-w-[1200px] justify-center border-t border-white/10 px-6 py-8 text-sm text-muted md:py-10">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="transition-colors duration-300 hover:text-text-primary"
            >
              {social.label}
            </a>
          ))}
          <a
            href="/alex-aro-resume.png"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-text-primary transition duration-300 hover:scale-[1.02] hover:border-white/25 hover:bg-white/[0.06]"
          >
            Resume
          </a>
        </div>
      </div>
    </footer>
  );
}
