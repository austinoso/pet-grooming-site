# Pet Grooming Website — Project Plan

## 1. Project Overview

**Goal:** Build a polished, production-ready pet grooming website that can be sold as a turnkey solution to an existing local pet grooming business. The site serves as both a portfolio piece and a real product.

**Stack:** Astro + TypeScript + Tailwind CSS  
**Hosting target:** Static output (Astro SSG) — deployable to Netlify, Vercel, Cloudflare Pages, or any static host  
**Integration posture:** Booking and payment UIs are present but wired to configurable placeholders — ready to swap in MoeGo, Square, or any scheduling/payment provider later

---

## 2. Site Map & Page Structure

```
/                       → Home (hero, services overview, trust signals, CTA)
/services               → Full service list with descriptions & pricing tiers
/booking                → Booking shell (placeholder integration point)
/about                  → About the business, team bios, values
/gallery                → Before/after photo grid with lightbox
/contact                → Contact form, map embed, hours, phone
/faq                    → Frequently asked questions (structured data)
/policies               → Cancellation, pet health requirements, etc.
```

### Shared Layouts & Partials

| Component    | Purpose                                                           |
| ------------ | ----------------------------------------------------------------- |
| `BaseLayout` | HTML head (meta, OG, JSON-LD), skip-to-content link, font loading |
| `Header`     | Logo, nav, mobile hamburger menu, "Book Now" CTA button           |
| `Footer`     | Address, hours, social links, legal links, copyright              |
| `SEOHead`    | Per-page title, description, canonical, OG, JSON-LD slot          |

---

## 3. Design Direction

### 3.1 Visual Identity (Placeholder — Customizable per Client)

| Token           | Default Value          | Notes                         |
| --------------- | ---------------------- | ----------------------------- |
| Primary color   | `#4F6D7A` (slate teal) | Calm, clean, trustworthy      |
| Secondary color | `#F2A65A` (warm amber) | Friendly, energetic accent    |
| Neutral         | `#F7F5F2` (warm white) | Background                    |
| Dark            | `#2B2D42`              | Text, headings                |
| Font — Headings | Inter (700)            | Modern, highly legible        |
| Font — Body     | Inter (400)            | Consistent family, great a11y |
| Border radius   | `0.75rem`              | Soft, approachable            |

All colors will be defined as CSS custom properties via Tailwind's `theme.extend` so a new client's brand can be swapped with a single config change.

### 3.2 Design Principles

- **Mobile-first responsive** — most customers find local services on their phone
- **High contrast** — WCAG AA minimum on all text
- **Generous whitespace** — clean, premium feel
- **Strong CTAs** — every page has a clear path to booking
- **Photography-forward** — large, optimized images of happy pets
- **Trust-building** — reviews, certifications, and "meet the groomer" sections

---

## 4. Page-by-Page Breakdown

### 4.1 Home (`/`)

| Section           | Content                                                   |
| ----------------- | --------------------------------------------------------- |
| Hero              | Full-width image/video, headline, subhead, "Book Now" CTA |
| Services snapshot | 3-4 card grid linking to `/services`                      |
| Why choose us     | Icon + text blocks (certified, gentle handling, etc.)     |
| Testimonials      | Carousel or grid of 3 reviews (star ratings, photos)      |
| Gallery teaser    | 4-6 images linking to `/gallery`                          |
| CTA banner        | "Ready to pamper your pup?" — full-width booking CTA      |
| FAQ snippet       | 3 most common questions with accordion                    |

### 4.2 Services (`/services`)

- Category sections: Dogs, Cats, Specialty (de-shedding, teeth, nails)
- Each service: name, description, estimated time, starting price
- Content managed via a `src/content/services/` collection (Astro Content Collections)
- CTA at bottom of each category → booking

### 4.3 Booking (`/booking`)

- Placeholder booking flow UI:
  - Step 1: Select pet type & size
  - Step 2: Choose service(s)
  - Step 3: Pick date/time (calendar UI shell)
  - Step 4: Contact info
  - Step 5: Confirmation screen
- All steps are **front-end only** for now — no backend
- Integration adapter pattern: a `BookingAdapter` TypeScript interface that MoeGo/Square/custom API implementations will satisfy later
- Clear comment blocks and TODO markers for integration points

### 4.4 About (`/about`)

- Business story / origin
- Team member cards (photo, name, role, short bio)
- Certifications & affiliations
- Values / philosophy section

### 4.5 Gallery (`/gallery`)

- Masonry or uniform grid layout
- Lightbox on click (accessible, keyboard-navigable)
- Optional before/after slider component
- Images served via Astro `<Image>` for automatic optimization
- Content managed via `src/content/gallery/` collection

### 4.6 Contact (`/contact`)

