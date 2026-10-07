import React, { useEffect, useRef, useState } from 'react';
import { ShieldCheck, RefreshCw } from 'lucide-react';

export const YANDEX_SMARTCAPTCHA_SITEKEY = 'ysc1_01HnkobhAxBXrMVieydTcQjUnHHLAaYhD00HZC4T5c4cc2e3';

declare global {
  interface Window {
    smartCaptcha?: {
      render: (
        container: HTMLElement | string,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          'error-callback'?: (error: any) => void;
          'network-error-callback'?: () => void;
          'token-expired-callback'?: () => void;
          hl?: string;
          theme?: 'light' | 'dark';
          invisible?: boolean;
          shieldPosition?: 'top-left' | 'center-left' | 'bottom-left' | 'top-right' | 'center-right' | 'bottom-right';
          test?: boolean;
          webview?: boolean;
        }
      ) => number;
      reset: (widgetId: number) => void;
      destroy: (widgetId: number) => void;
      getResponse: (widgetId: number) => string;
      execute?: (widgetId: number) => void;
    };
  }
}

interface SmartCaptchaWidgetProps {
  onSuccess: (token: string) => void;
  onReset?: () => void;
  theme?: 'light' | 'dark';
  className?: string;
}

export const SmartCaptchaWidget: React.FC<SmartCaptchaWidgetProps> = ({
  onSuccess,
  onReset,
  theme = 'light',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    let intervalId: any = null;
    let isMounted = true;

    const tryInitCaptcha = () => {
      if (typeof window !== 'undefined' && window.smartCaptcha && containerRef.current) {
        // Clear previous instances if any
        if (widgetIdRef.current !== null) {
          try {
            window.smartCaptcha.destroy(widgetIdRef.current);
          } catch {
            // Ignore reset issues
          }
          widgetIdRef.current = null;
        }

        try {
          const id = window.smartCaptcha.render(containerRef.current, {
            sitekey: YANDEX_SMARTCAPTCHA_SITEKEY,
            hl: 'ru',
            theme: theme === 'dark' ? 'dark' : 'light',
            callback: (token: string) => {
              if (!isMounted) return;
              setIsVerified(true);
              onSuccess(token);
            },
            'token-expired-callback': () => {
              if (!isMounted) return;
              setIsVerified(false);
              if (onReset) onReset();
            },
            'error-callback': () => {
              if (!isMounted) return;
              setIsVerified(false);
            },
          });

          widgetIdRef.current = id;
          setIsLoaded(true);
          return true;
        } catch (err) {
          console.warn('SmartCaptcha render note:', err);
        }
      }
      return false;
    };

    // Try immediately
    if (!tryInitCaptcha()) {
      // Poll until captcha.js script is loaded from CDN
      let retries = 0;
      intervalId = setInterval(() => {
        retries++;
        if (tryInitCaptcha() || retries > 25) {
          clearInterval(intervalId);
          if (retries > 25 && isMounted) {
            // If offline or blocked by adblock, allow smooth fallback
            setIsLoaded(true);
          }
        }
      }, 200);
    }

    return () => {
      isMounted = false;
      if (intervalId) clearInterval(intervalId);
      if (widgetIdRef.current !== null && window.smartCaptcha) {
        try {
          window.smartCaptcha.destroy(widgetIdRef.current);
        } catch {
          // ignore
        }
      }
    };
  }, [theme, onSuccess, onReset]);

  return (
    <div className={`smart-captcha-wrapper my-3 ${className}`}>
      <div className="flex items-center justify-between mb-1.5 text-[11px] font-mono text-neutral-500">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#55AA53]" />
          <span>Защита от спама Яндекс SmartCaptcha</span>
        </span>
        {isVerified && (
          <span className="text-[#55AA53] font-semibold">Проверка пройдена ✓</span>
        )}
      </div>

      <div 
        ref={containerRef} 
        className="min-h-[100px] flex items-center justify-start rounded-xs overflow-hidden bg-neutral-50 border border-neutral-200"
      >
        {!isLoaded && (
          <div className="p-4 text-xs font-mono text-neutral-400 flex items-center gap-2">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-neutral-500" />
            <span>Загрузка безопасного модуля проверки...</span>
          </div>
        )}
      </div>
    </div>
  );
};
