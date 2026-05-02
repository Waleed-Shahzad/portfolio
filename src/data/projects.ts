export type ProjectItem = {
  name: string;
  blurb: string;
  stack: string[];
  category: "Web" | "Mobile" | "Full Stack" | "E-commerce";
  accent: "cyan" | "violet" | "pink" | "amber" | "emerald";
  span?: "default" | "wide" | "tall";
  url?: string;
};

export const projects: ProjectItem[] = [
  {
    name: "Sydney Water",
    blurb:
      "Customer portal for Australia's largest water utility — billing, account management, meter reads, fault reporting, and real-time dam levels for residents, businesses, and trades.",
    stack: ["React", "Node.js", "TypeScript", "REST APIs", "AWS"],
    category: "Web",
    accent: "cyan",
    span: "wide",
    url: "https://www.sydneywater.com.au/",
  },
  {
    name: "Pigeon Baby Australia",
    blurb:
      "Shopify storefront for Pigeon Australia — feeding, skincare, and dental care for newborns through toddlers, with stage-based shopping, a Build-Your-Own-Bottle tool, and AfterPay checkout.",
    stack: ["Shopify", "Liquid", "Storefront API", "JavaScript", "AfterPay"],
    category: "E-commerce",
    accent: "pink",
    url: "https://www.pigeonbaby.com.au/",
  },
  {
    name: "Greenbox Storage",
    blurb:
      "A storage service platform for university students across the USA. Frontend site, order portal, and admin dashboard.",
    stack: ["MongoDB", "Express", "React", "Node.js", "AWS", "DynamoDB", "Redis"],
    category: "Full Stack",
    accent: "emerald",
    url: "https://www.greenboxstorage.org/",
  },
  {
    name: "Surplex",
    blurb:
      "Heavy machinery auction platform with secure transactions, real-time bidding, and a CMS-driven listing portal.",
    stack: ["MongoDB", "Express", "React", "Node.js", "WebSocket"],
    category: "Web",
    accent: "cyan",
    url: "https://www.surplex.com/en",
  },
  {
    name: "Byonyks IoT",
    blurb:
      "Bloodless dialysis automation with patient-doctor management — back-office plus mobile app, real-time over Socket.IO.",
    stack: ["React Native", "Node.js", "Express", "PostgreSQL", "Redux"],
    category: "Mobile",
    accent: "violet",
    url: "https://byonyks.com/",
  },
  {
    name: "Career Mentor",
    blurb:
      "Mentor-to-employer marketplace where mentors upload candidate resumes for live job postings and earn rewards.",
    stack: ["React Native", "Node.js", "Sequelize", "MySQL", "AWS"],
    category: "Mobile",
    accent: "pink",
  },
  {
    name: "Bata",
    blurb:
      "Inventory, ledger, wallet, and product catalog app rolled out to every Bata store across Pakistan.",
    stack: ["React Native", "Node.js", "Sequelize", "MySQL", "AWS"],
    category: "Mobile",
    accent: "amber",
    url: "https://play.google.com/store/apps/details?id=com.developer.bata",
  },
  {
    name: "USA Benefit Group",
    blurb:
      "Backend dashboard for an insurance company to centralize regional KPI tracking across teams and territories.",
    stack: ["React", "Node.js", "Express", "Sequelize", "MySQL"],
    category: "Full Stack",
    accent: "cyan",
    url: "https://usabg.com/",
  },
  {
    name: "Ada — Check Your Health",
    blurb:
      "AI symptom checker that surfaces personalized medical information from natural-language patient queries.",
    stack: ["React Native", "Redux", "GraphQL"],
    category: "Mobile",
    accent: "emerald",
    url: "https://play.google.com/store/apps/details?id=com.ada.app",
  },
  {
    name: "LassWho",
    blurb:
      "Celebrity-fan engagement app for live one-on-one video chat experiences, monetized through booking flows.",
    stack: ["React Native", "TypeScript", "Apollo", "GraphQL"],
    category: "Mobile",
    accent: "violet",
  },
  {
    name: "Mayor Pilot",
    blurb:
      "Vehicle theft reporting platform deployed in Nigeria with integrated maps for routing and incident tracking.",
    stack: ["React", "Redux", "Material UI", "Formik"],
    category: "Web",
    accent: "amber",
  },
  {
    name: "Kruzee",
    blurb:
      "North-American driving instructor finder with full scheduling, payments, and JWT-based authentication.",
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    category: "Full Stack",
    accent: "pink",
    url: "https://kruzee.com/",
  },
  {
    name: "BlueJay — Engage",
    blurb:
      "Home physical therapy companion app keeping patients in sync with their PTs through structured exercise plans.",
    stack: ["React Native", "Redux", "React Navigation"],
    category: "Mobile",
    accent: "cyan",
    url: "https://play.google.com/store/apps/details?id=com.bluejayhealth",
  },
];

export const accentMap = {
  cyan: { from: "#06b6d4", to: "#0891b2", glow: "rgba(6, 182, 212, 0.45)" },
  violet: { from: "#a855f7", to: "#7e22ce", glow: "rgba(168, 85, 247, 0.45)" },
  pink: { from: "#ec4899", to: "#be185d", glow: "rgba(236, 72, 153, 0.45)" },
  amber: { from: "#f59e0b", to: "#b45309", glow: "rgba(245, 158, 11, 0.45)" },
  emerald: { from: "#10b981", to: "#047857", glow: "rgba(16, 185, 129, 0.45)" },
} as const;
