import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, X, ArrowRight } from 'lucide-react';

interface CookieConsentBannerProps {
  onOpenPrivacyPolicy: () => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  onOpenPrivacyPolicy,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('sdmaf_cookie_consent_v1');
      if (!consent) {
        // Small delay for clean entrance
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      // ignore localStorage errors in sandboxed iframes
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('sdmaf_cookie_consent_v1', 'accepted');
    } catch (e) {}
    setIsVisible(false);
  };

  const handleDismiss = () => {
    try {
      localStorage.setItem('sdmaf_cookie_consent_v1', 'dismissed');
    } catch (e) {}
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-neutral-900 border border-neutral-700 text-white p-4 sm:p-5 shadow-2xl relative">
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-neutral-400 hover:text-white p-1 transition-colors cursor-pointer"
          title="Закрыть уведомление"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3.5 pr-6">
          <div className="w-7 h-7 bg-white text-black flex items-center justify-center shrink-0 mt-0.5">
            <Cookie className="w-4 h-4" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                [ 152-ФЗ РФ • Файлы Cookie & Аналитика ]
              </span>
            </div>

            <p className="text-xs text-neutral-300 font-light leading-relaxed">
              Мы используем cookie-файлы и сервисы веб-аналитики для корректной работы онлайн-калькулятора смет и сохранения выбранных позиций. Продолжая работу с сайтом, вы соглашаетесь с условиями обработки данных.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 font-mono text-[11px]">
              <button
                onClick={handleAccept}
                className="px-4 py-1.5 bg-white text-black hover:bg-neutral-200 transition-colors uppercase tracking-wider font-medium cursor-pointer"
              >
                Принять все
              </button>

              <button
                onClick={onOpenPrivacyPolicy}
                className="text-neutral-400 hover:text-white underline transition-colors cursor-pointer"
              >
                Политика конфиденциальности
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
