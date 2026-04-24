import { useLayoutEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  tisatoGalleryItems,
  tisatoHero,
  tisatoInsight,
  tisatoOutcomes,
  tisatoReflection,
  tisatoWorkflow,
  type TisatoGalleryItem,
} from "../../data/tisatoCaseStudy";

const reveal = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const transition = { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const };

function BackToWork() {
  return (
    <Link
      to="/"
      onClick={() => window.sessionStorage.setItem("portfolio-scroll-target", "work")}
      className="fixed left-4 top-4 z-50 rounded-full border border-white/10 bg-black/50 px-4 py-2 text-xs uppercase tracking-[0.2em] text-text-primary/80 backdrop-blur-xl transition hover:border-[#8f78c6]/50 hover:text-text-primary md:left-6 md:top-6"
    >
      Back to work
    </Link>
  );
}

function AmbientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-0 h-[38rem] w-[58rem] -translate-x-1/2 rounded-full bg-[#241242]/70 blur-[120px]" />
      <div className="absolute -left-20 top-[18rem] h-[28rem] w-[34rem] rounded-full bg-[#5a3296]/16 blur-[120px]" />
      <div className="absolute right-0 top-[22rem] h-[32rem] w-[32rem] rounded-full bg-[#8f78c6]/14 blur-[120px]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_50%_18%,black,transparent_76%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.32)_54%,#0d0816_100%)]" />
    </div>
  );
}

function InteractionBeacon() {
  return (
    <button
      type="button"
      onClick={() => document.getElementById("tisato-gallery")?.scrollIntoView({ behavior: "smooth", block: "start" })}
      className="group relative mx-auto cursor-pointer overflow-hidden rounded-[1.5rem] border border-[#8f78c6]/35 bg-[linear-gradient(135deg,rgba(90,50,150,0.22),rgba(143,120,198,0.12)_45%,rgba(255,255,255,0.08))] px-7 py-4 text-center shadow-[0_0_32px_rgba(143,120,198,0.14)] backdrop-blur-xl transition duration-300 hover:scale-[1.03] hover:border-[#c7b6f3]/55 hover:shadow-[0_0_48px_rgba(143,120,198,0.18)]"
      aria-label="Click to interact with the TISATO gallery"
    >
      <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.08),transparent)] opacity-70 transition duration-500 group-hover:translate-x-6" />
      <span className="relative z-10 block">
        <span className="block text-[10px] uppercase tracking-[0.34em] text-[#8f78c6]">Case study gallery</span>
        <span className="mt-1 block font-display text-3xl italic leading-none text-[#f3ecff]">Click to interact</span>
      </span>
    </button>
  );
}

