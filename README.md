# Jabal Al Hadeed

Bilingual (English / Arabic) marketing site for Jabal Al Hadeed — Libya's
supplier of power tools and building materials since 1999.

Built with React 19 + Vite. No UI framework, no CSS framework: plain CSS
Modules over a design-token layer.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run lint
```

## Architecture

The code is laid out as **MVC**. The rule that keeps it honest: dependencies
point one way only — views import controllers, controllers import models, and
models import nothing from either.

```
src/
├── models/          — data and business rules. No React.
│   ├── site.js            business facts: phone, email, section ids, media
│   ├── navigation.js      derives the menus from a content dictionary
│   ├── icons.js           SVG path registry
│   ├── contactMessage.js  enquiry shape, validation rules, delivery
│   └── content/           en.js · ar.js · index.js (locale registry)
│
├── controllers/     — state and behaviour. Hooks and one provider.
│   ├── languageContext.js   the context + useLanguage / useContent
│   ├── LanguageProvider.jsx owns the active locale, syncs <html lang|dir>
│   ├── useContactForm.js    values, errors, submission, focus management
│   ├── useMobileNav.js      open state, Escape, breakpoint, scroll lock
│   ├── useActiveSection.js  scroll-spy for the header's current marker
│   ├── useHashScroll.js     honours "#services" on first load
│   └── useReveal.js         scroll-triggered entrance animation
│
├── views/           — markup and styling. One .module.css per component.
│   ├── components/  Button · Field · Figure · Icon · Logo · SkipLink ·
│   │                SectionHeading · LanguageSwitch
│   ├── sections/    Hero · Pillars · About · Stats · Marquee ·
│   │                Services · Brands · Faq · Contact
│   ├── layout/      Navbar · Footer
│   └── pages/       HomePage — composition root, section order
│
├── styles/
│   ├── tokens.css   colour, type, space, radius, elevation, motion, layers
│   └── base.css     reset, focus, screen-reader utilities, reduced motion
│
└── App.jsx          LanguageProvider → HomePage
```

### Where to make a change

| Task | File |
|---|---|
| Reword copy, fix a translation | `models/content/en.js` · `ar.js` |
| Change phone, email, address | `models/site.js` |
| Add a language | a new dictionary + one entry in `content/index.js` |
| Add a nav section | `SECTIONS` + `NAV_SECTIONS` in `models/site.js` |
| Change a colour, size or spacing | `styles/tokens.css` |
| Wire the contact form to a backend | `sendContactMessage` in `models/contactMessage.js` |

## Content and localisation

Both locales live in `models/content/`, keyed identically. In development a
guard in `content/index.js` warns on any key English has that a translation is
missing, so a gap surfaces in the console rather than as a blank region.

`LanguageProvider` writes `lang` and `dir` onto `<html>`. That single move
drives the typeface (Manrope for Latin, Cairo for Arabic), the looser Arabic
leading, and the whole RTL mirror — the layout uses CSS logical properties
(`margin-inline`, `inset-inline-start`) throughout, so nothing needs a
direction-specific override. The choice persists to `localStorage`, and a
first-time visitor gets their browser's preference.

## Photography

```
assets/*.png        original design exports — source of truth, never shipped
   │  node scripts/build-images.mjs
   ▼
src/assets/*.jpg    responsive derivatives, imported and hashed by Vite
src/assets/lqip.js  generated 20px thumbnails as data URIs
```

The originals are 4.3 MB of lossless PNG. `scripts/build-images.mjs` derives a
responsive JPEG pair per photo plus an LQIP thumbnail, taking the shipped set
to 910 KB — and a phone only pulls the small variants, about 300 KB. Re-run it
when the source photography changes; the outputs are committed. It shells out
to macOS `sips`, so it is Mac-only.

`MEDIA` in `models/site.js` hands each entry to `Figure` whole, which gives
three things at once:

- **Responsive loading** — `srcSet`/`sizes` let the browser pick a width.
- **Blur-up** — the LQIP is painted scaled and blurred behind the photo, so
  the frame carries the image's own colours from the first paint and the sharp
  version crossfades in over it.
- **Glass edge** — an inset rim and a raking highlight, so the photo reads as
  sitting under a pane. Opt in with `glass`.

`width`/`height` are always declared, so the box is reserved before anything
loads and cumulative layout shift stays at zero. If a file 404s, `Figure`
degrades to a branded ink-to-teal placeholder rather than collapsing.

The one place a real backdrop blur is used is the About section's "25+ years"
plate, which floats on the photograph — `backdrop-filter` there is blurring
something genuine. It carries an ink base under the white so its text keeps
contrast wherever it sits, and an opaque `@supports` fallback for engines
without `backdrop-filter`.

## Accessibility

Carried deliberately, not incidentally:

- Skip link to main content; visible focus rings everywhere, switched to a
  light ring on ink surfaces
- `aria-current` on the nav item for the section in view (scroll-spy)
- Real labels bound to inputs, errors beside the field they belong to and
  wired through `aria-describedby`; the first invalid field takes focus on a
  failed submit
- The submit button uses `aria-disabled` rather than `disabled` while in
  flight — disabling a focused element drops focus to `<body>` and, in
  Chrome, scrolls the page to the top
- Submission outcome announced via a permanently-mounted `aria-live` region,
  which also takes focus
- Icon-only links (social) carry an accessible name; decorative icons are
  hidden from assistive tech
- All text meets WCAG AA against its own background, in both themes of the
  page (paper and ink)
- `prefers-reduced-motion` stops the marquee, the hero entrance and the
  scroll reveals; content is never hidden behind an animation

## Responsive

Breakpoints at 560px and 900px. Below 900 the section links collapse behind a
menu button and the about-collage inset is dropped; below 560 the language
pill and header CTA move into that menu, hero actions go full-width, and the
stats grid drops from four columns to two.
# jabal
