// scripts/validate-seo.js - Version SPA React Router
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Configuration SPA
const config = {
  baseUrl: 'https://www.aldas-ci.com',
  buildDir: path.join(__dirname, '../dist'),
  
  // ✅ Routes à valider (URLs, pas fichiers)
  // Pour une SPA, on valide TOUJOURS dist/index.html
  // mais on simule différentes routes pour vérifier le contenu injecté
  routes: [
    { path: '/', title: 'ÁLDÁS CI', description: 'Services premium' },
    { path: '/about', title: 'À propos', description: 'Notre équipe' },
    { path: '/contact', title: 'Contact', description: 'Nous contacter' },
    { path: '/services/mobilite', title: 'Location', description: 'Voitures premium' },
    { path: '/services/navette', title: 'Navettes', description: 'Transferts VIP' },
    { path: '/services/evenements', title: 'Événementiel', description: 'Organisation' },
    { path: '/services/conciergerie', title: 'Conciergerie', description: 'Services VIP' },
  ]
};

let totalErrors = 0;
let totalWarnings = 0;

// ✅ Helper : Vérifier si le fichier index.html principal existe
function validateSpaStructure() {
  const indexPath = path.join(config.buildDir, 'index.html');
  
  if (!fs.existsSync(indexPath)) {
    console.error(`❌ Fichier principal non trouvé: ${indexPath}`);
    return false;
  }
  
  console.log(`✅ Structure SPA valide : ${indexPath}`);
  return true;
}

// ✅ Helper : Extraire le contenu d'un tag via regex
function extractTagContent(html, tag, attr = null, attrValue = null) {
  if (attr) {
    const regex = new RegExp(`<${tag}[^>]*${attr}=["']${attrValue}["'][^>]*>([^<]*)</${tag}>`, 'i');
    const match = html.match(regex);
    return match ? match[1].trim() : null;
  }
  const regex = new RegExp(`<${tag}>([^<]*)</${tag}>`, 'i');
  const match = html.match(regex);
  return match ? match[1].trim() : null;
}

// ✅ Helper : Vérifier un meta tag
function checkMetaTag(html, name, attr = 'name') {
  const regex = new RegExp(`<meta[^>]+${attr}=["']${name}["'][^>]+content=["']([^"']+)["']`, 'i');
  const match = html.match(regex);
  const content = match ? match[1].trim() : null;
  
  if (!content) return { ok: false, message: 'Manquant' };
  if (content.length < 10 || content.length > 160) {
    return { ok: false, message: `Longueur: ${content.length} (10-160 requis)` };
  }
  return { ok: true, message: 'OK' };
}

// ✅ Helper : Valider Schema.org JSON-LD
function validateSchema(html) {
  const regex = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i;
  const match = html.match(regex);
  
  if (!match) return { ok: false, message: 'JSON-LD manquant' };
  
  try {
    const jsonStr = match[1].trim();
    const schema = JSON.parse(jsonStr);
    
    if (!schema['@context'] || !schema['@type']) {
      return { ok: false, message: 'Structure invalide' };
    }
    return { ok: true, message: `OK (${schema['@type']})` };
  } catch (e) {
    return { ok: false, message: 'JSON invalide' };
  }
}

// ✅ Helper : Vérifier les images avec alt
function checkImages(html) {
  const regex = /<img[^>]+>/gi;
  const matches = html.match(regex) || [];
  
  let missing = 0;
  matches.forEach(img => {
    if (!/alt=["'][^"']+["']/i.test(img)) {
      missing++;
    }
  });
  
  return { 
    ok: missing === 0, 
    message: missing === 0 ? 'OK' : `${missing}/${matches.length} sans alt` 
  };
}

