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
  CheckCircle2,
  HelpCircle,
  Truck,
  CreditCard
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  onOpenCalculator: (service?: string) => void;
  onOpenMeasurerModal: () => void;
  onNavigateSection?: (sectionId: string) => void;
  currentPage?: 'home' | 'catalog' | 'production' | 'unit-detail' | 'b2b' | 'contacts' | 'faq';
  onNavigatePage?: (page: 'home' | 'catalog' | 'production' | 'unit-detail' | 'b2b' | 'contacts' | 'faq', categoryOrUnitId?: string) => void;
}

type ActiveMegaTab = 'metall' | 'maf' | 'faq' | null;

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
    if (sectionId === 'faq') {
      if (onNavigatePage) {
        onNavigatePage('faq');
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
              <span>Продукция завода</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeMegaTab === 'maf' ? 'rotate-180 text-black' : 'text-neutral-400'}`} />
            </button>

            <button
              data-no-hover="true"
              onMouseEnter={() => setActiveMegaTab('faq')}
              onClick={() => handleLinkClick('faq')}
              className={`flex items-center gap-1.5 py-2 text-[12px] uppercase tracking-[0.14em] font-medium transition-colors cursor-pointer ${
                currentPage === 'faq'
                  ? 'text-black font-semibold border-b-2 border-black -mb-[2px]'
                  : activeMegaTab === 'faq'
                  ? 'text-black font-semibold'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              <span>Частые вопросы</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeMegaTab === 'faq' ? 'rotate-180 text-black' : 'text-neutral-400'}`} />
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
                          label: 'Лазерный раскрой Кноппо (до 20 мм)', 
                          desc: 'Комплексы 3 кВт, столы 1500х3000 и 1500х6000 мм, точность реза 0,5 мм',
                          unitId: 'laser-22kw-6m'
                        },
                        { 
                          label: 'Гибка металла с ЧПУ', 
                          desc: 'Прессы HACO (40т / 1.6м) и MAIHONG (160т / 3.2м), бомбирование Wila',
                          unitId: 'bending-250t'
                        },
                        { 
                          label: 'Вальцовка и обечайки', 
                          desc: '4-х валковый Keepler RME 1500×4 мм, цилиндрические и конические обечайки',
                          unitId: 'rolling-faccin'
                        },
                        { 
                          label: 'Порошковая окраска RAL', 
                          desc: 'Газовые термокамеры 3м и 6м, конвекция 16 575 м³/ч, палитра RAL, муар и шагрень',
                          unitId: 'coating-ral'
                        },
                        { 
                          label: 'Сварочный участок НАКС', 
                          desc: 'Продольная лазерная сварка BWT20/SUP23T, полуавтоматы Кедр и Fronius',
                          unitId: 'welding-naks'
                        },
                        { 
                          label: 'Конструкторское бюро завода', 
                          desc: 'Разработка рабочей документации КМ/КМД, ТУ, карт раскроя и 3D-моделирование (ЕСКД)',
                          unitId: 'engineering-bureau'
                        },
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleUnitClick(item.unitId)}
                          className="group p-3.5 h-[98px] border border-neutral-200 hover:border-neutral-900 hover:bg-neutral-50 transition-all text-left flex flex-col justify-between cursor-pointer rounded-none"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs sm:text-sm font-semibold text-neutral-900 group-hover:text-black transition-colors truncate">
                              {item.label}
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black group-hover:translate-x-0.5 transition-all shrink-0" />
                          </div>
                          <p className="text-[11px] text-neutral-500 font-light leading-relaxed line-clamp-2">
                            {item.desc}
                          </p>
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
                          label: 'Детские горки и скаты', 
                          desc: 'Прямые, винтовые и тоннельные скаты AISI 304 по ТР ЕАЭС 042/2017',
                          cat: 'slides' 
                        },
                        { 
                          label: 'Уличная мебель', 
                          desc: 'Скамейки, урны, перголы, шезлонги, парковые качели и столы',
                          cat: 'furniture' 
                        },
                        { 
                          label: 'Изделия из нержавеющей стали', 
                          desc: 'Зеркальные арт-объекты, входные порталы, ограждения, кассеты AISI 304/316',
                          cat: 'stainless' 
                        },
                        { 
                          label: 'Чаны и купели', 
                          desc: 'Банные чаны на дровах из стали AISI 304, уличные спа-купели с кедром',
                          cat: 'vats' 
                        },
                        { 
                          label: 'Велопарковки и мобильность', 
                          desc: 'Арочные, спиральные и дизайнерские антивандальные стойки, велобоксы',
                          cat: 'bike' 
                        },
                        { 
                          label: 'Сувениры, вывески и POS', 
                          desc: 'Органайзеры, таблички, подставки, каркасы светильников, букенды и мерч',
                          cat: 'suvenirs' 
                        },
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleCatalogCategory(item.cat)}
                          className="group p-3.5 h-[98px] border border-neutral-200 hover:border-neutral-900 hover:bg-neutral-50 transition-all text-left flex flex-col justify-between cursor-pointer rounded-none"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs sm:text-sm font-semibold text-neutral-900 group-hover:text-black transition-colors truncate">
                              {item.label}
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black group-hover:translate-x-0.5 transition-all shrink-0" />
                          </div>
                          <p className="text-[11px] text-neutral-500 font-light leading-relaxed line-clamp-2">
                            {item.desc}
                          </p>
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

              {/* TAB 3: Частые вопросы (FAQ) */}
              {activeMegaTab === 'faq' && (
                <div className="grid grid-cols-12 gap-8">
                  {/* Col 1 & 2: 4 ключевых блока FAQ */}
                  <div className="col-span-7">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-200">
                      <div className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-neutral-900" />
                        <h4 className="text-xs uppercase font-mono font-medium tracking-wider text-neutral-900">
                          Частые вопросы заказчиков
                        </h4>
                      </div>
                      <span className="text-[11px] font-mono text-neutral-400">
                        Сроки • Доставка • Гарантия • ГОСТ
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { 
                          title: 'Сроки производства', 
                          desc: 'ЧПУ раскрой от 24ч, серийные МАФ 5–12 дней, индивидуальные конструкции 10–20 дней',
                          icon: Clock,
                          tag: 'от 24 часов'
                        },
                        { 
                          title: 'Доставка и самовывоз', 
                          desc: 'По СПб и ЛО в день готовности, доставка фурами по РФ и СНГ, самовывоз из Колпино',
                          icon: Truck,
                          tag: 'СПб, РФ и СНГ'
                        },
                        { 
                          title: 'Гарантия до 10 лет и ГОСТ', 
                          desc: 'Нержавеющая сталь 10 лет, RAL 5 лет, сертификаты ТР ЕАЭС 042/2017 и НАКС',
                          icon: ShieldCheck,
                          tag: 'ТР ЕАЭС 042'
                        },
                        { 
                          title: 'Чертежи, CAD и оплата', 
                          desc: 'Прием STEP, DWG, DXF, разработка КМД, безналичный расчет с НДС 22%, 44-ФЗ',
                          icon: CreditCard,
                          tag: 'НДС 22% / 44-ФЗ'
                        },
                      ].map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleLinkClick('faq')}
                            className="group p-3.5 h-[105px] border border-neutral-200 hover:border-neutral-900 hover:bg-neutral-50 transition-all text-left flex flex-col justify-between cursor-pointer rounded-none"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-1.5">
                                <Icon className="w-3.5 h-3.5 text-neutral-600 group-hover:text-black" />
                                <span className="text-xs sm:text-sm font-semibold text-neutral-900 group-hover:text-black transition-colors truncate">
                                  {item.title}
                                </span>
                              </div>
                              <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 bg-neutral-100 text-neutral-600 group-hover:bg-black group-hover:text-white transition-colors">
                                {item.tag}
                              </span>
                            </div>
                            <p className="text-[11px] text-neutral-500 font-light leading-relaxed line-clamp-2">
                              {item.desc}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Col 3: Сайдбар базы знаний и CTA */}
                  <div className="col-span-5 border border-neutral-200 bg-neutral-50 p-6 flex flex-col justify-between">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 mb-2">
                        [ Регламенты и стандарты ]
                      </div>
                      <h4 className="text-base font-normal text-neutral-900 mb-2 tracking-tight">
                        База знаний завода «Стальное Дело»
                      </h4>
                      <p className="text-xs text-neutral-500 font-light leading-relaxed mb-4">
                        Официальные регламенты приемки металлопроката, порядок согласования чертежей КМД и оформление исполнительной документации КС-2/КС-3.
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
                        onClick={() => handleLinkClick('faq')}
                        className="w-full py-2.5 px-4 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Перейти к разделу FAQ</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          setActiveMegaTab(null);
                          onOpenCalculator();
                        }}
                        className="w-full py-2 px-4 border border-neutral-300 text-neutral-900 text-xs font-mono uppercase tracking-wider hover:border-black transition-colors flex items-center justify-center gap-1.5 cursor-pointer bg-white"
                      >
                        <span>Задать вопрос инженеру завода</span>
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
                { label: 'Конструкторское бюро завода (ЕСКД)', section: 'engineering-bureau' },
                { label: 'Продукция завода (Уличная мебель)', section: 'catalog' },
                { label: 'Частые вопросы (FAQ)', section: 'faq' },
                { label: 'B2B и Госзаказ (44-ФЗ)', section: 'b2b' },
                { label: 'Контакты завода в Колпино', section: 'contacts' },
              ].map((item, idx) => {
                const isActive = (item.section === 'production' && currentPage === 'production') ||
                                 (item.section === 'catalog' && currentPage === 'catalog') ||
                                 (item.section === 'faq' && currentPage === 'faq') ||
                                 (item.section === 'b2b' && currentPage === 'b2b') ||
                                 (item.section === 'contacts' && currentPage === 'contacts') ||
                                 (item.section === 'hero' && currentPage === 'home');
                return (
                  <button
                    key={idx}
                    data-no-hover="true"
                    onClick={() => {
                      if (item.section === 'engineering-bureau') {
                        handleUnitClick('engineering-bureau');
                      } else {
                        handleLinkClick(item.section);
                      }
                    }}
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
