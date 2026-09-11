import React, { useEffect, useRef, useState } from 'react';
import { PortfolioProject } from '../types';
import { MapPin, Layers, ZoomIn, ZoomOut, Compass, ExternalLink } from 'lucide-react';

interface YandexInteractiveMapProps {
  projects: PortfolioProject[];
  selectedProject: PortfolioProject | null;
  onSelectProject: (project: PortfolioProject) => void;
  className?: string;
}

declare global {
  interface Window {
    ymaps?: any;
  }
}

// Global singleton promise for Yandex Maps script loading
let ymapsLoadingPromise: Promise<any> | null = null;

function loadYandexMapsApi(): Promise<any> {
  if (typeof window === 'undefined') return Promise.reject(new Error('No window'));

  if (window.ymaps && typeof window.ymaps.ready === 'function') {
    return new Promise((resolve) => {
      window.ymaps.ready(() => resolve(window.ymaps));
    });
  }

  if (ymapsLoadingPromise) {
    return ymapsLoadingPromise;
  }

  ymapsLoadingPromise = new Promise((resolve, reject) => {
    // Check if script element already exists in document
    const existingScript = (document.getElementById('yandex-maps-api-script') || 
      document.querySelector('script[src*="api-maps.yandex.ru"]')) as HTMLScriptElement | null;

    if (existingScript) {
      const checkInterval = setInterval(() => {
        if (window.ymaps && typeof window.ymaps.ready === 'function') {
          clearInterval(checkInterval);
          window.ymaps.ready(() => resolve(window.ymaps));
        }
      }, 50);

      existingScript.addEventListener('load', () => {
        if (window.ymaps && typeof window.ymaps.ready === 'function') {
          clearInterval(checkInterval);
          window.ymaps.ready(() => resolve(window.ymaps));
        }
      });

      existingScript.addEventListener('error', (err) => {
        clearInterval(checkInterval);
        reject(err);
      });

      setTimeout(() => {
        clearInterval(checkInterval);
        if (window.ymaps && typeof window.ymaps.ready === 'function') {
          window.ymaps.ready(() => resolve(window.ymaps));
        } else {
          resolve(null);
        }
      }, 4000);
      return;
    }

    const script = document.createElement('script');
    script.id = 'yandex-maps-api-script';
    script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&coordorder=latlong';
    script.async = true;

    script.onload = () => {
      if (window.ymaps && typeof window.ymaps.ready === 'function') {
        window.ymaps.ready(() => resolve(window.ymaps));
      } else {
        resolve(null);
      }
    };

    script.onerror = (err) => {
      console.warn('Failed to load Yandex Maps script');
      ymapsLoadingPromise = null;
      reject(err);
    };

    document.head.appendChild(script);
  });

  return ymapsLoadingPromise;
}

