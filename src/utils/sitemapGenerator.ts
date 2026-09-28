export interface SitemapRoute {
  path: string;
  name: string;
  category: 'Главные страницы' | 'Каталог продукции МАФ' | 'Производство и цеха' | 'B2B и сервисы' | 'Правовые документы';
  priority: number; // 0.1 to 1.0
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  lastmod: string; // YYYY-MM-DD
  description: string;
  images?: Array<{
    url: string;
    title: string;
    caption?: string;
  }>;
}

export const SITE_DOMAIN_DEFAULT = 'https://sdmaf.ru';

export const SITEMAP_ROUTES: SitemapRoute[] = [
  // 1. Главная страница
  {
    path: '/',
    name: 'Главная страница завода «Стальное Дело»',
    category: 'Главные страницы',
    priority: 1.0,
    changefreq: 'daily',
    lastmod: '2026-09-28',
    description: 'Официальный сайт завода металлоконструкций и малых архитектурных форм (МАФ) полного цикла в Санкт-Петербурге (Колпино).',
    images: [
      { url: '/images/laser.png', title: 'Лазерный раскрой металла Knoppo KF 3 кВт' },
      { url: '/images/engineering.png', title: 'Конструкторское бюро и 3D САПР' },
      { url: '/images/bending.png', title: 'Листогибочный пресс ЧПУ 250 тонн' }
    ]
  },

  // 2. Каталог и категории продукции МАФ
  {
    path: '/catalog',
    name: 'Каталог продукции МАФ и металлоизделий',
    category: 'Каталог продукции МАФ',
    priority: 0.95,
    changefreq: 'daily',
    lastmod: '2026-09-28',
    description: 'Полный каталог малых архитектурных форм: парковая мебель, горки, велопарковки, чаны, нержавеющие арт-объекты и мерч.',
  },
  {
    path: '/catalog/slides',
    name: 'Горки и винтовые спуски Geon для детских площадок',
    category: 'Каталог продукции МАФ',
    priority: 0.90,
    changefreq: 'weekly',
    lastmod: '2026-09-28',
    description: 'Детские трубные и открытые горки из нержавеющей стали AISI 304 по ТР ЕАЭС 042/2017 и ГОСТ Р 52169-2012.',
  },
  {
    path: '/catalog/furniture',
    name: 'Парковая мебель, скамейки и урны',
    category: 'Каталог продукции МАФ',
    priority: 0.90,
    changefreq: 'weekly',
    lastmod: '2026-09-28',
    description: 'Антивандальные уличные скамейки, парковые диваны, шезлонги и урны из стали и термодерева с порошковой покраской.',
  },
  {
    path: '/catalog/bike',
    name: 'Велопарковки, навесы и сервисные станции',
    category: 'Каталог продукции МАФ',
    priority: 0.85,
    changefreq: 'weekly',
    lastmod: '2026-09-28',
    description: 'Городские и дворовые велопарковки, крытые велобоксы, станции самообслуживания и ремонта двухколесного транспорта.',
  },
  {
    path: '/catalog/vats',
    name: 'Банные чаны и купели из пищевой нержавеющей стали',
    category: 'Каталог продукции МАФ',
    priority: 0.85,
    changefreq: 'weekly',
    lastmod: '2026-09-28',
    description: 'Премиальные банные чаны на дровах и электричестве из стали AISI 304/430 с отделкой алтайским кедром и лиственницей.',
  },
  {
    path: '/catalog/stainless',
    name: 'Нержавеющие металлоконструкции и арт-объекты',
    category: 'Каталог продукции МАФ',
    priority: 0.85,
    changefreq: 'weekly',
    lastmod: '2026-09-28',
    description: 'Индивидуальные архитектурные доминанты, световые стелы, перголы и скульптурные композиции из полированной нержавейки.',
  },
  {
    path: '/catalog/suvenirs',
    name: 'Мерч, сувениры и брендированные POS-материалы',
    category: 'Каталог продукции МАФ',
    priority: 0.80,
    changefreq: 'weekly',
    lastmod: '2026-09-28',
    description: 'Корпоративные металлические сувениры, брелоки, таблички, фасадные вывески и POS-конструкции прецизионного раскроя.',
  },

  // 3. Производственный комплекс и цеха
  {
    path: '/production',
    name: 'Производственный комплекс завода (Колпино)',
    category: 'Производство и цеха',
    priority: 0.95,
    changefreq: 'weekly',
    lastmod: '2026-09-28',
    description: 'Паспорт производственных мощностей завода «Стальное Дело» на территории Ижорского завода (4000+ м²).',
  },
  {
    path: '/laser',
    name: 'Лазерный раскрой металла Knoppo KF 3 кВт',
    category: 'Производство и цеха',
    priority: 0.95,
    changefreq: 'weekly',
    lastmod: '2026-09-28',
    description: 'Высокоскоростной оптоволоконный лазерный раскрой листового металла до 25 мм на столах 1500х3000 и 1500х6000 мм.',
    images: [
      { url: '/images/laser.png', title: 'Оптоволоконный лазерный станок Knoppo KF 3 кВт' }
    ]
  },
  {
    path: '/engineering',
    name: 'Конструкторское бюро (SolidWorks, КОМПАС-3D, Autodesk)',
    category: 'Производство и цеха',
    priority: 0.90,
    changefreq: 'weekly',
    lastmod: '2026-09-28',
    description: 'Разработка конструкторской документации (КМ, КМД), FEA расчеты на прочность, 3D параметрическое моделирование по ЕСКД.',
    images: [
      { url: '/images/engineering.png', title: 'Инженерное бюро и проектирование в CAD/BIM' }
    ]
  },
  {
    path: '/bending',
    name: 'Гибка листового металла на ЧПУ прессе 250 тонн',
    category: 'Производство и цеха',
    priority: 0.85,
    changefreq: 'monthly',
    lastmod: '2026-09-28',
    description: 'Прецизионная гибка листового проката длиной до 4000 мм с компенсацией прогиба Delem DA-53T.',
    images: [
      { url: '/images/bending.png', title: 'Гибочный пресс 250т с ЧПУ' }
    ]
  },
  {
    path: '/rolling',
    name: 'Вальцовка обечаек и конусов на 4-валковой машине Faccin',
    category: 'Производство и цеха',
    priority: 0.85,
    changefreq: 'monthly',
    lastmod: '2026-09-28',
    description: 'Гидравлическая вальцовка цилиндрических и конических обечаек из нержавеющей и конструкционной стали.',
    images: [
      { url: '/images/rolling.png', title: 'Вальцовочный станок Faccin 4HEL' }
    ]
  },
  {
    path: '/coating',
    name: 'Порошковая полимерная покраска RAL в камере 7 метров',
    category: 'Производство и цеха',
    priority: 0.85,
    changefreq: 'monthly',
    lastmod: '2026-09-28',
    description: 'Антикоррозийная порошковая окраска с цинконаполненным грунтованием и полимеризацией при 200 °C.',
    images: [
      { url: '/images/coating.png', title: 'Окрасочная камера порошковой полимеризации RAL' }
    ]
  },
  {
    path: '/welding',
    name: 'Сварочный участок и аттестация НАКС (TIG/MIG/MAG)',
    category: 'Производство и цеха',
    priority: 0.85,
    changefreq: 'monthly',
    lastmod: '2026-09-28',
    description: 'Аргонодуговая и полуавтоматическая сварка нержавеющей стали и тяжелых несущих металлоконструкций по ГОСТ.',
    images: [
      { url: '/images/welding.png', title: 'Сварочный пост НАКС EWM' }
    ]
  },
  {
    path: '/production/laser-22kw-6m',
    name: 'Паспорт оборудования: Лазерный комплекс Knoppo KF 3 кВт',
    category: 'Производство и цеха',
    priority: 0.80,
    changefreq: 'monthly',
    lastmod: '2026-09-28',
    description: 'Технические характеристики, разрезаемые толщины и режимы работы лазерного раскроя Knoppo.',
  },
  {
    path: '/production/bending-250t',
    name: 'Паспорт оборудования: Листогибочный пресс 250т / 4000мм',
    category: 'Производство и цеха',
    priority: 0.80,
    changefreq: 'monthly',
    lastmod: '2026-09-28',
    description: 'Технические характеристики и возможности гибки листовой стали, нержавейки и алюминия.',
  },
  {
    path: '/production/rolling-faccin',
    name: 'Паспорт оборудования: Вальцы листогибочные Faccin 4HEL',
    category: 'Производство и цеха',
    priority: 0.80,
    changefreq: 'monthly',
    lastmod: '2026-09-28',
    description: 'Параметры вальцовки обечаек банных чанов, трубных спусков и резервуаров.',
  },
  {
    path: '/production/coating-ral',
    name: 'Паспорт оборудования: Порошковый комплекс с печью 7м',
    category: 'Производство и цеха',
    priority: 0.80,
    changefreq: 'monthly',
    lastmod: '2026-09-28',
    description: 'Технология подготовки поверхности, фосфатирования, цинкового праймера и запекания порошка.',
  },
  {
    path: '/production/welding-naks',
    name: 'Паспорт оборудования: Сварочные аппараты EWM и посты НАКС',
    category: 'Производство и цеха',
    priority: 0.80,
    changefreq: 'monthly',
    lastmod: '2026-09-28',
    description: 'Технологические карты сварки, контроль неразрушающими методами (ВИК, УЗК).',
  },

  // 4. B2B, FAQ и Сервисы
  {
    path: '/b2b',
    name: 'B2B поставки, девелоперам и генподрядчикам (44-ФЗ / 223-ФЗ)',
    category: 'B2B и сервисы',
    priority: 0.90,
    changefreq: 'weekly',
    lastmod: '2026-09-28',
    description: 'Условия работы для застройщиков, архитекторов, благоустроителей и участников государственных тендеров.',
  },
  {
    path: '/faq',
    name: 'База знаний и частые вопросы заказчиков (FAQ)',
    category: 'B2B и сервисы',
    priority: 0.85,
    changefreq: 'weekly',
    lastmod: '2026-09-28',
    description: 'Ответы экспертов завода на вопросы по срокам, доставке, гарантии, сертификации ТР ЕАЭС 042 и форматам файлов.',
  },
  {
    path: '/contacts',
    name: 'Контакты завода и схема проезда в Колпино',
    category: 'B2B и сервисы',
    priority: 0.85,
    changefreq: 'monthly',
    lastmod: '2026-09-28',
    description: 'Телефоны служб завода, email отделов, адрес производства в Санкт-Петербурге (Колпино) и пропускной режим.',
  },

  // 5. Правовые документы и реквизиты
  {
    path: '/requisites',
    name: 'Реквизиты юридического лица ООО «Кадет СПб»',
    category: 'Правовые документы',
    priority: 0.70,
    changefreq: 'monthly',
    lastmod: '2026-09-28',
    description: 'Карточка предприятия, ИНН 7805305625, ОГРН, банковские счета и юридический адрес завода.',
  },
  {
    path: '/privacy',
    name: 'Политика конфиденциальности (152-ФЗ)',
    category: 'Правовые документы',
    priority: 0.50,
    changefreq: 'yearly',
    lastmod: '2026-09-28',
    description: 'Положение об обработке персональных данных клиентов и посетителей сайта в соответствии с 152-ФЗ РФ.',
  },
  {
    path: '/offer',
    name: 'Договор публичной оферты поставки и производства',
    category: 'Правовые документы',
    priority: 0.50,
    changefreq: 'yearly',
    lastmod: '2026-09-28',
    description: 'Условия изготовления, оплаты, приемки металлопродукции и гарантийных обязательств по ст. 437 ГК РФ.',
  },
];

