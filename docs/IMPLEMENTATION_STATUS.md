# Implementation status

This checklist tracks the seven implementation phases in the feature branch.

| Phase | Scope | Code status |
|---|---|---|
| 1 | Astro runtime, dependencies and Content Layer migration | Implemented |
| 2 | Pages, Services, Blog schemas and reusable section data | Implemented |
| 3 | Sveltia GitHub backend, collections, media and auth guidance | Implemented |
| 4 | Editable site settings, navigation, homepage and dynamic pages | Implemented |
| 5 | Sveltia custom previews and deploy-preview paths | Implemented |
| 6 | Canonical, social metadata, structured data and indexing controls | Implemented |
| 7 | GitHub Actions, PR publishing workflow and deployment documentation | Implemented |

## Owner-side setup still required

These items require access or decisions that must come from the repository/site owner:

- Connect the repository to Vercel (or another supported provider) with the Astro root directory set to `starter`.
- Set production `PUBLIC_SITE_URL` and `PUBLIC_SITE_INDEXING=true`; keep preview indexing disabled.
- Configure the GitHub identity used by Sveltia with repository Contents and Pull Requests read/write permissions.
- For multi-editor authentication, deploy Sveltia CMS Authenticator to Cloudflare Workers and add its secrets outside the repository.
- Generate and commit `starter/package-lock.json` after a successful install, then change CI from `npm install` to `npm ci`.
- Replace starter business copy, contact information, navigation and images with approved client content.

## Review policy

All changes are isolated on `feat/phase-1-astro-foundation` and proposed through PR #1. Do not merge until the latest Astro CI run passes and the CMS/hosting configuration has been reviewed.