export const YandexInteractiveMap: React.FC<YandexInteractiveMapProps> = ({
  projects,
  selectedProject,
  onSelectProject,
  className = '',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const placemarksRef = useRef<{ [id: string]: any }>({});
  const isMountedRef = useRef<boolean>(true);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<boolean>(false);
  const [mapType, setMapType] = useState<'yandex#map' | 'yandex#satellite' | 'yandex#hybrid'>('yandex#map');

  useEffect(() => {
    isMountedRef.current = true;

    loadYandexMapsApi()
      .then((ymaps) => {
        if (isMountedRef.current && ymaps) {
          initMap(ymaps);
        }
      })
      .catch((err) => {
        console.warn('Yandex Maps API load error:', err);
        if (isMountedRef.current) {
          setLoadError(true);
        }
      });

    return () => {
      isMountedRef.current = false;
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.destroy();
        } catch (e) {
          // ignore cleanup errors
        }
        mapInstanceRef.current = null;
      }
      placemarksRef.current = {};
    };
  }, []);

  const initMap = (ymaps: any) => {
    if (!mapContainerRef.current || !ymaps || mapInstanceRef.current || !isMountedRef.current) return;

    try {
      // Center of SPb and Kolpino / LO area
      const centerCoords = selectedProject?.geoCoords 
        ? [selectedProject.geoCoords.lat, selectedProject.geoCoords.lng]
        : [59.9386, 30.3141];

      const map = new ymaps.Map(mapContainerRef.current, {
        center: centerCoords,
        zoom: 10,
        controls: ['zoomControl', 'typeSelector', 'fullscreenControl'],
        type: mapType,
      }, {
        suppressMapOpenBlock: true,
        autoFitToViewport: 'always',
      });

      // Add Factory HQ Marker in Kolpino
      const factoryPlacemark = new ymaps.Placemark([59.7482, 30.5982], {
        hintContent: 'Завод «Стальное Дело» (Колпино, СПб)',
        balloonContentHeader: '<div style="font-weight:600;font-family:sans-serif;font-size:14px;color:#111;">Завод «Стальное Дело»</div>',
        balloonContentBody: '<div style="font-family:sans-serif;font-size:12px;color:#555;padding-top:4px;">Производственный комплекс 4000+ м²<br/>СПб, г. Колпино, Ижорский завод</div>',
      }, {
        preset: 'islands#blackFactoryIcon',
      });
      map.geoObjects.add(factoryPlacemark);

      // Add Projects Placemarks
      projects.forEach((proj) => {
        if (!proj.geoCoords) return;

        const isSelected = selectedProject?.id === proj.id;
        const placemark = new ymaps.Placemark([proj.geoCoords.lat, proj.geoCoords.lng], {
          hintContent: proj.title,
          balloonContentHeader: `<div style="font-weight:600;font-family:sans-serif;font-size:14px;color:#111;">${proj.title}</div>`,
          balloonContentBody: `
            <div style="font-family:sans-serif;font-size:12px;color:#444;padding-top:4px;max-width:240px;">
              <p style="margin:0 0 6px 0;color:#777;">📍 ${proj.locationName}</p>
              <p style="margin:0 0 6px 0;"><strong>Заказчик:</strong> ${proj.customer}</p>
              <p style="margin:0 0 6px 0;"><strong>Объем:</strong> ${proj.volume}</p>
            </div>
          `,
        }, {
          preset: isSelected ? 'islands#redDotIcon' : 'islands#darkBlueCircleIcon',
        });

        placemark.events.add('click', () => {
          onSelectProject(proj);
        });

        map.geoObjects.add(placemark);
        placemarksRef.current[proj.id] = placemark;
      });

      mapInstanceRef.current = map;
      setMapLoaded(true);
    } catch (e) {
      console.error('Yandex Maps init error:', e);
      setLoadError(true);
    }
  };

  // Synchronize map center when selected project changes
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedProject?.geoCoords) return;

    mapInstanceRef.current.panTo([selectedProject.geoCoords.lat, selectedProject.geoCoords.lng], {
      flying: true,
      duration: 600,
      zoom: 13,
    });

    // Update pin styles
    projects.forEach((p) => {
      const pm = placemarksRef.current[p.id];
      if (pm) {
        if (p.id === selectedProject.id) {
          pm.options.set('preset', 'islands#redDotIcon');
        } else {
          pm.options.set('preset', 'islands#darkBlueCircleIcon');
        }
      }
    });
  }, [selectedProject]);

  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setZoom(mapInstanceRef.current.getZoom() + 1, { duration: 300 });
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setZoom(mapInstanceRef.current.getZoom() - 1, { duration: 300 });
    }
  };

  const handleResetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setBounds(
        projects.map(p => [p.geoCoords.lat, p.geoCoords.lng]),
        { checkZoomRange: true, duration: 600, zoomMargin: 40 }
      );
    }
  };

  const toggleMapType = () => {
    if (!mapInstanceRef.current) return;
    const nextType = mapType === 'yandex#map' ? 'yandex#hybrid' : 'yandex#map';
    setMapType(nextType);
    mapInstanceRef.current.setType(nextType);
  };

  return (
    <div className={`relative border border-neutral-200 bg-neutral-100 overflow-hidden ${className}`}>
      {/* Map Target Container */}
      <div 
        ref={mapContainerRef} 
        className="w-full h-full min-h-[440px] sm:min-h-[540px] lg:min-h-[620px]"
      />

      {/* Loading Overlay */}
      {!mapLoaded && !loadError && (
        <div className="absolute inset-0 bg-neutral-100 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-8 h-8 border-2 border-neutral-300 border-t-black rounded-full animate-spin mb-3"></div>
          <p className="text-xs font-mono text-neutral-600 uppercase tracking-wider">
            Загрузка интерактивной карты Яндекс...
          </p>
          <span className="text-[11px] text-neutral-400 mt-1">Реализованные объекты завода</span>
        </div>
      )}

      {/* Fallback View in case API is unavailable or offline */}
      {loadError && (
        <div className="absolute inset-0 bg-neutral-900 text-white flex flex-col justify-between p-6">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-400" />
              <span className="text-xs font-mono">Карта реализованных объектов</span>
            </div>
            <a
              href="https://yandex.ru/maps"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] text-neutral-400 hover:text-white flex items-center gap-1 font-mono"
            >
              <span>Открыть в Яндекс.Картах</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-4">
            {projects.map((p) => (
              <button
                key={p.id}
                onClick={() => onSelectProject(p)}
                className={`text-left p-3 border transition-colors cursor-pointer ${
                  selectedProject?.id === p.id 
                    ? 'border-white bg-white/10' 
                    : 'border-neutral-800 bg-neutral-800/40 hover:border-neutral-600'
                }`}
              >
                <div className="text-[10px] font-mono text-neutral-400 mb-1">{p.district}</div>
                <div className="text-xs font-medium text-white line-clamp-1">{p.title}</div>
                <div className="text-[11px] text-neutral-300 mt-1 line-clamp-1">{p.volume}</div>
              </button>
            ))}
          </div>

          <div className="text-[11px] text-neutral-500 font-mono flex items-center justify-between border-t border-neutral-800 pt-3">
            <span>Завод «Стальное Дело»: Производство в СПб (Колпино)</span>
            <span>{projects.length} объектов на карте</span>
          </div>
        </div>
      )}

      {/* Map Custom Floating Controls */}
      {mapLoaded && (
        <>
          {/* Top Left Status Badge */}
          <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-xs border border-neutral-200 px-3 py-1.5 shadow-xs text-xs font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-neutral-900 font-medium">Яндекс.Карты</span>
            <span className="text-neutral-400">|</span>
            <span className="text-neutral-500">{projects.length} объектов на карте</span>
          </div>

          {/* Top Right Quick Map Mode Controls */}
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-1.5 shadow-xs">
            <button
              onClick={toggleMapType}
              title="Переключить тип карты (Схема / Спутник)"
              className="bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-200 p-2 text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-neutral-600" />
              <span className="hidden sm:inline">{mapType === 'yandex#map' ? 'Спутник' : 'Схема'}</span>
            </button>
          </div>

          {/* Bottom Right Floating Nav Controls */}
          <div className="absolute bottom-6 right-4 z-10 flex flex-col gap-1 bg-white border border-neutral-200 shadow-xs">
            <button
              onClick={handleZoomIn}
              title="Приблизить"
              className="p-2.5 hover:bg-neutral-50 text-neutral-700 transition-colors cursor-pointer border-b border-neutral-200"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              title="Отдалить"
              className="p-2.5 hover:bg-neutral-50 text-neutral-700 transition-colors cursor-pointer border-b border-neutral-200"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetView}
              title="Показать все объекты"
              className="p-2.5 hover:bg-neutral-50 text-neutral-700 transition-colors cursor-pointer"
            >
              <Compass className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Left Legend */}
          <div className="absolute bottom-4 left-4 z-10 hidden sm:flex items-center gap-3 bg-white/95 backdrop-blur-xs border border-neutral-200 px-3 py-1.5 text-[11px] font-mono text-neutral-600 shadow-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
              <span>Выбранный объект</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              <span>Реализованные объекты</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-950"></span>
              <span>Завод (Колпино)</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
