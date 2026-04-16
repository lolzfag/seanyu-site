import type { MetadataRoute } from "next";
import { ALLOW_ROBOTS, SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // On preview deploys / local dev, tell crawlers not to index anything
  // to avoid duplicate-content conflicts with the production domain.
  if (!ALLOW_ROBOTS) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Keystatic admin + its API should not be indexed.
      disallow: ["/keystatic", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
