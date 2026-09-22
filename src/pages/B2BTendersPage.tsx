import React, { useState, useRef } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  FileText, 
  Layers, 
  Truck, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  FileSpreadsheet, 
  Cpu, 
  Award, 
  Scale, 
  Send, 
  Check, 
  MapPin, 
  HelpCircle, 
  ExternalLink,
  ChevronRight,
  RefreshCw,
  Database,
  UploadCloud,
  FileCode2,
  X
} from 'lucide-react';
import { ConsentCheckbox } from '../components/ConsentCheckbox';
import { sendLeadToBitrix24 } from '../services/bitrixService';
import { uploadFilesToServer } from '../services/uploadService';
import { SEOHead } from '../components/SEOHead';

interface B2BTendersPageProps {
  onBackToHome: () => void;
  onOpenCalculator: () => void;
  onOpenMeasurerModal: () => void;
  onNavigateToCatalog?: () => void;
  onNavigateToProduction?: () => void;
  onNavigateToContacts?: () => void;
  onOpenPrivacy?: () => void;
  onOpenOffer?: () => void;
}

export const B2BTendersPage: React.FC<B2BTendersPageProps> = ({
  onBackToHome,
  onOpenCalculator,
  onOpenMeasurerModal,
  onNavigateToCatalog,
  onNavigateToProduction,
  onNavigateToContacts,
  onOpenPrivacy,
  onOpenOffer,
}) => {
  // Form State
  const [formName, setFormName] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formInn, setFormInn] = useState('');
  const [contractType, setContractType] = useState('44-ФЗ / 223-ФЗ (Госзакупки)');
  const [needBankGuarantee, setNeedBankGuarantee] = useState(false);
  const [formTenderNumber, setFormTenderNumber] = useState('');
  const [formComment, setFormComment] = useState('');
  const [consentChecked, setConsentChecked] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; size: string; url?: string; fileName?: string }>>([]);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [createdLeadId, setCreatedLeadId] = useState<string | number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Active Audience Tab
  const [activeAudience, setActiveAudience] = useState<number>(0);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsUploadingFile(true);
    try {
      const serverFiles = await uploadFilesToServer(files);
      const newItems = serverFiles.map((sf) => ({
        name: sf.originalName || sf.name,
        size: sf.size,
        url: sf.url,
        fileName: sf.fileName,
      }));
      setUploadedFiles((prev) => [...prev, ...newItems]);
    } catch (err) {
      console.warn('Error uploading tender files:', err);
    } finally {
      setIsUploadingFile(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!formPhone && !formEmail) || !consentChecked) return;
    setIsSubmitting(true);

    try {
      const result = await sendLeadToBitrix24({
        sourceType: 'b2b_tender',
        title: `[Тендер B2B / Госзаказ] ${formCompany || 'Организация'} — ${formTenderNumber || 'Запрос ТЗ'}`,
        name: formName || 'Представитель B2B',
        phone: formPhone,
        email: formEmail,
        company: formCompany,
        department: 'Тендерный отдел 44-ФЗ/223-ФЗ и сопровождения госзакупок',
        pageSource: 'Страница: B2B и Тендерный отдел (44-ФЗ / 223-ФЗ / ГОЗ)',
        details: {
          'Тип контракта': contractType,
          'Банковская гарантия / Спецсчет': needBankGuarantee ? 'Требуется банковская гарантия исполнения контракта' : 'Не требуется',
          'Номер закупки / ЕИС / ТЗ': formTenderNumber || 'Прямой запрос на расчет сметы',
          'Контактное лицо': formName,
          'Организация / ИНН': formCompany,
          'Комментарий к поставке': formComment,
        },
        files: uploadedFiles
      });

      if (result.leadId) {
        setCreatedLeadId(result.leadId);
      }
    } catch (err) {
      console.warn('Bitrix lead dispatch error:', err);
    } finally {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }
  };

  const audiences = [
    {
      id: 'developers',
      title: 'Девелоперы и Генподрядчики',
      subtitle: 'Комплексное благоустройство дворов и общественных пространств ЖК',
      desc: 'Прямые поставки от производителя с фиксированными сроками в графике строительства. Изготовление серийных и индивидуальных МАФ, крупноузловая заводская готовность, шеф-монтаж и сдача Госкомиссии.',
      features: [
        'Соответствие стандартам ПИК, Setl Group, ЛСР, ЦДС, GloraX',
        'Полный пакет исполнительной документации: КС-2, КС-3, паспорта качества',
        'Поэтапная отгрузка точно к графику сдачи очередей строительства',
        'Гарантия на изделия до 10 лет с постгарантийным сервисом'
      ],
      tags: ['ПИК-Стандарт', 'ЛСР', 'Setl Group', 'КС-2 / КС-3', 'Шеф-монтаж', 'График поставок'],
      stats: [
        { label: 'Сданных ЖК', val: '65+' },
        { label: 'Срок службы', val: '25+ лет' },
        { label: 'Гарантия', val: 'до 10 лет' }
      ]
    },
    {
      id: 'architects',
      title: 'Архитектурные и ландшафтные бюро',
      subtitle: 'Воплощение сложных концепций, 3D/BIM-моделирование и прототипирование',
      desc: 'Инженерная адаптация дизайн-проектов в рабочую документацию КМ/КМД с учетом ветровых, снеговых и динамических нагрузок по СП 16.13330. Изготовление натурных образцов выкраски и пробных узлов.',
      features: [
        'Библиотека готовых BIM-семейств (Revit, IFC) и CAD-чертежей (DWG, STEP)',
        'Комбинация материалов: сталь Ст3/09Г2С, AISI 304, лиственница, термоясень, HPL-пластик',
        'Порошковая окраска в любые оттенки RAL Classic, Design, муар, шагрень, спецэффекты',
        'Сохранение первоначальной архитектурной эстетики без упрощения форм'
      ],
      tags: ['BIM Revit', 'SolidWorks', 'Образцы выкраски', 'Авторский надзор', 'Лиственница / HPL', 'Нестандарт'],
      stats: [
        { label: 'BIM-моделей', val: '180+' },
        { label: 'Цветов RAL', val: '250+' },
        { label: 'Срок КМД', val: 'от 2 дней' }
      ]
    },
    {
      id: 'gov',
      title: 'Госзаказчики (44-ФЗ и 223-ФЗ)',
      subtitle: 'Тендерные поставки для благоустройства парков, набережных и скверов',
      desc: 'Официальный участник государственных закупок. Работа через спецсчета, казначейское и банковское сопровождение, аккредитация на всех ведущих торговых площадках РФ. Строгое соответствие техническому заданию и ГОСТ.',
      features: [
        'Сертификаты соответствия ГОСТ Р и регламенту ТР ЕАЭС 042/2017 (для детских площадок)',
        'Работа с казначейскими счетами и всеми видами банковских гарантий',
        'Опыт реализации проектов программы «Формирование комфортной городской среды»',
        'Фиксация сметной стоимости на весь период действия государственного контракта'
      ],
      tags: ['44-ФЗ', '223-ФЗ', 'ЕИС', 'ТР ЕАЭС 042/2017', 'Спецсчета', 'МИНПРОМТОРГ', 'ГОСТ Р'],
      stats: [
        { label: 'Тендеров сдано', val: '45+' },
        { label: 'Площадки', val: 'РТС, Сбер, ЕЭТП' },
        { label: 'Сопровождение', val: '100% 44-ФЗ' }
      ]
    },
    {
      id: 'industry',
      title: 'Промышленность и Строительство',
      subtitle: 'Несущие строительные металлоконструкции и промышленная металлообработка',
      desc: 'Серийный выпуск строительных металлоконструкций: колонны, балки, фермы, площадки обслуживания, эстакады, закладные детали, анкерные блоки, опоры освещения и трубопроводов.',
      features: [
        'Аттестованные сварщики НАКС (национальное агентство контроля сварки)',
        'Ультразвуковой (УЗК) и магнитно-порошковый контроль швов собственной лабораторией',
        'Антикоррозийная защита: горячее цинкование по ГОСТ 9.307-89 до 120 мкм',
        'Комплектация паспортами качества на металлопрокат и сертификатами на сварочные материалы'
      ],
      tags: ['СП 16.13330', 'НАКС', 'УЗК контроль', 'Горячий цинк 120 мкм', 'ГОСТ 23118-2019', 'Опоры'],
      stats: [
        { label: 'Мощность', val: '350 т/мес' },
        { label: 'Точность реза', val: '0,5 мм' },
        { label: 'Аттестация', val: 'НАКС / ОТК' }
      ]
    }
  ];

  const tendersPlatforms = [
    { name: 'Единая информационная система (ЕИС)', code: 'zakupki.gov.ru' },
    { name: 'Сбербанк-АСТ', code: 'sberbank-ast.ru' },
    { name: 'РТС-тендер', code: 'rts-tender.ru' },
    { name: 'Единая электронная торговая площадка (Росэлторг)', code: 'roseltorg.ru' },
    { name: 'ЭТП ГПБ (Газпромбанк)', code: 'etpgpb.ru' },
    { name: 'ТЭК-Торг', code: 'tektorg.ru' },
  ];

  const certificates = [
    { title: 'ГОСТ 2.102 / ЕСКД', desc: 'Единая система конструкторской документации: полный комплект чертежей (СБ, деталировка, спецификации, паспорта)' },
    { title: 'ТР ЕАЭС 042/2017', desc: 'Безопасность оборудования детских игровых и спортивных площадок (скаты, качели, карусели, лазалки)' },
    { title: 'ГОСТ Р ИСО 9001-2015', desc: 'Система менеджмента качества при производстве металлоконструкций и изделий благоустройства' },
    { title: 'ГОСТ 23118-2019', desc: 'Конструкции стальные строительные. Общие технические условия и контроль сварных соединений' },
    { title: 'Аттестация НАКС', desc: 'Свидетельства Национального Агентства Контроля Сварки для группы строительных конструкций (СК)' },
  ];

  const faqs = [
    {
      q: 'Работаете ли вы с казначейским сопровождением по госконтрактам?',
      a: 'Да, завод «Стальное Дело» имеет открытые лицевые счета в Управлении Федерального казначейства и банках для работы с государственным оборонным заказом (ГОЗ) и контрактами по 44-ФЗ и 223-ФЗ.'
    },
    {
      q: 'Предоставляете ли вы акты КС-2 и справки КС-3?',
      a: 'Да, по запросу генподрядчика или заказчика при проведении шеф-монтажных или монтажных работ мы оформляем полный комплект исполнительной документации: КС-2, КС-3, акты скрытых работ и паспорта качества.'
    },
    {
      q: 'Каковы стандартные сроки подготовки коммерческого предложения по ТЗ?',
      a: 'При наличии готового чертежа (DXF, DWG, PDF) расчет сметы занимает от 1 до 4 часов. Для нестандартных комплексных ТЗ с разработкой КМД — до 24 часов.'
    },
    {
      q: 'Возможно ли изготовление нестандартных МАФ по эскизам архитектора?',
      a: 'Да, наше конструкторское бюро разработает проект КМ/КМД, подберет оптимальные сечения профилей, разработает узлы крепления и изготовит пилотный образец перед запуском всей серии в производство.'
    },
    {
      q: 'Какие условия гарантии на изделия и антикоррозийные покрытия?',
      a: 'На несущие стальные конструкции предоставляется гарантия до 10 лет. На порошково-полимерное покрытие по цинковому грунту — 5 лет. На горячее цинкование — до 25 лет без признаков сквозной коррозии.'
    }
  ];

  return (
    <div className="bg-white min-h-screen text-neutral-900 pb-20">
      <SEOHead
        title="B2B, Девелоперы и Госзаказ (44-ФЗ / 223-ФЗ) | Завод «Стальное Дело»"
        description="Прямой производитель металлоконструкций и МАФ для девелоперов, генподрядчиков и госучреждений. Спецсчета, казначейское сопровождение, НДС 22%, поставка по РФ."
        keywords="госзакупки 44-фз металлоконструкции, 223-фз благоустройство, поставщик маф для застройщиков, завод стальное дело тендеры"
        canonicalPath="/b2b"
      />
      {/* Top Header / Breadcrumbs Bar */}
      <div className="border-b border-neutral-200 bg-neutral-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-2">
            <button 
              onClick={onBackToHome}
              className="hover:text-black transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Главная</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
            <span className="text-neutral-900 font-medium">B2B & Тендеры</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-neutral-600">
              <ShieldCheck className="w-3.5 h-3.5 text-[#55AA53]" />
              <span>44-ФЗ / 223-ФЗ / ЕИС</span>
            </span>
            <span>•</span>
            <span className="text-neutral-600">НДС 22%</span>
            <span>•</span>
            <span className="text-neutral-600">СПб, Колпино</span>
          </div>
        </div>
      </div>

      {/* Hero Banner (Polestar-style minimal high contrast) */}
      <section className="border-b border-neutral-200 bg-white pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-3">
              [ 05 / Корпоративное сотрудничество и госзаказ ]
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light text-neutral-900 tracking-tight leading-[1.1] mb-6">
              B2B-Партнерство и Тендерные Поставки
            </h1>
            <p className="text-base sm:text-lg text-neutral-500 font-light leading-relaxed max-w-3xl mb-8">
              Прямое производство малых архитектурных форм и строительных металлоконструкций в Санкт-Петербурге. Поставки для девелоперов, генподрядчиков и муниципальных заказчиков по 44-ФЗ и 223-ФЗ.
            </p>

            <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
              <button
                onClick={() => {
                  const el = document.getElementById('b2b-form');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 bg-black text-white uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Отправить ТЗ на расчет КП</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCalculator}
                className="px-6 py-3.5 border border-neutral-300 text-neutral-900 uppercase tracking-wider hover:border-black transition-colors flex items-center gap-2 cursor-pointer bg-white"
              >
                <span>Онлайн-калькулятор сметы</span>
              </button>

              <button
                onClick={onOpenMeasurerModal}
                className="px-5 py-3.5 border border-neutral-200 text-neutral-600 uppercase tracking-wider hover:text-black hover:border-black transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Вызов инженера КБ</span>
              </button>
            </div>
          </div>

          {/* Key Metric Facts Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-neutral-200 mt-12 border border-neutral-200 text-left">
            <div className="bg-white p-5">
              <div className="font-mono text-2xl sm:text-3xl font-light text-neutral-900 mb-1">
                44 / 223-ФЗ
              </div>
              <div className="text-xs text-neutral-500 font-light">
                Аккредитация на всех ЭТП РФ, спецсчета и казначейство
              </div>
            </div>
            <div className="bg-white p-5">
              <div className="font-mono text-2xl sm:text-3xl font-light text-neutral-900 mb-1">
                4000+ м²
              </div>
              <div className="text-xs text-neutral-500 font-light">
                Собственный станочный парк ЧПУ в Колпино (СПб)
              </div>
            </div>
            <div className="bg-white p-5">
              <div className="font-mono text-2xl sm:text-3xl font-light text-neutral-900 mb-1">
                Вся Россия
              </div>
              <div className="text-xs text-neutral-500 font-light">
                Доставка по всей России собственным автопарком и ТК
              </div>
            </div>
            <div className="bg-white p-5">
              <div className="font-mono text-2xl sm:text-3xl font-light text-neutral-900 mb-1">
                до 10 лет
              </div>
              <div className="text-xs text-neutral-500 font-light">
                Официальная гарантия завода на металлоконструкции
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Audience Solutions Tabs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-neutral-200 bg-neutral-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-200">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-2">
                [ Целевые сегменты ]
              </div>
              <h2 className="text-2xl sm:text-4xl font-light text-neutral-900 tracking-tight">
                Индивидуальные условия для каждого типа заказчика
              </h2>
            </div>
            <p className="text-xs text-neutral-500 max-w-md font-light leading-relaxed">
              Выстроенные регламенты взаимодействия: от проектирования КМД до шеф-монтажа и подписания форм КС-2 / КС-3.
            </p>
          </div>

          {/* Interactive Audience Tabs */}
          <div className="mt-8 flex flex-wrap gap-2 border-b border-neutral-200 pb-4">
            {audiences.map((aud, idx) => (
              <button
                key={idx}
                onClick={() => setActiveAudience(idx)}
                className={`px-4 py-2.5 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border ${
                  activeAudience === idx
                    ? 'bg-black text-white border-black shadow-sm'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
                }`}
              >
                {aud.title}
              </button>
            ))}
          </div>

          {/* Active Audience Card Detail */}
          <div className="mt-6 border border-neutral-200 bg-white p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8">
                <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-2">
                  [ Решение для: {audiences[activeAudience].title} ]
                </div>
                <h3 className="text-xl sm:text-2xl font-light text-neutral-900 mb-2">
                  {audiences[activeAudience].subtitle}
                </h3>
                <p className="text-sm text-neutral-600 font-light leading-relaxed mb-6">
                  {audiences[activeAudience].desc}
                </p>

                <div className="space-y-3 pt-4 border-t border-neutral-100">
                  <div className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
                    Ключевые преимущества и стандарты:
                  </div>
                  {audiences[activeAudience].features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-700 font-light">
                      <CheckCircle2 className="w-4 h-4 text-[#55AA53] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-neutral-100">
                  {audiences[activeAudience].tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="border border-neutral-200 bg-neutral-50 text-neutral-600 font-mono text-[11px] px-2.5 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-neutral-200 lg:pl-8 flex flex-col justify-between h-full space-y-6">
                <div>
                  <div className="text-xs font-mono uppercase text-neutral-400 tracking-wider mb-4">
                    Показатели эффективности
                  </div>
                  <div className="space-y-4">
                    {audiences[activeAudience].stats.map((stat, sIdx) => (
                      <div key={sIdx} className="border-b border-neutral-100 pb-3">
                        <div className="font-mono text-2xl font-light text-neutral-900">
                          {stat.val}
                        </div>
                        <div className="text-xs text-neutral-500 font-light">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <button
                    onClick={() => {
                      const el = document.getElementById('b2b-form');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full py-3 px-4 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Запросить условия сотрудничества</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={onOpenCalculator}
                    className="w-full py-2.5 px-4 border border-neutral-300 text-neutral-800 text-xs font-mono uppercase tracking-wider hover:border-black transition-colors text-center cursor-pointer bg-white"
                  >
                    Рассчитать спецификацию
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Engineering Support, ESKD Documentation & BIM / CAD */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-6">
              <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-2">
                [ Конструкторское бюро завода — Услуги инжиниринга ]
              </div>
              <h2 className="text-2xl sm:text-4xl font-light text-neutral-900 tracking-tight mb-4">
                Разработка конструкторской документации в соответствии с ЕСКД
              </h2>
              <p className="text-sm text-neutral-500 font-light leading-relaxed mb-6">
                Штат из 8 ведущих инженеров-конструкторов и технологов выполняет полный цикл разработки конструкторской документации (КД) по стандартам <strong>ГОСТ ЕСКД</strong> и проектной документации КМ/КМД по СПДС. Проводим аудит технологичности, оптимизируем металлоемкость и выполняем прочностные расчеты по СП 16.13330.2017.
              </p>

              {/* ESKD Specific Feature Box */}
              <div className="border border-neutral-300 bg-neutral-50 p-5 mb-6">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold text-neutral-900 uppercase tracking-wider mb-2">
                  <FileText className="w-4 h-4 text-black" />
                  <span>Состав комплекта КД по ГОСТ 2.102-2013 (ЕСКД):</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-600 font-light">
                  <div className="flex items-center gap-1.5">
                    <span className="text-black font-mono font-semibold">•</span>
                    <span>Сборочные чертежи (СБ) и монтажные схемы</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-black font-mono font-semibold">•</span>
                    <span>Спецификации по ГОСТ 2.106-2019</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-black font-mono font-semibold">•</span>
                    <span>Деталировочные чертежи и развертки</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-black font-mono font-semibold">•</span>
                    <span>Паспорта изделий по ГОСТ 2.601-2019</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-black font-mono font-semibold">•</span>
                    <span>Руководства по эксплуатации (РЭ) и ТУ</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-black font-mono font-semibold">•</span>
                    <span>Нормоконтроль и децимальные номера</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 font-light text-xs sm:text-sm text-neutral-700">
                <div className="flex items-start gap-3">
                  <Cpu className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
                  <span><strong>Приемка и выдача любых форматов:</strong> DXF, DWG, STEP, SLDPRT, IGES, PDF, а также адаптация эскизов с выездом замерщика.</span>
                </div>
                <div className="flex items-start gap-3">
                  <Layers className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
                  <span><strong>BIM-моделирование:</strong> готовые параметрические семейства Revit для включения в проектную документацию стадии «П» и «Р».</span>
                </div>
                <div className="flex items-start gap-3">
                  <Scale className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
                  <span><strong>Расчет прочности:</strong> конечно-элементный анализ (FEA) несущих балок, пергол, навесов и консольных креплений.</span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    const el = document.getElementById('b2b-form');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-3 bg-black text-white font-mono text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer flex items-center gap-2"
                >
                  <span>Заказать разработку КД (ЕСКД)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={onOpenMeasurerModal}
                  className="px-5 py-3 border border-neutral-300 text-neutral-900 font-mono text-xs uppercase tracking-wider hover:border-black transition-colors cursor-pointer flex items-center gap-2 bg-white"
                >
                  <span>Выезд инженера КБ</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 border border-neutral-200 bg-neutral-50 p-6 sm:p-8">
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4">
                [ Этапы разработки документации в КБ ]
              </div>
              <div className="space-y-3">
                {[
                  {
                    step: '01',
                    name: 'Технический аудит ТЗ и реверс-инжиниринг',
                    time: '1–2 часа',
                    desc: 'Анализ технологичности изделия, проверка сечений металла, радиусов гибки и допусков сборки.'
                  },
                  {
                    step: '02',
                    name: 'Разработка конструкторской документации (ЕСКД)',
                    time: '1–3 дня',
                    desc: 'Сборочные чертежи (СБ), спецификации ГОСТ 2.106, полная деталировка и присвоение децимальных номеров.'
                  },
                  {
                    step: '03',
                    name: '3D-моделирование и прочностные расчеты (FEA)',
                    time: '1–2 дня',
                    desc: 'Твердотельные 3D-модели STEP/SolidWorks, расчет снеговых и ветровых нагрузок по СП 16.13330.'
                  },
                  {
                    step: '04',
                    name: 'Nesting-раскладка и управляющие программы ЧПУ',
                    time: 'В день запуска',
                    desc: 'Оптимизация коэффициента использования металла (КИМ до 94%), снижение себестоимости партии.'
                  },
                  {
                    step: '05',
                    name: 'Паспорт изделия (ГОСТ 2.601) и руководство по монтажу',
                    time: 'С готовой продукцией',
                    desc: 'Оформление полного комплекта эксплуатационной документации для сдачи технадзору и Госкомиссии.'
                  },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white border border-neutral-200 p-4 flex items-start gap-4">
                    <span className="font-mono text-xs font-semibold text-neutral-400 bg-neutral-100 px-2 py-1">
                      {item.step}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-neutral-900">{item.name}</span>
                        <span className="font-mono text-[11px] text-neutral-500">{item.time}</span>
                      </div>
                      <p className="text-xs text-neutral-500 font-light mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: 44-FZ / 223-FZ & Tenders Accreditation */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-neutral-200 bg-neutral-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-10">
            <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-2">
              [ Государственные закупки ]
            </div>
            <h2 className="text-2xl sm:text-4xl font-light text-neutral-900 tracking-tight mb-4">
              Аккредитация на электронных торговых площадках РФ
            </h2>
            <p className="text-sm text-neutral-500 font-light leading-relaxed">
              Участвуем в государственных и муниципальных закупках, аукционах и запросах котировок. Предоставляем банковские гарантии и обеспечиваем юридическую чистоту контрактов.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {tendersPlatforms.map((plat, idx) => (
              <div key={idx} className="border border-neutral-200 bg-white p-5 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-neutral-900 mb-0.5">{plat.name}</div>
                  <div className="font-mono text-[11px] text-neutral-400">{plat.code}</div>
                </div>
                <Check className="w-4 h-4 text-[#55AA53]" />
              </div>
            ))}
          </div>

          {/* Certificates Grid */}
          <div className="border border-neutral-200 bg-white p-6 sm:p-8">
            <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-4">
              [ Сертификаты соответствия и нормативная база ]
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {certificates.map((cert, idx) => (
                <div key={idx} className="border-t border-neutral-200 pt-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Award className="w-4 h-4 text-neutral-900" />
                    <span className="font-mono text-sm font-semibold text-neutral-900">{cert.title}</span>
                  </div>
                  <p className="text-xs text-neutral-500 font-light leading-relaxed">
                    {cert.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Logistics & Fleet Overview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-200">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-2">
                [ Автопарк и логистика завода ]
              </div>
              <h2 className="text-2xl sm:text-4xl font-light text-neutral-900 tracking-tight">
                Доставка на объект и шеф-монтаж
              </h2>
            </div>
            <p className="text-xs text-neutral-500 max-w-md font-light leading-relaxed">
              Собственная служба логистики завода в Санкт-Петербурге и Ленинградской области. Доставка по всей России, въезд длинномеров на строительную площадку, усиленная упаковка и полный комплект паспортов.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <div className="border border-neutral-200 bg-neutral-50 p-6 sm:p-7 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase text-neutral-500 bg-white px-2.5 py-1 border border-neutral-200">
                    Автопарк завода
                  </span>
                  <Truck className="w-5 h-5 text-neutral-800" />
                </div>
                <h3 className="text-lg font-normal text-neutral-900">
                  Манипуляторы и бортовые шаланды
                </h3>
                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                  Манипуляторы с вылетом стрелы до 12 м для механизированной саморазгрузки непосредственно в зону монтажа. Для крупных партий — длинномерные открытые шаланды 13.6 м грузоподъемностью до 20 тонн.
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-200 font-mono text-[11px] text-neutral-500">
                Пропуск в центр СПб • Ночная разгрузка
              </div>
            </div>

            <div className="border border-neutral-200 bg-neutral-50 p-6 sm:p-7 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase text-neutral-500 bg-white px-2.5 py-1 border border-neutral-200">
                    Безопасность груза
                  </span>
                  <ShieldCheck className="w-5 h-5 text-[#55AA53]" />
                </div>
                <h3 className="text-lg font-normal text-neutral-900">
                  100% страхование и упаковка
                </h3>
                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                  Многослойная пузырьковая и термоусадочная пленка, деревянные ложементы и защитные уголки для полированных поверхностей и порошкового покрытия. Все партии застрахованы на время пути.
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-200 font-mono text-[11px] text-neutral-500">
                ТТН, акты и сертификаты с каждым рейсом
              </div>
            </div>

            <div className="border border-neutral-200 bg-neutral-50 p-6 sm:p-7 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase text-neutral-500 bg-white px-2.5 py-1 border border-neutral-200">
                    География поставок
                  </span>
                  <MapPin className="w-5 h-5 text-neutral-800" />
                </div>
                <h3 className="text-lg font-normal text-neutral-900">
                  СПб, СЗФО и вся Россия
                </h3>
                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                  Регулярные рейсы по Санкт-Петербургу и стройплощадкам ЛО. Отправка в регионы РФ выделенным автотранспортом и партнерскими логистическими операторами (Деловые Линии, ПЭК, Возовоз).
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-200">
                <button
                  onClick={() => {
                    const el = document.getElementById('b2b-form');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 px-4 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Запросить расчет поставки</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Tender Request & RFP Form */}
      <section id="b2b-form" className="py-16 px-4 sm:px-6 lg:px-8 border-b border-neutral-200 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-3">
                [ Форма для юридических лиц ]
              </div>
              <h2 className="text-2xl sm:text-4xl font-light text-white tracking-tight mb-4">
                Отправьте ТЗ или номер тендера на экспресс-расчет
              </h2>
              <p className="text-sm text-neutral-400 font-light leading-relaxed mb-6">
                Наш тендерный отдел и главный технолог подготовят официальное коммерческое предложение с разбивкой по позициям, срокам и графику отгрузок в течение 1–2 часов.
              </p>

              <div className="space-y-3 font-mono text-xs text-neutral-300">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-neutral-400" />
                  <span>tender@sdmaf.ru (прямой ящик тендерного отдела)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-neutral-400" />
                  <span>+7 (812) 200-77-07 (доб. 104 — отдел госзакупок)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-neutral-400" />
                  <span>Пн–Пт 08:30–18:00 (МСК)</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-black border border-neutral-800 p-6 sm:p-10">
              {formSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-12 h-12 text-[#55AA53] mx-auto mb-4" />
                  <h3 className="text-xl font-light text-white mb-2">Техническое задание принято в обработку</h3>
                  <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed mb-4">
                    Инженер тендерного отдела свяжется с вами по указанному телефону/email и направит официальный расчет сметы с НДС 22%.
                  </p>

                  {createdLeadId && (
                    <div className="border border-neutral-700 bg-neutral-900/80 p-3 max-w-sm mx-auto mb-6 text-xs font-mono text-neutral-300 flex items-center justify-between">
                      <span className="text-neutral-400">Регистрация в Bitrix24 CRM:</span>
                      <span className="font-bold text-white bg-neutral-800 px-2 py-0.5 border border-neutral-600">
                        Лид #{createdLeadId}
                      </span>
                    </div>
                  )}

                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="px-6 py-2.5 bg-neutral-800 text-white font-mono text-xs uppercase hover:bg-neutral-700 transition-colors cursor-pointer"
                  >
                    Отправить еще один запрос
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                        Контактное лицо *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Иван Петров"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                        Название организации / ИНН *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="ООО «СтройПроект» / 7812..."
                        value={formCompany}
                        onChange={(e) => setFormCompany(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                        Телефон для связи *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+7 (___) ___-__-__"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                        Email для отправки КП *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="tender@company.ru"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                        Регламент контракта
                      </label>
                      <select
                        value={contractType}
                        onChange={(e) => setContractType(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 text-xs text-white focus:outline-none focus:border-white transition-colors"
                      >
                        <option value="44-ФЗ / 223-ФЗ (Госзакупки)">44-ФЗ / 223-ФЗ (Госзакупки)</option>
                        <option value="Разработка конструкторской документации (ЕСКД) / Инжиниринг">Разработка конструкторской документации (ЕСКД) / Инжиниринг</option>
                        <option value="Прямой коммерческий договор (Девелопер)">Прямой коммерческий договор (Девелопер)</option>
                        <option value="Субподряд по ГОЗ / Спецсчета">Субподряд по ГОЗ / Спецсчета (275-ФЗ)</option>
                        <option value="Дилерский договор / Комплектация">Дилерский договор / Комплектация</option>
                      </select>
                    </div>

                    <div className="flex items-center pt-6">
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                        <input
                          type="checkbox"
                          checked={needBankGuarantee}
                          onChange={(e) => setNeedBankGuarantee(e.target.checked)}
                          className="rounded-none text-white focus:ring-0 cursor-pointer bg-neutral-800 border-neutral-700"
                        />
                        <span>Требуется банковская гарантия</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                      Номер закупки / ссылка на ЕИС или состав ТЗ
                    </label>
                    <input
                      type="text"
                      placeholder="Закупка № 017220000... или перечень позиций МАФ"
                      value={formTenderNumber}
                      onChange={(e) => setFormTenderNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                      Комментарий или особые требования
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Укажите требуемые сроки поставки, необходимость монтажа или разработки КМД..."
                      value={formComment}
                      onChange={(e) => setFormComment(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-white transition-colors resize-none"
                    />
                  </div>

                  {/* File attachment for tender documents / CAD drawings */}
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={(e) => handleFileUpload(e.target.files)}
                      multiple
                      className="hidden"
                      accept=".dwg,.dxf,.step,.stp,.pdf,.zip,.rar,.xlsx,.xls"
                    />
                    <button
                      type="button"
                      disabled={isUploadingFile}
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-2.5 px-3.5 border border-dashed border-neutral-700 hover:border-neutral-500 bg-neutral-900/80 text-neutral-300 text-xs font-mono flex items-center justify-center gap-2 cursor-pointer transition-colors disabled:opacity-60"
                    >
                      {isUploadingFile ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 text-neutral-300 animate-spin" />
                          <span>Сохранение документации на сервере завода...</span>
                        </>
                      ) : (
                        <>
                          <UploadCloud className="w-4 h-4 text-neutral-400" />
                          <span>Прикрепить ТЗ, смету или чертежи (DWG, STEP, PDF, ZIP)</span>
                        </>
                      )}
                    </button>
                    {uploadedFiles.length > 0 && (
                      <div className="mt-2 space-y-1.5">
                        {uploadedFiles.map((f, i) => (
                          <div key={i} className="text-xs font-mono text-neutral-300 flex items-center justify-between bg-neutral-900 border border-neutral-800 p-2">
                            <div className="flex items-center gap-2 truncate max-w-[240px]">
                              <FileCode2 className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                              <span className="truncate">{f.name}</span>
                              <span className="text-[10px] text-neutral-500">({f.size})</span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-emerald-400 text-[10px] font-mono">✓ Сохранено</span>
                              <button
                                type="button"
                                onClick={() => setUploadedFiles((prev) => prev.filter((_, idx) => idx !== i))}
                                className="text-neutral-500 hover:text-white p-0.5"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <ConsentCheckbox
                    id="b2b-tender-consent"
                    checked={consentChecked}
                    onChange={setConsentChecked}
                    theme="dark"
                    onOpenPrivacy={onOpenPrivacy}
                    onOpenOffer={onOpenOffer}
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting || !consentChecked}
                    className="w-full py-3.5 px-6 bg-white text-black font-mono text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Регистрация заявки...</span>
                      </>
                    ) : (
                      <>
                        <span>Отправить документацию на расчет КП</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="text-[11px] text-neutral-500 text-center font-light">
                    Нажимая кнопку, вы подтверждаете согласие на обработку персональных данных в соответствии с 152-ФЗ.
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: FAQ Accordion */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-2">
              [ Вопросы и ответы ]
            </div>
            <h2 className="text-2xl sm:text-3xl font-light text-neutral-900 tracking-tight">
              Часто задаваемые вопросы B2B заказчиков
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-neutral-200 p-5 sm:p-6 bg-neutral-50/30">
                <div className="text-sm sm:text-base font-medium text-neutral-900 mb-2">
                  {faq.q}
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Simple helper icon
function Mail(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
}

function Phone(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  );
}
