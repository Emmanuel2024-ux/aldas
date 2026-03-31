// scripts/check-indexability.js
import https from 'https';
import { JSDOM } from 'jsdom';

// ✅ Configuration
const config = {
  baseUrl: 'https://www.aldas-ci.com',
  timeout: 10000, // 10 secondes
  
  // ✅ Pages à tester
  pages: [
    '/',
    '/about',
    '/contact',
    '/services/mobilite',
    '/services/navette',
    '/services/evenements',
    '/services/conciergerie',
  ],
  
  // ✅ Headers simulés pour Googlebot
  headers: {
    'User-Agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Connection': 'close'
  }
};

// ✅ Vérifier une page
function checkPage(pagePath) {
  return new Promise((resolve) => {
    const url = `${config.baseUrl}${pagePath}`;
    const start = Date.now();
    
    console.log(`\n📄 ${pagePath}`);
    console.log('─'.repeat(40));
    
    const req = https.get(url, { headers: config.headers, timeout: config.timeout }, (res) => {
      const duration = Date.now() - start;
      let data = '';
      
      // ✅ Code HTTP
      console.log(`  Status: ${res.statusCode} ${res.statusMessage}`);
      console.log(`  Temps: ${duration}ms`);
      
      if (res.statusCode !== 200) {
        console.log(`  ❌ Erreur HTTP ${res.statusCode}`);
        resolve({ path: pagePath, ok: false, error: `HTTP ${res.statusCode}` });
        return;
      }
      
      // ✅ Collecter les données
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        // ✅ Vérifier noindex
        const noindex = data.match(/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex[^"']*["']/i);
        if (noindex) {
          console.log(`  ❌ Balise noindex détectée`);
          resolve({ path: pagePath, ok: false, error: 'noindex' });
          return;
        }
        console.log(`  ✅ Pas de noindex`);
        
        // ✅ Vérifier le rendu du contenu (basique)
        try {
          const dom = new JSDOM(data);
          const doc = dom.window.document;
          
          const hasMain = !!doc.querySelector('main, [role="main"]');
          const hasH1 = !!doc.querySelector('h1');
          const hasContent = doc.body.textContent?.trim().length > 100;
          
          if (hasMain && hasH1 && hasContent) {
            console.log(`  ✅ Contenu principal détecté`);
          } else {
            console.log(`  ⚠️ Contenu principal partiel (${hasMain ? '✓' : '✗'} main, ${hasH1 ? '✓' : '✗'} h1)`);
          }
        } catch (e) {
          console.log(`  ⚠️ Impossible d'analyser le rendu: ${e.message}`);
        }
        
        // ✅ Temps de réponse
        if (duration > 3000) {
          console.log(`  ⚠️ Temps de réponse lent: ${duration}ms (>3s)`);
        } else {
          console.log(`  ✅ Temps de réponse: OK`);
        }
        
        resolve({ path: pagePath, ok: true });
      });
    }).on('error', (err) => {
      console.log(`  ❌ Erreur réseau: ${err.message}`);
      resolve({ path: pagePath, ok: false, error: err.message });
    }).on('timeout', () => {
      console.log(`  ❌ Timeout après ${config.timeout}ms`);
      req.destroy();
      resolve({ path: pagePath, ok: false, error: 'timeout' });
    });
  });
}

// ✅ Exécution principale
async function main() {
  console.log('🕷️ Simulation Googlebot - Test d\'indexabilité...\n');
  console.log(`🔗 Base URL: ${config.baseUrl}`);
  console.log(`📄 Pages à tester: ${config.pages.length}`);
  console.log(`⏱️  Timeout: ${config.timeout}ms\n`);
  
  // Tester chaque page en parallèle (avec limite de concurrence si besoin)
  const results = await Promise.all(config.pages.map(checkPage));
  
  // ✅ Résumé
  const ok = results.filter(r => r.ok).length;
  const failed = results.filter(r => !r.ok);
  
  console.log('\n' + '═'.repeat(50));
  console.log(`📊 RÉSULTAT: ${ok}/${results.length} pages indexables`);
  
  if (failed.length > 0) {
    console.log('\n❌ Pages problématiques:');
    failed.forEach(r => {
      console.log(`  • ${r.path}: ${r.error}`);
    });
    console.log('\n💡 Conseil: Vérifiez robots.txt, headers serveur, et le rendu JS');
    process.exit(1);
  } else {
    console.log('\n✅ Toutes les pages sont indexables par Googlebot 🎉');
    console.log('💡 Prochainement: Soumettez votre sitemap dans Google Search Console');
    process.exit(0);
  }
}

// Lancer
main().catch(err => {
  console.error('❌ Erreur inattendue:', err.message);
  process.exit(1);
});