import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  ArrowLeft, 
  ArrowRight,
  Compass, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Calculator, 
  Check, 
  FileCheck, 
  Sparkles, 
  Maximize2, 
  Wrench, 
  Building2, 
  HelpCircle,
  FileCode,
  Download,
  Flame,
  Award,
  PhoneCall,
  CalendarCheck
} from 'lucide-react';
import { PRODUCTION_UNITS } from '../data/productionUnitsData';

interface EngineeringBureauPageProps {
  onBackToProduction: () => void;
  onBackToHome: () => void;
  onOpenCalculator: (initialService?: string) => void;
  onOpenMeasurerModal: () => void;
  onNavigateToCatalog: () => void;
  onSelectUnit?: (unitId: string) => void;
}

const CAD_SYSTEMS = [
  {
    id: 'solidworks',
    name: 'SolidWorks 3D',
    tag: 'Dassault Systèmes / Параметрика и FEA',
    description: 'Основной инструмент твердотельного и поверхностного моделирования. Точный расчет разверток листового металла с учетом К-фактора деформации для наших прессов HACO и MAIHONG. Проведение конечно-элементного прочностного анализа (FEA) ветровых и снеговых нагрузок.',
    formats: ['.SLDPRT', '.SLDASM', '.SLDDRW', '.STEP', '.IGES', '.XT'],
    capabilities: [
      'Параметрическое моделирование сложных сборок с автоматическим пересчетом деталировок',
      'Симуляция гибки тонколистового металла (0.5 – 12 мм) с расчетом пружинения',
      'FEA-анализ деформаций и напряжений в критических узлах несущих металлоконструкций',
      'Прямой экспорт контуров разверток 1:1 в DXF для CAM-системы раскроя CypCut'
    ],
    badge: 'Основная 3D САПР'
  },
  {
    id: 'kompas',
    name: 'КОМПАС-3D v22',
    tag: 'АСКОН / 100% стандарты ЕСКД и ГОСТ',
    description: 'Отечественная инженерная система для сквозного выпуска рабочей конструкторской документации. Безукоризненное соблюдение ГОСТ 2.102-2013, ГОСТ 2.106-96, автоматическое формирование ведомостей расхода металла и спецификаций, проходящих любые государственные экспертизы.',
    formats: ['.CDW', '.M3D', '.A3D', '.SPW', '.DWG', '.PDF'],
    capabilities: [
      'Выпуск полных рабочих комплектов чертежей разделов КМ (Конструкции металлические) и КМД',
      'Разработка и регистрация официальных Технических Условий (ТУ) по ГОСТ 2.114-2016',
      'Оформление паспортов изделий и руководств по эксплуатации по ГОСТ Р 52169-2012',
      'Подготовка рабочей документации под требования 44-ФЗ, 223-ФЗ, КГА и КГИОП СПб'
    ],
    badge: '100% ЕСКД и ГОСТ'
  },
  {
    id: 'inventor',
    name: 'Autodesk Inventor',
    tag: 'Autodesk / Пространственные фермы и BIM',
    description: 'Инструмент для проектирования пространственных каркасов, нестандартных арт-объектов и интеграции в единую BIM-среду девелоперских проектов. Позволяет моделировать кинематику подвижных элементов и формировать информационные модели.',
    formats: ['.IPT', '.IAM', '.IDW', '.IFC', '.RVT', '.SAT'],
    capabilities: [
      'Проектирование сложных пространственных криволинейных ферм и арт-объектов',
      'Кинематический анализ динамических игровых элементов (качели, карусели, шарниры)',
      'Экспорт геометрии в открытый BIM-формат IFC для генпроектировщиков жилых кварталов',
      'Проверка сборок на пространственные коллизии и технологичность сварки НАКС'
    ],
    badge: 'BIM & Кинематика'
  }
];

