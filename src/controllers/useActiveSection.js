import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in view so the header can mark the
 * matching link as current — the "you are here" signal a single-page layout
 * otherwise lacks entirely.
 *
 * @param {string[]} ids  section element ids, in document order
 * @param {{ offset?: number }} [options] px hidden behind the sticky header
 * @returns {string | null} the id of the section holding the most viewport
 */
export function useActiveSection(ids, { offset = 100 } = {}) {
  const [activeId, setActiveId] = useState(null);

  // `ids` is a fresh array on every render; key the effect on its contents.
  const key = ids.join("|");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return undefined;

    // Section id → how much of the viewport it currently occupies.
    const coverage = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          coverage.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        }

        let best = null;
        let bestRatio = 0;
        for (const id of ids) {
          const ratio = coverage.get(id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        }

        // `best` is null only when no tracked section is on screen at all —
        // which, since the sections are tall and adjacent, means we are above
        // the first one. Clear the marker there rather than leaving whichever
        // section was last visible looking current.
        setActiveId(best);
      },
      {
        threshold: [0, 0.15, 0.35, 0.6, 0.9],
        rootMargin: `-${offset}px 0px 0px 0px`,
      },
    );

    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, [key, offset, ids]);

  return activeId;
}
