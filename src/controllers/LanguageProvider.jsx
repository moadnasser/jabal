import { useCallback, useEffect, useMemo, useState } from "react";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_CODES,
  detectLocale,
  isSupportedLocale,
  resolveLocale,
} from "../models/content/index.js";
import { LanguageContext } from "./languageContext.js";

const STORAGE_KEY = "jah-lang";

/**
 * Read the visitor's remembered choice. Private browsing and blocked storage
 * both throw on access, so every read and write is guarded.
 */
function readStoredLocale() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isSupportedLocale(stored) ? stored : null;
  } catch {
    return null;
  }
}

function writeStoredLocale(code) {
  try {
    window.localStorage.setItem(STORAGE_KEY, code);
  } catch {
    /* storage unavailable — the choice simply won't outlive the session */
  }
}

/**
 * Owns the one piece of state the whole site pivots on: which language is
 * showing. It also keeps `<html lang>` and `<html dir>` in step, which is what
 * actually drives font selection, logical-property layout, and the
 * pronunciation a screen reader uses.
 */
export function LanguageProvider({ children }) {
  const [code, setCode] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_LOCALE;
    return readStoredLocale() ?? detectLocale(window.navigator?.languages ?? []);
  });

  const locale = resolveLocale(code);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale.code;
    root.dir = locale.dir;
  }, [locale]);

  const setLanguage = useCallback((next) => {
    if (!isSupportedLocale(next)) return;
    setCode(next);
    writeStoredLocale(next);
  }, []);

  const value = useMemo(
    () => ({
      code: locale.code,
      dir: locale.dir,
      isRtl: locale.dir === "rtl",
      content: locale.content,
      /** Every shippable locale, for rendering the switcher. */
      locales: LOCALE_CODES.map((key) => ({
        code: key,
        label: LOCALES[key].label,
        shortLabel: LOCALES[key].shortLabel,
      })),
      setLanguage,
    }),
    [locale, setLanguage],
  );

  return <LanguageContext value={value}>{children}</LanguageContext>;
}
