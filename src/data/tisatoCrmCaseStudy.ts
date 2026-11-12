export type CrmWorkflowStep = {
  label: string;
  detail: string;
};

export type CrmGalleryItem = {
  id: string;
  title: string;
  caption: string;
  category: string;
  track: "system" | "safeguards";
  image: string;
  alt: string;
  rotation: number;
};

export type CrmOutcome = {
  title: string;
  before: string;
  after: string;
};

export const crmHero = {
  eyebrow: "TISATO Partnership CRM",
  impact:
    "TISATO's growth depends on partnerships with assisted living homes, clinics, and referral sources. Winning one takes several touches: an introduction, follow-ups, often a vendor application, then a wait for approval. I designed and built a private mobile CRM that moves each contact from first conversation to vendor approval, booking, and payment, so no lead goes cold.",
  meta: [
    ["Role", "Designer & builder"],
    ["Tools", "Google Sheets, Google Apps Script"],
    ["Launched", "October 2026"],
  ] as const,
};

export const crmInsight = {
  problem:
    "Partnership leads lived in a basic spreadsheet, and follow-ups depended on memory. In the original tracker, 3 of 4 contacts were marked \"Follow-Up Needed.\" There was no view of who needed a next step today, and no link between a conversation and the business result it led to.",
  designMove:
    "I built a private mobile app on top of the spreadsheet the team already used, expanding it into a nine-tab CRM without touching the original data. The app tells the team who to contact today, schedules follow-ups automatically, drafts responses for human review, and tracks each partner from first contact to approval, booking, and payment.",
  whyItMatters:
    "In non-emergency medical transport, partnerships are the main source of rides. A missed follow-up isn't just a lost lead. It's patients who don't get a reliable ride. The system had to stay simple enough to use from a phone between rides, and careful enough for healthcare partners.",
};

export const crmWorkflow: CrmWorkflowStep[] = [
  {
    label: "Capture",
    detail:
      "Add a lead by name, run event intake at networking events, or import up to 50 contacts by CSV with duplicate checks.",
  },
  {
    label: "Prioritize",
    detail: "Today's Actions shows who is due, who is overdue, and which drafts need review.",
  },
  {
    label: "Follow up",
    detail:
      "Reminders at 3, 7, and 14 business days. Replies, opt-outs, and invalid addresses pause a contact for human review.",
  },
  {
    label: "Respond",
    detail:
      "Templates create a draft. A person reviews it, sends it from the TISATO inbox, and records the send.",
  },
  {
    label: "Convert",
    detail:
      "Vendor approval, bookings, and payments are recorded on each contact and roll up to the dashboard.",
  },
];

export const crmRules: { when: string; then: string }[] = [
  {
    when: "A new lead is added",
    then: "The first follow-up is scheduled on a 3, 7, and 14 business-day cadence the team can adjust.",
  },
  {
    when: "A partner replies",
    then: "Automation stops for that contact until a person reviews the conversation.",
  },
  {
    when: "Someone opts out",
    then: "The contact is suppressed, so no follow-up is suggested again.",
  },
  {
    when: "An email address is invalid",
    then: "Follow-ups hold until the address is reviewed and fixed.",
  },
  {
    when: "A draft is prepared or copied",
    then: "Nothing is marked as sent. Only a send recorded with evidence counts.",
  },
  {
    when: "Contact details change",
    then: "Any existing draft needs a fresh review, and text a person wrote by hand is kept.",
  },
  {
    when: "A CSV import finds a duplicate",
    then: "The import stops for review. Rows already saved stay saved.",
  },
  {
    when: "Every hour",
    then: "Recommendations and the CEO dashboard are recalculated from the latest records.",
  },
];

export const crmArchitecture = [
  {
    label: "Mobile web app",
    detail: "Private, phone-first interface for daily work. Only the TISATO Google account can open it.",
  },
  {
    label: "Rules engine",
    detail:
      "Google Apps Script holds the follow-up, suppression, and pipeline rules, kept separate from the code that reads and writes the sheet.",
  },
  {
    label: "Google Sheet CRM",
    detail:
      "A nine-tab sheet tracks contacts, activity history, drafts, vendor applications, bookings, and payments. The original tracker tab stays untouched.",
  },
  {
    label: "Hourly job",
    detail: "A scheduled trigger reconciles recommendations and refreshes the dashboard.",
  },
];

