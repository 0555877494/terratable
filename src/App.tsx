import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { StoreProvider } from './contexts/StoreContext';
import { ToastProvider } from './contexts/ToastContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { I18nProvider } from './contexts/I18nContext';
import Navbar from './components/Navbar';
import BackToTop from './components/BackToTop';
import AnnouncementBanner from './components/AnnouncementBanner';
import LiveChat from './components/LiveChat';
import FlashSale from './components/FlashSale';
import MobileBottomNav from './components/MobileBottomNav';
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
  return (
    <div className="min-h-screen bg-cream-50 dark:bg-stone-900 transition-colors">
      <AnnouncementBanner />
      <FlashSale />
      <Navbar />
      <BackToTop />
      <LiveChat />
      <MobileBottomNav />
      <main className="pt-[72px] pb-20 md:pb-0">
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
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
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
    </div>
  );
}

export default function App() {
  return (
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
  );
}
