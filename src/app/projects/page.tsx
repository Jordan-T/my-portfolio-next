import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader/PageHeader";
import ProjectCard from "@/components/cards/ProjectCard/ProjectCard";
import { getAllProjects } from "@/lib/projects";
import styles from "./projects.module.css";
import Button from "@/components/ui/Button/Button";
import ContactCard from "@/components/cards/ContactCard/ContactCard";

export const metadata: Metadata = {
  title: "Projets",
  description: "Sélection de projets de Jordan Taisne.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div>
      <PageHeader
        back={
          <Button href="/" variant="back">
            Accueil
          </Button>
        }
        eyebrow="Projets"
        title="Ce sur quoi je travaille"
      />

      <div className={styles.grid}>
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      <ContactCard className={styles.contactCard} />
    </div>
  );
}
