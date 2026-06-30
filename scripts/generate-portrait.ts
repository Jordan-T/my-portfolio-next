import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { buildPortraitSvg } from "../src/lib/compose-portrait";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "public", "generated");

async function main() {
  await mkdir(OUT, { recursive: true });

  const file = path.join(ROOT, "public", "Jordan-T-portrait.svg");

  // High-res for brand use (GitHub profile, social, hotlink)
  const svg = await buildPortraitSvg(file, { W: 600, H: 900 });
  await writeFile(path.join(OUT, "portrait-hex.svg"), svg, "utf8");
  console.log("✓ public/generated/portrait-hex.svg");

  // Brand asset (not served on pages): keep full dimensions, trim weight with
  // max compression + a light 256-colour quantisation (near-lossless on this
  // illustrative portrait) to stay within the perf budget.
  const png = await sharp(Buffer.from(svg))
    .png({ compressionLevel: 9, effort: 10, palette: true, quality: 90 })
    .toBuffer();
  await writeFile(path.join(OUT, "portrait-hex.png"), png);
  console.log("✓ public/generated/portrait-hex.png");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
