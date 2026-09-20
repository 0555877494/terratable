import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../contexts/StoreContext';

export default function RecentlyViewed() {
  const { products } = useStore();
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('recentlyViewed');
    if (stored) {
      setRecentlyViewed(JSON.parse(stored));
      setIsVisible(true);
    }
  }, []);

  const clearHistory = () => {
    setRecentlyViewed([]);
    localStorage.removeItem('recentlyViewed');
    setIsVisible(false);
  };

  const removeItem = (productId: string) => {
    const updated = recentlyViewed.filter(id => id !== productId);
    setRecentlyViewed(updated);
    localStorage.setItem('recentlyViewed', JSON.stringify(updated));
    if (updated.length === 0) {
      setIsVisible(false);
    }
  };

  const recentProducts = recentlyViewed
    .map(id => products.find(p => p.id === id))
    .filter(Boolean)
    .slice(0, 6);

  if (!isVisible || recentProducts.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-stone-100 dark:bg-stone-800 rounded-xl flex items-center justify-center">
            <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
              Recently Viewed
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400">
              Pick up where you left off
            </p>
          </div>
        </div>
        <button
          onClick={clearHistory}
          className="text-sm text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {recentProducts.map((product, index) => (
          <motion.div
            key={product!.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="group relative"
          >
            <Link to={`/product/${product!.id}`}>
              <div className="aspect-square rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 mb-2">
                <img
                  src={product!.image}
                  alt={product!.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100 line-clamp-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {product!.name}
              </h4>
              <p className="text-sm font-bold text-amber-600 dark:text-amber-400 mt-1">
                ${product!.price.toFixed(2)}
              </p>
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault();
                removeItem(product!.id);
              }}
              className="absolute top-2 right-2 w-6 h-6 bg-white dark:bg-stone-800 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
            >
              <X className="w-4 h-4 text-stone-600 dark:text-stone-400" />
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
