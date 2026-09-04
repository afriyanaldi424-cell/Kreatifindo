import React from 'react';
import { AppProvider, useApp } from './context/AppContext';

// Public Pages
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { QuotationPage } from './pages/QuotationPage';
import { CustomerServicePage } from './pages/CustomerServicePage';
import { ContactPage } from './pages/ContactPage';
import { CustomerPortalPage } from './pages/CustomerPortalPage';

// Admin CMS Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminLayout } from './pages/admin/AdminLayout';

// Common Global Modals & Drawers
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { EstimateDrawer } from './components/common/EstimateDrawer';
import { ComparisonModal } from './components/common/ComparisonModal';
import { QuickViewModal } from './components/common/QuickViewModal';
import { CSTicketWidget } from './components/common/CSTicketWidget';
import { ToastContainer } from './components/common/ToastContainer';

const AppContent: React.FC = () => {
  const { currentRoute, currentAdminUser } = useApp();

  // Admin routes handling
  const isAdminRoute = currentRoute.startsWith('#/admin');

  if (isAdminRoute) {
    if (currentRoute === '#/admin/login') {
      return (
        <>
          <AdminLoginPage />
          <ToastContainer />
        </>
      );
    }

    // Protect all other admin routes
    if (!currentAdminUser) {
      return (
        <>
          <AdminLoginPage />
          <ToastContainer />
        </>
      );
    }

    return (
      <>
        <AdminLayout />
        <ToastContainer />
      </>
    );
  }

  // Public Routes Resolver
  const renderPublicPage = () => {
    const cleanRoute = (currentRoute || window.location.hash || '#/').split('?')[0];

    if (cleanRoute.startsWith('#/produk/')) {
      const slug = cleanRoute.replace('#/produk/', '');
      return <ProductDetailPage productSlug={slug} />;
    }

    switch (cleanRoute) {
      case '#/':
      case '#':
      case '':
        return <HomePage />;
      case '#/katalog':
        return <CatalogPage />;
      case '#/proyek':
      case '#/project':
        return <ProjectsPage />;
      case '#/layanan':
        return <ServicesPage />;
      case '#/tentang':
      case '#/tentang-kami':
        return <AboutPage />;
      case '#/penawaran':
        return <QuotationPage />;
      case '#/layanan-pelanggan':
      case '#/customer-service':
      case '#/cs':
        return <CustomerServicePage />;
      case '#/kontak':
        return <ContactPage />;
      case '#/portal-pelanggan':
      case '#/portal':
        return <CustomerPortalPage />;
      default:
        // Fallback for sub-routes or unknown hashes
        if (cleanRoute.startsWith('#/katalog')) return <CatalogPage />;
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9] text-[#1A1A1A] font-sans antialiased selection:bg-[#B88E2F] selection:text-white">
      {/* Public Sticky Navigation */}
      <Navbar />

      {/* Main Page Body */}
      <main className="flex-1 w-full">{renderPublicPage()}</main>

      {/* Public Editorial Footer */}
      <Footer />

      {/* Global Interactive Overlays */}
      <EstimateDrawer />
      <ComparisonModal />
      <QuickViewModal />
      <CSTicketWidget />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
