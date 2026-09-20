import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { StoreProvider } from './contexts/StoreContext';
import { ToastProvider } from './contexts/ToastContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { I18nProvider } from './contexts/I18nContext';
import Navbar from './components/Navbar';
import AnnouncementBanner from './components/AnnouncementBanner';
import FlashSale from './components/FlashSale';
import MobileBottomNav from './components/MobileBottomNav';
import TestimonialsCarousel from './components/TestimonialsCarousel';
import PriceDropAlerts from './components/PriceDropAlerts';
import UnifiedFAB from './components/UnifiedFAB';
import ExitIntentPopup from './components/ExitIntentPopup';
import CookieConsent from './components/CookieConsent';
import Breadcrumbs from './components/Breadcrumbs';
import LoadingScreen from './components/LoadingScreen';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import RecentlyViewed from './components/RecentlyViewed';
import WhatsNewModal from './components/WhatsNewModal';
import KeyboardShortcutsModal from './components/KeyboardShortcutsModal';
import LiveChatModal from './components/LiveChatModal';
import OnboardingModal from './components/OnboardingModal';
import OrderStatusWidget from './components/OrderStatusWidget';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import AbandonedCartRecovery from './components/AbandonedCartRecovery';
import AdvancedAnalytics from './components/AdvancedAnalytics';
import CustomerSegmentation from './components/CustomerSegmentation';
import { registerServiceWorker, requestNotificationPermission } from './lib/serviceWorker';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import GiftCards from './pages/GiftCards';
import Subscriptions from './pages/Subscriptions';
import OrderTracking from './pages/OrderTracking';
import ReferralProgram from './pages/ReferralProgram';
import Blog from './pages/Blog';
import AddressBook from './pages/AddressBook';
import LoyaltyProgram from './pages/LoyaltyProgram';
import ProductBundles from './pages/ProductBundles';
import MyAccount from './pages/MyAccount';
import OrderSuccess from './pages/OrderSuccess';
import OrderHistory from './pages/OrderHistory';
import CustomerSupport from './pages/CustomerSupport';
import AccountSettings from './pages/AccountSettings';
import Newsletter from './pages/Newsletter';
import PromoCodes from './pages/PromoCodes';
import ReturnRequest from './pages/ReturnRequest';
import ProducerStories from './pages/ProducerStories';
import GiftFinder from './pages/GiftFinder';
import ProductDetail from './pages/ProductDetail';
import SearchResults from './pages/SearchResults';
import FAQ from './pages/FAQ';
import PublicOrderTracking from './pages/PublicOrderTracking';
import TermsPrivacy from './pages/TermsPrivacy';
import CustomerDashboard from './pages/CustomerDashboard';
import DeliveryDashboard from './pages/DeliveryDashboard';
import AdminDashboard from './pages/AdminDashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import { UserRole } from './types';

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: UserRole[] }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role)) {
    switch (user.role) {
      case 'admin': return <Navigate to="/admin" replace />;
      case 'delivery': return <Navigate to="/delivery" replace />;
      default: return <Navigate to="/customer" replace />;
    }
  }
  return <>{children}</>;
}

function AppRoutes() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showKeyboardModal, setShowKeyboardModal] = useState(false);
  const [showWhatsNewModal, setShowWhatsNewModal] = useState(false);
  const [showLiveChatModal, setShowLiveChatModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    
    // Register service worker for PWA
    registerServiceWorker();
    requestNotificationPermission();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-stone-900 transition-colors">
      <LoadingScreen />
      <ScrollToTop />
      <AnnouncementBanner />
      <FlashSale />
      <Navbar />
      <MobileBottomNav />
      <PriceDropAlerts />
      <ExitIntentPopup />
      <CookieConsent />
      
      {/* Unified FAB - All actions in one button */}
      <UnifiedFAB
        showBackToTop={showBackToTop}
        onBackToTop={scrollToTop}
        onKeyboardShortcuts={() => setShowKeyboardModal(true)}
        onWhatsNew={() => setShowWhatsNewModal(true)}
        onLiveChat={() => setShowLiveChatModal(true)}
      />

      {/* Modals */}
      <KeyboardShortcutsModal 
        isOpen={showKeyboardModal} 
        onClose={() => setShowKeyboardModal(false)} 
      />
      <WhatsNewModal 
        isOpen={showWhatsNewModal} 
        onClose={() => setShowWhatsNewModal(false)} 
      />
      <LiveChatModal 
        isOpen={showLiveChatModal} 
        onClose={() => setShowLiveChatModal(false)} 
      />
      <OnboardingModal />
      <OrderStatusWidget />
      <PWAInstallPrompt />
      <AbandonedCartRecovery />

      <main className="pt-[48px] pb-12 md:pb-0">
        <Breadcrumbs />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/gift-cards" element={<GiftCards />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/order-tracking" element={<OrderTracking />} />
          <Route path="/referral" element={<ReferralProgram />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/addresses" element={<AddressBook />} />
          <Route path="/loyalty" element={<LoyaltyProgram />} />
          <Route path="/bundles" element={<ProductBundles />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/support" element={<CustomerSupport />} />
          <Route path="/account-settings" element={<AccountSettings />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/promo-codes" element={<PromoCodes />} />
          <Route path="/return-request" element={<ReturnRequest />} />
          <Route path="/producers" element={<ProducerStories />} />
          <Route path="/gift-finder" element={<GiftFinder />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/track-order" element={<PublicOrderTracking />} />
          <Route path="/terms" element={<TermsPrivacy />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/analytics" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdvancedAnalytics />
            </ProtectedRoute>
          } />
          <Route path="/customer-segments" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <CustomerSegmentation />
            </ProtectedRoute>
          } />
          <Route path="/customer" element={
            <ProtectedRoute allowedRoles={['customer']}>
              <CustomerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/delivery" element={
            <ProtectedRoute allowedRoles={['delivery']}>
              <DeliveryDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <RecentlyViewed />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <I18nProvider>
          <ThemeProvider>
            <AuthProvider>
              <ToastProvider>
                <StoreProvider>
                  <AppRoutes />
                </StoreProvider>
              </ToastProvider>
            </AuthProvider>
          </ThemeProvider>
        </I18nProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
