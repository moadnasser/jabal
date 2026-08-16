import { useEffect } from "react";

/**
 * Fades sections in as they scroll into view.
 *
 * The elements opt in by carrying `data-reveal`; this hook flips the attribute
 * to `"in"` once each crosses the threshold and then stops watching it —
 * reveals never replay on the way back up. Under `prefers-reduced-motion` the
 * CSS already renders `[data-reveal]` fully visible, so the observer is simply
 * never created.
 *
 * @param {unknown} [resetKey] change this to re-scan the DOM — the page passes
 *   the active locale, since switching language re-renders every section.
 */
export function useReveal(resetKey) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const targets = document.querySelectorAll("[data-reveal]");

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      for (const target of targets) target.setAttribute("data-reveal", "in");
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-reveal", "in");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    for (const target of targets) {
      // Anything already revealed stays revealed across a language switch.
      if (target.getAttribute("data-reveal") === "in") continue;
      observer.observe(target);
    }

    return () => observer.disconnect();
  }, [resetKey]);
}
