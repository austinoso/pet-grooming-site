/**
 * Business Configuration — Types & Active Tenant
 * ────────────────────────────────────────────────
 * This file owns the shared TypeScript types and re-exports whichever
 * tenant is currently active.
 *
 * ► To switch tenants, edit ONE line in:  src/config/active-tenant.ts
 * ► To add a new client, copy:            tenants/_template.ts
 */

export interface BusinessHours {
  day: string;
  open: string;
  close: string;
  closed?: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

export interface TenantConfig {
  /** Public-facing business name */
  name: string;
  tagline: string;
  description: string;
  /** Full URL of the deployed site — used for SEO canonical & Open Graph */
  siteUrl: string;
  /**
   * Hostnames this tenant owns (no scheme, no port).
   * The middleware matches the request Host header against these.
   * Example: ["happypaws.yourdomain.com", "www.happypaws.yourdomain.com"]
   */
  hosts: string[];
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    stateAbbr: string;
    zip: string;
    country: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  serviceArea: string[];
  hours: BusinessHours[];
  social: SocialLink[];
  founded: number;
  certifications: string[];
}

/** Alias kept for any existing code that imports BusinessConfig */
export type BusinessConfig = TenantConfig;
