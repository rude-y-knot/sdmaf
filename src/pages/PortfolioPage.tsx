import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  ArrowLeft, 
  MapPin, 
  Building2, 
  Calendar, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  Calculator, 
  Sparkles, 
  FileText, 
  X, 
  Check, 
  Maximize2,
  Phone,
  Compass,
  Download
} from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '../data/factoryData';
import { PortfolioProject } from '../types';
import { YandexInteractiveMap } from '../components/YandexInteractiveMap';

interface PortfolioPageProps {
  onBackToHome: () => void;
  onOpenCalculator: (initialService?: string) => void;
  onOpenMeasurerModal: () => void;
  onNavigateToCatalog: () => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  onBackToHome,
  onOpenCalculator,
  onOpenMeasurerModal,
  onNavigateToCatalog,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<PortfolioProject>(PORTFOLIO_PROJECTS[0]);
  const [modalProject, setModalProject] = useState<PortfolioProject | null>(null);
  const [activeModalImageIndex, setActiveModalImageIndex] = useState<number>(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const categories = [
    { id: 'all', label: 'Все объекты' },
    { id: 'development', label: 'Жилые комплексы (ЖК)' },
    { id: 'urban', label: 'Парки и набережные' },
    { id: 'sports', label: 'Спорт и детские зоны' },
    { id: 'commercial', label: 'Бизнес-центры' },
  ];

  const districts = [
    { id: 'all', label: 'Все регионы' },
    { id: 'Приморский', label: 'СПб • Приморский' },
    { id: 'Московский', label: 'СПб • Московский' },
    { id: 'Колпино', label: 'СПб • Колпинский' },
    { id: 'Василеостровский', label: 'СПб • Василеостровский' },
    { id: 'Кудрово', label: 'Ленобласть • Кудрово' },
    { id: 'Мурино', label: 'Ленобласть • Мурино' },
    { id: 'Петродворцовый', label: 'СПб • Петергоф' },
    { id: 'Москва', label: 'Москва и МО' },
    { id: 'Сочи', label: 'Сочи и ЮФО' },
    { id: 'Казань', label: 'Казань и Поволжье' },
    { id: 'Урал', label: 'Урал и Сибирь' },
  ];

  const filteredProjects = PORTFOLIO_PROJECTS.filter((proj) => {
    const matchCat = selectedCategory === 'all' || proj.category === selectedCategory;
    const matchDist = selectedDistrict === 'all' || 
      proj.district.toLowerCase().includes(selectedDistrict.toLowerCase()) ||
      proj.locationName.toLowerCase().includes(selectedDistrict.toLowerCase());
    return matchCat && matchDist;
  });

  const openProjectModal = (proj: PortfolioProject) => {
    setModalProject(proj);
    setActiveModalImageIndex(0);
  };

  return (
    <div className="bg-white min-h-screen selection:bg-black selection:text-white">
      {/* Top Breadcrumb Header */}
      <div className="border-b border-neutral-200 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-neutral-500">
            <button
              onClick={onBackToHome}
              className="hover:text-black transition-colors cursor-pointer"
            >
              Главная
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-neutral-900 font-medium">Портфолио объектов</span>
          </div>

          <button
            onClick={onBackToHome}
            className="hidden sm:inline-flex items-center gap-1.5 text-neutral-600 hover:text-black transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Вернуться на главную</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="border-b border-neutral-200 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="max-w-3xl space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono tracking-[0.2em] uppercase text-neutral-400">
                <span>[ ПОРТФОЛИО ПРОЕКТОВ ]</span>
                <span>•</span>
                <span>ГЕОГРАФИЯ ПОСТАВОК: РОССИЯ И СНГ</span>
                <span>•</span>
                <span>С 2011 ГОДА</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light text-neutral-900 tracking-tight leading-[1.08]">
                Реализованные объекты
              </h1>
              <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed max-w-2xl">
                Более 2 500 реализованных проектов по всей России и в странах СНГ: от оснащения дворов ведущих девелоперов (ПИК, Самолет, ЛСР, Setl Group, Брусника, RBI) до городских набережных, курортных парков и объектов по 44-ФЗ.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
              <div className="border border-neutral-200 bg-neutral-50 p-4">
                <div className="text-2xl font-light text-neutral-900">2 500+</div>
                <div className="text-[10px] text-neutral-500 uppercase mt-1 font-mono">Объектов сдано</div>
              </div>
              <div className="border border-neutral-200 bg-neutral-50 p-4">
                <div className="text-2xl font-light text-neutral-900">100%</div>
                <div className="text-[10px] text-neutral-500 uppercase mt-1 font-mono">Приемка Госкомиссией</div>
              </div>
              <div className="border border-neutral-200 bg-neutral-50 p-4 col-span-2 sm:col-span-1">
                <div className="text-2xl font-light text-neutral-900">44-ФЗ / 223-ФЗ</div>
                <div className="text-[10px] text-neutral-500 uppercase mt-1 font-mono">Госзаказы и тендеры</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: Интерактивная карта Яндекс */}
      <section className="border-b border-neutral-200 bg-[#FAFAFA] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-2">
                [ 01 / ИНТЕРАКТИВНАЯ ГЕОГРАФИЯ ]
              </div>
              <h2 className="text-2xl sm:text-3xl font-light text-neutral-900 tracking-tight">
                Карта объектов
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-md font-light leading-relaxed">
              Нажмите на метку на карте или выберите проект из списка, чтобы увидеть адрес, установленное оборудование и фотоотчет.
            </p>
          </div>

          {/* Map + Active Project Sidebar Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Map Column */}
            <div className="lg:col-span-8">
              <YandexInteractiveMap
                projects={PORTFOLIO_PROJECTS}
                selectedProject={activeProject}
                onSelectProject={(proj) => setActiveProject(proj)}
                className="w-full h-full shadow-xs"
              />
            </div>

            {/* Selected Project Card Highlight */}
            <div className="lg:col-span-4 flex flex-col">
              <div className="border border-neutral-200 bg-white p-6 flex flex-col justify-between h-full space-y-6 shadow-xs">
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 uppercase mb-2">
                    <span>{activeProject.district}</span>
                    <span>{activeProject.year}</span>
                  </div>

                  <h3 className="text-xl font-light text-neutral-900 tracking-tight mb-2">
                    {activeProject.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-4 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span className="line-clamp-1">{activeProject.locationName}</span>
                  </div>

                  <div className="aspect-16/10 bg-neutral-100 border border-neutral-200 overflow-hidden mb-4 relative">
                    <img
                      src={activeProject.image}
                      alt={activeProject.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-black/85 text-white text-[9px] font-mono px-2 py-0.5 uppercase tracking-wider">
                      {activeProject.categoryLabel}
                    </div>
                  </div>

                  <div className="space-y-2 text-xs font-mono border-t border-neutral-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Заказчик:</span>
                      <span className="text-neutral-900 font-medium text-right max-w-[60%] line-clamp-1">{activeProject.customer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Объем:</span>
                      <span className="text-neutral-900 font-medium text-right max-w-[60%] line-clamp-1">{activeProject.volume}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-neutral-200">
                  <button
                    onClick={() => openProjectModal(activeProject)}
                    className="w-full bg-black text-white py-2.5 px-4 text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    <span>Открыть паспорт объекта</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onOpenCalculator()}
                    className="w-full bg-white text-neutral-900 border border-neutral-300 py-2.5 px-4 text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-neutral-50 transition-colors cursor-pointer"
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Рассчитать подобный проект</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Каталог всех объектов с фильтрами */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-200 mb-8">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-2">
              [ 02 / ВСЕ РЕАЛИЗОВАННЫЕ ПРОЕКТЫ ]
            </div>
            <h2 className="text-2xl sm:text-4xl font-light text-neutral-900 tracking-tight">
              Каталог объектов и кейсов
            </h2>
          </div>

          <div className="text-xs font-mono text-neutral-500">
            Показано объектов: <span className="text-neutral-900 font-medium">{filteredProjects.length} из {PORTFOLIO_PROJECTS.length}</span>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap border ${
                  selectedCategory === cat.id
                    ? 'bg-black text-white border-black font-medium'
                    : 'bg-neutral-50 text-neutral-600 border-neutral-200 hover:border-neutral-400'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* District Dropdown / Filter */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-neutral-400">Регион:</span>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="bg-neutral-50 border border-neutral-200 py-1.5 px-3 text-xs font-mono text-neutral-800 cursor-pointer focus:outline-hidden focus:border-black"
            >
              {districts.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="border border-neutral-200 bg-white flex flex-col justify-between hover:border-neutral-400 transition-colors group"
            >
              <div>
                {/* Project Image */}
                <div 
                  onClick={() => openProjectModal(proj)}
                  className="relative aspect-16/10 w-full bg-neutral-100 overflow-hidden border-b border-neutral-200 cursor-pointer"
                >
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 bg-black/85 backdrop-blur-xs text-white text-[10px] font-mono tracking-wider uppercase">
                      {proj.district}
                    </span>
                    <span className="px-2.5 py-1 bg-white/90 backdrop-blur-xs text-neutral-900 text-[10px] font-mono border border-neutral-300">
                      {proj.year}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white px-2.5 py-1 text-[11px] font-mono flex items-center gap-1">
                    <span>Подробнее</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                    {proj.categoryLabel}
                  </div>
                  <h3 
                    onClick={() => openProjectModal(proj)}
                    className="text-lg font-light text-neutral-900 tracking-tight mb-2 hover:text-black cursor-pointer transition-colors line-clamp-2"
                  >
                    {proj.title}
                  </h3>

                  <div className="flex items-center gap-1 text-xs text-neutral-500 mb-4 font-mono">
                    <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
                    <span className="line-clamp-1">{proj.locationName}</span>
                  </div>

                  <p className="text-xs text-neutral-600 leading-relaxed font-light mb-4 line-clamp-3">
                    {proj.description}
                  </p>

                  {/* Specs summary */}
                  <div className="border-t border-neutral-200 pt-3 space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Заказчик:</span>
                      <span className="text-neutral-800 font-medium text-right line-clamp-1 max-w-[65%]">{proj.customer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Объем:</span>
                      <span className="text-neutral-800 text-right line-clamp-1 max-w-[65%]">{proj.volume}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 border-t border-neutral-100 mt-4 flex items-center gap-2">
                <button
                  onClick={() => openProjectModal(proj)}
                  className="flex-1 bg-neutral-50 hover:bg-black hover:text-white border border-neutral-200 text-neutral-900 py-2 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer text-center"
                >
                  Паспорт объекта
                </button>
                <button
                  onClick={() => {
                    setActiveProject(proj);
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  title="Показать на карте"
                  className="p-2 border border-neutral-200 text-neutral-500 hover:text-black hover:border-black transition-colors cursor-pointer"
                >
                  <MapPin className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: CTA Banner */}
      <section className="border-t border-neutral-200 bg-neutral-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400">
              [ ИНДИВИДУАЛЬНОЕ ПРОИЗВОДСТВО ]
            </div>
            <h2 className="text-2xl sm:text-4xl font-light tracking-tight">
              Планируете объект или тендер?
            </h2>
            <p className="text-sm text-neutral-400 font-light leading-relaxed">
              Отправьте нам чертежи КД / КМД или ТЗ. Инженерный отдел выполнит аудит свариваемости, оптимизирует раскрой и подготовит расчет сметы за 2 часа.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => onOpenCalculator()}
              className="bg-white text-neutral-900 hover:bg-neutral-100 px-6 py-3.5 text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              <span>Открыть онлайн-калькулятор</span>
            </button>
            <button
              onClick={() => onOpenMeasurerModal()}
              className="border border-neutral-700 hover:border-white text-white px-6 py-3.5 text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Заказать выезд инженера</span>
            </button>
          </div>
        </div>
      </section>

      {/* MODAL: Full Project Case Study Details */}
      {modalProject && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white border border-neutral-200 max-w-4xl w-full max-h-[90vh] overflow-y-auto my-auto shadow-2xl relative">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                <span>[ ПАСПОРТ ОБЪЕКТА ]</span>
                <span>•</span>
                <span className="text-neutral-900 font-medium">{modalProject.district}</span>
              </div>
              <button
                onClick={() => setModalProject(null)}
                className="p-1 text-neutral-400 hover:text-black transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-8">
              {/* Title & Location */}
              <div>
                <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">
                  {modalProject.categoryLabel}
                </div>
                <h3 className="text-2xl sm:text-3xl font-light text-neutral-900 tracking-tight mb-2">
                  {modalProject.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-600">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span>{modalProject.locationName}</span>
                </div>
              </div>

              {/* Photo Showcase (Single Hero with option to switch if gallery exists) */}
              <div className="space-y-3">
                <div className="aspect-16/9 bg-neutral-100 border border-neutral-200 overflow-hidden relative">
                  <img
                    src={modalProject.gallery?.[activeModalImageIndex] || modalProject.image}
                    alt={modalProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/80 text-white text-[10px] font-mono px-2.5 py-1">
                    Сдача: {modalProject.year}
                  </div>
                </div>

                {modalProject.gallery && modalProject.gallery.length > 1 && (
                  <div className="flex gap-2">
                    {modalProject.gallery.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveModalImageIndex(idx)}
                        className={`w-20 aspect-16/10 border overflow-hidden cursor-pointer ${
                          activeModalImageIndex === idx ? 'border-black ring-1 ring-black' : 'border-neutral-200 opacity-60'
                        }`}
                      >
                        <img src={img} alt="thumb" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Key Data Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 border-t border-b border-neutral-200 py-6 text-xs font-mono">
                <div>
                  <div className="text-neutral-400 mb-1">Заказчик / Девелопер:</div>
                  <div className="text-neutral-900 font-medium">{modalProject.customer}</div>
                </div>
                <div>
                  <div className="text-neutral-400 mb-1">Объем конструкций:</div>
                  <div className="text-neutral-900 font-medium">{modalProject.volume}</div>
                </div>
                <div>
                  <div className="text-neutral-400 mb-1">Тип контракта:</div>
                  <div className="text-neutral-900 font-medium">{modalProject.contractType || 'Прямой договор'}</div>
                </div>
                <div>
                  <div className="text-neutral-400 mb-1">Срок изготовления:</div>
                  <div className="text-neutral-900 font-medium">{modalProject.completionTime || '30-45 дней'}</div>
                </div>
                <div className="sm:col-span-2">
                  <div className="text-neutral-400 mb-1">Антикоррозийная защита:</div>
                  <div className="text-neutral-900 font-medium">{modalProject.coatings}</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-sm font-mono uppercase tracking-wider text-neutral-900 mb-2">
                  Описание выполненных работ:
                </h4>
                <p className="text-sm text-neutral-600 leading-relaxed font-light">
                  {modalProject.description}
                </p>
              </div>

              {/* Installed Products List */}
              {modalProject.productsInstalled && modalProject.productsInstalled.length > 0 && (
                <div>
                  <h4 className="text-sm font-mono uppercase tracking-wider text-neutral-900 mb-3">
                    Установленное оборудование и МАФ:
                  </h4>
                  <div className="space-y-2">
                    {modalProject.productsInstalled.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-mono text-neutral-700 bg-neutral-50 p-2.5 border border-neutral-200">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {modalProject.tags.map((t, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-neutral-100 text-neutral-700 text-[11px] font-mono">
                    #{t}
                  </span>
                ))}
              </div>

              {/* Modal Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-neutral-200">
                <button
                  onClick={() => {
                    setModalProject(null);
                    onOpenCalculator();
                  }}
                  className="flex-1 bg-black text-white py-3 px-4 text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Рассчитать смету по объекту</span>
                </button>
                <button
                  onClick={() => {
                    setModalProject(null);
                    onNavigateToCatalog();
                  }}
                  className="bg-neutral-100 hover:bg-neutral-200 text-neutral-900 py-3 px-6 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                >
                  В каталог МАФ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
