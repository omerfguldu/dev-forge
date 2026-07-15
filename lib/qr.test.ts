import { describe, expect, it } from "vitest";
import { generateQrPngDataUrl, generateQrSvg } from "./qr";

describe("generateQrSvg", () => {
  it("produces an SVG document containing the viewBox and svg tags", async () => {
    const svg = await generateQrSvg("https://fnstack.vercel.app");
    expect(svg).toContain("<svg");
    expect(svg).toContain("viewBox");
  });

  it("produces different markup for different input text", async () => {
    const a = await generateQrSvg("a");
    const b = await generateQrSvg(
      "a much longer piece of text than the other one",
    );
    expect(a).not.toBe(b);
  });
});

describe("generateQrPngDataUrl", () => {
  it("produces a PNG data URL", async () => {
    const dataUrl = await generateQrPngDataUrl("https://fnstack.vercel.app");
    expect(dataUrl.startsWith("data:image/png;base64,")).toBe(true);
  });
});