- Contact form (name, email, phone, message, pet name)
- Form submits to a configurable endpoint (Netlify Forms / Formspree / custom)
- Embedded Google Map (or OpenStreetMap for privacy)
- Business hours table
- Click-to-call phone link
- Click-to-email link
- Social media links

### 4.7 FAQ (`/faq`)

- Accordion UI
- Structured data (`FAQPage` schema) for rich results in Google
- Content managed via `src/content/faq/` collection

### 4.8 Policies (`/policies`)

- Cancellation policy
- Pet health & vaccination requirements
- Aggressive pet policy
- Liability disclaimer

---

## 5. Accessibility (ADA / WCAG 2.1 AA)

### Requirements Checklist

- [ ] Skip-to-main-content link on every page
- [ ] Semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- [ ] All images have descriptive `alt` text
- [ ] Color contrast ≥ 4.5:1 for normal text, ≥ 3:1 for large text
- [ ] Focus indicators visible on all interactive elements
- [ ] Keyboard-navigable (tab order, escape to close modals, arrow keys in menus)
- [ ] ARIA roles / labels where semantic HTML is insufficient
- [ ] Form inputs have associated `<label>` elements
- [ ] Error messages are programmatically associated with inputs
- [ ] No content conveyed by color alone
- [ ] Reduced-motion media query respected for animations
- [ ] Responsive text sizing (rem/em, no fixed px for body text)
- [ ] Touch targets ≥ 44×44px on mobile
- [ ] Page language declared (`lang="en"`)
- [ ] Landmark roles present and logical

### Testing Plan

- Lighthouse accessibility audit ≥ 95
- axe-core browser extension manual pass
- Keyboard-only navigation test
- Screen reader smoke test (NVDA or VoiceOver)

---

## 6. SEO Strategy — Local Focus

### 6.1 Technical SEO

- [ ] Unique `<title>` and `<meta name="description">` per page
- [ ] Canonical URLs on every page
- [ ] Open Graph and Twitter Card meta tags
- [ ] Sitemap.xml (auto-generated by `@astrojs/sitemap`)
- [ ] robots.txt
- [ ] Clean semantic HTML structure (one `<h1>` per page, logical heading order)
- [ ] Fast load: target < 1s LCP, < 100ms FID, < 0.1 CLS
- [ ] Optimized images (WebP/AVIF via Astro Image)
- [ ] Minimal JS — Astro islands only where needed

### 6.2 Local SEO

- [ ] **JSON-LD structured data** on every page:
  - `LocalBusiness` (with `PetGrooming` subtype) on home
  - `Service` on services page
  - `FAQPage` on FAQ
  - `BlogPosting` on blog posts
  - `BreadcrumbList` on all inner pages
- [ ] **NAP consistency** — Name, Address, Phone identical everywhere on site and matching Google Business Profile
- [ ] **Embedded map** on contact page
- [ ] **Geo meta tags** (`geo.region`, `geo.placename`, `geo.position`)
- [ ] **Service area** specified in structured data
- [ ] **Local keywords** woven into headings and copy:
  - "pet grooming in [City]"
  - "dog groomer near [Neighborhood]"
  - "cat grooming [City, ST]"
- [ ] Blog content targeting local + informational queries
- [ ] Internal linking strategy (services ↔ blog ↔ FAQ)

### 6.3 Configuration

All SEO-sensitive values (business name, address, phone, city, coordinates, service area) will live in a single `src/config/business.ts` file so they can be customized per client without hunting through templates.

---

## 7. Integration Architecture

### 7.1 Adapter Pattern

```
src/
  integrations/
    booking/
      types.ts          → BookingAdapter interface
      mock.ts           → MockBookingAdapter (returns fake confirmations)
      moego.ts          → (future) MoeGo implementation
      square.ts         → (future) Square implementation
    payments/
      types.ts          → PaymentAdapter interface
      mock.ts           → MockPaymentAdapter
      square.ts         → (future)
    forms/
      types.ts          → FormSubmitAdapter interface
      netlify.ts        → Netlify Forms implementation
      formspree.ts      → Formspree implementation
      mock.ts           → Console-log mock
```

Each adapter satisfies a TypeScript interface. The active adapter is selected in `src/config/integrations.ts`. The rest of the site imports from the barrel file and never touches a specific provider directly.

### 7.2 Current Scope (v1 — Shell)

- All adapters use `mock` implementations
- UI is fully built and interactive (form validation, step transitions, calendar UI)
- Console logs or toast notifications simulate real responses
- Clear `// TODO: INTEGRATION` comments at every hook point

---

## 8. Project Structure

