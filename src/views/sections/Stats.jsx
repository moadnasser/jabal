import { useContent } from "../../controllers/languageContext.js";
import styles from "./Stats.module.css";

export function Stats() {
  const { stats } = useContent();

  return (
    <section className={styles.section} aria-label={stats.label} data-reveal>
      {stats.items.map((stat) => (
        <div key={stat.id}>
          <p className={styles.value} data-numeric>
            {stat.value}
          </p>
          <p className={styles.label}>{stat.label}</p>
        </div>
      ))}
    </section>
  );
}
