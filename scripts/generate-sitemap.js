// scripts/generate-sitemap.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Configuration
const config = {
  baseUrl: 'https://www.aldas-ci.com',
  outputPath: path.join(__dirname, '../public/sitemap.xml'),
  lastmod: new Date().toISOString().split('T')[0],
  
  // ✅ Pages à inclure (à maintenir à jour)
  pages: [
    { url: '/', priority: 1.0, changefreq: 'daily' },
    { url: '/about', priority: 0.9, changefreq: 'monthly' },
    { url: '/contact', priority: 0.9, changefreq: 'monthly' },
    { url: '/services/mobilite', priority: 0.8, changefreq: 'weekly' },
    { url: '/services/navette', priority: 0.8, changefreq: 'weekly' },
    { url: '/services/evenements', priority: 0.8, changefreq: 'weekly' },
    { url: '/services/conciergerie', priority: 0.8, changefreq: 'weekly' },
    { url: '/services/catalogue', priority: 0.7, changefreq: 'weekly' },
    /*{ url: '/mentions-legales', priority: 0.3, changefreq: 'yearly' },
    { url: '/confidentialite', priority: 0.3, changefreq: 'yearly' },*/
  ]
};

// ✅ Génération du XML
function generateSitemap() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${config.pages.map(page => `  <url>
    <loc>${config.baseUrl}${page.url}</loc>
    <lastmod>${config.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
}

// ✅ Écriture du fichier
function writeSitemap(content) {
  // Créer le dossier public s'il n'existe pas
  const publicDir = path.join(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  fs.writeFileSync(config.outputPath, content, 'utf-8');
  console.log(`✅ Sitemap généré : ${config.outputPath}`);
  console.log(`📊 ${config.pages.length} pages indexées`);
  console.log(`🔗 Base URL : ${config.baseUrl}`);
}

// ✅ Exécution principale
try {
  console.log('🗺️ Génération du sitemap en cours...\n');
  const sitemap = generateSitemap();
  writeSitemap(sitemap);
  console.log('\n✅ Terminé !');
} catch (error) {
  console.error('❌ Erreur lors de la génération du sitemap:', error.message);
  process.exit(1);
}