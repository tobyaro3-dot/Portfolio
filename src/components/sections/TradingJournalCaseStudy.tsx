import { useLayoutEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const reveal = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const transition = { duration: 0.52, ease: [0.22, 1, 0.36, 1] as const };

const overview = [
  ["Role", "Generative UX Researcher"],
  ["Context", "Pre-product behavioral research"],
  ["Scope", "Desk research, synthesis, study plan"],
  ["Status", "Research foundation before product design"],
];

const journalStates = [
  ["Outcome logging", "The journal records what happened after the trade is over."],
  ["Pattern noticing", "Repeated mistakes become easier to see in review."],
  ["Context loss", "Pressure, uncertainty, and reasoning can fade from the record."],
  ["Late reflection", "The lesson is clearest after the moment has already passed."],
  ["Repeat pressure", "A similar setup returns before the lesson is easy to access."],
  ["Behavior transfer", "The hard part is carrying reflection into the next decision."],
];

const researchQuestions = [
  "What do trading journals help people remember, and what do they leave out?",
  "Where does reflection fail to transfer into the next pressured moment?",
  "How can a journal preserve reasoning before the outcome rewrites the story?",
  "What role could AI play without pretending to know intent, emotion, or truth?",
];

const methodStack = [
  {
    method: "Research grounding",
    why: "To avoid starting with an AI product before understanding the behavior problem.",
    output: "A clearer frame around reflection, timing, pressure, and repeat mistakes.",
  },
  {
    method: "Behavior synthesis",
    why: "To separate what journals capture from what people need when pressure returns.",
    output: "A working model of the gap between review and action.",
  },
  {
    method: "Artifact review",
    why: "To think through the kinds of records a trader may already keep: entries, rules, notes, screenshots, and summaries.",
    output: "Questions about what evidence is preserved and what gets smoothed over.",
  },
  {
    method: "Future diary study",
    why: "To capture drift, hesitation, rule pressure, and reflection closer to when they happen.",
    output: "A plan for studying the moments memory may miss.",
  },
  {
    method: "Product bridge",
    why: "To turn the research into design principles without claiming a finished solution.",
    output: "Boundaries for an AI behavioral journal.",
  },
];

const evidenceMoments = [
  {
    id: "01",
    label: "Late clarity",
    title: "The journal is strongest after the decision is finished.",
    body: "Review can reveal the broken rule, the repeated setup, or the emotional pattern. But by then, the original moment has already moved on.",
    source: "The research frames journaling as a timing problem, not only a record-keeping problem.",
    response: "The study focuses on the handoff from reflection into the next similar moment.",
    marker: "left-[24%] top-[62%]",
  },
  {
    id: "02",
    label: "Missing context",
    title: "Outcome records can make messy decisions look cleaner than they were.",
    body: "A trade result can be easy to write down. The hesitation, justification, pressure, and self-talk around it are easier to lose.",
    source: "The report emphasizes reasoning and context as part of the behavior, not extra notes.",
    response: "Future research would compare journal entries with near-moment diary capture.",
    marker: "left-[52%] top-[36%]",
  },
  {
    id: "03",
    label: "Transfer gap",
    title: "Seeing a pattern is not the same as changing it.",
    body: "A person can know their pattern in review and still repeat it when speed, risk, or confidence changes the decision environment.",
    source: "The core opportunity is the gap between recognition and action.",
    response: "The page centers the Mirror-to-Moment Gap as the main framework.",
    marker: "left-[72%] top-[68%]",
  },
  {
    id: "04",
    label: "AI restraint",
    title: "AI is useful only if it stays close to evidence.",
    body: "The tempting version of AI judges the trader. The safer version organizes records, surfaces contradictions, and shows uncertainty.",
    source: "The research treats AI as support for reflection, not an authority over behavior.",
    response: "Product principles define what AI can help with and what it should not claim.",
    marker: "left-[42%] top-[78%]",
  },
];

const studyPhases = [
  "Start with critical incident interviews around moments where a planned decision became reactive.",
  "Use artifact walkthroughs to examine journals, rules, screenshots, and notes where participants are willing to share them.",
  "Run a short diary study to capture pressure, hesitation, review, and rule tension closer to the moment.",
  "Conduct playback interviews to compare remembered meaning with what was captured while the moment was still fresh.",
];

const designHypotheses = [
  {
    assumption: "People may understand their mistake clearly in review but fail to recognize the setup when it returns.",
    pressure: "Study repeat situations, not only isolated journal entries.",
  },
  {
    assumption: "Outcome-focused entries may hide the reasoning that shaped the decision.",
    pressure: "Prioritize context, confidence, and rule pressure before result analysis.",
  },
  {
    assumption: "AI can make patterns easier to inspect, but it can also overstate certainty.",
    pressure: "Separate evidence organization from judgment or prediction.",
  },
  {
    assumption: "The useful prompt may need to arrive before action, not during review.",
    pressure: "Look for moments where reflection could realistically return without adding noise.",
  },
];

const pipeline = [
  ["Prepare", "Define consent, artifact boundaries, and what kinds of trading records can be discussed safely."],
  ["Capture", "Document each incident as a before, during, and after sequence while keeping the case whole."],
  ["Map", "Mark rule, context, pressure, decision, outcome, review, and the next similar setup."],
  ["Code", "Start with participant language before applying behavioral tags or product assumptions."],
  ["Compare", "Look across cases for repeat sequences, contradictions, and moments where timing mattered."],
  ["Bound", "Tie each principle to evidence, uncertainty, and what would need primary research next."],
];

const opportunityAreas = [
  {
    label: "Better reflection timing",
    copy: "Explore how a journal can bring past lessons forward before the next similar decision, not only after review.",
  },
  {
    label: "Richer decision context",
    copy: "Preserve reasoning, confidence, rules, and pressure so the record shows more than the final outcome.",
  },
  {
    label: "Evidence-based AI",
    copy: "Use AI to organize, compare, and retrieve moments while staying honest about uncertainty.",
  },
  {
    label: "Product bridge",
    copy: "Use the research to shape an AI behavioral journal without claiming the product is already proven.",
  },
];

const limitations = [
  "This is a research foundation and product bridge, not a completed primary study.",
  "The desk research creates strong questions, but it does not replace participant evidence.",
  "Trading behavior is sensitive, so future studies would need careful consent and data boundaries.",
  "AI concepts would need to be tested for trust, timing, usefulness, and overreach.",
  "A later product case study should validate whether the principles hold in real decision moments.",
];

const artifactBoard = [
  ["Incident map", "What happened before, during, and after the decision?"],
  ["Journal artifact", "What did the existing record preserve or leave out?"],
  ["Pressure note", "Where did rules, confidence, emotion, or speed affect the choice?"],
  ["Transfer check", "Did the lesson return when a similar setup appeared again?"],
];

function BackToWork() {
  return (
    <Link
      to="/"
      onClick={() => window.sessionStorage.setItem("portfolio-scroll-target", "work")}
      className="fixed left-4 top-4 z-50 rounded-full border border-white/10 bg-[linear-gradient(135deg,rgba(7,8,9,0.88),rgba(32,28,22,0.72))] px-4 py-2 text-xs uppercase tracking-[0.2em] text-text-primary/80 shadow-[0_18px_45px_rgba(0,0,0,0.24)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-[#c8a86c]/42 hover:text-text-primary md:left-6 md:top-6"
    >
      Back to work
    </Link>
  );
}

function AmbientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-0 h-[36rem] w-[54rem] -translate-x-1/2 rounded-full bg-[#1d2a2f]/56 blur-[120px]" />
      <div className="absolute -left-20 top-[22rem] h-[28rem] w-[34rem] rounded-full bg-[#8a6b38]/14 blur-[120px]" />
      <div className="absolute right-0 top-[30rem] h-[32rem] w-[32rem] rounded-full bg-[#334b54]/18 blur-[120px]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:76px_76px] [mask-image:radial-gradient(circle_at_50%_15%,black,transparent_74%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,6,7,0.42)_54%,#050607_100%)]" />
      <div className="absolute inset-x-0 top-[15%] h-px bg-[linear-gradient(90deg,transparent,rgba(202,168,106,0.15),transparent)]" />
    </div>
  );
}

