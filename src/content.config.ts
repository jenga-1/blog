import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

import { categoryKeys } from "./config/categories";

const posts = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/posts",

    generateId: ({ entry }) => entry.replace(/\.md$/, "").toLowerCase(),
  }),

  schema: z.object({
    title: z.string().trim().min(1, "El título no puede estar vacío."),

    description: z
      .string()
      .trim()
      .min(1, "La descripción no puede estar vacía."),

    publishedAt: z.coerce.date(),

    updatedAt: z.coerce.date().optional(),

    category: z.enum(categoryKeys),

    tags: z.array(z.string().trim().min(1)).default([]),

    draft: z.boolean().default(false),

    sidebarLabel: z.string().trim().min(1).optional(),

    order: z.number().int().nonnegative().default(0),

    image: z.string().optional(),
  }),
});

export const collections = {
  posts,
};