const DELIVERABLES = [
  {
    code: '01',
    title: 'Рабочие чертежи КМ / КМД и карты раскроя',
    standard: 'ГОСТ 2.109-73 / ГОСТ 21.502-2007',
    description: 'Полный комплект сборочных чертежей, монтажных схем, деталировки каждого элемента с указанием шероховатости и допусков. Включает ведомость элементов, спецификацию крепежа и развертки для лазера CypCut с минимальным отходом металла.',
    tags: ['Спецификация стали', 'Развертки 1:1 DXF', 'Сборочные узлы']
  },
  {
    code: '02',
    title: 'Технические условия (ТУ) и паспорта МАФ',
    standard: 'ГОСТ 2.114-2016 / ГОСТ Р 52169-2012',
    description: 'Разработка официальных ТУ завода с каталожным листом продукции. Оформление паспортов малых архитектурных форм и детского оборудования, необходимых для сдачи объектов в Службу Государственного Строительного Надзора и КГА.',
    tags: ['Регистрация ТУ', 'Паспорт изделия', 'Сертификация']
  },
  {
    code: '03',
    title: 'Маршрутные технологические карты (ЕСТД)',
    standard: 'ГОСТ 3.1118-82 ЕСТД / СТП завода',
    description: 'Пошаговые технологические карты для цеховых мастеров: режимы лазерного раскроя (давление азота/кислорода), последовательность гибки на ЧПУ, сварочные карты НАКС с указанием катета шва и параметры полимеризации в печи 200°C.',
    tags: ['Технологический процесс', 'Режимы ЧПУ', 'Контроль ОТК']
  },
  {
    code: '04',
    title: 'Прочностной расчет и FEA-анализ',
    standard: 'СП 16.13330.2017 / СП 20.13330.2016',
    description: 'Компьютерное моделирование методом конечных элементов (FEA). Расчет предельных ветровых, снеговых и эксплуатационных нагрузок. Оптимизация металлоемкости изделия со снижением веса до 20% без потери запаса прочности.',
    tags: ['FEA-моделирование', 'Экономия до 20% стали', 'Отчет о нагрузках']
  }
];

const NON_TRIVIAL_TASKS = [
  {
    title: 'Винтовые и тоннельные скаты до 12м',
    desc: 'Пространственная развертка спиралей из полированной стали AISI 304 толщиной 2–3 мм с переменным углом наклона и строгим соблюдением безопасных радиусов скольжения по ГОСТ Р 52169.',
    solution: 'Параметрическая сегментация в SolidWorks + лазерная сварка НАКС с бесшовной ручной полировкой стыков до зеркального состояния.'
  },
  {
    title: 'Бионические арт-объекты и параметрические стелы',
    desc: 'Сложная криволинейная геометрия малых архитектурных форм с нерегулярной перфорацией и скрытым пространственным каркасом жесткости для ветровых районов Санкт-Петербурга.',
    solution: 'Построение поверхностных моделей в Inventor, генерация ребер жесткости и развертка обшивки на столы лазерного раскроя 6000 мм.'
  },
  {
    title: 'Многогранные чаны и купели сложной формы',
    desc: 'Герметичные резервуары из нержавеющей стали AISI 304/316 с гидростатическим давлением, встроенными ступенями и системой рециркуляционного подогрева.',
    solution: 'Расчет гидростатических напряжений, подбор компенсационных гибов на прессе 250т и разработка карт аргонодуговой сварки НАКС.'
  },
  {
    title: 'Реверс-инжиниринг импортных МАФ и оборудования',
    desc: 'Воссоздание европейской городской мебели и игровых комплексов по фотографиям, каталогам или физическим изношенным образцам с заменой на российский прокат.',
    solution: 'Лазерный 3D-обмер, параметризация узлов в КОМПАС-3D и выпуск комплекта чертежей по ЕСКД с адаптацией под доступные на складе марки стали.'
  }
];