function TisatoHero() {
  const [visualOffset, setVisualOffset] = useState({ x: 0, y: 0 });
  const flowSteps = ["Intake", "Scheduling", "Confirmed", "Ride"];
  const flowNodePositions = [12, 38, 64, 86];

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 py-28 md:px-10 lg:px-16">
      <AmbientBackground />
      <div className="relative z-10 mx-auto grid w-full max-w-[1220px] items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
        <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.12 }}>
          <motion.p variants={reveal} className="text-xs uppercase tracking-[0.35em] text-[#8f78c6]">
            {tisatoHero.eyebrow}
          </motion.p>
          <motion.h1 variants={reveal} className="mt-5 max-w-4xl text-5xl font-light leading-[0.95] tracking-tight text-text-primary md:text-7xl lg:text-8xl">
            Clarity{" "}
            <span className="font-display italic text-text-primary">isn&apos;t optional</span>{" "}
            when people rely on the system.
          </motion.h1>
          <motion.p variants={reveal} className="mt-6 max-w-xl text-base leading-8 text-text-primary/65 md:text-lg">
            {tisatoHero.impact}
          </motion.p>
          <motion.button
            variants={reveal}
            type="button"
            onClick={() => document.getElementById("tisato-gallery")?.scrollIntoView({ behavior: "smooth" })}
            className="mt-10 rounded-full border border-[#8f78c6]/45 bg-[#8f78c6]/10 px-7 py-3.5 text-sm font-semibold text-text-primary shadow-[0_0_42px_rgba(143,120,198,0.16)] transition hover:scale-105 hover:bg-[#8f78c6]/18"
          >
            Start walkthrough
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.25 }}
          className="relative min-h-[470px]"
          onMouseMove={(event) => {
            const bounds = event.currentTarget.getBoundingClientRect();
            const px = (event.clientX - bounds.left) / bounds.width - 0.5;
            const py = (event.clientY - bounds.top) / bounds.height - 0.5;
            setVisualOffset({ x: px * 14, y: py * 12 });
          }}
          onMouseLeave={() => setVisualOffset({ x: 0, y: 0 })}
        >
          <div className="absolute inset-0 overflow-hidden rounded-[2.4rem]">
            <div className="absolute inset-x-[9%] top-[16%] h-px bg-[linear-gradient(90deg,transparent,rgba(143,120,198,0.05),rgba(143,120,198,0.08),rgba(143,120,198,0.05),transparent)] blur-[0.9px]" />
            <div className="absolute inset-x-[9%] top-[16%] h-px bg-[linear-gradient(90deg,transparent,rgba(199,182,243,0.04),transparent)]" />
            <motion.div
              aria-hidden="true"
              className="absolute top-[calc(16%-5px)] h-2.5 w-2.5 rounded-full bg-[#bca7ef]/32 blur-[1px]"
              animate={{ x: ["12%", "86%"], opacity: [0.14, 0.45] }}
              transition={{ duration: 5.2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
            />
            {flowSteps.map((step, index) => (
              <div
                key={step}
                className="absolute top-[16%] -translate-x-1/2"
                style={{ left: `${flowNodePositions[index]}%` }}
              >
                <div className="mx-auto h-2.5 w-2.5 rounded-full border border-[#8f78c6]/22 bg-[#160f24]/88 shadow-[0_0_14px_rgba(143,120,198,0.08)]" />
                <p className="mt-3 whitespace-nowrap text-[9px] uppercase tracking-[0.24em] text-[#c7b6f3]/22">
                  {step}
                </p>
              </div>
            ))}

            <div className="absolute left-[18%] top-[24%] h-[58%] w-[64%] rounded-full bg-[radial-gradient(circle_at_center,rgba(143,120,198,0.12),transparent_62%)] blur-[70px]" />
          </div>

          <motion.span
            aria-hidden="true"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.65 }}
            transition={{ duration: 0.7, delay: 0.34 }}
            className="absolute left-[12%] top-[16%] z-[1] h-[92px] w-px bg-[linear-gradient(180deg,rgba(143,120,198,0.18),transparent)] blur-[0.2px]"
          />
          <motion.span
            aria-hidden="true"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.65 }}
            transition={{ duration: 0.7, delay: 0.42 }}
            className="absolute left-[38%] top-[16%] z-[1] h-[126px] w-px bg-[linear-gradient(180deg,rgba(143,120,198,0.16),transparent)] blur-[0.2px]"
          />
          <motion.span
            aria-hidden="true"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.65 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="absolute left-[64%] top-[16%] z-[1] h-[82px] w-px bg-[linear-gradient(180deg,rgba(143,120,198,0.16),transparent)] blur-[0.2px]"
          />

          <motion.div
            initial={{ opacity: 0, x: 14, y: -10, rotate: -1.2 }}
            whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.65 }}
            transition={{ duration: 0.74, ease: [0.22, 1, 0.36, 1], delay: 0.24 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="absolute right-[4%] top-[10%] z-[3] w-[39%] rounded-[1.85rem] border border-white/7 bg-[#180f27]/68 p-4 shadow-[0_20px_56px_rgba(52,25,95,0.16)] backdrop-blur-[18px] transition-shadow duration-300 hover:shadow-[0_24px_72px_rgba(90,50,150,0.2)]"
            style={{ x: visualOffset.x * -0.4, y: visualOffset.y * -0.28 }}
          >
            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#8f78c6]/72">Confirmed</p>
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#bda7f0]/28 bg-[#8f78c6]/14 text-[#f3ecff] shadow-[0_0_20px_rgba(143,120,198,0.14)]">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m5 12 4.2 4.2L19 6.8" />
                </svg>
              </div>
            </div>
            <div className="mt-5 rounded-[1.4rem] border border-white/7 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(0,0,0,0.18))] p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-text-primary/42">Ride confirmed</p>
              <div className="mt-4 grid gap-3">
                <div className="rounded-[1rem] bg-white/[0.03] px-3 py-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-text-primary/38">Pickup window</p>
                  <p className="mt-1 text-sm text-text-primary/78">10:30 AM - 10:45 AM</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-[1rem] bg-white/[0.03] px-3 py-3">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-text-primary/38">Vehicle</p>
                    <p className="mt-1 text-sm text-text-primary/78">TIS-24</p>
                  </div>
                  <div className="rounded-[1rem] bg-white/[0.03] px-3 py-3">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-text-primary/38">Status</p>
                    <p className="mt-1 text-sm text-[#d8c8ff]">Sent</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -14, y: 12, rotate: 0.9 }}
            whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.65 }}
            transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1], delay: 0.34 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="absolute left-0 top-[18%] z-[4] w-[59%] rounded-[1.9rem] border border-white/8 bg-[#22153a]/78 p-4 shadow-[0_24px_70px_rgba(15,8,30,0.42)] backdrop-blur-[20px] transition-shadow duration-300 hover:shadow-[0_30px_86px_rgba(57,27,101,0.28)]"
            style={{ x: visualOffset.x * 0.65, y: visualOffset.y * 0.55 }}
          >
            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#8f78c6]/72">Intake</p>
              <span className="rounded-full border border-[#8f78c6]/22 bg-[#8f78c6]/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#d8c8ff]">
                Ready for scheduling
              </span>
            </div>
            <div className="mt-5 rounded-[1.5rem] border border-white/7 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(0,0,0,0.14))] p-4">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["Patient", "Mary E."],
                  ["Pickup", "Lake Baldwin"],
                  ["Facility", "AdventHealth"],
                  ["Appointment", "Dialysis"],
                ].map(([label, value], index) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: index % 2 === 0 ? 8 : -6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.52, delay: 0.4 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-[1rem] bg-white/[0.035] px-3 py-3"
                  >
                    <p className="text-[10px] uppercase tracking-[0.18em] text-text-primary/36">{label}</p>
                    <p className="mt-1 text-sm text-text-primary/78">{value}</p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-3 rounded-[1rem] bg-white/[0.035] px-3 py-3">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-text-primary/36">Checklist</p>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#bda7f0]">4 of 4 complete</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-white/8">
                  <div className="h-full w-full rounded-full bg-[linear-gradient(90deg,#8f78c6,#bda7f0)]" />
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}

