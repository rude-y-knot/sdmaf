import React from 'react';
import { 
  Clock, 
  Truck, 
  ShieldCheck, 
  FileText, 
  Calculator, 
  ArrowRight
} from 'lucide-react';

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
    answer: 'Да. Производственный комплекс в Колпино работает в две смены с ежемесячной мощностью переработки металлопроката до 50 тонн. При необходимости срочной сдачи объекта ЖК или выполнения гарантийных обязательств перед госкомиссией мы подключаем экспресс-график с круглосуточной загрузкой волоконных лазеров Knoppo KF 3 кВт и сварочно-сборочных постов НАКС.',
    highlights: [
      'Возможность круглосуточного запуска в 2–3 смены',
      'Собственный склад листового и сортового металлопроката.',
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
    question: 'Предоставляются ли паспорта качества и сертификаты на материалы?',
    badge: 'Паспорта и сертификаты',
    answer: 'Да. Мы обеспечиваем полное документальное сопровождение поставок для заказчиков и генподрядчиков: паспорта качества завода-изготовителя на готовую продукцию, сертификаты соответствия на весь используемый листовой и сортовой металлопрокат, а также сертификаты на сварочные материалы от производителей.',
    highlights: [
      'Официальные паспорта качества завода на готовую продукцию',
      'Сертификаты соответствия на каждую партию металлопроката',
      'Заверенные сертификаты на сварочные материалы и покрытия'
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
    badge: 'НДС 22% / Госзаказ',
    answer: 'Работаем по безналичному расчету с юридическими лицами и ИП с выделением НДС 22%. Стандартные условия: авансовый платеж 50–70% при размещении заказа в производство и окончательный расчет 30–50% по уведомлению о готовности к отгрузке. Для постоянных партнеров, девелоперов и при участии в государственных закупках по 44-ФЗ и 223-ФЗ возможна поэтапная постоплата или открытие казначейских/специальных счетов.',
    highlights: [
      'Работа с НДС 22%, электронный документооборот (Диадок / СБИС)',
      'Опыт исполнения контрактов по 44-ФЗ и 223-ФЗ со спецсчетами',
      'Гибкие условия поэтапного финансирования крупных объектов'
    ]
  }
];

interface FAQSectionProps {
  onOpenCalculator?: (service?: string) => void;
  onOpenMeasurerModal?: () => void;
  onNavigateToFAQ?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  onOpenCalculator,
  onNavigateToFAQ,
}) => {
  const previewTopics = [
    {
      id: 'timeline',
      icon: Clock,
      title: 'Сроки производства и мощности',
      description: 'От 24 часов на раскрой и гибку, от 5 рабочих дней на партии МАФ и уличной мебели.',
      tag: 'От 24 часов',
    },
    {
      id: 'delivery',
      icon: Truck,
      title: 'Доставка и самовывоз по РФ',
      description: 'Собственные манипуляторы по СПб и ЛО, упаковка на европаллетах, отгрузка шаландами по всей России.',
      tag: 'СПб, РФ и СНГ',
    },
    {
      id: 'warranty',
      icon: ShieldCheck,
      title: 'Гарантия до 10 лет и ГОСТ',
      description: 'Сертификация по ТР ЕАЭС 042/2017, аттестация сварщиков НАКС, паспорта качества на каждую партию.',
      tag: 'ГОСТ / ТР 042',
    },
    {
      id: 'engineering',
      icon: FileText,
      title: 'Чертежи, CAD, оплата и 44-ФЗ',
      description: 'Прием форматов DWG, DXF, STEP, PDF. Безналичный расчет с НДС 22%, участие в тендерах по 44/223-ФЗ.',
      tag: 'НДС 22% / 44-ФЗ',
    },
  ];

  return (
    <section id="faq" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-neutral-50/70 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-neutral-200 mb-10">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-2">
              <span className="w-2 h-2 bg-neutral-900 inline-block"></span>
              <span>[ 04 / БАЗА ЗНАНИЙ И РЕГЛАМЕНТЫ • FAQ ]</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-light text-neutral-900 tracking-tight">
              Частые вопросы заказчиков
            </h2>
          </div>

          <div className="max-w-xl">
            <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
              Собрали подробные ответы на самые частые вопросы архитекторов, застройщиков и служб снабжения: нормативные сроки, доставка, условия гарантии и требования к чертежам.
            </p>
          </div>
        </div>

        {/* 4 Topic Preview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {previewTopics.map((topic, idx) => {
            const Icon = topic.icon;
            return (
              <button
                key={idx}
                onClick={onNavigateToFAQ}
                className="group text-left p-6 bg-white border border-neutral-200 hover:border-black transition-all flex flex-col justify-between cursor-pointer shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 bg-neutral-50 group-hover:bg-black group-hover:text-white transition-colors border border-neutral-200">
                      <Icon className="w-4 h-4 text-neutral-800 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500 bg-neutral-100 px-2 py-0.5 border border-neutral-200">
                      {topic.tag}
                    </span>
                  </div>

                  <h3 className="text-sm font-medium text-neutral-900 mb-2 group-hover:text-black">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-neutral-500 font-light leading-relaxed">
                    {topic.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-mono text-neutral-400 group-hover:text-black">
                  <span>Читать ответ</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Action Banner */}
        <div className="border border-neutral-900 bg-neutral-900 text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-base sm:text-lg font-normal text-white">
              Не нашли ответ на свой вопрос?
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-xl">
              На отдельной странице FAQ представлены 14 развернутых регламентов завода с техническими характеристиками, образцами документов и регламентами ГОСТ.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            {onNavigateToFAQ && (
              <button
                onClick={onNavigateToFAQ}
                className="w-full sm:w-auto px-6 py-3 bg-white text-black text-xs font-mono uppercase tracking-wider hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2 cursor-pointer font-semibold shadow-xs"
              >
                <span>Перейти в раздел FAQ (/faq)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {onOpenCalculator && (
              <button
                onClick={() => onOpenCalculator()}
                className="w-full sm:w-auto px-5 py-3 border border-neutral-700 text-white text-xs font-mono uppercase tracking-wider hover:border-white transition-colors flex items-center justify-center gap-2 cursor-pointer bg-neutral-800"
              >
                <Calculator className="w-3.5 h-3.5 text-neutral-400" />
                <span>Рассчитать смету</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
