import { useLayoutEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  solmateFactors,
  solmateOutcomes,
  solmateScreens,
  solmateWorkflow,
  type SolmateFactorId,
  type SolmateScreenId,
} from "../../data/solmateCaseStudy";

const reveal = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const transition = { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const };
const soccerBallPng = "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/26bd.png";

function AppIcon({ kind }: { kind: "home" | "record" | "drills" | "teams" | "mic" }) {
  if (kind === "home") {
    return (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4.5 10.5L12 4.5l7.5 6" />
        <path d="M7.5 9.5V19.5H16.5V9.5" />
      </svg>
    );
  }

  if (kind === "record" || kind === "mic") {
    return (
      <svg viewBox="0 0 24 24" className={kind === "mic" ? "h-10 w-10" : "h-[18px] w-[18px]"} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="9" y="3.5" width="6" height="11" rx="3" />
        <path d="M6.5 11.5a5.5 5.5 0 0 0 11 0" />
        <path d="M12 17v3.5" />
        <path d="M9 20.5h6" />
      </svg>
    );
  }

  if (kind === "drills") {
    return (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="6" y="4.5" width="12" height="15" rx="2.5" />
        <path d="M9 9h6" />
        <path d="M9 13h6" />
        <path d="M9 17h4.5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="9" r="3" />
      <circle cx="16.5" cy="8" r="2.5" />
      <path d="M4.5 18.5a4.5 4.5 0 0 1 9 0" />
      <path d="M13.5 18.5a3.5 3.5 0 0 1 7 0" />
    </svg>
  );
}

function InteractionBeacon() {
  return (
    <button
      type="button"
      onClick={() => document.getElementById("solmate-factor-rail")?.scrollIntoView({ behavior: "smooth", block: "center" })}
      className="group relative mx-auto cursor-pointer overflow-hidden rounded-[1.6rem] border border-[#4fa8b8]/35 bg-[linear-gradient(135deg,rgba(78,133,191,0.18),rgba(79,168,184,0.08)_45%,rgba(242,169,0,0.14))] px-7 py-4 text-center shadow-[0_0_32px_rgba(78,133,191,0.14)] backdrop-blur-xl transition duration-300 hover:scale-[1.03] hover:border-[#89aacc]/55 hover:shadow-[0_0_48px_rgba(78,133,191,0.22)]"
      aria-label="Click to interact with the product demo"
    >
      <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.08),transparent)] opacity-70 transition duration-500 group-hover:translate-x-6" />
      <span className="pointer-events-none absolute -left-10 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full bg-[#4fa8b8]/18 blur-3xl" />
      <span className="pointer-events-none absolute right-0 top-0 h-16 w-16 rounded-full bg-[#f2a900]/12 blur-2xl" />
      <span className="relative z-10 block">
        <span className="block text-[10px] uppercase tracking-[0.34em] text-[#89aacc]">Interactive Demo</span>
        <span className="mt-1 block font-display text-3xl italic leading-none text-[#e7f3ff]">
          Click to interact
        </span>
      </span>
    </button>
  );
}

function BackToWork() {
  return (
    <Link
      to="/"
      onClick={() => window.sessionStorage.setItem("portfolio-scroll-target", "work")}
      className="fixed left-4 top-4 z-50 rounded-full border border-white/10 bg-black/50 px-4 py-2 text-xs uppercase tracking-[0.2em] text-text-primary/80 backdrop-blur-xl transition hover:border-[#f2a900]/50 hover:text-text-primary md:left-6 md:top-6"
    >
      Back to work
    </Link>
  );
}

function SolmateAmbientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-0 h-[38rem] w-[56rem] -translate-x-1/2 rounded-full bg-[#0b2545]/55 blur-[120px]" />
      <div className="absolute -left-24 top-[22rem] h-[24rem] w-[34rem] rounded-full bg-[#f2a900]/12 blur-[120px]" />
      <div className="absolute -right-20 top-[18rem] h-[28rem] w-[28rem] rounded-full bg-[#4fa8b8]/14 blur-[110px]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_50%_18%,black,transparent_76%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.32)_54%,#03070d_100%)]" />
    </div>
  );
}

