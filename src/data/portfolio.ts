import { HLS_VIDEO_SRC, SECTION_IDS } from "../lib/constants";

export type Project = {
  slug: string;
  title: string;
  logo: string;
  subtitle: string;
  role: string;
  scope: string;
  context: string;
  location?: string;
  summary: string;
  tags: string[];
  details: {
    heading: string;
    body: string;
  }[];
  image: string;
  span: "third";
  preview: {
    device: "phone";
    tone: "medical" | "loyalty" | "sport" | "museum" | "research";
    accent: string;
    secondaryAccent: string;
    screenLabel: string;
    metric: string;
  };
};

export type JournalEntry = {
  title: string;
  image: string;
  readTime: string;
  date: string;
};

export type ExplorationItem = {
  title: string;
  image: string;
  rotation: number;
  column: "left" | "right";
};

export type StatItem = {
  value: string;
  label: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export const videoSource = HLS_VIDEO_SRC;

export const navLinks = [
  { label: "Home", target: SECTION_IDS.home },
  { label: "Work", target: SECTION_IDS.work },
] as const;

export const roles = ["Product Designer", "UX Researcher", "Web Designer", "Systems Builder"];

export const projects: Project[] = [
  {
    slug: "tisato",
    title: "TISATO",
    logo: "TISATO",
    subtitle:
      "Website, booking intake, and brand for a medical transportation company in Central Florida.",
    role: "Product & Systems Designer",
    scope: "Operations, Workflows, Brand Identity, Digital Presence",
    context: "Live non-emergency medical transportation service",
    location: "Orlando, Florida",
    summary:
      "I redesigned TISATO as both a service system and a trust-building experience, focusing on the places where clarity breaks down before, during, and after a ride.",
    tags: ["NEMT", "Service Design", "Workflow Systems", "Brand Identity"],
    image: "/tisato-cover.png",
    span: "third",
    preview: {
      device: "phone",
      tone: "medical",
      accent: "#89AACC",
      secondaryAccent: "#55D6BE",
      screenLabel: "Ride intake",
      metric: "200+ users",
    },
    details: [
      {
        heading: "Overview",
        body:
          "TISATO is a non-emergency medical transportation service focused on reliable recurring transportation for patients and healthcare facilities. In this project, I connected the internal operating system with the external brand touchpoints people encounter first.",
      },
      {
        heading: "Problem",
        body:
          "I saw intake coming in inconsistently, scheduling staying reactive, and communication breaking apart across handoffs. At the same time, the brand, website, and communication touchpoints were not reflecting the level of clarity and trust the service actually needed.",
      },
      {
        heading: "Insight",
        body:
          "My biggest takeaway was that the service needed structural clarity and visual coherence at the same time. Even a functional system can feel confusing if the brand and interface do not clearly explain how it works.",
      },
      {
        heading: "What Was Designed",
        body:
          "I designed structured intake forms, workflow diagrams, scheduling logic, communication processes, logo direction, brand guidelines, apparel concepts, website structure, and a content framework for ongoing communication.",
      },
      {
        heading: "Impact",
        body:
          "The result was faster, more consistent scheduling, fewer communication breakdowns, and a service that felt easier for elderly patients to understand and trust. The stronger brand presence also improved recognition and confidence.",
      },
    ],
  },
  {
    slug: "solmate",
    title: "SolMate",
    logo: "SolMate",
    subtitle:
      "A practice-planning app for the youth soccer coaches I work with at Sol SC.",
    role: "Product Designer",
    scope: "UX Design, Workflow Systems, Mobile Product Design",
    context: "Concept product tailored for the Sol SC youth program",
    summary:
      "I designed SolMate from the perspective of real coaching friction, focusing on how drills, team context, and repeatable planning could live inside one mobile workflow.",
    tags: ["Mobile UX", "Workflow Design", "Coaching Tools", "Sports Tech"],
    image: "/solmate-cover.png",
    span: "third",
    preview: {
      device: "phone",
      tone: "sport",
      accent: "#f2a900",
      secondaryAccent: "#69d2ff",
      screenLabel: "Coaching system",
      metric: "Live drill logic",
    },
    details: [
      {
        heading: "Overview",
        body:
          "SolMate is a mobile application concept I shaped from direct coaching experience within Sol SC. The goal was to help soccer coaches plan, organize, and run structured training sessions with less friction.",
      },
      {
        heading: "Problem",
        body:
          "I kept seeing coaches rely on memory, scattered notes, or random online resources, then rebuild practices from scratch each week. Without a central structure, planning becomes slower and training quality gets less consistent.",
      },
      {
        heading: "Insight",
        body:
          "The issue was never a lack of drill content. What I noticed was a lack of structure: coaches needed a system that could organize what they already know into reusable, practical workflows.",
      },
      {
        heading: "What Was Designed",
        body:
          "I designed coach onboarding, a home dashboard, a categorized drill library, detailed drill pages, a custom drill builder, and a timeline-based practice planner that calculates total session time.",
      },
      {
        heading: "Impact",
        body:
          "The product is meant to reduce preparation time, help coaches reuse what works, and create a more consistent player-development experience across a youth program.",
      },
    ],
  },
  {
    slug: "tap",
    title: "TAP",
    logo: "TAP",
    subtitle:
      "Tap-to-enter check-in and attendance streaks for membership-based businesses.",
    role: "Product Designer & Systems Architect",
    scope: "Product Strategy, UX Design, Behavioral Systems, Brand & Experience",
    context: "Concept platform for a multi-business loyalty ecosystem",
    summary:
      "I designed TAP as a loyalty system that feels less like a feature and more like a behavioral engine, connecting check-ins, streaks, rewards, and business insight across a network.",
    tags: ["Product Strategy", "Behavior Design", "Loyalty", "Dashboards"],
    image: "/tap-cover.png",
    span: "third",
    preview: {
      device: "phone",
      tone: "loyalty",
      accent: "#9DBBFF",
      secondaryAccent: "#7CFFB2",
      screenLabel: "Streak engine",
      metric: "Tap to enter",
    },
    details: [
      {
        heading: "Overview",
        body:
          "With TAP, I wanted to replace fragmented check-ins and passive loyalty programs with one unified system where users tap their phone to enter, automatically earn rewards, and build streaks that reinforce consistent behavior.",
      },
      {
        heading: "Problem",
        body:
          "What stood out to me was that local businesses often track attendance without really influencing retention. Users lose momentum, while businesses are left reacting too late to at-risk customers.",
      },
      {
        heading: "Insight",
        body:
          "Most loyalty programs only count visits. I wanted check-in itself to give people a reason to come back.",
      },
      {
        heading: "What Was Designed",
        body:
          "I designed tap-based entry, rewards and streak mechanics, user dashboards, achievement systems, business dashboards, at-risk user signals, automated engagement tools, token logic, and the visual identity direction.",
      },
      {
        heading: "Impact",
        body:
          "The concept gives users a more engaging reason to return while giving businesses better visibility into behavior, stronger retention tools, and a model that becomes more valuable as more businesses join.",
      },
    ],
  },
];

export const automationProjects: Project[] = [
  {
    slug: "tisato-crm",
    title: "TISATO CRM",
    logo: "CRM",
    subtitle:
      "A private mobile CRM that turns facility contacts into approved partners and paying rides.",
    role: "Designer & Builder",
    scope: "CRM Design, Marketing Automation, Follow-up Systems",
    context: "Live partnership CRM for a NEMT service",
    location: "Orlando, Florida",
    summary:
      "I designed and built a follow-up engine that tells the team who to contact today, pauses automatically when partners reply, and keeps a person in charge of every message.",
    tags: ["CRM", "Marketing Automation", "Google Apps Script"],
    image: "/tisato-crm/cover.webp",
    span: "third",
    preview: {
      device: "phone",
      tone: "medical",
      accent: "#8f78c6",
      secondaryAccent: "#55D6BE",
      screenLabel: "Follow-up engine",
      metric: "Human-reviewed",
    },
    details: [],
  },
  {
    slug: "showtime",
    title: "Showtime",
    logo: "SHOWTIME",
    subtitle:
      "An Instagram Reels ad and lead form that brought a youth soccer program about 40 parent leads for about $250.",
    role: "Paid Social",
    scope: "Meta Ads, Lead Forms, Audience Targeting",
    context: "Summer program campaign for a youth soccer club",
    location: "Central Florida",
    summary:
      "A small Meta campaign aimed at past followers and lookalikes, with a lead form inside Instagram.",
    tags: ["Meta Ads", "Lead Generation", "Instagram"],
    image: "/showtime-cover.webp",
    span: "third",
    preview: {
      device: "phone",
      tone: "sport",
      accent: "#f2c230",
      secondaryAccent: "#ffffff",
      screenLabel: "~40 leads",
      metric: "~$6.25 per lead",
    },
    details: [],
  },
];

export const researchProjects: Project[] = [
  {
    slug: "national-lighthouse-museum",
    title: "National Lighthouse Museum",
    logo: "NLM",
    subtitle:
      "A UCF HCI team study of a museum companion app, tested with think-aloud sessions.",
    role: "UX Researcher",
    scope: "Think-Aloud Study, HCI, Museum Experience",
    context: "Research study for a museum visitor experience",
    summary:
      "A future case study focused on observing how people move through a museum experience when digital tools become part of the visit.",
    tags: ["UX Research", "HCI", "Museum Experience"],
    image: "/national-lighthouse-museum-cover.png",
    span: "third",
    preview: {
      device: "phone",
      tone: "museum",
      accent: "#c9a96a",
      secondaryAccent: "#6f8793",
      screenLabel: "Think-aloud study",
      metric: "UX research · HCI",
    },
    details: [
      {
        heading: "Future Case Study",
        body:
          "This page is reserved for the National Lighthouse Museum research case study.",
      },
    ],
  },
  {
    slug: "why-people-stop-using-apps",
    title: "Why Do People Stop Using Apps They Once Loved?",
    logo: "APP",
    subtitle:
      "A research plan for learning why people drift away from apps they used to rely on.",
    role: "Generative UX Researcher",
    scope: "Discovery Research, Literature Review, Study Design",
    context: "Independent UX research case study before design",
    summary:
      "A research case study that reframes app abandonment as a changing relationship between value, context, routine, identity, and alternatives.",
    tags: ["Generative Research", "Retention", "HCI"],
    image: "/app-abandonment-cover.png",
    span: "third",
    preview: {
      device: "phone",
      tone: "research",
      accent: "#c8a86c",
      secondaryAccent: "#7d949d",
      screenLabel: "Generative study",
      metric: "UX research",
    },
    details: [
      {
        heading: "Future Case Study",
        body:
          "This page explores how to study changing relationships with digital products before deciding what to build.",
      },
    ],
  },
  {
    slug: "tradetempr",
    title: "TradeTempr",
    logo: "TT",
    subtitle: "A trading journal that scores how well you followed your own plan, win or lose.",
    role: "Product Designer & Developer",
    scope: "Product Strategy · UX/UI Design · Behavioral Model · Prototyping & Development",
    context: "Working product · Live demo",
    summary: "Designing a reflection system that separates trading process from financial outcomes.",
    tags: ["Product Design & Development"],
    image: "/tradetempr-card.webp",
    span: "third",
    preview: {
      device: "phone",
      tone: "research",
      accent: "#89AACC",
      secondaryAccent: "#89AACC",
      screenLabel: "Product Design & Development",
      metric: "2026 · Ongoing",
    },
    details: [],
  },
];

export const journalEntries: JournalEntry[] = [
  {
    title: "How restraint gives digital systems a stronger pulse",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=600&q=85",
    readTime: "4 min read",
    date: "Apr 12, 2026",
  },
  {
    title: "Designing interfaces that feel quiet but never passive",
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=600&q=85",
    readTime: "6 min read",
    date: "Mar 29, 2026",
  },
  {
    title: "Notes on motion, latency, and the art of expectation",
    image:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=600&q=85",
    readTime: "5 min read",
    date: "Mar 08, 2026",
  },
  {
    title: "Building brands that survive contact with real products",
    image:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=600&q=85",
    readTime: "7 min read",
    date: "Feb 18, 2026",
  },
];

export const explorations: ExplorationItem[] = [
  {
    title: "CRM Intake Redesign",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=85",
    rotation: -5,
    column: "left",
  },
  {
    title: "User Journey Mapping",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=85",
    rotation: 4,
    column: "right",
  },
  {
    title: "Workflow Simplification",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=85",
    rotation: 6,
    column: "left",
  },
  {
    title: "Service Design Systems",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=85",
    rotation: -4,
    column: "right",
  },
  {
    title: "Interactive Media Concepts",
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=800&q=85",
    rotation: 3,
    column: "left",
  },
  {
    title: "Storytelling Through Motion",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=85",
    rotation: -6,
    column: "right",
  },
];

export const stats: StatItem[] = [
  { value: "200+", label: "Users Supported" },
  { value: "$10K+", label: "Revenue Generated" },
  { value: "150+", label: "Families Per Season" },
];

export const socials: SocialLink[] = [
  {
    label: "Email",
    href: "mailto:toby.aro3@gmail.com",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/alex-aro-446487239/",
  },
];
