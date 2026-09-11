import React from 'react';
import { 
  ArrowRight,
  ArrowUpRight,
  Check,
  Cpu,
  Layers,
  Flame,
  Sparkles,
  Calculator
} from 'lucide-react';
import { SERVICE_CATEGORIES } from '../data/factoryData';

interface MachineryProps {
  onOpenCalculator: () => void;
  onNavigateToProduction?: () => void;
}

export const MachineryAndTech: React.FC<MachineryProps> = ({ 
  onOpenCalculator,
  onNavigateToProduction
}) => {
  return (
    <section id="machinery" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-200">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-2">
              [ 03 / Производственные мощности ]
            </div>
            <h2 className="text-3xl sm:text-5xl font-light text-neutral-900 tracking-tight">
              Парк станков ЧПУ и металлообработка
            </h2>
          </div>
          <div className="max-w-md space-y-3">
            <p className="text-sm text-neutral-600 font-normal leading-relaxed">
              Собственный производственный комплекс 4000+ м² в Санкт-Петербурге (Колпино). Волоконные лазерные комплексы Knoppo KF 3 кВт (столы 3м и 6м), ЧПУ гибка 250т, аттестованная сварка НАКС и полимеризация RAL.
            </p>
            {onNavigateToProduction && (
              <div>
                <button
                  onClick={onNavigateToProduction}
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-black font-semibold hover:text-[#55AA53] transition-colors cursor-pointer"
                >
                  <span>Полный обзор оборудования и цехов</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 4 Core Tech Cards Grid (Teaser) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200 mt-10 border border-neutral-200">
          {SERVICE_CATEGORIES.map((service) => (
            <div
              key={service.id}
              className="bg-white p-6 sm:p-7 flex flex-col justify-between hover:bg-neutral-50/70 transition-colors group relative overflow-hidden"
            >
              {/* Top-Right Machine Preview for Laser Cutting block */}
              {service.id === 'cutting' && (
                <div className="absolute top-3 right-3 w-20 h-16 sm:w-24 sm:h-20 pointer-events-none transition-transform duration-500 group-hover:scale-105 z-10">
                  <img
                    src="/laser-cutting-plotter.svg"
                    alt="Станок лазерного раскроя ЧПУ"
                    className="w-full h-full object-contain drop-shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-5 pr-14">
                  <span className="font-mono text-[10px] tracking-wider uppercase text-neutral-500 bg-neutral-100 px-2 py-0.5 font-medium">
                    {service.badge}
                  </span>
                  {service.id !== 'cutting' && (
                    <span className="font-mono text-[11px] text-neutral-300">
                      #{service.id.toUpperCase()}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-normal text-neutral-900 mb-2.5 tracking-tight group-hover:text-black">
                  {service.title}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed mb-5 font-normal">
                  {service.desc}
                </p>

                <ul className="space-y-1.5 mb-6 text-xs text-neutral-600 font-light">
                  {service.specs.map((spec, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#55AA53] shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={onOpenCalculator}
                className="w-full py-2.5 px-3 border border-neutral-300 text-neutral-800 text-[11px] font-mono uppercase tracking-wider hover:border-black hover:bg-black hover:text-white transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Рассчитать смету</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        {/* Factory Fast Tour / Summary Banner */}
        <div className="border border-neutral-200 bg-white p-6 sm:p-10 mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-neutral-400">
                <span>[ 4000+ м² в Санкт-Петербурге / Колпино ]</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-light text-neutral-900 tracking-tight">
                Конструкторское бюро, аттестация НАКС и 100% контроль ОТК
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light max-w-2xl">
                Разработка рабочей документации КМ/КМД, раскладка Nesting, сварка в среде аргона высокой чистоты и ультразвуковой контроль швов по ГОСТ.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs">
                <div className="border border-neutral-200 p-3 bg-neutral-50">
                  <div className="text-neutral-900 font-medium">Knoppo KF 3 кВт</div>
                  <div className="text-[10px] text-neutral-500 mt-0.5">Волоконные столы 3м и 6м (сталь до 20 мм)</div>
                </div>
                <div className="border border-neutral-200 p-3 bg-neutral-50">
                  <div className="text-neutral-900 font-medium">Печи 3 и 6 метров</div>
                  <div className="text-[10px] text-neutral-500 mt-0.5">Газовые печи порошковой окраски</div>
                </div>
                <div className="border border-neutral-200 p-3 bg-neutral-50">
                  <div className="text-neutral-900 font-medium">10 тонн</div>
                  <div className="text-[10px] text-neutral-500 mt-0.5">Грузоподъемность кран-балок</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              {onNavigateToProduction && (
                <button
                  onClick={onNavigateToProduction}
                  className="w-full py-3.5 px-5 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Подробнее о производстве</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onOpenCalculator}
                className="w-full py-3 px-5 border border-neutral-300 text-neutral-900 text-xs font-mono uppercase tracking-wider hover:border-black transition-colors flex items-center justify-center gap-2 cursor-pointer bg-white"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Загрузить чертеж на расчет</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
