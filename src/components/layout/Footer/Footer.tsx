import { siteConfig } from "@/config/site";
import SocialIcon from "@/components/ui/SocialIcon/SocialIcon";
import styles from "./Footer.module.css";
import HexButton from "@/components/ui/HexButton/HexButton";

export type Props = {
  className?: string;
};

export default function Footer({ className }: Props) {
  return (
    <footer className={`${styles.footer} ${className || ""}`}>
      <div className={styles.socials}>
        {siteConfig.socials.map((social) => (
          <HexButton
            key={social.url}
            icon={<SocialIcon label={social.label} />}
            label={social.label}
            size="small"
            href={social.url}
            newTab
          />
        ))}
        {" · "}
        <a className={styles.link} href={`mailto:${siteConfig.email}`}>
          {siteConfig.email}
        </a>
      </div>

      <p className={styles.credit}>
        Conçu et codé par{" "}
        <a href={siteConfig.url} className={styles.link}>
          {siteConfig.name}
        </a>
      </p>
    </footer>
  );
}
