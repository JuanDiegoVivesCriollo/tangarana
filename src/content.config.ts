import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const tours = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/tours" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    commercialName: z.string(),
    seoTitle: z.string(),
    seoDescription: z.string(),
    price: z.number(),
    currency: z.string(),
    durationDays: z.number(),
    durationNights: z.number(),
    destinations: z.array(z.string()),
    featured: z.boolean(),
    includes: z.array(z.string()),
    itinerary: z.array(z.object({ day: z.number(), destination: z.string() })),
    cover: z.string(),
    status: z.enum(["published", "draft"]),
  }),
});

export const collections = { tours };
