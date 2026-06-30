import Section from "@/components/ui/Section/Section";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import ResourceItem from "@/components/cards/ResourceItem/ResourceItem";
import Button from "@/components/ui/Button/Button";
import { getResources } from "@/lib/resources";
import styles from "./Veille.module.css";

export default function Veille() {
  const resources = getResources(3);

  return (
    <Section id="resources" type="alt">
      <SectionHeading number="05" title="Le Lab & Veille" />
      <div className={styles.grid}>
        {resources.map((resource) => (
          <ResourceItem key={resource.id} resource={resource} />
        ))}
      </div>

      <Button href="/veille" className={styles.more}>
        Voir plus de veille
      </Button>
    </Section>
  );
}
