import styles from "./SectionHeading.module.css";

interface SectionHeadingProps {
  /** Two-digit section number, e.g. "01" (rendered as "01."). */
  number: string;
  title: string;
}

export default function SectionHeading({ number, title }: SectionHeadingProps) {
  return (
    <h2 className={styles.heading}>
      <span className={styles.number} aria-hidden="true">
        {number}.
      </span>
      {title}
    </h2>
  );
}
