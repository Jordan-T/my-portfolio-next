import styles from "./SkipLink.module.css";

export default function SkipLink() {
  return (
    <a href="#main" className={styles.skipLink}>
      Aller au contenu principal
    </a>
  );
}
