import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Calculator, 
  Send, 
  Check, 
  ShieldCheck, 
  Building2, 
  ArrowRight,
  FileCheck2,
  Phone,
  Mail,
  AlertCircle,
  Database,
  RefreshCw,
  CheckCircle2
} from 'lucide-react';
import { useEstimate } from '../context/EstimateContext';
import { ConsentCheckbox } from './ConsentCheckbox';
import { sendLeadToBitrix24, buildBitrixLeadTitle } from '../services/bitrixService';

interface BatchEstimateDrawerProps {
  onOpenPrivacy?: () => void;
  onOpenOffer?: () => void;
}

export const BatchEstimateDrawer: React.FC<BatchEstimateDrawerProps> = ({
  onOpenPrivacy,
  onOpenOffer,
}) => {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    clearItems, 
    totalCount, 
    isBatchDrawerOpen, 
    setIsBatchDrawerOpen 
  } = useEstimate();

  // Form states
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactCompany, setContactCompany] = useState('');
  const [contactComment, setContactComment] = useState('');
  const [urgency, setUrgency] = useState<'standard' | 'express'>('standard');
  const [consentChecked, setConsentChecked] = useState(true);
  const [includeDelivery, setIncludeDelivery] = useState(false);
  const [includeBim, setIncludeBim] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [requestNumber, setRequestNumber] = useState('');
  const [createdLeadId, setCreatedLeadId] = useState<string | number | null>(null);

  if (!isBatchDrawerOpen) return null;

  // Aggregate calculations
  const totalWeight = items.reduce((sum, item) => {
    return sum + (item.product.weight || 45) * item.quantity;
  }, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactPhone.trim() || items.length === 0 || !consentChecked) return;

    setIsSubmitting(true);
    const orderNum = `СД-СМЕТА-${Math.floor(1000 + Math.random() * 9000)}`;
    setRequestNumber(orderNum);

    const positionsList = items.map(i => `${i.product.name} (${i.product.article}) × ${i.quantity} шт. [категория: ${i.product.categoryLabel}]`);
    
    const leadTitle = buildBitrixLeadTitle(
      contactCompany,
      `[Сводная смета ${orderNum}] ${items.length} наим.`,
      totalCount
    );

    try {
      const result = await sendLeadToBitrix24({
        sourceType: 'batch_estimate',
        title: leadTitle,
        name: contactName || 'Заказчик партии',
        phone: contactPhone,
        email: contactEmail,
        company: contactCompany,
        department: 'Отдел оптовых поставок и проектов благоустройства',
        pageSource: 'Сводная проектная смета (Корзина спецификации МАФ)',
        details: {
          'Номер сметы на сайте': orderNum,
          'Всего изделий': `${totalCount} шт.`,
          'Расчетный вес металлоконструкций': `~${totalWeight} кг`,
          'Срочность выпуска': urgency === 'express' ? 'Экспресс: 2–3 раб. дня' : 'Стандарт: 10–15 раб. дней',
          'Позиции спецификации': positionsList,
          'Доставка манипулятором': includeDelivery ? 'Требуется доставка на объект заводом' : 'Самовывоз со склада в Колпино (СПб)',
          'Включить BIM (.rfa) и DWG': includeBim ? 'Да, предоставить модели' : 'Нет',
          'Пожелания заказчика': contactComment || 'Не указаны',
        }
      });

      if (result.leadId) {
        setCreatedLeadId(result.leadId);
      }
    } catch (err) {
      console.warn('Bitrix lead error:', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    clearItems();
    setIsBatchDrawerOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white border border-neutral-200 w-full max-w-4xl max-h-[94vh] flex flex-col shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-neutral-900 text-white flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                [ Расчет партии изделий • Завод «Стальное Дело» ]
              </div>
              <h2 className="text-base sm:text-lg font-medium text-neutral-900 leading-tight">
                Спецификация скатов к расчёту сметы
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {items.length > 0 && !isSubmitted && (
              <button
                type="button"
                onClick={clearItems}
                className="text-[11px] font-mono text-neutral-400 hover:text-red-600 transition-colors cursor-pointer hidden sm:inline"
              >
                Очистить список
              </button>
            )}
            <button
              onClick={() => setIsBatchDrawerOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-black hover:bg-neutral-200 transition-colors cursor-pointer"
              title="Закрыть"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {isSubmitted ? (
            /* Success State */
            <div className="py-12 px-4 text-center max-w-lg mx-auto space-y-4">
              <div className="w-14 h-14 bg-black text-white flex items-center justify-center mx-auto mb-4">
                <Check className="w-7 h-7" />
              </div>
              <div className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                Спецификация успешно отправлена
              </div>
              <h3 className="text-2xl font-light text-neutral-900 tracking-tight">
                Заявка {requestNumber} принята инженером
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                Инженерный отдел завода проведет расчет с учетом раскроя нержавеющей стали AISI 304, подготовит коммерческое предложение с попозиционной сметой, сертификатами ТР ЕАЭС 042 и графиком изготовления. Мы свяжемся с вами в течение 15 минут.
              </p>

              <div className="p-4 bg-neutral-50 border border-neutral-200 text-left font-mono text-xs space-y-2 mt-6">
                <div className="text-neutral-500 text-[11px] uppercase tracking-wider border-b border-neutral-200 pb-1">
                  Состав спецификации ({totalCount} шт.):
                </div>
                {items.map((it) => (
                  <div key={it.id} className="flex justify-between text-neutral-800">
                    <span className="truncate max-w-[280px]">{it.product.name} ({it.product.article})</span>
                    <span className="font-semibold shrink-0 ml-2">{it.quantity} шт.</span>
                  </div>
                ))}
                <div className="border-t border-neutral-200 pt-2 flex justify-between font-medium text-neutral-900">
                  <span>Расчет сметы:</span>
                  <span className="text-right">Индивидуальный расчет по стоимости металла (с НДС 22%)</span>
                </div>
                {createdLeadId && (
                  <div className="flex justify-between pt-2 border-t border-neutral-200 text-neutral-900">
                    <span className="text-neutral-500">Запись в CRM Bitrix24:</span>
                    <span className="font-bold">Лид #{createdLeadId}</span>
                  </div>
                )}
              </div>

              <div className="pt-6 flex justify-center gap-3">
                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-2.5 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Завершить и очистить смету
                </button>
              </div>
            </div>
          ) : items.length === 0 ? (
            /* Empty State */
            <div className="py-16 text-center max-w-md mx-auto space-y-4">
              <div className="w-12 h-12 border border-neutral-300 text-neutral-400 flex items-center justify-center mx-auto">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-light text-neutral-900 tracking-tight">
                В расчете сметы пока нет выбранных скатов
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-light">
                Перейдите в каталог и нажмите кнопку <strong>«Добавить к расчёту сметы»</strong> под любым скатом. Вы можете выбрать несколько разных типоразмеров для комплексного проекта.
              </p>
              <button
                onClick={() => setIsBatchDrawerOpen(false)}
                className="px-6 py-2.5 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer mt-2"
              >
                Вернуться к каталогу скатов
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Selected Items List */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                  <span className="font-mono text-xs uppercase tracking-wider text-neutral-500">
                    Выбранные изделия ({items.length} поз., {totalCount} шт.)
                  </span>
                  <span className="font-mono text-xs text-neutral-600">
                    Суммарная масса: ~{totalWeight} кг
                  </span>
                </div>

                {/* Items Scroll List */}
                <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                  {items.map((item) => {
                    const prod = item.product;
                    const isSlide = prod.category === 'slides';
                    const h = prod.slideHeight || (prod.dimensions.height / 1000);
                    const l = prod.slideLength || (prod.dimensions.length / 1000);

                    return (
                      <div
                        key={item.id}
                        className="border border-neutral-200 p-3 bg-white flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between hover:border-neutral-300 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-16 h-16 bg-neutral-100 shrink-0 border border-neutral-200 overflow-hidden relative">
                            <img
                              src={prod.imageRender}
                              alt={prod.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="font-mono text-[10px] text-neutral-400 font-semibold">
                                {prod.article}
                              </span>
                              <span className="font-mono text-[9px] bg-neutral-900 text-white px-1.5 py-0.2">
                                AISI 304
                              </span>
                            </div>
                            <h4 className="text-xs font-medium text-neutral-900 truncate max-w-[260px] sm:max-w-[200px]">
                              {prod.name}
                            </h4>
                            <div className="font-mono text-[10px] text-neutral-500 flex flex-wrap gap-x-2 mt-0.5">
                              {isSlide ? (
                                <>
                                  <span>h={h}м</span>
                                  <span>L={l}м</span>
                                  <span>{prod.slideType === 'open' ? 'Открытый' : 'Труба Ø800'}</span>
                                </>
                              ) : (
                                <span>{prod.dimensions.length}×{prod.dimensions.width}×{prod.dimensions.height} мм</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Controls: Quantity stepper & Delete */}
                        <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                          <div className="flex items-center border border-neutral-300 bg-white">
                            <button
                              type="button"
                              onClick={() => updateQuantity(prod.id, -1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-neutral-100 text-neutral-600 cursor-pointer"
                              title="Уменьшить"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center font-mono text-xs font-semibold text-neutral-900">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(prod.id, 1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-neutral-100 text-neutral-600 cursor-pointer"
                              title="Увеличить"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(prod.id)}
                            className="p-1.5 text-neutral-400 hover:text-red-600 transition-colors cursor-pointer"
                            title="Удалить из сметы"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Additional project options */}
                <div className="pt-2 border-t border-neutral-200 space-y-2">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 mb-1">
                    Опции поставки партии:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <label className="flex items-center gap-2 p-2 border border-neutral-200 bg-neutral-50/50 cursor-pointer hover:border-neutral-300">
                      <input
                        type="checkbox"
                        checked={includeDelivery}
                        onChange={(e) => setIncludeDelivery(e.target.checked)}
                        className="rounded-none text-black focus:ring-0 cursor-pointer"
                      />
                      <span className="text-[11px] text-neutral-800">
                        Доставка на объект манипулятором
                      </span>
                    </label>

                    <label className="flex items-center gap-2 p-2 border border-neutral-200 bg-neutral-50/50 cursor-pointer hover:border-neutral-300">
                      <input
                        type="checkbox"
                        checked={includeBim}
                        onChange={(e) => setIncludeBim(e.target.checked)}
                        className="rounded-none text-black focus:ring-0 cursor-pointer"
                      />
                      <span className="text-[11px] text-neutral-800">
                        Приложить BIM (.rfa) и чертежи DWG
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column: Cost Summary & Inquiry Form */}
              <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
                {/* Batch Cost Summary Box */}
                <div className="bg-neutral-900 text-white p-5 space-y-3">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                      Спецификация партии к расчёту
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-1.5 py-0.5">
                      НДС 22%
                    </span>
                  </div>

                  <div className="space-y-1.5 font-mono text-xs">
                    <div className="flex justify-between text-neutral-300">
                      <span>Объем заказа:</span>
                      <span className="text-white font-medium">{totalCount} шт. ({items.length} поз.)</span>
                    </div>
                    <div className="flex justify-between text-neutral-300">
                      <span>Суммарная масса:</span>
                      <span className="text-white font-medium">~{totalWeight} кг</span>
                    </div>
                    <div className="flex justify-between text-neutral-300">
                      <span>Логистика:</span>
                      <span className="text-white">{includeDelivery ? 'Манипулятор завода (СПб/ЛО)' : 'Самовывоз с завода (Колпино)'}</span>
                    </div>
                    {includeBim && (
                      <div className="flex justify-between text-neutral-400 text-[11px]">
                        <span>CAD / BIM:</span>
                        <span className="text-white">Чертежи DWG + Revit .rfa</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-neutral-800 pt-3">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 block mb-1">
                      Расчет стоимости партии:
                    </span>
                    <div className="text-sm sm:text-base font-normal text-white leading-snug">
                      Индивидуальный расчет сметы по стоимости металла на день расчёта
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-1 font-light">
                      С учетом биржевых котировок нержавеющей стали, оптимизации раскроя на лазерном станке и оптовой скидки.
                    </p>
                  </div>
                </div>

                {/* Batch Request Form */}
                <form onSubmit={handleSubmit} className="border border-neutral-200 p-5 bg-neutral-50/70 space-y-3">
                  <div className="space-y-0.5">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                      Форма запроса коммерческого предложения
                    </div>
                    <div className="text-xs font-medium text-neutral-900">
                      Запросить официальную смету на выбранные позиции
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="ФИО или представитель *"
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
                      placeholder="Название компании / ИНН (для выставления счета)"
                      className="w-full px-3 py-2 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-black font-sans"
                    />
                  </div>

                  <div>
                    <textarea
                      rows={2}
                      value={contactComment}
                      onChange={(e) => setContactComment(e.target.value)}
                      placeholder="Адрес объекта, требования к проекту или пожелания..."
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
                    id="batch-estimate-consent"
                    checked={consentChecked}
                    onChange={setConsentChecked}
                    theme="light"
                    onOpenPrivacy={onOpenPrivacy}
                    onOpenOffer={onOpenOffer}
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting || items.length === 0 || !consentChecked}
                    className="w-full py-3 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Отправка спецификации...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Отправить спецификацию на расчёт</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-neutral-400 font-mono text-center">
                    Официальный ответ и расчет за 15-30 минут с чертежами и сертификатами.
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
