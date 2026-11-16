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

// Sveltia menyimpan field kosong sebagai '' — ubah jadi undefined agar `??` di halaman bekerja.
const optStr = z.string().optional().transform((v) => v?.trim() || undefined);

const seoSettings = z.object({
  title: optStr,
  description: optStr,
  canonical_url: optStr,
  og_image: optStr,
  noindex: z.boolean().default(false),
}).optional();

const legacySeoFields = {
  seo_title: optStr,
  seo_description: optStr,
  canonical_url: optStr,
  og_image: optStr,
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

const contentModeObject = z.object({
  type: z.enum(['block_builder', 'blocks', 'classic']).default('block_builder'),
  sections: z.array(pageSection).default([]),
  body: z.string().optional(),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    template: z.enum(['default', 'landing']).default('default'),
    draft: z.boolean().default(false),
    // Format CMS (config.yml): string 'blocks' | 'classic' + sections/body di level atas.
    // Format lama: objek { type, sections, body }. Keduanya dinormalisasi ke objek di bawah.
    content_mode: z.union([z.enum(['block_builder', 'blocks', 'classic']), contentModeObject]).default('block_builder'),
    sections: z.array(pageSection).optional(),
    body: z.string().optional(),
    seo: seoSettings,
    ...legacySeoFields,
  }).transform((data) => {
    const cm = data.content_mode;
    const isObj = typeof cm === 'object';
    const rawType = isObj ? cm.type : cm;
    return {
      ...data,
      content_mode: {
        type: (rawType === 'classic' ? 'classic' : 'block_builder') as 'classic' | 'block_builder',
        sections: isObj ? cm.sections : (data.sections ?? []),
        body: isObj ? cm.body : data.body,
      },
    };
  }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    draft: z.boolean().default(false),
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
    draft: z.boolean().default(false),
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
