export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  bullets: string[];
  projects: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "Accendia",
    role: "Lead Full Stack Engineer",
    period: "2025 – Present",
    bullets: [
      "Architected and shipped a production white-label AML/CTF compliance platform for accounting firms, featuring an AI-powered client due diligence agent that automates risk screening and regulatory decisioning at scale.",
      "Engineered enterprise-grade security and workflows, including JWT authentication with multi-factor step-up, granular role-based access control, third-party integrations, background job orchestration, and full CI and test coverage.",
      "Tech stack: NestJS, React 19, PostgreSQL, AWS — live at aml.accendia.ai.",
    ],
    projects: ["Accendia AML Compliance Platform"],
  },
  {
    company: "Tanbits",
    role: "Team Lead (MERN Stack)",
    period: "Jul 2024 – Present",
    bullets: [
      "Developing long-term strategies for technology and development processes to align with business goals.",
      "Communicating with clients to gather requirements, provide project updates, and ensure their needs are met.",
      "Efficiently allocating resources to maximize productivity and ensure balanced workloads within the team.",
      "Identified and resolved performance bottlenecks, resulting in a 40% improvement in application speed and responsiveness.",
      "Ensuring that all applications comply with security standards and best practices, conducting regular security audits.",
    ],
    projects: ["Sydney Water", "Pigeon Baby Australia", "Greenbox Storage", "Career Mentor", "Surplex"],
  },
  {
    company: "AppsGenii Technologies",
    role: "Team Lead & Senior MERN Stack Developer",
    period: "Aug 2021 – Jul 2024",
    bullets: [
      "Suggested improvements to team and project workflow.",
      "Consulted with engineering team members to determine system loads and develop improvement plans.",
      "Improved system performance by making proactive adjustments and resolving bugs.",
      "Mentored and guided employees to foster proper completion of assigned duties.",
      "Managed development milestones from initial steps through final delivery.",
      "Maintained complex technology infrastructure and collaborated with product team to implement new features.",
    ],
    projects: ["Bata", "Byonyks IoT", "USA Benefit Group", "Ada — Check Your Health", "LassWho"],
  },
  {
    company: "Hashcrafts",
    role: "MERN Stack Developer",
    period: "Aug 2020 – Jul 2021",
    bullets: [
      "Developed full-stack web applications to process and visualize data.",
      "Multi-tasked across several priorities to meet deadlines and expectations.",
      "Collaborated with frontend team to define stories, sprints, and project milestones.",
    ],
    projects: ["Mayor Pilot", "BlueJay — Engage", "Kruzee"],
  },
  {
    company: "OneClout",
    role: "Software Engineer",
    period: "Nov 2020 – Mar 2021",
    bullets: [
      "Adjusted application design for performance and new features.",
      "Debugged and reviewed frontend code.",
      "Focused on test-driven development with clean, scalable code.",
    ],
    projects: ["Crimson"],
  },
  {
    company: "Vvork Cloud Technologies",
    role: "Frontend Developer",
    period: "May 2019 – Jun 2020",
    bullets: [
      "Developed frontend components based on mockups using React and Material UI.",
      "Integrated compliance and security into software design.",
    ],
    projects: ["PM Pro"],
  },
];
