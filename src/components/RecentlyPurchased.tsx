import React from 'react';
import { motion } from 'framer-motion';
import { Package, RotateCcw } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { useToast } from '../contexts/ToastContext';

export default function RecentlyPurchased() {
  const { orders, addToCart } = useStore();
  const { showToast } = useToast();

  // Get unique products from delivered orders
  const purchasedProducts = orders
    .filter(order => order.status === 'delivered')
    .flatMap(order => order.items)
    .reduce((acc, item) => {
      if (!acc.find(p => p.product.id === item.product.id)) {
        acc.push(item);
      }
      return acc;
    }, [] as any[])
    .slice(0, 4);

  if (purchasedProducts.length === 0) return null;

  const handleAddToCart = (product: any) => {
    addToCart(product);
    showToast('success', `${product.name} added to cart!`);
  };

  return (
    <div className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
          <Package className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-stone-900 dark:text-stone-100">Buy It Again</h3>
          <p className="text-sm text-stone-500 dark:text-stone-400">Items from your previous orders</p>
        </div>
      </div>

      <div className="space-y-3">
        {purchasedProducts.map((item, index) => (
          <motion.div
            key={item.product.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4 p-3 bg-stone-50 dark:bg-stone-700/50 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
          >
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-stone-900 dark:text-stone-100 truncate">
                {item.product.name}
              </p>
              <p className="text-sm text-stone-500 dark:text-stone-400">
                ${item.product.price.toFixed(2)}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAddToCart(item.product)}
              className="px-4 py-2 gradient-bg text-white rounded-lg font-semibold text-sm shadow-lg flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Buy Again
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
