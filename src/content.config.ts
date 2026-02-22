/**
 * Content Collections Configuration
 * ──────────────────────────────────
 * Defines schemas for all content-driven sections of the site.
 */
import { defineCollection, z } from "astro:content";

const services = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    category: z.enum(["dogs", "cats", "specialty"]),
    description: z.string(),
    shortDescription: z.string(),
    icon: z.string(),
    priceStarting: z.number(),
    duration: z.string(),
    includes: z.array(z.string()),
    order: z.number().default(0),
  }),
});

const faq = defineCollection({
  type: "content",
  schema: z.object({
    question: z.string(),
    category: z.enum(["general", "services", "booking", "health", "pricing"]),
    order: z.number().default(0),
  }),
});

const team = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      image: image(),
      order: z.number().default(0),
    }),
});

const gallery = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      image: image(),
      alt: z.string(),
      category: z
        .enum(["dogs", "cats", "before-after", "salon"])
        .default("dogs"),
      order: z.number().default(0),
    }),
});

export const collections = { services, faq, team, gallery };
