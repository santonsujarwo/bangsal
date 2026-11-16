import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const distDirectory = fileURLToPath(new URL('../dist/', import.meta.url));

function walk(directory) {
  return readdirSync(directory).flatMap((name) => {
    const absolutePath = join(directory, name);
    return statSync(absolutePath).isDirectory()
      ? walk(absolutePath)
      : [absolutePath];
  });
}

function exists(relativePath) {
  try {
    return statSync(join(distDirectory, relativePath)).isFile();
  } catch {
    return false;
  }
}

const files = walk(distDirectory);
const htmlFiles = files.filter((file) => file.endsWith('.html'));
const cssFiles = files.filter((file) => file.endsWith('.css'));

assert.ok(exists('index.html'), 'The production homepage must be generated.');
assert.ok(htmlFiles.length > 0, 'At least one HTML page must be generated.');
assert.ok(cssFiles.length > 0, 'Compiled CSS assets must be generated.');
assert.ok(exists('robots.txt'), 'robots.txt must be generated.');
assert.ok(
  exists('sitemap-index.xml') || exists('sitemap.xml'),
  'A sitemap must be generated.',
);

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const page = relative(distDirectory, file);

  assert.match(html, /<!doctype html>/i, \`Missing doctype in \${page}.\`);
  assert.match(html, /<html\b[^>]*\blang=/i, \`Missing document language in \${page}.\`);
  assert.match(html, /<title>[^<]+<\/title>/i, \`Missing page title in \${page}.\`);
  assert.match(
    html,
    /<link\b[^>]*\brel=["']canonical["']/i,
    \`Missing canonical URL in \${page}.\`,
  );
}

console.log(
  \`Build QA passed: \${htmlFiles.length} HTML page(s), \${cssFiles.length} CSS asset(s), robots.txt, and sitemap.\`,
);
