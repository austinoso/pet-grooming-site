/**
 * Tenant: Paws & Polish Pet Grooming  (DEMO)
 * ───────────────────────────────────────────
 * This is the sample/demo business used while you're pitching the design.
 * Duplicate this file for each real client and fill in their details.
 */

import type { TenantConfig } from "../src/config/business";

const tenant: TenantConfig = {
  // ── Identity ──────────────────────────────────────────────────────────
  name: "Paws & Polish Pet Grooming",
  tagline: "Where every pet leaves looking pawfect",
  description:
    "Professional pet grooming services for dogs and cats. Certified groomers, gentle handling, and a stress-free experience your pet will love.",

  // ── Site URL (used for SEO / Open Graph) ──────────────────────────────
  siteUrl: "https://paws.austino.dev",

  // ── Hostnames this tenant owns (no scheme, no port) ───────────────────
  // The middleware matches the incoming Host header against these.
  // Add "localhost" here (or use PUBLIC_TENANT in .env) for local dev.
  hosts: ["paws.austino.dev", "localhost"],

  // ── Contact ───────────────────────────────────────────────────────────
  phone: "(555) 123-4567",
  email: "hello@pawsandpolish.com",

  address: {
    street: "123 Main Street",
    city: "Manteca",
    state: "California",
    stateAbbr: "CA",
    zip: "95337",
    country: "US",
  },

  coordinates: {
    lat: 37.8063,
    lng: -121.2161,
  },

  // ── Service Area ──────────────────────────────────────────────────────
  serviceArea: ["Manteca", "Lathrop", "Ripon", "Escalon", "Tracy", "Stockton"],

  // ── Hours ─────────────────────────────────────────────────────────────
  hours: [
    { day: "Monday", open: "8:00 AM", close: "6:00 PM" },
    { day: "Tuesday", open: "8:00 AM", close: "6:00 PM" },
    { day: "Wednesday", open: "8:00 AM", close: "6:00 PM" },
    { day: "Thursday", open: "8:00 AM", close: "6:00 PM" },
    { day: "Friday", open: "8:00 AM", close: "6:00 PM" },
    { day: "Saturday", open: "9:00 AM", close: "4:00 PM" },
    { day: "Sunday", open: "9:00 AM", close: "4:00 PM", closed: true },
  ],

  // ── Social ────────────────────────────────────────────────────────────
  social: [
    {
      platform: "Facebook",
      url: "https://facebook.com/pawsandpolish",
      label: "Follow us on Facebook",
    },
    {
      platform: "Instagram",
      url: "https://instagram.com/pawsandpolish",
      label: "Follow us on Instagram",
    },
    {
      platform: "Google",
      url: "https://g.page/pawsandpolish",
      label: "Find us on Google",
    },
  ],

  // ── About ─────────────────────────────────────────────────────────────
  founded: 2020,
  certifications: [
    "National Dog Groomers Association of America (NDGAA)",
    "International Professional Groomers Inc. (IPG)",
    "Pet First Aid & CPR Certified",
  ],
};

export default tenant;
