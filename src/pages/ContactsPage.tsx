import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Copy, 
  Check, 
  Download, 
  Building2, 
  ShieldCheck, 
  Truck, 
  Send, 
  ArrowRight, 
  CheckCircle2, 
  Compass, 
  Car, 
  ChevronRight,
  ExternalLink,
  FileText,
  RefreshCw,
  Database
} from 'lucide-react';
import { ConsentCheckbox } from '../components/ConsentCheckbox';
import { sendLeadToBitrix24, buildBitrixLeadTitle } from '../services/bitrixService';
import { SEOHead } from '../components/SEOHead';

interface ContactsPageProps {
  onBackToHome: () => void;
  onOpenCalculator: () => void;
  onOpenMeasurerModal: () => void;
  onNavigateToProduction?: () => void;
  onNavigateToPrivacy?: () => void;
  onNavigateToOffer?: () => void;
  onNavigateToRequisites?: () => void;
}

export const ContactsPage: React.FC<ContactsPageProps> = ({
  onBackToHome,
  onOpenCalculator,
  onOpenMeasurerModal,
  onNavigateToProduction,
  onNavigateToPrivacy,
  onNavigateToOffer,
  onNavigateToRequisites,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Excursion Form State
  const [visitorName, setVisitorName] = useState('');
  const [visitorCompany, setVisitorCompany] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [visitorDate, setVisitorDate] = useState('');
  const [visitorPurpose, setVisitorPurpose] = useState('Осмотр цеха лазерной резки и гибки');
  const [visitorConsent, setVisitorConsent] = useState(true);
  const [isSubmittingVisit, setIsSubmittingVisit] = useState(false);
  const [visitSubmitted, setVisitSubmitted] = useState(false);
  const [createdLeadId, setCreatedLeadId] = useState<string | number | null>(null);

  // Quick Callback Form
  const [cbName, setCbName] = useState('');
  const [cbPhone, setCbPhone] = useState('');
  const [cbDepartment, setCbDepartment] = useState('sales');
  const [cbConsent, setCbConsent] = useState(true);
  const [cbSubmitted, setCbSubmitted] = useState(false);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleVisitSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorPhone || !visitorConsent) return;
    setIsSubmittingVisit(true);

    const leadTitle = buildBitrixLeadTitle(
      visitorCompany,
      `[Экскурсия / Аудит цехов] ${visitorPurpose || 'Посещение завода'}`
    );

    try {
      const result = await sendLeadToBitrix24({
        sourceType: 'plant_excursion',
        title: leadTitle,
        name: visitorName || 'Посетитель завода',
        phone: visitorPhone,
        company: visitorCompany,
        department: 'Служба безопасности завода и дирекция по производству',
        pageSource: 'Страница: Контакты / Запись на аудит производства в Колпино',
        details: {
          'Цель визита / Аудита': visitorPurpose,
          'Запланированная дата': visitorDate || 'Ближайший рабочий день',
          'ФИО посетителя': visitorName,
          'Организация / Должность': visitorCompany,
          'Локация': 'г. Колпино, ул. Финляндская, 3 (Ижорские заводы)'
        }
      });

      if (result.leadId) {
        setCreatedLeadId(result.leadId);
      }
    } catch (err) {
      console.warn('Bitrix lead error:', err);
    } finally {
      setIsSubmittingVisit(false);
      setVisitSubmitted(true);
    }
  };

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cbPhone || !cbConsent) return;
    try {
      await sendLeadToBitrix24({
        sourceType: 'quick_callback',
        title: `[Обратный звонок] Запрос со страницы контактов`,
        name: 'Заказчик',
        phone: cbPhone,
        department: 'Клиентский сервис',
        pageSource: 'Страница: Контакты / Форма заказа звонка',
        details: {
          'Телефон': cbPhone,
        }
      });
    } catch (err) {
      console.warn('Callback dispatch error:', err);
    }
    setCbSubmitted(true);
  };

  const departments = [
    {
      title: 'Отдел продаж и клиентский сервис',
      desc: 'Расчет стоимости изделий МАФ, выставление счетов, типовые и индивидуальные заказы',
      phone: '+7 (812) 642-88-90',
      phoneExt: 'доб. 101',
      email: 'info@sdmaf.ru',
      hours: 'Пн–Пт: 08:30 – 18:00',
    },
    {
      title: 'Тендерный отдел (44-ФЗ и 223-ФЗ)',
      desc: 'Подготовка конкурсных заявок, госконтракты, казначейское и банковское сопровождение',
      phone: '+7 (812) 642-88-90',
      phoneExt: 'доб. 104',
      email: 'tender@sdmaf.ru',
      hours: 'Пн–Пт: 08:30 – 18:00',
    },
    {
      title: 'Конструкторское бюро и прием чертежей',
      desc: 'Проверка файлов DXF/DWG/STEP, разработка КМ/КМД, 3D-моделирование и BIM',
      phone: '+7 (812) 642-88-90',
      phoneExt: 'доб. 106',
      email: 'kb@sdmaf.ru',
      hours: 'Пн–Пт: 08:30 – 17:30',
    },
    {
      title: 'Служба логистики и склад готовой продукции',
      desc: 'Оформление пропусков на территорию завода, согласование времени подачи шаланд',
      phone: '+7 (812) 642-88-90',
      phoneExt: 'доб. 108',
      email: 'logist@sdmaf.ru',
      hours: 'Доставка по всей России (Пн–Пт 08:00 – 17:00)',
    },
  ];

  const legalRequisites = [
    { label: 'Полное наименование', value: 'Общество с ограниченной ответственностью «Кадет СПб»' },
    { label: 'Сокращенное наименование', value: 'ООО «Кадет СПб»' },
    { label: 'Юридический адрес', value: '198099, г. Санкт-Петербург, Промышленная улица, дом 19 литер н, помещение 148' },
    { label: 'Фактический адрес', value: '195043, г. Санкт-Петербург, ул. 6-ая Жерновская д. 19, лит. А, пом. 9-Н' },
    { label: 'ИНН', value: '7805305625' },
    { label: 'КПП', value: '780501001' },
    { label: 'ОГРН', value: '1157847040482' },
    { label: 'Банк', value: 'ПАО Банк «Санкт-Петербург»' },
    { label: 'Расчетный счет (р/с)', value: '40702810790230000685' },
    { label: 'Корреспондентский счет (к/с)', value: '30101810900000000790' },
    { label: 'БИК', value: '044030790' },
    { label: 'Генеральный директор', value: 'Еремин Вячеслав Владимирович' },
    { label: 'Главный бухгалтер', value: 'Константинова Полина Георгиевна' },
    { label: 'Email', value: 'info@sdmaf.ru' },
  ];

  const fullRequisitesText = legalRequisites.map(r => `${r.label}: ${r.value}`).join('\n');

  return (
    <div className="bg-white min-h-screen text-neutral-900 pb-20">
      <SEOHead
        title="Контакты завода «Стальное Дело» | Производство в Колпино (СПб)"
        description="Контакты завода металлоконструкций: Санкт-Петербург, г. Колпино, ул. Финляндская, 3. Телефон: +7 (812) 200-77-06. Почта: info@sdmaf.ru. Запись на аудит производства."
        keywords="контакты завод металлоконструкций спб, завод стальное дело колпино адрес, телефон отдела продаж маф, реквизиты стальное дело"
        canonicalPath="/contacts"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          'name': 'Контакты завода «Стальное Дело»',
          'url': 'https://sdmaf.ru/contacts',
          'mainEntity': {
            '@type': 'LocalBusiness',
            'name': 'Завод металлоконструкций и МАФ «Стальное Дело»',
            'telephone': '+7-812-200-77-06',
            'email': 'info@sdmaf.ru',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'ул. Финляндская, д. 3',
              'addressLocality': 'Колпино, г. Санкт-Петербург',
              'postalCode': '196650',
              'addressCountry': 'RU'
            }
          }
        }}
      />
      {/* Top Header / Breadcrumbs */}
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
            <span className="text-neutral-900 font-medium">Контакты</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[11px]">
            <span className="text-neutral-600">СПб, Колпино, ул. Финляндская, 3</span>
            <span>•</span>
            <span className="text-neutral-600 font-medium text-black">Доставка по всей России</span>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="border-b border-neutral-200 bg-white pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-3">
              [ Контактный центр и производство ]
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light text-neutral-900 tracking-tight leading-[1.1] mb-6">
              Контакты завода в Санкт-Петербурге
            </h1>
            <p className="text-base sm:text-lg text-neutral-500 font-light leading-relaxed max-w-3xl mb-8">
              Производственная площадка 4000+ м² и главный офис расположены в Колпино (территория «Ижорские заводы»). Прямой въезд грузового транспорта, ж/д ветка, лаборатория ОТК и шоурум изделий.
            </p>

            {/* Quick Contact Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-neutral-200 border border-neutral-200">
              <div className="bg-white p-5">
                <div className="text-[11px] font-mono uppercase text-neutral-400 mb-1">
                  Единый многоканальный телефон
                </div>
                <a href="tel:+78122007706" className="font-mono text-xl sm:text-2xl font-light text-neutral-900 hover:text-black">
                  +7 (812) 200-77-06
                </a>
                <div className="text-xs text-neutral-500 font-light mt-1">
                  Бесплатно по СПб и ЛО
                </div>
              </div>

              <div className="bg-white p-5">
                <div className="text-[11px] font-mono uppercase text-neutral-400 mb-1">
                  Прямой email для заявок и КД
                </div>
                <a href="mailto:info@sdmaf.ru" className="font-mono text-xl sm:text-2xl font-light text-neutral-900 hover:underline">
                  info@sdmaf.ru
                </a>
                <div className="text-xs text-neutral-500 font-light mt-1">
                  Прием чертежей и заявок онлайн (расчет от 1 часа)
                </div>
              </div>

              <div className="bg-white p-5">
                <div className="text-[11px] font-mono uppercase text-neutral-400 mb-1">
                  Отдел продаж в Москве
                </div>
                <a href="tel:+74951066224" className="font-mono text-xl sm:text-2xl font-light text-neutral-900 hover:text-black">
                  +7 (495) 106-62-24
                </a>
                <div className="text-xs text-neutral-500 font-light mt-1">
                  Москва и Московская область
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Departments Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-neutral-200 bg-neutral-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="pb-8 border-b border-neutral-200 mb-8">
            <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-2">
              [ Службы предприятия ]
            </div>
            <h2 className="text-2xl sm:text-3xl font-light text-neutral-900 tracking-tight">
              Прямые контакты отделов завода
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {departments.map((dept, idx) => (
              <div key={idx} className="border border-neutral-200 bg-white p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-medium text-neutral-900 mb-2">
                    {dept.title}
                  </h3>
                  <p className="text-xs text-neutral-500 font-light leading-relaxed mb-6">
                    {dept.desc}
                  </p>

                  <div className="space-y-3 font-mono text-xs border-t border-neutral-100 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-400 uppercase text-[10px]">Телефон:</span>
                      <div className="flex items-center gap-2">
                        <a href={`tel:${dept.phone}`} className="text-neutral-900 font-medium hover:underline">
                          {dept.phone}
                        </a>
                        <span className="text-neutral-400 text-[11px]">{dept.phoneExt}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-neutral-400 uppercase text-[10px]">Email:</span>
                      <a href={`mailto:${dept.email}`} className="text-neutral-900 hover:underline">
                        {dept.email}
                      </a>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-neutral-400 uppercase text-[10px]">Режим:</span>
                      <span className="text-neutral-600">{dept.hours}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-100">
                  <a
                    href={`mailto:${dept.email}?subject=Запрос с сайта sdmaf.ru`}
                    className="w-full py-2.5 px-4 bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs font-mono uppercase tracking-wider hover:border-black hover:bg-white transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Написать в отдел</span>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Interactive Location & Factory Excursion Booking */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Left: Address & Directions */}
            <div className="lg:col-span-6 border border-neutral-200 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-2">
                  [ Производственная площадка ]
                </div>
                <h3 className="text-xl sm:text-2xl font-light text-neutral-900 mb-3">
                  Адрес и схема проезда в Колпино
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed mb-6">
                  Санкт-Петербург, г. Колпино, ул. Финляндская, д. 3, литера А (промзона «Ижорские заводы»).
                </p>

                <div className="space-y-4 border-t border-neutral-200 pt-5 text-xs text-neutral-700 font-light">
                  <div className="flex items-start gap-3">
                    <Car className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
                    <div>
                      <strong>На автомобиле из СПб:</strong> по Софийской улице (20 мин от КАД) или по скоростной трассе М-11 «Нева» (съезд на Колпино).
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Truck className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
                    <div>
                      <strong>Для грузового транспорта (шаланды, фуры):</strong> въезд через КПП №3 с ул. Финляндская. Беспрепятственный радиус поворота для 13.6-метровых длинномеров. Круглосуточно.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Compass className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
                    <div>
                      <strong>Общественным транспортом:</strong> от ст. м. «Шушары» / «Рыбацкое» или на электропоезде «Ласточка» с Московского вокзала до ст. «Колпино» (25 минут).
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-200 mt-6 flex flex-wrap gap-3">
                <a
                  href="https://yandex.ru/maps/?text=Санкт-Петербург+Колпино+Финляндская+3"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Открыть на Яндекс.Картах</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={onOpenMeasurerModal}
                  className="px-4 py-2.5 border border-neutral-300 text-neutral-800 text-xs font-mono uppercase tracking-wider hover:border-black transition-colors cursor-pointer bg-white"
                >
                  Выезд инженера на ваш объект
                </button>
              </div>
            </div>

            {/* Right: Plant Audit & Excursion Booking */}
            <div className="lg:col-span-6 border border-neutral-200 bg-neutral-50 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-2">
                  [ Личный аудит цехов ]
                </div>
                <h3 className="text-xl sm:text-2xl font-light text-neutral-900 mb-3">
                  Запись на экскурсию по заводу
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed mb-6">
                  Приглашаем главных инженеров, архитекторов и руководителей проектов лично оценить культуру производства, работу двух лазерных раскройщиков 22 кВт (столы 4м и 6м) и лаборатории ОТК.
                </p>

                {visitSubmitted ? (
                  <div className="bg-white border border-neutral-200 p-8 text-center my-6">
                    <CheckCircle2 className="w-10 h-10 text-[#55AA53] mx-auto mb-3" />
                    <h4 className="text-base font-medium text-neutral-900 mb-1">Заявка на пропуск зарегистрирована</h4>
                    <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed mb-4">
                      Служба безопасности завода оформит электронный пропуск на КПП и свяжется по номеру {visitorPhone} для подтверждения времени.
                    </p>

                    {createdLeadId && (
                      <div className="border border-neutral-200 bg-neutral-50 p-3 max-w-sm mx-auto mb-6 text-xs font-mono text-neutral-700 flex items-center justify-between">
                        <span className="text-neutral-500">Зарегистрировано в Bitrix24:</span>
                        <span className="font-bold text-neutral-900 bg-white px-2 py-0.5 border border-neutral-300">
                          Лид #{createdLeadId}
                        </span>
                      </div>
                    )}

                    <button
                      onClick={() => setVisitSubmitted(false)}
                      className="px-4 py-2 bg-neutral-100 text-neutral-800 text-xs font-mono uppercase hover:bg-neutral-200 cursor-pointer"
                    >
                      Заполнить еще раз
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleVisitSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-500 mb-1">
                          ФИО посетителя *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Сергей Васильев"
                          value={visitorName}
                          onChange={(e) => setVisitorName(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-black"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-500 mb-1">
                          Компания / Должность
                        </label>
                        <input
                          type="text"
                          placeholder="ООO «Девелопмент Групп»"
                          value={visitorCompany}
                          onChange={(e) => setVisitorCompany(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-black"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-500 mb-1">
                          Номер телефона *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+7 (___) ___-__-__"
                          value={visitorPhone}
                          onChange={(e) => setVisitorPhone(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-black font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-500 mb-1">
                          Желаемая дата визита
                        </label>
                        <input
                          type="date"
                          value={visitorDate}
                          onChange={(e) => setVisitorDate(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-black font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-500 mb-1">
                        Цель аудита производства
                      </label>
                      <select
                        value={visitorPurpose}
                        onChange={(e) => setVisitorPurpose(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-black"
                      >
                        <option value="Осмотр цеха лазерной резки и гибки">Осмотр цеха лазерной резки и гибки</option>
                        <option value="Аудит лаборатории ОТК и сварочного участка">Аудит лаборатории ОТК и сварочного участка</option>
                        <option value="Ознакомление с образцами МАФ в шоуруме">Ознакомление с образцами МАФ в шоуруме</option>
                        <option value="Согласование КМД с конструкторским отделом">Согласование КМД с конструкторским отделом</option>
                      </select>
                    </div>

                    <ConsentCheckbox
                      id="contacts-excursion-consent"
                      checked={visitorConsent}
                      onChange={setVisitorConsent}
                      theme="light"
                      onOpenPrivacy={onNavigateToPrivacy}
                      onOpenOffer={onNavigateToOffer}
                    />

                    <button
                      type="submit"
                      disabled={isSubmittingVisit || !visitorConsent}
                      className="w-full py-3 px-4 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-50"
                    >
                      {isSubmittingVisit ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Оформление пропуска...</span>
                        </>
                      ) : (
                        <>
                          <span>Заказать гостевой пропуск на завод</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Legal & Banking Requisites */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-neutral-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-neutral-200 mb-8">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-2">
                [ Юридическая информация ]
              </div>
              <h2 className="text-2xl sm:text-3xl font-light text-neutral-900 tracking-tight">
                Реквизиты предприятия ООО «Кадет СПб»
              </h2>
              <p className="text-xs text-neutral-500 font-light mt-1">
                Для выставления счетов, договоров поставки и тендерной документации
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {onNavigateToRequisites && (
                <button
                  onClick={onNavigateToRequisites}
                  className="px-4 py-2.5 bg-neutral-900 text-white text-xs font-mono uppercase tracking-wider hover:bg-black transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Открыть страницу реквизитов</span>
                </button>
              )}

              <button
                onClick={() => copyToClipboard(fullRequisitesText, 'all')}
                className="px-4 py-2.5 bg-white border border-neutral-300 text-neutral-900 text-xs font-mono uppercase tracking-wider hover:border-black transition-colors flex items-center gap-2 cursor-pointer"
              >
                {copiedField === 'all' ? (
                  <>
                    <Check className="w-4 h-4 text-[#55AA53]" />
                    <span>Реквизиты скопированы</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-neutral-500" />
                    <span>Скопировать все реквизиты</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="border border-neutral-200 bg-white">
            <div className="divide-y divide-neutral-100">
              {legalRequisites.map((req, idx) => (
                <div key={idx} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-neutral-50/60 transition-colors">
                  <div className="text-xs font-mono uppercase text-neutral-400 sm:w-1/3">
                    {req.label}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-neutral-900 sm:w-1/2 break-words">
                    {req.value}
                  </div>
                  <button
                    onClick={() => copyToClipboard(req.value, req.label)}
                    className="text-neutral-400 hover:text-black self-end sm:self-auto p-1.5 cursor-pointer"
                    title={`Скопировать ${req.label}`}
                  >
                    {copiedField === req.label ? (
                      <Check className="w-4 h-4 text-[#55AA53]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Documents Links */}
          <div className="mt-8 p-6 bg-white border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-neutral-600" />
              <div className="text-xs text-neutral-600">
                Сайт полностью соответствует требованиям Федерального закона № 152-ФЗ «О персональных данных».
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              {onNavigateToPrivacy && (
                <button
                  onClick={onNavigateToPrivacy}
                  className="text-neutral-900 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Политика конфиденциальности</span>
                </button>
              )}
              {onNavigateToOffer && (
                <button
                  onClick={onNavigateToOffer}
                  className="text-neutral-900 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Публичная оферта</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
