import { useEffect } from "react";

/**
 * Honours a `#section` in the URL on first load.
 *
 * The browser tries to scroll to the fragment as soon as the document is
 * parsed — which, for a client-rendered app, is before any section exists. By
 * the time React has mounted the page the attempt has already failed, leaving
 * a shared link pointing at the top of the page instead of the section it
 * named. Re-running the jump once after mount fixes that.
 *
 * Scrolling is instant rather than smooth: the visitor asked for a specific
 * section, and animating there from the top is a delay, not a transition.
 */
export function useHashScroll() {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Wait a frame so layout has settled after the first paint.
    const frame = requestAnimationFrame(() => {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "instant", block: "start" });
    });

    return () => cancelAnimationFrame(frame);
  }, []);
}
