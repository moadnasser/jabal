import { useContent } from "../../controllers/languageContext.js";
import { useMobileNav } from "../../controllers/useMobileNav.js";
import { getAllLinks, getPrimaryLinks } from "../../models/navigation.js";
import { SECTIONS } from "../../models/site.js";
import { Button } from "../components/Button.jsx";
import { Icon } from "../components/Icon.jsx";
import { LanguageSwitch } from "../components/LanguageSwitch.jsx";
import { Logo } from "../components/Logo.jsx";
import styles from "./Navbar.module.css";

const PANEL_ID = "primary-navigation";

/**
 * Sticky site header.
 *
 * @param {object} props
 * @param {string | null} props.activeSection  id of the section in view, from
 *   the page controller; drives the `aria-current` "you are here" marker.
 */
export function Navbar({ activeSection }) {
  const content = useContent();
  const { isOpen, toggle, close } = useMobileNav();

  const primaryLinks = getPrimaryLinks(content);
  const panelLinks = getAllLinks(content);

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Logo className={styles.brand} />

        <nav className={styles.links} aria-label={content.nav.primaryNavLabel}>
          {primaryLinks.map((link) => (
            <a
              key={link.id}
              className={styles.link}
              href={link.href}
              aria-current={activeSection === link.id ? "true" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          className={styles.menuButton}
          type="button"
          aria-label={isOpen ? content.nav.closeMenu : content.nav.openMenu}
          aria-expanded={isOpen}
          aria-controls={PANEL_ID}
          onClick={toggle}
        >
          <Icon name={isOpen ? "close" : "menu"} size={20} strokeWidth={2.4} />
        </button>

        <div className={styles.langPill}>
          <LanguageSwitch label={content.nav.language} />
        </div>

        <Button
          className={styles.cta}
          href={`#${SECTIONS.contact}`}
          variant="teal"
          withArrow
        >
          {content.nav.contact}
        </Button>
      </div>

      {isOpen ? (
        <nav
          className={styles.panel}
          id={PANEL_ID}
          aria-label={content.nav.primaryNavLabel}
        >
          {panelLinks.map((link) => (
            <a
              key={link.id}
              className={styles.panelLink}
              href={link.href}
              aria-current={activeSection === link.id ? "true" : undefined}
              onClick={close}
            >
              {link.label}
            </a>
          ))}

          <div className={`${styles.panelLang} ${styles.panelDivider}`}>
            <LanguageSwitch
              label={content.nav.language}
              stacked
              full
              onSelect={close}
            />
          </div>

          <Button
            className={styles.panelCta}
            href={`#${SECTIONS.contact}`}
            variant="teal"
            withArrow
            block
            onClick={close}
          >
            {content.nav.contact}
          </Button>
        </nav>
      ) : null}
    </header>
  );
}
