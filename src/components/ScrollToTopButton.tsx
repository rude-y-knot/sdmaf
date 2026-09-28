import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEstimate } from '../context/EstimateContext';

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { totalCount } = useEstimate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      // Calculate scroll progress percentage (0 - 100)
      if (docHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, Math.round((scrollY / docHeight) * 100))));
      }

      // Show button after scrolling down 350px
      if (scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // If estimate bubble is visible in bottom-right, offset upwards so they don't overlap
  const hasEstimateBubble = totalCount > 0;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className={`fixed z-35 right-4 sm:right-6 transition-all duration-300 ${
            hasEstimateBubble ? 'bottom-22 sm:bottom-24' : 'bottom-5 sm:bottom-8'
          }`}
        >
          <button
            onClick={scrollToTop}
            aria-label="Наверх страницы"
            title="Наверх страницы"
            className="group flex items-center gap-2 bg-neutral-900/90 hover:bg-black text-white p-2.5 sm:px-3 sm:py-2.5 border border-neutral-700 hover:border-white shadow-xl hover:shadow-2xl backdrop-blur-md transition-all duration-200 cursor-pointer select-none"
          >
            <div className="relative flex items-center justify-center">
              <ArrowUp className="w-4 h-4 text-white group-hover:-translate-y-0.5 transition-transform duration-200" />
            </div>

            {/* Industrial label & scroll % on desktop */}
            <div className="hidden md:flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-neutral-300 group-hover:text-white">
              <span>Наверх</span>
              <span className="text-[10px] text-neutral-500 group-hover:text-neutral-300 font-mono">
                {scrollProgress}%
              </span>
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
