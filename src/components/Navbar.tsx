import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, User, Menu, X, LogOut, Home, Package, Truck, Shield, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useStore } from '../contexts/StoreContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useStore();
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
      case 'admin': return { icon: <Shield className="w-3 h-3" />, color: 'bg-wine-100 text-wine-700' };
      case 'delivery': return { icon: <Truck className="w-3 h-3" />, color: 'bg-sage-100 text-sage-700' };
      default: return { icon: <User className="w-3 h-3" />, color: 'bg-terra-100 text-terra-700' };
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
            ? 'glass border-b border-white/30 shadow-lg shadow-terra-900/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18 py-3">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="relative w-10 h-10 bg-gradient-to-br from-terra-500 via-terra-600 to-wine-700 rounded-xl flex items-center justify-center shadow-lg shadow-terra-500/30"
              >
                <Sparkles className="w-5 h-5 text-white" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
              </motion.div>
              <div className="hidden sm:block">
                <span className="font-serif text-xl font-bold bg-gradient-to-r from-terra-800 to-wine-800 bg-clip-text text-transparent">
                  Terra & Table
                </span>
                <span className="block text-[10px] text-terra-500 -mt-0.5 tracking-wider uppercase">Artisan Marketplace</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-2">
              <Link
                to="/"
                className="px-4 py-2 rounded-full text-sm font-medium text-terra-700 hover:bg-terra-50 hover:text-terra-900 transition-all"
              >
                Shop
              </Link>

              {user ? (
                <div className="relative ml-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setUserMenu(!userMenu)}
                    className="flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-full bg-white/80 border border-terra-100 hover:border-terra-200 hover:shadow-md transition-all"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-terra-400 to-wine-500 rounded-full flex items-center justify-center shadow-sm">
                      <span className="text-white text-xs font-bold">{user.name[0]}</span>
                    </div>
                    <span className="text-sm font-medium text-terra-800">{user.name.split(' ')[0]}</span>
                    {badge && (
                      <span className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wide ${badge.color}`}>
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
                          className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-terra-100 py-2 z-50 overflow-hidden"
                        >
                          <div className="px-4 py-3 border-b border-terra-50">
                            <p className="text-sm font-semibold text-terra-800">{user.name}</p>
                            <p className="text-xs text-terra-500">{user.email}</p>
                          </div>
                          <Link
                            to={getDashboardLink()}
                            onClick={() => setUserMenu(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-terra-700 hover:bg-terra-50 transition-colors"
                          >
                            <Package className="w-4 h-4" /> Dashboard
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="w-4 h-4" /> Sign Out
                          </button>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-2 ml-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-terra-700 font-medium hover:text-terra-900 transition-colors text-sm"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-5 py-2.5 bg-gradient-to-r from-terra-600 to-wine-600 text-white rounded-full text-sm font-medium hover:shadow-lg hover:shadow-terra-500/25 transition-all hover:-translate-y-0.5"
                  >
                    Join Free
                  </Link>
                </div>
              )}

              {/* Cart */}
              <Link to="/cart" className="relative ml-2">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative p-2.5 rounded-full bg-white/80 border border-terra-100 hover:border-terra-200 hover:shadow-md transition-all"
                >
                  <ShoppingCart className="w-5 h-5 text-terra-700" />
                  <AnimatePresence>
                    {cartCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gradient-to-br from-wine-500 to-wine-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-wine-500/30"
                      >
                        {cartCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            </div>

            {/* Mobile buttons */}
            <div className="flex md:hidden items-center gap-2">
              <Link to="/cart" className="relative p-2.5 rounded-full bg-white/80 border border-terra-100">
                <ShoppingCart className="w-5 h-5 text-terra-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-wine-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className="p-2.5 rounded-full bg-white/80 border border-terra-100"
              >
                {mobileMenu ? <X className="w-5 h-5 text-terra-700" /> : <Menu className="w-5 h-5 text-terra-700" />}
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
            className="fixed inset-x-0 top-[72px] z-40 glass border-b border-white/30 shadow-xl md:hidden"
          >
            <div className="px-4 py-6 space-y-2">
              <Link to="/" className="block py-3 px-4 rounded-xl text-terra-700 font-medium hover:bg-terra-50">
                Shop
              </Link>
              {user ? (
                <>
                  <Link to={getDashboardLink()} className="block py-3 px-4 rounded-xl text-terra-700 font-medium hover:bg-terra-50">
                    Dashboard
                  </Link>
                  <button onClick={handleLogout} className="block w-full text-left py-3 px-4 rounded-xl text-red-600 font-medium hover:bg-red-50">
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block py-3 px-4 rounded-xl text-terra-700 font-medium hover:bg-terra-50">
                    Sign In
                  </Link>
                  <Link to="/signup" className="block py-3 px-4 rounded-xl bg-gradient-to-r from-terra-600 to-wine-600 text-white font-medium text-center">
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
