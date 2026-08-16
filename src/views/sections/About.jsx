import { useContent } from "../../controllers/languageContext.js";
import { CONTACT, MEDIA, SECTIONS, telHref } from "../../models/site.js";
import { Button } from "../components/Button.jsx";
import { Figure } from "../components/Figure.jsx";
import { Icon } from "../components/Icon.jsx";
import styles from "./About.module.css";

export function About() {
  const { about } = useContent();

  return (
    <section
      className={styles.section}
      id={SECTIONS.about}
      aria-labelledby="about-title"
      data-reveal
    >
      <div className={styles.media}>
        <Figure
          className={styles.mediaMain}
          media={MEDIA.aboutMain}
          alt={about.mainImageAlt}
          ratio="4 / 3"
          icon="home"
          glass
        />

        <Figure
          className={styles.mediaInset}
          media={MEDIA.aboutInset}
          alt={about.insetImageAlt}
          ratio="1"
          icon="wrench"
          glass
        />

        {/* Frosted plate floating on the photograph — the one place on the
            page where there is a real image to blur behind the glass. */}
        <p className={styles.badge}>
          <span className={styles.badgeValue} data-numeric>
            {about.badge.value}
          </span>
          <span className={styles.badgeLabel}>{about.badge.label}</span>
        </p>
      </div>

      <div>
        <span className={styles.kicker}>{about.kicker}</span>

        <h2 className={styles.title} id="about-title">
          {about.title} <span className={styles.titleAccent}>{about.titleAccent}</span>
        </h2>

        <p className={styles.body}>{about.body}</p>

        <ul className={styles.points}>
          {about.points.map((point) => (
            <li className={styles.point} key={point}>
              <span className={styles.pointMark}>
                <Icon name="check" size={12} strokeWidth={3} />
              </span>
              {point}
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <Button href={`#${SECTIONS.services}`} variant="ink" withArrow>
            {about.cta}
          </Button>

          <a className={styles.phone} href={telHref()}>
            <span className={styles.phoneIcon}>
              <Icon name="phone" size={18} strokeWidth={2.2} />
            </span>
            <span className={styles.phoneText}>
              <span className={styles.phoneLabel}>{about.questionLabel}</span>
              {/* The number is always Latin digits, left-to-right, in both locales. */}
              <span className={styles.phoneNumber} dir="ltr" data-numeric>
                {CONTACT.phone}
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
