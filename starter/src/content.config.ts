import { defineCollection, z } from 'astro:content';

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    seo_title: z.string().optional(),
    seo_description: z.string().optional(),
    noindex: z.boolean().default(false),
  }),
});

const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    featured_image: z.string().optional(),
    seo_title: z.string().optional(),
    seo_description: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string().optional(),
    author: z.string().optional(),
    published_at: z.coerce.date().optional(),
    featured_image: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    seo_title: z.string().optional(),
    seo_description: z.string().optional(),
  }),
});

export const collections = { pages, services, posts };
