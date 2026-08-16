import { createContext, useContext } from "react";

/**
 * The language context and its accessors.
 *
 * Kept apart from the provider component so this module exports only hooks —
 * mixing component and non-component exports in one file breaks React Fast
 * Refresh, which is what the `react-refresh/only-export-components` rule
 * guards against.
 *
 * @typedef {object} LanguageValue
 * @property {string} code
 * @property {"ltr" | "rtl"} dir
 * @property {boolean} isRtl
 * @property {object} content
 * @property {{ code: string, label: string, shortLabel: string }[]} locales
 * @property {(code: string) => void} setLanguage
 */

/** @type {import("react").Context<LanguageValue | null>} */
export const LanguageContext = createContext(null);

/**
 * Access the active locale. Throws outside the provider rather than silently
 * rendering an empty page.
 * @returns {LanguageValue}
 */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside a <LanguageProvider>");
  }
  return context;
}

/** Shorthand for the common case of only needing the dictionary. */
export function useContent() {
  return useLanguage().content;
}
