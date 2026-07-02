import Section from "@/components/ui/Section/Section";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import BentoGrid from "@/components/ui/BentoGrid/BentoGrid";
import BentoCard from "@/components/ui/BentoGrid/BentoCard";
import Tags from "@/components/ui/Tags/Tags";
import { siteConfig } from "@/config/site";
import { CONCEPTS, FRAMEWORKS, LANGS } from "@/config/stack";
import styles from "./Vision.module.css";
import { CONTRIBUTIONS } from "@/config/contributions";

export default function Vision() {
  return (
    <Section id="about">
      <SectionHeading number="02" title="Vision & Stack" />

      <BentoGrid>
        <BentoCard label="Vision & Transmission" wide>
          <blockquote className={styles.quote}>
            {siteConfig.philosophy}
          </blockquote>
        </BentoCard>

        <BentoCard label="Concepts Clés">
          <p className={styles.soWhat}>
            Valeurs immuables qui guident mes choix, quel que soit le framework.
          </p>
          <Tags tags={CONCEPTS} />
        </BentoCard>

        <BentoCard label="Maîtrise Technique">
          <div className={styles.techGroup}>
            <p className={styles.groupLabel}>Frameworks</p>
            <Tags tags={FRAMEWORKS} />
          </div>
          <div className={styles.techGroup}>
            <p className={styles.groupLabel}>Langages</p>
            <Tags tags={LANGS} />
          </div>
        </BentoCard>

        <BentoCard label="Contributions" wide>
          <p className={styles.soWhat}>
            Contributions à l&apos;écosystème open source : la resources
            technique qui se traduit en code.
          </p>
          <ul className={styles.prList}>
            {CONTRIBUTIONS.map((contribution) => (
              <li key={contribution.url} className={styles.prItem}>
                <a
                  href={contribution.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={styles.prRepo}>{contribution.label}</span> :{" "}
                  <span className={styles.prDesc}>
                    {contribution.description}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </BentoCard>
      </BentoGrid>
    </Section>
  );
}
