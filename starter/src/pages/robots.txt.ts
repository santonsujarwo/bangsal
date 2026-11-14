import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const origin = site?.origin ?? 'https://example.com';
  const indexingEnabled = import.meta.env.PUBLIC_SITE_INDEXING === 'true';

  if (!indexingEnabled) {
    return new Response('User-agent: *\nDisallow: /\n', {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  return new Response(
    `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap-index.xml\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
};
