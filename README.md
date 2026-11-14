# Astro + Sveltia Company Profile Agent

Codex-oriented framework for planning, designing, building, and validating company profile websites with Astro, TypeScript, Tailwind CSS, and Sveltia CMS.

## Repository layout

- `AGENTS.md` — project-wide instructions for Codex.
- `.agents/skills/` — specialized Codex skills.
- `docs/` — architecture, workflow, setup, and implementation specification.
- `templates/` — reusable project planning templates.
- `starter/` — Astro + Sveltia website starter.

## Getting started

1. Open this repository in Codex.
2. Read `AGENTS.md` and `docs/IMPLEMENTATION_SPEC.md`.
3. Use `templates/project-kickoff.md` to start a new website project.
4. Copy `starter/` into a client website repository and configure the Git backend in `starter/public/admin/config.yml`.

Sveltia CMS is Git-based; it is not a database-backed CMS by default. Authentication and preview workflows must be configured and tested for the chosen Git provider and host.
