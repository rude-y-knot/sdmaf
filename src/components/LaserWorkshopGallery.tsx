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
  TableProperties
} from 'lucide-react';

interface LaserWorkshopGalleryProps {
  onOpenCalculator?: (service?: string) => void;
  className?: string;
}

export const LaserWorkshopGallery: React.FC<LaserWorkshopGalleryProps> = ({
  onOpenCalculator,
  className = ''
}) => {
  const techFeatures = [
    {
      title: 'Система сервомоторов YASKAWA (Япония)',
      country: 'Япония',
      desc: 'Промышленные цифровые сервоприводы с высокой перегрузочной способностью. Обеспечивают мгновенный отклик, идеальную синхронизацию осей и поддержание крутящего момента при динамических ускорениях до 1.5G. Благодаря им станок сохраняет точность контура даже на крутых радиусах и сложных геометрических элементах.',
    },
    {
      title: 'Профильные направляющие HIWIN Rail (Тайвань)',
      country: 'Тайвань',
      desc: 'Прецизионные линейные рельсы прямоугольного сечения с высокой грузоподъемностью и одинаковой жесткостью во всех направлениях. Обеспечивают плавность хода портала, минимальный коэффициент трения и высокую износостойкость при многосменной работе.',
    },
    {
      title: 'Усиленная жесткая станина с термоотпуском',
      country: 'Термообработка 600 °C',
      desc: 'Сварная рамная конструкция проходит термический отпуск при температуре 600 °C с последующим 24-часовым охлаждением в печи. Это полностью снимает внутреннее напряжение металла, гарантируя отсутствие деформаций геометрии в течение многих лет службы.',
    },
    {
      title: 'Алюминиевый портал 3-го поколения',
      country: 'Прессование 4300 т',
      desc: 'Облегченная сквозная балка, изготовленная методом прессования с усилием 4300 тонн. Обладает высокой жесткостью класса 6061 T6 при минимальном весе, что максимизирует динамические показатели приводов.',
    },
    {
      title: 'Режущая головка Raytools (Швейцария)',
      country: 'Швейцария',
      desc: 'Оснащена функцией автоматического контроля фокусного расстояния (автофокусом). Система ЧПУ сама корректирует положение линзы в процессе врезки (перфорации) и чистового реза.',
    },
    {
      title: 'Система ЧПУ и ПО CypCut (Raytools)',
      country: 'ПО & Нестинг',
      desc: 'Автоматизирует раскладку деталей на листе (нестинг) для экономии материала, самостоятельно определяет края заготовки (smart edge searching) и оптимизирует траекторию холостых перемещений.',
    },
  ];

  const comparisonSpecs = [
    {
      param: 'Зона обработки (X × Y)',
      machine1: '1500 × 3000 мм',
      machine2: '1500 × 6000 мм',
      highlight: true
    },
    {
      param: 'Мощность лазерного источника',
      machine1: '3000 Вт (3 кВт)',
      machine2: '3000 Вт (3 кВт)',
      highlight: false
    },
    {
      param: 'Тип лазера / Длина волны',
      machine1: 'Волоконный (Fiber) / 1070 нм',
      machine2: 'Волоконный (Fiber) / 1070 нм',
      highlight: false
    },
    {
      param: 'Точность позиционирования (X/Y)',
      machine1: '0,5 мм',
      machine2: '0,5 мм',
      highlight: false
    },
    {
      param: 'Точность репозиции (X/Y)',
      machine1: '±0.02 мм',
      machine2: '±0.02 мм',
      highlight: false
    },
    {
      param: 'Максимальное ускорение',
      machine1: '1.5G',
      machine2: '1.5G',
      highlight: false
    },
    {
      param: 'Скорость перемещения (linkage)',
      machine1: 'до 140 м/мин',
      machine2: 'до 140 м/мин',
      highlight: false
    },
    {
      param: 'Назначение станка',
      machine1: 'Раскрой стандартных металлических листов',
      machine2: 'Раскрой длинномерного проката, крупногабаритных заготовок без перехвата',
      highlight: true
    },
  ];

  const cuttingCapabilities = [
    {
      metal: 'Углеродистая (черная) сталь',
      grades: 'Ст3сп5, 09Г2С, сталь 20, 40Х',
      thickness: 'до 20 мм',
      gas: 'Кислород (O₂)',
      note: 'Уверенный и стабильный раскрой толстого листа с гладкой геометрией кромок.',
      icon: Flame,
    },
    {
      metal: 'Нержавеющая сталь',
      grades: 'AISI 304, AISI 316, AISI 430',
      thickness: 'до 8–10 мм',
      gas: 'Азот (N₂) / Сжатый воздух',
      note: 'Чистый зеркальный рез без окалины и грата, сохраняет антикоррозийные свойства кромок.',
      icon: Wind,
    },
    {
      metal: 'Алюминий и сплавы',
      grades: 'АМг2, АМг3, АМг5, АД31',
      thickness: 'до 8–10 мм',
      gas: 'Азот (N₂)',
      note: 'Высокоскоростная резка легких сплавов с высокой точностью сопряжения.',
      icon: Layers,
    },
  ];

  return (
    <div className={`border border-neutral-200 bg-white ${className}`}>
      {/* Header Bar */}
      <div className="p-6 sm:p-8 border-b border-neutral-200 bg-[#FAFAFA] relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-neutral-500 mb-1.5">
              <span className="bg-neutral-200/80 px-2 py-0.5 text-neutral-800 font-medium">Knoppo KF Series</span>
              <span>•</span>
              <span>Волоконные лазерные комплексы (Fiber Laser)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-light text-neutral-900 tracking-tight">
              Knoppo KF Series Single Table Fiber Laser Cutting Machine (3 кВт)
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 font-light mt-1 max-w-3xl leading-relaxed">
              Оба станка относятся к классу открытых одностоловых комплексов прецизионного раскроя листового металла на оптоволоконных излучателях мощностью 3 кВт (3000 Вт).
            </p>
          </div>

          {onOpenCalculator && (
            <button
              onClick={() => onOpenCalculator('лазерный раскрой')}
              className="py-3 px-5 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0 shadow-xs"
            >
              <Calculator className="w-4 h-4" />
              <span>Рассчитать раскрой</span>
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
            Характеристики станков производства
          </h4>
          <p className="text-xs sm:text-sm text-neutral-600 font-light mb-6">
            Парк лазерного цеха оснащен двумя одностоловыми станками Knoppo KF с рабочими полями 1500×3000 мм и 1500×6000 мм.
          </p>

          <div className="border border-neutral-200 overflow-x-auto bg-white shadow-xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-300 bg-neutral-100 font-mono text-[11px] uppercase tracking-wider text-neutral-700">
                  <th className="py-4 px-5 font-semibold w-1/3 min-w-[200px]">
                    Параметр / Характеристика
                  </th>
                  <th className="py-4 px-5 font-semibold w-1/3 min-w-[220px] bg-neutral-200/50 text-neutral-900">
                    Станок №1: Knoppo KF (1500×3000)
                  </th>
                  <th className="py-4 px-5 font-semibold w-1/3 min-w-[220px] bg-neutral-200/70 text-neutral-900">
                    Станок №2: Knoppo KF (1500×6000)
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

        {/* BLOCK 2: Общие технологические особенности серии Knoppo KF (3 кВт) */}
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
            <SlidersHorizontal className="w-4 h-4 text-neutral-600" />
            <span>[ Инженерная архитектура станка ]</span>
          </div>
          <h4 className="text-xl sm:text-2xl font-light text-neutral-900 tracking-tight mb-2">
            Общие технологические особенности серии Knoppo KF (3 кВт)
          </h4>
          <p className="text-xs sm:text-sm text-neutral-600 font-light mb-6">
            Ключевые конструктивные решения и европейско-японские комплектующие, обеспечивающие стабильную промышленную точность 0,5 мм при многосменной работе.
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

        {/* BLOCK 3: Диапазон обрабатываемых металлов (Возможности раскроя для мощности 3 кВт) */}
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
            <Layers className="w-4 h-4 text-neutral-600" />
            <span>[ Диапазон толщин и технологические газы ]</span>
          </div>
          <h4 className="text-xl sm:text-2xl font-light text-neutral-900 tracking-tight mb-2">
            Возможности раскроя для мощности 3 кВт
          </h4>
          <p className="text-xs sm:text-sm text-neutral-600 font-light mb-6">
            Станки уверенно справляются с черной сталью, нержавеющей сталью и алюминием в среде кислорода O₂, азота N₂ и сжатого воздуха.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {cuttingCapabilities.map((cap, idx) => {
              const Icon = cap.icon;
              return (
                <div 
                  key={idx}
                  className="border border-neutral-200 bg-white p-6 flex flex-col justify-between hover:border-black transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[10px] uppercase bg-neutral-100 text-neutral-700 px-2.5 py-1">
                        {cap.gas}
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
                      <div className="text-[10px] font-mono text-neutral-400 uppercase">Максимальная толщина:</div>
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
                <span>Производственный участок лазерного раскроя (Санкт-Петербург)</span>
              </div>
              <h4 className="text-lg sm:text-2xl font-light tracking-tight">
                Раскрой стандартных и длинномерных листов до 6000 мм
              </h4>
              <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-2xl">
                Параллельная работа двух комплексов Knoppo KF (1500×3000 и 1500×6000 мм) позволяет оперативно выполнять как серийный раскрой стандартного листа, так и бесшовный раскрой крупногабаритных заготовок без перехвата.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col gap-2.5">
              {onOpenCalculator && (
                <button
                  onClick={() => onOpenCalculator('лазерный раскрой Knoppo 3 кВт')}
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
