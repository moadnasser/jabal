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
 * Photography. `src` points into /public; when a file is absent the `Figure`
 * view falls back to a branded placeholder, so the layout never collapses.
 * `width`/`height` are the intrinsic pixel sizes and exist to reserve space
 * against layout shift.
 */
export const MEDIA = {
  hero: { src: "/images/hero-steel.png", width: 1400, height: 930 },
  aboutMain: { src: "/images/about-main.png", width: 900, height: 675 },
  aboutInset: { src: "/images/about-inset.png", width: 500, height: 500 },
};

export const FOUNDED_YEAR = 1999;
