import { audit, dimensions, validation } from "../../../data/tradetemprCaseStudy";
import { Eyebrow } from "./Presentation";

export function OutcomeProcess() {
  return <figure className="tt-artifact">
    <Eyebrow>Two questions. Two different answers.</Eyebrow>
    <div className="mt-8 grid grid-cols-[0.5fr_1fr_1.3fr] gap-3 border-b border-white/15 pb-4 text-xs text-text-primary/55">
      <span>Example</span><span>What happened?</span><span>How was it executed?</span>
    </div>
    {[["A", "Profit", "Broke a stated rule"], ["B", "Loss", "Followed the stated plan"]].map(([id, outcome, process]) =>
      <div key={id} className="grid grid-cols-[0.5fr_1fr_1.3fr] items-center gap-3 border-b border-white/10 py-7">
        <span className="font-display text-3xl italic text-text-primary/40">{id}</span><span className="text-lg">{outcome}</span><span className="text-sm leading-6 text-[#bdd2e9]">{process}</span>
      </div>)}
    <figcaption className="mt-6 text-xs leading-6 text-text-primary/50">Conceptual examples, not participant data. Financial outcome does not determine TT.</figcaption>
  </figure>;
}

export function ReferenceAudit() {
  return <figure className="tt-artifact">
    <div className="grid gap-10 md:grid-cols-2 md:gap-16">
      {([['Kept', audit.kept], ['Rejected', audit.rejected]] as const).map(([label, items]) =>
        <div key={label}><Eyebrow>{label}</Eyebrow><ul className="mt-6">{items.map(item => <li key={item} className="border-t border-white/10 py-4 text-sm leading-7 text-text-primary/75">{item}</li>)}</ul></div>)}
    </div>
    <figcaption className="mt-6 text-xs leading-6 text-text-primary/50">Reconstructed from the implementation audit. Original decision artifact; the supplied reference is not reproduced.</figcaption>
  </figure>;
}

export function ScoreModel() {
  return <figure className="tt-artifact">
    <Eyebrow>Recorded evidence → Five dimensions → TT</Eyebrow>
    <div className="mt-8 space-y-6">{dimensions.map(({ name, weight, evidence }) =>
      <div key={name}>
        <div className="flex items-baseline justify-between gap-4"><h3 className="text-base font-normal">{name}</h3><span className="font-display text-3xl italic text-[#bdd2e9]">{weight}%</span></div>
        <div className="my-2 h-1 bg-white/10" aria-hidden="true"><div className="h-full bg-[#8eafd3]" style={{ width: `${weight}%` }} /></div>
        <p className="text-xs leading-6 text-text-primary/55">{evidence}</p>
      </div>)}</div>
    <figcaption className="mt-8 border-t border-white/10 pt-5 text-xs leading-6 text-text-primary/60">Alignment answers: 100 aligned / 50 partial / 0 deviated. Unknown or not applicable answers are excluded where applicable. Weights are product-model choices.</figcaption>
  </figure>;
}

export function EntryEvolution() {
  const flows = [
    { label: "Before", items: ["Trade details + financial fields", "Session & original plan", "What happened", "Process alignment", "State", "Reflection", "Review & save"] },
    { label: "After", items: ["Trade", "Plan", "Execution", "Alignment / State", "Result", "Reflection & save"] },
  ];
  return <figure className="tt-artifact">
    <div className="grid gap-10 md:grid-cols-2">{flows.map(({ label, items }) => <div key={label}>
      <Eyebrow>{label}</Eyebrow><ol className="mt-6 border-l border-white/15 pl-5">{items.map((item, index) => <li key={item} className="py-2 text-sm leading-6"><span className="mr-4 text-text-primary/35">{String(index + 1).padStart(2, '0')}</span>{item}</li>)}</ol>
    </div>)}</div>
    <figcaption className="mt-8 border-t border-white/10 pt-5 text-xs leading-6 text-text-primary/55">Reconstructed from the August 24, 2026 code change. Optional details move behind disclosure; financial results receive their own stage. Not a usability-test result.</figcaption>
  </figure>;
}

export function ReviewPreservation() {
  return <figure className="tt-artifact my-10">
    <Eyebrow>A refresh should not rewrite a reflection</Eyebrow>
    <div className="mt-8 grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-center">
      <div><p className="text-lg">Evidence updates</p><p className="mt-2 text-sm leading-7 text-text-primary/60">Linked entries can change as the record grows.</p></div>
      <span className="font-display text-4xl italic text-[#a9c6e5]" aria-hidden="true">/</span>
      <div><p className="text-lg">Authored words stay</p><p className="mt-2 text-sm leading-7 text-text-primary/60">The trader’s written, edited, or cleared reflection is preserved.</p></div>
    </div>
    <figcaption className="mt-7 text-xs text-text-primary/50">Implemented August 23, 2026 · Weekly Review refresh</figcaption>
  </figure>;
}

export function InterpretationPaths() {
  return <figure className="tt-artifact tt-interpretation">
    <Eyebrow>Same evidence. Different responsibilities.</Eyebrow>
    <div className="mt-9 grid gap-10 md:grid-cols-2 md:gap-16">
      <div><p className="font-display text-4xl italic">Deterministic TT</p><p className="mt-3 text-xs uppercase tracking-[0.15em] text-[#a9c6e5]">A fixed calculation</p><ol className="tt-path"><li>Confirmed structured answers</li><li>Five weighted dimensions</li><li>Inspect the score and its context</li></ol><p className="text-sm leading-7 text-text-primary/60">Required missing evidence can withhold the score.</p></div>
      <div><p className="font-display text-4xl italic">Constrained AI</p><p className="mt-3 text-xs uppercase tracking-[0.15em] text-[#a9c6e5]">A reflection on completed entries</p><ol className="tt-path"><li>Bounded, owned-entry context</li><li>Excerpts checked against that context</li><li>Observation with uncertainty</li></ol><p className="text-sm leading-7 text-text-primary/60">Advice, diagnosis, and causal language are constrained.</p></div>
    </div>
    <figcaption className="mt-10 border-t border-white/15 pt-6 text-sm text-[#bdd2e9]">AI does not generate TT. Both interpretations should remain open to inspection.</figcaption>
  </figure>;
}

export function BuiltAndLearning() {
  return <div className="tt-validation">
    <div className="hidden grid-cols-2 gap-10 border-b border-white/20 pb-5 md:grid"><Eyebrow>What I built</Eyebrow><Eyebrow>What I still need to learn</Eyebrow></div>
    {validation.map(([built, question]) => <div key={built} className="grid gap-3 border-b border-white/10 py-7 md:grid-cols-2 md:gap-10">
      <div><span className="mb-2 block text-xs text-[#a9c6e5] md:hidden">Built</span><h3 className="text-base font-normal">{built}</h3></div>
      <p className="text-sm leading-7 text-text-primary/65"><span className="mb-2 block text-xs text-[#a9c6e5] md:hidden">Still to learn</span>{question}</p>
    </div>)}
  </div>;
}
