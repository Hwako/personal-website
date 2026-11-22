import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Hamza Wako. AI / Product / Data. Building ideas into reality.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function SocialImage() {
  const photo = await readFile(join(process.cwd(), "public/photo.jpg"), "base64");

  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100%", height: "100%", padding: "72px 88px", background: "#0b0b0b", color: "#ededed", fontFamily: "sans-serif" }}>
      {/* ImageResponse renders embedded image data without a browser or external request. */}
      <img src={`data:image/png;base64,${photo}`} alt="" width={104} height={104} style={{ borderRadius: "50%", objectFit: "cover", marginBottom: 32 }} />
      <div style={{ display: "flex", fontSize: 76, fontWeight: 600, letterSpacing: -3 }}>Hamza Wako<span style={{ color: "#888" }}>.</span></div>
      <div style={{ display: "flex", marginTop: 16, fontSize: 28, color: "#bdbdbd", letterSpacing: 2 }}>AI / Product / Data</div>
      <div style={{ display: "flex", marginTop: 40, fontSize: 26, color: "#999" }}>Building ideas into reality.</div>
      <div style={{ display: "flex", marginTop: 16, fontSize: 20, color: "#777" }}>Los Angeles · USC ’27</div>
    </div>,
    size,
  );
}
