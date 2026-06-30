import Button from "@/components/ui/Button/Button";
import JordanT from "@/components/ui/JordanT/JordanT";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.wrap}>
      <div className={styles.code}>
        <span>4</span>
        <JordanT className={styles.portrait} priority alt="0" />
        <span>4</span>
      </div>
      <h1 className={styles.title}>Cette page s&apos;est perdue en route.</h1>
      <p className={styles.desc}>
        Le lien est cassé ou la page a été déplacée. Revenons sur un terrain
        solide.
      </p>
      <div className={styles.ctas}>
        <Button href="/">Retour à l&apos;accueil</Button>
      </div>
    </div>
  );
}
