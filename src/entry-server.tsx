import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import { SEOProvider, type CollectedSEOData } from './components/SEOHead';
import { SITEMAP_ROUTES } from './utils/sitemapGenerator';

export interface SSGResult {
  html: string;
  head: CollectedSEOData | null;
}

/**
 * All routes to statically pre-render (SSG) at build time:
 * - Every canonical route from SITEMAP_ROUTES
 * - Direct /production/:unitId detail pages (with canonical pointing to their short URL)
 * - /404 page (written to dist/404.html and served with HTTP 404 status)
 */
export const SSG_ROUTES: string[] = Array.from(
  new Set([
    ...SITEMAP_ROUTES.map((r) => r.path),
    '/production/laser-22kw-6m',
    '/production/bending-250t',
    '/production/rolling-faccin',
    '/production/coating-ral',
    '/production/welding-naks',
    '/404',
  ])
);

export function render(url: string): SSGResult {
  const headCollector: { current: CollectedSEOData | null } = { current: null };

  const html = renderToString(
    <React.StrictMode>
      <SEOProvider collector={headCollector}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </SEOProvider>
    </React.StrictMode>
  );

  return {
    html,
    head: headCollector.current,
  };
}
