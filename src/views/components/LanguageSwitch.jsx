import { useLanguage } from "../../controllers/languageContext.js";
import styles from "./LanguageSwitch.module.css";

/**
 * Switches the site language.
 *
 * @param {object} props
 * @param {boolean} [props.stacked]  full-width buttons, for the mobile panel
 * @param {boolean} [props.full]     spell the language out rather than abbreviate
 * @param {string}  props.label      accessible name for the group
 * @param {() => void} [props.onSelect]  fired after a choice, to close the menu
 */
export function LanguageSwitch({ stacked = false, full = false, label, onSelect }) {
  const { code, locales, setLanguage } = useLanguage();

  const classes = [styles.group, stacked && styles.stacked].filter(Boolean).join(" ");

  return (
    <div className={classes} role="radiogroup" aria-label={label}>
      {locales.map((locale) => {
        const isActive = locale.code === code;
        return (
          <button
            key={locale.code}
            className={styles.option}
            type="button"
            role="radio"
            aria-checked={isActive}
            lang={locale.code}
            onClick={() => {
              setLanguage(locale.code);
              onSelect?.();
            }}
          >
            {full ? locale.label : locale.shortLabel}
          </button>
        );
      })}
    </div>
  );
}
