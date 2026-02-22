/**
 * Integration Configuration
 * ─────────────────────────
 * Selects the active adapter for each integration point.
 * Swap 'mock' for a real provider when connecting to MoeGo, Square, etc.
 */

export type BookingProvider = "mock" | "moego" | "square";
export type PaymentProvider = "mock" | "square";
export type FormProvider = "mock" | "netlify" | "formspree";

export interface IntegrationConfig {
  booking: BookingProvider;
  payment: PaymentProvider;
  forms: FormProvider;
}

const integrations: IntegrationConfig = {
  booking: "mock",
  payment: "mock",
  forms: "mock",
};

export default integrations;
