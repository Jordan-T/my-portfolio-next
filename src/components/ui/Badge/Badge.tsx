import type { ReactNode } from "react";
import styles from "./Badge.module.css";

// Small pill label (project status, resource type…). Color/variant comes from
// the caller via className; the base pill shape lives here.
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
