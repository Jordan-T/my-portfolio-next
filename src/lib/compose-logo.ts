import { readFileSync } from "node:fs";
import { join } from "node:path";
import { JSDOM } from "jsdom";
import { brand } from "@/config/theme";

interface LogoOptions {
  /** Logo mark colour (the JT letterform). */
  fill?: string;
  /** Hexagon background colour. */
  bg?: string;
  /** Rendered pixel size (width = height, SVG outputs a square). */
  outputSize?: number;
}

export function buildLogoSvg({
  fill = brand.accent,
  bg = brand.bg,
  outputSize = 520,
}: LogoOptions = {}): string {
  const raw = readFileSync(join(process.cwd(), "public/favicon.svg"), "utf8");
  const { window } = new JSDOM(raw, { contentType: "image/svg+xml" });
  const { document, XMLSerializer } = window;

  const svg = document.documentElement;
  svg.setAttribute("fill", fill);
  svg.setAttribute("width", String(outputSize));
  svg.setAttribute("height", String(outputSize));

  const bgPath = document.querySelector("path");
  if (!bgPath?.hasAttribute("fill")) {
    throw new Error(
      "favicon.svg: first <path> has no fill attribute — unexpected structure",
    );
  }
  bgPath.setAttribute("fill", bg);

  return new XMLSerializer().serializeToString(svg);
}
