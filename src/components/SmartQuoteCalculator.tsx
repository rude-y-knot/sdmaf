import React, { useState, useEffect } from 'react';
import { 
  X, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Calculator, 
  Upload, 
  Building2, 
  FileText, 
  Send,
  Sparkles,
  Layers,
  Phone,
  User,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SmartCaptchaWidget } from './SmartCaptchaWidget';
import { validateAntiSpam, recordSubmissionTimestamp } from '../services/antiSpamService';
import { sendLeadToBitrix24, buildBitrixLeadTitle } from '../services/bitrixService';

interface SmartQuoteCalculatorProps {
  onClose?: () => void;
  initialService?: string;
  isModal?: boolean;
  isOpenModal?: boolean;
  onOpenPrivacy?: () => void;
  onOpenOffer?: () => void;
}

export const SmartQuoteCalculator: React.FC<SmartQuoteCalculatorProps> = ({
  onClose,
  initialService,
  isModal,
  isOpenModal,
  onOpenPrivacy,
  onOpenOffer,
}) => {
  const showAsModal = isModal ?? isOpenModal ?? false;
  // Wizard state
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [taskType, setTaskType] = useState<string>('custom_ss');
  const [alloyType, setAlloyType] = useState<string>('stainless-304');
  const [selectedOps, setSelectedOps] = useState<string[]>([
    'cutting',
    'bending',
    'welding',
  ]);
  const [estimatedQuantity, setEstimatedQuantity] = useState<number>(1);
  const [urgency, setUrgency] = useState<string>('standard');
  const [hasDrawings, setHasDrawings] = useState<boolean>(true);
  const [materialSupply, setMaterialSupply] = useState<'factory' | 'customer'>('factory');

  // Contact form state
  const [contactName, setContactName] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');
  const [contactCompany, setContactCompany] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');

  // Submission & API state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [createdLeadId, setCreatedLeadId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string>('');
  const [honeypotTrap, setHoneypotTrap] = useState<string>('');
  const [formStartTime] = useState<number>(() => Date.now());

  useEffect(() => {
    if (initialService) {
      const s = initialService.toLowerCase();
      if (s.includes('чан') || s.includes('банный') || s.includes('купель')) {
        setTaskType('vat');
      } else if (s.includes('горка') || s.includes('скат') || s.includes('детск')) {
        setTaskType('slide');
      } else if (s.includes('маф') || s.includes('мебель') || s.includes('лавочк') || s.includes('скамь')) {
        setTaskType('maf');
      } else if (s.includes('арт') || s.includes('скульптур') || s.includes('зеркал')) {
        setTaskType('custom_ss');
      } else {
        setTaskType('seria');
      }
    }
  }, [initialService]);

  const tasks = [
    { id: 'slide', title: 'Скаты для детских горок', desc: 'Прямые, винтовые и тоннельные скаты из полированной нержавеющей стали AISI 304' },
    { id: 'vat', title: 'Банные чаны и СПА-купели', desc: 'Герметичные сварные чаши из нержавеющей стали AISI 304 / AISI 316' },
    { id: 'maf', title: 'Парковая мебель и МАФ', desc: 'Скамьи, перголы, навесы и урны из нержавеющей и оцинкованной стали' },
    { id: 'custom_ss', title: 'Авторские арт-объекты и порталы', desc: 'Зеркальная и шлифованная аустенитная/ферритная нержавеющая сталь' },
    { id: 'seria', title: 'Серийные партии продукции', desc: 'Серийные партии элементов благоустройства девелоперских ЖК' },
  ];

  const alloys = [
    {
      id: 'stainless-304',
      title: 'Нержавеющая сталь AISI 304',
      grade: '08Х18Н10 (аустенитный класс)',
      desc: 'Базовая аустенитная коррозионностойкая сталь. Идеальна для скатов горок, банных чанов, парковой мебели и городских МАФ.',
    },
    {
      id: 'stainless-316',
      title: 'Нержавеющая сталь AISI 316',
      grade: '03Х17Н14М2 (аустенитный кислотостойкий класс)',
      desc: 'Повышенная стойкость к морскому климату, соленой воде и дорожным реагентам. Рекомендована для набережных и бассейнов.',
    },
    {
      id: 'stainless-321',
      title: 'Нержавеющая сталь AISI 321',
      grade: '12Х18Н10Т (аустенитный жаростойкий класс)',
      desc: 'Легированная титаном аустенитная сталь. Устойчива к межкристаллитной коррозии, перепадам температур и термическим нагрузкам.',
    },
    {
      id: 'stainless-439-430',
      title: 'Нержавеющая сталь AISI 439 / AISI 430',
      grade: '08Х17Т / 12Х17 (ферритный безникелевый класс)',
      desc: 'Высоколегированная ферритная нержавеющая сталь. Устойчива к коррозии в атмосферных средах, перепадам температур и окислению.',
    },
    {
      id: 'stainless-310',
      title: 'Нержавеющая сталь AISI 310S',
      grade: '20Х23Н18 (высоколегированный аустенитный класс)',
      desc: 'Жаропрочная аустенитная сталь с содержанием хрома 25% и никеля 20% для работы при температурах до 1000–1100°C.',
    },
    {
      id: 'galvanized',
      title: 'Оцинкованный прокат',
      grade: 'ГОСТ 14918-2020 / ГОСТ 9.307-89',
      desc: 'Металлопрокат с надежным защитным цинковым слоем для несущих каркасов под порошковую окраску RAL.',
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

  const handleToggleOp = (id: string) => {
    setSelectedOps((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanPhone = contactPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Пожалуйста, укажите корректный номер телефона (минимум 10 цифр)');
      return;
    }

    // Anti-spam validation (Honeypot + Cooldown check)
    const spamCheck = validateAntiSpam({
      honeypotValue: honeypotTrap,
      formStartTime: formStartTime,
      captchaToken: captchaToken,
    });

    if (!spamCheck.allowed) {
      if (spamCheck.waitRemainingSeconds) {
        setErrorMessage(`Заявка уже отправлена. Повторная отправка возможна через ${spamCheck.waitRemainingSeconds} сек.`);
      } else {
        // Honeypot or bot speed detected: show graceful simulation without polluting CRM
        setIsSubmitted(true);
        setCreatedLeadId(`PROT-${Date.now().toString().slice(-4)}`);
      }
      return;
    }

    setIsSubmitting(true);

    const selectedTaskObj = tasks.find((t) => t.id === taskType);
    const selectedAlloyObj = alloys.find((a) => a.id === alloyType);
    const selectedOpsTitles = selectedOps
      .map((opId) => operations.find((o) => o.id === opId)?.title)
      .filter(Boolean)
      .join(', ');

    const leadTitle = `Расчет: ${selectedTaskObj?.title || 'Изделие'} (${estimatedQuantity} шт.) - ${contactName || 'Заказчик'}`;

    try {
      const result = await sendLeadToBitrix24({
        sourceType: 'laser_calculator',
        title: leadTitle,
        name: contactName,
        phone: contactPhone,
        company: contactCompany,
        captchaToken: captchaToken,
        details: {
          'Тип продукции': selectedTaskObj?.title || 'Изделие',
          'Марка стали': `${selectedAlloyObj?.title || 'Сталь'} (${selectedAlloyObj?.grade || ''})`,
          'Тираж/Количество': `${estimatedQuantity} шт.`,
          'Поставка металла': materialSupply === 'customer' ? 'Давальческое сырье заказчика' : 'Собственный металл завода',
          'Технологические операции': selectedOpsTitles,
          'Наличие чертежей': hasDrawings ? 'Предоставлены заказчиком' : 'Требуется разработка КБ завода',
          'Срочность': urgency === 'urgent' ? 'СРОЧНО (24–48 часов, приоритет)' : urgency === 'express' ? 'Ускоренно (3–5 дней)' : 'Стандартный график',
          'Комментарий': comment || '—',
        },
        files: fileName ? [{ name: fileName }] : [],
      });

      if (result.success) {
        recordSubmissionTimestamp();
        setIsSubmitted(true);
        if (result.leadId) {
          setCreatedLeadId(String(result.leadId));
        }
      } else {
        setErrorMessage(
          result.error || 'Не удалось отправить заявку. Попробуйте еще раз или свяжитесь с нами по телефону.'
        );
      }
    } catch {
      setErrorMessage('Произошла непредвиденная ошибка при отправке заявки.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const content = (
    <div className="bg-white border border-neutral-200 p-4 sm:p-8 md:p-10 max-w-5xl mx-auto relative">
      {showAsModal && onClose && (
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-5 sm:right-5 z-40 p-2 text-neutral-500 hover:text-black bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 transition-colors cursor-pointer"
          title="Закрыть"
          aria-label="Закрыть окно расчета"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Header of the Calculator */}
      <div className="pb-6 sm:pb-8 mb-6 sm:mb-8 border-b border-neutral-200 pr-10 sm:pr-0">
        <div className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] sm:tracking-[0.25em] uppercase text-neutral-400 mb-1 sm:mb-2">
          ИНЖЕНЕРНАЯ КАЛЬКУЛЯЦИЯ / ТЕХНОЛОГИЧЕСКИЙ АУДИТ
        </div>
        <h2 className="text-xl sm:text-3xl md:text-4xl font-light text-neutral-900 tracking-tight">
          Расчет стоимости производства
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1 sm:mt-2 max-w-xl font-normal">
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
              Расчет сметы поступит на номер {contactPhone}
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
        /* WIZARD FORM STEPS */
        <div>
          {/* Step Progress Indicators */}
          <div className="grid grid-cols-4 gap-2 mb-8 font-mono text-[11px]">
            {[
              { num: 1, label: '01. Задача' },
              { num: 2, label: '02. Сплав' },
              { num: 3, label: '03. Операции' },
              { num: 4, label: '04. Контакты' },
            ].map((st) => (
              <div
                key={st.num}
                onClick={() => {
                  if (st.num < currentStep) setCurrentStep(st.num);
                }}
                className={`py-2 px-2 border text-center transition-colors ${
                  st.num < currentStep ? 'cursor-pointer' : ''
                } ${
                  currentStep === st.num
                    ? 'border-black bg-black text-white'
                    : currentStep > st.num
                    ? 'border-neutral-300 bg-neutral-100 text-neutral-800 font-medium'
                    : 'border-neutral-200 text-neutral-400'
                }`}
              >
                <span>{st.label}</span>
              </div>
            ))}
          </div>

          {/* STEP 1: Тип продукции */}
          {currentStep === 1 && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4">
                Шаг 1 из 4 — Выбор направления продукции
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => setTaskType(task.id)}
                    className={`p-5 border cursor-pointer transition-colors flex items-start justify-between ${
                      taskType === task.id
                        ? 'border-black bg-neutral-50 shadow-xs'
                        : 'border-neutral-200 hover:border-neutral-400 bg-white'
                    }`}
                  >
                    <div className="pr-3">
                      <div className="text-sm font-medium text-black">{task.title}</div>
                      <div className="text-xs text-neutral-500 font-normal mt-1 leading-relaxed">{task.desc}</div>
                    </div>
                    <div
                      className={`w-4 h-4 border flex items-center justify-center shrink-0 mt-0.5 ${
                        taskType === task.id ? 'border-black bg-black text-white' : 'border-neutral-300'
                      }`}
                    >
                      {taskType === task.id && <Check className="w-2.5 h-2.5" />}
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
                Шаг 2 из 4 — Выбор марки нержавеющей и оцинкованной стали (аустенитные и ферритные классы)
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

              {/* Quantity Selector */}
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

                  {/* Material supply choice */}
                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-600 font-medium block mb-1.5">
                      Поставка металлопроката:
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <button
                        type="button"
                        onClick={() => setMaterialSupply('factory')}
                        className={`p-2.5 border text-left cursor-pointer transition-colors ${
                          materialSupply === 'factory'
                            ? 'border-black bg-black text-white'
                            : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400'
                        }`}
                      >
                        Собственный металл завода
                      </button>
                      <button
                        type="button"
                        onClick={() => setMaterialSupply('customer')}
                        className={`p-2.5 border text-left cursor-pointer transition-colors ${
                          materialSupply === 'customer'
                            ? 'border-black bg-black text-white'
                            : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400'
                        }`}
                      >
                        Давальческое сырье
                      </button>
                    </div>
                  </div>

                  {/* Urgency selection */}
                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-600 font-medium block mb-1.5">
                      Срочность изготовления:
                    </label>
                    <div className="grid grid-cols-3 gap-1.5 text-[11px] font-mono">
                      {[
                        { id: 'standard', label: 'Стандарт', badge: '7–14 дней' },
                        { id: 'express', label: 'Экспресс', badge: '3–5 дней' },
                        { id: 'urgent', label: 'Срочно 24ч', badge: 'Приоритет' },
                      ].map((urg) => (
                        <button
                          key={urg.id}
                          type="button"
                          onClick={() => setUrgency(urg.id)}
                          className={`p-2 border text-center cursor-pointer transition-colors ${
                            urgency === urg.id
                              ? 'border-black bg-neutral-900 text-white'
                              : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400'
                          }`}
                        >
                          <div className="font-semibold">{urg.label}</div>
                          <div className={`text-[9px] ${urgency === urg.id ? 'text-neutral-300' : 'text-neutral-400'}`}>
                            {urg.badge}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Drawings file upload */}
                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-600 font-medium block mb-1.5">
                      Чертежи или эскизы (DXF / DWG / STEP / PDF):
                    </label>
                    <label className="border border-dashed border-neutral-300 bg-neutral-50 hover:bg-neutral-100 transition-colors p-3 flex items-center justify-center gap-2 cursor-pointer text-xs font-mono text-neutral-600">
                      <Upload className="w-4 h-4 text-neutral-400" />
                      <span>{fileName ? fileName : 'Прикрепить файл КД (до 50 МБ)'}</span>
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        className="hidden"
                        accept=".dxf,.dwg,.step,.stp,.pdf,.igs,.iges,.zip,.rar"
                      />
                    </label>
                  </div>
                </div>

                {/* Contact inputs form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                    Контактные данные для КП
                  </div>

                  {errorMessage && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-mono">
                      {errorMessage}
                    </div>
                  )}

                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-600 block mb-1">
                      Ваше имя или название компании *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Александр / ООО «СеверСтрой»"
                        className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 focus:border-black focus:outline-none text-xs text-neutral-900 font-medium"
                      />
                      <User className="w-4 h-4 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-600 block mb-1">
                      Телефон для связи и WhatsApp *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="+7 (999) 000-00-00"
                        className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 focus:border-black focus:outline-none text-xs text-neutral-900 font-mono font-medium"
                      />
                      <Phone className="w-4 h-4 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-600 block mb-1">
                      Организация / ИНН (для выставления счета с НДС):
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={contactCompany}
                        onChange={(e) => setContactCompany(e.target.value)}
                        placeholder="ООО «Группа ЛСР» / ИНН 78..."
                        className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 focus:border-black focus:outline-none text-xs text-neutral-900"
                      />
                      <Building2 className="w-4 h-4 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-600 block mb-1">
                      Комментарий или требования к упаковке/доставке:
                    </label>
                    <textarea
                      rows={3}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Укажите особые требования к полировке, сертификатам НАКС, отгрузке..."
                      className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 focus:border-black focus:outline-none text-xs text-neutral-900 resize-none"
                    />
                  </div>

                  {/* Honeypot anti-spam invisible field */}
                  <div style={{ display: 'none', position: 'absolute', left: '-9999px' }} aria-hidden="true">
                    <input
                      type="text"
                      name="website_url_check"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypotTrap}
                      onChange={(e) => setHoneypotTrap(e.target.value)}
                    />
                  </div>

                  {/* Yandex SmartCaptcha Widget */}
                  <SmartCaptchaWidget
                    theme="light"
                    onSuccess={(token) => setCaptchaToken(token)}
                    onReset={() => setCaptchaToken('')}
                  />

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 bg-black text-white text-[11px] font-mono uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Передача в КБ завода...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Получить расчет и коммерческое предложение</span>
                        </>
                      )}
                    </button>
                    <div className="text-[10px] font-mono text-neutral-400 text-center mt-2">
                      Нажимая кнопку, вы соглашаетесь на обработку данных по 152-ФЗ РФ
                    </div>
                  </div>
                </form>
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

  if (showAsModal) {
    return (
      <div 
        className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-black/80 backdrop-blur-xs p-2 sm:p-4 md:p-6"
        style={{ WebkitOverflowScrolling: 'touch' }}
        onClick={(e) => {
          if (e.target === e.currentTarget && onClose) {
            onClose();
          }
        }}
      >
        <div className="min-h-full flex items-start sm:items-center justify-center py-4 sm:py-8">
          <div 
            className="relative w-full max-w-5xl shadow-2xl my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section id="calculator" className="py-16 bg-[#FAFAFA] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {content}
      </div>
    </section>
  );
};
