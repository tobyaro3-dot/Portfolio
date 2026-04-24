import { useLayoutEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  tapFactors,
  tapOutcomes,
  tapReflection,
  tapWorkflow,
  type TapFactorId,
  type TapScreenId,
} from "../../data/tapCaseStudy";

const reveal = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const transition = { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const };

function TapIcon({
  kind,
}: {
  kind:
    | "entry"
    | "attendance"
    | "rewards"
    | "operator"
    | "contactless"
    | "streak"
    | "wallet";
}) {
  if (kind === "contactless") {
    return (
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8 8.5a5 5 0 0 1 0 7" />
        <path d="M11 5.5a9 9 0 0 1 0 13" />
        <path d="M14 3a12 12 0 0 1 0 18" />
      </svg>
    );
  }

  if (kind === "wallet") {
    return (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3.5" y="6" width="17" height="12" rx="2.5" />
        <path d="M16 12h4.5" />
        <circle cx="16" cy="12" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (kind === "streak") {
    return (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3.5c1.2 3.1 4.5 4.5 4.5 8.1A4.5 4.5 0 1 1 7.5 11.6C7.5 8.2 9.8 6.8 12 3.5Z" />
      </svg>
    );
  }

  if (kind === "entry") {
    return (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 4.5H6.5A2.5 2.5 0 0 0 4 7v10a2.5 2.5 0 0 0 2.5 2.5H10" />
        <path d="M13 8.5 17 12l-4 3.5" />
        <path d="M8.5 12H17" />
      </svg>
    );
  }

  if (kind === "attendance") {
    return (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="5" y="4.5" width="14" height="15" rx="2.5" />
        <path d="M8.5 3.5v3" />
        <path d="M15.5 3.5v3" />
        <path d="M8 10.5h8" />
        <path d="M8 14.5h5" />
      </svg>
    );
  }

  if (kind === "rewards") {
    return (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 4.5 14.2 9l5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5L4.8 9.7l5-.7L12 4.5Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="8" cy="8" r="2.5" />
      <circle cx="16.5" cy="7.5" r="2.5" />
      <path d="M4.5 18.5a4 4 0 0 1 7 0" />
      <path d="M13 18.5a4 4 0 0 1 7 0" />
    </svg>
  );
}

function BackToWork() {
  return (
    <Link
      to="/"
      onClick={() => window.sessionStorage.setItem("portfolio-scroll-target", "work")}
      className="fixed left-4 top-4 z-50 rounded-full border border-white/10 bg-black/50 px-4 py-2 text-xs uppercase tracking-[0.2em] text-text-primary/80 backdrop-blur-xl transition hover:border-[#c9a84c]/50 hover:text-text-primary md:left-6 md:top-6"
    >
      Back to work
    </Link>
  );
}

function TapAmbientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-0 h-[38rem] w-[58rem] -translate-x-1/2 rounded-full bg-[#251b07]/70 blur-[120px]" />
      <div className="absolute -left-24 top-[20rem] h-[24rem] w-[32rem] rounded-full bg-[#c9a84c]/14 blur-[120px]" />
      <div className="absolute right-0 top-[16rem] h-[28rem] w-[30rem] rounded-full bg-[#6f5a1f]/12 blur-[120px]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_50%_18%,black,transparent_76%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.28)_54%,#050505_100%)]" />
    </div>
  );
}

function InteractionBeacon() {
  return (
    <button
      type="button"
      onClick={() => document.getElementById("tap-factor-rail")?.scrollIntoView({ behavior: "smooth", block: "center" })}
      className="group relative mx-auto cursor-pointer overflow-hidden rounded-[1.4rem] border border-[#c9a84c]/35 bg-[linear-gradient(135deg,rgba(201,168,76,0.18),rgba(232,201,122,0.08)_45%,rgba(255,255,255,0.08))] px-7 py-4 text-center shadow-[0_0_32px_rgba(201,168,76,0.12)] backdrop-blur-xl transition duration-300 hover:scale-[1.03] hover:border-[#e8c97a]/55 hover:shadow-[0_0_48px_rgba(201,168,76,0.18)]"
      aria-label="Click to interact with the TAP product demo"
    >
      <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.08),transparent)] opacity-70 transition duration-500 group-hover:translate-x-6" />
      <span className="relative z-10 block">
        <span className="block font-mono text-[10px] uppercase tracking-[0.34em] text-[#e8c97a]">Interactive Demo</span>
        <span className="mt-1 block font-display text-3xl italic leading-none text-[#fff7e7]">Click to interact</span>
      </span>
    </button>
  );
}

