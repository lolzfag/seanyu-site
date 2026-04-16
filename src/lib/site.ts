// Single source of truth for the site URL.
export const SITE_URL = "https://seanyu.io";
export const SITE_NAME = "Sean Yu";
export const AUTHOR = "Sean Yu";
export const AUTHOR_TWITTER = "@WtsSeanBuilding";
export const TAGLINE = "Co-founder of Gingercontrol and Peony";

// Preview deploys and local dev should not be indexed by crawlers —
// they compete with the production domain in search results otherwise.
// Vercel sets VERCEL_ENV=production on the prod deploy only.
// Set ALLOW_ROBOTS=true to force indexing (e.g., to intentionally share a preview).
export const ALLOW_ROBOTS =
  process.env.VERCEL_ENV === "production" ||
  process.env.ALLOW_ROBOTS === "true";
