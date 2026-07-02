import Container from "../Container/Container";
import styles from "./Section.module.css";

interface SectionProps {
  id?: string;
  className?: string;
  type?: "default" | "alt";
  children: React.ReactNode;
}

export default function Section({
  id,
  className,
  type = "default",
  children,
}: SectionProps) {
  const cls = [
    styles.section,
    type === "alt" ? styles.sectionAlt : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <section id={id} className={cls}>
      <Container>{children}</Container>
    </section>
  );
}