function SectionShell({
  children,
  className = "",
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <section className={`relative px-6 py-20 md:px-10 lg:px-16 ${className}`}>
      <div className={`mx-auto ${wide ? "max-w-[1380px]" : "max-w-[1160px]"}`}>{children}</div>
    </section>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-xs uppercase tracking-[0.35em] text-[#c8a86c]/68">{children}</p>;
}

function MirrorMap({ activeMarker = "01" }: { activeMarker?: string }) {
  const active = evidenceMoments.find((step) => step.id === activeMarker) ?? evidenceMoments[0];

  return (
    <div className="relative mx-auto w-[300px] max-w-full rounded-[2.35rem] border border-white/16 bg-[#07090b] p-2 shadow-[0_34px_100px_rgba(0,0,0,0.5)]">
      <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-b-2xl bg-[#050607]/92" />
      <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,#0d1214,#060708)] p-5">
        <div className="flex items-center justify-between pt-4 text-[10px] text-white/42">
          <span>Research model</span>
          <span className="text-[#c8a86c]">Mirror gap</span>
        </div>

        <div className="mt-6 rounded-[1.25rem] border border-white/8 bg-white/[0.035] p-3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1rem] bg-[radial-gradient(circle_at_28%_50%,rgba(202,168,106,0.16),transparent_38%),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]">
            <div className="absolute left-[15%] top-[50%] h-20 w-20 -translate-y-1/2 rounded-full border border-[#c8a86c]/34 bg-[#050607]/38" />
            <div className="absolute left-[46%] right-[13%] top-[50%] h-px -translate-y-1/2 bg-[linear-gradient(90deg,rgba(200,168,106,0.72),rgba(200,168,106,0.08),rgba(200,168,106,0.56))]" />
            <div className="absolute left-[43%] top-[calc(50%-0.35rem)] h-3 w-3 rounded-full border border-[#c8a86c]/56 bg-[#0c1114]" />
            {evidenceMoments.map((step) => (
              <span
                key={step.id}
                className={`absolute h-4 w-4 rounded-full border ${
                  step.id === activeMarker
                    ? "border-[#f1dca9] bg-[#c8a86c] shadow-[0_0_22px_rgba(200,168,106,0.34)]"
                    : "border-white/42 bg-[#0c1114]"
                } ${step.marker}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-[1.2rem] border border-white/8 bg-white/[0.035] p-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#c8a86c]/70">Current read</p>
          <p className="mt-2 text-sm text-white/78">{active.label}</p>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 text-[9px] text-white/34">
          {["Review", "Gap", "Moment"].map((item) => (
            <div key={item} className="rounded-full border border-white/8 bg-white/[0.02] px-2 py-2 text-center">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] items-end overflow-hidden px-6 pb-20 pt-32 md:px-10 lg:px-16">
      <div className="pointer-events-none absolute inset-0">
        <img src="/trading-journal-cover.svg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-76" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,7,0.92)_0%,rgba(5,6,7,0.64)_44%,rgba(5,6,7,0.22)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,6,7,0.16),rgba(5,6,7,0.7)_68%,#050607_100%)]" />
        <div className="halftone absolute inset-0 opacity-10 mix-blend-multiply" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1220px] gap-12 lg:grid-cols-[1fr_0.78fr] lg:items-end">
        <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.12 }}>
          <motion.p variants={reveal} className="text-xs uppercase tracking-[0.35em] text-[#c8a86c]/78">
            UX Research
          </motion.p>
          <motion.h1 variants={reveal} className="mt-5 max-w-5xl font-display text-5xl italic leading-[0.92] text-text-primary md:text-8xl">
            Can a trading journal help people change, not just remember?
          </motion.h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(11,13,14,0.74),rgba(11,13,14,0.44))] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.32)] backdrop-blur-xl"
        >
          <div className="grid gap-4">
            {overview.map(([label, value]) => (
              <div key={label} className="border-b border-white/8 pb-4 last:border-b-0 last:pb-0">
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#c8a86c]/62">{label}</p>
                <p className="mt-2 text-sm leading-6 text-text-primary/76">{value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProblemSpace() {
  return (
    <SectionShell wide className="pb-16 pt-24">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <Eyebrow>Why this mattered</Eyebrow>
          <p className="mt-5 max-w-2xl text-3xl font-light leading-tight text-text-primary md:text-5xl">
            The first question was not whether journals help people remember.
          </p>
          <div className="mt-6 max-w-xl space-y-5 text-base leading-8 text-text-primary/66">
            <p>
              Trading journals already make the past visible. They can show entries, exits, mistakes, rules, screenshots, and patterns that are hard to see in the moment.
            </p>
            <p>
              The more interesting problem was whether that reflection could travel forward. A person can understand a repeated mistake in review and still miss it when urgency, confidence, or fear changes the decision environment.
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(16,18,18,0.86),rgba(8,9,9,0.92))] p-6 shadow-[0_32px_110px_rgba(0,0,0,0.28)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(202,168,106,0.13),transparent_42%)]" />
          <div className="relative grid gap-5 md:grid-cols-2">
            {journalStates.map(([state, meaning], index) => (
              <motion.div
                key={state}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="border-t border-white/10 pt-5"
              >
                <p className="font-display text-4xl italic leading-none text-[#c8a86c]/74">0{index + 1}</p>
                <h3 className="mt-4 text-xl font-light text-text-primary">{state}</h3>
                <p className="mt-3 text-sm leading-7 text-text-primary/62">{meaning}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function QuestionsAndApproach() {
  return (
    <SectionShell className="py-20">
      <div className="grid gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div>
          <Eyebrow>Research strategy</Eyebrow>
          <h2 className="mt-5 text-4xl font-light leading-[1.04] text-text-primary md:text-6xl">
            I treated the journal as a timing problem, not just a memory tool.
          </h2>
          <p className="mt-6 text-base leading-8 text-text-primary/66">
            Before designing an AI journal, I needed to understand what had to be protected: the reasoning before the outcome, the pressure around the decision, and the moment when an old lesson could actually help.
          </p>
          <div className="mt-8 space-y-5">
            {researchQuestions.map((question, index) => (
              <div key={question} className="grid gap-4 border-t border-white/10 pt-5 md:grid-cols-[3.5rem_1fr]">
                <p className="font-display text-4xl italic leading-none text-[#c8a86c]/72">0{index + 1}</p>
                <p className="text-sm leading-7 text-text-primary/66">{question}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {methodStack.map((method, index) => (
            <motion.article
              key={method.method}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="grid gap-5 py-6 md:grid-cols-[10rem_1fr_1fr]"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#c8a86c]/68">{method.method}</p>
              <p className="text-sm leading-7 text-text-primary/66">{method.why}</p>
              <p className="text-sm leading-7 text-text-primary/48">{method.output}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

function StudyDesign() {
  return (
    <SectionShell wide className="py-20">
      <div className="overflow-hidden rounded-[3rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,20,20,0.82),rgba(7,8,8,0.94))] shadow-[0_38px_140px_rgba(0,0,0,0.34)]">
        <div className="grid lg:grid-cols-[0.86fr_1.14fr]">
          <div className="border-b border-white/10 p-8 md:p-12 lg:border-b-0 lg:border-r">
            <Eyebrow>Building the study</Eyebrow>
            <p className="mt-7 text-3xl font-light leading-tight text-text-primary md:text-5xl">
              One method would only tell part of the story.
            </p>
            <p className="mt-6 text-base leading-8 text-text-primary/64">
              Interviews could rebuild the decision over time. Artifact walkthroughs could show what people already capture. Diaries could catch smaller moments before memory makes them cleaner than they felt.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {artifactBoard.map(([label, copy]) => (
                <div key={label} className="rounded-[1.2rem] border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-[10px] uppercase tracking-[0.26em] text-[#c8a86c]/68">{label}</p>
                  <p className="mt-3 text-xs leading-6 text-text-primary/58">{copy}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-0 md:grid-cols-2">
            {studyPhases.map((phase, index) => (
              <div key={phase} className="border-b border-white/10 p-7 even:md:border-l md:[&:nth-last-child(-n+2)]:border-b-0">
                <p className="font-display text-5xl italic leading-none text-[#c8a86c]/72">0{index + 1}</p>
                <p className="mt-5 text-sm leading-7 text-text-primary/66">{phase}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function EvidenceReplay() {
  const [activeStep, setActiveStep] = useState("01");
  const active = evidenceMoments.find((step) => step.id === activeStep) ?? evidenceMoments[0];

  return (
    <SectionShell wide className="py-20">
      <div className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <Eyebrow>What the study had to catch</Eyebrow>
          <h2 className="mt-4 text-4xl font-light leading-[1.04] text-text-primary md:text-6xl">
            I was looking for the moment reflection stopped being enough.
          </h2>
        </div>
        <p className="max-w-2xl text-base leading-8 text-text-primary/66">
          Not the final result. Not the clean lesson written later. The study had to notice the places where memory, pressure, and action stopped lining up.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-[2.6rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(202,168,106,0.13),transparent_46%),linear-gradient(180deg,rgba(15,17,17,0.94),rgba(8,9,9,0.97))] p-6 shadow-[0_32px_120px_rgba(0,0,0,0.32)]">
            <div className="grid items-end gap-8 md:grid-cols-[0.78fr_1fr] lg:grid-cols-1 xl:grid-cols-[0.78fr_1fr]">
              <div>
                <p className="font-display text-7xl italic leading-none text-text-primary md:text-8xl">14</p>
                <p className="mt-4 text-xs uppercase tracking-[0.24em] text-text-primary/44">Planned diary days</p>
                <div className="mt-8 grid grid-cols-2 gap-3">
                  <div className="border-t border-white/10 pt-4">
                    <p className="font-display text-5xl italic leading-none text-text-primary">4</p>
                    <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-text-primary/42">Evidence moments</p>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <p className="font-display text-5xl italic leading-none text-[#c8a86c]">0</p>
                    <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-text-primary/42">Findings claimed</p>
                  </div>
                </div>
              </div>
              <MirrorMap activeMarker={activeStep} />
            </div>
            <div className="mt-7 border-t border-white/10 pt-6">
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#c8a86c]/64">Current read</p>
              <p className="mt-3 text-2xl font-light leading-tight text-text-primary">{active.title}</p>
              <p className="mt-4 text-sm leading-7 text-text-primary/62">{active.response}</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-[1.08rem] top-6 hidden h-[calc(100%-3rem)] w-px bg-[linear-gradient(180deg,rgba(202,168,106,0.45),rgba(255,255,255,0.06))] md:block" />
          <div className="space-y-6">
            {evidenceMoments.map((step) => (
              <motion.button
                key={step.id}
                type="button"
                onClick={() => setActiveStep(step.id)}
                onViewportEnter={() => setActiveStep(step.id)}
                onMouseEnter={() => setActiveStep(step.id)}
                initial={{ opacity: 0.42, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.58, margin: "-16% 0px -16% 0px" }}
                transition={transition}
                className={`relative w-full text-left transition duration-300 hover:-translate-y-1 ${
                  activeStep === step.id ? "opacity-100" : "opacity-72 hover:opacity-100"
                }`}
              >
                <div className="grid gap-5 md:grid-cols-[2.2rem_1fr]">
                  <span
                    className={`relative z-10 mt-2 hidden h-9 w-9 items-center justify-center rounded-full border text-[10px] tracking-[0.12em] md:flex ${
                      activeStep === step.id
                        ? "border-[#c8a86c]/60 bg-[#c8a86c]/20 text-[#f1dca9]"
                        : "border-white/12 bg-[#090b0c] text-white/36"
                    }`}
                  >
                    {step.id}
                  </span>
                  <div
                    className={`overflow-hidden rounded-[1.8rem] border p-5 ${
                      activeStep === step.id
                        ? "border-[#c8a86c]/28 bg-[#c8a86c]/[0.07] shadow-[0_24px_80px_rgba(0,0,0,0.26)]"
                        : "border-white/10 bg-white/[0.028]"
                    }`}
                  >
                    <div className="grid gap-5 lg:grid-cols-[1fr_1fr_1fr]">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.28em] text-[#c8a86c]/62">{step.label}</p>
                        <h3 className="mt-3 text-2xl font-light leading-tight text-text-primary md:text-3xl">{step.title}</h3>
                      </div>
                      <p className="text-sm leading-7 text-text-primary/66">{step.body}</p>
                      <p className="text-sm leading-7 text-text-primary/52">{step.source}</p>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function InsightShift() {
  return (
    <SectionShell wide className="py-20">
      <div className="overflow-hidden rounded-[3rem] border border-[#c8a86c]/16 bg-[linear-gradient(180deg,rgba(22,21,18,0.94),rgba(8,9,9,0.98))] shadow-[0_38px_140px_rgba(0,0,0,0.34)]">
        <div className="grid lg:grid-cols-2">
          <div className="relative border-b border-white/8 p-8 lg:border-b-0 lg:border-r md:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(202,168,106,0.14),transparent_42%)]" />
            <div className="relative">
              <Eyebrow>What journals can say</Eyebrow>
              <p className="mt-8 max-w-xl text-3xl font-light leading-tight text-text-primary md:text-5xl">
                A rule was broken, a pattern repeated, or an outcome hurt.
              </p>
            </div>
          </div>
          <div className="relative p-8 md:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(51,75,84,0.28),transparent_46%)]" />
            <div className="relative">
              <Eyebrow>What research needs to know</Eyebrow>
              <p className="mt-8 max-w-xl text-3xl font-light leading-tight text-text-primary md:text-5xl">
                When could that lesson return early enough to change the next decision?
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/8 px-8 py-12 text-center md:px-12">
          <p className="font-display text-6xl italic leading-none text-text-primary md:text-8xl">
            Useful does not mean timely.
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-text-primary/62">
            That was the turning point. A journal can be useful in review and still fail the moment where behavior actually changes.
          </p>
        </div>
      </div>
    </SectionShell>
  );
}

function AnalysisPipeline() {
  return (
    <SectionShell wide className="py-20">
      <div className="mb-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <Eyebrow>Analysis plan</Eyebrow>
          <h2 className="mt-4 text-4xl font-light leading-[1.04] text-text-primary md:text-6xl">
            I wanted the analysis to keep the messy parts visible.
          </h2>
        </div>
        <p className="max-w-2xl text-base leading-8 text-text-primary/66">
          Each case would stay whole before becoming a pattern. Only after comparing incidents, artifacts, diary moments, and contradictions would I translate the work into product principles.
        </p>
      </div>
      <div className="mb-8 grid gap-4 lg:grid-cols-4">
        {designHypotheses.map((item, index) => (
          <motion.div
            key={item.assumption}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.44, delay: index * 0.04 }}
            className="rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-5"
          >
            <p className="text-[10px] uppercase tracking-[0.26em] text-[#c8a86c]/66">Check 0{index + 1}</p>
            <p className="mt-4 text-sm leading-7 text-text-primary/62">{item.pressure}</p>
          </motion.div>
        ))}
      </div>
      <div className="overflow-hidden rounded-[2.8rem] border border-white/10 bg-white/[0.03]">
        <div className="grid gap-0 md:grid-cols-2 lg:grid-cols-3">
          {pipeline.map(([label, copy], index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.44, delay: index * 0.04 }}
              className="border-b border-white/10 p-7 md:border-r lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-last-child(-n+3)]:border-b-0"
            >
              <p className="font-display text-5xl italic leading-none text-[#c8a86c]/72">0{index + 1}</p>
              <p className="mt-5 text-xl font-light text-text-primary">{label}</p>
              <p className="mt-3 text-sm leading-7 text-text-primary/62">{copy}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

function OpportunitiesAndLimits() {
  return (
    <SectionShell wide className="py-20">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-7 md:p-9">
          <Eyebrow>What this changes</Eyebrow>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {opportunityAreas.map((item) => (
              <div key={item.label}>
                <p className="text-xl font-light text-text-primary">{item.label}</p>
                <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-7 text-text-primary/64">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2.5rem] border border-[#c8a86c]/16 bg-[linear-gradient(180deg,rgba(202,168,106,0.075),rgba(255,255,255,0.025))] p-7 md:p-9">
          <Eyebrow>Staying honest</Eyebrow>
          <div className="mt-7 space-y-4">
            {limitations.map((item) => (
              <p key={item} className="border-t border-white/10 pt-4 text-sm leading-7 text-text-primary/66">{item}</p>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function Reflection() {
  return (
    <SectionShell className="pb-28 pt-14">
      <div className="overflow-hidden rounded-[2.8rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(202,168,106,0.12),transparent_44%),linear-gradient(180deg,rgba(18,19,18,0.94),rgba(8,9,9,0.98))] p-6 shadow-[0_34px_120px_rgba(0,0,0,0.28)] md:p-10">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <Eyebrow>Reflection</Eyebrow>
            <p className="mt-6 font-display text-5xl italic leading-none text-text-primary md:text-7xl">
              A journal should not only remember the past.
            </p>
          </div>
          <div className="space-y-6 text-base leading-8 text-text-primary/72 md:text-lg">
            <p>
              This project changed how I think about journaling. The archive matters, but behavior change depends on whether the right memory can return before the next decision hardens.
            </p>
            <p>
              The next step is product design: an AI behavioral journal informed by this research, built around evidence, restraint, and timing.
            </p>
            <p>
              The design question becomes simple and difficult at the same time: how can a system help a person meet their own evidence at the moment it can still change what happens next?
            </p>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

export function TradingJournalCaseStudy() {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050607] text-text-primary">
      <AmbientBackground />
      <BackToWork />
      <Hero />
      <ProblemSpace />
      <QuestionsAndApproach />
      <StudyDesign />
      <EvidenceReplay />
      <InsightShift />
      <AnalysisPipeline />
      <OpportunitiesAndLimits />
      <Reflection />
    </main>
  );
}