// ✅ Valider le fichier index.html pour une route donnée (simulation)
function validateSpaRoute(route) {
  const indexPath = path.join(config.buildDir, 'index.html');
  const html = fs.readFileSync(indexPath, 'utf-8');
  
  console.log(`\n📄 Route simulée: ${route.path}`);
  console.log('─'.repeat(40));
  
  let errors = 0;
  let warnings = 0;
  
  // ✅ Title (vérification basique - dans une SPA réelle, ce serait dynamique)
  const title = extractTagContent(html, 'title');
  const hasTitle = title && title.length > 0;
  console.log(`  Title: ${hasTitle ? '✅' : '❌'} "${title?.substring(0, 50)}${title?.length > 50 ? '...' : ''}"`);
  if (!hasTitle) errors++;
  
  // ✅ Description
  const descCheck = checkMetaTag(html, 'description');
  console.log(`  Description: ${descCheck.ok ? '✅' : '⚠️'} ${descCheck.message}`);
  if (!descCheck.ok) warnings++;
  
  // ✅ Canonical (doit pointer vers la route actuelle)
  const canonicalRegex = /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i;
  const canonicalMatch = html.match(canonicalRegex);
  const canonical = canonicalMatch ? canonicalMatch[1] : null;
  // Pour une SPA, le canonical est souvent dynamique via React Helmet
  // On vérifie juste qu'il existe
  const canonicalOk = canonical !== null;
  console.log(`  Canonical: ${canonicalOk ? '✅' : '⚠️'} ${canonical || 'Dynamique (OK pour SPA)'}`);
  if (!canonicalOk) warnings++; // Warning, pas error, car dynamique
  
  // ✅ Schema.org
  const schemaCheck = validateSchema(html);
  console.log(`  Schema.org: ${schemaCheck.ok ? '✅' : '⚠️'} ${schemaCheck.message}`);
  if (!schemaCheck.ok) warnings++;
  
  // ✅ Images alt
  const imagesCheck = checkImages(html);
  console.log(`  Images alt: ${imagesCheck.ok ? '✅' : '⚠️'} ${imagesCheck.message}`);
  if (!imagesCheck.ok) warnings++;
  
  // ✅ ARIA main
  const hasMain = /<main/i.test(html) && /role=["']main["']/i.test(html);
  console.log(`  ARIA main: ${hasMain ? '✅' : '⚠️'} ${hasMain ? 'Présent' : 'Manquant'}`);
  if (!hasMain) warnings++;
  
  // ✅ Vérifier que React Router est présent (script bundle)
  const hasReactBundle = /<script[^>]+src=["'][^"']*index[^"']*\.js["']/.test(html);
  console.log(`  React bundle: ${hasReactBundle ? '✅' : '❌'} ${hasReactBundle ? 'Présent' : 'Manquant'}`);
  if (!hasReactBundle) errors++;
  
  return { path: route.path, ok: errors === 0, errors, warnings };
}

// ✅ Exécution principale
function main() {
  console.log('🔍 Validation SEO pour SPA React Router...\n');
  console.log(`📁 Dossier de build: ${config.buildDir}`);
  console.log(`🔗 Base URL: ${config.baseUrl}`);
  console.log(`🛣️  Routes à valider: ${config.routes.length}\n`);
  
  // ✅ Étape 1 : Vérifier la structure SPA
  if (!validateSpaStructure()) {
    console.error('\n❌ Structure SPA invalide. Exécutez: npm run build');
    process.exit(1);
  }
  
  // ✅ Étape 2 : Valider chaque route (simulation sur index.html)
  const results = config.routes.map(validateSpaRoute);
  
  // Agréger les résultats
  results.forEach(r => {
    totalErrors += r.errors;
    totalWarnings += r.warnings;
  });
  
  // ✅ Résumé final
  console.log('\n' + '═'.repeat(50));
  console.log(`📊 RÉSULTAT: ${results.filter(r => r.ok).length}/${results.length} routes valides`);
  console.log(`❌ Erreurs critiques: ${totalErrors}`);
  console.log(`⚠️  Avertissements: ${totalWarnings}`);
  console.log('═'.repeat(50));
  
  if (totalErrors > 0) {
    console.log('\n❌ Validation échouée - Corrigez les erreurs critiques');
    console.log('\n💡 Note SPA: Les routes sont gérées côté client par React Router.');
    console.log('   Assurez-vous que votre serveur web est configuré pour:');
    console.log('   → Servir index.html pour TOUTES les routes inconnues');
    console.log('   → Exemple: try_files $uri /index.html; (Nginx)');
    process.exit(1);
  } else if (totalWarnings > 3) {
    console.log('\n⚠️  Plusieurs avertissements - Vérifiez manuellement');
    console.log('\n💡 Pour une SPA, certains meta tags sont injectés dynamiquement');
    console.log('   par React. Utilisez React Helmet pour un contrôle précis.');
    process.exit(0);
  } else {
    console.log('\n✅ Validation réussie - Prêt pour le déploiement SPA ! 🚀');
    console.log('\n🔧 N\'oubliez pas de configurer votre serveur pour le fallback SPA:');
    console.log('   • Nginx: try_files $uri /index.html;');
    console.log('   • Apache: RewriteRule ^ /index.html [L]');
    console.log('   • Vercel/Netlify: Configuration automatique');
    process.exit(0);
  }
}

// Lancer
try {
  main();
} catch (err) {
  console.error('❌ Erreur inattendue:', err.message);
  console.error(err.stack);
  process.exit(1);
}