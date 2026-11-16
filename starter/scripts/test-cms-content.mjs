import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const pagesDir = resolve(root, 'src/content/pages');
const outputDir = resolve(root, 'dist-cms-test');
const config = readFileSync(resolve(root, 'public/admin/config.yml'), 'utf8');
const preview = readFileSync(resolve(root, 'public/admin/preview.js'), 'utf8');

const fixtures = {
  classic: resolve(pagesDir, '__qa-cms-classic.md'),
  blocks: resolve(pagesDir, '__qa-cms-blocks.md'),
};

const classicContent = `---
title: CMS QA Classic Page
description: Classic editor integration test description.
template: default
draft: false
content_mode:
  type: classic
  body: |
    # CLASSIC_BODY_RENDERED_MARKER

    This paragraph confirms Markdown body output.
seo:
  title: CMS QA Classic SEO Title
  description: CMS QA Classic SEO Description
  canonical_url: /__qa-cms-classic/
  noindex: true
---
`;

const blocksContent = `---
title: CMS QA Block Page
description: Block editor integration test description.
template: default
draft: false
content_mode:
  type: block_builder
  sections:
    - type: hero
      eyebrow: CMS QA EYEBROW
      heading: BLOCK_BUILDER_HERO_MARKER
      body: This verifies the hero body renders from the block data.
      button_label: Test CTA
      button_url: /contact/
    - type: feature_grid
      heading: CMS QA Feature Grid
      items:
        - title: BLOCK_FEATURE_MARKER
          body: Feature item content.
    - type: faq
      heading: CMS QA FAQ
      items:
        - title: BLOCK_FAQ_MARKER
          body: FAQ answer content.
    - type: cta
      heading: CMS QA CTA
      body: CTA section body.
      button_label: CTA Action
      button_url: /contact/
seo:
  title: CMS QA Block SEO Title
  description: CMS QA Block SEO Description
  canonical_url: /__qa-cms-blocks/
  noindex: true
---
`;

function htmlAt(slug) {
  const file = resolve(outputDir, slug, 'index.html');
  assert.ok(existsSync(file), `Expected generated route: ${slug}`);
  return readFileSync(file, 'utf8');
}

function has(html, pattern, message) {
  assert.match(html, pattern, message);
}

try {
  mkdirSync(pagesDir, { recursive: true });
  writeFileSync(fixtures.classic, classicContent);
  writeFileSync(fixtures.blocks, blocksContent);

  // CMS config contract: one typed object selector with mutually exclusive subfields.
  has(config, /name:\s*content_mode[\s\S]*?widget:\s*object[\s\S]*?typeKey:\s*type/, 'Content Editor must be a typed object widget.');
  has(config, /name:\s*block_builder[\s\S]*?fields:[\s\S]*?name:\s*sections/, 'Block Builder must expose Sections.');
  has(config, /name:\s*classic[\s\S]*?fields:[\s\S]*?name:\s*body[\s\S]*?widget:\s*markdown/, 'Classic Editor must expose a Markdown body.');
  assert.ok(preview.includes("CMS.registerPreviewTemplate('pages', PagePreview)"), 'Pages CMS preview template must be registered.');
  assert.ok(preview.includes("widgetFor('content_mode.body')"), 'Classic preview must resolve the nested body field.');

  // Build isolated temporary routes from dummy CMS-shaped content.
  execFileSync('npx', ['astro', 'build', '--outDir', './dist-cms-test'], { stdio: 'inherit' });

  const classic = htmlAt('__qa-cms-classic');
  has(classic, /CLASSIC_BODY_RENDERED_MARKER/, 'Classic Markdown body should render on the generated page.');
  has(classic, /CMS QA Classic SEO Title/, 'Classic SEO title should render.');
  has(classic, /rel="canonical"[^>]*href="[^"]*\/__qa-cms-classic\//, 'Classic canonical URL should render.');
  has(classic, /site-header/, 'Default template should include the shared site header.');
  has(classic, /site-footer/, 'Default template should include the shared site footer.');

  const blocks = htmlAt('__qa-cms-blocks');
  has(blocks, /BLOCK_BUILDER_HERO_MARKER/, 'Block Builder hero heading should render.');
  has(blocks, /BLOCK_FEATURE_MARKER/, 'Feature Grid item should render.');
  has(blocks, /BLOCK_FAQ_MARKER/, 'FAQ item should render.');
  has(blocks, /CMS QA CTA/, 'CTA section should render.');
  has(blocks, /href="\/contact\//, 'CTA link should render.');
  has(blocks, /CMS QA Block SEO Title/, 'Block Builder SEO title should render.');
  has(blocks, /site-header/, 'Default template should include the shared site header.');
  has(blocks, /site-footer/, 'Default template should include the shared site footer.');

  console.log('CMS content integration QA passed: typed editor config, Classic Markdown rendering, Block Builder sections, SEO metadata, canonical URLs, and shared layout.');
} finally {
  for (const file of Object.values(fixtures)) {
    if (existsSync(file)) rmSync(file);
  }
  if (existsSync(outputDir)) rmSync(outputDir, { recursive: true, force: true });
}
