import { useRef, type MouseEvent } from "react";
import type { Project } from "../../data/portfolio";
import { GradientBorder } from "../layout/GradientBorder";

type ProjectCardProps = {
  project: Project;
  onOpen: (project: Project) => void;
};

type CardStyle = React.CSSProperties & {
  "--rx": string;
  "--ry": string;
  "--mx": string;
  "--my": string;
  "--accent": string;
  "--accent-2": string;
};

const toneGradients = {
  medical:
    "from-[#102332] via-[#122c34] to-[#0b0f14]",
  loyalty:
    "from-[#171934] via-[#111f2f] to-[#080b14]",
  sport:
    "from-[#08111d] via-[#0d1d35] to-[#05070b]",
  museum:
    "from-[#17140f] via-[#17232a] to-[#07090c]",
};

function SportPhonePreview() {
  return (
    <div className="relative min-h-[355px] overflow-hidden bg-[radial-gradient(circle_at_50%_0%,rgba(242,169,0,0.22),transparent_36%),linear-gradient(180deg,#081326,#060d1b)] p-4">
      <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_50%_0%,rgba(105,210,255,0.15),transparent_60%)]" />
      <div className="relative flex items-center justify-between text-[11px] font-semibold text-white/85">
        <span>9:41</span>
        <div className="flex items-center gap-2">
          <span>5G</span>
          <span className="h-3 w-7 rounded-[4px] border border-white/40 p-[1px]">
            <span className="block h-full w-4 rounded-[2px] bg-[#52e28c]" />
          </span>
        </div>
      </div>

      <div className="mt-4 rounded-full border border-white/10 bg-white/[0.04] p-1.5">
        <div className="grid grid-cols-4 gap-1.5">
          {[
            { icon: "⌂", active: false },
            { icon: "◉", active: true },
            { icon: "▤", active: false },
            { icon: "◌", active: false },
          ].map((item) => (
            <div
              key={`${item.icon}-${item.active}`}
              className={`flex h-10 items-center justify-center rounded-full text-sm ${
                item.active
                  ? "bg-[#f2a900] text-[#060f1e] shadow-[0_0_24px_rgba(242,169,0,0.22)]"
                  : "text-white/45"
              }`}
            >
              {item.icon}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/6 text-white/75">
          ←
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.16em] text-white/30">Capture</p>
          <p className="mt-1 text-lg font-semibold text-white">Record Pain Point</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {["U14 Boys", "U12 Girls", "U16 Boys", "U10 Girls"].map((team, index) => (
          <div
            key={team}
            className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold ${
              index === 0
                ? "border-[#f2a900] bg-[#f2a900] text-[#060f1e]"
                : "border-white/10 text-white/45"
            }`}
          >
            {team}
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-[1.5rem] border border-[#f2a900]/25 bg-[#0a1730] p-4">
        <div className="flex flex-col items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-[#f2a900]/35 bg-[#14315d] text-3xl text-[#f2a900] shadow-[0_0_40px_rgba(242,169,0,0.16)]">
            ◉
          </div>
          <p className="mt-3 text-sm text-white/50">Tap to describe the problem</p>
          <div className="mt-4 flex h-8 items-end gap-1">
            {Array.from({ length: 16 }, (_, index) => (
              <span
                key={index}
                className="w-1 rounded-full bg-[#f2a900]"
                style={{ height: `${12 + ((index * 7) % 18)}px`, opacity: 0.95 - (index % 5) * 0.08 }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-[1.35rem] border border-white/10 bg-[#0d1f3c] p-4">
        <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">Live transcript</p>
        <p className="mt-3 text-sm leading-6 text-white/72">
          My U14 boys are struggling to progress forward. They take too many touches in tight spaces and do not commit to drives.
        </p>
      </div>

      <div className="mt-4 rounded-[1.2rem] bg-[#f2a900] px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-[#060f1e] shadow-[0_18px_36px_rgba(242,169,0,0.18)]">
        Generate Drill Plan
      </div>
    </div>
  );
}

function ScreenContent({ project }: { project: Project }) {
  if (project.preview.tone === "medical") {
    return (
      <>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-white/[0.08] p-3">
            <p className="text-[9px] uppercase tracking-[0.2em] text-white/45">
              Patient
            </p>
            <div className="mt-3 h-2 rounded-full bg-white/35" />
            <div className="mt-2 h-2 w-2/3 rounded-full bg-white/20" />
          </div>
          <div className="rounded-2xl bg-white/[0.08] p-3">
            <p className="text-[9px] uppercase tracking-[0.2em] text-white/45">
              Pickup
            </p>
            <div className="mt-3 h-2 rounded-full bg-[var(--accent)]/70" />
            <div className="mt-2 h-2 w-1/2 rounded-full bg-white/20" />
          </div>
        </div>
        <div className="mt-3 rounded-2xl border border-white/10 bg-black/20 p-3">
          <div className="flex items-center justify-between text-[10px] text-white/50">
            <span>Scheduling queue</span>
            <span>Live</span>
          </div>
          {[74, 52, 88].map((width) => (
            <div key={width} className="mt-3 h-2 rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[var(--accent)]"
                style={{ width: `${width}%` }}
              />
            </div>
          ))}
        </div>
      </>
    );
  }

  if (project.preview.tone === "loyalty") {
    return (
      <>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6].map((day) => (
            <div
              key={day}
              className="flex aspect-square items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08] text-xs text-white/70"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-2xl bg-white/[0.08] p-3">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-white/45">
            <span>Rewards</span>
            <span>+320</span>
          </div>
          <div className="mt-4 h-16 rounded-2xl border border-[var(--accent)]/30 bg-[radial-gradient(circle_at_50%_20%,var(--accent),transparent_55%)]" />
        </div>
      </>
    );
  }

  return (
    <>
      <SportPhonePreview />
    </>
  );
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement | null>(null);
  const aspectClass = "min-h-[540px] lg:h-[640px]";
  const isPhotoCover =
    project.slug === "solmate" ||
    project.slug === "tap" ||
    project.slug === "tisato" ||
    project.slug === "national-lighthouse-museum";

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (!card) {
      return;
    }

    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 12;
    const rotateX = (0.5 - y) * 10;

    card.style.setProperty("--rx", `${rotateX}deg`);
    card.style.setProperty("--ry", `${rotateY}deg`);
    card.style.setProperty("--mx", `${x * 100}%`);
    card.style.setProperty("--my", `${y * 100}%`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) {
      return;
    }

    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--mx", "50%");
    card.style.setProperty("--my", "50%");
  };

  const style: CardStyle = {
    "--rx": "0deg",
    "--ry": "0deg",
    "--mx": "50%",
    "--my": "50%",
    "--accent": project.preview.accent,
    "--accent-2": project.preview.secondaryAccent,
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-surface ${aspectClass}`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${toneGradients[project.preview.tone]}`}
      />
      <div
        className="absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at var(--mx) var(--my), color-mix(in srgb, var(--accent) 42%, transparent), transparent 34%)",
        }}
      />
      <img
        src={project.image}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105 ${
          isPhotoCover
            ? "opacity-95"
            : "opacity-25 mix-blend-screen blur-[1px] group-hover:opacity-35 group-hover:brightness-125 group-hover:contrast-125"
        }`}
      />
      <div className="halftone absolute inset-0 opacity-15 mix-blend-multiply" />
      <div
        className={`absolute inset-0 ${
          isPhotoCover
            ? "bg-[linear-gradient(180deg,rgba(5,7,11,0.12)_0%,rgba(5,7,11,0.18)_34%,rgba(5,7,11,0.58)_68%,rgba(5,7,11,0.92)_100%)]"
            : "bg-[radial-gradient(circle_at_center,transparent_25%,hsl(var(--bg))_95%)]"
        }`}
      />
      {isPhotoCover ? (
        <>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 20%, color-mix(in srgb, var(--accent-2) 18%, transparent), transparent 30%), radial-gradient(circle at 50% 58%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 22%)",
            }}
          />
          <div
            className="absolute inset-x-10 top-8 h-24 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle at center, color-mix(in srgb, var(--accent-2) 22%, transparent), transparent 68%)",
            }}
          />
        </>
      ) : null}

      <div className="absolute inset-x-5 top-5 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-white/45 md:inset-x-7 md:top-7">
        <span>{project.preview.screenLabel}</span>
        <span>{project.preview.metric}</span>
      </div>

      {!isPhotoCover ? (
        <div className="absolute inset-0 flex items-center justify-center px-6 pb-28 pt-16 md:px-10">
          <div
            className="relative w-[210px] max-w-[74%] rounded-[2.2rem] border border-white/20 bg-[#07090d] p-2 shadow-[0_35px_90px_rgba(0,0,0,0.55)] transition duration-500 ease-out group-hover:scale-[1.055] md:w-[235px] lg:w-[215px] xl:w-[230px]"
            style={{
              transform:
                "perspective(900px) rotateX(var(--rx)) rotateY(var(--ry)) translateZ(0)",
            }}
          >
            <div className="absolute -inset-5 -z-10 rounded-[3rem] bg-[var(--accent)] opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-45" />
            <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-b-2xl bg-black" />
            <div className="relative overflow-hidden rounded-[1.65rem] border border-white/10 bg-black">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.22),transparent_28%,transparent_72%,rgba(255,255,255,0.08))]" />
              <div className="relative min-h-[395px] overflow-hidden bg-[radial-gradient(circle_at_50%_0%,var(--accent),transparent_42%),linear-gradient(180deg,#111827,#020617)] p-5">
                <div className="absolute -right-14 top-8 h-32 w-32 rounded-full bg-[var(--accent-2)] opacity-25 blur-2xl transition-transform duration-700 group-hover:translate-y-8" />
                <div className="absolute -left-12 bottom-20 h-28 w-28 rounded-full bg-[var(--accent)] opacity-25 blur-2xl transition-transform duration-700 group-hover:-translate-y-8" />
                <div className="relative flex h-full min-h-[355px] flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="h-2 w-12 rounded-full bg-white/25" />
                      <div className="h-7 w-7 rounded-full border border-white/15 bg-white/10" />
                    </div>
                    <div className="mt-7 rounded-3xl border border-white/10 bg-white/[0.07] p-5 text-center shadow-2xl shadow-black/25 backdrop-blur-md">
                      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] border border-white/15 bg-black/35 shadow-[inset_0_0_28px_rgba(255,255,255,0.08)]">
                        <span className="font-display text-4xl italic leading-none text-white drop-shadow-[0_0_18px_var(--accent)]">
                          {project.logo}
                        </span>
                      </div>
                      <p className="mt-4 text-[10px] uppercase tracking-[0.22em] text-white/45">
                        {project.role}
                      </p>
                    </div>
                  </div>
                  <ScreenContent project={project} />
                </div>
              </div>
            </div>
            <div className="absolute inset-x-12 -bottom-4 h-8 rounded-full bg-black/60 blur-xl" />
          </div>
        </div>
      ) : null}

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-bg via-bg/80 to-transparent p-5 pt-24 text-left md:p-7 md:pt-28">
        <h3 className="font-display text-5xl italic leading-none text-text-primary md:text-6xl">
          {project.title}
        </h3>
        <p className="mt-3 max-w-xl text-sm leading-6 text-text-primary/75">
          {project.subtitle}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onOpen(project)}
        className="absolute inset-0 flex items-center justify-center bg-bg/35 opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100"
        aria-label={`Open ${project.title} case study`}
      >
        <GradientBorder innerClassName="items-center bg-white px-5 py-3 text-sm text-bg">
          View -
          <span className="ml-1 font-display italic">{project.title}</span>
        </GradientBorder>
      </button>
    </article>
  );
}
