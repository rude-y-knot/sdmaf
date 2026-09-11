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
  mountingType: 'Анкерное к твердому основанию' | 'Бетонирование закладных стоек';
  priceBase: number; // RUB
  ralColors: RALColor[];
  defaultRal: string;
  imageRender: string;
  blueprintSvg: string;
  bimAvailable: boolean;
  cadFormats: string[];
  // Slide-specific attributes for geon.pro slides catalog & filters
  slideType?: 'open' | 'closed'; // 'open' = открытая, 'closed' = закрытая
  slideTypeLabel?: string;
  slideForm?: 'straight' | 'curved' | 'spiral'; // 'straight' = прямая, 'curved' = с изгибом, 'spiral' = спиральная
  slideFormLabel?: string;
  slideHeight?: number; // meters (h)
  slideLength?: number; // meters (L)
  slideAngle?: number; // turn degrees (0, 90, 180, 270, 360, 450)
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
