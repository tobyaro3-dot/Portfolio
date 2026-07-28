import { useLayoutEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const coverImage = "/national-lighthouse-museum-cover.png";

const reveal = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const transition = { duration: 0.52, ease: [0.22, 1, 0.36, 1] as const };

const overview = [
  ["Role", "UX Research & User Analysis"],
  ["Context", "UCF Human-Computer Interaction course project"],
  ["Team", "Student team with research, IA, interface, and testing roles"],
  ["Scope", "Market research, user analysis, task analysis, prototyping, usability evaluation"],
];

const researchQuestions = [
  "Would a museum companion app make the visit easier, or would it ask visitors to manage one more layer of attention?",
  "Which features needed to be immediately understandable before a visitor would trust them in the museum?",
  "Could ticketing, scanning, navigation, audio, tours, and wallet access work as one connected experience?",
];

const methods = [
  {
    method: "Market scan",
    why: "To understand how nearby experiences handled ticketing, accounts, maps, multimedia, and stored access.",
    output: "Comparable patterns from Georgia Aquarium, MoMA, NPS, and Eventbrite.",
  },
  {
    method: "User and stakeholder framing",
    why: "To define who the app needed to serve before choosing features.",
    output: "Visitor profiles, stakeholder table, survey questions, and interview prompts.",
  },
  {
    method: "Task analysis",
    why: "To see where a similar purchase flow introduced friction before designing our own flow.",
    output: "Georgia Aquarium think-aloud analysis and requirements for checkout, confirmation, accessibility, and touch targets.",
  },
  {
    method: "Prototype evaluation",
    why: "To test whether the proposed app structure supported real tasks instead of only looking complete.",
    output: "Mid-fidelity and high-fidelity think-aloud sessions with documented confusion moments.",
  },
  {
    method: "Post-test feedback",
    why: "To check whether the final direction felt understandable after use.",
    output: "Four post-experience survey responses plus expert evaluation notes.",
  },
];

const visitorGroups = [
  ["Tourists", "Easy navigation, exhibit summaries, event information, ticket access."],
  ["Families", "Interactive maps, kid-friendly content, event reminders."],
  ["Students", "Detailed historical content, multimedia learning tools, accessibility features."],
  ["Members", "Membership management, event access, digital ticket storage."],
];

const prototypePrinciples = [
  "Use the home screen as a central hub for tickets, events, search, donations, and sign-in.",
  "Connect ticket purchasing to cart, checkout, and stored ticket access.",
  "Support the physical visit through map, directory, scanner, tours, and descriptive audio.",
  "Include accessibility and translation paths as first-class parts of the app structure.",
];

const midFiReplay = [
  {
    id: "01",
    time: "0:09",
    label: "Homepage scan",
    title: "The scanner was visible, but not self-explanatory.",
    body: "The user noticed the camera control and had to assume it was connected to QR scanning.",
    source: "Confusion: unclear camera / QR icon assumption.",
    response: "Scanner language needed to be explicit at the moment of use.",
    screen: "Scan",
    marker: "left-[54%] top-[69%]",
  },
  {
    id: "02",
    time: "0:43",
    label: "Account access",
    title: "Sign-up was hidden inside the sign-in path.",
    body: "The account flow worked, but the user first entered the sign-in route before finding sign-up.",
    source: "Confusion: user had to navigate from sign-in to sign-up.",
    response: "New visitors needed a clearer account creation path.",
    screen: "Account",
    marker: "left-[18%] top-[72%]",
  },
  {
    id: "03",
    time: "1:40",
    label: "Ticket choice",
    title: "Membership competed with the immediate ticket task.",
    body: "The user compared annual membership and single-day ticket options before deciding.",
    source: "Confusion: hesitation between membership vs ticket.",
    response: "The single-day purchase path needed stronger hierarchy.",
    screen: "Tickets",
    marker: "left-[76%] top-[34%]",
  },
  {
    id: "04",
    time: "2:59",
    label: "Confirmation",
    title: "Wallet access confirmed the ticket, but it did not drive the task.",
    body: "The wallet clearly stored purchased tickets after checkout.",
    source: "Observation: wallet provides clear confirmation and access to purchased tickets.",
    response: "Wallet should support confidence after purchase, not compete with the purchase path.",
    screen: "Wallet",
    marker: "left-[64%] top-[77%]",
  },
];

const highFiSignals = [
  ["Ticket quantity", "The user expected quantity controls for tickets and cart review."],
  ["Email delivery", "The checkout flow created confusion when no email field appeared for ticket delivery."],
  ["Tour discovery", "Boat tours were difficult to locate through the information architecture."],
  ["Real-world ticket use", "The final ticket state did not match the expectation of a QR or scannable ticket."],
];

const designDirections = [
  {
    observed: "The scanner icon relied on assumption.",
    interpretation: "Recognition was not enough. A visitor needed to know what would happen before tapping.",
    direction: "Clarify icon meaning and scanner purpose directly in the interface.",
  },
  {
    observed: "The sign-up path lived behind sign-in.",
    interpretation: "A new visitor had to decode account logic before returning to the purchase task.",
    direction: "Expose sign-up and reduce detours before ticket purchase.",
  },
  {
    observed: "Ticket and membership options created hesitation.",
    interpretation: "A future-value option was competing with the immediate need to buy a ticket.",
    direction: "Separate single-day ticket purchasing from membership exploration.",
  },
  {
    observed: "High-fidelity testing surfaced missing quantity and email behaviors.",
    interpretation: "The prototype looked more complete, but key real-world checkout expectations still needed support.",
    direction: "Add ticket quantity controls, cart review, and email delivery options.",
  },
];

const nextIteration = {
  supported: [
    "Add quantity controls for tickets and cart.",
    "Increase contrast and overall readability.",
    "Clarify icons and their purpose.",
    "Fix important pages that felt concealed.",
  ],
  needsValidation: [
    "Test clearer checkout with email delivery for visitors who do not want to sign in.",
    "Validate whether wallet should be more visible outside the account area.",
    "Test the discoverability of boat tours after reorganizing navigation.",
    "Evaluate QR or scannable ticket behavior in an on-site context.",
  ],
};

const limitations = [
  "This was an academic HCI project, not a commissioned implementation.",
  "The museum opportunity came through a teammate's personal connection, which helped ground the project but did not make it a formal client engagement.",
  "The report documents prototype testing and post-experience feedback, not launched product analytics.",
  "The findings support directional design decisions, but broader validation would require more participants and in-context museum testing.",
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
  return (
    <p className="text-xs uppercase tracking-[0.35em] text-[#c8a86c]/68">
      {children}
    </p>
  );
}

function InterfaceMockup({
  activeMarker = "01",
  className = "",
}: {
  activeMarker?: string;
  className?: string;
}) {
  const active = midFiReplay.find((step) => step.id === activeMarker) ?? midFiReplay[0];

  return (
    <div className={`relative mx-auto w-[280px] max-w-full rounded-[2.35rem] border border-white/16 bg-[#07090b] p-2 shadow-[0_34px_100px_rgba(0,0,0,0.5)] ${className}`}>
      <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-b-2xl bg-[#050607]/92" />
      <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,#0d1214,#060708)] p-5">
        <div className="flex items-center justify-between pt-4 text-[10px] text-white/42">
          <span>Prototype</span>
          <span className="text-[#c8a86c]">{active.screen}</span>
        </div>

        <div className="mt-6 rounded-[1.25rem] border border-white/8 bg-white/[0.035] p-3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]">
            <div className="absolute inset-x-[16%] top-[22%] h-px bg-white/8" />
            <div className="absolute inset-y-[14%] left-[30%] w-px bg-white/8" />
            <div className="absolute inset-y-[16%] left-[60%] w-px bg-white/8" />
            <motion.div
              className="absolute left-[19%] top-[33%] h-px w-[61%] rotate-[-18deg] border-t border-dashed border-[#c8a86c]/70"
              animate={{ opacity: [0.44, 0.88, 0.44] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
            />
            {midFiReplay.slice(0, 3).map((step) => (
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
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#c8a86c]/70">Observed moment</p>
          <p className="mt-2 text-sm text-white/78">{active.label}</p>
        </div>

        <div className="mt-5 grid grid-cols-4 gap-2 text-[9px] text-white/34">
          {["Home", "Scan", "Ticket", "Wallet"].map((item) => (
            <div
              key={item}
              className={`rounded-full border px-2 py-2 text-center ${
                item === active.screen
                  ? "border-[#c8a86c]/40 bg-[#c8a86c]/12 text-[#e8d3a8]"
                  : "border-white/8 bg-white/[0.02]"
              }`}
            >
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
        <img src={coverImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-76" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,7,0.9)_0%,rgba(5,6,7,0.62)_44%,rgba(5,6,7,0.18)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,6,7,0.16),rgba(5,6,7,0.7)_68%,#050607_100%)]" />
        <div className="halftone absolute inset-0 opacity-10 mix-blend-multiply" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1220px] gap-12 lg:grid-cols-[1fr_0.78fr] lg:items-end">
        <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.12 }}>
          <motion.p variants={reveal} className="text-xs uppercase tracking-[0.35em] text-[#c8a86c]/78">
            UX Research &amp; HCI
          </motion.p>
          <motion.h1 variants={reveal} className="mt-5 max-w-4xl font-display text-6xl italic leading-[0.9] text-text-primary md:text-8xl">
            National Lighthouse Museum
          </motion.h1>
          <motion.p variants={reveal} className="mt-6 max-w-2xl text-base leading-8 text-text-primary/72 md:text-lg">
            A UCF Human-Computer Interaction project about what happens when a museum companion app tries to support tickets, navigation, scanning, audio, tours, membership, and stored access at once.
          </motion.p>
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

function Origin() {
  return (
    <SectionShell className="pb-12 pt-24">
      <div className="grid gap-12 lg:grid-cols-[0.74fr_1.26fr] lg:items-start">
        <div>
          <Eyebrow>How it started</Eyebrow>
          <h2 className="mt-5 text-4xl font-light leading-[1.04] text-text-primary md:text-6xl">
            This project began with a connection, not a formal client brief.
          </h2>
        </div>
        <div className="space-y-7 text-base leading-8 text-text-primary/70 md:text-lg">
          <p>
            During my Human-Computer Interaction course at the University of Central Florida, one of my teammates shared that his brother worked with the National Lighthouse Museum. That connection gave our team a real museum experience to study instead of designing around a fictional prompt.
          </p>
          <p>
            The work stayed within the academic course setting. We were not presenting it as a commissioned engagement or a launched product. But the museum context mattered because it gave the research a real place, real visitor goals, and real constraints to think through.
          </p>
          <div className="grid gap-4 pt-4 sm:grid-cols-2">
            {[
              ["The opportunity", "Study a real museum companion experience through a course project."],
              ["The tension", "Every helpful feature could also add another thing for visitors to interpret."],
            ].map(([label, copy]) => (
              <div key={label} className="border-t border-white/10 pt-5">
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#c8a86c]/64">{label}</p>
                <p className="mt-3 text-sm leading-7 text-text-primary/66">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function ResearchContext() {
  return (
    <SectionShell wide className="py-16">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <Eyebrow>Research context</Eyebrow>
          <p className="mt-5 max-w-2xl text-3xl font-light leading-tight text-text-primary md:text-5xl">
            The app idea was not just digital museum content. It was a question of attention.
          </p>
          <p className="mt-6 max-w-xl text-base leading-8 text-text-primary/66">
            The team explored a companion app that could support ticket purchasing, QR scanning, descriptive audio, maps, tours, accessibility, membership, and wallet storage. The research challenge was deciding which parts helped the visit and which parts risked making visitors work harder.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(16,18,18,0.86),rgba(8,9,9,0.92))] p-6 shadow-[0_32px_110px_rgba(0,0,0,0.28)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(202,168,106,0.13),transparent_42%)]" />
          <div className="relative grid gap-5 md:grid-cols-2">
            {visitorGroups.map(([group, need], index) => (
              <motion.div
                key={group}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="border-t border-white/10 pt-5"
              >
                <p className="font-display text-4xl italic leading-none text-[#c8a86c]/74">0{index + 1}</p>
                <h3 className="mt-4 text-xl font-light text-text-primary">{group}</h3>
                <p className="mt-3 text-sm leading-7 text-text-primary/62">{need}</p>
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
          <Eyebrow>What we needed to learn</Eyebrow>
          <h2 className="mt-5 text-4xl font-light leading-[1.04] text-text-primary md:text-6xl">
            The methods came from the questions, not the other way around.
          </h2>
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
          {methods.map((method, index) => (
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

function ResearchToPrototype() {
  return (
    <SectionShell wide className="py-20">
      <div className="overflow-hidden rounded-[3rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,20,20,0.82),rgba(7,8,8,0.94))] shadow-[0_38px_140px_rgba(0,0,0,0.34)]">
        <div className="grid lg:grid-cols-[0.86fr_1.14fr]">
          <div className="border-b border-white/10 p-8 md:p-12 lg:border-b-0 lg:border-r">
            <Eyebrow>Research to prototype</Eyebrow>
            <p className="mt-7 text-3xl font-light leading-tight text-text-primary md:text-5xl">
              The prototype became a research instrument.
            </p>
            <p className="mt-6 text-base leading-8 text-text-primary/64">
              We were not only designing screens. We were building a testable version of the museum visit so we could see whether the information architecture held up under task pressure.
            </p>
          </div>
          <div className="grid gap-0 md:grid-cols-2">
            {prototypePrinciples.map((principle, index) => (
              <div key={principle} className="border-b border-white/10 p-7 even:md:border-l md:[&:nth-last-child(-n+2)]:border-b-0">
                <p className="font-display text-5xl italic leading-none text-[#c8a86c]/72">0{index + 1}</p>
                <p className="mt-5 text-sm leading-7 text-text-primary/66">{principle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function ThinkAloudReplay() {
  const [activeStep, setActiveStep] = useState("01");
  const active = midFiReplay.find((step) => step.id === activeStep) ?? midFiReplay[0];

  return (
    <SectionShell wide className="py-20">
      <div className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <Eyebrow>Think-aloud replay</Eyebrow>
          <h2 className="mt-4 text-4xl font-light leading-[1.04] md:text-6xl">
            A task can succeed and still reveal the wrong kind of effort.
          </h2>
        </div>
        <p className="max-w-2xl text-base leading-8 text-text-primary/66">
          The documented mid-fidelity task asked the user to create an account and purchase a single-day ticket up to checkout. The task took about 3:11, produced zero errors, and still surfaced three confusion moments that changed the recommendations.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-[2.6rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(202,168,106,0.13),transparent_46%),linear-gradient(180deg,rgba(15,17,17,0.94),rgba(8,9,9,0.97))] p-6 shadow-[0_32px_120px_rgba(0,0,0,0.32)]">
            <div className="grid items-end gap-8 md:grid-cols-[0.78fr_1fr] lg:grid-cols-1 xl:grid-cols-[0.78fr_1fr]">
              <div>
                <p className="font-display text-8xl italic leading-none text-text-primary md:text-9xl">3:11</p>
                <p className="mt-4 text-xs uppercase tracking-[0.24em] text-text-primary/44">Approximate task duration</p>
                <div className="mt-8 grid grid-cols-2 gap-3">
                  <div className="border-t border-white/10 pt-4">
                    <p className="font-display text-5xl italic leading-none text-text-primary">0</p>
                    <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-text-primary/42">Errors</p>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <p className="font-display text-5xl italic leading-none text-[#c8a86c]">3</p>
                    <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-text-primary/42">Confusion moments</p>
                  </div>
                </div>
              </div>
              <InterfaceMockup activeMarker={activeStep} />
            </div>
            <div className="mt-7 border-t border-white/10 pt-6">
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#c8a86c]/64">Active interpretation</p>
              <p className="mt-3 text-2xl font-light leading-tight text-text-primary">{active.title}</p>
              <p className="mt-4 text-sm leading-7 text-text-primary/62">{active.response}</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-[1.08rem] top-6 hidden h-[calc(100%-3rem)] w-px bg-[linear-gradient(180deg,rgba(202,168,106,0.45),rgba(255,255,255,0.06))] md:block" />
          <div className="space-y-6">
            {midFiReplay.map((step) => (
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
                    <div className="grid gap-5 lg:grid-cols-[6rem_1fr]">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.22em] text-text-primary/38">Time</p>
                        <p className="mt-2 text-lg text-text-primary/78">{step.time}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.28em] text-[#c8a86c]/62">{step.label}</p>
                        <h3 className="mt-3 text-2xl font-light leading-tight text-text-primary md:text-3xl">{step.title}</h3>
                        <div className="mt-5 grid gap-4 xl:grid-cols-3">
                          <p className="text-sm leading-7 text-text-primary/66">{step.body}</p>
                          <p className="text-sm leading-7 text-text-primary/52">{step.source}</p>
                          <p className="text-sm leading-7 text-text-primary/66">{step.response}</p>
                        </div>
                      </div>
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

function HighFiValidation() {
  return (
    <SectionShell className="py-18">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <Eyebrow>Second pass</Eyebrow>
          <h2 className="mt-5 text-4xl font-light leading-[1.04] text-text-primary md:text-6xl">
            Higher fidelity made the remaining gaps easier to see.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-text-primary/66">
            The high-fidelity task expanded the scenario: purchase a day pass and book a boat tour. It still produced zero errors, but the report documented nine confusion moments across ticket quantity, cart behavior, email delivery, tour discovery, wallet expectations, and scannable ticket expectations.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {highFiSignals.map(([label, copy], index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.44, delay: index * 0.05 }}
              className="border-t border-white/10 pt-5"
            >
              <p className="font-display text-5xl italic leading-none text-[#c8a86c]/72">0{index + 1}</p>
              <p className="mt-5 text-lg font-light text-text-primary/88">{label}</p>
              <p className="mt-3 text-sm leading-7 text-text-primary/62">{copy}</p>
            </motion.div>
          ))}
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
              <Eyebrow>What we expected</Eyebrow>
              <p className="mt-8 max-w-xl text-3xl font-light leading-tight text-text-primary md:text-5xl">
                Account and wallet features felt valuable because they promised future convenience.
              </p>
            </div>
          </div>
          <div className="relative p-8 md:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(51,75,84,0.28),transparent_46%)]" />
            <div className="relative">
              <Eyebrow>What behavior showed</Eyebrow>
              <p className="mt-8 max-w-xl text-3xl font-light leading-tight text-text-primary md:text-5xl">
                The visitor cared first about getting the correct ticket without unnecessary interpretation.
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/8 px-8 py-12 text-center md:px-12">
          <p className="font-display text-6xl italic leading-none text-text-primary md:text-8xl">
            Useful does not mean necessary.
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-text-primary/62">
            That was the turning point. The wallet could stay, but the research pushed our priorities toward immediate clarity: ticket hierarchy, scanner meaning, checkout expectations, and fewer detours.
          </p>
        </div>
      </div>
    </SectionShell>
  );
}

function ResearchToDesign() {
  return (
    <SectionShell className="py-20">
      <div className="grid gap-12 lg:grid-cols-[0.76fr_1.24fr] lg:items-start">
        <div>
          <Eyebrow>Research to design</Eyebrow>
          <h2 className="mt-4 text-4xl font-light leading-[1.04] md:text-6xl">
            The recommendations followed the behavior.
          </h2>
        </div>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {designDirections.map((item, index) => (
            <motion.article
              key={item.observed}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.46, delay: index * 0.05 }}
              className="grid gap-5 py-7 md:grid-cols-[3rem_1fr] lg:grid-cols-[3rem_1fr_1fr_1fr]"
            >
              <p className="font-display text-4xl italic leading-none text-[#c8a86c]/70">0{index + 1}</p>
              <p className="text-sm leading-7 text-text-primary/68">{item.observed}</p>
              <p className="text-sm leading-7 text-text-primary/52">{item.interpretation}</p>
              <p className="text-sm leading-7 text-text-primary/72">{item.direction}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

function NextIterationAndLimits() {
  return (
    <SectionShell wide className="py-20">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-7 md:p-9">
          <Eyebrow>Next iteration</Eyebrow>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <p className="text-xl font-light text-text-primary">Directly supported by testing</p>
              <div className="mt-5 space-y-4">
                {nextIteration.supported.map((item) => (
                  <p key={item} className="border-t border-white/10 pt-4 text-sm leading-7 text-text-primary/64">{item}</p>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xl font-light text-text-primary">Would test next</p>
              <div className="mt-5 space-y-4">
                {nextIteration.needsValidation.map((item) => (
                  <p key={item} className="border-t border-white/10 pt-4 text-sm leading-7 text-text-primary/64">{item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[2.5rem] border border-[#c8a86c]/16 bg-[linear-gradient(180deg,rgba(202,168,106,0.075),rgba(255,255,255,0.025))] p-7 md:p-9">
          <Eyebrow>Limitations</Eyebrow>
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
              Completion is not the same thing as clarity.
            </p>
          </div>
          <div className="space-y-6 text-base leading-8 text-text-primary/72 md:text-lg">
            <p>
              This project changed how I evaluate usability. Before testing, it was easy to look at the prototype and focus on whether the flow could be completed.
            </p>
            <p>
              The research pushed me to look more carefully at what happens before completion: hesitation, uncertainty, interpretation, detours, and the assumptions an interface quietly asks people to make.
            </p>
            <p>
              That lesson stayed with me. A user can succeed and still reveal where the design is asking for too much mental work.
            </p>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

export function NationalLighthouseMuseumCaseStudy() {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050607] text-text-primary">
      <AmbientBackground />
      <BackToWork />
      <Hero />
      <Origin />
      <ResearchContext />
      <QuestionsAndApproach />
      <ResearchToPrototype />
      <ThinkAloudReplay />
      <HighFiValidation />
      <InsightShift />
      <ResearchToDesign />
      <NextIterationAndLimits />
      <Reflection />
    </main>
  );
}
