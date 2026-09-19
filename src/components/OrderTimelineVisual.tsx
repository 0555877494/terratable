import React from 'react';
import { motion } from 'framer-motion';
import { Package, CheckCircle, Truck, MapPin, Clock } from 'lucide-react';

interface OrderTimelineVisualProps {
  status: string;
  orderDate: string;
  estimatedDelivery: string;
}

export default function OrderTimelineVisual({ 
  status, 
  orderDate, 
  estimatedDelivery 
}: OrderTimelineVisualProps) {
  const steps = [
    { 
      id: 'pending', 
      label: 'Order Placed', 
      icon: Clock,
      description: 'Your order has been received',
      color: 'from-amber-400 to-amber-500'
    },
    { 
      id: 'confirmed', 
      label: 'Confirmed', 
      icon: CheckCircle,
      description: 'Payment confirmed',
      color: 'from-blue-400 to-blue-500'
    },
    { 
      id: 'preparing', 
      label: 'Preparing', 
      icon: Package,
      description: 'Your items are being prepared',
      color: 'from-purple-400 to-purple-500'
    },
    { 
      id: 'out_for_delivery', 
      label: 'Out for Delivery', 
      icon: Truck,
      description: 'Your order is on the way',
      color: 'from-orange-400 to-orange-500'
    },
    { 
      id: 'delivered', 
      label: 'Delivered', 
      icon: MapPin,
      description: 'Order delivered successfully',
      color: 'from-emerald-400 to-emerald-500'
    }
  ];

  const currentIndex = steps.findIndex(step => step.id === status);

  return (
    <div className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
          <Package className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-stone-900 dark:text-stone-100 text-lg">
            Order Timeline
          </h3>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Track your order progress
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {steps.map((step, index) => {
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;
          const Icon = step.icon;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 mb-8 last:mb-0"
            >
              {/* Icon */}
              <div className="relative">
                <motion.div
                  animate={isCurrent ? { 
                    scale: [1, 1.1, 1],
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`w-14 h-14 rounded-full flex items-center justify-center ${
                    isCompleted
                      ? `bg-gradient-to-br ${step.color} text-white shadow-lg`
                      : 'bg-stone-100 dark:bg-stone-700 text-stone-400'
                  }`}
                >
                  <Icon className="w-7 h-7" />
                </motion.div>
                
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="absolute top-14 left-1/2 -translate-x-1/2 w-0.5 h-8">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: isCompleted ? '100%' : '0%' }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`w-full h-full ${
                        isCompleted ? 'bg-gradient-to-b from-amber-500 to-orange-500' : 'bg-stone-200 dark:bg-stone-700'
                      }`}
                    />
                  </div>
                )}

                {/* Pulse Effect for Current */}
                {isCurrent && (
                  <motion.div
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.color}`}
                  />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pt-2">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className={`font-bold text-lg ${
                    isCompleted ? 'text-stone-900 dark:text-stone-100' : 'text-stone-400 dark:text-stone-500'
                  }`}>
                    {step.label}
                  </h4>
                  {isCurrent && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs font-bold rounded-full"
                    >
                      Current
                    </motion.span>
                  )}
                </div>
                <p className={`text-sm ${
                  isCompleted ? 'text-stone-600 dark:text-stone-400' : 'text-stone-400 dark:text-stone-500'
                }`}>
                  {step.description}
                </p>
                
                {/* Date/Time Info */}
                {index === 0 && (
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                    {new Date(orderDate).toLocaleString()}
                  </p>
                )}
                {step.id === 'delivered' && (
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                    Estimated: {estimatedDelivery}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="mt-8 pt-6 border-t border-stone-200 dark:border-stone-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">
            Overall Progress
          </span>
          <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
            {((currentIndex + 1) / steps.length * 100).toFixed(0)}%
          </span>
        </div>
        <div className="h-3 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / steps.length) * 100}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full gradient-bg rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
