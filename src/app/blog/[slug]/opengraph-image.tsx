import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getPostMetadata, formatDate } from "@/lib/posts";
import { AUTHOR, SITE_URL } from "@/lib/site";

export const alt = `Sean Yu — Blog post`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const POSTS_DIR = path.join(process.cwd(), "src/content/blog");
const PUBLIC_DIR = path.join(process.cwd(), "public");

// Pulls the first ![alt](url) from the MDX body, ignoring escaped `!\[`.
function firstBodyImage(slug: string): { url: string; alt: string } | null {
  const source = fs.readFileSync(path.join(POSTS_DIR, `${slug}.mdx`), "utf-8");
  const match = source.match(/(?<!\\)!\[([^\]]*)\]\(([^)]+)\)/);
  if (!match) return null;
  return { alt: match[1], url: decodeURIComponent(match[2]) };
}

function loadLocalImageAsDataUri(publicPath: string): string | null {
  if (!publicPath.startsWith("/")) return null;
  const filePath = path.join(PUBLIC_DIR, publicPath);
  if (!fs.existsSync(filePath)) return null;
  const ext = path.extname(filePath).toLowerCase();
  const mime =
    ext === ".png" ? "image/png"
    : ext === ".jpg" || ext === ".jpeg" ? "image/jpeg"
    : ext === ".webp" ? "image/webp"
    : null;
  if (!mime) return null;
  const base64 = fs.readFileSync(filePath).toString("base64");
  return `data:${mime};base64,${base64}`;
}

// Dynamic OG image rendered per blog post.
// Uses the post's first body image as the hero if available,
// otherwise falls back to a branded text card with title + date.
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const metadata = getPostMetadata(slug);
  const title = metadata.title ?? slug;

  const hero = firstBodyImage(slug);
  const heroDataUri = hero ? loadLocalImageAsDataUri(hero.url) : null;

  if (heroDataUri) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#fafafa",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroDataUri}
            alt={hero!.alt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      ),
      { ...size },
    );
  }

  const titleFontSize =
    title.length > 60 ? 60 : title.length > 40 ? 76 : 96;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fafafa",
          padding: "80px",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
          color: "#111111",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#6b7280",
              fontWeight: 600,
            }}
          >
            Sean Yu · Writing
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: "#6b7280",
              fontWeight: 500,
            }}
          >
            {formatDate(metadata.date)}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "28px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: titleFontSize,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
            }}
          >
            {title}
          </div>
          {metadata.description ? (
            <div
              style={{
                display: "flex",
                fontSize: 30,
                lineHeight: 1.4,
                color: "#374151",
                maxWidth: "960px",
              }}
            >
              {metadata.description}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #e5e7eb",
            paddingTop: "24px",
            fontSize: 24,
            color: "#6b7280",
            fontWeight: 500,
          }}
        >
          <div style={{ display: "flex" }}>
            {`${SITE_URL.replace("https://", "")}/blog/${slug}`}
          </div>
          <div style={{ display: "flex" }}>{AUTHOR}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
