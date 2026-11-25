import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const SSR_DIR = path.join(ROOT_DIR, 'dist-ssr');

function escapeHtmlAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeHtmlText(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function replaceMetaTag(html, attrName, attrValue, newContent) {
  const safeContent = escapeHtmlAttr(newContent);
  const regex = new RegExp(
    `<meta\\s+[^>]*${attrName}=["']${attrValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*>`,
    'i'
  );
  const replacement = `<meta ${attrName}="${attrValue}" content="${safeContent}" />`;
  if (regex.test(html)) {
    return html.replace(regex, replacement);
  }
  return html.replace('</head>', `    ${replacement}\n  </head>`);
}

function applySeoHead(templateHtml, head) {
  if (!head) return templateHtml;
  let html = templateHtml;

  // Title
  if (head.title) {
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtmlText(head.title)}</title>`);
  }

  // Standard Meta Tags
  if (head.description) {
    html = replaceMetaTag(html, 'name', 'description', head.description);
  }
  if (head.keywords) {
    html = replaceMetaTag(html, 'name', 'keywords', head.keywords);
  }
  if (head.robots) {
    html = replaceMetaTag(html, 'name', 'robots', head.robots);
  }

  // Canonical Link
  if (head.canonicalUrl) {
    const canonicalTag = `<link rel="canonical" href="${escapeHtmlAttr(head.canonicalUrl)}" />`;
    if (/<link\s+[^>]*rel=["']canonical["'][^>]*>/i.test(html)) {
      html = html.replace(/<link\s+[^>]*rel=["']canonical["'][^>]*>/i, canonicalTag);
    } else {
      html = html.replace('</head>', `    ${canonicalTag}\n  </head>`);
    }
  }

  // Open Graph Tags
  if (head.ogType) {
    html = replaceMetaTag(html, 'property', 'og:type', head.ogType);
  }
  if (head.canonicalUrl) {
    html = replaceMetaTag(html, 'property', 'og:url', head.canonicalUrl);
  }
  if (head.title) {
    html = replaceMetaTag(html, 'property', 'og:title', head.title);
  }
  if (head.description) {
    html = replaceMetaTag(html, 'property', 'og:description', head.description);
  }
  if (head.ogImage) {
    html = replaceMetaTag(html, 'property', 'og:image', head.ogImage);
  }

  // Twitter Cards
  if (head.title) {
    html = replaceMetaTag(html, 'name', 'twitter:title', head.title);
  }
  if (head.description) {
    html = replaceMetaTag(html, 'name', 'twitter:description', head.description);
  }
  if (head.ogImage) {
    html = replaceMetaTag(html, 'name', 'twitter:image', head.ogImage);
  }

  // Page-specific JSON-LD
  html = html.replace(/<script\s+id=["']dynamic-page-jsonld["'][^>]*>[\s\S]*?<\/script>\s*/i, '');
  if (head.jsonLd) {
    const safeJson = JSON.stringify(head.jsonLd).replace(/<\/script>/gi, '<\\/script>');
    const jsonLdTag = `    <script id="dynamic-page-jsonld" type="application/ld+json">${safeJson}</script>\n`;
    html = html.replace('</head>', `${jsonLdTag}  </head>`);
  }

  return html;
}

async function runPrerender() {
  const templatePath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error('dist/index.html not found. Run client vite build first.');
  }

  // Find built SSR entry file (.js or .mjs)
  const entryCandidates = ['entry-server.js', 'entry-server.mjs', 'entry-server.cjs'];
  const entryFile = entryCandidates
    .map((name) => path.join(SSR_DIR, name))
    .find((p) => fs.existsSync(p));

  if (!entryFile) {
    throw new Error(`SSR entry bundle not found in ${SSR_DIR}`);
  }

  const template = fs.readFileSync(templatePath, 'utf-8');
  const { render, SSG_ROUTES } = await import(pathToFileURL(entryFile).href);

  console.log(`[SSG] Pre-rendering ${SSG_ROUTES.length} routes...`);

  for (const route of SSG_ROUTES) {
    const { html: appHtml, head } = render(route);

    let pageHtml = template.replace(
      /<div id="root"><\/div>/,
      `<div id="root">${appHtml}</div>`
    );
    pageHtml = applySeoHead(pageHtml, head);

    let outputFile;
    if (route === '/') {
      outputFile = path.join(DIST_DIR, 'index.html');
    } else if (route === '/404') {
      outputFile = path.join(DIST_DIR, '404.html');
    } else {
      const cleanRoute = route.replace(/^\/+|\/+$/g, '');
      const routeDir = path.join(DIST_DIR, cleanRoute);
      fs.mkdirSync(routeDir, { recursive: true });
      outputFile = path.join(routeDir, 'index.html');
    }

    fs.writeFileSync(outputFile, pageHtml, 'utf-8');
    console.log(
      `  ✓ ${route.padEnd(28)} -> ${path.relative(ROOT_DIR, outputFile)} (${head?.title || 'no title'})`
    );
  }

  // Remove temporary SSR bundle directory
  fs.rmSync(SSR_DIR, { recursive: true, force: true });
  console.log('[SSG] Pre-rendering complete! All pages contain static HTML and per-route SEO meta tags.');
}

runPrerender().catch((err) => {
  console.error('[SSG] Pre-rendering failed:', err);
  process.exit(1);
});
