import { readFile } from "node:fs/promises";
import sharp from "sharp";
import { cvTheme } from "@/config/theme";

interface PortraitOptions {
  W?: number;
  H?: number;
  hexFill?: string;
}

/**
 * Builds a self-contained SVG string: azure hexagon fill + portrait PNG
 * clipped to a downward shield so the head emerges from the top.
 * The background outside the shield is transparent.
 */
export async function buildPortraitSvg(
  file: string,
  { W = 300, H = 450, hexFill = cvTheme.hexFill }: PortraitOptions = {},
): Promise<string> {
  const hexH = W * 1.1547;
  const taper = hexH * 0.25;
  const hexTop = H - hexH;
  const hex25 = hexTop + 0.25 * hexH;
  const hex75 = hexTop + 0.75 * hexH;
  const shieldSides = H - taper;

  const portraitPng = await sharp(await readFile(file), { density: 300 })
    .resize({ width: W * 2 })
    .png()
    .toBuffer();
  const href = `data:image/png;base64,${portraitPng.toString("base64")}`;

  const r = (n: number) => n.toFixed(2);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W * 2}" height="${H * 2}" viewBox="0 0 ${W} ${H}">
  <defs>
    <clipPath id="shield">
      <polygon points="${W / 2},0 ${W},0 ${W},${r(shieldSides)} ${W / 2},${H} 0,${r(shieldSides)} 0,0"/>
    </clipPath>
  </defs>
  <polygon points="${W / 2},${r(hexTop)} ${W},${r(hex25)} ${W},${r(hex75)} ${W / 2},${H} 0,${r(hex75)} 0,${r(hex25)}" fill="${hexFill}"/>
  <image href="${href}" x="0" y="0" width="${W}" height="${H}" preserveAspectRatio="xMidYMid slice" clip-path="url(#shield)"/>
</svg>`;
}

/** Returns a PNG data URL (for PDF rendering or OG images). */
export async function composePortrait(
  file: string,
  options?: PortraitOptions,
): Promise<string> {
  const svg = await buildPortraitSvg(file, options);
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return `data:image/png;base64,${png.toString("base64")}`;
}
