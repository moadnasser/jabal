/**
 * Icon registry — SVG path data only, no markup.
 *
 * Every glyph is drawn on a 24×24 grid with a 2px nominal stroke so the whole
 * set shares one optical weight. The `Icon` view turns an entry into an
 * <svg>; nothing else in the app should inline path data.
 */

/** @typedef {{ d: string | string[], fill?: boolean }} IconDef */

/** @type {Record<string, IconDef>} */
export const ICONS = {
  // Brand
  logo: { d: "m7 4 4 8 4-4 6 12H2L7 4z" },

  // Pillars
  award: { d: "M12 2l2.4 5 5.6.8-4 3.9 1 5.5-5-2.7-5 2.7 1-5.5-4-3.9 5.6-.8L12 2z" },
  shield: { d: "M12 3l8 3v6c0 5-3.4 8.3-8 10-4.6-1.7-8-5-8-10V6l8-3z" },
  card: { d: "M3 7h18v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7zm0 4h18" },
  globe: {
    d: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm-9 9h18M12 3c2.5 2.5 3.8 5.6 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.6-3.8-9S9.5 5.5 12 3z",
  },

  // Services
  home: { d: "M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5zM9.5 21v-8h5v8" },
  wrench: {
    d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-8 8l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 8-8l-3.8 3.8z",
  },
  layers: { d: "M12 2.5 3 7l9 4.5L21 7l-9-4.5zM3 12l9 4.5L21 12M3 17l9 4.5L21 17" },
  bolt: { d: "M13 2 4 14h7l-1 8 10-12h-7l1-8z" },
  grid: { d: "M3 3h18v18H3V3zm0 6h18M3 15h18M9 3v18M15 3v18" },
  drop: { d: "M12 3c2.5 3 7 6.5 7 11a7 7 0 0 1-14 0c0-4.5 4.5-8 7-11z" },

  // Contact
  phone: {
    d: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.1 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z",
  },
  mail: { d: ["M2 4h20v16H2z", "m22 7-9 5.7a2 2 0 0 1-2 0L2 7"] },
  pin: { d: ["M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z", "M15 10a3 3 0 1 0-6 0 3 3 0 0 0 6 0z"] },
  clock: { d: ["M21 12a9 9 0 1 0-18 0 9 9 0 0 0 18 0z", "M12 7v5l3 2"] },

  // UI
  arrowUpRight: { d: ["M7 17 17 7", "M8 7h9v9"] },
  check: { d: "m5 13 4 4L19 7" },
  menu: { d: "M4 7h16M4 12h16M4 17h16" },
  close: { d: "M5 5l14 14M19 5 5 19" },
  alert: { d: ["M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z", "M12 8v5", "M12 16.5v.01"] },

  // Social
  facebook: { d: "M15 3h-2a4 4 0 0 0-4 4v3H6v4h3v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h2V3z" },
  instagram: {
    d: ["M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z", "M16 12a4 4 0 1 0-8 0 4 4 0 0 0 8 0z", "M17.5 6.5v.01"],
  },
  linkedin: { d: "M6 9v12M6 4v.01M11 21V9m0 4c0-2.2 1.8-4 4-4s4 1.8 4 4v8" },
  whatsapp: { d: ["M21 12a9 9 0 0 1-13.3 7.9L3 21l1.2-4.6A9 9 0 1 1 21 12z", "M9 9c0 3.3 2.7 6 6 6"] },
};

/**
 * Look an icon up by name.
 * @param {string} name
 * @returns {IconDef | null} `null` when unknown, so a typo degrades to a
 *   missing glyph rather than a render crash.
 */
export function getIcon(name) {
  return ICONS[name] ?? null;
}
