import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sean Yu — Founder, Investor, Operator",
  description:
    "Sean Yu is a founder and operator. Former VC at Backed VC and growth-equity investor at Target Global. Founder of Peony, the modern data room used by 3,400+ teams. Expert in venture capital, SaaS GTM, cross-border trade, and online scaling.",
  openGraph: {
    title: "Sean Yu — Founder, Investor, Operator",
    description:
      "Former VC at Backed VC and Target Global. Founder of Peony (3,400+ teams, $4.5B+ in assets). Expert in VC, SaaS GTM, import/export, and online scaling.",
    type: "website",
    // TODO: Uncomment once domain is live
    // url: "https://seanyu.com",
    images: [{ url: "/sean.jpeg", width: 400, height: 400, alt: "Sean Yu" }],
  },
  twitter: {
    card: "summary",
    title: "Sean Yu — Founder, Investor, Operator",
    description:
      "Former VC at Backed VC and Target Global. Founder of Peony. Expert in VC, SaaS GTM, import/export, and online scaling.",
    // TODO: Add your Twitter handle
    // creator: "@seanyu",
  },
  // TODO: Uncomment once domain is live
  // metadataBase: new URL("https://seanyu.com"),
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sean Yu",
  // TODO: Add your domain
  // url: "https://seanyu.com",
  image: "/sean.jpeg",
  email: "sean@peony.ink",
  jobTitle: "Co-founder & CEO",
  worksFor: {
    "@type": "Organization",
    name: "Peony",
    url: "https://peony.ink",
    description:
      "Modern data room platform for secure document sharing. Used by 3,400+ teams managing $4.5B+ in client assets.",
  },
  alumniOf: [
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
    "Import/Export & Cross-Border Trade",
    "Online Scaling & Growth",
    "Data Rooms & Due Diligence",
    "Fundraising",
    "Generative Engine Optimization",
  ],
  sameAs: [
    "https://www.linkedin.com/in/sean-yu-98839a180/",
    "https://peony.ink/about",
    // TODO: Add Twitter, GitHub
  ],
  description:
    "Co-founder and CEO of Peony, a modern data room platform used by 3,400+ teams managing $4.5B+ in client assets. Former VC at Backed VC evaluating early-stage European startups and growth-equity investor at Target Global covering late-stage and secondary transactions. Previously raised $2.1M for Gingercontrol. Advises SaaS companies at $20M ARR and hedge funds at $35M AUM.",
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
