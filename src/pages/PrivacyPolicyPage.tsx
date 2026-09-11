import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Lock, 
  ChevronRight, 
  Printer, 
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface PrivacyPolicyPageProps {
  onBackToHome: () => void;
  onNavigateToRequisites?: () => void;
  onNavigateToOffer?: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({
  onBackToHome,
  onNavigateToRequisites,
  onNavigateToOffer,
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const handlePrint = () => {
    window.print();
  };

  const sections = [
    {
      id: 'general',
      number: '1',
      title: 'Общие положения',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-neutral-700 leading-relaxed font-light">
          <p>
            1.1. Настоящая Политика обработки персональных данных (далее — «Политика») определяет порядок сбора, записи, систематизации, накопления, хранения, уточнения, извлечения, использования, передачи, обезличивания, блокирования, удаления и уничтожения персональных данных пользователей сайта <strong>sdmaf.ru</strong> (далее — «Сайт»).
          </p>
          <p>
            1.2. Оператором персональных данных является <strong>Общество с ограниченной ответственностью «Кадет СПб»</strong> (ООО «Кадет СПб», ОГРН 1157847040482, ИНН 7805305625, КПП 780501001, юридический адрес: 198099, г. Санкт-Петербург, Промышленная улица, дом 19 литер н, помещение 148; фактический адрес: 195043, г. Санкт-Петербург, ул. 6-ая Жерновская д. 19, лит. А, пом. 9-Н).
          </p>
          <p>
            1.3. Политика разработана в строгом соответствии с требованиями Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных», Федерального закона от 27.07.2006 № 149-ФЗ «Об информации, информационных технологиях и о защите информации», а также иных применимых нормативно-правовых актов Российской Федерации в области защиты информации.
          </p>
          <p>
            1.4. Использование сервисов Сайта, заполнение форм обратной связи, загрузка файлов чертежей, заказ сметного расчета или вызова замерщика означает безоговорочное согласие Пользователя с настоящей Политикой и указанными в ней условиями обработки его персональной информации.
          </p>
        </div>
      ),
    },
    {
      id: 'principles',
      number: '2',
      title: 'Принципы и правовые основания обработки данных',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-neutral-700 leading-relaxed font-light">
          <p>
            2.1. Обработка персональных данных осуществляется Оператором на законной и справедливой основе, ограничивается достижением конкретных, заранее определенных и законных целей.
          </p>
          <p>
            2.2. Правовыми основаниями обработки персональных данных являются:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Конституция Российской Федерации;</li>
            <li>Гражданский кодекс Российской Федерации;</li>
            <li>Федеральный закон от 27.07.2006 № 152-ФЗ «О персональных данных»;</li>
            <li>Уставные документы ООО «Кадет СПб»;</li>
            <li>Договоры поставки, подряда и купли-продажи, заключаемые между Оператором и Пользователем / Заказчиком;</li>
            <li>Согласие Пользователя на обработку персональных данных, предоставляемое путем проставления отметки («галочки») в веб-формах Сайта.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'categories',
      number: '3',
      title: 'Состав и категории обрабатываемых персональных данных',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-neutral-700 leading-relaxed font-light">
          <p>
            3.1. Оператор может обрабатывать следующие категории персональных данных Пользователей:
          </p>
          <div className="border border-neutral-200 divide-y divide-neutral-100 bg-neutral-50/40 my-3">
            <div className="p-3">
              <strong className="text-neutral-900 font-medium">Идентификационные данные:</strong> фамилия, имя, отчество, должность, наименование представляемой организации или компании-заказчика.
            </div>
            <div className="p-3">
              <strong className="text-neutral-900 font-medium">Контактные данные:</strong> номер контактного телефона (мобильный, рабочий), адрес электронной почты (e-mail).
            </div>
            <div className="p-3">
              <strong className="text-neutral-900 font-medium">Адресные данные:</strong> адрес объекта благоустройства или строительства для выезда инженера-замерщика, адрес доставки продукции в СПб, Ленобласти или регионах РФ.
            </div>
            <div className="p-3">
              <strong className="text-neutral-900 font-medium">Техническая документация:</strong> прикрепляемые Пользователем файлы чертежей (DXF, DWG, STEP, PDF), спецификации, эскизы и комментарии к заказу.
            </div>
            <div className="p-3">
              <strong className="text-neutral-900 font-medium">Электронные и аналитические данные:</strong> IP-адрес, файлы cookie (cookies), информация о браузере и типе устройства, время доступа, геолокационные метки (без точной персональной привязки).
            </div>
          </div>
          <p>
            3.2. Оператор не осуществляет обработку специальных категорий персональных данных, касающихся расовой, национальной принадлежности, политических взглядов, религиозных убеждений, состояния здоровья, а также биометрических данных.
          </p>
        </div>
      ),
    },
    {
      id: 'purposes',
      number: '4',
      title: 'Цели сбора и обработки персональных данных',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-neutral-700 leading-relaxed font-light">
          <p>
            4.1. Персональные данные Пользователя обрабатываются исключительно в следующих целях:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>Расчет смет и КП:</strong> обработка входящих запросов на расчет стоимости лазерной резки, гибки металла, изготовления малых архитектурных форм и металлоконструкций;
            </li>
            <li>
              <strong>Инжиниринговое сопровождение:</strong> организация выезда конструктора-замерщика на строительный объект или площадку заказчика;
            </li>
            <li>
              <strong>Оформление гостевых пропусков:</strong> организация очных экскурсий и аудита производственных цехов завода в Колпино (территория Ижорских заводов);
            </li>
            <li>
              <strong>Заключение и исполнение договоров:</strong> оформление договоров поставки, спецификаций, отгрузочных документов (УПД, ТОРГ-12, ТТН), актов КС-2 и КС-3;
            </li>
            <li>
              <strong>Клиентская поддержка и обратная связь:</strong> информирование о ходе выполнения производственного заказа, стадиях покраски и готовности к отгрузке;
            </li>
            <li>
              <strong>Улучшение работы Сайта:</strong> анализ пользовательского опыта и аналитика работы онлайн-калькуляторов.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'storage',
      number: '5',
      title: 'Порядок сбора, хранения, передачи и защиты данных',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-neutral-700 leading-relaxed font-light">
          <p>
            5.1. Безопасность персональных данных обеспечивается применением правовых, организационных и технических мер, необходимых для выполнения в полном объеме требований законодательства РФ в области защиты информации.
          </p>
          <p>
            5.2. Оператор обеспечивает сохранность персональных данных и принимает меры, исключающие несанкционированный доступ к персональным данным третьих лиц (шифрование протоколов SSL/TLS, ограничение доступа персонала, антивирусная защита серверов).
          </p>
          <p>
            5.3. Все базы данных, содержащие персональные данные граждан Российской Федерации, размещены на защищенных серверах, физически расположенных на территории Российской Федерации (в соответствии с Федеральным законом № 242-ФЗ).
          </p>
          <p>
            5.4. Персональные данные Пользователя никогда, ни при каких условиях не будут переданы третьим лицам, за исключением случаев, связанных с исполнением действующего законодательства (по официальным запросам суда или правоохранительных органов) либо для исполнения поручения Пользователя (например, передача данных курьерской или транспортной службе для доставки заказа).
          </p>
          <p>
            5.5. Срок обработки персональных данных является неограниченным до момента отзыва согласия Пользователем.
          </p>
        </div>
      ),
    },
    {
      id: 'cookies',
      number: '6',
      title: 'Использование файлов Cookie и веб-аналитики',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-neutral-700 leading-relaxed font-light">
          <p>
            6.1. На Сайте используются файлы cookie (куки) и сервисы веб-аналитики (включая Яндекс.Метрику) для обеспечения стабильной работы интерфейса, сохранения расчетов сметы и улучшения функционала.
          </p>
          <p>
            6.2. Файлы cookie представляют собой небольшие текстовые файлы, сохраняемые в браузере Пользователя. Они не содержат конфиденциальной информации и не позволяют идентифицировать личность без дополнительных данных.
          </p>
          <p>
            6.3. Пользователь может в любой момент отключить сохранение cookie или удалить уже сохраненные файлы в настройках своего браузера. Обращаем внимание, что при отключении cookie некоторые разделы Сайта (например, сохранение позиций в сметном калькуляторе) могут работать некорректно.
          </p>
        </div>
      ),
    },
    {
      id: 'rights',
      number: '7',
      title: 'Права Пользователя и порядок отзыва согласия',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-neutral-700 leading-relaxed font-light">
          <p>
            7.1. Пользователь имеет право на получение информации, касающейся обработки его персональных данных, в том числе содержащей подтверждение факта обработки, правовые основания, цели и применяемые способы обработки.
          </p>
          <p>
            7.2. Пользователь имеет право требовать от Оператора уточнения своих персональных данных, их блокирования или уничтожения в случае, если данные являются неполными, устаревшими, неточными или незаконно полученными.
          </p>
          <p>
            7.3. Согласие на обработку персональных данных может быть отозвано Пользователем в любое время путем направления письменного заявления с темой «Отзыв согласия на обработку персональных данных» на адрес электронной почты Оператора: <a href="mailto:info@sdmaf.ru" className="text-black font-mono underline">info@sdmaf.ru</a> либо заказным почтовым отправлением по адресу: <strong>195043, г. Санкт-Петербург, ул. 6-ая Жерновская д. 19, лит. А, пом. 9-Н, ООО "Кадет СПб"</strong>.
          </p>
        </div>
      ),
    },
    {
      id: 'contacts',
      number: '8',
      title: 'Реквизиты Оператора персональных данных',
      content: (
        <div className="border border-neutral-200 bg-neutral-50 p-5 space-y-2 text-xs font-mono text-neutral-800">
          <div className="font-semibold text-neutral-900 text-sm font-sans mb-2">ООО «Кадет СПб»</div>
          <div>ОГРН: 1157847040482</div>
          <div>ИНН / КПП: 7805305625 / 780501001</div>
          <div>Юридический адрес: 198099, РФ, г. Санкт-Петербург, Промышленная улица, дом 19 литер н, помещение 148</div>
          <div>Фактический адрес: 195043, г. Санкт-Петербург, ул. 6-ая Жерновская д. 19, лит. А, пом. 9-Н</div>
          <div>Банк: ПАО Банк «Санкт-Петербург»</div>
          <div>Р/с: 40702810790230000685 | БИК: 044030790 | К/с: 30101810900000000790</div>
          <div>Email для запросов по персональным данным: <a href="mailto:info@sdmaf.ru" className="underline text-black">info@sdmaf.ru</a></div>
          <div>Телефон: +7 (812) 642-88-90</div>
          <div>Генеральный директор: Еремин Вячеслав Владимирович</div>
          <div>Главный бухгалтер: Константинова Полина Георгиевна</div>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white min-h-screen text-neutral-900 pb-20">
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
            <span className="text-neutral-900 font-medium">Политика обработки персональных данных</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[11px]">
            <span className="text-neutral-600">152-ФЗ РФ</span>
            <span>•</span>
            <span className="text-neutral-600">ООО «Кадет СПб»</span>
            <span>•</span>
            <span className="text-neutral-600">Редакция от 2026 г.</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section className="border-b border-neutral-200 bg-white pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-neutral-400 mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-700" />
                <span>[ Правовые акты • Федеральный закон № 152-ФЗ ]</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-light text-neutral-900 tracking-tight leading-[1.1] mb-4">
                Политика обработки персональных данных
              </h1>
              <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                Документ определяет порядок и условия обработки персональных данных пользователей на сайте sdmaf.ru, права субъектов персональных данных и гарантии защиты конфиденциальности со стороны ООО «Кадет СПб».
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
              <button
                onClick={handlePrint}
                className="px-5 py-3 border border-neutral-300 text-neutral-800 hover:border-black transition-colors flex items-center gap-2 cursor-pointer bg-white"
              >
                <Printer className="w-4 h-4 text-neutral-500" />
                <span>Распечатать документ</span>
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

      {/* Sections Container */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Quick Notice Badge */}
          <div className="border border-neutral-200 bg-neutral-50/70 p-5 mb-12 flex items-start gap-3.5">
            <ShieldCheck className="w-5 h-5 text-neutral-800 shrink-0 mt-0.5" />
            <div className="text-xs text-neutral-600 leading-relaxed font-light">
              <strong className="text-neutral-900 font-medium">Безопасность ваших чертежей и контактов:</strong> Все отправляемые через сайт чертежи, спецификации и контактные данные используются исключительно для инженерного расчета и подготовки коммерческого предложения. Мы не передаем данные третьим лицам и не занимаемся рекламными рассылками без вашего согласия.
            </div>
          </div>

          {/* Policy Document Flow */}
          <div className="space-y-12">
            {sections.map((sec) => (
              <div key={sec.id} className="border-b border-neutral-200 pb-10">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-mono text-xs text-neutral-400 font-semibold tracking-wider">
                    [ РАЗДЕЛ {sec.number} ]
                  </span>
                  <h2 className="text-xl sm:text-2xl font-light text-neutral-900 tracking-tight">
                    {sec.title}
                  </h2>
                </div>
                {sec.content}
              </div>
            ))}
          </div>

          {/* Bottom Footer Links */}
          <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-500 border-t border-neutral-200 mt-12">
            <div>
              Оператор: ООО «Кадет СПб» • ИНН 7805305625 • г. Санкт-Петербург
            </div>
            <div className="flex items-center gap-4">
              {onNavigateToOffer && (
                <button
                  onClick={onNavigateToOffer}
                  className="hover:text-black underline cursor-pointer"
                >
                  Публичная оферта
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
