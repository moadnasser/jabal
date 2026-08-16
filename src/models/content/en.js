/**
 * English content. The shape here is the contract every locale must satisfy —
 * `content/index.js` asserts it in development.
 */
const en = {
  brand: {
    name: "Jabal Al Hadeed",
    tagline: "Mountain of Steel",
    established: "Est. 1999 — Libya",
    address: "Dawa Islamia Street, Tripoli",
  },

  nav: {
    home: "Home",
    services: "Services",
    about: "About",
    brands: "Brands",
    faq: "FAQ",
    contact: "Get in touch",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    skipToContent: "Skip to main content",
    language: "Language",
    primaryNavLabel: "Primary",
    footerNavLabel: "Footer",
  },

  hero: {
    badge: "The home of power tools & building materials",
    titleLines: ["From foundation to finish,", "we’ve got you covered."],
    subtitle:
      "For twenty-five years Jabal Al Hadeed has supplied Libya’s builders — homeowners and contractors alike — with quality tools, honest advice, and warranties we stand behind.",
    primaryCta: "Contact us",
    secondaryCta: "Browse the brands",
    imageAlt: "Steel framework rising on a Jabal Al Hadeed supplied construction site",
  },

  pillars: {
    label: "What we promise",
    items: [
      {
        id: "record",
        icon: "award",
        title: "Proven track record",
        body: "Over two decades helping clients get the best prices and the best quality — since 1999.",
      },
      {
        id: "warranty",
        icon: "shield",
        title: "Warranty on products",
        body: "Up to one year of comprehensive coverage on most of what we sell.",
      },
      {
        id: "installments",
        icon: "card",
        title: "Pay in installments",
        body: "Split any purchase into up to five payments with Libya’s most trusted banks.",
      },
      {
        id: "imported",
        icon: "globe",
        title: "Imported worldwide",
        body: "Products brought in from more than ten countries, chosen for durability.",
      },
    ],
  },

  about: {
    kicker: "Who we are",
    title: "We’ve worked for you",
    titleAccent: "since 1999.",
    body: "Jabal Al Hadeed began as a single hardware store in Tripoli and grew into one of Libya’s most trusted suppliers of power tools and building materials. We serve homeowners finishing a room and contractors finishing a tower — with the same stock, the same prices and the same advice.",
    points: [
      "Warranties on the majority of products",
      "Spare parts kept in stock for easy maintenance",
      "Expert staff who know the trade, not just the shelf",
    ],
    cta: "Know more",
    questionLabel: "Have a question?",
    badge: { value: "25+", label: "Years in business" },
    mainImageAlt:
      "Steel gantries and walkways inside a heavy industrial plant, lit amber from below",
    insetImageAlt: "Overhead crane hooks hanging in a hazy steel mill hall",
  },

  stats: {
    label: "By the numbers",
    items: [
      { id: "years", value: "25", label: "Years in business" },
      { id: "satisfaction", value: "95%", label: "Customer satisfaction" },
      { id: "products", value: "5,000+", label: "Products in stock" },
      { id: "staff", value: "50+", label: "Qualified specialists" },
    ],
  },

  marquee: "Tools · Materials · Pumps · Safety · ",

  services: {
    kicker: "Our services",
    title: "Everything a build needs,",
    titleAccent: "under one roof.",
    intro:
      "From the first slab to the last light switch — tools and materials for every trade, imported from more than ten countries.",
    items: [
      {
        id: "renovation",
        icon: "home",
        name: "Renovation tools",
        body: "Top-quality tools for every renovation, big or small.",
      },
      {
        id: "plumbing",
        icon: "wrench",
        name: "Plumbing tools",
        body: "The essentials for every plumbing job, done right.",
      },
      {
        id: "drywall",
        icon: "layers",
        name: "Drywall tools",
        body: "Precision tools for flawless drywall work.",
      },
      {
        id: "electrical",
        icon: "bolt",
        name: "Electrical tools",
        body: "Reliable tools for every electrical task, safely.",
      },
      {
        id: "flooring",
        icon: "grid",
        name: "Flooring tools",
        body: "Perfect finishes for tile, wood and stone floors.",
      },
      {
        id: "pumps",
        icon: "drop",
        name: "Water pumps",
        body: "Pumps and spare parts for home, farm and industry.",
      },
    ],
  },

  brands: {
    kicker: "The brands",
    title: "Fifty brands and counting",
    intro:
      "We stock only reputable manufacturers, chosen for durability and real after-sales support.",
    items: [
      {
        id: "intex",
        name: "Intex",
        origin: "Tools",
        body: "Durable, innovative tools for professionals and DIY hands alike.",
      },
      {
        id: "finder",
        name: "Finder",
        origin: "Libya favourite",
        body: "A wide range of dependable tools at fair prices.",
      },
      {
        id: "pentax",
        name: "Pentax",
        origin: "Italy",
        body: "High-performance water pumps built on reliability.",
      },
      {
        id: "shimge",
        name: "Shimge",
        origin: "China",
        body: "Pumps for residential, agricultural and industrial needs.",
      },
      {
        id: "crown",
        name: "Crown",
        origin: "Hardware",
        body: "Outperform, outlast — practical tools for hard work.",
      },
      {
        id: "redwing",
        name: "Red Wing Shoes",
        origin: "USA · 1905",
        body: "Iconic work boots for the most demanding environments.",
      },
    ],
    note: "We carry many more.",
    askCta: "Ask us about any brand.",
  },

  faq: {
    kicker: "FAQ",
    title: "Questions, answered",
    intro: "Everything you need to know about our products, warranties and billing.",
    items: [
      {
        id: "warranty",
        q: "Is there a warranty?",
        a: "Most of our products carry up to one year of comprehensive coverage. We stand behind the quality and durability of our tools and materials.",
      },
      {
        id: "installments",
        q: "Can I pay in installments?",
        a: "Yes — flexible plans of up to five payments, arranged with the most trusted banks in Libya.",
      },
      {
        id: "companies",
        q: "Do you work with companies?",
        a: "All the time. We supply commercial clients across all their projects — consistent stock, fair pricing, delivery you can plan around.",
      },
      {
        id: "advice",
        q: "Can you help me choose the right tools?",
        a: "That’s what we’re here for. Our seasoned staff point you to what fits your job and budget.",
      },
      {
        id: "payment",
        q: "What payment methods do you accept?",
        a: "All of them — cash, card, bank transfer and cheque.",
      },
    ],
  },

  contact: {
    kicker: "Contact",
    title: "Let’s talk about your project",
    lead: "Call, write or visit the store — our team answers quickly, in Arabic or English.",
    form: {
      legend: "Send us a message",
      name: { label: "Full name", placeholder: "Your name" },
      reach: {
        label: "Email or phone",
        placeholder: "How we can reach you",
        hint: "We reply on whichever you prefer.",
      },
      message: { label: "Message", placeholder: "Tell us about your project" },
      required: "required",
      submit: "Send message",
      submitting: "Sending…",
      success: "Thanks — we’ve got your message and will reply shortly.",
      failure: "That didn’t send. Please try again, or call us directly.",
      errorSummary: "Please fix the following before sending:",
      errors: {
        nameRequired: "Enter your name so we know who we’re replying to.",
        reachRequired: "Add an email or phone number so we can reach you.",
        reachInvalid: "That doesn’t look like an email address or a phone number.",
        messageRequired: "Tell us briefly what you need.",
        messageTooShort: "A little more detail helps us answer properly.",
      },
    },
  },

  footer: {
    tagline:
      "From foundation to finish, we’ve got you covered. Libya’s home of power tools and building materials since 1999.",
    explore: "Explore",
    servicesTitle: "Services",
    contactTitle: "Get in touch",
    hours: "Saturday – Thursday, 9:00 – 18:00",
    rights: "© 2026 Jabal Al Hadeed. All rights reserved.",
    socialLabel: "Follow Jabal Al Hadeed",
  },

  social: {
    facebook: "Facebook",
    instagram: "Instagram",
    linkedin: "LinkedIn",
    whatsapp: "WhatsApp",
  },
};

export default en;
