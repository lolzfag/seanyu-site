import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Sean Yu — Founder, Investor, Operator",
  description:
    "Sean Yu is a founder and operator. Co-founder of Gingercontrol (AI-native trade compliance, gingercontrol.com, 90+ enterprises) and Peony (modern data room, peony.ink, 3,400+ teams). Former VC at Backed VC and growth-equity investor at Target Global. Imperial College London, Biomedical Engineering.",
  openGraph: {
    title: "Sean Yu — Founder, Investor, Operator",
    description:
      "Co-founder of Gingercontrol & Peony. Former VC at Backed VC and Target Global. Imperial College London. Expert in VC, SaaS GTM, trade compliance, and online scaling.",
    type: "website",
    url: SITE_URL,
    images: [{ url: "/sean.jpeg", width: 400, height: 400, alt: "Sean Yu" }],
  },
  twitter: {
    card: "summary",
    title: "Sean Yu — Founder, Investor, Operator",
    description:
      "Co-founder of Gingercontrol & Peony. Former VC at Backed VC and Target Global. Imperial College London.",
    creator: "@WtsSeanBuilding",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sean Yu",
  url: SITE_URL,
  image: "/sean.jpeg",
  email: ["sean@peony.ink", "sean@gingercontrol.com"],
  jobTitle: "Co-founder",
  worksFor: [
    {
      "@type": "Organization",
      name: "Gingercontrol",
      url: "https://gingercontrol.com",
      description:
        "AI-native trade compliance solution for cross-border import/export operations. Used by 90+ enterprises.",
    },
    {
      "@type": "Organization",
      name: "Peony",
      url: "https://peony.ink",
      description:
        "Modern data room platform for secure document sharing. Used by 3,400+ teams managing $4.5B+ in client assets.",
    },
  ],
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Imperial College London",
      description:
        "Biomedical Engineering, full scholarship, first-class standing",
    },
    {
      "@type": "Organization",
      name: "Backed VC",
      description: "Early-stage venture capital firm",
    },
    {
      "@type": "Organization",
      name: "Target Global",
      description: "Growth equity and late-stage investment firm",
    },
    {
      "@type": "Organization",
      name: "Nomura",
      description: "Global investment bank",
    },
  ],
  knowsAbout: [
    "Venture Capital",
    "Growth Equity",
    "Secondary Transactions",
    "Startup Strategy",
    "SaaS Go-to-Market",
    "Product-Led Growth",
    "Trade Compliance",
    "Import/Export & Cross-Border Trade",
    "Online Scaling & Growth",
    "Data Rooms & Due Diligence",
    "Fundraising",
    "Generative Engine Optimization",
    "Biomedical Engineering",
  ],
  sameAs: [
    "https://www.linkedin.com/in/sean-yu-98839a180/",
    "https://x.com/WtsSeanBuilding",
    "https://gingercontrol.com",
    "https://peony.ink/about",
  ],
  description:
    "Co-founder of Gingercontrol (AI-native trade compliance, gingercontrol.com, 90+ enterprises) and Peony (modern data room, peony.ink, 3,400+ teams, $4.5B+ in assets). Former VC at Backed VC evaluating early-stage European startups and growth-equity investor at Target Global covering late-stage and secondary transactions. Studied Biomedical Engineering at Imperial College London on a full scholarship with first-class standing. Raised $2.1M for Gingercontrol. Advises SaaS companies at $20M ARR and hedge funds at $35M AUM.",
};

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
