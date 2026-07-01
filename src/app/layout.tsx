import type { Metadata } from "next";
import { Geist, Inter, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Nav from "@/components/layout/Nav/Nav";
import Footer from "@/components/layout/Footer/Footer";
import SkipLink from "@/components/layout/SkipLink/SkipLink";
import NoScriptBanner from "@/components/layout/NoScriptBanner/NoScriptBanner";
import "@/styles/globals.css";
import "@/styles/fonts.css";
import { siteConfig } from "@/config/site";
import { yearsOfExperience } from "@/config/experience";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
  weight: ["400", "700", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jordan-t.dev"),
  title: {
    default: `${siteConfig.name} · ${siteConfig.role}`,
    template: "%s · jordan-t.dev",
  },
  description: `Portfolio de ${siteConfig.name}, ${siteConfig.role}. Expert Vue/Nuxt & React, orienté architecture et design systémique.`,
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: `${siteConfig.name} · ${siteConfig.role}`,
    description: `${yearsOfExperience} ans à façonner des interfaces. Expert Vue/Nuxt & React, orienté architecture.`,
    url: "https://jordan-t.dev",
    siteName: "jordan-t.dev",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/generated/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

// Registers the self-destructing cleanup service worker (public/sw.js) that
// purges stale v1 caches, unregisters itself, then reloads. Inline so it runs
// at parse time — earlier than a React effect — and needs no client component.
const serviceWorkerCleanupScript = `
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").catch(function () {});
}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geist.variable} ${inter.variable} ${spaceGrotesk.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="bg-grid-1">
        <SkipLink />
        <NoScriptBanner />
        <Nav />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <Analytics />
        <script
          dangerouslySetInnerHTML={{ __html: serviceWorkerCleanupScript }}
        />
      </body>
    </html>
  );
}
