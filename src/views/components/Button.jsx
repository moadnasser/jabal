import { Icon } from "./Icon.jsx";
import styles from "./Button.module.css";

/**
 * The site's only button. Renders an `<a>` when given an `href` and a
 * `<button>` otherwise, so a link never masquerades as a control.
 *
 * @param {object} props
 * @param {"teal"|"ink"|"light"|"ghost"} [props.variant]
 * @param {boolean} [props.withArrow]  show the trailing arrow badge
 * @param {boolean} [props.loading]    swap the badge for a spinner and block input
 * @param {boolean} [props.block]      fill the available width
 * @param {string}  [props.href]
 */
export function Button({
  variant = "teal",
  withArrow = false,
  loading = false,
  block = false,
  disabled = false,
  href,
  type = "button",
  className = "",
  onClick,
  children,
  ...rest
}) {
  const showsBadge = withArrow || loading;
  const isInert = loading || disabled;

  const classes = [
    styles.button,
    styles[variant],
    showsBadge && styles.hasBadge,
    block && styles.block,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span>{children}</span>
      {loading ? (
        <span className={styles.spinner} aria-hidden="true" />
      ) : withArrow ? (
        <span className={styles.badge} aria-hidden="true">
          <Icon name="arrowUpRight" size={14} strokeWidth={2.6} />
        </span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <a className={classes} href={href} onClick={onClick} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button
      className={classes}
      type={type}
      /*
       * `aria-disabled` rather than `disabled`: a truly disabled element is
       * removed from the tab order, so disabling the button a keyboard user
       * just activated throws their focus back to <body> — and, in Chrome,
       * scrolls the page to the top. This keeps focus where they left it
       * while still announcing the button as unavailable.
       */
      aria-disabled={isInert || undefined}
      onClick={(event) => {
        if (isInert) {
          event.preventDefault();
          return;
        }
        onClick?.(event);
      }}
      {...rest}
    >
      {content}
    </button>
  );
}
