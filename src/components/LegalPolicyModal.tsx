import React from 'react';
import { X, ShieldCheck, Printer, ExternalLink } from 'lucide-react';

interface LegalPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'offer' | 'requisites';
  onNavigateToFullPage?: (page: 'privacy' | 'offer' | 'requisites') => void;
}

export const LegalPolicyModal: React.FC<LegalPolicyModalProps> = ({
  isOpen,
  onClose,
  type,
  onNavigateToFullPage,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white border border-neutral-200 w-full max-w-4xl my-auto max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black text-white flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                [ 152-ФЗ РФ • Правовая информация ]
              </div>
              <h2 className="text-sm sm:text-base font-medium text-neutral-900 leading-tight">
                {type === 'privacy' && 'Политика обработки персональных данных'}
                {type === 'offer' && 'Публичная оферта и условия работы (ст. 437 ГК РФ)'}
                {type === 'requisites' && 'Сведения о владельце и реквизиты ООО «Кадет СПб»'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onNavigateToFullPage && (
              <button
                onClick={() => {
                  onClose();
                  onNavigateToFullPage(type);
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border border-neutral-300 hover:border-black transition-colors cursor-pointer text-neutral-700"
              >
                <span>Открыть на всю страницу</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-black hover:bg-neutral-200 transition-colors cursor-pointer"
              title="Закрыть"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-neutral-700 leading-relaxed font-light">
          {type === 'privacy' && (
            <div className="space-y-6">
              <div className="p-4 bg-neutral-50 border border-neutral-200 text-xs">
                <strong className="text-neutral-900 font-medium">Оператор данных:</strong> ООО «Кадет СПб» (ОГРН 1157847040482, ИНН 7805305625, КПП 780501001).
                Юр. адрес: 198099, г. Санкт-Петербург, Промышленная ул., д. 19, лит. Н, пом. 148.
              </div>

              <div>
                <h3 className="font-medium text-neutral-900 text-sm mb-2">1. Общие положения и цели обработки</h3>
                <p>
                  Настоящая Политика определяет порядок обработки персональных данных пользователей сайта sdmaf.ru в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».
                  Данные (имя, номер телефона, email, название организации, прикрепленные файлы чертежей и проектных заданий) собираются исключительно для подготовки официальных смет, расчетов стоимости изделий, организации выезда замерщика и исполнения договоров поставки.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-neutral-900 text-sm mb-2">2. Категории обрабатываемых данных</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>ФИО или имя контактного лица;</li>
                  <li>Номер контактного телефона и адрес электронной почты;</li>
                  <li>Адрес строительного объекта для выезда инженера;</li>
                  <li>Прикрепленные чертежи и файлы спецификаций (DXF, DWG, PDF, STEP);</li>
                  <li>Технические cookie-файлы для обеспечения работы сметного калькулятора.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-neutral-900 text-sm mb-2">3. Безопасность и хранение данных</h3>
                <p>
                  Все данные хранятся на защищенных серверах, расположенных на территории Российской Федерации (242-ФЗ). Оператор принимает все необходимые организационные и технические меры для защиты персональных данных от несанкционированного доступа. Данные не передаются третьим лицам за исключением случаев, предусмотренных законодательством РФ.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-neutral-900 text-sm mb-2">4. Отзыв согласия</h3>
                <p>
                  Пользователь вправе отозвать согласие на обработку персональных данных, направив письменное уведомление на email: <a href="mailto:info@sdmaf.ru" className="text-black font-mono underline">info@sdmaf.ru</a>.
                </p>
              </div>
            </div>
          )}

          {type === 'offer' && (
            <div className="space-y-6">
              <div className="p-4 bg-neutral-50 border border-neutral-200 text-xs">
                <strong className="text-neutral-900 font-medium">Статус информации:</strong> В соответствии с ч. 2 ст. 437 ГК РФ материалы и цены на сайте носят ознакомительный характер и не являются публичной офертой.
              </div>

              <div>
                <h3 className="font-medium text-neutral-900 text-sm mb-2">1. Порядок согласования и оплаты</h3>
                <p>
                  Точная стоимость металлоконструкций, лазерного раскроя и малых архитектурных форм фиксируется в официальной Спецификации к Договору поставки. Оплата производится в безналичном порядке с НДС 20% по выставленному счету.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-neutral-900 text-sm mb-2">2. Доставка и отгрузка</h3>
                <p>
                  Самовывоз осуществляется со склада завода: г. Санкт-Петербург, Колпино, территория Ижорских заводов. Доставка по СПб и ЛО осуществляется манипуляторами и шаландами завода, доставка по РФ — транспортными компаниями со страхованием груза.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-neutral-900 text-sm mb-2">3. Гарантии и приемка</h3>
                <p>
                  Гарантия на несущие стальные конструкции — до 10 лет. На порошково-полимерное покрытие — 5 лет. Продукция сопровождается паспортами качества и сертификатами ТР ЕАЭС 042/2017.
                </p>
              </div>
            </div>
          )}

          {type === 'requisites' && (
            <div className="space-y-4">
              <div className="border border-neutral-200 divide-y divide-neutral-100 bg-neutral-50/50">
                <div className="p-3 flex justify-between"><span className="text-neutral-500 font-mono">Организация:</span><span className="font-medium text-neutral-900">ООО «Кадет СПб»</span></div>
                <div className="p-3 flex justify-between"><span className="text-neutral-500 font-mono">ИНН / КПП:</span><span className="font-mono text-neutral-900">7805305625 / 780501001</span></div>
                <div className="p-3 flex justify-between"><span className="text-neutral-500 font-mono">ОГРН:</span><span className="font-mono text-neutral-900">1157847040482</span></div>
                <div className="p-3 flex justify-between"><span className="text-neutral-500 font-mono">Юр. адрес:</span><span className="text-neutral-900 text-right max-w-sm">198099, г. Санкт-Петербург, Промышленная ул., д. 19 литер н, пом. 148</span></div>
                <div className="p-3 flex justify-between"><span className="text-neutral-500 font-mono">Факт. адрес:</span><span className="text-neutral-900 text-right max-w-sm">195043, г. Санкт-Петербург, ул. 6-ая Жерновская д. 19, лит. А, пом. 9-Н</span></div>
                <div className="p-3 flex justify-between"><span className="text-neutral-500 font-mono">Банк:</span><span className="text-neutral-900 text-right">ПАО Банк «Санкт-Петербург»</span></div>
                <div className="p-3 flex justify-between"><span className="text-neutral-500 font-mono">Р/с:</span><span className="font-mono text-neutral-900">40702810790230000685</span></div>
                <div className="p-3 flex justify-between"><span className="text-neutral-500 font-mono">К/с:</span><span className="font-mono text-neutral-900">30101810900000000790</span></div>
                <div className="p-3 flex justify-between"><span className="text-neutral-500 font-mono">БИК:</span><span className="font-mono text-neutral-900">044030790</span></div>
                <div className="p-3 flex justify-between"><span className="text-neutral-500 font-mono">Ген. директор:</span><span className="text-neutral-900">Еремин В.В.</span></div>
                <div className="p-3 flex justify-between"><span className="text-neutral-500 font-mono">Главный бухгалтер:</span><span className="text-neutral-900">Константинова П.Г.</span></div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between">
          <div className="text-[11px] font-mono text-neutral-500">
            ООО «Кадет СПб» • ИНН 7805305625
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Понятно / Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
