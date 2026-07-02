import Section from "@/components/ui/Section/Section";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import ProjectCard from "@/components/cards/ProjectCard/ProjectCard";
import Button from "@/components/ui/Button/Button";
import { getAllProjects } from "@/lib/projects";
import styles from "./Projects.module.css";

export default function Projects() {
  const projects = getAllProjects({ limit: 3, featured: true });

  return (
    <Section id="projects">
      <SectionHeading number="03" title="Architecture & Réalisations" />
      <div className={styles.grid}>
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      <Button href="/projects" className={styles.more}>
        Explorer d&apos;autres réalisations
      </Button>
    </Section>
  );
}
