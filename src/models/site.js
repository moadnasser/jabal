import heroSteelLarge from "../assets/hero-steel-1400.jpg";
import heroSteelSmall from "../assets/hero-steel-760.jpg";
import aboutMainLarge from "../assets/about-main-900.jpg";
import aboutMainSmall from "../assets/about-main-600.jpg";
import aboutInsetImage from "../assets/about-inset-500.jpg";
import { LQIP } from "../assets/lqip.js";

/**
 * Site model — the facts about the business that do not change with language.
 * Phone numbers, addresses, section ids and social handles all live here so a
 * view never has to know how a `tel:` href is assembled.
 */

export const CONTACT = {
  phone: "+218 91 049 0777",
  email: "sales@jabal.tools",
  mapUrl: "https://maps.google.com/?q=Dawa+Islamia+Street+Tripoli+Libya",
};

/** Strip everything a dialer cannot use. */
export function telHref(phone = CONTACT.phone) {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

export function mailHref(email = CONTACT.email) {
  return `mailto:${email}`;
}

export function whatsappHref(phone = CONTACT.phone) {
  return `https://wa.me/${phone.replace(/\D/g, "")}`;
}

/**
 * Section ids, in document order. `useActiveSection` walks this list to work
 * out which nav item to mark current, so the order matters.
 */
export const SECTIONS = {
  top: "top",
  about: "about",
  services: "services",
  brands: "brands",
  faq: "faq",
  contact: "contact",
};

/** The four nav destinations, in the order the header renders them. */
export const NAV_SECTIONS = [
  SECTIONS.services,
  SECTIONS.about,
  SECTIONS.brands,
  SECTIONS.faq,
];

/**
 * Social accounts. `icon` keys into the icon registry; `href` is the real
 * destination — placeholder profiles point at WhatsApp, the one channel the
 * business actually publishes.
 */
export const SOCIAL_LINKS = [
  { id: "facebook", icon: "facebook", href: "https://facebook.com/" },
  { id: "instagram", icon: "instagram", href: "https://instagram.com/" },
  { id: "linkedin", icon: "linkedin", href: "https://linkedin.com/" },
  { id: "whatsapp", icon: "whatsapp", href: whatsappHref() },
];

/**
 * Photography.
 *
 * Derived from the original design exports in /assets by
 * `scripts/build-images.mjs`, which emits the responsive JPEGs and the `lqip`
 * thumbnails imported above. Each entry is passed whole to `Figure`:
 *
 * - `src` / `srcSet` / `sizes` — let the browser pick a width, so a phone
 *   never downloads the desktop file.
 * - `width` / `height` — the intrinsic pixel size, which reserves the box
 *   before anything loads and keeps cumulative layout shift at zero.
 * - `lqip` — a ~20px thumbnail as a data URI, painted blurred behind the
 *   photo until it decodes.
 */
export const MEDIA = {
  hero: {
    src: heroSteelLarge,
    srcSet: `${heroSteelSmall} 760w, ${heroSteelLarge} 1400w`,
    sizes: "100vw",
    width: 1400,
    height: 930,
    lqip: LQIP.hero,
  },
  aboutMain: {
    src: aboutMainLarge,
    srcSet: `${aboutMainSmall} 600w, ${aboutMainLarge} 900w`,
    sizes: "(max-width: 900px) 92vw, 45vw",
    width: 900,
    height: 675,
    lqip: LQIP.aboutMain,
  },
  aboutInset: {
    src: aboutInsetImage,
    width: 500,
    height: 500,
    lqip: LQIP.aboutInset,
  },
};

export const FOUNDED_YEAR = 1999;
