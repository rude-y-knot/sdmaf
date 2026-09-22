import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  ArrowLeft, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Zap, 
  Check, 
  Calculator, 
  Compass, 
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Maximize2,
  Sparkles,
  FileCheck,
  Building2,
  Wrench,
  Flame,
  Award
} from 'lucide-react';
import { TECH_STEPS } from '../data/factoryData';
import { PRODUCTION_UNITS, ProductionUnit } from '../data/productionUnitsData';
import { LaserWorkshopGallery } from '../components/LaserWorkshopGallery';
import { SEOHead } from '../components/SEOHead';

interface ProductionPageProps {
  onBackToHome: () => void;
  onOpenCalculator: (initialService?: string) => void;
  onOpenMeasurerModal: () => void;
  onNavigateToCatalog: () => void;
  onSelectUnit?: (unitId: string) => void;
}

const STEEL_GRADES = [
  {
    grade: 'AISI 304 (08Х18Н10)',
    type: 'Аустенитная нержавеющая сталь',
    features: 'Пищевая нержавеющая сталь с высоким содержанием хрома (18%) и никеля (10%). Полная стойкость к атмосферным осадкам Санкт-Петербурга, гладкая зеркальная или шлифованная поверхность.',
    applications: 'Скаты для детских горок, настилы купелей, парковые поручни, декоративные арт-объекты.',
    finishes: 'Зеркальная (BA / Mirror 8K), Сатинированная (Scotch-Brite), Шлифованная (Grit 320)',
    badge: 'Премиум / ГОСТ Р 52169',
  },
  {
    grade: 'AISI 316 (03Х17Н14М3)',
    type: 'Молибденсодержащая кислотостойкая сталь',
    features: 'Легирована молибденом (2.5%), обладает повышенной стойкостью к хлоридам, морской воде, противогололедным реагентам и промышленным выбросам.',
    applications: 'Оборудование для набережных, причалов, морских портов, спа-купели с соленой водой, агрессивные среды.',
    finishes: 'Зеркальная, Матовая пассивированная, Шлифованная',
    badge: 'Спецсреды / Морской класс',
  },
  {
    grade: '09Г2С (С345 / С355)',
    type: 'Низколегированная конструкционная сталь',
    features: 'Повышенная прочность и ударная вязкость при отрицательных температурах (до -70°C). Отличная свариваемость без ограничений и подогрева.',
    applications: 'Несущие каркасы, пространственные фермы, балки перекрытий, силовые опоры малых архитектурных форм.',
    finishes: 'Порошковая окраска RAL / Архитектурный муар и шагрень',
    badge: 'Северное исполнение (ХЛ)',
  },
  {
    grade: 'Ст3сп5 (С245 / С255)',
    type: 'Конструкционная углеродистая сталь',
    features: 'Базовая пластичная конструкционная сталь с гарантией химического состава и механических свойств. Превосходно поддается гибке и лазерному раскрою.',
    applications: 'Парковые скамейки, урны, велопарковки, ограждения, перголы, навесы.',
    finishes: 'Горячее цинкование ГОСТ 9.307-89 / Порошковая полимеризация RAL',
    badge: 'Базовый стандарт',
  },
  {
    grade: 'АМг5 / АД31Т1',
    type: 'Коррозионностойкие алюминиевые сплавы',
    features: 'Малый удельный вес (в 3 раза легче стали), природная коррозионная стойкость и благородный внешний вид анодированной поверхности.',
    applications: 'Декоративные фасадные ламели, легкие перголы, солнцезащитные жалюзи, элементы подсветки.',
    finishes: 'Анодирование (серебро, шампань, черный), Порошковое напыление',
    badge: 'Облегченные конструкции',
  },
];

