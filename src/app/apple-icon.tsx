import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#111111",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="128" height="128" viewBox="0 0 32 32">
          <path
            d="M22 7 L13 7 Q7 7 7 12 Q7 17 13 17 L14 17 L14 25 L17 25 L17 7 Z M20 7 L20 25 L23 25 L23 7 Z"
            fill="#fafafa"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
