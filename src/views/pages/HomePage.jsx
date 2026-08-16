import { useLanguage } from "../../controllers/languageContext.js";
import { useActiveSection } from "../../controllers/useActiveSection.js";
import { useHashScroll } from "../../controllers/useHashScroll.js";
import { useReveal } from "../../controllers/useReveal.js";
import { NAV_SECTIONS, SECTIONS } from "../../models/site.js";
import { SkipLink } from "../components/SkipLink.jsx";
import { Footer } from "../layout/Footer.jsx";
import { Navbar } from "../layout/Navbar.jsx";
import { About } from "../sections/About.jsx";
import { Brands } from "../sections/Brands.jsx";
import { Contact } from "../sections/Contact.jsx";
import { Faq } from "../sections/Faq.jsx";
import { Hero } from "../sections/Hero.jsx";
import { Marquee } from "../sections/Marquee.jsx";
import { Pillars } from "../sections/Pillars.jsx";
import { Services } from "../sections/Services.jsx";
import { Stats } from "../sections/Stats.jsx";
import styles from "./HomePage.module.css";

/**
 * The marketing page.
 *
 * This is the composition root for the view layer: it owns nothing but the
 * order of the sections and the two page-wide behaviours — scroll-spy for the
 * header's current-section marker, and the scroll-reveal pass.
 */
export function HomePage() {
  const { code, content } = useLanguage();

  const activeSection = useActiveSection(NAV_SECTIONS);

  // Re-scan for reveal targets whenever the language re-renders the page.
  useReveal(code);

  // Land on the right section when arriving from a shared "#services" link.
  useHashScroll();

  return (
    <>
      <SkipLink href={`#${SECTIONS.top}`}>{content.nav.skipToContent}</SkipLink>

      <Navbar activeSection={activeSection} />

      <main className={styles.main} id={SECTIONS.top}>
        <Hero />
        <Pillars />
        <About />
        <Stats />
        <Marquee />
        <Services />
        <Brands />
        <Faq />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
