import React, { useState, useMemo } from 'react';
import { 
  FileCode, 
  Download, 
  Copy, 
  Check, 
  ExternalLink, 
  X, 
  Search, 
  Globe, 
  Layers, 
  CheckCircle2, 
  ArrowUpRight,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { 
  SITEMAP_ROUTES, 
  SITE_DOMAIN_DEFAULT, 
  generateSitemapXml, 
  downloadSitemapFile, 
  copySitemapToClipboard,
  getAbsoluteUrl,
  SitemapRoute 
} from '../utils/sitemapGenerator';

interface SitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateRoute?: (path: string) => void;
}

export const SitemapModal: React.FC<SitemapModalProps> = ({
  isOpen,
  onClose,
  onNavigateRoute,
}) => {
  const [activeTab, setActiveTab] = useState<'routes' | 'xml' | 'info'>('routes');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isCopied, setIsCopied] = useState(false);
  const [domainMode, setDomainMode] = useState<'prod' | 'current'>('prod');

  // Dynamic origin calculation
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : SITE_DOMAIN_DEFAULT;
  const effectiveOrigin = domainMode === 'prod' ? SITE_DOMAIN_DEFAULT : currentOrigin;

  // Filtered routes
  const filteredRoutes = useMemo(() => {
    return SITEMAP_ROUTES.filter((r) => {
      const matchesSearch = 
        r.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || r.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Categories list
  const categories = useMemo(() => {
    const set = new Set(SITEMAP_ROUTES.map((r) => r.category));
    return ['all', ...Array.from(set)];
  }, []);

  // Generated XML string
  const xmlContent = useMemo(() => {
    return generateSitemapXml(effectiveOrigin);
  }, [effectiveOrigin]);

  const handleCopy = async () => {
    const ok = await copySitemapToClipboard(effectiveOrigin);
    if (ok) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const handleDownload = () => {
    downloadSitemapFile(effectiveOrigin);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-60 overflow-y-auto overscroll-contain bg-black/80 backdrop-blur-xs p-2 sm:p-4 md:p-6 animate-in fade-in duration-200"
      style={{ WebkitOverflowScrolling: 'touch' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="min-h-full flex items-start sm:items-center justify-center py-2 sm:py-6">
        <div 
          className="bg-white border border-neutral-200 w-full max-w-5xl my-auto max-h-[92vh] sm:max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-neutral-200 bg-neutral-900 text-white shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-neutral-800 border border-neutral-700 flex items-center justify-center text-emerald-400">
                <FileCode className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-base sm:text-lg text-white">
                    Генератор Sitemap.xml
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 uppercase tracking-widest hidden sm:inline-block">
                    SEO Engine v2.4
                  </span>
                </div>
                <p className="text-xs text-neutral-400 font-normal">
                  Автоматическое сопоставление {SITEMAP_ROUTES.length} маршрутов завода для поисковиков (Yandex, Google, Bing)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 transition-colors cursor-pointer"
                title="Копировать XML в буфер"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Скопировано</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>XML Копия</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider bg-white hover:bg-neutral-100 text-black font-medium transition-colors cursor-pointer"
                title="Скачать файл sitemap.xml"
              >
                <Download className="w-3.5 h-3.5 text-black" />
                <span className="hidden sm:inline">Скачать XML</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer ml-1"
                aria-label="Закрыть"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-neutral-200 bg-neutral-50 divide-x divide-neutral-200 text-xs font-mono shrink-0">
            <div className="p-3 sm:px-4">
              <div className="text-[10px] uppercase text-neutral-400 font-mono">Всего страниц</div>
              <div className="text-base font-semibold text-neutral-900 mt-0.5">
                {SITEMAP_ROUTES.length} URL
              </div>
            </div>
            <div className="p-3 sm:px-4">
              <div className="text-[10px] uppercase text-neutral-400 font-mono">Категорий</div>
              <div className="text-base font-semibold text-neutral-900 mt-0.5">
                {categories.length - 1} секций
              </div>
            </div>
            <div className="p-3 sm:px-4">
              <div className="text-[10px] uppercase text-neutral-400 font-mono">Стандарт XML</div>
              <div className="text-base font-semibold text-neutral-900 mt-0.5 flex items-center gap-1">
                <span>0.9 + Image</span>
              </div>
            </div>
            <div className="p-3 sm:px-4">
              <div className="text-[10px] uppercase text-neutral-400 font-mono">Базовый домен</div>
              <div className="text-xs font-semibold text-neutral-800 mt-1 truncate">
                {effectiveOrigin.replace(/^https?:\/\//, '')}
              </div>
            </div>
          </div>

          {/* Tab Navigation & Toolbar */}
          <div className="p-4 border-b border-neutral-200 bg-white flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0">
            {/* Tabs */}
            <div className="flex items-center gap-1 border border-neutral-200 p-1 bg-neutral-50 w-full md:w-auto">
              <button
                onClick={() => setActiveTab('routes')}
                className={`flex-1 md:flex-none px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                  activeTab === 'routes'
                    ? 'bg-black text-white font-semibold shadow-xs'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                Маршруты ({SITEMAP_ROUTES.length})
              </button>
              <button
                onClick={() => setActiveTab('xml')}
                className={`flex-1 md:flex-none px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                  activeTab === 'xml'
                    ? 'bg-black text-white font-semibold shadow-xs'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                XML Код
              </button>
              <button
                onClick={() => setActiveTab('info')}
                className={`flex-1 md:flex-none px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                  activeTab === 'info'
                    ? 'bg-black text-white font-semibold shadow-xs'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                Инструкция поисковикам
              </button>
            </div>

            {/* Domain Switcher */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-neutral-400 uppercase text-[10px]">Домен:</span>
              <div className="inline-flex border border-neutral-200 p-0.5 bg-neutral-50">
                <button
                  onClick={() => setDomainMode('prod')}
                  className={`px-2 py-1 text-[11px] cursor-pointer transition-colors ${
                    domainMode === 'prod' 
                      ? 'bg-neutral-900 text-white font-semibold' 
                      : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  sdmaf.ru (Prod)
                </button>
                <button
                  onClick={() => setDomainMode('current')}
                  className={`px-2 py-1 text-[11px] cursor-pointer transition-colors ${
                    domainMode === 'current' 
                      ? 'bg-neutral-900 text-white font-semibold' 
                      : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  Текущий URL
                </button>
              </div>
            </div>
          </div>

          {/* Main Tab Content (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-neutral-50/50">
            {activeTab === 'routes' && (
              <div className="space-y-4">
                {/* Search & Filter Bar */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Поиск по URL или названию страницы..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 text-xs font-mono border border-neutral-200 bg-white focus:outline-hidden focus:border-black transition-colors"
                    />
                  </div>

                  {/* Category Filter */}
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 text-xs font-mono border border-neutral-200 bg-white focus:outline-hidden focus:border-black transition-colors cursor-pointer"
                  >
                    <option value="all">Все категории ({SITEMAP_ROUTES.length})</option>
                    {categories.filter(c => c !== 'all').map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Routes List */}
                <div className="border border-neutral-200 bg-white divide-y divide-neutral-200">
                  {filteredRoutes.map((route, idx) => {
                    const fullUrl = getAbsoluteUrl(route.path, effectiveOrigin);
                    const priorityColor = 
                      route.priority >= 0.95 ? 'bg-emerald-100 text-emerald-800 border-emerald-200 font-bold' :
                      route.priority >= 0.85 ? 'bg-blue-100 text-blue-800 border-blue-200 font-semibold' :
                      route.priority >= 0.70 ? 'bg-amber-100 text-amber-800 border-amber-200' :
                      'bg-neutral-100 text-neutral-600 border-neutral-200';

                    return (
                      <div 
                        key={route.path}
                        className="p-4 hover:bg-neutral-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3"
                      >
                        <div className="space-y-1 flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-xs font-bold text-black tracking-tight">
                              {route.path}
                            </span>
                            <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-neutral-100 text-neutral-600 border border-neutral-200">
                              {route.category}
                            </span>
                            <span className={`text-[10px] font-mono px-2 py-0.5 border ${priorityColor}`}>
                              Priority: {route.priority.toFixed(2)}
                            </span>
                            <span className="text-[10px] font-mono text-neutral-400">
                              freq: {route.changefreq}
                            </span>
                          </div>

                          <div className="text-xs font-medium text-neutral-900">
                            {route.name}
                          </div>
                          
                          <div className="text-xs text-neutral-500 line-clamp-1">
                            {route.description}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                          <button
                            onClick={() => {
                              onClose();
                              if (onNavigateRoute) {
                                onNavigateRoute(route.path);
                              }
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-mono text-neutral-700 bg-neutral-100 hover:bg-black hover:text-white border border-neutral-200 transition-colors cursor-pointer"
                            title="Перейти на страницу"
                          >
                            <span>Открыть</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {filteredRoutes.length === 0 && (
                    <div className="p-8 text-center text-xs font-mono text-neutral-400">
                      Маршруты по запросу «{searchQuery}» не найдены.
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'xml' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono text-neutral-500">
                    Стандарт Sitemaps.org 0.9 • Формат: UTF-8 XML • Строк: {xmlContent.split('\n').length}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono bg-black text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{isCopied ? 'Скопировано!' : 'Копировать'}</span>
                    </button>
                    <button
                      onClick={handleDownload}
                      className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono bg-neutral-200 hover:bg-neutral-300 text-neutral-800 transition-colors cursor-pointer"
                    >
                      <Download className="w-3 h-3" />
                      <span>Скачать .xml</span>
                    </button>
                  </div>
                </div>

                <div className="border border-neutral-200 bg-neutral-900 text-emerald-400 p-4 font-mono text-xs overflow-x-auto max-h-[55vh] shadow-inner select-all whitespace-pre leading-relaxed">
                  {xmlContent}
                </div>
              </div>
            )}

            {activeTab === 'info' && (
              <div className="space-y-6 max-w-3xl">
                <div className="border border-neutral-200 bg-white p-6 space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900 font-mono uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>SEO-индексация и интеграция с вебмастерами</span>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                    Файл <code className="bg-neutral-100 px-1 py-0.5 font-mono text-neutral-800 font-bold">sitemap.xml</code> генерируется динамически с точным указанием весовых приоритетов (Priority), частоты обновлений (Changefreq) и медиаданных. Это ускоряет добавление страниц завода в индекс <strong>Яндекс.Вебмастер</strong> и <strong>Google Search Console</strong>.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 border border-neutral-200 bg-neutral-50 space-y-1">
                      <div className="font-mono text-xs font-semibold text-neutral-900">Яндекс.Вебмастер</div>
                      <p className="text-[11px] text-neutral-500">
                        Индексирование: Настройка → Файлы Sitemap → Добавить URL: <span className="font-mono text-neutral-800">https://sdmaf.ru/sitemap.xml</span>
                      </p>
                    </div>
                    <div className="p-3 border border-neutral-200 bg-neutral-50 space-y-1">
                      <div className="font-mono text-xs font-semibold text-neutral-900">Google Search Console</div>
                      <p className="text-[11px] text-neutral-500">
                        Раздел: Sitemaps → Введите URL файла карты сайта: <span className="font-mono text-neutral-800">sitemap.xml</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-neutral-200 bg-white p-6 space-y-3">
                  <div className="font-mono text-xs font-semibold text-neutral-900 uppercase tracking-wider">
                    Прямые эндпоинты сервера
                  </div>
                  <ul className="space-y-2 text-xs font-mono text-neutral-700">
                    <li className="flex items-center justify-between p-2.5 bg-neutral-50 border border-neutral-200">
                      <div>
                        <span className="font-bold text-black">GET /sitemap.xml</span> — Динамическая XML карта
                      </div>
                      <a 
                        href="/sitemap.xml" 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-emerald-700 hover:underline"
                      >
                        <span>Проверить</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </li>
                    <li className="flex items-center justify-between p-2.5 bg-neutral-50 border border-neutral-200">
                      <div>
                        <span className="font-bold text-black">GET /robots.txt</span> — Директивы краулерам
                      </div>
                      <a 
                        href="/robots.txt" 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-emerald-700 hover:underline"
                      >
                        <span>Проверить</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-neutral-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <div className="text-xs font-mono text-neutral-500 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Все {SITEMAP_ROUTES.length} маршрутов синхронизированы с React Router</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleDownload}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-black hover:bg-neutral-800 text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Скачать sitemap.xml</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2 border border-neutral-300 hover:bg-neutral-100 text-neutral-800 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
