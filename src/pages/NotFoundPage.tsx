import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AlertTriangle, 
  Home, 
  Layers, 
  Factory, 
  Calculator, 
  PhoneCall, 
  ArrowLeft, 
  Search, 
  ChevronRight, 
  Compass, 
  FileCode2, 
  Flame, 
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Sliders,
  Mail
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

interface NotFoundPageProps {
  onOpenCalculator?: () => void;
  onOpenMeasurerModal?: () => void;
}

export function NotFoundPage({ onOpenCalculator, onOpenMeasurerModal }: NotFoundPageProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    const query = searchQuery.toLowerCase().trim();
    if (query.includes('горк') || query.includes('труб') || query.includes('детск') || query.includes('скат')) {
      navigate('/catalog/slides');
    } else if (query.includes('мебел') || query.includes('скам') || query.includes('пергол') || query.includes('урн') || query.includes('лавочк')) {
      navigate('/catalog/furniture');
    } else if (query.includes('чан') || query.includes('купел') || query.includes('бан')) {
      navigate('/catalog/vats');
    } else if (query.includes('вело') || query.includes('парковк') || query.includes('стоек')) {
      navigate('/catalog/bike');
    } else if (query.includes('лазер') || query.includes('резк') || query.includes('раскрой') || query.includes('гибк')) {
      navigate('/laser');
    } else if (query.includes('чертеж') || query.includes('кб') || query.includes('кп') || query.includes('расчет')) {
      navigate('/engineering');
    } else if (query.includes('контакт') || query.includes('телефон') || query.includes('адрес') || query.includes('колпино')) {
      navigate('/contacts');
    } else {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const directCategories = [
    {
      title: 'Горки и тоннели из нержавейки',
      desc: 'Прямые, винтовые и геопластические трубы AISI 304',
      link: '/catalog/slides',
      badge: '01. Каталог',
      tag: 'AISI 304 / 316'
    },
    {
      title: 'Парковая мебель и перголы',
      desc: 'Антивандальные скамьи, шезлонги, навесы, урны и кашпо',
      link: '/catalog/furniture',
      badge: '02. Каталог',
      tag: 'Порошковый RAL'
    },
    {
      title: 'Банные чаны и купели',
      desc: 'Премиальные чаны с гидромассажем и отделкой лиственницей',
      link: '/catalog/vats',
      badge: '03. Каталог',
      tag: 'Сварка НАКС'
    },
    {
      title: 'ЧПУ Лазерный раскрой 22 кВт',
      desc: 'Резка черной стали до 25 мм, нержавейки и алюминия (столы до 6м)',
      link: '/laser',
      badge: '04. Производство',
      tag: 'Точность 0.05 мм'
    },
    {
      title: 'Конструкторское бюро',
      desc: 'Разработка КМ/КМД, 3D-моделирование, адаптация чертежей DWG/STEP',
      link: '/engineering',
      badge: '05. Инжиниринг',
      tag: 'КМ / КМД / BIM'
    },
    {
      title: 'B2B и Тендерный отдел',
      desc: 'Прямые поставки девелоперам и генподрядчикам (44-ФЗ / 223-ФЗ)',
      link: '/b2b',
      badge: '06. Корпоративным',
      tag: 'Спецсчета и НДС'
    },
  ];

  return (
    <div className="bg-white min-h-screen text-neutral-900 flex flex-col justify-between">
      <SEOHead
        title="404 — Страница не найдена | Завод «Стальное Дело»"
        description="Страница не найдена (код 404). Запрашиваемый адрес отсутствует или был перемещен. Воспользуйтесь навигацией по каталогу МАФ и услугам металлообработки завода «Стальное Дело»."
        keywords="404 страница не найдена, ошибка 404 стальное дело, каталог маф спб"
        canonicalPath="/404"
      />
      {/* Search Engines Directive */}
      <meta name="robots" content="noindex, follow" />

      {/* Top Technical Breadcrumbs */}
      <div className="border-b border-neutral-200 bg-neutral-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate('/')}
              className="hover:text-black transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Главная</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
            <span className="text-neutral-900 font-medium">Статус 404: Ошибка адресации</span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-[11px] font-mono">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-neutral-700">HTTP/2 404 NOT FOUND</span>
          </div>
        </div>
      </div>

      {/* Main Engineering 404 Section */}
      <main className="flex-1 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          
          {/* Top Industrial Error Banner */}
          <div className="relative border border-neutral-200 bg-neutral-50/40 p-8 sm:p-12 mb-10 overflow-hidden">
            {/* Background Blueprint Grid Lines */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-[0.04]"
              style={{
                backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}
            />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 border border-amber-300 text-amber-900 text-xs font-mono font-semibold uppercase tracking-wider rounded-sm mb-4">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
                  <span>[ Ошибка 404 ] Чертеж узла не обнаружен</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-neutral-900 leading-[1.05] mb-4">
                  Запрашиваемый адрес <br />
                  <span className="font-mono font-bold text-neutral-950">не существует</span>
                </h1>

                <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed mb-6">
                  Возможно, ссылка устарела после реструктуризации каталога, либо в строке браузера допущена опечатка. Ниже представлены прямые переходы по ключевым узлам завода.
                </p>

                {/* Search Bar on 404 */}
                <form onSubmit={handleSearchSubmit} className="relative flex items-center max-w-md">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Поиск по изделиям, лазеру, чертежам..."
                    className="w-full pl-10 pr-24 py-2.5 bg-white border border-neutral-300 text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-black shadow-xs font-sans"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-black text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Найти
                  </button>
                </form>
              </div>

              {/* Big Graphic Monospace 404 Stamp */}
              <div className="flex flex-col items-center justify-center p-6 sm:p-8 border border-neutral-300 bg-white shadow-xs shrink-0 self-start md:self-center">
                <div className="font-mono text-6xl sm:text-7xl font-black tracking-tighter text-neutral-900 select-none leading-none">
                  404
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 mt-2 text-center">
                  STATUS: PAGE NOT FOUND
                </div>
                <div className="mt-4 pt-3 border-t border-neutral-200 w-full flex items-center justify-between text-[11px] font-mono text-neutral-600">
                  <span>SDMAF-PLANT</span>
                  <span className="text-emerald-700 font-bold">ОНЛАЙН 24/7</span>
                </div>
              </div>
            </div>

            {/* Quick Actions Row */}
            <div className="mt-8 pt-8 border-t border-neutral-200 flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-2 px-5 py-3 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer group"
              >
                <Home className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>На главную страницу</span>
              </button>

              <button
                onClick={() => navigate('/catalog')}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-neutral-100 text-neutral-900 text-xs font-mono uppercase tracking-wider border border-neutral-300 transition-colors cursor-pointer"
              >
                <Layers className="w-4 h-4 text-neutral-700" />
                <span>Каталог продукции МАФ</span>
              </button>

              <button
                onClick={() => {
                  if (onOpenCalculator) onOpenCalculator();
                  else navigate('/');
                }}
                className="inline-flex items-center gap-2 px-5 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-mono uppercase tracking-wider border border-neutral-200 transition-colors cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-neutral-700" />
                <span>Рассчитать смету по чертежу</span>
              </button>

              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 px-4 py-3 text-neutral-500 hover:text-black text-xs font-mono uppercase tracking-wider transition-colors ml-auto cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Назад</span>
              </button>
            </div>
          </div>

          {/* Catalog & Production Matrix */}
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-6">
              <div className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                [ Маршрутизация по производственным разделам ]
              </div>
              <div className="text-xs text-neutral-400 font-mono">
                sdmaf.ru / routes
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {directCategories.map((cat, idx) => (
                <div
                  key={idx}
                  onClick={() => navigate(cat.link)}
                  className="p-5 border border-neutral-200 bg-white hover:border-black hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-2">
                      <span>{cat.badge}</span>
                      <span className="text-neutral-500 bg-neutral-100 px-1.5 py-0.5 border border-neutral-200">
                        {cat.tag}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-neutral-900 group-hover:text-emerald-700 transition-colors mb-1.5 flex items-center justify-between">
                      <span>{cat.title}</span>
                      <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-black group-hover:translate-x-1 transition-all" />
                    </h3>

                    <p className="text-xs text-neutral-500 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-100 text-[11px] font-mono text-neutral-400 group-hover:text-neutral-900 transition-colors">
                    Перейти в раздел &rarr;
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Plant Contact Strip */}
          <div className="mt-12 p-6 border border-neutral-200 bg-neutral-50 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-neutral-900 text-white flex items-center justify-center shrink-0">
                <Factory className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase text-neutral-500">
                  Нужна консультация дежурного инженера завода?
                </div>
                <div className="text-sm font-semibold text-neutral-900">
                  Санкт-Петербург, Колпино, ул. Финляндская, 3 (Ижорские заводы)
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <a
                href="tel:+78126428890"
                className="px-4 py-2.5 bg-white border border-neutral-300 text-neutral-900 font-semibold hover:border-black transition-colors"
              >
                +7 (812) 642-88-90
              </a>
              <a
                href="mailto:info@sdmaf.ru"
                className="px-4 py-2.5 bg-neutral-900 text-white font-medium hover:bg-black transition-colors"
              >
                info@sdmaf.ru
              </a>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
