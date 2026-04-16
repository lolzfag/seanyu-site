import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

// Typography for MDX blog content. Matches the site's aesthetic
// defined in globals.css + page.tsx (Inter, foreground/muted/border tokens).
const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="mt-12 mb-4 text-3xl font-bold tracking-tight text-foreground">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-12 mb-4 text-2xl font-semibold tracking-tight text-foreground">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 mb-3 text-xl font-semibold text-foreground">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="mt-6 mb-2 text-base font-semibold text-foreground">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="my-5 text-base leading-7 text-foreground/90">{children}</p>
  ),
  a: ({ href = "", children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    const className =
      "text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors";
    if (isInternal) {
      return (
        <Link href={href} className={className}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...rest}>
        {children}
      </a>
    );
  },
  ul: ({ children }) => (
    <ul className="my-5 list-disc space-y-2 pl-6 text-foreground/90">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-5 list-decimal space-y-2 pl-6 text-foreground/90">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-7">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-2 border-border pl-4 italic text-foreground/70">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-border" />,
  code: ({ children }) => (
    <code className="rounded bg-foreground/5 px-1.5 py-0.5 font-mono text-sm">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="my-6 overflow-x-auto rounded-lg border border-border bg-foreground/5 p-4 text-sm leading-6">
      {children}
    </pre>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  img: (props) => (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img className="my-6 rounded-lg border border-border" {...props} />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
