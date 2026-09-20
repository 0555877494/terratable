import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ShoppingBag } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { useToast } from '../contexts/ToastContext';

export default function TrendingProducts() {
  const { products, addToCart } = useStore();
  const { showToast } = useToast();

  // Get top 4 products by rating and reviews
  const trending = [...products]
    .sort((a, b) => (b.rating * b.reviews) - (a.rating * a.reviews))
    .slice(0, 4);

  const handleAddToCart = (product: any) => {
    addToCart(product);
    showToast('success', `${product.name} added to cart!`);
  };

  return (
    <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-2xl border-2 border-rose-200 dark:border-rose-800 p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-stone-900 dark:text-stone-100">Trending Now 🔥</h3>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Most popular products this week
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {trending.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4 p-3 bg-white dark:bg-stone-800 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="absolute -top-2 -left-2 w-6 h-6 gradient-bg rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                #{index + 1}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-stone-900 dark:text-stone-100 truncate">
                {product.name}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  ⭐ {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              <p className="text-sm font-bold text-rose-600 dark:text-rose-400 mt-1">
                ${product.price.toFixed(2)}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleAddToCart(product)}
              className="p-2 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-lg hover:bg-rose-200 dark:hover:bg-rose-900/50 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
