import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Clock, 
  Truck, 
  ShieldCheck, 
  FileText, 
  CreditCard, 
  HelpCircle, 
  Phone, 
  Mail, 
  Calculator, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  MapPin, 
  ChevronDown, 
  ChevronRight,
  Share2,
  Copy,
  Check,
  Download,
  AlertCircle,
  FileCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SEOHead } from '../components/SEOHead';
import { FAQ_DATA, FAQItem } from '../components/FAQSection';

interface FAQPageProps {
  onBackToHome: () => void;
  onOpenCalculator: (service?: string) => void;
  onOpenMeasurerModal: () => void;
  onNavigateToCatalog?: () => void;
  onNavigateToProduction?: () => void;
  onNavigateToContacts?: () => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({
  onBackToHome,
  onOpenCalculator,
  onOpenMeasurerModal,
  onNavigateToCatalog,
  onNavigateToProduction,
  onNavigateToContacts,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'timeline' | 'delivery' | 'warranty' | 'engineering' | 'payment'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<string[]>(['timeline-standard', 'delivery-geo', 'warranty-periods']);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Quick Question Form
  const [askName, setAskName] = useState('');
  const [askContact, setAskContact] = useState('');
  const [askMessage, setAskMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Scroll to hash on mount if present
  useEffect(() => {
    if (window.location.hash) {
      const targetId = window.location.hash.replace('#', '');
      const item = FAQ_DATA.find(i => i.id === targetId);
      if (item) {
        setOpenItems(prev => prev.includes(targetId) ? prev : [...prev, targetId]);
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 200);
      }
    }
  }, []);

  const categories = [
    { id: 'all' as const, label: 'Все вопросы', count: FAQ_DATA.length, icon: HelpCircle },
    { id: 'timeline' as const, label: 'Сроки изготовления', count: FAQ_DATA.filter(i => i.category === 'timeline').length, icon: Clock },
    { id: 'delivery' as const, label: 'Доставка и самовывоз', count: FAQ_DATA.filter(i => i.category === 'delivery').length, icon: Truck },
    { id: 'warranty' as const, label: 'Гарантия и ГОСТ', count: FAQ_DATA.filter(i => i.category === 'warranty').length, icon: ShieldCheck },
    { id: 'engineering' as const, label: 'Чертежи и CAD', count: FAQ_DATA.filter(i => i.category === 'engineering').length, icon: FileText },
    { id: 'payment' as const, label: 'Оплата и 44-ФЗ', count: FAQ_DATA.filter(i => i.category === 'payment').length, icon: CreditCard },
  ];

  const filteredItems = useMemo(() => {
    return FAQ_DATA.filter(item => {
      const matchesCat = activeCategory === 'all' || item.category === activeCategory;
      if (!matchesCat) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q) ||
        (item.highlights && item.highlights.some(h => h.toLowerCase().includes(q)))
      );
    });
  }, [activeCategory, searchQuery]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const handleExpandAll = () => {
    setOpenItems(filteredItems.map(i => i.id));
  };

  const handleCollapseAll = () => {
    setOpenItems([]);
  };

  const handleCopyLink = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/faq#${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!askContact.trim() || !askMessage.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      setAskName('');
      setAskContact('');
      setAskMessage('');
    }, 800);
  };

  // Generate Schema.org JSON-LD for Google & Yandex FAQ Rich Snippets
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': FAQ_DATA.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': `${item.answer}${item.highlights && item.highlights.length > 0 ? ` Ключевые регламенты: ${item.highlights.join('; ')}.` : ''}`
      }
    }))
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Главная',
        'item': 'https://sdmaf.ru/'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Частые вопросы (FAQ)',
        'item': 'https://sdmaf.ru/faq'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-neutral-900">
      {/* SEO Engine Integration */}
      <SEOHead
        title="Частые вопросы и регламенты (FAQ) — Завод «Стальное Дело» СПб"
        description="Ответы на ключевые вопросы заказчиков: сроки производства металлоконструкций (от 24ч), доставка по СПб и регионам РФ, гарантия до 10 лет, требования ГОСТ и ТР ЕАЭС 042, форматы чертежей DWG/STEP, оплата с НДС 22% и 44-ФЗ."
        keywords="сроки изготовления металлоконструкций, доставка маф спб, гарантия на маф гост, тр еаэс 042 2017 горки, чертежи step dwg лазерная резка, завод стальное дело колпино частые вопросы faq"
        canonicalPath="/faq"
        jsonLd={[faqSchema, breadcrumbSchema]}
      />

      {/* Top Breadcrumb Navigation */}
      <div className="bg-white border-b border-neutral-200 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono">
          <nav className="flex items-center gap-2 text-neutral-500 overflow-x-auto no-scrollbar whitespace-nowrap">
            <button 
              onClick={onBackToHome}
              className="hover:text-black transition-colors cursor-pointer"
            >
              Главная
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="text-black font-medium">Частые вопросы (FAQ)</span>
          </nav>

          <div className="hidden sm:flex items-center gap-4 text-neutral-500">
            <span>Обновлено: Сентябрь 2026</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span className="text-emerald-700 font-medium">Актуальные регламенты завода</span>
          </div>
        </div>
      </div>

      {/* Hero Header Section */}
      <section className="bg-white border-b border-neutral-200 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-neutral-100 border border-neutral-200 text-neutral-700 font-mono text-[11px] uppercase tracking-wider mb-4">
              <span className="w-2 h-2 bg-neutral-900 inline-block"></span>
              <span>База знаний • Регламенты взаимодействия</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-light text-neutral-900 tracking-tight leading-tight mb-4">
              Часто задаваемые вопросы и технические регламенты
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
              Справочник для девелоперов, архитекторов, закупщиков и подрядчиков: нормативы сроков изготовления, логистика по России и ЕАЭС, гарантийные обязательства по ГОСТ и стандарты подготовки чертежей.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-neutral-100">
            <div className="p-4 bg-[#FAFAFA] border border-neutral-200">
              <div className="text-[10px] font-mono text-neutral-500 uppercase">ЧПУ Раскрой / Гибка</div>
              <div className="text-xl sm:text-2xl font-light text-neutral-900 mt-1">от 24 часов</div>
              <div className="text-[11px] text-neutral-500 mt-0.5">при наличии металла на складе</div>
            </div>
            <div className="p-4 bg-[#FAFAFA] border border-neutral-200">
              <div className="text-[10px] font-mono text-neutral-500 uppercase">Заводская гарантия</div>
              <div className="text-xl sm:text-2xl font-light text-neutral-900 mt-1">до 10 лет</div>
              <div className="text-[11px] text-neutral-500 mt-0.5">на нержавеющую сталь AISI 304</div>
            </div>
            <div className="p-4 bg-[#FAFAFA] border border-neutral-200">
              <div className="text-[10px] font-mono text-neutral-500 uppercase">География поставок</div>
              <div className="text-xl sm:text-2xl font-light text-neutral-900 mt-1">РФ и ЕАЭС</div>
              <div className="text-[11px] text-neutral-500 mt-0.5">свой автопарк + еврофуры ТК</div>
            </div>
            <div className="p-4 bg-[#FAFAFA] border border-neutral-200">
              <div className="text-[10px] font-mono text-neutral-500 uppercase">Госзаказ и девелопмент</div>
              <div className="text-xl sm:text-2xl font-light text-neutral-900 mt-1">44 / 223-ФЗ</div>
              <div className="text-[11px] text-neutral-500 mt-0.5">НДС 22%, паспорта качества и сертификаты на материалы</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main FAQ Search & Content Area */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Search & Actions Bar */}
        <div className="bg-white border border-neutral-200 p-4 sm:p-5 mb-8 shadow-xs">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск по базе знаний (например: сроки, доставка, гарантия, AISI 304, паспорта качества, сертификаты)..."
                className="w-full bg-[#FAFAFA] border border-neutral-200 text-xs sm:text-sm text-neutral-900 pl-10 pr-20 py-2.5 rounded-none focus:outline-none focus:border-black transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-neutral-400 hover:text-black cursor-pointer"
                >
                  Очистить
                </button>
              )}
            </div>

            {/* Expand / Collapse Controls */}
            <div className="flex items-center gap-2 self-end md:self-center text-xs font-mono shrink-0">
              <button
                onClick={handleExpandAll}
                className="px-3.5 py-2 border border-neutral-200 hover:border-neutral-900 text-neutral-700 hover:text-black bg-white transition-colors cursor-pointer"
              >
                Развернуть все ({filteredItems.length})
              </button>
              <button
                onClick={handleCollapseAll}
                className="px-3.5 py-2 border border-neutral-200 hover:border-neutral-900 text-neutral-700 hover:text-black bg-white transition-colors cursor-pointer"
              >
                Свернуть все
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 mt-4 no-scrollbar border-t border-neutral-100 pt-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-black text-white border border-black font-medium'
                      : 'bg-[#FAFAFA] text-neutral-600 border border-neutral-200 hover:border-neutral-400 hover:text-black'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-neutral-500'}`} />
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 ${isActive ? 'bg-neutral-800 text-neutral-200' : 'bg-neutral-200 text-neutral-700'}`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Two-column Layout: Questions List + Side Consult Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main FAQ Questions (8 Columns) */}
          <div className="lg:col-span-8 space-y-3.5">
            {filteredItems.length === 0 ? (
              <div className="p-12 text-center border border-neutral-200 bg-white">
                <HelpCircle className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
                <h3 className="text-base font-medium text-neutral-900 mb-1">Вопросов не найдено</h3>
                <p className="text-xs text-neutral-500 font-light max-w-sm mx-auto mb-5">
                  По запросу «{searchQuery}» совпадений нет. Вы можете отправить вопрос нашему дежурному инженеру.
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors"
                >
                  Сбросить фильтр поиска
                </button>
              </div>
            ) : (
              filteredItems.map((item, index) => {
                const isOpen = openItems.includes(item.id);
                return (
                  <article
                    id={item.id}
                    key={item.id}
                    className={`border transition-all duration-200 ${
                      isOpen 
                        ? 'border-neutral-900 bg-white shadow-xs' 
                        : 'border-neutral-200 bg-white hover:border-neutral-400'
                    }`}
                  >
                    <div
                      onClick={() => toggleItem(item.id)}
                      className="p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer select-none"
                    >
                      <div className="flex items-start gap-4">
                        <span className="font-mono text-xs text-neutral-400 font-semibold pt-1 shrink-0">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-neutral-100 border border-neutral-200 text-neutral-700">
                              {item.badge}
                            </span>
                          </div>
                          <h2 className="text-base sm:text-lg font-medium text-neutral-900 leading-snug tracking-tight">
                            {item.question}
                          </h2>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 mt-1">
                        <button
                          title="Скопировать прямую ссылку на вопрос"
                          onClick={(e) => handleCopyLink(item.id, e)}
                          className="w-7 h-7 border border-neutral-200 hover:border-neutral-900 flex items-center justify-center text-neutral-500 hover:text-black transition-colors"
                        >
                          {copiedId === item.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Share2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <div className={`w-7 h-7 border flex items-center justify-center transition-transform duration-200 ${
                          isOpen 
                            ? 'border-neutral-900 bg-black text-white rotate-180' 
                            : 'border-neutral-300 bg-white text-neutral-600'
                        }`}>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-neutral-100 text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                            <p className="mb-4">
                              {item.answer}
                            </p>

                            {item.highlights && item.highlights.length > 0 && (
                              <div className="bg-[#FAFAFA] border border-neutral-200 p-4 space-y-2">
                                <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-medium">
                                  Нормативные регламенты завода:
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-neutral-800">
                                  {item.highlights.map((hl, hIdx) => (
                                    <div key={hIdx} className="flex items-center gap-2">
                                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                      <span>{hl}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </article>
                );
              })
            )}

            {/* Bottom Callout Banner */}
            <div className="bg-neutral-900 text-white p-6 sm:p-8 mt-8 border border-neutral-900">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
                    [ Экспресс-расчет по чертежам ]
                  </div>
                  <h3 className="text-xl font-light tracking-tight text-white mb-2">
                    Не нашли ответ на свой вопрос?
                  </h3>
                  <p className="text-xs text-neutral-400 font-light max-w-lg">
                    Пришлите спецификацию или 3D-модель (STEP, DXF, PDF). Инженеры конструкторского бюро рассчитают стоимость, расход металла и сроки в течение 60 минут.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                  <button
                    onClick={() => onOpenCalculator()}
                    className="py-3 px-5 bg-white text-black text-xs font-mono uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 font-medium cursor-pointer"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>Рассчитать смету</span>
                  </button>
                  <button
                    onClick={onOpenMeasurerModal}
                    className="py-3 px-5 border border-neutral-700 hover:border-white text-white text-xs font-mono uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Layers className="w-4 h-4 text-neutral-400" />
                    <span>Вызвать инженера</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Side Panels (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Ask Engineer Form */}
            <div className="bg-white border border-neutral-200 p-6 shadow-xs">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-neutral-700" />
                <span>Задать вопрос инженеру</span>
              </div>
              <h3 className="text-base font-normal text-neutral-900 mb-1 tracking-tight">
                Прямая связь с технологом
              </h3>
              <p className="text-xs text-neutral-500 font-light mb-4">
                Ответим в течение 15 минут в рабочее время с 08:00 до 16:30.
              </p>

              {submittedSuccess ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs">
                  <div className="flex items-center gap-2 font-semibold mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Вопрос успешно передан!</span>
                  </div>
                  <p className="text-[11px] text-emerald-800 font-light">
                    Дежурный инженер завода свяжется с вами по указанному контакту.
                  </p>
                  <button
                    onClick={() => setSubmittedSuccess(false)}
                    className="mt-3 text-[11px] font-mono text-emerald-700 underline hover:text-emerald-900"
                  >
                    Отправить еще один вопрос
                  </button>
                </div>
              ) : (
                <form onSubmit={handleAskQuestion} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-600 mb-1">
                      Ваше имя или организация:
                    </label>
                    <input
                      type="text"
                      value={askName}
                      onChange={(e) => setAskName(e.target.value)}
                      placeholder="Иван / ООО «Девелопмент»"
                      className="w-full bg-[#FAFAFA] border border-neutral-200 text-xs text-neutral-900 px-3 py-2 focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-neutral-600 mb-1">
                      Телефон или Email <span className="text-red-500">*</span>:
                    </label>
                    <input
                      type="text"
                      required
                      value={askContact}
                      onChange={(e) => setAskContact(e.target.value)}
                      placeholder="+7 (999) 000-00-00 / zakaz@..."
                      className="w-full bg-[#FAFAFA] border border-neutral-200 text-xs text-neutral-900 px-3 py-2 focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-neutral-600 mb-1">
                      Ваш вопрос <span className="text-red-500">*</span>:
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={askMessage}
                      onChange={(e) => setAskMessage(e.target.value)}
                      placeholder="Интересует лазерная резка стали 12 мм или сроки изготовления ската..."
                      className="w-full bg-[#FAFAFA] border border-neutral-200 text-xs text-neutral-900 px-3 py-2 focus:outline-none focus:border-black resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 px-4 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Отправка...</span>
                    ) : (
                      <>
                        <span>Отправить вопрос</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Industrial Plant Reference Card */}
            <div className="bg-white border border-neutral-200 p-6 space-y-4 shadow-xs">
              <div className="border-b border-neutral-200 pb-3">
                <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                  [ Производственная база ]
                </div>
                <h4 className="text-sm font-medium text-neutral-900 mt-1">
                  Завод «Стальное Дело»
                </h4>
              </div>

              <div className="space-y-3 text-xs text-neutral-700">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-neutral-900">Адрес производства и склада:</div>
                    <div className="text-neutral-600">г. Санкт-Петербург, Колпино, ул. Финляндская, 3</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-neutral-900">Режим работы и отгрузки:</div>
                    <div className="text-neutral-600">Пн–Пт с 08:00 до 16:30 (без перерыва)</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-neutral-900">Многоканальный телефон:</div>
                    <a href="tel:+78122007706" className="text-black hover:underline font-mono">
                      +7 (812) 200-77-06
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-neutral-900">Отдел расчетов и чертежей:</div>
                    <a href="mailto:info@sdmaf.ru" className="text-black hover:underline font-mono">
                      info@sdmaf.ru
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Standards & Certifications Badges */}
            <div className="bg-[#FAFAFA] border border-neutral-200 p-5 space-y-3 text-xs">
              <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                [ Стандарты качества ]
              </div>
              <ul className="space-y-2 text-neutral-700 font-mono text-[11px]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>ТР ЕАЭС 042/2017 (Детские горки)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>ГОСТ Р 52169-2012 / ГОСТ 34614</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Аттестация сварщиков НАКС</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Порошковая окраска Qualicoat (RAL)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Сертификаты стали Северсталь, НЛМК</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
