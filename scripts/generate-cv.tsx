/* eslint-disable jsx-a11y/alt-text -- react-pdf <Image> is a PDF primitive, not a DOM <img>; alt does not apply. */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import QRCode from "qrcode";
import sharp from "sharp";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  Svg,
  Path,
  Font,
  StyleSheet,
  renderToFile,
} from "@react-pdf/renderer";
import { getCvData } from "../src/lib/cv";
import { cvTheme as palette } from "../src/config/theme";
import { composePortrait } from "../src/lib/compose-portrait";
import { buildLogoSvg } from "../src/lib/compose-logo";

const ROOT = process.cwd();

function fontFile(pkg: string, file: string): string {
  return path.join(ROOT, "node_modules", "@fontsource", pkg, "files", file);
}

function registerFonts() {
  Font.register({
    family: "Inter",
    fonts: [
      { src: fontFile("inter", "inter-latin-400-normal.woff") },
      {
        src: fontFile("inter", "inter-latin-500-normal.woff"),
        fontWeight: 500,
      },
      {
        src: fontFile("inter", "inter-latin-600-normal.woff"),
        fontWeight: 600,
      },
      {
        src: fontFile("inter", "inter-latin-700-normal.woff"),
        fontWeight: 700,
      },
    ],
  });

  Font.register({
    family: "Geist",
    fonts: [
      {
        src: fontFile("geist-sans", "geist-sans-latin-700-normal.woff"),
        fontWeight: 700,
      },
    ],
  });

  Font.register({
    family: "Space Grotesk",
    fonts: [
      {
        src: fontFile("space-grotesk", "space-grotesk-latin-700-normal.woff"),
        fontWeight: 700,
      },
    ],
  });
  // Keep words intact in the narrow sidebar (no automatic hyphenation).
  Font.registerHyphenationCallback((word) => [word]);
}

// White QR with the brand hexagon badge at its centre. The badge uses the
// CV sidebar colour variant (lighter blue) so it reads correctly on the dark
// background. Level H error correction keeps the code scannable despite the
// centre mask.
async function qrWithBadge(url: string): Promise<string> {
  const qr = await QRCode.toBuffer(url, {
    errorCorrectionLevel: "H",
    margin: 1,
    width: 600,
    color: { dark: palette.onDark, light: palette.sidebar },
  });
  // Build the badge with CV sidebar colours rather than the raw favicon.svg
  // (which hardcodes brand.accent — too low contrast against palette.sidebar).
  const badgeSvg = buildLogoSvg({
    fill: palette.onDarkAccent,
    bg: palette.sidebar,
  });
  const badge = await sharp(Buffer.from(badgeSvg))
    .resize({ width: Math.round(600 * 0.34) })
    .png()
    .toBuffer();
  const composed = await sharp(qr)
    .composite([{ input: badge, gravity: "center" }])
    .png()
    .toBuffer();
  return `data:image/png;base64,${composed.toString("base64")}`;
}

const fontSize = {
  name: 22,
  heading: 12,
  headingSecondary: 11,
  text: 9,
  small: 8.5,
};

const getUppercaseTitleStyle = (fontSize: number) => ({
  fontFamily: "Space Grotesk",
  fontWeight: 700,
  fontSize,
  textTransform: "uppercase" as const,
  letterSpacing: fontSize * 0.07,
  lineHeight: 1.3,
});

