import styles from "./SkipLink.module.css";

/** Lets a keyboard user jump the header straight into the page content. */
export function SkipLink({ href, children }) {
  return (
    <a className={styles.skipLink} href={href}>
      {children}
    </a>
  );
}
