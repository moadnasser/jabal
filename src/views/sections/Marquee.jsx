import { useContent } from "../../controllers/languageContext.js";
import styles from "./Marquee.module.css";

/** Decorative scrolling band between the stats and the services panel. */
export function Marquee() {
  const { marquee } = useContent();

  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={styles.track}>
        <span className={styles.text}>{marquee}</span>
        <span className={styles.text}>{marquee}</span>
      </div>
    </div>
  );
}
