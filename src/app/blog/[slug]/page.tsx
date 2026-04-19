import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { getAllSlugs, getPost, formatDate } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";
import { buildPostMetadata } from "@/lib/metadata";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const { metadata } = await getPost(slug);
    return buildPostMetadata({ slug, ...metadata });
  } catch {
    return {};
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let content: Awaited<ReturnType<typeof getPost>>["content"];
  let metadata: Awaited<ReturnType<typeof getPost>>["metadata"];
  try {
    const post = await getPost(slug);
    content = post.content;
    metadata = post.metadata;
  } catch {
    notFound();
  }

  const postWithSlug = { slug, ...metadata };

  const jsonLdScripts: unknown[] = [
    buildArticleSchema(postWithSlug),
    buildBreadcrumbSchema([
      { name: "Home", url: SITE_URL },
      { name: "Blog", url: `${SITE_URL}/blog` },
      { name: metadata.title, url: `${SITE_URL}/blog/${slug}` },
    ]),
  ];
  if (metadata.faq && metadata.faq.length > 0) {
    jsonLdScripts.push(buildFaqSchema(metadata.faq));
  }

  return (
    <div className="flex flex-col flex-1 items-center bg-background">
      {jsonLdScripts.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <Header />
      <main className="w-full max-w-2xl px-6 pt-10 sm:pt-16 pb-20 sm:pb-32">
        <Link
          href="/blog"
          className="text-sm text-muted underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
        >
          ← Other writings
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

        <article>{content}</article>

        {metadata.faq && metadata.faq.length > 0 && (
          <section className="mt-20 pt-10 border-t border-border" aria-label="FAQ">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-8">
              FAQ
            </h2>
            <div className="space-y-8">
              {metadata.faq.map((item, i) => (
                <div key={i}>
                  <h3 className="text-base font-semibold text-foreground">
                    {item.question}
                  </h3>
                  <p className="mt-2 text-base leading-7 text-foreground/80">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="mt-20 pt-8 border-t border-border text-xs text-muted">
          Sean Yu &copy; {new Date().getFullYear()}
        </footer>
      </main>
    </div>
  );
}
