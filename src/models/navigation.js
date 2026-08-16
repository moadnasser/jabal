import { NAV_SECTIONS, SECTIONS } from "./site.js";

/**
 * Builds the navigation menus from a content dictionary.
 *
 * Keeping this here means the header, the mobile panel and the footer all
 * derive their links from one place — add a section to `NAV_SECTIONS` and it
 * appears in all three, correctly translated, with nothing else to update.
 */

/** The four section links the desktop header shows. */
export function getPrimaryLinks(content) {
  return NAV_SECTIONS.map((id) => ({
    id,
    href: `#${id}`,
    label: content.nav[id],
  }));
}

/**
 * The complete menu — home and contact bracketing the section links. Used by
 * the mobile panel and the footer, where there is room for the full set.
 */
export function getAllLinks(content) {
  return [
    { id: SECTIONS.top, href: `#${SECTIONS.top}`, label: content.nav.home },
    ...getPrimaryLinks(content),
    { id: SECTIONS.contact, href: `#${SECTIONS.contact}`, label: content.nav.contact },
  ];
}
