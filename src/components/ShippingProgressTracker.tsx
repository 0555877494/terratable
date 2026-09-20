import React from 'react';
import { motion } from 'framer-motion';
import { Package, CheckCircle, Truck, MapPin, Clock } from 'lucide-react';

interface ShippingProgressTrackerProps {
  currentStep: number;
  totalSteps: number;
  steps: Array<{
    label: string;
    icon: React.ReactNode;
    date?: string;
  }>;
}

export default function ShippingProgressTracker({ 
  currentStep, 
  totalSteps, 
  steps 
}: ShippingProgressTrackerProps) {
  const progress = (currentStep / (totalSteps - 1)) * 100;

  return (
    <div className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
          <Truck className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-stone-900 dark:text-stone-100 text-lg">
            Shipping Progress
          </h3>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Step {currentStep + 1} of {totalSteps}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">
            Progress
          </span>
          <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
            {progress.toFixed(0)}%
          </span>
        </div>
        <div className="h-3 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full gradient-bg rounded-full relative"
          >
            {/* Shimmer Effect */}
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

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-start gap-4 p-4 rounded-xl transition-all ${
                isCurrent
                  ? 'bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800'
                  : isCompleted
                  ? 'bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800'
                  : 'bg-stone-50 dark:bg-stone-700/50 border-2 border-stone-200 dark:border-stone-700'
              }`}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                isCompleted
                  ? 'bg-emerald-500 text-white'
                  : isCurrent
                  ? 'gradient-bg text-white'
                  : 'bg-stone-200 dark:bg-stone-700 text-stone-400'
              }`}>
                {isCompleted ? <CheckCircle className="w-6 h-6" /> : step.icon}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className={`font-bold ${
                    isCompleted || isCurrent
                      ? 'text-stone-900 dark:text-stone-100'
                      : 'text-stone-400 dark:text-stone-500'
                  }`}>
                    {step.label}
                  </h4>
                  {isCurrent && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="px-2 py-0.5 bg-amber-500 text-white text-xs font-bold rounded-full"
                    >
                      Current
                    </motion.span>
                  )}
                </div>
                {step.date && (
                  <p className="text-sm text-stone-500 dark:text-stone-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {step.date}
                  </p>
                )}
              </div>

              {/* Status Icon */}
              {isCompleted && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center"
                >
                  <CheckCircle className="w-5 h-5 text-white" />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
