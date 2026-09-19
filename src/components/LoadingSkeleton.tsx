import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSkeletonProps {
  type?: 'card' | 'list' | 'grid';
  count?: number;
}

export default function LoadingSkeleton({ type = 'card', count = 3 }: LoadingSkeletonProps) {
  const shimmerAnimation = {
    animate: {
      backgroundPosition: ['200% 0', '-200% 0'],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    },
  };

  const ShimmerBlock = ({ className = '' }: { className?: string }) => (
    <motion.div
      className={`bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200 dark:from-stone-700 dark:via-stone-600 dark:to-stone-700 rounded ${className}`}
      {...shimmerAnimation}
      style={{ backgroundSize: '200% 100%' }}
    />
  );

  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-stone-800 rounded-2xl overflow-hidden border-2 border-stone-200 dark:border-stone-700"
          >
            <ShimmerBlock className="w-full h-48" />
            <div className="p-5 space-y-3">
              <ShimmerBlock className="w-3/4 h-6" />
              <ShimmerBlock className="w-full h-4" />
              <ShimmerBlock className="w-2/3 h-4" />
              <div className="flex justify-between items-center pt-3">
                <ShimmerBlock className="w-20 h-8" />
                <ShimmerBlock className="w-24 h-10 rounded-full" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-stone-800 rounded-xl p-4 border-2 border-stone-200 dark:border-stone-700"
          >
            <div className="flex items-center gap-4">
              <ShimmerBlock className="w-16 h-16 rounded-lg" />
              <div className="flex-1 space-y-2">
                <ShimmerBlock className="w-3/4 h-5" />
                <ShimmerBlock className="w-1/2 h-4" />
              </div>
              <ShimmerBlock className="w-20 h-8" />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === 'grid') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: count * 2 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-stone-800 rounded-xl p-4 border-2 border-stone-200 dark:border-stone-700"
          >
            <ShimmerBlock className="w-full h-24 mb-3" />
            <ShimmerBlock className="w-3/4 h-4 mb-2" />
            <ShimmerBlock className="w-1/2 h-4" />
          </motion.div>
        ))}
      </div>
    );
  }

  return null;
}
