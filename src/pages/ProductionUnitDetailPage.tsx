import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  ChevronRight, 
  ArrowLeft, 
  ArrowRight,
  Calculator, 
  Compass, 
  Check, 
  ShieldCheck, 
  Cpu, 
  FileText, 
  Layers, 
  Sparkles, 
  Building2, 
  Award, 
  ArrowUpRight,
  Maximize2
} from 'lucide-react';
import { PRODUCTION_UNITS, ProductionUnit } from '../data/productionUnitsData';
import { LaserWorkshopGallery } from '../components/LaserWorkshopGallery';
import { BendingWorkshopGallery } from '../components/BendingWorkshopGallery';
import { CoatingWorkshopGallery } from '../components/CoatingWorkshopGallery';
import { WeldingWorkshopGallery } from '../components/WeldingWorkshopGallery';

interface ProductionUnitDetailPageProps {
  unitId?: string;
  onBackToProduction?: () => void;
  onBackToHome?: () => void;
  onSelectUnit?: (unitId: string) => void;
  onOpenCalculator?: (initialService?: string) => void;
  onOpenMeasurerModal?: () => void;
  onNavigateToCatalog?: () => void;
}

export const ProductionUnitDetailPage: React.FC<ProductionUnitDetailPageProps> = ({
  unitId: propUnitId,
  onBackToProduction,
  onBackToHome,
  onSelectUnit,
  onOpenCalculator,
  onOpenMeasurerModal,
  onNavigateToCatalog,
}) => {
  const params = useParams<{ unitId?: string }>();
  const rawUnitId = propUnitId || params.unitId || 'laser-22kw-6m';

  const resolveUnitId = (id: string) => {
    const cleanId = id.toLowerCase();
    if (
      cleanId === 'laser' || 
      cleanId === 'laser-6m' || 
      cleanId === 'laser-3m' || 
      cleanId === 'laser-4m' || 
      cleanId === 'laser-12kw' || 
      cleanId === 'laser-22kw' ||
      cleanId === 'laser-22kw-6m' || 
      cleanId === 'laser-22kw-4m' || 
      cleanId === 'laser-knoppo' || 
      cleanId === 'laser-knoppo-3m' || 
      cleanId === 'laser-knoppo-6m'
    ) {
      return 'laser-22kw-6m';
    }
    if (cleanId === 'bending' || cleanId === 'press' || cleanId === 'haco' || cleanId === 'maihong' || cleanId === 'esa') {
      return 'bending-250t';
    }
    if (cleanId === 'rolling' || cleanId === 'faccin' || cleanId === 'keepler' || cleanId === 'rme' || cleanId === 'rme-1500') {
      return 'rolling-faccin';
    }
    if (cleanId === 'coating' || cleanId === 'painting' || cleanId === 'ral' || cleanId === 'powder' || cleanId === 'powder-coating' || cleanId === 'powder-paint') {
      return 'coating-ral';
    }
    if (cleanId === 'welding' || cleanId === 'weld' || cleanId === 'naks' || cleanId === 'laser-welding' || cleanId === 'fronius' || cleanId === 'kedr') {
      return 'welding-naks';
    }
    return id;
  };

  const resolvedId = resolveUnitId(rawUnitId);
  const unit = PRODUCTION_UNITS.find(u => u.id === resolvedId) || PRODUCTION_UNITS[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [resolvedId]);

  // Find previous and next units for footer navigation
  const currentIndex = PRODUCTION_UNITS.findIndex(u => u.id === unit.id);
  const prevUnit = PRODUCTION_UNITS[(currentIndex - 1 + PRODUCTION_UNITS.length) % PRODUCTION_UNITS.length];
  const nextUnit = PRODUCTION_UNITS[(currentIndex + 1) % PRODUCTION_UNITS.length];

  return (
    <div className="bg-white min-h-screen selection:bg-black selection:text-white">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-neutral-200 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-neutral-500 overflow-x-auto whitespace-nowrap scrollbar-none">
            <button
              onClick={onBackToHome}
              className="hover:text-black transition-colors cursor-pointer"
            >
              Главная
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <button
              onClick={onBackToProduction}
              className="hover:text-black transition-colors cursor-pointer"
            >
              Производство и цеха
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="text-neutral-900 font-medium">{unit.shortTitle}</span>
          </div>

          <button
            onClick={onBackToProduction}
            className="hidden sm:inline-flex items-center gap-1.5 text-neutral-600 hover:text-black transition-colors cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Все участки цеха</span>
          </button>
        </div>
      </div>

      {/* Main Unit Header & Showcase */}
      <div className="border-b border-neutral-200 py-10 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Top Meta info */}
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-neutral-400 mb-4">
            <span className="bg-neutral-100 text-neutral-800 px-2 py-0.5 font-medium">
              {unit.badge}
            </span>
            <span>•</span>
            <span>{unit.brand} ({unit.country})</span>
            <span>•</span>
            <span>ЦЕХ САНКТ-ПЕТЕРБУРГ / КОЛПИНО</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider mb-2">
                  {unit.model}
                </div>
                <h1 className="text-3xl sm:text-5xl font-light text-neutral-900 tracking-tight leading-[1.1]">
                  {unit.title}
                </h1>
              </div>

              <p className="text-sm sm:text-base text-neutral-700 font-light leading-relaxed">
                {unit.detailedOverview}
              </p>

              {/* Quick Action CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => onOpenCalculator(unit.orderType)}
                  className="py-3.5 px-6 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Рассчитать {unit.orderType}</span>
                </button>

                <button
                  onClick={onOpenMeasurerModal}
                  className="py-3.5 px-6 border border-neutral-300 text-neutral-900 text-xs font-mono uppercase tracking-wider hover:border-black transition-colors flex items-center justify-center gap-2 cursor-pointer bg-white"
                >
                  <Compass className="w-4 h-4" />
                  <span>Вызов инженера-технолога</span>
                </button>
              </div>

              {/* Key Capabilities Bullet Points */}
              <div className="border-t border-neutral-200 pt-6 space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Ключевые технологические возможности:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {unit.capabilities.map((cap, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-800 font-light">
                      <Check className="w-3.5 h-3.5 text-[#55AA53] shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Media / Single Image Column */}
            <div className="lg:col-span-5 space-y-4">
              {unit.category === 'welding' ? (
                <div className="border border-neutral-900 bg-neutral-900 text-white p-6 sm:p-7 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] tracking-wider uppercase text-neutral-400 bg-neutral-800 px-2.5 py-1">
                        Квалификация и допуски
                      </span>
                      <Award className="w-5 h-5 text-[#55AA53]" />
                    </div>
                    <h3 className="text-xl font-light text-white tracking-tight">
                      Наши специалисты — мастера своего дела
                    </h3>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed">
                      Сварочные работы выполняются исключительно штатными специалистами высших 5–6 разрядов с действующей аттестацией НАКС (СК, КО). Стаж мастеров от 10 до 18 лет.
                    </p>
                  </div>

                  <div className="space-y-2 border-t border-neutral-800 pt-4 text-xs font-mono">
                    <div className="flex items-center gap-2 text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-[#55AA53] shrink-0" />
                      <span>Лазерная продольная и ручная сварка Maihong</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-[#55AA53] shrink-0" />
                      <span>Импульсные полуавтоматы Fronius (без брызг)</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-[#55AA53] shrink-0" />
                      <span>Тяжелые полуавтоматы Кедр (силовой провар)</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-[#55AA53] shrink-0" />
                      <span>100% ВИК, УЗК и гидроиспытания емкостей</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border border-neutral-200 bg-neutral-50 overflow-hidden relative aspect-4/3 flex items-center justify-center pl-[25px] pr-4 py-4">
                  <img
                    src={unit.image}
                    alt={unit.title}
                    className="w-full h-full object-contain object-center"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-xs text-white text-[10px] font-mono px-2.5 py-1">
                    {unit.model}
                  </div>
                </div>
              )}

              {/* Quick Spec Highlights Strip */}
              <div className="border border-neutral-200 bg-[#FAFAFA] p-4 space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Производитель:</span>
                  <span className="text-neutral-900 font-medium">{unit.brand}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Страна сборки:</span>
                  <span className="text-neutral-900 font-medium">{unit.country}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Статус в цехе:</span>
                  <span className="text-[#55AA53] font-medium flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#55AA53] inline-block animate-pulse"></span>
                    Введен в эксплуатацию
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Соответствие ГОСТ:</span>
                  <span className="text-neutral-900">{unit.standards[0]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LASER CUTTING WORKSHOP SHOWCASE (Knoppo KF 3 kW Text & Comparison Table) */}
      {unit.category === 'laser' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
          <LaserWorkshopGallery onOpenCalculator={onOpenCalculator} />
        </div>
      )}

      {/* BENDING WORKSHOP SHOWCASE (HACO ERM 20040 & MAIHONG 160/3200 with ESA CNC) */}
      {unit.category === 'bending' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
          <BendingWorkshopGallery onOpenCalculator={onOpenCalculator} />
        </div>
      )}

      {/* COATING WORKSHOP SHOWCASE (Gas Polymerization Ovens 3m & 6m) */}
      {unit.category === 'coating' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
          <CoatingWorkshopGallery onOpenCalculator={onOpenCalculator} />
        </div>
      )}

      {/* WELDING WORKSHOP SHOWCASE (Longitudinal Laser, Maihong BWT20/SUP23T, Кедр, Fronius) */}
      {unit.category === 'welding' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
          <WeldingWorkshopGallery onOpenCalculator={onOpenCalculator} />
        </div>
      )}

      {/* SECTION 1: Полные технические характеристики (для других производственных узлов) */}
      {unit.category !== 'laser' && unit.category !== 'bending' && unit.category !== 'coating' && unit.category !== 'welding' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-200 mb-8">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-2">
                [ 01 / Паспорт станка ]
              </div>
              <h2 className="text-2xl sm:text-4xl font-light text-neutral-900 tracking-tight">
                Полные технические характеристики
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-md font-light">
              Паспортные данные комплекса для инженеров-технологов и специалистов службы снабжения.
            </p>
          </div>

          <div className="border border-neutral-200 bg-white overflow-hidden shadow-xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-100/80 font-mono text-[11px] uppercase tracking-wider text-neutral-600">
                  <th className="py-4 px-6 font-medium">Технологический параметр</th>
                  <th className="py-4 px-6 font-medium">Значение / Диапазон</th>
                  <th className="py-4 px-6 font-medium">Технические примечания</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 font-light">
                {unit.specs.map((spec, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50/70 transition-colors">
                    <td className="py-3.5 px-6 text-neutral-900 font-normal">
                      {spec.label}
                    </td>
                    <td className="py-3.5 px-6 font-mono font-medium text-neutral-900 whitespace-nowrap">
                      {spec.value}
                    </td>
                    <td className="py-3.5 px-6 text-neutral-500 font-mono text-[11px]">
                      {spec.note || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* SECTION 2: Обрабатываемые материалы и толщины (если не лазер, так как для лазера все подробно выведено выше) */}
      {unit.category !== 'laser' && (
        <section className="bg-[#FAFAFA] border-y border-neutral-200 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-200 mb-8">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-2">
                  [ 02 / Материалы и толщины ]
                </div>
                <h2 className="text-2xl sm:text-4xl font-light text-neutral-900 tracking-tight">
                  Диапазон обрабатываемых металлов
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-neutral-500 max-w-md font-light">
                Работаем с сертифицированным первичным прокатом. Входной спектральный анализ каждой партии.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {unit.materials
                .filter(mat => !mat.name.toLowerCase().includes('латунь') && !mat.name.toLowerCase().includes('медь'))
                .map((mat, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-neutral-200 p-6 flex flex-col justify-between hover:border-black transition-colors"
                  >
                    <div>
                      <div className="text-[10px] font-mono uppercase bg-neutral-100 text-neutral-700 px-2 py-0.5 inline-block mb-3">
                        Материал #{idx + 1}
                      </div>
                      <h3 className="text-base font-medium text-neutral-900 mb-1">
                        {mat.name}
                      </h3>
                      <div className="text-xl font-light font-mono text-neutral-900 mb-4">
                        {mat.maxThickness}
                      </div>
                    </div>

                    <div className="border-t border-neutral-100 pt-3 text-xs text-neutral-500 font-light">
                      {mat.note}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 3: Технологический процесс работы оборудования */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-200 mb-10">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-2">
              [ 03 / Техрегламент ]
            </div>
            <h2 className="text-2xl sm:text-4xl font-light text-neutral-900 tracking-tight">
              5 шагов технологического процесса
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-md font-light">
            Сквозная интеграция с ERP-системой завода исключает человеческий фактор и ошибки позиционирования.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {unit.processSteps.map((step, idx) => (
            <div
              key={idx}
              className="border border-neutral-200 p-6 bg-white flex flex-col justify-between"
            >
              <div>
                <div className="font-mono text-2xl font-light text-neutral-300 mb-4">
                  0{idx + 1}
                </div>
                <h3 className="text-sm font-medium text-neutral-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed font-light">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: CTA Consultation & Blueprint Upload */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="border border-neutral-200 bg-white p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400">
                [ Инженерный расчет операции ]
              </div>
              <h3 className="text-2xl sm:text-4xl font-light text-neutral-900 tracking-tight">
                Закажите расчет {unit.orderType}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light max-w-2xl">
                Отправьте чертежи в формате DXF, DWG, STEP или PDF. Технолог рассчитает машинное время, раскладку металла и предоставит коммерческое предложение за 1–2 часа.
              </p>

              <div className="flex flex-wrap gap-4 pt-3 text-xs font-mono text-neutral-600">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#55AA53]" />
                  <span>{unit.standards.join(' • ')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#55AA53]" />
                  <span>Работаем по 44-ФЗ / 223-ФЗ</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <button
                onClick={() => onOpenCalculator(unit.orderType)}
                className="w-full py-4 px-6 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Calculator className="w-4 h-4" />
                <span>Загрузить чертеж в калькулятор</span>
              </button>

              <button
                onClick={onOpenMeasurerModal}
                className="w-full py-4 px-6 border border-neutral-300 text-neutral-900 text-xs font-mono uppercase tracking-wider hover:border-black transition-colors flex items-center justify-center gap-2 cursor-pointer bg-white"
              >
                <Compass className="w-4 h-4" />
                <span>Консультация главного технолога</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Switcher to other Units & Workshop Navigation */}
      <section className="border-t border-neutral-200 bg-[#FAFAFA] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
              Другие технологические участки завода:
            </span>
            <button
              onClick={onBackToProduction}
              className="text-xs font-mono text-neutral-700 hover:text-black underline cursor-pointer"
            >
              Смотреть общий обзор производства
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {PRODUCTION_UNITS.map((u) => {
              const isCurrent = u.id === unit.id;
              return (
                <button
                  key={u.id}
                  onClick={() => onSelectUnit(u.id)}
                  className={`p-3 text-left border transition-all cursor-pointer flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-neutral-900 border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  <div className={`text-[10px] font-mono uppercase mb-1 ${isCurrent ? 'text-neutral-400' : 'text-neutral-400'}`}>
                    {u.badge}
                  </div>
                  <div className="text-xs font-medium line-clamp-2">
                    {u.shortTitle}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Prev / Next buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-neutral-200 font-mono text-xs">
            <button
              onClick={() => onSelectUnit(prevUnit.id)}
              className="inline-flex items-center gap-2 text-neutral-600 hover:text-black transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Предыдущий: <strong>{prevUnit.shortTitle}</strong></span>
            </button>

            <button
              onClick={() => onSelectUnit(nextUnit.id)}
              className="inline-flex items-center gap-2 text-neutral-600 hover:text-black transition-colors cursor-pointer"
            >
              <span>Следующий: <strong>{nextUnit.shortTitle}</strong></span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
