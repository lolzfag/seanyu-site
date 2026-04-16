import Link from "next/link";
import { Header } from "@/components/Header";
import { getAllPosts, formatDate } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";
import { buildPageMetadata } from "@/lib/metadata";
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
} from "@/lib/schema";

export const metadata = buildPageMetadata({
  title: "Blog — Sean Yu",
  description:
    "Essays on building Gingercontrol and Peony, SaaS GTM, venture capital, and generative engine optimization.",
  path: "/blog",
});

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  const jsonLdScripts = [
    buildCollectionPageSchema({
      name: "Sean Yu — Writing",
      description:
        "Essays on building, investing, and the things I'm learning along the way.",
      url: `${SITE_URL}/blog`,
    }),
    buildBreadcrumbSchema([
      { name: "Home", url: SITE_URL },
      { name: "Blog", url: `${SITE_URL}/blog` },
    ]),
  ];

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
      <main className="w-full max-w-2xl px-6 py-20 sm:py-32">
        <header className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Blog
          </h1>
          <p className="mt-4 text-xl text-muted leading-relaxed">
            Essays on building, investing, and the things I&apos;m learning
            along the way.
          </p>
        </header>

        <section aria-label="Posts">
          {posts.length === 0 ? (
            <p className="text-muted">No posts yet — check back soon.</p>
          ) : (
            <ul className="space-y-10">
              {posts.map((post) => (
                <li
                  key={post.slug}
                  className="border-b border-border pb-10 last:border-b-0"
                >
                  <article>
                    <time
                      dateTime={post.date}
                      className="text-sm text-muted"
                    >
                      {formatDate(post.date)}
                    </time>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-foreground hover:underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-3 text-base leading-7 text-foreground/80">
                      {post.description}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-4 inline-block text-sm text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
                    >
                      Read more →
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </section>

        <footer className="mt-20 pt-8 border-t border-border text-xs text-muted">
          Sean Yu &copy; {new Date().getFullYear()}
        </footer>
      </main>
    </div>
  );
}
