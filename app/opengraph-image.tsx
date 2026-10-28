import { ImageResponse } from "next/og";

export const alt = "Dalma Ayurvedic Treatment & Wellness Centre, Sharjah";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 90, background: "#F3EFE5", color: "#173F2A" }}>
      <div style={{ fontSize: 28, letterSpacing: 8, color: "#9A7650" }}>TRADITIONAL KERALA AYURVEDA</div>
      <div style={{ fontSize: 108, marginTop: 24 }}>Dalma Ayurvedic</div>
      <div style={{ fontSize: 44, marginTop: 20, color: "#9A7650" }}>Treatment &amp; Wellness Centre, Sharjah</div>
    </div>), size);
}
