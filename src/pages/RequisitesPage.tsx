import React, { useState } from 'react';
import { 
  Building2, 
  Copy, 
  Check, 
  Printer, 
  Download, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  FileText, 
  ChevronRight,
  ExternalLink,
  Landmark,
  UserCheck
} from 'lucide-react';

interface RequisitesPageProps {
  onBackToHome: () => void;
  onNavigateToPrivacy?: () => void;
  onNavigateToOffer?: () => void;
  onNavigateToContacts?: () => void;
}

export const RequisitesPage: React.FC<RequisitesPageProps> = ({
  onBackToHome,
  onNavigateToPrivacy,
  onNavigateToOffer,
  onNavigateToContacts,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const companyDetails = [
    { label: 'Полное наименование организации', value: 'Общество с ограниченной ответственностью «Кадет СПб»', key: 'name_full' },
    { label: 'Сокращенное наименование', value: 'ООО «Кадет СПб»', key: 'name_short' },
    { label: 'ОГРН', value: '1157847040482', key: 'ogrn' },
    { label: 'ИНН', value: '7805305625', key: 'inn' },
    { label: 'КПП', value: '780501001', key: 'kpp' },
    { 
      label: 'Юридический адрес', 
      value: '198099, Российская Федерация, город Санкт-Петербург, Промышленная улица, дом 19 литер н, помещение 148', 
      key: 'legal_address' 
    },
    { 
      label: 'Фактический адрес', 
      value: '195043, Российская Федерация, г. Санкт-Петербург, ул. 6-ая Жерновская д. 19, лит. А, пом. 9-Н', 
      key: 'actual_address' 
    },
    { label: 'Генеральный директор', value: 'Еремин Вячеслав Владимирович (действует на основании Устава)', key: 'director' },
    { label: 'Главный бухгалтер', value: 'Константинова Полина Георгиевна', key: 'accountant' },
    { label: 'Банк', value: 'ПАО Банк «Санкт-Петербург»', key: 'bank' },
    { label: 'Расчетный счет (р/с)', value: '40702810790230000685', key: 'rs' },
    { label: 'Корреспондентский счет (к/с)', value: '30101810900000000790', key: 'ks' },
    { label: 'БИК', value: '044030790', key: 'bik' },
    { label: 'Система налогообложения', value: 'ОСНО (Общая система с НДС 20%)', key: 'tax' },
    { label: 'Email', value: 'info@sdmaf.ru', key: 'email' },
    { label: 'Телефоны отдела продаж', value: 'СПб: +7 (812) 642-88-90 | Мск: +7 (495) 106-62-24', key: 'phone' },
    { label: 'Основной вид деятельности (ОКВЭД)', value: '25.62 Обработка металлических изделий механическая, 25.11 Производство строительных металлических конструкций', key: 'okved' },
  ];

  const fullRequisitesString = `КАРТОЧКА ПРЕДПРИЯТИЯ / РЕКВИЗИТЫ:
Полное наименование: Общество с ограниченной ответственностью «Кадет СПб»
Сокращенное наименование: ООО «Кадет СПб»
ИНН: 7805305625
КПП: 780501001
ОГРН: 1157847040482
Юридический адрес: 198099, город Санкт-Петербург, Промышленная улица, дом 19 литер н, помещение 148
Фактический адрес: 195043, г. Санкт-Петербург, ул. 6-ая Жерновская д.19, лит. А, пом. 9-Н
Банк: ПАО Банк «Санкт-Петербург»
Расчетный счет: 40702810790230000685
Корреспондентский счет: 30101810900000000790
БИК: 044030790
Генеральный директор: Еремин Вячеслав Владимирович
Главный бухгалтер: Константинова Полина Георгиевна
Email: info@sdmaf.ru
Телефоны: СПб +7 (812) 642-88-90, Мск +7 (495) 106-62-24`;

  const handleDownloadCard = () => {
    const element = document.createElement('a');
    const file = new Blob([fullRequisitesString], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'Requisites_OOO_Kadet_SPb_sdmaf.ru.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

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
            <span className="text-neutral-900 font-medium">Реквизиты и сведения о владельце</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[11px]">
            <span className="text-neutral-600">ИНН 7805305625</span>
            <span>•</span>
            <span className="text-neutral-600">ОГРН 1157847040482</span>
            <span>•</span>
            <span className="text-neutral-600">НДС 20%</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section className="border-b border-neutral-200 bg-white pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-neutral-400 mb-3">
                <Building2 className="w-3.5 h-3.5 text-neutral-700" />
                <span>[ Юридическая информация • 149-ФЗ / ст. 437 ГК РФ ]</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-light text-neutral-900 tracking-tight leading-[1.1] mb-4">
                Сведения о владельце и реквизиты
              </h1>
              <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                Официальные регистрационные, банковские и контактные реквизиты юридического лица — оператора сайта и производителя металлоконструкций ООО «Кадет СПб» для заключения договоров поставки, подряда и участия в закупках по 44-ФЗ и 223-ФЗ.
              </p>
            </div>

            {/* Quick Actions Buttons */}
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
              <button
                onClick={() => copyToClipboard(fullRequisitesString, 'all')}
                className="px-5 py-3 bg-black text-white hover:bg-neutral-800 transition-colors flex items-center gap-2 cursor-pointer"
              >
                {copiedField === 'all' ? (
                  <>
                    <Check className="w-4 h-4 text-[#55AA53]" />
                    <span>Скопировано в буфер</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Скопировать все реквизиты</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownloadCard}
                className="px-4 py-3 border border-neutral-300 text-neutral-800 hover:border-black transition-colors flex items-center gap-2 cursor-pointer bg-white"
              >
                <Download className="w-4 h-4 text-neutral-500" />
                <span>Скачать карточку (.txt)</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-4 py-3 border border-neutral-300 text-neutral-800 hover:border-black transition-colors flex items-center gap-2 cursor-pointer bg-white"
                title="Печать карточки"
              >
                <Printer className="w-4 h-4 text-neutral-500" />
                <span className="hidden sm:inline">Распечатать</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Requisites Table */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Company Highlights Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="border border-neutral-200 p-6 bg-neutral-50/50">
              <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                [ Организационно-правовая форма ]
              </div>
              <div className="text-xl font-medium text-neutral-900 mb-1">
                ООО «Кадет СПб»
              </div>
              <div className="text-xs text-neutral-500 font-light">
                Действующее юридическое лицо с 2015 года
              </div>
            </div>

            <div className="border border-neutral-200 p-6 bg-neutral-50/50">
              <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                [ ИНН / ОГРН ]
              </div>
              <div className="font-mono text-lg font-medium text-neutral-900 mb-1">
                7805305625 / 1157847040482
              </div>
              <div className="text-xs text-neutral-500 font-light">
                Постановка на учет в МИФНС по Санкт-Петербургу (КПП 780501001)
              </div>
            </div>

            <div className="border border-neutral-200 p-6 bg-neutral-50/50">
              <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                [ Банковское обслуживание ]
              </div>
              <div className="text-sm font-medium text-neutral-900 mb-1">
                ПАО Банк «Санкт-Петербург»
              </div>
              <div className="text-xs text-neutral-500 font-mono">
                БИК: 044030790
              </div>
            </div>
          </div>

          {/* Full Requisites Table with Copy buttons */}
          <div className="border border-neutral-200 bg-white shadow-xs">
            <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-50 flex items-center justify-between">
              <div className="font-mono text-xs uppercase tracking-wider text-neutral-700">
                Полные учетные и банковские реквизиты
              </div>
              <div className="text-[11px] font-mono text-neutral-400">
                Нажмите на иконку для копирования значения
              </div>
            </div>

            <div className="divide-y divide-neutral-100">
              {companyDetails.map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-neutral-50/60 transition-colors"
                >
                  <div className="text-xs font-mono uppercase text-neutral-500 sm:w-1/3">
                    {item.label}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-neutral-900 sm:w-1/2 break-words leading-relaxed font-sans">
                    {item.value}
                  </div>
                  <div className="sm:w-1/6 flex justify-end">
                    <button
                      onClick={() => copyToClipboard(item.value, item.key)}
                      className="px-3 py-1.5 border border-neutral-200 hover:border-black text-neutral-600 hover:text-black text-[11px] font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer bg-white"
                      title={`Скопировать ${item.label}`}
                    >
                      {copiedField === item.key ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#55AA53]" />
                          <span className="text-[#55AA53]">Скопировано</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-neutral-400" />
                          <span>Копировать</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Location & Official Contacts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* Legal vs Postal Address */}
            <div className="border border-neutral-200 p-6 sm:p-8 bg-white">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-3">
                <MapPin className="w-4 h-4 text-neutral-700" />
                <span>[ Адреса предприятия ]</span>
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-4">
                Юридический и фактический адреса
              </h3>

              <div className="space-y-4 text-xs text-neutral-700 font-light">
                <div className="border-b border-neutral-100 pb-3">
                  <div className="font-mono text-[10px] uppercase text-neutral-400 mb-1">
                    Юридический адрес:
                  </div>
                  <p className="font-normal text-neutral-900">
                    198099, Российская Федерация, город Санкт-Петербург, Промышленная улица, дом 19 литер н, помещение 148
                  </p>
                </div>

                <div>
                  <div className="font-mono text-[10px] uppercase text-neutral-400 mb-1">
                    Фактический адрес (производство и отгрузка):
                  </div>
                  <p className="font-normal text-neutral-900">
                    195043, Российская Федерация, г. Санкт-Петербург, ул. 6-ая Жерновская д. 19, лит. А, пом. 9-Н
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Contract Links */}
            <div className="border border-neutral-200 p-6 sm:p-8 bg-neutral-50/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-3">
                  <ShieldCheck className="w-4 h-4 text-neutral-700" />
                  <span>[ Правовые документы ]</span>
                </div>
                <h3 className="text-lg font-medium text-neutral-900 mb-2">
                  Политики и нормативные соглашения
                </h3>
                <p className="text-xs text-neutral-600 font-light leading-relaxed mb-6">
                  Ознакомьтесь с условиями обработки данных пользователей и правилами взаимодействия при оформлении коммерческих предложений и заказов.
                </p>

                <div className="space-y-3 text-xs font-mono">
                  {onNavigateToPrivacy && (
                    <button
                      onClick={onNavigateToPrivacy}
                      className="w-full p-3 bg-white border border-neutral-200 hover:border-black text-left flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span className="text-neutral-900">Политика обработки персональных данных (152-ФЗ)</span>
                      <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                    </button>
                  )}

                  {onNavigateToOffer && (
                    <button
                      onClick={onNavigateToOffer}
                      className="w-full p-3 bg-white border border-neutral-200 hover:border-black text-left flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span className="text-neutral-900">Публичная оферта и условия работы (ст. 437 ГК РФ)</span>
                      <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                    </button>
                  )}
                </div>
              </div>

              {onNavigateToContacts && (
                <div className="pt-6 border-t border-neutral-200 mt-6">
                  <button
                    onClick={onNavigateToContacts}
                    className="text-xs font-mono uppercase tracking-wider text-black hover:underline flex items-center gap-2 cursor-pointer"
                  >
                    <span>Перейти на страницу контактов и служб завода</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
