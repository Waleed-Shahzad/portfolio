import { experience } from "./experience";

export type Stat = { label: string; value: number; suffix: string };

export const stats: Stat[] = [
  { label: "Years of experience", value: 7, suffix: "+" },
  { label: "Projects shipped", value: 25, suffix: "+" },
  { label: "Performance gains", value: 40, suffix: "%" },
  { label: "Companies worked with", value: experience.length, suffix: "" },
];

export const profile = {
  name: "Waleed Shahzad",
  title: "Full Stack Developer",
  email: "waleed.shahzaad@gmail.com",
  phone: "+92 322 4991944",
  phoneRaw: "+923224991944",
  linkedin: "https://www.linkedin.com/in/waleed-shahzad",
  resumePath: "/Waleed_Shahzad_Resume.pdf",
  location: "Lahore, Pakistan",
  summary:
    "I am a full stack developer with 7 years of experience, mostly on the MERN stack, building web and mobile apps that scale. I work across SQL and NoSQL databases, third-party APIs, and cloud infrastructure on AWS. I lead cross-functional teams, turn business requirements into clear technical plans, and ship secure, maintainable code on schedule.",
};
