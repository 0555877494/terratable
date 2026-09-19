import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, MapPin, Truck, Clock, CheckCircle, Phone } from 'lucide-react';

interface OrderDeliveryTrackerProps {
  orderId: string;
  status: string;
  estimatedDelivery: string;
  driverName?: string;
  driverPhone?: string;
  currentLocation?: string;
}

export default function OrderDeliveryTracker({ 
  orderId,
  status,
  estimatedDelivery,
  driverName,
  driverPhone,
  currentLocation
}: OrderDeliveryTrackerProps) {
  const [showDetails, setShowDetails] = useState(false);

  const getStatusIcon = () => {
    switch (status) {
      case 'preparing':
        return <Package className="w-6 h-6" />;
      case 'out_for_delivery':
        return <Truck className="w-6 h-6" />;
      case 'delivered':
        return <CheckCircle className="w-6 h-6" />;
      default:
        return <Clock className="w-6 h-6" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'preparing':
        return 'from-purple-500 to-purple-600';
      case 'out_for_delivery':
        return 'from-orange-500 to-orange-600';
      case 'delivered':
        return 'from-emerald-500 to-emerald-600';
      default:
        return 'from-amber-500 to-amber-600';
    }
  };

  return (
    <div className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 overflow-hidden">
      {/* Header */}
      <div className={`bg-gradient-to-r ${getStatusColor()} p-6 text-white`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              {getStatusIcon()}
            </div>
            <div>
              <h3 className="font-bold text-lg">Order #{orderId.slice(-6).toUpperCase()}</h3>
              <p className="text-sm text-white/90 capitalize">
                {status.replace('_', ' ')}
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowDetails(!showDetails)}
            className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-sm font-semibold hover:bg-white/30 transition-colors"
          >
            {showDetails ? 'Hide' : 'Show'} Details
          </motion.button>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Progress</span>
            <span className="font-bold">
              {status === 'pending' ? '25%' : 
               status === 'confirmed' ? '50%' : 
               status === 'preparing' ? '75%' : 
               status === 'out_for_delivery' ? '90%' : '100%'}
            </span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ 
                width: status === 'pending' ? '25%' : 
                       status === 'confirmed' ? '50%' : 
                       status === 'preparing' ? '75%' : 
                       status === 'out_for_delivery' ? '90%' : '100%'
              }}
              transition={{ duration: 1 }}
              className="h-full bg-white rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Details */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 space-y-4">
              {/* Estimated Delivery */}
              <div className="flex items-center gap-3 p-4 bg-stone-50 dark:bg-stone-700/50 rounded-xl">
                <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <div className="flex-1">
                  <p className="text-xs text-stone-500 dark:text-stone-400">Estimated Delivery</p>
                  <p className="font-semibold text-stone-900 dark:text-stone-100">
                    {estimatedDelivery}
                  </p>
                </div>
              </div>

              {/* Current Location */}
              {currentLocation && (
                <div className="flex items-center gap-3 p-4 bg-stone-50 dark:bg-stone-700/50 rounded-xl">
                  <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div className="flex-1">
                    <p className="text-xs text-stone-500 dark:text-stone-400">Current Location</p>
                    <p className="font-semibold text-stone-900 dark:text-stone-100">
                      {currentLocation}
                    </p>
                  </div>
                </div>
              )}

              {/* Driver Info */}
              {driverName && (
                <div className="flex items-center gap-3 p-4 bg-stone-50 dark:bg-stone-700/50 rounded-xl">
                  <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center text-white font-bold">
                    {driverName[0]}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-stone-500 dark:text-stone-400">Delivery Driver</p>
                    <p className="font-semibold text-stone-900 dark:text-stone-100">
                      {driverName}
                    </p>
                  </div>
                  {driverPhone && (
                    <a
                      href={`tel:${driverPhone}`}
                      className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                    </a>
                  )}
                </div>
              )}

              {/* Tracking Timeline */}
              <div className="pt-4 border-t border-stone-200 dark:border-stone-700">
                <h4 className="font-semibold text-stone-900 dark:text-stone-100 mb-3">
                  Tracking Timeline
                </h4>
                <div className="space-y-3">
                  {[
                    { label: 'Order Placed', time: '2 hours ago', completed: true },
                    { label: 'Confirmed', time: '1 hour ago', completed: true },
                    { label: 'Preparing', time: '30 mins ago', completed: status !== 'pending' && status !== 'confirmed' },
                    { label: 'Out for Delivery', time: 'Just now', completed: status === 'out_for_delivery' || status === 'delivered' },
                    { label: 'Delivered', time: estimatedDelivery, completed: status === 'delivered' }
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        step.completed
                          ? 'bg-emerald-500 text-white'
                          : 'bg-stone-200 dark:bg-stone-700 text-stone-400'
                      }`}>
                        {step.completed ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <Clock className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`font-semibold text-sm ${
                          step.completed
                            ? 'text-stone-900 dark:text-stone-100'
                            : 'text-stone-400 dark:text-stone-500'
                        }`}>
                          {step.label}
                        </p>
                        <p className="text-xs text-stone-500 dark:text-stone-400">
                          {step.time}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
