import styles from "./SectionHeading.module.css";

/**
 * The kicker + display title + intro block that opens most sections.
 *
 * Centralising it keeps the type scale, the accent colour and the dark-surface
 * treatment identical everywhere, which is most of what makes the page read as
 * one design rather than six.
 *
 * @param {object} props
 * @param {string} props.kicker
 * @param {string} props.title
 * @param {string} [props.titleAccent]  trailing clause, rendered in the accent
 * @param {string} [props.intro]
 * @param {boolean} [props.onDark]      sitting on an ink surface
 * @param {boolean} [props.stacked]     intro under the title, not beside it
 * @param {string} [props.id]           for the section's aria-labelledby
 */
export function SectionHeading({
  kicker,
  title,
  titleAccent,
  intro,
  onDark = false,
  stacked = false,
  id,
}) {
  const classes = [styles.header, onDark && styles.onDark, stacked && styles.stacked]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <div className={styles.headings}>
        <span className={styles.kicker}>{kicker}</span>
        <h2 className={styles.title} id={id}>
          {title}
          {titleAccent ? <> <span className={styles.accent}>{titleAccent}</span></> : null}
        </h2>
      </div>
      {intro ? <p className={styles.intro}>{intro}</p> : null}
    </div>
  );
}
