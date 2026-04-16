import { AUTHOR, SITE_URL } from "./site";
import type { Post } from "./posts";

// JSON-LD builders. Each returns a plain object ready to be serialized into
// a <script type="application/ld+json"> tag. Keeping them centralized means
// one place to update when schema.org evolves or we add more post fields.

export function buildArticleSchema(post: Post) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: AUTHOR, url: SITE_URL },
    publisher: { "@type": "Person", name: AUTHOR, url: SITE_URL },
    mainEntityOfPage: url,
    url,
    image: `${SITE_URL}/blog/${post.slug}/opengraph-image`,
    keywords: post.tags?.length ? post.tags.join(", ") : undefined,
  };
}

export function buildBreadcrumbSchema(
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildFaqSchema(
  items: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildCollectionPageSchema(args: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: args.name,
    description: args.description,
    url: args.url,
  };
}

// Person schema for the site owner. Previously inlined in layout.tsx.
export function buildPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sean Yu",
    url: SITE_URL,
    image: `${SITE_URL}/sean.jpeg`,
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
}
