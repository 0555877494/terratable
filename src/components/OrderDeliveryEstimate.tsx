import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Truck, Package, CheckCircle } from 'lucide-react';

interface OrderDeliveryEstimateProps {
  orderDate: string;
  shippingMethod: 'standard' | 'express' | 'overnight';
}

export default function OrderDeliveryEstimate({ 
  orderDate, 
  shippingMethod 
}: OrderDeliveryEstimateProps) {
  const getDeliveryEstimate = () => {
    const order = new Date(orderDate);
    const estimate = new Date(order);

    switch (shippingMethod) {
      case 'overnight':
        estimate.setDate(estimate.getDate() + 1);
        return {
          days: 1,
          date: estimate,
          label: 'Tomorrow',
          icon: <Truck className="w-5 h-5" />,
          color: 'from-red-500 to-red-600'
        };
      case 'express':
        estimate.setDate(estimate.getDate() + 3);
        return {
          days: 3,
          date: estimate,
          label: '3 business days',
          icon: <Package className="w-5 h-5" />,
          color: 'from-orange-500 to-orange-600'
        };
      default: // standard
        estimate.setDate(estimate.getDate() + 7);
        return {
          days: 7,
          date: estimate,
          label: '5-7 business days',
          icon: <Package className="w-5 h-5" />,
          color: 'from-blue-500 to-blue-600'
        };
    }
  };

  const estimate = getDeliveryEstimate();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20 rounded-2xl border-2 border-blue-200 dark:border-blue-800 p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${estimate.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
          {estimate.icon}
        </div>
        <div>
          <h3 className="font-bold text-stone-900 dark:text-stone-100 text-lg">
            Estimated Delivery
          </h3>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            {estimate.label}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3 p-3 bg-white dark:bg-stone-800 rounded-xl">
          <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <div className="flex-1">
            <p className="text-xs text-stone-500 dark:text-stone-400">Order Date</p>
            <p className="font-semibold text-stone-900 dark:text-stone-100">
              {new Date(orderDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-white dark:bg-stone-800 rounded-xl">
          <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <div className="flex-1">
            <p className="text-xs text-stone-500 dark:text-stone-400">Estimated Arrival</p>
            <p className="font-semibold text-stone-900 dark:text-stone-100">
              {formatDate(estimate.date)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
        <p className="text-xs text-emerald-700 dark:text-emerald-300 text-center">
          📦 You'll receive tracking information via email once your order ships
        </p>
      </div>
    </motion.div>
  );
}
