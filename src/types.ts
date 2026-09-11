export interface NavSubItem {
  title: string;
  desc: string;
  badge?: string;
  href: string;
}

export interface NavColumn {
  heading: string;
  items: NavSubItem[];
}

export type RALColor = {
  code: string;
  name: string;
  hex: string;
  textColor: string;
};

export type MAFCategory =
  | 'slides'            // Скаты для горок
  | 'bike'              // Парковки для велосипедов
  | 'furniture'         // Уличная мебель
  | 'playgrounds'       // Оборудование для детских площадок
  | 'vats'              // Чаны и купели
  | 'metal-structures'  // Металлоконструкции
  | 'benches' 
  | 'urns' 
  | 'pergolas' 
  | 'gazebos'
  | 'fences' 
  | 'treeGrates'
  | 'artObjects'
  | 'lighting'
  | 'sportPlay'
  | 'loungers'
  | 'swings'
  | 'tables'
  | string;

export interface ProductCadDrawing {
  name: string;
  format: string;
  fileSize: string;
}

export interface ProductSpecItem {
  label: string;
  value: string;
}

export interface MAFProduct {
  id: string;
  name: string;
  article: string;
  category: MAFCategory;
  categoryLabel: string;
  description: string;
  dimensions: { length: number; width: number; height: number }; // mm
  weight: number; // kg
  material: string;
  coating: string;
  mountingType: 'Анкерное к твердому основанию' | 'Бетонирование закладных стоек' | string;
  priceBase: number; // RUB
  ralColors: RALColor[];
  defaultRal: string;
  imageRender: string;
  blueprintSvg: string;
  bimAvailable: boolean;
  cadFormats: string[];

  // Detailed inner product passport fields
  hasDetailPage?: boolean;
  detailedDescription?: string;
  features?: string[];
  standards?: string[];
  warrantyMonths?: number;
  productionTimeDays?: number;
  galleryImages?: string[];
  cadDrawings?: ProductCadDrawing[];
  specificationsTable?: ProductSpecItem[];

  // 1. ВЕЛОПАРКОВКИ (bike)
  // тип: единая / модульная
  bikeType?: 'single' | 'modular';
  bikeTypeLabel?: string;
  // количество парковочных мест
  bikeCapacity?: number;
  bikeCapacityLabel?: string;
  // форма
  bikeForm?: 'spiral' | 'u-shaped' | 'trapezoid' | 'custom' | string;
  bikeFormLabel?: string;

  // 2. УЛИЧНАЯ МЕБЕЛЬ (furniture)
  // Тип: Скамьи и лавочки / Столы и группы для пикников / Шезлонги и лежаки / Беседки, перголы и навесы / Парклеты и модульные системы / Парковые качели
  furnitureType?: 'benches' | 'tables' | 'loungers' | 'pergolas' | 'parklets' | 'swings' | string;
  furnitureTypeLabel?: string;
  // длина
  furnitureLengthM?: number;

  // 3. ОБОРУДОВАНИЕ ДЛЯ ДЕТСКИХ ПЛОЩАДОК (playgrounds)
  // Спортивно-игровое / Пространственные сетки и канаты / Развивающие зоны и Sensory / Динамические и вращающиеся
  playgroundType?: 'sports-play' | 'rope-mesh' | 'sensory' | 'dynamic' | string;
  playgroundTypeLabel?: string;

  // 4. ЧАНЫ И КУПЕЛИ (vats)
  // Марка стали: AISI 304 / AISI 430 / AISI 316 / Ст3
  vatSteelGrade?: 'AISI 304' | 'AISI 430' | 'AISI 316' | 'Ст3' | string;
  // Толщина металла: 2 мм / 3 мм / 4 мм
  vatThickness?: '2 мм' | '3 мм' | '4 мм' | string;
  // Вместимость и диаметр: Малые (2–4 чел: 1700–1800 мм) / Средние (4–6 чел: 1900–2100 мм) / Большие (8–10 чел: от 2300 мм)
  vatCapacityCategory?: 'small' | 'medium' | 'large' | string;
  vatCapacityPeople?: number;
  vatCapacityLabel?: string;
  vatDiameterMm?: number;
  vatVolumeLiters?: number;
  // Форма чаши: Круглая / Многогранная / Эллипс
  vatBowlShape?: 'round' | 'faceted' | 'ellipse' | string;
  vatBowlShapeLabel?: string;
  // Способ установки: На подставке / Встраиваемая / На цепях и треноге
  vatMounting?: 'stand' | 'built-in' | 'chains' | string;
  vatMountingLabel?: string;
  // Система нагрева: Внутренняя печь / Внешняя печь / Электронагрев / Без печи
  vatHeating?: 'internal-wood' | 'external-wood' | 'electric' | 'none' | string;
  vatHeatingLabel?: string;
  // Подсветка: да / нет
  vatLighting?: boolean;

  // 5. СКАТЫ ДЛЯ ГОРОК (slides)
  slideType?: 'open' | 'closed'; // 'open' = открытая, 'closed' = закрытая
  slideTypeLabel?: string;
  slideForm?: 'straight' | 'curved' | 'spiral'; // 'straight' = прямая, 'curved' = с изгибом, 'spiral' = спиральная
  slideFormLabel?: string;
  slideHeight?: number; // meters (h)
  slideLength?: number; // meters (L)
  slideAngle?: number; // turn degrees (0, 90, 180, 270, 360, 450)

  // 6. ИЗДЕЛИЯ ИЗ НЕРЖАВЕЮЩЕЙ СТАЛИ (metal-structures)
  // Фильтры: Арт-объекты, перголы, ограждения, лестницы, кашпо, входные группы, освещение
  stainlessType?: 'art-objects' | 'pergolas' | 'fences' | 'stairs' | 'planters' | 'entrance-groups' | 'lighting' | string;
  stainlessTypeLabel?: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  locationName: string;
  district: string;
  coords: { x: number; y: number }; // percent coordinates for SVG preview
  geoCoords: { lat: number; lng: number }; // WGS-84 coordinates for Yandex Maps [lat, lng]
  category: 'development' | 'urban' | 'sports' | 'commercial' | 'industrial' | string;
  categoryLabel: string;
  customer: string;
  year: string;
  volume: string;
  coatings: string;
  description: string;
  image: string;
  gallery?: string[];
  productsInstalled?: string[];
  contractType?: string;
  completionTime?: string;
  tags: string[];
}

export interface TechStep {
  step: number;
  title: string;
  subtitle: string;
  duration: string;
  equipment: string;
  standards: string;
  details: string;
}

export interface CartItem {
  id: string;
  product: MAFProduct;
  selectedRal: RALColor;
  quantity: number;
}

export interface EstimateItem {
  id: string;
  product: MAFProduct;
  quantity: number;
  customOptions?: {
    steelGrade?: string;
    finish?: string;
    mounting?: string;
    includeInstallation?: boolean;
    includeDelivery?: boolean;
  };
  addedAt: number;
}
