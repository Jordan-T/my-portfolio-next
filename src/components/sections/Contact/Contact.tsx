import ContactCard from "@/components/cards/ContactCard/ContactCard";
import Section from "@/components/ui/Section/Section";
import styles from "./Contact.module.css";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";

export default function Contact() {
  return (
    <Section id="contact">
      <SectionHeading
        number="06"
        title="Prochaine étape&nbsp;: Construire la suite"
      />
      <p className={styles.sub}>
        La réussite d'un projet web repose sur des bases techniques saines et
        une vision à long terme. Si vous cherchez à structurer vos applications
        front-end, à optimiser vos performances ou à consolider vos pratiques de
        développement, n'hésitez pas à engager la discussion.
      </p>
      <ContactCard />
    </Section>
  );
}
