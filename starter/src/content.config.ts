import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const pageSection = z.object({
  type: z.enum(['hero', 'rich_text', 'image_text', 'feature_grid', 'cta', 'faq']),
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  body: z.string().optional(),
  image: z.string().optional(),
  image_alt: z.string().optional(),
  button_label: z.string().optional(),
  button_url: z.string().optional(),
});

const sharedSeoFields = {
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
  canonical_url: z.string().url().optional(),
  og_image: z.string().optional(),
  noindex: z.boolean().default(false),
};

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    template: z.enum(['default', 'landing']).default('default'),
    sections: z.array(pageSection).default([]),
    draft: z.boolean().default(false),
    ...sharedSeoFields,
  }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    featured_image: z.string().optional(),
    featured_image_alt: z.string().optional(),
    sort_order: z.number().default(0),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    ...sharedSeoFields,
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string().optional(),
    author: z.string().optional(),
    published_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional(),
    featured_image: z.string().optional(),
    featured_image_alt: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    ...sharedSeoFields,
  }),
});

export const collections = { pages, services, posts };
