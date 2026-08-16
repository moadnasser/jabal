import { useCallback, useEffect, useState } from "react";

/** Matches the `--breakpoint-nav` switch in Navbar.module.css. */
const DESKTOP_QUERY = "(min-width: 901px)";

/**
 * Drives the mobile navigation panel.
 *
 * Beyond open/closed it handles the three things a hand-rolled menu usually
 * forgets: Escape closes it, growing past the desktop breakpoint closes it
 * (otherwise the panel lingers invisibly and traps focus), and the page behind
 * it stops scrolling while it is open.
 */
export function useMobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((open) => !open), []);

  // Escape closes the panel from anywhere.
  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  // Crossing up into the desktop layout retires the panel.
  useEffect(() => {
    if (!isOpen) return undefined;

    const query = window.matchMedia(DESKTOP_QUERY);
    const onChange = (event) => {
      if (event.matches) close();
    };

    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, [isOpen, close]);

  // Freeze the page behind the panel.
  useEffect(() => {
    if (!isOpen) return undefined;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isOpen]);

  return { isOpen, toggle, close };
}
