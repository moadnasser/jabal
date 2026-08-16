import { getIcon } from "../../models/icons.js";

/**
 * Renders a glyph from the icon registry.
 *
 * Icons are decorative by default and hidden from assistive tech. Pass a
 * `title` only when the icon is the sole carrier of meaning — an icon-only
 * link, say — and it becomes a labelled `img` instead.
 *
 * @param {object} props
 * @param {string} props.name        key in the icon registry
 * @param {number} [props.size]      rendered px, matching the token scale
 * @param {number} [props.strokeWidth]
 * @param {string} [props.title]     accessible name; omit for decoration
 * @param {string} [props.className]
 */
export function Icon({ name, size = 20, strokeWidth = 2, title, className }) {
  const icon = getIcon(name);
  if (!icon) return null;

  const paths = Array.isArray(icon.d) ? icon.d : [icon.d];
  const isLabelled = Boolean(title);

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={isLabelled ? "img" : undefined}
      aria-hidden={isLabelled ? undefined : true}
      focusable="false"
    >
      {isLabelled ? <title>{title}</title> : null}
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
