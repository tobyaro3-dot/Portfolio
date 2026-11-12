import { useLayoutEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  crmArchitecture,
  crmGalleryItems,
  crmRules,
  crmHero,
  crmInsight,
  crmOutcomes,
  crmReflection,
  crmSafeguards,
  crmWorkflow,
  type CrmGalleryItem,
} from "../../data/tisatoCrmCaseStudy";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const transition = { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const };

const sampleDataNote = "Screens show sample data. Names, facilities, and numbers are fictional.";

function BackToWork() {
  return (
    <Link
      to="/"
      onClick={() => window.sessionStorage.setItem("portfolio-scroll-target", "work")}
      className="fixed left-4 top-4 z-50 rounded-full border border-white/10 bg-[linear-gradient(135deg,rgba(8,6,14,0.9),rgba(33,21,58,0.78))] px-4 py-2 text-xs uppercase tracking-[0.2em] text-text-primary/80 shadow-[0_18px_45px_rgba(0,0,0,0.22)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-[#8f78c6]/50 hover:text-text-primary hover:shadow-[0_18px_55px_rgba(90,50,150,0.2)] md:left-6 md:top-6"
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
      <div className="absolute inset-x-0 top-[14%] h-px bg-[linear-gradient(90deg,transparent,rgba(199,182,243,0.14),transparent)]" />
    </div>
  );
}

function InteractionBeacon() {
  return (
    <button
      type="button"
      onClick={() => document.getElementById("crm-gallery-grid")?.scrollIntoView({ behavior: "smooth", block: "start" })}
      className="group relative mx-auto cursor-pointer overflow-hidden rounded-[1.5rem] border border-[#8f78c6]/35 bg-[linear-gradient(135deg,rgba(90,50,150,0.22),rgba(143,120,198,0.12)_45%,rgba(255,255,255,0.08))] px-7 py-4 text-center shadow-[0_0_32px_rgba(143,120,198,0.14)] backdrop-blur-xl transition duration-300 hover:scale-[1.03] hover:border-[#c7b6f3]/55 hover:shadow-[0_0_48px_rgba(143,120,198,0.18)]"
      aria-label="Jump to the CRM screens"
    >
      <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.08),transparent)] opacity-70 transition duration-500 group-hover:translate-x-6" />
      <span className="relative z-10 block">
        <span className="block text-[10px] uppercase tracking-[0.34em] text-[#8f78c6]">Case study gallery</span>
        <span className="mt-1 block font-display text-3xl italic leading-none text-[#f3ecff]">Open the screens</span>
      </span>
    </button>
  );
}

