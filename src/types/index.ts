export type AvailabilityStatus = "active" | "passive" | "freelance";

export type ProjectStatus = "wip" | "done" | "client";
export type TagType = "framework" | "language" | "tool" | "concept";

export interface Tag {
  label: string;
  type: TagType;
}

export interface Contribution {
  label: string;
  url: string;
  description: string;
}

export interface ProjectLinks {
  external?: string;
  github?: string;
  gitlab?: string;
}

export interface Project {
  slug: string;
  image?: string;
  title: string;
  description: string;
  status: ProjectStatus;
  featured: boolean;
  /** Hidden from listings (and not built) when false. Defaults to true. */
  published: boolean;
  /** ISO date (YYYY-MM-DD), used for sorting and display. */
  date?: string;
  tags: Tag[];
  links: ProjectLinks;
  /** Architecture decision record — the "So What" / why behind the project. */
  decision?: string;
  /** Key takeaways (TL;DR), displayed in a callout at the top of the page. */
  takeaways?: string[];
  content?: string;
}

export type ResourceType =
  | "article"
  | "video"
  | "book"
  | "talk"
  | "podcast"
  | "tool";

export type ResourceLevel = "essential" | "recommended" | "interesting";

export interface Resource {
  /** Kebab-case slug, used as React key and future routing. */
  id: string;
  title: string;
  url?: string;
  source: string;
  category: string;
  /** 4-digit year string, e.g. "2025". Used for sorting and display. */
  date: string;
  type: ResourceType;
  level?: ResourceLevel;
  comment?: string;
}

export interface SocialLink {
  label: "GitHub" | "GitLab" | "LinkedIn";
  url: string;
}

export interface Experience {
  company: string;
  companyInfo?: string;
  role: string;
  /** ISO date (YYYY-MM-DD), used for sorting and display. */
  startDate: string;
  /** ISO date (YYYY-MM-DD), used for sorting and display. */
  endDate?: string;
  url?: string;
  highlights: string[];
}
