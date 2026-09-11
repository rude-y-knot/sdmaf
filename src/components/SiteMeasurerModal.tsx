import React, { useState, useMemo } from 'react';
import { 
  X, 
  ArrowUpRight, 
  Check,
  AlertCircle,
  RefreshCw,
  Database
} from 'lucide-react';
import { ConsentCheckbox } from './ConsentCheckbox';
import { sendLeadToBitrix24 } from '../services/bitrixService';

interface SiteMeasurerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPrivacy?: () => void;
  onOpenOffer?: () => void;
}

export const SiteMeasurerModal: React.FC<SiteMeasurerModalProps> = ({ 
  isOpen, 
  onClose,
  onOpenPrivacy,
  onOpenOffer,
}) => {
  // Earliest allowable date is 2 days from order date
  const minDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, []);

  const [district, setDistrict] = useState('Приморский');
  const [objectType, setObjectType] = useState('ЖК / Дворовая территория');
  const [date, setDate] = useState(minDate);
  const [dateError, setDateError] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [address, setAddress] = useState('');
  const [needLaserScanner, setNeedLaserScanner] = useState(true);
  const [consentChecked, setConsentChecked] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdLeadId, setCreatedLeadId] = useState<string | number | null>(null);

  if (!isOpen) return null;

  const formatRussianDate = (dateStr: string) => {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    return `${d}.${m}.${y}`;
  };

  const handleDateChange = (newDate: string) => {
    setDate(newDate);
    if (!newDate) {
      setDateError('Укажите дату выезда');
    } else if (newDate < minDate) {
      setDateError(`Выезд возможен не ранее ${formatRussianDate(minDate)} (через 2 дня от заказа)`);
    } else {
      setDateError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !consentChecked) return;

    if (!date) {
      setDateError('Укажите дату выезда');
      return;
    }
    if (date < minDate) {
      setDateError(`Выезд возможен не ранее ${formatRussianDate(minDate)} (через 2 дня от заказа)`);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await sendLeadToBitrix24({
        sourceType: 'site_measurer',
        title: `[Выезд замерщика] ${district} район (${objectType})`,
        name: name || 'Заказчик выезда',
        phone: phone,
        company: company,
        department: 'Служба выездного инжиниринга и шеф-монтажа',
        pageSource: 'Модальное окно: Вызов инженера-замерщика с 3D-сканером на объект',
        details: {
          'Район / Локация': district,
          'Точный адрес': address || 'Уточнить при созвоне',
          'Тип площадки / объекта': objectType,
          'Согласованная дата': formatRussianDate(date),
          'Использование 3D-сканера Faro/Leica': needLaserScanner ? 'Да, требуется облако точек' : 'Стандартные оптические/лазерные замеры',
          'Заказчик / Должность': name,
          'Организация': company,
        }
      });

      if (result.leadId) {
        setCreatedLeadId(result.leadId);
      }
    } catch (err) {
      console.warn('Bitrix lead error:', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white border border-neutral-200 p-6 sm:p-10 my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-black transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-6">
            <div className="w-10 h-10 border border-neutral-300 flex items-center justify-center mx-auto mb-4">
              <Check className="w-5 h-5 text-neutral-900" />
            </div>
            <h3 className="text-xl font-light text-neutral-900 mb-2">
              Выезд инженера согласован
            </h3>
            <p className="text-xs text-neutral-500 mb-4 font-light leading-relaxed">
              Конструктор выезжает с измерительным оборудованием и образцами выкрасок порошкового муара в {district} район. Дата выезда: <span className="font-mono text-neutral-900 font-medium">{formatRussianDate(date)}</span>. Мы перезвоним на номер {phone} для подтверждения точного времени.
            </p>

            {createdLeadId && (
              <div className="border border-neutral-200 bg-neutral-50 p-3 mb-6 text-xs font-mono flex items-center justify-between">
                <span className="text-neutral-500">Зафиксировано в Bitrix24:</span>
                <span className="font-bold text-neutral-900 bg-white px-2 py-0.5 border border-neutral-300">
                  Лид #{createdLeadId}
                </span>
              </div>
            )}

            <button
              onClick={onClose}
              className="w-full py-3 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-2">
              [ Сервис инжиниринга ]
            </div>

            <h3 className="text-2xl font-light text-neutral-900 mb-2 tracking-tight">
              Вызов конструктора на объект
            </h3>
            <p className="text-xs text-neutral-500 mb-6 font-light leading-relaxed">
              Выезд инженера завода по Санкт-Петербургу и Ленинградской области с образцами покрытий RAL и каталогом узлов крепления.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block mb-1.5">
                    Район СПб или ЛО
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 text-xs font-normal text-neutral-900 focus:outline-none focus:border-black transition-colors"
                  >
                    <option value="Приморский">Приморский район СПб</option>
                    <option value="Московский">Московский район СПб</option>
                    <option value="Колпино">г. Колпино (Заводская зона)</option>
                    <option value="Василеостровский">Василеостровский район (В.О.)</option>
                    <option value="Выборгский">Выборгский район СПб</option>
                    <option value="Центральный">Центральный / Петроградский</option>
                    <option value="Кудрово / Мурино">Кудрово / Мурино / Всеволожск</option>
                    <option value="Ленинградская область">Ленинградская область (до 100 км)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block mb-1.5">
                    Тип объекта
                  </label>
                  <select
                    value={objectType}
                    onChange={(e) => setObjectType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 text-xs font-normal text-neutral-900 focus:outline-none focus:border-black transition-colors"
                  >
                    <option value="ЖК / Дворовая территория">ЖК / Дворовая территория</option>
                    <option value="Городской парк или сквер">Городской парк или сквер</option>
                    <option value="Набережная / Общественное пространство">Набережная / Общественное пространство</option>
                    <option value="Торговый / Бизнес-центр">Торговый / Бизнес-центр</option>
                    <option value="Промышленное предприятие">Промышленное предприятие / Склад</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block mb-1.5">
                  Адрес площадки (улица, номер дома/участка)
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="СПб, пр. Комендантский, д. 62 (строящийся ЖК)"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-black transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 flex items-center justify-between mb-1.5">
                    <span>Желаемая дата *</span>
                    <span className="text-[10px] text-neutral-400 lowercase font-sans">не ранее 2 дней</span>
                  </label>
                  <input
                    type="date"
                    required
                    min={minDate}
                    value={date}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className={`w-full px-3.5 py-2.5 bg-neutral-50 border text-xs text-neutral-900 focus:outline-none transition-colors font-mono ${
                      dateError ? 'border-red-500 focus:border-red-600 bg-red-50/20' : 'border-neutral-200 focus:border-black'
                    }`}
                  />
                  {dateError ? (
                    <div className="flex items-center gap-1 text-[10px] text-red-600 mt-1 font-mono leading-tight">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{dateError}</span>
                    </div>
                  ) : (
                    <p className="text-[10px] text-neutral-400 mt-1 font-mono">
                      Ближайшая дата: с {formatRussianDate(minDate)}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block mb-1.5">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Инженер / Архитектор"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block mb-1.5">
                    Контактный телефон *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 (___) ___-__-__"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-black transition-colors font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block mb-1.5">
                    Компания / Застройщик
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="ООO ЛСР / Setl / Генподрядчик"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>

              <ConsentCheckbox
                id="measurer-modal-consent"
                checked={consentChecked}
                onChange={setConsentChecked}
                theme="light"
                onOpenPrivacy={onOpenPrivacy}
                onOpenOffer={onOpenOffer}
              />

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !consentChecked}
                  className="w-full py-3 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Согласование выезда...</span>
                    </>
                  ) : (
                    <>
                      <span>Заказать выезд конструктора</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
