import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Truck, Package, CheckCircle, Clock, Navigation } from 'lucide-react';

interface LiveOrderTrackingProps {
  orderId: string;
  currentStatus: string;
  estimatedDelivery: string;
  driverLocation?: {
    lat: number;
    lng: number;
    address: string;
  };
  deliveryAddress: string;
}

export default function LiveOrderTracking({
  orderId,
  currentStatus,
  estimatedDelivery,
  driverLocation,
  deliveryAddress
}: LiveOrderTrackingProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate progress based on status
    const statusProgress = {
      'pending': 10,
      'confirmed': 25,
      'preparing': 50,
      'out_for_delivery': 75,
      'delivered': 100
    };
    setProgress(statusProgress[currentStatus as keyof typeof statusProgress] || 0);
  }, [currentStatus]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-6 h-6" />;
      case 'confirmed': return <CheckCircle className="w-6 h-6" />;
      case 'preparing': return <Package className="w-6 h-6" />;
      case 'out_for_delivery': return <Truck className="w-6 h-6" />;
      case 'delivered': return <MapPin className="w-6 h-6" />;
      default: return <Clock className="w-6 h-6" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'from-amber-500 to-amber-600';
      case 'confirmed': return 'from-blue-500 to-blue-600';
      case 'preparing': return 'from-purple-500 to-purple-600';
      case 'out_for_delivery': return 'from-orange-500 to-orange-600';
      case 'delivered': return 'from-emerald-500 to-emerald-600';
      default: return 'from-stone-500 to-stone-600';
    }
  };

  return (
    <div className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
            <Navigation className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-lg">
              Live Order Tracking
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400">
              Order #{orderId.slice(-6).toUpperCase()}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-stone-500 dark:text-stone-400">Estimated Delivery</p>
          <p className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
            {estimatedDelivery}
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

        {/* Origin Point (Warehouse) */}
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
              Warehouse
            </p>
          </div>
        </motion.div>

        {/* Current Location (Driver) */}
        {driverLocation && currentStatus === 'out_for_delivery' && (
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
                Driver Location
              </p>
            </div>
          </motion.div>
        )}

        {/* Destination Point (Customer) */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute right-8 top-12"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <p className="text-xs font-bold text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-800 px-2 py-1 rounded shadow">
              Your Location
            </p>
          </div>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">
            Delivery Progress
          </span>
          <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
            {progress}%
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

      {/* Status Timeline */}
      <div className="space-y-4">
        {['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered'].map((status, index) => {
          const isCompleted = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered'].indexOf(currentStatus) >= index;
          const isCurrent = status === currentStatus;

          return (
            <motion.div
              key={status}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-start gap-4 p-4 rounded-xl ${
                isCurrent
                  ? 'bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800'
                  : isCompleted
                  ? 'bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800'
                  : 'bg-stone-50 dark:bg-stone-700/50 border-2 border-stone-200 dark:border-stone-700'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                isCompleted
                  ? `bg-gradient-to-br ${getStatusColor(status)} text-white shadow-lg`
                  : 'bg-stone-200 dark:bg-stone-700 text-stone-400'
              }`}>
                {getStatusIcon(status)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className={`font-bold ${
                    isCompleted || isCurrent
                      ? 'text-stone-900 dark:text-stone-100'
                      : 'text-stone-400 dark:text-stone-500'
                  }`}>
                    {status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
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
                <p className={`text-sm ${
                  isCompleted || isCurrent
                    ? 'text-stone-600 dark:text-stone-400'
                    : 'text-stone-400 dark:text-stone-500'
                }`}>
                  {status === 'pending' && 'Your order has been received and is being processed'}
                  {status === 'confirmed' && 'Payment confirmed and order is being prepared'}
                  {status === 'preparing' && 'Your items are being carefully packed'}
                  {status === 'out_for_delivery' && 'Your order is on the way to you'}
                  {status === 'delivered' && 'Your order has been successfully delivered'}
                </p>
              </div>
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

      {/* Delivery Address */}
      <div className="mt-6 p-4 bg-stone-50 dark:bg-stone-700/50 rounded-xl">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-stone-500 dark:text-stone-400 mb-1">Delivery Address</p>
            <p className="font-semibold text-stone-900 dark:text-stone-100">
              {deliveryAddress}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
