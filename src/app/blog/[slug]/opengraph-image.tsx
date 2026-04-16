import { ImageResponse } from "next/og";
import { getPostMetadata, formatDate } from "@/lib/posts";
import { AUTHOR, SITE_URL } from "@/lib/site";

export const alt = `Sean Yu — Blog post`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Dynamic OG image rendered per blog post. Title + date + branding.
// Scales title font size down if the title is long, so it always fits.
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const metadata = getPostMetadata(slug);
  const title = metadata.title ?? slug;
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
