/**
 * ╔══════════════════════════════════════════════════════════════════════╗
 * ║                       TENANT REGISTRY                               ║
 * ║                                                                      ║
 * ║  One deployment serves all subdomains. The middleware reads the      ║
 * ║  request Host header and looks up the matching tenant here.          ║
 * ║                                                                      ║
 * ║  To add a new client:                                                ║
 * ║    1. Copy  tenants/_template.ts  →  tenants/your-client-slug.ts    ║
 * ║    2. Fill in their details, including the hosts[] array             ║
 * ║    3. Import the file below and add it to the registry               ║
 * ╚══════════════════════════════════════════════════════════════════════╝
 */

import type { TenantConfig } from "./business";

// ── 1. Import every tenant file here ──────────────────────────────────────
import demoPawsAndPolish from "../../tenants/demo-paws-and-polish";
// import happyPawsFresno from "../../tenants/happy-paws-fresno";
// import fluffyCutsModesto from "../../tenants/fluffy-cuts-modesto";

// ── 2. Register them by a slug ID ─────────────────────────────────────────
const registry: Record<string, TenantConfig> = {
  "demo-paws-and-polish": demoPawsAndPolish,
  // "happy-paws-fresno": happyPawsFresno,
  // "fluffy-cuts-modesto": fluffyCutsModesto,
};

// ── 3. Build a hostname → tenant lookup map from each tenant's hosts[] ─────
const hostnameMap = new Map<string, TenantConfig>();
for (const tenant of Object.values(registry)) {
  for (const host of tenant.hosts) {
    hostnameMap.set(host, tenant);
  }
}

/** Look up a tenant by the exact hostname from the request Host header. */
export function getTenantByHostname(
  hostname: string,
): TenantConfig | undefined {
  return hostnameMap.get(hostname);
}

/** Look up a tenant by its registry slug (e.g. for the PUBLIC_TENANT fallback). */
export function getTenantById(id: string): TenantConfig | undefined {
  return registry[id];
}

/** Returns the first registered tenant. Used as a last-resort fallback. */
export function getDefaultTenant(): TenantConfig {
  const first = Object.values(registry)[0];
  if (!first)
    throw new Error("[Tenant] Registry is empty — add at least one tenant.");
  return first;
}
