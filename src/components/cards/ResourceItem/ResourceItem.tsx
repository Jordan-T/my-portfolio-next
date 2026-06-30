import type { Resource, ResourceLevel, ResourceType } from "@/types";
import Badge from "@/components/ui/Badge/Badge";
import styles from "./ResourceItem.module.css";

const TYPE_LABEL: Record<ResourceType, string> = {
  article: "Article",
  video: "Vidéo",
  book: "Livre",
  talk: "Talk",
  podcast: "Podcast",
  tool: "Outil",
};

const LEVEL_LABEL: Record<ResourceLevel, string> = {
  essential: "Essentiel",
  recommended: "Recommandé",
  interesting: "Intéressant",
};

const LEVEL_CLASS: Record<ResourceLevel, string> = {
  essential: styles.levelEssential,
  recommended: styles.levelRecommended,
  interesting: styles.levelInteresting,
};

function ResourceContent({ resource }: { resource: Resource }) {
  return (
    <>
      <span className={styles.meta}>
        <span className={styles.category}>{resource.category}</span>
        <Badge className={styles.type}>{TYPE_LABEL[resource.type]}</Badge>
        {resource.level ? (
          <Badge className={LEVEL_CLASS[resource.level]}>
            {LEVEL_LABEL[resource.level]}
          </Badge>
        ) : null}
      </span>
      <span className={styles.title}>{resource.title}</span>
      {resource.comment ? (
        <span className={styles.comment}>{resource.comment}</span>
      ) : null}
      <span className={styles.source}>
        {resource.source} · {resource.date}
      </span>
    </>
  );
}

export default function ResourceItem({ resource }: { resource: Resource }) {
  if (resource.url) {
    return (
      <a
        href={resource.url}
        className={styles.item}
        target="_blank"
        rel="noopener noreferrer"
      >
        <ResourceContent resource={resource} />
      </a>
    );
  }
  return (
    <article className={styles.item}>
      <ResourceContent resource={resource} />
    </article>
  );
}
