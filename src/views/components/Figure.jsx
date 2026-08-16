import { useState } from "react";
import { Icon } from "./Icon.jsx";
import styles from "./Figure.module.css";

/**
 * A photograph in a rounded frame, with a designed fallback.
 *
 * The project's photography is supplied separately; until a file lands at the
 * path in `MEDIA`, this renders a branded placeholder at exactly the same
 * dimensions. Dropping the real image into /public is therefore a file copy
 * with no code change, and no layout shift either way.
 *
 * @param {object} props
 * @param {string} props.src
 * @param {string} props.alt          "" for purely decorative imagery
 * @param {number} props.width        intrinsic px, to reserve space
 * @param {number} props.height
 * @param {string} [props.ratio]      CSS aspect-ratio override, e.g. "4 / 3"
 * @param {boolean} [props.priority]  hero imagery: eager + high fetch priority
 * @param {string} [props.icon]       glyph for the placeholder
 * @param {string} [props.placeholderLabel]
 * @param {string} [props.className]
 */
export function Figure({
  src,
  alt = "",
  width,
  height,
  ratio,
  priority = false,
  icon = "logo",
  placeholderLabel,
  className = "",
}) {
  const [hasFailed, setHasFailed] = useState(false);

  const style = ratio ? { aspectRatio: ratio } : undefined;
  const classes = [styles.figure, className].filter(Boolean).join(" ");

  return (
    <div className={classes} style={style}>
      {hasFailed ? (
        <div className={styles.placeholder} role={alt ? "img" : undefined} aria-label={alt || undefined}>
          <Icon className={styles.placeholderIcon} name={icon} size={40} strokeWidth={1.6} />
          {placeholderLabel ? (
            <p className={styles.placeholderLabel}>{placeholderLabel}</p>
          ) : null}
        </div>
      ) : (
        <img
          className={styles.image}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : "auto"}
          onError={() => setHasFailed(true)}
        />
      )}
    </div>
  );
}
