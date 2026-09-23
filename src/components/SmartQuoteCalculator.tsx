import React, { useState } from 'react';
import { 
  Calculator, 
  Check, 
  Clock, 
  Send, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Sparkles, 
  X,
  RefreshCw,
  ShieldCheck,
  Building2,
  FileCheck
} from 'lucide-react';
import { motion } from 'motion/react';
import { ConsentCheckbox } from './ConsentCheckbox';
import { sendLeadToBitrix24, buildBitrixLeadTitle } from '../services/bitrixService';

interface SmartQuoteCalculatorProps {
  isOpenModal?: boolean;
  onClose?: () => void;
  onOpenPrivacy?: () => void;
  onOpenOffer?: () => void;
}

export const SmartQuoteCalculator: React.FC<SmartQuoteCalculatorProps> = ({
  isOpenModal = false,
  onClose,
  onOpenPrivacy,
  onOpenOffer,
}) => {
  // Wizard State
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [taskType, setTaskType] = useState<string>('parts');
  const [alloyType, setAlloyType] = useState<string>('stainless-304');
  const [thickness, setThickness] = useState<number>(4);
  const [selectedOps, setSelectedOps] = useState<string[]>(['cutting', 'bending', 'powder_painting']);
  const [estimatedQuantity, setEstimatedQuantity] = useState<number>(20); // шт

  // Form submission & personalized fields
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactCompany, setContactCompany] = useState('');
  const [rawMaterial, setRawMaterial] = useState<'warehouse' | 'customer'>('warehouse');
  const [urgency, setUrgency] = useState<'standard' | 'express'>('standard');
  const [customRal, setCustomRal] = useState('');
  const [contactComment, setContactComment] = useState('');
  const [consentChecked, setConsentChecked] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdLeadId, setCreatedLeadId] = useState<string | number | null>(null);

  const handleToggleOp = (opId: string) => {
    setSelectedOps((prev) =>
      prev.includes(opId) ? prev.filter((id) => id !== opId) : [...prev, opId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactPhone || !consentChecked) return;
    setIsSubmitting(true);

    const alloyObj = alloys.find(a => a.id === alloyType);
    const alloyName = alloyObj ? alloyObj.title : alloyType;
    const taskObj = tasks.find(t => t.id === taskType);
    const taskName = taskObj ? taskObj.title : taskType;

    const opLabels = selectedOps.map(op => {
      const found = operations.find(o => o.id === op);
      return found ? found.title : op;
    });

    const leadTitle = buildBitrixLeadTitle(
      contactCompany,
      `[Калькулятор] ${alloyName}`,
      estimatedQuantity
    );

    try {
      const result = await sendLeadToBitrix24({
        sourceType: 'laser_calculator',
        title: leadTitle,
        name: contactName || 'Заказчик',
        phone: contactPhone,
        email: contactEmail,
        company: contactCompany,
        department: 'Конструкторско-технологическое бюро',
        pageSource: isOpenModal ? 'Модальное окно калькулятора' : 'Главная страница / Инженерный калькулятор',
        details: {
          'Направление производства': taskName,
          'Марка стали / Сплав': alloyName,
          'Толщина листа / проката': `${thickness} мм`,
          'Количество в партии': `${estimatedQuantity} шт.`,
          'Выбранные технологические операции': opLabels,
          'Снабжение металлопрокатом': rawMaterial === 'warehouse' ? 'Склад завода (металл в наличии)' : 'Давальческий металлопрокат заказчика',
          'Срочность выпуска': urgency === 'express' ? 'Экспресс: 2–3 раб. дня' : 'Стандарт: 10–15 раб. дней',
          'Порошковая окраска / RAL': customRal || 'По согласованию с КБ',
          'Особые требования / Примечания заказчика': contactComment || 'Не указаны',
        }
      });

      if (result.leadId) {
        setCreatedLeadId(result.leadId);
      }
    } catch (err) {
      console.warn('Bitrix dispatch error:', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const tasks = [
    { id: 'parts', title: 'Металлообработка', desc: 'Лазерный раскрой, ЧПУ гибка, токарка и полировка по чертежам' },
    { id: 'stainless_maf', title: 'Нержавеющие МАФ и скаты горок', desc: 'Слайды, чаны, парковые скамьи, урны, ограждения AISI 304/316' },
    { id: 'custom_ss', title: 'Авторские арт-объекты и порталы', desc: 'Зеркальная и шлифованная нержавейка по дизайн-проектам' },
    { id: 'seria', title: 'Серийные партии продукции', desc: 'Серийные партии элементов благоустройства девелоперских ЖК' },
  ];

  const alloys = [
    {
      id: 'stainless-304',
      title: 'Нержавеющая сталь AISI 304',
      grade: '08Х18Н10 (пищевая / архитектурная)',
      desc: 'Базовая аустенитная коррозионностойкая сталь. Оптимальна для скатов горок, банных чанов, парковой мебели и городских МАФ.',
    },
    {
      id: 'stainless-316',
      title: 'Нержавеющая сталь AISI 316',
      grade: '03Х17Н14М2 (кислотостойкая с молибденом)',
      desc: 'Повышенная стойкость к морскому климату, соленой воде и дорожным реагентам. Рекомендована для набережных СПб.',
    },
    {
      id: 'stainless-321',
      title: 'Нержавеющая сталь AISI 321',
      grade: '12Х18Н10Т (титаносодержащая жаростойкая)',
      desc: 'Легированная титаном аустенитная сталь. Устойчива к межкристаллитной коррозии, перепадам температур и термическим нагрузкам.',
    },
    {
      id: 'galvanized',
      title: 'Оцинкованная сталь',
      grade: 'ГОСТ 14918-2020 / ГОСТ 9.307-89',
      desc: 'Горячеоцинкованный металлопрокат с надежным защитным цинковым слоем для несущих конструкций и антивандальных каркасов.',
    },
  ];

  const operations = [
    { id: 'cutting', title: 'Лазерный раскрой ЧПУ (до 20 мм)', badge: 'Точность 0,5 мм' },
    { id: 'bending', title: 'Гибка на листогибочных прессах', badge: 'ЧПУ 160т' },
    { id: 'welding', title: 'Сварочные и сборочные работы', badge: 'НАКС / TIG/MIG' },
    { id: 'rolling', title: 'Вальцовка обечаек и конусов', badge: 'До 1500 мм' },
    { id: 'sand_blasting', title: 'Пескоструйная / стеклоструйная обработка', badge: 'Sa 2.5 / Sa 3' },
    { id: 'powder_painting', title: 'Порошковая окраска RAL', badge: 'Камеры 3м и 6м' },
    { id: 'airless_painting', title: 'Безвоздушная окраска', badge: 'Антикорр защита' },
  ];

  const content = (
    <div className="bg-white border border-neutral-200 p-6 sm:p-10 max-w-5xl mx-auto">
      {/* Header of the Calculator */}
      <div className="pb-8 mb-8 border-b border-neutral-200">
        <div className="text-[11px] font-mono tracking-[0.25em] uppercase text-neutral-400 mb-2">
          ИНЖЕНЕРНАЯ КАЛЬКУЛЯЦИЯ / ТЕХНОЛОГИЧЕСКИЙ АУДИТ
        </div>
        <h2 className="text-2xl sm:text-4xl font-light text-neutral-900 tracking-tight">
          Расчет стоимости производства
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 mt-2 max-w-xl font-normal">
          Экспресс-расчет параметров партии и подготовка официального КП конструкторским бюро завода.
        </p>
      </div>

      {isSubmitted ? (
        /* SUCCESS CONFIRMATION STATE */
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-10 px-4"
        >
          <div className="w-12 h-12 border border-black flex items-center justify-center mx-auto mb-5 text-black">
            <Check className="w-6 h-6" />
          </div>

          <h3 className="text-2xl font-light text-neutral-900 mb-2">
            Заявка передана инженеру-технологу
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto mb-8 font-normal">
            Инженерная служба выполняет расчет раскроя и технологических нормо-часов с учетом выбранной срочности.
          </p>

          {/* Assigned Engineer Card */}
          <div className="border border-neutral-200 bg-neutral-50 p-5 max-w-md mx-auto mb-8 flex items-center gap-4 text-left">
            <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-mono text-sm shrink-0">
              АС
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                Ведущий инженер КБ
              </div>
              <div className="text-sm font-medium text-neutral-900">
                Алексей Смирнов
              </div>
              <div className="text-xs text-neutral-500 font-mono">
                Лазерный раскрой, ЧПУ гибка, КМ / КМД
              </div>
            </div>
          </div>

          {createdLeadId && (
            <div className="border border-neutral-200 bg-neutral-100/60 p-3 max-w-md mx-auto mb-6 text-left flex items-center justify-between font-mono text-xs">
              <span className="text-neutral-500 uppercase tracking-wider text-[10px]">Заявка зафиксирована в CRM:</span>
              <span className="font-bold text-neutral-900 bg-white px-2 py-0.5 border border-neutral-300">
                Лид #{createdLeadId}
              </span>
            </div>
          )}

          {/* Calculation Status Card */}
          <div className="border border-neutral-200 p-6 max-w-sm mx-auto mb-8 bg-white">
            <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
              Статус подготовки сметы
            </div>
            <div className="text-lg font-medium font-mono text-black tracking-tight">
              В работе у инженера
            </div>
            <div className="text-[10px] font-mono text-neutral-400 mt-2">
              Расчет сметы с НДС 22% поступит на номер {contactPhone}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                setIsSubmitted(false);
                setCurrentStep(1);
              }}
              className="px-6 py-3 text-[11px] font-mono uppercase tracking-[0.15em] border border-neutral-300 text-neutral-800 hover:border-black transition-colors"
            >
              Новый расчет
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="px-6 py-3 text-[11px] font-mono uppercase tracking-[0.15em] bg-black text-white hover:bg-neutral-800 transition-colors"
              >
                Закрыть
              </button>
            )}
          </div>
        </motion.div>
      ) : (
        /* WIZARD STEPS */
        <div>
          {/* Step Progress Indicators */}
          <div className="grid grid-cols-4 gap-2 mb-8 border-b border-neutral-200 pb-4">
            {[
              { num: 1, label: '01. Задача' },
              { num: 2, label: '02. Металл' },
              { num: 3, label: '03. Операции' },
              { num: 4, label: '04. Спецификация' },
            ].map((step) => (
              <button
                key={step.num}
                onClick={() => setCurrentStep(step.num)}
                className={`text-left py-2 border-b-2 transition-all cursor-pointer ${
                  currentStep === step.num
                    ? 'border-black text-black font-semibold'
                    : currentStep > step.num
                    ? 'border-neutral-400 text-neutral-700'
                    : 'border-transparent text-neutral-400 hover:text-neutral-600'
                }`}
              >
                <div className="text-[10px] sm:text-xs font-mono tracking-wider uppercase">
                  {step.label}
                </div>
              </button>
            ))}
          </div>

          {/* STEP 1: Выбор задачи */}
          {currentStep === 1 && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4">
                Шаг 1 из 4 — Выбор направления
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => setTaskType(task.id)}
                    className={`p-5 border cursor-pointer transition-colors ${
                      taskType === task.id
                        ? 'border-black bg-neutral-50'
                        : 'border-neutral-200 hover:border-neutral-400 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-sm font-medium text-black">{task.title}</div>
                        <div className="text-xs text-neutral-500 mt-1 font-normal">{task.desc}</div>
                      </div>
                      <div
                        className={`w-4 h-4 border flex items-center justify-center shrink-0 mt-0.5 ${
                          taskType === task.id ? 'border-black bg-black text-white' : 'border-neutral-300'
                        }`}
                      >
                        {taskType === task.id && <Check className="w-2.5 h-2.5" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-4 border-t border-neutral-200">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-8 py-3.5 bg-black text-white text-[11px] font-mono uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Далее: Выбор металла</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Выбор сплава */}
          {currentStep === 2 && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4">
                Шаг 2 из 4 — Выбор марки стали
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {alloys.map((alloy) => (
                  <div
                    key={alloy.id}
                    onClick={() => setAlloyType(alloy.id)}
                    className={`p-5 border cursor-pointer transition-colors flex items-start justify-between ${
                      alloyType === alloy.id
                        ? 'border-black bg-neutral-50 shadow-xs'
                        : 'border-neutral-200 hover:border-neutral-400 bg-white'
                    }`}
                  >
                    <div className="pr-3">
                      <div className="text-sm font-medium text-black">{alloy.title}</div>
                      <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider mt-0.5">
                        {alloy.grade}
                      </div>
                      <div className="text-xs text-neutral-500 font-normal mt-1.5 leading-relaxed">{alloy.desc}</div>
                    </div>
                    <div
                      className={`w-4 h-4 border flex items-center justify-center shrink-0 mt-0.5 ${
                        alloyType === alloy.id ? 'border-black bg-black text-white' : 'border-neutral-300'
                      }`}
                    >
                      {alloyType === alloy.id && <Check className="w-2.5 h-2.5" />}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-6 py-3 border border-neutral-300 text-neutral-700 text-[11px] font-mono uppercase tracking-wider hover:border-black transition-colors cursor-pointer"
                >
                  Назад
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-8 py-3.5 bg-black text-white text-[11px] font-mono uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Далее: Операции</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Технологические операции */}
          {currentStep === 3 && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
                Шаг 3 из 4 — Выбор технологических операций
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
                {operations.map((op) => {
                  const isChecked = selectedOps.includes(op.id);
                  return (
                    <div
                      key={op.id}
                      onClick={() => handleToggleOp(op.id)}
                      className={`p-3 border cursor-pointer transition-all flex items-center justify-between ${
                        isChecked
                          ? 'border-black bg-neutral-50 shadow-xs'
                          : 'border-neutral-200 hover:border-neutral-400 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <div
                          className={`w-4 h-4 border flex items-center justify-center shrink-0 ${
                            isChecked ? 'border-black bg-black text-white' : 'border-neutral-300'
                          }`}
                        >
                          {isChecked && <Check className="w-2.5 h-2.5" />}
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-medium text-black truncate">{op.title}</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider shrink-0 bg-neutral-100 px-1.5 py-0.5 border border-neutral-200">
                        {op.badge}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Quantity in Pieces Selector with Number Input & Slider */}
              <div className="border border-neutral-200 p-4 mb-6 bg-neutral-50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider font-semibold text-black block">
                      Ориентировочная партия:
                    </label>
                    <div className="text-neutral-500 font-mono text-[11px] mt-0.5">
                      {estimatedQuantity === 1
                        ? 'Единичный образец'
                        : estimatedQuantity <= 10
                        ? 'Мелкосерийная партия'
                        : estimatedQuantity <= 100
                        ? 'Серийная поставка'
                        : 'Крупносерийное производство'}
                    </div>
                  </div>

                  {/* Manual exact number input */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-neutral-500">Точное кол-во:</span>
                    <div className="relative">
                      <input
                        type="number"
                        min={1}
                        max={10000}
                        value={estimatedQuantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          setEstimatedQuantity(isNaN(val) || val < 1 ? 1 : val);
                        }}
                        className="w-24 px-2.5 py-1.5 bg-white border border-neutral-300 focus:border-black focus:outline-none text-right font-mono text-sm font-semibold text-neutral-900"
                      />
                      <span className="absolute right-7 pointer-events-none top-1/2 -translate-y-1/2 text-xs text-neutral-400 font-mono"></span>
                    </div>
                    <span className="text-xs font-mono font-medium text-neutral-700">шт.</span>
                  </div>
                </div>

                <input
                  type="range"
                  min={1}
                  max={500}
                  step={1}
                  value={Math.min(estimatedQuantity, 500)}
                  onChange={(e) => setEstimatedQuantity(Number(e.target.value))}
                  className="w-full accent-black cursor-pointer h-1.5"
                />

                <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-neutral-500 font-mono mt-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-neutral-400">Быстрый выбор:</span>
                    {[1, 10, 25, 50, 100, 250, 500].map((qty) => (
                      <button
                        key={qty}
                        type="button"
                        onClick={() => setEstimatedQuantity(qty)}
                        className={`px-1.5 py-0.5 border text-[10px] font-mono transition-colors cursor-pointer ${
                          estimatedQuantity === qty
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
                        }`}
                      >
                        {qty}
                      </button>
                    ))}
                  </div>
                  <span className="text-neutral-400">или введите любое число в поле</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-3 border border-neutral-300 text-neutral-700 text-[11px] font-mono uppercase tracking-wider hover:border-black transition-colors cursor-pointer"
                >
                  Назад
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="px-8 py-3.5 bg-black text-white text-[11px] font-mono uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Далее: Параметры и контакты</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Спецификация параметров и Контактные данные */}
          {currentStep === 4 && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, x: 0 }}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
                {/* Summary & Guarantees card */}
                <div className="space-y-4">
                  <div className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                    Шаг 4 из 4 — Спецификация заявки
                  </div>

                  <div className="border border-neutral-200 bg-neutral-50 p-5 space-y-3">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-semibold border-b border-neutral-200 pb-2">
                      Параметры комплектации:
                    </div>
                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex justify-between items-start">
                        <span className="text-neutral-500">Направление:</span>
                        <span className="font-semibold text-neutral-900 text-right">{tasks.find(t => t.id === taskType)?.title}</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-neutral-500">Марка стали:</span>
                        <span className="font-semibold text-neutral-900 text-right">{alloys.find(a => a.id === alloyType)?.title}</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-neutral-500">Тираж:</span>
                        <span className="font-semibold text-neutral-900">{estimatedQuantity} шт.</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-neutral-500">Операции:</span>
                        <span className="font-semibold text-neutral-900 text-right">{selectedOps.length} поз.</span>
                      </div>
                    </div>
                  </div>

                  {/* Service Guarantees Card */}
                  <div className="border border-neutral-200 bg-white p-4 text-[11px] font-mono space-y-2.5 text-neutral-700">
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-black shrink-0" />
                      <span>Аудит и адаптация чертежей конструкторским бюро завода</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-black shrink-0" />
                      <span>Бесплатная оптимизация карт раскроя Nesting</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-black shrink-0" />
                      <span>Контроль ОТК и паспорт качества изделия (ГОСТ)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-black shrink-0" />
                      <span>Безналичный расчет с НДС 22%, 44-ФЗ и 223-ФЗ</span>
                    </div>
                  </div>
                </div>

                {/* Contact form inputs */}
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4">
                    Контактные данные для направления сметы
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-700 block mb-1">
                          Телефон для связи *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+7 (___) ___-__-__"
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          className="w-full px-3.5 py-3 border border-neutral-300 focus:outline-none focus:border-black text-xs font-mono bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-700 block mb-1">
                          Контактное лицо
                        </label>
                        <input
                          type="text"
                          placeholder="Иван Петров"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          className="w-full px-3.5 py-3 border border-neutral-300 focus:outline-none focus:border-black text-xs font-mono bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-700 block mb-1">
                          Компания / ИНН
                        </label>
                        <input
                          type="text"
                          placeholder="ООО СпецСтрой / 781700..."
                          value={contactCompany}
                          onChange={(e) => setContactCompany(e.target.value)}
                          className="w-full px-3.5 py-3 border border-neutral-300 focus:outline-none focus:border-black text-xs font-mono bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-700 block mb-1">
                          Email для официального КП
                        </label>
                        <input
                          type="email"
                          placeholder="tender@company.ru"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          className="w-full px-3.5 py-3 border border-neutral-300 focus:outline-none focus:border-black text-xs font-mono bg-white"
                        />
                      </div>
                    </div>

                    {/* Production parameters: Raw material & Urgency */}
                    <div className="p-3 bg-neutral-50 border border-neutral-200 space-y-3">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-semibold">
                        Параметры производственного цикла:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                        <div>
                          <label className="text-[10px] text-neutral-600 block mb-1">Снабжение металлом:</label>
                          <select
                            value={rawMaterial}
                            onChange={(e) => setRawMaterial(e.target.value as any)}
                            className="w-full p-2 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-black"
                          >
                            <option value="warehouse">Склад завода (металл в наличии)</option>
                            <option value="customer">Давальческий металл заказчика</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] text-neutral-600 block mb-1">Срочность выпуска:</label>
                          <select
                            value={urgency}
                            onChange={(e) => setUrgency(e.target.value as any)}
                            className="w-full p-2 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-black font-semibold"
                          >
                            <option value="standard">стандарт 10-15 раб.дней</option>
                            <option value="express">Экспресс: 2-3 раб.дня</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-700 block mb-1">
                        Техническое примечание / Требования по покраске
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Марка порошковой краски (RAL), адрес доставки в СПб/ЛО или требования по фаске..."
                        value={contactComment}
                        onChange={(e) => setContactComment(e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-neutral-300 focus:outline-none focus:border-black text-xs font-mono bg-white resize-none"
                      />
                    </div>

                    <ConsentCheckbox
                      id="calculator-consent"
                      checked={consentChecked}
                      onChange={setConsentChecked}
                      theme="light"
                      onOpenPrivacy={onOpenPrivacy}
                      onOpenOffer={onOpenOffer}
                    />

                    <button
                      type="submit"
                      disabled={isSubmitting || !consentChecked}
                      className="w-full py-4 bg-black hover:bg-neutral-800 text-white text-[11px] font-mono uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Расчет сметы...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Получить расчет сметы</span>
                        </>
                      )}
                    </button>
                    <div className="text-[10px] font-mono text-neutral-400 text-center">
                      Передача КД защищена соглашением о конфиденциальности • 152-ФЗ
                    </div>
                  </form>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-3 border border-neutral-300 text-neutral-700 text-[11px] font-mono uppercase tracking-wider hover:border-black transition-colors cursor-pointer"
                >
                  Назад
                </button>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );

  if (isOpenModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
        <div className="relative w-full max-w-5xl my-8">
          {onClose && (
            <button
              onClick={onClose}
              className="absolute -top-3 -right-3 z-50 p-2.5 bg-black text-white hover:bg-neutral-800 transition-colors border border-neutral-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {content}
        </div>
      </div>
    );
  }

  return (
    <section id="calculator" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA] border-b border-neutral-200">
      {content}
    </section>
  );
};
