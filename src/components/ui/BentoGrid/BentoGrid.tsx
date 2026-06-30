import styles from "./BentoGrid.module.css";

interface BentoGridProps {
  children: React.ReactNode;
}

export default function BentoGrid({ children }: BentoGridProps) {
  return <div className={styles.grid}>{children}</div>;
}
