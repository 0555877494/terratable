import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, RotateCcw } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { useToast } from '../contexts/ToastContext';

export default function QuickReorder() {
  const { orders, addToCart } = useStore();
  const { showToast } = useToast();

  // Get last 3 delivered orders
  const recentOrders = orders
    .filter(order => order.status === 'delivered')
    .slice(0, 3);

  if (recentOrders.length === 0) return null;

  const handleReorder = (order: any) => {
    order.items.forEach((item: any) => {
      addToCart(item.product);
    });
    showToast('success', `${order.items.length} items added to cart!`);
  };

  return (
    <div className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
          <RotateCcw className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-stone-900 dark:text-stone-100">Quick Reorder</h3>
          <p className="text-sm text-stone-500 dark:text-stone-400">Order again with one click</p>
        </div>
      </div>

      <div className="space-y-3">
        {recentOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4 p-4 bg-stone-50 dark:bg-stone-700/50 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
          >
            <div className="flex-1">
              <p className="font-semibold text-stone-900 dark:text-stone-100">
                Order #{order.id.slice(-6).toUpperCase()}
              </p>
              <p className="text-sm text-stone-500 dark:text-stone-400">
                {order.items.length} items • ${order.total.toFixed(2)}
              </p>
              <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleReorder(order)}
              className="px-4 py-2 gradient-bg text-white rounded-lg font-semibold text-sm shadow-lg flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Reorder
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
