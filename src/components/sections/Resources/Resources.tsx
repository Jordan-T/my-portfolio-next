import Section from "@/components/ui/Section/Section";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import ResourceItem from "@/components/cards/ResourceItem/ResourceItem";
import Button from "@/components/ui/Button/Button";
import { getResources } from "@/lib/resources";
import styles from "./Resources.module.css";

export default function Resources() {
  const resources = getResources(3);

  return (
    <Section id="resources" type="alt" className={styles.card}>
      <SectionHeading number="05" title="Liens & Ressources" />
      <div className={styles.grid}>
        {resources.map((resource) => (
          <ResourceItem key={resource.id} resource={resource} />
        ))}
      </div>

      <Button href="/resources" className={styles.more}>
        Explorer d&apos;autres ressources
      </Button>
    </Section>
  );
}
