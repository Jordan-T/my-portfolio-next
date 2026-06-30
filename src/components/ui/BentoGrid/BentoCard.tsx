import styles from "./BentoCard.module.css";

interface BentoCardProps {
  label: string;
  wide?: boolean;
  children: React.ReactNode;
}

export default function BentoCard({ label, wide, children }: BentoCardProps) {
  return (
    <article className={`${styles.card} ${wide ? styles.wide : ""}`}>
      <p className={styles.label}>{label}</p>
      {children}
    </article>
  );
}
