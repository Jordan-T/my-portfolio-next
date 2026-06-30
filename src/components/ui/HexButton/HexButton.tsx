import Link from "next/link";
import styles from "./HexButton.module.css";

interface HexButtonProps {
  icon: React.ReactNode;
  label: string;
  size?: "small" | "medium";
  href?: string;
  /** Opens in a new tab — only meaningful when href is set. */
  newTab?: boolean;
  className?: string;
}

export default function HexButton({
  icon,
  label,
  size = "medium",
  href,
  newTab = false,
  className,
}: HexButtonProps) {
  const cls = [styles.btn, styles[size], className].filter(Boolean).join(" ");

  if (href && (href.startsWith("http") || href.startsWith("mailto"))) {
    return (
      <a
        href={href}
        aria-label={label}
        className={cls}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <span className={styles.icon}>{icon}</span>
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} aria-label={label} className={cls}>
        <span className={styles.icon}>{icon}</span>
      </Link>
    );
  }

  return (
    <button type="button" aria-label={label} className={cls}>
      <span className={styles.icon}>{icon}</span>
    </button>
  );
}
