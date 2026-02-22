/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    /** The active tenant resolved from the request Host header. */
    tenant: import("./config/business").TenantConfig;
  }
}
