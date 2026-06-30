import Link from "next/link";
import type { Project, ProjectStatus } from "@/types";
import Tags from "@/components/ui/Tags/Tags";
import Badge from "@/components/ui/Badge/Badge";
import styles from "./ProjectCard.module.css";

const STATUS_LABEL: Record<ProjectStatus, string> = {
  wip: "En cours",
  done: "Terminé",
  client: "Client",
};

const STATUS_CLASS: Record<ProjectStatus, string> = {
  wip: styles.statusWip,
  done: styles.statusDone,
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
        <Badge className={STATUS_CLASS[project.status]}>
          {STATUS_LABEL[project.status]}
        </Badge>
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
