import React, { useMemo } from 'react';
import { Filter, RotateCcw, X, Armchair, Ruler } from 'lucide-react';
import { MAFProduct } from '../../types';

export interface FurnitureFilterState {
  furnitureType: 'all' | 'benches' | 'tables' | 'loungers' | 'pergolas' | 'parklets' | 'swings';
  lengthRange: 'all' | 'under-1.5' | '1.5-2.0' | '2.0-2.5' | 'over-2.5';
}

interface FurnitureFiltersBarProps {
  products: MAFProduct[];
  filters: FurnitureFilterState;
  onChange: (filters: FurnitureFilterState) => void;
  onReset: () => void;
  totalMatching: number;
}

export const FurnitureFiltersBar: React.FC<FurnitureFiltersBarProps> = ({
  products,
  filters,
  onChange,
  onReset,
  totalMatching,
}) => {
  const typeCounts = useMemo(() => {
    const counts = {
      all: products.length,
      benches: 0,
      tables: 0,
      loungers: 0,
      pergolas: 0,
      parklets: 0,
      swings: 0,
    };
    products.forEach((p) => {
      const t = p.furnitureType || p.category;
      if (t === 'benches') counts.benches++;
      else if (t === 'tables') counts.tables++;
      else if (t === 'loungers') counts.loungers++;
      else if (t === 'pergolas' || t === 'gazebos') counts.pergolas++;
      else if (t === 'parklets') counts.parklets++;
      else if (t === 'swings') counts.swings++;
    });
    return counts;
  }, [products]);

  const lengthCounts = useMemo(() => {
    const counts = {
      all: products.length,
      'under-1.5': 0,
      '1.5-2.0': 0,
      '2.0-2.5': 0,
      'over-2.5': 0,
    };
    products.forEach((p) => {
      const len = p.furnitureLengthM || (p.dimensions ? p.dimensions.length / 1000 : 2.0);
      if (len < 1.5) counts['under-1.5']++;
      else if (len <= 2.0) counts['1.5-2.0']++;
      else if (len <= 2.5) counts['2.0-2.5']++;
      else counts['over-2.5']++;
    });
    return counts;
  }, [products]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.furnitureType !== 'all') count++;
    if (filters.lengthRange !== 'all') count++;
    return count;
  }, [filters]);

  const typeLabels: Record<string, string> = {
    benches: 'Скамьи и лавочки',
    tables: 'Столы и группы для пикников',
    loungers: 'Шезлонги и лежаки',
    pergolas: 'Беседки, перголы и навесы',
    parklets: 'Парклеты и модульные системы',
    swings: 'Парковые качели',
  };

  const lengthLabels: Record<string, string> = {
    'under-1.5': 'До 1.5 м',
    '1.5-2.0': '1.5 – 2.0 м',
    '2.0-2.5': '2.0 – 2.5 м',
    'over-2.5': 'От 2.5 м',
  };

  return (
    <div className="border border-neutral-200 bg-[#FAFAFA] p-5 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-neutral-200">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-black text-white flex items-center justify-center">
            <Armchair className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-xs uppercase font-mono tracking-wider font-semibold text-neutral-900 flex items-center gap-2">
              <span>Параметры уличной мебели</span>
              {activeFiltersCount > 0 && (
                <span className="px-1.5 py-0.2 bg-black text-white text-[10px] font-mono font-normal">
                  Активно: {activeFiltersCount}
                </span>
              )}
            </div>
            <p className="text-[11px] text-neutral-500 font-light mt-0.5">
              Фильтрация по типам городской мебели и длине конструкции
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

      <div className="space-y-4 text-xs">
        {/* Filter 1: Тип уличной мебели */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-2 flex items-center gap-1.5">
            <Filter className="w-3 h-3 text-neutral-400" />
            <span>Тип изделия</span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => onChange({ ...filters, furnitureType: 'all' })}
              className={`px-3 py-1.5 font-mono text-xs transition-colors flex items-center gap-1.5 cursor-pointer border ${
                filters.furnitureType === 'all'
                  ? 'bg-black text-white border-black font-medium'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
              }`}
            >
              <span>Все типы мебели</span>
              <span className={`text-[10px] ${filters.furnitureType === 'all' ? 'text-neutral-300' : 'text-neutral-400'}`}>
                {typeCounts.all}
              </span>
            </button>

            {[
              { id: 'benches', label: 'Скамьи и лавочки', count: typeCounts.benches },
              { id: 'tables', label: 'Столы и группы для пикников', count: typeCounts.tables },
              { id: 'loungers', label: 'Шезлонги и лежаки', count: typeCounts.loungers },
              { id: 'pergolas', label: 'Беседки, перголы и навесы', count: typeCounts.pergolas },
              { id: 'parklets', label: 'Парклеты и модульные системы', count: typeCounts.parklets },
              { id: 'swings', label: 'Парковые качели', count: typeCounts.swings },
            ].map((btn) => {
              const active = filters.furnitureType === btn.id;
              return (
                <button
                  key={btn.id}
                  onClick={() => onChange({ ...filters, furnitureType: btn.id as any })}
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

        {/* Filter 2: Длина */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-2 flex items-center gap-1.5">
            <Ruler className="w-3 h-3 text-neutral-400" />
            <span>Длина изделия</span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'Любая длина', count: lengthCounts.all },
              { id: 'under-1.5', label: 'До 1.5 м', count: lengthCounts['under-1.5'] },
              { id: '1.5-2.0', label: '1.5 – 2.0 м', count: lengthCounts['1.5-2.0'] },
              { id: '2.0-2.5', label: '2.0 – 2.5 м', count: lengthCounts['2.0-2.5'] },
              { id: 'over-2.5', label: 'От 2.5 м', count: lengthCounts['over-2.5'] },
            ].map((btn) => {
              const active = filters.lengthRange === btn.id;
              return (
                <button
                  key={btn.id}
                  onClick={() => onChange({ ...filters, lengthRange: btn.id as any })}
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
      </div>

      {/* Active filters bar */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-4 mt-4 border-t border-neutral-200 text-xs font-mono">
          <span className="text-neutral-400 text-[11px]">Применённые фильтры:</span>
          {filters.furnitureType !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-neutral-200 text-neutral-900">
              <span>Тип: {typeLabels[filters.furnitureType] || filters.furnitureType}</span>
              <button onClick={() => onChange({ ...filters, furnitureType: 'all' })} className="hover:text-black cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.lengthRange !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-neutral-200 text-neutral-900">
              <span>Длина: {lengthLabels[filters.lengthRange]}</span>
              <button onClick={() => onChange({ ...filters, lengthRange: 'all' })} className="hover:text-black cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};
