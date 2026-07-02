import Link from "next/link";
import Logo from "@/components/ui/Logo/Logo";
import SocialIcon from "@/components/ui/SocialIcon/SocialIcon";
import { siteConfig } from "@/config/site";
import styles from "./Nav.module.css";
import Button from "@/components/ui/Button/Button";

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
setTimeout(function() {
  document.getElementById("site-nav").addEventListener("click", function () {
    var toggle = document.getElementById("nav-toggle");
    if (toggle) toggle.checked = false;
  });
}, 0);`;

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Accueil", optionalLink: true },
  { href: "/#projects", label: "Réalisations" },
  { href: "/#experience", label: "Parcours" },
  { href: "/#resources", label: "Ressources", optionalLink: true },
  {
    href: "https://labs.jordan-t.dev",
    label: "Laboratoire",
    rel: "noopener",
    external: true,
  },
  {
    href: siteConfig.cvUrl,
    label: "CV",
    rel: "noopener",
    external: true,
  },
];

function NavLink({ link }: { link: NavLink }) {
  const LinkEl = link.external ? "a" : Link;

  return (
    <LinkEl
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
    </LinkEl>
  );
}

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
              className={link.optionalLink ? styles.optionalLink : undefined}
            >
              <NavLink link={link} />
            </li>
          ))}
        </ul>

        <Button variant="primary" size="small" href="/#contact">
          Contact
        </Button>
      </nav>

      <script dangerouslySetInnerHTML={{ __html: closeMobileMenuScript }} />
    </header>
  );
}
