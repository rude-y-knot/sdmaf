import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SmartQuoteCalculator } from './components/SmartQuoteCalculator';
import { CatalogTeaser } from './components/CatalogTeaser';
import { MachineryAndTech } from './components/MachineryAndTech';
import { FAQSection } from './components/FAQSection';
import { FAQPage } from './pages/FAQPage';
import { B2BPartners } from './components/B2BPartners';
import { Footer } from './components/Footer';
import { SiteMeasurerModal } from './components/SiteMeasurerModal';
import { CatalogPage } from './pages/CatalogPage';
import { ProductionPage } from './pages/ProductionPage';
import { ProductionUnitDetailPage } from './pages/ProductionUnitDetailPage';
import { EngineeringBureauPage } from './pages/EngineeringBureauPage';
import { B2BTendersPage } from './pages/B2BTendersPage';
import { ContactsPage } from './pages/ContactsPage';
import { RequisitesPage } from './pages/RequisitesPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { PublicOfferPage } from './pages/PublicOfferPage';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { LegalPolicyModal } from './components/LegalPolicyModal';
import { EstimateProvider, useEstimate } from './context/EstimateContext';
import { ProductQuoteModal } from './components/ProductQuoteModal';
import { FloatingEstimateBubble } from './components/FloatingEstimateBubble';
import { BatchEstimateDrawer } from './components/BatchEstimateDrawer';
import { BitrixWebhookGuideModal } from './components/BitrixWebhookGuideModal';
import { SEOHead } from './components/SEOHead';

type PageType = 'home' | 'catalog' | 'production' | 'unit-detail' | 'b2b' | 'contacts' | 'faq' | 'requisites' | 'privacy' | 'offer';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 120);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return null;
}

