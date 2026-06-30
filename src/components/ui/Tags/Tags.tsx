import type { Tag, TagType } from "@/types";
import styles from "./Tags.module.css";

const TAG_CLASS: Record<TagType, string> = {
  framework: styles.framework,
  language: styles.language,
  tool: styles.tool,
  concept: styles.concept,
};

export default function Tags({
  tags,
  className,
}: {
  tags: Tag[];
  className?: string;
}) {
  if (tags.length === 0) return null;

  return (
    <ul className={[className, styles.tags].filter(Boolean).join(" ")}>
      {tags.map((tag) => (
        <li key={tag.label} className={`${styles.tag} ${TAG_CLASS[tag.type]}`}>
          {tag.label}
        </li>
      ))}
    </ul>
  );
}
