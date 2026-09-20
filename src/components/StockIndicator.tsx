import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface StockIndicatorProps {
  stock: number;
  inStock: boolean;
}

export default function StockIndicator({ stock, inStock }: StockIndicatorProps) {
  if (!inStock) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
        <span className="text-sm font-semibold text-red-700 dark:text-red-300">Out of Stock</span>
      </div>
    );
  }

  if (stock <= 5) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-2 px-3 py-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg"
      >
        <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 animate-pulse" />
        <span className="text-sm font-semibold text-amber-700 dark:text-amber-300">
          Only {stock} left in stock!
        </span>
      </motion.div>
    );
  }

  if (stock <= 20) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
        <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
          In Stock ({stock} available)
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
      <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
      <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
        In Stock
      </span>
    </div>
  );
}
