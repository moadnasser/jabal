import { useContent } from "../../controllers/languageContext.js";
import { SECTIONS } from "../../models/site.js";
import { Icon } from "../components/Icon.jsx";
import { SectionHeading } from "../components/SectionHeading.jsx";
import styles from "./Services.module.css";

export function Services() {
  const { services } = useContent();

  return (
    <section
      className={styles.section}
      id={SECTIONS.services}
      aria-labelledby="services-title"
      data-surface="dark"
      data-reveal
    >
      <SectionHeading
        id="services-title"
        kicker={services.kicker}
        title={services.title}
        titleAccent={services.titleAccent}
        intro={services.intro}
        onDark
      />

      <div className={styles.grid}>
        {services.items.map((service) => (
          <article className={styles.card} key={service.id}>
            <span className={styles.icon}>
              <Icon name={service.icon} size={21} />
            </span>
            <h3 className={styles.title}>{service.name}</h3>
            <p className={styles.body}>{service.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
