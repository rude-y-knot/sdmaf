import React from 'react';
import { 
  Check, 
  Cpu, 
  Layers, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Calculator,
  SlidersHorizontal,
  TableProperties,
  ArrowRight,
  Maximize2,
  Scale,
  RotateCw,
  Gauge,
  Boxes
} from 'lucide-react';

interface RollingWorkshopGalleryProps {
  onOpenCalculator?: (service?: string) => void;
  className?: string;
}

export const RollingWorkshopGallery: React.FC<RollingWorkshopGalleryProps> = ({
  onOpenCalculator,
  className = ''
}) => {
  const techFeatures = [
    {
      title: '4-х валковая кинематическая схема',
      country: 'Keepler-Stan RME Series',
      desc: 'Постоянный жесткий зажим листовой заготовки между центральными приводными валами (верхним и нижним). Исключает малейшее проскальзывание, перекос листа и смещение диагоналей при прокатке.',
    },
    {
      title: 'Двухсторонний предварительный подгиб за 1 проход',
      country: 'Подгиб обеих кромок без переворота',
      desc: 'В отличие от 3-х валковых станков, подгибка начального и конечного края листа выполняется за один установ без необходимости переворачивать или перебазировать заготовку, сводя остаточный прямой участок к технологическому минимуму (1.5–2 толщины листа).',
    },
    {
      title: 'Прецизионные закаленные валы из легированной стали 42CrMo',
      country: 'Твердость 50–55 HRC / Зеркальная шлифовка',
      desc: 'Центральные валы Ø130 мм и боковые валы Ø105 мм изготовлены из кованой термообработанной стали. Позволяют вальцевать зеркальную и шлифованную нержавеющую сталь AISI 304/316 без риска задиров и царапин.',
    },
    {
      title: 'Встроенное приспособление для гибки конусов',
      country: 'Конические обечайки и диффузоры',
      desc: 'Специальный конусный упор и наклон боковых валов позволяют производить конические обечайки, переходники вентиляции, загрузочные бункеры и циклоны с идеальным сведением кромок.',
    },
    {
      title: 'Откидная опора верхнего вала (Drop End)',
      country: 'Быстросъемный торцевой замок',
      desc: 'Откидная конструкция торцевой опоры верхнего вала обеспечивает быстрый и безопасный съем замкнутых цилиндрических обечаек, емкостей и труб после завершения прокатки.',
    },
    {
      title: 'Электромеханический привод и выносной пульт с педалью',
      country: 'Мотор-редуктор 2.2 кВт (380В) / Реверс',
      desc: 'Плавный пуск и мгновенное реверсивное торможение. Мобильная педаль управления с кнопкой аварийной остановки обеспечивает безопасность оператора и точность доводки стыка под сварку.',
    },
  ];

  const fullSpecs = [
    { param: 'Модель станка', val: 'Keepler-Stan RME 1500×4 mm', note: 'Электромеханические 4-х валковые вальцы' },
    { param: 'Тип кинематики', val: '4-х валковая симметричная', note: '2 приводных центральных + 2 гибочных боковых' },
    { param: 'Полезная рабочая длина (длина валков)', val: '1 500 мм', note: 'Ширина листа до 1500 мм' },
    { param: 'Толщина нержавеющей стали (AISI 304/316/430/439)', val: 'до 3.0 – 3.5 мм', note: 'В защитной пленке с сохранением зеркальной или шлифованной поверхности' },
    { param: 'Толщина оцинкованного проката', val: 'до 4.0 мм', note: 'При прокатке с двухсторонней подгибкой кромок без повреждения цинка' },
    { param: 'Диаметр центральных валов (верхний / нижний)', val: 'Ø 130 мм / Ø 130 мм', note: 'Кованая термообработанная сталь 42CrMo' },
    { param: 'Диаметр боковых гибочных валов', val: 'Ø 105 мм / Ø 105 мм', note: 'Шлифованная легированная сталь' },
    { param: 'Минимальный диаметр готовой обечайки', val: 'от Ø 140 – 180 мм', note: 'Зависит от толщины, ширины и предела текучести' },
    { param: 'Максимальный диаметр обечайки', val: 'Не ограничен', note: 'Формовка радиусных сегментов любого диаметра' },
    { param: 'Скорость вальцовки (вращения валков)', val: '4.5 м/мин', note: 'Оптимальный темп для точного позиционирования' },
    { param: 'Мощность главного электродвигателя', val: '2.2 кВт (3.0 л.с.)', note: 'Трехфазный 380 В / 50 Гц с мотор-редуктором' },
    { param: 'Откидной верхний вал', val: 'Поворотный торцевой замок', note: 'Легкое извлечение замкнутых обечаек' },
    { param: 'Приспособление для гибки конусов', val: 'Штатный конусный упор', note: 'Для конических обечаек, переходов и воронок' },
    { param: 'Управление и безопасность', val: 'Выносная двухпедальная станция с аварийным грибком СТОП', note: 'Реверсивное вращение валов' },
    { param: 'Габаритные размеры станка (Д × Ш × В)', val: '2 850 × 850 × 1 150 мм', note: 'Массивная цельносварная виброустойчивая станина' },
    { param: 'Масса станка', val: '1 650 кг', note: 'Высокая жесткость конструкции под нагрузкой' },
  ];

  return (
    <div className={`space-y-16 ${className}`}>
      {/* BLOCK 1: Технологические преимущества 4-х валковой схемы Keepler RME */}
      <section className="border border-neutral-200 bg-white p-6 sm:p-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-200 mb-10">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-2">
              [ 01 / ТЕХНОЛОГИИ ВАЛЬЦОВОЧНОГО ЦЕХА ]
            </div>
            <h2 className="text-2xl sm:text-3xl font-light text-neutral-900 tracking-tight">
              Преимущества 4-х валкового станка Keepler RME 1500×4 мм
            </h2>
          </div>
          <div className="flex items-center gap-2 bg-neutral-100 px-3 py-1.5 font-mono text-xs text-neutral-800">
            <RotateCw className="w-4 h-4 text-neutral-900" />
            <span>KEEPLER-STAN RME-1500x4 (РОССИЯ)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techFeatures.map((item, idx) => (
            <div 
              key={idx} 
              className="p-5 border border-neutral-200 bg-[#FAFAFA] hover:border-black transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-[10px] text-neutral-400 uppercase">
                    0{idx + 1} // {item.country}
                  </span>
                  <Check className="w-4 h-4 text-neutral-900 shrink-0" />
                </div>
                <h3 className="font-semibold text-neutral-900 text-sm mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Сравнение 4-х валковой схемы Keepler со старыми 3-х валковыми станками */}
        <div className="mt-8 border border-neutral-200 bg-neutral-50 p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4 text-neutral-900" />
            <span className="font-mono text-xs uppercase font-medium text-neutral-900">
              Почему 4 вала лучше традиционных 3-х валковых систем:
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-neutral-700">
            <div className="bg-white p-3 border border-neutral-200">
              <strong className="block text-neutral-900 mb-1">Без переворота листа</strong>
              Подгиб передней и задней кромки происходит непрерывно за один рабочий цикл без вынимания листа из валов.
            </div>
            <div className="bg-white p-3 border border-neutral-200">
              <strong className="block text-neutral-900 mb-1">Минимальный плоский край</strong>
              Прямой технологический участок на стыке сводится к 1.5–2 толщинам листа, что исключает доработку прессом или кувалдой.
            </div>
            <div className="bg-white p-3 border border-neutral-200">
              <strong className="block text-neutral-900 mb-1">Идеальная соосность кромок</strong>
              Кромки сходятся без смещения по оси, обеспечивая идеальный зазор под сварку на продольном лазере или полуавтомате.
            </div>
          </div>
        </div>
      </section>

      {/* BLOCK 2: Официальный паспорт станка Keepler RME 1500x4 mm */}
      <section className="border border-neutral-200 bg-white p-6 sm:p-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-200 mb-8">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-2">
              [ 02 / ПАСПОРТ ОБОРУДОВАНИЯ И ТАБЛИЦА ХАРАКТЕРИСТИК ]
            </div>
            <h2 className="text-2xl sm:text-3xl font-light text-neutral-900 tracking-tight">
              Технические характеристики Keepler RME 1500×4 мм
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-md font-light">
            Официальные паспортные данные завода Keepler-Stan для технологов, конструкторов и инженеров-проектировщиков.
          </p>
        </div>

        {/* Сводная таблица параметров */}
        <div className="border border-neutral-200 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-neutral-900 text-white font-mono uppercase tracking-wider text-[11px]">
                <th className="p-3.5 border-r border-neutral-700 w-1/3">Параметр / Характеристика</th>
                <th className="p-3.5 border-r border-neutral-700 w-1/3">Значение станка Keepler RME 1500×4</th>
                <th className="p-3.5 w-1/3">Технологическое примечание</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 font-mono">
              {fullSpecs.map((row, idx) => (
                <tr 
                  key={idx}
                  className={idx % 2 === 0 ? 'bg-white hover:bg-neutral-50' : 'bg-[#FAFAFA] hover:bg-neutral-100'}
                >
                  <td className="p-3.5 border-r border-neutral-200 text-neutral-700 font-sans font-medium">
                    {row.param}
                  </td>
                  <td className="p-3.5 border-r border-neutral-200 text-neutral-900 font-semibold">
                    {row.val}
                  </td>
                  <td className="p-3.5 text-neutral-500 font-sans text-[11px]">
                    {row.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA Bar */}
        <div className="mt-8 bg-neutral-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
              РАСЧЕТ СТОИМОСТИ ВАЛЬЦОВКИ
            </div>
            <div className="text-base sm:text-lg font-light">
              Требуется вальцовка обечаек, тоннелей, конусов или труб по вашим чертежам?
            </div>
          </div>
          {onOpenCalculator && (
            <button
              onClick={() => onOpenCalculator('вальцовка обечаек Keepler RME')}
              className="bg-white text-black px-6 py-3 font-mono text-xs uppercase tracking-wider font-semibold hover:bg-neutral-200 transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              <span>Рассчитать вальцовку</span>
            </button>
          )}
        </div>
      </section>
    </div>
  );
};
