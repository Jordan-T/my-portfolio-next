import Container from "@/components/ui/Container/Container";
import styles from "./PageHeader.module.css";

interface PageHeaderProps {
  title: React.ReactNode;
  eyebrow?: string;
  back?: React.ReactNode;
  image?: React.ReactNode;
  aside?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export default function PageHeader({
  title,
  eyebrow,
  back,
  image,
  aside,
  className,
  children,
}: PageHeaderProps) {
  const cls = [styles.section, className].filter(Boolean).join(" ");
  return (
    <section className={cls}>
      <Container className={styles.container}>
        <div className={styles.main}>
          {back && <div className={styles.back}>{back}</div>}
          {eyebrow && <div className={styles.eyebrow}>{eyebrow}</div>}
          <h1 className={styles.title}>{title}</h1>
          {children}
        </div>

        {(image || aside) && (
          <div className={styles.aside}>
            {image || null}
            {aside || null}
          </div>
        )}
      </Container>
    </section>
  );
}
