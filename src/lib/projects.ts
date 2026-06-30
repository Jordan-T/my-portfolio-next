import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Project, ProjectLinks, ProjectStatus, Tag } from "@/types";

const PROJECTS_DIR = path.join(process.cwd(), "src", "content", "projects");

interface GetProjectsOptions {
  /** Maximum number of projects to return, after filtering and sorting. */
  limit?: number;
  /** If true, only return featured projects; if false, only return non-featured projects; if undefined, return all projects. */
  featured?: boolean;
  /** Source directory — injectable for tests. */
  dir?: string;
}

function readProjectFile(dir: string, fileName: string): Project {
  const slug = fileName.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(dir, fileName), "utf8");
  const { data, content } = matter(raw);

  const links: ProjectLinks = {
    external: data.external || undefined,
    github: data.github || undefined,
    gitlab: data.gitlab || undefined,
  };

  return {
    slug,
    title: String(data.title ?? slug),
    image: data.image ? String(data.image) : undefined,
    description: String(data.description ?? ""),
    status: (data.status as ProjectStatus) ?? "wip",
    featured: Boolean(data.featured),
    published: data.published !== false, // visible unless explicitly false
    date: data.date ? String(data.date) : undefined,
    tags: (data.tags as Tag[]) ?? [],
    links,
    decision: data.decision ? String(data.decision) : undefined,
    takeaways: Array.isArray(data.takeaways)
      ? data.takeaways.map(String)
      : undefined,
    content,
  };
}

function listMarkdownFiles(dir: string): string[] {
  return fs.readdirSync(dir).filter((file) => /\.mdx?$/.test(file));
}

/** Published projects: featured first, then by date (newest first). */
export function getAllProjects({
  limit,
  featured,
  dir = PROJECTS_DIR,
}: GetProjectsOptions = {}): Project[] {
  const projects = listMarkdownFiles(dir)
    .map((file) => readProjectFile(dir, file))
    .filter((project) => project.published)
    .filter((project) =>
      typeof featured === "boolean" ? project.featured === featured : true,
    )
    .sort(
      (a, b) =>
        Number(b.featured) - Number(a.featured) ||
        (b.date ?? "").localeCompare(a.date ?? ""),
    );

  return typeof limit === "number" ? projects.slice(0, limit) : projects;
}

export function getProjectSlugs(dir: string = PROJECTS_DIR): string[] {
  return getAllProjects({ dir }).map((project) => project.slug);
}

export function getProjectBySlug(
  slug: string,
  dir: string = PROJECTS_DIR,
): Project | undefined {
  return getAllProjects({ dir }).find((project) => project.slug === slug);
}
