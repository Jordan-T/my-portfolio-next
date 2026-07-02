import ContactCard from "@/components/cards/ContactCard/ContactCard";
import Section from "@/components/ui/Section/Section";
import styles from "./Contact.module.css";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";

export default function Contact() {
  return (
    <Section id="contact">
      <SectionHeading number="06" title="Contact & Échanges" />
      <p className={styles.content}>
        Qu&apos;il faille structurer un projet (React, Vue, TypeScript), maintenir de
        l&apos;existant (JavaScript, jQuery) ou s&apos;en passer totalement : mon approche
        reste pragmatique. J&apos;interviens aussi pour accompagner vos développeurs
        juniors et optimiser vos performances. Échangeons sur vos contraintes
        réelles et vos objectifs. Vous pouvez prendre contact ici, que ce soit
        pour analyser un besoin précis ou simplement autour d&apos;un café (sur Lille
        ou en visio).
      </p>
      <ContactCard />
    </Section>
  );
}