```
pet-grooming-site/
├── public/
│   ├── fonts/
│   ├── images/           → Stock/placeholder pet photos
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── ui/           → Button, Card, Input, Accordion, Modal, etc.
│   │   ├── layout/       → Header, Footer, MobileNav, Breadcrumbs
│   │   ├── home/         → Hero, ServicesSnapshot, Testimonials, etc.
│   │   ├── booking/      → BookingFlow, StepIndicator, CalendarShell
│   │   ├── gallery/      → GalleryGrid, Lightbox, BeforeAfter
│   │   └── seo/          → JsonLd, SEOHead, OpenGraph
│   ├── content/
│   │   ├── services/     → .md files per service
│   │   ├── faq/          → .md files per question
│   │   ├── gallery/      → .json or .md entries with image refs
│   │   └── team/         → .md files per team member
│   ├── config/
│   │   ├── business.ts   → NAP, hours, social links, coordinates
│   │   ├── integrations.ts → Active adapter selection
│   │   ├── navigation.ts → Nav links, footer links
│   │   └── seo.ts        → Default meta, OG image, site URL
│   ├── integrations/     → Adapter pattern (see §7)
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── PageLayout.astro
│   │   └── BlogPostLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── services.astro
│   │   ├── booking.astro
│   │   ├── about.astro
│   │   ├── gallery.astro
│   │   ├── contact.astro
│   │   ├── faq.astro
│   │   └── policies.astro
│   ├── styles/
│   │   └── global.css    → Tailwind directives, custom properties
│   └── utils/
│       ├── formatters.ts → Phone, date, price formatting
│       └── validators.ts → Form validation helpers
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
├── PLAN.md               → (this file)
└── README.md
```

---

## 9. Content Strategy

Since this is a **shell/demo site**, all content will be realistic placeholder copy. The business name, city, and details will be centralized in `src/config/business.ts` so they can be globally swapped for a real client.

### Placeholder Business

| Field   | Value                                    |
| ------- | ---------------------------------------- |
| Name    | Paws & Polish Pet Grooming               |
| Tagline | "Where every pet leaves looking pawfect" |
| City    | [Configurable]                           |
| Phone   | (555) 123-4567                           |
| Email   | hello@pawsandpolish.com                  |

### Stock Photography

- Use royalty-free pet images from Unsplash/Pexels
- Optimize and convert to WebP at build time via Astro Image
- Organize in `public/images/` by category (hero, gallery, team, blog)

---

## 10. Performance Targets

| Metric                    | Target                 |
| ------------------------- | ---------------------- |
| Lighthouse Performance    | ≥ 95                   |
| Lighthouse Accessibility  | ≥ 95                   |
| Lighthouse SEO            | 100                    |
| Lighthouse Best Practices | ≥ 95                   |
| LCP                       | < 1.5s                 |
| FID / INP                 | < 100ms                |
| CLS                       | < 0.05                 |
| Total page weight         | < 500KB (initial load) |

---

## 11. Development Phases

### Phase 1 — Foundation ✅

- [x] Project planning (this document)
- [x] Astro project scaffolding with TypeScript + Tailwind
- [x] Tailwind theme configuration (colors, fonts, spacing)
- [x] Base layout, header, footer components
- [x] Business config file
- [x] SEO head component with JSON-LD support

### Phase 2 — Core Pages ✅

- [x] Home page (all sections)
- [x] Services page (content collection + display)
- [x] About page
- [x] Contact page with form
- [x] FAQ page with structured data

### Phase 3 — Content & Media ✅

- [x] Gallery page with lightbox
- [x] Populate all placeholder content
- [x] Source and optimize stock imagery
- [x] GSAP scroll-triggered animations

### Phase 4 — Booking Shell ✅

- [x] Booking flow UI (multi-step form)
- [x] Integration adapter interfaces
- [x] Mock adapter implementation
- [x] Calendar shell component

### Phase 5 — Polish & QA

- [ ] Accessibility audit and fixes
- [ ] Performance optimization pass
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile device testing
- [ ] SEO validation (structured data testing tool)
- [ ] Final Lighthouse runs

### Phase 6 — Integration (Future / Per-Client)

- [ ] MoeGo booking adapter
- [ ] Square payments adapter
- [ ] Real form submission endpoint
- [ ] Google Business Profile alignment
- [ ] Analytics setup (GA4 or Plausible)

---

## 12. Open Questions & Decisions

| #   | Question                                                              | Decision                                  |
| --- | --------------------------------------------------------------------- | ----------------------------------------- |
| 1   | Use Astro islands with React or Svelte for interactive pieces?        | **React**                                 |
| 2   | Include a dark mode toggle?                                           | **No**                                    |
| 3   | Use a CSS animation library (Framer Motion, etc.) or keep it minimal? | **GSAP**                                  |
| 4   | Blog: Markdown only or MDX for richer components?                     | **Deferred** (blog removed from v1 scope) |
| 5   | Form backend: Netlify Forms, Formspree, or defer entirely?            | **Mocked** (console log)                  |

---

_This plan is a living document. Update it as decisions are made and phases are completed._