export const crmGalleryItems: CrmGalleryItem[] = [
  {
    id: "dashboard",
    title: "Today's Actions",
    caption:
      "The dashboard answers one question: who needs a next step today. Due, overdue, and drafts-to-review come first.",
    category: "Dashboard",
    track: "system",
    image: "/tisato-crm/dashboard.webp",
    alt: "CRM dashboard with counts for due today, overdue, new leads, drafts to review, vendor approvals, approved partners, and confirmed bookings, shown with sample data.",
    rotation: -4,
  },
  {
    id: "todays-actions",
    title: "A daily to-do list",
    caption:
      "Each contact shows why it's on the list and how urgent it is, so the team can act from a phone in a few taps.",
    category: "Prioritization",
    track: "system",
    image: "/tisato-crm/todays-actions.webp",
    alt: "Today's Actions list showing four sample contacts with overdue, due today, and draft-to-review labels.",
    rotation: 3,
  },
  {
    id: "follow-ups",
    title: "Follow-up cadence",
    caption:
      "Follow-ups run at 3, 7, and 14 business days and stop automatically when someone replies or opts out, so partners are never pestered.",
    category: "Automation",
    track: "system",
    image: "/tisato-crm/follow-ups.webp",
    alt: "Follow-ups screen showing the 3, 7, and 14 business-day cadence, this week's follow-ups, and a contact paused for review after replying, with sample data.",
    rotation: -2,
  },
  {
    id: "contact-history",
    title: "Contact history",
    caption:
      "Every call, send, and status change is added to a permanent history. Nothing is overwritten, so the team always knows what happened and when.",
    category: "Record keeping",
    track: "system",
    image: "/tisato-crm/contact-detail.webp",
    alt: "Sample contact page showing source, vendor status, next follow-up date, and an activity history with a call, a recorded send, and lead creation.",
    rotation: 4,
  },
  {
    id: "draft-review",
    title: "Human-reviewed drafts",
    caption:
      "The app has no email sender at all. Drafts are reviewed, sent by a person, and recorded with evidence. Copying a draft never counts as sending.",
    category: "Messaging",
    track: "safeguards",
    image: "/tisato-crm/draft-review.webp",
    alt: "Draft review screen with an editable follow-up message, a note that nothing is sent automatically, and buttons to copy the draft or record a manual send.",
    rotation: -3,
  },
];

export const crmSafeguards = [
  {
    title: "Privacy and access",
    body:
      "Business contacts only, with no patient information. Only the TISATO Google account can open the app, and development used synthetic data.",
  },
  {
    title: "Testing before launch",
    body:
      "87 automated tests on synthetic data covered status changes, duplicate imports, date rules, permissions, bookings, and payments.",
  },
];

export const crmOutcomes: CrmOutcome[] = [
  {
    title: "Follow-ups",
    before: "Follow-ups depended on memory and slipped.",
    after: "Each contact has a scheduled next step and an overdue flag.",
  },
  {
    title: "Daily focus",
    before: "There was no view of who needed attention.",
    after: "Today's Actions lists exactly who to contact.",
  },
  {
    title: "Outreach safety",
    before: "Nothing stopped a repeat message to someone who had already replied.",
    after: "Replies and opt-outs pause automation until a person reviews them.",
  },
  {
    title: "Business visibility",
    before: "Conversations weren't linked to results.",
    after: "Each partner is tracked from first contact to approval, booking, and payment.",
  },
];

export const crmReflection = {
  heading: "Reflection",
  body:
    "The hardest calls on this project were about what the system shouldn't do on its own: send messages, guess at approvals, or touch patient data. It launched recently, so the next step is measurement: on-time follow-up rate, lead-to-approval rate, time to approval, and which lead sources produce booked rides. I'd also shorten the draft review screen and test on a physical iPhone.",
};
