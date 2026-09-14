import React from 'react';
import { 
  Calculator, 
  ArrowUpRight, 
  Check, 
  Box,
  Ruler
} from 'lucide-react';
import { motion } from 'motion/react';
import { FACTORY_METRICS } from '../data/factoryData';

interface HeroProps {
  onOpenCalculator: () => void;
  onNavigateToCatalog: () => void;
  onOpenMeasurerModal: () => void;
  onNavigateToRoute?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenCalculator,
  onNavigateToCatalog,
  onOpenMeasurerModal,
}) => {
  return (
    <section id="hero" className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Editorial Eyebrow */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-[11px] font-mono tracking-[0.25em] uppercase text-neutral-400">
          <span>САНКТ-ПЕТЕРБУРГ / КОЛПИНО</span>
          <span className="text-neutral-300">•</span>
          <span>ПРОИЗВОДСТВО 4000 М²</span>
        </div>

        {/* Architectural 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Content Column */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6 sm:space-y-8">
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-light tracking-[-0.03em] text-neutral-900 leading-[1.06]">
              Инженерная <br className="hidden sm:inline" />
              <span className="font-normal text-black">эстетика</span>
            </h1>

            {/* Mobile-only illustration placed directly between "Инженерная эстетика" and description */}
            <div className="block lg:hidden my-6">
              <div className="w-full max-w-[340px] sm:max-w-[420px] mx-auto flex justify-center">
                <img
                  src="/images/yard2.svg"
                  alt="Архитектурный чертеж благоустройства и малых архитектурных форм"
                  className="w-full h-auto object-contain max-h-[280px] sm:max-h-[340px]"
                  loading="eager"
                />
              </div>
            </div>

            <p className="text-base sm:text-lg text-neutral-600 max-w-2xl leading-relaxed font-normal">
              Собственный завод металлоконструкций и малых архитектурных форм в Санкт-Петербурге. 
              Прецизионный лазерный раскрой, ЧПУ гибка, роботизированная сварка и полимерное покрытие.
            </p>

            {/* Polestar Minimalist CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="hero-quote-btn"
                onClick={onOpenCalculator}
                className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                <span>Рассчитать смету</span>
              </button>

              <button
                id="hero-measurer-btn"
                onClick={onOpenMeasurerModal}
                className="inline-flex items-center gap-2 px-8 py-4 border border-neutral-300 text-neutral-900 text-[11px] uppercase tracking-[0.2em] font-medium hover:border-black transition-colors cursor-pointer"
              >
                <Ruler className="w-4 h-4 text-neutral-600" />
                <span>Замерщик</span>
              </button>

              <button
                id="hero-catalog-btn"
                onClick={onNavigateToCatalog}
                className="inline-flex items-center gap-2 px-8 py-4 border border-neutral-300 text-neutral-900 text-[11px] uppercase tracking-[0.2em] font-medium hover:border-black transition-colors cursor-pointer"
              >
                <Box className="w-4 h-4 text-neutral-500" />
                <span>Продукция завода</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
              </button>
            </div>

            {/* Spec check points */}
            <div className="pt-6 border-t border-neutral-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-neutral-600 font-mono">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-neutral-900 shrink-0" />
                <span>Работаем со всеми видами чертежей DWG / DXF / STEP / PDF и другими</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-neutral-900 shrink-0" />
                <span>Выезд замерщика СПб и ЛО</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-neutral-900 shrink-0" />
                <span>НДС, УСН, 44-ФЗ / 223-ФЗ</span>
              </div>
            </div>
          </div>

          {/* Desktop-only right-aligned illustration */}
          <div className="hidden lg:flex lg:col-span-5 xl:col-span-5 justify-end items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-full max-w-[480px] xl:max-w-[540px] flex justify-end"
            >
              <img
                src="/images/yard2.svg"
                alt="Архитектурный чертеж благоустройства и малых архитектурных форм"
                className="w-full h-auto object-contain max-h-[460px] xl:max-h-[520px] select-none pointer-events-none"
                loading="eager"
              />
            </motion.div>
          </div>
        </div>

        {/* FACTORY STATS STRIP (Polestar Precision Architectural Divider Layout) */}
        <div className="mt-16 pt-12 border-t border-neutral-200 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {FACTORY_METRICS.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * index, duration: 0.3 }}
              className="space-y-1"
            >
              <div className="text-3xl sm:text-4xl font-light text-neutral-900 tracking-tight font-mono">
                {metric.value}
              </div>
              <div className="text-xs font-semibold text-black uppercase tracking-wider">
                {metric.label}
              </div>
              <div className="text-xs text-neutral-500 font-normal">
                {metric.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
