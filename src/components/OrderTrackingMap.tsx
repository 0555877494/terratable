import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Package, Truck, Home, CheckCircle } from 'lucide-react';

interface OrderTrackingMapProps {
  origin: string;
  destination: string;
  currentLocation: string;
  progress: number;
}

export default function OrderTrackingMap({ 
  origin, 
  destination, 
  currentLocation,
  progress 
}: OrderTrackingMapProps) {
  return (
    <div className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
          <MapPin className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-stone-900 dark:text-stone-100 text-lg">
            Delivery Map
          </h3>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Track your package in real-time
          </p>
        </div>
      </div>

      {/* Map Visualization */}
      <div className="relative h-64 bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20 rounded-xl border-2 border-stone-200 dark:border-stone-700 overflow-hidden mb-6">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-300 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-emerald-300 rounded-full blur-3xl" />
        </div>

        {/* Route Path */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 250">
          <motion.path
            d="M 50 200 Q 150 100 350 150"
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
          className="absolute left-8 bottom-8"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <p className="text-xs font-bold text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-800 px-2 py-1 rounded shadow">
              {origin}
            </p>
          </div>
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
            className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl"
          >
            <Truck className="w-7 h-7 text-white" />
          </motion.div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <p className="text-xs font-bold text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-800 px-2 py-1 rounded shadow">
              {currentLocation}
            </p>
          </div>
        </motion.div>

        {/* Destination Point */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute right-8 top-12"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
            <Home className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <p className="text-xs font-bold text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-800 px-2 py-1 rounded shadow">
              {destination}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Progress Info */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
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
        <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
          <span>Origin: {origin}</span>
          <span>Destination: {destination}</span>
        </div>
      </div>
    </div>
  );
}
