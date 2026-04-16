import { ImageResponse } from "next/og";
import { AUTHOR, SITE_URL } from "@/lib/site";

export const alt = `${AUTHOR} — Writing`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
        <div style={{ display: "flex", flexDirection: "column" }}>
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
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 128,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.03em",
            }}
          >
            Writing.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              lineHeight: 1.4,
              color: "#374151",
              maxWidth: "900px",
            }}
          >
            {"Essays on building, investing, and the things I'm learning along the way."}
          </div>
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
          <div style={{ display: "flex" }}>{`${SITE_URL.replace("https://", "")}/blog`}</div>
          <div style={{ display: "flex" }}>@WtsSeanBuilding</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
