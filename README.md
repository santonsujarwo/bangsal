# Astro + Sveltia Company Profile Agent

Codex-oriented framework for planning, designing, building, and validating company profile websites with Astro, TypeScript, Tailwind CSS, and Sveltia CMS.

## Repository layout

- `AGENTS.md` — project-wide instructions for Codex.
- `.agents/skills/` — specialized Codex skills.
- `docs/` — architecture, workflow, setup, and implementation specification.
- `templates/` — reusable project planning templates.
- `starter/` — Astro + Sveltia website starter.

## Run the Astro starter

The Astro application is in the `starter/` directory, not the repository root.

```bash
cd starter
cp .env.example .env
npm install
npm run dev
```

Before deploying, set `PUBLIC_SITE_URL` to the canonical production URL and set `PUBLIC_SITE_INDEXING=true` only in the production environment.

Validation commands:

```bash
cd starter
npm run check
npm run build
npm run preview
```

## CMS setup

- CMS entry point: `/admin/`.
- CMS config: `starter/public/admin/config.yml`.
- In this repository, the CMS GitHub backend uses `root_dir: starter`.
- When copying `starter/` into a new repository where it is the repository root, remove `root_dir` and update the backend repository name.

Read:
- [CMS authentication and media setup](docs/CMS_SETUP.md)
- [Deployment and deploy previews](docs/DEPLOYMENT.md)
- [SEO and indexing setup](docs/SEO_SETUP.md)

## Start a new client website

1. Open this repository in Codex.
2. Read `AGENTS.md` and `docs/IMPLEMENTATION_SPEC.md`.
3. Use `templates/project-kickoff.md` to start a new website project.
4. Copy `starter/` into a client website repository.
5. Configure the Git backend and authentication in `public/admin/config.yml`.
6. Connect the client repository to a deployment provider that supports pull-request deploy previews.

Sveltia CMS is Git-based; it is not a database-backed CMS by default. The Preview Workflow creates a pull request for content changes. A connected deployment provider is required for the CMS to link to the exact rendered Astro page before publishing.
