# Deployment and real site previews

## Vercel project setup

1. Import `santonsujarwo/bangsal` into Vercel.
2. Set the project **Root Directory** to `starter`.
3. Use the Astro framework preset.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Enable Git integration so each pull request gets a Vercel Deployment Preview.
7. Confirm Vercel's GitHub App can report deployment/check-run status to this repository.

The GitHub Actions workflow in `.github/workflows/astro-ci.yml` validates the project. Vercel provides the hosted production and pull-request preview deployments.

## Environment variables

Configure these in Vercel:

| Environment | `PUBLIC_SITE_URL` | `PUBLIC_SITE_INDEXING` |
|---|---|---|
| Production | Your canonical production URL | `true` |
| Preview | Leave unset or use a non-production URL | `false` |
| Development | `http://localhost:4321` | `false` |

Do not enable indexing for preview deployments. The Astro layout emits `noindex,nofollow` unless `PUBLIC_SITE_INDEXING=true`.

## CMS publishing workflow

The Sveltia configuration uses `publish_mode: preview`. Editors save content to a branch and open a pull request rather than committing directly to `main`.

Once Vercel has built that pull request, Sveltia can link to the deploy preview using the `preview_path` configured for each content collection. The preview URL renders the actual Astro page, including the site layout and styles.

Required GitHub permissions for the CMS identity:

- Contents: Read and write
- Pull requests: Read and write
- Metadata: Read (GitHub default)

For a GitHub App, install it only on this repository and keep its private key and client secret in the Cloudflare Worker Authenticator secrets. For a PAT used during initial setup, grant the same repository-scoped permissions and never commit the token.

## Runtime and lockfile

The starter requires Node.js `22.22.1` or newer. The starter currently has no committed `package-lock.json`; CI uses `npm install` for now. After a successful install, commit the generated `starter/package-lock.json` and change CI to `npm ci` so dependency resolution becomes reproducible.
