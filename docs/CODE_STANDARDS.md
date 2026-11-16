# Source Code Standards

This document defines the baseline conventions for the Astro starter in this repository.

## Runtime and package management

- Use the Node.js version declared in `package.json` (Node.js 22.22.1 or newer).
- Use npm and keep `package-lock.json` committed with dependency changes.
- Do not install packages globally or commit generated build output.
- Keep dependencies minimal; prefer Astro and platform capabilities over unnecessary client-side libraries.

## Astro and TypeScript

- Keep Astro's strict TypeScript configuration enabled.
- Prefer explicit interfaces for component props and typed content schemas.
- Avoid `any`; use `unknown` and narrow the value when the input is not trusted.
- Keep frontmatter/imports and server-side data preparation at the top of Astro components.
- Prefer static rendering. Add client-side JavaScript only when interaction requires it.
- Keep reusable presentation in `src/components/`, page composition in `src/pages/`, and shared shells in `src/layouts/`.

## Content and CMS

- Treat CMS content as untrusted input.
- Validate content through Astro Content Collections before rendering.
- Preserve existing slugs, published URLs, and metadata unless a migration is explicitly approved.
- Keep CMS field names and content schemas synchronized.
- Do not mix editorial workflow state and custom draft flags without a documented source of truth.

## HTML, accessibility, and SEO

- Use semantic HTML and maintain a logical heading hierarchy.
- Every document must declare its language, title, and canonical URL.
- Provide meaningful alternative text for informative images; use empty alt text only for decorative images.
- Ensure all interactive elements are keyboard accessible and have visible focus states.
- Respect reduced-motion preferences.
- Keep structured data factual and consistent with visible page content.
- Keep staging and non-production environments out of search indexes.

## CSS

- Keep shared design tokens in the global stylesheet.
- Prefer existing tokens over repeated hardcoded values.
- Use mobile-first, fluid layouts and avoid horizontal overflow.
- Avoid `!important` unless there is a documented third-party override requirement.

## Quality gates

Run from the `starter/` directory:

```sh
npm ci
npm run check
npm run build
npm run qa:build
# or run the full sequence:
npm run qa
```

The build QA script must validate generated output generically. It must not assume a particular demo business, uploaded filename, social account, or optional content page exists.
