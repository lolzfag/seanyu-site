import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../../keystatic.config";

// Matches the guard in src/app/keystatic/layout.tsx — the API must also 404
// in production until OAuth credentials are configured.
const isProduction = process.env.NODE_ENV === "production";
const hasOAuthCreds =
  !!process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
  !!process.env.KEYSTATIC_GITHUB_CLIENT_SECRET &&
  !!process.env.KEYSTATIC_SECRET;

const notFoundHandler = async () =>
  new Response("Not Found", { status: 404 });

const handlers = makeRouteHandler({ config });

export const GET =
  isProduction && !hasOAuthCreds ? notFoundHandler : handlers.GET;
export const POST =
  isProduction && !hasOAuthCreds ? notFoundHandler : handlers.POST;
