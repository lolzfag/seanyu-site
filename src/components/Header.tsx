import Link from "next/link";

// Site-wide top nav. Appears on home, blog index, and post pages.
// Does NOT apply to the Keystatic admin (that route has its own layout).
export function Header() {
  return (
    <header className="w-full border-b border-border">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-sm font-semibold text-foreground hover:opacity-70 transition-opacity"
        >
          Sean Yu
        </Link>
        <nav aria-label="Primary">
          <Link
            href="/blog"
            className="text-sm text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
          >
            Writing
          </Link>
        </nav>
      </div>
    </header>
  );
}
