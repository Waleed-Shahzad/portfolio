import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";

import "./globals.css";

import { AnimationProvider } from "@/components/providers/AnimationProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { AnimationToggle } from "@/components/ui/AnimationToggle";

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
  title: {
    default: "Waleed Shahzad — Full Stack Developer",
    template: "%s · Waleed Shahzad",
  },
  description:
    "Waleed Shahzad — Full Stack Developer with 7+ years building scalable MERN web and mobile applications. React, React Native, Node.js, AWS.",
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
    title: "Waleed Shahzad — Full Stack Developer",
    description:
      "Full Stack Developer & Team Lead. 7+ years of MERN, React Native, and cloud infrastructure.",
    siteName: "Waleed Shahzad",
  },
  twitter: {
    card: "summary_large_image",
    title: "Waleed Shahzad — Full Stack Developer",
    description:
      "Full Stack Developer & Team Lead. 7+ years of MERN, React Native, and cloud infrastructure.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="antialiased">
        <AnimationProvider>
          <AmbientBackground />
          <SmoothScrollProvider>
            <ScrollProgress />
            {children}
            <AnimationToggle />
          </SmoothScrollProvider>
        </AnimationProvider>
      </body>
    </html>
  );
}
