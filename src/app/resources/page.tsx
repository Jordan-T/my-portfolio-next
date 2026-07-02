import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader/PageHeader";
import ResourceItem from "@/components/cards/ResourceItem/ResourceItem";
import { getResources } from "@/lib/resources";
import styles from "./resources.module.css";
import ContactCard from "@/components/cards/ContactCard/ContactCard";
import Button from "@/components/ui/Button/Button";
import Container from "@/components/ui/Container/Container";

export const metadata: Metadata = {
  title: "Ressources",
  description: "Liens & Ressources par Jordan Taisne.",
};

export default function ResourcesPage() {
  const resources = getResources();

  return (
    <div>
      <PageHeader
        back={
          <Button href="/" variant="back">
            Accueil
          </Button>
        }
        eyebrow="Ressources"
        title="Liens & Ressources"
      />

      <Container className={styles.grid}>
        {resources.map((resource) => (
          <ResourceItem key={resource.id} resource={resource} />
        ))}
      </Container>

      <Container>
        <ContactCard className={styles.contactCard} />
      </Container>
    </div>
  );
}
