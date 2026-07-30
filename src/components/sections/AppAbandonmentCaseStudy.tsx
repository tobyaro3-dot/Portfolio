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
  ["Context", "Discovery before design"],
  ["Scope", "Literature review, study plan, analysis approach"],
  ["Status", "Study plan; no findings claimed yet"],
];

const abandonmentStates = [
  ["Passive lapse", "Use thins out without a declared decision."],
  ["Deliberate exit", "A person consciously deletes, cancels, or stops."],
  ["Substitution", "Use moves to another product or workaround."],
  ["Goal completion", "Use ends because the original job is done."],
  ["Seasonal pause", "Need returns in seasons or episodes."],
  ["Still dependent", "A person wants to leave but still depends on the product."],
];

const researchQuestions = [
  "How do people describe the changing role of an app from first use to drifting away?",
  "What moments, patterns, or life changes show up before use starts to fade?",
  "Which lapses can be repaired, which repeat seasonally, and which mark the end?",
  "Where does behavior match the story people tell, and where does it differ?",
];

const methodStack = [
  {
    method: "Research grounding",
    why: "To avoid jumping straight to retention tips before understanding why people leave.",
    output: "A clearer map of habit, motivation, context, and changing value.",
  },
  {
    method: "Relationship interviews",
    why: "To understand one once-loved app over time instead of asking for one neat reason.",
    output: "Timelines around first value, peak use, drift, lapse, and possible return.",
  },
  {
    method: "Four-week diary",
    why: "To catch lapses, urges, substitutes, and prompts closer to when they happen.",
    output: "Light entries plus weekly reflections on context, effort, value, and emotion.",
  },
  {
    method: "Optional behavior data",
    why: "To check where memory may be incomplete without treating the data as the full story.",
    output: "Optional screen-time summaries, notification settings, receipts, screenshots, calendars, or exports.",
  },
  {
    method: "Pattern building",
    why: "To compare how people move from caring to drifting, not just count repeated topics.",
    output: "Comparison maps, edge cases, confidence notes, and opportunity areas.",
  },
];

const evidenceMoments = [
  {
    id: "01",
    label: "Memory risk",
    title: "The last event is not always the beginning.",
    body: "A cancellation, uninstall, or storage cleanup may only be when the person finally notices a relationship that had already changed.",
    source: "The report separates the final exit from the earlier drift in value or context.",
    response: "The study starts with timelines, not a single exit question.",
    marker: "left-[24%] top-[62%]",
  },
  {
    id: "02",
    label: "Data ambiguity",
    title: "The same usage decline can mean several things.",
    body: "Falling activity could signal frustration, success, seasonality, routine disruption, or healthy withdrawal.",
    source: "Behavioral logs show what happened, but not what the person expected, felt, or resisted.",
    response: "Behavioral data is used for comparison, not treated as the whole truth.",
    marker: "left-[52%] top-[36%]",
  },
  {
    id: "03",
    label: "Human rhythm",
    title: "Retention is not always the right human outcome.",
    body: "Some products should be used daily. Others should disappear once the job is done.",
    source: "The report separates unwanted abandonment from goal completion, cyclical use, and appropriate non-use.",
    response: "The research asks whether returning is worthwhile, wanted, and appropriate.",
    marker: "left-[72%] top-[68%]",
  },
  {
    id: "04",
    label: "Staying honest",
    title: "Early guesses need to be tested before they become insights.",
    body: "The report frames expected patterns as things to test, not findings, because the interviews and diaries have not been run yet.",
    source: "Status: study plan; no findings are claimed yet.",
    response: "The page presents an honest study plan instead of fake results.",
    marker: "left-[42%] top-[78%]",
  },
];

const studyPhases = [
  "Recruit across passive lapse, deliberate exit, substitution, goal completion, seasonal pause, and still-dependent use.",
  "Run 24 timeline interviews, using prompts and optional materials to avoid clean but incomplete stories.",
  "Invite 12 participants into a four-week diary to capture lapses, urges, substitutes, prompts, and context closer to the moment.",
  "Conduct six follow-up interviews to compare the original story with diary entries and optional behavior data.",
];

const designHypotheses = [
  {
    assumption: "People may locate the meaningful beginning of abandonment earlier than the last session or uninstall.",
    pressure: "Ask for multiple possible beginnings, not just the final exit.",
  },
  {
    assumption: "Context disruption may explain some lapses even when attitudes remain positive.",
    pressure: "Separate lost opportunity from actual value rejection.",
  },
  {
    assumption: "Rigid streaks and continuity mechanisms can support routines for some people and make breaks feel unrecoverable for others.",
    pressure: "Look for edge cases before recommending engagement mechanics.",
  },
  {
    assumption: "Goal completion can look like churn in analytics.",
    pressure: "Leave room for successful endings and healthy non-use.",
  },
];

