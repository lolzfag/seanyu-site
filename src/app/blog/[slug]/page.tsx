import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSlugs, getPost, formatDate } from "@/lib/posts";
import { AUTHOR, SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { metadata } = await getPost(slug);
    const url = `${SITE_URL}/blog/${slug}`;
    return {
      title: `${metadata.title} — Sean Yu`,
      description: metadata.description,
      alternates: { canonical: url },
      openGraph: {
        title: metadata.title,
        description: metadata.description,
        type: "article",
        url,
        publishedTime: metadata.date,
        authors: [AUTHOR],
        tags: metadata.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: metadata.title,
        description: metadata.description,
        creator: "@WtsSeanBuilding",
      },
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  let Component: Awaited<ReturnType<typeof getPost>>["Component"];
  let metadata: Awaited<ReturnType<typeof getPost>>["metadata"];
  try {
    const post = await getPost(slug);
    Component = post.Component;
    metadata = post.metadata;
  } catch {
    notFound();
  }

  const url = `${SITE_URL}/blog/${slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: metadata.title,
    description: metadata.description,
    datePublished: metadata.date,
    dateModified: metadata.date,
    author: { "@type": "Person", name: AUTHOR, url: SITE_URL },
    mainEntityOfPage: url,
    url,
    keywords: metadata.tags?.join(", "),
  };

  return (
    <div className="flex flex-col flex-1 items-center bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <main className="w-full max-w-2xl px-6 py-20 sm:py-32">
        <Link
          href="/blog"
          className="text-sm text-muted underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
        >
          ← All posts
        </Link>

        <header className="mt-8 mb-12">
          <time dateTime={metadata.date} className="text-sm text-muted">
            {formatDate(metadata.date)}
          </time>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {metadata.title}
          </h1>
          {metadata.description && (
            <p className="mt-4 text-xl text-muted leading-relaxed">
              {metadata.description}
            </p>
          )}
        </header>

        <article>
          <Component />
        </article>

        <footer className="mt-20 pt-8 border-t border-border text-xs text-muted">
          Sean Yu &copy; {new Date().getFullYear()}
        </footer>
      </main>
    </div>
  );
}
