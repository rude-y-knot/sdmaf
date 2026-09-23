import React, { useState } from 'react';
import { 
  X, 
  Calculator, 
  Check, 
  ShieldCheck, 
  Clock, 
  Send, 
  Plus, 
  Minus, 
  CheckCircle2, 
  ArrowRight,
  Layers,
  Sparkles,
  Building2,
  FileCheck,
  Database,
  RefreshCw
} from 'lucide-react';
import { MAFProduct } from '../types';
import { useEstimate } from '../context/EstimateContext';
import { ConsentCheckbox } from './ConsentCheckbox';
import { sendLeadToBitrix24 } from '../services/bitrixService';

interface ProductQuoteModalProps {
  product: MAFProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenPrivacy?: () => void;
  onOpenOffer?: () => void;
}

export const ProductQuoteModal: React.FC<ProductQuoteModalProps> = ({
  product,
  isOpen,
  onClose,
  onOpenPrivacy,
  onOpenOffer,
}) => {
  const { addItem, isInEstimate, getItemQuantity, setIsBatchDrawerOpen } = useEstimate();

  // Configurator state
  const [quantity, setQuantity] = useState<number>(1);
  const [steelGrade, setSteelGrade] = useState<'aisi304' | 'aisi316'>('aisi304');
  const [finishType, setFinishType] = useState<'ba-mirror' | 'satin'>('ba-mirror');
  const [mountingKit, setMountingKit] = useState<'anchors' | 'embedment' | 'flange'>('anchors');
  const [urgency, setUrgency] = useState<'standard' | 'express'>('standard');
  const [optHandrail, setOptHandrail] = useState<boolean>(true);
  const [optDamping, setOptDamping] = useState<boolean>(false);
  const [optDelivery, setOptDelivery] = useState<boolean>(false);

  // Form State
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactCompany, setContactCompany] = useState('');
  const [contactComment, setContactComment] = useState('');
  const [consentChecked, setConsentChecked] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdLeadId, setCreatedLeadId] = useState<string | number | null>(null);
  const [addedToBatchSuccess, setAddedToBatchSuccess] = useState(false);

  if (!isOpen || !product) return null;

  const isSlide = product.category === 'slides';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactPhone.trim() || !consentChecked) return;

    setIsSubmitting(true);

    try {
      const result = await sendLeadToBitrix24({
        sourceType: 'maf_product_quote',
        title: `[Заказ МАФ] ${product.name} (${product.article}) — ${quantity} шт.`,
        name: contactName || 'Заказчик МАФ',
        phone: contactPhone,
        email: contactEmail,
        company: contactCompany,
        department: 'Отдел продаж и комплектации МАФ',
        pageSource: `Каталог МАФ / Модель ${product.name} (${product.article})`,
        details: {
          'Модель МАФ': product.name,
          'Артикул': product.article,
          'Категория': product.categoryLabel,
          'Количество': `${quantity} шт.`,
          'Марка стали': steelGrade === 'aisi304' ? 'AISI 304 (архитектурная нержавеющая)' : 'AISI 316 (морская/кислотостойкая)',
          'Обработка поверхности': finishType === 'ba-mirror' ? 'Зеркальная полировка BA' : 'Сатинирование (матовая шлифовка)',
          'Тип монтажа': mountingKit === 'anchors' ? 'Анкерное крепление к бетону' : mountingKit === 'embedment' ? 'Бетонирование закладных стоек' : 'Фланцевый узел',
          'Срочность выпуска': urgency === 'express' ? 'Экспресс: 2–3 раб. дня' : 'Стандарт: 10–15 раб. дней',
          'Поручни безопасности': optHandrail ? 'Включены в спецификацию' : 'Без поручней',
          'Шумоизоляционное демпфирование': optDamping ? 'Да, виброгасящий слой' : 'Нет',
          'Доставка на объект': optDelivery ? 'Требуется доставка заводом' : 'Самовывоз со склада в Колпино (СПб)',
          'Примечания заказчика': contactComment || 'Не указаны',
        }
      });

      if (result.leadId) {
        setCreatedLeadId(result.leadId);
      }
    } catch (err) {
      console.warn('Bitrix lead dispatch error:', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const handleAddToBatch = () => {
    addItem(product, quantity);
    setAddedToBatchSuccess(true);
    setTimeout(() => {
      setAddedToBatchSuccess(false);
    }, 2500);
  };

  const alreadyInEstimate = isInEstimate(product.id);
  const currentBatchQty = getItemQuantity(product.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white border border-neutral-200 w-full max-w-5xl my-auto max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50/70">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black text-white flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                [ Инженерный расчет спецификации и сметы изделия ]
              </div>
              <h2 className="text-base sm:text-lg font-medium text-neutral-900 leading-tight">
                {product.name}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline font-mono text-[11px] bg-neutral-200 text-neutral-700 px-2 py-0.5">
              {product.article}
            </span>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-black hover:bg-neutral-200 transition-colors cursor-pointer"
              title="Закрыть"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {isSubmitted ? (
            /* Success confirmation view */
            <div className="py-12 px-4 text-center max-w-lg mx-auto space-y-4">
              <div className="w-14 h-14 bg-black text-white flex items-center justify-center mx-auto mb-4">
                <Check className="w-7 h-7" />
              </div>
              <div className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                Заявка на расчет принята в работу
              </div>
              <h3 className="text-2xl font-light text-neutral-900 tracking-tight">
                Смета № СД-СМЕТА-{Math.floor(1000 + Math.random() * 9000)} сформирована
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                Инженер конструкторского бюро завода «Стальное Дело» проверит техническую совместимость по ГОСТ Р 52169-2012 и вышлет официальное коммерческое предложение с точной сметой, сроком изготовления и BIM-моделью на указанный контакт в течение 15 минут.
              </p>

              <div className="p-4 bg-neutral-50 border border-neutral-200 text-left font-mono text-xs space-y-2 mt-6">
                <div className="text-neutral-500 text-[11px] uppercase tracking-wider border-b border-neutral-200 pb-1">
                  Параметры расчета:
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Изделие:</span>
                  <span className="text-neutral-900 font-medium">{product.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Количество:</span>
                  <span className="text-neutral-900">{quantity} шт.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Марка стали:</span>
                  <span className="text-neutral-900">{steelGrade === 'aisi316' ? 'AISI 316 - 2 мм' : 'AISI 304 - 2 мм'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Расчет сметы:</span>
                  <span className="text-neutral-900 font-medium text-right">По котировке металла на дату заявки (с НДС 22%)</span>
                </div>
                {createdLeadId && (
                  <div className="flex justify-between pt-2 border-t border-neutral-200">
                    <span className="text-neutral-500">Номер в Bitrix24:</span>
                    <span className="text-black font-bold">Лид #{createdLeadId}</span>
                  </div>
                )}
              </div>

              <div className="pt-6 flex justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Вернуться в каталог
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Product Context & Customizer */}
              <div className="lg:col-span-7 space-y-6">
                {/* Product Teaser Card */}
                <div className="border border-neutral-200 p-4 bg-neutral-50/50 flex flex-col sm:flex-row gap-4 items-center">
                  <div className="w-full sm:w-36 h-28 bg-neutral-200 shrink-0 overflow-hidden relative border border-neutral-300">
                    <img
                      src={product.imageRender}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    {isSlide && product.slideHeight && (
                      <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] font-mono px-1">
                        h = {product.slideHeight}м
                      </span>
                    )}
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex flex-wrap gap-1 text-[10px] font-mono">
                      <span className="px-1.5 py-0.5 bg-neutral-900 text-white font-medium">
                        AISI 304 (2.0 мм)
                      </span>
                      {product.slideTypeLabel && (
                        <span className="px-1.5 py-0.5 bg-neutral-200 text-neutral-800">
                          {product.slideTypeLabel}
                        </span>
                      )}
                      {product.slideFormLabel && (
                        <span className="px-1.5 py-0.5 bg-neutral-200 text-neutral-800">
                          {product.slideFormLabel}
                        </span>
                      )}
                    </div>
                    <div className="font-mono text-neutral-600 text-[11px] grid grid-cols-2 gap-x-3 gap-y-1 pt-1">
                      {isSlide ? (
                        <>
                          <div>Высота (h): <strong className="text-neutral-900">{product.slideHeight || (product.dimensions.height / 1000)} м</strong></div>
                          <div>Длина (L): <strong className="text-neutral-900">{product.slideLength || (product.dimensions.length / 1000)} м</strong></div>
                          <div>Ширина / Ø: <strong className="text-neutral-900">{product.dimensions.width} мм</strong></div>
                          <div>Масса: <strong className="text-neutral-900">{product.weight} кг</strong></div>
                        </>
                      ) : (
                        <>
                          <div>Габариты: <strong className="text-neutral-900">{product.dimensions.length}×{product.dimensions.width}×{product.dimensions.height} мм</strong></div>
                          <div>Масса: <strong className="text-neutral-900">{product.weight} кг</strong></div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* 1. Количество */}
                <div className="space-y-2">
                  <label className="font-mono text-xs uppercase tracking-wider text-neutral-600 flex items-center justify-between">
                    <span>1. Количество изделий (шт.)</span>
                    {quantity >= 5 && (
                      <span className="text-[10px] text-neutral-900 font-bold bg-neutral-200 px-2 py-0.5">
                        Оптовая серия (от 5 шт.)
                      </span>
                    )}
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-neutral-300 bg-white">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-10 h-10 flex items-center justify-center hover:bg-neutral-100 transition-colors text-neutral-700 cursor-pointer"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <input
                        type="number"
                        min={1}
                        max={100}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-14 h-10 text-center font-mono font-medium text-sm text-neutral-900 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 1)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-neutral-100 transition-colors text-neutral-700 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex gap-1.5">
                      {[1, 2, 5, 10].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setQuantity(preset)}
                          className={`px-3 py-2 text-xs font-mono border transition-colors cursor-pointer ${
                            quantity === preset
                              ? 'bg-black text-white border-black font-medium'
                              : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
                          }`}
                        >
                          {preset} шт
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2. Марка стали */}
                <div className="space-y-2">
                  <label className="font-mono text-xs uppercase tracking-wider text-neutral-600 block">
                    2. Марка нержавеющей стали
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSteelGrade('aisi304')}
                      className={`p-3 text-left border transition-all cursor-pointer ${
                        steelGrade === 'aisi304'
                          ? 'border-black bg-neutral-50 ring-1 ring-black'
                          : 'border-neutral-200 hover:border-neutral-400 bg-white'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-mono text-xs font-semibold text-neutral-900">AISI 304 (08Х18Н10)</span>
                        <span className="text-[10px] font-mono text-neutral-500">Базовый стандарт</span>
                      </div>
                      <p className="text-[11px] text-neutral-500 leading-snug">
                        Пищевая нержавеющая сталь, толщина 2.0 мм. Соответствует ГОСТ Р 52169-2012.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSteelGrade('aisi316')}
                      className={`p-3 text-left border transition-all cursor-pointer ${
                        steelGrade === 'aisi316'
                          ? 'border-black bg-neutral-50 ring-1 ring-black'
                          : 'border-neutral-200 hover:border-neutral-400 bg-white'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-mono text-xs font-semibold text-neutral-900">AISI 316 (морская)</span>
                        <span className="text-[10px] font-mono text-neutral-500">Повышенная стойкость</span>
                      </div>
                      <p className="text-[11px] text-neutral-500 leading-snug">
                        С добавлением молибдена. Для прибрежных зон Финского залива и агрессивных реагентов.
                      </p>
                    </button>
                  </div>
                </div>

                {/* 3. Обработка поверхности и монтаж */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[11px] uppercase tracking-wider text-neutral-600 block">
                      3. Обработка полотна
                    </label>
                    <select
                      value={finishType}
                      onChange={(e) => setFinishType(e.target.value as any)}
                      className="w-full px-3 py-2 bg-white border border-neutral-200 text-xs font-mono text-neutral-900 focus:outline-none focus:border-black cursor-pointer"
                    >
                      <option value="ba-mirror">Зеркальная полировка BA (скольжение)</option>
                      <option value="satin">Сатинирование наружных стенок (матовая)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[11px] uppercase tracking-wider text-neutral-600 block">
                      4. Тип крепления
                    </label>
                    <select
                      value={mountingKit}
                      onChange={(e) => setMountingKit(e.target.value as any)}
                      className="w-full px-3 py-2 bg-white border border-neutral-200 text-xs font-mono text-neutral-900 focus:outline-none focus:border-black cursor-pointer"
                    >
                      <option value="anchors">Анкерное Hilti M16 (к ж/б основанию)</option>
                      <option value="embedment">Бетонирование пилонов в грунт (закладные)</option>
                      <option value="flange">Фланцевое к башне городка (крепеж М12)</option>
                    </select>
                  </div>
                </div>

                {/* 5. Дополнительные опции */}
                <div className="space-y-2">
                  <label className="font-mono text-[11px] uppercase tracking-wider text-neutral-600 block">
                    5. Комплектация и услуги
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <label className="flex items-center gap-2 p-2.5 border border-neutral-200 bg-white cursor-pointer hover:border-neutral-300">
                      <input
                        type="checkbox"
                        checked={optHandrail}
                        onChange={(e) => setOptHandrail(e.target.checked)}
                        className="rounded-none text-black focus:ring-0 cursor-pointer"
                      />
                      <div>
                        <span className="font-medium text-neutral-900 block text-[11px]">Поручень безопасности ГОСТ</span>
                        <span className="text-[10px] text-neutral-500">по стандарту ГОСТ Р 52169</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-2 p-2.5 border border-neutral-200 bg-white cursor-pointer hover:border-neutral-300">
                      <input
                        type="checkbox"
                        checked={optDamping}
                        onChange={(e) => setOptDamping(e.target.checked)}
                        className="rounded-none text-black focus:ring-0 cursor-pointer"
                      />
                      <div>
                        <span className="font-medium text-neutral-900 block text-[11px]">Вибро-шумопоглощение</span>
                        <span className="text-[10px] text-neutral-500">демпфер желоба скольжения</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-2 p-2.5 border border-neutral-200 bg-white cursor-pointer hover:border-neutral-300">
                      <input
                        type="checkbox"
                        checked={optDelivery}
                        onChange={(e) => setOptDelivery(e.target.checked)}
                        className="rounded-none text-black focus:ring-0 cursor-pointer"
                      />
                      <div>
                        <span className="font-medium text-neutral-900 block text-[11px]">Доставка на объект (СПб/ЛО/РФ)</span>
                        <span className="text-[10px] text-neutral-500">манипулятор завода / ТК</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Action button to add to project batch estimate */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleAddToBatch}
                    className={`w-full py-2.5 px-4 border text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      addedToBatchSuccess
                        ? 'bg-neutral-900 text-white border-black'
                        : alreadyInEstimate
                        ? 'border-neutral-400 bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
                        : 'border-neutral-300 bg-white text-neutral-800 hover:border-black hover:bg-neutral-50'
                    }`}
                  >
                    {addedToBatchSuccess ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-white" />
                        <span>Добавлено в общую смету!</span>
                      </>
                    ) : alreadyInEstimate ? (
                      <>
                        <Check className="w-4 h-4 text-black" />
                        <span>В общей смете ({currentBatchQty} шт.) — добавить еще {quantity} шт.</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 text-neutral-500" />
                        <span>Добавить этот скат к расчёту общей сметы</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Right Column: Dynamic Price Summary & Fast Lead Form */}
              <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
                {/* Cost Estimate Board */}
                <div className="bg-neutral-900 text-white p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                      Спецификация к расчёту сметы
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-1.5 py-0.5">
                      НДС 22%
                    </span>
                  </div>

                  <div className="space-y-1.5 font-mono text-xs">
                    <div className="flex justify-between text-neutral-300">
                      <span>Изделие:</span>
                      <span className="text-white truncate max-w-[180px]">{product.article}</span>
                    </div>
                    <div className="flex justify-between text-neutral-300">
                      <span>Объем партии:</span>
                      <span className="text-white font-semibold">{quantity} шт. {quantity >= 3 ? '(оптовая скидка)' : ''}</span>
                    </div>
                    <div className="flex justify-between text-neutral-300">
                      <span>Марка стали:</span>
                      <span className="text-white">{steelGrade === 'aisi316' ? 'AISI 316 - 2 мм' : 'AISI 304 - 2 мм'}</span>
                    </div>
                    <div className="flex justify-between text-neutral-300">
                      <span>Обработка:</span>
                      <span className="text-white">{finishType === 'satin' ? 'Сатинирование' : 'Зеркальная BA'}</span>
                    </div>
                    <div className="flex justify-between text-neutral-300">
                      <span>Монтажный узел:</span>
                      <span className="text-white">{mountingKit === 'embedment' ? 'Бетонирование' : mountingKit === 'flange' ? 'Фланец' : 'Анкеры M16'}</span>
                    </div>
                    {(optHandrail || optDamping || optDelivery) && (
                      <div className="flex justify-between text-neutral-400 text-[11px] pt-1 border-t border-neutral-800">
                        <span>Опции:</span>
                        <span className="text-right text-neutral-300">
                          {[
                            optHandrail && 'Поручень ГОСТ',
                            optDamping && 'Вибродемпфер',
                            optDelivery && 'Доставка'
                          ].filter(Boolean).join(' • ')}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-neutral-800 pt-3">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 block mb-1">
                      Стоимость изготовления:
                    </span>
                    <div className="text-sm sm:text-base font-normal text-white leading-snug">
                      Индивидуальный расчет по котировке металла на день заявки
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-1 font-light">
                      С учетом оптимального раскроя листов на лазерных станках 22 кВт (столы 4м и 6м) и тиража партии.
                    </p>
                  </div>

                  <div className="pt-2 text-[10px] font-mono text-neutral-400 border-t border-neutral-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-neutral-300" />
                      <span>ГОСТ Р 52169 • ТР ЕАЭС 042</span>
                    </div>
                    <span>Срок расчета: 15 мин</span>
                  </div>
                </div>

                {/* Inquiry Form to receive official PDF quote */}
                <form onSubmit={handleSubmit} className="border border-neutral-200 p-5 bg-neutral-50/70 space-y-3.5">
                  <div className="space-y-1">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                      Запрос официального КП
                    </div>
                    <div className="text-xs font-medium text-neutral-900">
                      Получить точную смету и 3D/BIM модель на почту
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Ваше имя *"
                      className="w-full px-3 py-2 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-black font-sans"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="tel"
                      required
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="+7 (___) ___-__-__ *"
                      className="w-full px-3 py-2 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-black font-mono"
                    />
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="Email *"
                      className="w-full px-3 py-2 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-black font-sans"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      value={contactCompany}
                      onChange={(e) => setContactCompany(e.target.value)}
                      placeholder="Организация / ИНН (для юрлиц)"
                      className="w-full px-3 py-2 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-black font-sans"
                    />
                  </div>

                  <div>
                    <textarea
                      rows={2}
                      value={contactComment}
                      onChange={(e) => setContactComment(e.target.value)}
                      placeholder="Комментарий или примечания к площадке..."
                      className="w-full px-3 py-2 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-black font-sans resize-none"
                    />
                  </div>

                  {/* Urgency selection */}
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-600 block mb-1">
                      Срочность выпуска:
                    </label>
                    <select
                      value={urgency}
                      onChange={(e) => setUrgency(e.target.value as any)}
                      className="w-full px-3 py-2 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-black font-sans"
                    >
                      <option value="standard">стандарт 10-15 раб.дней</option>
                      <option value="express">Экспресс: 2-3 раб.дня</option>
                    </select>
                  </div>

                  <ConsentCheckbox
                    id="product-quote-consent"
                    checked={consentChecked}
                    onChange={setConsentChecked}
                    theme="light"
                    onOpenPrivacy={onOpenPrivacy}
                    onOpenOffer={onOpenOffer}
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting || !consentChecked}
                    className="w-full py-3 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Формирование расчета...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Отправить на расчет инженеру</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-neutral-400 font-mono text-center">
                    Расчет сметы за 15 минут. Без спама и навязчивых звонков.
                  </p>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
