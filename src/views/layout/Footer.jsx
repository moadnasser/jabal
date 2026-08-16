import { useContent } from "../../controllers/languageContext.js";
import { getAllLinks } from "../../models/navigation.js";
import {
  CONTACT,
  SECTIONS,
  SOCIAL_LINKS,
  mailHref,
  telHref,
} from "../../models/site.js";
import { Icon } from "../components/Icon.jsx";
import { Logo } from "../components/Logo.jsx";
import styles from "./Footer.module.css";

export function Footer() {
  const content = useContent();
  const { footer, brand, services, social } = content;
  const links = getAllLinks(content);

  return (
    <footer className={styles.footer} data-surface="dark">
      <div className={styles.columns}>
        {/* Brand */}
        <div className={styles.about}>
          <Logo large onDark />
          <p className={styles.tagline}>{footer.tagline}</p>

          <ul className={styles.social} aria-label={footer.socialLabel}>
            {SOCIAL_LINKS.map((item) => (
              <li key={item.id}>
                <a
                  className={styles.socialLink}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {/* Icon-only link: the glyph carries the whole label. */}
                  <Icon name={item.icon} size={17} title={social[item.id]} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Explore */}
        <nav aria-labelledby="footer-explore">
          <h2 className={styles.columnTitle} id="footer-explore">
            {footer.explore}
          </h2>
          <ul className={styles.list}>
            {links.map((link) => (
              <li key={link.id}>
                <a className={styles.link} href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Services */}
        <nav aria-labelledby="footer-services">
          <h2 className={styles.columnTitle} id="footer-services">
            {footer.servicesTitle}
          </h2>
          <ul className={styles.list}>
            {services.items.map((service) => (
              <li key={service.id}>
                <a className={styles.link} href={`#${SECTIONS.services}`}>
                  {service.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h2 className={styles.columnTitle} id="footer-contact">
            {footer.contactTitle}
          </h2>
          <address className={styles.contactList}>
            <a className={styles.contactLink} href={telHref()} dir="ltr">
              <Icon className={styles.contactIcon} name="phone" size={16} strokeWidth={2.2} />
              <span data-numeric>{CONTACT.phone}</span>
            </a>

            <a className={styles.contactLink} href={mailHref()} dir="ltr">
              <Icon className={styles.contactIcon} name="mail" size={16} strokeWidth={2.2} />
              {CONTACT.email}
            </a>

            <p className={styles.contactItem}>
              <Icon className={styles.contactIcon} name="pin" size={16} strokeWidth={2.2} />
              {brand.address}
            </p>

            <p className={styles.contactItem}>
              <Icon className={styles.contactIcon} name="clock" size={16} strokeWidth={2.2} />
              {footer.hours}
            </p>
          </address>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.bottomText}>{footer.rights}</p>
        <p className={styles.established}>{brand.established}</p>
      </div>
    </footer>
  );
}
