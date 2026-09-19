import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  color?: 'amber' | 'emerald' | 'rose' | 'blue';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export default function AnimatedProgressBar({
  value,
  max = 100,
  label,
  showPercentage = true,
  color = 'amber',
  size = 'md',
  animated = true
}: AnimatedProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const getColorClass = () => {
    switch (color) {
      case 'emerald':
        return 'from-emerald-400 to-emerald-600';
      case 'rose':
        return 'from-rose-400 to-rose-600';
      case 'blue':
        return 'from-blue-400 to-blue-600';
      default:
        return 'from-amber-400 to-orange-500';
    }
  };

  const getHeightClass = () => {
    switch (size) {
      case 'sm':
        return 'h-2';
      case 'lg':
        return 'h-6';
      default:
        return 'h-4';
    }
  };

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">
              {label}
            </span>
          )}
          {showPercentage && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-sm font-bold text-stone-900 dark:text-stone-100"
            >
              {percentage.toFixed(0)}%
            </motion.span>
          )}
        </div>
      )}
      
      <div className={`w-full bg-stone-200 dark:bg-stone-700 rounded-full ${getHeightClass()} overflow-hidden`}>
        <motion.div
          initial={animated ? { width: 0 } : false}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full bg-gradient-to-r ${getColorClass()} rounded-full relative overflow-hidden`}
        >
          {/* Shimmer effect */}
          <motion.div
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
              repeatDelay: 1,
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </motion.div>
      </div>
    </div>
  );
}