const pipeline = [
  ["Prepare", "Set consent, permission to use reference materials, and clear data boundaries."],
  ["Capture", "Write a one-page case memo within 24 hours while context is still fresh."],
  ["Map", "Mark first value, peak use, earliest change, last meaningful use, exit, and possible return."],
  ["Code", "Start with participant language, then compare with research-backed tags later."],
  ["Compare", "Look across cases for sequences, contradictions, and rare but important patterns."],
  ["Bound", "Tie each insight to proof, confidence, edge cases, and what it could change."],
];

const opportunityAreas = [
  {
    label: "Better diagnosis",
    copy: "Help teams distinguish value failure from successful completion, seasonal dormancy, or routine disruption.",
  },
  {
    label: "Respectful re-entry",
    copy: "Explore how a product can welcome someone back without punishing the time away.",
  },
  {
    label: "Appropriate cadence",
    copy: "Define engagement around the user's job, not a universal demand for more sessions.",
  },
  {
    label: "Better research habits",
    copy: "Combine stories, diary entries, and behavior data before deciding what a decline means.",
  },
];

const limitations = [
  "This is a research case study and study plan, not a completed interview study.",
  "The literature creates strong questions, but it does not replace learning from participants.",
  "A four-week diary can catch small shifts, not full multi-year relationships.",
  "Former users can be difficult to recruit, especially outside company-owned channels.",
  "Any later design concepts would require a separate research and ideation phase.",
];

