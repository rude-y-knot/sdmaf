import React, { useState, useMemo } from 'react';
import { 
  ChevronDown, 
  Search, 
  Clock, 
  Truck, 
  ShieldCheck, 
  FileText, 
  CreditCard, 
  HelpCircle,
  Phone,
  Calculator,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Layers,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface FAQItem {
  id: string;
  category: 'timeline' | 'delivery' | 'warranty' | 'engineering' | 'payment';
  question: string;
  answer: string;
  highlights?: string[];
  badge: string;
}

export const FAQ_DATA: FAQItem[] = [
  // 1. СРОКИ ИЗГОТОВЛЕНИЯ
  {
    id: 'timeline-standard',
    category: 'timeline',
    question: 'Каковы стандартные и минимальные сроки изготовления металлоконструкций и МАФ?',
    badge: 'Сроки от 24 часов',
    answer: 'Сроки производства зависят от типа изделия и сложности технологического цикла. Серийная уличная мебель, урны, велопарковки и базовые скаты для детских горок изготавливаются в срок от 5 до 12 рабочих дней. Индивидуальные архитектурные металлоконструкции и нестандартные МАФ по чертежам заказчика — от 10 до 20 рабочих дней. Услуги срочного лазерного раскроя ЧПУ и гибки листового металла выполняются за 24–48 часов при наличии проката на складе завода.',
    highlights: [
      'Лазерный раскрой и гибка ЧПУ: от 24 до 48 часов',
      'Серийные МАФ и уличная мебель: 5–12 рабочих дней',
      'Нестандартные металлоконструкции: 10–20 рабочих дней'
    ]
  },
  {
    id: 'timeline-urgent',
    category: 'timeline',
    question: 'Возможно ли срочное или экспресс-изготовление при горящих сроках сдачи объекта?',
    badge: '2 смены / 24/7',
    answer: 'Да. Производственный комплекс в Колпино работает в две смены с ежемесячной мощностью переработки металлопроката до 350 тонн. При необходимости срочной сдачи объекта ЖК или выполнения гарантийных обязательств перед госкомиссией мы подключаем экспресс-график с круглосуточной загрузкой волоконных лазеров Knoppo KF 3 кВт и сварочно-сборочных постов НАКС.',
    highlights: [
      'Возможность круглосуточного запуска в 2–3 смены',
      'Собственный склад листового проката AISI 304, AISI 316 и 09Г2С',
      'Оперативная переналадка ЧПУ-гидропрессов под срочные партии'
    ]
  },
  {
    id: 'timeline-drawings',
    category: 'timeline',
    question: 'Сколько времени занимает разработка КД/КМД и согласование разверток?',
    badge: 'КБ завода',
    answer: 'Инженеры нашего конструкторского бюро готовят развертки листовых деталей под ЧПУ и раскладочные карты (нестинг) в течение 24–48 часов с момента предоставления исходных 3D-моделей или эскизов. Разработка полного комплекта рабочей конструкторской документации (стадии КД, КМ, КМД) с прочностными расчетами занимает от 3 до 5 рабочих дней.',
    highlights: [
      'ЧПУ-развертки и нестинг: 24–48 часов',
      'Полный комплект КД/КМД по ЕСКД: 3–5 рабочих дней',
      'Согласование узлов со службой технадзора девелопера'
    ]
  },

  // 2. ДОСТАВКА И ЛОГИСТИКА
  {
    id: 'delivery-geo',
    category: 'delivery',
    question: 'Как организована доставка по Санкт-Петербургу, Ленинградской области и регионам РФ?',
    badge: 'СПб, РФ и СНГ',
    answer: 'Завод располагает собственной транспортной службой и прямыми контрактами с ведущими транспортно-логистическими операторами. По Санкт-Петербургу и Ленинградской области доставка осуществляется собственным автотранспортом (включая автомобили с манипуляторами) в день готовности партии. В регионы России и страны ЕАЭС отгружаем сборными грузами через ТК «Деловые Линии», «ПЭК», «Возовоз», а также выделенными еврофурами грузоподъемностью до 20 тонн.',
    highlights: [
      'Доставка по СПб и ЛО собственным транспортом и манипуляторами',
      'Прямые поставки еврофурами во все регионы РФ и страны СНГ',
      'Экспедирование и трекинг отправлений до площадки объекта'
    ]
  },
  {
    id: 'delivery-pickup',
    category: 'delivery',
    question: 'Возможен ли самовывоз готовой продукции напрямую с территории завода?',
    badge: 'Самовывоз / Колпино',
    answer: 'Да, самовывоз осуществляется бесплатно непосредственно с производственной площадки завода по адресу: г. Санкт-Петербург, г. Колпино, ул. Финляндская, 3. Цех оснащен мостовыми кран-балками грузоподъемностью 10.0 тонн и вилочными погрузчиками, что обеспечивает безопасную верхнюю и боковую погрузку любого коммерческого автотранспорта (от ГАЗелей до длинномерных открытых шаланд).',
    highlights: [
      'Удобный подъезд для длинномерного грузового транспорта',
      'Мостовые кран-балки 10 тонн для верхней погрузки',
      'Режим отгрузки: Понедельник–Пятница с 08:00 до 16:30'
    ]
  },
  {
    id: 'delivery-packaging',
    category: 'delivery',
    question: 'Как упаковываются полированные нержавеющие изделия и окрашенные металлоконструкции?',
    badge: 'Защита зеркала и RAL',
    answer: 'Для защиты зеркальной и сатинированной поверхности нержавеющей стали AISI 304/316 применяется лазерная защитная пленка толщиной 80–100 мкм, вспененный полиэтилен и воздушно-пузырьковая пленка. На торцы и кромки устанавливаются защитные картонные профили. Крупногабаритные МАФ и горки фиксируются на деревянных поддонах со стяжными ремнями и упаковываются в жесткую деревянную обрешетку.',
    highlights: [
      'Лазерная защитная пленка 80+ мкм на нержавеющей стали',
      'Деревянная обрешетка и паллетирование для межгорода',
      'Полная сохранность заводского глянца, муара и геометрии'
    ]
  },

  // 3. ГАРАНТИЯ И СЕРТИФИКАЦИЯ
  {
    id: 'warranty-periods',
    category: 'warranty',
    question: 'Каковы гарантийные сроки на металлоконструкции, нержавеющую сталь и порошковые покрытия?',
    badge: 'Гарантия до 10 лет',
    answer: 'Завод «Стальное Дело» предоставляет официальную гарантию качества, закрепляемую в договоре поставки и паспорте изделия: до 10 лет на отсутствие сквозной коррозии нержавеющих сплавов AISI 304 и AISI 316, 5 лет на полимерно-порошковые покрытия в климатическом исполнении УХЛ1 (архитектурные грунты с цинком + полиэфирный порошок Qualicoat), 3 года на силовые сварные соединения и механическую прочность каркасов.',
    highlights: [
      '10 лет — антикоррозийная стойкость нержавеющей стали',
      '5 лет — адгезия и стойкость порошкового покрытия RAL',
      '3 года — целостность сварных несущих узлов и каркасов'
    ]
  },
  {
    id: 'warranty-standards',
    category: 'warranty',
    question: 'Соответствуют ли детские горки и МАФ требованиям ТР ЕАЭС 042/2017 и ГОСТ?',
    badge: 'ТР ЕАЭС 042 / ГОСТ Р',
    answer: 'Вся линейка детского игрового оборудования (скаты, тоннельные и винтовые горки) разрабатывается и производится в строгом соответствии с Техническим регламентом Евразийского экономического союза ТР ЕАЭС 042/2017 «О безопасности оборудования для детских игровых площадок», а также стандартами ГОСТ Р 52169-2012 и ГОСТ 34614. Изделия комплектуются сертификатами соответствия, декларациями и паспортами безопасности.',
    highlights: [
      'Сертификат ТР ЕАЭС 042/2017 на каждую модель ската',
      'Травмобезопасные борта с радиусной завальцовкой без зазоров',
      'Бесшовная полировка сварных стыков (Ra < 0.05)'
    ]
  },
  {
    id: 'warranty-docs',
    category: 'warranty',
    question: 'Предоставляется ли исполнительная документация для закрытия форм КС-2 и КС-3?',
    badge: 'Акты КС-2 / КС-3 / НАКС',
    answer: 'Да. Мы обеспечиваем полное документальное сопровождение поставок для генподрядчиков и служб строительного контроля: паспорта качества завода-изготовителя, сертификаты на металл и сварочные материалы от заводов-производителей (Северсталь, НЛМК), протоколы визуально-измерительного (ВИК) и ультразвукового (УЗК) контроля сварных швов специалистами НАКС, а также закрывающие акты КС-2 и КС-3.',
    highlights: [
      'Сертификаты качества на каждую партию металлопроката',
      'Аттестованные специалисты НАКС и протоколы УЗК/ВИК',
      'Оформление актов скрытых работ и форм КС-2, КС-3'
    ]
  },

  // 4. ЧЕРТЕЖИ И ИНЖИНИРИНГ
  {
    id: 'engineering-formats',
    category: 'engineering',
    question: 'В каких форматах принимаются файлы и чертежи для расчета стоимости и запуска?',
    badge: 'Любые 2D / 3D CAD',
    answer: 'Мы принимаем файлы в любых распространенных форматах САПР: твердотельные 3D-модели (STEP, STP, SLDPRT, IPT, IGES, SAT), 2D-векторные контуры для лазерного раскроя (DXF, DWG), архитектурные проекты (PDF, RVT, IFC), а также эскизы с габаритными размерами от руки. Если у вас нет готового чертежа, конструкторы завода разработают проект с нуля по техническому заданию или фото-референсу.',
    highlights: [
      'Векторные форматы ЧПУ: DXF, DWG без разрывов контура',
      '3D-твердотельные модели: STEP, STP, SLDPRT, IGES',
      'Бесплатная проверка и конвертация файлов заказчика'
    ]
  },

  // 5. ОПЛАТА И ДОГОВОР
  {
    id: 'payment-terms',
    category: 'payment',
    question: 'Каковы условия оплаты, порядок расчетов для юридических лиц и работа по 44-ФЗ / 223-ФЗ?',
    badge: 'НДС 20% / Госзаказ',
    answer: 'Работаем по безналичному расчету с юридическими лицами и ИП с выделением НДС 20%. Стандартные условия: авансовый платеж 50–70% при размещении заказа в производство и окончательный расчет 30–50% по уведомлению о готовности к отгрузке. Для постоянных партнеров, девелоперов и при участии в государственных закупках по 44-ФЗ и 223-ФЗ возможна поэтапная постоплата или открытие казначейских/специальных счетов.',
    highlights: [
      'Работа с НДС 20%, электронный документооборот (Диадок / СБИС)',
      'Опыт исполнения контрактов по 44-ФЗ и 223-ФЗ со спецсчетами',
      'Гибкие условия поэтапного финансирования крупных объектов'
    ]
  }
];

interface FAQCategoryTab {
  id: 'all' | 'timeline' | 'delivery' | 'warranty' | 'engineering' | 'payment';
  label: string;
  count: number;
  icon: React.ElementType;
}

interface FAQSectionProps {
  onOpenCalculator?: (service?: string) => void;
  onOpenMeasurerModal?: () => void;
  onNavigateToFAQ?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  onOpenCalculator,
  onOpenMeasurerModal,
  onNavigateToFAQ,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'timeline' | 'delivery' | 'warranty' | 'engineering' | 'payment'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<string[]>(['timeline-standard', 'delivery-geo', 'warranty-periods']);

  const categories: FAQCategoryTab[] = [
    { id: 'all', label: 'Все вопросы', count: FAQ_DATA.length, icon: HelpCircle },
    { id: 'timeline', label: 'Сроки изготовления', count: FAQ_DATA.filter(i => i.category === 'timeline').length, icon: Clock },
    { id: 'delivery', label: 'Доставка и самовывоз', count: FAQ_DATA.filter(i => i.category === 'delivery').length, icon: Truck },
    { id: 'warranty', label: 'Гарантия и ГОСТ', count: FAQ_DATA.filter(i => i.category === 'warranty').length, icon: ShieldCheck },
    { id: 'engineering', label: 'Чертежи и CAD', count: FAQ_DATA.filter(i => i.category === 'engineering').length, icon: FileText },
    { id: 'payment', label: 'Оплата и 44-ФЗ', count: FAQ_DATA.filter(i => i.category === 'payment').length, icon: CreditCard },
  ];

  const filteredItems = useMemo(() => {
    return FAQ_DATA.filter(item => {
      const matchesCat = activeCategory === 'all' || item.category === activeCategory;
      if (!matchesCat) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q) ||
        (item.highlights && item.highlights.some(h => h.toLowerCase().includes(q)))
      );
    });
  }, [activeCategory, searchQuery]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const handleExpandAll = () => {
    setOpenItems(filteredItems.map(i => i.id));
  };

  const handleCollapseAll = () => {
    setOpenItems([]);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto">
        {/* Section Industrial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-2">
              <span className="w-2 h-2 bg-neutral-900 inline-block"></span>
              <span>[ 04 / БАЗА ЗНАНИЙ И ЧАСТЫЕ ВОПРОСЫ • FAQ ]</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-light text-neutral-900 tracking-tight">
              Частые вопросы заказчиков
            </h2>
          </div>

          <div className="max-w-md flex flex-col items-start lg:items-end gap-3">
            <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed lg:text-right">
              Прозрачные регламенты работы завода «Стальное Дело»: нормативные сроки производства, условия доставки по РФ, заводская гарантия до 10 лет и документальное сопровождение по ГОСТ.
            </p>
            {onNavigateToFAQ && (
              <button
                onClick={onNavigateToFAQ}
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-black font-medium hover:text-neutral-600 transition-colors cursor-pointer border-b border-black pb-0.5"
              >
                <span>Открыть отдельную страницу FAQ</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по вопросам (сроки, доставка, гарантия, RAL, НАКС)..."
              className="w-full bg-[#FAFAFA] border border-neutral-200 text-xs sm:text-sm text-neutral-900 pl-10 pr-4 py-2.5 rounded-none focus:outline-none focus:border-black transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-neutral-400 hover:text-black"
              >
                Очистить
              </button>
            )}
          </div>

          {/* Expand/Collapse All Buttons */}
          <div className="flex items-center gap-2 self-end md:self-center text-xs font-mono">
            <button
              onClick={handleExpandAll}
              className="px-3 py-1.5 border border-neutral-200 hover:border-neutral-900 text-neutral-600 hover:text-black bg-white transition-colors cursor-pointer"
            >
              Развернуть все
            </button>
            <button
              onClick={handleCollapseAll}
              className="px-3 py-1.5 border border-neutral-200 hover:border-neutral-900 text-neutral-600 hover:text-black bg-white transition-colors cursor-pointer"
            >
              Свернуть все
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mt-5 no-scrollbar border-b border-neutral-100">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-black text-white border border-black'
                    : 'bg-[#FAFAFA] text-neutral-600 border border-neutral-200 hover:border-neutral-400 hover:text-black'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-neutral-500'}`} />
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 ${isActive ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-200 text-neutral-600'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Content Grid: FAQ Accordion + Side Callout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mt-8">
          {/* FAQ Accordion Column */}
          <div className="lg:col-span-8 space-y-3">
            {filteredItems.length === 0 ? (
              <div className="p-12 text-center border border-neutral-200 bg-[#FAFAFA]">
                <HelpCircle className="w-8 h-8 text-neutral-400 mx-auto mb-3" />
                <h4 className="text-sm font-medium text-neutral-900 mb-1">Ничего не найдено</h4>
                <p className="text-xs text-neutral-500 font-light max-w-sm mx-auto mb-4">
                  По вашему запросу «{searchQuery}» ответов не найдено. Задайте вопрос напрямую дежурному инженеру завода.
                </p>
                <button
                  onClick={() => onOpenCalculator && onOpenCalculator()}
                  className="px-4 py-2 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors"
                >
                  Задать вопрос инженеру
                </button>
              </div>
            ) : (
              filteredItems.map((item, index) => {
                const isOpen = openItems.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className={`border transition-all duration-200 ${
                      isOpen 
                        ? 'border-neutral-900 bg-white shadow-xs' 
                        : 'border-neutral-200 bg-[#FAFAFA] hover:border-neutral-400'
                    }`}
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer select-none"
                    >
                      <div className="flex items-start gap-3.5">
                        <span className="font-mono text-xs text-neutral-400 font-semibold pt-0.5 shrink-0">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-neutral-100 border border-neutral-200 text-neutral-700">
                              {item.badge}
                            </span>
                          </div>
                          <h3 className="text-sm sm:text-base font-medium text-neutral-900 leading-snug tracking-tight">
                            {item.question}
                          </h3>
                        </div>
                      </div>

                      <div className={`w-6 h-6 border flex items-center justify-center shrink-0 transition-transform duration-200 mt-0.5 ${
                        isOpen 
                          ? 'border-neutral-900 bg-black text-white rotate-180' 
                          : 'border-neutral-300 bg-white text-neutral-600'
                      }`}>
                        <ChevronDown className="w-3.5 h-3.5" />
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-neutral-100 text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                            <p className="mb-4">
                              {item.answer}
                            </p>

                            {item.highlights && item.highlights.length > 0 && (
                              <div className="bg-[#FAFAFA] border border-neutral-200 p-3.5 space-y-2">
                                <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-medium">
                                  Ключевые регламенты:
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-neutral-800">
                                  {item.highlights.map((hl, hIdx) => (
                                    <div key={hIdx} className="flex items-center gap-2">
                                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                      <span>{hl}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Side Industrial Sidebar: Quick Contact & Service Guarantees */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Consultation Card */}
            <div className="border border-neutral-900 bg-neutral-900 text-white p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-neutral-300" />
                  <span>Консультация инженера</span>
                </div>
                <h4 className="text-lg font-light text-white tracking-tight mb-2">
                  Остались индивидуальные вопросы по проекту?
                </h4>
                <p className="text-xs text-neutral-400 font-light leading-relaxed mb-6">
                  Инженер-технолог рассчитает точные сроки производства, подготовит экспресс-смету и согласует технические условия в течение 1 часа.
                </p>

                <div className="space-y-3 py-4 border-t border-b border-neutral-800 text-xs font-mono text-neutral-300">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Расчет сметы по чертежам за 60 минут</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Бесплатный выезд инженера на замер в СПб</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Фиксация цены и сроков в договоре</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5 pt-6">
                {onOpenCalculator && (
                  <button
                    onClick={() => onOpenCalculator()}
                    className="w-full py-3 px-4 bg-white text-black text-xs font-mono uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 cursor-pointer font-medium"
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Рассчитать смету онлайн</span>
                  </button>
                )}

                {onOpenMeasurerModal && (
                  <button
                    onClick={onOpenMeasurerModal}
                    className="w-full py-2.5 px-4 border border-neutral-700 hover:border-white text-white text-xs font-mono uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer bg-neutral-900"
                  >
                    <Layers className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Вызвать инженера на объект</span>
                  </button>
                )}

                <a
                  href="tel:+78122007706"
                  className="w-full py-2.5 px-4 border border-neutral-800 text-neutral-300 text-xs font-mono uppercase tracking-wider hover:text-white hover:border-neutral-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-neutral-400" />
                  <span>+7 (812) 200-77-06 (СПб)</span>
                </a>
              </div>
            </div>

            {/* Plant Physical Address & Production Summary */}
            <div className="border border-neutral-200 bg-[#FAFAFA] p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                  [ Производственный хаб ]
                </span>
                <span className="text-[11px] font-mono text-emerald-600 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Цех в работе
                </span>
              </div>

              <div className="space-y-2 text-xs text-neutral-700">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0 mt-0.5" />
                  <span>г. Санкт-Петербург, Колпино, ул. Финляндская, 3</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-3.5 h-3.5 text-neutral-500 shrink-0 mt-0.5" />
                  <span>Отгрузка продукции: Пн–Пт с 08:00 до 16:30</span>
                </div>
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-500 shrink-0 mt-0.5" />
                  <span>Сертификация ТР ЕАЭС 042/2017 • Аттестация НАКС</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
