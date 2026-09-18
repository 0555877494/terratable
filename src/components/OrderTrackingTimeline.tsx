import React from 'react';
import { motion } from 'framer-motion';
import { Package, CheckCircle, Truck, Clock, MapPin } from 'lucide-react';

interface OrderTrackingTimelineProps {
  status: string;
  orderDate: string;
  estimatedDelivery?: string;
}

export default function OrderTrackingTimeline({ 
  status, 
  orderDate, 
  estimatedDelivery 
}: OrderTrackingTimelineProps) {
  const steps = [
    { id: 'pending', label: 'Order Placed', icon: Clock, date: orderDate },
    { id: 'confirmed', label: 'Confirmed', icon: CheckCircle, date: '' },
    { id: 'preparing', label: 'Preparing', icon: Package, date: '' },
    { id: 'out_for_delivery', label: 'Out for Delivery', icon: Truck, date: '' },
    { id: 'delivered', label: 'Delivered', icon: MapPin, date: estimatedDelivery || '' },
  ];

  const currentIndex = steps.findIndex(step => step.id === status);

  return (
    <div className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6">
      <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 mb-6">
        Order Tracking
      </h3>

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
                  animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isCompleted
                      ? 'gradient-bg text-white shadow-lg'
                      : 'bg-stone-100 dark:bg-stone-700 text-stone-400'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </motion.div>
                
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className={`absolute top-12 left-1/2 -translate-x-1/2 w-0.5 h-8 ${
                    isCompleted ? 'bg-amber-500' : 'bg-stone-200 dark:bg-stone-700'
                  }`} />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className={`font-semibold ${
                    isCompleted ? 'text-stone-900 dark:text-stone-100' : 'text-stone-400 dark:text-stone-500'
                  }`}>
                    {step.label}
                  </h4>
                  {isCurrent && (
                    <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs font-bold rounded-full">
                      Current
                    </span>
                  )}
                </div>
                {step.date && (
                  <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                    {step.date}
                  </p>
                )}
                {isCurrent && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-amber-600 dark:text-amber-400 mt-2 font-medium"
                  >
                    {status === 'pending' && 'Your order is being processed...'}
                    {status === 'confirmed' && 'Your order has been confirmed!'}
                    {status === 'preparing' && 'We\'re preparing your items...'}
                    {status === 'out_for_delivery' && 'Your order is on the way!'}
                    {status === 'delivered' && 'Your order has been delivered!'}
                  </motion.p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
