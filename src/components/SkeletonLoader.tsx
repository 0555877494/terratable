import React from 'react';
import { motion } from 'framer-motion';

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl border border-terra-100/50 overflow-hidden">
      <div className="aspect-[4/3] bg-terra-100 animate-pulse" />
      <div className="p-5 space-y-3">
        <div className="w-16 h-3 bg-terra-100 rounded-full animate-pulse" />
        <div className="w-3/4 h-5 bg-terra-100 rounded-full animate-pulse" />
        <div className="w-full h-3 bg-terra-50 rounded-full animate-pulse" />
        <div className="w-2/3 h-3 bg-terra-50 rounded-full animate-pulse" />
        <div className="flex items-center gap-1 pt-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-3.5 h-3.5 bg-terra-100 rounded-full animate-pulse" />
          ))}
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-terra-50">
          <div className="w-20 h-7 bg-terra-100 rounded-full animate-pulse" />
          <div className="w-20 h-9 bg-terra-100 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <ProductCardSkeleton />
        </motion.div>
      ))}
    </div>
  );
}
