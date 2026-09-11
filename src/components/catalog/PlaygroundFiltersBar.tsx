import React, { useMemo } from 'react';
import { Filter, RotateCcw, X, Gamepad2, ShieldCheck } from 'lucide-react';
import { MAFProduct } from '../../types';

export interface PlaygroundFilterState {
  playgroundType: 'all' | 'sports-play' | 'rope-mesh' | 'sensory' | 'dynamic';
}

interface PlaygroundFiltersBarProps {
  products: MAFProduct[];
  filters: PlaygroundFilterState;
  onChange: (filters: PlaygroundFilterState) => void;
  onReset: () => void;
  totalMatching: number;
}

export const PlaygroundFiltersBar: React.FC<PlaygroundFiltersBarProps> = ({
  products,
  filters,
  onChange,
  onReset,
  totalMatching,
}) => {
  const typeCounts = useMemo(() => {
    const counts = {
      all: products.length,
      'sports-play': 0,
      'rope-mesh': 0,
      sensory: 0,
      dynamic: 0,
    };
    products.forEach((p) => {
      const t = p.playgroundType;
      if (t === 'sports-play') counts['sports-play']++;
      else if (t === 'rope-mesh') counts['rope-mesh']++;
      else if (t === 'sensory') counts.sensory++;
      else if (t === 'dynamic') counts.dynamic++;
    });
    return counts;
  }, [products]);

  const activeFiltersCount = filters.playgroundType !== 'all' ? 1 : 0;

  const typeLabels: Record<string, string> = {
    'sports-play': 'Спортивно-игровое оборудование',
    'rope-mesh': 'Пространственные сетки и канатные комплексы',
    sensory: 'Развивающие зоны и Sensory-оборудование',
    dynamic: 'Динамические и вращающиеся элементы',
  };

  return (
    <div className="border border-neutral-200 bg-[#FAFAFA] p-5 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-neutral-200">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-black text-white flex items-center justify-center">
            <Gamepad2 className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-xs uppercase font-mono tracking-wider font-semibold text-neutral-900 flex items-center gap-2">
              <span>Категории детских площадок</span>
              {activeFiltersCount > 0 && (
                <span className="px-1.5 py-0.2 bg-black text-white text-[10px] font-mono font-normal">
                  Активно: {activeFiltersCount}
                </span>
              )}
            </div>
            <p className="text-[11px] text-neutral-500 font-light mt-0.5 flex items-center gap-2">
              <span>Соответствие стандартам безопасности ТР ЕАЭС 042/2017 и ГОСТ Р 52169-2012</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline" />
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

      <div className="text-xs">
        <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-2 flex items-center gap-1.5">
          <Filter className="w-3 h-3 text-neutral-400" />
          <span>Направление игрового оборудования</span>
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onChange({ ...filters, playgroundType: 'all' })}
            className={`px-3.5 py-2 font-mono text-xs transition-colors flex items-center gap-1.5 cursor-pointer border ${
              filters.playgroundType === 'all'
                ? 'bg-black text-white border-black font-medium'
                : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
            }`}
          >
            <span>Все направления</span>
            <span className={`text-[10px] ${filters.playgroundType === 'all' ? 'text-neutral-300' : 'text-neutral-400'}`}>
              {typeCounts.all}
            </span>
          </button>

          {[
            { id: 'sports-play', label: 'Спортивно-игровое оборудование', count: typeCounts['sports-play'] },
            { id: 'rope-mesh', label: 'Пространственные сетки и канатные комплексы', count: typeCounts['rope-mesh'] },
            { id: 'sensory', label: 'Развивающие зоны и Sensory-оборудование', count: typeCounts.sensory },
            { id: 'dynamic', label: 'Динамические и вращающиеся элементы', count: typeCounts.dynamic },
          ].map((btn) => {
            const active = filters.playgroundType === btn.id;
            return (
              <button
                key={btn.id}
                onClick={() => onChange({ ...filters, playgroundType: btn.id as any })}
                className={`px-3.5 py-2 font-mono text-xs transition-colors flex items-center gap-1.5 cursor-pointer border ${
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

      {/* Active filter tag */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center gap-2 pt-4 mt-4 border-t border-neutral-200 text-xs font-mono">
          <span className="text-neutral-400 text-[11px]">Активное направление:</span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-neutral-200 text-neutral-900">
            <span>{typeLabels[filters.playgroundType]}</span>
            <button onClick={() => onChange({ ...filters, playgroundType: 'all' })} className="hover:text-black cursor-pointer">
              <X className="w-3 h-3" />
            </button>
          </span>
        </div>
      )}
    </div>
  );
};
