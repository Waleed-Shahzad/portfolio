import {
  Document,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { profile } from "@/data/stats";

const palette = {
  ink: "#0f172a",
  body: "#334155",
  bodySoft: "#475569",
  muted: "#64748b",
  rule: "#e2e8f0",
  accent: "#0e7490",
  accentLight: "#0891b2",
  accentBg: "#ecfeff",
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 30,
    paddingBottom: 32,
    paddingHorizontal: 36,
    fontFamily: "Helvetica",
    fontSize: 9.5,
    lineHeight: 1.42,
    color: palette.body,
  },

  // header
  header: { marginBottom: 12 },
  name: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: palette.ink,
    letterSpacing: 0.4,
    lineHeight: 1.15,
    marginBottom: 6,
  },
  role: {
    marginTop: 0,
    fontSize: 10,
    color: palette.accent,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.7,
    textTransform: "uppercase",
    lineHeight: 1.3,
  },
  contactLine: {
    marginTop: 8,
    fontSize: 9,
    color: palette.muted,
    lineHeight: 1.4,
  },
  contactLink: { color: palette.accentLight, textDecoration: "none" },
  rule: {
    marginTop: 10,
    height: 1,
    backgroundColor: palette.rule,
  },

  // section
  section: { marginTop: 11 },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  sectionTitleAccent: {
    width: 14,
    height: 1.5,
    backgroundColor: palette.accent,
    marginRight: 6,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: palette.ink,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },

  body: { fontSize: 9.5, color: palette.body, lineHeight: 1.45 },
  bodyTight: { fontSize: 9.5, color: palette.body, lineHeight: 1.35 },

  highlightRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
  },
  highlightCol: {
    width: "50%",
    paddingRight: 8,
    marginBottom: 4,
    flexDirection: "row",
  },
  highlightDot: {
    width: 5,
    color: palette.accent,
    fontFamily: "Helvetica-Bold",
    fontSize: 9.5,
    marginRight: 3,
  },
  highlightText: {
    flex: 1,
    fontSize: 9,
    color: palette.body,
    lineHeight: 1.4,
  },

  // experience
  expItem: { marginBottom: 9 },
  expHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 1,
  },
  expCompany: {
    fontSize: 10.5,
    fontFamily: "Helvetica-Bold",
    color: palette.ink,
  },
  expRole: {
    fontSize: 9.5,
    color: palette.bodySoft,
    fontStyle: "italic",
  },
  expPeriod: {
    fontSize: 8.5,
    color: palette.muted,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  bullet: { flexDirection: "row", marginTop: 2 },
  bulletDot: {
    width: 6,
    color: palette.accent,
    fontFamily: "Helvetica-Bold",
    fontSize: 9.5,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    color: palette.body,
    lineHeight: 1.4,
  },
  expProjects: {
    marginTop: 4,
    fontSize: 8.5,
    color: palette.muted,
  },
  expProjectsLabel: {
    fontFamily: "Helvetica-Bold",
    color: palette.ink,
  },

  // notable projects (2-column grid)
  projectsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 2,
  },
  projectCol: {
    width: "50%",
    paddingRight: 6,
    paddingLeft: 0,
    marginBottom: 8,
  },
  projectColRight: { paddingLeft: 6, paddingRight: 0 },
  projectName: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: palette.ink,
  },
  projectMeta: {
    fontSize: 8,
    color: palette.muted,
    marginTop: 1,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  projectLink: {
    fontSize: 8,
    color: palette.accentLight,
    textDecoration: "none",
  },
  projectBlurb: {
    marginTop: 2,
    fontSize: 8.8,
    color: palette.body,
    lineHeight: 1.38,
  },
  projectStack: {
    marginTop: 2,
    fontSize: 8,
    color: palette.muted,
    fontStyle: "italic",
    lineHeight: 1.35,
  },

  // skills (2-column)
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 2,
  },
  skillCol: { width: "50%", paddingRight: 8, marginBottom: 5 },
  skillColRight: { paddingLeft: 8, paddingRight: 0 },
  skillTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: palette.ink,
    letterSpacing: 0.4,
  },
  skillList: {
    fontSize: 9,
    color: palette.body,
    marginTop: 1,
    lineHeight: 1.4,
  },

  // footer
  footer: {
    position: "absolute",
    bottom: 14,
    left: 36,
    right: 36,
    fontSize: 7.5,
    color: palette.muted,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

const highlights = [
  "Drove a 40% improvement in application speed across a live SaaS platform through profiling, caching, and DB tuning.",
  "Led MERN engineering teams across enterprise web and mobile rollouts at Tanbits and AppsGenii.",
  "Shipped Shopify storefronts and React-based portals for AU enterprises (Pigeon Australia, Sydney Water).",
  "Designed cloud-native architectures on AWS — Lambda, DynamoDB, S3, CloudFront, ECS — with CI/CD pipelines.",
  "Architected real-time systems with WebSockets and Socket.IO for healthcare, auctions, and live engagement apps.",
  "Mentored cross-functional teams; ran sprints, design reviews, and ensured security/compliance audit readiness.",
];

function findProject(name: string) {
  const normalize = (s: string) =>
    s.toLowerCase().replace(/[—–-]/g, "-").replace(/\s+/g, " ").trim();
  const target = normalize(name);
  return projects.find((p) => {
    const candidate = normalize(p.name);
    return (
      candidate === target ||
      candidate.startsWith(target) ||
      target.startsWith(candidate)
    );
  });
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

const SKILL_COLUMNS = chunk(skillGroups, Math.ceil(skillGroups.length / 2));

export function ResumePDF() {
  return (
    <Document
      title={`${profile.name} — Resume`}
      author={profile.name}
      subject="Resume"
      keywords="full stack developer, MERN, React, Node.js, Shopify, AWS"
    >
      <Page size="A4" style={styles.page} wrap>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.role}>
            {profile.title} · Team Lead · 7+ Years
          </Text>
          <Text style={styles.contactLine}>
            <Link src={`mailto:${profile.email}`} style={styles.contactLink}>
              {profile.email}
            </Link>
            {"   |   "}
            <Link src={`tel:${profile.phoneRaw}`} style={styles.contactLink}>
              {profile.phone}
            </Link>
            {"   |   "}
            <Link src={profile.linkedin} style={styles.contactLink}>
              linkedin.com/in/waleed-shahzad
            </Link>
            {"   |   "}
            {profile.location}
          </Text>
          <View style={styles.rule} />
        </View>

        {/* SUMMARY */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.sectionTitleAccent} />
            <Text style={styles.sectionTitle}>Professional Summary</Text>
          </View>
          <Text style={styles.body}>
            Full Stack Developer with 7+ years of experience and a strong
            foundation in the MERN stack, Shopify, and React Native. Proven
            track record of building scalable web, e-commerce, and mobile
            applications across AU, US, and EU markets. Proficient in SQL and
            NoSQL databases (PostgreSQL, MySQL, MongoDB, DynamoDB), RESTful and
            GraphQL APIs, and AWS cloud infrastructure. I lead cross-functional
            teams, translate complex business requirements into clean technical
            solutions, and ship secure, maintainable code on time.
          </Text>
        </View>

        {/* HIGHLIGHTS — 2-col bullets */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.sectionTitleAccent} />
            <Text style={styles.sectionTitle}>Career Highlights</Text>
          </View>
          <View style={styles.highlightRow}>
            {highlights.map((h, i) => (
              <View key={i} style={styles.highlightCol}>
                <Text style={styles.highlightDot}>▸</Text>
                <Text style={styles.highlightText}>{h}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* EXPERIENCE */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.sectionTitleAccent} />
            <Text style={styles.sectionTitle}>Experience</Text>
          </View>
          {experience.map((role) => (
            <View
              key={role.company + role.period}
              style={styles.expItem}
              wrap={false}
            >
              <View style={styles.expHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.expCompany}>{role.company}</Text>
                  <Text style={styles.expRole}>{role.role}</Text>
                </View>
                <Text style={styles.expPeriod}>{role.period}</Text>
              </View>
              {role.bullets.map((b, i) => (
                <View key={i} style={styles.bullet}>
                  <Text style={styles.bulletDot}>•</Text>
                  <Text style={styles.bulletText}>{b}</Text>
                </View>
              ))}
              {role.projects.length ? (
                <Text style={styles.expProjects}>
                  <Text style={styles.expProjectsLabel}>
                    Notable projects:{" "}
                  </Text>
                  {role.projects.map((name, i) => {
                    const proj = findProject(name);
                    const sep = i < role.projects.length - 1 ? ", " : "";
                    return (
                      <Text key={name}>
                        {proj?.url ? (
                          <Link src={proj.url} style={styles.contactLink}>
                            {name}
                          </Link>
                        ) : (
                          <Text>{name}</Text>
                        )}
                        {sep}
                      </Text>
                    );
                  })}
                </Text>
              ) : null}
            </View>
          ))}
        </View>

        {/* EDUCATION */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.sectionTitleAccent} />
            <Text style={styles.sectionTitle}>Education</Text>
          </View>
          <Text style={styles.body}>
            <Text style={{ fontFamily: "Helvetica-Bold", color: palette.ink }}>
              Bachelor of Computer Science (BSCS)
            </Text>
            {"  ·  "}Virtual University of Pakistan{"  ·  "}2015 – 2019
          </Text>
        </View>

        {/* PROJECTS — 2-col grid */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.sectionTitleAccent} />
            <Text style={styles.sectionTitle}>Notable Projects</Text>
          </View>
          <View style={styles.projectsGrid}>
            {projects.map((p, i) => (
              <View
                key={p.name}
                style={[
                  styles.projectCol,
                  i % 2 === 1 ? styles.projectColRight : {},
                ]}
                wrap={false}
              >
                <Text style={styles.projectName}>{p.name}</Text>
                <Text style={styles.projectMeta}>{p.category}</Text>
                <Text style={styles.projectBlurb}>{p.blurb}</Text>
                <Text style={styles.projectStack}>
                  {p.stack.join(" · ")}
                </Text>
                {p.url ? (
                  <Link src={p.url} style={styles.projectLink}>
                    {p.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  </Link>
                ) : null}
              </View>
            ))}
          </View>
        </View>

        {/* SKILLS — 2-col grid */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.sectionTitleAccent} />
            <Text style={styles.sectionTitle}>Technical Background</Text>
          </View>
          <View style={styles.skillsGrid}>
            {SKILL_COLUMNS.map((groupCol, ci) => (
              <View
                key={ci}
                style={[
                  styles.skillCol,
                  ci === 1 ? styles.skillColRight : {},
                ]}
              >
                {groupCol.map((group) => (
                  <View key={group.title} style={{ marginBottom: 5 }}>
                    <Text style={styles.skillTitle}>{group.title}</Text>
                    <Text style={styles.skillList}>
                      {group.skills.map((s) => s.name).join(" · ")}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
          <Text style={[styles.body, { marginTop: 4 }]}>
            <Text
              style={{ fontFamily: "Helvetica-Bold", color: palette.ink }}
            >
              Design techniques:{" "}
            </Text>
            Object-Oriented Design · Design Patterns · Database Design · SaaS ·
            Multithreaded & Asynchronous Programming · REST &amp; GraphQL APIs ·
            CI/CD · Test-driven development · Agile / Scrum
          </Text>
        </View>

        <View style={styles.footer} fixed>
          <Text>{profile.name} · Resume · 7+ years</Text>
          <Text
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
}
