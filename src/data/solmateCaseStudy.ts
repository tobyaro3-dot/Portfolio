export type SolmateScreenId = "home" | "record" | "drills" | "teams";

export type SolmateFactorId =
  | "voice-input"
  | "team-context"
  | "auto-generation"
  | "field-visualization"
  | "practice-history";

export type SolmateScreen = {
  id: SolmateScreenId;
  label: string;
  eyebrow: string;
  title: string;
};

export type SolmateFactor = {
  id: SolmateFactorId;
  label: string;
  shortLabel: string;
  screen: SolmateScreenId;
  zones: string[];
  problem: string;
  designMove: string;
  whyItMatters: string;
};

export const solmateScreens: SolmateScreen[] = [
  {
    id: "home",
    label: "Home",
    eyebrow: "Dashboard",
    title: "A coach overview built around reuse and momentum",
  },
  {
    id: "record",
    label: "Record Pain Point",
    eyebrow: "Capture",
    title: "Translate the way I naturally describe a problem into a structured input",
  },
  {
    id: "drills",
    label: "Drill Plan",
    eyebrow: "Generate",
    title: "Turn coaching context into a session plan I could actually run",
  },
  {
    id: "teams",
    label: "Teams",
    eyebrow: "Library",
    title: "Keep each team's recurring needs visible over time",
  },
];

export const solmateFactors: SolmateFactor[] = [
  {
    id: "voice-input",
    label: "Voice Input",
    shortLabel: "Voice",
    screen: "record",
    zones: ["record-team-pills", "record-mic", "record-transcript", "record-generate"],
    problem:
      "After games or training, coaches are just calling things out and thinking out loud. Those insights do not stick unless something captures them right away.",
    designMove:
      "I started SolMate with voice capture, live transcript feedback, and one clear generate action so rough notes could become something usable fast.",
    whyItMatters:
      "That lets the product meet coaches where they already are and cuts the gap between noticing a problem and doing something with it.",
  },
  {
    id: "team-context",
    label: "Team Context",
    shortLabel: "Teams",
    screen: "teams",
    zones: ["teams-cards", "teams-pain-tags", "record-team-pills"],
    problem:
      "I've seen the same drill land very differently depending on the age group, team culture, and the problem that keeps showing up.",
    designMove:
      "So I made team-specific pills, profiles, and active pain tags that keep the workflow grounded in real coaching context instead of generic templates.",
    whyItMatters:
      "Each team gets planning support that reflects what they actually need, which makes the tool feel specific instead of abstract.",
  },
  {
    id: "auto-generation",
    label: "Auto Drill Generation",
    shortLabel: "Generate",
    screen: "drills",
    zones: ["drills-title", "drills-tags", "drills-steps"],
    problem:
      "One thing I kept coming back to was how often coaches rebuild sessions from scratch, even when the shape of the problem is familiar.",
    designMove:
      "The generated plan organizes the issue into a title, tags, session framing, and step-by-step instruction with very little manual cleanup.",
    whyItMatters:
      "That turns scattered input into a practice plan that feels ready to run, while still leaving room for coaching judgment.",
  },
  {
    id: "field-visualization",
    label: "Field Visualization",
    shortLabel: "Field",
    screen: "drills",
    zones: ["drills-field"],
    problem:
      "I've noticed text alone rarely gives coaches enough confidence around spacing, roles, or tempo when they're setting a drill up fast.",
    designMove:
      "So I paired the drill with an animated field view that shows player positions, pass paths, and movement rhythm right inside the plan.",
    whyItMatters:
      "That spatial clarity makes the drill easier to trust, easier to explain, and faster to run in a real session.",
  },
  {
    id: "practice-history",
    label: "Practice History",
    shortLabel: "History",
    screen: "home",
    zones: ["home-stats", "home-recent-drills", "teams-history"],
    problem:
      "Without a real history layer, good drills disappear into memory and coaches end up repeating the same planning work over and over.",
    designMove:
      "I used recent drills, team counts, and drill history to make the system feel cumulative, so planning could be reused and improved over time.",
    whyItMatters:
      "The product starts to feel like a living coaching library instead of a one-time generator.",
  },
];

export const solmateWorkflow = [
  {
    label: "Capture",
    detail: "Capture insights the way coaches actually say them.",
  },
  {
    label: "Interpret",
    detail: "Turn raw observations into clear, actionable context.",
  },
  {
    label: "Generate",
    detail: "Create structured session plans with less prep and more clarity.",
  },
  {
    label: "Visualize",
    detail: "Make movement, spacing, and setup easy to understand at a glance.",
  },
  {
    label: "Reuse",
    detail: "Save what worked so building the next session is faster and easier.",
  },
];

export const solmateOutcomes = [
  {
    title: "Less prep overhead",
    before: "I kept seeing sessions rebuilt from memory.",
    after: "Pain points become ready-made drill plans much faster.",
  },
  {
    title: "Clearer team-specific planning",
    before: "One-size-fits-all drill ideas blur together.",
    after: "Each team keeps its own needs, tags, and history visible.",
  },
  {
    title: "Better on-field clarity",
    before: "Too much of the setup lived in text or mental notes.",
    after: "The field view makes spacing and movement immediately legible.",
  },
  {
    title: "Reusable coaching system",
    before: "Good sessions disappear after practice ends.",
    after: "Drill history turns planning into a cumulative workflow.",
  },
];
