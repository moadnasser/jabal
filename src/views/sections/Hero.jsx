import { useContent } from "../../controllers/languageContext.js";
import { MEDIA, SECTIONS } from "../../models/site.js";
import { Button } from "../components/Button.jsx";
import { Figure } from "../components/Figure.jsx";
import styles from "./Hero.module.css";

export function Hero() {
  const { hero } = useContent();

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <Figure
        className={styles.media}
        src={MEDIA.hero.src}
        width={MEDIA.hero.width}
        height={MEDIA.hero.height}
        alt=""
        priority
        icon="logo"
      />
      <div className={styles.scrim} />

      <div className={styles.panel}>
        <span className={styles.badge}>{hero.badge}</span>

        <h1 className={styles.title} id="hero-title">
          {hero.titleLines.map((line) => (
            <span className={styles.titleLine} key={line}>
              {line}
            </span>
          ))}
        </h1>

        <p className={styles.subtitle}>{hero.subtitle}</p>

        <div className={styles.actions}>
          <Button href={`#${SECTIONS.contact}`} variant="light" withArrow>
            {hero.primaryCta}
          </Button>
          <Button href={`#${SECTIONS.brands}`} variant="ghost">
            {hero.secondaryCta}
          </Button>
        </div>
      </div>
    </section>
  );
}
