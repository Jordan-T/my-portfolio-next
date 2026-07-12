import { siteConfig } from "@/config/site";
import { experience, yearsOfExperience } from "@/config/experience";
import { CONCEPTS, FRAMEWORKS, LANGS } from "@/config/stack";
import type { SocialLink, Tag } from "@/types";

export interface CvExperience {
  company: string;
  companyInfo?: string;
  role: string;
  /** Human-readable French period, e.g. "depuis mai 2020". */
  period: string;
  /** Rounded tenure, e.g. "6 ans" (empty under a year). */
  duration: string;
  highlights: string[];
}

export interface CvStackGroup {
  label: string;
  items: string[];
}

export interface CvData {
  name: string;
  role: string;
  location: string;
  email: string;
  phone?: string;
  url: string;
  philosophy: string;
  socials: SocialLink[];
  yearsOfExperience: number;
  interests: string[];
  stack: CvStackGroup[];
  experience: CvExperience[];
  languages: typeof siteConfig.languages;
  mobility: typeof siteConfig.mobility;
}

function formatMonth(iso: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

function formatPeriod(startDate: string, endDate?: string): string {
  const start = formatMonth(startDate);
  return endDate ? `${start} à ${formatMonth(endDate)}` : `depuis ${start}`;
}

// Rounded years of tenure, matching the site's Experience RangeDisplay.
function formatDuration(startDate: string, endDate?: string): string {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());
  const years = Math.round(months / 12);
  return years > 0 ? `${years} an${years > 1 ? "s" : ""}` : "";
}

function labels(tags: Tag[]): string[] {
  return tags.map((tag) => tag.label);
}

/**
 * Assembles the CV from the same configs the site renders, so the exported
 * document can never drift from the live portfolio. Pure and dependency-free.
 *
 * `phone` is not part of the site config (it must never ship on the public
 * site) — pass it explicitly to include it, e.g. for a private export.
 */
export function getCvData(options?: { phone?: string }): CvData {
  return {
    name: siteConfig.name,
    role: siteConfig.role,
    location: siteConfig.location,
    email: siteConfig.email,
    phone: options?.phone,
    url: siteConfig.url,
    socials: [...siteConfig.socials],
    yearsOfExperience,
    philosophy: siteConfig.philosophy,
    interests: [...siteConfig.interests],
    stack: [
      { label: "Frameworks", items: labels(FRAMEWORKS) },
      { label: "Langages", items: labels(LANGS) },
      { label: "Concepts", items: labels(CONCEPTS) },
    ],
    languages: [...siteConfig.languages],
    mobility: [...siteConfig.mobility],
    experience: [...experience]
      .sort((a, b) => b.startDate.localeCompare(a.startDate))
      .map((job) => ({
        company: job.company,
        companyInfo: job.companyInfo,
        role: job.role,
        period: formatPeriod(job.startDate, job.endDate),
        duration: formatDuration(job.startDate, job.endDate),
        highlights: [...job.highlights],
      })),
  };
}
