// Fictional demo business used to showcase Housecallwebs' productized website + booking system.
// All contact details, pricing, and reviews below are illustrative demo content only.

export const site = {
  name: "Northstar Holiday Lights",
  shortName: "Northstar",
  tagline: "Denver's Premier Christmas Light Installation",
  domain: "northstarholidaylights.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://northstarholidaylights.com",
  phoneDisplay: "(720) 204-9931",
  phoneHref: "tel:+17202049931",
  smsHref: "sms:+17202049931",
  email: "hello@northstarholidaylights.com",
  address: {
    street: "4820 Larkspur Way",
    city: "Denver",
    state: "CO",
    zip: "80238",
  },
  metro: "Denver Metro & Surrounding Suburbs",
  yearsInBusiness: 9,
  founded: 2017,
  responseTime: "Same-day quote responses in season",
  hours: [
    { days: "Mon – Sat", hours: "8:00 AM – 7:00 PM (Sept – Jan)" },
    { days: "Sun", hours: "By appointment only" },
    { days: "Feb – Aug", hours: "Office hours, off-season by appointment" },
  ],
  socials: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
  },
};

export const housecallwebs = {
  name: "Housecallwebs",
  url: "https://housecallwebs.com",
  bannerText: "Demo site by Housecallwebs",
};

export const cities = [
  { name: "Denver", slug: "denver" },
  { name: "Aurora", slug: "aurora" },
  { name: "Lakewood", slug: "lakewood" },
  { name: "Arvada", slug: "arvada" },
  { name: "Westminster", slug: "westminster" },
  { name: "Highlands Ranch", slug: "highlands-ranch" },
  { name: "Parker", slug: "parker" },
  { name: "Centennial", slug: "centennial" },
  { name: "Littleton", slug: "littleton" },
  { name: "Thornton", slug: "thornton" },
  { name: "Broomfield", slug: "broomfield" },
  { name: "Golden", slug: "golden" },
];

// Cities with fully built-out landing pages (proof of the local-SEO play).
// The rest of the metro list above still appears in the service-area section.
export const citySEOPages = ["denver", "highlands-ranch", "littleton"];

export function cityHref(slug: string) {
  return citySEOPages.includes(slug) ? `/areas/${slug}` : `/areas#${slug}`;
}

export const cityDetails: Record<
  string,
  {
    name: string;
    intro: string;
    highlights: string[];
    neighborhoods: string[];
  }
> = {
  denver: {
    name: "Denver",
    intro:
      "From LoHi bungalows to Park Hill Victorians and downtown high-rises, Denver's mix of historic and modern homes means every install is a little different. Our crews are experienced with steep Denver square rooflines, older gutters, and tight urban lots.",
    highlights: [
      "Historic-home-friendly install methods that protect original trim and gutters",
      "Downtown condo and townhome lighting packages",
      "Fast scheduling for Denver's compact peak-season calendar",
    ],
    neighborhoods: ["LoHi", "Park Hill", "Washington Park", "Stapleton / Central Park", "Capitol Hill"],
  },
  "highlands-ranch": {
    name: "Highlands Ranch",
    intro:
      "Highlands Ranch's HOA-governed communities mean lighting has to look sharp and stay within guidelines. We coordinate with HOA lighting rules where needed and specialize in the larger rooflines and two-story homes common throughout the area.",
    highlights: [
      "HOA-guideline-aware design for common Highlands Ranch communities",
      "Package pricing built around larger, two-story roofline footprints",
      "Coordinated scheduling for multiple homes on the same street",
    ],
    neighborhoods: ["Backcountry", "Northridge", "Southgate", "Eastridge", "Firelight"],
  },
  littleton: {
    name: "Littleton",
    intro:
      "Littleton's tree-lined streets and mature landscaping make for some of our favorite full-property lighting designs — think wrapped trees, lit walkways, and roofline accents that play off decades-old trees.",
    highlights: [
      "Tree-wrap specialists for Littleton's mature, established landscaping",
      "Walkway and landscape-bed lighting add-ons",
      "Flexible scheduling around historic downtown Littleton events",
    ],
    neighborhoods: ["Downtown Littleton", "Ken Caryl", "Columbine Valley", "Southglenn", "Governor's Ranch"],
  },
};

