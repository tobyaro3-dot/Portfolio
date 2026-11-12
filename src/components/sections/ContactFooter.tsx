import { useRef } from "react";
import { socials, videoSource } from "../../data/portfolio";
import { SECTION_IDS } from "../../lib/constants";
import { HlsVideo } from "../layout/HlsVideo";

export function ContactFooter() {
  const footerRef = useRef<HTMLElement | null>(null);

  return (
    <footer
      id={SECTION_IDS.contact}
      ref={footerRef}
      className="relative overflow-hidden bg-bg pt-16 md:pt-20"
    >
      <div className="absolute inset-0">
        <HlsVideo src={videoSource} flipped overlayClassName="bg-black/60" />
      </div>
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 pb-12 text-center md:pb-16">
        <h2 className="font-display text-5xl italic leading-none text-text-primary md:text-7xl">
          Let&apos;s talk.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-text-primary/70 md:text-lg">
          I&apos;m looking for full-time work in UX, product design, and marketing automation, remote or in Orlando.
        </p>
      </div>
      <div className="relative z-10 mx-auto flex max-w-[1200px] justify-center border-t border-white/10 px-6 py-8 text-sm text-muted md:py-10">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center px-3 transition-colors duration-300 hover:text-text-primary"
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
