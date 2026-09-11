import React, { useMemo } from 'react';
import { Filter, RotateCcw, X, Flame, Shield, Users, Sparkles, SlidersHorizontal, SunMedium } from 'lucide-react';
import { MAFProduct } from '../../types';

export interface VatFilterState {
  steelGrade: 'all' | 'AISI 304' | 'AISI 430' | 'AISI 316' | 'Ст3';
  thickness: 'all' | '2 мм' | '3 мм' | '4 мм';
  capacityCategory: 'all' | 'small' | 'medium' | 'large';
  bowlShape: 'all' | 'round' | 'faceted' | 'ellipse';
  mounting: 'all' | 'stand' | 'built-in' | 'chains';
  heating: 'all' | 'internal-wood' | 'external-wood' | 'electric' | 'none';
  lighting: 'all' | 'yes' | 'no';
}

interface VatFiltersBarProps {
  products: MAFProduct[];
  filters: VatFilterState;
  onChange: (filters: VatFilterState) => void;
  onReset: () => void;
  totalMatching: number;
}

export const VatFiltersBar: React.FC<VatFiltersBarProps> = ({
  products,
  filters,
  onChange,
  onReset,
  totalMatching,
}) => {
  // Counts
  const gradeCounts = useMemo(() => {
    const counts = { all: products.length, 'AISI 304': 0, 'AISI 430': 0, 'AISI 316': 0, 'Ст3': 0 };
    products.forEach((p) => {
      const g = p.vatSteelGrade || (p.material.includes('AISI 304') ? 'AISI 304' : 'AISI 304');
      if (counts[g as keyof typeof counts] !== undefined) {
        counts[g as keyof typeof counts]++;
      }
    });
    return counts;
  }, [products]);

  const thicknessCounts = useMemo(() => {
    const counts = { all: products.length, '2 мм': 0, '3 мм': 0, '4 мм': 0 };
    products.forEach((p) => {
      const t = p.vatThickness || '3 мм';
      if (counts[t as keyof typeof counts] !== undefined) {
        counts[t as keyof typeof counts]++;
      }
    });
    return counts;
  }, [products]);

  const capacityCounts = useMemo(() => {
    const counts = { all: products.length, small: 0, medium: 0, large: 0 };
    products.forEach((p) => {
      const c = p.vatCapacityCategory || (p.name.includes('8') ? 'large' : p.name.includes('6') ? 'medium' : 'small');
      if (counts[c as keyof typeof counts] !== undefined) {
        counts[c as keyof typeof counts]++;
      }
    });
    return counts;
  }, [products]);

  const shapeCounts = useMemo(() => {
    const counts = { all: products.length, round: 0, faceted: 0, ellipse: 0 };
    products.forEach((p) => {
      const s = p.vatBowlShape || (p.name.includes('круглая') ? 'round' : 'faceted');
      if (counts[s as keyof typeof counts] !== undefined) {
        counts[s as keyof typeof counts]++;
      }
    });
    return counts;
  }, [products]);

  const mountingCounts = useMemo(() => {
    const counts = { all: products.length, stand: 0, 'built-in': 0, chains: 0 };
    products.forEach((p) => {
      const m = p.vatMounting || (p.name.includes('треноге') ? 'chains' : p.name.includes('Купель') ? 'built-in' : 'stand');
      if (counts[m as keyof typeof counts] !== undefined) {
        counts[m as keyof typeof counts]++;
      }
    });
    return counts;
  }, [products]);

  const heatingCounts = useMemo(() => {
    const counts = { all: products.length, 'internal-wood': 0, 'external-wood': 0, electric: 0, none: 0 };
    products.forEach((p) => {
      const h = p.vatHeating || (p.name.includes('гидромассажем') ? 'electric' : p.name.includes('топкой') ? 'internal-wood' : 'external-wood');
      if (counts[h as keyof typeof counts] !== undefined) {
        counts[h as keyof typeof counts]++;
      }
    });
    return counts;
  }, [products]);

  const lightingCounts = useMemo(() => {
    const counts = { all: products.length, yes: 0, no: 0 };
    products.forEach((p) => {
      if (p.vatLighting) counts.yes++;
      else counts.no++;
    });
    return counts;
  }, [products]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.steelGrade !== 'all') count++;
    if (filters.thickness !== 'all') count++;
    if (filters.capacityCategory !== 'all') count++;
    if (filters.bowlShape !== 'all') count++;
    if (filters.mounting !== 'all') count++;
    if (filters.heating !== 'all') count++;
    if (filters.lighting !== 'all') count++;
    return count;
  }, [filters]);

  return (
    <div className="border border-neutral-200 bg-[#FAFAFA] p-5 mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-neutral-200">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-black text-white flex items-center justify-center">
            <Flame className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-xs uppercase font-mono tracking-wider font-semibold text-neutral-900 flex items-center gap-2">
              <span>Параметры чанов и купелей</span>
              {activeFiltersCount > 0 && (
                <span className="px-1.5 py-0.2 bg-black text-white text-[10px] font-mono font-normal">
                  Активно: {activeFiltersCount}
                </span>
              )}
            </div>
            <p className="text-[11px] text-neutral-500 font-light mt-0.5">
              Подбор по маркам стали, толщине, вместимости, способу установки и системам нагрева
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

      {/* Grid of Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-xs">
        {/* Filter 1: Марка стали */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-2 flex items-center gap-1.5">
            <Shield className="w-3 h-3 text-neutral-400" />
            <span>Марка стали</span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'Все марки', count: gradeCounts.all },
              { id: 'AISI 304', label: 'AISI 304 (пищевая)', count: gradeCounts['AISI 304'] },
              { id: 'AISI 430', label: 'AISI 430', count: gradeCounts['AISI 430'] },
              { id: 'AISI 316', label: 'AISI 316 (морская)', count: gradeCounts['AISI 316'] },
              { id: 'Ст3', label: 'Ст3 / 09Г2С', count: gradeCounts['Ст3'] },
            ].map((btn) => {
              const active = filters.steelGrade === btn.id;
              return (
                <button
                  key={btn.id}
                  onClick={() => onChange({ ...filters, steelGrade: btn.id as any })}
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

        {/* Filter 2: Толщина металла */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-2 flex items-center gap-1.5">
            <SlidersHorizontal className="w-3 h-3 text-neutral-400" />
            <span>Толщина металла</span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'Все', count: thicknessCounts.all },
              { id: '2 мм', label: '2.0 мм', count: thicknessCounts['2 мм'] },
              { id: '3 мм', label: '3.0 мм (ГОСТ)', count: thicknessCounts['3 мм'] },
              { id: '4 мм', label: '4.0 мм (усиленный)', count: thicknessCounts['4 мм'] },
            ].map((btn) => {
              const active = filters.thickness === btn.id;
              return (
                <button
                  key={btn.id}
                  onClick={() => onChange({ ...filters, thickness: btn.id as any })}
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

        {/* Filter 3: Размеры, объем и вместимость */}
        <div className="lg:col-span-2">
          <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-2 flex items-center gap-1.5">
            <Users className="w-3 h-3 text-neutral-400" />
            <span>Размеры, объем и вместимость</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              {
                id: 'all',
                label: 'Все размеры',
                sub: 'Любая вместимость',
                count: capacityCounts.all,
              },
              {
                id: 'small',
                label: 'Малые (2–4 чел)',
                sub: 'диаметр 1700–1800 мм',
                count: capacityCounts.small,
              },
              {
                id: 'medium',
                label: 'Средние (4–6 чел)',
                sub: 'диаметр 1900–2100 мм',
                count: capacityCounts.medium,
              },
              {
                id: 'large',
                label: 'Большие (8–10 чел)',
                sub: 'диаметр от 2300 мм',
                count: capacityCounts.large,
              },
            ].map((btn) => {
              const active = filters.capacityCategory === btn.id;
              return (
                <button
                  key={btn.id}
                  onClick={() => onChange({ ...filters, capacityCategory: btn.id as any })}
                  className={`p-2 font-mono text-left transition-colors cursor-pointer border ${
                    active
                      ? 'bg-black text-white border-black font-medium'
                      : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs">{btn.label}</span>
                    <span className={`text-[10px] ${active ? 'text-neutral-300' : 'text-neutral-400'}`}>
                      {btn.count}
                    </span>
                  </div>
                  <div className={`text-[10px] mt-0.5 ${active ? 'text-neutral-300' : 'text-neutral-400'}`}>
                    {btn.sub}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Row 2: Конструктивные особенности и комплектация */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 text-xs pt-4 mt-4 border-t border-neutral-200">
        {/* Форма чаши */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-2">
            Форма чаши
          </label>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'Все', count: shapeCounts.all },
              { id: 'round', label: 'Круглая', count: shapeCounts.round },
              { id: 'faceted', label: 'Многогранная', count: shapeCounts.faceted },
              { id: 'ellipse', label: 'Эллипс', count: shapeCounts.ellipse },
            ].map((btn) => {
              const active = filters.bowlShape === btn.id;
              return (
                <button
                  key={btn.id}
                  onClick={() => onChange({ ...filters, bowlShape: btn.id as any })}
                  className={`px-2.5 py-1 font-mono text-xs transition-colors flex items-center gap-1 cursor-pointer border ${
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

        {/* Способ установки */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-2">
            Способ установки
          </label>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'Все', count: mountingCounts.all },
              { id: 'stand', label: 'На подставке', count: mountingCounts.stand },
              { id: 'built-in', label: 'Встраиваемая', count: mountingCounts['built-in'] },
              { id: 'chains', label: 'На треноге/цепях', count: mountingCounts.chains },
            ].map((btn) => {
              const active = filters.mounting === btn.id;
              return (
                <button
                  key={btn.id}
                  onClick={() => onChange({ ...filters, mounting: btn.id as any })}
                  className={`px-2.5 py-1 font-mono text-xs transition-colors flex items-center gap-1 cursor-pointer border ${
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

        {/* Система нагрева */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-2">
            Система нагрева
          </label>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'Все', count: heatingCounts.all },
              { id: 'internal-wood', label: 'Внутренняя печь', count: heatingCounts['internal-wood'] },
              { id: 'external-wood', label: 'Внешняя печь', count: heatingCounts['external-wood'] },
              { id: 'electric', label: 'Электронагрев', count: heatingCounts.electric },
              { id: 'none', label: 'Без печи (холодная)', count: heatingCounts.none },
            ].map((btn) => {
              const active = filters.heating === btn.id;
              return (
                <button
                  key={btn.id}
                  onClick={() => onChange({ ...filters, heating: btn.id as any })}
                  className={`px-2 py-1 font-mono text-xs transition-colors flex items-center gap-1 cursor-pointer border ${
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

        {/* Подсветка: да / нет */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-2 flex items-center gap-1">
            <SunMedium className="w-3 h-3 text-neutral-400" />
            <span>Подсветка</span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'Все', count: lightingCounts.all },
              { id: 'yes', label: 'Да (LED)', count: lightingCounts.yes },
              { id: 'no', label: 'Нет', count: lightingCounts.no },
            ].map((btn) => {
              const active = filters.lighting === btn.id;
              return (
                <button
                  key={btn.id}
                  onClick={() => onChange({ ...filters, lighting: btn.id as any })}
                  className={`px-3 py-1 font-mono text-xs transition-colors flex items-center gap-1.5 cursor-pointer border ${
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
          {filters.steelGrade !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-neutral-200 text-neutral-900">
              <span>Сталь: {filters.steelGrade}</span>
              <button onClick={() => onChange({ ...filters, steelGrade: 'all' })} className="hover:text-black cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.thickness !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-neutral-200 text-neutral-900">
              <span>Толщина: {filters.thickness}</span>
              <button onClick={() => onChange({ ...filters, thickness: 'all' })} className="hover:text-black cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.capacityCategory !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-neutral-200 text-neutral-900">
              <span>Вместимость: {filters.capacityCategory}</span>
              <button onClick={() => onChange({ ...filters, capacityCategory: 'all' })} className="hover:text-black cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.bowlShape !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-neutral-200 text-neutral-900">
              <span>Форма: {filters.bowlShape}</span>
              <button onClick={() => onChange({ ...filters, bowlShape: 'all' })} className="hover:text-black cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.mounting !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-neutral-200 text-neutral-900">
              <span>Установка: {filters.mounting}</span>
              <button onClick={() => onChange({ ...filters, mounting: 'all' })} className="hover:text-black cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.heating !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-neutral-200 text-neutral-900">
              <span>Нагрев: {filters.heating}</span>
              <button onClick={() => onChange({ ...filters, heating: 'all' })} className="hover:text-black cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.lighting !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-neutral-200 text-neutral-900">
              <span>Подсветка: {filters.lighting === 'yes' ? 'Да' : 'Нет'}</span>
              <button onClick={() => onChange({ ...filters, lighting: 'all' })} className="hover:text-black cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};
