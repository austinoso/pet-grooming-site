/**
 * SEO Configuration
 * ─────────────────
 * Per-request helpers — always pass the active tenant so values stay
 * correct across all subdomains on the single deployment.
 */

import type { TenantConfig } from "./business";

export interface PageSEO {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
}

/** Returns the default SEO values for the given tenant. */
export function getDefaultSEO(tenant: TenantConfig): Required<PageSEO> {
  return {
    title: `${tenant.name} | Professional Pet Grooming in ${tenant.address.city}, ${tenant.address.stateAbbr}`,
    description: tenant.description,
    canonical: tenant.siteUrl,
    ogImage: `${tenant.siteUrl}/images/hero/hero-dog.jpg`,
    ogType: "website",
    noindex: false,
  };
}

/** Builds a page-specific <title> tag. */
export function buildTitle(tenant: TenantConfig, pageTitle?: string): string {
  if (!pageTitle) return getDefaultSEO(tenant).title;
  return `${pageTitle} | ${tenant.name}`;
}
