import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Copy, 
  Database, 
  Send, 
  Layers, 
  Cpu, 
  FileSpreadsheet, 
  ShieldCheck, 
  Building2, 
  PhoneCall, 
  Compass, 
  ArrowRight,
  ExternalLink,
  Code2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { sendLeadToBitrix24, BITRIX_LEAD_ADD_ENDPOINT } from '../services/bitrixService';

interface BitrixWebhookGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BitrixWebhookGuideModal: React.FC<BitrixWebhookGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'endpoints' | 'forms' | 'tester'>('endpoints');

  // Tester state
  const [testFormType, setTestFormType] = useState<string>('laser_calculator');
  const [testName, setTestName] = useState('Алексей Смирнов');
  const [testPhone, setTestPhone] = useState('+7 (921) 900-11-22');
  const [testCompany, setTestCompany] = useState('ООО «СтройГрупп СПб»');
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; leadId?: string | number } | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const handleSendTestLead = async () => {
    setIsSendingTest(true);
    setTestResult(null);

    const result = await sendLeadToBitrix24({
      sourceType: testFormType as any,
      title: `[Тестовый Лид] Проверка интеграции CRM: ${testFormType}`,
      name: testName,
      phone: testPhone,
      company: testCompany,
      department: 'Инженерно-коммерческий отдел',
      pageSource: 'Интерактивный диагност вебхука Bitrix24',
      details: {
        'Тестовый параметр 1': 'Листовая сталь Ст3, 6.0 мм',
        'Длина реза': '280 пог. м',
        'Число гибов': '42 шт.',
        'Порошковая окраска': 'RAL 7016 Антрацит Муар',
        'Срочность': 'Стандарт (3-5 раб. дней)',
      }
    });

    setIsSendingTest(false);
    setTestResult({
      success: result.success,
      message: result.message || (result.success ? `Успешно отправлено в Битрикс24 (ID: ${result.leadId})` : `Ошибка: ${result.error}`),
      leadId: result.leadId
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="bg-white border border-neutral-200 w-full max-w-4xl shadow-2xl relative my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-200 flex items-start justify-between bg-neutral-900 text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-neutral-800 border border-neutral-700">
              <Database className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest">
                [ Интеграция CRM Bitrix24 ]
              </div>
              <h3 className="text-lg sm:text-xl font-light text-white tracking-tight">
                Настройка входящего вебхука и персонализация форм
              </h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-200 bg-neutral-100 text-xs font-mono uppercase tracking-wider shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('endpoints')}
            className={`px-5 py-3 border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'endpoints' 
                ? 'border-black bg-white text-black font-semibold' 
                : 'border-transparent text-neutral-600 hover:text-black'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>1. Какой вебхук создать в Bitrix24</span>
          </button>
          <button
            onClick={() => setActiveTab('forms')}
            className={`px-5 py-3 border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'forms' 
                ? 'border-black bg-white text-black font-semibold' 
                : 'border-transparent text-neutral-600 hover:text-black'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>2. Структура 7 типов персонализированных форм</span>
          </button>
          <button
            onClick={() => setActiveTab('tester')}
            className={`px-5 py-3 border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'tester' 
                ? 'border-black bg-white text-black font-semibold' 
                : 'border-transparent text-neutral-600 hover:text-black'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>3. Тестер отправки лида в CRM</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-neutral-900 text-sm">
          {activeTab === 'endpoints' && (
            <div className="space-y-6">
              <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm">
                <div className="font-semibold mb-1 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-700" />
                  <span>Разница между методами crm.lead.get и crm.lead.add</span>
                </div>
                <p className="leading-relaxed">
                  Предоставленный вами URL содержал метод <code className="bg-amber-100 px-1 py-0.5 font-mono">crm.lead.get.json?ID=88</code> — он предназначен <strong>только для чтения</strong> (получения) существующего лида. 
                  Для того чтобы вебхук <strong>записывал новые заявки в таблицу CRM</strong>, используется метод добавления: <code className="bg-amber-100 px-1 py-0.5 font-mono font-bold">crm.lead.add.json</code>.
                </p>
              </div>

              {/* Endpoint Card */}
              <div className="border border-neutral-200 p-5 bg-neutral-50">
                <div className="text-xs font-mono uppercase text-neutral-500 mb-2">
                  Рабочий конечный URL для добавления лидов с сайта:
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-white p-3 border border-neutral-300 font-mono text-xs break-all">
                  <span className="text-emerald-700 font-bold shrink-0">POST</span>
                  <span className="text-neutral-900 flex-1">{BITRIX_LEAD_ADD_ENDPOINT}</span>
                  <button
                    onClick={() => copyToClipboard(BITRIX_LEAD_ADD_ENDPOINT, 'lead-add-url')}
                    className="px-3 py-1.5 bg-neutral-900 text-white text-[11px] font-mono hover:bg-black transition-colors flex items-center justify-center gap-1 shrink-0 cursor-pointer"
                  >
                    {copiedText === 'lead-add-url' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Скопировано</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Копировать URL</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Step by Step instructions */}
              <div className="space-y-3">
                <h4 className="font-medium text-base text-neutral-900">
                  Пошаговая инструкция: как создать входящий вебхук в интерфейсе Bitrix24
                </h4>
                <ol className="space-y-3 text-xs sm:text-sm text-neutral-700 list-decimal list-inside leading-relaxed bg-white border border-neutral-200 p-4">
                  <li>В левом меню вашего Bitrix24 перейдите в раздел <strong>«Разработчикам»</strong> (или «Приложения» → «Вебхуки»).</li>
                  <li>Нажмите <strong>«Другое»</strong> → <strong>«Входящий вебхук»</strong>.</li>
                  <li>В поле «Название» укажите: <code className="bg-neutral-100 px-1 font-mono">Интеграция сайта sdmaf.ru (Лиды и Смета)</code>.</li>
                  <li>В блоке <strong>«Настройка прав»</strong> обязательно отметьте галочкой категорию: <strong>CRM (crm)</strong>.</li>
                  <li>Нажмите <strong>«Сохранить»</strong>. Битрикс сгенерирует ваш секретный URL с токеном.</li>
                  <li>Все формы на этом сайте автоматически отправляют структурированные запросы по методу <code className="bg-neutral-100 px-1 font-mono">crm.lead.add.json</code> с фиксацией в ленте CRM и колокольчике ответственных.</li>
                </ol>
              </div>

              {/* CRM Lead Fields Mapping */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-neutral-900">
                  Таблица маппинга полей сайта в поля карточки Лида Bitrix24:
                </h4>
                <div className="border border-neutral-200 overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-neutral-100 font-mono text-neutral-600 border-b border-neutral-200">
                        <th className="p-2.5">Поле в Bitrix24</th>
                        <th className="p-2.5">Тип</th>
                        <th className="p-2.5">Что передает форма на сайте</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      <tr>
                        <td className="p-2.5 font-mono text-emerald-800">TITLE</td>
                        <td className="p-2.5 font-mono text-neutral-500">String</td>
                        <td className="p-2.5">Персонализированный заголовок: например, <code>[Калькулятор ЧПУ] Ст3 6мм, 280м</code> или <code>[ТЕНДЕР 44-ФЗ] Закупка №0173...</code></td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono text-emerald-800">NAME</td>
                        <td className="p-2.5 font-mono text-neutral-500">String</td>
                        <td className="p-2.5">ФИО контактного лица / инженера / посетителя</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono text-emerald-800">PHONE</td>
                        <td className="p-2.5 font-mono text-neutral-500">Multifield</td>
                        <td className="p-2.5">Номер телефона заказчика (<code>VALUE_TYPE: WORK</code>)</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono text-emerald-800">EMAIL</td>
                        <td className="p-2.5 font-mono text-neutral-500">Multifield</td>
                        <td className="p-2.5">Электронная почта для направления КП и расчетов</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono text-emerald-800">COMPANY_TITLE</td>
                        <td className="p-2.5 font-mono text-neutral-500">String</td>
                        <td className="p-2.5">Название юридического лица и ИНН организации</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono text-emerald-800">OPPORTUNITY</td>
                        <td className="p-2.5 font-mono text-neutral-500">Double (Пусто)</td>
                        <td className="p-2.5">
                          <strong>Не заполняется (без цены)</strong>. Менеджер завода связывается с заказчиком, уточняет объемы, марку стали, чертежи и рассчитывает точную смету вручную.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono text-emerald-800">COMMENTS</td>
                        <td className="p-2.5 font-mono text-neutral-500">Text / HTML</td>
                        <td className="p-2.5">Полная расшифровка всех уникальных параметров (чертежи, порода дерева, цвет RAL, адрес замера, номер закупки, состав делегации)</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono text-emerald-800">UTM_SOURCE / MEDIUM</td>
                        <td className="p-2.5 font-mono text-neutral-500">String</td>
                        <td className="p-2.5">Маркировка формы источника: <code>laser_calculator</code>, <code>maf_product_quote</code>, <code>tender_request</code>, <code>site_measurer</code> и др.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'forms' && (
            <div className="space-y-4">
              <div className="text-xs text-neutral-600">
                Каждый раздел сайта имеет свой специализированный запрос, адаптированный под профиль задачи заказчика. Ниже приведена матрица разделов и их уникальных полей:
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Form 1 */}
                <div className="p-4 border border-neutral-200 bg-neutral-50">
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu className="w-4 h-4 text-neutral-800" />
                    <span className="font-semibold text-xs uppercase font-mono">1. Калькулятор раскроя и ЧПУ гибки</span>
                  </div>
                  <div className="text-xs text-neutral-600 space-y-1 font-mono">
                    <div>• <strong>Формат заголовка:</strong> [Калькулятор ЧПУ] Металл Толщина, Длина, Гибы</div>
                    <div>• <strong>Уникальные поля:</strong> Марка стали (Ст3/AISI/Алюминий), толщина 0.5-30мм, пог. метры реза, число гибов, давальческое/заводское сырье, покраска RAL/Муар, срочность (24ч / стандарт), файл DXF/DWG/STEP.</div>
                  </div>
                </div>

                {/* Form 2 */}
                <div className="p-4 border border-neutral-200 bg-neutral-50">
                  <div className="flex items-center gap-2 mb-2">
                    <Layers className="w-4 h-4 text-neutral-800" />
                    <span className="font-semibold text-xs uppercase font-mono">2. Карточка МАФ / Каталог</span>
                  </div>
                  <div className="text-xs text-neutral-600 space-y-1 font-mono">
                    <div>• <strong>Формат заголовка:</strong> [Заказ МАФ] Модель (Артикул) — N шт.</div>
                    <div>• <strong>Уникальные поля:</strong> Порода дерева (сосна / лиственница / термоясень / ДПК), RAL полимеризации, горячий цинк, LED-подсветка, анкеровка/бетонирование, тираж, адрес объекта.</div>
                  </div>
                </div>

                {/* Form 3 */}
                <div className="p-4 border border-neutral-200 bg-neutral-50">
                  <div className="flex items-center gap-2 mb-2">
                    <FileSpreadsheet className="w-4 h-4 text-neutral-800" />
                    <span className="font-semibold text-xs uppercase font-mono">3. Сводная проектная смета</span>
                  </div>
                  <div className="text-xs text-neutral-600 space-y-1 font-mono">
                    <div>• <strong>Формат заголовка:</strong> [Проектная смета] Спецификация на N позиций (~X ₽)</div>
                    <div>• <strong>Уникальные поля:</strong> Полный табличный состав сметы, 3D BIM модели (Revit/IFC), паспорта изделий, тип шаланды/манипулятора, реквизиты компании с НДС 22%.</div>
                  </div>
                </div>

                {/* Form 4 */}
                <div className="p-4 border border-neutral-200 bg-neutral-50">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-4 h-4 text-neutral-800" />
                    <span className="font-semibold text-xs uppercase font-mono">4. Тендерный отдел (44/223-ФЗ)</span>
                  </div>
                  <div className="text-xs text-neutral-600 space-y-1 font-mono">
                    <div>• <strong>Формат заголовка:</strong> [ТЕНДЕР 44/223-ФЗ] Закупка №..., ИНН...</div>
                    <div>• <strong>Уникальные поля:</strong> Номер извещения ЕИС, торговая площадка (Сбер А, РТС, ЕЭТП), дедлайн подачи КП, казначейское сопровождение, спецсчет, файлы ВОР/ТЗ.</div>
                  </div>
                </div>

                {/* Form 5 */}
                <div className="p-4 border border-neutral-200 bg-neutral-50">
                  <div className="flex items-center gap-2 mb-2">
                    <Compass className="w-4 h-4 text-neutral-800" />
                    <span className="font-semibold text-xs uppercase font-mono">5. Выезд инженера-замерщика</span>
                  </div>
                  <div className="text-xs text-neutral-600 space-y-1 font-mono">
                    <div>• <strong>Формат заголовка:</strong> [Выезд на замер] Адрес, желаемая дата</div>
                    <div>• <strong>Уникальные поля:</strong> Адрес площадки (СПб/ЛО), тип основания (плита, грунт, асфальт), наличие геоподосновы, контакт прораба на объекте, дата и время.</div>
                  </div>
                </div>

                {/* Form 6 */}
                <div className="p-4 border border-neutral-200 bg-neutral-50">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="w-4 h-4 text-neutral-800" />
                    <span className="font-semibold text-xs uppercase font-mono">6. Пропуск на завод / Аудит цехов</span>
                  </div>
                  <div className="text-xs text-neutral-600 space-y-1 font-mono">
                    <div>• <strong>Формат заголовка:</strong> [Аудит завода] Пропуск на КПП для ФИО, Компания</div>
                    <div>• <strong>Уникальные поля:</strong> Паспортные данные для бюро пропусков режимного предприятия (Ижорский завод), количество гостей, интересующие станки ЧПУ.</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tester' && (
            <div className="space-y-5">
              <div className="p-4 bg-neutral-50 border border-neutral-200">
                <h4 className="font-medium text-sm text-neutral-900 mb-1">
                  Тестовая отправка лида в Bitrix24
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Проверьте работу вебхука прямо сейчас. Нажмите кнопку «Отправить тестовый лид», и система передаст запрос на ваш сервер Битрикс24 по методу <code className="bg-neutral-200 px-1 font-mono">crm.lead.add.json</code>.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-500 mb-1">
                    Тип формы для теста
                  </label>
                  <select
                    value={testFormType}
                    onChange={(e) => setTestFormType(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-black"
                  >
                    <option value="laser_calculator">Калькулятор лазерной резки и ЧПУ гибки</option>
                    <option value="maf_product_quote">Запрос КП на модель МАФ (скамья / пергола)</option>
                    <option value="batch_estimate">Сводная спецификация (смета с артикулами)</option>
                    <option value="tender_request">Тендерный отдел (44-ФЗ / 223-ФЗ)</option>
                    <option value="site_measurer">Выезд инженера-замерщика на объект</option>
                    <option value="factory_excursion">Заявка на пропуск / Аудит цехов завода</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-500 mb-1">
                    ФИО контактного лица
                  </label>
                  <input
                    type="text"
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-500 mb-1">
                    Номер телефона
                  </label>
                  <input
                    type="tel"
                    value={testPhone}
                    onChange={(e) => setTestPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-500 mb-1">
                    Компания / Организация
                  </label>
                  <input
                    type="text"
                    value={testCompany}
                    onChange={(e) => setTestCompany(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleSendTestLead}
                  disabled={isSendingTest}
                  className="px-6 py-3 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSendingTest ? (
                    <span>Отправка в Битрикс24...</span>
                  ) : (
                    <>
                      <span>Отправить тестовый лид в CRM</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

              {testResult && (
                <div className={`p-4 border ${testResult.success ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-red-50 border-red-200 text-red-900'} text-xs font-mono flex items-start gap-3`}>
                  {testResult.success ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <div className="font-semibold text-sm">
                      {testResult.success ? 'Результат выполнения запроса: УСПЕХ' : 'Ошибка отправки'}
                    </div>
                    <div>{testResult.message}</div>
                    {testResult.leadId && (
                      <div className="text-[11px] opacity-80">
                        ID созданного лида в CRM: <strong>{testResult.leadId}</strong>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-neutral-100 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500 font-mono shrink-0">
          <div>
            Битрикс24 REST API • CRM.LEAD.ADD • Портал: b24-i3rtui.bitrix24.ru
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-900 text-xs font-mono uppercase transition-colors cursor-pointer"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
