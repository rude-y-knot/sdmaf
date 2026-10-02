import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AlertTriangle, 
  Home, 
  Layers, 
  Factory, 
  Calculator, 
  PhoneCall, 
  ArrowLeft,
  Search
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

interface NotFoundPageProps {
  onOpenCalculator?: () => void;
  onOpenMeasurerModal?: () => void;
}

export function NotFoundPage({ onOpenCalculator, onOpenMeasurerModal }: NotFoundPageProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-[80vh] flex flex-col justify-center text-neutral-900 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <SEOHead
        title="404 — Страница не найдена | Завод «Стальное Дело»"
        description="Запрашиваемая страница не существует или была перемещена. Перейдите в каталог продукции МАФ, раздел производства или на главную страницу завода «Стальное Дело»."
        keywords="404 страница не найдена, стальное дело ошибка 404"
        canonicalPath="/404"
      />
      {/* noindex meta tag for 404 to satisfy SEO spiders */}
      <meta name="robots" content="noindex, follow" />

      <div className="max-w-3xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs font-mono font-bold text-amber-900 uppercase tracking-widest mb-6">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span>Ошибка 404 • Ресурс не найден</span>
        </div>

        {/* Industrial Big 404 */}
        <div className="relative mb-6">
          <h1 className="text-8xl sm:text-9xl font-black tracking-tighter text-neutral-900 font-mono select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <Factory className="w-48 h-48 text-neutral-900" />
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-4 tracking-tight">
          Чертеж не найден или страница была перемещена
        </h2>

        <p className="text-base sm:text-lg text-neutral-600 max-w-xl mx-auto mb-10 leading-relaxed">
          Возможно, вы перешли по устаревшей ссылке или ошиблись в адресе. Воспользуйтесь быстрым меню ниже, чтобы найти нужный раздел завода.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-neutral-950 hover:bg-neutral-800 text-white text-sm font-semibold rounded-lg shadow-sm transition-all group"
          >
            <Home className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>На главную страницу</span>
          </button>

          <button
            onClick={() => navigate('/catalog')}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-sm font-semibold rounded-lg border border-neutral-300 transition-all"
          >
            <Layers className="w-4 h-4 text-neutral-700" />
            <span>Каталог продукции МАФ</span>
          </button>

          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-5 py-3.5 bg-white hover:bg-neutral-50 text-neutral-700 text-sm font-medium rounded-lg border border-neutral-200 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Вернуться назад</span>
          </button>
        </div>

        {/* Quick Links Matrix */}
        <div className="border-t border-neutral-200 pt-10">
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-6">
            Популярные разделы сайта sdmaf.ru:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <button
              onClick={() => navigate('/catalog')}
              className="p-4 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-lg transition-all group"
            >
              <div className="text-xs font-mono text-neutral-500 mb-1">01. Каталог</div>
              <div className="text-sm font-bold text-neutral-900 group-hover:text-emerald-700 transition-colors">
                Горки, мебель, чаны
              </div>
            </button>

            <button
              onClick={() => navigate('/production')}
              className="p-4 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-lg transition-all group"
            >
              <div className="text-xs font-mono text-neutral-500 mb-1">02. Цеха ЧПУ</div>
              <div className="text-sm font-bold text-neutral-900 group-hover:text-emerald-700 transition-colors">
                Лазер, гибка, покраска
              </div>
            </button>

            <button
              onClick={() => {
                if (onOpenCalculator) onOpenCalculator();
                else navigate('/');
              }}
              className="p-4 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-lg transition-all group"
            >
              <div className="text-xs font-mono text-neutral-500 mb-1">03. Расчет сметы</div>
              <div className="text-sm font-bold text-neutral-900 group-hover:text-emerald-700 transition-colors">
                Калькулятор раскроя
              </div>
            </button>

            <button
              onClick={() => navigate('/contacts')}
              className="p-4 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-lg transition-all group"
            >
              <div className="text-xs font-mono text-neutral-500 mb-1">04. Отдел продаж</div>
              <div className="text-sm font-bold text-neutral-900 group-hover:text-emerald-700 transition-colors">
                Контакты и адрес
              </div>
            </button>
          </div>
        </div>

        {/* Support contact */}
        <div className="mt-10 text-xs text-neutral-500 flex items-center justify-center gap-6">
          <span>СПб, г. Колпино, ул. Финляндская, 3</span>
          <span>•</span>
          <a href="tel:+78122007706" className="text-neutral-900 font-semibold hover:underline">
            +7 (812) 200-77-06
          </a>
          <span>•</span>
          <a href="mailto:info@sdmaf.ru" className="text-neutral-900 font-semibold hover:underline">
            info@sdmaf.ru
          </a>
        </div>
      </div>
    </div>
  );
}
