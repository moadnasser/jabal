import { useCallback, useState } from "react";
import { Icon } from "./Icon.jsx";
import styles from "./Figure.module.css";

/**
 * A photograph in a rounded glass frame.
 *
 * Three things happen behind one `media` prop:
 *
 * 1. **Responsive loading** — `srcSet`/`sizes` come straight from the model,
 *    so a phone fetches the 760px file rather than the 1400px one.
 * 2. **Blur-up** — the media's LQIP thumbnail is painted, scaled and blurred,
 *    behind the real image. The frame is filled with the photograph's own
 *    colours from the first paint, and the sharp image crossfades in over it.
 * 3. **Glass edge** — an inset rim and a raking highlight, so the photo reads
 *    as sitting under a pane rather than being pasted onto the page.
 *
 * If the file 404s, the frame degrades to a branded placeholder instead of
 * collapsing.
 *
 * @param {object} props
 * @param {import("../../models/site.js").MEDIA[keyof object]} props.media
 * @param {string} props.alt          "" for purely decorative imagery
 * @param {string} [props.ratio]      CSS aspect-ratio override, e.g. "4 / 3"
 * @param {boolean} [props.priority]  hero imagery: eager + high fetch priority
 * @param {boolean} [props.glass]     add the glass rim and highlight
 * @param {string} [props.icon]       glyph for the placeholder
 * @param {string} [props.placeholderLabel]
 * @param {string} [props.className]
 */
export function Figure({
  media,
  alt = "",
  ratio,
  priority = false,
  glass = false,
  icon = "logo",
  placeholderLabel,
  className = "",
}) {
  const [status, setStatus] = useState("loading");

  /*
   * A cached image can finish decoding before React attaches onLoad, which
   * would strand it at opacity 0. Checking `complete` on the ref covers that.
   */
  const imageRef = useCallback((node) => {
    if (node?.complete && node.naturalWidth > 0) setStatus("loaded");
  }, []);

  const classes = [
    styles.figure,
    glass && styles.glass,
    status === "loaded" && styles.isLoaded,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const style = {
    ...(ratio ? { aspectRatio: ratio } : null),
    ...(media.lqip ? { "--lqip": `url("${media.lqip}")` } : null),
  };

  if (status === "failed") {
    return (
      <div className={classes} style={style}>
        <div
          className={styles.placeholder}
          role={alt ? "img" : undefined}
          aria-label={alt || undefined}
        >
          <Icon className={styles.placeholderIcon} name={icon} size={40} strokeWidth={1.6} />
          {placeholderLabel ? (
            <p className={styles.placeholderLabel}>{placeholderLabel}</p>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className={classes} style={style}>
      {media.lqip ? <div className={styles.blurUp} aria-hidden="true" /> : null}

      <img
        className={styles.image}
        ref={imageRef}
        src={media.src}
        srcSet={media.srcSet}
        sizes={media.sizes}
        alt={alt}
        width={media.width}
        height={media.height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("failed")}
      />

      {glass ? <span className={styles.sheen} aria-hidden="true" /> : null}
    </div>
  );
}
