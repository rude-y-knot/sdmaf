import React, { useState, useMemo } from 'react';
import { Search, X, ArrowUpRight, Calculator, Plus, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { MAF_PRODUCTS } from '../data/factoryData';
import { MAFProduct } from '../types';
import { useEstimate } from '../context/EstimateContext';

interface ProductCatalogProps {
  onOpenCalculator?: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ onOpenCalculator }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { addItem, isInEstimate, getItemQuantity, setCalculatingProduct } = useEstimate();

  const categories = [
    { id: 'all', label: 'Все изделия' },
    { id: 'slides', label: 'Скаты для горок' },
    { id: 'benches', label: 'Скамейки и диваны' },
    { id: 'urns', label: 'Урны и контейнеры' },
    { id: 'pergolas', label: 'Перголы и навесы' },
    { id: 'gazebos', label: 'Беседки и павильоны' },
    { id: 'bike', label: 'Велопарковки' },
    { id: 'fences', label: 'Ограждения и ворота' },
    { id: 'treeGrates', label: 'Приствольные решетки и кашпо' },
    { id: 'artObjects', label: 'Арт-объекты и арки' },
    { id: 'lighting', label: 'Световые опоры' },
    { id: 'sportPlay', label: 'Спорт и воркаут' },
    { id: 'loungers', label: 'Шезлонги и лежаки' },
    { id: 'swings', label: 'Парковые качели' },
    { id: 'tables', label: 'Уличные столы' },
  ];

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: MAF_PRODUCTS.length };
    MAF_PRODUCTS.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredProducts = useMemo(() => {
    return MAF_PRODUCTS.filter((p) => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;
      const matchesQuery = 
        p.name.toLowerCase().includes(q) ||
        p.article.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="catalog" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto">
        {/* Minimalist Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-neutral-200">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-2">
              [ 02 / Каталог продукции ]
            </div>
            <h2 className="text-3xl sm:text-5xl font-light text-neutral-900 tracking-tight">
              Малые архитектурные формы
            </h2>
          </div>
          <p className="text-sm text-neutral-500 max-w-md font-normal leading-relaxed">
            Серийное и проектное производство для благоустройства общественных пространств, парков и девелоперских проектов Санкт-Петербурга.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="py-6 border-b border-neutral-200 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
          {/* Minimal Horizontal Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-none flex-1">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-black font-medium border-b-2 border-black -mb-[1px]'
                      : 'text-neutral-500 hover:text-black border-b-2 border-transparent'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`font-mono text-[10px] ${isActive ? 'text-neutral-900' : 'text-neutral-400'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Minimal Search Bar */}
          <div className="relative min-w-[280px]">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по названию или артикулу..."
              className="w-full pl-9 pr-8 py-2 bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="py-20 text-center border-b border-neutral-200">
            <p className="text-neutral-500 text-sm mb-4">
              По запросу «{searchQuery}» ничего не найдено в этой категории
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="px-5 py-2.5 border border-black text-xs font-mono uppercase tracking-wider hover:bg-black hover:text-white transition-colors cursor-pointer"
            >
              Сбросить фильтры
            </button>
          </div>
        )}

        {/* Minimalist Grid of Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200 mt-6 border border-neutral-200">
          {filteredProducts.map((product) => {
            return (
              <div
                key={product.id}
                className="bg-white p-6 sm:p-8 flex flex-col justify-between hover:bg-neutral-50/50 transition-colors group"
              >
                <div>
                  {/* Top Meta */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-4">
                    <span>{product.article}</span>
                    <span className="uppercase tracking-wider">{product.categoryLabel}</span>
                  </div>

                  {/* Clean Visual Presentation */}
                  <div className="relative aspect-4/3 w-full bg-neutral-100 overflow-hidden mb-6 border border-neutral-100">
                    <img
                      src={product.imageRender}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale-25 group-hover:grayscale-0 group-hover:scale-102 transition-all duration-700"
                      loading="lazy"
                    />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base sm:text-lg font-normal text-neutral-900 tracking-tight mb-2">
                    {product.name}
                  </h3>
                  <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed mb-6 font-normal">
                    {product.description}
                  </p>

                  {/* Technical Specifications */}
                  <div className="border-t border-neutral-200 pt-3 pb-3 space-y-1.5 text-[11px] mb-6 font-mono text-neutral-600">
                    <div className="flex justify-between">
                      <span className="text-neutral-400 font-sans">Габариты (Д×Ш×В):</span>
                      <span className="text-neutral-900">
                        {product.dimensions.length} × {product.dimensions.width} × {product.dimensions.height} мм
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400 font-sans">Масса:</span>
                      <span className="text-neutral-900">{product.weight} кг</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400 font-sans">Монтаж:</span>
                      <span className="font-sans text-neutral-800 text-right">{product.mountingType}</span>
                    </div>
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
      </div>
    </section>
  );
};
