import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Package, Truck, CheckCircle, Home } from 'lucide-react';

interface ShippingMapTrackerProps {
  currentStatus: string;
  estimatedDelivery: string;
  trackingHistory: Array<{
    status: string;
    location: string;
    timestamp: string;
    completed: boolean;
  }>;
}

export default function ShippingMapTracker({ 
  currentStatus, 
  estimatedDelivery,
  trackingHistory 
}: ShippingMapTrackerProps) {
  const getProgressPercentage = () => {
    const statusOrder = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    return ((currentIndex + 1) / statusOrder.length) * 100;
  };

  const progress = getProgressPercentage();

  return (
    <div className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
          <Truck className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-stone-900 dark:text-stone-100 text-lg">
            Shipment Tracking
          </h3>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Estimated delivery: {estimatedDelivery}
          </p>
        </div>
      </div>

      {/* Visual Map Representation */}
      <div className="relative mb-8">
        {/* Map Background */}
        <div className="h-48 bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20 rounded-xl border-2 border-stone-200 dark:border-stone-700 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-20 h-20 bg-blue-300 rounded-full blur-2xl" />
            <div className="absolute bottom-10 right-10 w-24 h-24 bg-emerald-300 rounded-full blur-2xl" />
          </div>

          {/* Route Line */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
            <motion.path
              d="M 50 150 Q 150 50 350 100"
              stroke="#f59e0b"
              strokeWidth="3"
              fill="none"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress / 100 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </svg>

          {/* Origin Point */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute left-12 bottom-12"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <Package className="w-5 h-5 text-white" />
            </div>
            <p className="text-xs font-semibold text-stone-700 dark:text-stone-300 mt-1 text-center">
              Warehouse
            </p>
          </motion.div>

          {/* Current Location */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl"
            >
              <Truck className="w-6 h-6 text-white" />
            </motion.div>
            <p className="text-xs font-semibold text-stone-700 dark:text-stone-300 mt-1 text-center">
              In Transit
            </p>
          </motion.div>

          {/* Destination Point */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute right-12 top-12"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
              <Home className="w-5 h-5 text-white" />
            </div>
            <p className="text-xs font-semibold text-stone-700 dark:text-stone-300 mt-1 text-center">
              Your Home
            </p>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">
              Delivery Progress
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
              className="h-full gradient-bg rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Tracking History */}
      <div>
        <h4 className="font-semibold text-stone-900 dark:text-stone-100 mb-4">
          Tracking History
        </h4>
        <div className="space-y-3">
          {trackingHistory.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                event.completed
                  ? 'bg-emerald-500 text-white'
                  : 'bg-stone-200 dark:bg-stone-700 text-stone-400'
              }`}>
                {event.completed ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <MapPin className="w-4 h-4" />
                )}
              </div>
              <div className="flex-1">
                <p className={`font-semibold text-sm ${
                  event.completed
                    ? 'text-stone-900 dark:text-stone-100'
                    : 'text-stone-500 dark:text-stone-400'
                }`}>
                  {event.status}
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {event.location}
                </p>
                <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">
                  {new Date(event.timestamp).toLocaleString()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
