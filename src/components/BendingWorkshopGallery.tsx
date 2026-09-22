import React from 'react';
import { 
  Check, 
  Cpu, 
  Layers, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Calculator,
  Flame,
  Wind,
  SlidersHorizontal,
  TableProperties,
  ArrowRight,
  Maximize2,
  Scale
} from 'lucide-react';

interface BendingWorkshopGalleryProps {
  onOpenCalculator?: (service?: string) => void;
  className?: string;
}

export const BendingWorkshopGallery: React.FC<BendingWorkshopGalleryProps> = ({
  onOpenCalculator,
  className = ''
}) => {
  const techFeatures = [
    {
      title: 'Итальянская ЧПУ система ESA с 2D/3D визуализацией',
      country: 'Италия (ESA Automation)',
      desc: 'Интеллектуальная стойка ЧПУ ESA S630 / S640 с цветным графическим интерфейсом. Рассчитывает точную развертку, нейтральный слой (K-фактор) и последовательность гибов, выполняет 3D-симуляцию процесса для полного исключения коллизий детали с матрицей и пуансоном.',
    },
    {
      title: 'Двухцилиндровая синхронизация Y1/Y2 с оптическими линейками',
      country: 'Бельгия & Италия / точность ±0.01 мм',
      desc: 'Независимое пропорциональное управление левым и правым гидроцилиндрами. Оптические линейки передают фактическое положение траверсы в реальном времени, обеспечивая идеальную параллельность балки и повторяемость угла с точностью до 0.1°.',
    },
    {
      title: 'Автоматическое ЧПУ-бомбирование стола (Wila Wave Crowning)',
      country: 'ЧПУ-компенсация прогиба',
      desc: 'Система механической компенсации упругой деформации нижней балки. Контроллер автоматически рассчитывает и выставляет требуемый профиль стола в зависимости от толщины, длины и марки металла, исключая эффект «бочки» (недогиб по центру) на длине до 3200 мм.',
    },
    {
      title: 'Сервоприводные задние упоры на ШВП и линейных направляющих',
      country: 'Оси X, R (+ Z1, Z2)',
      desc: 'Высокоскоростное сервопозиционирование упорных пальцев с микронным шагом. Обеспечивает мгновенную перенастройку между переходами многогибочных деталей и высокую скорость серийного выпуска.',
    },
    {
      title: 'Европейская быстросменная оснастка Promecam & Rolleri',
      country: 'Euro Standard Tooling',
      desc: 'Универсальная система быстросъемных клиновых зажимов. Секционные закаленные пуансоны (включая гусиные шеи для глубоких коробов) и многоручьевые V-матрицы позволяют гнуть сложные замкнутые профили без переустановки.',
    },
    {
      title: 'Гибка нержавеющей стали без царапин и задиров',
      country: 'Полиуретановые матрицы',
      desc: 'Применение защитных эластомерных накладок и специальных радиусных пуансонов позволяет гнуть зеркальную и шлифованную нержавеющую сталь AISI 304 в защитной пленке с полным сохранением товарного вида.',
    },
  ];

  const comparisonSpecs = [
    {
      param: 'Номинальное усилие пресса',
      machine1: '40 тонн (400 кН)',
      machine2: '160 тонн (1 600 кН)',
      highlight: true
    },
    {
      param: 'Максимальная длина гибки',
      machine1: '1 600 мм (до 2 000 мм в зеве)',
      machine2: '3 200 мм',
      highlight: true
    },
    {
      param: 'Расстояние между колоннами',
      machine1: '1 100 мм',
      machine2: '2 600 мм',
      highlight: false
    },
    {
      param: 'Глубина зева (вылет станины)',
      machine1: '295 мм',
      machine2: '320 мм (до 400 мм)',
      highlight: false
    },
    {
      param: 'Рабочий ход траверсы (пуансона)',
      machine1: '100 мм',
      machine2: '200 мм (просвет до 420 мм)',
      highlight: false
    },
    {
      param: 'Система ЧПУ и управление',
      machine1: 'Robosoft Synchro (Бельгия)',
      machine2: 'ESA S630 / S640 (Италия)',
      highlight: false
    },
    {
      param: 'Контролируемые координаты осей',
      machine1: 'Y1, Y2, X (оптические датчики)',
      machine2: 'Y1, Y2, X, R + ЧПУ-бомбирование',
      highlight: false
    },
    {
      param: 'Точность позиционирования упоров',
      machine1: '±0.01 мм',
      machine2: '±0.01 мм',
      highlight: false
    },
    {
      param: 'Система компенсации прогиба стола',
      machine1: 'Жесткая прецизионная балка',
      machine2: 'Автоматическое механическое ЧПУ-бомбирование',
      highlight: true
    },
    {
      param: 'Система крепления инструмента',
      machine1: 'Европейский стандарт Promecam',
      machine2: 'Быстросъемные зажимы Euro Promecam',
      highlight: false
    },
    {
      param: 'Мощность главного гидропривода',
      machine1: '4.1 кВт',
      machine2: '11.0 кВт (гидравлика Rexroth / Hoerbiger)',
      highlight: false
    },
    {
      param: 'Профильное технологическое назначение',
      machine1: 'Скоростная прецизионная гибка кронштейнов, коробов, мелких и средних узлов',
      machine2: 'Силовая гибка длинномерных фасадных кассет, несущих балок, лотков и толстого листа',
      highlight: true
    },
  ];

  const bendingCapabilities = [
    {
      metal: 'Конструкционная сталь',
      grades: 'Ст3сп5, 09Г2С, сталь 20',
      thickness: 'до 6.0–8.0 мм',
      tech: 'V-образные матрицы V=8t / V=12t',
      note: 'Гибка силовых швеллеров, балок, фасадных кассет и элементов несущих металлоконструкций.',
      icon: Scale,
    },
    {
      metal: 'Нержавеющая сталь',
      grades: 'AISI 304, AISI 316, AISI 430',
      thickness: 'до 5.0 мм',
      tech: 'Полиуретановые защитные матрицы',
      note: 'Идеальная гибка шлифованного и полированного листа в защитной пленке без задиров для МАФ и чанов.',
      icon: Layers,
    },
    {
      metal: 'Алюминий и сплавы',
      grades: 'АМг2, АМг3, АМг5, АД31',
      thickness: 'до 6.0 мм',
      tech: 'Радиусные пуансоны R ≥ t',
      note: 'Пластичная гибка легких сплавов без образования микротрещин на внешнем радиусе.',
      icon: Sparkles,
    },
  ];

  return (
    <div className={`border border-neutral-200 bg-white ${className}`}>
      {/* Header Bar */}
      <div className="p-6 sm:p-8 border-b border-neutral-200 bg-[#FAFAFA] relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-14 shrink-0 bg-white border border-neutral-200 p-1 shadow-xs hidden sm:flex items-center justify-center">
              <img
                src="/images/bending.png"
                alt="Гидравлические листогибочные прессы ЧПУ HACO и MAIHONG — гибочный цех завода"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-neutral-500 mb-1.5">
                <span className="bg-neutral-200/80 px-2 py-0.5 text-neutral-800 font-medium">HACO & MAIHONG</span>
                <span>•</span>
                <span>Гидравлические листогибочные прессы с ЧПУ</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-light text-neutral-900 tracking-tight">
                Парк гибочного оборудования: HACO ERM 20040 (40т) и MAIHONG 160/3200 (160т)
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 font-light mt-1 max-w-3xl leading-relaxed">
                Синхронизированные прессы закрывают полный производственный цикл: от скоростной гибки малогабаритных кронштейнов и корпусов (HACO) до силовой гибки крупногабаритных деталей длиной до 3.2 метра (MAIHONG с ЧПУ ESA).
              </p>
            </div>
          </div>

          {onOpenCalculator && (
            <button
              onClick={() => onOpenCalculator('гибка металла')}
              className="py-3 px-5 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0 shadow-xs"
            >
              <Calculator className="w-4 h-4" />
              <span>Рассчитать гибку</span>
            </button>
          )}
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-12">
        {/* BLOCK 1: Сравнительная таблица станков производства */}
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
            <TableProperties className="w-4 h-4 text-neutral-600" />
            <span>[ Сводная таблица параметров ]</span>
          </div>
          <h4 className="text-xl sm:text-2xl font-light text-neutral-900 tracking-tight mb-2">
            Характеристики гибочных прессов цеха
          </h4>
          <p className="text-xs sm:text-sm text-neutral-600 font-light mb-6">
            Два основных листогибочных станка завода, настроенные под различные габариты и толщины листового проката.
          </p>

          <div className="border border-neutral-200 overflow-x-auto bg-white shadow-xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-300 bg-neutral-100 font-mono text-[11px] uppercase tracking-wider text-neutral-700">
                  <th className="py-4 px-5 font-semibold w-1/3 min-w-[200px]">
                    Параметр / Характеристика
                  </th>
                  <th className="py-4 px-5 font-semibold w-1/3 min-w-[220px] bg-neutral-200/50 text-neutral-900">
                    Пресс №1: HACO ERM 20040 (Бельгия)
                  </th>
                  <th className="py-4 px-5 font-semibold w-1/3 min-w-[220px] bg-neutral-200/70 text-neutral-900">
                    Пресс №2: MAIHONG 160/3200 с ЧПУ ESA (Италия)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {comparisonSpecs.map((item, idx) => (
                  <tr 
                    key={idx} 
                    className={`transition-colors hover:bg-neutral-50/80 ${
                      item.highlight ? 'bg-amber-50/30' : ''
                    }`}
                  >
                    <td className="py-3.5 px-5 font-medium text-neutral-900">
                      {item.param}
                    </td>
                    <td className="py-3.5 px-5 font-mono text-neutral-800 bg-neutral-50/40">
                      {item.machine1}
                    </td>
                    <td className="py-3.5 px-5 font-mono font-medium text-neutral-900 bg-neutral-50/70">
                      {item.machine2}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* BLOCK 2: Общие технологические особенности гибочного участка */}
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
            <SlidersHorizontal className="w-4 h-4 text-neutral-600" />
            <span>[ Инженерная архитектура и ЧПУ ]</span>
          </div>
          <h4 className="text-xl sm:text-2xl font-light text-neutral-900 tracking-tight mb-2">
            Технологические решения гибочного участка
          </h4>
          <p className="text-xs sm:text-sm text-neutral-600 font-light mb-6">
            Европейская гидравлика, оптическая обратная связь и ЧПУ-бомбирование обеспечивают стабильный угол гибки ±0.1° на любой длине.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {techFeatures.map((feat, idx) => (
              <div 
                key={idx}
                className="border border-neutral-200 bg-[#FAFAFA] p-5 sm:p-6 flex flex-col justify-between hover:border-black transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 bg-white border border-neutral-200 px-2 py-0.5">
                      0{idx + 1} • {feat.country}
                    </span>
                  </div>
                  <h5 className="text-sm sm:text-base font-medium text-neutral-900 mb-2.5 leading-snug">
                    {feat.title}
                  </h5>
                  <p className="text-xs text-neutral-600 leading-relaxed font-light">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BLOCK 3: Диапазон обрабатываемых металлов */}
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
            <Layers className="w-4 h-4 text-neutral-600" />
            <span>[ Возможности гибки по маркам металлов ]</span>
          </div>
          <h4 className="text-xl sm:text-2xl font-light text-neutral-900 tracking-tight mb-2">
            Диапазон обрабатываемых металлов и толщин
          </h4>
          <p className="text-xs sm:text-sm text-neutral-600 font-light mb-6">
            Работаем с углеродистыми, нержавеющими, оцинкованными и алюминиевыми листами любой сложности профилирования.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {bendingCapabilities.map((cap, idx) => {
              const Icon = cap.icon;
              return (
                <div 
                  key={idx}
                  className="border border-neutral-200 bg-white p-6 flex flex-col justify-between hover:border-black transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[10px] uppercase bg-neutral-100 text-neutral-700 px-2.5 py-1">
                        {cap.tech}
                      </span>
                      <Icon className="w-4 h-4 text-neutral-700" />
                    </div>

                    <h5 className="text-base font-medium text-neutral-900 mb-1">
                      {cap.metal}
                    </h5>
                    <div className="text-xs font-mono text-neutral-500 mb-3">
                      {cap.grades}
                    </div>

                    <div className="bg-neutral-50 border border-neutral-100 p-3 mb-3">
                      <div className="text-[10px] font-mono text-neutral-400 uppercase">Максимальная толщина гибки:</div>
                      <div className="text-2xl font-light font-mono text-neutral-900 mt-0.5">
                        {cap.thickness}
                      </div>
                    </div>

                    <p className="text-xs text-neutral-600 leading-relaxed font-light">
                      {cap.note}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Banner */}
        <div className="bg-[#111111] text-white p-6 sm:p-8 border border-neutral-800">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#55AA53]">
                <ShieldCheck className="w-4 h-4" />
                <span>Производственный участок гибки листового металла (Санкт-Петербург)</span>
              </div>
              <h4 className="text-lg sm:text-2xl font-light tracking-tight">
                Гибка деталей длиной до 3200 мм с усилием до 160 тонн
              </h4>
              <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-2xl">
                Комбинация скоростного пресса HACO ERM 20040 и тяжелого 160-тонного пресса MAIHONG с ЧПУ ESA позволяет изготавливать детали сложной пространственной конфигурации с минимальными допусками и гарантией повторяемости в серии.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col gap-2.5">
              {onOpenCalculator && (
                <button
                  onClick={() => onOpenCalculator('гибка металла')}
                  className="w-full py-3.5 px-4 bg-white text-black text-xs font-mono uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 cursor-pointer font-medium"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Загрузить чертеж на расчет</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