export const EngineeringBureauPage: React.FC<EngineeringBureauPageProps> = ({
  onBackToProduction,
  onBackToHome,
  onOpenCalculator,
  onOpenMeasurerModal,
  onNavigateToCatalog,
  onSelectUnit,
}) => {
  const [activeCadTab, setActiveCadTab] = useState<string>('solidworks');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const activeCad = CAD_SYSTEMS.find(c => c.id === activeCadTab) || CAD_SYSTEMS[0];

  return (
    <div className="bg-white min-h-screen selection:bg-black selection:text-white">
      {/* Breadcrumbs Navigation */}
      <div className="border-b border-neutral-200 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-neutral-500 overflow-x-auto whitespace-nowrap scrollbar-none">
            <button
              onClick={onBackToHome}
              className="hover:text-black transition-colors cursor-pointer"
            >
              Главная
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <button
              onClick={onBackToProduction}
              className="hover:text-black transition-colors cursor-pointer"
            >
              Производство и цеха
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="text-neutral-900 font-medium">Конструкторское бюро завода (ЕСКД)</span>
          </div>

          <button
            onClick={onBackToProduction}
            className="hidden sm:inline-flex items-center gap-1.5 text-neutral-600 hover:text-black transition-colors cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Все участки цеха</span>
          </button>
        </div>
      </div>

      {/* Hero Header Section */}
      <div className="border-b border-neutral-200 py-10 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Top Meta info */}
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-neutral-400 mb-4">
            <span className="bg-black text-white px-2.5 py-0.5 font-medium">
              [ 06 / ИНЖЕНЕРНЫЙ ОТДЕЛ ]
            </span>
            <span>•</span>
            <span className="text-neutral-900 font-medium">SolidWorks • КОМПАС-3D • Inventor</span>
            <span>•</span>
            <span>ЦЕХ САНКТ-ПЕТЕРБУРГ / КОЛПИНО</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left Column */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl sm:text-5xl font-light text-neutral-900 tracking-tight leading-tight sm:leading-none mb-6">
                  Конструкторское бюро завода
                </h1>
                
                <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed mb-6">
                  Штатный инженерный отдел завода полного цикла. Профессиональная разработка рабочей конструкторской документации 
                  разделов <strong className="text-neutral-900 font-medium">КМ и КМД</strong>, выпуск официальных <strong className="text-neutral-900 font-medium">Технических Условий (ТУ)</strong>, 
                  маршрутных технологических карт и разверток под лазерные столы ЧПУ в строгом соответствии с требованиями <strong className="text-neutral-900 font-medium">ЕСКД</strong>.
                </p>

                {/* Badges strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 mb-8">
                  <div className="border border-neutral-200 p-3 bg-neutral-50/70">
                    <div className="text-[10px] font-mono text-neutral-500 uppercase">Стандарты</div>
                    <div className="text-xs font-semibold text-neutral-900 mt-1">100% ЕСКД / ГОСТ</div>
                  </div>
                  <div className="border border-neutral-200 p-3 bg-neutral-50/70">
                    <div className="text-[10px] font-mono text-neutral-500 uppercase">САПР-платформы</div>
                    <div className="text-xs font-semibold text-neutral-900 mt-1">Solid, КОМПАС, Inventor</div>
                  </div>
                  <div className="border border-neutral-200 p-3 bg-neutral-50/70">
                    <div className="text-[10px] font-mono text-neutral-500 uppercase">Срок разверток</div>
                    <div className="text-xs font-semibold text-neutral-900 mt-1">От 24 часов</div>
                  </div>
                  <div className="border border-neutral-200 p-3 bg-neutral-50/70">
                    <div className="text-[10px] font-mono text-neutral-500 uppercase">Согласование</div>
                    <div className="text-xs font-semibold text-neutral-900 mt-1">КГА, КГИОП, ГАТИ</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-neutral-100">
                <button
                  onClick={() => onOpenCalculator('разработку конструкторской документации (КМ/КМД/ТУ)')}
                  className="px-6 py-3 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Рассчитать смету по ТЗ</span>
                </button>
                <button
                  onClick={onOpenMeasurerModal}
                  className="px-6 py-3 border border-neutral-300 text-neutral-900 text-xs font-mono uppercase tracking-wider hover:border-black hover:bg-neutral-50 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Вызвать инженера-конструктора</span>
                </button>
              </div>
            </div>

            {/* Right Column: Visual Preview */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="relative aspect-4/3 w-full bg-neutral-100 border border-neutral-200 overflow-hidden group">
                <img
                  src="/images/engineering.png"
                  alt="Инженерное проектирование и 3D CAD чертежи"
                  className="w-full h-full object-cover group-hover:scale-102 transition-all duration-500"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="text-[11px] font-mono tracking-wider uppercase text-neutral-300">
                    Инженерный центр завода СД-МАФ
                  </div>
                  <div className="text-base font-medium mt-1">
                    Сквозная цепочка: 3D CAD → FEA-расчет → Развертка ЧПУ → Готовое изделие
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div className="border border-neutral-200 p-2 text-center bg-[#FAFAFA]">
                  <span className="block text-[10px] font-mono text-neutral-400">Точность ЧПУ</span>
                  <span className="text-xs font-semibold text-neutral-900">±0.03 мм</span>
                </div>
                <div className="border border-neutral-200 p-2 text-center bg-[#FAFAFA]">
                  <span className="block text-[10px] font-mono text-neutral-400">Снижение веса</span>
                  <span className="text-xs font-semibold text-neutral-900">до -20%</span>
                </div>
                <div className="border border-neutral-200 p-2 text-center bg-[#FAFAFA]">
                  <span className="block text-[10px] font-mono text-neutral-400">Гарантия КД</span>
                  <span className="text-xs font-semibold text-neutral-900">100% ЕСКД</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CAD Software Workbench Section */}
      <div className="border-b border-neutral-200 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="text-xs font-mono tracking-widest text-neutral-500 uppercase mb-2">
                [ 01 / Программные комплексы 3D/2D САПР ]
              </div>
              <h2 className="text-2xl sm:text-3xl font-light text-neutral-900 tracking-tight">
                Инструменты разработки и параметризации
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-md font-light leading-relaxed">
              Мы используем передовой стек инженерного софта, позволяющий напрямую транслировать 3D-модели в управляющие программы для нашего лазерного, гибочного и сварочного оборудования.
            </p>
          </div>

          {/* Software Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
            {CAD_SYSTEMS.map((cad) => (
              <button
                key={cad.id}
                onClick={() => setActiveCadTab(cad.id)}
                className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap border flex items-center gap-2 ${
                  activeCadTab === cad.id
                    ? 'bg-black text-white border-black font-semibold shadow-xs'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
                }`}
              >
                <span>{cad.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-none ${activeCadTab === cad.id ? 'bg-neutral-800 text-neutral-200' : 'bg-neutral-100 text-neutral-500'}`}>
                  {cad.badge}
                </span>
              </button>
            ))}
          </div>

          {/* Active CAD Detail Card */}
          <div className="border border-neutral-200 bg-white p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7">
                <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-1">
                  {activeCad.tag}
                </div>
                <h3 className="text-xl sm:text-2xl font-light text-neutral-900 mb-4">
                  {activeCad.name}
                </h3>
                <p className="text-sm text-neutral-600 font-light leading-relaxed mb-6">
                  {activeCad.description}
                </p>

                <div className="space-y-3">
                  <div className="text-xs font-mono uppercase text-neutral-500 tracking-wider">
                    Ключевые инженерные возможности:
                  </div>
                  {activeCad.capabilities.map((cap, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-800">
                      <Check className="w-4 h-4 text-black shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-neutral-200 lg:pl-8 flex flex-col justify-between pt-6 lg:pt-0">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-3">
                    Поддерживаемые форматы файлов:
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {activeCad.formats.map((fmt, fIdx) => (
                      <span key={fIdx} className="px-2.5 py-1 bg-neutral-100 border border-neutral-200 text-neutral-800 font-mono text-xs">
                        {fmt}
                      </span>
                    ))}
                  </div>

                  <div className="bg-neutral-50 border border-neutral-200 p-4 mb-4">
                    <div className="text-xs font-medium text-neutral-900 mb-1">
                      Прямая трансляция в ЧПУ-цех
                    </div>
                    <div className="text-xs text-neutral-600 leading-relaxed font-light">
                      Чертежи и развертки из {activeCad.name} поступают напрямую на сервер лазерного комплекса Knoppo KF 3 кВт и листогиба HACO без повторной оцифровки, исключая геометрические погрешности.
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onOpenCalculator(`разработку в ${activeCad.name}`)}
                  className="w-full py-2.5 border border-black text-neutral-900 hover:bg-black hover:text-white text-xs font-mono uppercase tracking-wider transition-colors text-center cursor-pointer"
                >
                  Заказать проект в {activeCad.name}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deliverables Section (4 Packages) */}
      <div className="border-b border-neutral-200 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <div className="text-xs font-mono tracking-widest text-neutral-500 uppercase mb-2">
              [ 02 / Пакеты выпускаемой документации ]
            </div>
            <h2 className="text-2xl sm:text-3xl font-light text-neutral-900 tracking-tight">
              Полный комплект документации по стандартам ЕСКД
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-xl font-light leading-relaxed mt-2">
              Мы выдаем юридически чистую и технически безукоризненную документацию, готовую как к немедленному запуску в производство, так и к согласованию в надзорных инстанциях.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DELIVERABLES.map((pkg) => (
              <div
                key={pkg.code}
                className="border border-neutral-200 p-6 sm:p-8 hover:border-black transition-colors flex flex-col justify-between group bg-white"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-xs font-mono text-neutral-400 group-hover:text-black transition-colors">
                      [ {pkg.code} ]
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 bg-neutral-100 text-neutral-700 border border-neutral-200">
                      {pkg.standard}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-light text-neutral-900 mb-3 group-hover:text-black transition-colors">
                    {pkg.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed mb-6">
                    {pkg.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-neutral-100">
                  {pkg.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 bg-neutral-50 border border-neutral-200 text-neutral-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Non-Trivial Engineering Tasks */}
      <div className="border-b border-neutral-200 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <div className="text-xs font-mono tracking-widest text-neutral-500 uppercase mb-2">
              [ 03 / Сложный инжиниринг ]
            </div>
            <h2 className="text-2xl sm:text-3xl font-light text-neutral-900 tracking-tight">
              Готовы решать самые нетривиальные задачи
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-xl font-light leading-relaxed mt-2">
              Там, где обычные производства отказываются из-за сложности геометрии или отсутствия расчетов, наше КБ находит математически точные технологические решения.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NON_TRIVIAL_TASKS.map((task, idx) => (
              <div key={idx} className="border border-neutral-200 bg-white p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-black shrink-0" />
                    <h3 className="text-base font-medium text-neutral-900">
                      {task.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed mb-4">
                    {task.desc}
                  </p>
                </div>

                <div className="bg-neutral-50 border-l-2 border-black p-3 text-xs text-neutral-800 leading-relaxed font-mono">
                  <strong className="block text-[10px] text-neutral-500 uppercase mb-0.5">Инженерное решение завода:</strong>
                  {task.solution}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technical Specifications Passport Table */}
      <div className="border-b border-neutral-200 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="text-xs font-mono tracking-widest text-neutral-500 uppercase mb-2">
              [ 04 / Паспорт возможностей КБ ]
            </div>
            <h2 className="text-2xl sm:text-3xl font-light text-neutral-900 tracking-tight">
              Технологические параметры и стандарты
            </h2>
          </div>

          <div className="border border-neutral-200 divide-y divide-neutral-200 bg-white">
            {[
              { label: 'Программные комплексы 3D/2D САПР', val: 'SolidWorks 2024, КОМПАС-3D v22, Autodesk Inventor Professional', note: 'Лицензионное инженерное ПО с параметрикой' },
              { label: 'Соответствие стандартам', val: 'ЕСКД (ГОСТ 2.102, 2.106, 2.114), СП 16.13330.2017, ГОСТ Р 52169-2012', note: 'Гарантия прохождения КГА, КГИОП, Госэкспертизы' },
              { label: 'Поддерживаемые входные 3D-форматы', val: 'STEP, IGES, SLDPRT, IPT, SAT, XT, IFC, RVT, DWG 3D', note: 'Прямой импорт без потерь твердотельной геометрии' },
              { label: 'Поддерживаемые входные 2D-форматы', val: 'DWG, DXF, CDW, PDF, эскизы от руки, сканированные чертежи', note: 'Профессиональная векторизация и доработка по ЕСКД' },
              { label: 'Точность расчетов разверток под ЧПУ', val: '±0.03 мм с адаптацией под радиусы гибки пуансонов HACO', note: 'Компенсация толщины нейтрального слоя К-фактором' },
              { label: 'FEA-анализ и оптимизация металлоемкости', val: 'Моделирование ветровых, снеговых нагрузок и запаса прочности', note: 'Снижение себестоимости стали до 20% без потери жесткости' },
              { label: 'Разработка официальных ТУ', val: 'Разработка и регистрация ТУ по ГОСТ 2.114-2016', note: 'Присвоение каталожного номера Росстандарта' },
              { label: 'Сроки подготовки рабочей КД', val: 'Развертки: 24–48 ч. Полный комплект КМД: от 3 до 5 рабочих дней', note: 'Выдача прямо в цех завода в Колпино' },
            ].map((row, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-12 py-3 px-4 sm:px-6 text-xs sm:text-sm hover:bg-neutral-50 transition-colors">
                <div className="md:col-span-4 font-mono text-neutral-500 mb-1 md:mb-0">
                  {row.label}
                </div>
                <div className="md:col-span-5 text-neutral-900 font-medium">
                  {row.val}
                </div>
                <div className="md:col-span-3 text-neutral-400 text-xs font-light">
                  {row.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Accepted Inputs & File Upload CTA */}
      <div className="border-b border-neutral-200 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA]">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-xs font-mono tracking-widest text-neutral-500 uppercase mb-2">
            [ 05 / Запуск в работу ]
          </div>
          <h2 className="text-2xl sm:text-4xl font-light text-neutral-900 tracking-tight mb-4">
            Отправьте эскиз, модель или ТЗ на аудит
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 font-light max-w-xl mx-auto leading-relaxed mb-8">
            Инженеры конструкторского бюро бесплатно изучат исходные материалы, проверят собираемость, укажут на возможности снижения металлоемкости и подготовят предварительную смету.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onOpenCalculator('разработку конструкторской документации КБ')}
              className="px-8 py-3.5 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              <span>Рассчитать стоимость КД</span>
            </button>
            <button
              onClick={onOpenMeasurerModal}
              className="px-8 py-3.5 border border-neutral-300 text-neutral-900 text-xs font-mono uppercase tracking-wider hover:border-black hover:bg-white transition-colors flex items-center gap-2 cursor-pointer bg-white"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Вызов инженера на объект</span>
            </button>
            <button
              onClick={onNavigateToCatalog}
              className="px-8 py-3.5 border border-neutral-200 text-neutral-600 text-xs font-mono uppercase tracking-wider hover:border-black hover:text-black transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Посмотреть каталог МАФ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Prev / Next Workshop Units Footer Navigation */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <button
            onClick={() => {
              if (onSelectUnit) onSelectUnit('welding-naks');
            }}
            className="flex items-center gap-2 text-neutral-600 hover:text-black transition-colors cursor-pointer w-full sm:w-auto justify-start"
          >
            <ArrowLeft className="w-4 h-4" />
            <div className="text-left">
              <span className="block text-[10px] text-neutral-400 uppercase">Предыдущий участок</span>
              <span className="font-semibold text-neutral-900">Сварочный участок НАКС</span>
            </div>
          </button>

          <button
            onClick={onBackToProduction}
            className="px-4 py-2 border border-neutral-200 hover:border-black transition-colors uppercase tracking-wider text-neutral-800 cursor-pointer text-center"
          >
            Все участки производства
          </button>

          <button
            onClick={() => {
              if (onSelectUnit) onSelectUnit('laser-22kw-6m');
            }}
            className="flex items-center gap-2 text-neutral-600 hover:text-black transition-colors cursor-pointer w-full sm:w-auto justify-end"
          >
            <div className="text-right">
              <span className="block text-[10px] text-neutral-400 uppercase">Следующий участок</span>
              <span className="font-semibold text-neutral-900">Лазерный раскрой Knoppo KF</span>
            </div>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
