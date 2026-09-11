import React, { useMemo } from 'react';
import { Filter, RotateCcw, X, Layers, ArrowDownUp, Ruler, Compass } from 'lucide-react';
import { MAFProduct } from '../types';

export interface SlidesFilterState {
  slideType: 'all' | 'open' | 'closed';
  slideForm: 'all' | 'straight' | 'curved' | 'spiral';
  heightPreset: 'all' | 'low' | 'mid' | 'high' | 'tower';
  exactHeight: string;
  lengthPreset: 'all' | 'short' | 'mid' | 'long' | 'extra';
  exactLength: string;
}

interface SlidesFilterBarProps {
  slides: MAFProduct[];
  filters: SlidesFilterState;
  onChange: (newFilters: SlidesFilterState) => void;
  onReset: () => void;
  totalMatching: number;
}

export const SlidesFilterBar: React.FC<SlidesFilterBarProps> = ({
  slides,
  filters,
  onChange,
  onReset,
  totalMatching,
}) => {
  // Extract all unique heights and lengths available
  const availableHeights = useMemo(() => {
    const set = new Set<number>();
    slides.forEach((s) => {
      if (s.slideHeight) set.add(s.slideHeight);
    });
    return Array.from(set).sort((a, b) => a - b);
  }, [slides]);

  const availableLengths = useMemo(() => {
    const set = new Set<number>();
    slides.forEach((s) => {
      if (s.slideLength) set.add(s.slideLength);
    });
    return Array.from(set).sort((a, b) => a - b);
  }, [slides]);

  // Counts for Type
  const typeCounts = useMemo(() => {
    const counts = { all: slides.length, open: 0, closed: 0 };
    slides.forEach((s) => {
      if (s.slideType === 'open') counts.open++;
      if (s.slideType === 'closed') counts.closed++;
    });
    return counts;
  }, [slides]);

  // Counts for Form
  const formCounts = useMemo(() => {
    const counts = { all: slides.length, straight: 0, curved: 0, spiral: 0 };
    slides.forEach((s) => {
      if (s.slideForm === 'straight') counts.straight++;
      if (s.slideForm === 'curved') counts.curved++;
      if (s.slideForm === 'spiral') counts.spiral++;
    });
    return counts;
  }, [slides]);

  // Counts for Height Presets
  const heightCounts = useMemo(() => {
    const counts = { all: slides.length, low: 0, mid: 0, high: 0, tower: 0 };
    slides.forEach((s) => {
      const h = s.slideHeight || (s.dimensions.height / 1000);
      if (h <= 1.05) counts.low++;
      else if (h <= 1.95) counts.mid++;
      else if (h <= 3.05) counts.high++;
      else counts.tower++;
    });
    return counts;
  }, [slides]);

  // Counts for Length Presets
  const lengthCounts = useMemo(() => {
    const counts = { all: slides.length, short: 0, mid: 0, long: 0, extra: 0 };
    slides.forEach((s) => {
      const l = s.slideLength || (s.dimensions.length / 1000);
      if (l <= 2.5) counts.short++;
      else if (l <= 4.5) counts.mid++;
      else if (l <= 7.0) counts.long++;
      else counts.extra++;
    });
    return counts;
  }, [slides]);

  // Check if any filter is active
  const hasActiveFilters = 
    filters.slideType !== 'all' ||
    filters.slideForm !== 'all' ||
    filters.heightPreset !== 'all' ||
    filters.exactHeight !== 'all' ||
    filters.lengthPreset !== 'all' ||
    filters.exactLength !== 'all';

  return (
    <div className="bg-neutral-50/80 border border-neutral-200 p-5 sm:p-7 mb-8 space-y-6">
      {/* Header bar of filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-black text-white flex items-center justify-center">
            <Filter className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
              [ Инженерный конфигуратор / номенклатура geon.pro ]
            </div>
            <h3 className="text-sm sm:text-base font-medium text-neutral-900">
              Фильтры параметров скатов для детских горок
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-neutral-500">
            Найдено: <strong className="text-neutral-900 font-semibold">{totalMatching}</strong> из {slides.length} моделей
          </span>
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-neutral-300 bg-white text-neutral-700 hover:text-black hover:border-black transition-colors cursor-pointer text-[11px]"
              title="Сбросить все параметры"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Сбросить</span>
            </button>
          )}
        </div>
      </div>

      {/* 4 Core Filters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* 1. ТИП (открытая / закрытая) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-neutral-400" />
              <span>Тип ската</span>
            </label>
            {filters.slideType !== 'all' && (
              <button
                data-no-hover="true"
                onClick={() => onChange({ ...filters, slideType: 'all' })}
                className="text-[10px] font-mono text-neutral-400 hover:text-black cursor-pointer"
              >
                сброс
              </button>
            )}
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={() => onChange({ ...filters, slideType: 'all' })}
              className={`px-2.5 py-2 text-xs font-mono text-center transition-colors cursor-pointer border ${
                filters.slideType === 'all'
                  ? 'bg-black text-white border-black font-medium'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
              }`}
            >
              <div className="truncate">Все</div>
              <div className={`text-[10px] ${filters.slideType === 'all' ? 'text-neutral-300' : 'text-neutral-400'}`}>
                {typeCounts.all}
              </div>
            </button>

            <button
              onClick={() => onChange({ ...filters, slideType: 'open' })}
              className={`px-2.5 py-2 text-xs font-mono text-center transition-colors cursor-pointer border ${
                filters.slideType === 'open'
                  ? 'bg-black text-white border-black font-medium'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
              }`}
            >
              <div className="truncate">Открытая</div>
              <div className={`text-[10px] ${filters.slideType === 'open' ? 'text-neutral-300' : 'text-neutral-400'}`}>
                {typeCounts.open}
              </div>
            </button>

            <button
              onClick={() => onChange({ ...filters, slideType: 'closed' })}
              className={`px-2.5 py-2 text-xs font-mono text-center transition-colors cursor-pointer border ${
                filters.slideType === 'closed'
                  ? 'bg-black text-white border-black font-medium'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
              }`}
            >
              <div className="truncate">Закрытая</div>
              <div className={`text-[10px] ${filters.slideType === 'closed' ? 'text-neutral-300' : 'text-neutral-400'}`}>
                {typeCounts.closed}
              </div>
            </button>
          </div>
          <div className="text-[10px] text-neutral-400 font-sans leading-tight">
            Открытые — плоские и лотковые желоба; закрытые — трубы Ø800 мм
          </div>
        </div>

        {/* 2. ФОРМА (прямая, с изгибом, спиральная) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-neutral-400" />
              <span>Форма ската</span>
            </label>
            {filters.slideForm !== 'all' && (
              <button
                data-no-hover="true"
                onClick={() => onChange({ ...filters, slideForm: 'all' })}
                className="text-[10px] font-mono text-neutral-400 hover:text-black cursor-pointer"
              >
                сброс
              </button>
            )}
          </div>

          <div className="grid grid-cols-4 gap-1">
            <button
              onClick={() => onChange({ ...filters, slideForm: 'all' })}
              className={`px-1.5 py-2 text-xs font-mono text-center transition-colors cursor-pointer border ${
                filters.slideForm === 'all'
                  ? 'bg-black text-white border-black font-medium'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
              }`}
            >
              <div className="truncate">Все</div>
              <div className={`text-[10px] ${filters.slideForm === 'all' ? 'text-neutral-300' : 'text-neutral-400'}`}>
                {formCounts.all}
              </div>
            </button>

            <button
              onClick={() => onChange({ ...filters, slideForm: 'straight' })}
              className={`px-1.5 py-2 text-xs font-mono text-center transition-colors cursor-pointer border ${
                filters.slideForm === 'straight'
                  ? 'bg-black text-white border-black font-medium'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
              }`}
              title="Прямые скаты"
            >
              <div className="truncate">Прямая</div>
              <div className={`text-[10px] ${filters.slideForm === 'straight' ? 'text-neutral-300' : 'text-neutral-400'}`}>
                {formCounts.straight}
              </div>
            </button>

            <button
              onClick={() => onChange({ ...filters, slideForm: 'curved' })}
              className={`px-1.5 py-2 text-xs font-mono text-center transition-colors cursor-pointer border ${
                filters.slideForm === 'curved'
                  ? 'bg-black text-white border-black font-medium'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
              }`}
              title="С поворотом 65°–200°, волновые, S-образные"
            >
              <div className="truncate">С изгибом</div>
              <div className={`text-[10px] ${filters.slideForm === 'curved' ? 'text-neutral-300' : 'text-neutral-400'}`}>
                {formCounts.curved}
              </div>
            </button>

            <button
              onClick={() => onChange({ ...filters, slideForm: 'spiral' })}
              className={`px-1.5 py-2 text-xs font-mono text-center transition-colors cursor-pointer border ${
                filters.slideForm === 'spiral'
                  ? 'bg-black text-white border-black font-medium'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
              }`}
              title="Спиральные винтовые 270°–450°"
            >
              <div className="truncate">Спираль</div>
              <div className={`text-[10px] ${filters.slideForm === 'spiral' ? 'text-neutral-300' : 'text-neutral-400'}`}>
                {formCounts.spiral}
              </div>
            </button>
          </div>
          <div className="text-[10px] text-neutral-400 font-sans leading-tight">
            Прямые, поворотные 65°–200° и винтовые спиральные до 450°
          </div>
        </div>

        {/* 3. ВЫСОТА (h) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
              <ArrowDownUp className="w-3.5 h-3.5 text-neutral-400" />
              <span>Высота старта (h)</span>
            </label>
            {(filters.heightPreset !== 'all' || filters.exactHeight !== 'all') && (
              <button
                data-no-hover="true"
                onClick={() => onChange({ ...filters, heightPreset: 'all', exactHeight: 'all' })}
                className="text-[10px] font-mono text-neutral-400 hover:text-black cursor-pointer"
              >
                сброс
              </button>
            )}
          </div>

          <div className="grid grid-cols-4 gap-1">
            <button
              onClick={() => onChange({ ...filters, heightPreset: 'low', exactHeight: 'all' })}
              className={`px-1 py-1.5 text-[11px] font-mono text-center transition-colors cursor-pointer border ${
                filters.heightPreset === 'low' && filters.exactHeight === 'all'
                  ? 'bg-black text-white border-black font-medium'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
              }`}
            >
              <div className="truncate">≤ 1.0 м</div>
              <div className={`text-[9px] ${filters.heightPreset === 'low' ? 'text-neutral-300' : 'text-neutral-400'}`}>
                {heightCounts.low}
              </div>
            </button>

            <button
              onClick={() => onChange({ ...filters, heightPreset: 'mid', exactHeight: 'all' })}
              className={`px-1 py-1.5 text-[11px] font-mono text-center transition-colors cursor-pointer border ${
                filters.heightPreset === 'mid' && filters.exactHeight === 'all'
                  ? 'bg-black text-white border-black font-medium'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
              }`}
            >
              <div className="truncate">1.2–1.9</div>
              <div className={`text-[9px] ${filters.heightPreset === 'mid' ? 'text-neutral-300' : 'text-neutral-400'}`}>
                {heightCounts.mid}
              </div>
            </button>

            <button
              onClick={() => onChange({ ...filters, heightPreset: 'high', exactHeight: 'all' })}
              className={`px-1 py-1.5 text-[11px] font-mono text-center transition-colors cursor-pointer border ${
                filters.heightPreset === 'high' && filters.exactHeight === 'all'
                  ? 'bg-black text-white border-black font-medium'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
              }`}
            >
              <div className="truncate">2.0–3.0</div>
              <div className={`text-[9px] ${filters.heightPreset === 'high' ? 'text-neutral-300' : 'text-neutral-400'}`}>
                {heightCounts.high}
              </div>
            </button>

            <button
              onClick={() => onChange({ ...filters, heightPreset: 'tower', exactHeight: 'all' })}
              className={`px-1 py-1.5 text-[11px] font-mono text-center transition-colors cursor-pointer border ${
                filters.heightPreset === 'tower' && filters.exactHeight === 'all'
                  ? 'bg-black text-white border-black font-medium'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
              }`}
            >
              <div className="truncate">≥ 3.2 м</div>
              <div className={`text-[9px] ${filters.heightPreset === 'tower' ? 'text-neutral-300' : 'text-neutral-400'}`}>
                {heightCounts.tower}
              </div>
            </button>
          </div>

          {/* Exact Height Selector */}
          <select
            value={filters.exactHeight}
            onChange={(e) => onChange({ ...filters, exactHeight: e.target.value, heightPreset: 'all' })}
            className="w-full px-2.5 py-1.5 bg-white border border-neutral-200 text-xs text-neutral-800 font-mono focus:outline-none focus:border-black cursor-pointer"
          >
            <option value="all">Точная высота (любая)</option>
            {availableHeights.map((h) => (
              <option key={h} value={h.toString()}>
                h = {h.toFixed(1)} м ({slides.filter((s) => s.slideHeight === h).length} поз.)
              </option>
            ))}
          </select>
        </div>

        {/* 4. ДЛИНА (L) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
              <Ruler className="w-3.5 h-3.5 text-neutral-400" />
              <span>Длина ската (L)</span>
            </label>
            {(filters.lengthPreset !== 'all' || filters.exactLength !== 'all') && (
              <button
                data-no-hover="true"
                onClick={() => onChange({ ...filters, lengthPreset: 'all', exactLength: 'all' })}
                className="text-[10px] font-mono text-neutral-400 hover:text-black cursor-pointer"
              >
                сброс
              </button>
            )}
          </div>

          <div className="grid grid-cols-4 gap-1">
            <button
              onClick={() => onChange({ ...filters, lengthPreset: 'short', exactLength: 'all' })}
              className={`px-1 py-1.5 text-[11px] font-mono text-center transition-colors cursor-pointer border ${
                filters.lengthPreset === 'short' && filters.exactLength === 'all'
                  ? 'bg-black text-white border-black font-medium'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
              }`}
            >
              <div className="truncate">≤ 2.5 м</div>
              <div className={`text-[9px] ${filters.lengthPreset === 'short' ? 'text-neutral-300' : 'text-neutral-400'}`}>
                {lengthCounts.short}
              </div>
            </button>

            <button
              onClick={() => onChange({ ...filters, lengthPreset: 'mid', exactLength: 'all' })}
              className={`px-1 py-1.5 text-[11px] font-mono text-center transition-colors cursor-pointer border ${
                filters.lengthPreset === 'mid' && filters.exactLength === 'all'
                  ? 'bg-black text-white border-black font-medium'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
              }`}
            >
              <div className="truncate">2.6–4.5</div>
              <div className={`text-[9px] ${filters.lengthPreset === 'mid' ? 'text-neutral-300' : 'text-neutral-400'}`}>
                {lengthCounts.mid}
              </div>
            </button>

            <button
              onClick={() => onChange({ ...filters, lengthPreset: 'long', exactLength: 'all' })}
              className={`px-1 py-1.5 text-[11px] font-mono text-center transition-colors cursor-pointer border ${
                filters.lengthPreset === 'long' && filters.exactLength === 'all'
                  ? 'bg-black text-white border-black font-medium'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
              }`}
            >
              <div className="truncate">4.6–7.0</div>
              <div className={`text-[9px] ${filters.lengthPreset === 'long' ? 'text-neutral-300' : 'text-neutral-400'}`}>
                {lengthCounts.long}
              </div>
            </button>

            <button
              onClick={() => onChange({ ...filters, lengthPreset: 'extra', exactLength: 'all' })}
              className={`px-1 py-1.5 text-[11px] font-mono text-center transition-colors cursor-pointer border ${
                filters.lengthPreset === 'extra' && filters.exactLength === 'all'
                  ? 'bg-black text-white border-black font-medium'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
              }`}
            >
              <div className="truncate">≥ 7.1 м</div>
              <div className={`text-[9px] ${filters.lengthPreset === 'extra' ? 'text-neutral-300' : 'text-neutral-400'}`}>
                {lengthCounts.extra}
              </div>
            </button>
          </div>

          {/* Exact Length Selector */}
          <select
            value={filters.exactLength}
            onChange={(e) => onChange({ ...filters, exactLength: e.target.value, lengthPreset: 'all' })}
            className="w-full px-2.5 py-1.5 bg-white border border-neutral-200 text-xs text-neutral-800 font-mono focus:outline-none focus:border-black cursor-pointer"
          >
            <option value="all">Точная длина полотна (любая)</option>
            {availableLengths.map((l) => (
              <option key={l} value={l.toString()}>
                L = {l.toFixed(1)} м ({slides.filter((s) => s.slideLength === l).length} поз.)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filter Badges Bar */}
      {hasActiveFilters && (
        <div className="pt-3 border-t border-neutral-200 flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="text-neutral-400 text-[11px]">Выбрано:</span>

          {filters.slideType !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-900 text-white text-[11px]">
              <span>Тип: {filters.slideType === 'open' ? 'Открытая' : 'Закрытая'}</span>
              <button
                onClick={() => onChange({ ...filters, slideType: 'all' })}
                className="hover:text-neutral-300 cursor-pointer ml-1"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.slideForm !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-900 text-white text-[11px]">
              <span>
                Форма:{' '}
                {filters.slideForm === 'straight'
                  ? 'Прямая'
                  : filters.slideForm === 'curved'
                  ? 'С изгибом'
                  : 'Спиральная'}
              </span>
              <button
                onClick={() => onChange({ ...filters, slideForm: 'all' })}
                className="hover:text-neutral-300 cursor-pointer ml-1"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.exactHeight !== 'all' ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-900 text-white text-[11px]">
              <span>Высота: h = {filters.exactHeight} м</span>
              <button
                onClick={() => onChange({ ...filters, exactHeight: 'all' })}
                className="hover:text-neutral-300 cursor-pointer ml-1"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ) : filters.heightPreset !== 'all' ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-900 text-white text-[11px]">
              <span>
                Высота:{' '}
                {filters.heightPreset === 'low'
                  ? 'до 1.0 м'
                  : filters.heightPreset === 'mid'
                  ? '1.2 – 1.9 м'
                  : filters.heightPreset === 'high'
                  ? '2.0 – 3.0 м'
                  : 'от 3.2 м'}
              </span>
              <button
                onClick={() => onChange({ ...filters, heightPreset: 'all' })}
                className="hover:text-neutral-300 cursor-pointer ml-1"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ) : null}

          {filters.exactLength !== 'all' ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-900 text-white text-[11px]">
              <span>Длина: L = {filters.exactLength} м</span>
              <button
                onClick={() => onChange({ ...filters, exactLength: 'all' })}
                className="hover:text-neutral-300 cursor-pointer ml-1"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ) : filters.lengthPreset !== 'all' ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-900 text-white text-[11px]">
              <span>
                Длина:{' '}
                {filters.lengthPreset === 'short'
                  ? 'до 2.5 м'
                  : filters.lengthPreset === 'mid'
                  ? '2.6 – 4.5 м'
                  : filters.lengthPreset === 'long'
                  ? '4.6 – 7.0 м'
                  : 'от 7.1 м'}
              </span>
              <button
                onClick={() => onChange({ ...filters, lengthPreset: 'all' })}
                className="hover:text-neutral-300 cursor-pointer ml-1"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ) : null}

          <button
            onClick={onReset}
            className="text-[11px] text-neutral-500 hover:text-black underline cursor-pointer ml-2"
          >
            Сбросить все
          </button>
        </div>
      )}
    </div>
  );
};
