import React, { useMemo } from 'react';
import { Filter, RotateCcw, Sparkles, ShieldCheck } from 'lucide-react';
import { MAFProduct } from '../../types';

export interface StainlessFilterState {
  stainlessType: 'all' | 'art-objects' | 'pergolas' | 'fences' | 'stairs' | 'planters' | 'entrance-groups' | 'lighting' | string;
}

interface StainlessFiltersBarProps {
  products: MAFProduct[];
  filters: StainlessFilterState;
  onChange: (filters: StainlessFilterState) => void;
  onReset: () => void;
  totalMatching: number;
}

export const StainlessFiltersBar: React.FC<StainlessFiltersBarProps> = ({
  products,
  filters,
  onChange,
  onReset,
  totalMatching,
}) => {
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: products.length,
      'art-objects': 0,
      pergolas: 0,
      fences: 0,
      stairs: 0,
      planters: 0,
      'entrance-groups': 0,
      lighting: 0,
    };

    products.forEach((p) => {
      const t = p.stainlessType;
      if (t && counts[t] !== undefined) {
        counts[t]++;
      }
    });

    return counts;
  }, [products]);

  const activeFiltersCount = filters.stainlessType !== 'all' ? 1 : 0;

  const categories = [
    { id: 'all', label: 'Все изделия' },
    { id: 'art-objects', label: 'Арт-объекты', desc: 'Бионические скульптуры, кинетические арт-формы' },
    { id: 'pergolas', label: 'Перголы', desc: 'Теневые навесы, перголы с лазерной резкой' },
    { id: 'fences', label: 'Ограждения', desc: 'Перила набережных, секционные ограждения AISI 316' },
    { id: 'stairs', label: 'Лестницы', desc: 'Винтовые, маршевые и ландшафтные лестницы' },
    { id: 'planters', label: 'Кашпо', desc: 'Уличные вазоны с термоизоляцией и водоотводом' },
    { id: 'entrance-groups', label: 'Входные группы', desc: 'Архитектурные порталы, козырьки, пилоны' },
    { id: 'lighting', label: 'Освещение', desc: 'Световые болларды, парковые стелы IP67' },
  ];

  return (
    <div className="border border-neutral-200 bg-[#FAFAFA] p-5 mb-8">
      {/* Top Header Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-neutral-200">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-black text-white flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-xs uppercase font-mono tracking-wider font-semibold text-neutral-900 flex items-center gap-2">
              <span>Категории изделий из нержавеющей стали</span>
              {activeFiltersCount > 0 && (
                <span className="px-1.5 py-0.2 bg-black text-white text-[10px] font-mono font-normal">
                  Активно: {activeFiltersCount}
                </span>
              )}
            </div>
            <p className="text-[11px] text-neutral-500 font-light mt-0.5 flex items-center gap-2">
              <span>Аустенитная сталь AISI 304 / AISI 316 • Зеркальная Super Mirror и шлифовка Scotch-Brite</span>
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

      {/* Filter Options */}
      <div className="text-xs">
        <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-2.5 flex items-center gap-1.5">
          <Filter className="w-3 h-3 text-neutral-400" />
          <span>Направление архитектурных металлоизделий</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isSelected = filters.stainlessType === cat.id;
            const count = typeCounts[cat.id] ?? 0;

            return (
              <button
                key={cat.id}
                onClick={() => onChange({ ...filters, stainlessType: cat.id })}
                className={`px-3.5 py-2 font-mono text-xs transition-colors flex items-center gap-2 cursor-pointer border ${
                  isSelected
                    ? 'bg-black text-white border-black font-medium shadow-xs'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400 hover:text-black'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-none font-mono ${
                    isSelected
                      ? 'bg-neutral-800 text-neutral-200'
                      : 'bg-neutral-100 text-neutral-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
