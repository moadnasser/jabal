import en from "./en.js";
import ar from "./ar.js";

/**
 * Locale registry. Adding a language means adding a dictionary here and
 * nothing else — the controller reads the list, the views read the result.
 */
export const LOCALES = {
  en: { code: "en", dir: "ltr", label: "English", shortLabel: "EN", content: en },
  ar: { code: "ar", dir: "rtl", label: "العربية", shortLabel: "عربي", content: ar },
};

export const LOCALE_CODES = Object.keys(LOCALES);
export const DEFAULT_LOCALE = "en";

/** @returns {boolean} whether `code` names a locale we actually ship. */
export function isSupportedLocale(code) {
  return Object.hasOwn(LOCALES, code);
}

/** Resolve any input — including `null` or junk from storage — to a locale. */
export function resolveLocale(code) {
  return isSupportedLocale(code) ? LOCALES[code] : LOCALES[DEFAULT_LOCALE];
}

/**
 * Pick the best locale for a visitor from their browser's language list,
 * falling back to the default when nothing matches.
 */
export function detectLocale(languages = []) {
  for (const tag of languages) {
    const base = String(tag).toLowerCase().split("-")[0];
    if (isSupportedLocale(base)) return base;
  }
  return DEFAULT_LOCALE;
}

/**
 * Development guard: every locale must expose the same key paths as English.
 * A missing translation is a blank region on the page, which is far harder to
 * spot in review than a console warning at boot.
 */
if (import.meta.env?.DEV) {
  const pathsOf = (value, prefix = "") => {
    if (value === null || typeof value !== "object") return [prefix];
    if (Array.isArray(value)) return [prefix];
    return Object.entries(value).flatMap(([key, child]) =>
      pathsOf(child, prefix ? `${prefix}.${key}` : key),
    );
  };

  const reference = new Set(pathsOf(en));
  for (const code of LOCALE_CODES) {
    if (code === DEFAULT_LOCALE) continue;
    const missing = [...reference].filter(
      (path) => !pathsOf(LOCALES[code].content).includes(path),
    );
    if (missing.length > 0) {
      console.warn(`[content] locale "${code}" is missing keys:`, missing);
    }
  }
}
