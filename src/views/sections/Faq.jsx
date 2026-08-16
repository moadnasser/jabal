import { useContent } from "../../controllers/languageContext.js";
import { SECTIONS } from "../../models/site.js";
import styles from "./Faq.module.css";

export function Faq() {
  const { faq } = useContent();

  return (
    <section
      className={styles.section}
      id={SECTIONS.faq}
      aria-labelledby="faq-title"
      data-reveal
    >
      <div>
        <span className={styles.kicker}>{faq.kicker}</span>
        <h2 className={styles.title} id="faq-title">
          {faq.title}
        </h2>
        <p className={styles.intro}>{faq.intro}</p>
      </div>

      <dl className={styles.list}>
        {faq.items.map((item) => (
          <div className={styles.item} key={item.id}>
            <dt className={styles.question}>{item.q}</dt>
            <dd className={styles.answer}>{item.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
