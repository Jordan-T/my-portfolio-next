import Button from "@/components/ui/Button/Button";
import JordanT from "@/components/ui/JordanT/JordanT";
import styles from "./Hero.module.css";
import { siteConfig } from "@/config/site";
import Container from "@/components/ui/Container/Container";

export default function Hero() {
  return (
    <Container tag="section" className={styles.hero}>
      <div className={styles.visual}>
        <JordanT priority />
      </div>

      <div className={styles.content}>
        <p className={styles.eyebrow}>{siteConfig.role}</p>
        <h1 className={styles.title}>
          Jordan <span>Taisne</span>
        </h1>
        <p className={styles.desc}>
          Aujourd&apos;hui, je conçois des socles front-end qui restent rapides
          et durables, en partant toujours des contraintes réelles et des
          équipes qui vont les faire vivre.
        </p>
        <div className={styles.ctas}>
          <Button href="/#about">Découvrir ma vision</Button>
          <Button href="/#contact" variant="secondary">
            Me contacter
          </Button>
        </div>
      </div>
    </Container>
  );
}
