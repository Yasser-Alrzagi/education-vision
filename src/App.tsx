import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { ServicesProvider } from './context/ServicesContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { StoreSection } from './components/StoreSection';
import { HowItWorks } from './components/HowItWorks';
import { AboutUs } from './components/AboutUs';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { ContactUs } from './components/ContactUs';
import { Footer } from './components/Footer';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { MobileBottomNav } from './components/MobileBottomNav';
import { AdminApp } from './components/admin/AdminApp';

const MainContent: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const { selectedProductForDetails, setSelectedProductForDetails } = useCart();

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleExploreServices = () => {
    handleNavigate('services');
  };

  const handleExploreStore = () => {
    handleNavigate('store');
  };

  const handleSelectCategoryFromServices = (categoryId: string) => {
    setSelectedCategory(categoryId);
    handleNavigate('store');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#102235] flex flex-col font-sans overflow-x-hidden">
      {/* Top Sticky Header */}
      <Header onNavigate={handleNavigate} activeSection={activeSection} />

      {/* Main Content Sections with Scroll Margin Compensation */}
      <main className="flex-1 pb-16 md:pb-0">
        <Hero 
          onExploreServices={handleExploreServices} 
          onExploreStore={handleExploreStore} 
        />

        <ServicesSection 
          onViewAllServices={handleExploreStore}
          onSelectCategory={handleSelectCategoryFromServices}
        />

        <StoreSection 
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <HowItWorks />

        <TestimonialsSection />

        <AboutUs />

        <FAQSection />

        <ContactUs />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Modals and Overlays */}
      <ProductDetailsModal
        product={selectedProductForDetails}
        onClose={() => setSelectedProductForDetails(null)}
      />

      <CartDrawer />

      <CheckoutModal />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFloatingButton />

      {/* Mobile App-like Bottom Navigation Bar */}
      <MobileBottomNav 
        activeSection={activeSection} 
        onNavigate={handleNavigate} 
      />
    </div>
  );
};

const checkIsAdminRoute = (): boolean => {
  if (typeof window === 'undefined') return false;

  const path = (window.location.pathname || '').toLowerCase().trim();
  const hash = (window.location.hash || '').toLowerCase().trim();
  const search = (window.location.search || '').toLowerCase().trim();

  // Support /admin, /admin/, /admin/..., #/admin, #admin, ?admin
  const isPathAdmin = 
    path === '/admin' || 
    path.startsWith('/admin/') || 
    path.endsWith('/admin') ||
    path.includes('/admin');

  const isHashAdmin = 
    hash === '#admin' || 
    hash === '#/admin' || 
    hash.startsWith('#/admin') || 
    hash.startsWith('#admin');

  const isSearchAdmin = 
    search === '?admin' || 
    search.startsWith('?admin&') || 
    search.includes('route=admin') || 
    search.includes('page=admin');

  return isPathAdmin || isHashAdmin || isSearchAdmin;
};

export default function App() {
  const [isAdminRoute, setIsAdminRoute] = useState(checkIsAdminRoute);

  useEffect(() => {
    const updateRoute = () => {
      setIsAdminRoute(checkIsAdminRoute());
    };

    // Immediate check
    updateRoute();

    window.addEventListener('popstate', updateRoute);
    window.addEventListener('hashchange', updateRoute);

    // Intercept pushState and replaceState so programmatic navigation updates route
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function (...args) {
      const result = originalPushState.apply(this, args);
      updateRoute();
      return result;
    };

    window.history.replaceState = function (...args) {
      const result = originalReplaceState.apply(this, args);
      updateRoute();
      return result;
    };

    return () => {
      window.removeEventListener('popstate', updateRoute);
      window.removeEventListener('hashchange', updateRoute);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, []);

  const handleBackToPublicSite = () => {
    window.history.pushState({}, '', '/');
    setIsAdminRoute(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ServicesProvider>
      <CartProvider>
        {isAdminRoute ? (
          <AdminApp onBackToSite={handleBackToPublicSite} />
        ) : (
          <MainContent />
        )}
      </CartProvider>
    </ServicesProvider>
  );
}