const TECHNICAL_LIMITS = [
  { param: 'Максимальный размер обрабатываемого листа', val: '6 000 × 1 500 мм', desc: 'Волоконные столы Knoppo KF 3 кВт (столы 3м и 6м)' },
  { param: 'Толщина лазерной резки черной стали (Ст3, 09Г2С)', val: 'до 20.0 мм', desc: 'Кислородный раскрой на сервоприводах YASKAWA' },
  { param: 'Толщина резки нержавеющей стали (AISI 304, 316)', val: 'до 8–10 мм', desc: 'В среде азота высокой чистоты (чистый рез без грата)' },
  { param: 'Толщина лазерной резки алюминия (АМг, АД)', val: 'до 8–10 мм', desc: 'Прецизионный оптический фокус Raytools' },
  { param: 'Максимальная длина гибки на ЧПУ прессах', val: '3 200 мм', desc: 'Пресс MAIHONG 160т с ЧПУ ESA и ЧПУ-бомбированием' },
  { param: 'Толщина листа при гибке (Ст3, 09Г2С)', val: 'до 8.0 мм', desc: 'Прессы HACO (40т) и MAIHONG (160т)' },
  { param: 'Диаметр вальцуемых обечаек', val: 'от Ø140 до Ø1500 мм', desc: '4-х валковый станок Keepler RME 1500×4 мм' },
  { param: 'Габариты изделий для порошковой окраски', val: 'до 6 000 × 1 800 × 2 100 мм', desc: 'Газовые термокамеры 3м и 6м, конвекция 16 575 м³/ч' },
  { param: 'Грузоподъемность мостовых кран-балок цеха', val: '10.0 тонн', desc: 'Сборка крупногабаритных металлоконструкций' },
  { param: 'Точность позиционирования и допуски', val: '0,5 мм', desc: 'Соответствие ГОСТ 14792-80 и ГОСТ 23118-2019' },
];