function CrmHero() {
  const [visualOffset, setVisualOffset] = useState({ x: 0, y: 0 });
  const flowSteps = ["Capture", "Follow up", "Approved", "Booked"];
  const flowNodePositions = [12, 38, 64, 86];

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 py-28 md:px-10 lg:px-16">
      <AmbientBackground />
      <div className="relative z-10 mx-auto grid w-full max-w-[1220px] items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
        <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.12 }}>
          <motion.p variants={reveal} className="text-xs uppercase tracking-[0.35em] text-[#8f78c6]">
            {crmHero.eyebrow}
          </motion.p>
          <motion.h1 variants={reveal} className="mt-5 max-w-4xl text-5xl font-light leading-[0.95] tracking-tight text-text-primary md:text-7xl lg:text-8xl">
            Every partner gets a{" "}
            <span className="font-display italic text-text-primary">next step.</span>
          </motion.h1>
          <motion.p variants={reveal} className="mt-6 max-w-xl text-base leading-8 text-text-primary/65 md:text-lg">
            {crmHero.impact}
          </motion.p>
          <motion.dl variants={reveal} className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
            {crmHero.meta.map(([label, value]) => (
              <div key={label} className="rounded-[1.1rem] border border-white/8 bg-white/[0.03] px-4 py-3">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-[#8f78c6]">{label}</dt>
                <dd className="mt-1 text-sm leading-6 text-text-primary/75">{value}</dd>
              </div>
            ))}
          </motion.dl>
          <motion.button
            variants={reveal}
            type="button"
            onClick={() => document.getElementById("crm-gallery")?.scrollIntoView({ behavior: "smooth" })}
            className="mt-10 rounded-full border border-[#8f78c6]/45 bg-[linear-gradient(180deg,rgba(143,120,198,0.16),rgba(143,120,198,0.08))] px-7 py-3.5 text-sm font-semibold text-text-primary shadow-[0_18px_42px_rgba(27,15,49,0.24)] backdrop-blur-md transition hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-[linear-gradient(180deg,rgba(143,120,198,0.22),rgba(143,120,198,0.12))]"
          >
            See the screens
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.25 }}
          className="relative min-h-[520px] rounded-[2.5rem] sm:min-h-[470px] border border-white/8 bg-[linear-gradient(180deg,rgba(16,10,27,0.42),rgba(16,10,27,0.12))] p-3 shadow-[0_28px_85px_rgba(0,0,0,0.26)]"
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

          <motion.div
            initial={{ opacity: 0, x: 14, y: -10, rotate: -1.2 }}
            whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.65 }}
            transition={{ duration: 0.74, ease: [0.22, 1, 0.36, 1], delay: 0.24 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="absolute right-[4%] top-[10%] z-[3] hidden w-[39%] rounded-[1.85rem] sm:block border border-white/7 bg-[#180f27]/68 p-4 shadow-[0_20px_56px_rgba(52,25,95,0.16)] backdrop-blur-[18px] transition-shadow duration-300 hover:shadow-[0_24px_72px_rgba(90,50,150,0.2)]"
            style={{ x: visualOffset.x * -0.4, y: visualOffset.y * -0.28 }}
          >
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#8f78c6]/72">Follow-up cadence</p>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {["3", "7", "14"].map((days) => (
                <div key={days} className="rounded-[1rem] bg-white/[0.04] px-2 py-3 text-center">
                  <p className="text-lg text-text-primary/85">{days}</p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-text-primary/60">Days</p>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-[1rem] border border-[#8f78c6]/20 bg-[#8f78c6]/10 px-3 py-3">
              <p className="text-[10px] uppercase tracking-[0.18em] text-text-primary/60">On reply or opt-out</p>
              <p className="mt-1 text-sm text-[#d8c8ff]">Paused for review</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -14, y: 12, rotate: 0.9 }}
            whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.65 }}
            transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1], delay: 0.34 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="absolute left-[4%] top-[24%] z-[4] w-[92%] rounded-[1.9rem] sm:left-0 sm:w-[59%] border border-white/8 bg-[#22153a]/78 p-4 shadow-[0_24px_70px_rgba(15,8,30,0.42)] backdrop-blur-[20px] transition-shadow duration-300 hover:shadow-[0_30px_86px_rgba(57,27,101,0.28)]"
            style={{ x: visualOffset.x * 0.65, y: visualOffset.y * 0.55 }}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#8f78c6]/72">Today&apos;s actions</p>
              <span className="rounded-full border border-[#8f78c6]/22 bg-[#8f78c6]/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#d8c8ff]">
                Sample data
              </span>
            </div>
            <div className="mt-5 grid gap-3 rounded-[1.5rem] border border-white/7 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(0,0,0,0.14))] p-4">
              {[
                ["Assisted living contact", "Send vendor packet", "Overdue"],
                ["Dialysis center contact", "Day-3 follow-up", "Due today"],
                ["Clinic front desk", "Review drafted reply", "Draft"],
              ].map(([who, task, status], index) => (
                <motion.div
                  key={who}
                  initial={{ opacity: 0, y: index % 2 === 0 ? 8 : -6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.52, delay: 0.4 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center justify-between gap-3 rounded-[1rem] bg-white/[0.035] px-3 py-3"
                >
                  <div>
                    <p className="text-sm text-text-primary/80">{who}</p>
                    <p className="mt-0.5 text-[11px] text-text-primary/60">{task}</p>
                  </div>
                  <span className="whitespace-nowrap text-[10px] uppercase tracking-[0.18em] text-[#bda7f0]">{status}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function CrmInsightPanel() {
  return (
    <section className="relative px-6 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1220px] overflow-hidden rounded-[2.6rem] border border-white/8 bg-[linear-gradient(180deg,rgba(24,15,39,0.94),rgba(13,8,22,0.9))] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.26)] backdrop-blur-xl md:p-8">
        <div className="pointer-events-none absolute inset-0 rounded-[2.6rem] bg-[radial-gradient(circle_at_top,rgba(143,120,198,0.14),transparent_45%)]" />
        <div className="relative mb-10">
          <p className="text-xs uppercase tracking-[0.35em] text-muted">Context and problem</p>
          <h2 className="mt-4 max-w-4xl text-4xl font-light leading-[1.04] md:text-6xl">
            Follow-ups lived in someone&apos;s memory, so they slipped.
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={transition}
          className="relative rounded-[2rem] border border-[#8f78c6]/18 bg-[linear-gradient(180deg,rgba(37,22,64,0.82),rgba(24,15,39,0.94))] p-5 shadow-[0_24px_90px_rgba(90,50,150,0.12)] backdrop-blur-xl md:p-6"
        >
          {[
            ["Problem", crmInsight.problem],
            ["Design Move", crmInsight.designMove],
            ["Why It Matters", crmInsight.whyItMatters],
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

function CrmWorkflowStrip() {
  return (
    <section className="relative px-6 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1220px] overflow-hidden rounded-[2.6rem] border border-white/8 bg-[linear-gradient(180deg,rgba(18,12,31,0.9),rgba(13,8,22,0.96))] p-6 shadow-[0_28px_100px_rgba(0,0,0,0.24)] backdrop-blur-xl md:p-8">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-muted">System flow</p>
          <h2 className="mx-auto mt-4 max-w-5xl text-4xl font-light leading-[1.04] md:text-6xl">
            How a contact moves from
            <br />
            first meeting to booked ride.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-5">
          {crmWorkflow.map((step, index) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="flex h-full min-h-[248px] flex-col rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.16)] backdrop-blur-xl transition-shadow duration-300 hover:border-[#8f78c6]/24 hover:shadow-[0_22px_55px_rgba(90,50,150,0.2)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#8f78c6]/18 bg-[linear-gradient(180deg,rgba(143,120,198,0.2),rgba(143,120,198,0.08))] text-sm font-semibold text-[#ddd0fb] shadow-[0_0_18px_rgba(143,120,198,0.12)]">
                {index + 1}
              </div>
              <h3 className="mt-4 text-xl text-text-primary">{step.label}</h3>
              <p className="mt-3 text-sm leading-7 text-text-primary/68">{step.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CrmRulesSection() {
  return (
    <section className="relative px-6 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1220px] overflow-hidden rounded-[2.6rem] border border-white/8 bg-[linear-gradient(180deg,rgba(24,15,39,0.94),rgba(13,8,22,0.92))] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.26)] backdrop-blur-xl md:p-8">
        <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-muted">Automation rules</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-light leading-[1.04] md:text-6xl">
              Most of the rules decide when to{" "}
              <span className="font-display italic">hold back</span>.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-text-primary/65 md:text-base">
            Every rule is deterministic, so the team can predict exactly what the system will do. Plain rules decide who shows up on the list, and no message goes out on its own.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {crmRules.map((rule, index) => (
            <motion.div
              key={rule.when}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (index % 2) * 0.06 }}
              className="grid grid-cols-[auto_1fr] gap-4 rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-5"
            >
              <span className="mt-0.5 h-fit self-start rounded-full border border-[#8f78c6]/30 bg-[#8f78c6]/12 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[#d8c8ff]">
                When
              </span>
              <div>
                <p className="text-base text-text-primary">{rule.when}</p>
                <p className="mt-2 text-sm leading-6 text-text-primary/65">
                  <span className="mr-2 text-[10px] uppercase tracking-[0.22em] text-[#8f78c6]">Then</span>
                  {rule.then}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CrmArchitectureSection() {
  return (
    <section className="relative px-6 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1220px] overflow-hidden rounded-[2.6rem] border border-white/8 bg-[linear-gradient(180deg,rgba(18,12,31,0.9),rgba(13,8,22,0.96))] p-6 shadow-[0_28px_100px_rgba(0,0,0,0.24)] backdrop-blur-xl md:p-8">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-muted">How it&apos;s built</p>
          <h2 className="mx-auto mt-4 max-w-4xl text-4xl font-light leading-[1.04] md:text-6xl">
            Free tools, built on what the team already used.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-text-primary/65 md:text-base">
            Instead of buying a CRM subscription, I extended the spreadsheet TISATO already kept. That meant no migration, no monthly cost, and no new tool for the team to learn.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {crmArchitecture.map((layer, index) => (
            <motion.div
              key={layer.label}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="relative rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.16)]"
            >
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#8f78c6]">Layer {index + 1}</p>
              <h3 className="mt-3 text-xl text-text-primary">{layer.label}</h3>
              <p className="mt-3 text-sm leading-7 text-text-primary/68">{layer.detail}</p>
              {index < crmArchitecture.length - 1 ? (
                <span aria-hidden="true" className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-[#8f78c6]/35 bg-[#180f27] text-xs text-[#d8c8ff] md:flex">
                  ↔
                </span>
              ) : null}
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
  item: CrmGalleryItem;
  onOpen: (item: CrmGalleryItem) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] text-left shadow-2xl shadow-black/30 transition duration-500 hover:-translate-y-1 hover:scale-[1.02] hover:border-[#8f78c6]/20 hover:shadow-[0_26px_75px_rgba(90,50,150,0.22)]"
      style={{ rotate: `${item.rotation}deg` }}
      aria-label={`Open ${item.title}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[radial-gradient(circle_at_50%_0%,rgba(143,120,198,0.28),transparent_60%),linear-gradient(180deg,#1b1130,#0d0816)] px-6 pt-14">
        <img
          src={item.image}
          alt={item.alt}
          loading="lazy"
          className="h-full w-full rounded-t-[1.4rem] object-cover object-top shadow-[0_18px_50px_rgba(0,0,0,0.45)] transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,17,29,0)_0%,rgba(6,17,29,0.05)_45%,rgba(6,17,29,0.8)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_42%)] opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
      </div>
      <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.24em]">
        <span className="rounded-full border border-[#8f78c6]/30 bg-[#180f27]/78 px-3 py-1 text-[#efe8ff] shadow-[0_8px_18px_rgba(0,0,0,0.12)] backdrop-blur-md">
          {item.category}
        </span>
        <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-white/60 backdrop-blur-md">
          {item.track}
        </span>
      </div>
      <div className="absolute inset-x-4 bottom-4 rounded-[1.5rem] border border-white/6 bg-[linear-gradient(180deg,rgba(24,15,39,0.82),rgba(24,15,39,0.94))] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.22)] backdrop-blur-md">
        <h3 className="text-lg text-text-primary">{item.title}</h3>
        <p className="mt-2 text-sm leading-6 text-text-primary/65">{item.caption}</p>
      </div>
    </button>
  );
}

function CrmGallerySection() {
  const [selected, setSelected] = useState<CrmGalleryItem | null>(null);

  return (
    <section id="crm-gallery" className="relative px-6 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1220px] overflow-hidden rounded-[2.6rem] border border-white/8 bg-[linear-gradient(180deg,rgba(18,12,31,0.92),rgba(13,8,22,0.96))] p-6 shadow-[0_30px_110px_rgba(0,0,0,0.25)] backdrop-blur-xl md:p-8">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-muted">Prototype walkthrough</p>
          <h2 className="mx-auto mt-4 max-w-4xl text-4xl font-light md:text-6xl">
            Lead to Partner Flow
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-text-primary/65 md:text-base">
            These screens follow one day of partnership work: see who needs attention, open a contact, check the follow-up schedule, and review a draft before it goes out.
          </p>
        </div>

        <div className="mb-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-5 text-left shadow-[0_18px_40px_rgba(0,0,0,0.14)] backdrop-blur-xl">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#8f78c6]">Suggested flow</p>
            <ol className="mt-4 space-y-2 text-sm leading-7 text-text-primary/72">
              <li>1. Start on the dashboard</li>
              <li>2. Open Today&apos;s Actions</li>
              <li>3. Check a contact&apos;s history</li>
              <li>4. Review the follow-up schedule and a draft</li>
            </ol>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-5 text-left shadow-[0_18px_40px_rgba(0,0,0,0.14)] backdrop-blur-xl">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#8f78c6]">What to notice</p>
            <ul className="mt-4 space-y-2 text-sm leading-7 text-text-primary/72">
              <li>How the next step is always visible</li>
              <li>Where automation stops and a person decides</li>
              <li>How each contact connects to a business result</li>
            </ul>
          </div>
        </div>

        <div className="mb-8 text-center">
          <InteractionBeacon />
        </div>

        <div id="crm-gallery-grid" className="grid scroll-mt-24 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {crmGalleryItems.map((item) => (
            <GalleryCard key={item.id} item={item} onOpen={setSelected} />
          ))}
          <div className="flex flex-col gap-4">
            {crmSafeguards.map((safeguard) => (
              <div
                key={safeguard.title}
                className="flex-1 rounded-[2rem] border border-[#8f78c6]/18 bg-[linear-gradient(180deg,rgba(37,22,64,0.7),rgba(24,15,39,0.9))] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.16)]"
              >
                <p className="text-[10px] uppercase tracking-[0.24em] text-[#8f78c6]">Safeguards</p>
                <h3 className="mt-3 text-lg text-text-primary">{safeguard.title}</h3>
                <p className="mt-2 text-sm leading-6 text-text-primary/68">{safeguard.body}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-8 text-center text-xs uppercase tracking-[0.2em] text-text-primary/60">{sampleDataNote}</p>
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
            aria-label="Close CRM screen preview"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(24,15,39,0.98),rgba(15,10,28,0.98))] shadow-[0_30px_100px_rgba(0,0,0,0.4)]"
            >
              <div className="grid md:grid-cols-[0.9fr_1.1fr]">
                <div className="flex items-center justify-center bg-[#0d0816] p-4">
                  <img src={selected.image} alt={selected.alt} className="max-h-[78vh] w-auto rounded-[1.4rem] object-contain" />
                </div>
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
                  <p className="mt-6 text-xs leading-6 text-text-primary/60">{sampleDataNote}</p>
                </div>
              </div>
            </motion.div>
          </motion.button>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function CrmOutcomes() {
  return (
    <section className="relative px-6 pb-20 pt-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1220px] overflow-hidden rounded-[2.6rem] border border-white/8 bg-[linear-gradient(180deg,rgba(18,12,31,0.92),rgba(13,8,22,0.96))] p-6 shadow-[0_30px_110px_rgba(0,0,0,0.24)] backdrop-blur-xl md:p-8">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-muted">Outcome</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-light md:text-6xl">
            Before and after the CRM.
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {crmOutcomes.map((outcome) => (
            <motion.div
              key={outcome.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55 }}
              whileHover={{ y: -4 }}
              className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.16)] backdrop-blur-xl transition-shadow duration-300 hover:border-[#8f78c6]/22 hover:shadow-[0_24px_60px_rgba(90,50,150,0.18)]"
            >
              <h3 className="text-xl text-text-primary">{outcome.title}</h3>
              <div className="mt-6 rounded-[1.4rem] border border-white/10 bg-[#14191f] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/60">Before</p>
                <p className="mt-2 text-sm leading-7 text-text-primary/62">{outcome.before}</p>
              </div>
              <div className="mt-4 rounded-[1.4rem] border border-[#8f78c6]/18 bg-[linear-gradient(180deg,rgba(24,15,39,0.98),rgba(30,18,48,0.98))] p-4 shadow-[0_12px_28px_rgba(44,22,78,0.18)]">
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

function CrmReflection() {
  return (
    <section className="relative px-6 pb-28 pt-6 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[860px] overflow-hidden rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(36,18,66,0.54),rgba(255,255,255,0.05))] p-6 text-center shadow-[0_28px_90px_rgba(0,0,0,0.24)] backdrop-blur-xl md:p-8">
        <div className="pointer-events-none absolute inset-0 rounded-[2.2rem] bg-[radial-gradient(circle_at_top,rgba(143,120,198,0.18),transparent_46%)]" />
        <p className="text-xs uppercase tracking-[0.35em] text-muted">{crmReflection.heading}</p>
        <p className="relative mx-auto mt-4 max-w-3xl text-base leading-8 text-text-primary/74 md:text-lg">
          {crmReflection.body}
        </p>
      </div>
    </section>
  );
}

export function TisatoCrmCaseStudy() {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0d0816] text-text-primary">
      <AmbientBackground />
      <BackToWork />
      <CrmHero />
      <CrmInsightPanel />
      <CrmWorkflowStrip />
      <CrmRulesSection />
      <CrmGallerySection />
      <CrmArchitectureSection />
      <CrmOutcomes />
      <CrmReflection />
    </main>
  );
}
