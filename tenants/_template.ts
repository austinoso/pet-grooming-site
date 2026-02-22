/**
 * Tenant Template
 * ───────────────
 * 1. Copy this file → tenants/your-client-slug.ts
 *    (use a short lowercase kebab-case slug, e.g. happy-paws-fresno)
 * 2. Fill in every field below.
 * 3. Import the file in src/config/active-tenant.ts and add it to the registry
 *    using the same slug as the filename (without .ts).
 * 4. In your hosting deployment set:
 *      PUBLIC_TENANT=your-client-slug
 *      PUBLIC_SITE_URL=https://clientname.yourdomain.com
 *    and point the subdomain at that deployment.
 */

import type { TenantConfig } from "../src/config/business";

const tenant: TenantConfig = {
  // ── Identity ──────────────────────────────────────────────────────────
  name: "Business Name Here",
  tagline: "Your catchy tagline here",
  description:
    "A 1–2 sentence description of the business shown in meta tags and previews.",

  // ── Site URL (used for SEO / Open Graph) ──────────────────────────────
  siteUrl: "https://clientname.yourdomain.com",

  // ── Hostnames this tenant owns (no scheme, no port) ───────────────────
  // Add every hostname that should serve this tenant's content.
  // The subdomain you point at Cloudflare Pages must be listed here.
  hosts: ["clientname.yourdomain.com", "www.clientname.yourdomain.com"],

  // ── Contact ───────────────────────────────────────────────────────────
  phone: "(555) 000-0000",
  email: "hello@yourdomain.com",

  address: {
    street: "123 Your Street",
    city: "Your City",
    state: "Your State",
    stateAbbr: "XX",
    zip: "00000",
    country: "US",
  },

  // Drop a pin in Google Maps, right-click → "What's here?" to get lat/lng.
  coordinates: {
    lat: 0.0,
    lng: 0.0,
  },

  // ── Service Area ──────────────────────────────────────────────────────
  // Surrounding cities/neighborhoods you want to appear in local SEO.
  serviceArea: ["City One", "City Two", "City Three"],

  // ── Hours ─────────────────────────────────────────────────────────────
  // Set closed: true for days the business is closed (open/close are ignored).
  hours: [
    { day: "Monday", open: "9:00 AM", close: "6:00 PM" },
    { day: "Tuesday", open: "9:00 AM", close: "6:00 PM" },
    { day: "Wednesday", open: "9:00 AM", close: "6:00 PM" },
    { day: "Thursday", open: "9:00 AM", close: "6:00 PM" },
    { day: "Friday", open: "9:00 AM", close: "6:00 PM" },
    { day: "Saturday", open: "9:00 AM", close: "4:00 PM" },
    { day: "Sunday", open: "9:00 AM", close: "4:00 PM", closed: true },
  ],

  // ── Social ────────────────────────────────────────────────────────────
  // Remove any platforms the client doesn't use; add new ones freely.
  social: [
    {
      platform: "Facebook",
      url: "https://facebook.com/yourpage",
      label: "Follow us on Facebook",
    },
    {
      platform: "Instagram",
      url: "https://instagram.com/yourhandle",
      label: "Follow us on Instagram",
    },
    {
      platform: "Google",
      url: "https://g.page/yourbusiness",
      label: "Find us on Google",
    },
  ],

  // ── About ─────────────────────────────────────────────────────────────
  founded: 2020,
  certifications: ["Certification Name Here", "Another Certification Here"],
};

export default tenant;
