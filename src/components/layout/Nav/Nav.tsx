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
  optionalLink?: boolean;
};

// SPA routing keeps the Nav mounted, so #nav-toggle stays checked after use;
// reset it on any click inside the menu (link or overlay backdrop) to close it.
const closeMobileMenuScript = `
document.getElementById("site-nav").addEventListener("click", function () {
  var toggle = document.getElementById("nav-toggle");
  if (toggle) toggle.checked = false;
});`;

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Accueil", optionalLink: true },
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

      <input type="checkbox" id="nav-toggle" className={styles.toggle} />
      <label htmlFor="nav-toggle" className={styles.burger} aria-label="Menu">
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </label>

      <nav
        id="site-nav"
        className={styles.menu}
        aria-label="Navigation principale"
      >
        <ul className={styles.links}>
          {NAV_LINKS.map((link) => (
            <li
              key={link.href}
              className={
                link.optionalLink ? styles.optionalLink : undefined
              }
            >
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

      <script dangerouslySetInnerHTML={{ __html: closeMobileMenuScript }} />
    </header>
  );
}
