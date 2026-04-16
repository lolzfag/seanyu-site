import fs from "node:fs";
import path from "node:path";
import type { ReactElement } from "react";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { useMDXComponents } from "@/mdx-components";

export type FaqItem = {
  question: string;
  answer: string;
};

export type PostMetadata = {
  title: string;
  description: string;
  date: string; // ISO date string, e.g. "2026-04-16"
  draft?: boolean;
  tags?: string[];
  faq?: FaqItem[];
};

export type Post = PostMetadata & { slug: string };

const POSTS_DIR = path.join(process.cwd(), "src/content/blog");

function normalizeDate(value: unknown): string {
  // YAML dates sometimes come through as Date objects; normalize to ISO yyyy-mm-dd.
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? "");
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

function readFrontmatter(slug: string): Partial<PostMetadata> {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Post not found: ${slug}`);
  }
  const source = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(source);
  return data as Partial<PostMetadata>;
}

// Frontmatter-only read, used by the blog index and OG image routes
// (no MDX compilation — fast and cheap).
export function getPostMetadata(slug: string): PostMetadata {
  const fm = readFrontmatter(slug);
  if (!fm.title) {
    throw new Error(
      `Missing frontmatter.title in src/content/blog/${slug}.mdx`,
    );
  }
  return {
    title: fm.title,
    description: fm.description ?? "",
    date: normalizeDate(fm.date),
    tags: fm.tags ?? [],
    draft: fm.draft ?? false,
    faq: fm.faq ?? [],
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = getAllSlugs();
  const posts = slugs.map((slug) => ({
    slug,
    ...getPostMetadata(slug),
  }));
  return posts
    .filter((p) => !p.draft)
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
}

// Compiles the MDX body into a React element. Called per-post render.
export async function getPost(slug: string): Promise<{
  content: ReactElement;
  metadata: PostMetadata;
}> {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Post not found: ${slug}`);
  }
  const source = fs.readFileSync(filePath, "utf-8");
  const components = useMDXComponents();
  const { content, frontmatter } = await compileMDX<Partial<PostMetadata>>({
    source,
    options: { parseFrontmatter: true },
    components,
  });
  return {
    content,
    metadata: {
      title: frontmatter.title ?? slug,
      description: frontmatter.description ?? "",
      date: normalizeDate(frontmatter.date as unknown),
      tags: frontmatter.tags ?? [],
      draft: frontmatter.draft ?? false,
      faq: frontmatter.faq ?? [],
    },
  };
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
