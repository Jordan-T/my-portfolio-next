/** @jsxImportSource react */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "../src/config/site";
import { brand } from "../src/config/theme";

const ROOT = process.cwd();
const OUT = join(ROOT, "public", "generated");

function fontFile(pkg: string, file: string) {
  return join(ROOT, "node_modules/@fontsource", pkg, "files", file);
}

mkdirSync(OUT, { recursive: true });

const gridSvg = readFileSync(join(ROOT, "public/patterns/grid-1.svg"));
const portraitPng = readFileSync(join(OUT, "portrait-hex.png"));
const portraitSrc = `data:image/png;base64,${portraitPng.toString("base64")}`;

const geistBold = readFileSync(
  fontFile("geist-sans", "geist-sans-latin-700-normal.woff"),
);
const interRegular = readFileSync(
  fontFile("inter", "inter-latin-400-normal.woff"),
);
const interMedium = readFileSync(
  fontFile("inter", "inter-latin-500-normal.woff"),
);

async function main() {
  const response = new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        backgroundColor: brand.bg,
        backgroundImage: `url(data:image/svg+xml;base64,${gridSvg.toString("base64")})`,
        backgroundRepeat: "repeat",
        backgroundSize: "60px 35px",
        color: brand.text,
        fontFamily: "Inter",
        overflow: "hidden",
      }}
    >
      {/* Portrait */}
      <div
        style={{
          display: "flex",
          position: "relative",
          width: 380,
          height: "100%",
          flexShrink: 0,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={portraitSrc}
          alt=""
          style={{
            position: "absolute",
            bottom: 124,
            left: 60,
            width: 300,
            height: 450,
          }}
        />
      </div>

      {/* Text */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
          padding: "72px 80px 80px 40px",
        }}
      >
        {/* Role */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "24px",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: brand.accent,
            fontFamily: "Inter",
          }}
        >
          <div
            style={{
              width: "33px",
              height: "2px",
              backgroundColor: brand.accent,
            }}
          />
          {siteConfig.role}
        </div>

        {/* Name */}
        <div
          style={{
            marginTop: "30px",
            fontSize: "96px",
            fontWeight: 700,
            lineHeight: 1.0,
            color: brand.text,
            fontFamily: "Geist",
          }}
        >
          {siteConfig.name}
        </div>

        {/* URL */}
        <div
          style={{
            marginTop: "36px",
            fontSize: "34px",
            color: brand.textMuted,
            fontFamily: "Inter",
          }}
        >
          jordan-t.dev
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Geist", data: geistBold.buffer, weight: 700, style: "normal" },
        {
          name: "Inter",
          data: interRegular.buffer,
          weight: 400,
          style: "normal",
        },
        {
          name: "Inter",
          data: interMedium.buffer,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );

  const buffer = Buffer.from(await response.arrayBuffer());
  writeFileSync(join(OUT, "og-image.png"), buffer);
  console.log("✓ public/generated/og-image.png");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
