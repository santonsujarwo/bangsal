# Sveltia CMS setup

The Astro starter lives in the `starter/` subdirectory. Sveltia uses `backend.root_dir: starter`, so collection and media paths are relative to that directory.

## Repository and deployment

- Repository: `santonsujarwo/bangsal`
- Production branch: `main`
- CMS entry point: `/admin/`
- Content root: `starter/src/content/`
- Media root: `starter/public/uploads/`

## Authentication

For a single trusted editor, sign in with a GitHub account that has Write access and provide a fine-grained PAT limited to this repository with Contents and Pull requests read/write permissions. Never commit the token.

For client-facing or multi-editor deployments, use a GitHub App with the Sveltia CMS Authenticator on Cloudflare Workers. Store private keys and OAuth secrets only as Worker secrets.

## Page editing

### Page Information
- **Page Title** is the visible page heading/title.
- **Page Description** is a short page summary and fallback description for search/social metadata.
- **Page Template — Default** includes the shared site header and footer.
- **Page Template — Landing** omits the shared header/footer for focused campaign pages.

### Content Editor

Choose exactly one mode using **Content Editor**:

- **Block Builder** displays the Sections field. Build a page from Hero, Rich Text, Image Text, Feature Grid, CTA, and FAQ sections.
- **Classic Content Editor** displays the Markdown/Rich Text Body field for writing a page as one continuous document.

Only the selected editor is rendered on the public page and in the CMS preview. Switching modes does not delete the content stored in the other mode, so switching back can recover it. Review the selected mode before publishing.

Existing pages without a `content_mode` value default to **Block Builder**, preserving the existing section-based pages.

### SEO Settings

SEO fields are grouped in the collapsible **SEO Settings** panel at the bottom of the page form:

- SEO Title
- SEO Description
- Canonical URL
- Open Graph Image
- No Index

Older content that still uses the previous flat SEO frontmatter remains supported. Newly edited entries use the grouped SEO object.

## Listing page settings

Open **Site Settings → General** to edit Blog Page Title/Description and Services Page Title/Description. These control visible listing copy and page metadata.

## Publication workflow

Pages, Services, and Blog Posts use Sveltia Editorial Workflow with one Draft stage. Publication state is managed by the workflow; there is no separate Draft boolean field in the editor.

1. Create an entry and save it.
2. It remains in the Draft workflow stage until ready.
3. Choose **Publish Entry** to publish. The resulting change is submitted as a pull request and merged to `main` after configured checks pass.

To remove a published entry, choose **Delete Entry** from the editor menu. Sveltia stages deletion through a pull request so it can be finalized or canceled.

## Preview and media

Collection entries define `preview_path` values. Preview links require a corresponding Astro deployment to be available. Sveltia stores uploads in `starter/public/uploads/` and writes public URLs beginning with `/uploads/`.

The deployed Astro page remains the source of truth for responsive and production QA.
