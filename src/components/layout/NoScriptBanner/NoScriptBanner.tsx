import styles from "./NoScriptBanner.module.css";

export default function NoScriptBanner() {
  return (
    <noscript>
      <p className={styles.banner}>
        Vous n&apos;avez pas le JavaScript activé&nbsp;? Pas de souci,{" "}
        <strong className={styles.highlight}>
          ce site est déjà optimisé pour vous
        </strong>
        &nbsp;!
      </p>
    </noscript>
  );
}
