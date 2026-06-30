import type { Metadata } from "next";
import { isValidElement, type ReactNode } from "react";
import { notFound } from "next/navigation";
import HexagonImage from "@/components/ui/HexagonImage/HexagonImage";
import HexButton from "@/components/ui/HexButton/HexButton";
import PageHeader from "@/components/sections/PageHeader/PageHeader";
import SocialIcon from "@/components/ui/SocialIcon/SocialIcon";
import Tags from "@/components/ui/Tags/Tags";
import { compileMDX, extractHeadings } from "@/lib/mdx";
import { getProjectBySlug, getProjectSlugs } from "@/lib/projects";
import contentStyles from "@/styles/content.module.css";
import styles from "./project.module.css";
import Button from "@/components/ui/Button/Button";
import { slugify } from "@/lib/slugify";
import ContactCard from "@/components/cards/ContactCard/ContactCard";

/** Flattens a React node to its plain text, so a heading id matches the slug used in the table of contents. */
function toText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toText).join("");
  if (isValidElement(node)) {
    return toText((node.props as { children?: ReactNode }).children);
  }
  return "";
}

const mdxComponents = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2
      {...props}
      className={contentStyles.heading2}
      id={slugify(toText(props.children))}
      tabIndex={-1}
    />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3 {...props} className={contentStyles.heading3} />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul {...props} className={contentStyles.list} />
  ),
};

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  year: "numeric",
  month: "long",
});

function formatDate(isoDate: string): string {
  return dateFormatter.format(new Date(isoDate));
}

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return { title: project.title, description: project.description };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const { external, github, gitlab } = project.links;
  const hasLinks = Boolean(external || github || gitlab);
  const MDXContent = project.content ? await compileMDX(project.content) : null;
  const headings = project.content ? extractHeadings(project.content) : [];

  return (
    <article>
      <PageHeader
        eyebrow="Projet"
        title={project.title}
        back={
          <Button href="/projects" variant="back">
            Tous les projets
          </Button>
        }
        image={
          project.image ? (
            <HexagonImage src={project.image} alt="" width={200} />
          ) : null
        }
        aside={
          hasLinks ? (
            <ul className={styles.links}>
              {external ? (
                <li>
                  <HexButton
                    href={external}
                    newTab
                    label="Voir le site"
                    icon={<SocialIcon label="External" />}
                  />
                </li>
              ) : null}
              {github ? (
                <li>
                  <HexButton
                    href={github}
                    newTab
                    label="GitHub"
                    icon={<SocialIcon label="GitHub" />}
                  />
                </li>
              ) : null}
              {gitlab ? (
                <li>
                  <HexButton
                    href={gitlab}
                    newTab
                    label="GitLab"
                    icon={<SocialIcon label="GitLab" />}
                  />
                </li>
              ) : null}
            </ul>
          ) : null
        }
      >
        <p className={styles.desc}>{project.description}</p>
        {project.date ? (
          <p className={styles.date}>{formatDate(project.date)}</p>
        ) : null}
        <Tags tags={project.tags} />
      </PageHeader>

      <div className={styles.main}>
        {headings.length > 0 ? (
          <nav className={styles.toc} aria-labelledby="toc-title">
            <p id="toc-title" className={styles.tocTitle}>
              Sommaire
            </p>
            <ul className={styles.tocList}>
              {project.takeaways?.length ? (
                <li>
                  <a href="#takeaways">Ce qu&apos;il faut retenir</a>
                </li>
              ) : null}
              {project.decision ? (
                <li>
                  <a href="#decision">Décision Clé</a>
                </li>
              ) : null}
              {headings.map(({ id, title }) => (
                <li key={id}>
                  <a href={`#${id}`}>{title}</a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        <div className={styles.body}>
          {project.takeaways?.length ? (
            <div id="takeaways" className={styles.takeawaysBlock}>
              <h2 className={styles.takeawaysLabel} tabIndex={-1}>
                Ce qu&apos;il faut retenir
              </h2>
              <ul className={styles.takeawaysList}>
                {project.takeaways.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {project.decision && (
            <div id="decision" className={styles.decisionBlock}>
              <h2 className={styles.decisionLabel} tabIndex={-1}>
                Décision Clé
              </h2>
              <p className={styles.decision}>{project.decision}</p>
            </div>
          )}
          {MDXContent ? <MDXContent components={mdxComponents} /> : null}
        </div>
      </div>

      <ContactCard className={styles.contactCard} />
    </article>
  );
}
