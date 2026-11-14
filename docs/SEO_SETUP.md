# Technical SEO and indexing

## Required production environment

Set these variables in the production hosting project:

- `PUBLIC_SITE_URL`: the canonical HTTPS origin, without a trailing path.
- `PUBLIC_SITE_INDEXING=true`: explicitly allow indexing.

For local development, pull requests, preview deployments and staging, leave `PUBLIC_SITE_INDEXING=false`. The layout emits `noindex,nofollow` and `robots.txt` disallows crawling until indexing is explicitly enabled.

## Metadata

Page, service and post entries support:

- SEO title and description
- Canonical URL override
- Open Graph image override
- No-index control

If no page-specific Open Graph image is provided, the site-level default image is used.

## Structured data

The shared layout emits an Organization entity. Blog detail pages add BlogPosting structured data; service detail pages add Service structured data. Validate real production URLs and content with Google's Rich Results Test and Schema Markup Validator before relying on rich results.

The Organization schema is intentionally generic. If the business qualifies for a more specific subtype such as LocalBusiness, configure the appropriate business details and schema before changing the type.

## Sitemap and robots

Astro's sitemap integration uses `PUBLIC_SITE_URL` as the canonical origin. The `robots.txt` route references the generated sitemap only when `PUBLIC_SITE_INDEXING=true`.

## URL changes

Do not change existing production slugs without a redirect plan. Sveltia's `preview_path` helps editors see the expected URL and records old paths as aliases when a slug changes. Astro does not automatically turn those aliases into hosting redirects. Add the old-to-new mapping to the hosting provider's redirect configuration before publishing a slug change.
