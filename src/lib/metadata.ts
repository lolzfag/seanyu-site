import type { Metadata } from "next";
import { ALLOW_ROBOTS, AUTHOR, AUTHOR_TWITTER, SITE_URL } from "./site";
import type { Post } from "./posts";

// Shared robots config, applied via the root layout's metadata so every
// descendant page inherits it unless they override explicitly.
export const robotsMetadata: Metadata["robots"] = ALLOW_ROBOTS
  ? { index: true, follow: true }
  : { index: false, follow: false };

export function buildPostMetadata(post: Post): Metadata {
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: `${post.title} — Sean Yu`,
    description: post.description,
    alternates: { canonical: url },
    robots: robotsMetadata,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url,
      publishedTime: post.date,
      authors: [AUTHOR],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: AUTHOR_TWITTER,
    },
  };
}

export function buildPageMetadata(args: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${SITE_URL}${args.path}`;
  return {
    title: args.title,
    description: args.description,
    alternates: { canonical: url },
    robots: robotsMetadata,
    openGraph: {
      title: args.title,
      description: args.description,
      type: "website",
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: args.title,
      description: args.description,
      creator: AUTHOR_TWITTER,
    },
  };
}
