import { notFound } from "next/navigation";
import KeystaticApp from "./keystatic";

// In production, require the OAuth env vars to be present (indicating the
// GitHub App setup wizard has been completed). Otherwise 404 the admin to
// avoid exposing it in a half-configured state. Locally, always accessible.
export default function KeystaticLayout() {
  const isProduction = process.env.NODE_ENV === "production";
  const hasOAuthCreds =
    !!process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
    !!process.env.KEYSTATIC_GITHUB_CLIENT_SECRET &&
    !!process.env.KEYSTATIC_SECRET;
  if (isProduction && !hasOAuthCreds) {
    notFound();
  }
  return <KeystaticApp />;
}
