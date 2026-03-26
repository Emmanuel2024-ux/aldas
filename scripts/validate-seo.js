// scripts/validate-seo.js - Validation SEO locale
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const checks = [
  {
    name: 'robots.txt existe',
    test: () => fs.existsSync(path.join(__dirname, '..', 'public', 'robots.txt'))
  },
  {
    name: 'sitemap.xml existe',
    test: () => fs.existsSync(path.join(__dirname, '..', 'public', 'sitemap.xml'))
  },
  {
    name: 'favicon.ico existe',
    test: () => fs.existsSync(path.join(__dirname, '..', 'public', 'favicon.ico'))
  },
  {
    name: 'Images OG présentes',
    test: () => {
      const ogs = ['home', 'mobilite', 'navette', 'conciergerie', 'evenements', 'about', 'contact'];
      return ogs.every(page => 
        fs.existsSync(path.join(__dirname, '..', 'public', 'ogs', `og-${page}.jpg`))
      );
    }
  },
  {
    name: 'index.html a les meta tags de base',
    test: () => {
      const html = fs.readFileSync(path.join(__dirname, '..', 'src', 'index.html'), 'utf-8');
      return html.includes('<meta name="description"') && 
             html.includes('<meta property="og:title"');
    }
  }
];

console.log('🔍 Validation SEO locale...\n');

let passed = 0;
checks.forEach(check => {
  const result = check.test();
  console.log(`${result ? '✅' : '❌'} ${check.name}`);
  if (result) passed++;
});

console.log(`\n📊 Résultat : ${passed}/${checks.length} vérifications passées`);

if (passed === checks.length) {
  console.log('🎉 Votre site est prêt pour l\'indexation !');
  process.exit(0);
} else {
  console.log('⚠️  Corrigez les éléments manquants avant de soumettre à Google.');
  process.exit(1);
}