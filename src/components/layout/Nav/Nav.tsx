import Link from "next/link";
import Logo from "@/components/ui/Logo/Logo";
import SocialIcon from "@/components/ui/SocialIcon/SocialIcon";
import { siteConfig } from "@/config/site";
import styles from "./Nav.module.css";

type NavLink = {
  href: string;
  label: string;
  target?: string;
  rel?: string;
  external?: boolean;
};

const NAV_LINKS: NavLink[] = [
  { href: "/#experience", label: "Expérience" },
  { href: "/projects", label: "Projets" },
  { href: "/veille", label: "Veille" },
  { href: "/#contact", label: "Contact" },
  {
    href: "https://labs.jordan-t.dev",
    label: "Laboratoire",
    rel: "noopener",
    external: true,
  },
];

export default function Nav() {
  return (
    <header className={styles.nav}>
      <Link href="/" className={styles.logo} aria-label="Accueil, jordan-t.dev">
        <Logo className={styles.logoMark} />
      </Link>

      {/*
        CSS-only mobile menu: a visually-hidden (but focusable) checkbox toggles
        the menu via the `:checked ~ .menu` rule. Works with zero JavaScript, so
        the nav stays a Server Component and remains usable without JS.
      */}
      <input type="checkbox" id="nav-toggle" className={styles.toggle} />
      <label htmlFor="nav-toggle" className={styles.burger} aria-label="Menu">
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </label>

      <nav className={styles.menu} aria-label="Navigation principale">
        <ul className={styles.links}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.rel}
                aria-label={
                  link.external
                    ? `${link.label} (site externe, nouvel onglet)`
                    : undefined
                }
              >
                {link.label}
                {link.external && (
                  <SocialIcon
                    className={styles.externalIcon}
                    label="External"
                    size={14}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
        <a
          className={styles.cv}
          href={siteConfig.cvUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          CV
        </a>
      </nav>
    </header>
  );
}
