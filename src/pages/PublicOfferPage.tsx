import React from 'react';
import { 
  FileText, 
  ChevronRight, 
  Printer, 
  Building2, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  RotateCcw,
  Scale
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

interface PublicOfferPageProps {
  onBackToHome: () => void;
  onNavigateToPrivacy?: () => void;
  onNavigateToRequisites?: () => void;
}

export const PublicOfferPage: React.FC<PublicOfferPageProps> = ({
  onBackToHome,
  onNavigateToPrivacy,
  onNavigateToRequisites,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const offerSections = [
    {
      number: '1',
      title: 'Статус информации на сайте и ст. 437 ГК РФ',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-neutral-700 leading-relaxed font-light">
          <p>
            1.1. Все материалы, текстовые описания, технические характеристики, 3D-визуализации, чертежи, ориентировочные цены и сметные расчеты, представленные на сайте <strong>sdmaf.ru</strong>, носят исключительно информационно-ознакомительный и справочный характер.
          </p>
          <div className="p-4 border border-neutral-300 bg-neutral-50 text-neutral-900 font-normal my-2">
            В соответствии с положениями части 2 статьи 437 Гражданского кодекса Российской Федерации (ГК РФ) информация на сайте <strong>НЕ является публичной офертой</strong> и не накладывает на ООО «Кадет СПб» обязательств по заключению договора на указанных на сайте ориентировочных условиях без предварительного согласования спецификации.
          </div>
          <p>
            1.2. Окончательная стоимость изготовления продукции, услуг по лазерной резке, гибке, сварке и порошковой покраске, а также точные сроки поставки определяются индивидуально на основании согласованного технического задания (ТЗ), чертежей марки КМ/КМД и фиксируются в Договоре поставки / подряда и Спецификациях (Приложениях к договору), подписанных уполномоченными представителями сторон.
          </p>
        </div>
      ),
    },
    {
      number: '2',
      title: 'Порядок оформления заказа и согласования спецификаций',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-neutral-700 leading-relaxed font-light">
          <p>
            2.1. Заказчик направляет предварительную заявку через веб-формы сайта, онлайн-калькулятор, электронную почту <a href="mailto:info@sdmaf.ru" className="text-black font-mono underline">info@sdmaf.ru</a> или по телефону.
          </p>
          <p>
            2.2. Инженерный отдел завода осуществляет проверку чертежей (форматы DXF, DWG, PDF, STEP), расчет раскроя листового металла и формирует официальное Коммерческое предложение (КП).
          </p>
          <p>
            2.3. Договорные обязательства возникают с момента подписания двустороннего Договора поставки/подряда и выставления счета на оплату.
          </p>
        </div>
      ),
    },
    {
      number: '3',
      title: 'Условия оплаты и порядок взаиморасчетов',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-neutral-700 leading-relaxed font-light">
          <p>
            3.1. Все расчеты осуществляются в безналичном порядке в рублях Российской Федерации (с учетом НДС 22%).
          </p>
          <p>
            3.2. Стандартный порядок оплаты для юридических лиц и индивидуальных предпринимателей:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Авансовый платеж:</strong> от 50% до 70% от общей суммы договора после подписания спецификации (для закупки металла и запуска в производство);</li>
            <li><strong>Окончательный расчет:</strong> оставшаяся часть суммы оплачивается Заказчиком после получения официального уведомления о готовности продукции к отгрузке (до момента передачи перевозчику или при выборке со склада);</li>
            <li><strong>Для государственных заказчиков (44-ФЗ / 223-ФЗ):</strong> условия оплаты согласовываются в соответствии с конкурсной/аукционной документацией и требованиями Федерального казначейства.</li>
          </ul>
          <p>
            3.3. Датой исполнения обязательства Заказчика по оплате считается дата поступления денежных средств на расчетный счет ООО «Кадет СПб».
          </p>
        </div>
      ),
    },
    {
      number: '4',
      title: 'Условия доставки, транспортировки и самовывоза',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-neutral-700 leading-relaxed font-light">
          <p>
            4.1. <strong>Самовывоз со склада завода:</strong> отгрузка осуществляется со склада готовой продукции по адресу: <em>г. Санкт-Петербург, г. Колпино, территория Ижорских заводов</em> в рабочие дни с 09:00 до 18:00 по предварительному согласованию и при наличии доверенности формы М-2 (для юрлиц).
          </p>
          <p>
            4.2. <strong>Доставка транспортом завода по Санкт-Петербургу и ЛО:</strong> осуществляется бортовыми автомобилями, манипуляторами или длинномерными шаландами 13.6 м. В стоимость доставки манипулятором входит механизированная саморазгрузка на объекте.
          </p>
          <p>
            4.3. <strong>Доставка по регионам Российской Федерации и странам ЕАЭС:</strong> передача продукции в федеральные транспортные компании («Деловые Линии», «ПЭК», «Возовоз», «Байкал Сервис» и др.) с оформлением транспортной накладной (ТТН) и обязательным страхованием груза.
          </p>
          <p>
            4.4. Риск случайной гибели или повреждения товара переходит к Заказчику в момент передачи товара Заказчику либо первому перевозчику (транспортной компании).
          </p>
        </div>
      ),
    },
    {
      number: '5',
      title: 'Приемка продукции по количеству и качеству',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-neutral-700 leading-relaxed font-light">
          <p>
            5.1. Приемка товара по количеству мест и внешнему виду упаковки осуществляется Заказчиком (или его уполномоченным представителем) в момент передачи товара.
          </p>
          <p>
            5.2. Приемка по качеству (отсутствие скрытых дефектов, соответствие геометрическим размерам КМД, качество порошкового покрытия) осуществляется в течение 5 (пяти) рабочих дней с момента получения продукции на объекте.
          </p>
          <p>
            5.3. Все изделия завода сопровождаются паспортами качества, сертификатами соответствия ГОСТ Р и ТР ЕАЭС 042/2017 (для детского игрового оборудования) и копиями сертификатов на примененный металлопрокат.
          </p>
        </div>
      ),
    },
    {
      number: '6',
      title: 'Гарантийные обязательства, возврат и рекламации',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-neutral-700 leading-relaxed font-light">
          <p>
            6.1. Завод-изготовитель ООО «Кадет СПб» предоставляет официальную гарантию на производимую продукцию:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Несущие стальные конструкции и сварные швы:</strong> от 5 до 10 лет (при условии соблюдения норм монтажа и эксплуатации);</li>
            <li><strong>Порошково-полимерное покрытие по цинковому грунту:</strong> до 5 лет;</li>
            <li><strong>Горячее оцинкование по ГОСТ 9.307-89:</strong> до 25 лет без сквозной коррозии;</li>
            <li><strong>Элементы из нержавеющей стали (AISI 304 / AISI 316):</strong> до 10 лет.</li>
          </ul>
          <p>
            6.2. <strong>Порядок возврата и устранения недостатков:</strong>
          </p>
          <p>
            В случае выявления производственного брака Заказчик направляет мотивированную рекламацию с приложением фото/видеоматериалов на адрес <a href="mailto:info@sdmaf.ru" className="text-black font-mono underline">info@sdmaf.ru</a>. Завод обязуется рассмотреть претензию в течение 3 (трех) рабочих дней и за свой счет устранить выявленные недостатки либо произвести замену бракованного изделия.
          </p>
          <p>
            6.3. Индивидуально изготовленные металлоконструкции и малые архитектурные формы надлежащего качества, произведенные по индивидуальным чертежам Заказчика, возврату и обмену не подлежат (в соответствии со ст. 26.1 Закона РФ «О защите прав потребителей» и нормами ГК РФ о договорах подряда).
          </p>
        </div>
      ),
    },
    {
      number: '7',
      title: 'Юридические реквизиты и контакты',
      content: (
        <div className="border border-neutral-200 bg-neutral-50 p-5 space-y-2 text-xs font-mono text-neutral-800">
          <div className="font-semibold text-neutral-900 text-sm font-sans mb-1">ООО «Кадет СПб»</div>
          <div>ОГРН: 1157847040482 | ИНН: 7805305625 | КПП: 780501001</div>
          <div>Юридический адрес: 198099, г. Санкт-Петербург, Промышленная ул., дом 19 литер н, помещение 148</div>
          <div>Фактический адрес: 195043, г. Санкт-Петербург, ул. 6-ая Жерновская д. 19, лит. А, пом. 9-Н</div>
          <div>Банк: ПАО Банк «Санкт-Петербург»</div>
          <div>Р/с: 40702810790230000685 | БИК: 044030790 | К/с: 30101810900000000790</div>
          <div>Телефоны отдела продаж: СПб +7 (812) 642-88-90, Мск +7 (495) 106-62-24 | Email: info@sdmaf.ru</div>
          <div>Генеральный директор: Еремин Вячеслав Владимирович</div>
          <div>Главный бухгалтер: Константинова Полина Георгиевна</div>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white min-h-screen text-neutral-900 pb-20">
      <SEOHead
        title="Публичная оферта и условия поставки | Завод «Стальное Дело»"
        description="Условия поставки металлоконструкций и МАФ, регламент согласования чертежей КМД, гарантийные обязательства и порядок оплаты (ст. 437 ГК РФ)."
        keywords="публичная оферта ст 437 гк рф, условия поставки металлоконструкций, завод стальное дело договор"
        canonicalPath="/offer"
      />
      {/* Top Breadcrumbs */}
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
            <span className="text-neutral-900 font-medium">Публичная оферта и условия работы</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[11px]">
            <span className="text-neutral-600">ст. 437 ГК РФ</span>
            <span>•</span>
            <span className="text-neutral-600">ООО «Кадет СПб»</span>
            <span>•</span>
            <span className="text-neutral-600">Гарантия до 10 лет</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section className="border-b border-neutral-200 bg-white pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-neutral-400 mb-3">
                <Scale className="w-3.5 h-3.5 text-neutral-700" />
                <span>[ Гражданский кодекс РФ • Условия поставки и гарантии ]</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-light text-neutral-900 tracking-tight leading-[1.1] mb-4">
                Публичная оферта и условия работы
              </h1>
              <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                Регламент взаиморасчетов, условия доставки, приемки готовой продукции, гарантийных обязательств завода и правовой статус материалов сайта sdmaf.ru.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
              <button
                onClick={handlePrint}
                className="px-5 py-3 border border-neutral-300 text-neutral-800 hover:border-black transition-colors flex items-center gap-2 cursor-pointer bg-white"
              >
                <Printer className="w-4 h-4 text-neutral-500" />
                <span>Распечатать условия</span>
              </button>

              {onNavigateToRequisites && (
                <button
                  onClick={onNavigateToRequisites}
                  className="px-4 py-3 bg-neutral-900 text-white hover:bg-black transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Реквизиты ООО «Кадет СПб»</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Pillars */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-neutral-50/50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 bg-white border border-neutral-200">
            <CreditCard className="w-5 h-5 text-neutral-900 mb-2" />
            <div className="text-xs font-mono uppercase text-neutral-500 mb-1">Оплата с НДС 22%</div>
            <div className="text-xs text-neutral-700 font-light">
              Безналичный расчет по договору, спецсчета для 44/223-ФЗ и ГОЗ.
            </div>
          </div>

          <div className="p-4 bg-white border border-neutral-200">
            <Truck className="w-5 h-5 text-neutral-900 mb-2" />
            <div className="text-xs font-mono uppercase text-neutral-500 mb-1">Доставка по РФ и СНГ</div>
            <div className="text-xs text-neutral-700 font-light">
              Манипуляторы завода по СПб/ЛО, доставка ТК с полным страхованием груза.
            </div>
          </div>

          <div className="p-4 bg-white border border-neutral-200">
            <ShieldCheck className="w-5 h-5 text-neutral-900 mb-2" />
            <div className="text-xs font-mono uppercase text-neutral-500 mb-1">Гарантия до 10 лет</div>
            <div className="text-xs text-neutral-700 font-light">
              Паспорта качества, сертификаты ТР ЕАЭС 042 и контроль сварных швов.
            </div>
          </div>

          <div className="p-4 bg-white border border-neutral-200">
            <RotateCcw className="w-5 h-5 text-neutral-900 mb-2" />
            <div className="text-xs font-mono uppercase text-neutral-500 mb-1">Рекламации за 3 дня</div>
            <div className="text-xs text-neutral-700 font-light">
              Оперативное рассмотрение и устранение любых замечаний службой ОТК.
            </div>
          </div>
        </div>
      </section>

      {/* Sections Flow */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-12">
          {offerSections.map((sec, idx) => (
            <div key={idx} className="border-b border-neutral-200 pb-10">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-mono text-xs text-neutral-400 font-semibold tracking-wider">
                  [ ПУНКТ {sec.number} ]
                </span>
                <h2 className="text-xl sm:text-2xl font-light text-neutral-900 tracking-tight">
                  {sec.title}
                </h2>
              </div>
              {sec.content}
            </div>
          ))}

          {/* Bottom Footer Links */}
          <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-500 border-t border-neutral-200">
            <div>
              ООО «Кадет СПб» • ИНН 7805305625 • г. Санкт-Петербург
            </div>
            <div className="flex items-center gap-4">
              {onNavigateToPrivacy && (
                <button
                  onClick={onNavigateToPrivacy}
                  className="hover:text-black underline cursor-pointer"
                >
                  Политика конфиденциальности
                </button>
              )}
              {onNavigateToRequisites && (
                <button
                  onClick={onNavigateToRequisites}
                  className="hover:text-black underline cursor-pointer"
                >
                  Реквизиты организации
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
