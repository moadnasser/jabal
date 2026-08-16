import { useContent } from "../../controllers/languageContext.js";
import { SECTIONS } from "../../models/site.js";
import { SectionHeading } from "../components/SectionHeading.jsx";
import styles from "./Brands.module.css";

export function Brands() {
  const { brands } = useContent();

  return (
    <section
      className={styles.section}
      id={SECTIONS.brands}
      aria-labelledby="brands-title"
      data-reveal
    >
      <SectionHeading
        id="brands-title"
        kicker={brands.kicker}
        title={brands.title}
        intro={brands.intro}
      />

      <div className={styles.grid}>
        {brands.items.map((brand) => (
          <article className={styles.card} key={brand.id}>
            <div className={styles.cardHead}>
              {/* Manufacturer names stay Latin-script and left-to-right. */}
              <h3 className={styles.name} dir="ltr" lang="en">
                {brand.name}
              </h3>
              <span className={styles.origin}>{brand.origin}</span>
            </div>
            <p className={styles.body}>{brand.body}</p>
          </article>
        ))}
      </div>

      <p className={styles.note}>
        {brands.note}{" "}
        <a className={styles.noteLink} href={`#${SECTIONS.contact}`}>
          {brands.askCta}
        </a>
      </p>
    </section>
  );
}
