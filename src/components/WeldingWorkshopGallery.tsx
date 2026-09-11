import React from 'react';
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
  BadgeCheck
} from 'lucide-react';

interface WeldingWorkshopGalleryProps {
  onOpenCalculator?: (service?: string) => void;
  className?: string;
}

export const WeldingWorkshopGallery: React.FC<WeldingWorkshopGalleryProps> = ({
  onOpenCalculator,
  className = ''
}) => {
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
      desc: 'Идеальная мелкочешуйчатая структура, стабильный катет без наплывов, пор и шлаковых включений. Прецизионное дозирование тепловложения при лазерной и импульсной сварке исключает коробление и термические поводки тонколистового металла (скаты горок, декоративные панели).',
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
      title: 'Сварка разнородных сталей и цветных сплавов',
      desc: 'Уверенная работа с широким спектром металлов: пищевая и кислотостойкая нержавеющая сталь (AISI 304, AISI 316), конструкционная углеродистая сталь Ст3сп5, северная хладостойкая сталь 09Г2С, алюминиево-магниевые сплавы (АМг5, АД31).',
    },
  ];

  const equipmentList = [
    {
      id: 'longitudinal-laser',
      name: 'Продольная лазерная сварка',
      badge: 'ЧПУ / Непрерывный шов',
      country: 'Автоматизированный комплекс',
      desc: 'Специализированная установка для прецизионной прямолинейной продольной сварки обечаек, цилиндрических корпусов, труб, тоннелей детских горок и листовых карт без перекосов и стыковочных ступеней.',
      advantages: [
        'Идеально прямолинейный герметичный шов высокой плотности',
        'Узкая зона термического влияния (HAZ) — металл не «ведет»',
        'Глубокое проплавление корня шва с формированием ровного обратного валика',
        'Скорость сварки в 3–4 раза выше классической аргонодуговой технологии',
      ],
      specs: [
        { label: 'Длина свариваемого шва', val: 'до 3 000 мм' },
        { label: 'Диаметр свариваемых обечаек', val: 'от Ø160 мм' },
        { label: 'Диапазон толщин (нержавейка)', val: 'от 0.8 до 4.0 мм' },
        { label: 'Скорость линейной сварки', val: 'до 2.5–4.0 м/мин' },
      ],
    },
    {
      id: 'maihong-bwt20',
      name: 'Майхонг лазер BWT20',
      badge: 'Волоконный лазер 2 кВт',
      country: 'Maihong Laser Technology',
      desc: 'Промышленный ручной комплекс волоконной лазерной сварки с излучателем высокой плотности энергии BWT20. Предназначен для прецизионного соединения тонколистовых металлов, пространственных конструкций и изделий сложной конфигурации.',
      advantages: [
        'Высокая концентрация лазерной энергии — минимальное тепловложение',
        'Отсутствие термических поводок на полированных и шлифованных листах',
        'Автоматический механизм подачи присадочной проволоки (0.8–1.6 мм)',
        'Зеркальная чистота шва без окалины, пор и необходимости грубой зачистки',
      ],
      specs: [
        { label: 'Мощность лазерного источника', val: '2 000 Вт (BWT)' },
        { label: 'Свариваемые материалы', val: 'AISI 304, AISI 316, Ст3, АМг' },
        { label: 'Диапазон толщин металла', val: '0.5 – 5.0 мм' },
        { label: 'Система охлаждения', val: 'Двухконтурный фреоновый чиллер' },
      ],
    },
    {
      id: 'maihong-sup23t',
      name: 'Майхонг лазер SUP23T',
      badge: 'Wobble-качание луча',
      country: 'Maihong / Головка SUP23T',
      desc: 'Прецизионный аппарат лазерной сварки с интеллектуальной поворотной оптической головкой SUP23T. Реализует технологию качания луча (wobble welding) для надежного перекрытия зазоров в угловых, тавровых и нахлесточных соединениях.',
      advantages: [
        'Многорежимное качание луча (круг, эллипс, треугольник, линия) шириной до 5 мм',
        'Качественное перекрытие технологических зазоров до 1.5–2 мм',
        'Формирование гладкого монолитного шва повышенной механической прочности',
        'Сенсорный микропроцессорный контроллер с библиотекой технологических режимов',
      ],
      specs: [
        { label: 'Оптическая головка', val: 'SUP23T с качанием луча' },
        { label: 'Ширина колебания луча (Wobble)', val: '0.5 – 5.0 мм' },
        { label: 'Материалы', val: 'Нержавеющая сталь, оцинковка, медь' },
        { label: 'Контроль параметров', val: 'Цифровая ЧПУ-панель' },
      ],
    },
    {
      id: 'kedr-mig',
      name: 'Сварочный полуавтомат Кедр',
      badge: 'Тяжелый MIG/MAG',
      country: 'Кедр Промышленный инвертор',
      desc: 'Мощный трехфазный инверторный полуавтомат промышленного класса для ответственной силовой сварки несущих каркасов, закладных элементов, тяжелых опорных узлов и пространственных ферм из углеродистых и низколегированных сталей.',
      advantages: [
        'Уверенный глубокий провар толстостенного металлопроката до 25–30 мм',
        'Стабильное горение дуги при интенсивных многосменных нагрузках (ПВ 100%)',
        'Четырехроликовый прецизионный привод подачи сплошной и порошковой проволоки',
        'Сварка в защитной среде углекислого газа и газовых смесей (Ar+CO2)',
      ],
      specs: [
        { label: 'Сварочный ток (макс)', val: 'до 500 А' },
        { label: 'Диаметр сварочной проволоки', val: '0.8 – 1.6 мм' },
        { label: 'Толщина свариваемой стали', val: 'от 1.5 до 30 мм' },
        { label: 'Режимы сварки', val: 'MIG/MAG, MMA, 2T/4T' },
      ],
    },
    {
      id: 'fronius-mig',
      name: 'Сварочный полуавтомат Фрониус (Fronius)',
      badge: 'Австрия / Pulse Synergic',
      country: 'Fronius International (Австрия)',
      desc: 'Премиальная цифровая сварочная система мирового уровня с импульсной дугой Pulse Synergic. Обеспечивает капельный перенос металла без брызг и безупречное формирование швов на ответственных узлах из нержавеющей стали и алюминия.',
      advantages: [
        'Абсолютно чистое соединение без брызг — исключено налипание капель на деталь',
        'Интеллектуальные синергетические программы под каждый сплав и диаметр',
        'Превосходный контроль тепловложения при сварке тонких и средних толщин',
        'Соответствие высшим европейским стандартам надежности и чистоты шва',
      ],
      specs: [
        { label: 'Производитель', val: 'Fronius (Австрия)' },
        { label: 'Технология переноса металла', val: 'Pulse Synergic (импульсная дуга)' },
        { label: 'Свариваемые металлы', val: 'AISI 304/316, АМг, оцинкованная сталь' },
        { label: 'Управление дугой', val: 'Цифровой сигнальный микропроцессор' },
      ],
    },
  ];

  const comparisonTable = [
    {
      equipment: 'Продольная лазерная сварка',
      process: 'Автоматическая лазерная сварка',
      materials: 'AISI 304 / 316, сталь Ст3, оцинковка',
      thickness: '0.8 – 4.0 мм',
      gas: 'Азот высокой чистоты / Аргон',
      application: 'Обечайки, трубы, тоннели и желоба горок до 3 м'
    },
    {
      equipment: 'Майхонг лазер BWT20',
      process: 'Ручная волоконная лазерная сварка',
      materials: 'Нержавеющая сталь, алюминий, углеродистая сталь',
      thickness: '0.5 – 5.0 мм',
      gas: 'Аргон 99.998% / Азот',
      application: 'Видовые швы МАФ, парковая мебель, кронштейны, корпуса'
    },
    {
      equipment: 'Майхонг лазер SUP23T',
      process: 'Wobble-сварка с качанием луча',
      materials: 'AISI 304 / 316, алюминиевые сплавы АМг',
      thickness: '0.5 – 6.0 мм',
      gas: 'Аргон высокой чистоты',
      application: 'Угловые и тавровые стыки с зазором, объемные узлы'
    },
    {
      equipment: 'Полуавтомат Кедр',
      process: 'MIG/MAG механизированная сварка',
      materials: 'Конструкционная сталь Ст3сп5, сталь 09Г2С',
      thickness: '1.5 – 30.0 мм',
      gas: 'Смесь K-18 (82% Ar + 18% CO2), CO2',
      application: 'Силовые каркасы, несущие фермы, тяжелые металлоконструкции'
    },
    {
      equipment: 'Полуавтомат Фрониус (Fronius)',
      process: 'Импульсная цифровая сварка Pulse',
      materials: 'AISI 304, AISI 316L, алюминий АМг5/АД31',
      thickness: '1.0 – 16.0 мм',
      gas: 'Аргон высокой чистоты / Смеси Ar+CO2',
      application: 'Банные чаны, спа-купели, ответственные емкости, фасадные узлы'
    }
  ];

  return (
    <div className={`space-y-16 ${className}`}>
      {/* SECTION INTRO / HEADER (No photo at the top as requested) */}
      <div className="border border-neutral-200 bg-white p-6 sm:p-10 lg:p-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-neutral-200">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-neutral-400">
              <span className="bg-neutral-100 text-neutral-800 px-2 py-0.5 font-medium">
                [ 04 / СВАРОЧНЫЙ УЧАСТОК ]
              </span>
              <span>•</span>
              <span>5 СПЕЦИАЛИЗИРОВАННЫХ КОМПЛЕКСОВ</span>
              <span>•</span>
              <span>ЦЕХ САНКТ-ПЕТЕРБУРГ / КОЛПИНО</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light text-neutral-900 tracking-tight leading-tight">
              Сварочный участок и прецизионная сборка
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
              Оснащение участка объединяет высокотехнологичную продольную и ручную лазерную сварку Maihong (BWT20, SUP23T) с признанными промышленными полуавтоматами Кедр и австрийскими импульсными системами Fronius. Полный контроль геометрии, глубокий провар и чистый корень шва.
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

        {/* Metric Badges (clean, technical, no photos) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-8 font-mono">
          <div className="border border-neutral-200 bg-neutral-50 p-4">
            <div className="text-2xl font-light text-neutral-900">5–6 разряд</div>
            <div className="text-[10px] text-neutral-500 uppercase mt-1">Аттестация сварщиков НАКС</div>
          </div>
          <div className="border border-neutral-200 bg-neutral-50 p-4">
            <div className="text-2xl font-light text-neutral-900">от 10 лет</div>
            <div className="text-[10px] text-neutral-500 uppercase mt-1">Стаж ведущих мастеров</div>
          </div>
          <div className="border border-neutral-200 bg-neutral-50 p-4">
            <div className="text-2xl font-light text-neutral-900">0.5 – 30 мм</div>
            <div className="text-[10px] text-neutral-500 uppercase mt-1">Диапазон свариваемых толщин</div>
          </div>
          <div className="border border-neutral-200 bg-neutral-50 p-4">
            <div className="text-2xl font-light text-neutral-900">0 мм</div>
            <div className="text-[10px] text-neutral-500 uppercase mt-1">Поводки при лазерной сварке</div>
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
              alt="Сварочный участок завода — пост лазерной и полуавтоматической сварки"
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

      {/* SECTION 2: ДЕТАЛЬНОЕ ОПИСАНИЕ ОБОРУДОВАНИЯ (5 позиций) */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-1">
              [ Парк оборудования сварочного участка ]
            </div>
            <h3 className="text-xl sm:text-3xl font-light text-neutral-900 tracking-tight">
              Описание сварочного оборудования
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-md font-light leading-relaxed">
            Каждая единица оборудования подобрана под конкретные технологические задачи: от тонкостенных нержавеющих скатов до силовых рам и герметичных емкостей.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {equipmentList.map((item, idx) => (
            <div
              key={item.id}
              className={`border border-neutral-200 bg-white p-6 sm:p-8 flex flex-col justify-between hover:border-neutral-900 transition-colors ${
                idx === equipmentList.length - 1 && equipmentList.length % 2 !== 0 ? 'lg:col-span-2' : ''
              }`}
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
                  <span className="font-mono text-[11px] bg-neutral-100 text-neutral-800 px-2.5 py-0.5 border border-neutral-200">
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

      {/* SECTION 3: ТАБЛИЦА СРАВНЕНИЯ И ТЕХНИЧЕСКИХ ВОЗМОЖНОСТЕЙ */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-1">
              [ Сводный технологический регламент ]
            </div>
            <h3 className="text-xl sm:text-3xl font-light text-neutral-900 tracking-tight">
              Сводная матрица оборудования участка
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
            <TableProperties className="w-4 h-4" />
            <span>Параметры и специализация</span>
          </div>
        </div>

        <div className="border border-neutral-200 overflow-x-auto bg-white">
          <table className="w-full text-left text-xs font-mono min-w-[760px]">
            <thead className="bg-neutral-100 border-b border-neutral-200 text-neutral-700 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4 font-semibold">Оборудование</th>
                <th className="py-3 px-4 font-semibold">Метод сварки</th>
                <th className="py-3 px-4 font-semibold">Свариваемые металлы</th>
                <th className="py-3 px-4 font-semibold">Диапазон толщин</th>
                <th className="py-3 px-4 font-semibold">Защитный газ</th>
                <th className="py-3 px-4 font-semibold">Типовые изделия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 text-neutral-700">
              {comparisonTable.map((row, idx) => (
                <tr key={idx} className="hover:bg-neutral-50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-neutral-900">
                    {row.equipment}
                  </td>
                  <td className="py-3.5 px-4 text-neutral-600">
                    {row.process}
                  </td>
                  <td className="py-3.5 px-4">
                    {row.materials}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-neutral-900">
                    {row.thickness}
                  </td>
                  <td className="py-3.5 px-4 text-neutral-500 text-[11px]">
                    {row.gas}
                  </td>
                  <td className="py-3.5 px-4 text-neutral-600 font-sans text-xs">
                    {row.application}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
