import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const tours = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/tours" }),
  schema: z.object({
    kind: z.enum(["multi-day", "day-tour"]),
    title: z.string(),
    slug: z.string(),
    commercialName: z.string(),
    tagline: z.string(),
    shortDescription: z.string(),
    linkLabel: z.string(),
    whatsappMessage: z.string(),
    seoTitle: z.string(),
    seoDescription: z.string(),
    price: z.number(),
    currency: z.string(),
    durationDays: z.number().optional(),
    durationNights: z.number().optional(),
    durationLabel: z.string(),
    scheduleStart: z.string().optional(),
    scheduleEnd: z.string().optional(),
    destinations: z.array(z.string()),
    featured: z.boolean(),
    includes: z.array(z.string()).default([]),
    itinerary: z.array(z.object({ day: z.number(), destination: z.string() })).default([]),
    activities: z.array(z.string()).default([]),
    imageKey: z.enum([
      "hero",
      "trail",
      "river",
      "airBike",
      "highBridge",
      "lagoonSwing",
      "hiking",
      "butterfly",
      "pozuzoGate",
      "yaneshaExperience",
      "yaneshaCulture",
      "lagoonGroup",
      "waterfallGroup",
      "oxapampaGroup",
      "waterPause",
    ]),
    posterTone: z.enum(["canopy", "river", "coffee", "sun", "earth"]),
    cover: z.string(),
    status: z.enum(["published", "draft"]),
    indexable: z.boolean().default(true),
  }),
});

export const collections = { tours };
