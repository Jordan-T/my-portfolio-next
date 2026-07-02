import Link from "next/link";
import type { Project, ProjectStatus } from "@/types";
import Tags from "@/components/ui/Tags/Tags";
import Badge from "@/components/ui/Badge/Badge";
import styles from "./ProjectCard.module.css";

type VisibleProjectStatus = Exclude<ProjectStatus, "done">;

const STATUS_LABEL: Record<VisibleProjectStatus, string> = {
  wip: "En cours",
  client: "Client",
};

const STATUS_CLASS: Record<VisibleProjectStatus, string> = {
  wip: styles.statusWip,
  client: styles.statusClient,
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className={`${styles.card} ${project.featured ? styles.featured : ""}`}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>
          <Link
            href={`/projects/${project.slug}`}
            className={`${styles.titleLink}`}
          >
            {project.title}
          </Link>
        </h3>
        {project.status !== "done" && (
          <Badge
            className={[styles.status, STATUS_CLASS[project.status]]
              .filter(Boolean)
              .join(" ")}
          >
            {STATUS_LABEL[project.status]}
          </Badge>
        )}
      </div>

      <p className={styles.desc}>{project.description}</p>

      {project.decision && (
        <div className={styles.decisionBlock}>
          <p className={styles.decisionLabel}>Décision Clé</p>
          <p className={styles.decision}>{project.decision}</p>
        </div>
      )}

      <Tags className={styles.tags} tags={project.tags} />
    </div>
  );
}
