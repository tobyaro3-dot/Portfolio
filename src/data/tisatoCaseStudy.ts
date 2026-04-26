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
    "I redesigned TISATO across both operations and brand so the service felt clearer, more trustworthy, and easier to move through from first impression to completed ride.",
};

export const tisatoInsight = {
  problem:
    "What I saw first was a split between the inside of the service and the outside of it. Intake was inconsistent, scheduling stayed reactive, and communication broke apart, while the brand and digital touchpoints were not giving people the clarity or reassurance this kind of service needs.",
  designMove:
    "So I worked across both layers at once. I restructured intake, scheduling, and communication into clearer workflows, then aligned the identity, website, and touchpoints so the service explained that structure before a ride even began.",
  whyItMatters:
    "In NEMT, trust starts before operations do. Elderly patients and healthcare partners need the system to work clearly and present itself clearly, otherwise friction shows up before the service has a chance to help.",
};

export const tisatoWorkflow: TisatoWorkflowStep[] = [
  {
    label: "Discover",
    detail: "Build trust before the service begins.",
  },
  {
    label: "Intake",
    detail: "Capture the right ride information consistently.",
  },
  {
    label: "Schedule",
    detail: "Structure ride coordination into a clearer queue.",
  },
  {
    label: "Confirm",
    detail: "Keep drivers, patients, and facilities aligned.",
  },
  {
    label: "Reassure",
    detail: "Reinforce trust through brand and real-world touchpoints.",
  },
];

export const tisatoGalleryItems: TisatoGalleryItem[] = [
  {
    id: "intake-form",
    title: "Structured intake form",
    caption: "A clearer request path that captures the details needed before scheduling begins.",
    category: "Intake forms",
    track: "system",
    image: "/tisato-structured-intake.png",
    rotation: -4,
  },
  {
    id: "workflow-map",
    title: "Workflow mapping",
    caption: "I mapped the service lifecycle to see where coordination and trust were breaking down.",
    category: "Workflow diagrams",
    track: "system",
    image: "/tisato-workflow-mapping.png",
    rotation: 3,
  },
  {
    id: "dispatch-logic",
    title: "Scheduling logic",
    caption: "Dispatch became more repeatable once ride data and assignment logic were made explicit.",
    category: "Scheduling logic",
    track: "system",
    image: "/tisato-scheduling-logic.png",
    rotation: -2,
  },
  {
    id: "communication-touchpoint",
    title: "Communication checkpoints",
    caption: "A shared status rhythm reduced confusion between patients, drivers, and facilities.",
    category: "Communication touchpoints",
    track: "system",
    image:
      "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1200&q=80",
    rotation: 4,
  },
  {
    id: "logo-system",
    title: "Logo and identity",
    caption: "The visual system was designed to feel legible, calm, and trustworthy in every context.",
    category: "Visual identity",
    track: "brand",
    image: "/tisato-logo-identity-v2.jpg",
    rotation: -3,
  },
  {
    id: "apparel",
    title: "Driver presence",
    caption: "Branded apparel and real-world consistency helped the service feel more professional in person.",
    category: "Physical presence",
    track: "brand",
    image: "/tisato-driver-presence.png",
    rotation: 2,
  },
  {
    id: "website-structure",
    title: "Website structure",
    caption: "The website was simplified so users could understand the service and move into intake with less friction.",
    category: "Website structure",
    track: "brand",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    rotation: -5,
  },
  {
    id: "content-framework",
    title: "Messaging framework",
    caption: "Content and communication were shaped to reinforce reliability, clarity, and ease of use.",
    category: "Content strategy",
    track: "brand",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
    rotation: 3,
  },
];

export const tisatoOutcomes: TisatoOutcome[] = [
  {
    title: "Faster scheduling",
    before: "Scheduling stayed reactive because requests came in with too much ambiguity.",
    after: "A clearer intake and queue structure made coordination faster and more consistent.",
  },
  {
    title: "Fewer communication breakdowns",
    before: "Updates were fragmented across drivers, patients, and facilities.",
    after: "Shared checkpoints made the service easier to follow at each handoff.",
  },
  {
    title: "Easier onboarding and booking confidence",
    before: "The first impression did not explain the service clearly enough.",
    after: "Brand and website clarity made the process feel easier to trust from the start.",
  },
  {
    title: "Stronger trust through clearer branding",
    before: "The external experience did not reflect the level of reliability the service needed.",
    after: "A more cohesive identity reinforced professionalism in both digital and physical touchpoints.",
  },
];

export const tisatoReflection = {
  heading: "Reflection",
  body:
    "This project pushed me to think about systems and perception as one design problem. Operational clarity alone is not enough, and visual trust without structure is not enough either. The value came from aligning both so the service could function clearly and feel clear at the same time.",
};
