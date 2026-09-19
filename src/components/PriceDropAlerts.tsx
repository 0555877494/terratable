import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, TrendingDown, X, ShoppingBag } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { useToast } from '../contexts/ToastContext';

export default function PriceDropAlerts() {
  const { wishlist, products } = useStore();
  const { showToast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const [priceDrops, setPriceDrops] = useState<any[]>([]);

  useEffect(() => {
    // Simulate checking for price drops on wishlist items
    const wishlistProducts = products.filter(p => wishlist.includes(p.id));
    
    // Simulate some items having price drops (for demo)
    const drops = wishlistProducts
      .filter((_, index) => index % 3 === 0) // Every 3rd item has a drop
      .map(p => ({
        ...p,
        originalPrice: p.price * 1.2, // Simulate 20% higher original price
        dropPercentage: 20
      }));

    if (drops.length > 0) {
      setPriceDrops(drops);
      setTimeout(() => setIsVisible(true), 3000); // Show after 3 seconds
    }
  }, [wishlist, products]);

  const handleDismiss = () => {
    setIsVisible(false);
    showToast('info', 'Price alerts dismissed');
  };

  if (!isVisible || priceDrops.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        className="fixed top-24 right-4 z-40 max-w-sm"
      >
        <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-2xl border-2 border-amber-300 dark:border-amber-600 overflow-hidden">
          {/* Header */}
          <div className="gradient-bg p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Bell className="w-6 h-6" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-lg">Price Drop Alert!</h3>
                  <p className="text-sm text-white/90">
                    {priceDrops.length} item{priceDrops.length > 1 ? 's' : ''} in your wishlist {priceDrops.length > 1 ? 'are' : 'is'} on sale
                  </p>
                </div>
              </div>
              <button
                onClick={handleDismiss}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Items */}
          <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
            {priceDrops.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-stone-900 dark:text-stone-100 text-sm truncate">
                    {product.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-stone-500 dark:text-stone-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-500 text-white text-xs font-bold rounded-full">
                      -{product.dropPercentage}%
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-stone-200 dark:border-stone-700">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setIsVisible(false);
                showToast('success', 'Redirecting to wishlist...');
                // In real app, would navigate to wishlist
              }}
              className="w-full py-3 gradient-bg text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              View Wishlist & Shop Now
            </motion.button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
