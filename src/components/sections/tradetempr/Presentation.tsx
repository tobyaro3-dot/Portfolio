import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { captures } from "../../../data/tradetemprCaseStudy";

export function BackToWork() {
  return <Link to="/" onClick={() => window.sessionStorage.setItem("portfolio-scroll-target", "work")}
    className="tt-back fixed left-4 top-4 z-50 rounded-full border border-white/15 bg-[#0b1015]/90 px-4 py-3 text-xs uppercase tracking-[0.2em] text-text-primary/80 backdrop-blur-xl transition hover:-translate-y-0.5 hover:text-white md:left-6 md:top-6">← Back to work</Link>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-[11px] uppercase leading-6 tracking-[0.22em] text-[#a9c6e5]">{children}</p>;
}

// Adapted from the recovered case study's SectionShell and reveal motion.
export function Chapter({ id, number, title, children, prominent = false }: {
  id: string; number: string; title: string; children: ReactNode; prominent?: boolean;
}) {
  const reduced = useReducedMotion();
  return <section id={id} aria-labelledby={`${id}-title`} className={`tt-chapter relative scroll-mt-24 px-6 py-20 md:px-10 md:py-28 lg:px-16 ${prominent ? "tt-prominent" : ""}`}>
    <div className="mx-auto max-w-[1160px]">
      <motion.header initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="mb-10 grid gap-4 md:mb-14 md:grid-cols-[80px_1fr]">
        <span className="font-display text-4xl italic text-[#a9c6e5]/60" aria-hidden="true">{number}</span>
        <h2 id={`${id}-title`} className="max-w-[850px] font-display text-4xl italic leading-[1.06] md:text-6xl">{title}</h2>
      </motion.header>
      {children}
    </div>
  </section>;
}

export function Capture({ name, hero = false }: { name: keyof typeof captures; hero?: boolean }) {
  const capture = captures[name];
  const src = `/images/tradetempr/${capture.file}.webp`;
  return <figure className="tt-capture min-w-0">
    <a href={src} target="_blank" rel="noopener noreferrer" className="tt-image-link block overflow-hidden rounded-xl border border-white/15 bg-[#0b1015]" aria-label={`Open full-size ${capture.title} screenshot (new tab)`}>
      <img src={src} alt={capture.alt} width={capture.width} height={capture.height}
        loading={hero ? "eager" : "lazy"} fetchPriority={hero ? "high" : "auto"} decoding="async" className="block h-auto w-full" />
    </a>
    <figcaption className="mt-4 grid gap-1 text-xs leading-6 text-text-primary/65">
      <span>{capture.caption}</span>
      <span className="text-[10px] uppercase tracking-[0.12em] text-text-primary/45">Synthetic demo data · Open image for detail</span>
    </figcaption>
  </figure>;
}

export function Note({ children }: { children: ReactNode }) {
  return <p className="mt-8 border-l border-[#a9c6e5]/40 pl-5 text-sm leading-7 text-text-primary/65">{children}</p>;
}
