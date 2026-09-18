import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, User, Menu, X, LogOut, Home, Package, Truck, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useStore } from '../contexts/StoreContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useStore();
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [userMenu, setUserMenu] = useState(false);

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

  const getRoleIcon = () => {
    if (!user) return null;
    switch (user.role) {
      case 'admin': return <Shield className="w-3 h-3" />;
      case 'delivery': return <Truck className="w-3 h-3" />;
      default: return <User className="w-3 h-3" />;
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-terra-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-terra-500 to-terra-700 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="font-serif text-xl font-bold text-terra-900">Terra & Table</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-terra-700 hover:text-terra-900 transition-colors font-medium flex items-center gap-1">
              <Home className="w-4 h-4" /> Shop
            </Link>
            
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenu(!userMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-full bg-terra-50 hover:bg-terra-100 transition-colors"
                >
                  <div className="w-7 h-7 bg-terra-200 rounded-full flex items-center justify-center">
                    <span className="text-terra-800 text-xs font-bold">{user.name[0]}</span>
                  </div>
                  <span className="text-sm font-medium text-terra-800">{user.name.split(' ')[0]}</span>
                  <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-terra-200 rounded-full text-[10px] text-terra-800 capitalize">
                    {getRoleIcon()} {user.role}
                  </span>
                </button>

                <AnimatePresence>
                  {userMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-terra-100 py-2"
                    >
                      <Link
                        to={getDashboardLink()}
                        onClick={() => setUserMenu(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-terra-700 hover:bg-terra-50"
                      >
                        <Package className="w-4 h-4" /> Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-terra-700 hover:text-terra-900 font-medium transition-colors">
                  Sign In
                </Link>
                <Link to="/signup" className="px-4 py-2 bg-terra-600 text-white rounded-full text-sm font-medium hover:bg-terra-700 transition-colors shadow-sm">
                  Join Us
                </Link>
              </div>
            )}

            {/* Cart */}
            <Link to="/cart" className="relative p-2 rounded-full hover:bg-terra-50 transition-colors">
              <ShoppingCart className="w-5 h-5 text-terra-700" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-terra-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>
          </div>

          {/* Mobile buttons */}
          <div className="flex md:hidden items-center gap-3">
            <Link to="/cart" className="relative p-2">
              <ShoppingCart className="w-5 h-5 text-terra-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-terra-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="p-2">
              {mobileMenu ? <X className="w-5 h-5 text-terra-700" /> : <Menu className="w-5 h-5 text-terra-700" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-terra-100 bg-white overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              <Link to="/" onClick={() => setMobileMenu(false)} className="block py-2 text-terra-700 font-medium">
                Shop
              </Link>
              {user ? (
                <>
                  <Link to={getDashboardLink()} onClick={() => setMobileMenu(false)} className="block py-2 text-terra-700 font-medium">
                    Dashboard
                  </Link>
                  <button onClick={() => { handleLogout(); setMobileMenu(false); }} className="block py-2 text-red-600 font-medium text-left">
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileMenu(false)} className="block py-2 text-terra-700 font-medium">
                    Sign In
                  </Link>
                  <Link to="/signup" onClick={() => setMobileMenu(false)} className="block py-2 text-terra-600 font-medium">
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