/**
 * Returns clean absolute URL for a path and base origin
 */
export function getAbsoluteUrl(path: string, customOrigin?: string): string {
  let origin = customOrigin || (typeof window !== 'undefined' ? window.location.origin : SITE_DOMAIN_DEFAULT);
  // Ensure no trailing slash on origin
  origin = origin.replace(/\/+$/, '');
  
  if (path === '/') return `${origin}/`;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${origin}${cleanPath}`;
}

/**
 * Generates valid standard sitemap.xml string with XML declarations and image tags
 */
export function generateSitemapXml(customOrigin?: string): string {
  const routes = SITEMAP_ROUTES;
  
  const urlsXml = routes.map((route) => {
    const loc = getAbsoluteUrl(route.path, customOrigin);
    
    let imagesXml = '';
    if (route.images && route.images.length > 0) {
      imagesXml = route.images.map((img) => {
        const imgLoc = img.url.startsWith('http') ? img.url : getAbsoluteUrl(img.url, customOrigin);
        return `
    <image:image>
      <image:loc>${escapeXml(imgLoc)}</image:loc>
      <image:title>${escapeXml(img.title)}</image:title>
      ${img.caption ? `<image:caption>${escapeXml(img.caption)}</image:caption>` : ''}
    </image:image>`;
      }).join('');
    }

    return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(2)}</priority>${imagesXml}
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
        http://www.google.com/schemas/sitemap-image/1.1
        http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd">
${urlsXml}
</urlset>
`;
}

/**
 * Triggers client-side download of sitemap.xml file
 */
export function downloadSitemapFile(customOrigin?: string, filename = 'sitemap.xml'): void {
  if (typeof window === 'undefined') return;
  const xmlContent = generateSitemapXml(customOrigin);
  const blob = new Blob([xmlContent], { type: 'application/xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Copies sitemap XML to clipboard
 */
export async function copySitemapToClipboard(customOrigin?: string): Promise<boolean> {
  if (typeof navigator === 'undefined' || !navigator.clipboard) return false;
  try {
    const xmlContent = generateSitemapXml(customOrigin);
    await navigator.clipboard.writeText(xmlContent);
    return true;
  } catch (err) {
    console.error('Failed to copy sitemap XML to clipboard:', err);
    return false;
  }
}

/**
 * Helper to escape special XML characters
 */
function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}
