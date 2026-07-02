import Link from "next/link";
import styles from "./Button.module.css";

interface ButtonProps {
  variant?: "primary" | "secondary" | "link" | "back";
  size?: "small";
  href?: string;
  rel?: string;
  target?: string;
  isLink?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  variant = "primary",
  size,
  href,
  isLink,
  children,
  className,
  ...props
}: ButtonProps) {
  const cls = [
    styles.btn,
    styles[variant],
    size ? styles[size] : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (
    href &&
    (isLink || href.startsWith("http") || href.startsWith("mailto"))
  ) {
    return (
      <a href={href} className={cls} {...props}>
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={cls} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={cls} {...props}>
      {children}
    </button>
  );
}
