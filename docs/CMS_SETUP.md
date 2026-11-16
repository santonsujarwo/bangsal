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

## Page editing

The Pages collection supports two templates:

- **Default** — renders the shared site header and footer around the page content.
- **Landing** — renders the page without the shared header and footer, and lets the page sections use the full main-content width. Use this for campaign or focused conversion pages.

The Home, About, and Contact routes read their matching Pages entries. The homepage renders both structured Sections and the Markdown Body. About and Contact render both as well. A page marked Draft is not exposed on its public route; dynamic pages are omitted from static generation, and About/Contact redirect to the 404 route. A draft Home entry is replaced with a non-indexable unpublished notice until it is published.

## Listing page settings

Open **Site Settings → General** to edit:

- Blog Page Title and Blog Page Description
- Services Page Title and Services Page Description

These values control both the visible heading/intro copy and the page title/description metadata. If left empty, the site uses the built-in defaults.

## Content editing and deletion workflow

Pages, Services, and Blog Posts use Sveltia's Editorial Workflow with a single **Draft** stage. This keeps the process short while retaining a safe publish step:

1. Choose **New** in the collection and create the entry.
2. Save it as a draft. It appears in the CMS workflow board under Draft.
3. Open the draft and choose **Publish Entry** when it is ready. The resulting pull request is merged to `main` after the configured checks pass.

To remove a published entry:

1. Open the entry in its editor and choose **Delete Entry** from the three-dot menu.
2. Sveltia opens a deletion pull request. The entry remains on the live site and is marked **Pending Deletion** until the deletion is finalized.
3. In the Editorial Workflow page, choose **Delete** to complete the removal, or **Cancel** to keep the entry.

A pending deletion is not a normal draft and does not move through the Draft stage. This is intentional: deleting a published entry is staged as a pull request, so it can be canceled before it is merged. Do not delete the CMS-generated pull request manually if you want to retain this workflow.

Site Settings remains on Preview Workflow and is not changed by these collection-level settings.
