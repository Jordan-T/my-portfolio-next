import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader/PageHeader";
import ResourceItem from "@/components/cards/ResourceItem/ResourceItem";
import { getResources } from "@/lib/resources";
import styles from "./veille.module.css";
import ContactCard from "@/components/cards/ContactCard/ContactCard";
import Button from "@/components/ui/Button/Button";

export const metadata: Metadata = {
  title: "Veille",
  description: "Liens et ressources suivis par Jordan Taisne.",
};

export default function VeillePage() {
  const resources = getResources();

  return (
    <div>
      <PageHeader
        back={
          <Button href="/" variant="back">
            Accueil
          </Button>
        }
        eyebrow="Veille"
        title="Ce que je lis, ce qui m'inspire"
      />

      <div className={styles.grid}>
        {resources.map((resource) => (
          <ResourceItem key={resource.id} resource={resource} />
        ))}
      </div>

      <ContactCard className={styles.contactCard} />
    </div>
  );
}
