import { ImageResponse } from "next/og";
import { SITE_META } from "@/domain/site-meta";

export const runtime = "edge";
export const alt = SITE_META.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#000000",
          padding: 80,
        }}
      >
        <div
          style={{
            width: 64,
            height: 4,
            backgroundColor: "#ffffff",
            marginBottom: 32,
          }}
        />
        <div
          style={{
            fontSize: 72,
            fontWeight: 600,
            color: "#ffffff",
            lineHeight: 1.1,
            letterSpacing: "-0.04em",
          }}
        >
          {SITE_META.title}
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#a3a3a3",
            marginTop: 24,
            maxWidth: 800,
          }}
        >
          {SITE_META.description}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 80,
            right: 80,
            fontSize: 24,
            color: "#ffffff",
          }}
        >
          surya.dev
        </div>
      </div>
    ),
    { ...size },
  );
}
