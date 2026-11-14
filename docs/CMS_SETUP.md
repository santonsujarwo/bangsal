# Sveltia CMS setup

The Astro starter lives in the `starter/` subdirectory of this repository. The CMS configuration uses `backend.root_dir: starter`, so collection and media paths are relative to that directory.

## Repository and deployment

- Repository: `santonsujarwo/bangsal`
- Production branch: `main`
- CMS entry point: `/admin/`
- Content root: `starter/src/content/`
- Media root: `starter/public/uploads/`

If you copy the starter into a new repository where the Astro project is at the repository root, remove `backend.root_dir` from `public/admin/config.yml` and replace the repository name.

## Authentication

### Personal Access Token (initial single-editor setup)

1. Sign in with a GitHub account that has **Write** access to the repository.
2. Open `/admin/` and choose the GitHub backend.
3. When prompted, provide a fine-grained GitHub Personal Access Token restricted to this repository with **Contents: Read and write** and **Pull requests: Read and write** permissions.
4. Do not place the token in this repository, source code, environment examples, or a committed config file.

A PAT is a practical bootstrap path for a single trusted editor. It is not a shared credential and should be rotated/revoked from GitHub when no longer needed.

### Multi-editor / client production setup

For a client-facing or multi-editor deployment, use a GitHub App with the Sveltia CMS Authenticator on Cloudflare Workers:

- Authenticator project: https://github.com/sveltia/sveltia-cms-auth
- Create a GitHub App limited to the target repository.
- Grant only the repository permissions required to read and write content.
- Deploy the authenticator to Cloudflare Workers and configure the GitHub OAuth callback URL exactly as required by the authenticator documentation.
- Configure the Sveltia GitHub backend OAuth endpoint according to the deployed authenticator's current setup guide.
- Store GitHub App private keys and OAuth secrets only as Cloudflare Worker secrets. Never commit them.

The authenticator is an external deployment prerequisite; this repository does not contain credentials or pretend that OAuth is already provisioned.

## Preview

The CMS collection entries define `preview_path` values. A real preview requires the corresponding Astro preview/deployment URL to be available. Local development preview is available by running the Astro dev server from `starter/`; production preview links become useful after the site is deployed.

## Media

Sveltia stores uploaded media in `starter/public/uploads/` and writes public URLs beginning with `/uploads/`. Keep this path consistent with the Astro public directory.
