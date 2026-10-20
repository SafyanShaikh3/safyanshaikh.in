import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * The one place the site's public URL lives.
 *
 * Change this line when you move to a custom domain — it feeds the canonical tag, the
 * Open Graph and Twitter cards, the JSON-LD, robots.txt and sitemap.xml. Nothing else
 * needs editing.
 *
 * No trailing slash.
 */
const SITE_URL = 'https://safyanshaikh.in'

const ROBOTS = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`

const sitemap = () => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`

/** Substitutes __SITE_URL__ in index.html, and emits robots.txt + sitemap.xml on build. */
function siteUrl() {
  return {
    name: 'site-url',
    // 'pre' so the placeholder is gone before Vite's own HTML plugin parses hrefs
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => html.replaceAll('__SITE_URL__', SITE_URL),
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: ROBOTS })
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap() })
    },
  }
}

export default defineConfig({
  plugins: [react(), siteUrl()],
})
