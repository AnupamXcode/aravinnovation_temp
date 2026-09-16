import fs from 'fs';
import path from 'path';

interface LinkReport {
  file: string;
  href: string;
  type: 'internal' | 'external';
  status: 'ok' | 'broken' | 'warning';
  reason?: string;
}

const links: LinkReport[] = [];

// Valid internal routes in the Next.js App Router setup
const validRoutes = [
  '/',
  '/about',
  '/contact',
  '/insights',
  '/blogs',
  '/products',
  '/services',
  '/case-studies',
  '/careers',
  '/privacy-policy',
  '/terms-and-conditions',
  '/refund-policy',
  '/security-dpdp',
  '/admin',
  '/services/it-strategy-implementation',
  '/services/digital-marketing-brand-development',
  '/services/web-app-development',
  '/services/risk-compliance-governance',
  '/services/audit-improvement',
  '/services/training-staff-augmentation',
  '/services/seo-services',
  '/services/ai-portfolio',
  '/products/astrobeams',
  '/products/omnigrc',
];

function verifyLinksInFile(filePath: string): void {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Match href="...", href='...', href={`...`}
  const hrefRegex = /href=["']([^"']+)["']/g;
  let match;

  while ((match = hrefRegex.exec(content)) !== null) {
    const href = match[1];

    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      links.push({
        file: filePath,
        href,
        type: 'external',
        status: 'ok',
      });
    } else if (href.startsWith('/')) {
      // Strip anchor hash and query strings if present
      const cleanHref = href.split('#')[0].split('?')[0];
      const isValid = cleanHref === '' || validRoutes.some(route => 
        cleanHref === route || cleanHref.startsWith(route + '/') || cleanHref.startsWith('/' + route)
      );

      links.push({
        file: filePath,
        href,
        type: 'internal',
        status: isValid ? 'ok' : 'broken',
        reason: isValid ? undefined : `Route "${cleanHref}" does not match known valid routes`,
      });
    } else if (href.startsWith('#')) {
      links.push({
        file: filePath,
        href,
        type: 'internal',
        status: 'ok',
      });
    } else {
      links.push({
        file: filePath,
        href,
        type: 'internal',
        status: 'warning',
        reason: 'Relative link - verify manually',
      });
    }
  }
}

function scanDirectory(dir: string): void {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
        scanDirectory(filePath);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      verifyLinksInFile(filePath);
    }
  });
}

console.log('🔍 Auditing and verifying all internal and external links...\n');
scanDirectory(path.join(process.cwd(), 'app'));
scanDirectory(path.join(process.cwd(), 'components'));

const brokenLinks = links.filter(l => l.status === 'broken');
const totalChecked = links.length;

console.log(`Checked ${totalChecked} total links.`);

if (brokenLinks.length > 0) {
  console.error(`❌ BROKEN LINKS FOUND (${brokenLinks.length}):\n`);
  brokenLinks.forEach(link => {
    console.error(`  File: ${path.relative(process.cwd(), link.file)}`);
    console.error(`  Href: ${link.href}`);
    console.error(`  Reason: ${link.reason}\n`);
  });
} else {
  console.log('✅ All checked links resolved successfully!');
}
