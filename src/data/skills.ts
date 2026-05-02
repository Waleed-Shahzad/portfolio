import type { IconType } from "react-icons";
import {
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiRedux,
  SiSequelize,
  SiMongoose,
  SiJsonwebtokens,
  SiMui,
  SiFormik,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiFirebase,
  SiHeroku,
  SiNginx,
  SiVercel,
  SiNetlify,
  SiGit,
  SiJira,
  SiTrello,
  SiAsana,
  SiSlack,
  SiClickup,
  SiSocketdotio,
  SiGraphql,
  SiApollographql,
  SiShopify,
} from "react-icons/si";
import { FaAws, FaDatabase } from "react-icons/fa";

export type Skill = { name: string; Icon: IconType };

export type SkillGroup = {
  title: string;
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    skills: [
      { name: "JavaScript", Icon: SiJavascript },
      { name: "TypeScript", Icon: SiTypescript },
      { name: "HTML5", Icon: SiHtml5 },
      { name: "CSS3", Icon: SiCss },
    ],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "React", Icon: SiReact },
      { name: "React Native", Icon: SiReact },
      { name: "Next.js", Icon: SiNextdotjs },
      { name: "Node.js", Icon: SiNodedotjs },
      { name: "Express", Icon: SiExpress },
      { name: "Redux", Icon: SiRedux },
      { name: "Sequelize", Icon: SiSequelize },
      { name: "Mongoose", Icon: SiMongoose },
      { name: "JWT", Icon: SiJsonwebtokens },
      { name: "Material UI", Icon: SiMui },
      { name: "Formik", Icon: SiFormik },
      { name: "GraphQL", Icon: SiGraphql },
      { name: "Apollo", Icon: SiApollographql },
      { name: "Socket.IO", Icon: SiSocketdotio },
    ],
  },
  {
    title: "E-commerce & CMS",
    skills: [
      { name: "Shopify", Icon: SiShopify },
      { name: "Liquid", Icon: SiShopify },
      { name: "Shopify Admin API", Icon: SiShopify },
      { name: "Storefront API", Icon: SiShopify },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "MongoDB", Icon: SiMongodb },
      { name: "PostgreSQL", Icon: SiPostgresql },
      { name: "MySQL", Icon: SiMysql },
      { name: "DynamoDB", Icon: FaDatabase },
      { name: "Redis", Icon: SiRedis },
      { name: "Firebase", Icon: SiFirebase },
    ],
  },
  {
    title: "Cloud & Hosting",
    skills: [
      { name: "AWS", Icon: FaAws },
      { name: "Heroku", Icon: SiHeroku },
      { name: "Nginx", Icon: SiNginx },
      { name: "Vercel", Icon: SiVercel },
      { name: "Netlify", Icon: SiNetlify },
    ],
  },
  {
    title: "Tools & Collaboration",
    skills: [
      { name: "Git", Icon: SiGit },
      { name: "JIRA", Icon: SiJira },
      { name: "Trello", Icon: SiTrello },
      { name: "Asana", Icon: SiAsana },
      { name: "Slack", Icon: SiSlack },
      { name: "ClickUp", Icon: SiClickup },
    ],
  },
];