export type PackageTier = {
  id: string;
  name: string;
  tierLabel: "Good" | "Better" | "Best";
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
};

export const packages: PackageTier[] = [
  {
    id: "twinkle",
    name: "Twinkle Package",
    tierLabel: "Good",
    price: "$795",
    description: "A clean, classic rooflight look — perfect for most single-story homes.",
    features: [
      "Up to 150 linear ft of roofline lighting",
      "Commercial-grade C9 LED bulbs",
      "Warm white or multicolor",
      "Professional install & takedown",
      "Storage bag included",
    ],
  },
  {
    id: "starlight",
    name: "Starlight Package",
    tierLabel: "Better",
    price: "$1,395",
    description: "Our most popular package — roofline plus accent trees for a fuller display.",
    features: [
      "Everything in Twinkle",
      "2 trees or shrubs wrapped in lights",
      "Choice of 4 designer color themes",
      "Mid-season bulb check & tune-up",
      "Labeled storage bin included",
    ],
    highlight: true,
  },
  {
    id: "signature",
    name: "Northstar Signature",
    tierLabel: "Best",
    price: "$2,450",
    description: "A fully custom, magazine-worthy display designed and managed end-to-end.",
    features: [
      "Full custom lighting design",
      "Roofline, trees, landscape beds & walkways",
      "Wreaths & garland accents available",
      "App-controlled smart lighting option",
      "Priority scheduling both directions",
      "Full-season maintenance included",
    ],
  },
];

export const services = [
  {
    slug: "residential-install",
    name: "Residential Install",
    shortName: "Design",
    summary: "Custom-designed holiday lighting installed safely on your roofline, trees, and landscaping.",
    icon: "Home",
  },
  {
    slug: "residential-install",
    name: "Professional Install",
    shortName: "Install",
    summary: "Licensed, insured crews install every strand — no ladders, no tangled totes, no risk to you.",
    icon: "Wrench",
  },
  {
    slug: "maintenance",
    name: "Maintain & Bulb Replace",
    shortName: "Maintain",
    summary: "We monitor your display through the season and repair or replace bulbs at no extra charge.",
    icon: "ShieldCheck",
  },
  {
    slug: "takedown-storage",
    name: "Takedown & Storage",
    shortName: "Takedown",
    summary: "We remove everything after the season and can store your lights until next year.",
    icon: "PackageCheck",
  },
  {
    slug: "commercial-hoa",
    name: "Commercial & HOA",
    shortName: "Commercial",
    summary: "Storefronts, office parks, and HOA common areas — scaled crews and COI on file.",
    icon: "Building2",
  },
  {
    slug: "residential-install",
    name: "Custom Packages",
    shortName: "Custom",
    summary: "Have a specific vision? We'll build a one-off quote around exactly what you want.",
    icon: "Sparkles",
  },
];

export const serviceDetails: Record<
  string,
  {
    name: string;
    heading: string;
    intro: string;
    bullets: string[];
  }
