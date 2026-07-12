import styles from "./Tooltip.module.css";

interface TooltipProps {
  label: string;
  className?: string;
}

export default function Tooltip({ label, className }: TooltipProps) {
  return (
    <span className={[styles.tooltip, className].filter(Boolean).join(" ")}>
      <button type="button" className={styles.trigger} aria-label={label}>
        i
      </button>
      <span className={styles.bubble} role="tooltip">
        {label}
      </span>
    </span>
  );
}