function TapHero({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 py-28 md:px-10 lg:px-16">
      <TapAmbientBackground />
      <div className="relative z-10 mx-auto grid w-full max-w-[1220px] items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
        <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.12 }}>
          <motion.p variants={reveal} className="text-xs uppercase tracking-[0.35em] text-[#c9a84c]">
            TAP
          </motion.p>
          <motion.h1 variants={reveal} className="mt-5 max-w-4xl text-5xl font-light leading-[0.95] tracking-tight text-text-primary md:text-7xl lg:text-8xl">
            What if entry{" "}
            <span className="font-display italic text-text-primary">didn&apos;t slow you down</span>
            ?
          </motion.h1>
          <motion.p variants={reveal} className="mt-6 max-w-xl text-base leading-8 text-text-primary/65 md:text-lg">
            TAP turns a simple phone tap into entry, attendance, streaks, and retention without adding more front-desk work.
          </motion.p>
          <motion.button
            variants={reveal}
            type="button"
            onClick={onStart}
            className="mt-10 rounded-full border border-[#c9a84c]/35 bg-[#c9a84c]/12 px-7 py-3.5 text-sm font-semibold text-text-primary shadow-[0_0_42px_rgba(201,168,76,0.14)] transition hover:scale-105 hover:bg-[#c9a84c]/18"
          >
            Start walkthrough
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.25 }}
          className="relative min-h-[470px]"
        >
          <motion.div
            animate={{
              y: [0, -8, 0],
              boxShadow: [
                "0 28px 90px rgba(0,0,0,0.48)",
                "0 34px 110px rgba(0,0,0,0.56)",
                "0 28px 90px rgba(0,0,0,0.48)",
              ],
            }}
            transition={{
              duration: 5.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-0 top-4 z-10 w-[68%] rounded-[2rem] border border-white/10 bg-[#171414]/92 p-5 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <div className="r-cut-monogram-like flex h-10 w-10 items-center justify-center bg-white text-[#0a0a0a] font-black text-2xl [clip-path:polygon(0%_0%,100%_0%,100%_75%,75%_100%,0%_100%)]">
                T
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#e8c97a]">Tap to enter</div>
            </div>
            <div className="mt-6 rounded-[1.5rem] border border-[#c9a84c]/24 bg-[#100f0e] p-5">
              <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full border border-[#c9a84c]/35"
                  animate={{ scale: [1, 1.3, 1.3], opacity: [0.55, 0.08, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                />
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full border border-[#e8c97a]/20"
                  animate={{ scale: [1, 1.55, 1.55], opacity: [0.35, 0.04, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 0.45 }}
                />
                <motion.div
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative flex h-20 w-20 items-center justify-center rounded-full border-[2px] border-[#c9a84c]/55 bg-[#1a1610] text-[#e8c97a] shadow-[0_0_32px_rgba(201,168,76,0.12)]"
                >
                  <TapIcon kind="contactless" />
                </motion.div>
              </div>
              <p className="mt-4 text-center font-headline text-lg font-extrabold uppercase tracking-[0.18em] text-white">
                Instant Entry
              </p>
              <p className="mt-2 text-center text-sm leading-6 text-white/60">
                No front desk pause. No app open. Just tap and walk in.
              </p>
            </div>
            <div className="mt-4 rounded-[1.3rem] border-l-2 border-[#c9a84c] bg-[#100f0e] px-4 py-3">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/45">
                <span>Apple Wallet pass</span>
                <span>Ready</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function TapFactorRail({
  activeFactorId,
  onChange,
}: {
  activeFactorId: TapFactorId;
  onChange: (id: TapFactorId) => void;
}) {
  return (
    <div id="tap-factor-rail" className="inline-flex max-w-full flex-wrap gap-2 rounded-[2rem] border border-white/10 bg-white/[0.04] p-2 backdrop-blur-xl">
      {tapFactors.map((factor) => (
        <button
          key={factor.id}
          type="button"
          onClick={() => onChange(factor.id)}
          className={`rounded-full px-4 py-2 text-sm transition ${
            activeFactorId === factor.id
              ? "bg-[#c9a84c] text-[#0a0a0a]"
              : "bg-black/20 text-text-primary/55 hover:text-text-primary"
          }`}
        >
          {factor.label}
        </button>
      ))}
    </div>
  );
}

function TapInsightPanel({ activeFactorId }: { activeFactorId: TapFactorId }) {
  const factor = tapFactors.find((item) => item.id === activeFactorId) ?? tapFactors[0];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={factor.id}
        initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
        transition={transition}
        className="rounded-[2rem] border border-[#c9a84c]/18 bg-[#141211]/88 p-5 shadow-[0_24px_90px_rgba(201,168,76,0.06)] backdrop-blur-xl md:p-6"
      >
        <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9a84c]">{factor.label}</p>
        <h3 className="mt-2 font-display text-4xl italic text-text-primary">{factor.shortLabel}</h3>
        {[
          ["Problem", factor.problem],
          ["Design Move", factor.designMove],
          ["Why It Matters", factor.whyItMatters],
        ].map(([label, copy]) => (
          <div key={label} className="mt-4 border-t border-white/10 pt-4">
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/35">{label}</p>
            <p className="mt-2 text-sm leading-7 text-text-primary/75">{copy}</p>
          </div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

function PhoneShell({
  activeScreen,
  setActiveScreen,
  activeFactorId,
}: {
  activeScreen: TapScreenId;
  setActiveScreen: (screen: TapScreenId) => void;
  activeFactorId: TapFactorId;
}) {
  const activeFactor = tapFactors.find((factor) => factor.id === activeFactorId) ?? tapFactors[0];
  const zoneActive = (zone: string) =>
    activeFactor.zones.includes(zone)
      ? "opacity-100 scale-100"
      : "opacity-45 scale-[0.985]";

  return (
    <div className="relative mx-auto w-full max-w-[510px]">
      <div className="absolute inset-0 rounded-[3rem] bg-[radial-gradient(circle_at_50%_18%,rgba(201,168,76,0.18),transparent_42%)] blur-3xl" />
      <div className="relative overflow-hidden rounded-[3rem] border border-[#3b352a] bg-[#0d0d0d] p-4 shadow-[0_40px_120px_rgba(0,0,0,0.5)]">
        <div className="mx-auto mb-4 h-6 w-44 rounded-b-[1.3rem] bg-black" />
        <div className="flex items-center justify-between px-2 text-sm font-semibold text-white/85">
          <span>9:41</span>
          <div className="flex items-center gap-2">
            <span>5G</span>
            <span className="h-3 w-7 rounded-[4px] border border-white/40 p-[1px]">
              <span className="block h-full w-4 rounded-[2px] bg-[#52e28c]" />
            </span>
          </div>
        </div>

        <div className="mt-4 rounded-full border border-white/10 bg-[#1b1a19] p-1.5">
          <div className="grid grid-cols-4 gap-1.5">
            {[
              ["entry", "entry", "Entry"],
              ["attendance", "attendance", "Attendance"],
              ["rewards", "rewards", "Rewards"],
              ["operator", "operator", "Operator"],
            ].map(([id, kind, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveScreen(id as TapScreenId)}
                aria-label={`Open ${label} screen`}
                className={`flex h-10 items-center justify-center rounded-full text-sm transition ${
                  activeScreen === id
                    ? "bg-[#c9a84c] text-[#0a0a0a] shadow-[0_0_24px_rgba(201,168,76,0.18)]"
                    : "text-white/45 hover:bg-white/[0.05] hover:text-white/70"
                }`}
              >
                <TapIcon kind={kind as "entry" | "attendance" | "rewards" | "operator"} />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 min-h-[560px] overflow-hidden rounded-[2rem] border border-white/8 bg-[#131313] p-4">
          {activeScreen === "entry" ? <EntryScreen zoneActive={zoneActive} setActiveScreen={setActiveScreen} /> : null}
          {activeScreen === "attendance" ? <AttendanceScreen zoneActive={zoneActive} setActiveScreen={setActiveScreen} /> : null}
          {activeScreen === "rewards" ? <RewardsScreen zoneActive={zoneActive} setActiveScreen={setActiveScreen} /> : null}
          {activeScreen === "operator" ? <OperatorScreen zoneActive={zoneActive} /> : null}
        </div>
      </div>
    </div>
  );
}

function EntryScreen({
  zoneActive,
  setActiveScreen,
}: {
  zoneActive: (zone: string) => string;
  setActiveScreen: (screen: TapScreenId) => void;
}) {
  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#c9a84c]">Create your pass</p>
          <h3 className="mt-2 font-headline text-lg font-black uppercase tracking-[0.12em] text-white">TAP Identity</h3>
        </div>
        <div className={`rounded-full border border-[#c9a84c]/25 bg-[#1a1610] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#e8c97a] transition ${zoneActive("entry-card")}`}>
          Active
        </div>
      </div>

      <div className={`mt-5 rounded-[1.8rem] border border-white/10 bg-[#171414] p-5 transition ${zoneActive("entry-pass")}`}>
        <div className="mx-auto flex h-16 w-16 items-center justify-center bg-white text-[#0a0a0a] font-black text-4xl [clip-path:polygon(0%_0%,100%_0%,100%_75%,75%_100%,0%_100%)]">
          T
        </div>
        <p className="mt-4 text-center font-headline text-sm font-black uppercase tracking-[0.26em] text-white">
          TokenTap Access
        </p>
        <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
          Where entry becomes consistency
        </p>

        <div className="mt-5 space-y-3">
          {["Username", "Email address", "Membership code"].map((field) => (
            <div key={field} className="border border-white/10 bg-[#1c1b1b] px-4 py-4 text-sm uppercase tracking-[0.14em] text-white/35">
              {field}
            </div>
          ))}
        </div>
      </div>

      <div className={`mt-5 rounded-[1.8rem] border-l-2 border-[#c9a84c] bg-[#1a1610] p-5 transition ${zoneActive("entry-cta")}`}>
        <div className="flex items-start gap-4">
          <div className="text-[#e8c97a]">
            <TapIcon kind="contactless" />
          </div>
          <div>
            <p className="font-headline text-sm font-black uppercase tracking-[0.16em] text-white">Add to Apple Wallet</p>
            <p className="mt-2 text-xs leading-6 text-white/60">
              Tap your phone to enter without opening an app or stopping at the desk.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setActiveScreen("attendance")}
          className="mt-5 w-full border border-[#c9a84c] px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#e8c97a] transition hover:bg-[#c9a84c] hover:text-[#0a0a0a]"
        >
          Set up NFC pass
        </button>
      </div>
    </div>
  );
}

function AttendanceScreen({
  zoneActive,
  setActiveScreen,
}: {
  zoneActive: (zone: string) => string;
  setActiveScreen: (screen: TapScreenId) => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => setActiveScreen("entry")} className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-white/80 transition hover:bg-white/10" aria-label="Go to entry screen">
          ←
        </button>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">Attendance</p>
          <h3 className="mt-1 font-headline text-lg font-black uppercase tracking-[0.12em] text-white">Automatic log</h3>
        </div>
      </div>

      <div className={`mt-5 rounded-[1.8rem] border border-white/10 bg-[#171414] p-5 transition ${zoneActive("attendance-status")}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-headline text-sm font-black uppercase tracking-[0.18em] text-white">Rhein Athletic Club</p>
            <p className="mt-1 text-xs text-white/45">Entry confirmed with one tap</p>
          </div>
          <div className="rounded-full bg-[#c9a84c] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0a]">
            Logged
          </div>
        </div>
        <div className="mt-5 flex items-center justify-center rounded-[1.4rem] border border-[#c9a84c]/28 bg-[#100f0e] py-6 text-[#e8c97a]">
          <TapIcon kind="contactless" />
        </div>
      </div>

      <div className={`mt-5 rounded-[1.8rem] border border-white/10 bg-[#171414] p-5 transition ${zoneActive("attendance-log")}`}>
        <div className="flex items-center justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#c9a84c]">Today</p>
          <p className="text-[11px] text-white/40">4:32 PM</p>
        </div>
        <div className="mt-4 space-y-3">
          {[
            ["Front gate tap", "Verified by NFC pass"],
            ["Attendance updated", "Saved to member history"],
            ["Streak checked", "Reward logic evaluated"],
          ].map(([title, meta]) => (
            <div key={title} className="rounded-[1.1rem] border border-white/10 bg-[#1c1b1b] px-4 py-3">
              <div className="text-sm font-medium text-white">{title}</div>
              <div className="mt-1 text-xs text-white/45">{meta}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={`mt-5 rounded-[1.8rem] border border-white/10 bg-[#171414] p-5 transition ${zoneActive("attendance-feed")}`}>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">Recent visits</p>
        <div className="mt-4 space-y-3">
          {["Today", "Yesterday", "Tue", "Mon"].map((day, index) => (
            <div key={day} className="flex items-center justify-between rounded-[1rem] bg-[#1c1b1b] px-4 py-3">
              <div>
                <div className="text-sm text-white">Rhein Athletic Club</div>
                <div className="mt-1 text-xs text-white/45">{index === 0 ? "4:32 PM" : "5:10 PM"}</div>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#e8c97a]">{day}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RewardsScreen({
  zoneActive,
  setActiveScreen,
}: {
  zoneActive: (zone: string) => string;
  setActiveScreen: (screen: TapScreenId) => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => setActiveScreen("attendance")} className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-white/80 transition hover:bg-white/10" aria-label="Go to attendance screen">
          ←
        </button>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">Streaks</p>
          <h3 className="mt-1 font-headline text-lg font-black uppercase tracking-[0.12em] text-white">Momentum</h3>
        </div>
      </div>

      <div className={`mt-5 rounded-[1.8rem] border border-white/10 bg-[#171414] p-5 transition ${zoneActive("rewards-streak")}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#c9a84c]">Current streak</p>
            <h4 className="mt-2 font-headline text-3xl font-black uppercase tracking-[0.08em] text-white">7 visits</h4>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#c9a84c] text-[#0a0a0a]">
            <TapIcon kind="streak" />
          </div>
        </div>
        <div className="mt-5 grid grid-cols-7 gap-2">
          {Array.from({ length: 7 }, (_, index) => (
            <div
              key={index}
              className={`h-10 rounded-full ${index < 6 ? "bg-[#c9a84c]" : "border border-[#c9a84c]/35 bg-[#2b2413]"}`}
            />
          ))}
        </div>
      </div>

      <div className={`mt-5 rounded-[1.8rem] border border-white/10 bg-[#171414] p-5 transition ${zoneActive("rewards-milestones")}`}>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">Milestones</p>
        <div className="mt-4 space-y-3">
          {[
            { title: "3 visits", meta: "Free guest pass", done: true },
            { title: "7 visits", meta: "Protein bar reward", done: true },
            { title: "12 visits", meta: "Priority booking", done: false },
          ].map(({ title, meta, done }) => (
            <div key={title} className="flex items-center justify-between rounded-[1rem] border border-white/10 bg-[#1c1b1b] px-4 py-3">
              <div>
                <div className="text-sm text-white">{title}</div>
                <div className="mt-1 text-xs text-white/45">{meta}</div>
              </div>
              <div className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] ${done ? "bg-[#c9a84c] text-[#0a0a0a]" : "bg-white/5 text-white/45"}`}>
                {done ? "Unlocked" : "Pending"}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setActiveScreen("operator")}
        className={`mt-5 w-full rounded-[1.2rem] bg-[#c9a84c] px-4 py-3 text-center font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#0a0a0a] transition hover:brightness-110 ${zoneActive("rewards-cta")}`}
      >
        View business dashboard
      </button>
    </div>
  );
}

function OperatorScreen({ zoneActive }: { zoneActive: (zone: string) => string }) {
  return (
    <div>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#c9a84c]">Operator View</p>
        <h3 className="mt-2 font-headline text-lg font-black uppercase tracking-[0.12em] text-white">Retention signals</h3>
      </div>

      <div className={`mt-5 rounded-[1.8rem] border border-white/10 bg-[#171414] p-5 transition ${zoneActive("operator-overview")}`}>
        <div className="grid grid-cols-3 gap-3">
          {[
            ["142", "Active members"],
            ["27", "Check-ins today"],
            ["18", "Streaks alive"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-[1.2rem] border border-white/10 bg-[#1c1b1b] p-4 text-center">
              <div className="font-headline text-3xl font-black text-[#e8c97a]">{value}</div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={`mt-5 rounded-[1.8rem] border border-white/10 bg-[#171414] p-5 transition ${zoneActive("operator-risk")}`}>
        <div className="flex items-center justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">At risk</p>
          <p className="text-[11px] text-white/40">Members who dropped below weekly rhythm</p>
        </div>
        <div className="mt-4 space-y-3">
          {[
            ["Maya R.", "Last visit 8 days ago"],
            ["Jordan K.", "Streak broken this week"],
            ["Luis A.", "No tap since reward claim"],
          ].map(([name, meta]) => (
            <div key={name} className="flex items-center justify-between rounded-[1rem] border border-white/10 bg-[#1c1b1b] px-4 py-3">
              <div>
                <div className="text-sm text-white">{name}</div>
                <div className="mt-1 text-xs text-white/45">{meta}</div>
              </div>
              <div className="rounded-full bg-[#2b2413] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#e8c97a]">Review</div>
            </div>
          ))}
        </div>
      </div>

      <div className={`mt-5 rounded-[1.8rem] border border-white/10 bg-[#171414] p-5 transition ${zoneActive("operator-members")}`}>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">Most active members</p>
        <div className="mt-4 space-y-3">
          {[
            ["Ari P.", "11 visit streak"],
            ["Cam W.", "9 visit streak"],
            ["Sofia L.", "8 visit streak"],
          ].map(([name, meta]) => (
            <div key={name} className="flex items-center justify-between rounded-[1rem] bg-[#1c1b1b] px-4 py-3">
              <div>
                <div className="text-sm text-white">{name}</div>
                <div className="mt-1 text-xs text-white/45">{meta}</div>
              </div>
              <div className="text-[#e8c97a]">
                <TapIcon kind="streak" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TapWorkflowStrip() {
  return (
    <section className="relative px-6 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1220px]">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-muted">Workflow</p>
          <h2 className="mx-auto mt-4 max-w-5xl text-4xl font-light leading-[1.04] md:text-6xl">
            Structure attendance
            <br />
            into something that builds over time.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-5">
          {tapWorkflow.map((step, index) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="flex h-full flex-col rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c9a84c]/12 text-sm font-semibold text-[#c9a84c]">
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

function TapOutcomes() {
  return (
    <section className="relative px-6 pb-20 pt-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1220px]">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-muted">Outcomes</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-light md:text-6xl">
            A smaller interaction with a bigger retention effect.
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {tapOutcomes.map((outcome) => (
            <motion.div
              key={outcome.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
            >
              <h3 className="text-xl text-text-primary">{outcome.title}</h3>
              <div className="mt-5 rounded-[1.4rem] border border-white/10 bg-[#171414] p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">Before</p>
                <p className="mt-2 text-sm leading-7 text-text-primary/65">{outcome.before}</p>
              </div>
              <div className="mt-4 rounded-[1.4rem] border border-[#c9a84c]/18 bg-[#1b170f] p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9a84c]">After</p>
                <p className="mt-2 text-sm leading-7 text-text-primary/75">{outcome.after}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TapReflection() {
  return (
    <section className="relative px-6 pb-28 pt-6 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[860px] rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-xl md:p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-muted">{tapReflection.heading}</p>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-text-primary/72 md:text-lg">
          {tapReflection.body}
        </p>
      </div>
    </section>
  );
}

export function TapCaseStudy() {
  const [activeFactorId, setActiveFactorId] = useState<TapFactorId>("entry-experience");
  const [activeScreen, setActiveScreen] = useState<TapScreenId>("entry");

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const handleFactorChange = (factorId: TapFactorId) => {
    setActiveFactorId(factorId);
    const factor = tapFactors.find((item) => item.id === factorId);
    if (factor) {
      setActiveScreen(factor.screen);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-text-primary">
      <TapAmbientBackground />
      <BackToWork />
      <TapHero onStart={() => document.getElementById("tap-demo")?.scrollIntoView({ behavior: "smooth" })} />

      <section id="tap-demo" className="relative px-6 py-20 md:px-10 lg:px-16">
        <div className="mx-auto max-w-[1220px]">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.35em] text-muted">Interactive product demo</p>
            <h2 className="mt-4 text-4xl font-light md:text-6xl">
              Highlight the system decision that matters.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-text-primary/65 md:text-base">
              Each layer shows how a simple tap becomes entry, attendance, motivation, and retention without adding more friction.
            </p>
          </div>

          <TapFactorRail activeFactorId={activeFactorId} onChange={handleFactorChange} />

          <div className="mt-6 grid items-start gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <TapInsightPanel activeFactorId={activeFactorId} />
            <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl md:p-6">
              <div className="mb-5 text-center">
                <div className="mx-auto w-full">
                  <InteractionBeacon />
                </div>
              </div>
              <PhoneShell activeScreen={activeScreen} setActiveScreen={setActiveScreen} activeFactorId={activeFactorId} />
            </div>
          </div>
        </div>
      </section>

      <TapWorkflowStrip />
      <TapOutcomes />
      <TapReflection />
    </main>
  );
}
