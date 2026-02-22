/**
 * Tenant Middleware
 * ────────────────
 * Runs on every request. Reads the Host header, looks up the matching
 * tenant from the registry, and injects it into Astro.locals.tenant so
 * every page and component can access it without any static imports.
 *
 * Also sets cache headers so Cloudflare caches rendered HTML at the edge
 * per hostname — first request renders, subsequent requests are served
 * from Cloudflare's cache (~5ms) until the TTL expires.
 *
 * Host matching order:
 *  1. Exact hostname match against tenant.hosts[]
 *  2. Env var PUBLIC_TENANT fallback (useful for local dev)
 *  3. First registered tenant (hard fallback, should never happen in prod)
 */

import { defineMiddleware } from "astro:middleware";
import {
  getTenantByHostname,
  getTenantById,
  getDefaultTenant,
} from "./config/active-tenant";

// Content only changes on manual deploy — Cloudflare auto-purges the cache on
// every push, so a long TTL is safe and means virtually all visitors get a
// cached response (static-site performance from a single SSR deployment).
const EDGE_CACHE_TTL = 60 * 60 * 24; // 24 hours

export const onRequest = defineMiddleware(({ locals, request }, next) => {
  const host = request.headers.get("host") ?? "localhost";
  // Strip port number (e.g. "localhost:4321" → "localhost")
  const hostname = host.split(":")[0];

  const tenant =
    getTenantByHostname(hostname) ??
    getTenantById(import.meta.env.PUBLIC_TENANT ?? "") ??
    getDefaultTenant();

  locals.tenant = tenant;

  return next().then((response) => {
    // Only cache successful HTML responses — not API routes, redirects, or errors.
    const contentType = response.headers.get("content-type") ?? "";
    const isHtml = contentType.includes("text/html");
    const isSuccess = response.status === 200;
    const isDev = hostname === "localhost" || hostname === "127.0.0.1";

    if (isHtml && isSuccess && !isDev) {
      const headers = new Headers(response.headers);
      // s-maxage controls Cloudflare's edge cache; max-age=0 tells the browser not to cache.
      // Vary: Host ensures siteA and siteB get separate cache entries.
      headers.set(
        "Cache-Control",
        `public, max-age=0, s-maxage=${EDGE_CACHE_TTL}`,
      );
      headers.set("Vary", "Host");
      return new Response(response.body, { status: response.status, headers });
    }

    return response;
  });
});
