import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  Building2,
  FileText,
  RefreshCw,
  Database
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { ConsentCheckbox } from './ConsentCheckbox';
import { sendLeadToBitrix24 } from '../services/bitrixService';

interface FooterProps {
  onOpenCalculator: () => void;
  onOpenMeasurer: () => void;
  onNavigateToCatalog?: (category?: string) => void;
  onNavigateToProduction?: (unitId?: string) => void;
  onNavigateToLaser?: () => void;
  onNavigateToFAQ?: () => void;
  onNavigateToB2B?: () => void;
  onNavigateToContacts?: () => void;
  onNavigateHome?: () => void;
  onNavigateToPrivacy?: () => void;
  onNavigateToOffer?: () => void;
  onNavigateToRequisites?: () => void;
  onOpenPrivacyModal?: () => void;
  onOpenOfferModal?: () => void;
  onOpenBitrixGuide?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onOpenCalculator, 
  onOpenMeasurer,
  onNavigateToCatalog,
  onNavigateToProduction,
  onNavigateToLaser,
  onNavigateToFAQ,
  onNavigateToB2B,
  onNavigateToContacts,
  onNavigateHome,
  onNavigateToPrivacy,
  onNavigateToOffer,
  onNavigateToRequisites,
  onOpenPrivacyModal,
  onOpenOfferModal,
  onOpenBitrixGuide,
}) => {
  const [excursionPhone, setExcursionPhone] = useState('');
  const [consentChecked, setConsentChecked] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [excursionDone, setExcursionDone] = useState(false);
  const [createdLeadId, setCreatedLeadId] = useState<string | number | null>(null);

  const handleExcursionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!excursionPhone || !consentChecked) return;
    setIsSubmitting(true);

    try {
      const result = await sendLeadToBitrix24({
        sourceType: 'plant_excursion',
        title: `[Экскурсия / Футер] Быстрая запись на аудит цехов`,
        name: 'Посетитель с сайта',
        phone: excursionPhone,
        department: 'Служба безопасности завода и дирекция по производству',
        pageSource: 'Подвал сайта (Футер) / Экскурсия на завод',
        details: {
          'Источник': 'Быстрая форма в футере сайта',
          'Цель': 'Демонстрация лазерных комплексов 22 кВт (4м и 6м), листогиба 250т, лаборатории ОТК',
          'Локация': 'СПб, Колпино, Ижорский завод'
        }
      });

      if (result.leadId) {
        setCreatedLeadId(result.leadId);
      }
    } catch (err) {
      console.warn('Bitrix footer lead dispatch:', err);
    } finally {
      setIsSubmitting(false);
      setExcursionDone(true);
    }
  };

  return (
    <footer id="contacts" className="bg-black text-white pt-20 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Plant Visit Section (Аудит производства в Колпино) */}
        <div className="border border-neutral-800 p-8 sm:p-12 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-3">
                [ Экскурсия на завод ]
              </div>
              <h3 className="text-2xl sm:text-4xl font-light text-white tracking-tight mb-4">
                Посетите производственную площадку в Колпино
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed font-light max-w-xl mb-4">
                Демонстрация работы лазерных комплексов 22 кВт (столы 4м и 6м), ЧПУ листогибочного пресса 250т, линии автоматизированной порошковой окраски и лаборатории ОТК.
              </p>
              <div className="text-xs font-mono text-neutral-400">
                196650, г. Санкт-Петербург, г. Колпино, Территория Ижорский з-д, литер ВШ
              </div>
            </div>

            <div className="lg:col-span-5">
              {excursionDone ? (
                <div className="border border-neutral-700 p-8 text-center bg-neutral-900/80">
                  <CheckCircle2 className="w-8 h-8 text-[#55AA53] mx-auto mb-3" />
                  <div className="text-base font-medium text-white mb-1">Заявка на пропуск принята</div>
                  <div className="text-xs text-neutral-400 mb-4">Дежурный инженер свяжется по номеру {excursionPhone} для согласования времени визита.</div>
                  
                  {createdLeadId && (
                    <div className="border border-neutral-800 bg-black/60 p-3 max-w-xs mx-auto text-xs font-mono text-neutral-300 flex items-center justify-between">
                      <span className="text-neutral-500">Bitrix24 CRM:</span>
                      <span className="font-bold text-white bg-neutral-800 px-2 py-0.5 border border-neutral-700">
                        Лид #{createdLeadId}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <form onSubmit={handleExcursionSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      Номер телефона для оформления пропуска
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+7 (___) ___-__-__"
                      value={excursionPhone}
                      onChange={(e) => setExcursionPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-white transition-colors font-mono"
                    />
                  </div>

                  <ConsentCheckbox
                    id="footer-excursion-consent"
                    checked={consentChecked}
                    onChange={setConsentChecked}
                    theme="dark"
                    onOpenPrivacy={onNavigateToPrivacy}
                    onOpenOffer={onNavigateToOffer}
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting || !consentChecked}
                    className="w-full py-3.5 px-6 bg-white text-black font-mono text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-black" />
                        <span>Регистрация в CRM...</span>
                      </>
                    ) : (
                      <>
                        <span>Записаться на аудит производства</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 4 Columns Footer Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-neutral-800 text-xs text-neutral-400">
          {/* Col 1: About & Logo */}
          <div className="space-y-4">
            <div>
              <button 
                data-no-hover="true"
                onClick={onNavigateHome}
                className="text-left cursor-pointer hover:opacity-80 transition-opacity"
                title="На главную"
              >
                <BrandLogo className="h-9 w-auto mb-3" textColor="#FFFFFF" />
              </button>
              <div className="text-[11px] font-mono text-neutral-400 tracking-wider uppercase">
                sdmaf.ru • Завод металлоконструкций и МАФ
              </div>
            </div>
            <p className="leading-relaxed font-light text-neutral-400">
              Производство малых архитектурных форм, изделий из нержавеющей стали и высокоточная металлообработка в Санкт-Петербурге с 2016 года.
            </p>
            <div className="text-[11px] font-mono text-neutral-500 leading-normal border-t border-neutral-800 pt-3">
              ООО «Кадет СПб»<br />
              ИНН 7805305625 / КПП 780501001<br />
              ОГРН 1157847040482
            </div>
          </div>

          {/* Col 2: Production & Services */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white">
              Производство
            </h4>
            <ul className="space-y-2.5 font-light">
              <li>
                <button
                  data-no-hover="true"
                  onClick={() => onNavigateToLaser ? onNavigateToLaser() : onNavigateToProduction ? onNavigateToProduction('laser-22kw-6m') : null}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Лазерный раскрой Knoppo KF 3 кВт
                </button>
              </li>
              <li>
                <button
                  data-no-hover="true"
                  onClick={() => onNavigateToProduction ? onNavigateToProduction('bending-250t') : null}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Гибка металла (HACO & MAIHONG 160т)
                </button>
              </li>
              <li>
                <button
                  data-no-hover="true"
                  onClick={() => onNavigateToProduction ? onNavigateToProduction('coating-ral') : null}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Порошковая окраска (камеры 3м и 6м)
                </button>
              </li>
              <li>
                <button
                  data-no-hover="true"
                  onClick={() => onNavigateToProduction ? onNavigateToProduction('rolling-faccin') : null}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Вальцовка Keepler RME 1500×4 мм
                </button>
              </li>
              <li>
                <button 
                  data-no-hover="true"
                  onClick={() => onNavigateToCatalog ? onNavigateToCatalog('slides') : null}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Детские горки, скаты и тоннели AISI 304
                </button>
              </li>
              <li>
                <button 
                  data-no-hover="true"
                  onClick={() => onNavigateToCatalog ? onNavigateToCatalog('furniture') : null}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Парковая и уличная мебель
                </button>
              </li>
              <li>
                <button 
                  data-no-hover="true"
                  onClick={() => onNavigateToCatalog ? onNavigateToCatalog('stainless') : null}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Изделия из нержавеющей стали
                </button>
              </li>
              <li>
                <button 
                  data-no-hover="true"
                  onClick={() => onNavigateToCatalog ? onNavigateToCatalog('vats') : null}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Банные чаны и уличные купели
                </button>
              </li>
              <li>
                <button 
                  data-no-hover="true"
                  onClick={() => onNavigateToCatalog ? onNavigateToCatalog('bike') : null}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Велосипедные парковки и велобоксы
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: For Customers & Legal */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white">
              Заказчикам и документы
            </h4>
            <ul className="space-y-2.5 font-light">
              <li>
                <button data-no-hover="true" onClick={onOpenCalculator} className="hover:text-white text-left transition-colors cursor-pointer">
                  Калькулятор сметы
                </button>
              </li>
              <li>
                <button data-no-hover="true" onClick={onOpenMeasurer} className="hover:text-white text-left transition-colors cursor-pointer">
                  Вызов конструктора на объект
                </button>
              </li>
              <li>
                <button 
                  data-no-hover="true" 
                  onClick={() => onNavigateToFAQ ? onNavigateToFAQ() : null} 
                  className="hover:text-white text-left transition-colors cursor-pointer"
                >
                  Частые вопросы (FAQ)
                </button>
              </li>
              <li>
                <button 
                  data-no-hover="true" 
                  onClick={() => onNavigateToB2B ? onNavigateToB2B() : null} 
                  className="hover:text-white text-left transition-colors cursor-pointer"
                >
                  B2B и тендерные поставки (44-ФЗ)
                </button>
              </li>
              <li>
                <button 
                  data-no-hover="true" 
                  onClick={() => onNavigateToContacts ? onNavigateToContacts() : null} 
                  className="hover:text-white text-left transition-colors cursor-pointer"
                >
                  Контакты служб завода
                </button>
              </li>
              <li className="pt-2 border-t border-neutral-800">
                <button
                  data-no-hover="true"
                  onClick={() => onNavigateToRequisites ? onNavigateToRequisites() : null}
                  className="hover:text-white text-left transition-colors cursor-pointer flex items-center gap-1.5 text-neutral-300 font-normal"
                >
                  <Building2 className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Реквизиты ООО «Кадет СПб»</span>
                </button>
              </li>
              <li>
                <button
                  data-no-hover="true"
                  onClick={() => onNavigateToPrivacy ? onNavigateToPrivacy() : null}
                  className="hover:text-white text-left transition-colors cursor-pointer flex items-center gap-1.5 text-neutral-300 font-normal"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Политика конфиденциальности (152-ФЗ)</span>
                </button>
              </li>
              <li>
                <button
                  data-no-hover="true"
                  onClick={() => onNavigateToOffer ? onNavigateToOffer() : null}
                  className="hover:text-white text-left transition-colors cursor-pointer flex items-center gap-1.5 text-neutral-300 font-normal"
                >
                  <FileText className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Публичная оферта (ст. 437 ГК РФ)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contacts & Factory Location */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white">
              Контакты
            </h4>
            <div className="space-y-3 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                <span>196650, г. Санкт-Петербург, г. Колпино, Территория Ижорский з-д, литер ВШ</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-neutral-400 shrink-0" />
                  <a href="tel:+78126428890" className="text-white hover:underline font-mono text-sm">
                    СПб: +7 (812) 642-88-90
                  </a>
                </div>
                <div className="flex items-center gap-2.5 pl-6.5">
                  <a href="tel:+74951066224" className="text-white hover:underline font-mono text-sm">
                    Мск: +7 (495) 106-62-24
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
                <a href="mailto:info@sdmaf.ru" className="text-white hover:underline font-mono">
                  info@sdmaf.ru
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-neutral-400 shrink-0" />
                <span className="font-mono text-[11px]">Пн–Пт 08:00 – 17:00 (Доставка по всей России)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Legal Disclaimers */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
          <div className="space-y-1">
            <div>
              © 2016–2026 Производственная компания ООО «Кадет СПб» (СПб, ИНН 7805305625). Все права защищены.
            </div>
            <div className="text-[11px] text-neutral-400">
              Сайт sdmaf.ru носит информационный характер и не является публичной офертой (ст. 437 ГК РФ).
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            {onNavigateToPrivacy && (
              <button
                onClick={onNavigateToPrivacy}
                className="text-neutral-400 hover:text-white underline cursor-pointer"
              >
                152-ФЗ Персональные данные
              </button>
            )}
            <span>•</span>
            {onNavigateToOffer && (
              <button
                onClick={onNavigateToOffer}
                className="text-neutral-400 hover:text-white underline cursor-pointer"
              >
                Условия оферты
              </button>
            )}
            <span>•</span>
            {onNavigateToRequisites && (
              <button
                onClick={onNavigateToRequisites}
                className="text-neutral-400 hover:text-white underline cursor-pointer"
              >
                Реквизиты
              </button>
            )}
            {onOpenBitrixGuide && (
              <>
                <span>•</span>
                <button
                  onClick={onOpenBitrixGuide}
                  className="text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer"
                  title="Инструкция по настройке вебхука Bitrix24"
                >
                  <Database className="w-3 h-3 text-neutral-400" />
                  <span>Интеграция CRM Битрикс24</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
