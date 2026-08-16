import { useContent } from "../../controllers/languageContext.js";
import { SECTIONS } from "../../models/site.js";
import { Icon } from "./Icon.jsx";
import styles from "./Logo.module.css";

/**
 * The Jabal Al Hadeed wordmark, linking home.
 *
 * "Mountain of Steel" stays in English in both locales — it is the company's
 * own transliteration and part of the mark, so it carries `lang="en"` to keep
 * an Arabic screen reader from attempting it in Arabic.
 *
 * @param {object} props
 * @param {boolean} [props.large]   footer sizing
 * @param {boolean} [props.onDark]  sitting on an ink surface
 * @param {string}  [props.className]
 */
export function Logo({ large = false, onDark = false, className = "" }) {
  const { brand } = useContent();

  const classes = [styles.logo, large && styles.large, onDark && styles.onDark, className]
    .filter(Boolean)
    .join(" ");

  return (
    <a className={classes} href={`#${SECTIONS.top}`}>
      <span className={styles.mark}>
        <Icon name="logo" size={large ? 22 : 21} strokeWidth={2.2} />
      </span>
      <span className={styles.text}>
        <span className={styles.name}>{brand.name}</span>
        <span className={styles.tagline} lang="en">
          {brand.tagline}
        </span>
      </span>
    </a>
  );
}
