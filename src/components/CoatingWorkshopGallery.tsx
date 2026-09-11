import React from 'react';
import { 
  Check, 
  Flame, 
  Wind, 
  ShieldCheck, 
  Calculator,
  Layers,
  ThermometerSun,
  Maximize2,
  TableProperties,
  ArrowRight,
  Sparkles,
  Gauge,
  Factory
} from 'lucide-react';

interface CoatingWorkshopGalleryProps {
  onOpenCalculator?: (service?: string) => void;
  className?: string;
}

export const CoatingWorkshopGallery: React.FC<CoatingWorkshopGalleryProps> = ({
  onOpenCalculator,
  className = ''
}) => {
  const techFeatures = [
    {
      title: 'Энергоэффективный газовый нагрев с горелкой 200 ккал',
      country: 'Природный / сжиженный газ (LPG/CNG)',
      desc: 'Высокопроизводительный газовый теплогенератор с горелкой 200 ккал обеспечивает быстрый прогрев камеры до температуры полимеризации 180°C всего за 15–30 минут, существенно снижая себестоимость окраски и сокращая производственный цикл.',
    },
    {
      title: 'Принудительная конвекция высокой кратности (8 300 – 16 575 м³/ч)',
      country: 'Мощность вентилятора 5.5 кВт (50–60 Гц)',
      desc: 'Мощный рециркуляционный вентилятор создает равномерный ламинарный поток горячего воздуха по всему объему камеры. Это полностью исключает «холодные зоны» и локальный перегрев, гарантируя 100% равномерное запекание порошка на деталях любой толщины.',
    },
    {
      title: 'Две специализированные термокамеры: 3м и 6м',
      country: 'Двухпоточная линия покраски',
      desc: 'Инфраструктура разделена на два потока: Термокамера №1 (3000×2000 мм) для оперативной покраски корпусов, щитов и кронштейнов, и Термокамера №2 (6000×1800×2100 мм) для крупногабаритных металлоконструкций, ферм, пергол и длинномерного профиля.',
    },
    {
      title: 'Прецизионный термоконтроль и стабильность ±3–6°C',
      country: 'Рабочая температура до 250°C',
      desc: 'Микропроцессорные ПИД-регуляторы непрерывно отслеживают температуру в нескольких точках объема камеры. Стабильность поддержания уставки ±3–6°C обеспечивает точное следование термографику полимеризации порошковых композиций.',
    },
    {
      title: 'Швейцарское электростатическое напыление Gema OptiFlex Pro',
      country: 'Цифровой контроль заряда частиц',
      desc: 'Оборудование Gema Switzerland обеспечивает контролируемое нанесение порошка в труднодоступные углы, радиусы и внутренние полости деталей (преодоление эффекта клетки Фарадея) с равномерной толщиной полимерного слоя 80–120 мкм.',
    },
    {
      title: 'Палитра RAL Classic, Муар, Шагрень и суперстойкие полиэфиры',
      country: 'Порошки AkzoNobel, Pulver, Neokem',
      desc: 'Окраска в 215+ оттенков каталога RAL с выбором фактуры: гладкий глянец/мат, антивандальный текстурированный муар и шагрень. Высокая стойкость к ультрафиолету, истиранию и перепадам температур от -60°C до +70°C.',
    },
  ];

  const comparisonSpecs = [
    {
      param: 'Назначение и специализация',
      oven1: 'Стандартные детали, корпусы, щитовое оборудование, кронштейны, мелкая серия',
      oven2: 'Крупногабаритные фермы, длинномерный профиль до 6м, ворота, перголы, опоры',
      highlight: true
    },
    {
      param: 'Полезные габариты рабочей зоны (Д × Ш × В)',
      oven1: '3 000 × 2 000 × 1 800 мм',
      oven2: '6 000 × 1 800 × 2 100 мм',
      highlight: true
    },
    {
      param: 'Максимальная длина загружаемых изделий',
      oven1: 'до 3 000 мм',
      oven2: 'до 6 000 мм',
      highlight: true
    },
    {
      param: 'Тип нагрева и энергоноситель',
      oven1: 'Энергоэффективный газовый нагрев',
      oven2: 'Энергоэффективный газовый нагрев (природный / сжиженный газ)',
      highlight: false
    },
    {
      param: 'Тепловая мощность газовой горелки',
      oven1: 'Газовый теплогенератор высокого КПД',
      oven2: '200 ккал',
      highlight: true
    },
    {
      param: 'Мощность конвекционного вентилятора',
      oven1: 'Принудительная рециркуляция',
      oven2: '5.5 кВт (рабочая частота 50–60 Гц)',
      highlight: false
    },
    {
      param: 'Производительность потока воздуха (конвекция)',
      oven1: 'Равномерная циркуляция',
      oven2: '8 300 – 16 575 м³/ч (высокая кратность обмена)',
      highlight: true
    },
    {
      param: 'Время прогрева до рабочей температуры (180°C)',
      oven1: '15 – 25 минут',
      oven2: '15 – 30 минут',
      highlight: false
    },
    {
      param: 'Стабильность температуры в объеме',
      oven1: '±3 ... 5 °C',
      oven2: '±3 ... 6 °C (микропроцессорный ПИД-контроль)',
      highlight: true
    },
    {
      param: 'Максимальная рабочая температура',
      oven1: '250 °C',
      oven2: '250 °C',
      highlight: false
    },
    {
      param: 'Электропитание вентиляторов и автоматики',
      oven1: '220 / 380 В (50 Гц)',
      oven2: '220 / 380 В (50–60 Гц)',
      highlight: false
    },
    {
      param: 'Транспортная система загрузки',
      oven1: 'Верхняя монорельсовая подвесная каретка',
      oven2: 'Усиленная проходная подвесная система с грузоподъемностью до 3.5 т',
      highlight: false
    }
  ];

  return (
    <div className={`space-y-12 ${className}`}>
      {/* HEADER CARD: ОБЩИЙ ОБЗОР УЧАСТКА ПОРОШКОВОЙ ОКРАСКИ */}
      <div className="border border-neutral-200 bg-white shadow-xs overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-neutral-200 bg-[#FAFAFA] relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-20 h-16 shrink-0 bg-white border border-neutral-200 p-1 shadow-xs hidden sm:flex items-center justify-center">
                <img
                  src="/images/pech.png"
                  alt="Газовая термокамера полимеризации"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-neutral-500 mb-1.5">
                  <span>Участок порошковой окраски и полимеризации</span>
                  <span className="text-neutral-300">•</span>
                  <span className="text-neutral-900 font-semibold">2 газовые термокамеры (3м и 6м)</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-light text-neutral-900 tracking-tight">
                  Комплекс порошковой окраски полного цикла
                </h3>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 text-white text-xs font-mono tracking-wider uppercase">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                Горелка 200 ккал
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-neutral-300 text-neutral-800 text-xs font-mono">
                <Wind className="w-3.5 h-3.5 text-blue-600" />
                Поток 16 575 м³/ч
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 text-neutral-700 text-xs font-mono">
                <ThermometerSun className="w-3.5 h-3.5 text-neutral-600" />
                Стабильность ±3–6°C
              </span>
            </div>
          </div>
        </div>

        {/* ТЕКСТОВОЕ ОПИСАНИЕ ИНФРАСТРУКТУРЫ */}
        <div className="p-6 sm:p-8 space-y-6 text-neutral-600 text-sm sm:text-base font-light leading-relaxed">
          <p>
            Малярный цех предприятия представляет собой <strong>специализированную линию порошковой окраски полного технологического цикла</strong>. 
            Участок оснащен энергоэффективным газовым нагревом с развитой принудительной конвекцией, исключающей температурные градиенты и обеспечивающей 
            безупречное формирование полимерной пленки по всему объему загрузки.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 border border-neutral-200 bg-neutral-50/70">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-900 font-semibold mb-2">
                <span className="w-2 h-2 rounded-full bg-neutral-900"></span>
                Термокамера №1 (Газовая, 3000 × 2000 мм)
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 leading-normal">
                Оптимальна для оперативной серийной окраски стандартных листовых деталей, электротехнических щитов, 
                терминальных корпусов, кронштейнов и малых металлоконструкций. Обеспечивает минимальный цикл переналадки и быстрый выход на режим.
              </p>
            </div>

            <div className="p-5 border border-neutral-200 bg-neutral-50/70">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-900 font-semibold mb-2">
                <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                Термокамера №2 (Газовая крупногабаритная, 6000 × 1800 × 2100 мм)
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 leading-normal">
                Предназначена для крупногабаритных пространственных конструкций, длинномерного алюминиевого и стального профиля (до 6 метров), 
                сварных ферм, ворот, пергол, ограждений и тяжелых уличных опор с загрузкой каретки до 3.5 тонн.
              </p>
            </div>
          </div>
        </div>

        {/* ФОТООБЗОР ОБОРУДОВАНИЯ С ВОЗДУХОМ СЛЕВА */}
        <div className="px-6 sm:px-8 pb-8 pt-2">
          <div className="border border-neutral-200 bg-neutral-50/60 overflow-hidden flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 p-4 sm:p-6 pl-[25px] flex items-center justify-center">
              <img
                src="/images/pech.png"
                alt="Термокамера порошковой окраски завода"
                className="max-h-72 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="w-full md:w-1/2 p-6 sm:p-8 space-y-3 border-t md:border-t-0 md:border-l border-neutral-200 bg-white">
              <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                [ Оснащение малярного цеха ]
              </div>
              <h4 className="text-lg sm:text-xl font-light text-neutral-900 tracking-tight">
                Газовая конвекционная термокамера полимеризации
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                Полноразмерная проходная печь с полезной рабочей зоной 1800×2100×6000 мм, рассчитанная на равномерный прогрев изделий до 250°C с температурной стабильностью ±3–6°C.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono text-neutral-700">
                <div className="p-2.5 bg-neutral-50 border border-neutral-200">
                  <div className="text-[10px] text-neutral-400 uppercase">Рабочая зона</div>
                  <div className="font-semibold text-neutral-900 mt-0.5">1800×2100×6000 мм</div>
                </div>
                <div className="p-2.5 bg-neutral-50 border border-neutral-200">
                  <div className="text-[10px] text-neutral-400 uppercase">Горелка</div>
                  <div className="font-semibold text-neutral-900 mt-0.5">200 ккал</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: СРАВНИТЕЛЬНАЯ ТАБЛИЦА ТЕРМОКАМЕР ПОРОШКОВОЙ ОКРАСКИ */}
      <div className="border border-neutral-200 bg-white shadow-xs overflow-hidden">
        <div className="p-6 border-b border-neutral-200 bg-neutral-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 mb-1">
              <TableProperties className="w-4 h-4 text-neutral-700" />
              <span>Паспортные параметры инфраструктуры</span>
            </div>
            <h4 className="text-lg sm:text-xl font-medium text-neutral-900">
              Технические характеристики печей полимеризации
            </h4>
          </div>
          <div className="text-xs text-neutral-500 font-mono">
            Двухкамерный малярный комплекс
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-100/70 font-mono text-[11px] uppercase tracking-wider text-neutral-700">
                <th className="py-3.5 px-5 font-semibold w-1/3">Параметр оборудования</th>
                <th className="py-3.5 px-5 font-semibold text-neutral-900 w-1/3 border-l border-neutral-200 bg-neutral-100/90">
                  Термокамера №1 (3000 × 2000 мм)
                </th>
                <th className="py-3.5 px-5 font-semibold text-amber-950 w-1/3 border-l border-neutral-200 bg-amber-50/80">
                  Термокамера №2 (6000 × 1800 × 2100 мм)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {comparisonSpecs.map((spec, index) => (
                <tr 
                  key={index} 
                  className={`hover:bg-neutral-50/80 transition-colors ${spec.highlight ? 'bg-neutral-50/40 font-medium' : ''}`}
                >
                  <td className="py-3 px-5 text-neutral-700 font-normal">
                    {spec.param}
                  </td>
                  <td className="py-3 px-5 text-neutral-900 border-l border-neutral-200 font-mono text-xs">
                    {spec.oven1}
                  </td>
                  <td className="py-3 px-5 text-neutral-900 border-l border-neutral-200 font-mono text-xs bg-amber-50/20">
                    <span className={spec.highlight ? 'font-semibold text-neutral-950' : ''}>
                      {spec.oven2}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION: ТЕХНОЛОГИЧЕСКИЕ ПРЕИМУЩЕСТВА И ИНЖЕНЕРНЫЕ РЕШЕНИЯ */}
      <div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-neutral-200 mb-6">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-1">
              [ Инженерные решения участка ]
            </div>
            <h4 className="text-xl sm:text-2xl font-light text-neutral-900">
              Ключевые преимущества газового комплекса полимеризации
            </h4>
          </div>
          <p className="text-xs text-neutral-500 max-w-md font-light">
            Стабильность температурного графика, конвекционный обдув и долговечность защитно-декоративного слоя.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {techFeatures.map((item, idx) => (
            <div 
              key={idx}
              className="border border-neutral-200 bg-white p-5 flex flex-col justify-between hover:border-neutral-400 transition-colors shadow-2xs"
            >
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-amber-700 font-semibold mb-2">
                  {item.country}
                </div>
                <h5 className="text-base font-medium text-neutral-900 mb-2.5">
                  {item.title}
                </h5>
                <p className="text-xs text-neutral-600 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center text-[11px] text-neutral-400 font-mono">
                <span>Узел #{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION: ПОКРЫТИЯ И СТАНДАРТЫ КАЧЕСТВА */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="border border-neutral-200 bg-white p-6 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 mb-3">
            <Sparkles className="w-4 h-4 text-neutral-700" />
            <span>Палитра и фактуры</span>
          </div>
          <h5 className="text-lg font-medium text-neutral-900 mb-3">Каталог 215+ цветов RAL</h5>
          <ul className="space-y-2 text-xs text-neutral-600 font-light">
            <li className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-neutral-900 shrink-0 mt-0.5" />
              <span><strong>Архитектурный муар:</strong> матовая шероховатая текстура, устойчивая к отпечаткам и истиранию.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-neutral-900 shrink-0 mt-0.5" />
              <span><strong>Шагрень:</strong> выразительный рельеф апельсиновой корки, скрывающий дефекты металлопроката.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-neutral-900 shrink-0 mt-0.5" />
              <span><strong>Глянец и мат:</strong> гладкие поверхности со степенью блеска от 10% до 90%.</span>
            </li>
          </ul>
        </div>

        <div className="border border-neutral-200 bg-white p-6 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 mb-3">
            <Layers className="w-4 h-4 text-neutral-700" />
            <span>Технология нанесения</span>
          </div>
          <h5 className="text-lg font-medium text-neutral-900 mb-3">Gema OptiFlex + Конвекция</h5>
          <ul className="space-y-2 text-xs text-neutral-600 font-light">
            <li className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-neutral-900 shrink-0 mt-0.5" />
              <span><strong>Электростатическое напыление:</strong> швейцарские пистолеты Gema для стабильной толщины 80–120 мкм.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-neutral-900 shrink-0 mt-0.5" />
              <span><strong>Принудительная конвекция 16 575 м³/ч:</strong> равномерный прогрев без температурных ям и потеков.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-neutral-900 shrink-0 mt-0.5" />
              <span><strong>Обрабатываемые металлы:</strong> нержавеющая сталь, алюминиевые сплавы, оцинкованный прокат.</span>
            </li>
          </ul>
        </div>

        <div className="border border-neutral-200 bg-white p-6 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 mb-3">
            <Gauge className="w-4 h-4 text-neutral-700" />
            <span>Контроль ОТК и ГОСТ</span>
          </div>
          <h5 className="text-lg font-medium text-neutral-900 mb-3">Инструментальная проверка</h5>
          <ul className="space-y-2 text-xs text-neutral-600 font-light">
            <li className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-neutral-900 shrink-0 mt-0.5" />
              <span><strong>Толщинометрия Elcometer:</strong> измерение толщины сухой пленки в контрольных точках.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-neutral-900 shrink-0 mt-0.5" />
              <span><strong>Тест на адгезию (ISO 2409):</strong> проверка методом решетчатых надрезов (балл 0–1).</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-neutral-900 shrink-0 mt-0.5" />
              <span><strong>Соответствие нормативам:</strong> ГОСТ 9.410-88, ГОСТ 9.401, стандарт Qualicoat.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* CTA BANNER: РАСЧЕТ СТОИМОСТИ ПОРОШКОВОЙ ОКРАСКИ */}
      <div className="p-6 sm:p-8 bg-neutral-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
            [ Расчет стоимости окраски деталей и металлоконструкций ]
          </div>
          <h4 className="text-xl sm:text-2xl font-light tracking-tight text-white">
            Требуется порошковая окраска партий или длинномеров до 6 метров?
          </h4>
          <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-2xl">
            Рассчитайте стоимость порошковой покраски с выбором фактуры (муар, глянец, шагрень) и палитры RAL Classic в онлайн-калькуляторе.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          {onOpenCalculator && (
            <button
              onClick={() => onOpenCalculator('painting')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-neutral-900 hover:bg-neutral-100 transition-colors text-xs font-mono uppercase tracking-wider font-medium cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              Калькулятор окраски
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
