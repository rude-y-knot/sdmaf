import React, { createContext, useContext, useEffect } from 'react';

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  robots?: string;
  ogType?: 'website' | 'article' | 'product';
  ogImage?: string;
  jsonLd?: Record<string, any> | Array<Record<string, any>>;
}

export interface CollectedSEOData {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl: string;
  robots: string;
  ogType: 'website' | 'article' | 'product';
  ogImage: string;
  jsonLd?: Record<string, any> | Array<Record<string, any>>;
}

const BASE_URL = 'https://sdmaf.ru';
const DEFAULT_ROBOTS =
  'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

const SEOCollectorContext = createContext<{ current: CollectedSEOData | null } | null>(null);

export const SEOProvider: React.FC<{
  collector: { current: CollectedSEOData | null };
  children: React.ReactNode;
}> = ({ collector, children }) => (
  <SEOCollectorContext.Provider value={collector}>
    {children}
  </SEOCollectorContext.Provider>
);

function buildCanonicalUrl(canonicalPath: string): string {
  if (!canonicalPath || canonicalPath === '/') {
    return `${BASE_URL}/`;
  }
  const normalized = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
  return `${BASE_URL}${normalized.replace(/\/+$/, '')}`;
}

export const SEOHead: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonicalPath = '/',
  robots = DEFAULT_ROBOTS,
  ogType = 'website',
  ogImage = 'https://sdmaf.ru/logo.png',
  jsonLd,
}) => {
  const collector = useContext(SEOCollectorContext);
  const canonicalUrl = buildCanonicalUrl(canonicalPath);

  // Synchronously collect head metadata during Vite SSG / SSR rendering
  if (collector) {
    collector.current = {
      title,
      description,
      keywords,
      canonicalUrl,
      robots,
      ogType,
      ogImage,
      jsonLd,
    };
  }

  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // Helper to update or create meta tag
    const setMetaTag = (attrName: string, attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'robots', robots);
    if (keywords) {
      setMetaTag('name', 'keywords', keywords);
    }

    // 3. Open Graph Tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:site_name', 'Завод металлоконструкций и МАФ «Стальное Дело»');
    setMetaTag('property', 'og:locale', 'ru_RU');
    setMetaTag('property', 'og:url', canonicalUrl);
    if (ogImage) {
      setMetaTag('property', 'og:image', ogImage);
    }

    // 4. Twitter Cards
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    if (ogImage) {
      setMetaTag('name', 'twitter:image', ogImage);
    }

    // 5. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 6. Dynamic JSON-LD Structured Data
    const SCRIPT_ID = 'dynamic-page-jsonld';
    let scriptEl = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (jsonLd) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = SCRIPT_ID;
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(jsonLd);
    } else if (scriptEl) {
      scriptEl.remove();
    }

    return () => {
      // Optional clean-up when component unmounts
      const currentScript = document.getElementById(SCRIPT_ID);
      if (currentScript) {
        currentScript.remove();
      }
    };
  }, [title, description, keywords, canonicalUrl, robots, ogType, ogImage, jsonLd]);

  return null;
};
