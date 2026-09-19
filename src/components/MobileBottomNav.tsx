import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Home, Package, Heart, User, ShoppingBag } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { useAuth } from '../contexts/AuthContext';

export default function MobileBottomNav() {
  const location = useLocation();
  const { cartCount } = useStore();
  const { user } = useAuth();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/search', icon: ShoppingBag, label: 'Shop' },
    { path: '/wishlist', icon: Heart, label: 'Wishlist' },
    { path: '/cart', icon: Package, label: 'Cart', badge: cartCount },
    { path: user ? '/my-account' : '/login', icon: User, label: 'Account' }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-700 shadow-lg z-40">
      <div className="flex items-center justify-around py-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className="relative flex flex-col items-center gap-0 px-2 py-1"
            >
              <div className="relative">
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className={`p-1 rounded-md transition-colors ${
                    isActive
                      ? 'bg-amber-100 dark:bg-amber-900/30'
                      : 'hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-stone-600 dark:text-stone-400'
                    }`}
                  />
                </motion.div>
                
                {/* Badge */}
                {item.badge && item.badge > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-0 right-0 w-3.5 h-3.5 bg-rose-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center border border-white"
                  >
                    {item.badge}
                  </motion.div>
                )}
              </div>
              
              <span className={`text-[10px] font-semibold ${
                isActive
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-stone-600 dark:text-stone-400'
              }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
