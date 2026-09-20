import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, Heart, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductQuickStatsProps {
  product: Product;
}

export default function ProductQuickStats({ product }: ProductQuickStatsProps) {
  const stats = [
    {
      icon: <Star className="w-4 h-4 fill-amber-400 text-amber-400" />,
      value: product.rating.toFixed(1),
      label: 'Rating',
      color: 'text-amber-600 dark:text-amber-400'
    },
    {
      icon: <Heart className="w-4 h-4 text-rose-500" />,
      value: `${Math.floor(product.reviews * 0.8)}`,
      label: 'Wishlisted',
      color: 'text-rose-600 dark:text-rose-400'
    },
    {
      icon: <Eye className="w-4 h-4 text-blue-500" />,
      value: `${Math.floor(product.reviews * 2.5)}`,
      label: 'Viewed',
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: <ShoppingBag className="w-4 h-4 text-emerald-500" />,
      value: `${product.reviews}`,
      label: 'Sold',
      color: 'text-emerald-600 dark:text-emerald-400'
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-stone-50 dark:bg-stone-700/50 rounded-xl p-3 text-center"
        >
          <div className="flex items-center justify-center gap-1 mb-1">
            {stat.icon}
            <span className={`text-lg font-bold ${stat.color}`}>
              {stat.value}
            </span>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 font-semibold">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