> = {
  "residential-install": {
    name: "Residential Install",
    heading: "Residential Christmas Light Installation",
    intro:
      "From a simple rooflight to a full-property showstopper, we design and install holiday lighting tailored to your home's architecture and your budget.",
    bullets: [
      "Free design consultation, virtual or on-site",
      "Commercial-grade LED lighting rated for outdoor use",
      "Roofline, gutter, trees, shrubs, and landscape beds",
      "Insured crews, no ladders or cords left for you to manage",
      "Financing-friendly package pricing",
    ],
  },
  "commercial-hoa": {
    name: "Commercial & HOA",
    heading: "Commercial & HOA Holiday Lighting",
    intro:
      "We help storefronts, office parks, and HOA common areas look their best all season with scaled crews, certificates of insurance, and predictable pricing.",
    bullets: [
      "Multi-property and common-area lighting programs",
      "Certificate of insurance provided on request",
      "Flexible billing for property managers and HOA boards",
      "Scheduled maintenance visits through the season",
      "Dedicated commercial account contact",
    ],
  },
  maintenance: {
    name: "Maintenance & Bulb Replace",
    heading: "Season-Long Maintenance & Bulb Replacement",
    intro:
      "Colorado weather is hard on holiday lighting. We check in during the season and repair outages before your neighbors notice.",
    bullets: [
      "Mid-season check-in included with Starlight & Signature",
      "Rapid bulb and strand replacement",
      "Storm and wind damage repair",
      "Timer and smart-plug troubleshooting",
      "On-demand service calls available",
    ],
  },
  "takedown-storage": {
    name: "Takedown & Storage",
    heading: "Takedown & Off-Season Storage",
    intro:
      "When the season ends, we come back, take everything down carefully, and can store it for you until next year.",
    bullets: [
      "Scheduled takedown in January",
      "Careful removal that protects your roofline and landscaping",
      "Labeled, weatherproof storage bins",
      "Optional off-site storage between seasons",
      "Early-bird takedown scheduling discounts",
    ],
  },
};

export const testimonials = [
  {
    name: "Danielle R.",
    city: "Highlands Ranch, CO",
    quote:
      "Booked online in five minutes and the crew showed up exactly in the window they promised. The house looked incredible for our holiday party.",
  },
  {
    name: "Marcus T.",
    city: "Aurora, CO",
    quote:
      "We used the Starlight package two years running. Easy scheduling, and they handled a strand that went out mid-December within a day.",
  },
  {
    name: "The Okafor Family",
    city: "Littleton, CO",
    quote:
      "Our HOA hired them for the entrance and it was the best it's looked in years. Professional from the quote to takedown.",
  },
];

export const faqs = [
  {
    question: "When should I book my holiday lighting?",
    answer:
      "Most Denver-metro customers book between early October and mid-November. Installation calendars fill up fast in peak season, so booking early gets you your preferred week — but we do accommodate late bookings when our schedule allows.",
  },
  {
    question: "LED or incandescent lights?",
    answer:
      "We install commercial-grade LED lighting by default — it uses roughly 80% less energy, runs cooler, and holds up better through a Colorado winter. Incandescent-style warm bulbs are available on request for a classic look.",
  },
  {
    question: "Do I need HOA approval?",
    answer:
      "Many Denver-metro HOAs allow seasonal lighting without a formal application, but some have guidelines on timing or brightness. We're happy to review your HOA's rules with you before your install date.",
  },
  {
    question: "When do you take everything down?",
    answer:
      "Standard takedown happens in the first three weeks of January. If you'd like an earlier or later date, just let us know when you book and we'll do our best to match your schedule.",
  },
  {
    question: "What happens if it snows or the weather is bad on my install day?",
    answer:
      "Safety comes first. If conditions aren't safe for roof or ladder work, we'll reschedule you for the next available weather window and communicate the new date right away.",
  },
  {
    question: "Do you require a deposit?",
    answer:
      "Signature and commercial packages may require a deposit to hold your install date during peak weeks. Twinkle and Starlight packages are typically billed after installation is complete.",
  },
];

export const timeWindows = [
  { id: "morning", label: "Morning", hours: "8:00 AM – 11:00 AM" },
  { id: "midday", label: "Midday", hours: "11:00 AM – 2:00 PM" },
  { id: "afternoon", label: "Afternoon", hours: "2:00 PM – 5:00 PM" },
  { id: "evening", label: "Evening", hours: "5:00 PM – 7:00 PM" },
];

export const bookingServiceTypes = [
  { id: "new-install", label: "New Holiday Light Install" },
  { id: "commercial", label: "Commercial / HOA Lighting" },
  { id: "maintenance", label: "Maintenance / Repair Visit" },
  { id: "takedown", label: "Takedown & Storage" },
];
