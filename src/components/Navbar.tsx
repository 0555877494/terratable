import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ShoppingBag, User, Menu, X, LogOut, Home, Package, Truck, Shield, Heart, Sun, Moon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useStore } from '../contexts/StoreContext';
import { useTheme } from '../contexts/ThemeContext';
import Logo from './Logo';
import LanguageCurrencySwitcher from './LanguageCurrencySwitcher';
import NotificationCenter from './NotificationCenter';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useStore();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenu(false);
    setUserMenu(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setUserMenu(false);
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'admin': return '/admin';
      case 'delivery': return '/delivery';
      default: return '/customer';
    }
  };

  const getRoleBadge = () => {
    if (!user) return null;
    switch (user.role) {
      case 'admin': return { icon: <Shield className="w-3 h-3" />, color: 'bg-rose-100 text-rose-700' };
      case 'delivery': return { icon: <Truck className="w-3 h-3" />, color: 'bg-emerald-100 text-emerald-700' };
      default: return { icon: <User className="w-3 h-3" />, color: 'bg-amber-100 text-amber-700' };
    }
  };

  const badge = getRoleBadge();

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass shadow-2xl shadow-stone-900/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-12">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-1.5 group">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="relative"
              >
                <Logo className="w-7 h-7" />
              </motion.div>
              <div className="hidden sm:block">
                <span className="font-serif text-lg font-bold text-stone-800">
                  Terra & Table
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-0.5">
              <Link
                to="/"
                className="px-2 py-1 rounded-full text-xs font-semibold text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-all"
              >
                Shop
              </Link>
              <Link
                to="/about"
                className="px-2 py-1 rounded-full text-xs font-semibold text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-all"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="px-2 py-1 rounded-full text-xs font-semibold text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-all"
              >
                Contact
              </Link>
              <Link
                to="/gift-cards"
                className="px-2 py-1 rounded-full text-xs font-semibold text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-all"
              >
                Gift Cards
              </Link>
              <Link
                to="/subscriptions"
                className="px-2 py-1 rounded-full text-xs font-semibold text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-all"
              >
                Subscriptions
              </Link>
              <Link
                to="/blog"
                className="px-2 py-1 rounded-full text-xs font-semibold text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-all"
              >
                Recipes
              </Link>
              <Link
                to="/loyalty"
                className="px-2 py-1 rounded-full text-xs font-semibold text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-all"
              >
                Rewards
              </Link>
              <Link
                to="/bundles"
                className="px-2 py-1 rounded-full text-xs font-semibold text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-all"
              >
                Bundles
              </Link>
              <Link
                to="/promo-codes"
                className="px-2 py-1 rounded-full text-xs font-semibold text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-all"
              >
                Deals
              </Link>
              <Link
                to="/gift-finder"
                className="px-2 py-1 rounded-full text-xs font-semibold text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-all"
              >
                Gift Finder
              </Link>

              {user ? (
                <div className="relative ml-1">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setUserMenu(!userMenu)}
                    className="flex items-center gap-1.5 pl-1 pr-2 py-1 rounded-full bg-white border border-stone-200 hover:border-amber-300 hover:shadow transition-all"
                  >
                    <div className="w-6 h-6 gradient-bg rounded-full flex items-center justify-center">
                      <span className="text-white text-[10px] font-bold">{user.name[0]}</span>
                    </div>
                    <span className="text-xs font-semibold text-stone-800">{user.name.split(' ')[0]}</span>
                    {badge && (
                      <span className={`flex items-center gap-0.5 px-1 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wide ${badge.color}`}>
                        {badge.icon} {user.role}
                      </span>
                    )}
                  </motion.button>

                  <AnimatePresence>
                    {userMenu && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setUserMenu(false)} />
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border-2 border-stone-100 py-3 z-50 overflow-hidden"
                        >
                          <div className="px-5 py-4 border-b border-stone-100">
                            <p className="text-base font-bold text-stone-800">{user.name}</p>
                            <p className="text-sm text-stone-500">{user.email}</p>
                          </div>
                          <Link
                            to={getDashboardLink()}
                            onClick={() => setUserMenu(false)}
                            className="flex items-center gap-3 px-5 py-3 text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
                          >
                            <Package className="w-4 h-4" /> Dashboard
                          </Link>
                          <Link
                            to="/my-account"
                            onClick={() => setUserMenu(false)}
                            className="flex items-center gap-3 px-5 py-3 text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
                          >
                            <User className="w-4 h-4" /> My Account
                          </Link>
                          <Link
                            to="/order-history"
                            onClick={() => setUserMenu(false)}
                            className="flex items-center gap-3 px-5 py-3 text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
                          >
                            <ShoppingBag className="w-4 h-4" /> Order History
                          </Link>
                          <Link
                            to="/wishlist"
                            onClick={() => setUserMenu(false)}
                            className="flex items-center gap-3 px-5 py-3 text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
                          >
                            <Heart className="w-4 h-4" /> Wishlist
                          </Link>
                          <Link
                            to="/account-settings"
                            onClick={() => setUserMenu(false)}
                            className="flex items-center gap-3 px-5 py-3 text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
                          >
                            <Shield className="w-4 h-4" /> Settings
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-5 py-3 text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                          >
                            <LogOut className="w-4 h-4" /> Sign Out
                          </button>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-3 ml-3">
                  <Link
                    to="/login"
                    className="px-5 py-2.5 text-stone-700 font-bold hover:text-stone-900 transition-colors text-sm"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-6 py-2.5 gradient-bg text-white rounded-full text-sm font-bold shadow-lg shadow-amber-500/30 hover:shadow-xl transition-all hover:-translate-y-0.5"
                  >
                    Join Free
                  </Link>
                </div>
              )}

              {/* Dark Mode Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="relative ml-1 p-1.5 rounded-full bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:border-amber-300 hover:shadow transition-all"
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? (
                  <Moon className="w-3.5 h-3.5 text-stone-700" />
                ) : (
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                )}
              </motion.button>

              {/* Language & Currency Switcher */}
              <div className="ml-1">
                <LanguageCurrencySwitcher />
              </div>

              {/* Notification Center */}
              <div className="ml-1">
                <NotificationCenter />
              </div>

              {/* Wishlist */}
              <Link to="/wishlist" className="relative ml-1">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative p-1.5 rounded-full bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:border-rose-300 hover:shadow transition-all"
                >
                  <Heart className="w-3.5 h-3.5 text-rose-500" />
                </motion.div>
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative ml-1">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative p-1.5 rounded-full bg-white border border-stone-200 hover:border-amber-300 hover:shadow transition-all"
                >
                  <ShoppingCart className="w-3.5 h-3.5 text-stone-700" />
                  <AnimatePresence>
                    {cartCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-0.5 -right-0.5 w-4 h-4 gradient-bg text-white text-[9px] font-bold rounded-full flex items-center justify-center"
                      >
                        {cartCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            </div>

            {/* Mobile buttons */}
            <div className="flex md:hidden items-center gap-1.5">
              <Link to="/cart" className="relative p-1.5 rounded-full bg-white border border-stone-200">
                <ShoppingCart className="w-4 h-4 text-stone-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 gradient-bg text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className="p-1.5 rounded-full bg-white border border-stone-200"
              >
                {mobileMenu ? <X className="w-4 h-4 text-stone-700" /> : <Menu className="w-4 h-4 text-stone-700" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[48px] z-40 glass border-b border-stone-200 shadow-2xl md:hidden"
          >
            <div className="px-4 py-6 space-y-2">
              <Link to="/" className="block py-3 px-4 rounded-xl text-stone-700 font-bold hover:bg-stone-50">
                Shop
              </Link>
              <Link to="/about" className="block py-3 px-4 rounded-xl text-stone-700 font-bold hover:bg-stone-50">
                About
              </Link>
              <Link to="/contact" className="block py-3 px-4 rounded-xl text-stone-700 font-bold hover:bg-stone-50">
                Contact
              </Link>
              {user ? (
                <>
                  <Link to={getDashboardLink()} className="block py-3 px-4 rounded-xl text-stone-700 font-bold hover:bg-stone-50">
                    Dashboard
                  </Link>
                  <button onClick={handleLogout} className="block w-full text-left py-3 px-4 rounded-xl text-rose-600 font-bold hover:bg-rose-50">
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block py-3 px-4 rounded-xl text-stone-700 font-bold hover:bg-stone-50">
                    Sign In
                  </Link>
                  <Link to="/signup" className="block py-3 px-4 rounded-xl gradient-bg text-white font-bold text-center">
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
