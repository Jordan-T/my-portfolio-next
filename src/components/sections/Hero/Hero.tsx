import Button from "@/components/ui/Button/Button";
import JordanT from "@/components/ui/JordanT/JordanT";
import styles from "./Hero.module.css";
import { siteConfig } from "@/config/site";
import { yearsOfExperience } from "@/config/experience";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.visual}>
        <JordanT priority />
      </div>

      <div className={styles.content}>
        <p className={styles.eyebrow}>{siteConfig.role}</p>
        <h1 className={styles.title}>
          Jordan <span>Taisne</span>
        </h1>
        <p className={styles.desc}>
          {`${yearsOfExperience} `}ans à façonner des interfaces.
          Aujourd&apos;hui, je conçois des architectures front-end robustes,
          performantes et évolutives.
          <br />
          Mon objectif : structurer des systèmes qui tiennent dans le temps et
          transmettre cette exigence aux équipes qui les font vivre.
        </p>
        <div className={styles.ctas}>
          <Button href="/#about">Découvrir l&apos;approche</Button>
          <Button href="/#contact" variant="ghost">
            Me contacter
          </Button>
        </div>
      </div>
    </section>
  );
}
