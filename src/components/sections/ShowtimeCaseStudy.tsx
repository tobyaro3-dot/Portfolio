import { useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  showtimeHero,
  showtimeLimits,
  showtimeNext,
  showtimeNumbers,
  showtimeNumbersNote,
  showtimeReasons,
  showtimeSetup,
} from "../../data/showtimeCaseStudy";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const gold = "#f2c230";

function BackToWork() {
  return (
    <Link
      to="/"
      onClick={() => window.sessionStorage.setItem("portfolio-scroll-target", "work")}
      className="fixed left-4 top-4 z-50 rounded-full border border-white/10 bg-[linear-gradient(135deg,rgba(10,9,6,0.9),rgba(40,33,12,0.78))] px-4 py-2 text-xs uppercase tracking-[0.2em] text-text-primary/80 shadow-[0_18px_45px_rgba(0,0,0,0.22)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-[#f2c230]/50 hover:text-text-primary md:left-6 md:top-6"
    >
      Back to work
    </Link>
  );
}

function Background() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-0 h-[36rem] w-[56rem] -translate-x-1/2 rounded-full bg-[#3a2f0c]/55 blur-[120px]" />
      <div className="absolute -right-24 top-[30rem] h-[28rem] w-[30rem] rounded-full bg-[#f2c230]/8 blur-[120px]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_50%_18%,black,transparent_76%)]" />
    </div>
  );
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`relative px-6 py-16 md:px-10 lg:px-16 ${className}`}>
      <div className="mx-auto max-w-[1180px] rounded-[2.4rem] border border-white/8 bg-[linear-gradient(180deg,rgba(22,19,10,0.9),rgba(10,9,6,0.95))] p-6 shadow-[0_28px_100px_rgba(0,0,0,0.26)] md:p-8">
        {children}
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center px-6 py-28 md:px-10 lg:px-16">
      <div className="relative z-10 mx-auto grid w-full max-w-[1180px] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.1 }}>
          <motion.p variants={reveal} className="text-xs uppercase tracking-[0.35em]" style={{ color: gold }}>
            {showtimeHero.eyebrow}
          </motion.p>
          <motion.h1 variants={reveal} className="mt-5 text-5xl font-light leading-[0.98] tracking-tight text-text-primary md:text-7xl">
            About 40 parent leads from about{" "}
            <span className="font-display italic">$250 in ads.</span>
          </motion.h1>
          <motion.p variants={reveal} className="mt-6 max-w-xl text-base leading-8 text-text-primary/70 md:text-lg">
            {showtimeHero.intro}
          </motion.p>
          <motion.dl variants={reveal} className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
            {showtimeHero.meta.map(([label, value]) => (
              <div key={label} className="rounded-[1.1rem] border border-white/8 bg-white/[0.03] px-4 py-3">
                <dt className="text-[10px] uppercase tracking-[0.2em]" style={{ color: gold }}>{label}</dt>
                <dd className="mt-1 text-sm leading-6 text-text-primary/80">{value}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.figure
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto w-full max-w-[340px]"
        >
          <div className="rounded-[2.6rem] border border-white/15 bg-[#05060a] p-3 shadow-[0_40px_110px_rgba(0,0,0,0.55),0_0_80px_rgba(242,194,48,0.14)]">
            <img
              src="/showtime-ad.webp"
              alt="The Showtime Soccer Institute Instagram Reels ad: a team photo of players in yellow shirts, a Sign up button, and the headline Unleash Your Child's Soccer Potential This Summer. Faces are blurred."
              className="w-full rounded-[2rem]"
            />
          </div>
          <figcaption className="mt-4 text-center text-xs leading-6 text-text-primary/60">
            The live ad. Players&apos; faces are blurred for their privacy.
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}

function Numbers() {
  return (
    <Panel>
      <p className="text-xs uppercase tracking-[0.35em] text-text-primary/60">Results</p>
      <h2 className="mt-4 max-w-3xl text-4xl font-light leading-[1.05] md:text-5xl">Small budget, real customers.</h2>
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
        {showtimeNumbers.map((n, i) => (
          <motion.div
            key={n.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5"
          >
            <p className="font-display text-4xl italic text-text-primary md:text-5xl">{n.value}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-text-primary/65">{n.label}</p>
          </motion.div>
        ))}
      </div>
      <p className="mt-6 max-w-3xl text-sm leading-7 text-text-primary/65">{showtimeNumbersNote}</p>
    </Panel>
  );
}

function Funnel() {
  const steps = [
    { label: "Ad spend", value: "~$250", width: "100%" },
    { label: "Lead form sign-ups", value: "~40", width: "72%" },
    { label: "Paying customers", value: "~10", width: "38%" },
  ];
  return (
    <Panel>
      <p className="text-xs uppercase tracking-[0.35em] text-text-primary/60">How it was set up</p>
      <h2 className="mt-4 max-w-3xl text-4xl font-light leading-[1.05] md:text-5xl">One ad, one form, one offer.</h2>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="grid gap-3">
          {showtimeSetup.map((s) => (
            <div key={s.label} className="grid grid-cols-[96px_1fr] gap-4 rounded-[1.4rem] border border-white/10 bg-white/[0.035] p-4">
              <p className="text-[11px] uppercase tracking-[0.2em]" style={{ color: gold }}>{s.label}</p>
              <p className="text-sm leading-6 text-text-primary/78">{s.detail}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center gap-3" aria-label="Campaign funnel">
          {steps.map((s) => (
            <div key={s.label}>
              <div
                className="flex min-w-[250px] max-w-full items-center justify-between gap-4 rounded-[1rem] border border-[#f2c230]/30 bg-[linear-gradient(90deg,rgba(242,194,48,0.22),rgba(242,194,48,0.06))] px-4 py-4"
                style={{ width: s.width }}
              >
                <span className="text-sm text-text-primary/85">{s.label}</span>
                <span className="font-display text-2xl italic text-text-primary">{s.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function CardGrid({ eyebrow, title, items }: { eyebrow: string; title: string; items: { title: string; body: string }[] }) {
  return (
    <Panel>
      <p className="text-xs uppercase tracking-[0.35em] text-text-primary/60">{eyebrow}</p>
      <h2 className="mt-4 max-w-3xl text-4xl font-light leading-[1.05] md:text-5xl">{title}</h2>
      <div className={`mt-8 grid gap-4 ${items.length === 4 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className="rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-5"
          >
            <h3 className="text-xl text-text-primary">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-text-primary/70">{item.body}</p>
          </motion.div>
        ))}
      </div>
    </Panel>
  );
}

function Limits() {
  return (
    <section className="relative px-6 pb-28 pt-4 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[820px] rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 text-center md:p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-text-primary/60">Keeping it honest</p>
        <p className="mt-4 text-base leading-8 text-text-primary/75">{showtimeLimits}</p>
        <Link to="/work/tisato-crm" className="mt-6 inline-flex min-h-11 items-center rounded-full border border-[#f2c230]/40 px-5 text-sm text-text-primary transition hover:bg-[#f2c230]/10">
          See the CRM follow-up system I built later
        </Link>
      </div>
    </section>
  );
}

export function ShowtimeCaseStudy() {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0906] text-text-primary">
      <Background />
      <BackToWork />
      <Hero />
      <Numbers />
      <Funnel />
      <CardGrid eyebrow="Why I think it worked" title="Fewer steps, warmer audience." items={showtimeReasons} />
      <CardGrid eyebrow="What I'd do next" title="Where the next $250 should go." items={showtimeNext} />
      <Limits />
    </main>
  );
}