const styles = StyleSheet.create({
  page: { flexDirection: "row", fontFamily: "Inter", color: palette.ink },

  sidebar: {
    width: 200,
    backgroundColor: palette.sidebar,
    color: palette.onDark,
    paddingVertical: 30,
    paddingHorizontal: 22,
    justifyContent: "space-between",
  },
  portraitWrap: { alignItems: "center", marginBottom: 12 },
  portrait: { width: 116, height: 174 },
  name: {
    fontFamily: "Geist",
    fontWeight: 700,
    fontSize: fontSize.name,
    color: palette.onDarkRaised,
    textAlign: "center",
  },
  role: {
    ...getUppercaseTitleStyle(fontSize.heading),
    lineHeight: 1.5,
    color: palette.onDarkAccent,
    textAlign: "center",
    marginTop: 5,
  },
  divider: {
    borderBottomWidth: 1.5,
    borderBottomColor: palette.sidebarLine,
    marginVertical: 15,
  },
  sideHeading: {
    ...getUppercaseTitleStyle(fontSize.headingSecondary),
    color: palette.onDarkAccent,
    marginBottom: 5,
  },
  sideBlock: { marginTop: 15 },
  sideText: {
    fontWeight: 500,
    fontSize: fontSize.text,
    color: palette.onDarkSoft,
    lineHeight: 1.5,
  },
  sideStrong: {
    fontWeight: 700,
    fontSize: fontSize.small,
    color: palette.onDarkRaised,
    lineHeight: 1.5,
  },
  socialRow: { marginBottom: 3 },
  sideList: {},
  sideListItem: { flexDirection: "row", gap: 4, marginBottom: 3 },

  qrBlock: { alignItems: "center", marginTop: 14 },
  qrImage: { width: 104, height: 104 },
  qrCaption: {
    fontWeight: 500,
    fontSize: fontSize.text,
    color: palette.onDarkSoft,
    lineHeight: 1.5,
    marginTop: 6,
  },

  main: {
    flex: 1,
    backgroundColor: palette.card,
    paddingVertical: 34,
    paddingHorizontal: 28,
  },
  mainQuote: {
    color: palette.ink,
    fontSize: fontSize.text,
    lineHeight: 1.5,
    marginBottom: 7,
  },
  headingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginBottom: 11,
  },
  heading: {
    ...getUppercaseTitleStyle(fontSize.heading),
    color: palette.accent,
  },
  headingRule: { flex: 1, height: 1, backgroundColor: palette.accent },

  job: { marginBottom: 7 },
  jobHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 4,
  },
  jobCompany: {
    fontFamily: "Geist",
    fontWeight: 700,
    fontSize: fontSize.headingSecondary,
  },
  jobCompanyInfo: { fontSize: fontSize.text, color: palette.inkSoft },
  jobRole: { fontSize: fontSize.text, color: palette.ink },
  jobMeta: { alignItems: "flex-end" },
  jobPeriod: {
    fontSize: fontSize.text,
    color: palette.inkSoft,
  },
  jobYears: {
    fontFamily: "Geist",
    fontWeight: 700,
    fontSize: fontSize.small,
  },
  bullet: { flexDirection: "row", marginTop: 4 },
  chevron: { marginTop: 1.5, marginRight: 6 },
  bulletText: { flex: 1, fontSize: fontSize.text, lineHeight: 1.5 },
  bulletTextBold: { fontWeight: 700 },

  stackGroup: { marginBottom: 7 },
  stackLabel: {
    fontFamily: "Geist",
    fontWeight: 700,
    fontSize: fontSize.headingSecondary,
    marginBottom: 2,
  },
  stackItems: {
    fontSize: fontSize.text,
    color: palette.inkSoft,
    lineHeight: 1.5,
  },

  section: { marginTop: 13 },
  interestsItems: {
    fontSize: fontSize.text,
    color: palette.inkSoft,
    lineHeight: 1.5,
  },
});

function Chevron() {
  return (
    <Svg width={5} height={8} viewBox="0 0 5 8" style={styles.chevron}>
      <Path
        d="M0.8 0.8 L4 4 L0.8 7.2"
        stroke={palette.accent}
        strokeWidth={1.6}
        fill="none"
      />
    </Svg>
  );
}

function SectionTitle({
  children,
  first,
}: {
  children: string;
  first?: boolean;
}) {
  return (
    <View style={[styles.headingRow, first ? {} : styles.section]}>
      <Text style={styles.heading}>{children}</Text>
      <View style={styles.headingRule} />
    </View>
  );
}

interface Assets {
  portrait: string;
  qr: string;
}

