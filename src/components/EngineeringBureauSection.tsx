import React, { useState } from 'react';
import { 
  Compass, 
  FileText, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  Sparkles, 
  Calculator, 
  Wrench,
  FileCheck,
  Award,
  ChevronRight,
  Maximize2
} from 'lucide-react';

interface EngineeringBureauSectionProps {
  onOpenCalculator?: (initialService?: string) => void;
  onOpenMeasurerModal?: () => void;
  onNavigateToBureau?: () => void;
}

export const EngineeringBureauSection: React.FC<EngineeringBureauSectionProps> = ({
  onOpenCalculator,
  onOpenMeasurerModal,
  onNavigateToBureau,
}) => {
  const [activeCadTab, setActiveCadTab] = useState<'solid' | 'kompas' | 'inventor'>('solid');

  const cadSoftwares = [
    {
      id: 'solid' as const,
      name: 'SolidWorks 3D',
      badge: 'Параметрика & FEA',
      role: 'Твердотельное моделирование и прочностной анализ',
      description: 'Глубокая параметрическая проработка металлических конструкций любой геометрии. Расчет ветровых, снеговых и эксплуатационных нагрузок методом конечных элементов (FEA / Stress Analysis). Точный расчет коэффициентов деформации и К-фактора нейтрального слоя гибки листового металла под станки HACO и MAIHONG.',
      formats: ['.SLDPRT', '.SLDASM', '.STEP', '.IGES', '.DXF'],
      features: [
        'Симуляция нагрузок и расчет запаса прочности несущих балок',
        'Автоматическое построение разверток с учетом толщины металла и радиуса матрицы',
        'Исключение коллизий в узлах сопряжения до запуска резки в цехе',
      ],
    },
    {
      id: 'kompas' as const,
      name: 'КОМПАС-3D',
      badge: 'Стандарты РФ / ЕСКД',
      role: 'Выпуск чертежей КМ/КМД и спецификаций по ГОСТ',
      description: 'Базовый инструмент оформления проектной и рабочей конструкторской документации в строгом соответствии с требованиями Единой системы конструкторской документации (ЕСКД). Мгновенная генерация спецификаций, сборочных чертежей и ведомостей расхода металла по ГОСТ 2.102-2013 и ГОСТ 2.106-96.',
      formats: ['.CDW', '.FRW', '.A3D', '.M3D', '.DWG'],
      features: [
        '100% соответствие всем нормам ЕСКД и ГОСТ СПДС без ручных правок',
        'Автоматизированные таблицы соединений, швов и метизных карт',
        'Сквозная интеграция со складской базой металлопроката завода',
      ],
    },
    {
      id: 'inventor' as const,
      name: 'Autodesk Inventor',
      badge: 'Крупные сборки & BIM',
      role: 'Пространственные каркасы и адаптация под архитектурный BIM',
      description: 'Специализированная среда для проектирования масштабных архитектурных ансамблей, винтовых скатов, пергол и кинематических МАФ. Экспорт трехмерных моделей в стандарты информационного моделирования зданий (BIM / IFC / Revit RVT) для прямых поставок генподрядчикам и девелоперам.',
      formats: ['.IPT', '.IAM', '.IFC', '.RVT', '.SAT'],
      features: [
        'Генерация BIM-семейств МАФ для проектов благоустройства девелоперов',
        'Кинематический анализ шарниров, роликовых механизмов и качелей',
        'Быстрая конвертация сложной органической геометрии в технологичный металл',
      ],
    },
  ];

  const deliverables = [
    {
      icon: FileText,
      tag: 'КМ / КМД',
      title: 'Рабочие чертежи деталей и сборочные единицы',
      desc: 'Полный комплект чертежей конструкций металлических деталировочных (КМД). Спецификации элементов, развертки для лазера, карты гибки и сборочные схемы.',
      standard: 'ГОСТ 2.102-2013 / ГОСТ 21.502-2016',
    },
    {
      icon: FileCheck,
      tag: 'ТУ',
      title: 'Технические условия завода',
      desc: 'Разработка и регистрация официальных ТУ на серийные изделия и уникальные МАФ под бренд или проект заказчика. Подготовка паспортов изделий.',
      standard: 'ГОСТ 2.114-2016 / ГОСТ Р 52169',
    },
    {
      icon: Layers,
      tag: 'Техкарты',
      title: 'Маршрутные технологические карты',
      desc: 'Пооперационные карты с режимами лазерного раскроя (скорость, газ, фокус), последовательностью гибки на ЧПУ, типами сварочных швов НАКС и порошковой окраски.',
      standard: 'ГОСТ 3.1118-82 (ЕСТД)',
    },
    {
      icon: ShieldCheck,
      tag: 'Расчеты',
      title: 'Прочностной расчет и снижение металлоемкости',
      desc: 'Анализ ветровых, динамических и вибрационных нагрузок. Оптимизация толщин стенок без снижения несущей способности, экономия до 20% бюджета проекта.',
      standard: 'СП 16.13330.2017 (Стальные конструкции)',
    },
  ];

  const complexTasks = [
    {
      title: 'Винтовые и тоннельные скаты до 12 м',
      desc: 'Расчет пространственной спирали из нержавеющей стали AISI 304, траектории безопасного спуска по ГОСТ Р 52169-2012, сегментная вальцовка и лазерный раскрой сложного стыка.',
      badge: 'Безопасность ГОСТ',
    },
    {
      title: 'Бионические арт-объекты и кинетика',
      desc: 'Параметрическое моделирование сложных криволинейных форм, скрытый внутренний силовой каркас из 09Г2С, внешняя облицовка зеркальной сталью без видимых крепежей.',
      badge: 'Нестандартные формы',
    },
    {
      title: 'Купели и чаны сложной многогранности',
      desc: 'Раскрой конических и граненых чаш, расчет гидростатического давления воды, интеграция скрытых контуров водяного и дровяного нагрева, гидромассажа и подсветки.',
      badge: 'Гидростатика',
    },
    {
      title: 'Реверс-инжиниринг импортных МАФ',
      desc: 'Воссоздание полного комплекта чертежей по физическому образцу, фотографии или концептуальному рендеру европейских каталогов с адаптацией под российский прокат.',
      badge: 'Импортозамещение',
    },
  ];

  const activeCad = cadSoftwares.find((s) => s.id === activeCadTab) || cadSoftwares[0];

  return (
    <section id="engineering-bureau" className="border-t border-neutral-200 bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-neutral-200 mb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-2">
              <span>[ ИНЖИНИРИНГ И ПРОЕКТИРОВАНИЕ ]</span>
              <span>•</span>
              <span className="text-black font-semibold">ЕСКД / ГОСТ / BIM</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light text-neutral-900 tracking-tight leading-[1.1]">
              Конструкторское бюро завода
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed mt-4">
              Штатный инженерный отдел завода СД-МАФ выполняет полный цикл проектирования: от концептуального эскиза «от руки» до выпуска рабочих чертежей КМ/КМД, разработки ТУ (Технических Условий) и пооперационных технологических карт по стандартам ЕСКД.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            {onNavigateToBureau && (
              <button
                onClick={onNavigateToBureau}
                className="py-3 px-5 border border-black bg-neutral-900 text-white text-xs font-mono uppercase tracking-wider hover:bg-black transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Отдельная страница КБ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={() => onOpenCalculator && onOpenCalculator('engineering')}
              className="py-3 px-5 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Calculator className="w-4 h-4" />
              <span>Заказать расчет КД / ТУ</span>
            </button>
            <button
              onClick={onOpenMeasurerModal}
              className="py-3 px-5 border border-neutral-300 text-neutral-900 text-xs font-mono uppercase tracking-wider hover:border-black transition-colors flex items-center justify-center gap-2 cursor-pointer bg-white"
            >
              <Compass className="w-4 h-4" />
              <span>Вызов конструктора на замер</span>
            </button>
          </div>
        </div>

        {/* CAD Software Platform Tabs */}
        <div className="mb-14 border border-neutral-200 bg-neutral-50 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
                Программный стек разработки
              </div>
              <h3 className="text-lg sm:text-xl font-medium text-neutral-900">
                Проектирование в SolidWorks, КОМПАС-3D и Autodesk Inventor
              </h3>
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {cadSoftwares.map((cad) => (
                <button
                  key={cad.id}
                  onClick={() => setActiveCadTab(cad.id)}
                  className={`px-4 py-2 text-xs font-mono tracking-wider uppercase transition-colors cursor-pointer border ${
                    activeCadTab === cad.id
                      ? 'bg-black text-white border-black font-medium shadow-xs'
                      : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  {cad.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-base font-semibold text-neutral-900">{activeCad.role}</span>
                <span className="px-2.5 py-0.5 bg-neutral-200 text-neutral-800 text-[10px] font-mono">
                  {activeCad.badge}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                {activeCad.description}
              </p>

              <div className="pt-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 mb-2">
                  Ключевые возможности:
                </div>
                <ul className="space-y-2 text-xs text-neutral-800 font-light">
                  {activeCad.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#55AA53] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white border border-neutral-200 p-5 space-y-4">
              <div className="text-xs font-mono font-medium text-neutral-900 uppercase tracking-wider border-b border-neutral-100 pb-2 flex items-center justify-between">
                <span>Поддерживаемые форматы</span>
                <span className="text-[10px] text-neutral-400 font-normal">Прямой импорт в ЧПУ</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {activeCad.formats.map((fmt, fIdx) => (
                  <span
                    key={fIdx}
                    className="px-2.5 py-1 bg-neutral-100 font-mono text-xs text-neutral-800 border border-neutral-200 font-medium"
                  >
                    {fmt}
                  </span>
                ))}
              </div>

              <div className="border-t border-neutral-100 pt-3 text-[11px] text-neutral-500 leading-relaxed font-light">
                Вы можете отправить нам файлы в любом из этих форматов. Конструктор проверит технологичность резки и гибки за 15 минут.
              </div>

              <button
                onClick={() => onOpenCalculator && onOpenCalculator('cad-import')}
                className="w-full py-2.5 px-4 bg-neutral-900 text-white text-xs font-mono uppercase tracking-wider hover:bg-black transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Загрузить чертежи на проверку</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 4 Deliverables Cards (Чертежи, ТУ, Техкарты, Расчеты) */}
        <div className="mb-14">
          <div className="mb-6">
            <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
              Комплект конструкторской документации
            </div>
            <h3 className="text-xl sm:text-2xl font-light text-neutral-900">
              Что разрабатывает наше конструкторское бюро
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliverables.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="border border-neutral-200 p-6 bg-white flex flex-col justify-between hover:border-black transition-colors group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-9 h-9 border border-neutral-200 flex items-center justify-center text-neutral-800 bg-neutral-50 group-hover:bg-black group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-[10px] px-2 py-0.5 bg-neutral-100 text-neutral-600 font-medium">
                        {item.tag}
                      </span>
                    </div>

                    <h4 className="text-base font-medium text-neutral-900 mb-2 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs text-neutral-600 font-light leading-relaxed mb-4">
                      {item.desc}
                    </p>
                  </div>

                  <div className="border-t border-neutral-100 pt-3 text-[10px] font-mono text-neutral-400">
                    Стандарт: <span className="text-neutral-700">{item.standard}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Non-Trivial Engineering Tasks Grid */}
        <div className="border-t border-neutral-200 pt-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
                Инженерный опыт и сложные кейсы
              </div>
              <h3 className="text-xl sm:text-2xl font-light text-neutral-900">
                Готовы решать самые нетривиальные задачи
              </h3>
            </div>
            <p className="text-xs text-neutral-500 max-w-md font-light">
              Если изделия нет в стандартных каталогах или его форму отказываются производить другие подрядчики — конструкторы СД-МАФ разработают технологию и доведут до готового изделия в металле.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {complexTasks.map((task, tIdx) => (
              <div
                key={tIdx}
                className="border border-neutral-200 p-6 bg-neutral-50/50 hover:bg-white hover:border-neutral-400 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-white border border-neutral-200 text-neutral-700">
                      {task.badge}
                    </span>
                    <span className="font-mono text-xs text-neutral-300">КЕЙС 0{tIdx + 1}</span>
                  </div>
                  <h4 className="text-base font-medium text-neutral-900 mb-2">
                    {task.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                    {task.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-200/60 flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-500">Точность сборки: ±0.5 мм</span>
                  <button
                    onClick={onOpenMeasurerModal}
                    className="text-neutral-900 hover:text-black font-medium inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Обсудить задачу</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ESKD Compliance Banner */}
        <div className="mt-12 border border-neutral-300 bg-neutral-900 text-white p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                <ShieldCheck className="w-4 h-4 text-[#55AA53]" />
                <span>Гарантия юридической чистоты и прохождения экспертизы</span>
              </div>
              <h4 className="text-lg sm:text-xl font-light text-white tracking-tight">
                Вся документация оформляется строго по ГОСТ ЕСКД
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed max-w-2xl">
                Чертежи и ТУ без проблем проходят государственную и коммерческую экспертизу, согласования в КГА (Комитет по градостроительству и архитектуре), КГИОП и ГАТИ Санкт-Петербурга и Москвы.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                onClick={() => onOpenCalculator && onOpenCalculator('eskd-audit')}
                className="py-3 px-5 bg-white text-black text-xs font-mono uppercase tracking-wider hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2 cursor-pointer font-medium"
              >
                <span>Отправить ТЗ на аудит</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
