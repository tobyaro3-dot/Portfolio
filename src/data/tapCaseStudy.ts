export type TapScreenId = "entry" | "attendance" | "rewards" | "operator";

export type TapFactorId =
  | "entry-experience"
  | "attendance-system"
  | "streak-rewards"
  | "operator-view";

export type TapScreen = {
  id: TapScreenId;
  label: string;
  eyebrow: string;
  title: string;
};

export type TapFactor = {
  id: TapFactorId;
  label: string;
  shortLabel: string;
  screen: TapScreenId;
  zones: string[];
  problem: string;
  designMove: string;
  whyItMatters: string;
};

export const tapScreens: TapScreen[] = [
  {
    id: "entry",
    label: "Entry Experience",
    eyebrow: "Tap",
    title: "Make entry feel instant instead of administrative",
  },
  {
    id: "attendance",
    label: "Attendance System",
    eyebrow: "Log",
    title: "Turn entry into automatic attendance with no extra action",
  },
  {
    id: "rewards",
    label: "Streak & Reward System",
    eyebrow: "Track",
    title: "Show consistency building over time so momentum is visible",
  },
  {
    id: "operator",
    label: "Operator View",
    eyebrow: "Retain",
    title: "Give businesses a clean view of who is active and who is drifting",
  },
];

export const tapFactors: TapFactor[] = [
  {
    id: "entry-experience",
    label: "Entry Experience",
    shortLabel: "Tap",
    screen: "entry",
    zones: ["entry-card", "entry-pass", "entry-cta"],
    problem:
      "What stood out to me was how much friction gets packed into the smallest moment. Checking in often means stopping at a desk, opening an app, or waiting for staff.",
    designMove:
      "So I designed TAP around one action: tap your phone and enter. The system handles the verification and attendance logging without asking for anything extra.",
    whyItMatters:
      "That removes friction right at the door, which is the moment people repeat most often and feel most immediately.",
  },
  {
    id: "attendance-system",
    label: "Attendance System",
    shortLabel: "Log",
    screen: "attendance",
    zones: ["attendance-log", "attendance-feed", "attendance-status"],
    problem:
      "I kept seeing attendance depend on staff memory, manual counters, or members remembering to check themselves in after they were already inside.",
    designMove:
      "TAP logs each visit automatically at entry, then timestamps it into a clean attendance feed the business can trust without extra cleanup.",
    whyItMatters:
      "Once logging becomes automatic, consistency stops being something the business has to chase manually.",
  },
  {
    id: "streak-rewards",
    label: "Streak & Reward System",
    shortLabel: "Reward",
    screen: "rewards",
    zones: ["rewards-streak", "rewards-milestones", "rewards-cta"],
    problem:
      "Attendance systems usually stop at recording visits. They track behavior, but they do not really encourage people to keep showing up.",
    designMove:
      "I turned visits into visible streaks, milestone unlocks, and simple rewards so the product reinforces consistency instead of just documenting it.",
    whyItMatters:
      "That gives each visit a little momentum. Logging becomes a behavior loop, not just a record.",
  },
  {
    id: "operator-view",
    label: "Operator View",
    shortLabel: "Retain",
    screen: "operator",
    zones: ["operator-overview", "operator-risk", "operator-members"],
    problem:
      "Without a clear business view, staff can tell who walked in today, but they cannot easily spot who is becoming inactive or who needs a nudge.",
    designMove:
      "So I added an operator view that keeps active members, streak health, and at-risk patterns visible in one place instead of scattering them across front-desk tools.",
    whyItMatters:
      "That makes retention less reactive. The business can act on behavior before members quietly disappear.",
  },
];

export const tapWorkflow = [
  {
    label: "Tap",
    detail: "Tap your phone to enter instantly.",
  },
  {
    label: "Log",
    detail: "Automatically record attendance with no manual input.",
  },
  {
    label: "Track",
    detail: "Build visible streaks over time.",
  },
  {
    label: "Reward",
    detail: "Trigger milestones and rewards based on consistency.",
  },
  {
    label: "Retain",
    detail: "Use streaks and data to bring users back.",
  },
];

export const tapOutcomes = [
  {
    title: "Faster entry experience",
    before: "Entry slowed down around staff handoffs and manual check-ins.",
    after: "A single tap makes getting into the space feel immediate.",
  },
  {
    title: "Increased visit consistency",
    before: "Attendance was recorded, but not turned into momentum.",
    after: "Streaks make consistency visible and worth maintaining.",
  },
  {
    title: "Reduced reliance on staff",
    before: "Front desks carried too much routine tracking work.",
    after: "Logging happens automatically at the point of entry.",
  },
  {
    title: "Stronger member retention",
    before: "It was harder to notice drift before members dropped off.",
    after: "Operator signals make retention patterns easier to act on.",
  },
];

export const tapReflection = {
  heading: "Reflection",
  body:
    "While working on TAP, I kept coming back to the idea that behavior is not shaped by big features, but by repeated moments. For this system, that moment is entry. Once that became frictionless, consistency followed.",
};
