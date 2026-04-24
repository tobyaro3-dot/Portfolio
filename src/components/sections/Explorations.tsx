import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { ExplorationItem } from "../../data/portfolio";
import { explorations } from "../../data/portfolio";
import { useGsapContext } from "../../hooks/useGsapContext";
import { SECTION_IDS } from "../../lib/constants";
import { gsap } from "../../lib/animation";
import { GradientBorder } from "../layout/GradientBorder";
import { ExplorationCard } from "../ui/ExplorationCard";

export function Explorations() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const leftColumnRef = useRef<HTMLDivElement | null>(null);
  const rightColumnRef = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = useState<ExplorationItem | null>(null);

  const columns = useMemo(
    () => ({
      left: explorations.filter((item) => item.column === "left"),
      right: explorations.filter((item) => item.column === "right"),
    }),
    [],
  );

  useGsapContext(sectionRef, () => {
    if (!sectionRef.current || !contentRef.current) {
      return;
    }

    gsap.to(contentRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: contentRef.current,
        pinSpacing: false,
      },
    });

    if (leftColumnRef.current) {
      gsap.fromTo(
        leftColumnRef.current,
        { y: 140 },
        {
          y: -320,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );
    }

    if (rightColumnRef.current) {
      gsap.fromTo(
        rightColumnRef.current,
        { y: -80 },
        {
          y: 360,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );
    }
  }, []);

  return (
    <section
      id={SECTION_IDS.explorations}
      ref={sectionRef}
      className="relative min-h-[300vh] overflow-hidden bg-bg"
    >
      <div
        ref={contentRef}
        className="relative z-10 flex h-screen items-center justify-center px-6 text-center"
      >
        <div className="max-w-2xl">
          <p className="mb-5 text-xs uppercase tracking-[0.3em] text-muted">
            Portfolio Focus
          </p>
          <h2 className="text-5xl font-light leading-none tracking-tight text-text-primary md:text-7xl">
            Case{" "}
            <span className="font-display italic text-text-primary">
              studies
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-muted md:text-base">
            Systems-led UX work across intake flows, CRM workflows, service
            design, and interactive concepts built to reduce friction for real
            people.
          </p>
          <a href="#" className="mt-8 inline-flex">
            <GradientBorder innerClassName="items-center gap-2 bg-bg px-5 py-3 text-sm text-text-primary">
              View process <span aria-hidden="true">↗</span>
            </GradientBorder>
          </a>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 z-20 mx-auto grid max-w-[1400px] grid-cols-2 gap-12 px-6 pt-[15vh] md:gap-40 md:px-14">
        <div
          ref={leftColumnRef}
          className="flex flex-col items-end gap-28 md:gap-40"
        >
          {columns.left.map((item) => (
            <div className="pointer-events-auto" key={item.title}>
              <ExplorationCard item={item} onClick={setSelected} />
            </div>
          ))}
        </div>
        <div
          ref={rightColumnRef}
          className="mt-40 flex flex-col items-start gap-28 md:mt-64 md:gap-40"
        >
          {columns.right.map((item) => (
            <div className="pointer-events-auto" key={item.title}>
              <ExplorationCard item={item} onClick={setSelected} />
            </div>
          ))}
        </div>
      </div>
      {selected ? (
        <motion.button
          type="button"
          className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/80 p-6 backdrop-blur-xl"
          onClick={() => setSelected(null)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-label="Close exploration preview"
        >
          <motion.img
            src={selected.image}
            alt={selected.title}
            className="max-h-[82vh] w-full max-w-4xl rounded-3xl object-cover"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        </motion.button>
      ) : null}
    </section>
  );
}