export const ProductionPage: React.FC<ProductionPageProps> = ({
  onBackToHome,
  onOpenCalculator,
  onOpenMeasurerModal,
  onNavigateToCatalog,
  onSelectUnit,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const filterTabs = [
    { id: 'all', label: 'Все участки цеха' },
    { id: 'laser', label: 'Лазерный раскрой' },
    { id: 'bending', label: 'Гибка металла и вальцовка' },
    { id: 'welding', label: 'Сварочный участок' },
    { id: 'coating', label: 'Покраска RAL и дробеструй' },
    { id: 'engineering', label: 'Конструкторское бюро (ЕСКД)' },
  ];

  const filteredUnits = activeCategory === 'all' 
    ? PRODUCTION_UNITS 
    : PRODUCTION_UNITS.filter(u => u.category === activeCategory);

  return (
    <div className="bg-white min-h-screen selection:bg-black selection:text-white">
      <SEOHead
        title="Производственные мощности и цеха ЧПУ | Завод «Стальное Дело» Колпино"
        description="Парк оборудования завода металлоконструкций в Санкт-Петербурге: 2 волоконных лазера 22 кВт, прессы ЧПУ 170т, сварка НАКС, камера порошковой покраски 7.5м."
        keywords="производство металлоконструкций спб, лазерный раскрой колпино, гибка металла чпу, порошковая покраска спб, завод стальное дело"
        canonicalPath="/production"
      />
      {/* Top Breadcrumbs Bar */}
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
            <span className="text-neutral-900 font-medium">Производство и цеха ЧПУ</span>
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

      {/* Hero Section: Factory Architecture & Capacity */}
      <div className="border-b border-neutral-200 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="max-w-3xl space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono tracking-[0.2em] uppercase text-neutral-400">
                <span>[ 01 / ПРОИЗВОДСТВЕННАЯ БАЗА ]</span>
                <span>•</span>
                <span>САНКТ-ПЕТЕРБУРГ / КОЛПИНО</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light text-neutral-900 tracking-tight leading-[1.08]">
                Производственные мощности и парк станков ЧПУ
              </h1>
              <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed max-w-2xl">
                Собственный заводской комплекс площадью 4 000+ м² в Колпино (СПб). Полный технологический цикл металлообработки: от лазерного раскроя и 3D-гибки до аттестованной сварки НАКС и полимерной окраски.
              </p>
            </div>

            {/* Quick action buttons in hero */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <button
                onClick={() => onOpenCalculator()}
                className="py-3.5 px-6 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Calculator className="w-4 h-4" />
                <span>Рассчитать смету на металлообработку</span>
              </button>

              <button
                onClick={onOpenMeasurerModal}
                className="py-3.5 px-6 border border-neutral-300 text-neutral-900 text-xs font-mono uppercase tracking-wider hover:border-black transition-colors flex items-center justify-center gap-2 cursor-pointer bg-white"
              >
                <Compass className="w-4 h-4" />
                <span>Вызов конструктора на замер</span>
              </button>
            </div>
          </div>

          {/* Key Metric Facts Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-12 pt-10 border-t border-neutral-200 font-mono text-xs">
            <div className="border border-neutral-200 bg-neutral-50 p-4">
              <div className="text-2xl font-light text-neutral-900">4 000 м²</div>
              <div className="text-[10px] text-neutral-500 uppercase mt-1">Площадь цехов в СПб</div>
            </div>
            <div className="border border-neutral-200 bg-neutral-50 p-4">
              <div className="text-2xl font-light text-neutral-900">2×3 кВт</div>
              <div className="text-[10px] text-neutral-500 uppercase mt-1">Лазеры Knoppo 3м и 6м</div>
            </div>
            <div className="border border-neutral-200 bg-neutral-50 p-4">
              <div className="text-2xl font-light text-neutral-900">160 тонн</div>
              <div className="text-[10px] text-neutral-500 uppercase mt-1">Прессы HACO & MAIHONG</div>
            </div>
            <div className="border border-neutral-200 bg-neutral-50 p-4">
              <div className="text-2xl font-light text-neutral-900">6.0 м</div>
              <div className="text-[10px] text-neutral-500 uppercase mt-1">Газовая термокамера №2</div>
            </div>
            <div className="border border-neutral-200 bg-neutral-50 p-4">
              <div className="text-2xl font-light text-neutral-900">НАКС</div>
              <div className="text-[10px] text-neutral-500 uppercase mt-1">Аттестация сварщиков</div>
            </div>
            <div className="border border-neutral-200 bg-neutral-50 p-4">
              <div className="text-2xl font-light text-neutral-900">0,5 мм</div>
              <div className="text-[10px] text-neutral-500 uppercase mt-1">Точность лазерного реза</div>
            </div>
          </div>
        </div>
      </div>

      {/* Real Photos & Specs of 22 kW Laser Cutters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">
        <LaserWorkshopGallery onOpenCalculator={onOpenCalculator} />
      </section>

      {/* SECTION 1: Парк оборудования и технологические участки */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-200 mb-8">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-2">
              [ 02 / Парк станков и оборудования ]
            </div>
            <h2 className="text-2xl sm:text-4xl font-light text-neutral-900 tracking-tight">
              Технологические участки завода
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-md font-light leading-relaxed">
            Каждый участок вынесен в отдельный технологический паспорт. Нажмите на карточку любого станка, чтобы открыть подробную страницу с таблицей параметров, допусков и видеодемонстрацией.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-8 border-b border-neutral-100">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap border ${
                  activeCategory === tab.id
                    ? 'bg-black text-white border-black font-medium'
                    : 'bg-neutral-50 text-neutral-600 border-neutral-200 hover:border-neutral-400'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => onSelectUnit && onSelectUnit('engineering-bureau')}
            className="px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap border border-neutral-300 bg-white text-neutral-900 hover:border-black hover:bg-neutral-50 flex items-center gap-2"
          >
            <span>Конструкторское бюро (ЕСКД)</span>
            <ArrowRight className="w-3 h-3 text-neutral-500" />
          </button>
        </div>

        {/* Machine Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredUnits.map((unit) => (
            <div
              key={unit.id}
              className="border border-neutral-200 bg-white flex flex-col justify-between hover:border-neutral-400 transition-colors group"
            >
              <div>
                {/* Image & Overlay Badges */}
                <div 
                  onClick={() => onSelectUnit && onSelectUnit(unit.id)}
                  className="relative aspect-16/9 w-full bg-neutral-100 overflow-hidden border-b border-neutral-200 cursor-pointer"
                >
                  <img
                    src={unit.image}
                    alt={unit.title}
                    className="w-full h-full object-cover grayscale-20 group-hover:grayscale-0 group-hover:scale-102 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 bg-black/85 backdrop-blur-xs text-white text-[10px] font-mono tracking-wider uppercase">
                      {unit.badge}
                    </span>
                    <span className="px-2.5 py-1 bg-white/90 backdrop-blur-xs text-neutral-900 text-[10px] font-mono border border-neutral-300">
                      {unit.categoryLabel}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white px-3 py-1.5 text-xs font-mono flex items-center gap-1.5">
                    <span>Открыть паспорт станка</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-1">
                    <span>{unit.model}</span>
                    <span>{unit.brand} ({unit.country})</span>
                  </div>
                  <h3 
                    onClick={() => onSelectUnit && onSelectUnit(unit.id)}
                    className="text-xl sm:text-2xl font-light text-neutral-900 tracking-tight mb-3 cursor-pointer hover:text-black transition-colors"
                  >
                    {unit.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light mb-6">
                    {unit.description}
                  </p>

                  {/* Technical Specs Table */}
                  <div className="border-t border-b border-neutral-200 py-3 mb-6 space-y-2 text-xs font-mono">
                    {unit.specs.slice(0, 4).map((spec, sIdx) => (
                      <div key={sIdx} className="flex justify-between items-center">
                        <span className="text-neutral-500 font-sans">{spec.label}:</span>
                        <span className="text-neutral-900 font-medium text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Advantages List */}
                  <div className="space-y-2 mb-6">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                      Ключевые преимущества:
                    </div>
                    <ul className="space-y-1.5 text-xs text-neutral-700 font-light">
                      {unit.advantages.slice(0, 3).map((adv, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#55AA53] shrink-0 mt-0.5" />
                          <span>{adv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 sm:p-8 pt-0 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {onSelectUnit && (
                  <button
                    onClick={() => onSelectUnit(unit.id)}
                    className="w-full py-3 px-4 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>Паспорт и техпроцесс</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => onOpenCalculator(unit.orderType)}
                  className="w-full py-3 px-4 border border-neutral-300 text-neutral-900 text-xs font-mono uppercase tracking-wider hover:border-black transition-colors flex items-center justify-center gap-2 cursor-pointer bg-white"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Рассчитать смету</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: 5-Step Technological Workflow */}
      <section className="bg-[#FAFAFA] border-y border-neutral-200 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-200 mb-12">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-2">
                [ 04 / Технологический регламент ]
              </div>
              <h2 className="text-2xl sm:text-4xl font-light text-neutral-900 tracking-tight">
                5 этапов производства и контроля качества
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-md font-light leading-relaxed">
              Строгое соблюдение ГОСТ и СП. Двухэтапная приемка лабораторией ОТК исключает отгрузку бракованных изделий.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {TECH_STEPS.map((step, idx) => (
              <div
                key={step.step || idx}
                className="bg-white border border-neutral-200 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-light text-neutral-300">
                      0{step.step || idx + 1}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-neutral-100 text-neutral-700">
                      {step.standards || 'ГОСТ'}
                    </span>
                  </div>
                  <h3 className="text-base font-medium text-neutral-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed font-light mb-4">
                    {step.details || step.subtitle}
                  </p>
                </div>

                <div className="border-t border-neutral-100 pt-3">
                  <div className="text-[10px] font-mono text-neutral-400 uppercase mb-1">
                    Оборудование / контроль:
                  </div>
                  <div className="text-xs text-neutral-800 font-medium">
                    {step.equipment}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Справочник марок стали и сплавов */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-200 mb-10">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-2">
              [ 05 / Металлопрокат и сырье ]
            </div>
            <h2 className="text-2xl sm:text-4xl font-light text-neutral-900 tracking-tight">
              Справочник применяемых марок стали
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-md font-light leading-relaxed">
            Постоянный неснижаемый складской запас 250+ тонн листового и профильного проката от ведущих комбинатов (Северсталь, НЛМК, Мечел).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STEEL_GRADES.map((metal, idx) => (
            <div
              key={idx}
              className="border border-neutral-200 p-6 flex flex-col justify-between hover:border-black transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-semibold text-neutral-900 bg-neutral-100 px-2 py-0.5">
                    {metal.grade}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">
                    {metal.badge}
                  </span>
                </div>

                <div className="text-xs font-medium text-neutral-700 mb-2">
                  {metal.type}
                </div>

                <p className="text-xs text-neutral-600 font-light leading-relaxed mb-4">
                  {metal.features}
                </p>

                <div className="space-y-2 border-t border-neutral-100 pt-3 text-xs">
                  <div>
                    <span className="text-neutral-400 font-mono text-[10px] uppercase block">Применение в МАФ:</span>
                    <span className="text-neutral-800 font-light">{metal.applications}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 font-mono text-[10px] uppercase block">Варианты финишной отделки:</span>
                    <span className="text-neutral-800 font-light">{metal.finishes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: Таблица допусков и лимитов для проектировщиков */}
      <section className="bg-neutral-50 border-t border-neutral-200 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-200 mb-8">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-2">
                [ 06 / Проектировщикам и КБ ]
              </div>
              <h2 className="text-2xl sm:text-4xl font-light text-neutral-900 tracking-tight">
                Технические лимиты и допуски
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-md font-light leading-relaxed">
              Справочные данные для архитекторов и инженеров-проектировщиков разделов КМ, КМД и АР.
            </p>
          </div>

          <div className="border border-neutral-200 bg-white overflow-hidden shadow-xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-100 font-mono text-[11px] uppercase text-neutral-600">
                  <th className="py-3 px-4 sm:px-6 font-medium">Технологический параметр</th>
                  <th className="py-3 px-4 sm:px-6 font-medium">Значение / Лимит</th>
                  <th className="py-3 px-4 sm:px-6 font-medium">Оборудование цеха</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 font-light">
                {TECHNICAL_LIMITS.map((item, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50 transition-colors">
                    <td className="py-3 px-4 sm:px-6 text-neutral-900 font-normal">
                      {item.param}
                    </td>
                    <td className="py-3 px-4 sm:px-6 font-mono font-medium text-neutral-900 whitespace-nowrap">
                      {item.val}
                    </td>
                    <td className="py-3 px-4 sm:px-6 text-neutral-500 font-mono text-[11px]">
                      {item.desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 5: CTA Consultation & Blueprint Upload */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="border border-neutral-200 bg-white p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400">
                [ Инженерный аудит за 15 минут ]
              </div>
              <h3 className="text-2xl sm:text-4xl font-light text-neutral-900 tracking-tight">
                Есть чертежи или эскиз проекта?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light max-w-2xl">
                Отправьте файлы в форматах DXF, DWG, STEP, PDF или эскиз от руки. Главный конструктор проверит технологичность раскроя, толщину гиба и подготовит расчет сметы с фиксированными сроками.
              </p>

              <div className="flex flex-wrap gap-4 pt-3 text-xs font-mono text-neutral-600">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#55AA53]" />
                  <span>Аудит КМД бесплатно</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#55AA53]" />
                  <span>Работаем с 44-ФЗ и 223-ФЗ</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#55AA53]" />
                  <span>Спецсчета по гособоронзаказу</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <button
                onClick={() => onOpenCalculator()}
                className="w-full py-4 px-6 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Calculator className="w-4 h-4" />
                <span>Загрузить чертеж в калькулятор</span>
              </button>

              <button
                onClick={onOpenMeasurerModal}
                className="w-full py-4 px-6 border border-neutral-300 text-neutral-900 text-xs font-mono uppercase tracking-wider hover:border-black transition-colors flex items-center justify-center gap-2 cursor-pointer bg-white"
              >
                <Compass className="w-4 h-4" />
                <span>Вызов конструктора на замер</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
