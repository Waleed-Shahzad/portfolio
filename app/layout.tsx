import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";

import "./globals.css";

import { AnimationProvider } from "@/components/providers/AnimationProvider";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { AnimationToggle } from "@/components/ui/AnimationToggle";
import { profile } from "@/data/stats";

const sans = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
  weight: ["400", "500"],
});

export const viewport: Viewport = {
  themeColor: "#07070b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://waleed-shahzad.vercel.app"),
  alternates: { canonical: "/" },
  title: {
    default: "Waleed Shahzad | Full Stack Developer",
    template: "%s · Waleed Shahzad",
  },
  description:
    "Waleed Shahzad is a full stack developer and team lead with 7+ years building MERN web and mobile apps. React, React Native, Node.js, AWS.",
  keywords: [
    "Waleed Shahzad",
    "Full Stack Developer",
    "MERN",
    "Next.js",
    "React Native",
    "Node.js",
    "AWS",
    "Team Lead",
  ],
  authors: [{ name: "Waleed Shahzad" }],
  creator: "Waleed Shahzad",
  openGraph: {
    type: "website",
    title: "Waleed Shahzad | Full Stack Developer",
    description:
      "Full Stack Developer & Team Lead. 7+ years of MERN, React Native, and cloud infrastructure.",
    siteName: "Waleed Shahzad",
  },
  twitter: {
    card: "summary_large_image",
    title: "Waleed Shahzad | Full Stack Developer",
    description:
      "Full Stack Developer & Team Lead. 7+ years of MERN, React Native, and cloud infrastructure.",
  },
};

/** Structured data so search results and link previews name the person, not just the page. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  email: `mailto:${profile.email}`,
  url: "https://waleed-shahzad.vercel.app",
  sameAs: [profile.linkedin],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressCountry: "PK",
  },
  knowsAbout: [
    "React",
    "React Native",
    "Next.js",
    "Node.js",
    "TypeScript",
    "PostgreSQL",
    "MongoDB",
    "AWS",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <AnimationProvider>
          <AmbientBackground />
          <ScrollProgress />
          {children}
          <AnimationToggle />
        </AnimationProvider>
      </body>
    </html>
  );
}
