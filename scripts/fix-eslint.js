// scripts/fix-eslint.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔧 Application des correctifs ESLint...\n');

// Liste des corrections à appliquer
const fixes = [
  // 1. FeaturedEventSection.tsx - Remplacer any
  {
    file: 'src/components/Home/FeaturedEventSection.tsx',
    patterns: [
      { search: /: any/g, replace: ': unknown' },
      { search: /<any>/g, replace: '<unknown>' },
    ]
  },
  
  // 2. HeroSlider.tsx - useCallback pour nextSlide
  {
    file: 'src/components/Home/HeroSlider.tsx',
    patterns: [
      {
        search: /const nextSlide = \(\) => \{([\s\S]*?)\};[\s\n]*useEffect\(\(\) => \{([\s\S]*?)nextSlide\(\);([\s\S]*?)\}, \[current, isHovering\]\);/g,
        replace: `const nextSlide = useCallback(() => {$1}, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHovering) {
        nextSlide();
      }
    }, 7000);
    return () => clearInterval(timer);
  }, [isHovering, nextSlide]);`
      }
    ]
  },
  
  // 3. ServiceGrid.tsx - Déplacer useMemo avant return early
  {
    file: 'src/components/Services/ServiceGrid.tsx',
    patterns: [
      {
        search: /if \(displayedServices\.length === 0\) return null;[\s\n]*[\s\S]*?const gridClass = useMemo\(\(\) =>/g,
        replace: `const gridClass = useMemo(() =>
    isAboutPage 
      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" 
      : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
    [isAboutPage]
  );

  if (displayedServices.length === 0) return null;`
      }
    ]
  },
  
  // 4. ServiceHeroSection.tsx - Supprimer paramètre inutilisé
  {
    file: 'src/components/Services/ServiceHeroSection.tsx',
    patterns: [
      { search: /\(e: React\.MouseEvent<HTMLAnchorElement>\) => \{[\s\n]*console\.log/, replace: '() => { console.log' }
    ]
  },
  
  // 5. VehicleShowcase.tsx - Remplacer any
  {
    file: 'src/components/Services/VehicleShowcase.tsx',
    patterns: [
      { search: /: any/g, replace: ': unknown' },
      { search: /\(swiper: any\)/g, replace: '(swiper: { realIndex: number })' }
    ]
  },
  
  // 6. EventLightBox.tsx - setState dans useEffect
  {
    file: 'src/components/UI/EventLightBox.tsx',
    patterns: [
      {
        search: /useEffect\(\(\) => \{[\s\n]*if \(isOpen\) \{[\s\n]*setCurrentIndex\(initialIndex\);[\s\n]*setIsInfoOpen\(true\);/g,
        replace: `useEffect(() => {
    if (isOpen) {
      // Décaler les setState pour éviter cascade render
      const timer = setTimeout(() => {
        setCurrentIndex(initialIndex);
        setIsInfoOpen(true);
      }, 0);
      return () => clearTimeout(timer);`
      }
    ]
  },
  
  // 7. PageHero.tsx - Supprimer imports/variables inutilisés
  {
    file: 'src/components/UI/PageHero.tsx',
    patterns: [
      { search: /, useNavigate\} from 'react-router-dom';/, replace: " } from 'react-router-dom';" },
      { search: /const isAnchor = .*[\s\n]*\/\*.*\*\//, replace: '' }
    ]
  },
  
  // 8. PartnersSlider.tsx - Exporter seulement le composant
  {
    file: 'src/components/UI/PartnersSlider.tsx',
    patterns: [
      {
        search: /export const partners = \[[\s\S]*?\];[\s\n]*const PartnersSlider/g,
        replace: `const partners = [$1];

const PartnersSlider`
      }
    ]
  },
  
  // 9. SectionHeader.tsx - Supprimer variable inutilisée
  {
    file: 'src/components/UI/SectionHeader.tsx',
    patterns: [
      { search: /const totalDots = .*;[\s\n]*return/, replace: 'return' }
    ]
  },
  
  // 10. servicesData.ts - Remplacer any
  {
    file: 'src/data/servicesData.ts',
    patterns: [
      { search: /: any/g, replace: ': unknown' }
    ]
  },
  
  // 11. useSEO.ts - Remplacer any
  {
    file: 'src/hooks/useSEO.ts',
    patterns: [
      { search: /: any/g, replace: ': unknown' }
    ]
  },
  
  // 12. NotFound.tsx - Math.random dans useMemo
  {
    file: 'src/pages/NotFound.tsx',
    patterns: [
      {
        search: /const errorId = useMemo\(\(\) => [\s\n]*`404_NOT_FOUND_\$\{Math\.floor\(Math\.random\(\) \* 9999\)\}`,[\s\n]*\[\]\);/g,
        replace: `const errorId = useMemo(() => {
    const random = Math.floor(Math.random() * 9999);
    return \`404_NOT_FOUND_\${random}\`;
  }, []);`
      }
    ]
  },
  
  // 13. Catalogue.tsx - setState dans useEffect + any
  {
    file: 'src/pages/services/Catalogue.tsx',
    patterns: [
      {
        search: /useEffect\(\(\) => \{[\s\n]*const code = searchParams\.get\('clcx'\);[\s\n]*if \(code\) \{[\s\n]*setSelectedCarCode\(code\);[\s\n]*\}[\s\n]*\}, \[searchParams\]\);/g,
        replace: `useEffect(() => {
    const code = searchParams.get('clcx');
    if (code) {
      // Décaler pour éviter cascade render
      const timer = setTimeout(() => setSelectedCarCode(code), 0);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);`
      },
      { search: /: any/g, replace: ': unknown' }
    ]
  },
  
  // 14. Mobilite.tsx - Variables inutilisées
  {
    file: 'src/pages/services/Mobilite.tsx',
    patterns: [
      { search: /\(e: React\.MouseEvent<HTMLAnchorElement>\) => \{[\s\n]*console\.log/, replace: '() => { console.log' },
      { search: /const formatPrice = .*;[\s\n]*[\s\S]*?return \(/, replace: 'return (' },
      { search: /{conciergeServices\.map\(\(service, idx\) =>/g, replace: '{conciergeServices.map((service, _idx) =>' }
    ]
  },
  
  // 15. Navette.tsx - Variables inutilisées
  {
    file: 'src/pages/services/Navette.tsx',
    patterns: [
      { search: /const fadeInRight: Variants = \{[\s\S]*?\};[\s\n]*[\s\S]*?const prefersReducedMotion/g, replace: 'const prefersReducedMotion' },
      { search: /const handlePoleLinkClick = .*;[\s\n]*[\s\S]*?return \(/, replace: 'return (' }
    ]
  },
  
  // 16. conciergerie.tsx - idx inutilisé
  {
    file: 'src/pages/services/conciergerie.tsx',
    patterns: [
      { search: /{conciergeServices\.map\(\(service, idx\) =>/g, replace: '{conciergeServices.map((service, _idx) =>' }
    ]
  },
  
  // 17. analitics.ts - Remplacer any
  {
    file: 'src/utils/analitics.ts',
    patterns: [
      { search: /: any/g, replace: ': unknown' }
    ]
  }
];

// Appliquer les corrections
fixes.forEach(({ file, patterns }) => {
  const filePath = path.join(process.cwd(), file);
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Fichier non trouvé: ${file}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  
  patterns.forEach(({ search, replace }) => {
    const newContent = content.replace(search, replace);
    if (newContent !== content) {
      content = newContent;
      modified = true;
    }
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Corrigé: ${file}`);
  } else {
    console.log(`ℹ️  Déjà corrigé ou pattern non trouvé: ${file}`);
  }
});

console.log('\n✨ Terminé ! Exécutez `npm run lint:strict` pour vérifier.');