function TisatoInsightPanel() {
  return (
    <section className="relative px-6 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1220px]">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.35em] text-muted">Core insight</p>
          <h2 className="mt-4 text-4xl font-light md:text-6xl">
            Align the service system and the way people experience it.
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={transition}
          className="rounded-[2rem] border border-[#8f78c6]/18 bg-[#180f27]/88 p-5 shadow-[0_24px_90px_rgba(90,50,150,0.12)] backdrop-blur-xl md:p-6"
        >
          {[
            ["Problem", tisatoInsight.problem],
            ["Design Move", tisatoInsight.designMove],
            ["Why It Matters", tisatoInsight.whyItMatters],
          ].map(([label, copy], index) => (
            <div key={label} className={index === 0 ? "" : "mt-5 border-t border-white/10 pt-5"}>
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#8f78c6]">{label}</p>
              <p className="mt-2 max-w-5xl text-sm leading-7 text-text-primary/75">{copy}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TisatoWorkflowStrip() {
  return (
    <section className="relative px-6 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1220px]">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-muted">Workflow</p>
          <h2 className="mx-auto mt-4 max-w-5xl text-4xl font-light leading-[1.04] md:text-6xl">
            Structure trust
            <br />
            into each part of the service.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-5">
          {tisatoWorkflow.map((step, index) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="flex h-full flex-col rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8f78c6]/12 text-sm font-semibold text-[#8f78c6]">
                {index + 1}
              </div>
              <h3 className="mt-4 text-xl text-text-primary">{step.label}</h3>
              <p className="mt-3 max-w-[18ch] text-sm leading-7 text-text-primary/65 md:max-w-none">{step.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryCard({
  item,
  onOpen,
}: {
  item: TisatoGalleryItem;
  onOpen: (item: TisatoGalleryItem) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] text-left shadow-2xl shadow-black/30 transition-transform duration-500 hover:scale-[1.02]"
      style={{ rotate: `${item.rotation}deg` }}
      aria-label={`Open ${item.title}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,17,29,0.04)_0%,rgba(6,17,29,0.08)_36%,rgba(6,17,29,0.72)_100%)]" />
      </div>
      <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.24em]">
        <span className="rounded-full border border-[#8f78c6]/30 bg-[#180f27]/72 px-3 py-1 text-[#efe8ff] backdrop-blur-md">
          {item.category}
        </span>
        <span className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-white/60 backdrop-blur-md">
          {item.track}
        </span>
      </div>
      <div className="absolute inset-x-4 bottom-4 rounded-[1.5rem] bg-[#180f27]/80 p-4 backdrop-blur-md">
        <h3 className="text-lg text-text-primary">{item.title}</h3>
        <p className="mt-2 text-sm leading-6 text-text-primary/65">{item.caption}</p>
      </div>
    </button>
  );
}

function TisatoGallerySection() {
  const [selected, setSelected] = useState<TisatoGalleryItem | null>(null);

  return (
    <section id="tisato-gallery" className="relative px-6 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1220px]">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-muted">Case study gallery</p>
          <h2 className="mx-auto mt-4 max-w-4xl text-4xl font-light md:text-6xl">
            What I designed across the system and the brand.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-text-primary/65 md:text-base">
            This work spanned operational structure, communication, identity, and digital touchpoints. For now, these are placeholders for the final project images and artifacts.
          </p>
        </div>

        <div className="mb-8 text-center">
          <InteractionBeacon />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {tisatoGalleryItems.map((item) => (
            <GalleryCard key={item.id} item={item} onOpen={setSelected} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected ? (
          <motion.button
            type="button"
            className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/82 p-6 backdrop-blur-xl"
            onClick={() => setSelected(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-label="Close TISATO image preview"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#180f27]"
            >
              <div className="grid md:grid-cols-[1.1fr_0.9fr]">
                <img src={selected.image} alt={selected.title} className="h-full max-h-[82vh] w-full object-cover" />
                <div className="flex flex-col justify-between p-6 text-left">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full border border-[#8f78c6]/35 bg-[#8f78c6]/10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[#efe8ff]">
                        {selected.category}
                      </span>
                      <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/55">
                        {selected.track}
                      </span>
                    </div>
                    <h3 className="mt-5 text-3xl font-light text-text-primary">{selected.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-text-primary/72">{selected.caption}</p>
                  </div>
                  <p className="mt-8 text-xs uppercase tracking-[0.24em] text-white/35">
                    Placeholder asset for final case-study media
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.button>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function TisatoOutcomes() {
  return (
    <section className="relative px-6 pb-20 pt-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1220px]">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-muted">Outcome</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-light md:text-6xl">
            Clearer operations and stronger confidence around the service.
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {tisatoOutcomes.map((outcome) => (
            <motion.div
              key={outcome.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55 }}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
            >
              <h3 className="text-xl text-text-primary">{outcome.title}</h3>
              <div className="mt-6 rounded-[1.4rem] border border-white/10 bg-[#14191f] p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">Before</p>
                <p className="mt-2 text-sm leading-7 text-text-primary/62">{outcome.before}</p>
              </div>
              <div className="mt-4 rounded-[1.4rem] border border-[#8f78c6]/18 bg-[#180f27] p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#8f78c6]">After</p>
                <p className="mt-2 text-sm leading-7 text-text-primary/78">{outcome.after}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TisatoReflection() {
  return (
    <section className="relative px-6 pb-28 pt-6 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[860px] rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-xl md:p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-muted">{tisatoReflection.heading}</p>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-text-primary/72 md:text-lg">
          {tisatoReflection.body}
        </p>
      </div>
    </section>
  );
}

export function TisatoCaseStudy() {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0d0816] text-text-primary">
      <AmbientBackground />
      <BackToWork />
      <TisatoHero />
      <TisatoInsightPanel />
      <TisatoWorkflowStrip />
      <TisatoGallerySection />
      <TisatoOutcomes />
      <TisatoReflection />
    </main>
  );
}
