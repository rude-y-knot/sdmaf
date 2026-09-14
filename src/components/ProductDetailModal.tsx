import React, { useEffect } from 'react';
import {
  X,
  Check,
  Download,
  Calculator,
  Plus,
  ShieldCheck,
  Ruler,
  Weight,
  Layers,
  FileText,
  Compass,
  ArrowRight,
  ExternalLink,
  Flame,
  Bike,
  Sparkles,
  Gamepad2,
  Armchair
} from 'lucide-react';
import { MAFProduct } from '../types';
import { useEstimate } from '../context/EstimateContext';

interface ProductDetailModalProps {
  product: MAFProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenCalculator?: () => void;
  onOpenMeasurerModal?: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onOpenCalculator,
  onOpenMeasurerModal,
}) => {
  const { addItem, isInEstimate, getItemQuantity, setCalculatingProduct } = useEstimate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const isSlide = product.category === 'slides';
  const isBike = product.category === 'bike' || product.category === 'bike-racks';
  const isFurniture = ['furniture', 'benches', 'tables', 'loungers', 'pergolas', 'gazebos', 'swings', 'parklets', 'urns'].includes(product.category);
  const isPlayground = ['playgrounds', 'sportPlay'].includes(product.category);
  const isVat = product.category === 'vats';

  const inEstimate = isInEstimate(product.id);
  const quantity = getItemQuantity(product.id);

  const handleCalculateQuote = () => {
    onClose();
    setCalculatingProduct(product);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl bg-white border border-neutral-200 max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Minimalist Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-[#FAFAFA] shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-900 bg-neutral-200 px-2 py-0.5">
              {product.article}
            </span>
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider hidden sm:inline">
              [ {product.categoryLabel} ]
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5">
              <ShieldCheck className="w-3 h-3" />
              <span>Паспорт изделия ГОСТ</span>
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-black hover:bg-neutral-200/60 transition-colors cursor-pointer"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Main Grid: Visual Render & Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Render Image & Badges */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-4/3 w-full bg-neutral-100 border border-neutral-200 overflow-hidden group">
                <img
                  src={product.imageRender}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                />

                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 pointer-events-none">
                  <span className="px-2 py-0.5 bg-black text-white text-[10px] font-mono uppercase tracking-wider">
                    {product.material.includes('AISI') ? 'Нержавеющая сталь' : 'Сталь с цинкованием'}
                  </span>
                  {product.bimAvailable && (
                    <span className="px-2 py-0.5 bg-white text-neutral-900 border border-neutral-300 text-[10px] font-mono uppercase tracking-wider">
                      BIM / Revit
                    </span>
                  )}
                </div>

                {isVat && product.vatCapacityCategory && (
                  <div className="absolute bottom-3 right-3 bg-black/85 text-white px-2.5 py-1 text-[11px] font-mono">
                    {product.vatCapacityCategory === 'small' ? '2–4 места' : product.vatCapacityCategory === 'medium' ? '4–6 мест' : '8–10 мест'}
                  </div>
                )}
              </div>

              {/* Blueprint & CAD formats bar */}
              <div className="p-3.5 border border-neutral-200 bg-neutral-50 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-neutral-600">
                  <FileText className="w-4 h-4 text-neutral-800" />
                  <span>Форматы КД:</span>
                  <span className="text-neutral-900 font-medium">
                    {product.cadFormats ? product.cadFormats.join(' • ') : 'DWG, STEP, PDF'}
                  </span>
                </div>
                <span className="text-[11px] text-neutral-400">Серия 2024</span>
              </div>
            </div>

            {/* Right: Title, Description & Key Technical Indicators */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-light text-neutral-900 tracking-tight mb-3">
                  {product.name}
                </h2>

                <p className="text-sm text-neutral-600 font-light leading-relaxed mb-6">
                  {product.detailedDescription || product.description}
                </p>

                {/* Primary Industrial Spec Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-mono text-xs mb-6">
                  <div className="border border-neutral-200 bg-neutral-50 p-2.5">
                    <div className="text-[10px] uppercase text-neutral-400 flex items-center gap-1">
                      <Ruler className="w-3 h-3 text-neutral-500" />
                      <span>Габариты</span>
                    </div>
                    <div className="text-neutral-900 font-medium mt-1 text-xs">
                      {product.dimensions.length}×{product.dimensions.width}×{product.dimensions.height} мм
                    </div>
                  </div>

                  <div className="border border-neutral-200 bg-neutral-50 p-2.5">
                    <div className="text-[10px] uppercase text-neutral-400 flex items-center gap-1">
                      <Weight className="w-3 h-3 text-neutral-500" />
                      <span>Масса</span>
                    </div>
                    <div className="text-neutral-900 font-medium mt-1 text-xs">
                      {product.weight} кг
                    </div>
                  </div>

                  <div className="border border-neutral-200 bg-neutral-50 p-2.5">
                    <div className="text-[10px] uppercase text-neutral-400 flex items-center gap-1">
                      <Layers className="w-3 h-3 text-neutral-500" />
                      <span>Покрытие</span>
                    </div>
                    <div className="text-neutral-900 font-medium mt-1 text-xs truncate" title={product.coating}>
                      {product.coating.includes('муар') ? 'Муар RAL' : 'Полимер'}
                    </div>
                  </div>
                </div>

                {/* Price Indicator */}
                <div className="p-3.5 border border-neutral-200 bg-white flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-neutral-400 block">
                      Базовая стоимость производства
                    </span>
                    <span className="text-xl font-normal text-neutral-900 font-mono">
                      {product.priceBase > 0 ? `${product.priceBase.toLocaleString('ru-RU')} ₽` : 'По расчету сметы'}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500 text-right">
                    Срок: {product.productionTimeDays || 'от 5'} раб. дней<br />
                    Гарантия: {product.warrantyMonths || 36} мес.
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleCalculateQuote}
                  className="w-full py-3 px-4 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Рассчитать точную смету с опциями</span>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => addItem(product, 1)}
                    className={`py-2.5 px-3 border text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      inEstimate
                        ? 'bg-neutral-100 text-neutral-900 border-neutral-400 hover:bg-neutral-200'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:border-black hover:text-black'
                    }`}
                  >
                    {inEstimate ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>В расчёте ({quantity} шт.)</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5 text-neutral-400" />
                        <span>В пакетную смету</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      if (onOpenMeasurerModal) onOpenMeasurerModal();
                    }}
                    className="py-2.5 px-3 border border-neutral-200 bg-white text-neutral-700 text-xs font-mono uppercase tracking-wider hover:border-black hover:text-black transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Compass className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Вызов замерщика КБ</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Category-Specific Detailed Parameters Section */}
          <div className="border-t border-neutral-200 pt-6">
            <h3 className="text-sm font-mono uppercase tracking-wider font-semibold text-neutral-900 mb-4 flex items-center gap-2">
              {isBike && <Bike className="w-4 h-4" />}
              {isFurniture && <Armchair className="w-4 h-4" />}
              {isPlayground && <Gamepad2 className="w-4 h-4" />}
              {isVat && <Flame className="w-4 h-4" />}
              {isSlide && <Sparkles className="w-4 h-4" />}
              <span>Спецификация и конструктивные особенности</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              {/* Category-specific specs */}
              {isBike && (
                <>
                  <div className="p-3 border border-neutral-200 bg-neutral-50 flex justify-between">
                    <span className="text-neutral-500">Тип конструкции:</span>
                    <span className="text-neutral-900 font-medium">
                      {product.bikeType === 'single' ? 'Единая цельносварная' : 'Модульная наращиваемая'}
                    </span>
                  </div>
                  <div className="p-3 border border-neutral-200 bg-neutral-50 flex justify-between">
                    <span className="text-neutral-500">Количество парковочных мест:</span>
                    <span className="text-neutral-900 font-medium">
                      {product.bikeCapacity || '4–6'} мест
                    </span>
                  </div>
                  <div className="p-3 border border-neutral-200 bg-neutral-50 flex justify-between">
                    <span className="text-neutral-500">Форма стойки / упора:</span>
                    <span className="text-neutral-900 font-medium">
                      {product.bikeFormLabel || product.bikeForm || 'П-образная / Арочная'}
                    </span>
                  </div>
                  <div className="p-3 border border-neutral-200 bg-neutral-50 flex justify-between">
                    <span className="text-neutral-500">Диаметр колес велосипедов:</span>
                    <span className="text-neutral-900 font-medium">От 20" до 29" (вкл. MTB и шоссе)</span>
                  </div>
                </>
              )}

              {isFurniture && (
                <>
                  <div className="p-3 border border-neutral-200 bg-neutral-50 flex justify-between">
                    <span className="text-neutral-500">Тип уличной мебели:</span>
                    <span className="text-neutral-900 font-medium">
                      {product.furnitureTypeLabel || product.categoryLabel}
                    </span>
                  </div>
                  <div className="p-3 border border-neutral-200 bg-neutral-50 flex justify-between">
                    <span className="text-neutral-500">Длина посадочного места:</span>
                    <span className="text-neutral-900 font-medium">
                      {product.furnitureLengthM ? `${product.furnitureLengthM} м` : `${product.dimensions.length} мм`}
                    </span>
                  </div>
                  <div className="p-3 border border-neutral-200 bg-neutral-50 flex justify-between">
                    <span className="text-neutral-500">Материал бруса / настила:</span>
                    <span className="text-neutral-900 font-medium text-right">
                      {product.material.includes('Термо') ? 'Термодревесина (ясень / сосна)' : 'Лиственница камерной сушки'}
                    </span>
                  </div>
                  <div className="p-3 border border-neutral-200 bg-neutral-50 flex justify-between">
                    <span className="text-neutral-500">Антивандальное исполнение:</span>
                    <span className="text-neutral-900 font-medium">Скрытый крепеж, сталь от 8 мм</span>
                  </div>
                </>
              )}

              {isPlayground && (
                <>
                  <div className="p-3 border border-neutral-200 bg-neutral-50 flex justify-between">
                    <span className="text-neutral-500">Направление оборудования:</span>
                    <span className="text-neutral-900 font-medium">
                      {product.playgroundTypeLabel || 'Спортивно-игровой комплекс'}
                    </span>
                  </div>
                  <div className="p-3 border border-neutral-200 bg-neutral-50 flex justify-between">
                    <span className="text-neutral-500">Регламент безопасности:</span>
                    <span className="text-neutral-900 font-medium">ТР ЕАЭС 042/2017, ГОСТ Р 52169</span>
                  </div>
                  <div className="p-3 border border-neutral-200 bg-neutral-50 flex justify-between">
                    <span className="text-neutral-500">Материалы несущих узлов:</span>
                    <span className="text-neutral-900 font-medium">Толстостенная сталь + армированный канат</span>
                  </div>
                  <div className="p-3 border border-neutral-200 bg-neutral-50 flex justify-between">
                    <span className="text-neutral-500">Возрастная группа:</span>
                    <span className="text-neutral-900 font-medium">От 3 до 14 лет</span>
                  </div>
                </>
              )}

              {isVat && (
                <>
                  <div className="p-3 border border-neutral-200 bg-neutral-50 flex justify-between">
                    <span className="text-neutral-500">Марка стали:</span>
                    <span className="text-neutral-900 font-medium">
                      {product.vatSteelGrade || 'AISI 304 (пищевая нержавеющая)'}
                    </span>
                  </div>
                  <div className="p-3 border border-neutral-200 bg-neutral-50 flex justify-between">
                    <span className="text-neutral-500">Толщина металла чаши:</span>
                    <span className="text-neutral-900 font-medium">
                      {product.vatThickness || '3 мм'}
                    </span>
                  </div>
                  <div className="p-3 border border-neutral-200 bg-neutral-50 flex justify-between">
                    <span className="text-neutral-500">Размеры и вместимость:</span>
                    <span className="text-neutral-900 font-medium">
                      {product.vatCapacityLabel || (product.dimensions.length ? `Ø${product.dimensions.length} мм` : '6–8 человек')}
                    </span>
                  </div>
                  <div className="p-3 border border-neutral-200 bg-neutral-50 flex justify-between">
                    <span className="text-neutral-500">Форма чаши:</span>
                    <span className="text-neutral-900 font-medium">
                      {product.vatBowlShapeLabel || 'Многогранная с эргономичным наклоном'}
                    </span>
                  </div>
                  <div className="p-3 border border-neutral-200 bg-neutral-50 flex justify-between">
                    <span className="text-neutral-500">Способ установки:</span>
                    <span className="text-neutral-900 font-medium">
                      {product.vatMountingLabel || 'На стальной подставке с анкеровкой'}
                    </span>
                  </div>
                  <div className="p-3 border border-neutral-200 bg-neutral-50 flex justify-between">
                    <span className="text-neutral-500">Система нагрева:</span>
                    <span className="text-neutral-900 font-medium">
                      {product.vatHeatingLabel || 'Дровяная топка с водяной рубашкой'}
                    </span>
                  </div>
                  <div className="p-3 border border-neutral-200 bg-neutral-50 flex justify-between">
                    <span className="text-neutral-500">Подсветка LED:</span>
                    <span className="text-neutral-900 font-medium">
                      {product.vatLighting ? 'Да, влагозащищенная RGB' : 'Опционально'}
                    </span>
                  </div>
                </>
              )}

              {/* Standard Technical Table */}
              <div className="p-3 border border-neutral-200 bg-neutral-50 flex justify-between">
                <span className="text-neutral-500">Материал основы:</span>
                <span className="text-neutral-900 font-medium text-right truncate max-w-[200px]" title={product.material}>
                  {product.material}
                </span>
              </div>
              <div className="p-3 border border-neutral-200 bg-neutral-50 flex justify-between">
                <span className="text-neutral-500">Тип монтажа:</span>
                <span className="text-neutral-900 font-medium text-right">{product.mountingType}</span>
              </div>
              <div className="p-3 border border-neutral-200 bg-neutral-50 flex justify-between">
                <span className="text-neutral-500">Защитное покрытие:</span>
                <span className="text-neutral-900 font-medium text-right truncate max-w-[200px]" title={product.coating}>
                  {product.coating}
                </span>
              </div>
            </div>
          </div>

          {/* Features and Standards */}
          <div className="border-t border-neutral-200 pt-6">
            <h3 className="text-sm font-mono uppercase tracking-wider font-semibold text-neutral-900 mb-3">
              Технологические преимущества «Стальное Дело»
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs font-mono text-neutral-700">
              <div className="flex items-start gap-2 p-2.5 border border-neutral-200 bg-white">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Прецизионный лазерный раскрой ЧПУ с точностью 0,5 мм</span>
              </div>
              <div className="flex items-start gap-2 p-2.5 border border-neutral-200 bg-white">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Аттестованная сварка НАКС с зачисткой швов до полировки</span>
              </div>
              <div className="flex items-start gap-2 p-2.5 border border-neutral-200 bg-white">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Антикоррозийный цинконаполненный праймер 80 мкм + муар</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
