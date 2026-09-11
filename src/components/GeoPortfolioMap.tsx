import React from 'react';
import { 
  MapPin, 
  ArrowRight,
  Building2,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '../data/factoryData';

interface GeoPortfolioMapProps {
  onNavigateToPortfolio?: () => void;
}

export const GeoPortfolioMap: React.FC<GeoPortfolioMapProps> = ({
  onNavigateToPortfolio
}) => {
  // Select 3 top flagship projects for the home page showcase
  const featuredProjects = PORTFOLIO_PROJECTS.slice(0, 3);

  return (
    <section id="portfolio-teaser" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-neutral-200">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-2">
              [ 04 / ПОРТФОЛИО И ОБЪЕКТЫ ]
            </div>
            <h2 className="text-3xl sm:text-5xl font-light text-neutral-900 tracking-tight">
              Реализованные объекты
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-neutral-500 max-w-md font-light leading-relaxed">
            Поставляем МАФ и металлоконструкции для жилых кварталов девелоперов, городских набережных, парков и госзаказчиков по всей России и за ее пределами.
          </p>
        </div>

        {/* 3 Featured Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              onClick={onNavigateToPortfolio}
              className="group border border-neutral-200 bg-white flex flex-col justify-between hover:border-neutral-900 transition-all duration-300 cursor-pointer shadow-xs"
            >
              <div>
                {/* Image Container */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-neutral-100 border-b border-neutral-200">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 bg-black/85 backdrop-blur-xs text-white text-[10px] font-mono tracking-wider uppercase">
                      {project.district}
                    </span>
                    <span className="px-2.5 py-1 bg-white/90 backdrop-blur-xs text-neutral-900 text-[10px] font-mono border border-neutral-300">
                      {project.year}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white px-2.5 py-1 text-[11px] font-mono flex items-center gap-1">
                    <span>Подробнее</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                    {project.categoryLabel}
                  </div>
                  <h3 className="text-lg font-light text-neutral-900 tracking-tight mb-2 group-hover:text-black transition-colors line-clamp-1">
                    {project.title}
                  </h3>

                  <div className="flex items-center gap-1 text-xs text-neutral-500 mb-4 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span className="line-clamp-1">{project.locationName}</span>
                  </div>

                  <p className="text-xs text-neutral-600 leading-relaxed font-light mb-5 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Key metadata */}
                  <div className="border-t border-neutral-100 pt-3 space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Заказчик:</span>
                      <span className="text-neutral-800 font-medium text-right line-clamp-1">{project.customer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Объем:</span>
                      <span className="text-neutral-800 text-right line-clamp-1">{project.volume}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="p-6 pt-0 border-t border-neutral-100 mt-2 flex items-center justify-between text-xs font-mono text-neutral-500 group-hover:text-black transition-colors">
                <span>Паспорт объекта</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Big Polestar-Style Action Button: View All Projects */}
        <div className="mt-12 text-center">
          <button
            onClick={onNavigateToPortfolio}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-12 py-4 bg-black text-white text-xs sm:text-sm font-mono uppercase tracking-widest hover:bg-neutral-800 transition-colors cursor-pointer shadow-sm group"
          >
            <span>Смотреть все объекты в портфолио</span>
            <span className="text-neutral-400 font-light">|</span>
            <span className="text-neutral-400 font-normal">Интерактивная карта объектов</span>
            <ArrowRight className="w-4 h-4 text-white transform group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
