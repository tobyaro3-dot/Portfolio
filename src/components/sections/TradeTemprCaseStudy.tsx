import { useLayoutEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { chapters, metadata } from "../../data/tradetemprCaseStudy";
import { BackToWork, Capture, Chapter, Eyebrow, Note } from "./tradetempr/Presentation";
import { BuiltAndLearning, InterpretationPaths, OutcomeProcess } from "./tradetempr/Artifacts";
import "./tradetempr/tradetempr.css";

function Hero() {
  const reduced = useReducedMotion();
  return <section id="overview" aria-labelledby="tradetempr-title" className="relative px-6 pb-16 pt-32 md:px-10 md:pt-40 lg:px-16">
    <div className="mx-auto max-w-[1160px]">
      <motion.div initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
        <Eyebrow>Product Design &amp; Development</Eyebrow>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div><h1 id="tradetempr-title" className="font-display text-6xl italic leading-none sm:text-7xl md:text-8xl">TradeTempr</h1><p className="mt-5 text-lg font-light text-text-primary/75 md:text-2xl">Behavioral intelligence for traders.</p></div>
          <p className="max-w-md font-display text-3xl italic leading-[1.2] text-[#bdd2e9] md:text-4xl">Profit shows what happened.<br />TT shows how you traded.</p>
        </div>
      </motion.div>
      <div className="mt-12 md:mt-16"><Capture name="home" hero /></div>
      <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <div className="tt-copy"><p>I designed and built TradeTempr to help traders review how they followed their own process, alongside what they earned or lost.</p><p className="text-sm text-text-primary/55">Behavioral effectiveness is not yet validated.</p></div>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-7">{metadata.map(([label, value]) => <div key={label} className={label === "Scope" ? "col-span-2 row-start-2" : ""}><dt className="text-[10px] uppercase tracking-[0.2em] text-[#a9c6e5]">{label}</dt><dd className="mt-2 text-sm leading-6 text-text-primary/75">{value}</dd></div>)}</dl>
      </div>
      <nav aria-label="Case study chapters" className="mt-14 grid grid-cols-2 gap-x-6 border-t border-white/15 pt-6 md:grid-cols-4">{chapters.map(([id, label], index) => <a key={id} href={`#${id}`} className="py-3 text-xs leading-6 text-text-primary/60 transition hover:text-white"><span className="mr-2 text-[#a9c6e5]/70">0{index + 1}</span>{label}</a>)}</nav>
    </div>
  </section>;
}

export function TradeTemprCaseStudy() {
  useLayoutEffect(() => {
    const previousTitle = document.title;
    document.title = "TradeTempr | Product Design & Development";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    return () => { document.title = previousTitle; };
  }, []);

  return <main className="tt-case relative min-h-[100dvh] bg-[#050607] text-text-primary">
    <div className="tt-ambient" aria-hidden="true" />
    <BackToWork />
    <Hero />

    <Chapter id="process" number="02" title="Separating process from outcome">
      <div className="tt-split items-center">
        <div className="tt-copy"><p className="tt-lead">A profitable trade can still break the plan.</p><p>I separated financial results from recorded decisions. TT reflects the trader’s confirmed account of execution, not their profit.</p><Note>This is a retrospective journal, not a live trading intervention.</Note></div>
        <OutcomeProcess />
      </div>
    </Chapter>

    <Chapter id="direction" number="03" title="Finding the product’s direction">
      <div className="tt-mobile-story">
        <div className="tt-copy"><Eyebrow>From Margin Notes to TradeTempr</Eyebrow><p className="tt-lead">Keep the record clear. Leave room for doubt.</p><p>The first version centered on private journaling. I kept the dark layers, breathing room, and compact navigation from an early reference, but rejected unsupported psychological labels and performance claims.</p><p>On mobile, I stacked the score and baseline and kept navigation within reach.</p><Note>This direction came from a reference audit, not primary user research.</Note></div>
        <div className="tt-mobile-capture"><Capture name="homeMobile" /></div>
      </div>
    </Chapter>

    <Chapter id="alignment" number="04" title="Making the score explainable">
      <div className="tt-split mb-10"><p className="tt-lead">Show what went into the number.</p><div className="tt-copy"><p>I exposed all five dimensions and their weights. TT follows a fixed formula, not AI. Missing required evidence withholds the score.</p><p>Confidence describes evidence coverage, not statistical certainty. The weights remain product choices that need validation.</p></div></div>
      <Capture name="alignment" />
      <Note>“Normal” means historical, not healthy or ideal. Risk and state are self-reported; reflection checks cannot measure honesty.</Note>
    </Chapter>

    <Chapter id="capture" number="05" title="Designing the capture and reflection loop">
      <div className="tt-split mb-10"><p className="tt-lead">A score needs a record worth returning to.</p><div className="tt-copy"><p>I connected each trade to its plan, execution, state, result, and reflection. Drafts support unfinished entries; completed records stay editable.</p></div></div>
      <Capture name="journal" />
      <div className="tt-entry-story mt-16 md:mt-24">
        <div className="tt-copy"><Eyebrow>One stage at a time</Eyebrow><p className="tt-lead">Make the next question clear.</p><p>I moved prices, size, and extra notes behind disclosures. Results got their own stage; reflection joined the save step.</p><p>The aim was less competing information. I still need to test the recording effort.</p><Note>Rule versions and score snapshots preserve the context of older entries.</Note></div>
        <Capture name="entry" />
      </div>
    </Chapter>

    <Chapter id="review" number="06" title="Looking across the record">
      <div className="tt-split mb-10"><div><Eyebrow>Weekly Review</Eyebrow><p className="tt-lead mt-4">Update the evidence.<br />Keep the trader’s words.</p></div><div className="tt-copy"><p>I brought weekly results and reflection together. Refreshing the evidence preserves the trader’s writing, including edits and cleared answers.</p></div></div>
      <Capture name="weekly" />
      <div className="mt-16 border-t border-white/10 pt-12 md:mt-24">
        <div className="tt-split mb-10"><div><Eyebrow>Patterns</Eyebrow><p className="tt-lead mt-4">An observation you can question.</p></div><div className="tt-copy"><p>I placed supporting entries and uncertainty beside each observation, with room to disagree or add context.</p><p>These synthetic examples demonstrate the interface, not validated discovery or cause.</p></div></div>
        <Capture name="patterns" />
      </div>
      <div className="tt-mobile-story mt-16 md:mt-24">
        <div className="tt-copy"><Eyebrow>Evidence on a smaller screen</Eyebrow><p className="tt-lead">Keep the reasoning within reach.</p><p>Links wrap and feedback controls stack. I kept the evidence in the reading flow instead of hiding it behind another screen.</p></div>
        <div className="tt-mobile-capture"><Capture name="patternsMobile" /></div>
      </div>
    </Chapter>

    <Chapter id="boundaries" number="07" title="Keeping interpretation within bounds" prominent>
      <div className="tt-split mb-10"><p className="tt-lead">AI reflects on the record. It does not score it.</p><div className="tt-copy"><p>I limited AI to completed entries, checked excerpts against supplied context, and required uncertainty. Output checks constrain advice, diagnosis, and causal claims.</p></div></div>
      <InterpretationPaths />
      <Note>Implementation diagram, not a product capture. The demo reflection has no cited excerpts. These safeguards do not guarantee accurate output; AI uses an external provider.</Note>
    </Chapter>

    <Chapter id="validation" number="08" title="What I still need to learn">
      <div className="tt-split mb-10"><p className="tt-lead">A working product is a starting point for testing.</p><div className="tt-copy"><p>I need to test comprehension, recording effort, and whether reflections are useful. Recognizing drift afterward may not change a later decision.</p></div></div>
      <BuiltAndLearning />
      <div className="mt-16 border-t border-white/15 pt-10"><Eyebrow>Reflection</Eyebrow><p className="mt-6 max-w-4xl font-display text-4xl italic leading-[1.15] md:text-5xl">The hardest decision was what imperfect evidence gave me grounds to say.</p><a href="#overview" className="mt-8 inline-block py-3 text-xs uppercase tracking-[0.2em] text-[#a9c6e5] hover:text-white">Back to top ↑</a></div>
    </Chapter>
  </main>;
}
