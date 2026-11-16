import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const sectionItem = z.object({
  title: z.string(),
  body: z.string().optional(),
});

const pageSection = z.object({
  type: z.enum(['hero', 'rich_text', 'image_text', 'feature_grid', 'cta', 'faq']),
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  body: z.string().optional(),
  image: z.string().optional(),
  image_alt: z.string().optional(),
  button_label: z.string().optional(),
  button_url: z.string().optional(),
  items: z.array(sectionItem).default([]),
});

const seoSettings = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  canonical_url: z.string().optional(),
  og_image: z.string().optional(),
  noindex: z.boolean().default(false),
}).optional();

const legacySeoFields = {
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
  canonical_url: z.string().optional(),
  og_image: z.string().optional(),
  noindex: z.boolean().default(false),
};

/**
 * Optional CMS datetime fields can be saved as an empty string or object.
 * Normalize empty values and parse valid strings/numbers before Zod validation.
 */
const optionalCmsDate = z.preprocess((value) => {
  if (value === undefined || value === null) return undefined;
  if (typeof value === 'string' && value.trim() === '') return undefined;
  if (value instanceof Date) return value;

  if (typeof value === 'string' || typeof value === 'number') {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? value : parsed;
  }

  if (typeof value === 'object') {
    const record = value as Record<string, unknown>;
    const candidate = record.value ?? record.date ?? record.datetime ?? record.iso;
    if (candidate === undefined || candidate === null || candidate === '') return undefined;
    if (candidate instanceof Date) return candidate;
    if (typeof candidate === 'string' || typeof candidate === 'number') {
      const parsed = new Date(candidate);
      return Number.isNaN(parsed.getTime()) ? value : parsed;
    }
  }

  return value;
}, z.date().optional());

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    template: z.enum(['default', 'landing']).default('default'),
    content_mode: z.enum(['blocks', 'classic']).default('blocks'),
    sections: z.array(pageSection).default([]),
    seo: seoSettings,
    ...legacySeoFields,
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
    seo: seoSettings,
    ...legacySeoFields,
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string().optional(),
    author: z.string().optional(),
    published_at: optionalCmsDate,
    updated_at: optionalCmsDate,
    featured_image: z.string().optional(),
    featured_image_alt: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]),
    seo: seoSettings,
    ...legacySeoFields,
  }),
});

export const collections = { pages, services, posts };
