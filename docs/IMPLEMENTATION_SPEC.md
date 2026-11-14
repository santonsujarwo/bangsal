# Implementation Specification

## Product
Reusable Codex-driven system for company profile websites. It is an instruction-and-skill framework, not a hosted autonomous agent or CMS plugin.

## Repository boundaries
Agent framework owns AGENTS.md, .agents/skills/, workflows, templates, docs, and versioning. It must not contain client credentials or client content.
Website repository owns Astro app, Sveltia config, business content, design tokens, assets, SEO, tests, and deployment settings.

## Runtime
Visitor requests URL → Astro renders static HTML → Astro reads Git-backed content → Sveltia CMS is served at /admin/ → authenticated editor updates repository → Git triggers host build → host publishes static output.
Sveltia is Git-based, not a traditional database CMS by default.

## Content model
Recommended collections: pages, services, posts, optional projects and testimonials. Global structured files: site settings, navigation, footer, social links. Use Markdown for long-form editorial content and YAML/JSON for structured settings.

## Navigation
Fields: label (required), url (required), visible (boolean), order (number), parent (optional stable ID), open_in_new_tab (boolean). Start with flat ordered list. Validate internal URLs and parent references.

## Page composition
Use hybrid architecture: fixed templates for home/about/contact/service detail/article; reusable allowlisted section components; typed page-section schemas for editable composition. Never expose arbitrary component names or executable HTML/JS to editors.
Suggested sections: hero, richText, imageText, featureGrid, serviceCards, testimonialList, faq, callToAction, logoCloud, gallery.

## Design system
Define brand and semantic colors, typography, spacing, container widths, breakpoints, buttons, links, forms, navigation states, image ratios, motion, and reduced-motion behavior.

## SEO
Support seo_title, seo_description, optional canonical_url, noindex, and og_image. Use configured canonical origin. Add Organization/LocalBusiness, Service, Article, and BreadcrumbList only when applicable and supported by verified facts.

## Preview
Preview is not automatic. Choose and verify local preview, deploy preview through PRs, or a protected custom preview route. Never expose unpublished drafts publicly.

## Authentication and deployment
Use supported Sveltia Git provider authentication for the chosen host. Store credentials securely. Document callback URLs, scopes, and variable names after verifying current provider requirements. Test CMS operations in a non-production repository.

## Quality gates
Planning: approved brief, sitemap, URL inventory.
Design: approved visual direction and responsive rules.
Development: routes and typed content models implemented.
Release: build passes, links/forms checked, metadata/schema validated, CMS workflow verified, critical defects resolved, production deployment approved.