const artifactBoard = [
  ["Timeline", "Where did the relationship actually start to change?"],
  ["Diary prompt", "What happened close to the moment of lapse, urge, or substitute use?"],
  ["Data check", "Where does remembered meaning match or differ from behavior?"],
  ["Confidence note", "What can be claimed now, and what still needs proof?"],
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
      <div className="absolute left-1/2 top-0 h-[36rem] w-[54rem] -translate-x-1/2 rounded-full bg-[#1d2a2f]/60 blur-[120px]" />
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

function RelationshipMap({ activeMarker = "01" }: { activeMarker?: string }) {
  const active = evidenceMoments.find((step) => step.id === activeMarker) ?? evidenceMoments[0];

  return (
    <div className="relative mx-auto w-[300px] max-w-full rounded-[2.35rem] border border-white/16 bg-[#07090b] p-2 shadow-[0_34px_100px_rgba(0,0,0,0.5)]">
      <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-b-2xl bg-[#050607]/92" />
      <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,#0d1214,#060708)] p-5">
        <div className="flex items-center justify-between pt-4 text-[10px] text-white/42">
          <span>Research model</span>
          <span className="text-[#c8a86c]">Timeline</span>
        </div>

        <div className="mt-6 rounded-[1.25rem] border border-white/8 bg-white/[0.035] p-3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1rem] bg-[radial-gradient(circle_at_50%_20%,rgba(202,168,106,0.12),transparent_38%),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]">
            <div className="absolute left-[18%] right-[18%] top-[24%] h-px bg-white/10" />
            <div className="absolute left-[18%] right-[18%] top-[50%] h-px bg-white/8" />
            <div className="absolute left-[18%] right-[18%] top-[76%] h-px bg-white/6" />
            <motion.div
              className="absolute left-[18%] top-[62%] h-px w-[66%] rotate-[-18deg] border-t border-dashed border-[#c8a86c]/70"
              animate={{ opacity: [0.38, 0.86, 0.38] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
            />
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
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#c8a86c]/70">Current question</p>
          <p className="mt-2 text-sm text-white/78">{active.label}</p>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 text-[9px] text-white/34">
          {["Value", "Context", "Routine"].map((item) => (
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
        <img src="/app-abandonment-cover.svg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,7,0.9)_0%,rgba(5,6,7,0.62)_44%,rgba(5,6,7,0.18)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,6,7,0.16),rgba(5,6,7,0.7)_68%,#050607_100%)]" />
        <div className="halftone absolute inset-0 opacity-10 mix-blend-multiply" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1220px] gap-12 lg:grid-cols-[1fr_0.78fr] lg:items-end">
        <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.12 }}>
          <motion.p variants={reveal} className="text-xs uppercase tracking-[0.35em] text-[#c8a86c]/78">
            UX Research
          </motion.p>
          <motion.h1 variants={reveal} className="mt-5 max-w-5xl font-display text-5xl italic leading-[0.92] text-text-primary md:text-8xl">
            Why do people stop using apps they once loved?
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
            The first question sounded simple. Then it started falling apart.
          </p>
          <div className="mt-6 max-w-xl space-y-5 text-base leading-8 text-text-primary/66">
            <p>
              I started with a familiar product question: why do people stop using apps? The more I looked at it, the less simple that question felt.
            </p>
            <p>
              A dashboard can show that someone came back less often. It cannot explain whether that means frustration, a completed goal, a broken routine, social migration, fatigue, or a healthier boundary. I wanted the research to leave room for all of those possibilities.
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(16,18,18,0.86),rgba(8,9,9,0.92))] p-6 shadow-[0_32px_110px_rgba(0,0,0,0.28)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(202,168,106,0.13),transparent_42%)]" />
          <div className="relative grid gap-5 md:grid-cols-2">
            {abandonmentStates.map(([state, meaning], index) => (
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
            I treated abandonment as a timeline, not a yes-or-no state.
          </h2>
          <p className="mt-6 text-base leading-8 text-text-primary/66">
            Before I could explain why people left, I needed to understand what changed first: the product, the person's context, the routine around it, or the meaning it once had.
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
              Interviews could rebuild the relationship over time. Diaries could catch smaller moments closer to when they happened. Behavioral data could help check where memory was incomplete without replacing what the person said it meant.
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
          <h2 className="mt-4 text-4xl font-light leading-[1.04] md:text-6xl">
            I was looking for the moment the relationship changed.
          </h2>
        </div>
        <p className="max-w-2xl text-base leading-8 text-text-primary/66">
          Not the uninstall. Not the final missed session. The study is built to notice earlier signals: fading value, broken cues, substitution, and the difference between a lapse and a healthy ending.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-[2.6rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(202,168,106,0.13),transparent_46%),linear-gradient(180deg,rgba(15,17,17,0.94),rgba(8,9,9,0.97))] p-6 shadow-[0_32px_120px_rgba(0,0,0,0.32)]">
          <div className="grid items-end gap-8 md:grid-cols-[0.78fr_1fr] lg:grid-cols-1 xl:grid-cols-[0.78fr_1fr]">
              <div>
                <p className="font-display text-7xl italic leading-none text-text-primary md:text-8xl">24</p>
                <p className="mt-4 text-xs uppercase tracking-[0.24em] text-text-primary/44">Planned timeline interviews</p>
                <div className="mt-8 grid grid-cols-2 gap-3">
                  <div className="border-t border-white/10 pt-4">
                    <p className="font-display text-5xl italic leading-none text-text-primary">12</p>
                    <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-text-primary/42">Diary participants</p>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <p className="font-display text-5xl italic leading-none text-[#c8a86c]">0</p>
                    <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-text-primary/42">Findings claimed</p>
                  </div>
                </div>
              </div>
              <RelationshipMap activeMarker={activeStep} />
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
              <Eyebrow>What analytics can say</Eyebrow>
              <p className="mt-8 max-w-xl text-3xl font-light leading-tight text-text-primary md:text-5xl">
                A person returned less, stopped opening, canceled, or uninstalled.
              </p>
            </div>
          </div>
          <div className="relative p-8 md:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(51,75,84,0.28),transparent_46%)]" />
            <div className="relative">
              <Eyebrow>What research needs to know</Eyebrow>
              <p className="mt-8 max-w-xl text-3xl font-light leading-tight text-text-primary md:text-5xl">
                What kind of ending was this, and when did the relationship actually change?
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/8 px-8 py-12 text-center md:px-12">
          <p className="font-display text-6xl italic leading-none text-text-primary md:text-8xl">
            Less use is not always less value.
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-text-primary/62">
            That was the turning point. A decline can be a product problem, a life change, a completed job, or a boundary. The analysis needed to tell those endings apart.
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
            I wanted the analysis to leave room for contradictions.
          </h2>
        </div>
        <p className="max-w-2xl text-base leading-8 text-text-primary/66">
          Each case stays whole before it becomes a pattern. Only after timelines, diary moments, behavior data, and contradictions are compared would I turn the work into themes or opportunities.
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
              Non-use deserves the same care as use.
            </p>
          </div>
          <div className="space-y-6 text-base leading-8 text-text-primary/72 md:text-lg">
            <p>
              This project sharpened how I think about retention. A decline in use is not automatically a failure, and more engagement is not automatically better.
            </p>
            <p>
              The better question is slower and more human: what changed in the relationship between the person, the product, their context, and the alternatives around them?
            </p>
            <p>
              I would test this next through interviews and diaries, with special attention to hesitation, contradictions, healthy endings, and moments where metrics and meaning do not line up.
            </p>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

export function AppAbandonmentCaseStudy() {
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
