export type TisatoWorkflowStep = {
  label: string;
  detail: string;
};

export type TisatoGalleryItem = {
  id: string;
  title: string;
  caption: string;
  category: string;
  track: "system" | "brand";
  image: string;
  rotation: number;
};

export type TisatoOutcome = {
  title: string;
  before: string;
  after: string;
};

export const tisatoHero = {
  eyebrow: "TISATO",
  title: "Improving operational clarity and brand cohesion in NEMT.",
  impact:
    "TISATO supports rides between patients, facilities, dispatchers, and drivers. The real problem was not putting a trip on the calendar. It was turning scattered calls, texts, and forms into a system people could actually rely on.",
};

export const tisatoInsight = {
  problem:
    "Ride requests were coming in through calls, texts, and inconsistent forms, so the same trip details kept getting rewritten, clarified, or missed. That made intake harder for elderly patients, gave dispatchers uneven information to work from, and created handoff mistakes between scheduling, drivers, and facility staff.",
  designMove:
    "The fix was to build a clearer connection between intake, scheduling, coordination, and confirmation. I simplified what gets captured first, structured the information around dispatch decisions, and aligned the website, brand, and communication touchpoints so the service explained itself before a ride ever started.",
  whyItMatters:
    "In NEMT, confusion does not stay on one screen. It shows up in missed ride details, uncertain pickup times, and extra follow-up for people who are already depending on the system. Elderly patients and facility staff need the process to feel clear from the first request through the final confirmation.",
};

export const tisatoWorkflow: TisatoWorkflowStep[] = [
  {
    label: "Intake",
    detail: "Capture the trip details once, in a format dispatch can use.",
  },
  {
    label: "Scheduling",
    detail: "Turn requests into a clear queue instead of loose messages.",
  },
  {
    label: "Coordination",
    detail: "Keep drivers, patients, and facilities working from the same trip details.",
  },
  {
    label: "Confirmation",
    detail: "Show what is scheduled, what is sent, and what still needs follow-up.",
  },
  {
    label: "Ride",
    detail: "Carry the same information through pickup so the trip feels reliable in real life.",
  },
];

export const tisatoGalleryItems: TisatoGalleryItem[] = [
  {
    id: "intake-form",
    title: "Structured intake form",
    caption:
      "I reduced intake to the trip details dispatch actually needs first, so staff could capture a ride clearly without asking elderly riders to work through unnecessary fields.",
    category: "Intake forms",
    track: "system",
    image: "/tisato-structured-intake.png",
    rotation: -4,
  },
  {
    id: "workflow-map",
    title: "Workflow mapping",
    caption:
      "I mapped the handoff from request to dispatch to see exactly where details were getting lost and where the system needed clearer checkpoints.",
    category: "Workflow diagrams",
    track: "system",
    image: "/tisato-workflow-mapping.png",
    rotation: 3,
  },
  {
    id: "dispatch-logic",
    title: "Scheduling logic",
    caption:
      "I organized scheduling around what dispatch needs to act on next, so the team could assign rides from reliable details instead of piecing requests back together.",
    category: "Scheduling logic",
    track: "system",
    image: "/tisato-scheduling-logic.png",
    rotation: -2,
  },
  {
    id: "communication-touchpoint",
    title: "Communication checkpoints",
    caption:
      "I added clear status checkpoints so patients, drivers, and facility staff could see where a ride stood without relying on scattered follow-up.",
    category: "Communication touchpoints",
    track: "system",
    image:
      "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1200&q=80",
    rotation: 4,
  },
  {
    id: "logo-system",
    title: "Logo and identity",
    caption:
      "I kept the identity calm and legible so the service looked trustworthy before a patient ever had to ask for help.",
    category: "Visual identity",
    track: "brand",
    image: "/tisato-logo-identity-v2.jpg",
    rotation: -3,
  },
  {
    id: "apparel",
    title: "Driver presence",
    caption:
      "Consistent branding on staff and vehicles helped the service feel recognizable in person, which matters when riders are older and need reassurance.",
    category: "Physical presence",
    track: "brand",
    image: "/tisato-driver-presence.png",
    rotation: 2,
  },
  {
    id: "website-structure",
    title: "Website structure",
    caption:
      "I simplified the website so people could understand what TISATO does, what information is needed, and how to start a ride request.",
    category: "Website structure",
    track: "brand",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    rotation: -5,
  },
  {
    id: "content-framework",
    title: "Messaging framework",
    caption:
      "I rewrote the messaging around clarity and reassurance so the service explained itself in plain language across touchpoints.",
    category: "Content strategy",
    track: "brand",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
    rotation: 3,
  },
];

export const tisatoOutcomes: TisatoOutcome[] = [
  {
    title: "Less ambiguity in ride requests",
    before: "Key trip details were arriving in different places and getting clarified too late.",
    after: "A clearer intake path made ride requests easier to capture correctly the first time.",
  },
  {
    title: "A stronger bridge into scheduling",
    before: "Dispatch had to interpret scattered information before making a scheduling decision.",
    after: "Structured trip details gave scheduling a clearer starting point and reduced guesswork.",
  },
  {
    title: "A workflow that is easier to repeat",
    before: "Too much of the process depended on memory, follow-up, and manual clarification.",
    after: "Clearer checkpoints made the workflow easier to repeat across patients, dispatchers, and drivers.",
  },
  {
    title: "Better clarity for users and dispatchers",
    before: "Patients, facilities, and staff were not always working from the same understanding of the trip.",
    after: "The system made each step easier to read, follow, and confirm before the ride moved forward.",
  },
];

export const tisatoReflection = {
  heading: "Reflection",
  body:
    "This project changed how I think about workflow design. I learned that the hardest part is often not the task itself, but the handoff between people, tools, and moments. If I kept pushing this further, I would test the intake and confirmation steps with more real facility scenarios. It made me more intentional about designing systems that stay clear under real operational pressure.",
};