function Cv({ assets }: { assets: Assets }) {
  const cv = getCvData();
  const siteLabel = cv.url.replace(/^https?:\/\//, "");

  return (
    <Document
      title={`CV ${cv.name}`}
      author={cv.name}
      subject={cv.role}
      creator="jordan-t.dev"
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.sidebar}>
          <View>
            <View style={styles.portraitWrap}>
              <Image style={styles.portrait} src={assets.portrait} />
            </View>
            <Text style={styles.name}>{cv.name}</Text>
            <Text style={styles.role}>{cv.role.replace(" · ", "\n")}</Text>

            <View style={styles.divider} />

            <Text style={styles.sideHeading}>Contact</Text>
            <Text style={styles.sideText}>{cv.location}</Text>
            <Text style={styles.sideStrong}>{cv.email}</Text>
            <Text style={styles.sideStrong}>{siteLabel}</Text>

            <View style={styles.sideBlock}>
              <Text style={styles.sideHeading}>Réseaux</Text>
              {cv.socials.map((social) => (
                <View key={social.url} style={styles.socialRow}>
                  <Text style={styles.sideStrong}>{social.label}</Text>
                  <Text style={styles.sideText}>
                    {social.url.replace(/^https?:\/\//, "")}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.sideBlock}>
              <Text style={styles.sideHeading}>Langues</Text>
              <View style={styles.sideList}>
                {cv.languages.map((language) => (
                  <View key={language.name} style={styles.sideListItem}>
                    <Text style={styles.sideStrong}>{language.name}</Text>
                    <Text style={styles.sideText}>({language.comment})</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.sideBlock}>
              <Text style={styles.sideHeading}>Mobilité</Text>
              <View style={styles.sideList}>
                {cv.mobility.map((mobility) => (
                  <View key={mobility.name} style={styles.sideListItem}>
                    <Text style={styles.sideStrong}>{mobility.name}</Text>
                    {mobility.comment ? (
                      <Text style={styles.sideText}>({mobility.comment})</Text>
                    ) : null}
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.qrBlock}>
            <Image style={styles.qrImage} src={assets.qr} />
            <Text style={styles.qrCaption}>{siteLabel}</Text>
          </View>
        </View>

        <View style={styles.main}>
          <SectionTitle first>Philosophie & Mentorat</SectionTitle>
          <Text style={styles.mainQuote}>{cv.philosophy}</Text>
          <SectionTitle>Expérience</SectionTitle>
          {cv.experience.map((job) => (
            <View key={`${job.company}-${job.period}`} style={styles.job}>
              <View style={styles.jobHead}>
                <View>
                  <Text>
                    <Text style={styles.jobCompany}>{job.company}</Text>
                    {job.companyInfo ? (
                      <Text style={styles.jobCompanyInfo}>
                        {` (${job.companyInfo})`}
                      </Text>
                    ) : null}
                  </Text>
                  <Text style={styles.jobRole}>{job.role}</Text>
                </View>
                <View style={styles.jobMeta}>
                  <Text style={styles.jobPeriod}>{job.period}</Text>
                  {job.duration ? (
                    <Text style={styles.jobYears}>{job.duration}</Text>
                  ) : null}
                </View>
              </View>
              {job.highlights.map((line, i) => (
                <View key={i} style={styles.bullet}>
                  <Chevron />
                  <Text style={styles.bulletText}>{line}</Text>
                </View>
              ))}
            </View>
          ))}

          <SectionTitle>Stack technique</SectionTitle>
          {cv.stack.map((group) => (
            <View key={group.label} style={styles.stackGroup}>
              <Text style={styles.stackLabel}>{group.label}</Text>
              <Text style={styles.stackItems}>{group.items.join(" · ")}</Text>
            </View>
          ))}

          <SectionTitle>{"Centres d'intérêt"}</SectionTitle>
          <Text style={styles.interestsItems}>{cv.interests.join(" · ")}</Text>
        </View>
      </Page>
    </Document>
  );
}

async function main() {
  registerFonts();
  const cv = getCvData();
  const [portrait, qr] = await Promise.all([
    composePortrait(path.join(ROOT, "public", "Jordan-T-portrait.svg")),
    qrWithBadge(cv.url),
  ]);

  const out = path.join(ROOT, "public", "cv-jordan-t.pdf");
  await mkdir(path.dirname(out), { recursive: true });
  await renderToFile(<Cv assets={{ portrait, qr }} />, out);
  console.log(`✓ CV généré : ${path.relative(ROOT, out)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
