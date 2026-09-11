import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Search, 
  X, 
  ArrowUpRight, 
  ArrowLeft,
  Filter,
  Check,
  ChevronRight,
  Calculator,
  Compass,
  FileText,
  Eye,
  Plus
} from 'lucide-react';
import { MAF_PRODUCTS } from '../data/factoryData';
import { MAFProduct } from '../types';
import { SlidesFilterBar, SlidesFilterState } from '../components/SlidesFilterBar';
import { BikeFiltersBar, BikeFilterState } from '../components/catalog/BikeFiltersBar';
import { FurnitureFiltersBar, FurnitureFilterState } from '../components/catalog/FurnitureFiltersBar';
import { PlaygroundFiltersBar, PlaygroundFilterState } from '../components/catalog/PlaygroundFiltersBar';
import { VatFiltersBar, VatFilterState } from '../components/catalog/VatFiltersBar';
import { StainlessFiltersBar, StainlessFilterState } from '../components/catalog/StainlessFiltersBar';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { useEstimate } from '../context/EstimateContext';

interface CatalogPageProps {
  initialCategory?: string;
  onBackToHome?: () => void;
  onOpenCalculator?: () => void;
  onOpenMeasurerModal?: () => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  initialCategory,
  onBackToHome,
  onOpenCalculator,
  onOpenMeasurerModal,
}) => {
  const params = useParams<{ category?: string }>();
  const navigate = useNavigate();

  const normalizeCategory = (cat: string): string => {
    if (cat === 'slides' || cat === 'geon-slides') return 'slides';
    if (cat === 'bike' || cat === 'bike-racks') return 'bike';
    if (['furniture', 'benches', 'urns', 'pergolas', 'gazebos', 'loungers', 'swings', 'tables'].includes(cat)) {
      return 'furniture';
    }
    if (['playgrounds', 'sportPlay'].includes(cat)) {
      return 'playgrounds';
    }
    if (cat === 'vats') return 'vats';
    if (['metal-structures', 'fences', 'treeGrates', 'artObjects', 'lighting', 'stairs', 'planters', 'entrance-groups', 'art-objects', 'pergolas'].includes(cat)) {
      return 'metal-structures';
    }
    return cat;
  };

  const activeCategoryParam = params.category || initialCategory || 'all';

  const [selectedCategory, setSelectedCategory] = useState<string>(
    normalizeCategory(activeCategoryParam)
  );

  useEffect(() => {
    if (params.category) {
      setSelectedCategory(normalizeCategory(params.category));
    } else if (initialCategory) {
      setSelectedCategory(normalizeCategory(initialCategory));
    }
  }, [params.category, initialCategory]);

  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      navigate('/catalog');
    } else {
      navigate(`/catalog/${catId}`);
    }
  };

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'default' | 'weight-desc' | 'name-asc'>('default');

  // Product detail passport modal state
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<MAFProduct | null>(null);

  const { addItem, isInEstimate, getItemQuantity, setCalculatingProduct } = useEstimate();

  // 1. Slide specific filter state
  const initialSlideFilters: SlidesFilterState = {
    slideType: 'all',
    slideForm: 'all',
    heightPreset: 'all',
    exactHeight: 'all',
    lengthPreset: 'all',
    exactLength: 'all',
  };
  const [slideFilters, setSlideFilters] = useState<SlidesFilterState>(initialSlideFilters);

  // 2. Bike specific filter state
  const initialBikeFilters: BikeFilterState = {
    bikeType: 'all',
    capacityRange: 'all',
    bikeForm: 'all',
  };
  const [bikeFilters, setBikeFilters] = useState<BikeFilterState>(initialBikeFilters);

  // 3. Furniture specific filter state
  const initialFurnitureFilters: FurnitureFilterState = {
    furnitureType: 'all',
    lengthRange: 'all',
  };
  const [furnitureFilters, setFurnitureFilters] = useState<FurnitureFilterState>(initialFurnitureFilters);

  // 4. Playground specific filter state
  const initialPlaygroundFilters: PlaygroundFilterState = {
    playgroundType: 'all',
  };
  const [playgroundFilters, setPlaygroundFilters] = useState<PlaygroundFilterState>(initialPlaygroundFilters);

  // 5. Vat specific filter state
  const initialVatFilters: VatFilterState = {
    steelGrade: 'all',
    thickness: 'all',
    capacityCategory: 'all',
    bowlShape: 'all',
    mounting: 'all',
    heating: 'all',
    lighting: 'all',
  };
  const [vatFilters, setVatFilters] = useState<VatFilterState>(initialVatFilters);

  // 6. Stainless steel specific filter state
  const initialStainlessFilters: StainlessFilterState = {
    stainlessType: 'all',
  };
  const [stainlessFilters, setStainlessFilters] = useState<StainlessFilterState>(initialStainlessFilters);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const categories = [
    { id: 'all', label: 'Все изделия' },
    { id: 'slides', label: 'Скаты для горок' },
    { id: 'bike', label: 'Парковки для велосипедов' },
    { id: 'furniture', label: 'Уличная мебель' },
    { id: 'playgrounds', label: 'Оборудование для детских площадок' },
    { id: 'vats', label: 'Чаны и купели' },
    { id: 'metal-structures', label: 'Изделия из нержавеющей стали' },
  ];

  // Raw category arrays
  const allSlides = useMemo(() => {
    return MAF_PRODUCTS.filter((p) => p.category === 'slides');
  }, []);

  const allBikes = useMemo(() => {
    return MAF_PRODUCTS.filter((p) => normalizeCategory(p.category) === 'bike');
  }, []);

  const allFurniture = useMemo(() => {
    return MAF_PRODUCTS.filter((p) => normalizeCategory(p.category) === 'furniture');
  }, []);

  const allPlaygrounds = useMemo(() => {
    return MAF_PRODUCTS.filter((p) => normalizeCategory(p.category) === 'playgrounds');
  }, []);

  const allVats = useMemo(() => {
    return MAF_PRODUCTS.filter((p) => normalizeCategory(p.category) === 'vats');
  }, []);

  const allStainless = useMemo(() => {
    return MAF_PRODUCTS.filter((p) => normalizeCategory(p.category) === 'metal-structures');
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: MAF_PRODUCTS.length };
    categories.forEach((c) => {
      counts[c.id] = 0;
    });
    counts['all'] = MAF_PRODUCTS.length;
    MAF_PRODUCTS.forEach((p) => {
      const prim = normalizeCategory(p.category);
      counts[prim] = (counts[prim] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter slides specifically for count matching
  const matchingSlidesCount = useMemo(() => {
    return allSlides.filter((p) => {
      if (slideFilters.slideType !== 'all' && p.slideType && p.slideType !== slideFilters.slideType) {
        return false;
      }
      if (slideFilters.slideForm !== 'all' && p.slideForm && p.slideForm !== slideFilters.slideForm) {
        return false;
      }
      // Height filter
      if (slideFilters.exactHeight !== 'all') {
        const targetH = parseFloat(slideFilters.exactHeight);
        const h = p.slideHeight || (p.dimensions.height / 1000);
        if (Math.abs(h - targetH) > 0.05) return false;
      } else if (slideFilters.heightPreset !== 'all') {
        const h = p.slideHeight || (p.dimensions.height / 1000);
        if (slideFilters.heightPreset === 'low' && h > 1.05) return false;
        if (slideFilters.heightPreset === 'mid' && (h < 1.05 || h > 1.95)) return false;
        if (slideFilters.heightPreset === 'high' && (h < 1.95 || h > 3.05)) return false;
        if (slideFilters.heightPreset === 'tower' && h <= 3.05) return false;
      }
      // Length filter
      if (slideFilters.exactLength !== 'all') {
        const targetL = parseFloat(slideFilters.exactLength);
        const l = p.slideLength || (p.dimensions.length / 1000);
        if (Math.abs(l - targetL) > 0.1) return false;
      } else if (slideFilters.lengthPreset !== 'all') {
        const l = p.slideLength || (p.dimensions.length / 1000);
        if (slideFilters.lengthPreset === 'short' && l > 2.5) return false;
        if (slideFilters.lengthPreset === 'mid' && (l < 2.5 || l > 4.5)) return false;
        if (slideFilters.lengthPreset === 'long' && (l < 4.5 || l > 7.0)) return false;
        if (slideFilters.lengthPreset === 'extra' && l <= 7.0) return false;
      }
      return true;
    }).length;
  }, [allSlides, slideFilters]);

  // Filter bikes specifically for count matching
  const matchingBikesCount = useMemo(() => {
    return allBikes.filter((p) => {
      if (bikeFilters.bikeType !== 'all' && p.bikeType && p.bikeType !== bikeFilters.bikeType) {
        return false;
      }
      if (bikeFilters.capacityRange !== 'all') {
        const cap = p.bikeCapacity || 4;
        if (bikeFilters.capacityRange === '2-4' && (cap < 2 || cap > 4)) return false;
        if (bikeFilters.capacityRange === '5-8' && (cap < 5 || cap > 8)) return false;
        if (bikeFilters.capacityRange === '9-12' && (cap < 9 || cap > 12)) return false;
        if (bikeFilters.capacityRange === '13+' && cap < 13) return false;
      }
      if (bikeFilters.bikeForm !== 'all' && p.bikeForm && p.bikeForm !== bikeFilters.bikeForm) {
        return false;
      }
      return true;
    }).length;
  }, [allBikes, bikeFilters]);

  // Filter furniture specifically for count matching
  const matchingFurnitureCount = useMemo(() => {
    return allFurniture.filter((p) => {
      if (furnitureFilters.furnitureType !== 'all') {
        const prodType = p.furnitureType || p.category;
        if (furnitureFilters.furnitureType === 'benches' && prodType !== 'benches') return false;
        if (furnitureFilters.furnitureType === 'tables' && prodType !== 'tables') return false;
        if (furnitureFilters.furnitureType === 'loungers' && prodType !== 'loungers') return false;
        if (furnitureFilters.furnitureType === 'pergolas' && !['pergolas', 'gazebos'].includes(prodType)) return false;
        if (furnitureFilters.furnitureType === 'parklets' && prodType !== 'parklets') return false;
        if (furnitureFilters.furnitureType === 'swings' && prodType !== 'swings') return false;
      }
      if (furnitureFilters.lengthRange !== 'all') {
        const lenM = p.furnitureLengthM || (p.dimensions ? p.dimensions.length / 1000 : 2.0);
        if (furnitureFilters.lengthRange === 'under-1.5' && lenM >= 1.5) return false;
        if (furnitureFilters.lengthRange === '1.5-2.0' && (lenM < 1.5 || lenM > 2.05)) return false;
        if (furnitureFilters.lengthRange === '2.0-2.5' && (lenM <= 2.05 || lenM > 2.55)) return false;
        if (furnitureFilters.lengthRange === 'over-2.5' && lenM <= 2.55) return false;
      }
      return true;
    }).length;
  }, [allFurniture, furnitureFilters]);

  // Filter playgrounds specifically for count matching
  const matchingPlaygroundsCount = useMemo(() => {
    return allPlaygrounds.filter((p) => {
      if (playgroundFilters.playgroundType !== 'all') {
        if (p.playgroundType && p.playgroundType !== playgroundFilters.playgroundType) {
          return false;
        }
      }
      return true;
    }).length;
  }, [allPlaygrounds, playgroundFilters]);

  // Filter vats specifically for count matching
  const matchingVatsCount = useMemo(() => {
    return allVats.filter((p) => {
      if (vatFilters.steelGrade !== 'all') {
        const grade = p.vatSteelGrade || (p.material.includes('AISI 304') ? 'AISI 304' : undefined);
        if (grade && grade !== vatFilters.steelGrade) return false;
      }
      if (vatFilters.thickness !== 'all') {
        const th = p.vatThickness || '3 мм';
        if (th !== vatFilters.thickness) return false;
      }
      if (vatFilters.capacityCategory !== 'all') {
        const cap = p.vatCapacityPeople || 6;
        if (vatFilters.capacityCategory === 'small' && cap > 4) return false;
        if (vatFilters.capacityCategory === 'medium' && (cap < 5 || cap > 6)) return false;
        if (vatFilters.capacityCategory === 'large' && cap < 7) return false;
      }
      if (vatFilters.bowlShape !== 'all') {
        if (p.vatBowlShape && p.vatBowlShape !== vatFilters.bowlShape) return false;
      }
      if (vatFilters.mounting !== 'all') {
        if (p.vatMounting && p.vatMounting !== vatFilters.mounting) return false;
      }
      if (vatFilters.heating !== 'all') {
        if (p.vatHeating && p.vatHeating !== vatFilters.heating) return false;
      }
      if (vatFilters.lighting !== 'all') {
        const hasLight = !!p.vatLighting;
        if (vatFilters.lighting === 'yes' && !hasLight) return false;
        if (vatFilters.lighting === 'no' && hasLight) return false;
      }
      return true;
    }).length;
  }, [allVats, vatFilters]);

  // Filter stainless structures specifically for count matching
  const matchingStainlessCount = useMemo(() => {
    return allStainless.filter((p) => {
      if (stainlessFilters.stainlessType !== 'all') {
        if (p.stainlessType && p.stainlessType !== stainlessFilters.stainlessType) {
          return false;
        }
      }
      return true;
    }).length;
  }, [allStainless, stainlessFilters]);

  const handleResetAllFilters = () => {
    setSlideFilters(initialSlideFilters);
    setBikeFilters(initialBikeFilters);
    setFurnitureFilters(initialFurnitureFilters);
    setPlaygroundFilters(initialPlaygroundFilters);
    setVatFilters(initialVatFilters);
    setStainlessFilters(initialStainlessFilters);
    setSearchQuery('');
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = MAF_PRODUCTS.filter((p) => {
      const isSlide = p.category === 'slides';
      const catKey = normalizeCategory(p.category);
      const matchesCategory =
        selectedCategory === 'all' ||
        catKey === selectedCategory ||
        p.category === selectedCategory;

      if (!matchesCategory) return false;

      // 1. Slides filters
      if (isSlide && selectedCategory === 'slides') {
        if (slideFilters.slideType !== 'all' && p.slideType && p.slideType !== slideFilters.slideType) {
          return false;
        }
        if (slideFilters.slideForm !== 'all' && p.slideForm && p.slideForm !== slideFilters.slideForm) {
          return false;
        }
        // Height filter
        if (slideFilters.exactHeight !== 'all') {
          const targetH = parseFloat(slideFilters.exactHeight);
          const h = p.slideHeight || (p.dimensions.height / 1000);
          if (Math.abs(h - targetH) > 0.05) return false;
        } else if (slideFilters.heightPreset !== 'all') {
          const h = p.slideHeight || (p.dimensions.height / 1000);
          if (slideFilters.heightPreset === 'low' && h > 1.05) return false;
          if (slideFilters.heightPreset === 'mid' && (h < 1.05 || h > 1.95)) return false;
          if (slideFilters.heightPreset === 'high' && (h < 1.95 || h > 3.05)) return false;
          if (slideFilters.heightPreset === 'tower' && h <= 3.05) return false;
        }
        // Length filter
        if (slideFilters.exactLength !== 'all') {
          const targetL = parseFloat(slideFilters.exactLength);
          const l = p.slideLength || (p.dimensions.length / 1000);
          if (Math.abs(l - targetL) > 0.1) return false;
        } else if (slideFilters.lengthPreset !== 'all') {
          const l = p.slideLength || (p.dimensions.length / 1000);
          if (slideFilters.lengthPreset === 'short' && l > 2.5) return false;
          if (slideFilters.lengthPreset === 'mid' && (l < 2.5 || l > 4.5)) return false;
          if (slideFilters.lengthPreset === 'long' && (l < 4.5 || l > 7.0)) return false;
          if (slideFilters.lengthPreset === 'extra' && l <= 7.0) return false;
        }
      }

      // 2. Bike filters
      if (selectedCategory === 'bike') {
        if (bikeFilters.bikeType !== 'all' && p.bikeType && p.bikeType !== bikeFilters.bikeType) {
          return false;
        }
        if (bikeFilters.capacityRange !== 'all') {
          const cap = p.bikeCapacity || 4;
          if (bikeFilters.capacityRange === '2-4' && (cap < 2 || cap > 4)) return false;
          if (bikeFilters.capacityRange === '5-8' && (cap < 5 || cap > 8)) return false;
          if (bikeFilters.capacityRange === '9-12' && (cap < 9 || cap > 12)) return false;
          if (bikeFilters.capacityRange === '13+' && cap < 13) return false;
        }
        if (bikeFilters.bikeForm !== 'all' && p.bikeForm && p.bikeForm !== bikeFilters.bikeForm) {
          return false;
        }
      }

      // 3. Furniture filters
      if (selectedCategory === 'furniture') {
        if (furnitureFilters.furnitureType !== 'all') {
          const prodType = p.furnitureType || p.category;
          if (furnitureFilters.furnitureType === 'benches' && prodType !== 'benches') return false;
          if (furnitureFilters.furnitureType === 'tables' && prodType !== 'tables') return false;
          if (furnitureFilters.furnitureType === 'loungers' && prodType !== 'loungers') return false;
          if (furnitureFilters.furnitureType === 'pergolas' && !['pergolas', 'gazebos'].includes(prodType)) return false;
          if (furnitureFilters.furnitureType === 'parklets' && prodType !== 'parklets') return false;
          if (furnitureFilters.furnitureType === 'swings' && prodType !== 'swings') return false;
        }
        if (furnitureFilters.lengthRange !== 'all') {
          const lenM = p.furnitureLengthM || (p.dimensions ? p.dimensions.length / 1000 : 2.0);
          if (furnitureFilters.lengthRange === 'under-1.5' && lenM >= 1.5) return false;
          if (furnitureFilters.lengthRange === '1.5-2.0' && (lenM < 1.5 || lenM > 2.05)) return false;
          if (furnitureFilters.lengthRange === '2.0-2.5' && (lenM <= 2.05 || lenM > 2.55)) return false;
          if (furnitureFilters.lengthRange === 'over-2.5' && lenM <= 2.55) return false;
        }
      }

      // 4. Playground filters
      if (selectedCategory === 'playgrounds') {
        if (playgroundFilters.playgroundType !== 'all') {
          if (p.playgroundType && p.playgroundType !== playgroundFilters.playgroundType) {
            return false;
          }
        }
      }

      // 5. Vat filters
      if (selectedCategory === 'vats') {
        if (vatFilters.steelGrade !== 'all') {
          const grade = p.vatSteelGrade || (p.material.includes('AISI 304') ? 'AISI 304' : undefined);
          if (grade && grade !== vatFilters.steelGrade) return false;
        }
        if (vatFilters.thickness !== 'all') {
          const th = p.vatThickness || '3 мм';
          if (th !== vatFilters.thickness) return false;
        }
        if (vatFilters.capacityCategory !== 'all') {
          const cap = p.vatCapacityPeople || 6;
          if (vatFilters.capacityCategory === 'small' && cap > 4) return false;
          if (vatFilters.capacityCategory === 'medium' && (cap < 5 || cap > 6)) return false;
          if (vatFilters.capacityCategory === 'large' && cap < 7) return false;
        }
        if (vatFilters.bowlShape !== 'all') {
          if (p.vatBowlShape && p.vatBowlShape !== vatFilters.bowlShape) return false;
        }
        if (vatFilters.mounting !== 'all') {
          if (p.vatMounting && p.vatMounting !== vatFilters.mounting) return false;
        }
        if (vatFilters.heating !== 'all') {
          if (p.vatHeating && p.vatHeating !== vatFilters.heating) return false;
        }
        if (vatFilters.lighting !== 'all') {
          const hasLight = !!p.vatLighting;
          if (vatFilters.lighting === 'yes' && !hasLight) return false;
          if (vatFilters.lighting === 'no' && hasLight) return false;
        }
      }

      // 6. Stainless metal structures filters
      if (selectedCategory === 'metal-structures') {
        if (stainlessFilters.stainlessType !== 'all') {
          if (p.stainlessType && p.stainlessType !== stainlessFilters.stainlessType) {
            return false;
          }
        }
      }

      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      const matchesQuery = 
        p.name.toLowerCase().includes(q) ||
        p.article.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        (p.slideTypeLabel && p.slideTypeLabel.toLowerCase().includes(q)) ||
        (p.slideFormLabel && p.slideFormLabel.toLowerCase().includes(q)) ||
        (p.bikeTypeLabel && p.bikeTypeLabel.toLowerCase().includes(q)) ||
        (p.playgroundTypeLabel && p.playgroundTypeLabel.toLowerCase().includes(q)) ||
        (p.vatSteelGrade && p.vatSteelGrade.toLowerCase().includes(q)) ||
        (p.stainlessTypeLabel && p.stainlessTypeLabel.toLowerCase().includes(q));
      return matchesQuery;
    });

    if (sortBy === 'weight-desc') {
      result = [...result].sort((a, b) => b.weight - a.weight);
    } else if (sortBy === 'name-asc') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name, 'ru'));
    }

    return result;
  }, [
    selectedCategory, 
    searchQuery, 
    sortBy, 
    slideFilters, 
    bikeFilters, 
    furnitureFilters, 
    playgroundFilters, 
    vatFilters,
    stainlessFilters
  ]);

  return (
    <div className="bg-white min-h-screen">
      {/* Top Breadcrumbs Bar */}
      <div className="border-b border-neutral-200 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-neutral-500">
            <button
              onClick={onBackToHome}
              className="hover:text-black transition-colors cursor-pointer"
            >
              Главная
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            <button
              onClick={() => handleSelectCategory('all')}
              className={`hover:text-black transition-colors cursor-pointer ${selectedCategory === 'all' ? 'text-neutral-900 font-medium' : ''}`}
            >
              Каталог МАФ
            </button>
            {selectedCategory !== 'all' && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                <span className="text-neutral-900 font-medium">
                  {categories.find((c) => c.id === selectedCategory)?.label}
                </span>
              </>
            )}
          </div>

          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-neutral-600 hover:text-black transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>На главную</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Page Header */}
        <div className="border-b border-neutral-200 pb-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-2">
                [ Производственная номенклатура завода «Стальное Дело» ]
              </div>
              <h1 className="text-3xl sm:text-5xl font-light text-neutral-900 tracking-tight">
                Каталог малых архитектурных форм
              </h1>
              <p className="mt-3 text-neutral-500 text-xs sm:text-sm font-light max-w-2xl leading-relaxed">
                Серийные и индивидуальные МАФ из аустенитной нержавеющей стали AISI 304/316, горячеоцинкованного проката и термодревесины. Соответствие ТР ЕАЭС 042/2017 и ГОСТ Р 52169.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenCalculator}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Калькулятор сметы</span>
              </button>

              <button
                onClick={onOpenMeasurerModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-neutral-300 text-neutral-900 text-xs font-mono uppercase tracking-wider hover:border-black transition-colors cursor-pointer bg-white"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Вызов замерщика</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search, Sort and Summary Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-neutral-200">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по артикулу, названию или характеристикам..."
              className="w-full pl-9 pr-8 py-2 bg-neutral-50 border border-neutral-200 text-xs placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto text-xs font-mono">
            <span className="text-neutral-400">Сортировка:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-white border border-neutral-200 text-neutral-700 text-xs focus:outline-none focus:border-black cursor-pointer"
            >
              <option value="default">По умолчанию</option>
              <option value="name-asc">По названию (А–Я)</option>
              <option value="weight-desc">По массе (сначала тяжелые)</option>
            </select>
          </div>
        </div>

        {/* Category Selector Tabs */}
        <div className="mb-6 overflow-x-auto pb-2 scrollbar-thin">
          <div className="flex items-center gap-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-black text-white font-medium'
                      : 'bg-neutral-50 text-neutral-600 border border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`font-mono text-[10px] ${isActive ? 'text-neutral-300' : 'text-neutral-400'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category-Specific Filter Bars */}
        {selectedCategory === 'slides' && (
          <SlidesFilterBar
            slides={allSlides}
            filters={slideFilters}
            onChange={(newFilters) => setSlideFilters(newFilters)}
            onReset={() => setSlideFilters(initialSlideFilters)}
            totalMatching={matchingSlidesCount}
          />
        )}

        {selectedCategory === 'bike' && (
          <BikeFiltersBar
            products={allBikes}
            filters={bikeFilters}
            onChange={(newFilters) => setBikeFilters(newFilters)}
            onReset={() => setBikeFilters(initialBikeFilters)}
            totalMatching={matchingBikesCount}
          />
        )}

        {selectedCategory === 'furniture' && (
          <FurnitureFiltersBar
            products={allFurniture}
            filters={furnitureFilters}
            onChange={(newFilters) => setFurnitureFilters(newFilters)}
            onReset={() => setFurnitureFilters(initialFurnitureFilters)}
            totalMatching={matchingFurnitureCount}
          />
        )}

        {selectedCategory === 'playgrounds' && (
          <PlaygroundFiltersBar
            products={allPlaygrounds}
            filters={playgroundFilters}
            onChange={(newFilters) => setPlaygroundFilters(newFilters)}
            onReset={() => setPlaygroundFilters(initialPlaygroundFilters)}
            totalMatching={matchingPlaygroundsCount}
          />
        )}

        {selectedCategory === 'vats' && (
          <VatFiltersBar
            products={allVats}
            filters={vatFilters}
            onChange={(newFilters) => setVatFilters(newFilters)}
            onReset={() => setVatFilters(initialVatFilters)}
            totalMatching={matchingVatsCount}
          />
        )}

        {selectedCategory === 'metal-structures' && (
          <StainlessFiltersBar
            products={allStainless}
            filters={stainlessFilters}
            onChange={(newFilters) => setStainlessFilters(newFilters)}
            onReset={() => setStainlessFilters(initialStainlessFilters)}
            totalMatching={matchingStainlessCount}
          />
        )}

        {/* Empty State when no results */}
        {filteredAndSortedProducts.length === 0 && (
          <div className="py-24 text-center border-b border-neutral-200">
            <div className="w-12 h-12 border border-neutral-300 flex items-center justify-center mx-auto mb-4 text-neutral-400">
              <Filter className="w-6 h-6" />
            </div>
            <p className="text-neutral-800 text-base font-medium mb-1">
              По вашему запросу ничего не найдено
            </p>
            <p className="text-neutral-500 text-xs mb-6 max-w-sm mx-auto font-light">
              Попробуйте изменить параметры поиска или сбросить активные фильтры.
            </p>
            <button
              onClick={handleResetAllFilters}
              className="px-6 py-2.5 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Сбросить фильтры
            </button>
          </div>
        )}

        {/* Minimalist Grid of Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200 mt-2 border border-neutral-200">
          {filteredAndSortedProducts.map((product) => {
            const isSlide = product.category === 'slides';
            const hasDetail = !!product.hasDetailPage;

            return (
              <div
                key={product.id}
                className={`bg-white p-6 sm:p-8 flex flex-col justify-between transition-all group relative ${
                  hasDetail 
                    ? 'hover:bg-neutral-50/70 hover:shadow-sm cursor-pointer' 
                    : 'hover:bg-neutral-50/40 cursor-default'
                }`}
                onClick={() => {
                  if (hasDetail) {
                    setSelectedProductForDetail(product);
                  }
                }}
              >
                <div>
                  {/* Top Meta Bar */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-4">
                    <span className="font-semibold text-neutral-700">{product.article}</span>
                    <div className="flex items-center gap-1.5">
                      {hasDetail ? (
                        <span className="inline-flex items-center gap-1 text-[10px] bg-black text-white px-2 py-0.5 font-medium tracking-wide">
                          <FileText className="w-2.5 h-2.5" />
                          <span>Паспорт изделия</span>
                        </span>
                      ) : (
                        <span className="text-[10px] bg-neutral-100 text-neutral-500 px-2 py-0.5">
                          Базовые ТТХ
                        </span>
                      )}
                      <span className="uppercase tracking-wider text-[10px] bg-neutral-100 px-2 py-0.5 text-neutral-600">
                        {product.categoryLabel}
                      </span>
                    </div>
                  </div>

                  {/* Clean Visual Representation */}
                  <div className="relative aspect-4/3 w-full bg-neutral-100 overflow-hidden mb-6 border border-neutral-100">
                    <img
                      src={product.imageRender}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale-15 group-hover:grayscale-0 group-hover:scale-103 transition-all duration-700"
                      loading="lazy"
                    />

                    {/* Slide badges overlay */}
                    {isSlide && (
                      <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 pointer-events-none">
                        <span className="px-2 py-1 bg-black/85 backdrop-blur-xs text-white text-[10px] font-mono tracking-wider uppercase">
                          {product.slideType === 'open' ? 'Открытый скат' : 'Тоннель Ø800'}
                        </span>
                        {product.slideFormLabel && (
                          <span className="px-2 py-1 bg-white/90 backdrop-blur-xs text-neutral-900 text-[10px] font-mono border border-neutral-300">
                            {product.slideFormLabel}
                          </span>
                        )}
                      </div>
                    )}

                    {isSlide && product.slideHeight && (
                      <div className="absolute bottom-2.5 right-2.5 bg-black/80 text-white px-2 py-0.5 text-[10px] font-mono">
                        h = {product.slideHeight} м
                      </div>
                    )}

                    {/* Hover indicator on image when detailed page is available */}
                    {hasDetail && (
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-neutral-900 text-xs font-mono font-medium shadow-md">
                          <Eye className="w-3.5 h-3.5" />
                          <span>Открыть паспорт</span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-normal text-neutral-900 tracking-tight group-hover:text-black">
                      {product.name}
                    </h3>
                    {hasDetail && (
                      <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-black shrink-0 transition-colors mt-1" />
                    )}
                  </div>
                  <p className="text-xs text-neutral-500 line-clamp-3 leading-relaxed mb-6 font-normal">
                    {product.description}
                  </p>

                  {/* Technical Specifications */}
                  <div className="border-t border-neutral-200 pt-3 pb-3 space-y-1.5 text-[11px] mb-6 font-mono text-neutral-600">
                    {isSlide ? (
                      <>
                        <div className="flex justify-between">
                          <span className="text-neutral-400 font-sans">Высота старта (h):</span>
                          <span className="text-neutral-900 font-medium">
                            {product.slideHeight ? `${product.slideHeight} м (${product.dimensions.height} мм)` : `${product.dimensions.height} мм`}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400 font-sans">Длина ската (L):</span>
                          <span className="text-neutral-900 font-medium">
                            {product.slideLength ? `${product.slideLength} м (${product.dimensions.length} мм)` : `${product.dimensions.length} мм`}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400 font-sans">Ширина / диаметр:</span>
                          <span className="text-neutral-900">{product.dimensions.width} мм</span>
                        </div>
                        {product.slideAngle && (
                          <div className="flex justify-between">
                            <span className="text-neutral-400 font-sans">Угол поворота:</span>
                            <span className="text-neutral-900">{product.slideAngle}°</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-neutral-400 font-sans">Масса:</span>
                          <span className="text-neutral-900">{product.weight} кг</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400 font-sans">Материал:</span>
                          <span className="font-sans text-neutral-800 text-right">{product.material}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between">
                          <span className="text-neutral-400 font-sans">Габариты (Д×Ш×В):</span>
                          <span className="text-neutral-900 font-medium">
                            {product.dimensions.length} × {product.dimensions.width} × {product.dimensions.height} мм
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400 font-sans">Масса:</span>
                          <span className="text-neutral-900">{product.weight} кг</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400 font-sans">Материал:</span>
                          <span className="font-sans text-neutral-800 text-right truncate max-w-[200px]">{product.material}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400 font-sans">Покрытие:</span>
                          <span className="font-sans text-neutral-800 text-right truncate max-w-[200px]">{product.coating}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400 font-sans">Монтаж:</span>
                          <span className="font-sans text-neutral-800 text-right">{product.mountingType}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Actions: Calculate Quote, Details, and Add to Batch Estimate */}
                <div 
                  className="pt-4 border-t border-neutral-200 space-y-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  {hasDetail && (
                    <button
                      type="button"
                      onClick={() => setSelectedProductForDetail(product)}
                      className="w-full py-2 px-3 bg-neutral-900 text-white text-xs font-mono uppercase tracking-wider hover:bg-black transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Паспорт изделия</span>
                      <ArrowUpRight className="w-3 h-3 text-neutral-400" />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setCalculatingProduct(product)}
                    className="w-full py-2.5 px-3 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Рассчитать смету</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                  </button>

                  <button
                    type="button"
                    onClick={() => addItem(product, 1)}
                    className={`w-full py-2 px-3 border text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isInEstimate(product.id)
                        ? 'bg-neutral-100 text-neutral-900 border-neutral-400 hover:bg-neutral-200'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:border-black hover:text-black'
                    }`}
                  >
                    {isInEstimate(product.id) ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>В расчёте сметы ({getItemQuantity(product.id)} шт.)</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Добавить к расчёту сметы</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Engineering & CAD Consultation Banner */}
        <div className="border border-neutral-200 bg-[#FAFAFA] p-8 sm:p-12 mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400">
                [ Индивидуальное производство ]
              </div>
              <h3 className="text-2xl sm:text-4xl font-light text-neutral-900 tracking-tight">
                Не нашли нужное изделие? Изготовим по вашему проекту
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light max-w-2xl">
                Конструкторское бюро завода «Стальное Дело» адаптирует архитектурные концепции, 3D-модели и эскизы под серийное производство. Выполняем раскрой стали до 25 мм, гибку, точную сварку НАКС и покраску в любой оттенок RAL.
              </p>

              <div className="flex flex-wrap gap-4 pt-2 text-xs font-mono text-neutral-600">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-neutral-900" />
                  <span>Принимаем файлы DWG, DXF, STEP, PDF</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-neutral-900" />
                  <span>Оперативный расчет сметы</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-neutral-900" />
                  <span>Соответствие СП 16.13330 и ГОСТ</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <button
                onClick={onOpenCalculator}
                className="w-full py-3.5 px-6 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                <span>Загрузить чертеж в калькулятор</span>
              </button>

              <button
                onClick={onOpenMeasurerModal}
                className="w-full py-3.5 px-6 border border-neutral-300 text-neutral-900 text-xs font-mono uppercase tracking-wider hover:border-black transition-colors flex items-center justify-center gap-2 cursor-pointer bg-white"
              >
                <Compass className="w-4 h-4" />
                <span>Вызов конструктора на замер</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Detail Modal (Паспорт изделия) */}
      <ProductDetailModal
        product={selectedProductForDetail}
        isOpen={!!selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
        onOpenCalculator={() => {
          if (selectedProductForDetail) {
            setCalculatingProduct(selectedProductForDetail);
          } else if (onOpenCalculator) {
            onOpenCalculator();
          }
          setSelectedProductForDetail(null);
        }}
        onOpenMeasurerModal={() => {
          if (onOpenMeasurerModal) onOpenMeasurerModal();
          setSelectedProductForDetail(null);
        }}
      />
    </div>
  );
};
