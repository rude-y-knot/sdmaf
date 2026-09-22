import React from 'react';
import { ArrowUpRight, Box, ChevronRight } from 'lucide-react';
import { MAF_PRODUCTS } from '../data/factoryData';

interface CatalogTeaserProps {
  onNavigateToCatalog: (category?: string) => void;
}

export const CatalogTeaser: React.FC<CatalogTeaserProps> = ({ onNavigateToCatalog }) => {
  const teaserCategories = [
    {
      id: 'slides',
      title: 'Детские горки и скаты',
      desc: 'Прямые, винтовые, холмовые и тоннельные скаты из полированной нержавеющей стали AISI 304 по ТР ЕАЭС 042/2017.',
      image: '/images/gorki.webp',
    },
    {
      id: 'furniture',
      title: 'Уличная мебель',
      desc: 'Скамейки, урны, перголы, шезлонги, парковые столы и качели из конструкционной стали, лиственницы и термоясеня.',
      image: '/images/mebel.webp',
    },
    {
      id: 'stainless',
      title: 'Изделия из нержавеющей стали',
      desc: 'Зеркальные арт-объекты, входные порталы, парапетные ограждения, решетки и перголы AISI 304/316.',
      image: '/images/artobj.webp',
    },
    {
      id: 'vats',
      title: 'Чаны и купели',
      desc: 'Сибирские банные чаны на дровах из стали AISI 304 толщиной 3–4 мм с отделкой алтайским кедром и уличные купели.',
      image: '/images/chani.webp',
    },
    {
      id: 'bike',
      title: 'Велопарковки и мобильность',
      desc: 'Арочные, спиральные и дизайнерские антивандальные велостойки, станции ремонта и крытые велонавесы.',
      image: '/images/veloparking.webp',
    },
    {
      id: 'suvenirs',
      title: 'Сувенирная продукция и POS',
      desc: 'Органайзеры, стальные вывески, подставки для телефонов, каркасы светильников, букенды и POS-материалы для HoReCa.',
      image: '/images/suvenirs.webp',
    },
  ];

  return (
    <section id="catalog-teaser" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-neutral-200">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-2">
              [ 02 / Продукция завода ]
            </div>
            <h2 className="text-3xl sm:text-5xl font-light text-neutral-900 tracking-tight">
              Линейка продукции
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-sm text-neutral-500 max-w-md font-normal leading-relaxed">
              Ключевые направления производства: от уличной мебели и парковых элементов до нержавеющих МАФ, горок и банных чанов. Собственное производство в Колпино (СПб).
            </p>
            <button
              onClick={() => onNavigateToCatalog('furniture')}
              className="px-6 py-3 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center gap-2 shrink-0 cursor-pointer whitespace-nowrap"
            >
              <span>Продукция завода</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 6 Category Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200 mt-10 border border-neutral-200">
          {teaserCategories.map((item) => (
            <div
              key={item.id}
              onClick={() => onNavigateToCatalog(item.id)}
              className="bg-white p-6 sm:p-8 flex flex-col justify-between hover:bg-neutral-50/70 transition-colors cursor-pointer group"
            >
              <div>
                {/* Image Showcase with generous whitespace and 100% uncropped display */}
                <div className="relative aspect-16/10 w-full bg-[#F7F7F7] p-6 sm:p-8 flex items-center justify-center mb-6 border border-neutral-100 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-auto h-auto max-w-full max-h-full object-contain select-none transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <h3 className="text-lg font-normal text-neutral-900 tracking-tight mb-2 group-hover:text-black">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed font-light mb-6">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-200 flex items-center justify-between text-xs font-mono text-neutral-900">
                <span className="text-neutral-500 group-hover:text-black transition-colors">
                  Смотреть позиции
                </span>
                <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 group-hover:text-black transition-all" />
              </div>
            </div>
          ))}
        </div>

        {/* Catalog Teaser Footer Link Strip */}
        <div className="border-x border-b border-neutral-200 bg-neutral-50 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs font-mono text-neutral-600">
            <Box className="w-4 h-4 text-neutral-900" />
            <span>Номенклатура включает 14 категорий, более 30 моделей и кастомизацию под проект</span>
          </div>
          <button
            onClick={() => onNavigateToCatalog('all')}
            className="text-xs font-mono uppercase tracking-wider text-neutral-900 hover:underline flex items-center gap-1.5 cursor-pointer font-medium"
          >
            <span>Перейти на страницу каталога МАФ</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
