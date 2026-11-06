export const chapters = [
  ["overview", "TradeTempr"],
  ["process", "Process & outcome"],
  ["direction", "Product direction"],
  ["alignment", "Explainable alignment"],
  ["capture", "Capture & reflection"],
  ["review", "Review & observations"],
  ["boundaries", "Responsible interpretation"],
  ["validation", "Next validation"],
] as const;

export const metadata = [
  ["Role", "Product Designer & Developer"],
  ["Scope", "Product Strategy · UX/UI Design · Behavioral Model · Prototyping & Development"],
  ["Timeline", "2026 · Ongoing"],
  ["Status", "Working product · Live demo"],
] as const;

export const dimensions = [
  { name: "Rule adherence", weight: 30, evidence: "Assessments against personal rules" },
  { name: "Risk consistency", weight: 25, evidence: "Reported alignment with planned risk" },
  { name: "Decision discipline", weight: 20, evidence: "Entry, addition, setup, and session limits" },
  { name: "State influence", weight: 15, evidence: "Reported influence on execution" },
  { name: "Reflection integrity", weight: 10, evidence: "Completion, acknowledgment, uncertainty, and timing" },
] as const;

export const audit = {
  kept: ["Dark tonal layering", "Generous spacing", "Distinct reflection treatment", "Compact mobile navigation"],
  rejected: ["Unsupported psychological claims", "Invented performance correlations", "Universal behavioral labels", "Reference typography, palette, and navigation choices that did not fit"],
};

export const validation = [
  ["Explicit scoring and breakdown", "Can traders explain TT and distinguish it from performance?"],
  ["Five weighted dimensions", "Are the dimensions meaningful, and how should the model be calibrated?"],
  ["Structured capture and drafts", "Where does recording become burdensome?"],
  ["Evidence, uncertainty, and correction", "Are observations useful without feeling judgmental?"],
  ["Weekly reflection", "Does repeated use support reflection or influence later decisions?"],
] as const;

// Authentic public-demo captures. Original JPEGs remain outside the repository.
export const captures = {
  home: { title: "Home / TT Score", file: "01-home-desktop", width: 1410, height: 990, caption: "I made process visible first, with financial results kept alongside it.", alt: "TradeTempr Home showing TT 58, a personal baseline, and unavailable recent financial statistics." },
  alignment: { title: "Score breakdown", file: "02-score-breakdown-desktop", width: 1410, height: 1188, caption: "Five visible inputs explain the score. The baseline describes past entries, not an ideal.", alt: "TT score 58 with five weighted dimensions, confidence, and a qualified observation." },
  journal: { title: "Journal", file: "03a-journal-desktop", width: 1410, height: 990, caption: "Search, filters, and process scores make the record easier to revisit.", alt: "Journal list with search, filters, dated entries, TT scores, and separate financial outcomes." },
  entry: { title: "Entry flow", file: "03b-entry-flow-desktop", width: 1410, height: 1188, caption: "The Plan stage is open in an existing completed entry.", alt: "Seven entry stages with Plan expanded to show session, planned risk, and optional notes." },
  weekly: { title: "Weekly Review", file: "04-weekly-review-desktop", width: 1410, height: 1188, caption: "A week of recorded outcomes, process measures, and personal reflection.", alt: "Weekly Review with seven demo trades, financial summary, behavioral highlights, and reflection prompts." },
  reflection: { title: "Weekly reflection detail", file: "04b-weekly-reflection-desktop", width: 1410, height: 1188, caption: "Separate prompts for process, execution, and state keep reflection specific.", alt: "Existing weekly reflection in three prompts, followed by alignment dimensions and linked entries." },
  patterns: { title: "Patterns", file: "05-patterns-desktop", width: 1410, height: 990, caption: "Linked entries, uncertainty, and disagreement controls sit beside each observation.", alt: "Synthetic pattern observation with seven supporting entries, an association caveat, and feedback controls." },
  homeMobile: { title: "Home on mobile", file: "06-home-mobile", width: 360, height: 811, caption: "Score and baseline stack above persistent bottom navigation.", alt: "Mobile Home with vertically stacked score, baseline, confidence, and bottom navigation." },
  patternsMobile: { title: "Patterns on mobile", file: "07-patterns-mobile", width: 360, height: 811, caption: "Evidence links wrap; feedback controls become full width.", alt: "Mobile Patterns showing wrapping evidence links and vertically stacked feedback controls." },
} as const;
