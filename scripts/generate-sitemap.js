// scripts/generate-sitemap.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://www.aldas-ci.com';
const LAST_MOD = new Date().toISOString().split('T')[0];

// Pages à inclure dans le sitemap
const pages = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/services/mobilite', changefreq: 'daily', priority: 0.9 },
  { url: '/services/navette', changefreq: 'daily', priority: 0.9 },
  { url: '/services/conciergerie', changefreq: 'weekly', priority: 0.8 },
  { url: '/services/evenements', changefreq: 'weekly', priority: 0.8 },
  { url: '/about', changefreq: 'monthly', priority: 0.7 },
  { url: '/contact', changefreq: 'monthly', priority: 0.7 }
];

// Générer le XML
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${pages.map(page => `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${LAST_MOD}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

// Écrire dans public/
const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(outputPath, sitemap, 'utf-8');

console.log(`✅ Sitemap généré : ${outputPath}`);
console.log(`📊 ${pages.length} pages indexées`);
console.log(`🔗 URL de soumission : ${BASE_URL}/sitemap.xml`);