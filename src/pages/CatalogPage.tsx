import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Search, 
  X, 
  ArrowUpRight, 
  ArrowLeft,
  Filter,
  SlidersHorizontal,
  Check,
  ChevronRight,
  Calculator,
  Compass,
  Building2,
  Layers,
  Sparkles,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { MAF_PRODUCTS, RAL_PALETTE } from '../data/factoryData';
import { MAFProduct, RALColor } from '../types';
import { SlidesFilterBar, SlidesFilterState } from '../components/SlidesFilterBar';
import { useEstimate } from '../context/EstimateContext';

interface CatalogPageProps {
  initialCategory?: string;
  onBackToHome?: () => void;
  onOpenCalculator?: () => void;
  onOpenMeasurerModal?: () => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  initialCategory,
  onBackToHome,
  onOpenCalculator,
  onOpenMeasurerModal,
}) => {
  const params = useParams<{ category?: string }>();
  const navigate = useNavigate();

  const normalizeCategory = (cat: string): string => {
    if (cat === 'slides' || cat === 'geon-slides') return 'slides';
    if (cat === 'bike' || cat === 'bike-racks') return 'bike';
    if (['furniture', 'benches', 'urns', 'pergolas', 'gazebos', 'loungers', 'swings', 'tables'].includes(cat)) {
      return 'furniture';
    }
    if (['playgrounds', 'sportPlay'].includes(cat)) {
      return 'playgrounds';
    }
    if (cat === 'vats') return 'vats';
    if (['metal-structures', 'fences', 'treeGrates', 'artObjects', 'lighting'].includes(cat)) {
      return 'metal-structures';
    }
    return cat;
  };

  const activeCategoryParam = params.category || initialCategory || 'all';

  const [selectedCategory, setSelectedCategory] = useState<string>(
    normalizeCategory(activeCategoryParam)
  );

  useEffect(() => {
    if (params.category) {
      setSelectedCategory(normalizeCategory(params.category));
    } else if (initialCategory) {
      setSelectedCategory(normalizeCategory(initialCategory));
    }
  }, [params.category, initialCategory]);

  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      navigate('/catalog');
    } else {
      navigate(`/catalog/${catId}`);
    }
  };
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'default' | 'weight-desc' | 'name-asc'>('default');

  const { addItem, isInEstimate, getItemQuantity, setCalculatingProduct } = useEstimate();

  // Slide specific filter state
  const initialSlideFilters: SlidesFilterState = {
    slideType: 'all',
    slideForm: 'all',
    heightPreset: 'all',
    exactHeight: 'all',
    lengthPreset: 'all',
    exactLength: 'all',
  };
  const [slideFilters, setSlideFilters] = useState<SlidesFilterState>(initialSlideFilters);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(normalizeCategory(initialCategory));
    }
  }, [initialCategory]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const categories = [
    { id: 'all', label: 'Все изделия' },
    { id: 'slides', label: 'Скаты для горок' },
    { id: 'bike', label: 'Парковки для велосипедов' },
    { id: 'furniture', label: 'Уличная мебель' },
    { id: 'playgrounds', label: 'Оборудование для детских площадок' },
    { id: 'vats', label: 'Чаны и купели' },
    { id: 'metal-structures', label: 'Изделия из нержавеющей стали' },
  ];

  const allSlides = useMemo(() => {
    return MAF_PRODUCTS.filter((p) => p.category === 'slides');
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: MAF_PRODUCTS.length };
    categories.forEach((c) => {
      counts[c.id] = 0;
    });
    counts['all'] = MAF_PRODUCTS.length;
    MAF_PRODUCTS.forEach((p) => {
      const prim = normalizeCategory(p.category);
      counts[prim] = (counts[prim] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter slides specifically for count matching
  const matchingSlidesCount = useMemo(() => {
    return allSlides.filter((p) => {
      if (slideFilters.slideType !== 'all' && p.slideType && p.slideType !== slideFilters.slideType) {
        return false;
      }
      if (slideFilters.slideForm !== 'all' && p.slideForm && p.slideForm !== slideFilters.slideForm) {
        return false;
      }
      // Height filter
      if (slideFilters.exactHeight !== 'all') {
        const targetH = parseFloat(slideFilters.exactHeight);
        const h = p.slideHeight || (p.dimensions.height / 1000);
        if (Math.abs(h - targetH) > 0.05) return false;
      } else if (slideFilters.heightPreset !== 'all') {
        const h = p.slideHeight || (p.dimensions.height / 1000);
        if (slideFilters.heightPreset === 'low' && h > 1.05) return false;
        if (slideFilters.heightPreset === 'mid' && (h < 1.05 || h > 1.95)) return false;
        if (slideFilters.heightPreset === 'high' && (h < 1.95 || h > 3.05)) return false;
        if (slideFilters.heightPreset === 'tower' && h <= 3.05) return false;
      }
      // Length filter
      if (slideFilters.exactLength !== 'all') {
        const targetL = parseFloat(slideFilters.exactLength);
        const l = p.slideLength || (p.dimensions.length / 1000);
        if (Math.abs(l - targetL) > 0.1) return false;
      } else if (slideFilters.lengthPreset !== 'all') {
        const l = p.slideLength || (p.dimensions.length / 1000);
        if (slideFilters.lengthPreset === 'short' && l > 2.5) return false;
        if (slideFilters.lengthPreset === 'mid' && (l < 2.5 || l > 4.5)) return false;
        if (slideFilters.lengthPreset === 'long' && (l < 4.5 || l > 7.0)) return false;
        if (slideFilters.lengthPreset === 'extra' && l <= 7.0) return false;
      }
      return true;
    }).length;
  }, [allSlides, slideFilters]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = MAF_PRODUCTS.filter((p) => {
      const isSlide = p.category === 'slides';
      const matchesCategory =
        selectedCategory === 'all' ||
        normalizeCategory(p.category) === selectedCategory ||
        p.category === selectedCategory;

      if (!matchesCategory) return false;

      // Apply slide filters if user selected 'slides'
      if (isSlide && selectedCategory === 'slides') {
        if (slideFilters.slideType !== 'all' && p.slideType && p.slideType !== slideFilters.slideType) {
          return false;
        }
        if (slideFilters.slideForm !== 'all' && p.slideForm && p.slideForm !== slideFilters.slideForm) {
          return false;
        }
        // Height filter
        if (slideFilters.exactHeight !== 'all') {
          const targetH = parseFloat(slideFilters.exactHeight);
          const h = p.slideHeight || (p.dimensions.height / 1000);
          if (Math.abs(h - targetH) > 0.05) return false;
        } else if (slideFilters.heightPreset !== 'all') {
          const h = p.slideHeight || (p.dimensions.height / 1000);
          if (slideFilters.heightPreset === 'low' && h > 1.05) return false;
          if (slideFilters.heightPreset === 'mid' && (h < 1.05 || h > 1.95)) return false;
          if (slideFilters.heightPreset === 'high' && (h < 1.95 || h > 3.05)) return false;
          if (slideFilters.heightPreset === 'tower' && h <= 3.05) return false;
        }
        // Length filter
        if (slideFilters.exactLength !== 'all') {
          const targetL = parseFloat(slideFilters.exactLength);
          const l = p.slideLength || (p.dimensions.length / 1000);
          if (Math.abs(l - targetL) > 0.1) return false;
        } else if (slideFilters.lengthPreset !== 'all') {
          const l = p.slideLength || (p.dimensions.length / 1000);
          if (slideFilters.lengthPreset === 'short' && l > 2.5) return false;
          if (slideFilters.lengthPreset === 'mid' && (l < 2.5 || l > 4.5)) return false;
          if (slideFilters.lengthPreset === 'long' && (l < 4.5 || l > 7.0)) return false;
          if (slideFilters.lengthPreset === 'extra' && l <= 7.0) return false;
        }
      }

      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      const matchesQuery = 
        p.name.toLowerCase().includes(q) ||
        p.article.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        (p.slideTypeLabel && p.slideTypeLabel.toLowerCase().includes(q)) ||
        (p.slideFormLabel && p.slideFormLabel.toLowerCase().includes(q));
      return matchesQuery;
    });

    if (sortBy === 'weight-desc') {
      result = [...result].sort((a, b) => b.weight - a.weight);
    } else if (sortBy === 'name-asc') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name, 'ru'));
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy, slideFilters]);

  return (
    <div className="bg-white min-h-screen">
      {/* Top Breadcrumbs Bar */}
      <div className="border-b border-neutral-200 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-neutral-500">
            <button
              onClick={onBackToHome}
              className="hover:text-black transition-colors cursor-pointer"
            >
              Главная
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-neutral-900 font-medium">Каталог МАФ</span>
            {selectedCategory !== 'all' && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                <span className="text-neutral-600">
                  {categories.find((c) => c.id === selectedCategory)?.label}
                </span>
              </>
            )}
          </div>

          <button
            onClick={onBackToHome}
            className="hidden sm:inline-flex items-center gap-1.5 text-neutral-600 hover:text-black transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Вернуться на главную</span>
          </button>
        </div>
      </div>

      {/* Page Header (Polestar Minimalist Header) */}
      <div className="border-b border-neutral-200 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-400 mb-3">
                [ 01 / Номенклатура завода «Стальное Дело» ]
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light text-neutral-900 tracking-tight mb-4">
                Каталог малых архитектурных форм
              </h1>
              <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed max-w-2xl">
                Сертифицированное производство парковой мебели, навесов, пергол и ограждений для благоустройства общественных пространств, девелоперских комплексов и набережных Санкт-Петербурга.
              </p>
            </div>

            {/* Industrial Fast-Fact Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              <div className="border border-neutral-200 bg-neutral-50 p-3.5">
                <div className="text-xl font-normal text-neutral-900">6</div>
                <div className="text-[10px] uppercase text-neutral-400 mt-0.5">Направлений продукции</div>
              </div>
              <div className="border border-neutral-200 bg-neutral-50 p-3.5">
                <div className="text-xl font-normal text-neutral-900">140+</div>
                <div className="text-[10px] uppercase text-neutral-400 mt-0.5">Серийных позиций</div>
              </div>
              <div className="border border-neutral-200 bg-neutral-50 p-3.5">
                <div className="text-xl font-normal text-neutral-900">RAL</div>
                <div className="text-[10px] uppercase text-neutral-400 mt-0.5">215+ цветов муара</div>
              </div>
              <div className="border border-neutral-200 bg-neutral-50 p-3.5">
                <div className="text-xl font-normal text-neutral-900">от 5 дн</div>
                <div className="text-[10px] uppercase text-neutral-400 mt-0.5">Срок изготовления</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area: Controls, Filters & Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Search & Sort Controls Bar */}
        <div className="pb-6 border-b border-neutral-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по названию, артикулу, материалу..."
              className="w-full pl-10 pr-9 py-2.5 bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Results Count & Sort Dropdown */}
          <div className="flex items-center justify-between md:justify-end gap-4 text-xs font-mono">
            <span className="text-neutral-400">
              Найдено: <strong className="text-neutral-900 font-semibold">{filteredAndSortedProducts.length}</strong>
            </span>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-black transition-colors cursor-pointer"
              >
                <option value="default">По умолчанию</option>
                <option value="weight-desc">По массе изделия</option>
                <option value="name-asc">По названию (А–Я)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs Bar */}
        <div className="py-4 border-b border-neutral-200 overflow-x-auto scrollbar-none mb-6">
          <div className="flex items-center gap-1.5 min-w-max">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-black text-white font-medium'
                      : 'bg-neutral-50 text-neutral-600 border border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`font-mono text-[10px] ${isActive ? 'text-neutral-300' : 'text-neutral-400'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dedicated Slide Filter Bar when "Скаты для горок" category is active */}
        {selectedCategory === 'slides' && (
          <SlidesFilterBar
            slides={allSlides}
            filters={slideFilters}
            onChange={(newFilters) => setSlideFilters(newFilters)}
            onReset={() => setSlideFilters(initialSlideFilters)}
            totalMatching={matchingSlidesCount}
          />
        )}

        {/* Empty State when no results */}
        {filteredAndSortedProducts.length === 0 && (
          <div className="py-24 text-center border-b border-neutral-200">
            <div className="w-12 h-12 border border-neutral-300 flex items-center justify-center mx-auto mb-4 text-neutral-400">
              <Filter className="w-6 h-6" />
            </div>
            <p className="text-neutral-800 text-base font-medium mb-1">
              По вашему запросу ничего не найдено
            </p>
            <p className="text-neutral-500 text-xs mb-6 max-w-sm mx-auto font-light">
              Попробуйте изменить параметры поиска или сбросить активные фильтры.
            </p>
            <button
              onClick={() => { 
                setSelectedCategory('all'); 
                setSearchQuery(''); 
                setSlideFilters(initialSlideFilters);
              }}
              className="px-6 py-2.5 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Сбросить фильтры
            </button>
          </div>
        )}

        {/* Minimalist Grid of Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200 mt-2 border border-neutral-200">
          {filteredAndSortedProducts.map((product) => {
            const isSlide = product.category === 'slides';

            return (
              <div
                key={product.id}
                className="bg-white p-6 sm:p-8 flex flex-col justify-between hover:bg-neutral-50/50 transition-colors group"
              >
                <div>
                  {/* Top Meta Bar */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-4">
                    <span className="font-semibold text-neutral-700">{product.article}</span>
                    <div className="flex items-center gap-1.5">
                      {isSlide && (
                        <span className="text-[10px] bg-neutral-900 text-white px-2 py-0.5 font-medium">
                          AISI 304
                        </span>
                      )}
                      <span className="uppercase tracking-wider text-[10px] bg-neutral-100 px-2 py-0.5 text-neutral-600">
                        {product.categoryLabel}
                      </span>
                    </div>
                  </div>

                  {/* Clean Visual Representation */}
                  <div className="relative aspect-4/3 w-full bg-neutral-100 overflow-hidden mb-6 border border-neutral-100">
                    <img
                      src={product.imageRender}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale-15 group-hover:grayscale-0 group-hover:scale-102 transition-all duration-700"
                      loading="lazy"
                    />

                    {/* Slide badges overlay */}
                    {isSlide && (
                      <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 pointer-events-none">
                        <span className="px-2 py-1 bg-black/85 backdrop-blur-xs text-white text-[10px] font-mono tracking-wider uppercase">
                          {product.slideType === 'open' ? 'Открытый скат' : 'Тоннель Ø800'}
                        </span>
                        {product.slideFormLabel && (
                          <span className="px-2 py-1 bg-white/90 backdrop-blur-xs text-neutral-900 text-[10px] font-mono border border-neutral-300">
                            {product.slideFormLabel}
                          </span>
                        )}
                      </div>
                    )}

                    {isSlide && product.slideHeight && (
                      <div className="absolute bottom-2.5 right-2.5 bg-black/80 text-white px-2 py-0.5 text-[10px] font-mono">
                        h = {product.slideHeight} м
                      </div>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-normal text-neutral-900 tracking-tight mb-2">
                    {product.name}
                  </h3>
                  <p className="text-xs text-neutral-500 line-clamp-3 leading-relaxed mb-6 font-normal">
                    {product.description}
                  </p>

                  {/* Technical Specifications */}
                  <div className="border-t border-neutral-200 pt-3 pb-3 space-y-1.5 text-[11px] mb-6 font-mono text-neutral-600">
                    {isSlide ? (
                      <>
                        <div className="flex justify-between">
                          <span className="text-neutral-400 font-sans">Высота старта (h):</span>
                          <span className="text-neutral-900 font-medium">
                            {product.slideHeight ? `${product.slideHeight} м (${product.dimensions.height} мм)` : `${product.dimensions.height} мм`}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400 font-sans">Длина ската (L):</span>
                          <span className="text-neutral-900 font-medium">
                            {product.slideLength ? `${product.slideLength} м (${product.dimensions.length} мм)` : `${product.dimensions.length} мм`}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400 font-sans">Ширина / диаметр:</span>
                          <span className="text-neutral-900">{product.dimensions.width} мм</span>
                        </div>
                        {product.slideAngle && (
                          <div className="flex justify-between">
                            <span className="text-neutral-400 font-sans">Угол поворота:</span>
                            <span className="text-neutral-900">{product.slideAngle}°</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-neutral-400 font-sans">Масса:</span>
                          <span className="text-neutral-900">{product.weight} кг</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400 font-sans">Материал:</span>
                          <span className="font-sans text-neutral-800 text-right">{product.material}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400 font-sans">Безопасность:</span>
                          <span className="font-sans text-neutral-800 text-right">ГОСТ Р 52169, ТР ЕАЭС 042</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between">
                          <span className="text-neutral-400 font-sans">Габариты (Д×Ш×В):</span>
                          <span className="text-neutral-900 font-medium">
                            {product.dimensions.length} × {product.dimensions.width} × {product.dimensions.height} мм
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400 font-sans">Масса:</span>
                          <span className="text-neutral-900">{product.weight} кг</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400 font-sans">Материал:</span>
                          <span className="font-sans text-neutral-800 text-right">{product.material}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400 font-sans">Покрытие:</span>
                          <span className="font-sans text-neutral-800 text-right">{product.coating}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400 font-sans">Монтаж:</span>
                          <span className="font-sans text-neutral-800 text-right">{product.mountingType}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Actions: Calculate Quote & Add to Batch Estimate */}
                <div className="pt-4 border-t border-neutral-200 space-y-2">
                  <button
                    onClick={() => setCalculatingProduct(product)}
                    className="w-full py-2.5 px-3 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Рассчитать смету</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                  </button>

                  <button
                    type="button"
                    onClick={() => addItem(product, 1)}
                    className={`w-full py-2 px-3 border text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isInEstimate(product.id)
                        ? 'bg-neutral-100 text-neutral-900 border-neutral-400 hover:bg-neutral-200'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:border-black hover:text-black'
                    }`}
                  >
                    {isInEstimate(product.id) ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>В расчёте сметы ({getItemQuantity(product.id)} шт.)</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Добавить к расчёту сметы</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Engineering & CAD Consultation Banner */}
        <div className="border border-neutral-200 bg-[#FAFAFA] p-8 sm:p-12 mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400">
                [ Индивидуальное производство ]
              </div>
              <h3 className="text-2xl sm:text-4xl font-light text-neutral-900 tracking-tight">
                Не нашли нужное изделие? Изготовим по вашему проекту
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light max-w-2xl">
                Конструкторское бюро завода «Стальное Дело» адаптирует архитектурные концепции, 3D-модели и эскизы под серийное производство. Выполняем раскрой стали до 25 мм, гибку, точную сварку НАКС и покраску в любой оттенок RAL.
              </p>

              <div className="flex flex-wrap gap-4 pt-2 text-xs font-mono text-neutral-600">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-neutral-900" />
                  <span>Принимаем файлы DWG, DXF, STEP, PDF</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-neutral-900" />
                  <span>Оперативный расчет сметы</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-neutral-900" />
                  <span>Соответствие СП 16.13330 и ГОСТ</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <button
                onClick={onOpenCalculator}
                className="w-full py-3.5 px-6 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                <span>Загрузить чертеж в калькулятор</span>
              </button>

              <button
                onClick={onOpenMeasurerModal}
                className="w-full py-3.5 px-6 border border-neutral-300 text-neutral-900 text-xs font-mono uppercase tracking-wider hover:border-black transition-colors flex items-center justify-center gap-2 cursor-pointer bg-white"
              >
                <Compass className="w-4 h-4" />
                <span>Вызов конструктора на замер</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
