import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";

export type PostMetadata = {
  title: string;
  description: string;
  date: string; // ISO date string, e.g. "2026-04-16"
  draft?: boolean;
  tags?: string[];
};

export type Post = PostMetadata & { slug: string };

const POSTS_DIR = path.join(process.cwd(), "src/content/blog");

function readSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllSlugs(): string[] {
  return readSlugs();
}

function normalizeDate(value: unknown): string {
  // YAML dates sometimes come through as Date objects; normalize to ISO yyyy-mm-dd.
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? "");
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = readSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const mod = await import(`@/content/blog/${slug}.mdx`);
      const frontmatter = mod.frontmatter as Partial<PostMetadata> | undefined;
      if (!frontmatter || !frontmatter.title) {
        throw new Error(
          `Missing or invalid YAML frontmatter in src/content/blog/${slug}.mdx`,
        );
      }
      return {
        slug,
        title: frontmatter.title,
        description: frontmatter.description ?? "",
        date: normalizeDate(frontmatter.date),
        tags: frontmatter.tags ?? [],
        draft: frontmatter.draft ?? false,
      } satisfies Post;
    }),
  );
  return posts
    .filter((p) => !p.draft)
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
}

export async function getPost(slug: string): Promise<{
  Component: ComponentType;
  metadata: PostMetadata;
}> {
  const mod = await import(`@/content/blog/${slug}.mdx`);
  const frontmatter = mod.frontmatter as Partial<PostMetadata>;
  return {
    Component: mod.default,
    metadata: {
      title: frontmatter.title ?? slug,
      description: frontmatter.description ?? "",
      date: normalizeDate(frontmatter.date),
      tags: frontmatter.tags ?? [],
      draft: frontmatter.draft ?? false,
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
