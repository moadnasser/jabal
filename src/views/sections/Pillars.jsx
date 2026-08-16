import { useContent } from "../../controllers/languageContext.js";
import { Icon } from "../components/Icon.jsx";
import styles from "./Pillars.module.css";

/** The four trust promises directly under the hero. */
export function Pillars() {
  const { pillars } = useContent();

  return (
    <section className={styles.grid} aria-label={pillars.label} data-reveal>
      {pillars.items.map((pillar) => (
        <article className={styles.card} key={pillar.id}>
          <span className={styles.icon}>
            <Icon name={pillar.icon} size={22} />
          </span>
          <h3 className={styles.title}>{pillar.title}</h3>
          <p className={styles.body}>{pillar.body}</p>
        </article>
      ))}
    </section>
  );
}
