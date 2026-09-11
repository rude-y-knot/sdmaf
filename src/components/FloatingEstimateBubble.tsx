import React from 'react';
import { Calculator, ArrowRight, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEstimate } from '../context/EstimateContext';

export const FloatingEstimateBubble: React.FC = () => {
  const { totalCount, setIsBatchDrawerOpen } = useEstimate();

  if (totalCount <= 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="fixed bottom-6 right-6 z-40 sm:bottom-8 sm:right-8 group"
      >
        <button
          onClick={() => setIsBatchDrawerOpen(true)}
          className="flex items-center gap-3 bg-neutral-900 text-white pl-4 pr-3 py-3 border border-neutral-700 shadow-2xl hover:bg-black hover:border-white transition-all cursor-pointer select-none"
          title="Открыть список скатов к расчёту сметы"
        >
          {/* Icon with active pulse dot */}
          <div className="relative">
            <div className="w-7 h-7 bg-white text-neutral-950 flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" />
          </div>

          {/* Text Info */}
          <div className="text-left font-mono">
            <div className="text-[10px] uppercase tracking-wider text-neutral-400">
              Смета к расчёту
            </div>
            <div className="text-xs font-semibold text-white flex items-center gap-1.5">
              <span>
                {totalCount} {totalCount === 1 ? 'скат' : totalCount < 5 ? 'ската' : 'скатов'}
              </span>
            </div>
          </div>

          {/* Action indicator pill */}
          <div className="ml-1 px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white text-[11px] font-mono flex items-center gap-1 border border-white/20">
            <span>Рассчитать</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
