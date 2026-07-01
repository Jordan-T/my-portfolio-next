import type { ReactNode } from "react";
import styles from "./Badge.module.css";

export default function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const cls = [styles.badge, className].filter(Boolean).join(" ");
  return <span className={cls}>{children}</span>;
}
