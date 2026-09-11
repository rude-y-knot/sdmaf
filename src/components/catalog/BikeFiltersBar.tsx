import React, { useMemo } from 'react';
import { Filter, RotateCcw, X, Bike, Hash, Sparkles } from 'lucide-react';
import { MAFProduct } from '../../types';

export interface BikeFilterState {
  bikeType: 'all' | 'single' | 'modular';
  capacityRange: 'all' | '2-4' | '5-8' | '9-12' | '13+';
  bikeForm: 'all' | 'spiral' | 'u-shaped' | 'trapezoid' | 'custom';
}

interface BikeFiltersBarProps {
  products: MAFProduct[];
  filters: BikeFilterState;
  onChange: (filters: BikeFilterState) => void;
  onReset: () => void;
  totalMatching: number;
}

export const BikeFiltersBar: React.FC<BikeFiltersBarProps> = ({
  products,
  filters,
  onChange,
  onReset,
  totalMatching,
}) => {
  const typeCounts = useMemo(() => {
    const counts = { all: products.length, single: 0, modular: 0 };
    products.forEach((p) => {
      if (p.bikeType === 'single') counts.single++;
      if (p.bikeType === 'modular') counts.modular++;
    });
    return counts;
  }, [products]);

  const capacityCounts = useMemo(() => {
    const counts = { all: products.length, '2-4': 0, '5-8': 0, '9-12': 0, '13+': 0 };
    products.forEach((p) => {
      const cap = p.bikeCapacity || 4;
      if (cap <= 4) counts['2-4']++;
      else if (cap <= 8) counts['5-8']++;
      else if (cap <= 12) counts['9-12']++;
      else counts['13+']++;
    });
    return counts;
  }, [products]);

  const formCounts = useMemo(() => {
    const counts = { all: products.length, spiral: 0, 'u-shaped': 0, trapezoid: 0, custom: 0 };
    products.forEach((p) => {
      const form = p.bikeForm;
      if (form === 'spiral') counts.spiral++;
      else if (form === 'u-shaped') counts['u-shaped']++;
      else if (form === 'trapezoid') counts.trapezoid++;
      else if (form === 'custom') counts.custom++;
    });
    return counts;
  }, [products]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.bikeType !== 'all') count++;
    if (filters.capacityRange !== 'all') count++;
    if (filters.bikeForm !== 'all') count++;
    return count;
  }, [filters]);

  return (
    <div className="border border-neutral-200 bg-[#FAFAFA] p-5 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-neutral-200">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-black text-white flex items-center justify-center">
            <Bike className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-xs uppercase font-mono tracking-wider font-semibold text-neutral-900 flex items-center gap-2">
              <span>Параметры велопарковок</span>
              {activeFiltersCount > 0 && (
                <span className="px-1.5 py-0.2 bg-black text-white text-[10px] font-mono font-normal">
                  Активно: {activeFiltersCount}
                </span>
              )}
            </div>
            <p className="text-[11px] text-neutral-500 font-light mt-0.5">
              Фильтрация по типу конструкции, количеству парковочных мест и форме
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <span className="text-xs font-mono text-neutral-500">
            Найдено: <strong className="text-neutral-900 font-semibold">{totalMatching}</strong> из {products.length}
          </span>
          {activeFiltersCount > 0 && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono text-neutral-700 bg-white border border-neutral-300 hover:border-black hover:text-black transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Сбросить</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
        {/* Filter 1: Тип велопарковки */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-2 flex items-center gap-1.5">
            <Filter className="w-3 h-3 text-neutral-400" />
            <span>Тип конструкции</span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'Все типы', count: typeCounts.all },
              { id: 'single', label: 'Единая', count: typeCounts.single },
              { id: 'modular', label: 'Модульная', count: typeCounts.modular },
            ].map((btn) => {
              const active = filters.bikeType === btn.id;
              return (
                <button
                  key={btn.id}
                  onClick={() => onChange({ ...filters, bikeType: btn.id as any })}
                  className={`px-3 py-1.5 font-mono text-xs transition-colors flex items-center gap-1.5 cursor-pointer border ${
                    active
                      ? 'bg-black text-white border-black font-medium'
                      : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  <span>{btn.label}</span>
                  <span className={`text-[10px] ${active ? 'text-neutral-300' : 'text-neutral-400'}`}>
                    {btn.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter 2: Количество мест */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-2 flex items-center gap-1.5">
            <Hash className="w-3 h-3 text-neutral-400" />
            <span>Количество мест</span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'Все', count: capacityCounts.all },
              { id: '2-4', label: '2–4 места', count: capacityCounts['2-4'] },
              { id: '5-8', label: '5–8 мест', count: capacityCounts['5-8'] },
              { id: '9-12', label: '9–12 мест', count: capacityCounts['9-12'] },
              { id: '13+', label: '13+ мест', count: capacityCounts['13+'] },
            ].map((btn) => {
              const active = filters.capacityRange === btn.id;
              return (
                <button
                  key={btn.id}
                  onClick={() => onChange({ ...filters, capacityRange: btn.id as any })}
                  className={`px-2.5 py-1.5 font-mono text-xs transition-colors flex items-center gap-1 cursor-pointer border ${
                    active
                      ? 'bg-black text-white border-black font-medium'
                      : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  <span>{btn.label}</span>
                  <span className={`text-[10px] ${active ? 'text-neutral-300' : 'text-neutral-400'}`}>
                    {btn.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter 3: Форма */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-neutral-400" />
            <span>Форма стойки</span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'Все формы', count: formCounts.all },
              { id: 'spiral', label: 'Спиральная', count: formCounts.spiral },
              { id: 'u-shaped', label: 'П-образная / Арочная', count: formCounts['u-shaped'] },
              { id: 'trapezoid', label: 'Трапеция / Гребень', count: formCounts.trapezoid },
              { id: 'custom', label: 'Дизайнерская / Стойка', count: formCounts.custom },
            ].map((btn) => {
              const active = filters.bikeForm === btn.id;
              return (
                <button
                  key={btn.id}
                  onClick={() => onChange({ ...filters, bikeForm: btn.id as any })}
                  className={`px-2.5 py-1.5 font-mono text-xs transition-colors flex items-center gap-1 cursor-pointer border ${
                    active
                      ? 'bg-black text-white border-black font-medium'
                      : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  <span>{btn.label}</span>
                  <span className={`text-[10px] ${active ? 'text-neutral-300' : 'text-neutral-400'}`}>
                    {btn.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active filters bar */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-4 mt-4 border-t border-neutral-200 text-xs font-mono">
          <span className="text-neutral-400 text-[11px]">Применённые фильтры:</span>
          {filters.bikeType !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-neutral-200 text-neutral-900">
              <span>Тип: {filters.bikeType === 'single' ? 'Единая' : 'Модульная'}</span>
              <button onClick={() => onChange({ ...filters, bikeType: 'all' })} className="hover:text-black cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.capacityRange !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-neutral-200 text-neutral-900">
              <span>Мест: {filters.capacityRange}</span>
              <button onClick={() => onChange({ ...filters, capacityRange: 'all' })} className="hover:text-black cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.bikeForm !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-neutral-200 text-neutral-900">
              <span>Форма: {filters.bikeForm}</span>
              <button onClick={() => onChange({ ...filters, bikeForm: 'all' })} className="hover:text-black cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};
