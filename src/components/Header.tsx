import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Clock, 
  MapPin, 
  Send, 
  FileText, 
  Layers, 
  ChevronDown, 
  Menu, 
  X, 
  ShieldCheck, 
  Cpu, 
  Sparkles, 
  Building2, 
  FolderDown, 
  Compass, 
  Calculator,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  onOpenCalculator: (service?: string) => void;
  onOpenMeasurerModal: () => void;
  onNavigateSection?: (sectionId: string) => void;
  currentPage?: 'home' | 'catalog' | 'production' | 'unit-detail' | 'b2b' | 'contacts' | 'portfolio';
  onNavigatePage?: (page: 'home' | 'catalog' | 'production' | 'unit-detail' | 'b2b' | 'contacts' | 'portfolio', categoryOrUnitId?: string) => void;
}

type ActiveMegaTab = 'metall' | 'maf' | 'portfolio' | null;

export const Header: React.FC<HeaderProps> = ({
  onOpenCalculator,
  onOpenMeasurerModal,
  onNavigateSection,
  currentPage = 'home',
  onNavigatePage,
}) => {
  const [activeMegaTab, setActiveMegaTab] = useState<ActiveMegaTab>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (sectionId: string) => {
    setActiveMegaTab(null);
    setMobileMenuOpen(false);
    if (sectionId === 'production') {
      if (onNavigatePage) {
        onNavigatePage('production');
        return;
      }
    }
    if (sectionId === 'catalog') {
      if (onNavigatePage) {
        onNavigatePage('catalog');
        return;
      }
    }
    if (sectionId === 'portfolio') {
      if (onNavigatePage) {
        onNavigatePage('portfolio');
        return;
      }
    }
    if (sectionId === 'b2b') {
      if (onNavigatePage) {
        onNavigatePage('b2b');
        return;
      }
    }
    if (sectionId === 'contacts') {
      if (onNavigatePage) {
        onNavigatePage('contacts');
        return;
      }
    }
    if (sectionId === 'hero') {
      if (onNavigatePage) {
        onNavigatePage('home');
        return;
      }
    }
    if (currentPage !== 'home' && onNavigatePage) {
      onNavigatePage('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }
    if (onNavigateSection) {
      onNavigateSection(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUnitClick = (unitId: string) => {
    setActiveMegaTab(null);
    setMobileMenuOpen(false);
    if (onNavigatePage) {
      onNavigatePage('unit-detail', unitId);
    } else {
      handleLinkClick('production');
    }
  };

  const handleCatalogCategory = (category: string) => {
    setActiveMegaTab(null);
    setMobileMenuOpen(false);
    if (onNavigatePage) {
      onNavigatePage('catalog', category);
    } else {
      handleLinkClick('catalog');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full select-none" onMouseLeave={() => setActiveMegaTab(null)}>
      {/* Top industrial status bar */}
      <div className="bg-[#FAFAFA] border-b border-neutral-200 text-[11px] text-neutral-600 px-4 lg:px-8 py-2 hidden md:flex items-center justify-between font-mono tracking-wide">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 font-normal text-neutral-900">
            <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full inline-block"></span>
            <span>Санкт-Петербург, Колпино, ул. Финляндская, 3</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-500">
            <span>Пн-Пт: 08:00 – 16:30</span>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 text-xs font-sans">
          <a 
            href="tel:+78122007706" 
            className="flex items-center gap-1.5 font-medium text-neutral-900 hover:text-black transition-colors tracking-tight"
          >
            <Phone className="w-3.5 h-3.5 text-neutral-500" />
            <span><span className="text-neutral-500 font-normal mr-1">СПб:</span>+7 (812) 200-77-06</span>
          </a>
          <span className="text-neutral-300 hidden sm:inline">|</span>
          <a 
            href="tel:+74951066224" 
            className="hidden sm:flex items-center gap-1.5 font-medium text-neutral-900 hover:text-black transition-colors tracking-tight"
          >
            <span><span className="text-neutral-500 font-normal mr-1">Мск:</span>+7 (495) 106-62-24</span>
          </a>
        </div>
      </div>

      {/* Main Polestar-style minimalist navbar */}
      <div className={`glass-nav transition-all duration-300 border-b border-neutral-200 ${isScrolled ? 'py-2.5 shadow-none' : 'py-3.5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo SVG */}
          <button 
            type="button"
            data-no-hover="true"
            onClick={() => handleLinkClick('hero')} 
            className="flex items-center cursor-pointer group py-1 focus:outline-none transition-opacity hover:opacity-80 text-left shrink-0 mr-6 lg:mr-10"
            aria-label="Завод Стальное Дело — перейти к началу"
          >
            <BrandLogo 
              className="h-8 sm:h-9 w-auto origin-left" 
              textColor="#34363B" 
            />
          </button>

          {/* Desktop Navigation with Minimalist Dropdowns */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <button
              data-no-hover="true"
              onMouseEnter={() => setActiveMegaTab('metall')}
              onClick={() => handleLinkClick('production')}
              className={`flex items-center gap-1.5 py-2 text-[12px] uppercase tracking-[0.14em] font-medium transition-colors cursor-pointer ${
                currentPage === 'production'
                  ? 'text-black font-semibold border-b-2 border-black -mb-[2px]'
                  : activeMegaTab === 'metall'
                  ? 'text-black font-semibold'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              <span>Производство</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeMegaTab === 'metall' ? 'rotate-180 text-black' : 'text-neutral-400'}`} />
            </button>

            <button
              data-no-hover="true"
              onMouseEnter={() => setActiveMegaTab('maf')}
              onClick={() => handleLinkClick('catalog')}
              className={`flex items-center gap-1.5 py-2 text-[12px] uppercase tracking-[0.14em] font-medium transition-colors cursor-pointer ${
                currentPage === 'catalog'
                  ? 'text-black font-semibold border-b-2 border-black -mb-[2px]'
                  : activeMegaTab === 'maf'
                  ? 'text-black font-semibold'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              <span>Каталог МАФ</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeMegaTab === 'maf' ? 'rotate-180 text-black' : 'text-neutral-400'}`} />
            </button>

            <button
              data-no-hover="true"
              onMouseEnter={() => setActiveMegaTab('portfolio')}
              onClick={() => handleLinkClick('portfolio')}
              className={`flex items-center gap-1.5 py-2 text-[12px] uppercase tracking-[0.14em] font-medium transition-colors cursor-pointer ${
                currentPage === 'portfolio'
                  ? 'text-black font-semibold border-b-2 border-black -mb-[2px]'
                  : activeMegaTab === 'portfolio'
                  ? 'text-black font-semibold'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              <span>Портфолио</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeMegaTab === 'portfolio' ? 'rotate-180 text-black' : 'text-neutral-400'}`} />
            </button>

            <button
              data-no-hover="true"
              onClick={() => handleLinkClick('b2b')}
              className={`py-2 text-[12px] uppercase tracking-[0.14em] font-medium transition-colors cursor-pointer ${
                currentPage === 'b2b'
                  ? 'text-black font-semibold border-b-2 border-black -mb-[2px]'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              B2B / Тендеры
            </button>

            <button
              data-no-hover="true"
              onClick={() => handleLinkClick('contacts')}
              className={`py-2 text-[12px] uppercase tracking-[0.14em] font-medium transition-colors cursor-pointer ${
                currentPage === 'contacts'
                  ? 'text-black font-semibold border-b-2 border-black -mb-[2px]'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              Контакты
            </button>
          </nav>

          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              data-no-hover="true"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-neutral-200 text-black cursor-pointer"
              aria-label="Открыть меню"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* SCANDINAVIAN MINIMALIST MEGA-MENU (POLAR DROPDOWN) */}
      <AnimatePresence>
        {activeMegaTab && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute top-full left-0 w-full bg-white border-b border-neutral-200 shadow-lg z-40 hidden lg:block"
            onMouseEnter={() => {}}
            onMouseLeave={() => setActiveMegaTab(null)}
          >
            <div className="max-w-7xl mx-auto px-6 py-10">
              {/* TAB 1: Металлообработка и производство */}
              {activeMegaTab === 'metall' && (
                <div className="grid grid-cols-12 gap-8">
                  {/* Col 1 & 2: Технологические участки ЧПУ (6 направлений) */}
                  <div className="col-span-7">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-200">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-neutral-900" />
                        <h4 className="text-xs uppercase font-mono font-medium tracking-wider text-neutral-900">
                          Технологические участки ЧПУ
                        </h4>
                      </div>
                      <span className="text-[11px] font-mono text-neutral-400">
                        Паспорта станков и цехов
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { 
                          label: 'Лазерный раскрой Knoppo KF 3 кВт (3м и 6м)', 
                          desc: 'Волоконные комплексы 3 кВт, столы 1500х3000 и 1500х6000 мм, сталь до 20 мм, точность ±0.03 мм',
                          unitId: 'laser-22kw-6m'
                        },
                        { 
                          label: 'Гибка металла', 
                          desc: 'Прессы HACO (40т / 1.6м) и MAIHONG с ЧПУ ESA (160т / 3.2м), бомбирование Wila',
                          unitId: 'bending-250t'
                        },
                        { 
                          label: 'Вальцовка', 
                          desc: '4-х валковый станок Keepler RME 1500×4 мм, обечайки от Ø140 мм и конусы',
                          unitId: 'rolling-faccin'
                        },
                        { 
                          label: 'Порошковая окраска', 
                          desc: 'Газовые термокамеры (3м и 6м), конвекция 16 575 м³/ч, палитра RAL Classic, муар и шагрень',
                          unitId: 'coating-ral'
                        },
                        { 
                          label: 'Сварочный участок', 
                          desc: 'Продольная лазерная сварка, комплексы Maihong BWT20 и SUP23T, полуавтоматы Кедр и Fronius. Аттестованные мастера НАКС',
                          unitId: 'welding-naks',
                          colSpan: 'col-span-2'
                        },
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleUnitClick(item.unitId)}
                          className={`group p-3.5 border border-neutral-200 hover:border-neutral-900 hover:bg-neutral-50 transition-all text-left flex flex-col justify-between cursor-pointer rounded-none ${item.colSpan || ''}`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <span className="text-sm font-semibold text-neutral-900 group-hover:text-black transition-colors">
                                {item.label}
                              </span>
                              <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black group-hover:translate-x-0.5 transition-all shrink-0" />
                            </div>
                            <p className="text-xs text-neutral-500 font-light leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Col 3: Производственный комплекс и мощности */}
                  <div className="col-span-5 border border-neutral-200 bg-neutral-50 p-6 flex flex-col justify-between">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 mb-2">
                        [ КБ и производство • 4000+ м² в Колпино ]
                      </div>
                      <h4 className="text-base font-normal text-neutral-900 mb-2 tracking-tight">
                        Производственный комплекс ЧПУ
                      </h4>
                      <p className="text-xs text-neutral-500 font-light leading-relaxed mb-4">
                        Собственный станочный парк полного цикла в Санкт-Петербурге. Входной спектральный контроль проката, сквозная ERP-диспетчеризация и 100% контроль лабораторией ОТК.
                      </p>

                      <div className="space-y-2 py-3 border-t border-b border-neutral-200 text-xs text-neutral-700">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#55AA53] shrink-0" />
                          <span>Два лазерных комплекса 22 кВт (столы 4м и 6м) и прессы 250 т</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#55AA53] shrink-0" />
                          <span>Газовые термокамеры полимеризации 3м и 6м (конвекция 16 575 м³/ч)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#55AA53] shrink-0" />
                          <span>Приемка чертежей в форматах DXF, DWG, STEP, PDF КД</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-4">
                      <button
                        onClick={() => handleLinkClick('production')}
                        className="w-full py-2.5 px-4 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Обзор всех цехов и паспорта станков</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>

                      <button
                        onClick={() => {
                          setActiveMegaTab(null);
                          onOpenCalculator();
                        }}
                        className="w-full py-2 px-4 border border-neutral-300 text-neutral-900 text-xs font-mono uppercase tracking-wider hover:border-black transition-colors flex items-center justify-center gap-1.5 cursor-pointer bg-white"
                      >
                        <span>Рассчитать смету по чертежам</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Каталог МАФ */}
              {activeMegaTab === 'maf' && (
                <div className="grid grid-cols-12 gap-8">
                  {/* Col 1 & 2: Линейка продукции (6 направлений) */}
                  <div className="col-span-7">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-200">
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-neutral-900" />
                        <h4 className="text-xs uppercase font-mono font-medium tracking-wider text-neutral-900">
                          Линейка продукции
                        </h4>
                      </div>
                      <span className="text-[11px] font-mono text-neutral-400">
                        6 основных направлений
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { 
                          label: 'Скаты для горок', 
                          desc: 'Прямые, винтовые и тоннельные скаты AISI 304 по ГОСТ Р 52169',
                          cat: 'slides' 
                        },
                        { 
                          label: 'Парковки для велосипедов', 
                          desc: 'Модульные, спиральные и арочные антивандальные стойки',
                          cat: 'bike' 
                        },
                        { 
                          label: 'Уличная мебель', 
                          desc: 'Скамейки, урны, перголы, шезлонги, парковые качели и столы',
                          cat: 'furniture' 
                        },
                        { 
                          label: 'Оборудование для детских площадок', 
                          desc: 'Канатные пирамиды, карусели, качели «Гнездо», балансиры',
                          cat: 'playgrounds' 
                        },
                        { 
                          label: 'Чаны и купели', 
                          desc: 'Банные чаны на дровах из стали AISI 304, уличные спа-купели',
                          cat: 'vats' 
                        },
                        { 
                          label: 'Изделия из нержавеющей стали', 
                          desc: 'Зеркальные арт-порталы, ограждения, перголы, навесы AISI 304/316',
                          cat: 'metal-structures' 
                        },
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleCatalogCategory(item.cat)}
                          className="group p-3.5 border border-neutral-200 hover:border-neutral-900 hover:bg-neutral-50 transition-all text-left flex flex-col justify-between cursor-pointer rounded-none"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <span className="text-sm font-semibold text-neutral-900 group-hover:text-black transition-colors">
                                {item.label}
                              </span>
                              <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black group-hover:translate-x-0.5 transition-all shrink-0" />
                            </div>
                            <p className="text-xs text-neutral-500 font-light leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Col 3: Инженерная поддержка и стандарты КБ */}
                  <div className="col-span-5 border border-neutral-200 bg-neutral-50 p-6 flex flex-col justify-between">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 mb-2">
                        [ КБ и производство • Колпино ]
                      </div>
                      <h4 className="text-base font-normal text-neutral-900 mb-2 tracking-tight">
                        Инженерная поддержка завода
                      </h4>
                      <p className="text-xs text-neutral-500 font-light leading-relaxed mb-4">
                        Разработка рабочих чертежей КМ/КМД, раскладка раскроя Nesting, сертификация детского игрового оборудования по ТР ЕАЭС 042/2017 и ГОСТ Р 52169.
                      </p>

                      <div className="space-y-2 py-3 border-t border-b border-neutral-200 text-xs text-neutral-700">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#55AA53] shrink-0" />
                          <span>Пищевая зеркальная сталь AISI 304 (08Х18Н10)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#55AA53] shrink-0" />
                          <span>Цинконаполненный праймер 80 мкм + полиэфирный муар</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#55AA53] shrink-0" />
                          <span>Готовые BIM-семейства Revit 2024 и чертежи DWG/PDF</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-4">
                      <button
                        onClick={() => handleCatalogCategory('all')}
                        className="w-full py-2.5 px-4 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Открыть весь каталог (6 направлений)</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>

                      <button
                        onClick={() => {
                          setActiveMegaTab(null);
                          onOpenCalculator();
                        }}
                        className="w-full py-2 px-4 border border-neutral-300 text-neutral-900 text-xs font-mono uppercase tracking-wider hover:border-black transition-colors flex items-center justify-center gap-1.5 cursor-pointer bg-white"
                      >
                        <span>Запросить расчет проекта</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Реализованные объекты */}
              {activeMegaTab === 'portfolio' && (
                <div className="grid grid-cols-12 gap-8">
                  {/* Col 1 & 2: Направления объектов (6 карточек) */}
                  <div className="col-span-7">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-200">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-neutral-900" />
                        <h4 className="text-xs uppercase font-mono font-medium tracking-wider text-neutral-900">
                          География и типы объектов
                        </h4>
                      </div>
                      <span className="text-[11px] font-mono text-neutral-400">
                        СПб, Ленобласть и регионы
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { 
                          label: 'Жилые комплексы девелоперов', 
                          desc: 'ЖК Setl Group, Группы ЛСР, ПИК, ЦДС — дворовые перголы, скамьи, освещение',
                          filter: 'development'
                        },
                        { 
                          label: 'Городские парки и набережные', 
                          desc: 'Комитет по благоустройству, набережная Ижоры, скверы, амфитеатры и шезлонги',
                          filter: 'urban'
                        },
                        { 
                          label: 'Бизнес-парки и отели', 
                          desc: 'Входные группы, видовые террасы, арт-объекты, стелы и дизайнерские навесы',
                          filter: 'commercial'
                        },
                        { 
                          label: 'Детские и спортивные кластеры', 
                          desc: 'Скаты AISI 304 (ГОСТ 34614), воркаут-зоны, канатные комплексы и трибуны',
                          filter: 'play'
                        },
                        { 
                          label: 'Мостовые и дорожные барьеры', 
                          desc: 'Пешеходные удерживающие ограждения ГОСТ 52289, велопарковки, переходы',
                          filter: 'infrastructure'
                        },
                        { 
                          label: 'Госзаказ и тендеры 44-ФЗ / 223-ФЗ', 
                          desc: 'Поставки для администраций районов СПб и ЛО со сдачей Госкомиссии',
                          filter: 'gov'
                        },
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleLinkClick('portfolio')}
                          className="group p-3.5 border border-neutral-200 hover:border-neutral-900 hover:bg-neutral-50 transition-all text-left flex flex-col justify-between cursor-pointer rounded-none"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <span className="text-sm font-semibold text-neutral-900 group-hover:text-black transition-colors">
                                {item.label}
                              </span>
                              <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black group-hover:translate-x-0.5 transition-all shrink-0" />
                            </div>
                            <p className="text-xs text-neutral-500 font-light leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Col 3: Интерактивная карта и статистика */}
                  <div className="col-span-5 border border-neutral-200 bg-neutral-50 p-6 flex flex-col justify-between">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 mb-2">
                        [ Интерактивная карта проектов ]
                      </div>
                      <h4 className="text-base font-normal text-neutral-900 mb-2 tracking-tight">
                        География реализованных проектов
                      </h4>
                      <p className="text-xs text-neutral-500 font-light leading-relaxed mb-4">
                        Более 2 500 сданных объектов благоустройства и металлоконструкций по всей России и в странах СНГ. Прямые поставки от завода без посредников.
                      </p>

                      <div className="space-y-2 py-3 border-t border-b border-neutral-200 text-xs text-neutral-700">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#55AA53] shrink-0" />
                          <span>Соответствие СП 16.13330 и регламентам ТР ЕАЭС 042/2017</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#55AA53] shrink-0" />
                          <span>Гарантия на антикоррозийное покрытие до 10 лет</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#55AA53] shrink-0" />
                          <span>Полный комплект исполнительной документации и КС-2/КС-3</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-4">
                      <button
                        onClick={() => handleLinkClick('portfolio')}
                        className="w-full py-2.5 px-4 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Открыть страницу портфолио с картой</span>
                        <MapPin className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          setActiveMegaTab(null);
                          onOpenCalculator();
                        }}
                        className="w-full py-2 px-4 border border-neutral-300 text-neutral-900 text-xs font-mono uppercase tracking-wider hover:border-black transition-colors flex items-center justify-center gap-1.5 cursor-pointer bg-white"
                      >
                        <span>Запросить референс-лист и смету</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE RESPONSIVE MENU DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-neutral-200 px-6 py-6 space-y-4"
          >
            <div className="space-y-1">
              {[
                { label: 'Главная', section: 'hero' },
                { label: 'Производство и цеха ЧПУ', section: 'production' },
                { label: 'Каталог продукции (6 направлений)', section: 'catalog' },
                { label: 'Портфолио объектов', section: 'portfolio' },
                { label: 'B2B и Госзаказ (44-ФЗ)', section: 'b2b' },
                { label: 'Контакты завода в Колпино', section: 'contacts' },
              ].map((item, idx) => {
                const isActive = (item.section === 'production' && currentPage === 'production') ||
                                 (item.section === 'catalog' && currentPage === 'catalog') ||
                                 (item.section === 'portfolio' && currentPage === 'portfolio') ||
                                 (item.section === 'b2b' && currentPage === 'b2b') ||
                                 (item.section === 'contacts' && currentPage === 'contacts') ||
                                 (item.section === 'hero' && currentPage === 'home');
                return (
                  <button
                    key={idx}
                    data-no-hover="true"
                    onClick={() => handleLinkClick(item.section)}
                    className={`w-full text-left py-2.5 text-xs uppercase tracking-widest font-medium border-b border-neutral-100 last:border-0 cursor-pointer ${
                      isActive
                        ? 'text-black font-semibold'
                        : 'text-neutral-700 hover:text-black'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-neutral-200 text-xs font-mono text-neutral-500 space-y-2">
              <div>СПб, г. Колпино, ул. Финляндская, 3</div>
              <div className="flex flex-col gap-1.5 font-sans font-medium text-sm text-neutral-900">
                <a href="tel:+78122007706" className="block hover:text-black">
                  <span className="text-neutral-500 font-normal mr-1.5 font-mono text-xs">СПб:</span>+7 (812) 200-77-06
                </a>
                <a href="tel:+74951066224" className="block hover:text-black">
                  <span className="text-neutral-500 font-normal mr-1.5 font-mono text-xs">Мск:</span>+7 (495) 106-62-24
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
