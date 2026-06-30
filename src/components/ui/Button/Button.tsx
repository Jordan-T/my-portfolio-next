import Link from "next/link";
import styles from "./Button.module.css";

interface ButtonProps {
  variant?: "primary" | "link" | "ghost" | "back";
  href?: string;
  /** Opens in a new tab — only meaningful when href is set. */
  newTab?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  variant = "primary",
  href,
  newTab = false,
  children,
  className,
}: ButtonProps) {
  const cls = [styles.btn, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  if (href && (href.startsWith("http") || href.startsWith("mailto"))) {
    return (
      <a
        href={href}
        className={cls}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={cls}>
      {children}
    </button>
  );
}
