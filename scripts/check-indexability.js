// scripts/check-indexability.js
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://www.aldas-ci.com';
const pages = [
  '/',
  '/services/mobilite',
  '/services/navette', 
  '/services/conciergerie',
  '/services/evenements',
  '/about',
  '/contact'
];

async function checkPage(pathname) {
  const url = `${BASE_URL}${pathname}`;
  
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }}, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const hasNoindex = data.includes('name="robots"') && data.includes('noindex');
        const hasCanonical = data.includes('rel="canonical"');
        const hasH1 = data.includes('<h1') || data.includes('itemProp="name"');
        const contentLength = data.length;
        
        resolve({
          url,
          status: res.statusCode,
          hasNoindex,
          hasCanonical, 
          hasH1,
          contentLength,
          ok: res.statusCode === 200 && !hasNoindex && hasH1
        });
      });
    }).on('error', (err) => {
      resolve({ url, error: err.message, ok: false });
    });
  });
}

(async () => {
  console.log(`🔍 Vérification de l'indexabilité des pages...\n`);
  
  const results = await Promise.all(pages.map(checkPage));
  
  results.forEach(r => {
    if (r.error) {
      console.log(`❌ ${r.url} : ${r.error}`);
    } else if (!r.ok) {
      console.log(`⚠️  ${r.url}`);
      if (r.status !== 200) console.log(`   📡 HTTP ${r.status}`);
      if (r.hasNoindex) console.log(`   🚫 Balise noindex détectée`);
      if (!r.hasH1) console.log(`   📝 Pas de H1 trouvé`);
      if (!r.hasCanonical) console.log(`   🔗 Pas de canonical`);
    } else {
      console.log(`✅ ${r.url} : Prête pour l'indexation`);
    }
  });
  
  const ready = results.filter(r => r.ok).length;
  console.log(`\n📊 Résumé : ${ready}/${pages.length} pages prêtes`);
})();