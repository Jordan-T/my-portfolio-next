import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import HexagonImage from "@/components/ui/HexagonImage/HexagonImage";
import SocialIcon from "@/components/ui/SocialIcon/SocialIcon";
import { siteConfig } from "@/config/site";
import type { AvailabilityStatus } from "@/types";
import styles from "./ContactCard.module.css";
import HexButton from "@/components/ui/HexButton/HexButton";

const TONE_CLASS = {
  available: styles.toneAvailable,
  listening: styles.toneListening,
} as const;

const STATUS: Record<
  AvailabilityStatus,
  { label: string; tone: keyof typeof TONE_CLASS }
> = {
  active: { label: "Disponible · CDI", tone: "available" },
  passive: { label: "À l'écoute du marché", tone: "listening" },
  freelance: { label: "Disponible · Freelance", tone: "available" },
};

export type ContactCardProps = {
  className?: string;
};

export default function ContactCard({ className }: ContactCardProps) {
  const { availabilityStatus, socials, name, email, cvUrl } = siteConfig;
  const status = STATUS[availabilityStatus];

  return (
    <div className={[className, styles.card].filter(Boolean).join(" ")}>
      <aside className={styles.identity}>
        <HexagonImage src="/Jordan-T-portrait.svg" alt="" width={175} />
        <div className={styles.asideContent}>
          <p className={styles.name}>{name}</p>
          <div className={styles.socials}>
            {socials.map((social) => (
              <HexButton
                key={social.url}
                icon={<SocialIcon label={social.label} />}
                label={social.label}
                size="small"
                href={social.url}
                newTab
              />
            ))}
          </div>
          <Badge className={`${styles.status} ${TONE_CLASS[status.tone]}`}>
            <span className={styles.dot} aria-hidden="true" />
            {status.label}
          </Badge>
        </div>
      </aside>

      <div className={styles.body}>
        <p className={styles.overline}>Prendre contact</p>
        <p className={styles.lead}>Échangeons sur vos projets</p>
        <p className={styles.detail}>
          Tech Lead Front-End spécialisé en architecture web. Conception
          d&apos;interfaces performantes et industrialisation des pratiques de
          développement.
        </p>
        <div className={styles.actions}>
          <Button href={`mailto:${email}`}>Me contacter</Button>
          <Button
            href={cvUrl}
            isLink
            variant="secondary"
            target="_blank"
            rel="noopener"
          >
            Télécharger le CV
          </Button>
        </div>
      </div>
    </div>
  );
}