function SolShieldLogo() {
  return (
    <div className="relative flex h-24 w-20 items-center justify-center">
      <div className="absolute inset-0 bg-[#4fa8b8] [clip-path:polygon(50%_0%,100%_0%,100%_65%,50%_100%,0%_65%,0%_0%)]" />
      <div className="absolute inset-[2px] bg-[#0b2545] [clip-path:polygon(50%_0%,100%_0%,100%_65%,50%_100%,0%_65%,0%_0%)]" />
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative mb-1 h-8 w-8">
          <div className="absolute inset-0 m-auto h-3 w-3 rounded-full bg-[#f2a900]" />
          {Array.from({ length: 8 }, (_, index) => (
            <span
              key={index}
              className="absolute left-1/2 top-1/2 h-3 w-[2px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f2a900]"
              style={{ transform: `translate(-50%, -50%) rotate(${index * 45}deg) translateY(-10px)` }}
            />
          ))}
        </div>
        <div className="font-semibold tracking-[0.28em] text-white text-[11px]">SOL SC</div>
        <div className="mt-1 flex gap-1 text-[7px] text-[#f2a900]">
          <span>*</span>
          <span>*</span>
          <span>*</span>
          <span>*</span>
        </div>
      </div>
    </div>
  );
}

function SolmateHero({
  onStart,
}: {
  onStart: () => void;
}) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 py-28 md:px-10 lg:px-16">
      <SolmateAmbientBackground />
      <div className="relative z-10 mx-auto grid w-full max-w-[1220px] items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
        <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.12 }}>
          <motion.p variants={reveal} className="text-xs uppercase tracking-[0.35em] text-[#f2a900]">
            SolMate
          </motion.p>
          <motion.h1
            variants={reveal}
            className="mt-5 max-w-4xl text-5xl font-light leading-[0.95] tracking-tight text-text-primary md:text-7xl lg:text-8xl"
          >
            Coaching{" "}
            <span className="font-display italic text-text-primary">shouldn't disappear</span>{" "}
            after it happens.
          </motion.h1>
          <motion.p variants={reveal} className="mt-6 max-w-xl text-base leading-8 text-text-primary/65 md:text-lg">
            A coaching assistant that turns spoken pain points into reusable drills, team-aware planning, and clearer on-field execution.
          </motion.p>
          <motion.button
            variants={reveal}
            type="button"
            onClick={onStart}
            className="mt-10 rounded-full border border-[#f2a900]/35 bg-[#f2a900]/12 px-7 py-3.5 text-sm font-semibold text-text-primary shadow-[0_0_42px_rgba(242,169,0,0.14)] transition hover:scale-105 hover:bg-[#f2a900]/18"
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
          <div className="absolute right-0 top-12 z-0 w-[72%] rounded-[2rem] border border-white/10 bg-[#081321]/85 p-5 shadow-[0_28px_90px_rgba(79,168,184,0.14)] backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div className="text-[10px] uppercase tracking-[0.24em] text-[#4fa8b8]">Generated drill</div>
              <span className="rounded-full bg-[#4fa8b8]/15 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[#7ad3e0]">
                Auto
              </span>
            </div>
            <div className="mt-4 rounded-[1.5rem] border border-white/10 bg-[#1a6e3a] p-4">
              <div className="relative h-40 overflow-hidden rounded-[1rem] border border-white/15 bg-[linear-gradient(180deg,#1a6e3a,#14572f)]">
                <div className="absolute inset-3 rounded border border-white/25" />
                <div className="absolute left-1/2 top-3 bottom-3 w-px -translate-x-1/2 bg-white/20" />
                <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20" />
                <div className="absolute left-[12%] top-[72%] text-[10px] font-medium uppercase tracking-[0.16em] text-white/35">
                  Start
                </div>
                {[
                  "left-[43%] top-[76%] h-[2px] w-[31%] -rotate-[140deg]",
                  "left-[24%] top-[44%] h-[2px] w-[31%] -rotate-[40deg]",
                  "left-[43%] top-[14%] h-[2px] w-[31%] rotate-[40deg]",
                  "left-[62%] top-[44%] h-[2px] w-[31%] rotate-[140deg]",
                ].map((line) => (
                  <div
                    key={line}
                    className={`absolute ${line} bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.52)_0,rgba(255,255,255,0.52)_6px,transparent_6px,transparent_12px)]`}
                  />
                ))}
                {[
                  "left-[42%] top-[70%]",
                  "left-[23%] top-[39%]",
                  "left-[42%] top-[11%]",
                  "left-[66%] top-[39%]",
                ].map((pos, index) => (
                  <div
                    key={pos}
                    className={`absolute ${pos} flex h-7 w-7 items-center justify-center rounded-full bg-[#f2a900] text-[10px] font-bold text-[#060f1e]`}
                  >
                    {String.fromCharCode(65 + index)}
                  </div>
                ))}
                <div className="solmate-ball absolute left-[45%] top-[73%] flex h-5 w-5 items-center justify-center">
                  <img
                    src={soccerBallPng}
                    alt=""
                    className="h-5 w-5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.28)]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute left-0 top-6 z-10 w-[68%] rounded-[2rem] border border-white/10 bg-[#0d1f3c]/88 p-5 shadow-[0_28px_90px_rgba(0,0,0,0.48)] backdrop-blur-xl">
            <div className="text-[10px] uppercase tracking-[0.24em] text-[#f2a900]">Record pain point</div>
            <div className="mt-5 flex flex-wrap gap-2">
              {["U14 Boys", "U12 Girls", "U16 Boys"].map((team, index) => (
                <span
                  key={team}
                  className={`rounded-full px-3 py-2 text-xs ${
                    index === 0 ? "bg-[#f2a900] text-[#060f1e]" : "bg-white/5 text-text-primary/55"
                  }`}
                >
                  {team}
                </span>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#f2a900]/35 bg-[#112d55] text-2xl text-[#f2a900] shadow-[0_0_30px_rgba(242,169,0,0.15)]">
                Mic
              </div>
              <div className="flex-1">
                <div className="flex items-end gap-1">
                  {Array.from({ length: 10 }, (_, index) => (
                    <span
                      key={index}
                      className="block w-1 rounded-full bg-[#f2a900]"
                      style={{ height: `${10 + ((index % 5) + 1) * 4}px` }}
                    />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-6 text-text-primary/65">
                  "My U14 boys struggle to progress forward and take too many touches under pressure..."
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function zoneState(
  activeScreen: SolmateScreenId,
  factorScreen: SolmateScreenId,
  active: boolean,
) {
  if (activeScreen !== factorScreen) {
    return "opacity-100";
  }

  return active
    ? "opacity-100 ring-1 ring-[#f2a900]/55 shadow-[0_0_34px_rgba(242,169,0,0.18)]"
    : "opacity-45";
}

function PhoneShell({
  activeScreen,
  setActiveScreen,
  activeFactorId,
}: {
  activeScreen: SolmateScreenId;
  setActiveScreen: (screen: SolmateScreenId) => void;
  activeFactorId: SolmateFactorId;
}) {
  const factor = solmateFactors.find((item) => item.id === activeFactorId) ?? solmateFactors[0];
  const zoneActive = (zone: string) =>
    factor.zones.includes(zone) ? zoneState(activeScreen, factor.screen, true) : zoneState(activeScreen, factor.screen, false);

  return (
    <div className="relative mx-auto w-full max-w-[410px]">
      <div className="relative overflow-hidden rounded-[3rem] border-[3px] border-[#1a2a44] bg-[#060f1e] shadow-[0_30px_80px_rgba(0,0,0,0.65),0_0_120px_rgba(242,169,0,0.06)]">
        <div className="absolute left-1/2 top-0 z-30 h-8 w-36 -translate-x-1/2 rounded-b-[1.2rem] bg-black" />
        <div className="absolute inset-x-0 top-0 z-20 flex h-12 items-end justify-between px-6 pb-2 text-xs font-semibold text-white/90">
          <span>9:41</span>
          <div className="flex items-center gap-2">
            <span>5G</span>
            <span className="h-2.5 w-6 rounded-sm border border-white/80 before:block before:h-1.5 before:w-4 before:translate-x-0.5 before:translate-y-0.5 before:rounded-[2px] before:bg-[#2ecc71] before:content-['']" />
          </div>
        </div>

        <div className="min-h-[760px] px-0 pb-20 pt-14">
          <div className="px-5">
            <div className="mb-5 flex gap-2 rounded-full border border-white/10 bg-white/[0.04] p-1">
              {solmateScreens.map((screen) => (
                <button
                  key={screen.id}
                  type="button"
                  onClick={() => setActiveScreen(screen.id)}
                  className={`flex-1 cursor-pointer rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.18em] transition hover:scale-[1.03] active:scale-[0.98] ${
                    activeScreen === screen.id
                      ? "bg-[#f2a900] text-[#060f1e]"
                      : "text-text-primary/45 hover:bg-white/[0.05] hover:text-text-primary"
                  }`}
                  aria-label={screen.label}
                >
                  <span className="flex items-center justify-center">
                    <AppIcon kind={screen.id} />
                  </span>
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeScreen}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={transition}
              className="px-5"
            >
              {activeScreen === "home" ? <HomeScreen zoneActive={zoneActive} setActiveScreen={setActiveScreen} /> : null}
              {activeScreen === "record" ? <RecordScreen zoneActive={zoneActive} setActiveScreen={setActiveScreen} /> : null}
              {activeScreen === "drills" ? <DrillsScreen zoneActive={zoneActive} setActiveScreen={setActiveScreen} /> : null}
              {activeScreen === "teams" ? <TeamsScreen zoneActive={zoneActive} /> : null}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex h-[74px] items-center justify-around bg-[linear-gradient(to_top,#060f1e_72%,transparent)] px-3 pb-3">
          {[
            ["home", "Home"],
            ["record", "Record"],
            ["drills", "Drills"],
            ["teams", "Teams"],
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveScreen(id as SolmateScreenId)}
              className={`relative z-10 flex cursor-pointer flex-col items-center gap-1 rounded-2xl px-3 py-2 text-[10px] font-semibold transition hover:scale-[1.05] active:scale-[0.97] ${
                activeScreen === id ? "text-[#f2a900]" : "text-white/35"
              }`}
              aria-label={label}
            >
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-full text-base transition ${
                  activeScreen === id
                    ? "bg-[#f2a900] text-[#060f1e] shadow-[0_0_24px_rgba(242,169,0,0.22)]"
                    : "hover:bg-white/[0.06]"
                }`}
              >
                <AppIcon kind={id as "home" | "record" | "drills" | "teams"} />
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function HomeScreen({
  zoneActive,
  setActiveScreen,
}: {
  zoneActive: (zone: string) => string;
  setActiveScreen: (screen: SolmateScreenId) => void;
}) {
  return (
    <div>
      <div className="mb-6 text-center">
        <p className="font-semibold uppercase tracking-[0.18em] text-[#f2a900]">Good Evening</p>
        <p className="mt-2 text-sm text-white/55">Smart Coaching Assistant for Sol SC</p>
      </div>
      <div className="mb-6 flex justify-center">
        <SolShieldLogo />
      </div>
      <button
        type="button"
        onClick={() => setActiveScreen("record")}
        className={`mb-5 w-full rounded-2xl bg-[linear-gradient(135deg,#f2a900,#d4920a)] p-5 text-left text-[#060f1e] transition hover:scale-[1.01] ${zoneActive("home-stats")}`}
      >
        <p className="text-xs uppercase tracking-[0.22em]">Record pain point</p>
        <h3 className="mt-2 text-xl font-semibold">Describe what your players struggle with.</h3>
        <p className="mt-2 text-sm text-[#060f1e]/70">SolMate handles the structure after that.</p>
      </button>
      <div className={`mb-6 grid grid-cols-3 gap-3 transition ${zoneActive("home-stats")}`}>
        {[
          ["47", "Drills Made"],
          ["6", "Teams"],
          ["12h", "Saved"],
        ].map(([value, label]) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-[#0d1f3c] p-4 text-center">
            <div className="text-3xl font-semibold text-[#f2a900]">{value}</div>
            <div className="mt-2 text-[10px] uppercase tracking-[0.14em] text-white/45">{label}</div>
          </div>
        ))}
      </div>
      <div className={`transition ${zoneActive("home-recent-drills")}`}>
        <div className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/75">Recent drills</div>
        {[
          ["Forward Progression Circuit", "U14 Boys · 45 min · Attacking", "Today"],
          ["Defensive Shape Reset", "U12 Girls · 30 min · Defending", "Yesterday"],
          ["First Touch Under Pressure", "U16 Boys · 40 min · Technical", "Mar 9"],
        ].map(([title, meta, date]) => (
          <button
            key={title}
            type="button"
            onClick={() => setActiveScreen("drills")}
            className="mb-2 flex w-full items-center gap-3 rounded-2xl border border-white/5 bg-[#0d1f3c] p-3 text-left transition hover:border-white/10 hover:bg-[#13294d]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f2a900]/10 text-[#f2a900]">D</div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-white">{title}</div>
              <div className="mt-1 text-xs text-white/45">{meta}</div>
            </div>
            <div className="text-[11px] text-white/35">{date}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function RecordScreen({
  zoneActive,
  setActiveScreen,
}: {
  zoneActive: (zone: string) => string;
  setActiveScreen: (screen: SolmateScreenId) => void;
}) {
  const transcript =
    "My U14 boys are struggling to progress forward. They take too many touches in tight spaces and do not commit to drives.";
  const [selectedTeam, setSelectedTeam] = useState("U14 Boys");

  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <button type="button" onClick={() => setActiveScreen("home")} className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-white/80 transition hover:bg-white/10" aria-label="Go to home screen">
          ←
        </button>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-white/35">Capture</p>
          <h3 className="text-lg font-semibold text-white">Record Pain Point</h3>
        </div>
      </div>
      <div className={`mb-6 flex flex-wrap gap-2 transition ${zoneActive("record-team-pills")}`}>
        {["U14 Boys", "U12 Girls", "U16 Boys", "U10 Girls"].map((team) => (
          <button
            key={team}
            type="button"
            onClick={() => setSelectedTeam(team)}
            className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
              selectedTeam === team
                ? "border-[#f2a900] bg-[#f2a900] text-[#060f1e]"
                : "border-white/10 text-white/45 hover:border-white/20 hover:text-white/70"
            }`}
          >
            {team}
          </button>
        ))}
      </div>
      <div className={`mb-6 flex flex-col items-center transition ${zoneActive("record-mic")}`}>
        <div className="flex h-28 w-28 items-center justify-center rounded-full border-[3px] border-[#f2a900]/35 bg-[#112d55] text-[#f2a900] shadow-[0_0_40px_rgba(242,169,0,0.18)]">
          <AppIcon kind="mic" />
        </div>
        <p className="mt-4 text-sm text-white/55">Tap to describe the problem</p>
        <div className="mt-5 flex h-10 items-end gap-1">
          {Array.from({ length: 24 }, (_, index) => (
            <span
              key={index}
              className="solmate-wave-bar w-1 rounded-full bg-[#f2a900]"
              style={{ animationDelay: `${index * 0.06}s` }}
            />
          ))}
        </div>
      </div>
      <div className={`mb-5 rounded-2xl border border-white/10 bg-[#0d1f3c] p-4 transition ${zoneActive("record-transcript")}`}>
        <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">Live transcript</p>
        <p className="mt-3 text-sm leading-7 text-white/75">{transcript}</p>
      </div>
      <button
        type="button"
        onClick={() => setActiveScreen("drills")}
        className={`w-full rounded-2xl bg-[#f2a900] px-5 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#060f1e] transition hover:scale-[1.01] ${zoneActive("record-generate")}`}
      >
        Generate Drill Plan
      </button>
    </div>
  );
}

function DrillsScreen({
  zoneActive,
  setActiveScreen,
}: {
  zoneActive: (zone: string) => string;
  setActiveScreen: (screen: SolmateScreenId) => void;
}) {
  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <button type="button" onClick={() => setActiveScreen("record")} className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-white/80 transition hover:bg-white/10" aria-label="Go to record screen">
          ←
        </button>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-white/35">Generate</p>
          <h3 className="text-lg font-semibold text-white">Drill Plan</h3>
        </div>
      </div>
      <div className={`transition ${zoneActive("drills-title")}`}>
        <h4 className="text-2xl font-semibold uppercase tracking-[0.08em] text-white">
          Forward Progression Circuit
        </h4>
      </div>
      <div className={`mb-5 mt-3 flex flex-wrap gap-2 transition ${zoneActive("drills-tags")}`}>
        {[
          { label: "U14 Boys", auto: false },
          { label: "45 Min", auto: false },
          { label: "Attacking", auto: false },
          { label: "Auto-Generated", auto: true },
        ].map(({ label, auto }) => (
          <span
            key={label}
            className={`rounded-lg px-3 py-1.5 text-[11px] font-semibold ${
              auto ? "bg-[#4fa8b8]/15 text-[#7ad3e0]" : "bg-[#f2a900]/10 text-[#f2a900]"
            }`}
          >
            {label}
          </span>
        ))}
      </div>
      <div className={`mb-5 rounded-2xl border border-white/10 bg-[#1a6e3a] p-3 transition ${zoneActive("drills-field")}`}>
        <div className="relative h-60 overflow-hidden rounded-[1rem] border border-white/15 bg-[linear-gradient(180deg,#1a6e3a,#14572f)]">
          <div className="absolute inset-3 rounded border border-white/25" />
          <div className="absolute left-1/2 top-3 bottom-3 w-px -translate-x-1/2 bg-white/25" />
          <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/25" />
          {[
            "left-[15%] top-[72%]",
            "left-[15%] top-[40%]",
            "left-[38%] top-[10%]",
            "left-[62%] top-[10%]",
            "left-[85%] top-[40%]",
            "left-[85%] top-[72%]",
          ].map((position) => (
            <div
              key={position}
              className={`absolute ${position} h-0 w-0 border-x-[6px] border-x-transparent border-b-[10px] border-b-[#ff6b35]`}
            />
          ))}
          {[
            { pos: "left-[42%] top-[72%]", label: "A" },
            { pos: "left-[18%] top-[40%]", label: "B" },
            { pos: "left-[42%] top-[12%]", label: "C" },
            { pos: "left-[68%] top-[40%]", label: "D" },
          ].map((player) => (
            <div
              key={player.label}
              className={`absolute ${player.pos} flex h-7 w-7 items-center justify-center rounded-full bg-[#f2a900] text-[10px] font-bold text-[#060f1e]`}
            >
              {player.label}
            </div>
          ))}
          <div className="solmate-ball absolute left-[45%] top-[75%] flex h-5 w-5 items-center justify-center">
            <img
              src={soccerBallPng}
              alt=""
              className="h-5 w-5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.28)]"
            />
          </div>
          <div className="absolute left-[46%] top-[77%] h-[2px] w-[28%] -rotate-[140deg] bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.5)_0,rgba(255,255,255,0.5)_6px,transparent_6px,transparent_12px)]" />
          <div className="absolute left-[20%] top-[42%] h-[2px] w-[28%] -rotate-[39deg] bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.5)_0,rgba(255,255,255,0.5)_6px,transparent_6px,transparent_12px)]" />
          <div className="absolute left-[45%] top-[15%] h-[2px] w-[28%] rotate-[38deg] bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.5)_0,rgba(255,255,255,0.5)_6px,transparent_6px,transparent_12px)]" />
          <div className="absolute left-[70%] top-[42%] h-[2px] w-[28%] rotate-[140deg] bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.5)_0,rgba(255,255,255,0.5)_6px,transparent_6px,transparent_12px)]" />
        </div>
      </div>
      <div className={`transition ${zoneActive("drills-steps")}`}>
        <div className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/75">Drill steps</div>
        {[
          ["Ground Pass & Move", "Player A passes firmly to Player B's front foot, then shuffles to stay open."],
          ["Open Body Shape", "Player B receives with open body, sets, and passes to Player C."],
          ["Quick Tempo Switch", "Player C plays a direct pass to Player D to keep tempo high."],
          ["Complete the Circuit", "Player D resets to Player A and the group rotates every 5 circuits."],
        ].map(([title, description], index) => (
          <div key={title} className="flex gap-3 border-b border-white/5 py-3 last:border-b-0">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#f2a900] text-[11px] font-bold text-[#060f1e]">
              {index + 1}
            </div>
            <div>
              <div className="text-sm font-semibold text-white">{title}</div>
              <div className="mt-1 text-xs leading-6 text-white/45">{description}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 flex gap-3">
        <button type="button" className="flex-1 rounded-2xl bg-[#f2a900] px-4 py-3 text-sm font-semibold text-[#060f1e]">
          Save to Library
        </button>
        <button type="button" className="flex-1 rounded-2xl border border-white/10 bg-[#112d55] px-4 py-3 text-sm font-semibold text-white">
          Share
        </button>
      </div>
    </div>
  );
}

function TeamsScreen({
  zoneActive,
}: {
  zoneActive: (zone: string) => string;
}) {
  return (
    <div>
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.16em] text-white/35">Library</p>
        <h3 className="text-lg font-semibold text-white">Team Profiles</h3>
      </div>
      <div className={`transition ${zoneActive("teams-cards")}`}>
        {[
          ["U14 Boys", "Coach Rivera · Florida Premier League · Division 1", "18 Drills"],
          ["U12 Girls", "Coach Nguyen · Central Florida Soccer Alliance · Division 2", "14 Drills"],
          ["U16 Boys", "Coach Adams · Florida Premier League · Division 1", "15 Drills"],
        ].map(([name, details, count], index) => (
          <div key={name} className="mb-3 rounded-2xl border border-white/10 bg-[#0d1f3c] p-4">
            <div className="flex items-center justify-between">
              <div className="text-base font-semibold text-white">{name}</div>
              <div className="rounded-full bg-[#f2a900]/10 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[#f2a900]">
                {count}
              </div>
            </div>
            <div className="mt-2 text-xs text-white/45">{details}</div>
            <div className={`mt-3 flex flex-wrap gap-2 transition ${zoneActive("teams-pain-tags")}`}>
              {(
                index === 0
                  ? ["Forward progression", "Too many touches", "Winning headers", "Ball retention", "Set piece delivery"]
                  : index === 1
                    ? ["Defensive shape", "Communication", "First touch", "Pressing triggers"]
                    : ["Transition speed", "Buildup from back", "Wide play"]
              )
                .map((tag, tagIndex) => (
                  <span
                    key={tag}
                    className={`rounded-full px-3 py-1.5 text-[11px] ${
                      tagIndex < 2 ? "bg-[#f2a900]/10 text-[#f2a900]" : "bg-white/5 text-white/45"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
            </div>
          </div>
        ))}
      </div>
      <div className={`mt-6 transition ${zoneActive("teams-history")}`}>
        <div className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/75">Drill history</div>
        {[
          ["Forward Progression Circuit", "U14 Boys · 45 min", "Today"],
          ["Defensive Shape Reset", "U12 Girls · 30 min", "Yesterday"],
          ["Counter-Attack Trigger Drill", "U16 Boys · 35 min", "Mar 8"],
          ["First Touch Under Pressure", "U16 Boys · 40 min", "Mar 7"],
        ].map(([title, meta, date]) => (
          <div key={title} className="mb-2 flex items-center gap-3 rounded-2xl border border-white/5 bg-[#0d1f3c] p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f2a900]/10 text-[#f2a900]">D</div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-white">{title}</div>
              <div className="mt-1 text-xs text-white/45">{meta}</div>
            </div>
            <div className="text-[11px] text-white/35">{date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SolmateFactorRail({
  activeFactorId,
  onChange,
}: {
  activeFactorId: SolmateFactorId;
  onChange: (id: SolmateFactorId) => void;
}) {
  return (
    <div id="solmate-factor-rail" className="inline-flex max-w-full flex-wrap gap-2 rounded-[2rem] border border-white/10 bg-white/[0.04] p-2 backdrop-blur-xl">
      {solmateFactors.map((factor) => (
        <button
          key={factor.id}
          type="button"
          onClick={() => onChange(factor.id)}
          className={`rounded-full px-4 py-2 text-sm transition ${
            activeFactorId === factor.id
              ? "bg-[#f2a900] text-[#060f1e]"
              : "bg-black/20 text-text-primary/55 hover:text-text-primary"
          }`}
        >
          {factor.label}
        </button>
      ))}
    </div>
  );
}

function SolmateInsightPanel({
  activeFactorId,
}: {
  activeFactorId: SolmateFactorId;
}) {
  const factor = solmateFactors.find((item) => item.id === activeFactorId) ?? solmateFactors[0];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={factor.id}
        initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
        transition={transition}
        className="rounded-[2rem] border border-[#f2a900]/18 bg-[#091322]/85 p-5 shadow-[0_24px_90px_rgba(242,169,0,0.08)] backdrop-blur-xl md:p-6"
      >
        <p className="text-[10px] uppercase tracking-[0.28em] text-[#f2a900]">{factor.label}</p>
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

function SolmateWorkflowStrip() {
  return (
    <section className="relative px-6 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1220px]">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-muted">Workflow</p>
          <h2 className="mx-auto mt-4 max-w-5xl text-4xl font-light leading-[1.04] md:text-6xl">
            Structure coaching insight
            <br />
            so it can be used again.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-5">
          {solmateWorkflow.map((step, index) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="flex h-full flex-col rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f2a900]/12 text-sm font-semibold text-[#f2a900]">
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

function SolmateOutcomes() {
  return (
    <section className="relative px-6 pb-28 pt-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1220px]">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-muted">Outcomes</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-light md:text-6xl">
            A more usable system for real coaching rhythm.
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {solmateOutcomes.map((outcome) => (
            <motion.div
              key={outcome.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55 }}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
            >
              <h3 className="text-xl text-text-primary">{outcome.title}</h3>
              <div className="mt-6 space-y-3">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-text-primary/45">
                  {outcome.before}
                </div>
                <div className="mx-auto h-8 w-px bg-gradient-to-b from-white/15 to-[#f2a900]/70" />
                <div className="rounded-2xl border border-[#f2a900]/20 bg-[#f2a900]/10 p-3 text-sm text-text-primary/80">
                  {outcome.after}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SolmateCaseStudy() {
  const [activeFactorId, setActiveFactorId] = useState<SolmateFactorId>("voice-input");
  const [activeScreen, setActiveScreen] = useState<SolmateScreenId>("record");

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const handleFactorChange = (factorId: SolmateFactorId) => {
    setActiveFactorId(factorId);
    const factor = solmateFactors.find((item) => item.id === factorId);
    if (factor) {
      setActiveScreen(factor.screen);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#03070d] text-text-primary">
      <SolmateAmbientBackground />
      <BackToWork />
      <SolmateHero onStart={() => document.getElementById("solmate-demo")?.scrollIntoView({ behavior: "smooth" })} />

      <section id="solmate-demo" className="relative px-6 py-20 md:px-10 lg:px-16">
        <div className="mx-auto max-w-[1220px]">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.35em] text-muted">Interactive product demo</p>
            <h2 className="mt-4 text-4xl font-light md:text-6xl">
              Highlight the product decision that matters.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-text-primary/65 md:text-base">
              Each factor focuses one layer of the prototype and shows how the interface turns coaching complexity into clearer action.
            </p>
          </div>

          <SolmateFactorRail activeFactorId={activeFactorId} onChange={handleFactorChange} />

          <div className="mt-6 grid items-start gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <SolmateInsightPanel activeFactorId={activeFactorId} />
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

      <SolmateWorkflowStrip />
      <SolmateOutcomes />
    </main>
  );
}
