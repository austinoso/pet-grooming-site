/**
 * SEO Configuration
 * ─────────────────
 * Default meta values, Open Graph settings, and JSON-LD helpers.
 */

import business from "./business";

export interface PageSEO {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
}

const siteUrl = "https://www.pawsandpolish.com"; // must match astro.config.mjs `site`

export const defaultSEO: Required<PageSEO> = {
  title: `${business.name} | Professional Pet Grooming in ${business.address.city}, ${business.address.stateAbbr}`,
  description: business.description,
  canonical: siteUrl,
  ogImage: `${siteUrl}/images/hero/hero-dog.jpg`,
  ogType: "website",
  noindex: false,
};

export function buildTitle(pageTitle?: string): string {
  if (!pageTitle) return defaultSEO.title;
  return `${pageTitle} | ${business.name}`;
}

export { siteUrl };
