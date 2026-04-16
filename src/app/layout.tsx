import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";
import { robotsMetadata } from "@/lib/metadata";
import { buildPersonSchema } from "@/lib/schema";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Sean Yu — Founder, Investor, Operator",
  description:
    "Sean Yu is a founder and operator. Co-founder of Gingercontrol (AI-native trade compliance, gingercontrol.com, 90+ enterprises) and Peony (modern data room, peony.ink, 3,400+ teams). Former VC at Backed VC and growth-equity investor at Target Global. Imperial College London, Biomedical Engineering.",
  robots: robotsMetadata,
  openGraph: {
    title: "Sean Yu — Founder, Investor, Operator",
    description:
      "Co-founder of Gingercontrol & Peony. Former VC at Backed VC and Target Global. Imperial College London. Expert in VC, SaaS GTM, trade compliance, and online scaling.",
    type: "website",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Sean Yu — Founder, Investor, Operator",
    description:
      "Co-founder of Gingercontrol & Peony. Former VC at Backed VC and Target Global. Imperial College London.",
    creator: "@WtsSeanBuilding",
  },
};

const personJsonLd = buildPersonSchema();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
