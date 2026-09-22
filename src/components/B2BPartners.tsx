import React from 'react';
import { 
  ArrowUpRight,
  Check,
  Truck,
  ShieldCheck,
  FileText
} from 'lucide-react';

interface B2BProps {
  onOpenCalculator: () => void;
  onOpenMeasurerModal: () => void;
}

export const B2BPartners: React.FC<B2BProps> = ({ onOpenCalculator, onOpenMeasurerModal }) => {
  const audiences = [
    {
      title: 'Девелоперы и генподрядчики',
      desc: 'Комплексное благоустройство закрытых дворовых территорий ЖК комфорт- и бизнес-класса. Сдача Госкомиссии, КС-2 / КС-3, гарантия 5 лет.',
      tags: ['ПИК Стандарт', 'ЛСР', 'Setl Group', 'Крупноузловая сборка'],
    },
    {
      title: 'Архитектурные и ландшафтные бюро',
      desc: '3D/BIM-моделирование авторских малых архитектурных форм. Воплощение концепций из нержавеющей стали, оцинкованной стали и термодерева.',
      tags: ['BIM Revit', 'SolidWorks', 'Образцы выкраски', 'Авторский надзор'],
    },
    {
      title: 'Госзаказчики (44-ФЗ и 223-ФЗ)',
      desc: 'Поставки по государственным и муниципальным контрактам. Наличие спецсчетов, казначейское сопровождение, строгое соблюдение ГОСТ и ТУ.',
      tags: ['Тендеры 44-ФЗ', '223-ФЗ', 'Сертификат ГОСТ Р', 'Реестр МИНПРОМТОРГ'],
    },
    {
      title: 'Промышленность и судостроение',
      desc: 'Несущие строительные каркасы, подкрановые эстакады, станины оборудования, трапы и палубное насыщение для верфей Балтики.',
      tags: ['СП 16.13330', 'Сварка НАКС', 'УЗК контроль', 'Морская сталь'],
    },
  ];

  return (
    <section id="b2b" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-neutral-200">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-2">
              [ 05 / Индустриальные стандарты ]
            </div>
            <h2 className="text-3xl sm:text-5xl font-light text-neutral-900 tracking-tight">
              B2B & B2G Партнерство
            </h2>
          </div>
          <p className="text-sm text-neutral-500 max-w-md font-normal leading-relaxed">
            Завод «Стальное Дело» работает по безналичному расчету с НДС 22%, обеспечивает сопровождение по 44-ФЗ / 223-ФЗ и предоставляет исполнительную документацию.
          </p>
        </div>

        {/* 4 Audience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200 mt-10 border border-neutral-200">
          {audiences.map((aud, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-8 flex flex-col justify-between hover:bg-neutral-50/50 transition-colors"
            >
              <div>
                <h3 className="text-lg font-normal text-neutral-900 mb-2 tracking-tight">
                  {aud.title}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed mb-6 font-normal">
                  {aud.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-neutral-200 font-mono text-[10px]">
                {aud.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="border border-neutral-200 bg-neutral-50 text-neutral-600 px-2.5 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* LOGISTICS & DELIVERY CALCULATOR BANNER */}
        <div className="border border-neutral-200 bg-white p-8 sm:p-12 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left info */}
            <div className="lg:col-span-6 space-y-6">
              <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400">
                [ Логистика и отгрузка ]
              </div>
              <h3 className="text-2xl sm:text-4xl font-light text-neutral-900 tracking-tight">
                Доставка по СПб, Ленобласти и всей России
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-light">
                Отгрузка с производственной площадки в Колпино (ул. Финляндская, 3). Прямая доставка на объект с паспортом изделия и инструкциями по монтажу.
              </p>

              <div className="space-y-2 pt-2 text-xs text-neutral-600 font-light">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-neutral-900 shrink-0" />
                  <span>Упаковка в пузырьковую пленку и усиленные деревянные паллеты</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-neutral-900 shrink-0" />
                  <span>Страхование перевозимых металлоконструкций на 100% стоимости</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-neutral-900 shrink-0" />
                  <span>Комплект чертежей КМД и паспорт изделия для быстрого монтажа подрядчиком</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenMeasurerModal}
                  className="px-6 py-3 border border-neutral-300 text-neutral-900 text-xs font-mono uppercase tracking-wider hover:border-black hover:bg-black hover:text-white transition-colors cursor-pointer"
                >
                  Вызвать конструктора на объект
                </button>
              </div>
            </div>

            {/* Right: Logistics conditions & Fleet overview */}
            <div className="lg:col-span-6 border border-neutral-200 p-6 sm:p-8 bg-neutral-50 space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                  Условия и автопарк завода
                </div>
                <Truck className="w-4 h-4 text-neutral-700" />
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 bg-white border border-neutral-200">
                  <div className="text-neutral-900 font-medium">Собственные манипуляторы (до 5 т)</div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">Механизированная разгрузка стрелой непосредственно в зону монтажа</div>
                </div>
                <div className="p-3 bg-white border border-neutral-200">
                  <div className="text-neutral-900 font-medium">Длинномерные шаланды 13.6 м (до 20 т)</div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">Для крупногабаритных конструкций, 6-метровых пергол и объемных партий МАФ</div>
                </div>
                <div className="p-3 bg-white border border-neutral-200">
                  <div className="text-neutral-900 font-medium">Транспортные компании по РФ со страхованием</div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">Деловые Линии, ПЭК, Возовоз — жесткая обрешетка и пломбировка груза</div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenCalculator}
                  className="w-full py-3 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Рассчитать стоимость металлоизделий</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
