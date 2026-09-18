import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { useToast } from '../contexts/ToastContext';

export default function RecentlyViewed() {
  const { recentlyViewed, products, addToCart } = useStore();
  const { showToast } = useToast();

  if (recentlyViewed.length === 0) return null;

  const viewedProducts = recentlyViewed
    .map(id => products.find(p => p.id === id))
    .filter(Boolean)
    .slice(0, 4);

  if (viewedProducts.length === 0) return null;

  const handleAddToCart = (product: any) => {
    addToCart(product);
    showToast('success', `${product.name} added to cart!`);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <Clock className="w-6 h-6 text-amber-600" />
          <h2 className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100">
            Recently Viewed
          </h2>
        </div>
        <p className="text-stone-600 dark:text-stone-400">Pick up where you left off</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {viewedProducts.map((product, index) => (
          <motion.div
            key={product!.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white dark:bg-stone-800 rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300"
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src={product!.image}
                alt={product!.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-sm mb-2 line-clamp-2">
                {product!.name}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold gradient-text">
                  ${product!.price.toFixed(2)}
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleAddToCart(product)}
                  className="px-3 py-1.5 gradient-bg text-white rounded-full text-xs font-bold shadow-md"
                >
                  Add
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