function EstimateModals({
  onOpenPrivacy,
  onOpenOffer,
}: {
  onOpenPrivacy: () => void;
  onOpenOffer: () => void;
}) {
  const { calculatingProduct, setCalculatingProduct } = useEstimate();
  return (
    <>
      <ProductQuoteModal
        product={calculatingProduct}
        isOpen={!!calculatingProduct}
        onClose={() => setCalculatingProduct(null)}
        onOpenPrivacy={onOpenPrivacy}
        onOpenOffer={onOpenOffer}
      />
      <BatchEstimateDrawer 
        onOpenPrivacy={onOpenPrivacy}
        onOpenOffer={onOpenOffer}
      />
      <FloatingEstimateBubble />
    </>
  );
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Modals state
  const [isCalculatorModalOpen, setIsCalculatorModalOpen] = useState(false);
  const [isMeasurerModalOpen, setIsMeasurerModalOpen] = useState(false);
  const [isBitrixGuideOpen, setIsBitrixGuideOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'offer' | 'requisites' | null>(null);

  // Compute active page type for Header active states
  const getCurrentPageType = (): PageType => {
    const p = location.pathname.toLowerCase();
    if (p.startsWith('/catalog')) return 'catalog';
    if (
      p === '/laser' || 
      p.startsWith('/production') || 
      p === '/bending' || 
      p === '/rolling' || 
      p === '/coating' || 
      p === '/machining' || 
      p === '/welding' || 
      p === '/engineering' || 
      p === '/kb'
    ) {
      if (p === '/production') return 'production';
      return 'unit-detail';
    }
    if (p === '/b2b' || p === '/tenders') return 'b2b';
    if (p === '/contacts') return 'contacts';
    if (p === '/faq' || p === '/questions') return 'faq';
    if (p === '/requisites') return 'requisites';
    if (p === '/privacy') return 'privacy';
    if (p === '/offer') return 'offer';
    return 'home';
  };

  const currentPage = getCurrentPageType();

  const handleNavigatePage = (page: PageType, param?: string) => {
    if (page === 'home') {
      navigate('/');
    } else if (page === 'catalog') {
      if (param && param !== 'all') {
        navigate(`/catalog/${param}`);
      } else {
        navigate('/catalog');
      }
    } else if (page === 'production') {
      if (param) {
        navigate(`/production#${param}`);
        setTimeout(() => {
          const el = document.getElementById(param);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 120);
      } else {
        navigate('/production');
      }
    } else if (page === 'unit-detail') {
      if (param === 'engineering-bureau' || param === 'engineering' || param === 'kb') {
        navigate('/engineering');
      } else if (param === 'laser-22kw-6m' || param === 'laser') {
        navigate('/laser');
      } else if (param) {
        navigate(`/production/${param}`);
      } else {
        navigate('/production');
      }
    } else if (page === 'b2b') {
      navigate('/b2b');
    } else if (page === 'contacts') {
      navigate('/contacts');
    } else if (page === 'faq') {
      navigate('/faq');
    } else if (page === 'requisites') {
      navigate('/requisites');
    } else if (page === 'privacy') {
      navigate('/privacy');
    } else if (page === 'offer') {
      navigate('/offer');
    }
  };

  const handleOpenPrivacy = () => {
    setLegalModalType('privacy');
  };

  const handleOpenOffer = () => {
    setLegalModalType('offer');
  };

  const handleOpenRequisites = () => {
    setLegalModalType('requisites');
  };

  return (
    <EstimateProvider>
      <ScrollToTop />
      <div className="min-h-screen bg-white text-neutral-900 font-sans antialiased selection:bg-black selection:text-white flex flex-col">
        {/* Header */}
        <Header
          currentPage={currentPage}
          onNavigatePage={(p, param) => handleNavigatePage(p as PageType, param)}
          onOpenCalculator={() => {
            if (currentPage === 'home') {
              const el = document.getElementById('calculator');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
                return;
              }
            }
            setIsCalculatorModalOpen(true);
          }}
          onOpenMeasurerModal={() => setIsMeasurerModalOpen(true)}
          onNavigateSection={(sectionId) => {
            if (currentPage !== 'home') {
              navigate('/');
              setTimeout(() => {
                const el = document.getElementById(sectionId);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            } else {
              const el = document.getElementById(sectionId);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />

        {/* Main Content with React Router Routes */}
        <main className="flex-1">
          <Routes>
            {/* 1. Home Page */}
            <Route
              path="/"
              element={
                <>
                  <SEOHead
                    title="Стальное Дело — Завод металлоконструкций и МАФ | Санкт-Петербург, Колпино"
                    description="Производство металлоконструкций и малых архитектурных форм полного цикла в Санкт-Петербурге (Колпино). 4000+ м², ЧПУ станки, лазерный раскрой до 25 мм, гибка, порошковая покраска RAL."
                    keywords="завод металлоконструкций спб, производство маф санкт-петербург, лазерная резка металла колпино, гибка листового металла чпу, порошковая покраска спб ral"
                    canonicalPath="/"
                  />
                  {/* Hero Section */}
                  <Hero
                    onOpenCalculator={() => {
                      const el = document.getElementById('calculator');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    onOpenMeasurerModal={() => setIsMeasurerModalOpen(true)}
                    onNavigateToCatalog={() => navigate('/catalog')}
                    onNavigateToRoute={() => navigate('/production')}
                  />

                  {/* Smart Quote Calculator & Blueprint CAD Uploader */}
                  <SmartQuoteCalculator 
                    onOpenPrivacy={handleOpenPrivacy}
                    onOpenOffer={handleOpenOffer}
                  />

                  {/* MAF Catalog Teaser Section */}
                  <CatalogTeaser
                    onNavigateToCatalog={(category) => {
                      if (category && category !== 'all') {
                        navigate(`/catalog/${category}`);
                      } else {
                        navigate('/catalog');
                      }
                    }}
                  />

                  {/* Production Base Overview */}
                  <MachineryAndTech
                    onOpenCalculator={() => {
                      const el = document.getElementById('calculator');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    onNavigateToProduction={() => navigate('/production')}
                  />

                  {/* FAQ Knowledge Base Section */}
                  <FAQSection
                    onOpenCalculator={() => {
                      const el = document.getElementById('calculator');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                      else setIsCalculatorModalOpen(true);
                    }}
                    onOpenMeasurerModal={() => setIsMeasurerModalOpen(true)}
                    onNavigateToFAQ={() => navigate('/faq')}
                  />

                  {/* B2B Audiences & Logistics */}
                  <B2BPartners
                    onOpenCalculator={() => {
                      const el = document.getElementById('calculator');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    onOpenMeasurerModal={() => setIsMeasurerModalOpen(true)}
                  />
                </>
              }
            />

            {/* 2. Direct Laser Cutting Page URL (/laser as requested) */}
            <Route
              path="/laser"
              element={
                <ProductionUnitDetailPage
                  unitId="laser-22kw-6m"
                  onBackToProduction={() => navigate('/production')}
                  onBackToHome={() => navigate('/')}
                  onSelectUnit={(id) => {
                    if (id === 'laser-22kw-6m') navigate('/laser');
                    else navigate(`/production/${id}`);
                  }}
                  onOpenCalculator={() => setIsCalculatorModalOpen(true)}
                  onOpenMeasurerModal={() => setIsMeasurerModalOpen(true)}
                  onNavigateToCatalog={() => navigate('/catalog')}
                />
              }
            />

            {/* Direct machinery shortcuts */}
            <Route
              path="/engineering"
              element={
                <EngineeringBureauPage
                  onBackToProduction={() => navigate('/production')}
                  onBackToHome={() => navigate('/')}
                  onOpenCalculator={() => setIsCalculatorModalOpen(true)}
                  onOpenMeasurerModal={() => setIsMeasurerModalOpen(true)}
                  onNavigateToCatalog={() => navigate('/catalog')}
                  onSelectUnit={(id) => {
                    if (id === 'laser-22kw-6m' || id === 'laser') navigate('/laser');
                    else if (id === 'engineering-bureau' || id === 'engineering') navigate('/engineering');
                    else navigate(`/production/${id}`);
                  }}
                />
              }
            />
            <Route
              path="/kb"
              element={<Navigate to="/engineering" replace />}
            />
            <Route
              path="/production/engineering-bureau"
              element={<Navigate to="/engineering" replace />}
            />
            <Route
              path="/production/engineering"
              element={<Navigate to="/engineering" replace />}
            />
            <Route
              path="/bending"
              element={
                <ProductionUnitDetailPage
                  unitId="bending-250t"
                  onBackToProduction={() => navigate('/production')}
                  onBackToHome={() => navigate('/')}
                  onSelectUnit={(id) => navigate(`/production/${id}`)}
                  onOpenCalculator={() => setIsCalculatorModalOpen(true)}
                  onOpenMeasurerModal={() => setIsMeasurerModalOpen(true)}
                  onNavigateToCatalog={() => navigate('/catalog')}
                />
              }
            />
            <Route
              path="/rolling"
              element={
                <ProductionUnitDetailPage
                  unitId="rolling-faccin"
                  onBackToProduction={() => navigate('/production')}
                  onBackToHome={() => navigate('/')}
                  onSelectUnit={(id) => navigate(`/production/${id}`)}
                  onOpenCalculator={() => setIsCalculatorModalOpen(true)}
                  onOpenMeasurerModal={() => setIsMeasurerModalOpen(true)}
                  onNavigateToCatalog={() => navigate('/catalog')}
                />
              }
            />
            <Route
              path="/coating"
              element={
                <ProductionUnitDetailPage
                  unitId="coating-ral"
                  onBackToProduction={() => navigate('/production')}
                  onBackToHome={() => navigate('/')}
                  onSelectUnit={(id) => navigate(`/production/${id}`)}
                  onOpenCalculator={() => setIsCalculatorModalOpen(true)}
                  onOpenMeasurerModal={() => setIsMeasurerModalOpen(true)}
                  onNavigateToCatalog={() => navigate('/catalog')}
                />
              }
            />
            <Route
              path="/welding"
              element={
                <ProductionUnitDetailPage
                  unitId="welding-naks"
                  onBackToProduction={() => navigate('/production')}
                  onBackToHome={() => navigate('/')}
                  onSelectUnit={(id) => navigate(`/production/${id}`)}
                  onOpenCalculator={() => setIsCalculatorModalOpen(true)}
                  onOpenMeasurerModal={() => setIsMeasurerModalOpen(true)}
                  onNavigateToCatalog={() => navigate('/catalog')}
                />
              }
            />
            <Route
              path="/machining"
              element={<Navigate to="/production" replace />}
            />

            {/* 3. Production Overview & Sub-unit routes */}
            <Route
              path="/production"
              element={
                <ProductionPage
                  onBackToHome={() => navigate('/')}
                  onOpenCalculator={() => setIsCalculatorModalOpen(true)}
                  onOpenMeasurerModal={() => setIsMeasurerModalOpen(true)}
                  onNavigateToCatalog={() => navigate('/catalog')}
                  onSelectUnit={(unitId) => {
                    if (unitId === 'laser-22kw-6m' || unitId === 'laser') {
                      navigate('/laser');
                    } else if (unitId === 'engineering-bureau' || unitId === 'engineering') {
                      navigate('/engineering');
                    } else {
                      navigate(`/production/${unitId}`);
                    }
                  }}
                />
              }
            />
            <Route
              path="/production/:unitId"
              element={
                <ProductionUnitDetailPage
                  onBackToProduction={() => navigate('/production')}
                  onBackToHome={() => navigate('/')}
                  onSelectUnit={(unitId) => {
                    if (unitId === 'laser-22kw-6m' || unitId === 'laser') {
                      navigate('/laser');
                    } else if (unitId === 'engineering-bureau' || unitId === 'engineering') {
                      navigate('/engineering');
                    } else {
                      navigate(`/production/${unitId}`);
                    }
                  }}
                  onOpenCalculator={() => setIsCalculatorModalOpen(true)}
                  onOpenMeasurerModal={() => setIsMeasurerModalOpen(true)}
                  onNavigateToCatalog={() => navigate('/catalog')}
                />
              }
            />

            {/* 4. Catalog & Category routes */}
            <Route
              path="/catalog"
              element={
                <CatalogPage
                  onBackToHome={() => navigate('/')}
                  onOpenCalculator={() => setIsCalculatorModalOpen(true)}
                  onOpenMeasurerModal={() => setIsMeasurerModalOpen(true)}
                />
              }
            />
            <Route
              path="/catalog/:category"
              element={
                <CatalogPage
                  onBackToHome={() => navigate('/')}
                  onOpenCalculator={() => setIsCalculatorModalOpen(true)}
                  onOpenMeasurerModal={() => setIsMeasurerModalOpen(true)}
                />
              }
            />

            {/* Catalog category shortcuts */}
            <Route path="/slides" element={<Navigate to="/catalog/slides" replace />} />
            <Route path="/gorki" element={<Navigate to="/catalog/slides" replace />} />
            <Route path="/geon-slides" element={<Navigate to="/catalog/slides" replace />} />
            <Route path="/benches" element={<Navigate to="/catalog/furniture" replace />} />
            <Route path="/furniture" element={<Navigate to="/catalog/furniture" replace />} />
            <Route path="/mebel" element={<Navigate to="/catalog/furniture" replace />} />
            <Route path="/bike" element={<Navigate to="/catalog/bike" replace />} />
            <Route path="/bike-racks" element={<Navigate to="/catalog/bike" replace />} />
            <Route path="/veloparking" element={<Navigate to="/catalog/bike" replace />} />
            <Route path="/playgrounds" element={<Navigate to="/catalog/slides" replace />} />
            <Route path="/vats" element={<Navigate to="/catalog/vats" replace />} />
            <Route path="/chani" element={<Navigate to="/catalog/vats" replace />} />
            <Route path="/metal-structures" element={<Navigate to="/catalog/stainless" replace />} />
            <Route path="/stainless" element={<Navigate to="/catalog/stainless" replace />} />
            <Route path="/artobj" element={<Navigate to="/catalog/stainless" replace />} />
            <Route path="/suvenirs" element={<Navigate to="/catalog/suvenirs" replace />} />
            <Route path="/souvenirs" element={<Navigate to="/catalog/suvenirs" replace />} />
            <Route path="/pos" element={<Navigate to="/catalog/suvenirs" replace />} />
            <Route path="/signs" element={<Navigate to="/catalog/suvenirs" replace />} />
            <Route path="/merch" element={<Navigate to="/catalog/suvenirs" replace />} />
            <Route path="/vyveski" element={<Navigate to="/catalog/suvenirs" replace />} />

            {/* 5. B2B & Tenders */}
            <Route
              path="/b2b"
              element={
                <B2BTendersPage
                  onBackToHome={() => navigate('/')}
                  onOpenCalculator={() => setIsCalculatorModalOpen(true)}
                  onOpenMeasurerModal={() => setIsMeasurerModalOpen(true)}
                  onNavigateToCatalog={() => navigate('/catalog')}
                  onNavigateToProduction={() => navigate('/production')}
                  onNavigateToContacts={() => navigate('/contacts')}
                  onOpenPrivacy={handleOpenPrivacy}
                  onOpenOffer={handleOpenOffer}
                />
              }
            />
            <Route path="/tenders" element={<Navigate to="/b2b" replace />} />

            {/* 6. FAQ (Dedicated Page) and redirects */}
            <Route
              path="/faq"
              element={
                <FAQPage
                  onBackToHome={() => navigate('/')}
                  onOpenCalculator={(service) => {
                    setIsCalculatorModalOpen(true);
                  }}
                  onOpenMeasurerModal={() => setIsMeasurerModalOpen(true)}
                  onNavigateToCatalog={() => navigate('/catalog')}
                  onNavigateToProduction={() => navigate('/production')}
                  onNavigateToContacts={() => navigate('/contacts')}
                />
              }
            />
            <Route path="/questions" element={<Navigate to="/faq" replace />} />
            <Route path="/chasto-zadavaemye-voprosy" element={<Navigate to="/faq" replace />} />
            <Route path="/portfolio" element={<Navigate to="/faq" replace />} />
            <Route path="/projects" element={<Navigate to="/faq" replace />} />

            {/* 7. Contacts */}
            <Route
              path="/contacts"
              element={
                <ContactsPage
                  onBackToHome={() => navigate('/')}
                  onOpenCalculator={() => setIsCalculatorModalOpen(true)}
                  onOpenMeasurerModal={() => setIsMeasurerModalOpen(true)}
                  onNavigateToProduction={() => navigate('/production')}
                  onNavigateToPrivacy={() => navigate('/privacy')}
                  onNavigateToOffer={() => navigate('/offer')}
                  onNavigateToRequisites={() => navigate('/requisites')}
                  onOpenPrivacy={handleOpenPrivacy}
                  onOpenOffer={handleOpenOffer}
                />
              }
            />

            {/* 8. Requisites, Privacy, Offer */}
            <Route
              path="/requisites"
              element={
                <RequisitesPage
                  onBackToHome={() => navigate('/')}
                  onOpenPrivacy={() => navigate('/privacy')}
                  onOpenOffer={() => navigate('/offer')}
                />
              }
            />
            <Route
              path="/privacy"
              element={
                <PrivacyPolicyPage
                  onBackToHome={() => navigate('/')}
                  onOpenRequisites={() => navigate('/requisites')}
                  onOpenOffer={() => navigate('/offer')}
                />
              }
            />
            <Route
              path="/offer"
              element={
                <PublicOfferPage
                  onBackToHome={() => navigate('/')}
                  onOpenRequisites={() => navigate('/requisites')}
                  onOpenPrivacy={() => navigate('/privacy')}
                />
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer
          onOpenCalculator={() => {
            if (currentPage === 'home') {
              const el = document.getElementById('calculator');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
                return;
              }
            }
            setIsCalculatorModalOpen(true);
          }}
          onOpenMeasurer={() => setIsMeasurerModalOpen(true)}
          onNavigateToCatalog={(cat) => {
            if (cat && cat !== 'all') navigate(`/catalog/${cat}`);
            else navigate('/catalog');
          }}
          onNavigateToProduction={(unitId) => {
            if (unitId === 'laser-22kw-6m' || unitId === 'laser') {
              navigate('/laser');
            } else if (unitId) {
              navigate(`/production/${unitId}`);
            } else {
              navigate('/production');
            }
          }}
          onNavigateToLaser={() => navigate('/laser')}
          onNavigateToFAQ={() => handleNavigatePage('faq')}
          onNavigateToB2B={() => navigate('/b2b')}
          onNavigateToContacts={() => navigate('/contacts')}
          onNavigateHome={() => navigate('/')}
          onNavigateToPrivacy={() => navigate('/privacy')}
          onNavigateToOffer={() => navigate('/offer')}
          onNavigateToRequisites={() => navigate('/requisites')}
          onOpenPrivacyModal={handleOpenPrivacy}
          onOpenOfferModal={handleOpenOffer}
          onOpenBitrixGuide={() => setIsBitrixGuideOpen(true)}
        />

        {/* Bitrix24 CRM Webhook & Personalization Guide Modal */}
        <BitrixWebhookGuideModal
          isOpen={isBitrixGuideOpen}
          onClose={() => setIsBitrixGuideOpen(false)}
        />

        {/* Site Measurer Engineering Visit Modal */}
        <SiteMeasurerModal
          isOpen={isMeasurerModalOpen}
          onClose={() => setIsMeasurerModalOpen(false)}
          onOpenPrivacy={handleOpenPrivacy}
          onOpenOffer={handleOpenOffer}
        />

        {/* Calculator Modal if triggered from buttons outside of home calculator */}
        {isCalculatorModalOpen && (
          <SmartQuoteCalculator
            isOpenModal={true}
            onClose={() => setIsCalculatorModalOpen(false)}
            onOpenPrivacy={handleOpenPrivacy}
            onOpenOffer={handleOpenOffer}
          />
        )}

        {/* Slide / Product Specific Quote Modal, Batch Drawer, and Floating Bubble */}
        <EstimateModals 
          onOpenPrivacy={handleOpenPrivacy}
          onOpenOffer={handleOpenOffer}
        />

        {/* Legal Policy Quick View Modal */}
        <LegalPolicyModal
          type={legalModalType}
          onClose={() => setLegalModalType(null)}
          onOpenOther={(t) => setLegalModalType(t)}
          onNavigateToFullPage={(page) => {
            setLegalModalType(null);
            navigate(`/${page}`);
          }}
        />

        {/* 152-ФЗ Cookie Consent Banner */}
        <CookieConsentBanner 
          onOpenPrivacy={handleOpenPrivacy}
        />
      </div>
    </EstimateProvider>
  );
}
