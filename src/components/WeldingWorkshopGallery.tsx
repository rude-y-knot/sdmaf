import React, { useState } from 'react';
import { 
  Check, 
  ShieldCheck, 
  Award, 
  Sparkles, 
  Zap, 
  Calculator, 
  Compass, 
  FileCheck, 
  CheckCircle2, 
  Flame, 
  Target, 
  SlidersHorizontal,
  TableProperties,
  Layers,
  Wrench,
  Cpu,
  BadgeCheck,
  Filter,
  Activity,
  Layers3
} from 'lucide-react';
import { 
  WELDING_FLEET_DATA, 
  WELDING_FLEET_CATEGORIES, 
  WeldingEquipmentItem 
} from '../data/weldingFleetData';

interface WeldingWorkshopGalleryProps {
  onOpenCalculator?: (service?: string) => void;
  className?: string;
}

export const WeldingWorkshopGallery: React.FC<WeldingWorkshopGalleryProps> = ({
  onOpenCalculator,
  className = ''
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const masterSkills = [
    {
      title: 'Аттестация НАКС и высшие разряды (5–6 разряд)',
      desc: 'Сварочные работы выполняются аттестованными специалистами 5–6 разрядов с допусками НАКС по группам СК (строительные конструкции) и КО (котельное оборудование). Неукоснительное соблюдение технологических карт (WPS) и требований ГОСТ 23118-2019, ГОСТ 14771-76 и ГОСТ Р ИСО 17637.',
    },
    {
      title: 'Многолетний опыт ответственного производства',
      desc: 'Стаж ведущих мастеров сварочного участка составляет от 10 до 18 лет в изготовлении несущих каркасов, архитектурных малых форм, герметичных банных чанов и тонкостенных нержавеющих конструкций, работающих под постоянными нагрузками.',
    },
    {
      title: 'Ювелирная культура шва и отсутствие поводок',
      desc: 'Идеальная мелкочешуйчатая структура, стабильный катет без наплывов, пор и шлаковых включений. Прецизионное дозирование тепловложения при лазерной и контактной сварке исключает коробление и термические поводки тонколистового металла.',
    },
    {
      title: '100% контроль качества ОТК и дефектоскопия',
      desc: 'Каждый шов проходит входной и пооперационный визуально-измерительный контроль (ВИК) поверенным инструментом. При необходимости проводится ультразвуковой контроль (УЗК), цветная капиллярная дефектоскопия, а для емкостных изделий — обязательные пневмо- и гидростатические испытания.',
    },
    {
      title: 'Электрохимическая пассивация и полировка швов',
      desc: 'Сварные соединения нержавеющей стали AISI 304 / AISI 316L проходят травление и электрохимическую пассивацию для полного восстановления антикоррозийного оксидного слоя. Зачистка и полировка до Mirror 8K или Scotch-Brite обеспечивают 100% травмобезопасность и эстетику.',
    },
    {
      title: 'Сварка аустенитных и ферритных нержавеющих сталей',
      desc: 'Уверенная работа со всем спектром нержавеющих и легированных сталей: аустенитные AISI 304, AISI 316, AISI 321, AISI 310, ферритные AISI 439 / AISI 430, а также качественный оцинкованный металлопрокат с полным сохранением антикоррозийных свойств.',
    },
  ];

  const featuredEquipment = [
    {
      id: 'longitudinal-laser-featured',
      name: 'Автоматическая продольная лазерная сварка ЧПУ (2 поста)',
      badge: 'ЧПУ / Длина до 1500 мм / 2–3 кВт',
      country: 'Автоматизированные комплексы ЧПУ',
      desc: 'Автоматизированные станки с ЧПУ для скоростной прямолинейной лазерной сварки продольных швов обечаек длиной до 1 500 мм с автоматическим слежением за стыком.',
      advantages: [
        'Идеально прямолинейный герметичный шов высокой плотности с автослежением за стыком',
        'Узкая зона термического влияния (HAZ) — металл сохраняет идеальную плоскостность',
        'Специализация по сталям AISI 304, AISI 316, AISI 321, AISI 439, AISI 310 и оцинковке',
        'Формирование аккуратного внутреннего обратного валика без окалины и цветов побежалости',
      ],
      specs: [
        { label: 'Длина шва', val: 'до 1 500 мм' },
        { label: 'Мощность лазера', val: '2 000 – 3 000 Вт' },
        { label: 'Толщина (нерж/цинк)', val: 'от 0.5 до 5.0 мм' },
        { label: 'Слежение за стыком', val: 'Автоматическое ЧПУ' },
      ],
    },
    {
      id: 'maihong-featured',
      name: 'Волоконные лазерные комплексы Maihong (BWT20 & SUP23T)',
      badge: 'Ручной лазер 2 кВт / Wobble',
      country: 'Maihong Laser Technology',
      desc: 'Высокоскоростная лазерная сварка видовых лицевых швов металлоконструкций и изделий благоустройства без зачистки и окалины.',
      advantages: [
        'Wobble-качание луча до 5 мм для перекрытия зазоров в угловых стыках',
        'Минимальное тепловложение — отсутствие поводок на тонком листе',
        'Автоматический прецизионный механизм подачи присадочной проволоки',
        'Ювелирный шов без пор, брызг и цветов побежалости',
      ],
      specs: [
        { label: 'Мощность лазера', val: '2 000 Вт (BWT)' },
        { label: 'Толщина металла', val: '0.5 – 6.0 мм' },
        { label: 'Оптическая головка', val: 'SUP23T / FWH30' },
        { label: 'Газ', val: 'Аргон / Азот' },
      ],
    },
    {
      id: 'spot-welding-featured',
      name: 'Участок контактной точечной сварки (TELWIN, TECNA, CEA)',
      badge: '9 постов / до 40 кВт',
      country: 'Италия (TECNA, CEA, Telwin)',
      desc: 'Высокопроизводительный участок контактной сварки для листовых металлоконструкций, корпусов, кожухов и фасадных панелей.',
      advantages: [
        'Высокая производительность и повторяемость геометрических параметров',
        'Микропроцессорные блоки контроля времени сжатия, проковки и тока',
        'Отсутствие расхода защитных газов и присадочных материалов',
        'Сохранение структуры и антикоррозийных свойств оцинкованного металла',
      ],
      specs: [
        { label: 'Парк постов', val: '9 станков (до 40 кВт)' },
        { label: 'Управление', val: 'TE-101 / TE-90 / WS-402' },
        { label: 'Толщина пакета', val: 'до 4.0 + 4.0 мм' },
        { label: 'Охлаждение', val: 'Проточное водяное' },
      ],
    },
    {
      id: 'semiauto-featured',
      name: 'Промышленные полуавтоматы Fronius Pulse и Кедр MIG/MAG',
      badge: 'MIG/MAG / Pulse Synergic',
      country: 'Австрия / Россия',
      desc: 'Силовая сварка тяжелых несущих каркасов, закладных опор и герметичных банных чанов под постоянные статические и динамические нагрузки.',
      advantages: [
        'Безбрызговая сварка аустенитной и ферритной нержавеющей стали Pulse Synergic',
        'Глубокий гарантированный провар толстостенных сталей до 30 мм',
        'Синергетические технологические программы под каждый тип сплава',
        '100% аттестация по нормам НАКС (группы СК и КО)',
      ],
      specs: [
        { label: 'Сварочный ток', val: 'до 500 А (ПВ 100%)' },
        { label: 'Толщина сталей', val: 'от 1.0 до 30.0 мм' },
        { label: 'Проволока', val: '0.8 – 1.6 мм' },
        { label: 'Защитный газ', val: 'Ar, Ar+CO2 (K-18)' },
      ],
    },
  ];

  const filteredFleet = selectedCategory === 'all' 
    ? WELDING_FLEET_DATA 
    : WELDING_FLEET_DATA.filter(item => item.category === selectedCategory);

  return (
    <div className={`space-y-16 ${className}`}>
      {/* SECTION INTRO / HEADER */}
      <div className="border border-neutral-200 bg-white p-6 sm:p-10 lg:p-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-neutral-200">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-neutral-400">
              <span className="bg-neutral-100 text-neutral-800 px-2 py-0.5 font-medium">
                [ 04 / СВАРОЧНЫЙ УЧАСТОК ]
              </span>
              <span>•</span>
              <span>18 ЕДИНИЦ ОБОРУДОВАНИЯ В ПАРКЕ</span>
              <span>•</span>
              <span>ЦЕХ САНКТ-ПЕТЕРБУРГ / КОЛПИНО</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light text-neutral-900 tracking-tight leading-tight">
              Сварочный участок и прецизионная сборка
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
              Парк сварочного участка объединяет 18 специализированных установок: от волоконных ручных и автоматических лазеров Maihong и ЧПУ-комплексов продольного шва до 9 постов контактной точечной сварки TECNA / CEA / TELWIN и австрийских импульсных систем Fronius Pulse.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={() => onOpenCalculator ? onOpenCalculator('сварочные работы') : null}
              className="py-3 px-5 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Calculator className="w-4 h-4" />
              <span>Рассчитать стоимость сварки</span>
            </button>
            <div className="text-[11px] font-mono text-neutral-500 text-center lg:text-right">
              ГОСТ 23118-2019 • НАКС (СК, КО)
            </div>
          </div>
        </div>

        {/* Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-8 font-mono">
          <div className="border border-neutral-200 bg-neutral-50 p-4">
            <div className="text-2xl font-light text-neutral-900">18 постов</div>
            <div className="text-[10px] text-neutral-500 uppercase mt-1">Оснащение сварочного парка</div>
          </div>
          <div className="border border-neutral-200 bg-neutral-50 p-4">
            <div className="text-2xl font-light text-neutral-900">5–6 разряд</div>
            <div className="text-[10px] text-neutral-500 uppercase mt-1">Аттестация сварщиков НАКС</div>
          </div>
          <div className="border border-neutral-200 bg-neutral-50 p-4">
            <div className="text-2xl font-light text-neutral-900">0.15 – 30 мм</div>
            <div className="text-[10px] text-neutral-500 uppercase mt-1">Диапазон свариваемых толщин</div>
          </div>
          <div className="border border-neutral-200 bg-neutral-50 p-4">
            <div className="text-2xl font-light text-neutral-900">до 42 кВт</div>
            <div className="text-[10px] text-neutral-500 uppercase mt-1">Мощность контактных и шовных машин</div>
          </div>
          <div className="border border-neutral-200 bg-neutral-50 p-4">
            <div className="text-2xl font-light text-neutral-900">100% ВИК</div>
            <div className="text-[10px] text-neutral-500 uppercase mt-1">Контроль швов и гидроиспытания</div>
          </div>
        </div>
      </div>

      {/* SECTION 1: «НАШИ СПЕЦИАЛИСТЫ — МАСТЕРА СВОЕГО ДЕЛА» */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-1">
              [ Квалификация и человеческий капитал ]
            </div>
            <h3 className="text-xl sm:text-3xl font-light text-neutral-900 tracking-tight">
              Наши специалисты — мастера своего дела
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-md font-light leading-relaxed">
            Даже самое передовое оборудование работает безупречно только в руках опытных профессионалов. Сварщики завода — признанные эксперты с профильным стажем и строгим соблюдением культуры металлообработки.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {masterSkills.map((skill, idx) => (
            <div 
              key={idx}
              className="border border-neutral-200 bg-white p-6 hover:border-black transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-xs text-neutral-400">
                    [ 0{idx + 1} ]
                  </span>
                  <BadgeCheck className="w-4 h-4 text-[#55AA53]" />
                </div>
                <h4 className="text-sm font-medium text-neutral-900 mb-2.5 leading-snug">
                  {skill.title}
                </h4>
                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                  {skill.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center gap-2 text-[11px] font-mono text-neutral-500">
                <Check className="w-3.5 h-3.5 text-[#55AA53]" />
                <span>Гарантия прочности и долговечности</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ФОТО СВАРОЧНОГО УЧАСТКА ЗАВОДА */}
      <div className="border border-neutral-200 bg-white p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 overflow-hidden border border-neutral-200 bg-neutral-900 relative group">
            <img
              src="/images/weld.png"
              alt="Сварочный участок завода — пост лазерной, точечной и полуавтоматической сварки"
              className="w-full h-auto max-h-[480px] object-cover group-hover:scale-102 transition-transform duration-500"
            />
            <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-xs text-white text-[11px] font-mono px-3 py-1 border border-neutral-700">
              Пост сварки цеха металлообработки / Колпино
            </div>
          </div>

          <div className="lg:col-span-5 space-y-5">
            <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400">
              [ Реальное производство / Санкт-Петербург ]
            </div>
            <h3 className="text-xl sm:text-3xl font-light text-neutral-900 tracking-tight leading-tight">
              Сварочный участок в работе: точность сборки и контроль геометрии
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
              На производственной площадке в Колпино сварка ответственных металлоконструкций и изделий благоустройства выполняется на специализированных сборочных столах с 3D-позиционированием и жесткой фиксацией быстрозажимной оснасткой.
            </p>
            <div className="space-y-2.5 pt-2 border-t border-neutral-100 text-xs font-mono text-neutral-700">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#55AA53] shrink-0" />
                <span>Идеальная соосность и плоскостность каркасов</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#55AA53] shrink-0" />
                <span>Равномерное распределение тепла без термических поводок</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#55AA53] shrink-0" />
                <span>Электрохимическая очистка и финишная пассивация швов</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: ОСНОВНЫЕ ТЕХНОЛОГИЧЕСКИЕ НАПРАВЛЕНИЯ УЧАСТКА */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-1">
              [ Ключевые группы оборудования ]
            </div>
            <h3 className="text-xl sm:text-3xl font-light text-neutral-900 tracking-tight">
              Специализированные комплексы цеха
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-md font-light leading-relaxed">
            Разделение участка по технологическим операциям обеспечивает высокую точность и скорость выполнения заказов.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {featuredEquipment.map((item, idx) => (
            <div
              key={item.id}
              className="border border-neutral-200 bg-white p-6 sm:p-8 flex flex-col justify-between hover:border-neutral-900 transition-colors"
            >
              <div className="space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs bg-neutral-900 text-white px-2 py-0.5">
                      #{idx + 1}
                    </span>
                    <span className="font-mono text-[11px] text-neutral-500 uppercase">
                      {item.country}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] bg-neutral-100 text-neutral-800 px-2.5 py-0.5 border border-neutral-200 font-medium">
                    {item.badge}
                  </span>
                </div>

                <div>
                  <h4 className="text-lg sm:text-xl font-medium text-neutral-900 mb-2">
                    {item.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                    Ключевые преимущества:
                  </div>
                  <ul className="space-y-1.5 text-xs text-neutral-700">
                    {item.advantages.map((adv, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#55AA53] shrink-0 mt-0.5" />
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-6 mt-6 border-t border-neutral-100 font-mono text-xs">
                {item.specs.map((sp, sIdx) => (
                  <div key={sIdx} className="p-2.5 bg-neutral-50 border border-neutral-200">
                    <div className="text-[10px] text-neutral-400 uppercase leading-tight">
                      {sp.label}
                    </div>
                    <div className="font-medium text-neutral-900 mt-1 text-[11px] sm:text-xs">
                      {sp.val}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: ПОЛНАЯ СВОДНАЯ ТАБЛИЦА ПАРКА СВАРОЧНОГО ОБОРУДОВАНИЯ (18 ПОЗИЦИЙ) */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-1">
              [ 03 / ПОЛНЫЙ ПАРК ОБОРУДОВАНИЯ УЧАСТКА ]
            </div>
            <h3 className="text-xl sm:text-3xl font-light text-neutral-900 tracking-tight">
              Сводная таблица сварочного оборудования (18 единиц)
            </h3>
          </div>
          
          {/* Категории фильтрации */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 font-mono text-xs cursor-pointer transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              Все оборудование ({WELDING_FLEET_DATA.length})
            </button>
            <button
              onClick={() => setSelectedCategory('laser')}
              className={`px-3 py-1.5 font-mono text-xs cursor-pointer transition-colors ${
                selectedCategory === 'laser'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              Лазерная ({WELDING_FLEET_DATA.filter(i => i.category === 'laser').length})
            </button>
            <button
              onClick={() => setSelectedCategory('semiauto')}
              className={`px-3 py-1.5 font-mono text-xs cursor-pointer transition-colors ${
                selectedCategory === 'semiauto'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              Полуавтоматы ({WELDING_FLEET_DATA.filter(i => i.category === 'semiauto').length})
            </button>
            <button
              onClick={() => setSelectedCategory('spot')}
              className={`px-3 py-1.5 font-mono text-xs cursor-pointer transition-colors ${
                selectedCategory === 'spot'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              Точечная контактная ({WELDING_FLEET_DATA.filter(i => i.category === 'spot').length})
            </button>
            <button
              onClick={() => setSelectedCategory('seam')}
              className={`px-3 py-1.5 font-mono text-xs cursor-pointer transition-colors ${
                selectedCategory === 'seam'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              Шовная и продольная ({WELDING_FLEET_DATA.filter(i => i.category === 'seam').length})
            </button>
          </div>
        </div>

        <div className="border border-neutral-200 overflow-x-auto bg-white shadow-xs">
          <table className="w-full text-left text-xs font-mono min-w-[1000px]">
            <thead className="bg-neutral-900 text-white uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4 font-semibold w-1/5">Оборудование / Модель</th>
                <th className="py-3.5 px-3 font-semibold w-[12%]">Мощность / Сеть</th>
                <th className="py-3.5 px-4 font-semibold w-1/4">Назначение и технологические особенности</th>
                <th className="py-3.5 px-3 font-semibold w-[14%]">Свариваемые материалы</th>
                <th className="py-3.5 px-3 font-semibold w-[12%]">Толщины</th>
                <th className="py-3.5 px-4 font-semibold w-1/5">Типовые изделия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 text-neutral-700">
              {filteredFleet.map((item, idx) => (
                <tr 
                  key={item.id} 
                  className={idx % 2 === 0 ? 'bg-white hover:bg-neutral-50' : 'bg-[#FAFAFA] hover:bg-neutral-100 transition-colors'}
                >
                  <td className="py-3.5 px-4 font-semibold text-neutral-900">
                    <div className="font-sans font-medium text-neutral-900 text-sm">{item.name}</div>
                    <div className="text-[11px] text-neutral-500 font-mono mt-0.5">{item.categoryTitle}</div>
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="text-neutral-900 font-medium">{item.power}</div>
                    <div className="text-[10px] text-neutral-400 mt-0.5">{item.voltage}</div>
                  </td>
                  <td className="py-3.5 px-4 text-neutral-600 font-sans text-xs leading-relaxed">
                    <div>{item.description}</div>
                    <div className="text-[11px] text-neutral-500 font-mono mt-1 bg-neutral-100 p-1.5 border border-neutral-200 inline-block">
                      {item.specs}
                    </div>
                  </td>
                  <td className="py-3.5 px-3 font-mono text-neutral-800 text-[11px]">
                    {item.materials}
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-neutral-900">
                    {item.thickness}
                  </td>
                  <td className="py-3.5 px-4 text-neutral-600 font-sans text-xs">
                    {item.application}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-neutral-50 border border-neutral-200 p-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-600">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#55AA53]" />
            <span>Все станки и посты подключены к промышленной трехфазной сети 380В и системе контурного охлаждения</span>
          </div>
          <div className="text-neutral-400">
            Отображено: {filteredFleet.length} из {WELDING_FLEET_DATA.length} единиц оборудования
          </div>
        </div>
      </div>

      {/* SECTION 4: СТАНДАРТЫ КАЧЕСТВА И КОНТРОЛЬ ОТК */}
      <div className="border border-neutral-200 bg-neutral-900 text-white p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400">
              [ Контроль качества и соответствие стандартам ]
            </div>
            <h4 className="text-xl sm:text-3xl font-light text-white tracking-tight">
              Полный комплект исполнительной документации на каждый шов
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-2xl">
              Сварочные процессы аттестованы в соответствии с требованиями НАКС и ГОСТ. По требованию заказчика выдаются акты визуально-измерительного контроля (ВИК), протоколы неразрушающего контроля (УЗК), сертификаты на присадочные материалы и свидетельства о гидроиспытаниях емкостей.
            </p>
            <div className="flex flex-wrap gap-4 pt-2 text-xs font-mono text-neutral-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#55AA53]" />
                РД 03-606-03 (ВИК)
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#55AA53]" />
                ГОСТ Р ИСО 17637-2014
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#55AA53]" />
                ГОСТ 23118-2019
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#55AA53]" />
                ГОСТ 14771-76
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <button
              onClick={() => onOpenCalculator ? onOpenCalculator('сварка металлоконструкций') : null}
              className="w-full py-3.5 px-4 bg-white text-black text-xs font-mono uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 cursor-pointer font-medium"
            >
              <Calculator className="w-4 h-4" />
              <span>Запросить расчет стоимости</span>
            </button>
            <div className="text-[10px] font-mono text-neutral-400 text-center">
              Отправьте чертежи в PDF, DWG или STEP
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
