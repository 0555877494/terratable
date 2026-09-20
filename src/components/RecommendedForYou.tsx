import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShoppingBag } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { useToast } from '../contexts/ToastContext';

export default function RecommendedForYou() {
  const { products, orders, addToCart } = useStore();
  const { showToast } = useToast();

  // Get categories from user's order history
  const purchasedCategories = orders
    .flatMap(order => order.items)
    .map(item => item.product.category);

  const categoryCounts = purchasedCategories.reduce((acc, cat) => {
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Find top category
  const topCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0]?.[0];

  // Get recommended products (same category, not purchased yet)
  const purchasedProductIds = new Set(
    orders.flatMap(order => order.items.map(item => item.product.id))
  );

  const recommended = products
    .filter(p => !purchasedProductIds.has(p.id))
    .filter(p => !topCategory || p.category === topCategory)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  if (recommended.length === 0) return null;

  const handleAddToCart = (product: any) => {
    addToCart(product);
    showToast('success', `${product.name} added to cart!`);
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl border-2 border-amber-200 dark:border-amber-800 p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-stone-900 dark:text-stone-100">Recommended For You</h3>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Based on your purchase history
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {recommended.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-stone-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-32 object-cover"
            />
            <div className="p-3">
              <p className="font-semibold text-stone-900 dark:text-stone-100 text-sm truncate mb-1">
                {product.name}
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400 mb-2">
                {product.origin}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-600 dark:text-amber-400">
                  ${product.price.toFixed(2)}
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleAddToCart(product)}
                  className="p-2 gradient-bg text-white rounded-lg shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
